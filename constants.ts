import { TechnicalDebtReport } from './types';

export const MOCK_REPORT: TechnicalDebtReport = {
  overview: {
    totalFiles: 42,
    debtRatio: 18.5,
    estimatedHours: 124,
    estimatedCost: 6200,
    severity: 'medium',
  },
  files: [
    {
      file: "src/legacy/ProcessHandler.ts",
      score: 85,
      complexity: 24,
      size: 850,
      duplication: true,
      changeFrequency: 15,
      status: "critical"
    },
    {
      file: "src/utils/DateFormatter.ts",
      score: 12,
      complexity: 3,
      size: 45,
      duplication: false,
      status: "good"
    },
    {
      file: "src/components/ComplexGrid.tsx",
      score: 65,
      complexity: 18,
      size: 320,
      duplication: false,
      changeFrequency: 22,
      status: "critical"
    },
    {
      file: "src/api/Middleware.ts",
      score: 45,
      complexity: 12,
      size: 150,
      duplication: true,
      status: "warning"
    },
    {
      file: "src/auth/LoginController.ts",
      score: 55,
      complexity: 14,
      size: 200,
      duplication: false,
      status: "warning"
    },
    {
      file: "src/shared/Types.ts",
      score: 5,
      complexity: 0,
      size: 120,
      duplication: false,
      status: "good"
    },
    {
      file: "src/legacy/OldParser.js",
      score: 92,
      complexity: 45,
      size: 1200,
      duplication: true,
      status: "critical"
    },
    {
      file: "src/views/Dashboard.tsx",
      score: 25,
      complexity: 8,
      size: 180,
      duplication: false,
      status: "good"
    },
     {
      file: "src/views/Settings.tsx",
      score: 35,
      complexity: 11,
      size: 210,
      duplication: false,
      status: "warning"
    }
  ],
  recommendations: [
    {
      file: "src/legacy/OldParser.js",
      priority: "high",
      reason: "Extreme cyclomatic complexity (45) and high file size.",
      estimatedHours: 16,
      impact: "Critical core module, refactoring will reduce regression bugs."
    },
    {
      file: "src/legacy/ProcessHandler.ts",
      priority: "high",
      reason: "High duplication detected with src/api/Handler.ts",
      estimatedHours: 8,
      impact: "Improve maintainability and reduce bundle size."
    },
    {
      file: "src/components/ComplexGrid.tsx",
      priority: "medium",
      reason: "Component is too large (>300 lines) and complex.",
      estimatedHours: 6,
      impact: "Easier to test if split into sub-components."
    }
  ],
  trends: [
    { date: '2023-10-01', debtRatio: 22 },
    { date: '2023-10-15', debtRatio: 21 },
    { date: '2023-11-01', debtRatio: 20 },
    { date: '2023-11-15', debtRatio: 18.5 },
  ]
};