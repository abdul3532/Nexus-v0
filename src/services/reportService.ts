import { apiClient, API_ENDPOINTS } from '@/lib/api/config';

// Types based on the Pydantic schemas
export interface WeeklyReportNewsItem {
  id: number;
  title: string;
  summary?: string;
  url: string;
  published_at: string;
  impact_prediction: 'positive' | 'negative' | 'neutral';
  categories: string[];
}

export interface MarketImpactSummary {
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  overall_sentiment: string;
  key_factors: string[];
}

export interface CategoryInsight {
  category: string;
  news_count: number;
  impact_summary: string;
}

export interface WeeklyAIReport {
  report_date: string;
  week_start: string;
  week_end: string;
  report_title: string;
  executive_summary: string;
  market_impact: MarketImpactSummary;
  top_news: WeeklyReportNewsItem[];
  category_insights: CategoryInsight[];
  key_trends: string[];
  outlook: string;
}

export interface WeeklyReportRequest {
  start_date?: string;
  end_date?: string;
  max_news_items?: number;
  categories_of_interest?: string[];
}

// Service for reports API
export const reportService = {
  /**
   * Generate a weekly AI report
   * @param request Optional parameters for the report generation
   * @returns Promise with the generated report
   */
  generateWeeklyReport: async (request: WeeklyReportRequest = {}): Promise<WeeklyAIReport> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.reports.weekly, request);
      return response.data;
    } catch (error) {
      console.error('Error generating weekly report:', error);
      throw error;
    }
  },

  /**
   * Get PDF URL for top stories
   * This would typically be a separate API endpoint, but for now we'll mock it
   * @returns Promise with the PDF URL
   */
  getTopStoriesPdfUrl: async (): Promise<string> => {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll just return the static PDF path
      return '/assets/biggest_stories_of_the_week.pdf';
    } catch (error) {
      console.error('Error getting top stories PDF URL:', error);
      throw error;
    }
  }
};

export default reportService;