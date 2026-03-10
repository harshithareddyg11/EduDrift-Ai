import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HeatmapGrid from '../components/HeatmapGrid';
import { HEATMAP_DATA } from '../data/mockData';
import { useToast } from '../components/Toast';
import { Grid3X3, Info, Download, Filter } from 'lucide-react';

const HeatmapPage = () => {
  const { showToast } = useToast();

  const handleExport = () => {
    showToast("Generating heatmap report...", "info");
    setTimeout(() => {
      showToast("Heatmap exported successfully!", "success");
    }, 1200);
  };

  const handleFilter = () => {
    showToast("Topic filtering coming soon!", "info");
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Navbar title="Concept Mastery Heatmap" />
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Grid3X3 className="w-6 h-6 text-indigo-400" />
                Class-wide Performance Matrix
              </h3>
              <p className="text-slate-500 mt-1">Visualizing mastery levels across all topics for the current cohort.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={handleFilter}
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                All Topics
              </button>
              <button 
                onClick={handleExport}
                className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-2xl flex items-start gap-4">
            <div className="mt-1">
              <Info className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-sm text-indigo-200 leading-relaxed">
              <p className="font-bold mb-1">How to read this heatmap:</p>
              Each cell represents a student's mastery percentage in a specific topic. 
              <span className="font-bold text-red-400"> Red cells</span> indicate potential concept drift or significant learning gaps that may require immediate intervention.
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-800 shadow-sm overflow-x-auto">
            <div className="min-w-[600px]">
              <HeatmapGrid data={HEATMAP_DATA} />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Highest Mastery Topic</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Variables</span>
                <span className="text-emerald-400 font-bold">92% Avg</span>
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Lowest Mastery Topic</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Recursion</span>
                <span className="text-red-400 font-bold">48% Avg</span>
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Drift Sensitivity</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">High</span>
                <span className="text-indigo-400 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeatmapPage;
