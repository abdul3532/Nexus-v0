import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Building2 } from "lucide-react";

interface PortfolioCompany {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  marketCap: string;
}

const mockPortfolio: PortfolioCompany[] = [
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    marketCap: "$2.8T",
  },
  {
    id: "2",
    name: "Tesla Inc.",
    symbol: "TSLA",
    sector: "Automotive",
    marketCap: "$800B",
  },
  {
    id: "3",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    sector: "Technology",
    marketCap: "$2.5T",
  },
  {
    id: "4",
    name: "Meta Platforms",
    symbol: "META",
    sector: "Technology",
    marketCap: "$750B",
  },
  {
    id: "5",
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    sector: "E-commerce",
    marketCap: "$1.2T",
  },
  {
    id: "6",
    name: "Nvidia Corporation",
    symbol: "NVDA",
    sector: "Semiconductors",
    marketCap: "$1.1T",
  },
];

const Portfolio = () => {
  const [companies, setCompanies] = useState<PortfolioCompany[]>(mockPortfolio);

  const handleAddCompany = () => {
    // Placeholder for add company functionality
    console.log("Add company clicked");
  };

  const handleRemoveCompany = (id: string) => {
    setCompanies(companies.filter(company => company.id !== id));
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
        <div className="mb-8">
          <Button onClick={handleAddCompany} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>

        {/* Company List */}
        <div className="space-y-4">
          {companies.map((company) => (
            <Card key={company.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold">{company.symbol}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{company.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>Sector: {company.sector}</span>
                        <span>•</span>
                        <span>Market Cap: {company.marketCap}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveCompany(company.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;