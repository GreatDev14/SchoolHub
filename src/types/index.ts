export type UserRole = 'student' | 'teacher' | 'admin';

export type PilotClassGroup = 'SS1 Dynamo' | 'SS1 Horizon';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  roleTitle: string;
  classGroup?: PilotClassGroup;
  avatarInitials: string;
  verifiedTeacher?: boolean;
  learningStreakDays?: number;
  dailyGoalMinutes?: number;
  dailyGoalProgressMinutes?: number;
}

export interface ClassSubject {
  id: string;
  name: string;
  code: string;
  classGroup: PilotClassGroup;
  teacherName: string;
  teacherEmail: string;
  room: string;
  schedule: string;
  resourceCount: number;
  assignmentCount: number;
  studentCount: number;
  colorAccent: string;
  description: string;
}

export type AssignmentStatus = 'not_started' | 'in_progress' | 'submitted' | 'past_due';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  classGroup: PilotClassGroup;
  teacherName: string;
  dueDate: string;
  dueTime: string;
  points: number;
  status: AssignmentStatus;
  instructions: string;
  attachmentName?: string;
  attachmentSize?: string;
  submittedAt?: string;
  submissionNotes?: string;
}

export type AnnouncementCategory = 'Class Update' | 'General Notice' | 'Event';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: 'Teacher' | 'School Admin';
  date: string;
  category: AnnouncementCategory;
  isRead: boolean;
  classGroup?: string;
  important?: boolean;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  classGroup: PilotClassGroup;
  room: string;
  teacher: string;
}

export type ResourceCategory = 'Revision Notes' | 'Video Guides' | 'Worksheets' | 'Past Papers' | 'Teacher Resources';

export interface LearningResource {
  id: string;
  title: string;
  subject: string;
  category: ResourceCategory;
  type: string;
  updatedDate: string;
  fileSize: string;
  classGroup: string;
  description: string;
  downloadUrl?: string;
  readTimeMinutes?: number;
  isBookmarked?: boolean;
  isCompleted?: boolean;
}

// === PODCASTS & AUDIO LESSONS (Section 24 & 25) ===

export interface AudioPodcastEpisode {
  id: string;
  title: string;
  seriesTitle?: string;
  subject: string;
  topic: string;
  speakerTeacher: string;
  classGroup: string;
  durationMinutes: number;
  releaseDate: string;
  description: string;
  transcript: string;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  lastPositionSeconds?: number;
  audioUrl?: string;
}

// === LIVE LEARNING SESSIONS (Section 26) ===

export type LiveSessionStatus = 'Upcoming' | 'Live now' | 'Past session';

export interface LiveLearningSession {
  id: string;
  title: string;
  subject: string;
  hostTeacher: string;
  classGroup: string;
  date: string;
  time: string;
  durationMinutes: number;
  agenda: string;
  status: LiveSessionStatus;
  meetingUrl?: string;
  attachedResourceTitle?: string;
  studentQuestionsCount: number;
  studentQuestions: { id: string; author: string; question: string; votes: number }[];
}

// === AI TUTOR (Section 27) ===

export type AITutorMode =
  | 'Explain simply'
  | 'Teach me step by step'
  | 'Give me a hint'
  | 'Quiz me'
  | 'Give me an example'
  | 'Help me revise';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: AITutorMode;
  groundedSource?: string;
  helpfulRating?: 'helpful' | 'not_helpful';
}

// === PRACTICE QUIZZES & FLASHCARDS (Section 28) ===

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeQuizSet {
  id: string;
  title: string;
  subject: string;
  topic: string;
  classGroup: string;
  questionsCount: number;
  questions: QuizQuestion[];
  bestScore?: number;
  isCompleted?: boolean;
}

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  topic: string;
  example?: string;
  status?: 'Need practice' | 'Know it';
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  classGroup: string;
  authorTeacher: string;
  cards: FlashcardItem[];
  isBookmarked?: boolean;
}

// === REVISION PLANNER (Section 28) ===

export interface RevisionTask {
  id: string;
  subject: string;
  topic: string;
  scheduledDate: string;
  durationMinutes: number;
  isCompleted: boolean;
}

// === STREAKS & ACHIEVEMENTS (Section 29) ===

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Milestone' | 'Listening' | 'Practice' | 'Revision' | 'Community';
  isEarned: boolean;
  earnedDate?: string;
  progressPercent: number;
}

// === STRUCTURED DISCUSSIONS (Section 30) ===

export type DiscussionCategory =
  | 'Ask a question'
  | 'Homework help'
  | 'Lesson discussion'
  | 'Study group'
  | 'Class updates'
  | 'Poll or quick check';

export interface DiscussionReply {
  id: string;
  authorName: string;
  authorRole: 'Student' | 'Teacher' | 'Admin';
  date: string;
  content: string;
  isTeacherVerified?: boolean;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  category: DiscussionCategory;
  classGroup: string;
  subject: string;
  topicTag?: string;
  authorName: string;
  authorRole: 'Student' | 'Teacher';
  date: string;
  repliesCount: number;
  pinned?: boolean;
  isAnswered?: boolean;
  isBookmarked?: boolean;
  replies: DiscussionReply[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'assignment' | 'announcement' | 'class' | 'podcast' | 'live';
  linkPage?: string;
}

export interface TeacherSubmissionItem {
  id: string;
  studentName: string;
  classGroup: PilotClassGroup;
  assignmentTitle: string;
  subject: string;
  submittedAt: string;
  status: 'Pending Review' | 'Reviewed';
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  classGroup?: string;
  status: 'Active' | 'Pending Verification';
  lastActive: string;
}

export interface TeacherAccessRequest {
  id: string;
  teacherName: string;
  email: string;
  subjects: string;
  classGroup: string;
  requestedAt: string;
  status: 'Pending Review' | 'Approved' | 'Declined';
  notes: string;
}

export interface ClassCode {
  id: string;
  code: string;
  classGroup: PilotClassGroup;
  description: string;
  maxUses: number;
  currentUses: number;
  expiresAt: string;
  status: 'Active' | 'Revoked' | 'Expired';
}

export interface ContentReport {
  id: string;
  targetType: 'discussion' | 'announcement';
  targetTitle: string;
  reportedBy: string;
  reason: string;
  timestamp: string;
  status: 'Pending Review' | 'Dismissed' | 'Action Taken';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: 'Academic Deadline' | 'Exam / CA' | 'School Event' | 'Holiday';
  audience: string;
  description: string;
}

export interface AdvisoryPoll {
  id: string;
  question: string;
  classGroup: string;
  options: { id: string; label: string; votes: number }[];
  userVoted?: string;
  totalVotes: number;
  status: 'Advisory (Open)' | 'Closed';
}

export interface ApprovedClub {
  id: string;
  name: string;
  patronTeacher: string;
  meetingDay: string;
  room: string;
  memberCount: number;
  description: string;
}

export interface TopicConfusionSignal {
  id: string;
  subject: string;
  topic: string;
  classGroup: string;
  confusedCount: number;
}
