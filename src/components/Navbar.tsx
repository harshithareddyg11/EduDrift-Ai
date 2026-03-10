import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ title }: { title: string }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search student or topic..." 
            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm w-64 text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>
        
        <button className="relative p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-100">Dr. Sarah Smith</p>
            <p className="text-xs text-slate-500">Senior Instructor</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
