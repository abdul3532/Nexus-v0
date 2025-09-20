import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  portfolioImpact: "positive" | "negative" | "neutral";
  impactedCompanies: string[];
  url: string;
  sentimentScore: number;
  sourcesCount: number;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Revenue Driven by iPhone 15 Sales",
    summary: "Apple's fourth-quarter earnings beat expectations with strong iPhone sales and services growth, signaling continued market dominance in premium smartphones.",
    source: "Reuters",
    publishedAt: "2 hours ago",
    portfolioImpact: "positive",
    impactedCompanies: ["AAPL"],
    url: "#",
    sentimentScore: 750,
    sourcesCount: 28,
  },
  {
    id: "2",
    title: "Tesla Faces Production Challenges in Gigafactory Shanghai",
    summary: "Tesla's Shanghai facility reports temporary production slowdowns due to supply chain disruptions, potentially affecting Q4 delivery targets.",
    source: "Bloomberg",
    publishedAt: "4 hours ago",
    portfolioImpact: "negative",
    impactedCompanies: ["TSLA"],
    url: "#",
    sentimentScore: 320,
    sourcesCount: 15,
  },
  {
    id: "3",
    title: "Microsoft Azure Expands AI Services Partnership",
    summary: "Microsoft announces expanded partnerships for Azure AI services, strengthening its position in the cloud computing and artificial intelligence market.",
    source: "Financial Times",
    publishedAt: "6 hours ago",
    portfolioImpact: "positive",
    impactedCompanies: ["MSFT"],
    url: "#",
    sentimentScore: 680,
    sourcesCount: 22,
  },
  {
    id: "4",
    title: "Federal Reserve Signals Potential Rate Changes",
    summary: "Fed officials hint at possible monetary policy adjustments in upcoming meetings, with implications for tech sector valuations and growth stocks.",
    source: "Wall Street Journal",
    publishedAt: "8 hours ago",
    portfolioImpact: "neutral",
    impactedCompanies: ["AAPL", "MSFT", "TSLA", "META"],
    url: "#",
    sentimentScore: 500,
    sourcesCount: 34,
  },
  {
    id: "5",
    title: "Meta Platforms Faces Regulatory Scrutiny in Europe",
    summary: "European regulators announce investigation into Meta's data practices, potentially leading to significant compliance costs and operational changes.",
    source: "TechCrunch",
    publishedAt: "10 hours ago",
    portfolioImpact: "negative",
    impactedCompanies: ["META"],
    url: "#",
    sentimentScore: 280,
    sourcesCount: 19,
  },
];

export function NewsFeed() {
  return (
    <Card className="bg-dashboard-surface border-dashboard-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          Today's Important Financial News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                news.portfolioImpact === "positive"
                  ? "bg-financial-positive-bg border-financial-positive/20 hover:border-financial-positive/40"
                  : news.portfolioImpact === "negative"
                  ? "bg-financial-negative-bg border-financial-negative/20 hover:border-financial-negative/40"
                  : "bg-financial-neutral border-border hover:border-border"
              }`}
            >
              <div className="flex gap-4">
                {/* Main Content - 3/4 */}
                <div className="w-3/4 min-w-0 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {news.portfolioImpact === "positive" ? (
                      <div className="w-3 h-3 rounded-full bg-financial-positive" />
                    ) : news.portfolioImpact === "negative" ? (
                      <div className="w-3 h-3 rounded-full bg-financial-negative" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-muted" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm leading-tight">
                        {news.title}
                      </h3>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {news.summary}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      {news.publishedAt}
                    </div>
                  </div>
                </div>

                {/* Sentiment Section - 1/4 */}
                <div className="w-1/4 flex flex-col items-center justify-center space-y-3 border-l border-border pl-4">
                  {/* Sentiment Score */}
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground mb-1">
                      {news.sentimentScore}
                    </div>
                    {/* Sentiment Meter */}
                    <div className="w-16 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                      <div 
                        className="absolute top-0 w-2 h-2 bg-black border-2 border-white rounded-full transform -translate-y-0"
                        style={{ left: `${(news.sentimentScore / 1000) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Sources Count */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    </div>
                    <span>Sources • {news.sourcesCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}