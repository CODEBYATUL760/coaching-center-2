import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  Plus,
  Image as ImageIcon,
  Send,
  CheckCircle2,
  Clock,
  Filter,
  Volume2,
  UserCheck
} from 'lucide-react';
import { SubjectName } from '../../types';

export const DoubtSolvingView: React.FC = () => {
  const { doubts, submitDoubt, currentUser } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [subject, setSubject] = useState<SubjectName>('Physics');
  const [chapter, setChapter] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredDoubts = doubts.filter(d => {
    if (filterStatus === 'All') return true;
    return d.status === filterStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    submitDoubt(subject, chapter || 'General Topic', questionText, imagePreview || undefined);
    setQuestionText('');
    setChapter('');
    setImagePreview(null);
    setIsFormOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSimulatedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-600 to-emerald-600 p-6 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" /> 20-Min Faculty Resolution
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">24x7 Instant Doubt Solving</h1>
          <p className="text-teal-100 text-xs sm:text-sm">
            Snap a photo or type your question. Top educators respond with step-by-step text & audio.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-5 py-3 rounded-2xl bg-white text-teal-900 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>{isFormOpen ? 'Close Form' : 'Ask New Doubt'}</span>
        </button>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm border border-emerald-300 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Your doubt has been submitted successfully! Expert faculty will respond shortly.</span>
        </div>
      )}

      {/* ASK DOUBT FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 border-2 border-teal-500 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
            Ask a Question to Educator
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value as SubjectName)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Social Science">Social Science</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chapter / Topic</label>
              <input
                type="text"
                placeholder="e.g. Chapter 1 Electricity"
                value={chapter}
                onChange={e => setChapter(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
              Question Description
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe your question in detail or specify where you got stuck in the solution..."
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Image upload simulation */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
              Attach Diagram or Textbook Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatedImageUpload}
                className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
              />
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl mt-2 border" />
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-500 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Post Doubt
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Status:
        </span>
        {['All', 'Open', 'Answered', 'Resolved'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
            No doubts found under this filter.
          </div>
        ) : (
          filteredDoubts.map(doubt => (
            <div
              key={doubt.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xs"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doubt.studentAvatar}
                    alt={doubt.studentName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 uppercase">
                      {doubt.subject} • {doubt.chapterName}
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                      {doubt.studentName}
                    </h3>
                    <span className="text-[10px] text-slate-400">Asked on {doubt.askedDate}</span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    doubt.status === 'Answered'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {doubt.status}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {doubt.questionText}
              </p>

              {doubt.imageUrl && (
                <img
                  src={doubt.imageUrl}
                  alt="Attachment"
                  className="w-full max-w-sm h-48 object-cover rounded-xl border"
                />
              )}

              {/* Faculty Answer Box */}
              {doubt.teacherResponse ? (
                <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={doubt.teacherResponse.teacherAvatar}
                      alt={doubt.teacherResponse.teacherName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1">
                        <span>{doubt.teacherResponse.teacherName}</span>
                        <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                      </p>
                      <p className="text-[10px] text-slate-400">Answered on {doubt.teacherResponse.answeredDate}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {doubt.teacherResponse.answerText}
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => alert('Playing Audio Explanation (Simulated)')}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-teal-700 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen Audio Answer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>Assigned to faculty. Estimated response within 15 minutes.</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
