import React, { useMemo } from 'react';
import { FileDebtScore } from '../types';
import { FolderOpen } from 'lucide-react';

interface Props {
  files: FileDebtScore[];
}

type FileNode = FileDebtScore & { fileName: string };

const HeatMap: React.FC<Props> = ({ files }) => {
  // Group files by directory
  const fileTree = useMemo(() => {
    const tree: Record<string, FileNode[]> = {};
    
    files.forEach(file => {
      const parts = file.file.split('/');
      const fileName = parts.pop()!;
      // Get the immediate parent folder, or 'root'
      const dirPath = parts.length > 0 ? parts.join('/') : 'root';
      
      if (!tree[dirPath]) {
        tree[dirPath] = [];
      }
      
      tree[dirPath].push({ ...file, fileName });
    });
    
    return tree;
  }, [files]);

  const getColorForStatus = (status: string, score: number) => {
    switch (status) {
      case 'critical': 
        // Gradient based on score severity within critical
        return score > 80 ? 'bg-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-rose-500/80';
      case 'warning': return 'bg-amber-500/80';
      default: return 'bg-emerald-500/40 border border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
          <FolderOpen size={20} className="text-indigo-400" />
          System Map
        </h3>
        <div className="flex gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Good</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Warning</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Critical</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.entries(fileTree) as [string, FileNode[]][]).map(([dir, dirFiles]) => (
          <div key={dir} className="bg-surface/30 border border-border rounded-lg p-4 transition hover:border-zinc-700">
            <h4 className="text-xs font-mono text-zinc-500 mb-3 truncate w-full" title={dir}>
              {dir === 'root' ? './' : dir}
            </h4>
            
            <div className="flex flex-wrap gap-1.5">
              {dirFiles.map((file) => (
                <div
                  key={file.file}
                  className={`
                    relative group w-8 h-8 rounded-md cursor-pointer transition-transform hover:scale-110
                    ${getColorForStatus(file.status, file.score)}
                  `}
                >
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 min-w-[200px]">
                    <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-3 shadow-xl">
                      <div className="font-bold text-zinc-100 mb-1 border-b border-zinc-800 pb-1">{file.fileName}</div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <span className="text-zinc-500">Score:</span>
                        <span className={file.score > 60 ? 'text-rose-400' : 'text-emerald-400'}>{file.score}/100</span>
                        
                        <span className="text-zinc-500">Complexity:</span>
                        <span>{file.complexity}</span>
                        
                        <span className="text-zinc-500">Size:</span>
                        <span>{file.size} LOC</span>

                         {file.duplication && (
                            <span className="col-span-2 text-amber-500 mt-1 text-[10px] uppercase font-bold tracking-wider">
                              Duplication Detected
                            </span>
                         )}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="w-2 h-2 bg-zinc-900 border-r border-b border-zinc-800 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;