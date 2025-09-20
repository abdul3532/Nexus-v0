import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { FileText, Mic, Mail, Star } from "lucide-react";

const Content = () => {
  const [isWeeklySummaryLoading, setIsWeeklySummaryLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [weeklyContent, setWeeklyContent] = useState({
    summary: `The financial markets experienced significant volatility this week as investors grappled with mixed economic signals. The Federal Reserve's latest policy statements suggested a more cautious approach to future rate adjustments, leading to increased uncertainty across major indices.

Key Market Movements:
• S&P 500 closed down 2.3% for the week
• Technology sector led declines with a 4.1% drop
• Energy stocks bucked the trend, gaining 3.8%
• Treasury yields fluctuated between 4.2% and 4.6%

Economic Indicators:
• Inflation data came in slightly above expectations at 3.2%
• Unemployment claims decreased to 210,000
• Consumer confidence index rose to 112.5
• Manufacturing PMI contracted to 48.9

Looking ahead, investors will be closely watching earnings reports from major financial institutions and upcoming economic data releases that could provide clearer direction for monetary policy decisions.`,
    
    podcastTopics: `1. Federal Reserve Policy Uncertainty (15 mins)
   - Discuss the recent Fed communications
   - Impact on different asset classes
   - Historical context and comparisons

2. Technology Sector Rotation (12 mins)
   - Why tech stocks are underperforming
   - Opportunities in other sectors
   - Valuation concerns and growth prospects

3. Energy Sector Outperformance (10 mins)
   - Geopolitical factors driving oil prices
   - Renewable vs traditional energy investments
   - Long-term sustainability considerations

4. Interview Segment: Portfolio Diversification (20 mins)
   - Guest: Senior Portfolio Manager
   - Discussion on asset allocation strategies
   - Risk management in volatile markets

5. Q&A Segment (8 mins)
   - Listener questions about market timing
   - Investment strategy adjustments
   - Economic recession indicators`,

    newsletter: `Subject: Market Volatility & Strategic Opportunities - Weekly Update

Dear Subscribers,

This week brought renewed volatility to financial markets, presenting both challenges and opportunities for astute investors.

MARKET SPOTLIGHT
The broad market selloff was primarily driven by uncertainty surrounding Federal Reserve policy. However, this creates potential entry points for quality companies trading at attractive valuations.

SECTOR ANALYSIS
• Technology: Oversold conditions may present buying opportunities
• Energy: Continued strength supported by supply constraints
• Healthcare: Defensive characteristics becoming more attractive
• Financials: Positioned to benefit from higher interest rates

STOCK PICK OF THE WEEK: Energy Infrastructure
We're highlighting midstream energy companies with stable cash flows and attractive dividend yields. These assets typically perform well during periods of commodity price volatility.

ECONOMIC CALENDAR AHEAD
• Tuesday: Consumer Price Index (CPI) data
• Wednesday: Federal Reserve minutes release
• Thursday: Initial jobless claims
• Friday: University of Michigan consumer sentiment

PORTFOLIO STRATEGY
In this environment, we recommend:
1. Maintaining diversified allocations
2. Focusing on quality companies with strong balance sheets
3. Considering defensive sectors for stability
4. Keeping some cash available for opportunities

Best regards,
The Investment Team`
  });

  useEffect(() => {
    if (isWeeklySummaryLoading) {
      console.log('Loading started'); // Debug log
      // First message: "fetching data from sources"
      setLoadingMessage('fetching data from sources');
      
      const timer1 = setTimeout(() => {
        console.log('Switching to analyzing message'); // Debug log
        // Second message: "Analyzing it ..."
        setLoadingMessage('Analyzing it ...');
      }, 2500);

      const timer2 = setTimeout(() => {
        console.log('Loading completed'); // Debug log
        // Stop loading after 5 seconds total
        setIsWeeklySummaryLoading(false);
        setLoadingMessage('');
      }, 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isWeeklySummaryLoading]);

  const handleWeeklySummaryOpen = () => {
    console.log('Button clicked, starting loading'); // Debug log
    setIsWeeklySummaryLoading(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Content Hub</h1>
          <p className="text-xl text-muted-foreground">
            Generate and manage your weekly content across all channels
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
          {/* Left Panel - Biggest Stories */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Biggest Stories of the Week
              </CardTitle>
              <CardDescription>
                Top financial news stories with key takeaways
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg h-full">
                <p className="text-sm text-muted-foreground mb-2">Top stories:</p>
                <ul className="space-y-3 text-sm">
                  <li>• <strong>Fed Rate Decision:</strong> Central bank maintains current rates amid inflation concerns, signaling cautious approach to future monetary policy</li>
                  <li>• <strong>Tech Earnings Beat:</strong> Major technology companies report stronger than expected quarterly results, driving market optimism</li>
                  <li>• <strong>Oil Price Surge:</strong> Crude oil jumps 8% following geopolitical tensions and supply chain disruptions in key producing regions</li>
                  <li>• <strong>Bank Stress Tests:</strong> All major financial institutions pass regulatory stress tests with comfortable capital buffers</li>
                  <li>• <strong>Healthcare M&A Wave:</strong> Pharmaceutical sector sees $50B in merger announcements as companies consolidate for R&D efficiency</li>
                  <li>• <strong>Renewable Energy Breakthrough:</strong> New solar technology promises 40% efficiency gains, potentially reshaping energy sector valuations</li>
                  <li>• <strong>Inflation Data Mixed:</strong> Core CPI shows moderation while services inflation remains sticky, complicating Fed policy outlook</li>
                  <li>• <strong>China Trade Update:</strong> New bilateral trade agreements signed, reducing tariff barriers for select industries</li>
                </ul>
              </div>
              <div className="flex flex-row justify-end h-full w-full">
                <Button className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">Generate Top Stories</Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Three Stacked Cards */}
          <div className="space-y-4">
            {/* Weekly Summary */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-4 w-4" />
                  Weekly Summary
                </CardTitle>
                <CardDescription className="text-xs">
                  AI-powered weekly market overview and key insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">This week's highlights:</p>
                  <p className="text-xs line-clamp-2">
                    {weeklyContent.summary.substring(0, 120)}...
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300" onClick={handleWeeklySummaryOpen}>Generate Full Summary</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Weekly Market Summary</DialogTitle>
                      <DialogDescription>
                        Comprehensive analysis of this week's market movements and economic indicators
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      {isWeeklySummaryLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          <p className="text-lg font-medium">{loadingMessage}</p>
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.summary}</pre>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Podcast Suggestions */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mic className="h-4 w-4" />
                  Podcast Suggestions
                </CardTitle>
                <CardDescription className="text-xs">
                  AI-generated topics and discussion points for your podcast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Suggested episode structure:</p>
                  <p className="text-xs line-clamp-2">
                    5 engaging segments including Fed policy deep-dive, sector rotation analysis, and expert interview...
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">Generate Episode Suggestions</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Podcast Episode Suggestions</DialogTitle>
                      <DialogDescription>
                        Curated topics, talking points, and structure recommendations for your next episode
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.podcastTopics}</pre>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Newsletter Suggestions */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-4 w-4" />
                  Newsletter Suggestions
                </CardTitle>
                <CardDescription className="text-xs">
                  Content recommendations and templates for your newsletter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Newsletter template preview:</p>
                  <p className="text-xs line-clamp-2">
                    Subject line suggestions, market spotlight recommendations, and subscriber engagement strategies...
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild >
                    <Button size="sm" className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">Generate Newsletter Suggestions</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Newsletter Content Suggestions</DialogTitle>
                      <DialogDescription>
                        Template recommendations and content strategies for maximum subscriber engagement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.newsletter}</pre>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Archive Section - Full Width Bottom */}
        <Card>
          <CardHeader>
            <CardTitle>Content Archive</CardTitle>
            <CardDescription>
              Access previous weeks' content and build upon existing stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
                Week of Dec 9-15, 2024
              </Button>
              <Button variant="outline" className="justify-start bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
                Week of Dec 2-8, 2024
              </Button>
              <Button variant="outline" className="justify-start bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
                Week of Nov 25-Dec 1, 2024
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Content;