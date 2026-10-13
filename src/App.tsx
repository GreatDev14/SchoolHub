import React, { useState } from 'react';
import {
  UserRole,
  UserProfile,
  ClassSubject,
  Assignment,
  Announcement,
  LearningResource,
  DiscussionTopic,
  NotificationItem,
  TeacherAccessRequest,
  ClassCode,
  ContentReport,
  CalendarEvent,
  AudioPodcastEpisode,
  LiveLearningSession,
  PracticeQuizSet,
  FlashcardDeck,
  AchievementBadge,
  RevisionTask,
  AIMessage,
  AITutorMode,
  TopicConfusionSignal
} from './types';
import {
  DEMO_PROFILES,
  INITIAL_CLASSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ANNOUNCEMENTS,
  TIMETABLE_DATA,
  LEARNING_RESOURCES,
  DISCUSSION_TOPICS,
  INITIAL_NOTIFICATIONS,
  TEACHER_SUBMISSIONS,
  ADMIN_USERS,
  INITIAL_TEACHER_REQUESTS,
  INITIAL_CLASS_CODES,
  INITIAL_CONTENT_REPORTS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_PODCASTS,
  INITIAL_LIVE_SESSIONS,
  INITIAL_QUIZ_SETS,
  INITIAL_FLASHCARD_DECKS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_REVISION_TASKS,
  INITIAL_AI_MESSAGES,
  INITIAL_CONFUSION_SIGNALS
} from './data/mockData';

// Components
import { GlobalBanner } from './components/GlobalBanner';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MobileNav } from './components/MobileNav';
import { SearchModal } from './components/SearchModal';
import { AnnouncementModal } from './components/AnnouncementModal';
import { ResourcePreviewModal } from './components/ResourcePreviewModal';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { CreateAnnouncementModal } from './components/CreateAnnouncementModal';
import { JoinClassModal } from './components/JoinClassModal';
import { ConfirmDialog } from './components/ConfirmDialog';

// Learning Centre Modals
import { AudioPlayerModal } from './components/learning/AudioPlayerModal';
import { LiveRoomModal } from './components/learning/LiveRoomModal';
import { NotesToAudioModal } from './components/learning/NotesToAudioModal';
import { QuizModal } from './components/learning/QuizModal';
import { FlashcardModal } from './components/learning/FlashcardModal';

// Pages
import { Welcome } from './pages/Welcome';
import { DemoSignIn } from './pages/DemoSignIn';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Classes } from './pages/Classes';
import { ClassDetail } from './pages/ClassDetail';
import { Assignments } from './pages/Assignments';
import { AssignmentDetail } from './pages/AssignmentDetail';
import { Announcements } from './pages/Announcements';
import { Timetable } from './pages/Timetable';
import { LearningCentre } from './pages/LearningCentre';
import { Discussions } from './pages/Discussions';
import { ProfileSettings } from './pages/ProfileSettings';

