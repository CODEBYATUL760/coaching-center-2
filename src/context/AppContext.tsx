import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  ClassLevel,
  SubjectName,
  Course,
  Batch,
  LiveClass,
  StudyMaterial,
  MockTest,
  TestResult,
  Doubt,
  ClassroomPost,
  NotificationItem,
  ChatMessage
} from '../types';
import {
  MOCK_STUDENT,
  MOCK_COURSES,
  MOCK_BATCHES,
  MOCK_LIVE_CLASSES,
  MOCK_STUDY_MATERIALS,
  MOCK_TESTS,
  MOCK_DOUBTS,
  MOCK_CLASSROOM_POSTS,
  MOCK_NOTIFICATIONS
} from '../data/initialData';

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: User;
  updateUserClass: (newClass: ClassLevel) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedBatchId: string | null;
  setSelectedBatchId: (id: string | null) => void;
  activeLessonId: string | null;
  setActiveLessonId: (id: string | null) => void;
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  studyMaterials: StudyMaterial[];
  mockTests: MockTest[];
  testResults: TestResult[];
  doubts: Doubt[];
  classroomPosts: ClassroomPost[];
  notifications: NotificationItem[];
  chatMessages: ChatMessage[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Actions
  enrollInBatch: (batchId: string) => void;
  enrollInCourse: (courseId: string) => void;
  toggleBookmark: (materialId: string) => void;
  submitDoubt: (subject: SubjectName, chapterName: string, questionText: string, imageUrl?: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  submitTestResult: (result: Omit<TestResult, 'id' | 'studentId' | 'dateAttempted'>) => void;
  addTeacherPost: (post: Omit<ClassroomPost, 'id' | 'postedDate' | 'likesCount' | 'commentsCount'>) => void;
  sendChatMessage: (text: string) => void;
  toggleLiveReminder: (classId: string) => void;
  markNotificationRead: (notifId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'auraed_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_user');
    return saved ? JSON.parse(saved) : MOCK_STUDENT;
  });
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>('les_p10_01');
  
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(MOCK_LIVE_CLASSES);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(MOCK_STUDY_MATERIALS);
  const [mockTests] = useState<MockTest[]>(MOCK_TESTS);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: 'res_1',
      testId: 'test_101',
      testTitle: 'Class 10 All India Science & Math Mock Test #3',
      studentId: 'stu_101',
      score: 45,
      totalMarks: 50,
      accuracyPercent: 90,
      timeTakenMinutes: 42,
      dateAttempted: '2026-07-15',
      correctAnswersCount: 9,
      incorrectAnswersCount: 1,
      unansweredCount: 0,
      weakTopics: ['Mirror Formula Sign Conventions'],
      strongTopics: ['Ohm\'s Law', 'Quadratic Equations', 'Digestive System']
    }
  ]);
  const [doubts, setDoubts] = useState<Doubt[]>(MOCK_DOUBTS);
  const [classroomPosts, setClassroomPosts] = useState<ClassroomPost[]>(MOCK_CLASSROOM_POSTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm1', senderId: 'tch_01', senderName: 'Dr. Rajesh Verma', senderRole: 'teacher', text: 'Welcome to Class 10 Physics Classroom! Ask any question here.', timestamp: '10:00 AM' },
    { id: 'm2', senderId: 'stu_101', senderName: 'Aarav Sharma', senderRole: 'student', text: 'Thank you Sir! Excited for today\'s live class on Electricity.', timestamp: '10:05 AM' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync user changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const updateUserClass = (newClass: ClassLevel) => {
    setCurrentUser(prev => ({
      ...prev,
      selectedClass: newClass
    }));
  };

  const enrollInBatch = (batchId: string) => {
    if (!currentUser.enrolledBatchIds.includes(batchId)) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledBatchIds: [...prev.enrolledBatchIds, batchId],
        totalXP: prev.totalXP + 100
      }));
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (!currentUser.enrolledCourseIds.includes(courseId)) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
        totalXP: prev.totalXP + 50
      }));
    }
  };

  const toggleBookmark = (materialId: string) => {
    setStudyMaterials(prev =>
      prev.map(m => (m.id === materialId ? { ...m, bookmarked: !m.bookmarked } : m))
    );
    setCurrentUser(prev => {
      const exists = prev.bookmarkedItemIds.includes(materialId);
      return {
        ...prev,
        bookmarkedItemIds: exists
          ? prev.bookmarkedItemIds.filter(id => id !== materialId)
          : [...prev.bookmarkedItemIds, materialId]
      };
    });
  };

  const submitDoubt = (subject: SubjectName, chapterName: string, questionText: string, imageUrl?: string) => {
    const newDoubt: Doubt = {
      id: 'd_' + Date.now(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      subject,
      chapterName,
      classLevel: currentUser.selectedClass || 'Class 10',
      questionText,
      imageUrl,
      status: 'Open',
      askedDate: new Date().toISOString().split('T')[0]
    };
    setDoubts(prev => [newDoubt, ...prev]);
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          chapters: course.chapters.map(ch => ({
            ...ch,
            lessons: ch.lessons.map(l => (l.id === lessonId ? { ...l, completed: true } : l))
          }))
        };
      })
    );
    setCurrentUser(prev => ({ ...prev, totalXP: prev.totalXP + 25 }));
  };

  const submitTestResult = (result: Omit<TestResult, 'id' | 'studentId' | 'dateAttempted'>) => {
    const newResult: TestResult = {
      ...result,
      id: 'res_' + Date.now(),
      studentId: currentUser.id,
      dateAttempted: new Date().toISOString().split('T')[0]
    };
    setTestResults(prev => [newResult, ...prev]);
    setCurrentUser(prev => ({ ...prev, totalXP: prev.totalXP + 150 }));
  };

  const addTeacherPost = (post: Omit<ClassroomPost, 'id' | 'postedDate' | 'likesCount' | 'commentsCount'>) => {
    const newPost: ClassroomPost = {
      ...post,
      id: 'post_' + Date.now(),
      postedDate: new Date().toISOString().split('T')[0],
      likesCount: 0,
      commentsCount: 0
    };
    setClassroomPosts(prev => [newPost, ...prev]);
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const isStudent = activeRole === 'student';
    const msg: ChatMessage = {
      id: 'msg_' + Date.now(),
      senderId: isStudent ? currentUser.id : 'tch_01',
      senderName: isStudent ? currentUser.name : 'Dr. Rajesh Verma',
      senderRole: isStudent ? 'student' : 'teacher',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, msg]);

    // Simulated auto-reply from teacher if sent by student
    if (isStudent) {
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: 'msg_reply_' + Date.now(),
          senderId: 'tch_01',
          senderName: 'Dr. Rajesh Verma (Faculty)',
          senderRole: 'teacher',
          text: `Thanks for asking ${currentUser.name}! I have noted your message regarding "${text.slice(0, 30)}...". I will explain this in detail in today's live session!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, autoReply]);
      }, 1200);
    }
  };

  const toggleLiveReminder = (classId: string) => {
    setLiveClasses(prev =>
      prev.map(lc => (lc.id === classId ? { ...lc, reminderSet: !lc.reminderSet } : lc))
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentUser,
        updateUserClass,
        activeTab,
        setActiveTab,
        selectedCourseId,
        setSelectedCourseId,
        selectedBatchId,
        setSelectedBatchId,
        activeLessonId,
        setActiveLessonId,
        courses,
        batches,
        liveClasses,
        studyMaterials,
        mockTests,
        testResults,
        doubts,
        classroomPosts,
        notifications,
        chatMessages,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        enrollInBatch,
        enrollInCourse,
        toggleBookmark,
        submitDoubt,
        markLessonComplete,
        submitTestResult,
        addTeacherPost,
        sendChatMessage,
        toggleLiveReminder,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
