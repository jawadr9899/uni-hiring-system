import React from 'react';
import { LayoutDashboard, Briefcase, Users, LogOut } from 'lucide-react';
import { type Tab } from '@/types/types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'jobs', icon: Briefcase, label: 'Job Board' },
    { id: 'candidates', icon: Users, label: 'Candidates' },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full hidden md:flex flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="font-bold text-lg text-white tracking-tight">
          Faculty<span className="text-blue-500">Admin</span>
        </h1>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors w-full px-2">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;