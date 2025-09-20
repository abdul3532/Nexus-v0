import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { FileText, Mic, Mail, Star } from "lucide-react";

const Content = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Weekly Summary
              </CardTitle>
              <CardDescription>
                AI-powered weekly market overview and key insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">This week's highlights:</p>
                <p className="text-sm line-clamp-3">
                  {weeklyContent.summary.substring(0, 150)}...
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">View Full Summary</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Weekly Market Summary</DialogTitle>
                    <DialogDescription>
                      Comprehensive analysis of this week's market movements and economic indicators
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.summary}</pre>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Podcast Topics */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Podcast Topics
              </CardTitle>
              <CardDescription>
                Discussion points and topics for your next podcast episode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Episode structure preview:</p>
                <p className="text-sm line-clamp-3">
                  5 segments planned including Fed policy discussion, sector analysis, and guest interview...
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">View Episode Structure</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Podcast Episode Structure</DialogTitle>
                    <DialogDescription>
                      Detailed breakdown of topics and timing for your next episode
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.podcastTopics}</pre>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Newsletter Content */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Newsletter Content
              </CardTitle>
              <CardDescription>
                Ready-to-use content for your financial newsletter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Newsletter preview:</p>
                <p className="text-sm line-clamp-3">
                  Subject: Market Volatility & Strategic Opportunities - Comprehensive market analysis with sector insights and stock picks...
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">View Full Newsletter</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Newsletter Content</DialogTitle>
                    <DialogDescription>
                      Complete newsletter ready for distribution to subscribers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{weeklyContent.newsletter}</pre>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Biggest Stories */}
          <Card className="h-fit">
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
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Top stories:</p>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Fed Rate Decision:</strong> Central bank maintains current rates amid inflation concerns</li>
                  <li>• <strong>Tech Earnings:</strong> Mixed results from major technology companies</li>
                  <li>• <strong>Oil Prices:</strong> Crude oil surges on supply chain disruptions</li>
                  <li>• <strong>Bank Stress Tests:</strong> Major banks pass regulatory stress tests</li>
                  <li>• <strong>Merger Activity:</strong> Healthcare sector sees increased M&A activity</li>
                </ul>
              </div>
              <Button className="w-full">Update Stories</Button>
            </CardContent>
          </Card>
        </div>

        {/* Archive Section */}
        <Card>
          <CardHeader>
            <CardTitle>Content Archive</CardTitle>
            <CardDescription>
              Access previous weeks' content and build upon existing stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                Week of Dec 9-15, 2024
              </Button>
              <Button variant="outline" className="justify-start">
                Week of Dec 2-8, 2024
              </Button>
              <Button variant="outline" className="justify-start">
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