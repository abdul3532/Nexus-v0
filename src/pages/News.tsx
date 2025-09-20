import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, ThumbsUp, MessageCircle, Share2, Clock, TrendingUp, TrendingDown, Filter, ChevronDown, BarChart3, DollarSign, Banknote, Coins } from "lucide-react";
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

interface FilterState {
  assetClasses: string[];
  fixedIncome: string[];
  currencies: string[];
  commodities: string[];
}

const initialFilters: FilterState = {
  assetClasses: [],
  fixedIncome: [],
  currencies: [],
  commodities: []
};

const filterOptions = {
  assetClasses: ["US Equity", "EU Equity", "CH Equity", "UK Equity", "JP Equity", "EM Equity"],
  fixedIncome: ["Government", "Corporate"],
  currencies: ["USD", "CHF", "EUR", "JPY"],
  commodities: ["Gold", "Oil", "Silver"]
};

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
  {
    id: "6",
    category: "Tech Regulation",
    title: "EU passes landmark AI regulation bill",
    summary: "The European Union has passed a landmark bill regulating the use of artificial intelligence, setting new standards for transparency, safety, and ethical use. The legislation is expected to impact global tech companies and shape the future of AI development.",
    impact: "neutral",
    impactScore: 0,
    sentiment: "Regulatory clarity",
    date: "2024-09-20",
    time: "13:55:00",
    source: "Politico",
    confidence: 80,
    affectedCompanies: ["META", "GOOGL", "EU Tech"],
    assetTags: ["EU", "Technology", "AI"],
    latency: "30ms",
    detailedSummary: {
      whatHappened: "EU Parliament approved comprehensive AI regulation bill",
      marketReaction: "Tech stocks mixed, regulatory risk priced in",
      who: "EU Lawmakers",
      whyItMatters: "Sets precedent for global AI governance",
      magnitude: "Medium - impacts major tech firms operating in EU"
    },
    modelAnalysis: {
      keyFacts: [
        "Bill covers transparency, safety, and ethical standards",
        "Global tech firms must comply with new rules",
        "Potential for similar laws in other regions"
      ],
      sources: ["EU Parliament", "Tech Policy Analysts"]
    },
    houseViewContext: {
      currentStance: "Neutral on regulatory risk",
      comparison: "Regulatory clarity may reduce uncertainty",
      relevance: "May stabilize tech sector sentiment"
    },
    portfolioImpact: {
      affectedAssets: ["EU Tech (neutral)", "Global AI (neutral)"],
      overallImpact: "Limited immediate impact, long-term implications for compliance costs",
        preInterpretationNote: "New AI regulations may increase compliance costs for tech firms, but long-term clarity could support stable portfolio allocations in the sector.",
  },
  },
  {
    id: "7",
    category: "Commodities",
    title: "Oil prices surge after OPEC+ surprise production cut",
    summary: "Oil prices jumped sharply after OPEC+ announced an unexpected production cut, aiming to stabilize global markets amid demand uncertainty. The move is expected to impact inflation and energy sector performance worldwide.",
    impact: "positive",
    impactScore: 2,
    sentiment: "Energy sector boost",
    date: "2024-09-20",
    time: "13:40:00",
    source: "CNBC",
    confidence: 85,
    affectedCompanies: ["OPEC", "Energy Stocks"],
    assetTags: ["Oil", "Energy", "Commodities"],
    latency: "22ms",
    detailedSummary: {
      whatHappened: "OPEC+ announced surprise production cut",
      marketReaction: "Oil prices up 8%, energy stocks rally",
      who: "OPEC+ Members",
      whyItMatters: "Aims to stabilize prices amid demand uncertainty",
      magnitude: "High - global energy market impact"
    },
    modelAnalysis: {
      keyFacts: [
        "Production cut larger than expected",
        "Global supply to tighten in Q4",
        "Inflationary pressures may increase"
      ],
      sources: ["OPEC Statement", "Market Analysts"]
    },
    houseViewContext: {
      currentStance: "Neutral on oil, overweight energy equities",
      comparison: "Production cut exceeds expectations",
      relevance: "Supports bullish energy sector outlook"
    },
    portfolioImpact: {
      affectedAssets: ["Oil (+)", "Energy Stocks (+)", "Inflation-sensitive assets (-)"],
      overallImpact: "Positive for energy sector, inflation risk for broader markets",
        preInterpretationNote: "OPEC+ production cuts may boost energy sector allocations, while higher oil prices could prompt portfolio adjustments to hedge inflation risk.",
  },
  },
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const isFilterActive = () => {
    return Object.values(filters).some(category => category.length > 0);
  };

  const filteredNews = mockNews.filter(news => {
    if (!isFilterActive()) return true;
    
    // Check if news matches any active filters
    const matchesAssetClass = filters.assetClasses.length === 0 || 
      filters.assetClasses.some(filter => 
        news.assetTags.some(tag => tag.toLowerCase().includes(filter.split(' ')[0].toLowerCase()))
      );
    
    const matchesCurrency = filters.currencies.length === 0 ||
      filters.currencies.some(currency => 
        news.assetTags.includes(currency)
      );
    
    const matchesFixedIncome = filters.fixedIncome.length === 0 ||
      (filters.fixedIncome.includes("Government") && news.category.includes("Fed")) ||
      (filters.fixedIncome.includes("Corporate") && news.category.includes("Earnings"));
    
    const matchesCommodities = filters.commodities.length === 0 ||
      filters.commodities.some(commodity => 
        news.assetTags.some(tag => tag.toLowerCase().includes(commodity.toLowerCase()))
      );

    return matchesAssetClass && matchesCurrency && matchesFixedIncome && matchesCommodities;
  });

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

        {/* Main Content with Sidebar */}
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className={`transition-all duration-300 ${isFilterOpen ? 'w-80' : 'w-12'}`}>
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {isFilterOpen && <span className="font-medium">Portfolio Filters</span>}
                  </div>
                  
                   
                </div>

                {isFilterOpen && (
                  <div className="space-y-4">
                    {/* Asset Classes */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          <span className="text-sm font-medium">Asset Classes</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pt-2 pl-6">
                        {filterOptions.assetClasses.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`asset-${option}`}
                              checked={filters.assetClasses.includes(option)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('assetClasses', option, checked as boolean)
                              }
                            />
                            <label htmlFor={`asset-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Fixed Income */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm font-medium">Fixed Income</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pt-2 pl-6">
                        {filterOptions.fixedIncome.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`fixed-${option}`}
                              checked={filters.fixedIncome.includes(option)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('fixedIncome', option, checked as boolean)
                              }
                            />
                            <label htmlFor={`fixed-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Currencies */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          <span className="text-sm font-medium">Currencies</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pt-2 pl-6">
                        {filterOptions.currencies.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`currency-${option}`}
                              checked={filters.currencies.includes(option)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('currencies', option, checked as boolean)
                              }
                            />
                            <label htmlFor={`currency-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Commodities */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4" />
                          <span className="text-sm font-medium">Commodities</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pt-2 pl-6">
                        {filterOptions.commodities.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`commodity-${option}`}
                              checked={filters.commodities.includes(option)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('commodities', option, checked as boolean)
                              }
                            />
                            <label htmlFor={`commodity-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* News Grid */}
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
        </div>

        {/* News Detail Dialog */}
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
                        <span className={getImpactColor(selectedNews.impact, selectedNews.impactScore)}>
                          {formatConfidence(selectedNews.confidence)}
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

                  {/* Pre-interpretation of Implications (Portfolio Impact) */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Implications</h3>
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
      </div>
    </div>
  );
};

export default News;