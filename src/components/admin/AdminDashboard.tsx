import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  BookOpen,
  CreditCard,
  DollarSign,
  Plus,
  CheckCircle2,
  TrendingUp,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { courses, batches } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'metrics' | 'courses' | 'payments'>('metrics');

  const paymentsLedger = [
    { id: 'tx_101', student: 'Aarav Sharma', plan: 'Class 10 Board Excellence Batch 2026', amount: '₹1,999', date: '2026-07-22', status: 'SUCCESS' },
    { id: 'tx_102', student: 'Priya Nambiar', plan: 'JEE Spark Foundation Batch', amount: '₹3,499', date: '2026-07-21', status: 'SUCCESS' },
    { id: 'tx_103', student: 'Rohan Mehta', plan: 'Class 10 Mathematics Course', amount: '₹999', date: '2026-07-20', status: 'SUCCESS' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-bold text-xs">
            System Administrator Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">Platform Overview</h1>
          <p className="text-purple-200 text-xs sm:text-sm">
            Managing students, faculties, courses, subscriptions, and security rules
          </p>
        </div>

        <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/20 backdrop-blur-md">
          <button
            onClick={() => setActiveAdminTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'metrics' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'courses' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300'
            }`}
          >
            Manage Courses
          </button>
          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'payments' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300'
            }`}
          >
            Payments
          </button>
        </div>
      </div>

      {activeAdminTab === 'metrics' && (
        <div className="space-y-6">
          {/* Key Admin Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Students</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">104,820</p>
              <span className="text-[10px] font-bold text-emerald-600">+12% this month</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Active Faculty</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">48 Teachers</p>
              <span className="text-[10px] font-bold text-blue-600">All Verified</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Batches</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{batches.length} Batches</p>
              <span className="text-[10px] font-bold text-purple-600">Classes 6 - 12</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Simulated Revenue</span>
              <p className="text-2xl font-black text-emerald-600">₹14.2 Lakhs</p>
              <span className="text-[10px] font-bold text-emerald-600">Gross Subscriptions</span>
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'courses' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Course Catalog Management</h2>
            <button
              onClick={() => alert('New Course Modal (Simulated)')}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Course
            </button>
          </div>

          <div className="space-y-3">
            {courses.map(c => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</h3>
                  <p className="text-slate-500">{c.subject} • {c.classLevel} • Instructor: {c.teacherName}</p>
                </div>
                <span className="font-bold text-emerald-600 text-sm">{c.isFree ? 'FREE' : `₹${c.price}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'payments' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Recent Payments Ledger</h2>

          <div className="space-y-2.5">
            {paymentsLedger.map(tx => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{tx.student}</p>
                  <p className="text-slate-500">{tx.plan} • Tx ID: {tx.id}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-600 text-sm">{tx.amount}</span>
                  <p className="text-[10px] text-emerald-600 font-bold">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
