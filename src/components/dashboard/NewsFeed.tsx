import { useState } from "react";
import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import cnnLogo from "@/assets/logos/cnn-logo.png";
import bbcLogo from "@/assets/logos/bbc-logo.png";

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
  confidence: number;
  implications: string;
  affectedAssets: Array<{
    name: string;
    direction: "positive" | "negative";
  }>;
  overallImpact: string;
  sources: Array<{
    name: string;
    url: string;
  }>;
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
    confidence: 85,
    implications: "Strong iPhone 15 sales and services growth indicate Apple's continued resilience in the premium smartphone market, supporting higher valuations and potential dividend increases.",
    affectedAssets: [
      { name: "US Tech Stocks", direction: "positive" },
      { name: "Consumer Discretionary", direction: "positive" }
    ],
    overallImpact: "Positive for tech allocation, supportive of growth positioning",
    sources: [
      { name: "Reuters", url: "#" },
      { name: "Bloomberg", url: "#" }
    ]
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
    confidence: 75,
    implications: "Production disruptions could impact Tesla's Q4 delivery guidance, potentially affecting EV sector sentiment and supply chain resilience expectations.",
    affectedAssets: [
      { name: "EV Stocks", direction: "negative" },
      { name: "Auto Sector", direction: "negative" }
    ],
    overallImpact: "Negative for EV sector, may prompt defensive positioning",
    sources: [
      { name: "Bloomberg", url: "#" },
      { name: "Financial Times", url: "#" }
    ]
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
    confidence: 80,
    implications: "Azure AI expansion reinforces Microsoft's competitive position in cloud services, supporting premium valuations and long-term growth trajectory in enterprise AI solutions.",
    affectedAssets: [
      { name: "Cloud Infrastructure", direction: "positive" },
      { name: "AI Technologies", direction: "positive" }
    ],
    overallImpact: "Positive for tech infrastructure allocation, supports AI theme positioning",
    sources: [
      { name: "Financial Times", url: "#" },
      { name: "TechCrunch", url: "#" }
    ]
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
    confidence: 90,
    implications: "Potential Fed policy shifts create uncertainty for interest-sensitive assets, requiring careful monitoring of duration risk and growth stock positioning.",
    affectedAssets: [
      { name: "Growth Stocks", direction: "negative" },
      { name: "Bonds", direction: "positive" }
    ],
    overallImpact: "Mixed implications requiring tactical portfolio adjustments",
    sources: [
      { name: "Wall Street Journal", url: "#" },
      { name: "Federal Reserve", url: "#" }
    ]
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
    confidence: 70,
    implications: "Regulatory pressures in Europe may result in increased compliance costs and operational restrictions, potentially impacting Meta's profitability and growth prospects.",
    affectedAssets: [
      { name: "Social Media Stocks", direction: "negative" },
      { name: "EU Tech Regulation", direction: "negative" }
    ],
    overallImpact: "Negative for social media sector, may warrant reduced allocation",
    sources: [
      { name: "TechCrunch", url: "#" },
      { name: "European Commission", url: "#" }
    ]
  },
];

export function NewsFeed() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  return (
    <>
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
                onClick={() => handleNewsClick(news)}
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(news.url, '_blank');
                          }}
                        >
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
                  <div className="w-1/4 flex flex-col items-center justify-center space-y-2 border-l border-border pl-4">
                    {/* Sentiment Meter */}
                    <div className="text-center">
                      <div className="w-[140px] h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative mb-2">
                        <div 
                          className="absolute top-0 w-3 h-3 bg-black border-2 border-white rounded-full transform -translate-y-0.5 -translate-x-1.5 shadow-sm"
                          style={{ left: `${(news.sentimentScore / 1000) * 100}%` }}
                        />
                      </div>
                      {/* Meter Labels */}
                      <div className="flex justify-between text-xs text-muted-foreground w-[140px]">
                        <span>Critical</span>
                        <span>Great News</span>
                      </div>
                    </div>

                    {/* Sources and Asset Classes Row */}
                    <div className="flex items-center justify-center gap-2 w-full text-xs text-muted-foreground">
                      {/* Sources Count */}
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <img src={cnnLogo} alt="CNN" className="w-3 h-3 rounded-sm object-contain" />
                          <img src={bbcLogo} alt="BBC" className="w-3 h-3 rounded-sm object-contain" />
                        </div>
                        <span>Sources • {news.sourcesCount}</span>
                      </div>

                      {/* Asset Classes */}
                      <div className="flex items-center gap-1">
                        {news.impactedCompanies.slice(0, 2).map((company, index) => (
                          <span 
                            key={company} 
                            className="px-2 py-1 bg-muted/50 rounded-sm font-medium"
                          >
                            {company}
                          </span>
                        ))}
                        {news.impactedCompanies.length > 2 && (
                          <span className="px-2 py-1 bg-muted/50 rounded-sm font-medium">
                            +{news.impactedCompanies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for detailed news view */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{selectedNews.publishedAt}</span>
                    </div>
                    <DialogTitle className="text-xl font-semibold mb-0 text-left">
                      {selectedNews.title}
                    </DialogTitle>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-sm font-semibold text-green-600">
                      {selectedNews.confidence}% confidence
                    </span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 pt-4">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedNews.summary}
                  </p>
                </div>

                {/* Implications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Implications</h3>
                  
                  <div className="space-y-4">
                    {/* Affected Assets */}
                    <div>
                      <h4 className="font-medium mb-3">Affected Assets</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNews.affectedAssets.map((asset, index) => (
                          <Badge
                            key={index}
                            variant={asset.direction === "positive" ? "default" : "destructive"}
                            className="px-3 py-1"
                          >
                            {asset.name} ({asset.direction === "positive" ? "+" : "-"})
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Overall Impact */}
                    <div>
                      <h4 className="font-medium mb-2">Overall Impact</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedNews.overallImpact}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2">
                        {selectedNews.implications}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Sources</h3>
                  <div className="space-y-2">
                    {selectedNews.sources.map((source, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 text-muted-foreground">📄</div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {source.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}