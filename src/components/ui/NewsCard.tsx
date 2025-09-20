import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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

interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <div
      onClick={() => onClick(news)}
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
              {news.assetTags.slice(0, 1).map((tag, index) => (
                <span 
                  key={tag} 
                  className={`px-2 py-1 rounded-sm font-medium ${
                    news.impact === "positive"
                      ? "bg-financial-positive-bg border border-financial-positive/20 text-financial-positive-foreground"
                      : news.impact === "negative"
                      ? "bg-financial-negative-bg border border-financial-negative/20 text-financial-negative-foreground"
                      : "bg-financial-neutral border border-border text-muted-foreground"
                  }`}
                >
                  {tag}
                </span>
              ))}
              {news.assetTags.length > 1 && (
                <span 
                  className={`px-2 py-1 rounded-sm font-medium ${
                    news.impact === "positive"
                      ? "bg-financial-positive-bg border border-financial-positive/20 text-financial-positive-foreground"
                      : news.impact === "negative"
                      ? "bg-financial-negative-bg border border-financial-negative/20 text-financial-negative-foreground"
                      : "bg-financial-neutral border border-border text-muted-foreground"
                  }`}
                >
                  +{news.assetTags.length - 1}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};