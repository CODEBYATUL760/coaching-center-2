import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Users,
  Bookmark,
  PlayCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

export const MyLearningView: React.FC = () => {
  const { courses, batches, studyMaterials, currentUser, setSelectedCourseId, setSelectedBatchId, setActiveTab } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'courses' | 'batches' | 'bookmarks'>('courses');

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));
  const enrolledBatches = batches.filter(b => currentUser.enrolledBatchIds.includes(b.id));
  const bookmarkedMaterials = studyMaterials.filter(m => currentUser.bookmarkedItemIds.includes(m.id) || m.bookmarked);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> My Learning Library
          </h1>
          <p className="text-xs text-slate-500">Your active courses, enrolled batches, and saved study notes</p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTabSub('courses')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'courses' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Courses ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTabSub('batches')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'batches' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Batches ({enrolledBatches.length})
          </button>
          <button
            onClick={() => setActiveTabSub('bookmarks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'bookmarks' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Bookmarks ({bookmarkedMaterials.length})
          </button>
        </div>
      </div>

      {activeTabSub === 'courses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enrolledCourses.map(c => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCourseId(c.id);
                setActiveTab('course-detail');
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {c.subject}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500">{c.teacherName}</p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Resume Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTabSub === 'batches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {enrolledBatches.map(b => (
            <div
              key={b.id}
              onClick={() => {
                setSelectedBatchId(b.id);
                setActiveTab('batch-detail');
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-lg transition-all cursor-pointer flex items-center gap-4 group"
            >
              <img src={b.thumbnail} alt={b.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">{b.targetExam || b.classLevel}</span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500">{b.scheduleDays} • {b.timing}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTabSub === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarkedMaterials.map(m => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{m.title}</h3>
                <p className="text-slate-500">{m.type} • {m.subject} ({m.fileSize})</p>
              </div>
              <button
                onClick={() => alert('Download Started (Simulated)')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
