import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  Bell,
  GraduationCap,
  ChevronDown,
  UserCheck,
  Shield,
  BookOpen
} from 'lucide-react';
import { ClassLevel } from '../../types';
import { CLASSES_LIST } from '../../data/initialData';

export const Header: React.FC<{
  onOpenNotifications: () => void;
}> = ({ onOpenNotifications }) => {
  const {
    currentUser,
    updateUserClass,
    activeRole,
    setActiveRole,
    setIsSearchOpen,
    notifications,
    setActiveTab
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Class Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                  AuraEd
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Modern Coaching Platform
              </p>
            </div>
          </button>

          {/* Class Level Dropdown Pill */}
          <div className="relative group ml-2">
            <select
              value={currentUser.selectedClass || 'Class 10'}
              onChange={e => updateUserClass(e.target.value as ClassLevel)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none cursor-pointer transition-all"
            >
              {CLASSES_LIST.map(cls => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Global Search Trigger (Desktop/Tablet) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-xs hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors w-64 lg:w-80"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="flex-1 text-left font-medium">Search courses, chapters, notes...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 rounded text-slate-500 border border-slate-200 dark:border-slate-700 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Right Section: Mobile Search, Notifications, Role Switcher, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                setActiveRole('student');
                setActiveTab('home');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'student'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Student</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('teacher');
                setActiveTab('teacher-dashboard');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Educator</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('admin');
                setActiveTab('admin-dashboard');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Admin</span>
            </button>
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-blue-500/30 hover:ring-blue-500 transition-all cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
