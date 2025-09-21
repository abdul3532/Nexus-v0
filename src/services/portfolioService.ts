import { apiClient, API_ENDPOINTS } from '@/lib/api/config';

export type AssetType = 'stock' | 'bond' | 'crypto' | 'forex' | 'commodity' | 'etf' | 'other';

export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  assetType: AssetType;
  tags: string[];
  sector?: string;
  marketCap?: string;
}

export interface PortfolioAssetCreate {
  user_id: number;
  name: string;
  symbol: string;
  asset_type: AssetType;
  tags: string[];
}

export interface PortfolioAssetUpdate {
  name?: string;
  symbol?: string;
  tags?: string[];
}

// Map API response to our frontend PortfolioAsset format
const mapApiAssetToPortfolioAsset = (apiAsset: any): PortfolioAsset => {
  return {
    id: apiAsset.id.toString(),
    name: apiAsset.name,
    symbol: apiAsset.symbol,
    assetType: apiAsset.asset_type,
    tags: apiAsset.tags,
    sector: apiAsset.tags.find((tag: string) => 
      ['Technology', 'E-commerce', 'Automotive', 'Semiconductors', 'Finance', 'Healthcare'].includes(tag)
    ) || 'Other',
    marketCap: 'Unknown' // API doesn't provide this information
  };
};

// Convert our frontend format to API format for creating/updating
const mapPortfolioAssetToApiFormat = (asset: Partial<PortfolioAsset>, userId: number): PortfolioAssetCreate => {
  return {
    user_id: userId,
    name: asset.name || '',
    symbol: asset.symbol || '',
    asset_type: asset.assetType || 'stock',
    tags: asset.tags || [],
  };
};

export const portfolioService = {
  // Get all portfolio assets for a user
  getUserPortfolio: async (userId: number): Promise<PortfolioAsset[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.portfolio.userPortfolio(userId));
      return response.data.map(mapApiAssetToPortfolioAsset);
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
      throw error;
    }
  },
  
  // Get portfolio assets by tag
  getAssetsByTag: async (userId: number, tag: string): Promise<PortfolioAsset[]> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.portfolio.byTag(userId, tag));
      return response.data.map(mapApiAssetToPortfolioAsset);
    } catch (error) {
      console.error(`Error fetching assets with tag ${tag}:`, error);
      throw error;
    }
  },
  
  // Create a new portfolio asset
  createAsset: async (asset: Partial<PortfolioAsset>, userId: number): Promise<PortfolioAsset> => {
    try {
      const assetData = mapPortfolioAssetToApiFormat(asset, userId);
      const response = await apiClient.post(API_ENDPOINTS.portfolio.create, assetData);
      return mapApiAssetToPortfolioAsset(response.data);
    } catch (error) {
      console.error('Error creating portfolio asset:', error);
      throw error;
    }
  },
  
  // Update a portfolio asset
  updateAsset: async (assetId: string, assetUpdate: Partial<PortfolioAsset>): Promise<PortfolioAsset> => {
    try {
      // Convert to API format
      const updateData: PortfolioAssetUpdate = {
        name: assetUpdate.name,
        symbol: assetUpdate.symbol,
        tags: assetUpdate.tags,
      };
      
      const response = await apiClient.put(API_ENDPOINTS.portfolio.update(assetId), updateData);
      return mapApiAssetToPortfolioAsset(response.data);
    } catch (error) {
      console.error(`Error updating asset with ID ${assetId}:`, error);
      throw error;
    }
  },
  
  // Delete a portfolio asset
  deleteAsset: async (assetId: string): Promise<boolean> => {
    try {
      await apiClient.delete(API_ENDPOINTS.portfolio.delete(assetId));
      return true;
    } catch (error) {
      console.error(`Error deleting asset with ID ${assetId}:`, error);
      throw error;
    }
  },
  
  // Create a demo portfolio for a user
  createDemoPortfolio: async (userId: number): Promise<PortfolioAsset[]> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.portfolio.demo(userId));
      return response.data.map(mapApiAssetToPortfolioAsset);
    } catch (error) {
      console.error('Error creating demo portfolio:', error);
      throw error;
    }
  }
};

export default portfolioService;