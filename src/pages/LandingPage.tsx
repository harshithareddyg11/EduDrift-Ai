import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  BarChart3,
  Users2,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-900 selection:text-white">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">EduDrift AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">Methodology</a>
          <Link 
            to="/instructor" 
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
          >
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-900/50 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3 h-3" />
            Next-Gen Learning Analytics
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-8 text-white">
            Detect <span className="text-indigo-500">Concept Drift</span> Before It Happens.
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-lg">
            EduDrift AI analyzes student learning behavior DNA to identify shifts in understanding, providing real-time interventions for personalized education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/instructor" 
              className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/student" 
              className="px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-indigo-500/50 hover:bg-indigo-950/30 transition-all"
            >
              Student Demo
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="relative bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Drift Monitor</div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-900/50">
                  <Activity className="w-5 h-5 text-indigo-400 mb-2" />
                  <div className="text-2xl font-bold text-white">84.2%</div>
                  <div className="text-xs text-slate-500">Class Accuracy</div>
                </div>
                <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-900/50">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold text-white">+12%</div>
                  <div className="text-xs text-slate-500">Retention Rate</div>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 60 + 30}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-900/50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Engineered for Deep Insights</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our platform goes beyond simple grades, analyzing the underlying patterns of how students interact with complex concepts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Behavioral DNA",
                desc: "Track solving time, retry patterns, and navigation paths to build a unique learning profile for every student."
              },
              {
                icon: ShieldCheck,
                title: "Drift Detection",
                desc: "Identify when a student's mental model of a concept starts to deviate from the expected learning path."
              },
              {
                icon: Users2,
                title: "Class Heatmaps",
                desc: "Visualize topic mastery across your entire cohort to identify which subjects need more instructional focus."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl group">
                <div className="w-14 h-14 bg-indigo-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
