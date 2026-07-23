import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Flame,
  Award,
  Trophy,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'leaderboard'>('analytics');

  const subjectData = [
    { subject: 'Physics', accuracy: 92, completed: 85 },
    { subject: 'Mathematics', accuracy: 88, completed: 78 },
    { subject: 'Chemistry', accuracy: 90, completed: 90 },
    { subject: 'Biology', accuracy: 94, completed: 82 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Siddharth Patel', xp: 4850, class: 'Class 10', streak: 28, badge: '🥇 Top Ranker' },
    { rank: 2, name: 'Aarav Sharma (You)', xp: 3450, class: 'Class 10', streak: 14, badge: '🥈 Master Scholar' },
    { rank: 3, name: 'Ananya Roy', xp: 3200, class: 'Class 10', streak: 12, badge: '🥉 Star Performer' },
    { rank: 4, name: 'Kavya Nair', xp: 2950, class: 'Class 10', streak: 10, badge: 'Top 5%' },
    { rank: 5, name: 'Rohan Joshi', xp: 2800, class: 'Class 10', streak: 9, badge: 'Top 5%' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" /> Performance & Learning Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Track subject accuracy, study hours, streak badges, and class rankings
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            My Analytics
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leaderboard' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <div className="space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 text-amber-500">
                <Flame className="w-5 h-5 fill-amber-500" />
                <span className="text-xs font-bold uppercase text-slate-400">Study Streak</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.streakDays} Days</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 text-blue-500">
                <Zap className="w-5 h-5 fill-blue-500" />
                <span className="text-xs font-bold uppercase text-slate-400">Total XP</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.totalXP}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 text-emerald-500">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs font-bold uppercase text-slate-400">Avg Accuracy</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">91%</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-2 text-purple-500">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase text-slate-400">Badges</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{currentUser.badges.length}</p>
            </div>
          </div>

          {/* Subject Performance Graph */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Subject Wise Accuracy & Course Progress (%)
            </h2>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="accuracy" fill="#10b981" radius={[6, 6, 0, 0]} name="Accuracy %" />
                  <Bar dataKey="completed" fill="#6366f1" radius={[6, 6, 0, 0]} name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earned Badges Grid */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Unlocked Merit Badges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentUser.badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between ${badge.color}`}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 shrink-0" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{badge.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">Unlocked {badge.unlockedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LEADERBOARD TAB */
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Class 10 Overall Merit Ranking
            </h2>
            <span className="text-xs font-bold text-slate-400">Updated Weekly</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map(student => (
              <div
                key={student.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm transition-all ${
                  student.name.includes('(You)')
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 font-bold'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    student.rank === 1 ? 'bg-amber-400 text-slate-950' : student.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-amber-700 text-white'
                  }`}>
                    #{student.rank}
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">{student.name}</p>
                    <p className="text-[10px] text-slate-400">{student.class} • {student.streak} Day Streak 🔥</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-purple-600 dark:text-purple-400 text-base">{student.xp} XP</span>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{student.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
