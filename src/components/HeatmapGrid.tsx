import React from 'react';
import { TOPICS } from '../data/mockData';

interface HeatmapGridProps {
  data: {
    studentName: string;
    scores: number[];
  }[];
}

const HeatmapGrid = ({ data }: HeatmapGridProps) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-400';
    return 'bg-red-500';
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] gap-2 mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student</div>
          {TOPICS.map(topic => (
            <div key={topic} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center truncate px-1">
              {topic}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {data.map((row, i) => (
            <div key={i} className="grid grid-cols-[200px_repeat(7,1fr)] gap-2 items-center">
              <div className="text-sm font-medium text-slate-700 truncate pr-4">{row.studentName}</div>
              {row.scores.map((score, j) => (
                <div 
                  key={j} 
                  className={`heatmap-cell ${getColor(score)} group relative`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                    {TOPICS[j]}: {score}%
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-6 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-xs text-slate-500 font-medium">Strong (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-amber-400" />
            <span className="text-xs text-slate-500 font-medium">Moderate (50-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-xs text-slate-500 font-medium">Weak (0-49%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapGrid;
