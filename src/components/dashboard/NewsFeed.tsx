import { useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/ui/NewsCard";

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
              <NewsCard
                key={news.id}
                news={news}
                onClick={handleNewsClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for detailed news view */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>

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
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Affected Assets</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNews.portfolioImpact.affectedAssets.map((asset, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className={`text-xs ${
                              asset.includes('(+)') 
                                ? 'bg-financial-positive-bg border border-financial-positive/20 text-financial-positive-foreground' 
                                : asset.includes('(-)') 
                                ? 'bg-financial-negative-bg border border-financial-negative/20 text-financial-negative-foreground'
                                : 'bg-financial-neutral border border-border text-muted-foreground'
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