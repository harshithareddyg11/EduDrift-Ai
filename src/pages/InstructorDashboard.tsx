import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StudentCard from '../components/StudentCard';
import AlertCard from '../components/AlertCard';
import { MOCK_STUDENTS, DRIFT_ALERTS } from '../data/mockData';
import { useToast } from '../components/Toast';
import { 
  Users, 
  AlertCircle, 
  TrendingDown, 
  Filter,
  Download,
  Plus,
  BrainCircuit,
  X
} from 'lucide-react';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    risk: 'Low',
    accuracy: 0,
    avgTime: '0s'
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (students.length + 1).toString();
    setStudents([...students, { ...newStudent, id, drift: false }]);
    setIsModalOpen(false);
    setNewStudent({ name: '', risk: 'Low', accuracy: 0, avgTime: '0s' });
    showToast(`Student ${newStudent.name} added successfully!`);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    showToast("Starting AI Batch Analysis...", "info");
    setTimeout(() => {
      setIsAnalyzing(false);
      showToast("Analysis complete! 3 new drift patterns detected.", "success");
    }, 2000);
  };

  const handleExport = () => {
    showToast("Preparing CSV export...", "info");
    setTimeout(() => {
      showToast("Class report exported successfully!", "success");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Navbar title="Instructor Overview" />
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    U{i}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                  +{students.length - 4 > 0 ? students.length - 4 : 0}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{students.length} Active Students</p>
                <p className="text-xs text-slate-500">Class: CS101 - Intro to Programming</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => showToast("Filter options coming soon!", "info")}
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button 
                onClick={handleExport}
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Critical Drift Alerts
              </h3>
              <button 
                onClick={() => navigate('/alerts')}
                className="text-xs font-bold text-indigo-400 hover:underline"
              >
                View All Alerts
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DRIFT_ALERTS.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Students Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Student Performance & Risk
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Sort by: 
                <select 
                  onChange={(e) => showToast(`Sorting by ${e.target.value}`, "info")}
                  className="bg-transparent border-none text-white font-bold outline-none cursor-pointer"
                >
                  <option>Risk Level</option>
                  <option>Accuracy</option>
                  <option>Name</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {students.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>

          {/* Class Trends */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Topics with Highest Drift
              </h3>
              <div className="space-y-6">
                {[
                  { topic: "Recursion", drift: 24, status: "increasing" },
                  { topic: "Pointers", drift: 18, status: "stable" },
                  { topic: "Memory Management", drift: 15, status: "decreasing" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.drift}% of students affected</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'increasing' ? 'bg-red-900/50 text-red-400' : 
                      item.status === 'stable' ? 'bg-amber-900/50 text-amber-400' : 
                      'bg-emerald-900/50 text-emerald-400'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-indigo-950/50 rounded-2xl flex items-center justify-center mb-4">
                <BrainCircuit className={`w-8 h-8 text-indigo-400 ${isAnalyzing ? 'animate-pulse' : ''}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Intervention Engine</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-xs">Generate personalized study plans for at-risk students based on detected drift patterns.</p>
              <button 
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className={`w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Batch Analysis'}
              </button>
            </div>
          </div>
        </div>

        {/* Add Student Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Add New Student</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddStudent} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Accuracy (%)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="100"
                      value={newStudent.accuracy}
                      onChange={(e) => setNewStudent({...newStudent, accuracy: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Time</label>
                    <input 
                      required
                      type="text" 
                      value={newStudent.avgTime}
                      onChange={(e) => setNewStudent({...newStudent, avgTime: e.target.value})}
                      placeholder="e.g. 45s"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Risk Level</label>
                  <select 
                    value={newStudent.risk}
                    onChange={(e) => setNewStudent({...newStudent, risk: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  >
                    <option value="Low">Low Risk</option>
                    <option value="Medium">Medium Risk</option>
                    <option value="High">High Risk</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Create Student Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;
