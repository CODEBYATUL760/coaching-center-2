import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

import { CourseDiscoveryHome } from './components/discovery/CourseDiscoveryHome';
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyLearningView } from './components/student/MyLearningView';
import { CourseDetailView } from './components/student/CourseDetailView';
import { BatchDetailView } from './components/student/BatchDetailView';
import { VideoPlayerView } from './components/student/VideoPlayerView';
import { LiveClassView } from './components/student/LiveClassView';
import { DoubtSolvingView } from './components/student/DoubtSolvingView';
import { MockTestPlayerView } from './components/student/MockTestPlayerView';
import { QuizPlayerView } from './components/student/QuizPlayerView';
import { ClassroomFeedView } from './components/student/ClassroomFeedView';
import { StudyMaterialView } from './components/student/StudyMaterialView';
import { AnalyticsView } from './components/student/AnalyticsView';
import { ProfileView } from './components/student/ProfileView';

import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeTab, activeRole } = useApp();

  const renderView = () => {
    // Role override logic for dedicated teacher / admin screens
    if (activeRole === 'teacher') {
      return <TeacherDashboard />;
    }
    if (activeRole === 'admin') {
      return <AdminDashboard />;
    }

    switch (activeTab) {
      case 'home':
        return <CourseDiscoveryHome />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'my-learning':
        return <MyLearningView />;
      case 'course-detail':
        return <CourseDetailView />;
      case 'batch-detail':
        return <BatchDetailView />;
      case 'video-player':
        return <VideoPlayerView />;
      case 'live-classes':
        return <LiveClassView />;
      case 'doubts':
        return <DoubtSolvingView />;
      case 'tests':
        return <MockTestPlayerView />;
      case 'quiz-player':
        return <QuizPlayerView />;
      case 'classroom':
        return <ClassroomFeedView />;
      case 'study-material':
        return <StudyMaterialView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'profile':
        return <ProfileView />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <CourseDiscoveryHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Header />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar on Medium+ screens */}
        <Sidebar />

        {/* Main Workspace Area */}
        <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-y-auto max-w-full">
          {renderView()}
        </main>
      </div>

      {/* Navigation for Mobile Screens */}
      <BottomNav />

      {/* Global Modals */}
      <GlobalSearchModal />
      <NotificationDrawer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
