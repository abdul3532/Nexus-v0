import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { AssetType, PortfolioAsset } from "@/services/portfolioService";
import { Loader2 } from "lucide-react";

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAsset: (asset: Partial<PortfolioAsset>) => Promise<void>;
}

export function AddAssetDialog({ open, onOpenChange, onAddAsset }: AddAssetDialogProps) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [assetType, setAssetType] = useState<AssetType>("stock");
  const [tags, setTags] = useState("");
  const [sector, setSector] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !symbol || !assetType) {
      setError("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Process tags into an array
      const tagArray = tags.split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Add sector to tags if provided
      if (sector) {
        tagArray.push(sector);
      }
      
      // Create asset object
      const newAsset: Partial<PortfolioAsset> = {
        name,
        symbol: symbol.toUpperCase(),
        assetType,
        tags: tagArray,
        sector
      };
      
      await onAddAsset(newAsset);
      
      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error("Error adding asset:", err);
      setError("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setName("");
    setSymbol("");
    setAssetType("stock");
    setTags("");
    setSector("");
    setError(null);
  };
  
  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new asset</DialogTitle>
          <DialogDescription>
            Add a company or asset to your portfolio
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol *
            </Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="col-span-3"
              placeholder="AAPL"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Apple Inc."
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset-type" className="text-right">
              Asset Type *
            </Label>
            <Select 
              value={assetType} 
              onValueChange={(value) => setAssetType(value as AssetType)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="bond">Bond</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="commodity">Commodity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sector" className="text-right">
              Sector
            </Label>
            <Select 
              value={sector} 
              onValueChange={setSector}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Financials">Financials</SelectItem>
                <SelectItem value="Consumer Discretionary">Consumer Discretionary</SelectItem>
                <SelectItem value="Consumer Staples">Consumer Staples</SelectItem>
                <SelectItem value="Industrials">Industrials</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Materials">Materials</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Telecommunications">Telecommunications</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="col-span-3"
              placeholder="tech, dividend, growth (comma separated)"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}