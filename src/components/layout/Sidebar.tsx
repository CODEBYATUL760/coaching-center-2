import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  LayoutDashboard,
  BookOpen,
  Users,
  Radio,
  FileText,
  Award,
  HelpCircle,
  MessageSquare,
  BarChart3,
  User,
  PlusCircle,
  ShieldAlert,
  CreditCard,
  Flame
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeRole, currentUser } = useApp();

  interface NavItem {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<any>;
    badge?: string;
  }

  const studentNavItems: NavItem[] = [
    { id: 'home', label: 'Explore Courses', icon: Compass },
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'my-learning', label: 'My Learning', icon: BookOpen },
    { id: 'batches', label: 'Batches & Live', icon: Users },
    { id: 'live', label: 'Live Stream', icon: Radio, badge: 'LIVE' },
    { id: 'materials', label: 'Study Material', icon: FileText },
    { id: 'tests', label: 'Quizzes & Tests', icon: Award },
    { id: 'doubts', label: 'Ask Doubts', icon: HelpCircle },
    { id: 'classroom', label: 'Classroom Feed', icon: MessageSquare },
    { id: 'analytics', label: 'Performance', icon: BarChart3 },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  const teacherNavItems: NavItem[] = [
    { id: 'teacher-dashboard', label: 'Educator Overview', icon: LayoutDashboard },
    { id: 'teacher-content', label: 'Course & Content Manager', icon: PlusCircle },
    { id: 'teacher-doubts', label: 'Student Doubts Queue', icon: HelpCircle },
    { id: 'teacher-feed', label: 'Classroom Feed Publisher', icon: MessageSquare }
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin-dashboard', label: 'Admin Metrics', icon: LayoutDashboard },
    { id: 'admin-users', label: 'Manage Users & Teachers', icon: Users },
    { id: 'admin-courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'admin-payments', label: 'Payments & Revenue', icon: CreditCard }
  ];

  const navItems =
    activeRole === 'teacher'
      ? teacherNavItems
      : activeRole === 'admin'
      ? adminNavItems
      : studentNavItems;

  return (
    <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 transition-colors">
      {/* Streak Widget for Students */}
      {activeRole === 'student' && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Flame className="w-5 h-5 fill-white animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {currentUser.streakDays} Day Study Streak!
              </p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">
                {currentUser.totalXP} XP Earned
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Role Title Banner */}
      <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>{activeRole} Mode</span>
        {activeRole !== 'student' && (
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs lg:text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-rose-500 text-white animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-4 mt-auto border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 text-center">
        <p className="font-semibold text-slate-600 dark:text-slate-400">AuraEd Digital Academy</p>
        <p className="text-[10px]">v2.4 • Mobile-First Platform</p>
      </div>
    </aside>
  );
};
