import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AlertCard from '../components/AlertCard';
import { DRIFT_ALERTS } from '../data/mockData';
import { useToast } from '../components/Toast';
import { Bell, Filter, CheckCircle2, AlertTriangle } from 'lucide-react';

const AlertsPage = () => {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState(DRIFT_ALERTS);
  const [resolvedAlerts, setResolvedAlerts] = useState([
    {
      id: 'resolved-1',
      type: 'Resolved: Topic Mastery',
      topic: 'Variables',
      message: 'Class mastery reached 90% for Variables. Drift monitoring normalized.',
      severity: 'Low',
      time: '2 days ago'
    }
  ]);

  const handleMarkAllRead = () => {
    if (alerts.length === 0) {
      showToast("No new alerts to clear.", "info");
      return;
    }
    setResolvedAlerts([...alerts, ...resolvedAlerts]);
    setAlerts([]);
    showToast("All alerts marked as read.", "success");
  };

  const handleFilter = () => {
    showToast("Filter options coming soon!", "info");
  };

  const handleUpdateSetting = (setting: string) => {
    showToast(`Updating ${setting}...`, "info");
    setTimeout(() => {
      showToast(`${setting} updated successfully!`, "success");
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Navbar title="Drift Alerts & Notifications" />
        
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="w-6 h-6 text-indigo-400" />
              System Alerts
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleFilter}
                className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button 
                onClick={handleMarkAllRead}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                Unresolved Alerts ({alerts.length})
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="p-8 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">All caught up! No unresolved alerts.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Resolved Alerts ({resolvedAlerts.length})
              </h4>
              <div className="opacity-40 grayscale-[0.8] grid grid-cols-1 gap-4">
                {resolvedAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="mt-12 p-6 md:p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-sm">
            <h4 className="text-lg font-bold text-white mb-6">Alert Configuration</h4>
            <div className="space-y-6">
              {[
                { label: "Concept Drift Sensitivity", desc: "Threshold for flagging behavioral shifts", value: "85%" },
                { label: "Performance Drop Alert", desc: "Notify when accuracy drops below threshold", value: "20% drop" },
                { label: "Time Anomaly Detection", desc: "Flag solving times outside 2 standard deviations", value: "Enabled" }
              ].map((setting, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-sm">{setting.label}</p>
                    <p className="text-xs text-slate-500">{setting.desc}</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateSetting(setting.label)}
                    className="w-full sm:w-auto text-xs font-bold text-indigo-400 px-3 py-2 bg-indigo-950/50 rounded-lg hover:bg-indigo-900/50 transition-colors"
                  >
                    {setting.value}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertsPage;
