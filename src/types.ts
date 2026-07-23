export type UserRole = 'student' | 'teacher' | 'admin';

export type ClassLevel = 
  | 'Class 6' 
  | 'Class 7' 
  | 'Class 8' 
  | 'Class 9' 
  | 'Class 10' 
  | 'Class 11' 
  | 'Class 12' 
  | 'Competitive Exams' 
  | 'Skill & Other';

export type SubjectName = 
  | 'Mathematics' 
  | 'Physics' 
  | 'Chemistry' 
  | 'Biology' 
  | 'Science' 
  | 'Social Science' 
  | 'English' 
  | 'Hindi' 
  | 'Computer Science';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  selectedClass?: ClassLevel;
  targetExam?: string;
  streakDays: number;
  totalXP: number;
  enrolledBatchIds: string[];
  enrolledCourseIds: string[];
  bookmarkedItemIds: string[];
  badges: Badge[];
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  subject: SubjectName;
  experienceYears: number;
  rating: number;
  bio: string;
  studentsCount: number;
  coursesCount: number;
  qualifications: string[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  isFreePreview?: boolean;
  notesPdfUrl?: string;
  summaryText?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  imageUrl?: string;
}

export interface Quiz {
  id: string;
  chapterId?: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  unitName: string;
  description: string;
  lessons: Lesson[];
  quizzes: Quiz[];
}

export interface Course {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subject: SubjectName;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  description: string;
  thumbnail: string;
  durationHours: number;
  totalLessons: number;
  totalQuizzes: number;
  totalTests: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: 'English' | 'Hinglish' | 'Hindi';
  rating: number;
  reviewCount: number;
  price: number; // 0 for free
  isFree: boolean;
  chapters: Chapter[];
  syllabusOverview: string[];
  tags: string[];
}

export interface Batch {
  id: string;
  title: string;
  classLevel: ClassLevel;
  targetExam?: string;
  thumbnail: string;
  description: string;
  startDate: string;
  endDate: string;
  teachers: Teacher[];
  courseIds: string[];
  enrolledStudentsCount: number;
  price: number;
  originalPrice: number;
  isFree: boolean;
  scheduleDays: string;
  timing: string;
  features: string[];
}

export interface LiveClass {
  id: string;
  title: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  teacherName: string;
  teacherAvatar: string;
  batchTitle?: string;
  scheduledAt: string; // ISO or human string
  durationMinutes: number;
  status: 'live' | 'upcoming' | 'completed';
  recordingUrl?: string;
  reminderSet?: boolean;
  description: string;
  attendeesCount: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF Notes' | 'Revision Notes' | 'Formula Sheet' | 'PYQ Paper' | 'Sample Paper' | 'Worksheet';
  classLevel: ClassLevel;
  subject: SubjectName;
  chapterName?: string;
  fileSize: string;
  downloadUrl: string;
  uploadedDate: string;
  downloadsCount: number;
  bookmarked?: boolean;
}

export interface MockTest {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subject: SubjectName;
  type: 'Full Syllabus' | 'Chapter Test' | 'Weekly Test' | 'PYQ';
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: QuizQuestion[];
  instructions: string[];
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  studentId: string;
  score: number;
  totalMarks: number;
  accuracyPercent: number;
  timeTakenMinutes: number;
  dateAttempted: string;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  unansweredCount: number;
  weakTopics: string[];
  strongTopics: string[];
}

export interface Doubt {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  subject: SubjectName;
  chapterName: string;
  classLevel: ClassLevel;
  questionText: string;
  imageUrl?: string;
  status: 'Open' | 'Pending' | 'Answered' | 'Resolved';
  askedDate: string;
  teacherResponse?: {
    teacherName: string;
    teacherAvatar: string;
    answerText: string;
    answeredDate: string;
    audioUrl?: string;
  };
}

export interface ClassroomPost {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  subject: SubjectName;
  title: string;
  content: string;
  postedDate: string;
  attachmentName?: string;
  attachmentType?: 'PDF' | 'Image' | 'Link' | 'Quiz';
  attachmentUrl?: string;
  likesCount: number;
  commentsCount: number;
  isPinned?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'live_class' | 'announcement' | 'quiz' | 'doubt_reply' | 'course_update';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface Badge {
  id: string;
  name: string;
  iconName: string;
  description: string;
  unlockedAt?: string;
  color: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  classLevel: ClassLevel;
  issueDate: string;
  instructorName: string;
}
