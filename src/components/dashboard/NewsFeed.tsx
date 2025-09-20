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
    preInterpretationNote?: string;
  };
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    category: "Fed Speech",
    title: "Powell signals potential pause in rate hikes amid economic uncertainty",
    summary: "Fed Chair Powell delivered dovish remarks suggesting a potential pause in the rate hiking cycle. His speech highlighted recent economic uncertainty, moderating inflation pressures, and a softening labor market, which together provide the Fed with more flexibility. The market responded positively, with equities rallying and bond yields dropping.",
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
      overallImpact: "Positive for equity allocation, favorable for duration positioning",
      preInterpretationNote: "A dovish Fed stance may prompt investors to increase equity and bond duration exposure, while reducing defensive allocations. Tactical portfolio shifts are likely as market sentiment improves.",
    },
  },
  {
    id: "2",
    category: "Earnings Call",
    title: "Microsoft beats expectations, raises AI infrastructure guidance",
    summary: "Microsoft reported strong Q4 earnings, with cloud revenue exceeding expectations and a significant increase in AI infrastructure guidance. The company highlighted robust enterprise AI adoption, which is driving growth and validating the multi-trillion dollar AI market opportunity. Tech stocks rallied in response.",
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
      overallImpact: "Strong positive for tech allocation, validates AI infrastructure investments",
      preInterpretationNote: "Strong AI and cloud results could lead to increased portfolio weights in technology and infrastructure, as investors seek exposure to growth themes.",
    },
  },
  {
    id: "3",
    category: "ECB Minutes",
    title: "ECB officials express concern over persistent core inflation",
    summary: "ECB meeting minutes revealed growing unease among policymakers about persistent core inflation, especially in the services sector. Despite headline inflation moderating, the underlying price pressures remain, suggesting a potentially extended tightening cycle in Europe. The euro and bond yields responded accordingly.",
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
      overallImpact: "Negative for EU duration, positive for banking sector exposure",
      preInterpretationNote: "Sticky core inflation may encourage investors to review eurozone bond holdings and consider selective exposure to financials, but broad portfolio changes are unlikely.",
    },
  },
  {
    id: "4",
    category: "Economic Data",
    title: "Swiss inflation accelerates unexpectedly to 2.1% in December",
    summary: "Swiss inflation accelerated to 2.1% in December, driven by higher housing and energy costs. The surprise CPI print puts pressure on the Swiss National Bank's policy stance, though core inflation remains contained. The CHF strengthened modestly, while Swiss bonds came under pressure.",
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
      overallImpact: "Limited impact, minor CHF strength expected",
      preInterpretationNote: "Swiss inflation data may prompt minor adjustments in CHF and Swiss bond allocations, but global portfolios are unlikely to see significant changes.",
    },
  },
  {
    id: "5",
    category: "Geopolitical",
    title: "Trade tensions escalate as new tariff measures announced",
    summary: "Global trade tensions escalated as new tariff measures were announced, targeting key industrial sectors and threatening to disrupt supply chains. Retaliatory actions are expected, which could reignite inflationary pressures and increase risk-off sentiment across markets. Defensive assets outperformed in response.",
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
      overallImpact: "Negative for risk assets, positive for defensive positioning",
      preInterpretationNote: "Rising trade tensions could drive a shift toward safe havens and defensive sectors, with reduced allocations to emerging markets and trade-sensitive stocks.",
    },
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
                  news.impact === "positive"
                    ? "bg-financial-positive-bg border-financial-positive/20 hover:border-financial-positive/40"
                    : news.impact === "negative"
                    ? "bg-financial-negative-bg border-financial-negative/20 hover:border-financial-negative/40"
                    : "bg-financial-neutral border-border hover:border-border"
                }`}
              >
                <div className="flex gap-4">
                  {/* Main Content - 3/4 */}
                  <div className="w-3/4 min-w-0 flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {news.impact === "positive" ? (
                        <div className="w-3 h-3 rounded-full bg-financial-positive" />
                      ) : news.impact === "negative" ? (
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
                          // External link functionality would be implemented here
                        }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {news.summary}
                      </p>
                      
                      <div className="text-xs text-muted-foreground">
                        {news.time}
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
                          style={{ left: `${Math.max(0, Math.min(100, ((news.confidence - 50) / 50) * 100))}%` }}
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
                        <span>Sources • {news.modelAnalysis.sources.length}</span>
                      </div>

                      {/* Asset Classes */}
                      <div className="flex items-center gap-1">
                        {news.assetTags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-muted/50 rounded-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {news.assetTags.length > 2 && (
                          <span className="px-2 py-1 bg-muted/50 rounded-sm font-medium">
                            +{news.assetTags.length - 2}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold pr-8">
                  <div className="flex items-center justify-between w-full">
                    <span>Event Detail</span>
                    <div className="flex items-center gap-4 text-sm mr-8">
                      <span className="text-muted-foreground">
                        {selectedNews.date} {selectedNews.time} UTC
                      </span>
                      <span className="text-green-600 font-medium">
                        {selectedNews.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Title */}
                <h2 className="text-xl font-semibold">{selectedNews.title}</h2>

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedNews.summary}
                  </p>
                </div>

                {/* Implications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Implications</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Affected Assets</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNews.portfolioImpact.affectedAssets.map((asset, index) => (
                          <Badge 
                            key={index} 
                            className={`text-xs ${
                              asset.includes('(+)') 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : asset.includes('(-)') 
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                          >
                            {asset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Overall Impact</h4>
                      <p className="text-sm text-muted-foreground">{selectedNews.portfolioImpact.overallImpact}</p>
                      {selectedNews.portfolioImpact.preInterpretationNote && (
                        <p className="text-xs text-muted-foreground mt-2">{selectedNews.portfolioImpact.preInterpretationNote}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sources */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sources</h3>
                  <div className="space-y-1">
                    {selectedNews.modelAnalysis.sources.map((source, index) => (
                      <div key={index} className="text-sm text-primary underline cursor-pointer">
                        📎 {source}
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