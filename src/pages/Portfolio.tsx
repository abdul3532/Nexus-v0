import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Building2, Loader2 } from "lucide-react";
import portfolioService, { PortfolioAsset } from "@/services/portfolioService";
import { AddAssetDialog } from "@/components/portfolio/AddAssetDialog";

// Fallback mock data in case the API is not available
const mockPortfolio: PortfolioAsset[] = [
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    marketCap: "$2.8T",
    assetType: "stock",
    tags: ["tech", "consumer", "dividend"]
  },
  {
    id: "2",
    name: "Tesla Inc.",
    symbol: "TSLA",
    sector: "Automotive",
    marketCap: "$800B",
    assetType: "stock",
    tags: ["automotive", "clean energy"]
  },
  {
    id: "3",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    sector: "Technology",
    marketCap: "$2.5T",
    assetType: "stock",
    tags: ["tech", "software", "cloud", "dividend"]
  },
  {
    id: "4",
    name: "Meta Platforms",
    symbol: "META",
    sector: "Technology",
    marketCap: "$750B",
    assetType: "stock",
    tags: ["tech", "social media"]
  },
  {
    id: "5",
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    sector: "E-commerce",
    marketCap: "$1.2T",
    assetType: "stock",
    tags: ["tech", "e-commerce", "cloud"]
  },
  {
    id: "6",
    name: "Nvidia Corporation",
    symbol: "NVDA",
    sector: "Semiconductors",
    marketCap: "$1.1T",
    assetType: "stock",
    tags: ["tech", "semiconductors", "AI"]
  },
];

const Portfolio = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Temporary - in a real app, this would come from authentication
  const userId = 1;

  useEffect(() => {
    fetchPortfolio();
  }, []);
  
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const portfolioAssets = await portfolioService.getUserPortfolio(userId);
      setAssets(portfolioAssets);
      setError(null);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setError("Failed to load portfolio. Using mock data instead.");
      // Fallback to mock data
      setAssets(mockPortfolio);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleAddAsset = async (newAsset: Partial<PortfolioAsset>) => {
    try {
      const createdAsset = await portfolioService.createAsset(newAsset, userId);
      setAssets(prevAssets => [...prevAssets, createdAsset]);
      return Promise.resolve();
    } catch (error) {
      console.error("Error creating asset:", error);
      return Promise.reject(error);
    }
  };

  const handleRemoveCompany = async (id: string) => {
    try {
      await portfolioService.deleteAsset(id);
      setAssets(assets.filter(asset => asset.id !== id));
    } catch (err) {
      console.error(`Error removing asset with ID ${id}:`, err);
      setError("Failed to remove company. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
          <p className="text-muted-foreground">Manage your portfolio companies</p>
        </div>

        {/* Add Company Button */}
        <div className="mb-8 flex gap-4">
          <Button onClick={handleAddCompany} className="flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white  hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
          
          {assets.length === 0 && (
            <Button 
              onClick={async () => {
                try {
                  setLoading(true);
                  const demoAssets = await portfolioService.createDemoPortfolio(userId);
                  setAssets(demoAssets);
                } catch (err) {
                  console.error("Error creating demo portfolio:", err);
                  setError("Failed to create demo portfolio. Please try again.");
                } finally {
                  setLoading(false);
                }
              }} 
              variant="outline"
            >
              Create Demo Portfolio
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading portfolio...</span>
          </div>
        ) : (
          /* Company List */
          <div className="space-y-4">
            {assets.length > 0 ? (
              assets.map((asset) => (
                <Card key={asset.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-black dark:text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold">{asset.symbol}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {asset.tags.slice(0, 3).map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs py-0.5 px-1.5 bg-secondary text-secondary-foreground rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Sector: {asset.sector || 'N/A'}</span>
                            <span>Type: {asset.assetType}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveCompany(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-10 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No assets in your portfolio. Add a company to get started.</p>
                <Button 
                  className="mt-4 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80"
                  onClick={() => handleAddCompany()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Company
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Add Asset Dialog */}
        <AddAssetDialog 
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddAsset={handleAddAsset}
        />
      </div>
    </div>
  );
};

export default Portfolio;