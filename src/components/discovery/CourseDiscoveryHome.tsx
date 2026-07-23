import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Sparkles,
  BookOpen,
  Users,
  Radio,
  Star,
  ShieldCheck,
  ChevronRight,
  PlayCircle,
  Clock,
  ArrowRight,
  Flame,
  Award,
  CheckCircle2,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { ClassLevel, SubjectName } from '../../types';
import { CLASSES_LIST, SUBJECTS_BY_CLASS } from '../../data/initialData';

export const CourseDiscoveryHome: React.FC = () => {
  const {
    courses,
    batches,
    liveClasses,
    currentUser,
    updateUserClass,
    setSelectedCourseId,
    setSelectedBatchId,
    setActiveTab,
    enrollInCourse,
    enrollInBatch,
    setIsSearchOpen
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeClass = currentUser.selectedClass || 'Class 10';
  const availableSubjects = ['All', ...(SUBJECTS_BY_CLASS[activeClass] || [])];

  // Filter courses by class and subject
  const filteredCourses = courses.filter(c => {
    const matchesClass = c.classLevel === activeClass || c.classLevel === 'Competitive Exams';
    const matchesSubject = selectedSubject === 'All' || c.subject === selectedSubject;
    return matchesClass && matchesSubject;
  });

  const popularBatches = batches.filter(b => b.classLevel === activeClass || b.classLevel === 'Competitive Exams');

  const faqs = [
    {
      q: 'Are the live classes interactive?',
      a: 'Yes! Students can ask doubts in real-time, participate in live teacher polls, and use the hand-raise feature during class.'
    },
    {
      q: 'Can I access recorded lectures if I miss a live class?',
      a: 'Absolutely. Every live class is recorded and uploaded within 2 hours along with teacher notes and PDF slides.'
    },
    {
      q: 'How does the Doubt Solving feature work?',
      a: 'Simply snap a photo of your question or type it out. Our expert faculties respond with step-by-step text and audio answers within 20 minutes.'
    },
    {
      q: 'Are there mock tests for CBSE and Competitive exams?',
      a: 'Yes, we provide weekly chapter tests, full syllabus mock tests, and 5-year PYQ papers with instant accuracy analytics.'
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Next-Gen Education Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Learn From India’s Top Educators for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              {activeClass}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Master your CBSE board exams and competitive goals with structured batches, live classes, instant doubt solving, and chapter-wise mock test series.
          </p>

          {/* Search Bar Widget */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full sm:w-auto flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-slate-300 text-sm transition-all group cursor-pointer"
            >
              <Search className="w-5 h-5 text-blue-400" />
              <span className="flex-1 text-left">Search subjects, chapters, or teacher notes...</span>
              <span className="text-xs bg-blue-600/80 px-2.5 py-1 rounded-lg text-white font-medium">Search</span>
            </button>

            <button
              onClick={() => setActiveTab('batches')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Explore Batches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">100,000+</p>
              <p className="text-[11px] text-slate-400 font-medium">Active Students</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-teal-400">98.4%</p>
              <p className="text-[11px] text-slate-400 font-medium">Board Pass Rate</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-amber-400">4.9 ★</p>
              <p className="text-[11px] text-slate-400 font-medium">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR CLASS CATEGORY SELECTOR */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Select Your Academic Class
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Targeted curriculum tailored specifically for your grade level
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CLASSES_LIST.map(cls => {
            const isSelected = cls === activeClass;
            return (
              <button
                key={cls}
                onClick={() => updateUserClass(cls)}
                className={`px-4 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold scale-102'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. CONTINUE LEARNING BANNER (IF ENROLLED) */}
      {currentUser.enrolledCourseIds.length > 0 && (
        <section className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <PlayCircle className="w-6 h-6 fill-white text-blue-600" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Continue Learning
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Class 10 Physics: Light Reflection & Refraction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lesson 2: Concave & Convex Mirrors • 75% Completed
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCourseId('course_p10_01');
              setActiveTab('video-player');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer text-center"
          >
            Resume Lesson
          </button>
        </section>
      )}

      {/* 4. UPCOMING LIVE CLASSES WIDGET */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Live Interactive Classes
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('live')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.slice(0, 2).map(lc => (
            <div
              key={lc.id}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={lc.teacherAvatar}
                    alt={lc.teacherName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {lc.subject} • {lc.classLevel}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-1">
                      {lc.title}
                    </h3>
                    <p className="text-xs text-slate-500">{lc.teacherName}</p>
                  </div>
                </div>

                {lc.status === 'live' ? (
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-[10px] font-black tracking-wider flex items-center gap-1 border border-rose-300 dark:border-rose-800 animate-pulse">
                    <Radio className="w-3 h-3" /> LIVE NOW
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                    UPCOMING
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {lc.status === 'live' ? 'Started 15m ago' : 'Today, 7:00 PM'}
                </span>

                <button
                  onClick={() => {
                    setActiveTab('live');
                  }}
                  className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    lc.status === 'live'
                      ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-500/20'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {lc.status === 'live' ? 'Join Stream' : 'Set Reminder'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRENDING BATCHES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Batches for {activeClass}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Structured year-long live batches with faculties, test series & doubt clearing
            </p>
          </div>
          <button
            onClick={() => setActiveTab('batches')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>All Batches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularBatches.map(batch => {
            const isEnrolled = currentUser.enrolledBatchIds.includes(batch.id);

            return (
              <div
                key={batch.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={batch.thumbnail}
                      alt={batch.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {batch.targetExam || batch.classLevel}
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs font-bold text-slate-200">{batch.scheduleDays}</p>
                      <p className="text-[10px] text-slate-300">{batch.timing}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                      {batch.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {batch.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-2">
                      {batch.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Enrollment Action */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <div>
                    {batch.isFree ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm sm:text-base">
                        FREE ENROLLMENT
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white text-base">
                          ₹{batch.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{batch.originalPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (!isEnrolled) enrollInBatch(batch.id);
                      setSelectedBatchId(batch.id);
                      setActiveTab('batch-detail');
                    }}
                    className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isEnrolled
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                    }`}
                  >
                    {isEnrolled ? 'Enrolled • View' : 'Join Batch'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. POPULAR COURSES GRID WITH SUBJECT FILTERS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Subject Courses for {activeClass}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In-depth topic lectures, practice quizzes, and downloadable notes
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {availableSubjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => {
            const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setActiveTab('course-detail');
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {course.subject}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                      <img
                        src={course.teacherAvatar}
                        alt={course.teacherName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{course.teacherName}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    {course.totalLessons} Lessons
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {course.isFree ? 'FREE' : `₹${course.price}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. STUDENT SUCCESS STORIES */}
      <section className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Hear from students who achieved 95%+ in Boards and top ranks in JEE/NEET
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Priya Nambiar',
              score: '98.6% CBSE Class 10',
              text: 'The doubt solving system was a game changer. Every time I got stuck in Physics numericals, Dr. Verma answered with detailed audio notes!',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
            },
            {
              name: 'Rohan Mehta',
              score: 'AIR 142 JEE Main',
              text: 'AuraEd test series helped me build speed and accuracy. The weak topics breakdown showed me exactly what to revise before exam day.',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
            },
            {
              name: 'Sanya Gupta',
              score: '97.2% Class 12 Biology',
              text: 'Dr. Kulkarni’s 3D diagram lectures made human physiology super easy to remember without rote learning.',
              avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                  <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">{item.score}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Everything you need to know about learning on AuraEd</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 font-extrabold text-base">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
