import React, { useState, useEffect } from 'react';
import { TechnicalDebtReport } from '../types';
import { MOCK_REPORT } from '../constants';
import MetricCard from './MetricCard';
import HeatMap from './HeatMap';
import Recommendations from './Recommendations';
import FileExplorer from './FileExplorer';
import { DebtDistributionChart, TrendChart } from './Charts';
import { 
  Upload, 
  Activity, 
  DollarSign, 
  Clock, 
  AlertOctagon, 
  Github,
  ArrowLeft,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const DashboardView: React.FC<Props> = ({ onBack }) => {
  const [report, setReport] = useState<TechnicalDebtReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setReport(MOCK_REPORT);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setError(null);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Validation
        if (json.overview && json.files) {
          setReport(json);
        } else {
          setError("Invalid report format. Please upload a valid JSON report.");
        }
      } catch (err) {
        setError("Failed to parse JSON file. Please check the file content.");
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Error reading file.");
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-zinc-500 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="animate-pulse">Analyzing Codebase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-indigo-500/30 flex flex-col">
      
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 -ml-2 hover:bg-zinc-800 rounded-full transition-colors group">
                <ArrowLeft size={20} className="text-zinc-400 group-hover:text-white" />
             </button>
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
               <Activity size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white hidden sm:block">TechDebt<span className="text-zinc-500 font-normal">Visualizer</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <div className="relative group">
               <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                accept=".json"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-sm font-medium transition cursor-pointer"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Import JSON</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 relative"
        onDragEnter={handleDrag}
      >
        {/* Error Notification */}
        {error && (
          <div className="absolute top-6 left-6 right-6 z-50 flex justify-center pointer-events-none">
             <div className="bg-rose-950/90 border border-rose-500/50 text-rose-200 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 pointer-events-auto animate-in slide-in-from-top-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="ml-2 hover:text-white">
                   <XCircle size={18} />
                </button>
             </div>
          </div>
        )}

        {/* Drag Overlay */}
        {dragActive && (
          <div 
            className="fixed inset-0 bg-indigo-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center border-8 border-indigo-500 border-dashed m-4 rounded-3xl"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={64} className="text-white mb-4 animate-bounce" />
            <div className="text-3xl font-bold text-white pointer-events-none">Drop JSON Report Here</div>
            <p className="text-indigo-200 mt-2">Release to analyze</p>
          </div>
        )}

        {!report ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-zinc-700">No Data Loaded</h2>
            <p className="text-zinc-500 mt-2">Upload a report or run the CLI tool to generate one.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                label="Debt Ratio" 
                value={`${report.overview.debtRatio}%`}
                subValue={report.overview.debtRatio < 5 ? 'Healthy' : report.overview.debtRatio > 20 ? 'Critical' : 'Moderate'}
                icon={Activity}
                color={report.overview.debtRatio > 20 ? 'danger' : report.overview.debtRatio > 10 ? 'warning' : 'success'}
              />
              <MetricCard 
                label="Est. Cost" 
                value={`$${report.overview.estimatedCost.toLocaleString()}`}
                subValue="Remediation"
                icon={DollarSign}
                color="default"
              />
              <MetricCard 
                label="Fix Time" 
                value={`${report.overview.estimatedHours}h`}
                subValue="Developer Hours"
                icon={Clock}
                color="default"
              />
              <MetricCard 
                label="Severity" 
                value={report.overview.severity.toUpperCase()}
                subValue={`${report.overview.totalFiles} Files Scanned`}
                icon={AlertOctagon}
                color={report.overview.severity === 'critical' ? 'danger' : report.overview.severity === 'high' ? 'warning' : 'primary'}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-surface/50 border border-border rounded-xl p-6 hover:border-zinc-700 transition-colors">
                 <h3 className="text-lg font-medium text-zinc-100 mb-6">Technical Debt Trend</h3>
                 <TrendChart data={report.trends} />
              </div>
              <div className="bg-surface/50 border border-border rounded-xl p-6 hover:border-zinc-700 transition-colors">
                 <h3 className="text-lg font-medium text-zinc-100 mb-6">File Status Distribution</h3>
                 <DebtDistributionChart files={report.files} />
              </div>
            </div>

            {/* Heatmap Section */}
            <div className="bg-surface/50 border border-border rounded-xl p-6 hover:border-zinc-700 transition-colors">
               <HeatMap files={report.files} />
            </div>

            {/* Recommendations Section */}
            <div className="bg-surface/50 border border-border rounded-xl p-6 hover:border-zinc-700 transition-colors">
               <Recommendations items={report.recommendations} />
            </div>

            {/* File Explorer Section */}
            <div className="bg-surface/50 border border-border rounded-xl p-6 hover:border-zinc-700 transition-colors">
               <FileExplorer files={report.files} />
            </div>

          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-6 mt-8 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-zinc-500">
           <p>Analysis generated by TechDebt CLI v2.0</p>
           <p className="mt-1">Local processing only - your code never leaves the browser.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardView;