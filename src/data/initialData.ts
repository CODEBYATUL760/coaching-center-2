import {
  User,
  Teacher,
  Course,
  Batch,
  LiveClass,
  StudyMaterial,
  MockTest,
  Doubt,
  ClassroomPost,
  NotificationItem,
  Badge,
  ClassLevel,
  SubjectName,
  Quiz
} from '../types';

export const CLASSES_LIST: ClassLevel[] = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'Competitive Exams',
  'Skill & Other'
];

export const SUBJECTS_BY_CLASS: Record<string, SubjectName[]> = {
  'Class 6': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  'Class 7': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  'Class 8': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
  'Class 9': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science', 'English'],
  'Class 10': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science', 'English', 'Hindi'],
  'Class 11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science'],
  'Class 12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science'],
  'Competitive Exams': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  'Skill & Other': ['Computer Science', 'English']
};

export const MOCK_STUDENT: User = {
  id: 'stu_101',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@auraed.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  phone: '+91 98765 43210',
  selectedClass: 'Class 10',
  targetExam: 'Class 10 Board + NTSE 2026',
  streakDays: 14,
  totalXP: 3450,
  enrolledBatchIds: ['batch_c10_01', 'batch_jee_01'],
  enrolledCourseIds: ['course_p10_01', 'course_m10_01', 'course_c10_01'],
  bookmarkedItemIds: ['mat_p10_01', 'mat_m10_02'],
  badges: [
    { id: 'b1', name: '14-Day Streak', iconName: 'Flame', description: 'Maintained 14 consecutive daily study sessions', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40', unlockedAt: '2026-07-20' },
    { id: 'b2', name: 'Quiz Master', iconName: 'Award', description: 'Scored 90%+ in 5 chapter quizzes', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40', unlockedAt: '2026-07-15' },
    { id: 'b3', name: 'Test Champion', iconName: 'Trophy', description: 'Ranked top 5% in Class 10 All India Mock', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40', unlockedAt: '2026-07-10' },
    { id: 'b4', name: 'Night Owl Scholar', iconName: 'Moon', description: 'Completed 10 lessons in late evening sessions', color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40', unlockedAt: '2026-07-05' }
  ]
};

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'tch_01',
    name: 'Dr. Rajesh Verma',
    title: 'Senior Physics Faculty (Ph.D. IIT Delhi)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    subject: 'Physics',
    experienceYears: 14,
    rating: 4.9,
    bio: 'Ex-IITian mentor with 14+ years experience mentoring 5,000+ top rankers in Physics for Class 9-12 and JEE/NEET.',
    studentsCount: 28400,
    coursesCount: 8,
    qualifications: ['Ph.D. Physics - IIT Delhi', 'M.Sc. Physics Gold Medalist']
  },
  {
    id: 'tch_02',
    name: 'Ananya Deshmukh',
    title: 'Mathematics HOD & NTSE Mentor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    subject: 'Mathematics',
    experienceYears: 11,
    rating: 4.8,
    bio: 'Passionate math educator known for visual problem-solving tricks, board exam strategy, and Olympiad prep.',
    studentsCount: 32100,
    coursesCount: 12,
    qualifications: ['M.Sc. Mathematics - Delhi University', 'Author of CBSE Math Crackers']
  },
  {
    id: 'tch_03',
    name: 'Prof. Vikramaditya Singh',
    title: 'Head of Physical & Organic Chemistry',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    subject: 'Chemistry',
    experienceYears: 12,
    rating: 4.9,
    bio: 'Master of chemical reaction mechanisms, periodic trends, and formula visualization with simplified memory techniques.',
    studentsCount: 24500,
    coursesCount: 6,
    qualifications: ['M.Tech Chemical - BITS Pilani']
  },
  {
    id: 'tch_04',
    name: 'Dr. Sunita Kulkarni',
    title: 'Senior Biology Educator & NEET Expert',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=250',
    subject: 'Biology',
    experienceYears: 15,
    rating: 4.9,
    bio: 'Guided over 2,000 future medical doctors in Board Biology and NEET NCERT mastery with 3D diagram lectures.',
    studentsCount: 19800,
    coursesCount: 7,
    qualifications: ['M.D. / M.Sc. Life Sciences']
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'course_p10_01',
    title: 'Class 10 Physics: Complete Board & NTSE Foundation',
    classLevel: 'Class 10',
    subject: 'Physics',
    teacherId: 'tch_01',
    teacherName: 'Dr. Rajesh Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    description: 'Master Light, Electricity, Magnetic Effects, and Human Eye with interactive diagrams, numerical practice, NCERT exemplar solutions, and PYQs.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    durationHours: 48,
    totalLessons: 32,
    totalQuizzes: 8,
    totalTests: 4,
    difficulty: 'Intermediate',
    language: 'Hinglish',
    rating: 4.9,
    reviewCount: 1240,
    price: 0,
    isFree: true,
    tags: ['Class 10', 'Physics', 'CBSE Boards', 'NTSE', 'NCERT Solutions'],
    syllabusOverview: [
      'Unit 1: Light - Reflection and Refraction & Ray Diagrams',
      'Unit 2: Electricity - Ohm\'s Law, Resistance in Series/Parallel & Heating Effects',
      'Unit 3: Magnetic Effects of Electric Current & Electromagnetism',
      'Unit 4: The Human Eye and the Colorful World'
    ],
    chapters: [
      {
        id: 'chap_p10_01',
        courseId: 'course_p10_01',
        unitName: 'Unit 1',
        title: 'Chapter 1: Light - Reflection & Refraction',
        description: 'Understand laws of reflection, spherical mirrors, lens formula, and magnification with solved numericals.',
        lessons: [
          {
            id: 'les_p10_01',
            chapterId: 'chap_p10_01',
            title: 'Lesson 1: Introduction to Light & Laws of Reflection',
            durationMinutes: 24,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            summaryText: 'Light travels in straight lines. Reflection occurs when light bounces off smooth surfaces following angle i = angle r.',
            completed: true
          },
          {
            id: 'les_p10_02',
            chapterId: 'chap_p10_01',
            title: 'Lesson 2: Concave & Convex Mirrors - Ray Diagrams',
            durationMinutes: 32,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            summaryText: 'Learn ray construction rules for concave mirrors (focus, center of curvature, principal axis) and image positions.',
            completed: true
          },
          {
            id: 'les_p10_03',
            chapterId: 'chap_p10_01',
            title: 'Lesson 3: Mirror Formula & Numerical Problem Solving',
            durationMinutes: 28,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: false,
            summaryText: 'Sign convention rules (+ / -) and step-by-step application of 1/f = 1/v + 1/u and magnification m = -v/u.',
            completed: false
          }
        ],
        quizzes: [
          {
            id: 'quiz_p10_01',
            chapterId: 'chap_p10_01',
            subject: 'Physics',
            classLevel: 'Class 10',
            title: 'Chapter 1 Quiz: Reflection & Mirror Formula',
            description: '10 High-yield questions to test ray diagrams and sign convention.',
            durationMinutes: 15,
            totalQuestions: 5,
            passingScorePercent: 70,
            questions: [
              {
                id: 'q1',
                questionText: 'An object is placed at 20 cm in front of a concave mirror of focal length 10 cm. The image formed is:',
                options: ['Real, inverted and same size at 20 cm', 'Virtual and erect at 10 cm', 'Real, inverted and enlarged at 40 cm', 'Virtual at infinity'],
                correctOptionIndex: 0,
                explanation: 'When object is placed at C (since u = -20 cm = 2f), image is formed at C (v = -20 cm) which is real, inverted, and same size.'
              },
              {
                id: 'q2',
                questionText: 'The refractive index of glass is 1.5. Speed of light in glass is:',
                options: ['3 x 10^8 m/s', '2 x 10^8 m/s', '1.5 x 10^8 m/s', '2.25 x 10^8 m/s'],
                correctOptionIndex: 1,
                explanation: 'v = c / n = (3 x 10^8 m/s) / 1.5 = 2 x 10^8 m/s.'
              },
              {
                id: 'q3',
                questionText: 'Which mirror is commonly used as a rear-view mirror in motor cars?',
                options: ['Concave mirror', 'Plane mirror', 'Convex mirror', 'Parabolic mirror'],
                correctOptionIndex: 2,
                explanation: 'Convex mirrors produce an erect, diminished image and provide a wider field of view for drivers.'
              },
              {
                id: 'q4',
                questionText: 'Power of a lens of focal length 0.5 meters is:',
                options: ['+0.5 D', '+2 D', '-2 D', '+1 D'],
                correctOptionIndex: 1,
                explanation: 'Power P = 1 / f(m) = 1 / 0.5 = +2 Dioptres.'
              },
              {
                id: 'q5',
                questionText: 'A ray of light traveling from air into water bends:',
                options: ['Away from the normal', 'Towards the normal', 'Undeviated', 'Reflects back 180 degrees'],
                correctOptionIndex: 1,
                explanation: 'Water is optically denser than air, so light slows down and bends towards the normal.'
              }
            ]
          }
        ]
      },
      {
        id: 'chap_p10_02',
        courseId: 'course_p10_01',
        unitName: 'Unit 2',
        title: 'Chapter 2: Electricity & Circuits',
        description: 'Covers electric charge, current, potential difference, Ohm\'s law, equivalent resistance & Joule\'s heating law.',
        lessons: [
          {
            id: 'les_p10_04',
            chapterId: 'chap_p10_02',
            title: 'Lesson 1: Electric Current, Potential & Voltage',
            durationMinutes: 30,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: true,
            summaryText: 'Current I = Q/t measured in Amperes. Potential difference V = W/Q measured in Volts.',
            completed: false
          },
          {
            id: 'les_p10_05',
            chapterId: 'chap_p10_02',
            title: 'Lesson 2: Ohm\'s Law & Factors Affecting Resistance',
            durationMinutes: 35,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: false,
            summaryText: 'V = I * R. Resistance depends on resistivity (rho), length L, and cross-sectional area A.',
            completed: false
          }
        ],
        quizzes: []
      }
    ]
  },
  {
    id: 'course_m10_01',
    title: 'Class 10 Mathematics: Master CBSE & NTSE Algebra + Geometry',
    classLevel: 'Class 10',
    subject: 'Mathematics',
    teacherId: 'tch_02',
    teacherName: 'Ananya Deshmukh',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    description: 'Comprehensive coverage of Polynomials, Quadratic Equations, Arithmetic Progressions, Trigonometry, and Circles with short tricks and step-by-step board presentation methods.',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    durationHours: 60,
    totalLessons: 45,
    totalQuizzes: 12,
    totalTests: 6,
    difficulty: 'All Levels',
    language: 'Hinglish',
    rating: 4.8,
    reviewCount: 2150,
    price: 999,
    isFree: false,
    tags: ['Class 10', 'Maths', 'Trigonometry', 'CBSE Boards', 'Algebra'],
    syllabusOverview: [
      'Unit 1: Real Numbers & Polynomials',
      'Unit 2: Pair of Linear Equations & Quadratic Equations',
      'Unit 3: Trigonometry Identities & Applications',
      'Unit 4: Circles, Constructions & Coordinate Geometry'
    ],
    chapters: [
      {
        id: 'chap_m10_01',
        courseId: 'course_m10_01',
        unitName: 'Unit 1',
        title: 'Chapter 1: Quadratic Equations',
        description: 'Standard form ax^2 + bx + c = 0, factorization, quadratic formula, and discriminant analysis.',
        lessons: [
          {
            id: 'les_m10_01',
            chapterId: 'chap_m10_01',
            title: 'Lesson 1: Standard Form & Splitting the Middle Term',
            durationMinutes: 26,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            isFreePreview: true,
            summaryText: 'Learn quick factor identification for splitting middle terms without trial-and-error.',
            completed: true
          }
        ],
        quizzes: []
      }
    ]
  },
  {
    id: 'course_c10_01',
    title: 'Class 10 Chemistry: Reactions, Acids, Bases & Metals',
    classLevel: 'Class 10',
    subject: 'Chemistry',
    teacherId: 'tch_03',
    teacherName: 'Prof. Vikramaditya Singh',
    teacherAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    description: 'Master balancing chemical equations, pH scale concepts, metallurgy extractions, and carbon compounds with clear reaction mechanisms.',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
    durationHours: 36,
    totalLessons: 24,
    totalQuizzes: 6,
    totalTests: 3,
    difficulty: 'Intermediate',
    language: 'English',
    rating: 4.9,
    reviewCount: 890,
    price: 0,
    isFree: true,
    tags: ['Class 10', 'Chemistry', 'Carbon Compounds', 'Reactions'],
    syllabusOverview: [
      'Unit 1: Chemical Reactions & Equations',
      'Unit 2: Acids, Bases and Salts',
      'Unit 3: Metals and Non-metals',
      'Unit 4: Carbon and Its Compounds'
    ],
    chapters: []
  },
  {
    id: 'course_jee_01',
    title: 'JEE Main & Advanced 2027: Physics Mechanics & Electrodynamics',
    classLevel: 'Competitive Exams',
    subject: 'Physics',
    teacherId: 'tch_01',
    teacherName: 'Dr. Rajesh Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    description: 'Rigorous problem-solving strategies for Kinematics, Newton Laws of Motion, Work Energy Power, Rotational Dynamics, and Electrostatics for top 100 AIR JEE aspirants.',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    durationHours: 120,
    totalLessons: 80,
    totalQuizzes: 20,
    totalTests: 10,
    difficulty: 'Advanced',
    language: 'Hinglish',
    rating: 5.0,
    reviewCount: 3100,
    price: 2499,
    isFree: false,
    tags: ['JEE Main', 'JEE Advanced', 'Physics', 'Mechanics', 'Class 11/12'],
    syllabusOverview: [
      'Module 1: Vector Algebra & Calculus Applications in Motion',
      'Module 2: Newton\'s Laws & Friction with Constraint Equations',
      'Module 3: Center of Mass, Collisions & Rotational Mechanics',
      'Module 4: Simple Harmonic Motion & Waves'
    ],
    chapters: []
  }
];

export const MOCK_BATCHES: Batch[] = [
  {
    id: 'batch_c10_01',
    title: 'Class 10 Board Excellence Batch 2026',
    classLevel: 'Class 10',
    targetExam: 'CBSE / ICSE Board Exams 2026',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    description: 'Complete year-long live interactive batch covering Physics, Chemistry, Math, Biology, SS, and English with weekly mock tests, instant doubt support, and handwritten PDF notes.',
    startDate: '2026-04-10',
    endDate: '2026-03-15',
    teachers: [MOCK_TEACHERS[0], MOCK_TEACHERS[1], MOCK_TEACHERS[2], MOCK_TEACHERS[3]],
    courseIds: ['course_p10_01', 'course_m10_01', 'course_c10_01'],
    enrolledStudentsCount: 4820,
    price: 1999,
    originalPrice: 4999,
    isFree: false,
    scheduleDays: 'Monday to Saturday',
    timing: '5:00 PM - 8:15 PM',
    features: [
      'Live interactive classes with instant hand-raise',
      'Doubt solving within 20 minutes',
      'Chapter-wise downloadable PDF notes & formula sheets',
      'Weekly Sunday Mock Tests with All India Rank',
      'Parent-teacher quarterly progress reports'
    ]
  },
  {
    id: 'batch_jee_01',
    title: 'JEE Spark Foundation Batch (Class 10 to 11 Bridge)',
    classLevel: 'Competitive Exams',
    targetExam: 'JEE Main & Advanced 2028',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    description: 'Build bulletproof fundamentals in Physics, Chemistry, and Math for early starters aiming for Top 500 rank in JEE.',
    startDate: '2026-05-01',
    endDate: '2026-12-30',
    teachers: [MOCK_TEACHERS[0], MOCK_TEACHERS[2]],
    courseIds: ['course_jee_01'],
    enrolledStudentsCount: 3150,
    price: 3499,
    originalPrice: 7999,
    isFree: false,
    scheduleDays: 'Mon, Wed, Fri',
    timing: '6:30 PM - 8:30 PM',
    features: [
      'Advanced problem solving & olympiad tricks',
      'Daily Practice Problem (DPP) sheets with video solutions',
      '1-on-1 mentorship sessions'
    ]
  },
  {
    id: 'batch_c9_01',
    title: 'Class 9 Udaan Board & Olympiad Batch',
    classLevel: 'Class 9',
    targetExam: 'Class 9 Final Exams & NSEJS',
    thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    description: 'Complete Science, Math & English coverage with strong focus on concept clarity and application.',
    startDate: '2026-04-15',
    endDate: '2026-03-01',
    teachers: [MOCK_TEACHERS[1], MOCK_TEACHERS[3]],
    courseIds: [],
    enrolledStudentsCount: 2200,
    price: 0,
    originalPrice: 2999,
    isFree: true,
    scheduleDays: 'Tue, Thu, Sat',
    timing: '4:00 PM - 6:00 PM',
    features: [
      'Free live stream access',
      'Chapter test series included',
      'Doubt forum support'
    ]
  }
];

export const MOCK_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live_01',
    title: 'Electric Circuits & Ohm\'s Law Numerical Mastery',
    subject: 'Physics',
    classLevel: 'Class 10',
    teacherName: 'Dr. Rajesh Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    batchTitle: 'Class 10 Board Excellence Batch 2026',
    scheduledAt: '2026-07-23T17:30:00.000Z',
    durationMinutes: 60,
    status: 'live',
    description: 'Live interactive numerical problem solving session on resistance combination and power dissipation.',
    attendeesCount: 1420
  },
  {
    id: 'live_02',
    title: 'Trigonometric Identities & Board PYQs Shortcuts',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    teacherName: 'Ananya Deshmukh',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    batchTitle: 'Class 10 Board Excellence Batch 2026',
    scheduledAt: '2026-07-23T19:00:00.000Z',
    durationMinutes: 75,
    status: 'upcoming',
    reminderSet: true,
    description: 'Learn the top 10 most frequently asked board exam questions in Trigonometric proof.',
    attendeesCount: 980
  },
  {
    id: 'live_03',
    title: 'Carbon & Its Compounds: Hydrocarbons & Isomerism',
    subject: 'Chemistry',
    classLevel: 'Class 10',
    teacherName: 'Prof. Vikramaditya Singh',
    teacherAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    batchTitle: 'Class 10 Board Excellence Batch 2026',
    scheduledAt: '2026-07-22T17:00:00.000Z',
    durationMinutes: 60,
    status: 'completed',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Detailed explanation of alkanes, alkenes, alkynes, functional groups, and structural isomers.',
    attendeesCount: 1850
  }
];

