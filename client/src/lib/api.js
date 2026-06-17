import axios from 'axios';
import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Standardize error format
    const customError = {
      message: 'An unexpected error occurred',
      status: error.response?.status || 500,
      originalError: error,
    };

    if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    } else if (error.message) {
      customError.message = error.message;
    }

    return Promise.reject(customError);
  }
);

export default api;
