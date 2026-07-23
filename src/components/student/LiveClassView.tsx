import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Radio,
  Send,
  Users,
  Hand,
  BarChart2,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const LiveClassView: React.FC = () => {
  const { liveClasses } = useApp();

  const [liveChatMessages, setLiveChatMessages] = useState([
    { id: 'lc1', name: 'Rohan Mehta', text: 'Good evening Dr. Verma! Excited for circuit numericals today.', time: '5:30 PM' },
    { id: 'lc2', name: 'Priya Nambiar', text: 'Sir, please explain the parallel combination formula once again.', time: '5:32 PM' },
    { id: 'lc3', name: 'Dr. Rajesh Verma (Faculty)', text: 'Welcome everyone! Let\'s solve Problem #3 on screen now.', time: '5:33 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);

  const currentLive = liveClasses[0] || {
    title: 'Electric Circuits & Ohm\'s Law Numerical Mastery',
    teacherName: 'Dr. Rajesh Verma',
    subject: 'Physics',
    attendeesCount: 1420
  };

  const pollQuestion = {
    question: 'In a series circuit with two resistors of 4 ohms and 6 ohms connected to 12V battery, current is:',
    options: ['1.2 A', '2.0 A', '0.8 A', '12.0 A'],
    correctOption: 0
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setLiveChatMessages(prev => [
      ...prev,
      {
        id: 'lc_' + Date.now(),
        name: 'Aarav Sharma (You)',
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs flex items-center gap-1.5 animate-pulse">
            <Radio className="w-4 h-4" /> LIVE NOW
          </span>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base">{currentLive.title}</h1>
            <p className="text-xs text-slate-400">{currentLive.teacherName} • {currentLive.subject}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Users className="w-4 h-4 text-teal-400" />
          <span>{currentLive.attendeesCount} Live Students Attending</span>
        </div>
      </div>

      {/* Main Grid: Video Stream + Live Chat / Poll */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Video Container */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-slate-800 shadow-2xl flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>1080p HD Live Stream</span>
            </div>

            {/* Hand Raise Active Overlay */}
            {handRaised && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
                <Hand className="w-4 h-4" /> Hand Raised! Teacher Notified
              </div>
            )}
          </div>

          {/* Interactive Live Controls (Hand Raise & Teacher Poll) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Hand Raise Card */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Raise Hand to Ask Voice Doubt</h3>
                <p className="text-[11px] text-slate-500">Teacher will unmute your microphone</p>
              </div>

              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`p-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  handRaised ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Hand className="w-5 h-5" />
              </button>
            </div>

            {/* Teacher Live Poll Widget */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span className="flex items-center gap-1 text-blue-600">
                  <BarChart2 className="w-4 h-4" /> Live Teacher Poll
                </span>
                <span className="text-[10px] text-slate-400">Ends in 30s</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-1">
                {pollQuestion.question}
              </p>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {pollQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPollOption(i)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedPollOption === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real-time Live Chatbox */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[500px]">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
            <span>Live Class Public Chat</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Moderated Channel</span>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
            {liveChatMessages.map(msg => (
              <div key={msg.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">{msg.name}</span>
                  <span className="text-[9px] text-slate-400">{msg.time}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type message to class..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="flex-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