export const MOCK_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat_p10_01',
    title: 'Class 10 Physics: Light Reflection & Refraction Handcrafted Notes',
    type: 'PDF Notes',
    classLevel: 'Class 10',
    subject: 'Physics',
    chapterName: 'Light - Reflection & Refraction',
    fileSize: '4.2 MB',
    downloadUrl: '#',
    uploadedDate: '2026-07-15',
    downloadsCount: 3820,
    bookmarked: true
  },
  {
    id: 'mat_m10_02',
    title: 'All Trigonometry Formulas & Important Proof Sheet (CBSE 2026)',
    type: 'Formula Sheet',
    classLevel: 'Class 10',
    subject: 'Mathematics',
    chapterName: 'Trigonometry',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    uploadedDate: '2026-07-18',
    downloadsCount: 5120,
    bookmarked: true
  },
  {
    id: 'mat_c10_03',
    title: 'CBSE Class 10 Chemistry 5-Year Solved PYQ Collection',
    type: 'PYQ Paper',
    classLevel: 'Class 10',
    subject: 'Chemistry',
    chapterName: 'All Chapters',
    fileSize: '8.5 MB',
    downloadUrl: '#',
    uploadedDate: '2026-07-10',
    downloadsCount: 6400,
    bookmarked: false
  },
  {
    id: 'mat_b10_04',
    title: 'Life Processes 3D Labelled Diagrams & Short Summary',
    type: 'Revision Notes',
    classLevel: 'Class 10',
    subject: 'Biology',
    chapterName: 'Life Processes',
    fileSize: '3.1 MB',
    downloadUrl: '#',
    uploadedDate: '2026-07-12',
    downloadsCount: 2900,
    bookmarked: false
  }
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test_101',
    title: 'Class 10 All India Science & Math Mock Test #4',
    classLevel: 'Class 10',
    subject: 'Physics',
    type: 'Full Syllabus',
    durationMinutes: 60,
    totalMarks: 50,
    passingMarks: 20,
    instructions: [
      'The test consists of 10 Multiple Choice Questions.',
      'Each correct answer carries 5 marks.',
      'There is NO negative marking for incorrect answers.',
      'Do not switch browser tabs or exit fullscreen mode during the test.',
      'You can mark questions for review and return to them anytime before final submission.'
    ],
    questions: [
      {
        id: 'tq1',
        questionText: 'An electric heater of resistance 8 ohms draws 15 A from the service mains for 2 hours. Calculate the rate at which heat is developed in the heater.',
        options: ['1800 W', '1200 W', '2400 W', '3600 W'],
        correctOptionIndex: 0,
        explanation: 'Rate of heat development is Power P = I^2 * R = (15)^2 * 8 = 225 * 8 = 1800 Joules per second = 1800 W.'
      },
      {
        id: 'tq2',
        questionText: 'If the focal length of a spherical mirror is +15 cm, the mirror is:',
        options: ['Concave mirror', 'Convex mirror', 'Plane mirror', 'Parabolic concave mirror'],
        correctOptionIndex: 1,
        explanation: 'By Cartesian sign convention, convex mirrors have positive focal length (+f).'
      },
      {
        id: 'tq3',
        questionText: 'Which gas is evolved when dilute hydrochloric acid is added to reactive metals like zinc?',
        options: ['Oxygen gas', 'Carbon dioxide gas', 'Hydrogen gas', 'Chlorine gas'],
        correctOptionIndex: 2,
        explanation: 'Metal + Acid -> Salt + Hydrogen gas (Zn + 2HCl -> ZnCl2 + H2 ↑).'
      },
      {
        id: 'tq4',
        questionText: 'Roots of the quadratic equation 2x^2 - 7x + 3 = 0 are:',
        options: ['3 and 1/2', '2 and 3', '-3 and -1/2', '1 and 6'],
        correctOptionIndex: 0,
        explanation: '2x^2 - 6x - x + 3 = 0 => 2x(x - 3) - 1(x - 3) = 0 => x = 3 or x = 1/2.'
      },
      {
        id: 'tq5',
        questionText: 'The human eye forms the image of an object at its:',
        options: ['Cornea', 'Iris', 'Pupil', 'Retina'],
        correctOptionIndex: 3,
        explanation: 'The light-sensitive screen at the back of the eye where real inverted images form is the Retina.'
      }
    ]
  }
];

