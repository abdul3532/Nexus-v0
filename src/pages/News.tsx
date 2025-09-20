import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, TrendingUp, TrendingDown } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  date: string;
  source: string;
  affectedCompanies: string[];
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Earnings",
    summary: "Apple Inc. exceeded expectations with strong iPhone sales and services revenue growth, showing resilience in challenging market conditions.",
    impact: "positive",
    date: "2024-09-20",
    source: "Reuters",
    affectedCompanies: ["AAPL"],
  },
  {
    id: "2",
    title: "Tesla Faces Production Delays",
    summary: "Tesla announced potential delays in Model 3 production due to supply chain constraints affecting key component availability.",
    impact: "negative",
    date: "2024-09-20",
    source: "Bloomberg",
    affectedCompanies: ["TSLA"],
  },
  {
    id: "3",
    title: "Microsoft Azure Gains Market Share",
    summary: "Microsoft's cloud division continues to outperform competitors, capturing significant enterprise clients and expanding globally.",
    impact: "positive",
    date: "2024-09-19",
    source: "Financial Times",
    affectedCompanies: ["MSFT"],
  },
  {
    id: "4",
    title: "Meta Announces Layoffs",
    summary: "Meta Platforms to reduce workforce by 8% as part of cost-cutting measures amid declining advertising revenue.",
    impact: "negative",
    date: "2024-09-19",
    source: "Wall Street Journal",
    affectedCompanies: ["META"],
  },
  {
    id: "5",
    title: "Federal Reserve Hints at Rate Cuts",
    summary: "Federal Reserve officials suggest potential interest rate cuts in upcoming meetings, signaling support for economic growth.",
    impact: "positive",
    date: "2024-09-18",
    source: "CNBC",
    affectedCompanies: ["Market-wide"],
  },
];

const News = () => {
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [selectedImpact, setSelectedImpact] = useState<string>("all");

  const filteredNews = mockNews.filter((news) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    
    let dateMatch = true;
    if (selectedDate === "today") {
      dateMatch = news.date === today;
    } else if (selectedDate === "yesterday") {
      dateMatch = news.date === yesterday;
    }
    
    const impactMatch = selectedImpact === "all" || news.impact === selectedImpact;
    
    return dateMatch && impactMatch;
  });

  const getDateLabel = (date: string) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    
    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Financial News</h1>
          <p className="text-muted-foreground">Stay updated with the latest financial news and market impact analysis</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="all">All dates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Impact</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <div className="space-y-6">
          {filteredNews.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No news found for the selected filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNews.map((news) => (
              <Card
                key={news.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  news.impact === "positive"
                    ? "bg-financial-positive-bg border-financial-positive/20"
                    : news.impact === "negative"
                    ? "bg-financial-negative-bg border-financial-negative/20"
                    : "bg-card"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{news.title}</h3>
                        <div className="flex items-center gap-1">
                          {news.impact === "positive" ? (
                            <TrendingUp className="h-4 w-4 text-financial-positive" />
                          ) : news.impact === "negative" ? (
                            <TrendingDown className="h-4 w-4 text-financial-negative" />
                          ) : null}
                          <Badge
                            variant="secondary"
                            className={
                              news.impact === "positive"
                                ? "bg-financial-positive/20 text-financial-positive-foreground"
                                : news.impact === "negative"
                                ? "bg-financial-negative/20 text-financial-negative-foreground"
                                : ""
                            }
                          >
                            {news.impact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{news.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{getDateLabel(news.date)}</span>
                        <span>•</span>
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>Affects: {news.affectedCompanies.join(", ")}</span>
                      </div>
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

export default News;