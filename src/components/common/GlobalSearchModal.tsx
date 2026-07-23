import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, BookOpen, Users, FileText, HelpCircle, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    courses,
    batches,
    studyMaterials,
    setSelectedCourseId,
    setSelectedBatchId,
    setActiveTab
  } = useApp();

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredCourses = query
    ? courses.filter(
        c =>
          c.title.toLowerCase().includes(query) ||
          c.subject.toLowerCase().includes(query) ||
          c.teacherName.toLowerCase().includes(query)
      )
    : courses.slice(0, 3);

  const filteredBatches = query
    ? batches.filter(
        b =>
          b.title.toLowerCase().includes(query) ||
          b.targetExam?.toLowerCase().includes(query)
      )
    : batches.slice(0, 2);

  const filteredMaterials = query
    ? studyMaterials.filter(
        m =>
          m.title.toLowerCase().includes(query) ||
          m.subject.toLowerCase().includes(query)
      )
    : studyMaterials.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search courses, subjects, batches, notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Courses Section */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                <span>Courses</span>
              </div>
              <div className="space-y-2">
                {filteredCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setActiveTab('course-detail');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {course.subject} • {course.teacherName}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Batches Section */}
          {filteredBatches.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Batches</span>
              </div>
              <div className="space-y-2">
                {filteredBatches.map(batch => (
                  <button
                    key={batch.id}
                    onClick={() => {
                      setSelectedBatchId(batch.id);
                      setActiveTab('batch-detail');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={batch.thumbnail}
                        alt={batch.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                          {batch.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {batch.targetExam || batch.classLevel}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Study Material Section */}
          {filteredMaterials.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-teal-500" />
                <span>Study Materials & PDF Notes</span>
              </div>
              <div className="space-y-2">
                {filteredMaterials.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => {
                      setActiveTab('materials');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                        {mat.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {mat.type} • {mat.subject} ({mat.fileSize})
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Quick Shortcuts:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('doubts');
                  setIsSearchOpen(false);
                }}
                className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Ask a Doubt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
