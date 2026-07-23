import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Radio, MessageSquare, Award, HelpCircle, CheckCheck } from 'lucide-react';

export const NotificationDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, setActiveTab } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'live_class':
        return <Radio className="w-4 h-4 text-rose-500" />;
      case 'doubt_reply':
        return <HelpCircle className="w-4 h-4 text-teal-500" />;
      case 'announcement':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Award className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No notifications right now.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.linkTab) setActiveTab(n.linkTab);
                  onClose();
                }}
                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                  !n.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-1.5">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {n.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
          <button
            onClick={() => {
              notifications.forEach(n => markNotificationRead(n.id));
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
