import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { FileDebtScore, TrendData } from '../types';

interface DebtDistributionProps {
  files: FileDebtScore[];
}

export const DebtDistributionChart: React.FC<DebtDistributionProps> = ({ files }) => {
  const data = [
    { name: 'Good', value: files.filter(f => f.status === 'good').length, color: '#10b981' },
    { name: 'Warning', value: files.filter(f => f.status === 'warning').length, color: '#f59e0b' },
    { name: 'Critical', value: files.filter(f => f.status === 'critical').length, color: '#f43f5e' },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fill: '#a1a1aa', fontSize: 12 }} 
            width={60}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{fill: '#27272a'}}
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface TrendChartProps {
  data?: TrendData[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  if (!data || data.length === 0) return <div className="text-zinc-500 text-sm p-4">No trend data available</div>;

  return (
     <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#71717a', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            tick={{ fill: '#71717a', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="debtRatio" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={{ fill: '#18181b', stroke: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#818cf8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};