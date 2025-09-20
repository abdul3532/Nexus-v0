import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { FileText, Mic, Mail, Star } from "lucide-react";

const Content = () => {
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
                <ul className="space-y-2 text-sm">
                  <li>• Market volatility increased due to Fed policy uncertainty</li>
                  <li>• Tech stocks showed mixed performance</li>
                  <li>• Energy sector outperformed amid geopolitical tensions</li>
                  <li>• Bond yields reached new monthly highs</li>
                </ul>
              </div>
              <Button className="w-full">Generate New Summary</Button>
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
                <p className="text-sm text-muted-foreground mb-2">Suggested topics:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Impact of AI on traditional finance roles</li>
                  <li>• Cryptocurrency regulation updates</li>
                  <li>• ESG investing trends in 2024</li>
                  <li>• Small-cap vs large-cap performance analysis</li>
                  <li>• Interview: Portfolio diversification strategies</li>
                </ul>
              </div>
              <Button className="w-full">Generate New Topics</Button>
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
                <p className="text-sm text-muted-foreground mb-2">This week's newsletter draft:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold">Market Spotlight</h4>
                    <p>Markets showed resilience despite ongoing concerns...</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Stock Pick of the Week</h4>
                    <p>Technology sector leader with strong fundamentals...</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Economic Calendar</h4>
                    <p>Key events to watch in the coming week...</p>
                  </div>
                </div>
              </div>
              <Button className="w-full">Generate Newsletter</Button>
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