import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronLeft,
  BookOpen,
  Award,
  Radio,
  FileText
} from 'lucide-react';

export const BatchDetailView: React.FC = () => {
  const { batches, selectedBatchId, currentUser, enrollInBatch, setActiveTab } = useApp();

  const batch = batches.find(b => b.id === selectedBatchId) || batches[0];
  const isEnrolled = currentUser.enrolledBatchIds.includes(batch.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <button
        onClick={() => setActiveTab('batches')}
        className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to All Batches</span>
      </button>

      {/* Batch Banner Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-60 md:h-auto overflow-hidden">
          <img src={batch.thumbnail} alt={batch.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full uppercase">
            {batch.targetExam || batch.classLevel}
          </div>
        </div>

        <div className="p-6 md:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {batch.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {batch.description}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{batch.scheduleDays}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-teal-500" />
                <span>{batch.timing}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase">Batch Fee</span>
              {batch.isFree ? (
                <span className="text-2xl font-black text-emerald-600">FREE ENROLLMENT</span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">₹{batch.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{batch.originalPrice}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (!isEnrolled) enrollInBatch(batch.id);
              }}
              className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer text-center ${
                isEnrolled
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
            >
              {isEnrolled ? '✓ Enrolled in Batch' : 'Join Batch Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Batch Teachers */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" /> Batch Lead Faculties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {batch.teachers.map(t => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-center space-y-2">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-indigo-500/30" />
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{t.name}</h3>
                <p className="text-[10px] text-slate-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
