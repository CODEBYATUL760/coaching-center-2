import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Pin,
  Heart,
  Download,
  FileText,
  Send,
  User,
  ShieldCheck,
  Paperclip
} from 'lucide-react';

export const ClassroomFeedView: React.FC = () => {
  const { classroomPosts, chatMessages, sendChatMessage, currentUser, activeRole } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'feed' | 'chat'>('feed');
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" /> Classroom Community & Chat
          </h1>
          <p className="text-xs text-slate-500">
            Official announcements, homework releases, sample papers, and direct academic chat
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTabSub('feed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'feed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Classroom Feed
          </button>
          <button
            onClick={() => setActiveTabSub('chat')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'chat'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Direct Teacher Chat
          </button>
        </div>
      </div>

      {activeTabSub === 'feed' ? (
        /* CLASSROOM FEED POSTS */
        <div className="space-y-4">
          {classroomPosts.map(post => (
            <div
              key={post.id}
              className={`bg-white dark:bg-slate-800 border rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs relative ${
                post.isPinned
                  ? 'border-blue-400 dark:border-blue-700 ring-2 ring-blue-500/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {post.isPinned && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  <Pin className="w-3 h-3" /> PINNED ANNOUNCEMENT
                </div>
              )}

              {/* Author Header */}
              <div className="flex items-center gap-3">
                <img
                  src={post.teacherAvatar}
                  alt={post.teacherName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                    <span>{post.teacherName}</span>
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                  </h3>
                  <p className="text-xs text-slate-500">{post.subject} Faculty • Posted on {post.postedDate}</p>
                </div>
              </div>

              {/* Post Title & Content */}
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {post.content}
                </p>
              </div>

              {/* Attachment Card */}
              {post.attachmentName && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {post.attachmentName}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">Downloadable PDF Resource</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Download Started (Simulated)')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              )}

              {/* Reactions Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4 text-xs font-semibold text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-rose-500 cursor-pointer">
                  <Heart className="w-4 h-4" /> {post.likesCount} Helpful Reactions
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
                  <MessageSquare className="w-4 h-4" /> {post.commentsCount} Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DIRECT STUDENT-TEACHER SAFE CHAT */
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[520px]">
          {/* Chat Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"
              alt="Faculty"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Dr. Rajesh Verma (Physics HOD)
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online • Academic Chat
              </p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30 dark:bg-slate-900/40">
            {chatMessages.map(msg => {
              const isMe = msg.senderRole === activeRole;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-sm sm:max-w-md ${
                    isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-medium px-1 mb-0.5">
                    {msg.senderName} • {msg.timestamp}
                  </span>
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a message or query to faculty..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
