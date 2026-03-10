import React from 'react';
import { User, TrendingUp, Clock, Target, AlertTriangle } from 'lucide-react';
import { useToast } from './Toast';

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    risk: string;
    accuracy: number;
    avgTime: string;
    drift: boolean;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { showToast } = useToast();

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-900/50';
      case 'medium': return 'text-amber-400 bg-amber-900/20 border-amber-900/50';
      default: return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50';
    }
  };

  const handleViewProfile = () => {
    showToast(`Opening profile for ${student.name}...`, "info");
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-black/40 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-900/50 group-hover:text-indigo-400 transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">{student.name}</h3>
            <p className="text-xs text-slate-500">ID: EDU-{student.id}042</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(student.risk)}`}>
          {student.risk} Risk
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Target className="w-3 h-3" />
            Accuracy
          </div>
          <p className="text-lg font-bold text-slate-100">{student.accuracy}%</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            Avg. Time
          </div>
          <p className="text-lg font-bold text-slate-100">{student.avgTime}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {student.drift && (
            <div className="flex items-center gap-1 text-red-400 text-[10px] font-bold uppercase">
              <AlertTriangle className="w-3 h-3" />
              Drift Detected
            </div>
          )}
        </div>
        <button 
          onClick={handleViewProfile}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
