export interface DebtOverview {
  totalFiles: number;
  debtRatio: number; // TDR: 0-100%
  estimatedHours: number;
  estimatedCost: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface FileDebtScore {
  file: string;
  score: number; // 0-100
  complexity: number;
  size: number;
  duplication: boolean;
  changeFrequency?: number;
  status: 'good' | 'warning' | 'critical';
}

export interface Recommendation {
  file: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedHours: number;
  impact: string;
}

export interface TrendData {
  date: string;
  debtRatio: number;
}

export interface TechnicalDebtReport {
  overview: DebtOverview;
  files: FileDebtScore[];
  recommendations: Recommendation[];
  trends?: TrendData[];
}