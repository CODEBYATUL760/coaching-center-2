import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Search,
  Download,
  Bookmark,
  BookmarkCheck,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const StudyMaterialView: React.FC = () => {
  const { studyMaterials, toggleBookmark, currentUser } = useApp();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'PDF Notes', 'Revision Notes', 'Formula Sheet', 'PYQ Paper'];

  const filtered = studyMaterials.filter(item => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" /> Digital Study Material & Handouts
          </h1>
          <p className="text-xs text-slate-500">
            Download verified faculty PDF notes, formula cheatsheets, and 5-year PYQ answer keys
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes by topic or subject..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(mat => {
          const isBookmarked = currentUser.bookmarkedItemIds.includes(mat.id) || mat.bookmarked;

          return (
            <div
              key={mat.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {mat.type}
                  </span>
                  <button
                    onClick={() => toggleBookmark(mat.id)}
                    className="text-slate-400 hover:text-amber-500 p-1 cursor-pointer transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {mat.subject} • {mat.classLevel} • File Size: {mat.fileSize}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <span>Downloaded {mat.downloadsCount} times</span>

                <button
                  onClick={() => alert(`Downloading "${mat.title}" (Simulated PDF File)`)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
