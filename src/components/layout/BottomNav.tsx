import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  BookOpen,
  Users,
  HelpCircle,
  Award,
  User
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeRole } = useApp();

  if (activeRole !== 'student') return null;

  const navItems = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'my-learning', label: 'My Learning', icon: BookOpen },
    { id: 'batches', label: 'Batches', icon: Users },
    { id: 'tests', label: 'Tests', icon: Award },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg transition-colors">
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // Insert FAB for Ask Doubt in center slot
          if (idx === 2) {
            return (
              <React.Fragment key="center_fab_group">
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                    isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-[10px] mt-0.5">{item.label}</span>
                </button>

                {/* FAB: Ask Doubt */}
                <button
                  key="fab_doubt"
                  onClick={() => setActiveTab('doubts')}
                  className="flex flex-col items-center justify-center -mt-6 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-3 shadow-lg shadow-blue-500/30 ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-all"
                  aria-label="Ask Doubt"
                >
                  <HelpCircle className="w-6 h-6" />
                </button>
              </React.Fragment>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
