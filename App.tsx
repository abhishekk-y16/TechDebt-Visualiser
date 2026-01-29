import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full text-center">
             <h2 className="text-2xl font-bold mb-4 text-rose-500">Something went wrong</h2>
             <p className="text-zinc-400 mb-6">The application encountered a critical error. This usually happens due to a rendering issue.</p>
             <button 
                onClick={() => window.location.reload()}
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
             >
                Reload Application
             </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <ErrorBoundary>
      {view === 'landing' ? (
        <LandingPage onEnter={() => setView('Dashboard')} />
      ) : (
        <DashboardView onBack={() => setView('Landing')} />
      )}
    </ErrorBoundary>
  );
}

export default App;
