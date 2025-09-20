import { useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

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
    "id": "2",
    "category": "Earnings Call",
    "title": "Microsoft beats expectations, raises AI infrastructure guidance",
    "summary": "Microsoft reported strong Q4 earnings, with cloud revenue exceeding expectations and a significant increase in AI infrastructure guidance. The company highlighted robust enterprise AI adoption, which is driving growth and validating the multi-trillion dollar AI market opportunity. Tech stocks rallied in response.",
    "impact": "positive",
    "impactScore": 3,
    "sentiment": "AI theme: strong positive",
    "date": "2024-09-20",
    "time": "14:15:10",
    "source": "https://www.bloomberg.com/news/articles/2025-07-30/microsoft-s-quarterly-cloud-sales-profit-exceeded-expectations",
    "confidence": 91,
    "affectedCompanies": ["MSFT", "GOOGL"],
    "assetTags": ["US", "Technology"],
    "latency": "12ms",
    "detailedSummary": {
      "whatHappened": "Microsoft reported strong Q4 earnings with cloud revenue exceeding expectations",
      "marketReaction": "MSFT up 5%, tech sector rallies, AI stocks outperform",
      "who": "Microsoft Corporation",
      "whyItMatters": "Validates enterprise AI adoption thesis and cloud growth sustainability",
      "magnitude": "High - reinforces multi-trillion dollar AI market opportunity"
    },
    "modelAnalysis": {
      "keyFacts": [
        "Azure revenue grew 29% YoY vs 25% expected",
        "AI services contributing 12% to Azure revenue",
        "Raised FY25 capex guidance by $2B for AI infrastructure"
      ],
      "sources": ["Earnings Report", "Management Commentary"]
    },
    "houseViewContext": {
      "currentStance": "Overweight technology, AI infrastructure plays",
      "comparison": "Results exceed our bullish expectations",
      "relevance": "Confirms our positive AI investment thesis"
    },
    "portfolioImpact": {
      "affectedAssets": ["Technology Stocks (+)", "AI Infrastructure (+)", "Cloud Services (+)"],
      "overallImpact": "Strong positive for tech allocation, validates AI infrastructure investments",
      "preInterpretationNote": "Strong AI and cloud results could lead to increased portfolio weights in technology and infrastructure, as investors seek exposure to growth themes."
    }
  },
  
  {
    "id": "4",
    "category": "Policy/Immigration",
    "title": "Administration plans $100,000 annual fee for H-1B visas; unveils $1m ‘gold card’",
    "summary": "New measures would impose a $100,000 yearly fee on H-1B visas and introduce a $1 million residency ‘gold card,’ aiming to curb perceived misuse and raise revenue. Tech firms warn the plan could hurt competitiveness and talent pipelines.",
    "impact": "negative",
    "impactScore": 3,
    "sentiment": "restrictive vs. house view: −2",
    "date": "2025-09-20",
    "time": "00:00:00",
    "source": "https://www.washingtonpost.com/politics/2025/09/19/trump-h1b-visa-fee-immigration/",
    "confidence": 85,
    "affectedCompanies": ["META", "GOOGL", "MSFT", "AMZN", "NVDA"],
    "assetTags": ["US", "Tech", "Immigration", "Policy"],
    "latency": "17ms",
    "detailedSummary": {
      "whatHappened": "White House outlines major H-1B fee increase and a high-dollar residency program",
      "marketReaction": "Tech under relative pressure; policy risk premium rises",
      "who": "U.S. Administration; DHS; tech employers",
      "whyItMatters": "Raises cost of skilled visas, potentially slowing hiring and R&D velocity",
      "magnitude": "High — material labor-supply/CapEx ramifications for large-cap tech"
    },
    "modelAnalysis": {
      "keyFacts": [
        "Proposed $100k annual H-1B fee",
        "Introduction of $1m ‘gold card’ residency option",
        "Industry backlash on competitiveness and innovation"
      ],
      "sources": ["WSJ: Trump to Add $100,000 Fee to H-1B Visas", "Reuters: Trump to impose $100,000 fee per year for H-1B visas"]
    },
    "houseViewContext": {
      "currentStance": "Policy risk elevated but manageable",
      "comparison": "Proposal is more restrictive than baseline expectations",
      "relevance": "−2 bearish deviation for mega-cap tech hiring"
    },
    "portfolioImpact": {
      "affectedAssets": ["US Large-Cap Tech (−)", "IT Services (−)", "US Dollar (neutral)"],
      "overallImpact": "Headwind for margin/innovation where teams rely on H-1B talent",
      "preInterpretationNote": "Consider trimming richly valued names most exposed to skilled-visa flows; reassess AI hiring bottlenecks."
    }
  },
  
  {
    "id": "5",
    "category": "Fed Speech",
    "title": "Powell: risks to inflation are ‘tilted to the upside’ despite rate cuts",
    "summary": "In remarks, Chair Powell said inflation risks remain skewed higher, implying the Fed will proceed cautiously with further easing. Messaging tempers expectations for rapid cuts and keeps optionality for data-dependent policy.",
    "impact": "negative",
    "impactScore": 2,
    "sentiment": "hawkish vs. house view: −1",
    "date": "2025-09-20",
    "time": "00:00:00",
    "source": "https://www.wsj.com/video/fed-powell-on-rate-cut-risks-to-inflation-are-tilted-to-the-upside/EEE44DEC-E7E0-4E01-8631-61C8E54F2295?mod=articletype_trending_now_video_pos4",
    "confidence": 80,
    "affectedCompanies": ["ITB", "XLY", "SPY"],
    "assetTags": ["US", "Fed", "Rates"],
    "latency": "16ms",
    "detailedSummary": {
      "whatHappened": "Powell emphasized upside inflation risks after a recent cut",
      "marketReaction": "Front-end yields steady/higher; equities fade intraday gains",
      "who": "Jerome Powell; Federal Reserve",
      "whyItMatters": "Signals slower cutting cycle; reins in market’s dovish bets",
      "magnitude": "Medium — guidance sensitive for front-end rates"
    },
    "modelAnalysis": {
      "keyFacts": [
        "‘Tilted to the upside’ phrasing on inflation risk",
        "Reiterated data-dependent approach",
        "Pushback against aggressive rate-cut expectations"
      ],
      "sources": ["WSJ Video: Powell on rate-cut risks to inflation"]
    },
    "houseViewContext": {
      "currentStance": "Measured easing path with inflation vigilance",
      "comparison": "Slightly more hawkish than market pricing",
      "relevance": "−1 vs. house view; maintain caution on duration beta"
    },
    "portfolioImpact": {
      "affectedAssets": ["US Bonds (− short end)", "USD (+)", "US Equities (neutral)"],
      "overallImpact": "Curb excessive duration risk; favor quality within equities",
      "preInterpretationNote": "Maintain optionality via barbell duration and inflation hedges."
    }
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
          <CardTitle className="flex items-center gap-2 text-xl">
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
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="mt-2  bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300"
                    >
                      View Full Analysis
                    </Button>
                  </div>

                  {/* Pre-interpretation of Implications (Portfolio Impact) */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Overall Impact</h4>
                        <p className="text-sm text-muted-foreground">{selectedNews.portfolioImpact.overallImpact}</p>
                        {selectedNews.portfolioImpact.preInterpretationNote && (
                          <p className="text-xs text-muted-foreground mt-2">{selectedNews.portfolioImpact.preInterpretationNote}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedNews.portfolioImpact.affectedAssets.map((asset, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className={`text-xs ${
                                asset.includes('(+)') 
                                  ? 'bg-financial-positive-bg border border-financial-positive/20 text-financial-positive-foreground' 
                                  : asset.includes('(-') || asset.includes('(-)') 
                                  ? 'bg-financial-negative-bg border border-financial-negative/20 text-financial-negative-foreground'
                                  : 'bg-financial-neutral border border-border text-muted-foreground'
                              }`}
                            >
                              {asset}
                            </Badge>
                          ))}
                        </div>
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
                <div className="flex flex-row gap-4">
                  {/* Share button */}
                  <Button size="sm" className="w-1/8 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="w-1/8 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">Generate Report</Button>
                </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}