import React from 'react';
import { AlertTriangle, Info, AlertCircle, Clock } from 'lucide-react';

interface AlertCardProps {
  alert: {
    id: string;
    type: string;
    topic: string;
    message: string;
    severity: string;
    time: string;
  };
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getSeverityStyles = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-950/30',
          border: 'border-red-900/50',
          text: 'text-red-400',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          badge: 'bg-red-900/50 text-red-400'
        };
      case 'medium':
        return {
          bg: 'bg-amber-950/30',
          border: 'border-amber-900/50',
          text: 'text-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          badge: 'bg-amber-900/50 text-amber-400'
        };
      default:
        return {
          bg: 'bg-blue-950/30',
          border: 'border-blue-900/50',
          text: 'text-blue-400',
          icon: <Info className="w-5 h-5 text-blue-500" />,
          badge: 'bg-blue-900/50 text-blue-400'
        };
    }
  };

  const styles = getSeverityStyles(alert.severity);

  return (
    <div className={`p-4 rounded-2xl border ${styles.bg} ${styles.border} transition-all hover:shadow-lg hover:shadow-black/20`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">{styles.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-bold text-sm ${styles.text}`}>{alert.type}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${styles.badge}`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-sm text-slate-300 mb-3 leading-relaxed">
            {alert.message}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {alert.time}
            </div>
            <div className="font-medium text-slate-400">
              Topic: {alert.topic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
