import React, { useState, useMemo } from 'react';
import { FileDebtScore } from '../types';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, FileCode, Filter } from 'lucide-react';

interface Props {
  files: FileDebtScore[];
}

type SortField = 'score' | 'complexity' | 'size' | 'file';
type SortDirection = 'asc' | 'desc';

const FileExplorer: React.FC<Props> = ({ files }) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'warning' | 'good'>('all');

  const filteredAndSortedFiles = useMemo(() => {
    return files
      .filter(f => {
        const matchesSearch = f.file.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        
        // Numeric comparison
        return sortDirection === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
  }, [files, search, sortField, sortDirection, statusFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-zinc-600" />;
    return sortDirection === 'asc' ? <ArrowUp size={14} className="text-indigo-400" /> : <ArrowDown size={14} className="text-indigo-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2 self-start sm:self-center">
          <FileCode size={20} className="text-indigo-400" />
          File Explorer
        </h3>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500/50"
          >
            <option value="all">All Status</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="good">Good</option>
          </select>
        </div>
      </div>

      <div className="bg-surface/30 border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/50 text-zinc-500 font-medium border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('file')}>
                  <div className="flex items-center gap-2">File Path <SortIcon field="file" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-300 transition-colors text-right" onClick={() => handleSort('score')}>
                  <div className="flex items-center justify-end gap-2">Debt Score <SortIcon field="score" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-300 transition-colors text-right" onClick={() => handleSort('complexity')}>
                  <div className="flex items-center justify-end gap-2">Complexity <SortIcon field="complexity" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-300 transition-colors text-right" onClick={() => handleSort('size')}>
                  <div className="flex items-center justify-end gap-2">LOC <SortIcon field="size" /></div>
                </th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredAndSortedFiles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    No files found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredAndSortedFiles.map((file) => (
                  <tr key={file.file} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-4 py-3 font-mono text-zinc-400 group-hover:text-zinc-200">
                      {file.file}
                      {file.duplication && (
                         <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20" title="Code Duplication Detected">
                           DUP
                         </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${file.score > 70 ? 'text-rose-400' : file.score > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {file.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-400">{file.complexity}</td>
                    <td className="px-4 py-3 text-right text-zinc-400">{file.size}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`
                          inline-block w-2 h-2 rounded-full
                          ${file.status === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 
                            file.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}
                        `}></span>
                        <span className="capitalize text-zinc-400 hidden sm:inline">{file.status}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-zinc-800/50 bg-zinc-900/30 text-xs text-zinc-500 flex justify-between">
           <span>Showing {filteredAndSortedFiles.length} of {files.length} files</span>
           <span>Sorted by {sortField} ({sortDirection})</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;