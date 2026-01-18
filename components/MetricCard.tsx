import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'default' | 'danger' | 'warning' | 'success' | 'primary';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  subValue, 
  icon: Icon,
  color = 'default' 
}) => {
  
  const colorMap = {
    default: 'text-zinc-100 border-zinc-800',
    danger: 'text-rose-500 border-rose-900/30 bg-rose-950/10',
    warning: 'text-amber-500 border-amber-900/30 bg-amber-950/10',
    success: 'text-emerald-500 border-emerald-900/30 bg-emerald-950/10',
    primary: 'text-indigo-500 border-indigo-900/30 bg-indigo-950/10'
  };

  const iconColorMap = {
    default: 'text-zinc-400',
    danger: 'text-rose-500',
    warning: 'text-amber-500',
    success: 'text-emerald-500',
    primary: 'text-indigo-500'
  };

  return (
    <div className={`p-5 rounded-xl border bg-surface/50 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold mt-2 tracking-tight">{value}</h3>
          {subValue && (
            <p className="text-xs text-zinc-400 mt-1 font-medium">{subValue}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-surfaceHighlight/50 ${iconColorMap[color]}`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;