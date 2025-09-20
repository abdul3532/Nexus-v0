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
    "id": "1",
    "category": "Product/Technology Release",
    "title": "Meta launches AI-powered smart glasses with new connectivity features",
    "summary": "Meta unveiled its latest AI smart glasses, which introduce enhanced connectivity and on-device AI capabilities. The product aims to reduce reliance on external devices, integrating native voice commands, spatial audio, and real-time language translation. Early reactions note strong potential for augmented reality applications but question battery life and price point.",
    "impact": "neutral",
    "impactScore": 3,
    "sentiment": "neutral vs. house view: 0",
    "date": "2025-09-17",
    "time": "00:00:00",
    "source": "https://edition.cnn.com/2025/09/17/tech/meta-ai-smart-glasses-connect",
    "confidence": 90,
    "affectedCompanies": ["META"],
    "assetTags": ["Technology", "AR/VR", "Wearables"],
    "latency": "20ms",
    "detailedSummary": {
      "whatHappened": "Meta launched AI smart glasses that incorporate on-device AI processing, voice activation, and improved connectivity features",
      "marketReaction": "Shares rose modestly post-announcement; tech blogs praised innovation but noted concerns over battery life and cost",
      "who": "Meta",
      "whyItMatters": "These glasses could shift usage from smartphone-dependence to wearable AI interfaces, affecting AR/VR competition and user experience",
      "magnitude": "Medium - potential consumer electronics disruption in AR/VR space"
    },
    "modelAnalysis": {
      "keyFacts": [
        "On-device AI processing to reduce latency",
        "Real-time translation and voice assistant features",
        "Spatial audio and lightweight design emphasized"
      ],
      "sources": ["CNN"]
    },
    "houseViewContext": {
      "currentStance": "House expects incremental updates in AR devices",
      "comparison": "This is a more ambitious connectivity-first iteration than prior models",
      "relevance": "0 neutral deviation from house view"
    },
    "portfolioImpact": {
      "affectedAssets": ["Meta (+)", "Apple (− potential competitive pressure)"],
      "overallImpact": "Potential upside in wearables and AR players; margins under pressure if R&D and materials costs are high",
      "preInterpretationNote": "If well received, these glasses could lead to increased consumer interest in AR devices; downside risk includes cost, battery constraints, and adoption hurdles."
    }
  },
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
    "id": "3",
    "category": "Rates/Markets",
    "title": "Wall Street bets on faster, deeper Fed cuts than policymakers project",
    "summary": "Futures pricing shows investors expect the Fed’s policy rate to fall substantially below the Fed’s own projections over the next 12–24 months, supporting stocks and easing borrowing costs. Strategists warn markets may be underestimating the Fed’s caution given lingering inflation risks.",
    "impact": "neutral",
    "impactScore": 1,
    "sentiment": "dovish vs. house view: +1",
    "date": "2025-09-20",
    "time": "00:00:00",
    "source": "https://www.wsj.com/economy/central-banking/fed-cuts-rates-by-quarter-point-and-signals-more-are-likely-dba38600",
    "confidence": 82,
    "affectedCompanies": ["JPM", "BAC", "MS", "ITB", "XLF"],
    "assetTags": ["US", "Treasuries", "Rates", "Equities"],
    "latency": "18ms",
    "detailedSummary": {
      "whatHappened": "Rate futures imply steeper and earlier easing than the Fed’s median path",
      "marketReaction": "Treasury yields drift lower; equities supported; credit spreads tighter",
      "who": "Wall Street investors; Federal Reserve",
      "whyItMatters": "Mismatch between market pricing and Fed guidance can drive volatility around data/FOMC",
      "magnitude": "Medium — broad cross-asset implications"
    },
    "modelAnalysis": {
      "keyFacts": [
        "Futures imply policy rate below ~3% by 2026 vs. Fed ~3.4%",
        "Lower yields easing mortgage/corporate borrowing costs",
        "Analysts caution on inflation and Fed’s cautious stance"
      ],
      "sources": ["WSJ: Wall Street Bets Rates Will Drop Much More Than the Fed's Forecasts"]
    },
    "houseViewContext": {
      "currentStance": "Gradual cuts with data dependency",
      "comparison": "Markets price faster easing than house baseline",
      "relevance": "+1 dovish deviation from house view"
    },
    "portfolioImpact": {
      "affectedAssets": ["US Equities (+)", "US Bonds (+)", "USD (−)"],
      "overallImpact": "Supportive for duration and equity risk; watch for repricing if inflation runs hot",
      "preInterpretationNote": "Consider adding duration on dips; keep hedges for upside inflation surprises."
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
    "id": "4",
    "category": "Media/Regulation",
    "title": "Disney’s abrupt suspension of ‘Jimmy Kimmel Live!’ followed affiliate pushback",
    "summary": "Disney executives pulled ‘Jimmy Kimmel Live!’ after affiliates signaled they would indefinitely preempt the program. The move followed regulatory scrutiny and mounting station pressure, forcing a rapid programming shift.",
    "impact": "neutral",
    "impactScore": 1,
    "sentiment": "neutral vs. house view: 0",
    "date": "2025-09-18",
    "time": "00:00:00",
    "source": "https://www.wsj.com/business/media/jimmy-kimmel-decision-behind-the-scenes-e1ecbbf2",
    "confidence": 72,
    "affectedCompanies": ["DIS", "CMCSA", "PARA"],
    "assetTags": ["US", "Media", "Broadcast"],
    "latency": "21ms",
    "detailedSummary": {
      "whatHappened": "Affiliates indicated long-term preemption; Disney pulled the late-night show",
      "marketReaction": "Limited stock impact; ad-slot reshuffles and schedule changes",
      "who": "Disney; affiliates; FCC officials",
      "whyItMatters": "Highlights affiliate leverage and regulatory pressure on broadcast content",
      "magnitude": "Low/Medium — programming/advertising revenue considerations"
    },
    "modelAnalysis": {
      "keyFacts": [
        "Affiliates warned of indefinite preemption",
        "Behind-the-scenes decisioning at Disney",
        "Regulatory context cited"
      ],
      "sources": ["WSJ: Inside Disney’s Abrupt Decision to Suspend Jimmy Kimmel Live!"]
    },
    "houseViewContext": {
      "currentStance": "Linear TV headwinds persist; focus on DTC pivot",
      "comparison": "In-line with ongoing volatility in broadcast scheduling",
      "relevance": "Neutral for long-term thesis; operational noise"
    },
    "portfolioImpact": {
      "affectedAssets": ["Legacy Broadcast (−)", "Streaming (neutral)"],
      "overallImpact": "Minor to modest impact; advertising mix and schedule resets to watch",
      "preInterpretationNote": "Maintain focus on DTC KPIs; limited need for positioning changes."
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