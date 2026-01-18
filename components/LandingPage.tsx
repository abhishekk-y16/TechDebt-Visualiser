import React from 'react';
import { Activity, ArrowRight, BarChart2, Shield, Zap, Layout, Terminal } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

const LandingPage: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="bg-background min-h-screen text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
               <Activity size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TechDebt<span className="text-zinc-500 font-normal">Visualizer</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button 
            onClick={onEnter}
            className="bg-zinc-100 hover:bg-white text-black px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
          >
            Launch Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 Now Available
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Stop Guessing Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Technical Debt
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
              Visualize code complexity, track maintenance costs, and prioritize refactoring with our advanced static analysis dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onEnter}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                Start Analyzing <ArrowRight size={18} />
              </button>
              <button className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-8 py-4 rounded-lg font-semibold transition-all">
                <Terminal size={18} />
                Install CLI
              </button>
            </div>
            <div className="pt-8 flex items-center gap-4 text-sm text-zinc-500">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] text-white">
                      User
                   </div>
                 ))}
              </div>
              <p>Trusted by 2,000+ developers</p>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative rounded-xl overflow-hidden border border-zinc-700 shadow-2xl bg-zinc-900 aspect-video group">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                alt="Dashboard Preview" 
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              
              {/* Floating UI Elements Mockup */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg shadow-lg flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-rose-500/20 rounded-md">
                      <Activity className="text-rose-500" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">Critical Issues</div>
                      <div className="text-lg font-bold">12 Files Found</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-zinc-400">Est. Cost</div>
                    <div className="text-lg font-bold text-indigo-400">$6,200</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Turn Spaghetti Code into Structured Success</h2>
            <p className="text-zinc-400">Our platform integrates directly with your CI/CD pipeline to provide real-time insights into your codebase health.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart2,
                title: "Visual Heatmaps",
                desc: "Instantly spot hot spots in your architecture with our interactive file-system heatmaps.",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
              },
              {
                icon: Shield,
                title: "Risk Assessment",
                desc: "Calculate the financial risk of your technical debt based on complexity and churn rate.",
                img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
              },
              {
                icon: Zap,
                title: "Automated Refactoring",
                desc: "Get AI-powered recommendations on where to start refactoring for maximum impact.",
                img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>
                   <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-50" />
                </div>
                <div className="p-6 relative z-20 -mt-12">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 mb-4 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="relative rounded-xl border border-zinc-800 bg-black/50 overflow-hidden">
                <div className="absolute top-0 w-full h-10 bg-zinc-900/80 border-b border-zinc-800 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <div className="p-8 pt-16 font-mono text-sm space-y-2 text-zinc-400">
                   <p><span className="text-emerald-400">➜</span> <span className="text-indigo-400">~</span> npx techdebt-viz analyze ./src</p>
                   <p className="text-zinc-500">Scanning 42 files...</p>
                   <p className="text-zinc-500">Calculating cyclomatic complexity...</p>
                   <p className="text-zinc-500">Estimating remediation costs...</p>
                   <br />
                   <p><span className="text-emerald-500">✔ Report generated:</span> <span className="underline">./report.json</span></p>
                   <p className="text-zinc-300">Debt Ratio: <span className="text-rose-500 font-bold">18.5%</span> (Critical)</p>
                </div>
             </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold">Seamless CLI Integration</h2>
            <p className="text-zinc-400 text-lg">
              Don't change your workflow. Run our lightweight CLI tool locally or in your CI pipeline to generate JSON reports, then drop them into the visualizer.
            </p>
            <ul className="space-y-4">
              {['Works with TypeScript, JavaScript, Python', 'Local processing - code never leaves your machine', 'Export to PDF, JSON, or HTML'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Layout size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10">Ready to tackle your Technical Debt?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">Join thousands of engineering teams who are shipping faster by maintaining cleaner codebases.</p>
          
          <button 
            onClick={onEnter}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors relative z-10"
          >
            Launch Interactive Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Activity size={18} className="text-indigo-500" />
             <span className="font-bold text-zinc-300">TechDebt<span className="text-zinc-600 font-normal">Visualizer</span></span>
          </div>
          <div className="text-zinc-600 text-sm">
            © 2024 TechDebt Visualizer. Open Source MIT License.
          </div>
          <div className="flex gap-6 text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;