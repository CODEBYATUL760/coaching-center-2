import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPlayerView: React.FC = () => {
  const { mockTests, setActiveTab, submitTestResult } = useApp();

  const quiz = mockTests[0] || {
    id: 'q_default',
    title: 'Class 10 Physics & Math Quick Quiz',
    durationMinutes: 10,
    totalMarks: 25,
    questions: []
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.durationMinutes * 60);

  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const currentQ = quiz.questions[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const toggleMarkReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const accuracy = Math.round((correctCount / quiz.questions.length) * 100);

    if (accuracy >= 70) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    submitTestResult({
      testId: quiz.id,
      testTitle: quiz.title,
      score: correctCount * 5,
      totalMarks: quiz.questions.length * 5,
      accuracyPercent: accuracy,
      timeTakenMinutes: Math.round((quiz.durationMinutes * 60 - timeLeftSeconds) / 60) || 1,
      correctAnswersCount: correctCount,
      incorrectAnswersCount: Object.keys(selectedAnswers).length - correctCount,
      unansweredCount: quiz.questions.length - Object.keys(selectedAnswers).length,
      weakTopics: ['Spherical Mirror Sign Conventions'],
      strongTopics: ['Ohm\'s Law', 'Refractive Index']
    });
  };

  const minutesLeft = Math.floor(timeLeftSeconds / 60);
  const secondsLeft = timeLeftSeconds % 60;

  // Calculate scores when submitted
  let correctCount = 0;
  if (isSubmitted) {
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) correctCount++;
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
            {quiz.title}
          </h1>
          <p className="text-xs text-slate-500">Total Questions: {quiz.questions.length}</p>
        </div>

        {!isSubmitted ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-mono font-bold text-sm">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>
              {String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}
            </span>
          </div>
        ) : (
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
            Completed
          </span>
        )}
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Question Card */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Question {currentIdx + 1} of {quiz.questions.length}
                </span>

                <button
                  onClick={toggleMarkReview}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    markedForReview[currentIdx]
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {markedForReview[currentIdx] ? '★ Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.questionText}
              </h2>

              {/* MCQ Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 font-bold text-blue-900 dark:text-blue-100 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{option}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentIdx < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 cursor-pointer"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 cursor-pointer"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Palette Side */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 h-fit">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Question Palette</h3>

            <div className="grid grid-cols-5 gap-2">
              {quiz.questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = idx === currentIdx;
                const isMarked = markedForReview[idx];

                let bgClass = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
                if (isCurrent) bgClass = 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-950 font-bold';
                else if (isAnswered) bgClass = 'bg-emerald-500 text-white font-bold';
                else if (isMarked) bgClass = 'bg-purple-500 text-white font-bold';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] space-y-1.5 text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500" /> Marked for Review
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /> Unanswered
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* POST QUIZ SCORE SUMMARY */
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xl text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quiz Completed!</h2>
            <p className="text-xs text-slate-500 mt-1">Great effort on attempting this practice quiz.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 font-bold uppercase">Score</p>
              <p className="text-xl font-black text-blue-600">{correctCount * 5} / {quiz.questions.length * 5}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 font-bold uppercase">Accuracy</p>
              <p className="text-xl font-black text-emerald-600">
                {Math.round((correctCount / quiz.questions.length) * 100)}%
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 font-bold uppercase">Correct</p>
              <p className="text-xl font-black text-emerald-500">{correctCount}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 font-bold uppercase">Incorrect</p>
              <p className="text-xl font-black text-rose-500">{quiz.questions.length - correctCount}</p>
            </div>
          </div>

          {/* Question Explanations List */}
          <div className="text-left space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Detailed Explanations</h3>

            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 ${
                      isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Q{idx + 1}. {q.questionText}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400">
                      Your answer: <strong className="text-slate-900 dark:text-white">{userAns !== undefined ? q.options[userAns] : 'Skipped'}</strong>
                    </p>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                      Correct answer: {q.options[q.correctOptionIndex]}
                    </p>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs italic border border-slate-100 dark:border-slate-800">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedAnswers({});
              setTimeLeftSeconds(quiz.durationMinutes * 60);
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-blue-700 cursor-pointer"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};
