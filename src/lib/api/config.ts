/**
 * API configuration for the Nexus application
 * Contains settings for base URL, authentication, and request handling
 */
import axios from 'axios';

// Base API URL - can be overridden with environment variables
// Vite uses import.meta.env instead of process.env
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Get the API key from environment variables
export const API_KEY = import.meta.env.VITE_FRONTEND_API_KEY;

// Authentication token storage key
const AUTH_TOKEN_KEY = 'nexus_auth_token';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    // Add API key to all requests
    if (API_KEY) {
      config.headers['X-API-Key'] = API_KEY;
    }
    
    // Add auth token if available
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common API response scenarios
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if needed
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // window.location.href = '/login'; // Uncomment when login page is available
    }
    
    // Add custom error handling here
    return Promise.reject(error);
  }
);

// Authentication helpers
export const authService = {
  setToken: (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  
  clearToken: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }
};

// API endpoints configuration
export const API_ENDPOINTS = {
//   auth: {
//     login: '/auth/login',
//     register: '/auth/register',
//     refreshToken: '/auth/refresh-token'
//   },
  news: {
    all: '/news',
    byId: (id: string) => `/news/${id}`,
    byCategory: (category: string) => `/news/category/${category}`,
    search: '/news/search',
    latest: '/news/latest'
  },
  portfolio: {
    userPortfolio: (userId: number) => `/portfolio/${userId}`,
    byTag: (userId: number, tag: string) => `/portfolio/${userId}/tag/${tag}`,
    create: '/portfolio',
    update: (assetId: string) => `/portfolio/${assetId}`,
    delete: (assetId: string) => `/portfolio/${assetId}`,
    demo: (userId: number) => `/portfolio/demo/${userId}`
  },
  reports: {
    weekly: '/reports/weekly'
  },
  sources: {
    all: '/sources',
    byId: (id: number) => `/sources/${id}`,
    byCodename: (codename: string) => `/sources/codename/${codename}`,
    create: '/sources',
    update: (sourceId: number) => `/sources/${sourceId}`,
    delete: (sourceId: number) => `/sources/${sourceId}`
  }
};

export default apiClient;