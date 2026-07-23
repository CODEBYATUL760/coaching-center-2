import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PlayCircle,
  Clock,
  CheckCircle2,
  Flame,
  Award,
  BookOpen,
  Radio,
  HelpCircle,
  MessageSquare,
  BarChart3,
  ChevronRight,
  Zap,
  TrendingUp,
  FileText
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    batches,
    liveClasses,
    doubts,
    testResults,
    setSelectedCourseId,
    setActiveLessonId,
    setActiveTab
  } = useApp();

  const enrolledCoursesList = courses.filter(c =>
    currentUser.enrolledCourseIds.includes(c.id)
  );

  const enrolledBatchesList = batches.filter(b =>
    currentUser.enrolledBatchIds.includes(b.id)
  );

  const pendingDoubts = doubts.filter(d => d.status === 'Open' || d.status === 'Pending');
  const answeredDoubts = doubts.filter(d => d.status === 'Answered');

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px] tracking-wider uppercase backdrop-blur-md">
              {currentUser.selectedClass || 'Class 10'} Student
            </span>
            <span className="flex items-center gap-1 text-amber-300 font-bold text-xs">
              <Flame className="w-4 h-4 fill-amber-300" />
              {currentUser.streakDays} Day Streak!
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm font-normal leading-relaxed">
            Target Exam: <span className="font-semibold text-white">{currentUser.targetExam}</span>. Keep up the great pace!
          </p>
        </div>

        {/* Quick Stats Pill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0 text-slate-900">
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/40 shadow-xs text-center">
            <p className="text-xs text-slate-500 font-bold uppercase">XP Points</p>
            <p className="text-lg font-black text-blue-600">{currentUser.totalXP}</p>
          </div>
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/40 shadow-xs text-center">
            <p className="text-xs text-slate-500 font-bold uppercase">Accuracy</p>
            <p className="text-lg font-black text-emerald-600">
              {testResults.length > 0 ? `${testResults[0].accuracyPercent}%` : '88%'}
            </p>
          </div>
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/40 shadow-xs text-center col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-500 font-bold uppercase">Badges</p>
            <p className="text-lg font-black text-amber-500">{currentUser.badges.length}</p>
          </div>
        </div>
      </div>

      {/* CONTINUE LEARNING CARD */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Continue Learning
            </h2>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">75% Completed</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <PlayCircle className="w-6 h-6 fill-white text-blue-600" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase">
                Physics • Chapter 1
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Concave & Convex Mirrors - Ray Diagrams
              </h3>
              <p className="text-xs text-slate-500">Duration: 32 mins • Dr. Rajesh Verma</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCourseId('course_p10_01');
              setActiveLessonId('les_p10_02');
              setActiveTab('video-player');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
          >
            Play Lesson
          </button>
        </div>
      </section>

      {/* MY BATCHES & UPCOMING LIVE CLASSES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrolled Batches */}
        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> My Enrolled Batches
            </h2>
            <button
              onClick={() => setActiveTab('batches')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {enrolledBatchesList.map(batch => (
              <div
                key={batch.id}
                onClick={() => {
                  setActiveTab('batch-detail');
                }}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img src={batch.thumbnail} alt={batch.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                      {batch.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">{batch.scheduleDays} • {batch.timing}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </section>

        {/* Live Classes Widget */}
        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-500" /> Today's Live Schedule
            </h2>
            <button
              onClick={() => setActiveTab('live')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Join Live Stream
            </button>
          </div>

          <div className="space-y-3">
            {liveClasses.slice(0, 2).map(lc => (
              <div
                key={lc.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img src={lc.teacherAvatar} alt={lc.teacherName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">
                      {lc.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">{lc.teacherName} • {lc.subject}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    lc.status === 'live'
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {lc.status === 'live' ? 'LIVE NOW' : 'Schedule'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* QUICK DASHBOARD ACTIONS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Take Quiz', icon: Award, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40', tab: 'tests' },
          { label: 'Ask Doubt', icon: HelpCircle, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40', tab: 'doubts' },
          { label: 'Study Notes', icon: FileText, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40', tab: 'materials' },
          { label: 'Performance', icon: BarChart3, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40', tab: 'analytics' }
        ].map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(act.tab)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-left flex flex-col justify-between h-28 group cursor-pointer shadow-2xs"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${act.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                {act.label}
              </span>
            </button>
          );
        })}
      </section>

      {/* RECENT DOUBTS & ANNOUNCEMENT SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-500" /> Recent Doubts
            </h2>
            <button
              onClick={() => setActiveTab('doubts')}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Ask New Doubt
            </button>
          </div>

          <div className="space-y-2.5">
            {doubts.slice(0, 2).map(d => (
              <div key={d.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{d.subject}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    d.status === 'Answered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{d.questionText}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" /> Teacher Classroom Feed
            </h2>
            <button
              onClick={() => setActiveTab('classroom')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open Feed
            </button>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-900 dark:text-blue-300">Dr. Rajesh Verma</span>
              <span className="text-[10px] text-slate-400">• Yesterday</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
              "Important Physics Formula Revision Sheet & Tomorrow's Class Prep uploaded!"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
