import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Award,
  BookOpen,
  Phone,
  Mail,
  ShieldCheck,
  Flame,
  Settings,
  ChevronRight
} from 'lucide-react';
import { CertificateModal } from '../common/CertificateModal';

export const ProfileView: React.FC = () => {
  const { currentUser, updateUserClass, setActiveTab } = useApp();

  const [isCertOpen, setIsCertOpen] = useState(false);
  const [selectedCertCourse, setSelectedCertCourse] = useState('Class 10 Physics Master Course');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/30 shadow-lg"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                {currentUser.name}
              </h1>
              <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-extrabold text-xs">
                {currentUser.selectedClass || 'Class 10'} Student
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Target Exam: <strong className="text-slate-800 dark:text-slate-200">{currentUser.targetExam}</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-500" /> {currentUser.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-teal-500" /> {currentUser.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
            <p className="text-xs text-slate-400 font-bold uppercase">Study Streak</p>
            <p className="text-lg font-black text-amber-500">{currentUser.streakDays} Days 🔥</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
            <p className="text-xs text-slate-400 font-bold uppercase">XP Points</p>
            <p className="text-lg font-black text-blue-600">{currentUser.totalXP}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
            <p className="text-xs text-slate-400 font-bold uppercase">Enrolled Batches</p>
            <p className="text-lg font-black text-emerald-600">{currentUser.enrolledBatchIds.length}</p>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Course Certificates
          </h2>
          <span className="text-xs text-slate-400 font-bold">1 Completed</span>
        </div>

        <div
          onClick={() => {
            setSelectedCertCourse('Class 10 Physics: Complete Board & NTSE Foundation');
            setIsCertOpen(true);
          }}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              ★
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-amber-600 transition-colors">
                Class 10 Physics: Complete Board & NTSE Foundation
              </h3>
              <p className="text-xs text-slate-500">Issued on July 20, 2026 • Verified Academy Certificate</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        studentName={currentUser.name}
        courseTitle={selectedCertCourse}
        classLevel={currentUser.selectedClass || 'Class 10'}
        instructorName="Dr. Rajesh Verma"
      />
    </div>
  );
};
