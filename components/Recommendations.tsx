import React from 'react';
import { Recommendation } from '../types';
import { AlertTriangle, Clock, Hammer } from 'lucide-react';

interface Props {
  items: Recommendation[];
}

const Recommendations: React.FC<Props> = ({ items }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-rose-500 bg-rose-950/5';
      case 'medium': return 'border-l-amber-500 bg-amber-950/5';
      default: return 'border-l-indigo-500 bg-indigo-950/5';
    }
  };

  const getBadgeStyles = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
        <Hammer size={20} className="text-indigo-400" />
        Action Plan
      </h3>
      
      <div className="grid gap-3">
        {items.map((rec, index) => (
          <div 
            key={index}
            className={`
              relative flex flex-col md:flex-row md:items-center justify-between gap-4 
              p-4 rounded-r-lg border border-border border-l-4 transition-all hover:bg-surfaceHighlight/30
              ${getPriorityStyles(rec.priority)}
            `}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${getBadgeStyles(rec.priority)}`}>
                  {rec.priority} Priority
                </span>
                <code className="text-sm font-mono text-zinc-300 truncate bg-black/20 px-1.5 py-0.5 rounded">
                  {rec.file}
                </code>
              </div>
              <p className="text-zinc-400 text-sm mt-1">{rec.reason}</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-500 shrink-0 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-6 mt-2 md:mt-0">
               <div className="flex items-center gap-1.5" title="Estimated time to fix">
                  <Clock size={16} />
                  <span>{rec.estimatedHours}h</span>
               </div>
               <div className="flex items-center gap-1.5 text-zinc-400 max-w-[200px] hidden lg:flex">
                  <AlertTriangle size={16} />
                  <span className="truncate" title={rec.impact}>{rec.impact}</span>
               </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
            No active recommendations. Great job!
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;