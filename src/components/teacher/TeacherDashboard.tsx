import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  PlusCircle,
  HelpCircle,
  MessageSquare,
  Users,
  Send,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SubjectName } from '../../types';

export const TeacherDashboard: React.FC = () => {
  const { doubts, addTeacherPost } = useApp();

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postSubject, setPostSubject] = useState<SubjectName>('Physics');
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);

  const pendingDoubts = doubts.filter(d => d.status === 'Open' || d.status === 'Pending');

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addTeacherPost({
      teacherId: 'tch_01',
      teacherName: 'Dr. Rajesh Verma',
      teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
      subject: postSubject,
      title: postTitle,
      content: postContent
    });

    setPostTitle('');
    setPostContent('');
    setShowPublishSuccess(true);
    setTimeout(() => setShowPublishSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-bold text-xs">
            Senior Physics Faculty Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">Welcome, Dr. Rajesh Verma 👋</h1>
          <p className="text-indigo-200 text-xs sm:text-sm">
            Managing 28,400+ enrolled students across 8 Physics & Competitive batches
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 text-slate-900">
          <div className="bg-white/95 p-3 rounded-2xl text-center shadow-xs">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Pending Doubts</p>
            <p className="text-xl font-black text-rose-600">{pendingDoubts.length}</p>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl text-center shadow-xs">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Rating</p>
            <p className="text-xl font-black text-amber-500">4.9 ★</p>
          </div>
        </div>
      </div>

      {showPublishSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm border border-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Classroom Announcement Published to all enrolled students!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publish Announcement Box */}
        <form
          onSubmit={handlePublishPost}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Publish Classroom Announcement / Homework
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
            <select
              value={postSubject}
              onChange={e => setPostSubject(e.target.value as SubjectName)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
            >
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Physics Sunday Practice Worksheet Uploaded"
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Content</label>
            <textarea
              rows={4}
              required
              placeholder="Write update details or instructions for students..."
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Publish Announcement
          </button>
        </form>

        {/* Pending Student Doubts Queue */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-rose-500" /> Pending Student Doubts Queue
            </h2>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
              {pendingDoubts.length} Open
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {pendingDoubts.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">All student doubts have been answered!</p>
            ) : (
              pendingDoubts.map(d => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{d.studentName} ({d.classLevel})</span>
                    <span className="text-[10px] text-slate-400">{d.askedDate}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium line-clamp-2">{d.questionText}</p>
                  <button
                    onClick={() => alert(`Opening Faculty Answer Drawer for doubt ID: ${d.id}`)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] cursor-pointer"
                  >
                    Reply to Student
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
