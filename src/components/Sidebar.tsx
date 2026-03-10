import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Grid3X3, 
  Bell, 
  BrainCircuit,
  Home,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Landing', path: '/' },
    { icon: LayoutDashboard, label: 'Student DB', path: '/student' },
    { icon: Users, label: 'Instructor DB', path: '/instructor' },
    { icon: Grid3X3, label: 'Heatmap', path: '/heatmap' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] p-4 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-[55] w-64 bg-slate-950 border-r border-slate-900 text-white h-screen flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">EduDrift AI</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-900">
          <div className="bg-slate-900 rounded-xl p-4">
            <p className="text-xs text-slate-600 uppercase font-bold tracking-wider mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-400">AI Engine Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
