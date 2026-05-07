import axios from 'axios';
import type { PaginatedResponse, College, CompareResult, FilterOptions } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
});

export interface CollegeQueryParams {
  search?: string;
  location?: string;
  type?: string;
  course?: string;
  minFees?: number;
  maxFees?: number;
  sortBy?: 'rating' | 'totalFees' | 'nirfRank' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const collegeApi = {
  getColleges: async (params: CollegeQueryParams = {}): Promise<PaginatedResponse> => {
    const { data } = await api.get('/colleges', { params });
    return data;
  },

  getCollege: async (id: string): Promise<College> => {
    const { data } = await api.get(`/colleges/${id}`);
    return data;
  },

  getFilters: async (): Promise<FilterOptions> => {
    const { data } = await api.get('/colleges/filters');
    return data;
  },

  compareColleges: async (ids: string[]): Promise<CompareResult> => {
    const { data } = await api.get('/compare', { params: { ids: ids.join(',') } });
    return data;
  },
};