export function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('welcome');
  const [selectedClassId, setSelectedClassId] = useState<string>('cls-math-dyn');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('asg-01');

  // User State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [userProfile, setUserProfile] = useState<UserProfile>(DEMO_PROFILES.student);

  // Core Mock Data in State (permits local editing & creations!)
  const [classesList, setClassesList] = useState(INITIAL_CLASSES);
  const [assignmentsList, setAssignmentsList] = useState(INITIAL_ASSIGNMENTS);
  const [announcementsList, setAnnouncementsList] = useState(INITIAL_ANNOUNCEMENTS);
  const [discussionsList, setDiscussionsList] = useState(DISCUSSION_TOPICS);
  const [notificationsList, setNotificationsList] = useState(INITIAL_NOTIFICATIONS);
  const [submissionsList, setSubmissionsList] = useState(TEACHER_SUBMISSIONS);
  const [adminUsersList] = useState(ADMIN_USERS);

  // Master Spec State: Teacher Approvals, Class Codes, Moderation, Calendar
  const [teacherRequestsList, setTeacherRequestsList] = useState(INITIAL_TEACHER_REQUESTS);
  const [classCodesList, setClassCodesList] = useState(INITIAL_CLASS_CODES);
  const [contentReportsList, setContentReportsList] = useState(INITIAL_CONTENT_REPORTS);
  const [calendarEventsList] = useState(INITIAL_CALENDAR_EVENTS);

  // Expanded Learning Centre State (Sections 22-29)
  const [podcastsList, setPodcastsList] = useState(INITIAL_PODCASTS);
  const [liveSessionsList, setLiveSessionsList] = useState(INITIAL_LIVE_SESSIONS);
  const [quizSetsList, setQuizSetsList] = useState(INITIAL_QUIZ_SETS);
  const [flashcardDecksList, setFlashcardDecksList] = useState(INITIAL_FLASHCARD_DECKS);
  const [achievementsList, setAchievementsList] = useState(INITIAL_ACHIEVEMENTS);
  const [revisionTasksList, setRevisionTasksList] = useState(INITIAL_REVISION_TASKS);
  const [aiMessagesList, setAiMessagesList] = useState(INITIAL_AI_MESSAGES);
  const [confusionSignalsList, setConfusionSignalsList] = useState(INITIAL_CONFUSION_SIGNALS);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinClassModalOpen, setIsJoinClassModalOpen] = useState(false);
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);
  const [viewingResource, setViewingResource] = useState<LearningResource | null>(null);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);

  // Learning Centre Modals State
  const [activeAudioEpisode, setActiveAudioEpisode] = useState<AudioPodcastEpisode | null>(null);
  const [activeLiveSession, setActiveLiveSession] = useState<LiveLearningSession | null>(null);
  const [isNotesToAudioOpen, setIsNotesToAudioOpen] = useState(false);
  const [activeQuizSet, setActiveQuizSet] = useState<PracticeQuizSet | null>(null);
  const [activeFlashcardDeck, setActiveFlashcardDeck] = useState<FlashcardDeck | null>(null);

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Role Switcher Handler
  const handleSwitchRole = (role: UserRole) => {
    setCurrentRole(role);
    setUserProfile(DEMO_PROFILES[role]);
    showToast(`Switched view to ${role === 'student' ? 'Student (Ada)' : role === 'teacher' ? 'Teacher (Mr. Alabi)' : 'Admin (Mrs. Nnamdi)'}`);
    if (currentPage === 'welcome' || currentPage === 'signin') {
      setCurrentPage('dashboard');
    }
  };

  // Reset Demo to initial state
  const handleResetData = () => {
    setClassesList(INITIAL_CLASSES);
    setAssignmentsList(INITIAL_ASSIGNMENTS);
    setAnnouncementsList(INITIAL_ANNOUNCEMENTS);
    setDiscussionsList(DISCUSSION_TOPICS);
    setNotificationsList(INITIAL_NOTIFICATIONS);
    setTeacherRequestsList(INITIAL_TEACHER_REQUESTS);
    setClassCodesList(INITIAL_CLASS_CODES);
    setContentReportsList(INITIAL_CONTENT_REPORTS);
    setPodcastsList(INITIAL_PODCASTS);
    setLiveSessionsList(INITIAL_LIVE_SESSIONS);
    setQuizSetsList(INITIAL_QUIZ_SETS);
    setFlashcardDecksList(INITIAL_FLASHCARD_DECKS);
    setAchievementsList(INITIAL_ACHIEVEMENTS);
    setRevisionTasksList(INITIAL_REVISION_TASKS);
    setAiMessagesList(INITIAL_AI_MESSAGES);
    setConfusionSignalsList(INITIAL_CONFUSION_SIGNALS);
    setUserProfile(DEMO_PROFILES[currentRole]);
    showToast('Reset sample data back to prototype default values.');
  };

  // Quick navigation helper
  const navigateTo = (page: string, itemId?: string) => {
    if (page === 'class-detail' && itemId) {
      setSelectedClassId(itemId);
    } else if (page === 'assignment-detail' && itemId) {
      setSelectedAssignmentId(itemId);
    } else if (page === 'more') {
      setIsMobileMenuOpen(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Add new assignment (Teacher)
  const handleCreateAssignment = (newAsg: Partial<Assignment>) => {
    const item: Assignment = {
      id: `asg-new-${Date.now()}`,
      title: newAsg.title || 'New Class Task',
      subject: newAsg.subject || 'Mathematics',
      classGroup: newAsg.classGroup || 'SS1 Dynamo',
      teacherName: userProfile.name,
      dueDate: newAsg.dueDate || '2026-10-30',
      dueTime: newAsg.dueTime || '11:59 PM',
      points: newAsg.points || 20,
      status: 'not_started',
      instructions: newAsg.instructions || '',
      attachmentName: newAsg.attachmentName,
      attachmentSize: newAsg.attachmentSize
    };
    setAssignmentsList([item, ...assignmentsList]);
    showToast(`New assignment "${item.title}" published!`);
  };

  // Action: Add new announcement (Teacher/Admin)
  const handleCreateAnnouncement = (newAnn: Partial<Announcement>) => {
    const item: Announcement = {
      id: `ann-new-${Date.now()}`,
      title: newAnn.title || 'Notice',
      category: newAnn.category || 'Class Update',
      classGroup: newAnn.classGroup,
      content: newAnn.content || '',
      authorName: userProfile.name,
      authorRole: currentRole === 'admin' ? 'School Admin' : 'Teacher',
      date: 'Just now',
      isRead: false
    };
    setAnnouncementsList([item, ...announcementsList]);
    showToast(`Announcement broadcasted!`);
  };

  // Action: Submit assignment (Student)
  const handleSubmitAssignment = (assignmentId: string, notes: string) => {
    setAssignmentsList(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: 'Just now (Demo)',
          submissionNotes: notes
        };
      }
      return a;
    }));

    // Also add to teacher submission inbox!
    const targetAsg = assignmentsList.find(a => a.id === assignmentId);
    if (targetAsg) {
      setSubmissionsList(prev => [
        {
          id: `sub-${Date.now()}`,
          studentName: userProfile.name,
          classGroup: userProfile.classGroup || 'SS1 Dynamo',
          assignmentTitle: targetAsg.title,
          subject: targetAsg.subject,
          submittedAt: 'Just now',
          status: 'Pending Review'
        },
        ...prev
      ]);
    }

    showToast('Assignment submitted successfully! (Stored in prototype state)');
  };

  // Action: Reply to discussion
  const handleAddReply = (topicId: string, content: string) => {
    setDiscussionsList(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          repliesCount: t.repliesCount + 1,
          replies: [
            ...t.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: userProfile.name,
              authorRole: currentRole === 'student' ? 'Student' : currentRole === 'teacher' ? 'Teacher' : 'Admin',
              date: 'Just now',
              content
            }
          ]
        };
      }
      return t;
    }));
    showToast('Reply added to discussion!');
  };

  // Action: Report/Flag Topic (Discussions -> Admin Moderation Queue)
  const handleReportTopic = (topicTitle: string, reason: string) => {
    const reportItem: ContentReport = {
      id: `rep-${Date.now()}`,
      targetType: 'discussion',
      targetTitle: topicTitle,
      reportedBy: userProfile.name,
      reason,
      timestamp: 'Just now',
      status: 'Pending Review'
    };
    setContentReportsList([reportItem, ...contentReportsList]);
    showToast('Post reported and sent to Administrator Moderation Queue.');
  };

  // Admin Actions: Approve/Decline Teacher Requests
  const handleApproveTeacherRequest = (requestId: string) => {
    setTeacherRequestsList(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));
    showToast('Teacher access request approved! Permissions granted in demo state.');
  };

  const handleDeclineTeacherRequest = (requestId: string) => {
    setTeacherRequestsList(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Declined' } : r));
    showToast('Teacher access request declined.');
  };

  // Admin Actions: Class Codes
  const handleGenerateClassCode = (newCode: Partial<ClassCode>) => {
    const codeItem: ClassCode = {
      id: `code-${Date.now()}`,
      code: newCode.code || 'CODE-DEMO',
      classGroup: newCode.classGroup || 'SS1 Dynamo',
      description: newCode.description || 'Student Access Code',
      maxUses: newCode.maxUses || 35,
      currentUses: 0,
      expiresAt: newCode.expiresAt || '2026-12-31',
      status: 'Active'
    };
    setClassCodesList([codeItem, ...classCodesList]);
    showToast(`New class code ${codeItem.code} generated!`);
  };

  const handleRevokeClassCode = (codeId: string) => {
    setClassCodesList(prev => prev.map(c => c.id === codeId ? { ...c, status: 'Revoked' } : c));
    showToast('Class code revoked.');
  };

  // Admin Actions: Moderation Queue
  const handleDismissReport = (reportId: string) => {
    setContentReportsList(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Dismissed' } : r));
    showToast('Report dismissed as non-violating.');
  };

  const handleActionReport = (reportId: string) => {
    setContentReportsList(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Action Taken' } : r));
    showToast('Moderation action executed: flagged content marked for takedown.');
  };

  // Student Action: Join Class via Code
  const handleJoinClassSuccess = (classGroup: string, code: string) => {
    setUserProfile(prev => ({
      ...prev,
      classGroup: classGroup as any,
      roleTitle: `Day Student • ${classGroup}`
    }));
    // Increment usage count on matched code
    setClassCodesList(prev => prev.map(c => c.code === code ? { ...c, currentUses: c.currentUses + 1 } : c));
    showToast(`Successfully enrolled into ${classGroup} with code ${code}!`);
  };

  // Action: Mark announcement read
  const handleOpenAnnouncement = (ann: Announcement) => {
    setViewingAnnouncement(ann);
    setAnnouncementsList(prev => prev.map(a => a.id === ann.id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAnnouncementsRead = () => {
    setAnnouncementsList(prev => prev.map(a => ({ ...a, isRead: true })));
    showToast('All announcements marked as read.');
  };

  // === LEARNING CENTRE & DISCUSSIONS HANDLERS ===

  // Podcasts & Audio
  const handlePlayPodcast = (ep: AudioPodcastEpisode) => setActiveAudioEpisode(ep);

  const handleToggleBookmarkPodcast = (id: string) => {
    setPodcastsList(prev => prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
    showToast('Podcast bookmark updated.');
  };

  const handleMarkPodcastCompleted = (id: string) => {
    setPodcastsList(prev => prev.map(p => p.id === id ? { ...p, isCompleted: true } : p));
    showToast('Lesson marked as completed! (+10 XP)');
  };

  // Live Learning
  const handleOpenLiveSession = (session: LiveLearningSession) => setActiveLiveSession(session);

  const handleAddLiveQuestion = (sessionId: string, questionText: string) => {
    setLiveSessionsList(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          studentQuestionsCount: s.studentQuestionsCount + 1,
          studentQuestions: [
            ...s.studentQuestions,
            { id: `q-${Date.now()}`, author: userProfile.name, question: questionText, votes: 1 }
          ]
        };
      }
      return s;
    }));
    showToast('Question submitted to live session queue.');
  };

  const handleUpvoteLiveQuestion = (sessionId: string, questionId: string) => {
    setLiveSessionsList(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          studentQuestions: s.studentQuestions.map(q => q.id === questionId ? { ...q, votes: q.votes + 1 } : q)
        };
      }
      return s;
    }));
  };

  // Notes to Audio publishing (Teacher)
  const handlePublishNotesToAudio = (newEp: Omit<AudioPodcastEpisode, 'id'>) => {
    const ep: AudioPodcastEpisode = {
      ...newEp,
      id: `pod-new-${Date.now()}`
    };
    setPodcastsList([ep, ...podcastsList]);
    showToast(`Educational audio "${ep.title}" published to Learning Centre!`);
  };

  // Practice Quizzes
  const handleStartQuiz = (quiz: PracticeQuizSet) => setActiveQuizSet(quiz);

  const handleCompleteQuiz = (quizId: string, score: number) => {
    setQuizSetsList(prev => prev.map(q => {
      if (q.id === quizId) {
        const best = q.bestScore !== undefined ? Math.max(q.bestScore, score) : score;
        return { ...q, isCompleted: true, bestScore: best };
      }
      return q;
    }));
    showToast(`Quiz completed! Best score: ${score}%`);
  };

  // Flashcards & Revision
  const handleOpenFlashcards = (deck: FlashcardDeck) => setActiveFlashcardDeck(deck);

  const handleToggleBookmarkDeck = (deckId: string) => {
    setFlashcardDecksList(prev => prev.map(d => d.id === deckId ? { ...d, isBookmarked: !d.isBookmarked } : d));
    showToast('Flashcard deck bookmark updated.');
  };

  const handleToggleRevisionTask = (taskId: string) => {
    setRevisionTasksList(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleAddRevisionTask = (task: { subject: string; topic: string; scheduledDate: string; durationMinutes: number }) => {
    setRevisionTasksList(prev => [
      ...prev,
      { id: `rev-${Date.now()}`, ...task, isCompleted: false }
    ]);
    showToast('Revision task added to daily checklist.');
  };

  // AI Tutor
  const handleSendAIMessage = (text: string, mode: AITutorMode) => {
    const userMsg: AIMessage = {
      id: `ai-u-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: 'Just now',
      mode
    };
    setAiMessagesList(prev => [...prev, userMsg]);

    setTimeout(() => {
      let simulatedResponse = `Here is a pedagogical explanation for: **${text}**\n\n`;
      if (mode === 'Teach me step by step') {
        simulatedResponse += `1. **Core Principle**: Identify the underlying formula or rule in your syllabus.\n2. **Breakdown**: Look at each term and isolate known quantities from unknowns.\n3. **Application**: Substitute values carefully paying attention to negative signs.\n\nWould you like me to walk you through a specific exercise from your teacher's worksheet?`;
      } else if (mode === 'Explain simply') {
        simulatedResponse += `In everyday terms: Think of this concept like balancing a scale. Whenever you adjust one side, you must mirror the change on the other side to keep balance!`;
      } else if (mode === 'Give me a hint') {
        simulatedResponse += `🔍 **Hint**: Notice the sign inside the radical. If $b^2 - 4ac$ is zero, how many distinct answers can $\\pm\\sqrt{0}$ give?`;
      } else {
        simulatedResponse += `Remember that in SS1 curriculum, accuracy on unit dimensions and step-by-step layout is essential for full marks on exams.`;
      }

      const botMsg: AIMessage = {
        id: `ai-b-${Date.now()}`,
        sender: 'assistant',
        content: simulatedResponse,
        timestamp: 'Just now',
        mode,
        groundedSource: 'SS1 Pilot Syllabus • Curriculum Standard'
      };
      setAiMessagesList(prev => [...prev, botMsg]);
    }, 400);
  };

  const handleRateAIMessage = (messageId: string, rating: 'helpful' | 'not_helpful') => {
    setAiMessagesList(prev => prev.map(m => m.id === messageId ? { ...m, helpfulRating: rating } : m));
    showToast(rating === 'helpful' ? 'Thank you for your feedback!' : 'Feedback noted for curriculum tuning.');
  };

  // Discussions actions
  const handleToggleBookmarkTopic = (topicId: string) => {
    setDiscussionsList(prev => prev.map(t => t.id === topicId ? { ...t, isBookmarked: !t.isBookmarked } : t));
    showToast('Topic bookmark toggled.');
  };

  const handleCreateTopic = (newT: Omit<DiscussionTopic, 'id' | 'replies' | 'repliesCount'>) => {
    const topic: DiscussionTopic = {
      ...newT,
      id: `disc-${Date.now()}`,
      repliesCount: 0,
      replies: []
    };
    setDiscussionsList([topic, ...discussionsList]);
    showToast('New study discussion posted!');
  };

  const handleVerifyReply = (topicId: string, replyId: string) => {
    setDiscussionsList(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          isAnswered: true,
          replies: t.replies.map(r => r.id === replyId ? { ...r, isTeacherVerified: true } : r)
        };
      }
      return t;
    }));
    showToast('Marked as teacher verified solution!');
  };

  const handleSignalConfusion = (topicId: string) => {
    const target = discussionsList.find(t => t.id === topicId);
    if (target) {
      setConfusionSignalsList(prev => {
        const existing = prev.find(s => s.topic.toLowerCase() === target.title.toLowerCase() || s.subject === target.subject);
        if (existing) {
          return prev.map(s => s.id === existing.id ? { ...s, confusedCount: s.confusedCount + 1 } : s);
        }
        return [
          ...prev,
          {
            id: `conf-${Date.now()}`,
            subject: target.subject,
            topic: target.topicTag || target.title,
            classGroup: target.classGroup,
            confusedCount: 1
          }
        ];
      });
    }
    showToast('Anonymous confusion signal sent to your teacher.');
  };

  const handleToggleReviewSubmission = (subId: string) => {
    setSubmissionsList(prev => prev.map(s => s.id === subId ? { ...s, status: 'Reviewed' } : s));
    showToast('Submission marked as Reviewed.');
  };

  // Unread indicators
  const unreadAnnouncementsCount = announcementsList.filter(a => !a.isRead).length;
  const pendingAssignmentsCount = assignmentsList.filter(a => a.status === 'not_started' || a.status === 'in_progress').length;

  // Render entry views
  if (currentPage === 'welcome') {
    return (
      <Welcome
        onExploreDemo={() => {
          handleSwitchRole('student');
          setCurrentPage('dashboard');
        }}
        onGoToSignIn={() => setCurrentPage('signin')}
        onSelectRoleAndEnter={(role) => {
          handleSwitchRole(role);
          setCurrentPage('dashboard');
        }}
      />
    );
  }

  if (currentPage === 'signin') {
    return (
      <DemoSignIn
        onSignInSuccess={(role) => {
          handleSwitchRole(role);
          setCurrentPage('dashboard');
        }}
        onBackToWelcome={() => setCurrentPage('welcome')}
      />
    );
  }

  // Find active items for detail views
  const currentClass = classesList.find(c => c.id === selectedClassId) || classesList[0];
  const currentAssignment = assignmentsList.find(a => a.id === selectedAssignmentId) || assignmentsList[0];

  // Resolve topbar title
  const getPageHeaderTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return currentRole === 'teacher' ? 'Teacher Dashboard' : currentRole === 'admin' ? 'Pilot Administration' : 'Student Dashboard';
      case 'classes':
        return 'My Enrolled Classes';
      case 'class-detail':
        return currentClass.name;
      case 'assignments':
        return 'Assignments & Tasks';
      case 'assignment-detail':
        return currentAssignment.title;
      case 'announcements':
        return 'School Announcements';
      case 'timetable':
        return 'Timetable & Academic Calendar';
      case 'learning-centre':
        return 'Learning Centre';
      case 'discussions':
        return 'Class Discussions';
      case 'profile':
        return 'Profile & Settings';
      default:
        return 'School Hub';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Global Prototype Banner */}
      <GlobalBanner
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        onResetDemo={handleResetData}
      />

      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'var(--primary-navy)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          animation: 'fadeIn 180ms ease'
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Main Desktop / Mobile Shell */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Desktop Sidebar (Left) */}
        <div className="desktop-sidebar-container">
          <Sidebar
            currentPage={currentPage}
            onNavigate={navigateTo}
            userProfile={userProfile}
            onSignOut={() => setCurrentPage('welcome')}
            unreadAnnouncementsCount={unreadAnnouncementsCount}
            pendingAssignmentsCount={pendingAssignmentsCount}
          />
        </div>

        {/* Mobile Navigation (Drawer & Bottom Nav) */}
        <MobileNav
          currentPage={currentPage}
          onNavigate={navigateTo}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          userProfile={userProfile}
          onSignOut={() => setCurrentPage('welcome')}
          unreadAnnouncementsCount={unreadAnnouncementsCount}
        />

        {/* Right Content Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '70px' }}>
          {/* Topbar */}
          <Topbar
            pageTitle={getPageHeaderTitle()}
            breadcrumbs={['School Hub', userProfile.role.toUpperCase()]}
            userProfile={userProfile}
            notifications={notificationsList}
            onMarkNotificationRead={(id) => {
              setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            }}
            onMarkAllNotificationsRead={() => {
              setNotificationsList(prev => prev.map(n => ({ ...n, isRead: true })));
              showToast('All notifications cleared.');
            }}
            onNavigate={navigateTo}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onSearchClick={() => setIsSearchOpen(true)}
          />

          {/* Main Workspace Body */}
          <main style={{ flex: 1, padding: '24px 28px' }}>
            {currentPage === 'dashboard' && (
              currentRole === 'teacher' ? (
                <TeacherDashboard
                  userProfile={userProfile}
                  classes={classesList}
                  assignments={assignmentsList}
                  announcements={announcementsList}
                  submissions={submissionsList}
                  confusionSignals={confusionSignalsList}
                  onOpenCreateAssignment={() => setIsCreateAssignmentOpen(true)}
                  onOpenCreateAnnouncement={() => setIsCreateAnnouncementOpen(true)}
                  onOpenNotesToAudio={() => setIsNotesToAudioOpen(true)}
                  onNavigate={navigateTo}
                  onToggleReviewSubmission={handleToggleReviewSubmission}
                />
              ) : currentRole === 'admin' ? (
                <AdminDashboard
                  userProfile={userProfile}
                  adminUsers={adminUsersList}
                  teacherRequests={teacherRequestsList}
                  classCodes={classCodesList}
                  contentReports={contentReportsList}
                  onApproveTeacherRequest={handleApproveTeacherRequest}
                  onDeclineTeacherRequest={handleDeclineTeacherRequest}
                  onRevokeClassCode={handleRevokeClassCode}
                  onGenerateClassCode={handleGenerateClassCode}
                  onDismissReport={handleDismissReport}
                  onActionReport={handleActionReport}
                  onSwitchRole={handleSwitchRole}
                  onNavigate={navigateTo}
                />
              ) : (
                <StudentDashboard
                  userProfile={userProfile}
                  classes={classesList}
                  assignments={assignmentsList}
                  announcements={announcementsList}
                  timetable={TIMETABLE_DATA}
                  onNavigate={navigateTo}
                  onOpenAnnouncementModal={handleOpenAnnouncement}
                />
              )
            )}

            {currentPage === 'classes' && (
              <Classes
                classes={classesList}
                onSelectClass={(id) => navigateTo('class-detail', id)}
                onOpenJoinCodeModal={() => setIsJoinClassModalOpen(true)}
              />
            )}

            {currentPage === 'class-detail' && (
              <ClassDetail
                cls={currentClass}
                assignments={assignmentsList}
                resources={LEARNING_RESOURCES}
                announcements={announcementsList}
                discussions={discussionsList}
                onBack={() => navigateTo('classes')}
                onOpenAssignment={(id) => navigateTo('assignment-detail', id)}
                onOpenResourcePreview={(res) => setViewingResource(res)}
              />
            )}

            {currentPage === 'assignments' && (
              <Assignments
                assignments={assignmentsList}
                onSelectAssignment={(id) => navigateTo('assignment-detail', id)}
              />
            )}

            {currentPage === 'assignment-detail' && (
              <AssignmentDetail
                assignment={currentAssignment}
                onBack={() => navigateTo('assignments')}
                onSubmitAssignment={handleSubmitAssignment}
              />
            )}

            {currentPage === 'announcements' && (
              <Announcements
                announcements={announcementsList}
                onOpenAnnouncement={handleOpenAnnouncement}
                onMarkAllAsRead={handleMarkAllAnnouncementsRead}
              />
            )}

            {currentPage === 'timetable' && (
              <Timetable
                timetable={TIMETABLE_DATA}
                calendarEvents={calendarEventsList}
                initialClassGroup={userProfile.classGroup || 'SS1 Dynamo'}
              />
            )}

            {currentPage === 'learning-centre' && (
              <LearningCentre
                resources={LEARNING_RESOURCES}
                podcasts={podcastsList}
                liveSessions={liveSessionsList}
                quizSets={quizSetsList}
                flashcardDecks={flashcardDecksList}
                achievements={achievementsList}
                revisionTasks={revisionTasksList}
                aiMessages={aiMessagesList}
                userRole={currentRole}
                onOpenResourcePreview={(res) => setViewingResource(res)}
                onPlayPodcast={handlePlayPodcast}
                onOpenLiveSession={handleOpenLiveSession}
                onOpenNotesToAudio={() => setIsNotesToAudioOpen(true)}
                onStartQuiz={handleStartQuiz}
                onOpenFlashcards={handleOpenFlashcards}
                onToggleBookmarkPodcast={handleToggleBookmarkPodcast}
                onToggleBookmarkDeck={handleToggleBookmarkDeck}
                onToggleRevisionTask={handleToggleRevisionTask}
                onAddRevisionTask={handleAddRevisionTask}
                onSendAIMessage={handleSendAIMessage}
                onRateAIMessage={handleRateAIMessage}
              />
            )}

            {currentPage === 'discussions' && (
              <Discussions
                topics={discussionsList}
                userProfile={userProfile}
                onAddReply={handleAddReply}
                onReportTopic={handleReportTopic}
                onToggleBookmarkTopic={handleToggleBookmarkTopic}
                onCreateTopic={handleCreateTopic}
                onVerifyReply={handleVerifyReply}
                onSignalConfusion={handleSignalConfusion}
              />
            )}

            {currentPage === 'profile' && (
              <ProfileSettings
                userProfile={userProfile}
                onUpdateProfile={(updated) => {
                  setUserProfile(prev => ({ ...prev, ...updated }));
                }}
                onSwitchRole={handleSwitchRole}
                onResetData={handleResetData}
                onSignOut={() => setCurrentPage('welcome')}
              />
            )}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        classes={classesList}
        assignments={assignmentsList}
        announcements={announcementsList}
        resources={LEARNING_RESOURCES}
        onNavigateToItem={navigateTo}
      />

      <AnnouncementModal
        announcement={viewingAnnouncement}
        onClose={() => setViewingAnnouncement(null)}
      />

      <ResourcePreviewModal
        resource={viewingResource}
        onClose={() => setViewingResource(null)}
      />

      <CreateAssignmentModal
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        teacherName={userProfile.name}
        onCreate={handleCreateAssignment}
      />

      <CreateAnnouncementModal
        isOpen={isCreateAnnouncementOpen}
        onClose={() => setIsCreateAnnouncementOpen(false)}
        authorName={userProfile.name}
        authorRole={currentRole === 'admin' ? 'School Admin' : 'Teacher'}
        onCreate={handleCreateAnnouncement}
      />

      <JoinClassModal
        isOpen={isJoinClassModalOpen}
        onClose={() => setIsJoinClassModalOpen(false)}
        availableCodes={classCodesList}
        onJoinSuccess={handleJoinClassSuccess}
      />

      {/* Learning Centre Interactive Modals */}
      <AudioPlayerModal
        episode={activeAudioEpisode}
        isOpen={!!activeAudioEpisode}
        onClose={() => setActiveAudioEpisode(null)}
        onToggleBookmark={handleToggleBookmarkPodcast}
        onMarkCompleted={handleMarkPodcastCompleted}
      />

      <LiveRoomModal
        session={activeLiveSession}
        isOpen={!!activeLiveSession}
        onClose={() => setActiveLiveSession(null)}
        onAddQuestion={handleAddLiveQuestion}
        onUpvoteQuestion={handleUpvoteLiveQuestion}
        onOpenResourcePreview={(title) => {
          const found = LEARNING_RESOURCES.find(r => r.title.toLowerCase().includes(title.toLowerCase()));
          if (found) setViewingResource(found);
        }}
      />

      <NotesToAudioModal
        isOpen={isNotesToAudioOpen}
        onClose={() => setIsNotesToAudioOpen(false)}
        onPublish={handlePublishNotesToAudio}
        defaultTeacherName={userProfile.name}
      />

      <QuizModal
        quiz={activeQuizSet}
        isOpen={!!activeQuizSet}
        onClose={() => setActiveQuizSet(null)}
        onCompleteQuiz={handleCompleteQuiz}
      />

      <FlashcardModal
        deck={activeFlashcardDeck}
        isOpen={!!activeFlashcardDeck}
        onClose={() => setActiveFlashcardDeck(null)}
        onToggleBookmark={handleToggleBookmarkDeck}
      />

      {/* Layout Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-sidebar-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