export const MOCK_DOUBTS: Doubt[] = [
  {
    id: 'd_101',
    studentId: 'stu_101',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    subject: 'Physics',
    chapterName: 'Electricity',
    classLevel: 'Class 10',
    questionText: 'Why does the resistance of a conductor increase when its temperature rises? Can you explain with free electron collisions?',
    status: 'Answered',
    askedDate: '2026-07-21',
    teacherResponse: {
      teacherName: 'Dr. Rajesh Verma',
      teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
      answerText: 'Great conceptual question Aarav! As temperature increases, metal atoms vibrate faster around their fixed positions. Free electrons drift towards positive terminal collide much more frequently with vibrating lattice ions. Higher collision frequency reduces relaxation time (tau), which increases electrical resistivity.',
      answeredDate: '2026-07-21'
    }
  },
  {
    id: 'd_102',
    studentId: 'stu_101',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    subject: 'Mathematics',
    chapterName: 'Trigonometry',
    classLevel: 'Class 10',
    questionText: 'How to prove (sin theta - cos theta + 1) / (sin theta + cos theta - 1) = 1 / (sec theta - tan theta)? Please share step by step solution.',
    status: 'Open',
    askedDate: '2026-07-22'
  }
];

export const MOCK_CLASSROOM_POSTS: ClassroomPost[] = [
  {
    id: 'post_01',
    teacherId: 'tch_01',
    teacherName: 'Dr. Rajesh Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    subject: 'Physics',
    title: '📌 Important Physics Formula Revision Sheet & Tomorrow\'s Class Prep',
    content: 'Dear Class 10 Champions! I have uploaded the comprehensive 1-page formula cheat sheet for Electricity & Optics. Please review the sign conventions before our live numerical workshop tomorrow at 5:30 PM!',
    postedDate: '2026-07-22',
    attachmentName: 'Class10_Physics_Formula_Master.pdf',
    attachmentType: 'PDF',
    attachmentUrl: '#',
    likesCount: 284,
    commentsCount: 38,
    isPinned: true
  },
  {
    id: 'post_02',
    teacherId: 'tch_02',
    teacherName: 'Ananya Deshmukh',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    subject: 'Mathematics',
    title: '🎯 Sunday Math Speed Quiz Announcement',
    content: 'We are organizing an interactive 20-minute speed quiz on Quadratic Equations & AP this Sunday at 11:00 AM. Top 3 scorers will win AuraEd Special Merit Badges!',
    postedDate: '2026-07-21',
    attachmentName: 'Sample_Practice_Problems.pdf',
    attachmentType: 'PDF',
    attachmentUrl: '#',
    likesCount: 195,
    commentsCount: 22,
    isPinned: false
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: '🔴 Live Class Started!',
    message: 'Dr. Rajesh Verma has started "Electric Circuits & Ohm\'s Law Numerical Mastery". Join now!',
    type: 'live_class',
    timestamp: '10 minutes ago',
    read: false,
    linkTab: 'live'
  },
  {
    id: 'notif_2',
    title: '💬 Doubt Answered',
    message: 'Dr. Rajesh Verma answered your doubt on Physics Electricity.',
    type: 'doubt_reply',
    timestamp: '2 hours ago',
    read: false,
    linkTab: 'doubts'
  },
  {
    id: 'notif_3',
    title: '📢 Teacher Announcement',
    message: 'Ananya Deshmukh posted "Sunday Math Speed Quiz Announcement" in Class 10 Feed.',
    type: 'announcement',
    timestamp: '1 day ago',
    read: true,
    linkTab: 'classroom'
  }
];
