import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Star,
  Clock,
  PlayCircle,
  CheckCircle,
  Award,
  ChevronLeft,
  Users,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    currentUser,
    enrollInCourse,
    setSelectedCourseId,
    setActiveLessonId,
    setActiveTab
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Course Discovery</span>
      </button>

      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-60 md:h-auto overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
            {course.subject} • {course.classLevel}
          </div>
        </div>

        <div className="p-6 md:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-extrabold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating} ({course.reviewCount} Reviews)
              </span>
              <span className="text-xs text-slate-400 font-semibold">{course.difficulty} Level</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img src={course.teacherAvatar} alt={course.teacherName} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30" />
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1">
                  <span>{course.teacherName}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                </p>
                <p className="text-[11px] text-slate-400">Senior Faculty • {course.language}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">Course Fee</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {course.isFree ? 'FREE ACCESS' : `₹${course.price}`}
              </span>
            </div>

            <button
              onClick={() => {
                if (!isEnrolled) enrollInCourse(course.id);
                if (course.chapters.length > 0 && course.chapters[0].lessons.length > 0) {
                  setActiveLessonId(course.chapters[0].lessons[0].id);
                }
                setActiveTab('video-player');
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer text-center"
            >
              {isEnrolled ? 'Start / Continue Watching' : 'Enroll Now (Free)'}
            </button>
          </div>
        </div>
      </div>

      {/* Syllabus Breakdown Accordion */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" /> Complete Course Chapters & Lessons
        </h2>

        <div className="space-y-4">
          {course.chapters.map((chap, idx) => (
            <div key={chap.id} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase">
                    {chap.unitName}
                  </span>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                    {chap.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-bold">{chap.lessons.length} Lessons</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                {chap.lessons.map(les => (
                  <div
                    key={les.id}
                    onClick={() => {
                      if (!isEnrolled) enrollInCourse(course.id);
                      setActiveLessonId(les.id);
                      setActiveTab('video-player');
                    }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-slate-700/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                          {les.title}
                        </p>
                        <span className="text-[10px] text-slate-400">{les.durationMinutes} mins</span>
                      </div>
                    </div>

                    {les.isFreePreview && (
                      <span className="text-[10px] font-extrabold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200">
                        FREE PREVIEW
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
