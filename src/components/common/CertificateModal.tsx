import React from 'react';
import { X, Download, ShieldCheck, Award, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  classLevel: string;
  instructorName: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  classLevel,
  instructorName
}) => {
  React.useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const certificateId = 'AURA-CERT-' + Math.floor(100000 + Math.random() * 900000);
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Actions */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Course Completion Certificate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/40 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-center border-8 border-double border-amber-300 dark:border-amber-900/60 m-4 rounded-xl relative shadow-inner">
          {/* Watermark / Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED ACADEMY</span>
          </div>

          <div className="my-4">
            <span className="text-2xl font-black tracking-widest text-blue-900 dark:text-blue-300 uppercase block mb-1">
              AuraEd Academy
            </span>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Certificate of Academic Excellence
            </p>
          </div>

          <div className="my-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
              This is proudly presented to
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif underline decoration-amber-400 decoration-2 underline-offset-8">
              {studentName}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed my-4">
            For successfully completing all requirements, interactive quizzes, and tests in
            <br />
            <strong className="text-blue-700 dark:text-blue-300 font-bold block my-1">
              {courseTitle} ({classLevel})
            </strong>
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-left text-xs">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Instructor</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">{instructorName}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 font-black text-lg border-2 border-amber-400 shadow-xs">
                ★
              </div>
              <span className="text-[9px] text-amber-600 font-bold block mt-0.5">SEAL OF EXCELLENCE</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Issue Date</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">{issueDate}</p>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-slate-400 tracking-wider">
            Certificate ID: <span className="font-mono font-semibold">{certificateId}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              alert('Certificate downloaded as PDF (Simulated)');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Certificate link copied to clipboard!');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
