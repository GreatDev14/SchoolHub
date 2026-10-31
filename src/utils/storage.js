// Storage manager for School Hub persistent state
import {
  DEMO_PROFILES,
  INITIAL_CLASSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ANNOUNCEMENTS,
  DISCUSSION_TOPICS,
  INITIAL_NOTIFICATIONS,
  TEACHER_SUBMISSIONS,
  ADMIN_USERS,
  INITIAL_TEACHER_REQUESTS,
  INITIAL_CLASS_CODES,
  INITIAL_CONTENT_REPORTS,
  INITIAL_PODCASTS,
  INITIAL_LIVE_SESSIONS,
  INITIAL_QUIZ_SETS,
  INITIAL_FLASHCARD_DECKS,
  INITIAL_REVISION_TASKS,
  INITIAL_AI_MESSAGES
} from '../data/mockData';

const STORAGE_PREFIX = 'schoolhub_v2_';

export function loadState(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (item !== null) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
  }
  return fallback;
}

export function saveState(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error saving ${key} to localStorage:`, err);
  }
}

export function clearAllSchoolHubStorage() {
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  } catch (err) {
    console.warn('Error clearing localStorage:', err);
  }
}

// Initial state getters with persistence
export function getInitialStorageState() {
  return {
    userRole: loadState('user_role', 'student'),
    userProfile: loadState('user_profile', DEMO_PROFILES.student),
    classes: loadState('classes', INITIAL_CLASSES),
    assignments: loadState('assignments', INITIAL_ASSIGNMENTS),
    announcements: loadState('announcements', INITIAL_ANNOUNCEMENTS),
    discussions: loadState('discussions', DISCUSSION_TOPICS),
    notifications: loadState('notifications', INITIAL_NOTIFICATIONS),
    submissions: loadState('submissions', TEACHER_SUBMISSIONS),
    teacherRequests: loadState('teacher_requests', INITIAL_TEACHER_REQUESTS),
    classCodes: loadState('class_codes', INITIAL_CLASS_CODES),
    contentReports: loadState('content_reports', INITIAL_CONTENT_REPORTS),
    podcasts: loadState('podcasts', INITIAL_PODCASTS),
    liveSessions: loadState('live_sessions', INITIAL_LIVE_SESSIONS),
    quizSets: loadState('quiz_sets', INITIAL_QUIZ_SETS),
    flashcardDecks: loadState('flashcard_decks', INITIAL_FLASHCARD_DECKS),
    revisionTasks: loadState('revision_tasks', INITIAL_REVISION_TASKS),
    aiMessages: loadState('ai_messages', INITIAL_AI_MESSAGES),
  };
}
