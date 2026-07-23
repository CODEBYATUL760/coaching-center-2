import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HelpCircle,
  Award,
  BookOpen,
  Send,
  Sparkles,
  Settings
} from 'lucide-react';

export const VideoPlayerView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    activeLessonId,
    setActiveLessonId,
    markLessonComplete,
    setActiveTab,
    submitDoubt
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [activeVideoTab, setActiveVideoTab] = useState<'notes' | 'doubts' | 'quiz'>('notes');
  const [doubtText, setDoubtText] = useState('');
  const [doubtSubmittedSuccess, setDoubtSubmittedSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Default to first course if none selected
  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  // Find current lesson and chapter
  let currentLesson = currentCourse.chapters
    .flatMap(ch => ch.lessons)
    .find(l => l.id === activeLessonId);

  if (!currentLesson && currentCourse.chapters.length > 0 && currentCourse.chapters[0].lessons.length > 0) {
    currentLesson = currentCourse.chapters[0].lessons[0];
  }

  const allLessons = currentCourse.chapters.flatMap(ch => ch.lessons);
  const currentIdx = allLessons.findIndex(l => l?.id === currentLesson?.id);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    submitDoubt(currentCourse.subject, currentLesson?.title || 'Video Lesson', doubtText);
    setDoubtText('');
    setDoubtSubmittedSuccess(true);
    setTimeout(() => setDoubtSubmittedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('course-detail')}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Syllabus</span>
        </button>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {currentCourse.subject} • {currentCourse.classLevel}
        </span>
      </div>

      {/* Main Grid: Video Player + Lesson List Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Container & Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group border border-slate-800">
            <video
              ref={videoRef}
              src={
                currentLesson?.videoUrl ||
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              }
              className="w-full aspect-video object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Subtitles Overlay Simulation */}
            {subtitlesEnabled && isPlaying && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-lg text-center backdrop-blur-md pointer-events-none max-w-lg">
                "Light rays reflecting off spherical mirror surfaces follow the fundamental law angle i equals angle r."
              </div>
            )}

            {/* Custom Video Control Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2 transition-opacity">
              {/* Progress bar */}
              <div className="w-full bg-slate-700/80 h-1.5 rounded-full cursor-pointer overflow-hidden">
                <div className="bg-blue-500 h-full w-2/3 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-blue-400 p-1 cursor-pointer">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <span className="text-[11px] font-mono text-slate-300">14:20 / {currentLesson?.durationMinutes}:00</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px]">
                    {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-1.5 py-0.5 rounded font-bold ${
                          playbackSpeed === speed ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  {/* Subtitles Toggle */}
                  <button
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      subtitlesEnabled ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-400 border-slate-600'
                    }`}
                  >
                    CC
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="hover:text-blue-400 p-1 cursor-pointer"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Title & Controls */}
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentLesson?.title || 'Lesson Title'}
                </h1>
                <p className="text-xs text-slate-500">{currentCourse.title} • {currentCourse.teacherName}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currentCourse.id && currentLesson?.id) {
                      markLessonComplete(currentCourse.id, currentLesson.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    currentLesson?.completed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{currentLesson?.completed ? 'Completed' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>

            {/* Previous & Next Lesson navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
              {prevLesson ? (
                <button
                  onClick={() => setActiveLessonId(prevLesson.id)}
                  className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev: {prevLesson.title.slice(0, 20)}...
                </button>
              ) : <div />}

              {nextLesson && (
                <button
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Next: {nextLesson.title.slice(0, 20)}... <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Lesson Tabs (Notes, Ask Doubt, Quiz) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-1">
              <button
                onClick={() => setActiveVideoTab('notes')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeVideoTab === 'notes'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Notes & Material</span>
              </button>

              <button
                onClick={() => setActiveVideoTab('doubts')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeVideoTab === 'doubts'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ask Doubt</span>
              </button>

              <button
                onClick={() => setActiveVideoTab('quiz')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeVideoTab === 'quiz'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Practice Quiz</span>
              </button>
            </div>

            <div className="p-5">
              {activeVideoTab === 'notes' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                      Lesson Summary & Key Concepts
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentLesson?.summaryText ||
                        'Key principles of light propagation, reflection, and sign conventions.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          Handwritten PDF Lecture Notes
                        </h4>
                        <p className="text-xs text-slate-500">Class10_Physics_Lesson1_Notes.pdf • 3.2 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('PDF Download Started (Simulated)')}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-blue-700 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Notes
                    </button>
                  </div>
                </div>
              )}

              {activeVideoTab === 'doubts' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Have a doubt in this lesson? Ask {currentCourse.teacherName}
                  </h3>

                  {doubtSubmittedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                      ✓ Doubt submitted! Your teacher will respond shortly.
                    </div>
                  )}

                  <form onSubmit={handleDoubtSubmit} className="space-y-3">
                    <textarea
                      rows={3}
                      placeholder="Type your question or timestamp query here..."
                      value={doubtText}
                      onChange={e => setDoubtText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Submit Question
                    </button>
                  </form>
                </div>
              )}

              {activeVideoTab === 'quiz' && (
                <div className="space-y-4 text-center py-4">
                  <Award className="w-12 h-12 text-amber-500 mx-auto" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Test your understanding of this topic
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Take a quick 5-question multiple choice quiz to test your concept retention!
                  </p>
                  <button
                    onClick={() => setActiveTab('tests')}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    Start Chapter Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Course Syllabus / Lessons List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-4 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Course Syllabus
            </h2>
            <span className="text-xs font-bold text-slate-400">{allLessons.length} Lessons</span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {currentCourse.chapters.map((chap, cIdx) => (
              <div key={chap.id} className="space-y-2">
                <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {chap.title}
                </div>

                <div className="space-y-1.5">
                  {chap.lessons.map((les, lIdx) => {
                    const isCurrent = les.id === currentLesson?.id;

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 text-white font-bold shadow-md'
                            : les.completed
                            ? 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {les.completed ? (
                            <CheckCircle className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />
                          ) : (
                            <Play className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                          )}
                          <span className="text-xs line-clamp-1">{les.title}</span>
                        </div>
                        <span className={`text-[10px] shrink-0 font-mono ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                          {les.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
