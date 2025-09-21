/**
 * News Service - Handles all news-related API interactions
 * Uses centralized API configuration for consistent error handling and authentication
 */

import { apiClient, API_ENDPOINTS } from '@/lib/api/config';

// NewsItem interface used throughout the application
export interface NewsItem {
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

// Function to map API news data to local NewsItem format
export function mapApiNewsToNewsItem(apiNews: any): NewsItem {
  return {
    id: apiNews.id,
    category: apiNews.category,
    title: apiNews.title,
    summary: apiNews.summary,
    impact: apiNews.impact,
    impactScore: apiNews.impact_score,
    sentiment: apiNews.sentiment,
    date: apiNews.date,
    time: apiNews.time,
    source: apiNews.source,
    confidence: apiNews.confidence,
    affectedCompanies: apiNews.affected_companies,
    assetTags: apiNews.asset_tags,
    latency: apiNews.latency,
    detailedSummary: {
      whatHappened: apiNews.detailed_summary.what_happened,
      marketReaction: apiNews.detailed_summary.market_reaction,
      who: apiNews.detailed_summary.who,
      whyItMatters: apiNews.detailed_summary.why_it_matters,
      magnitude: apiNews.detailed_summary.magnitude,
    },
    modelAnalysis: {
      keyFacts: apiNews.model_analysis.key_facts,
      sources: apiNews.model_analysis.sources,
    },
    houseViewContext: {
      currentStance: apiNews.house_view_context.current_stance,
      comparison: apiNews.house_view_context.comparison,
      relevance: apiNews.house_view_context.relevance,
    },
    portfolioImpact: {
      affectedAssets: apiNews.portfolio_impact.affected_assets,
      overallImpact: apiNews.portfolio_impact.overall_impact,
      preInterpretationNote: apiNews.portfolio_impact.pre_interpretation_note,
    },
  };
}

// Get all news with pagination
export async function getAllNews(limit = 10, offset = 0) {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.news.all}?limit=${limit}&offset=${offset}`);
    return {
      items: response.data.items.map(mapApiNewsToNewsItem),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

// Get a specific news item by ID
export async function getNewsById(newsId: string) {
  try {
    const response = await apiClient.get(API_ENDPOINTS.news.byId(newsId));
    return mapApiNewsToNewsItem(response.data);
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw error;
  }
}

// Get news by category with pagination
export async function getNewsByCategory(category: string, limit = 10, offset = 0) {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.news.byCategory(category)}?limit=${limit}&offset=${offset}`);
    return {
      items: response.data.items.map(mapApiNewsToNewsItem),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
}

// Search news by query string with pagination
export async function searchNews(query: string, limit = 10, offset = 0) {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.news.search}/?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`);
    return {
      items: response.data.items.map(mapApiNewsToNewsItem),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}

// Get latest news with a limited count
export async function getLatestNews(limit = 5) {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.news.latest}/?limit=${limit}`);
    return response.data.map(mapApiNewsToNewsItem);
  } catch (error) {
    console.error('Error fetching latest news:', error);
    throw error;
  }
}

// Export all functions as a single service object
const newsService = {
  getAllNews,
  getNewsById,
  getNewsByCategory,
  searchNews,
  getLatestNews,
  mapApiNewsToNewsItem
};

export default newsService;