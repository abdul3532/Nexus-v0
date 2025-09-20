import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Building2 } from "lucide-react";

interface PortfolioCompany {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  marketCap: string;
  holdings: number;
  status: "active" | "watchlist";
}

const mockPortfolio: PortfolioCompany[] = [
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    marketCap: "$2.8T",
    holdings: 150,
    status: "active",
  },
  {
    id: "2",
    name: "Tesla Inc.",
    symbol: "TSLA",
    sector: "Automotive",
    marketCap: "$800B",
    holdings: 75,
    status: "active",
  },
  {
    id: "3",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    sector: "Technology",
    marketCap: "$2.5T",
    holdings: 200,
    status: "active",
  },
  {
    id: "4",
    name: "Meta Platforms",
    symbol: "META",
    sector: "Technology",
    marketCap: "$750B",
    holdings: 100,
    status: "active",
  },
  {
    id: "5",
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    sector: "E-commerce",
    marketCap: "$1.2T",
    holdings: 0,
    status: "watchlist",
  },
  {
    id: "6",
    name: "Nvidia Corporation",
    symbol: "NVDA",
    sector: "Semiconductors",
    marketCap: "$1.1T",
    holdings: 0,
    status: "watchlist",
  },
];

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "watchlist">("all");

  const filteredCompanies = mockPortfolio.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || company.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const activeHoldings = mockPortfolio.filter(c => c.status === "active").length;
  const watchlistCount = mockPortfolio.filter(c => c.status === "watchlist").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Portfolio Management</h1>
          <p className="text-muted-foreground">Monitor and manage your investment portfolio companies</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Holdings</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeHoldings}</div>
              <p className="text-xs text-muted-foreground">Companies in portfolio</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchlistCount}</div>
              <p className="text-xs text-muted-foreground">Companies being watched</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPortfolio.length}</div>
              <p className="text-xs text-muted-foreground">Active + Watchlist</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Portfolio Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === "active" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("active")}
                  size="sm"
                >
                  Active
                </Button>
                <Button
                  variant={selectedFilter === "watchlist" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("watchlist")}
                  size="sm"
                >
                  Watchlist
                </Button>
              </div>
              
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Company
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio List */}
        <div className="space-y-4">
          {filteredCompanies.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No companies found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredCompanies.map((company) => (
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
                          <Badge variant={company.status === "active" ? "default" : "secondary"}>
                            {company.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{company.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Sector: {company.sector}</span>
                          <span>•</span>
                          <span>Market Cap: {company.marketCap}</span>
                          {company.status === "active" && (
                            <>
                              <span>•</span>
                              <span>Holdings: {company.holdings} shares</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {company.status === "watchlist" ? (
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Portfolio
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          Edit Holdings
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;