import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { FileText, Mic, Mail, Star, Download } from "lucide-react";

const Content = () => {
  const [isWeeklySummaryLoading, setIsWeeklySummaryLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isTopStoriesLoading, setIsTopStoriesLoading] = useState(false);
  const [isTopStoriesGenerated, setIsTopStoriesGenerated] = useState(false);
  const [topStoriesLoadingMessage, setTopStoriesLoadingMessage] = useState('');
  
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

  useEffect(() => {
    if (isTopStoriesLoading) {
      console.log('Top stories loading started');
      
      // First message
      setTopStoriesLoadingMessage('Fetching market data...');
      
      const timer1 = setTimeout(() => {
        setTopStoriesLoadingMessage('Analyzing trending stories...');
      }, 5000);
      
      const timer2 = setTimeout(() => {
        setTopStoriesLoadingMessage('Generating insights...');
      }, 15000);
      
      const timer3 = setTimeout(() => {
        setTopStoriesLoadingMessage('Finalizing report...');
      }, 25000);
      
      const timer4 = setTimeout(() => {
        console.log('Top stories loading completed');
        setIsTopStoriesLoading(false);
        setIsTopStoriesGenerated(true);
        setTopStoriesLoadingMessage('');
      }, 30000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isTopStoriesLoading]);

  const handleWeeklySummaryOpen = () => {
    console.log('Button clicked, starting loading'); // Debug log
    setIsWeeklySummaryLoading(true);
  };

  const handleGenerateTopStories = () => {
    console.log('Generate top stories clicked, starting loading');
    setIsTopStoriesLoading(true);
  };

  const handleDownloadPDF = () => {
    // Create a link to the PDF and trigger download
    const link = document.createElement('a');
    link.href = '/assets/biggest_stories_of_the_week.pdf';
    link.download = 'biggest_stories_of_the_week.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                Biggest Stories of the Week
              </CardTitle>
              <CardDescription>
                Top financial news stories with key takeaways
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-grow space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Top stories:</p>
                  <ul className="space-y-3 text-sm">
                    <li>• <strong>Meta AI Glasses:</strong> Meta launched smart glasses with AI translation and spatial audio; adoption hurdles remain</li>
                    <li>• <strong>Microsoft Earnings:</strong> Strong Q4 cloud and AI revenue beat lifted tech stocks</li>
                    <li>• <strong>Rate Cut Bets:</strong> Markets expect faster Fed cuts than policymakers project, boosting equities</li>
                    <li>• <strong>H-1B Visa Fees:</strong> Plan for $100k H-1B fee and $1m 'gold card' draws tech backlash</li>
                    <li>• <strong>Disney Pulls Kimmel:</strong> Affiliates' pushback forces abrupt suspension of late-night show</li>
                    <li>• <strong>Powell Caution:</strong> Fed Chair warns inflation risks remain, tempering cut expectations</li>
                    <li>• <strong>Equities at Highs:</strong> Global stocks hit records as risk-on flows tighten credit spreads</li>
                    <li>• <strong>Robinhood Startup Fund:</strong> New retail vehicle offers access to unlisted start-ups, raising risk concerns</li>
                  </ul>
                </div>
              </div>
              <div className="mb-24 pt-4">
                {isTopStoriesLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm font-medium text-center">{topStoriesLoadingMessage}</p>
                  </div>
                ) : isTopStoriesGenerated ? (
                  <Button 
                    onClick={handleDownloadPDF}
                    className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300"
                  >
                    <Download className="mr-2h-4 w-4" /> Download Top Stories PDF
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGenerateTopStories}
                    className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300"
                  >
                    Generate Top Stories
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Three Stacked Cards */}
          <div className="space-y-4">
            {/* Weekly Summary */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
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
                Week of Sept 1-7, 2025
              </Button>
              <Button variant="outline" className="justify-start bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
                Week of Sept 8-14, 2025
              </Button>
              <Button variant="outline" className="justify-start bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-white/90 hover:dark:bg-black/80 hover:shadow-md transition-all duration-300">
                Week of Sept 15-21, 2025
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Content;