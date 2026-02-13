import { type LucideIcon } from 'lucide-react';

export type Tab = 'overview' | 'jobs' | 'candidates';

export interface StatMetric {
  title: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
  color: string;
}

export interface Job {
  id: number;
  title: string;
  dept: string;
  applicants: number;
  status: 'Active' | 'Closed';
}

export interface Candidate {
  id: number;
  name: string;
  role: string;
  status: 'Verified' | 'Pending';
}

// Data point for charts with color embedded
export interface ChartDataPoint {
  name: string;
  value: number;
  fill: string; // Color is now part of the data
}