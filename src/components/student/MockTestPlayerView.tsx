import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Clock,
  CheckCircle,
  HelpCircle,
  BarChart3,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const MockTestPlayerView: React.FC = () => {
  const { mockTests, testResults, setActiveTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'available' | 'analytics'>('available');

  const chartData = [
    { name: 'Mock #1', score: 38, accuracy: 76 },
    { name: 'Mock #2', score: 42, accuracy: 84 },
    { name: 'Mock #3', score: 45, accuracy: 90 },
    { name: 'Mock #4', score: 48, accuracy: 96 }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" /> Test & Examination Portal
          </h1>
          <p className="text-xs text-slate-500">
            Full-syllabus mock papers, chapter speed quizzes, and AI performance analytics
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveSubTab('available')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'available'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Available Tests
          </button>
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Performance Analytics
          </button>
        </div>
      </div>

      {activeSubTab === 'available' ? (
        <div className="space-y-6">
          {/* Tests List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockTests.map(test => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {test.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {test.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {test.subject} • {test.classLevel} • Total Marks: {test.totalMarks}
                  </p>

                  <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Exam Instructions:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500">
                      {test.instructions.slice(0, 3).map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    Passing: {test.passingMarks} Marks
                  </span>

                  <button
                    onClick={() => setActiveTab('quiz-player')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Attempt Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ANALYTICS & SCORE HISTORY TAB */
        <div className="space-y-6">
          {/* Accuracy & Score Progress Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Mock Test Score Growth Trend
                </h2>
                <p className="text-xs text-slate-500">Your score trajectory across recent mock test attempts</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200">
                +20% Score Growth
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Score (Marks)" />
                  <Bar dataKey="accuracy" fill="#10b981" radius={[6, 6, 0, 0]} name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Test History Records */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Test Attempts</h2>

            <div className="space-y-3">
              {testResults.map(res => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{res.testTitle}</h3>
                    <p className="text-slate-500">Attempted on {res.dateAttempted} • Time: {res.timeTakenMinutes} mins</p>
                  </div>

                  <div className="flex items-center gap-4 text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Score</p>
                      <p className="font-extrabold text-blue-600 text-sm">{res.score} / {res.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Accuracy</p>
                      <p className="font-extrabold text-emerald-600 text-sm">{res.accuracyPercent}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
