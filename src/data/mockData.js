export const DEMO_PROFILES = {
    student: {
        id: 'user-std-01',
        name: 'Adaeze (Ada) Okonkwo',
        role: 'student',
        roleTitle: 'Day Student • SS1 Dynamo',
        email: 'ada.okonkwo@demo.schoolhub.local',
        classGroup: 'SS1 Dynamo',
        avatarInitials: 'AO'
    },
    teacher: {
        id: 'user-tch-01',
        name: 'Mr. Babatunde Alabi',
        role: 'teacher',
        roleTitle: 'Lead Teacher • Mathematics & Physics',
        email: 'b.alabi@demo.schoolhub.local',
        avatarInitials: 'BA',
        verifiedTeacher: true
    },
    admin: {
        id: 'user-adm-01',
        name: 'Mrs. Clara Nnamdi',
        role: 'admin',
        roleTitle: 'Pilot Coordinator & Vice Principal',
        email: 'c.nnamdi@demo.schoolhub.local',
        avatarInitials: 'CN'
    }
};
export const INITIAL_CLASSES = [
    {
        id: 'cls-math-dyn',
        name: 'Mathematics',
        code: 'MTH 101',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mr. Babatunde Alabi',
        teacherEmail: 'b.alabi@demo.schoolhub.local',
        room: 'Room 12B (Science Wing)',
        schedule: 'Mon & Wed • 8:30 AM - 9:50 AM',
        resourceCount: 8,
        assignmentCount: 2,
        studentCount: 32,
        colorAccent: '#356AE6',
        description: 'Core algebra, quadratic inequalities, linear equations, set theory, and Euclidean geometric foundations.'
    },
    {
        id: 'cls-eng-dyn',
        name: 'English Language',
        code: 'ENG 101',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mrs. Funke Adewale',
        teacherEmail: 'f.adewale@demo.schoolhub.local',
        room: 'Room 08A (Humanities)',
        schedule: 'Tue & Thu • 10:15 AM - 11:35 AM',
        resourceCount: 6,
        assignmentCount: 1,
        studentCount: 32,
        colorAccent: '#8B5CF6',
        description: 'Comprehensive comprehension analysis, expository writing techniques, grammar mastery, and oral English.'
    },
    {
        id: 'cls-phy-dyn',
        name: 'Physics',
        code: 'PHY 101',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mr. Babatunde Alabi',
        teacherEmail: 'b.alabi@demo.schoolhub.local',
        room: 'Physics Lab 2',
        schedule: 'Mon & Thu • 11:45 AM - 1:00 PM',
        resourceCount: 5,
        assignmentCount: 1,
        studentCount: 32,
        colorAccent: '#0EA5E9',
        description: 'Measurements, vectors, kinematics, rectilinear acceleration, friction, and lab measurement rigor.'
    },
    {
        id: 'cls-bio-hrz',
        name: 'Biology',
        code: 'BIO 101',
        classGroup: 'SS1 Horizon',
        teacherName: 'Dr. Kelechi Ibe',
        teacherEmail: 'k.ibe@demo.schoolhub.local',
        room: 'Biology Lab 1',
        schedule: 'Mon & Wed • 10:15 AM - 11:35 AM',
        resourceCount: 9,
        assignmentCount: 1,
        studentCount: 32,
        colorAccent: '#16845B',
        description: 'Cellular ultrastructure, cell division, plant nutrition, and comparative anatomy of flowering plants.'
    },
    {
        id: 'cls-chm-hrz',
        name: 'Chemistry',
        code: 'CHM 101',
        classGroup: 'SS1 Horizon',
        teacherName: 'Mr. Emmanuel Danjuma',
        teacherEmail: 'e.danjuma@demo.schoolhub.local',
        room: 'Chemistry Lab 1',
        schedule: 'Tue & Fri • 8:30 AM - 9:50 AM',
        resourceCount: 7,
        assignmentCount: 2,
        studentCount: 32,
        colorAccent: '#F59E0B',
        description: 'Atomic structure, periodic table trends, stoichiometry, chemical bonding, and gas behavior laws.'
    },
    {
        id: 'cls-civ-all',
        name: 'Civic Education',
        code: 'CIV 101',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mrs. Grace Okafor',
        teacherEmail: 'g.okafor@demo.schoolhub.local',
        room: 'Auditorium Hall B',
        schedule: 'Friday • 10:15 AM - 11:45 AM',
        resourceCount: 4,
        assignmentCount: 0,
        studentCount: 64,
        colorAccent: '#EC4899',
        description: 'Democratic values, rule of law, human rights advocacy, responsible citizenship, and community governance.'
    }
];
export const INITIAL_ASSIGNMENTS = [
    {
        id: 'asg-01',
        title: 'Practice: Linear & Quadratic Equations',
        subject: 'Mathematics',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mr. Babatunde Alabi',
        dueDate: '2026-10-15',
        dueTime: '11:59 PM',
        points: 25,
        status: 'in_progress',
        instructions: 'Complete exercises 4 through 18 on page 84. Show clear algebraic steps for completing the square and the discriminant test. Upload your neatly written or scanned solution page.',
        attachmentName: 'Math_Worksheet_Unit3_Equations.pdf',
        attachmentSize: '410 KB'
    },
    {
        id: 'asg-02',
        title: 'Argumentative Essay: Clean Energy Transition',
        subject: 'English Language',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mrs. Funke Adewale',
        dueDate: '2026-10-18',
        dueTime: '4:00 PM',
        points: 40,
        status: 'not_started',
        instructions: 'Write a 450–500 word argumentative essay addressing whether decentralized solar microgrids are the most practical solution for rural electricity. Pay close attention to paragraph unity and rhetorical signposting.',
        attachmentName: 'Essay_Rubric_and_Guidelines.pdf',
        attachmentSize: '290 KB'
    },
    {
        id: 'asg-03',
        title: 'Kinematics & Velocity-Time Graphs Writeup',
        subject: 'Physics',
        classGroup: 'SS1 Dynamo',
        teacherName: 'Mr. Babatunde Alabi',
        dueDate: '2026-10-21',
        dueTime: '5:00 PM',
        points: 30,
        status: 'not_started',
        instructions: 'Review data table 2 from the ticker-timer lab session. Plot acceleration versus time on millimeter graph paper and determine the rate of uniform retardation from Section B.',
        attachmentName: 'Physics_Lab_Manual_Expt4.pdf',
        attachmentSize: '1.2 MB'
    },
    {
        id: 'asg-04',
        title: 'Cellular Respiration Diagram & Pathway Map',
        subject: 'Biology',
        classGroup: 'SS1 Horizon',
        teacherName: 'Dr. Kelechi Ibe',
        dueDate: '2026-10-10',
        dueTime: '11:59 PM',
        points: 20,
        status: 'submitted',
        instructions: 'Provide an annotated schematic comparing aerobic glycolysis and fermentation in yeast cells.',
        attachmentName: 'Cell_Diagram_Template.pdf',
        attachmentSize: '520 KB',
        submittedAt: '2026-10-09 08:34 PM',
        submissionNotes: 'Uploaded completed high-resolution schematic with mitochondrial membrane labels.'
    },
    {
        id: 'asg-05',
        title: 'Periodic Trends & Electronegativity Analysis',
        subject: 'Chemistry',
        classGroup: 'SS1 Horizon',
        teacherName: 'Mr. Emmanuel Danjuma',
        dueDate: '2026-10-08',
        dueTime: '11:59 PM',
        points: 25,
        status: 'past_due',
        instructions: 'Calculate the ionization energy anomalies across Period 3 elements and explain electron shielding in sulfur versus phosphorus.',
        attachmentName: 'Chem_Periodicity_Quiz.pdf',
        attachmentSize: '340 KB'
    }
];
export const INITIAL_ANNOUNCEMENTS = [
    {
        id: 'ann-01',
        title: 'SS1 Dynamo: Mathematics Revision Notes Uploaded',
        content: 'Comprehensive summary sheets covering Quadratic Equations, Polynomial Factorization, and Surds are now live in the Learning Centre. Please review before Wednesday’s practical problem session.',
        authorName: 'Mr. Babatunde Alabi',
        authorRole: 'Teacher',
        date: 'Today at 08:15 AM',
        category: 'Class Update',
        isRead: false,
        classGroup: 'SS1 Dynamo',
        important: true
    },
    {
        id: 'ann-02',
        title: 'Upcoming Pilot Continuous Assessment (CA) Timetable',
        content: 'The provisional assessment schedule for SS1 Dynamo and SS1 Horizon has been posted on the main noticeboard. Assessments will occur during normal lesson slots with zero clash for day students.',
        authorName: 'Mrs. Clara Nnamdi',
        authorRole: 'School Admin',
        date: 'Yesterday at 03:40 PM',
        category: 'General Notice',
        isRead: false,
        important: false
    },
    {
        id: 'ann-03',
        title: 'Inter-Class Science & Quiz Bowl Briefing',
        content: 'Volunteers and team representatives for the friendly science symposium between SS1 Dynamo and SS1 Horizon should gather in Physics Lab 2 this Friday at 1:15 PM for team assignments.',
        authorName: 'Dr. Kelechi Ibe',
        authorRole: 'Teacher',
        date: '2026-10-09',
        category: 'Event',
        isRead: true,
        classGroup: 'SS1 Dynamo'
    },
    {
        id: 'ann-04',
        title: 'School Hub Pilot Feedback Box Open',
        content: 'We welcome all student and faculty thoughts on this prototype navigation. Please let your class prefect or pilot coordinator know how the timetable and assignments overview feels.',
        authorName: 'Mrs. Clara Nnamdi',
        authorRole: 'School Admin',
        date: '2026-10-07',
        category: 'General Notice',
        isRead: true
    }
];
export const TIMETABLE_DATA = [
    // Monday
    { id: 'tt-m1', day: 'Monday', time: '08:30 - 09:50', subject: 'Mathematics', classGroup: 'SS1 Dynamo', room: 'Room 12B', teacher: 'Mr. B. Alabi' },
    { id: 'tt-m2', day: 'Monday', time: '10:15 - 11:35', subject: 'Biology', classGroup: 'SS1 Horizon', room: 'Bio Lab 1', teacher: 'Dr. K. Ibe' },
    { id: 'tt-m3', day: 'Monday', time: '11:45 - 13:00', subject: 'Physics', classGroup: 'SS1 Dynamo', room: 'Physics Lab 2', teacher: 'Mr. B. Alabi' },
    { id: 'tt-m4', day: 'Monday', time: '13:45 - 14:45', subject: 'English Language', classGroup: 'SS1 Horizon', room: 'Room 08A', teacher: 'Mrs. F. Adewale' },
    // Tuesday
    { id: 'tt-t1', day: 'Tuesday', time: '08:30 - 09:50', subject: 'Chemistry', classGroup: 'SS1 Horizon', room: 'Chem Lab 1', teacher: 'Mr. E. Danjuma' },
    { id: 'tt-t2', day: 'Tuesday', time: '10:15 - 11:35', subject: 'English Language', classGroup: 'SS1 Dynamo', room: 'Room 08A', teacher: 'Mrs. F. Adewale' },
    { id: 'tt-t3', day: 'Tuesday', time: '11:45 - 13:00', subject: 'Further Mathematics', classGroup: 'SS1 Dynamo', room: 'Room 12B', teacher: 'Mr. B. Alabi' },
    { id: 'tt-t4', day: 'Tuesday', time: '13:45 - 14:45', subject: 'Economics', classGroup: 'SS1 Horizon', room: 'Room 14C', teacher: 'Mr. J. Osei' },
    // Wednesday
    { id: 'tt-w1', day: 'Wednesday', time: '08:30 - 09:50', subject: 'Mathematics', classGroup: 'SS1 Dynamo', room: 'Room 12B', teacher: 'Mr. B. Alabi' },
    { id: 'tt-w2', day: 'Wednesday', time: '10:15 - 11:35', subject: 'Biology', classGroup: 'SS1 Horizon', room: 'Bio Lab 1', teacher: 'Dr. K. Ibe' },
    { id: 'tt-w3', day: 'Wednesday', time: '11:45 - 13:00', subject: 'Civic Education', classGroup: 'SS1 Dynamo', room: 'Auditorium B', teacher: 'Mrs. G. Okafor' },
    { id: 'tt-w4', day: 'Wednesday', time: '13:45 - 14:45', subject: 'Library Study & Research', classGroup: 'SS1 Dynamo', room: 'Main Library', teacher: 'Staff Supervisor' },
    // Thursday
    { id: 'tt-th1', day: 'Thursday', time: '08:30 - 09:50', subject: 'Physics Lab Practical', classGroup: 'SS1 Dynamo', room: 'Physics Lab 2', teacher: 'Mr. B. Alabi' },
    { id: 'tt-th2', day: 'Thursday', time: '10:15 - 11:35', subject: 'English Language', classGroup: 'SS1 Dynamo', room: 'Room 08A', teacher: 'Mrs. F. Adewale' },
    { id: 'tt-th3', day: 'Thursday', time: '11:45 - 13:00', subject: 'Chemistry', classGroup: 'SS1 Horizon', room: 'Chem Lab 1', teacher: 'Mr. E. Danjuma' },
    { id: 'tt-th4', day: 'Thursday', time: '13:45 - 14:45', subject: 'Agricultural Science', classGroup: 'SS1 Horizon', room: 'Agric Garden', teacher: 'Mr. T. Bello' },
    // Friday
    { id: 'tt-f1', day: 'Friday', time: '08:30 - 09:50', subject: 'Chemistry Lab Practical', classGroup: 'SS1 Horizon', room: 'Chem Lab 1', teacher: 'Mr. E. Danjuma' },
    { id: 'tt-f2', day: 'Friday', time: '10:15 - 11:45', subject: 'Civic Education', classGroup: 'SS1 Dynamo', room: 'Auditorium B', teacher: 'Mrs. G. Okafor' },
    { id: 'tt-f3', day: 'Friday', time: '12:00 - 13:00', subject: 'Weekly Review & Class Meeting', classGroup: 'SS1 Dynamo', room: 'Room 12B', teacher: 'Class Teacher' }
];
export const LEARNING_RESOURCES = [
    {
        id: 'res-01',
        title: 'Surds and Quadratic Formula Master Note',
        subject: 'Mathematics',
        category: 'Revision Notes',
        type: 'PDF Document',
        updatedDate: '10 Oct 2026',
        fileSize: '1.4 MB',
        classGroup: 'SS1 Dynamo',
        description: 'Concise summary of algebraic manipulations, conjugate surds multiplication, and 12 worked sample problems.'
    },
    {
        id: 'res-02',
        title: 'Motion & Uniform Acceleration Visual Guide',
        subject: 'Physics',
        category: 'Revision Notes',
        type: 'PDF Document',
        updatedDate: '08 Oct 2026',
        fileSize: '2.1 MB',
        classGroup: 'SS1 Dynamo',
        description: 'Illustrated guide translating displacement-time slopes to velocity and area under curves to distance traveled.'
    },
    {
        id: 'res-03',
        title: 'Formal Expository Writing Structure Breakdown',
        subject: 'English Language',
        category: 'Worksheets',
        type: 'Interactive Worksheet',
        updatedDate: '06 Oct 2026',
        fileSize: '680 KB',
        classGroup: 'SS1 Dynamo',
        description: 'Step-by-step structural outline template for crafting five-paragraph argumentative and expository essays.'
    },
    {
        id: 'res-04',
        title: 'Plant vs Animal Cell Organelle Interactive Map',
        subject: 'Biology',
        category: 'Video Guides',
        type: 'Video Guide',
        updatedDate: '05 Oct 2026',
        fileSize: '14.8 MB',
        classGroup: 'SS1 Horizon',
        description: '10-minute annotated walkthrough covering endoplasmic reticulum, Golgi body, and chloroplast ultrastructure.'
    },
    {
        id: 'res-05',
        title: 'SS1 Midterm Specimen Past Papers (2024-2025)',
        subject: 'Mathematics',
        category: 'Past Papers',
        type: 'PDF Document',
        updatedDate: '01 Oct 2026',
        fileSize: '3.2 MB',
        classGroup: 'SS1 Dynamo',
        description: 'Archived past exam papers with marking schemes and solution guidelines for self-paced exam readiness.'
    },
    {
        id: 'res-06',
        title: 'Electronegativity Trends and Bonding Types',
        subject: 'Chemistry',
        category: 'Teacher Resources',
        type: 'PDF Document',
        updatedDate: '28 Sep 2026',
        fileSize: '890 KB',
        classGroup: 'SS1 Horizon',
        description: 'Periodic table breakdown comparing covalent polar, nonpolar, ionic, and metallic bond formations.'
    }
];
export const DISCUSSION_TOPICS = [
    {
        id: 'disc-01',
        title: 'Clarification on Question 14 in Linear Equations Worksheet',
        category: 'Homework help',
        topicTag: 'Quadratic Equations',
        classGroup: 'SS1 Dynamo',
        subject: 'Mathematics',
        authorName: 'Adaeze (Ada) Okonkwo',
        authorRole: 'Student',
        date: 'Yesterday at 4:20 PM',
        repliesCount: 3,
        pinned: true,
        isAnswered: true,
        isBookmarked: true,
        replies: [
            {
                id: 'rep-01',
                authorName: 'Mr. Babatunde Alabi',
                authorRole: 'Teacher',
                date: 'Yesterday at 5:10 PM',
                content: 'Remember that before cross-multiplying, you must find the common denominator of the left-hand terms. Group the unknown variable terms on one side first.',
                isTeacherVerified: true
            },
            {
                id: 'rep-02',
                authorName: 'Chinedu Eze',
                authorRole: 'Student',
                date: 'Yesterday at 6:05 PM',
                content: 'Thanks sir! That cleared up the negative sign error I kept getting on the numerator.'
            },
            {
                id: 'rep-03',
                authorName: 'Adaeze (Ada) Okonkwo',
                authorRole: 'Student',
                date: 'Yesterday at 6:40 PM',
                content: 'Understood now, working through the quadratic substitution step today!'
            }
        ]
    },
    {
        id: 'disc-02',
        title: 'Ticker-Timer Lab: Accounting for friction on the inclined runway',
        category: 'Lesson discussion',
        topicTag: 'Kinematics & Friction',
        classGroup: 'SS1 Dynamo',
        subject: 'Physics',
        authorName: 'Emeka Balogun',
        authorRole: 'Student',
        date: '09 Oct 2026',
        repliesCount: 2,
        pinned: false,
        isAnswered: true,
        isBookmarked: false,
        replies: [
            {
                id: 'rep-04',
                authorName: 'Mr. Babatunde Alabi',
                authorRole: 'Teacher',
                date: '09 Oct 2026',
                content: 'Excellent observation Emeka. Tilt the runway gently until the trolley rolls at steady velocity without ticking accelerating dots before commencing Trial 1.',
                isTeacherVerified: true
            },
            {
                id: 'rep-05',
                authorName: 'Fatima Sanusi',
                authorRole: 'Student',
                date: '09 Oct 2026',
                content: 'Noted! We will verify that friction-compensating angle before plotting our dots.'
            }
        ]
    },
    {
        id: 'disc-03',
        title: 'Recommended reference sources for Renewable Energy Essay',
        category: 'Study group',
        topicTag: 'Expository Essays',
        classGroup: 'SS1 Dynamo',
        subject: 'English Language',
        authorName: 'Mrs. Funke Adewale',
        authorRole: 'Teacher',
        date: '08 Oct 2026',
        repliesCount: 1,
        pinned: true,
        isAnswered: false,
        isBookmarked: true,
        replies: [
            {
                id: 'rep-06',
                authorName: 'Tunde Bakare',
                authorRole: 'Student',
                date: '08 Oct 2026',
                content: 'Can we cite rural electrification agency case studies from northern Nigeria?'
            }
        ]
    },
    {
        id: 'disc-04',
        title: 'Why does chloroplast grana stacking increase light absorption efficiency?',
        category: 'Ask a question',
        topicTag: 'Cell Ultrastructure',
        classGroup: 'SS1 Horizon',
        subject: 'Biology',
        authorName: 'Amina Bello',
        authorRole: 'Student',
        date: 'Today at 09:15 AM',
        repliesCount: 0,
        pinned: false,
        isAnswered: false,
        isBookmarked: false,
        replies: []
    },
    {
        id: 'disc-05',
        title: 'Study Session: Solving quadratic surds before Friday test',
        category: 'Study group',
        topicTag: 'Surds & Radicals',
        classGroup: 'SS1 Dynamo',
        subject: 'Mathematics',
        authorName: 'Chinedu Eze',
        authorRole: 'Student',
        date: 'Today at 11:30 AM',
        repliesCount: 1,
        pinned: false,
        isAnswered: false,
        isBookmarked: false,
        replies: [
            {
                id: 'rep-07',
                authorName: 'Adaeze (Ada) Okonkwo',
                authorRole: 'Student',
                date: 'Today at 12:05 PM',
                content: 'Count me in! Library study corner at 1:45 PM after English.'
            }
        ]
    }
];
export const INITIAL_NOTIFICATIONS = [
    {
        id: 'notif-1',
        title: 'Assignment Reminder',
        message: 'Mathematics: "Practice: Linear & Quadratic Equations" is due in 3 days.',
        timestamp: '15m ago',
        isRead: false,
        type: 'assignment',
        linkPage: 'assignments'
    },
    {
        id: 'notif-2',
        title: 'New Class Notice',
        message: 'Mr. Alabi uploaded "Surds and Quadratic Formula Master Note".',
        timestamp: '1h ago',
        isRead: false,
        type: 'announcement',
        linkPage: 'learning-centre'
    },
    {
        id: 'notif-3',
        title: 'Discussion Reply',
        message: 'Mr. Alabi responded to your question on Question 14.',
        timestamp: 'Yesterday',
        isRead: true,
        type: 'class',
        linkPage: 'discussions'
    }
];
export const TEACHER_SUBMISSIONS = [
    {
        id: 'sub-01',
        studentName: 'Adaeze (Ada) Okonkwo',
        classGroup: 'SS1 Dynamo',
        assignmentTitle: 'Cellular Respiration Diagram',
        subject: 'Biology',
        submittedAt: '09 Oct 2026, 08:34 PM',
        status: 'Pending Review'
    },
    {
        id: 'sub-02',
        studentName: 'Chinedu Eze',
        classGroup: 'SS1 Dynamo',
        assignmentTitle: 'Kinematics Lab Writeup',
        subject: 'Physics',
        submittedAt: '09 Oct 2026, 03:12 PM',
        status: 'Reviewed'
    },
    {
        id: 'sub-03',
        studentName: 'Fatima Sanusi',
        classGroup: 'SS1 Dynamo',
        assignmentTitle: 'Linear & Quadratic Equations',
        subject: 'Mathematics',
        submittedAt: '08 Oct 2026, 11:20 PM',
        status: 'Pending Review'
    },
    {
        id: 'sub-04',
        studentName: 'Tunde Bakare',
        classGroup: 'SS1 Dynamo',
        assignmentTitle: 'Argumentative Essay Draft',
        subject: 'English Language',
        submittedAt: '07 Oct 2026, 06:45 PM',
        status: 'Reviewed'
    }
];
export const ADMIN_USERS = [
    { id: 'usr-101', name: 'Adaeze Okonkwo', email: 'ada.okonkwo@demo.schoolhub.local', role: 'student', classGroup: 'SS1 Dynamo', status: 'Active', lastActive: 'Just now' },
    { id: 'usr-102', name: 'Chinedu Eze', email: 'c.eze@demo.schoolhub.local', role: 'student', classGroup: 'SS1 Dynamo', status: 'Active', lastActive: '2h ago' },
    { id: 'usr-103', name: 'Fatima Sanusi', email: 'f.sanusi@demo.schoolhub.local', role: 'student', classGroup: 'SS1 Dynamo', status: 'Active', lastActive: 'Yesterday' },
    { id: 'usr-104', name: 'Emeka Balogun', email: 'e.balogun@demo.schoolhub.local', role: 'student', classGroup: 'SS1 Horizon', status: 'Active', lastActive: '3h ago' },
    { id: 'usr-105', name: 'Amina Bello', email: 'a.bello@demo.schoolhub.local', role: 'student', classGroup: 'SS1 Horizon', status: 'Active', lastActive: '1d ago' },
    { id: 'usr-201', name: 'Mr. Babatunde Alabi', email: 'b.alabi@demo.schoolhub.local', role: 'teacher', classGroup: 'SS1 Dynamo', status: 'Active', lastActive: 'Just now' },
    { id: 'usr-202', name: 'Mrs. Funke Adewale', email: 'f.adewale@demo.schoolhub.local', role: 'teacher', classGroup: 'SS1 Dynamo', status: 'Active', lastActive: '4h ago' },
    { id: 'usr-203', name: 'Dr. Kelechi Ibe', email: 'k.ibe@demo.schoolhub.local', role: 'teacher', classGroup: 'SS1 Horizon', status: 'Active', lastActive: 'Yesterday' },
    { id: 'usr-301', name: 'Mrs. Clara Nnamdi', email: 'c.nnamdi@demo.schoolhub.local', role: 'admin', status: 'Active', lastActive: 'Just now' }
];
// === MASTER SPECIFICATION MOCK DATA ===
export const INITIAL_TEACHER_REQUESTS = [
    {
        id: 'req-tch-01',
        teacherName: 'Mrs. Ngozi Adeleke',
        email: 'n.adeleke@demo.schoolhub.local',
        subjects: 'Economics & Commerce',
        classGroup: 'SS1 Horizon',
        requestedAt: 'Yesterday, 2:15 PM',
        status: 'Pending Review',
        notes: 'Assigned as Senior Secondary Economics instructor for Term 1.'
    },
    {
        id: 'req-tch-02',
        teacherName: 'Mr. Timothy Bello',
        email: 't.bello@demo.schoolhub.local',
        subjects: 'Agricultural Science',
        classGroup: 'SS1 Dynamo',
        requestedAt: '2 days ago',
        status: 'Pending Review',
        notes: 'Requests access to upload garden lab practical manuals and manage submissions.'
    },
    {
        id: 'req-tch-03',
        teacherName: 'Dr. Kelechi Ibe',
        email: 'k.ibe@demo.schoolhub.local',
        subjects: 'Biology',
        classGroup: 'SS1 Horizon',
        requestedAt: '01 Oct 2026',
        status: 'Approved',
        notes: 'Verified by Vice Principal Mrs. Clara Nnamdi.'
    }
];
export const INITIAL_CLASS_CODES = [
    {
        id: 'code-01',
        code: 'DYN-2026-MTH',
        classGroup: 'SS1 Dynamo',
        description: 'Mathematics & Science Stream Entry Code',
        maxUses: 35,
        currentUses: 32,
        expiresAt: '2026-11-30',
        status: 'Active'
    },
    {
        id: 'code-02',
        code: 'HRZ-2026-BIO',
        classGroup: 'SS1 Horizon',
        description: 'Life Sciences & Pre-Med Arm Entry Code',
        maxUses: 35,
        currentUses: 30,
        expiresAt: '2026-11-30',
        status: 'Active'
    },
    {
        id: 'code-03',
        code: 'PILOT-DAY-ALL',
        classGroup: 'SS1 Dynamo',
        description: 'Civics & Joint Assemblies Admission Code',
        maxUses: 70,
        currentUses: 64,
        expiresAt: '2026-12-15',
        status: 'Active'
    },
    {
        id: 'code-04',
        code: 'EXP-TEMP-09',
        classGroup: 'SS1 Horizon',
        description: 'Early Pilot Rehearsal Invitation',
        maxUses: 10,
        currentUses: 10,
        expiresAt: '2026-10-01',
        status: 'Revoked'
    }
];
export const INITIAL_CONTENT_REPORTS = [
    {
        id: 'rep-01',
        targetType: 'discussion',
        targetTitle: 'Clarification on Question 14 in Linear Equations Worksheet',
        reportedBy: 'Student Representative (Demo)',
        reason: 'Routine check - testing moderation escalation and audit trail.',
        timestamp: 'Yesterday at 6:45 PM',
        status: 'Pending Review'
    }
];
export const INITIAL_CALENDAR_EVENTS = [
    {
        id: 'evt-01',
        title: 'Mathematics Problem Set 3 Deadline',
        date: '2026-10-15',
        time: '11:59 PM',
        category: 'Academic Deadline',
        audience: 'SS1 Dynamo',
        description: 'Linear & Quadratic Equations exercise submission deadline via School Hub.'
    },
    {
        id: 'evt-02',
        title: 'Inter-Class Science Quiz & Symposium Briefing',
        date: '2026-10-23',
        time: '1:15 PM',
        category: 'School Event',
        audience: 'SS1 Dynamo & SS1 Horizon',
        description: 'Team assignment meeting in Physics Lab 2 for friendly academic challenge.'
    },
    {
        id: 'evt-03',
        title: 'Mid-Term Continuous Assessment (CA) Week',
        date: '2026-10-26 to 2026-10-30',
        category: 'Exam / CA',
        audience: 'All Pilot Students',
        description: 'In-class assessments conducted during normal scheduled lesson periods.'
    },
    {
        id: 'evt-04',
        title: 'Term 1 Pilot Mid-Semester Feedback Review',
        date: '2026-11-06',
        category: 'School Event',
        audience: 'Students, Faculty & Administration',
        description: 'Evaluation of School Hub prototype usability for day students.'
    }
];
export const INITIAL_ADVISORY_POLLS = [
    {
        id: 'poll-01',
        question: 'How should the Friday review lesson in Mathematics be structured?',
        classGroup: 'SS1 Dynamo',
        totalVotes: 24,
        status: 'Advisory (Open)',
        options: [
            { id: 'opt-1', label: 'Step-by-step past paper problem walkthroughs', votes: 14 },
            { id: 'opt-2', label: 'Peer study groups with teacher roving support', votes: 7 },
            { id: 'opt-3', label: 'Surds and algebra speed drills', votes: 3 }
        ]
    }
];
export const INITIAL_APPROVED_CLUBS = [
    {
        id: 'club-01',
        name: 'JETS Club (Junior Engineers, Technicians & Scientists)',
        patronTeacher: 'Mr. Babatunde Alabi',
        meetingDay: 'Thursday (2:00 PM - 3:00 PM)',
        room: 'Physics Lab 2',
        memberCount: 22,
        description: 'Renewable solar microgrid experiments, mechanics demonstrations, and quiz preparations.'
    },
    {
        id: 'club-02',
        name: 'Literary & Debating Society',
        patronTeacher: 'Mrs. Funke Adewale',
        meetingDay: 'Tuesday (2:00 PM - 3:00 PM)',
        room: 'Room 08A',
        memberCount: 18,
        description: 'Public speaking, parliamentary debate rounds, and expository essay workshops.'
    },
    {
        id: 'club-03',
        name: 'Young Farmers & Ecology Club',
        patronTeacher: 'Mr. Timothy Bello',
        meetingDay: 'Wednesday (2:00 PM - 3:00 PM)',
        room: 'Agric Garden',
        memberCount: 15,
        description: 'Sustainable crop cycles, soil nutrients testing, and botany field observations.'
    }
];
// === EXPANDED LEARNING CENTRE DATASETS ===
export const INITIAL_PODCASTS = [
    {
        id: 'pod-01',
        title: 'Deconstructing Quadratic Equations: The Discriminant Shortcut',
        seriesTitle: 'SS1 Mathematics Foundations',
        subject: 'Mathematics',
        topic: 'Quadratic Equations & Discriminants',
        speakerTeacher: 'Mr. Babatunde Alabi',
        classGroup: 'SS1 Dynamo',
        durationMinutes: 12,
        releaseDate: '11 Oct 2026',
        description: 'In this 12-minute recap, Mr. Alabi breaks down the discriminant (b² - 4ac), explains why roots turn real, equal, or imaginary, and shares 3 common WAEC exam pitfalls.',
        transcript: `[00:00] Welcome back to SS1 Mathematics Foundations with Mr. Babatunde Alabi. Today we're tackling quadratic roots.
[02:15] Let's look at the standard form: ax squared plus bx plus c equals zero. What determines the nature of roots? The expression under the radical: b squared minus 4ac.
[05:40] Scenario one: If delta is strictly greater than zero and a perfect square, you get two distinct rational roots. If delta equals zero, both roots coincide.
[08:20] And what if delta is negative? No real roots exist on the Cartesian plane!
[10:30] Remember: always normalize by checking your signs before computing b squared. Practice worksheet exercises 4 to 12 tonight!`,
        isBookmarked: true,
        isCompleted: false,
        lastPositionSeconds: 135
    },
    {
        id: 'pod-02',
        title: 'The Ticker-Timer Demystified: Velocity, Acceleration & Runway Angle',
        seriesTitle: 'Physics Lab Companion',
        subject: 'Physics',
        topic: 'Kinematics & Ticker Timers',
        speakerTeacher: 'Mr. Babatunde Alabi',
        classGroup: 'SS1 Dynamo',
        durationMinutes: 9,
        releaseDate: '09 Oct 2026',
        description: 'Audio guide to interpreting ticker-timer tapes. Learn how to convert 50Hz frequency pulses into 0.02s intervals, measure 10-dot spaces, and compensate for runway friction.',
        transcript: `[00:00] Hello physics scholars! Before you set up Trial 1 with the ticker-timer, let's review the timing mechanism.
[01:45] The vibrating reed vibrates at 50 cycles per second. That means the period between two consecutive dots is exactly 1 divided by 50, which is 0.02 seconds.
[04:10] When calculating acceleration, take a 5-dot or 10-dot segment. Measure the initial displacement s1 and later segment s2.
[06:50] Don't forget: tilt the runway just enough so the trolley rolls at constant speed when nudged. That neutralizes friction!`,
        isBookmarked: false,
        isCompleted: true,
        lastPositionSeconds: 540
    },
    {
        id: 'pod-03',
        title: 'Rhetorical Power in Expository Writing: Thesis, Signposting & Unity',
        seriesTitle: 'English Mastery Hub',
        subject: 'English Language',
        topic: 'Expository & Argumentative Essays',
        speakerTeacher: 'Mrs. Funke Adewale',
        classGroup: 'SS1 Dynamo',
        durationMinutes: 14,
        releaseDate: '07 Oct 2026',
        description: 'Mrs. Adewale shares practical techniques for structuring clean argumentative paragraphs: topic sentence, supporting evidence, counter-perspective refutation, and concluding linkage.',
        transcript: `[00:00] Greetings students. Mrs. Adewale here. Today we discuss how to turn a good idea into a persuasive essay.
[03:20] Your opening thesis must take a definitive stand. Do not say "solar energy has both pros and cons" — instead, state clearly why solar decentralized grids are vital.
[07:15] Each body paragraph must begin with a strong topic sentence. Never bury your main point in the middle.
[11:00] Use signposting transitions: "consequently", "on the contrary", "notwithstanding". Listen to these rhythm patterns in your mind before writing.`,
        isBookmarked: true,
        isCompleted: false,
        lastPositionSeconds: 0
    },
    {
        id: 'pod-04',
        title: 'Inside the Plant Cell: Thylakoid Stacks and Chloroplast Ultrastructure',
        seriesTitle: 'Life Science Deep Dives',
        subject: 'Biology',
        topic: 'Cell Biology & Photosynthesis',
        speakerTeacher: 'Dr. Kelechi Ibe',
        classGroup: 'SS1 Horizon',
        durationMinutes: 11,
        releaseDate: '05 Oct 2026',
        description: 'Dr. Ibe explains why plant cells organize chlorophyll into flattened discs called thylakoids and how stroma enzymes fix carbon dioxide.',
        transcript: `[00:00] Welcome biology researchers. Today we step inside the chloroplast under electron microscopy.
[02:30] Notice the outer and inner double membrane, and the fluid matrix known as the stroma.
[05:15] Suspended within are thylakoids, stacked into coin-like structures called grana. This stacking multiplies the surface area for photon absorption!
[08:45] When you draw the cell in your practical notebook, always label the lipid droplets, ribosomes, and circular DNA.`,
        isBookmarked: false,
        isCompleted: false,
        lastPositionSeconds: 0
    }
];
export const INITIAL_LIVE_SESSIONS = [
    {
        id: 'live-01',
        title: 'Surds Simplification & Conjugate Rationalization Live Surgery',
        subject: 'Mathematics',
        hostTeacher: 'Mr. Babatunde Alabi',
        classGroup: 'SS1 Dynamo',
        date: 'Today',
        time: '4:00 PM - 4:45 PM',
        durationMinutes: 45,
        agenda: 'Interactive review of Question 12-18 from Problem Set 3. Live algebraic whiteboard, live student Q&A, and fast rationalization shortcuts.',
        status: 'Live now',
        meetingUrl: 'https://demo-room.schoolhub.local/mth-dyn-live',
        attachedResourceTitle: 'Surds and Quadratic Formula Master Note',
        studentQuestionsCount: 4,
        studentQuestions: [
            { id: 'q-1', author: 'Adaeze Okonkwo', question: 'Why do we multiply by the conjugate when the denominator is √3 - √2 instead of just √3?', votes: 5 },
            { id: 'q-2', author: 'Chinedu Eze', question: 'Does squaring both sides introduce extraneous roots in surd equations?', votes: 3 },
            { id: 'q-3', author: 'Fatima Sanusi', question: 'Can we leave a simplified fraction with a square root in the numerator?', votes: 2 }
        ]
    },
    {
        id: 'live-02',
        title: 'Physics Midterm Prep: Graphing Kinematics & Error Analysis',
        subject: 'Physics',
        hostTeacher: 'Mr. Babatunde Alabi',
        classGroup: 'SS1 Dynamo',
        date: 'Tomorrow, Oct 14',
        time: '3:30 PM - 4:15 PM',
        durationMinutes: 45,
        agenda: 'Live demonstration of slope calculation, triangle method, avoiding paraxial errors on millimeter graph paper, and unit dimensions.',
        status: 'Upcoming',
        meetingUrl: 'https://demo-room.schoolhub.local/phy-dyn-prep',
        attachedResourceTitle: 'Motion & Uniform Acceleration Visual Guide',
        studentQuestionsCount: 2,
        studentQuestions: [
            { id: 'q-4', author: 'Emeka Balogun', question: 'How large should the slope triangle be on WAEC paper plots?', votes: 4 },
            { id: 'q-5', author: 'Tunde Bakare', question: 'Is air resistance included in the theoretical acceleration g?', votes: 1 }
        ]
    },
    {
        id: 'live-03',
        title: 'Argumentative Essay Drafting Clinic: Microgrid Case Studies',
        subject: 'English Language',
        hostTeacher: 'Mrs. Funke Adewale',
        classGroup: 'SS1 Dynamo',
        date: '08 Oct 2026',
        time: '3:00 PM - 3:50 PM',
        durationMinutes: 50,
        agenda: 'Reviewing student essay introductions, building transitional links, and editing for grammatical precision.',
        status: 'Past session',
        meetingUrl: 'https://demo-room.schoolhub.local/eng-dyn-archive',
        attachedResourceTitle: 'Formal Expository Writing Structure Breakdown',
        studentQuestionsCount: 3,
        studentQuestions: [
            { id: 'q-6', author: 'Adaeze Okonkwo', question: 'How do we cite local newspaper articles without academic DOIs?', votes: 6 }
        ]
    }
];
export const INITIAL_QUIZ_SETS = [
    {
        id: 'quiz-01',
        title: 'Quadratic Equations & Discriminants Speed Check',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        classGroup: 'SS1 Dynamo',
        questionsCount: 4,
        bestScore: 100,
        isCompleted: true,
        questions: [
            {
                id: 'qz-1-1',
                question: 'What is the discriminant of the quadratic equation 2x² - 4x + 2 = 0?',
                options: ['16', '0', '-16', '4'],
                correctIndex: 1,
                explanation: 'The discriminant formula is b² - 4ac. Here, a=2, b=-4, c=2. Thus (-4)² - 4(2)(2) = 16 - 16 = 0. When discriminant is 0, the equation has two equal real roots.'
            },
            {
                id: 'qz-1-2',
                question: 'If the roots of ax² + bx + c = 0 are real and distinct, which condition holds?',
                options: ['b² - 4ac < 0', 'b² - 4ac = 0', 'b² - 4ac > 0', 'b² + 4ac > 0'],
                correctIndex: 2,
                explanation: 'A positive discriminant (b² - 4ac > 0) yields two distinct real solutions.'
            },
            {
                id: 'qz-1-3',
                question: 'What is the conjugate of the binomial surd expression (3 - √5)?',
                options: ['3 + √5', '-3 - √5', '√5 - 3', '9 - 5'],
                correctIndex: 0,
                explanation: 'The conjugate of (a - √b) is (a + √b). Multiplying by the conjugate produces difference of squares (a² - b), eliminating the radical from denominators.'
            },
            {
                id: 'qz-1-4',
                question: 'Solve for x: x² - 9 = 0.',
                options: ['x = 3 only', 'x = -3 only', 'x = ±3', 'x = 9'],
                correctIndex: 2,
                explanation: 'Factoring as (x - 3)(x + 3) = 0 gives x = 3 or x = -3 (i.e. x = ±3).'
            }
        ]
    },
    {
        id: 'quiz-02',
        title: 'Kinematics: Velocity, Acceleration & Ticker-Timer Principles',
        subject: 'Physics',
        topic: 'Kinematics',
        classGroup: 'SS1 Dynamo',
        questionsCount: 4,
        bestScore: 75,
        isCompleted: false,
        questions: [
            {
                id: 'qz-2-1',
                question: 'If a ticker-timer operates at a frequency of 50 Hz, what is the time interval between two consecutive dots?',
                options: ['0.5 s', '0.02 s', '0.05 s', '0.2 s'],
                correctIndex: 1,
                explanation: 'Period T = 1 / f = 1 / 50 = 0.02 seconds.'
            },
            {
                id: 'qz-2-2',
                question: 'The area under a velocity-time graph represents which physical quantity?',
                options: ['Acceleration', 'Displacement', 'Speed', 'Force'],
                correctIndex: 1,
                explanation: 'Area under v-t graph = velocity × time = displacement traveled.'
            },
            {
                id: 'qz-2-3',
                question: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?',
                options: ['2 m/s²', '4 m/s²', '10 m/s²', '100 m/s²'],
                correctIndex: 1,
                explanation: 'a = (v - u) / t = (20 - 0) / 5 = 4 m/s².'
            },
            {
                id: 'qz-2-4',
                question: 'What is the purpose of tilting the runway in a ticker-timer friction experiment?',
                options: ['To maximize gravity', 'To compensate for frictional resistance', 'To slow the trolley down', 'To increase tape tension'],
                correctIndex: 1,
                explanation: 'Friction-compensating runway angle balances frictional resistance with component of gravity down the incline.'
            }
        ]
    },
    {
        id: 'quiz-03',
        title: 'Cell Organelles & Plant Ultrastructure',
        subject: 'Biology',
        topic: 'Cell Biology',
        classGroup: 'SS1 Horizon',
        questionsCount: 3,
        bestScore: undefined,
        isCompleted: false,
        questions: [
            {
                id: 'qz-3-1',
                question: 'Which organelle contains chlorophyll and thylakoid membranes?',
                options: ['Mitochondria', 'Chloroplast', 'Golgi apparatus', 'Ribosome'],
                correctIndex: 1,
                explanation: 'Chloroplasts carry thylakoids stacked in grana where photosynthesis light reactions take place.'
            },
            {
                id: 'qz-3-2',
                question: 'What is the primary site of aerobic ATP synthesis in eukaryotic cells?',
                options: ['Mitochondrion', 'Lysosome', 'Centrosome', 'Endoplasmic reticulum'],
                correctIndex: 0,
                explanation: 'Mitochondria are the powerhouses where the Krebs cycle and oxidative phosphorylation occur.'
            },
            {
                id: 'qz-3-3',
                question: 'Unlike animal cells, plant cells possess which rigid outer structure?',
                options: ['Phospholipid bilayer', 'Cell wall made of cellulose', 'Pellicle', 'Capsule'],
                correctIndex: 1,
                explanation: 'Plant cells have a cellulose cell wall providing mechanical support and turgor pressure protection.'
            }
        ]
    }
];
export const INITIAL_FLASHCARD_DECKS = [
    {
        id: 'deck-01',
        title: 'Essential Algebra & Quadratic Formulas',
        subject: 'Mathematics',
        topic: 'Algebra & Equations',
        classGroup: 'SS1 Dynamo',
        authorTeacher: 'Mr. Babatunde Alabi',
        isBookmarked: true,
        cards: [
            {
                id: 'fc-1-1',
                front: 'Quadratic Formula',
                back: 'x = (-b ± √(b² - 4ac)) / (2a)',
                topic: 'Algebra',
                example: 'Use when equation ax² + bx + c = 0 cannot be factored easily by inspection.'
            },
            {
                id: 'fc-1-2',
                front: 'Discriminant Rule: b² - 4ac > 0',
                back: 'Two distinct real roots',
                topic: 'Algebra',
                example: 'If b² - 4ac is a perfect square, roots are rational.'
            },
            {
                id: 'fc-1-3',
                front: 'Discriminant Rule: b² - 4ac = 0',
                back: 'One repeated real root (equal roots)',
                topic: 'Algebra',
                example: 'x² - 6x + 9 = 0 gives (x - 3)² = 0, so x = 3 twice.'
            },
            {
                id: 'fc-1-4',
                front: 'Conjugate of (a + √b)',
                back: '(a - √b)',
                topic: 'Surds',
                example: '(3 + √2)(3 - √2) = 9 - 2 = 7 (rational denominator).'
            }
        ]
    },
    {
        id: 'deck-02',
        title: 'Kinematics Equations & SI Units',
        subject: 'Physics',
        topic: 'Motion in 1 Dimension',
        classGroup: 'SS1 Dynamo',
        authorTeacher: 'Mr. Babatunde Alabi',
        isBookmarked: false,
        cards: [
            {
                id: 'fc-2-1',
                front: 'First Equation of Uniform Motion',
                back: 'v = u + at',
                topic: 'Kinematics',
                example: 'v = final velocity, u = initial velocity, a = acceleration, t = time.'
            },
            {
                id: 'fc-2-2',
                front: 'Second Equation of Uniform Motion',
                back: 's = ut + ½at²',
                topic: 'Kinematics',
                example: 's = displacement traveled during time t.'
            },
            {
                id: 'fc-2-3',
                front: 'Third Equation of Uniform Motion',
                back: 'v² = u² + 2as',
                topic: 'Kinematics',
                example: 'Useful when elapsed time t is not given.'
            },
            {
                id: 'fc-2-4',
                front: 'Ticker Timer Period at 50 Hz',
                back: 'T = 0.02 seconds',
                topic: 'Lab Methods',
                example: '5-dot interval corresponds to 0.10 seconds.'
            }
        ]
    },
    {
        id: 'deck-03',
        title: 'Cell Organelles & Biological Functions',
        subject: 'Biology',
        topic: 'Cell Ultrastructure',
        classGroup: 'SS1 Horizon',
        authorTeacher: 'Dr. Kelechi Ibe',
        isBookmarked: true,
        cards: [
            {
                id: 'fc-3-1',
                front: 'Mitochondria',
                back: 'Site of aerobic respiration and ATP generation.',
                topic: 'Organelles',
                example: 'Has inner cristae folds to expand catalytic surface area.'
            },
            {
                id: 'fc-3-2',
                front: 'Chloroplast Thylakoids',
                back: 'Membranous sacs carrying chlorophyll for light absorption.',
                topic: 'Organelles',
                example: 'Stacked together into grana.'
            },
            {
                id: 'fc-3-3',
                front: 'Ribosomes',
                back: 'Cellular machines that synthesize polypeptides from mRNA.',
                topic: 'Organelles',
                example: 'Can be free-floating in cytoplasm or bound to rough ER.'
            }
        ]
    }
];
export const INITIAL_REVISION_TASKS = [
    {
        id: 'rev-01',
        subject: 'Mathematics',
        topic: 'Quadratic roots discriminant problem set',
        scheduledDate: 'Today',
        durationMinutes: 25,
        isCompleted: true
    },
    {
        id: 'rev-02',
        subject: 'Physics',
        topic: 'Ticker-timer interval graph conversion',
        scheduledDate: 'Today',
        durationMinutes: 30,
        isCompleted: false
    },
    {
        id: 'rev-03',
        subject: 'English Language',
        topic: 'Expository essay outline & thesis refinement',
        scheduledDate: 'Tomorrow',
        durationMinutes: 20,
        isCompleted: false
    },
    {
        id: 'rev-04',
        subject: 'Biology',
        topic: 'Draw and label chloroplast & mitochondrion ultrastructure',
        scheduledDate: 'Thursday',
        durationMinutes: 35,
        isCompleted: false
    }
];
export const INITIAL_ACHIEVEMENTS = [
    {
        id: 'ach-01',
        title: '5-Day Study Streak',
        description: 'Active learning engagement 5 days in a row.',
        icon: '🔥',
        category: 'Milestone',
        isEarned: true,
        earnedDate: '12 Oct 2026',
        progressPercent: 100
    },
    {
        id: 'ach-02',
        title: 'Audio Scholar',
        description: 'Completed 3 educational podcast episodes with full transcripts.',
        icon: '🎧',
        category: 'Listening',
        isEarned: true,
        earnedDate: '10 Oct 2026',
        progressPercent: 100
    },
    {
        id: 'ach-03',
        title: 'Maths Precision Master',
        description: 'Scored 100% on a Practice Quiz Set on first attempt.',
        icon: '🎯',
        category: 'Practice',
        isEarned: true,
        earnedDate: '09 Oct 2026',
        progressPercent: 100
    },
    {
        id: 'ach-04',
        title: 'Flashcard Sprint Champion',
        description: 'Master 20 flashcards across Mathematics and Physics.',
        icon: '⚡',
        category: 'Revision',
        isEarned: false,
        progressPercent: 65
    },
    {
        id: 'ach-05',
        title: 'Classroom Contributor',
        description: 'Post 3 helpful discussion replies verified by a subject teacher.',
        icon: '💬',
        category: 'Community',
        isEarned: false,
        progressPercent: 40
    },
    {
        id: 'ach-06',
        title: 'Live Lab Pioneer',
        description: 'Attend 2 Live Learning Sessions and submit a live question.',
        icon: '📡',
        category: 'Milestone',
        isEarned: false,
        progressPercent: 50
    }
];
export const INITIAL_AI_MESSAGES = [
    {
        id: 'ai-01',
        sender: 'user',
        content: 'Can you teach me how to know whether quadratic roots will be real or imaginary using the discriminant?',
        timestamp: 'Today at 2:10 PM',
        mode: 'Teach me step by step'
    },
    {
        id: 'ai-02',
        sender: 'assistant',
        content: `Great question! Let's break down the **Discriminant Rule** step by step using your SS1 Mathematics curriculum:

1. **Write standard form**: Ensure your equation is in the form $ax^2 + bx + c = 0$.
2. **Identify coefficients**: Note down values of $a$, $b$, and $c$ carefully including their negative signs.
3. **Calculate the Discriminant ($\\Delta$)**:
   $$\\Delta = b^2 - 4ac$$
4. **Interpret the value**:
   - If $\\Delta > 0$: You have **two distinct real roots**. (If $\\Delta$ is a perfect square like 9 or 25, the roots are rational numbers).
   - If $\\Delta = 0$: You have **two equal real roots** (one repeated root).
   - If $\\Delta < 0$: There are **no real roots** (the roots are imaginary / complex).

Would you like to try a quick test equation together, e.g., $3x^2 - 5x + 4 = 0$?`,
        timestamp: 'Today at 2:11 PM',
        mode: 'Teach me step by step',
        groundedSource: 'SS1 Mathematics Syllabus • Chapter 3: Quadratic Functions',
        helpfulRating: 'helpful'
    }
];
export const INITIAL_CONFUSION_SIGNALS = [
    {
        id: 'conf-01',
        subject: 'Mathematics',
        topic: 'Conjugate surd rationalization with multiple radicals',
        classGroup: 'SS1 Dynamo',
        confusedCount: 7
    },
    {
        id: 'conf-02',
        subject: 'Physics',
        topic: 'Ticker timer dot spacing to velocity conversion',
        classGroup: 'SS1 Dynamo',
        confusedCount: 5
    },
    {
        id: 'conf-03',
        subject: 'Chemistry',
        topic: 'Electronegativity trend anomalies in Period 3',
        classGroup: 'SS1 Horizon',
        confusedCount: 4
    }
];
