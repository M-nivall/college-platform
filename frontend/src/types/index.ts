export interface Course {
  id: string;
  name: string;
  degree: string;
  duration: number;
  fees: number;
  seats: number | null;
  collegeId: string;
}

export interface Placement {
  id: string;
  year: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  collegeId: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  year: number;
  collegeId: string;
  createdAt: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  totalFees: number;
  type: string;
  established: number | null;
  imageUrl: string | null;
  description: string | null;
  website: string | null;
  naacGrade: string | null;
  nirfRank: number | null;
  totalSeats: number | null;
  courses: Course[];
  placements: Placement[];
  reviews?: Review[];
  _count?: { reviews: number };
}

export interface PaginatedResponse {
  data: College[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CompareMetricValue {
  collegeId: string;
  value: number | string | null;
  unit?: string;
  lowerIsBetter?: boolean;
}

export interface CompareMetric {
  key: string;
  label: string;
  values: CompareMetricValue[];
}

export interface CompareResult {
  colleges: College[];
  metrics: CompareMetric[];
}

export interface FilterOptions {
  states: string[];
  types: string[];
  courses: string[];
}
