import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TrendChart from '../components/TrendChart';
import AlertCard from '../components/AlertCard';
import { useToast } from '../components/Toast';
import { ACCURACY_TREND, TIME_TREND, DRIFT_ALERTS } from '../data/mockData';
import { 
  Target, 
  Clock, 
  RotateCcw, 
  BrainCircuit, 
  TrendingUp, 
  Bell, 
  Lightbulb,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const { showToast } = useToast();

  const handleInterventionClick = (title: string) => {
    showToast(`Starting intervention: ${title}`, "info");
    setTimeout(() => {
      showToast("Practice session loaded. Good luck!", "success");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Navbar title="Student Performance Dashboard" />
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-950/50 rounded-xl text-indigo-400">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mastery Score</span>
              </div>
              <div className="text-3xl font-bold text-white">78%</div>
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <TrendingUp className="w-3 h-3" />
                +5.2% from last week
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-950/50 rounded-xl text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Avg. Solve Time</span>
              </div>
              <div className="text-3xl font-bold text-white">54s</div>
              <div className="mt-2 text-xs text-slate-500">Optimal range: 40s - 60s</div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-950/50 rounded-xl text-amber-400">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Retry Count</span>
              </div>
              <div className="text-3xl font-bold text-white">1.4</div>
              <div className="mt-2 text-xs text-slate-500">Attempts per question</div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-950/50 rounded-xl text-purple-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Concept Drift</span>
              </div>
              <div className="text-3xl font-bold text-white">Stable</div>
              <div className="mt-2 text-xs text-emerald-400 font-bold">No anomalies detected</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-lg font-bold text-white">Accuracy Trend</h3>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    Actual
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 border-t-2 border-dashed border-red-400" />
                    Target
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <TrendChart type="line" data={ACCURACY_TREND} />
              </div>
            </div>

            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-lg font-bold text-white">Solving Time per Question</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Last 8 Questions</span>
              </div>
              <div className="h-[300px]">
                <TrendChart type="bar" data={TIME_TREND} />
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interventions */}
            <div className="lg:col-span-2 bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Recommended Interventions
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Review Recursion Base Cases", desc: "Your solve time spikes on recursive problems. Reviewing base cases could help.", type: "critical" },
                  { title: "Practice Loop Invariants", desc: "Minor accuracy drop in complex loops. Try 3 practice problems today.", type: "suggested" },
                  { title: "Advanced Data Structures", desc: "You've mastered basic arrays. Ready for Linked Lists?", type: "next-step" }
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleInterventionClick(item.title)}
                    className="w-full flex items-start text-left gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
                  >
                    <div className={`mt-1 p-1.5 rounded-lg flex-shrink-0 ${
                      item.type === 'critical' ? 'bg-red-950 text-red-400' : 
                      item.type === 'suggested' ? 'bg-amber-950 text-amber-400' : 
                      'bg-emerald-950 text-emerald-400'
                    }`}>
                      {item.type === 'critical' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                Recent Alerts
              </h3>
              <div className="space-y-4">
                {DRIFT_ALERTS.slice(0, 2).map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
