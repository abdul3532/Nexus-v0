import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { FileText, Mic, Mail, Star, Download } from "lucide-react";
import reportService, { WeeklyAIReport } from "@/services/reportService";

const Content = () => {
  // State for loading indicators
  const [isWeeklySummaryLoading, setIsWeeklySummaryLoading] = useState(false);
  const [isTopStoriesLoading, setIsTopStoriesLoading] = useState(false);
  
  // State for report data
  const [weeklyReport, setWeeklyReport] = useState<WeeklyAIReport | null>(null);
  const [isTopStoriesGenerated, setIsTopStoriesGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  
  // Loading messages
  const loadingMessage = "Generating your weekly summary... This may take a moment.";
  const topStoriesLoadingMessage = "Generating your top stories PDF...";

  // Mock weekly content (will be replaced with API data)
  const weeklyContent = {
    summary: weeklyReport?.executive_summary || 
      "Markets this week were characterized by heightened volatility as investors digested mixed economic data. Tech stocks led gains, buoyed by positive earnings surprises from several industry leaders. The Federal Reserve's cautious tone on future rate cuts tempered market enthusiasm, though the overall sentiment remained optimistic. Inflation metrics came in slightly below expectations, providing some relief to bond markets. Energy stocks faced headwinds due to declining oil prices amid concerns about global demand. The banking sector showed resilience despite wider credit spreads. Analysts are closely watching upcoming economic indicators for signs of sustained growth momentum.",
    podcastTopics: weeklyReport ? 
      weeklyReport.key_trends.join("\n\n") + "\n\nOutlook: " + weeklyReport.outlook : 
      "1. Federal Reserve Policy Impact: Analyze what the Fed's latest statements mean for different asset classes\n\n2. Sector Rotation Analysis: Which sectors are gaining momentum and why\n\n3. AI Investment Thesis: Evaluate recent developments in AI and their market implications\n\n4. Global Market Divergence: Compare performance across major markets and identify opportunities\n\n5. Retail Investor Sentiment: Examine changing patterns in retail participation",
    newsletter: weeklyReport ? 
      `Market Summary: ${weeklyReport.executive_summary}\n\nKey Trends:\n` + 
      weeklyReport.key_trends.map(trend => `- ${trend}`).join("\n") + 
      `\n\nOutlook:\n${weeklyReport.outlook}` : 
      "SUBJECT LINE OPTIONS:\n- \"This Week's Market Winners and What's Next\"\n- \"Key Market Shifts You Need to Know About\"\n- \"Your Weekly Financial Intelligence Briefing\"\n\nINTRO SECTION:\nBrief market overview highlighting the most impactful events of the week.\n\nMARKET SPOTLIGHT:\nDeep dive into one key market development with actionable insights.\n\nPORTFOLIO CONSIDERATIONS:\nSpecific recommendations based on current market conditions.\n\nREADER QUESTION OF THE WEEK:\nAddress a common question from subscribers about current market conditions."
  };

  useEffect(() => {
    // If weekly report is successfully loaded, stop the loading indicator
    if (weeklyReport) {
      setIsWeeklySummaryLoading(false);
    }
  }, [weeklyReport]);

  const handleWeeklySummaryOpen = async () => {
    if (weeklyReport) {
      // If we already have the report, just show it without loading
      return;
    }
    
    console.log('Button clicked, starting loading'); // Debug log
    setIsWeeklySummaryLoading(true);
    
    try {
      // Generate the weekly report
      const report = await reportService.generateWeeklyReport();
      setWeeklyReport(report);
    } catch (error) {
      console.error('Error generating weekly report:', error);
      // Stop loading on error
      setIsWeeklySummaryLoading(false);
    }
  };

  const handleGenerateTopStories = async () => {
    console.log('Generate top stories clicked, starting loading');
    setIsTopStoriesLoading(true);
    
    try {
      // Get the PDF URL from the API
      const url = await reportService.getTopStoriesPdfUrl();
      setPdfUrl(url);
      setIsTopStoriesGenerated(true);
    } catch (error) {
      console.error('Error generating top stories PDF:', error);
    } finally {
      setIsTopStoriesLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!pdfUrl) {
      console.error('PDF URL is not available');
      return;
    }
    
    // Create a link to the PDF and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
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