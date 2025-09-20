import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, ThumbsUp, MessageCircle, Share2, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  impactScore: number;
  sentiment: string;
  date: string;
  time: string;
  source: string;
  confidence: number;
  affectedCompanies: string[];
  assetTags: string[];
  latency: string;
  detailedSummary: {
    whatHappened: string;
    marketReaction: string;
    who: string;
    whyItMatters: string;
    magnitude: string;
  };
  modelAnalysis: {
    keyFacts: string[];
    sources: string[];
  };
  houseViewContext: {
    currentStance: string;
    comparison: string;
    relevance: string;
  };
  portfolioImpact: {
    affectedAssets: string[];
    overallImpact: string;
  };
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    category: "Fed Speech",
    title: "Powell signals potential pause in rate hikes amid economic uncertainty",
    summary: "Fed Chair Powell delivered dovish remarks suggesting a potential pause in rate hiking cycle",
    impact: "positive",
    impactScore: 2,
    sentiment: "hawkish vs. house view: +2",
    date: "2024-09-20",
    time: "14:23:45",
    source: "Reuters",
    confidence: 87,
    affectedCompanies: ["AAPL", "MSFT", "TSLA"],
    assetTags: ["US", "SPY", "Financial"],
    latency: "15ms",
    detailedSummary: {
      whatHappened: "Fed Chair Powell delivered dovish remarks suggesting a potential pause in rate hiking cycle",
      marketReaction: "Markets rally 2.1%, bond yields drop 15bps, USD weakens",
      who: "Jerome Powell, Federal Reserve Chair",
      whyItMatters: "Moderating inflation pressures and labor market softening provide flexibility",
      magnitude: "High - potential policy shift affecting $50T+ in markets"
    },
    modelAnalysis: {
      keyFacts: [
        "Powell mentioned 'considerable progress' on inflation",
        "Labor market showing signs of rebalancing",
        "Committee will proceed carefully with future decisions"
      ],
      sources: ["Source 1", "Source 2"]
    },
    houseViewContext: {
      currentStance: "Expecting 2 more 25bps hikes before pause",
      comparison: "This signal suggests earlier pause than anticipated",
      relevance: "+2 hawkish deviation from house view"
    },
    portfolioImpact: {
      affectedAssets: ["US Equities (+)", "US Bonds (+)", "USD (-)", "Emerging Markets (+)"],
      overallImpact: "Positive for equity allocation, favorable for duration positioning"
    }
  },
  {
    id: "2",
    category: "Earnings Call",
    title: "Microsoft beats expectations, raises AI infrastructure guidance",
    summary: "Strong cloud revenue growth and increased AI capex projections signal continued momentum in enterprise AI adoption.",
    impact: "positive",
    impactScore: 3,
    sentiment: "AI theme: strong positive",
    date: "2024-09-20",
    time: "14:15:10",
    source: "Bloomberg",
    confidence: 91,
    affectedCompanies: ["MSFT", "GOOGL"],
    assetTags: ["US", "Technology"],
    latency: "12ms",
    detailedSummary: {
      whatHappened: "Microsoft reported strong Q4 earnings with cloud revenue exceeding expectations",
      marketReaction: "MSFT up 5%, tech sector rallies, AI stocks outperform",
      who: "Microsoft Corporation",
      whyItMatters: "Validates enterprise AI adoption thesis and cloud growth sustainability",
      magnitude: "High - reinforces multi-trillion dollar AI market opportunity"
    },
    modelAnalysis: {
      keyFacts: [
        "Azure revenue grew 29% YoY vs 25% expected",
        "AI services contributing 12% to Azure revenue",
        "Raised FY25 capex guidance by $2B for AI infrastructure"
      ],
      sources: ["Earnings Report", "Management Commentary"]
    },
    houseViewContext: {
      currentStance: "Overweight technology, AI infrastructure plays",
      comparison: "Results exceed our bullish expectations",
      relevance: "Confirms our positive AI investment thesis"
    },
    portfolioImpact: {
      affectedAssets: ["Technology Stocks (+)", "AI Infrastructure (+)", "Cloud Services (+)"],
      overallImpact: "Strong positive for tech allocation, validates AI infrastructure investments"
    }
  },
  {
    id: "3",
    category: "ECB Minutes",
    title: "ECB officials express concern over persistent core inflation",
    summary: "Meeting minutes reveal growing unease among policymakers about sticky services inflation despite recent headline moderation.",
    impact: "negative",
    impactScore: -1,
    sentiment: "dovish vs. house view: -1",
    date: "2024-09-20",
    time: "14:18:22",
    source: "Financial Times",
    confidence: 72,
    affectedCompanies: ["EU Banks", "EUR Assets"],
    assetTags: ["EU", "EWG", "FEZ", "Monetary Policy"],
    latency: "28ms",
    detailedSummary: {
      whatHappened: "ECB meeting minutes showed officials concerned about persistent core inflation",
      marketReaction: "EUR strengthens, EU bond yields rise, banking stocks mixed",
      who: "European Central Bank Officials",
      whyItMatters: "Suggests potential for extended tightening cycle in Europe",
      magnitude: "Medium - affects EUR 13T eurozone economy"
    },
    modelAnalysis: {
      keyFacts: [
        "Core inflation remains sticky at 4.2%",
        "Services inflation showing persistence",
        "Labor market tightness continues"
      ],
      sources: ["ECB Minutes", "Policy Statement"]
    },
    houseViewContext: {
      currentStance: "Expected gradual policy normalization",
      comparison: "More hawkish than anticipated",
      relevance: "May require adjustment to EU duration positioning"
    },
    portfolioImpact: {
      affectedAssets: ["EU Bonds (-)", "EUR (+)", "EU Banks (+)"],
      overallImpact: "Negative for EU duration, positive for banking sector exposure"
    }
  },
  {
    id: "4",
    category: "Economic Data",
    title: "Swiss inflation accelerates unexpectedly to 2.1% in December",
    summary: "Higher-than-expected CPI print driven by housing and energy costs, putting pressure on SNB policy stance.",
    impact: "neutral",
    impactScore: 1,
    sentiment: "CHF positioning impact",
    date: "2024-09-20",
    time: "14:12:33",
    source: "Reuters",
    confidence: 68,
    affectedCompanies: ["Swiss Assets"],
    assetTags: ["USD", "CHF", "CH", "Central Bank"],
    latency: "45ms",
    detailedSummary: {
      whatHappened: "Swiss CPI rose to 2.1% vs 1.8% expected",
      marketReaction: "CHF strengthens modestly, Swiss bonds under pressure",
      who: "Swiss National Bank",
      whyItMatters: "May influence SNB's ultra-accommodative policy stance",
      magnitude: "Low - affects smaller Swiss market"
    },
    modelAnalysis: {
      keyFacts: [
        "Housing costs main driver of inflation spike",
        "Energy prices also contributed",
        "Core inflation remains contained"
      ],
      sources: ["Swiss Statistics Office", "SNB Commentary"]
    },
    houseViewContext: {
      currentStance: "Neutral on CHF, expect SNB stability",
      comparison: "Slight positive for CHF vs our neutral view",
      relevance: "Minor adjustment to CHF positioning may be warranted"
    },
    portfolioImpact: {
      affectedAssets: ["CHF (+)", "Swiss Bonds (-)", "Swiss Equities (neutral)"],
      overallImpact: "Limited impact, minor CHF strength expected"
    }
  },
  {
    id: "5",
    category: "Geopolitical",
    title: "Trade tensions escalate as new tariff measures announced",
    summary: "Additional trade restrictions threaten to disrupt supply chains and increase inflationary pressures globally.",
    impact: "negative",
    impactScore: -2,
    sentiment: "Risk-off sentiment",
    date: "2024-09-20",
    time: "14:08:55",
    source: "Wall Street Journal",
    confidence: 75,
    affectedCompanies: ["Global Trade", "Supply Chain"],
    assetTags: ["GLD", "TLT", "Global", "Safe Haven"],
    latency: "67ms",
    detailedSummary: {
      whatHappened: "New tariff measures announced affecting multiple trade partners",
      marketReaction: "Risk-off sentiment, defensive assets outperform",
      who: "Trade Policy Officials",
      whyItMatters: "Could disrupt global supply chains and reignite inflation",
      magnitude: "High - affects global trade flows worth trillions"
    },
    modelAnalysis: {
      keyFacts: [
        "Tariffs target key industrial sectors",
        "Retaliatory measures expected from trading partners",
        "Supply chain disruption likely in Q1 2025"
      ],
      sources: ["Trade Ministry", "Industry Reports"]
    },
    houseViewContext: {
      currentStance: "Monitoring geopolitical risks carefully",
      comparison: "Higher risk escalation than anticipated",
      relevance: "May require defensive positioning adjustments"
    },
    portfolioImpact: {
      affectedAssets: ["Safe Havens (+)", "Trade-sensitive sectors (-)", "Emerging Markets (-)"],
      overallImpact: "Negative for risk assets, positive for defensive positioning"
    }
  }
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  const getImpactColor = (impact: string, score: number) => {
    if (impact === "positive" || score > 0) return "text-financial-positive";
    if (impact === "negative" || score < 0) return "text-financial-negative";
    return "text-muted-foreground";
  };

  const getImpactBgColor = (impact: string, score: number) => {
    if (impact === "positive" || score > 0) return "bg-financial-positive-bg border-financial-positive/20";
    if (impact === "negative" || score < 0) return "bg-financial-negative-bg border-financial-negative/20";
    return "bg-card border-border";
  };

  const formatConfidence = (confidence: number) => {
    return `${confidence}% confidence`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Financial News</h1>
          <p className="text-muted-foreground">Real-time market signals with AI-powered analysis</p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockNews.map((news) => (
            <Card
              key={news.id}
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${getImpactBgColor(news.impact, news.impactScore)}`}
              onClick={() => handleNewsClick(news)}
            >
              <CardContent className="p-6">
                {/* Header with category and confidence */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{news.category}</span>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                  <span className={`text-sm font-medium ${getImpactColor(news.impact, news.impactScore)}`}>
                    {formatConfidence(news.confidence)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 leading-tight">{news.title}</h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{news.summary}</p>

                {/* Asset Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {news.assetTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Bottom row with impact and actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${getImpactColor(news.impact, news.impactScore)}`}>
                      {news.impactScore > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : news.impactScore < 0 ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : null}
                      <span className="text-sm font-medium">
                        Impact: {news.impactScore > 0 ? `+${news.impactScore}` : news.impactScore}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{news.sentiment}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div>Latency: {news.latency}</div>
                      <div className="text-financial-positive">Real-time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* News Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedNews && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Event Detail</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {selectedNews.date} {selectedNews.time} UTC
                      </span>
                      <span className={getImpactColor(selectedNews.impact, selectedNews.impactScore)}>
                        {formatConfidence(selectedNews.confidence)}
                      </span>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Title */}
                  <h2 className="text-xl font-semibold">{selectedNews.title}</h2>

                  {/* Summary Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">What happened</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.detailedSummary.whatHappened}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Market reaction</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.detailedSummary.marketReaction}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Who</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.detailedSummary.who}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Why it matters</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.detailedSummary.whyItMatters}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium mb-2">Magnitude</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.detailedSummary.magnitude}</p>
                      </div>
                    </div>
                  </div>

                  {/* Model Analysis */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Model Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Facts</h4>
                        <ul className="space-y-1">
                          {selectedNews.modelAnalysis.keyFacts.map((fact, index) => (
                            <li key={index} className="text-sm text-muted-foreground">• {fact}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Sources</h4>
                        <div className="space-y-1">
                          {selectedNews.modelAnalysis.sources.map((source, index) => (
                            <div key={index} className="text-sm text-primary underline cursor-pointer">
                              📎 {source}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* House View Context */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">House View Context</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Stance</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.houseViewContext.currentStance}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Comparison</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.houseViewContext.comparison}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Relevance</h4>
                        <p className={`text-sm font-medium ${getImpactColor(selectedNews.impact, selectedNews.impactScore)}`}>
                          {selectedNews.houseViewContext.relevance}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Impact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Portfolio Impact</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Affected Assets</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedNews.portfolioImpact.affectedAssets.map((asset, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {asset}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Overall Impact</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.portfolioImpact.overallImpact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default News;