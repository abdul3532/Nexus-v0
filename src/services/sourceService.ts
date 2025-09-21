/**
 * Source Service - Handles all news source-related API interactions
 * Uses centralized API configuration for consistent error handling and authentication
 */

import { apiClient, API_ENDPOINTS } from '@/lib/api/config';

// Source interfaces based on the Pydantic schemas
export interface SourceBase {
  codename: string;
  name: string;
  website: string;
}

export interface SourceCreate extends SourceBase {
  // Same as SourceBase, just for semantic clarity
}

export interface SourceUpdate {
  codename?: string;
  name?: string;
  website?: string;
}

export interface SourceModel extends SourceBase {
  id: number;
}

// Function to handle API source data mapping if needed
function mapApiSourceToSourceModel(apiSource: any): SourceModel {
  return {
    id: apiSource.id,
    codename: apiSource.codename,
    name: apiSource.name,
    website: apiSource.website
  };
}

// Get all sources with optional pagination
export async function getAllSources(skip = 0, limit = 100) {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.sources.all}?skip=${skip}&limit=${limit}`);
    return {
      items: response.data.map(mapApiSourceToSourceModel),
      total: response.data.length // API might not return total count, fallback to length
    };
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
}

// Get a specific source by ID
export async function getSourceById(sourceId: number) {
  try {
    const response = await apiClient.get(API_ENDPOINTS.sources.byId(sourceId));
    return mapApiSourceToSourceModel(response.data);
  } catch (error) {
    console.error('Error fetching source by ID:', error);
    throw error;
  }
}

// Get a specific source by codename
export async function getSourceByCodename(codename: string) {
  try {
    const response = await apiClient.get(API_ENDPOINTS.sources.byCodename(codename));
    return mapApiSourceToSourceModel(response.data);
  } catch (error) {
    console.error('Error fetching source by codename:', error);
    throw error;
  }
}

// Create a new source
export async function createSource(sourceData: SourceCreate) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.sources.create, sourceData);
    return mapApiSourceToSourceModel(response.data);
  } catch (error) {
    console.error('Error creating source:', error);
    throw error;
  }
}

// Update an existing source
export async function updateSource(sourceId: number, sourceData: SourceUpdate) {
  try {
    const response = await apiClient.put(API_ENDPOINTS.sources.update(sourceId), sourceData);
    return mapApiSourceToSourceModel(response.data);
  } catch (error) {
    console.error('Error updating source:', error);
    throw error;
  }
}

// Delete a source
export async function deleteSource(sourceId: number) {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.sources.delete(sourceId));
    return response.data;
  } catch (error) {
    console.error('Error deleting source:', error);
    throw error;
  }
}

// Export all functions as a single service object
const sourceService = {
  getAllSources,
  getSourceById,
  getSourceByCodename,
  createSource,
  updateSource,
  deleteSource
};

export default sourceService;