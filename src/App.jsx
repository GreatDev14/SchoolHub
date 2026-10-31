import React, { useState, useEffect } from 'react';
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
import { getInitialStorageState, saveState, clearAllSchoolHubStorage } from './utils/storage';
import { supabase } from './lib/supabaseClient';

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
  const initialData = getInitialStorageState();

  // Navigation State
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedClassId, setSelectedClassId] = useState('cls-math-dyn');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('asg-01');

  // User State
  const [currentRole, setCurrentRole] = useState(initialData.userRole || 'student');
  const [userProfile, setUserProfile] = useState(initialData.userProfile || DEMO_PROFILES.student);

  // Persistent Core State
  const [classesList, setClassesList] = useState(initialData.classes);
  const [assignmentsList, setAssignmentsList] = useState(initialData.assignments);
  const [announcementsList, setAnnouncementsList] = useState(initialData.announcements);
  const [discussionsList, setDiscussionsList] = useState(initialData.discussions);
  const [notificationsList, setNotificationsList] = useState(initialData.notifications);
  const [submissionsList, setSubmissionsList] = useState(initialData.submissions);
  const [adminUsersList] = useState(ADMIN_USERS);

  // Master Spec State: Teacher Approvals, Class Codes, Moderation, Calendar
  const [teacherRequestsList, setTeacherRequestsList] = useState(initialData.teacherRequests);
  const [classCodesList, setClassCodesList] = useState(initialData.classCodes);
  const [contentReportsList, setContentReportsList] = useState(initialData.contentReports);
  const [calendarEventsList] = useState(INITIAL_CALENDAR_EVENTS);

  // Learning Centre State
  const [podcastsList, setPodcastsList] = useState(initialData.podcasts);
  const [liveSessionsList, setLiveSessionsList] = useState(initialData.liveSessions);
  const [quizSetsList, setQuizSetsList] = useState(initialData.quizSets);
  const [flashcardDecksList, setFlashcardDecksList] = useState(initialData.flashcardDecks);
  const [achievementsList, setAchievementsList] = useState(INITIAL_ACHIEVEMENTS);
  const [revisionTasksList, setRevisionTasksList] = useState(initialData.revisionTasks);
  const [aiMessagesList, setAiMessagesList] = useState(initialData.aiMessages);
  const [confusionSignalsList, setConfusionSignalsList] = useState(INITIAL_CONFUSION_SIGNALS);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinClassModalOpen, setIsJoinClassModalOpen] = useState(false);
  const [viewingAnnouncement, setViewingAnnouncement] = useState(null);
  const [viewingResource, setViewingResource] = useState(null);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);

  // Learning Centre Modals State
  const [activeAudioEpisode, setActiveAudioEpisode] = useState(null);
  const [activeLiveSession, setActiveLiveSession] = useState(null);
  const [isNotesToAudioOpen, setIsNotesToAudioOpen] = useState(false);
  const [activeQuizSet, setActiveQuizSet] = useState(null);
  const [activeFlashcardDeck, setActiveFlashcardDeck] = useState(null);

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  useEffect(() => {
    let isMounted = true;
    const loadAuthenticatedProfile = async (session) => {
      if (!session?.user || !isMounted) return;
      const [{ data: profile }, { data: roleRows }] = await Promise.all([
        supabase.from('profiles').select('full_name, school_id, avatar_url').eq('id', session.user.id).single(),
        supabase.from('school_roles').select('role, status').eq('user_id', session.user.id).eq('status', 'active')
      ]);
      if (!isMounted) return;
      const roleNames = roleRows?.map((row) => row.role) || [];
      const serverRole = roleNames.includes('admin') ? 'admin' : roleNames.includes('teacher') ? 'teacher' : 'student';
      setCurrentRole(serverRole);
      if (profile) {
        setUserProfile((previous) => ({ ...previous, name: profile.full_name, school: 'International Unity School', avatar: profile.avatar_url || previous.avatar }));
      }
      setCurrentPage('dashboard');
    };

    supabase.auth.getSession().then(({ data }) => loadAuthenticatedProfile(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      loadAuthenticatedProfile(session);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveState('user_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    saveState('user_profile', userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveState('classes', classesList);
  }, [classesList]);

  useEffect(() => {
    saveState('assignments', assignmentsList);
  }, [assignmentsList]);

  useEffect(() => {
    saveState('announcements', announcementsList);
  }, [announcementsList]);

  useEffect(() => {
    saveState('discussions', discussionsList);
  }, [discussionsList]);

  useEffect(() => {
    saveState('notifications', notificationsList);
  }, [notificationsList]);

  useEffect(() => {
    saveState('submissions', submissionsList);
  }, [submissionsList]);

  useEffect(() => {
    saveState('teacher_requests', teacherRequestsList);
  }, [teacherRequestsList]);

  useEffect(() => {
    saveState('class_codes', classCodesList);
  }, [classCodesList]);

  useEffect(() => {
    saveState('content_reports', contentReportsList);
  }, [contentReportsList]);

  useEffect(() => {
    saveState('podcasts', podcastsList);
  }, [podcastsList]);

  useEffect(() => {
    saveState('live_sessions', liveSessionsList);
  }, [liveSessionsList]);

  useEffect(() => {
    saveState('quiz_sets', quizSetsList);
  }, [quizSetsList]);

  useEffect(() => {
    saveState('flashcard_decks', flashcardDecksList);
  }, [flashcardDecksList]);

  useEffect(() => {
    saveState('revision_tasks', revisionTasksList);
  }, [revisionTasksList]);

  useEffect(() => {
    saveState('ai_messages', aiMessagesList);
  }, [aiMessagesList]);

  // Keyboard shortcut listener for Search modal (/ or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Role Switcher Handler
  const handleSwitchRole = (role) => {
    setCurrentRole(role);
    const profile = DEMO_PROFILES[role];
    setUserProfile(profile);
    showToast(`Switched view to ${role === 'student' ? 'Student (Ada)' : role === 'teacher' ? 'Teacher (Mr. Alabi)' : 'Admin (Mrs. Nnamdi)'}`);
    if (currentPage === 'welcome' || currentPage === 'signin') {
      setCurrentPage('dashboard');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentPage('welcome');
  };

  // Reset Data Handler
  const handleResetData = () => {
    clearAllSchoolHubStorage();
    setClassesList(INITIAL_CLASSES);
    setAssignmentsList(INITIAL_ASSIGNMENTS);
    setAnnouncementsList(INITIAL_ANNOUNCEMENTS);
    setDiscussionsList(DISCUSSION_TOPICS);
    setNotificationsList(INITIAL_NOTIFICATIONS);
    setSubmissionsList(TEACHER_SUBMISSIONS);
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
    showToast('All local demonstration data has been reset to defaults.');
  };

  const handleCreateClass = (newClass) => {
    const item = {
      ...newClass,
      id: `cls-school-${Date.now()}`,
      teacherEmail: '',
      resourceCount: 0,
      assignmentCount: 0,
      colorAccent: '#356AE6',
      description: `${newClass.name} class for ${newClass.classGroup}.`
    };
    setClassesList(prev => [...prev, item]);
    showToast(`${newClass.name} was added to ${newClass.classGroup}.`);
  };
  const handleUpdateClass = (updatedClass) => {
    setClassesList(prev => prev.map(cls => cls.id === updatedClass.id ? { ...cls, ...updatedClass } : cls));
    showToast(`${updatedClass.name} was updated.`);
  };
  const handleDeleteClass = (classId) => {
    const target = classesList.find(cls => cls.id === classId);
    setClassesList(prev => prev.filter(cls => cls.id !== classId));
    if (target) showToast(`${target.name} was removed from the school class list.`);
  };

  // Navigation Helper
  const navigateTo = (page, itemId) => {
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

  // Teacher Action: Create Assignment
  const handleCreateAssignment = (newAsg) => {
    const item = {
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
    setAssignmentsList(prev => [item, ...prev]);

    // Create notification for students
    const notif = {
      id: `notif-${Date.now()}`,
      title: `New Assignment: ${item.title}`,
      description: `${item.subject} (${item.classGroup}) due ${item.dueDate}`,
      timestamp: 'Just now',
      isRead: false,
      type: 'assignment'
    };
    setNotificationsList(prev => [notif, ...prev]);
    showToast(`New assignment "${item.title}" published!`);
  };

  // Teacher/Admin Action: Create Announcement
  const handleCreateAnnouncement = (newAnn) => {
    const item = {
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
    setAnnouncementsList(prev => [item, ...prev]);

    // Create notification
    const notif = {
      id: `notif-${Date.now()}`,
      title: `Notice: ${item.title}`,
      description: `Posted by ${item.authorName} (${item.category})`,
      timestamp: 'Just now',
      isRead: false,
      type: 'announcement'
    };
    setNotificationsList(prev => [notif, ...prev]);
    showToast(`Announcement broadcasted!`);
  };

  // Student Action: Submit Assignment
  const handleSubmitAssignment = (assignmentId, notes, fileName) => {
    const targetAsg = assignmentsList.find(a => a.id === assignmentId);
    setAssignmentsList(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: 'Just now',
          submissionNotes: notes,
          attachmentName: fileName || a.attachmentName
        };
      }
      return a;
    }));

    // Add to teacher submission inbox with file details
    if (targetAsg) {
      setSubmissionsList(prev => [
        {
          id: `sub-${Date.now()}`,
          studentName: userProfile.name,
          classGroup: userProfile.classGroup || 'SS1 Dynamo',
          assignmentTitle: targetAsg.title,
          subject: targetAsg.subject,
          submittedAt: 'Just now',
          fileName: fileName || 'Student_Worksheet.pdf',
          notes: notes,
          status: 'Pending Review'
        },
        ...prev
      ]);
    }
    showToast('Assignment submitted successfully! Visible in teacher grading queue.');
  };

  // Discussions Action: Reply
  const handleAddReply = (topicId, content) => {
    setDiscussionsList(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          repliesCount: t.repliesCount + 1,
          isAnswered: true,
          replies: [
            ...t.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: userProfile.name,
              authorRole: userProfile.role === 'teacher' ? 'Teacher' : 'Student',
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

  // Discussions Action: Report/Flag Topic
  const handleReportTopic = (topicTitle, reason) => {
    const reportItem = {
      id: `rep-${Date.now()}`,
      targetType: 'discussion',
      targetTitle: topicTitle,
      reportedBy: userProfile.name,
      reason,
      timestamp: 'Just now',
      status: 'Pending Review'
    };
    setContentReportsList(prev => [reportItem, ...prev]);
    showToast('Post reported and sent to Administrator Moderation Queue.');
  };

  // Admin Actions: Approve/Decline Teacher Requests
  const handleApproveTeacherRequest = (requestId) => {
    setTeacherRequestsList(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));
    showToast('Teacher access request approved! Permissions granted in system.');
  };

  const handleDeclineTeacherRequest = (requestId) => {
    setTeacherRequestsList(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Declined' } : r));
    showToast('Teacher access request declined.');
  };

  // Admin Actions: Class Codes
  const handleGenerateClassCode = (newCode) => {
    const codeItem = {
      id: `code-${Date.now()}`,
      code: newCode.code || 'CODE-DEMO',
      classGroup: newCode.classGroup || 'SS1 Dynamo',
      description: newCode.description || 'Student Access Code',
      maxUses: newCode.maxUses || 35,
      currentUses: 0,
      expiresAt: newCode.expiresAt || '2026-12-31',
      status: 'Active'
    };
    setClassCodesList(prev => [codeItem, ...prev]);
    showToast(`New class code ${codeItem.code} generated!`);
  };

  const handleRevokeClassCode = (codeId) => {
    setClassCodesList(prev => prev.map(c => c.id === codeId ? { ...c, status: 'Revoked' } : c));
    showToast('Class code revoked.');
  };

  // Admin Actions: Moderation Queue
  const handleDismissReport = (reportId) => {
    setContentReportsList(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Dismissed' } : r));
    showToast('Report dismissed as non-violating.');
  };

  const handleActionReport = (reportId) => {
    setContentReportsList(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Action Taken' } : r));
    showToast('Moderation action executed: flagged content marked for takedown.');
  };

  // Student Action: Join Class via Code
  const handleJoinClassSuccess = (classGroup, code) => {
    setUserProfile(prev => ({
      ...prev,
      classGroup: classGroup,
      roleTitle: `Day Student • ${classGroup}`
    }));

    // Update matched code usage count
    setClassCodesList(prev => prev.map(c => c.code === code ? { ...c, currentUses: c.currentUses + 1 } : c));

    // Enroll in relevant classes for this group
    setClassesList(prev => prev.map(c => {
      if (c.classGroup === classGroup) {
        return { ...c, studentCount: (c.studentCount || 32) + 1, isEnrolled: true };
      }
      return c;
    }));

    showToast(`Successfully enrolled into ${classGroup} with code ${code}!`);
  };

  // Announcements Action: Read
  const handleOpenAnnouncement = (ann) => {
    setViewingAnnouncement(ann);
    setAnnouncementsList(prev => prev.map(a => a.id === ann.id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAnnouncementsRead = () => {
    setAnnouncementsList(prev => prev.map(a => ({ ...a, isRead: true })));
    showToast('All announcements marked as read.');
  };

  // Learning Centre: Podcasts & Audio
  const handlePlayPodcast = (ep) => setActiveAudioEpisode(ep);

  const handleToggleBookmarkPodcast = (id) => {
    setPodcastsList(prev => prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
    showToast('Podcast bookmark updated.');
  };

  const handleMarkPodcastCompleted = (id) => {
    setPodcastsList(prev => prev.map(p => p.id === id ? { ...p, isCompleted: true } : p));
    showToast('Lesson marked as completed! (+10 XP)');
  };

  // Learning Centre: Live Learning
  const handleOpenLiveSession = (session) => setActiveLiveSession(session);

  const handleAddLiveQuestion = (sessionId, questionText) => {
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

  const handleUpvoteLiveQuestion = (sessionId, questionId) => {
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

  // Learning Centre: Notes to Audio publishing (Teacher)
  const handlePublishNotesToAudio = (newEp) => {
    const ep = {
      ...newEp,
      id: `pod-new-${Date.now()}`
    };
    setPodcastsList(prev => [ep, ...prev]);
    showToast(`Educational audio "${ep.title}" published to Learning Centre!`);
  };

  // Learning Centre: Practice Quizzes
  const handleStartQuiz = (quiz) => setActiveQuizSet(quiz);

  const handleCompleteQuiz = (quizId, score) => {
    setQuizSetsList(prev => prev.map(q => {
      if (q.id === quizId) {
        const best = q.bestScore !== undefined ? Math.max(q.bestScore, score) : score;
        return { ...q, isCompleted: true, bestScore: best };
      }
      return q;
    }));
    showToast(`Quiz completed! Best score: ${score}%`);
  };

  // Learning Centre: Flashcards
  const handleOpenFlashcards = (deck) => setActiveFlashcardDeck(deck);

  const handleToggleBookmarkDeck = (deckId) => {
    setFlashcardDecksList(prev => prev.map(d => d.id === deckId ? { ...d, isBookmarked: !d.isBookmarked } : d));
    showToast('Flashcard deck bookmark updated.');
  };

  // Learning Centre: Revision Tasks
  const handleToggleRevisionTask = (taskId) => {
    setRevisionTasksList(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleAddRevisionTask = (task) => {
    setRevisionTasksList(prev => [
      ...prev,
      { id: `rev-${Date.now()}`, ...task, isCompleted: false }
    ]);
    showToast('Revision task added to daily checklist.');
  };

  // Learning Centre: AI Tutor
  const handleSendAIMessage = (text, mode) => {
    const userMsg = {
      id: `ai-u-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: 'Just now',
      mode
    };
    setAiMessagesList(prev => [...prev, userMsg]);

    setTimeout(() => {
      let pedagogicalResponse = `Curriculum Guidance for: **${text}**\n\n`;
      if (mode === 'Teach me step by step') {
        pedagogicalResponse += `1. **Identify the Concept**: State given parameters clearly with their standard SI units.\n2. **Isolate Unknown**: Select the fundamental syllabus equation that connects given values.\n3. **Step-by-Step Substitution**: Evaluate algebraic terms carefully, showing every intermediate step for full marking marks.\n\nWould you like me to generate a similar SS1 exam practice problem?`;
      } else if (mode === 'Explain simply') {
        pedagogicalResponse += `In everyday terms: Think of this concept like an energy ledger in banking. Every input must be balanced by an equivalent output or storage term!`;
      } else if (mode === 'Give me a hint') {
        pedagogicalResponse += `🔍 **Syllabus Clue**: Check your reference sheet for the distinction between scalar speed and vector velocity in one-dimensional kinematics.`;
      } else {
        pedagogicalResponse += `Remember: In SS1 terminal examinations, laying out your workings systematically awards up to 70% of continuous assessment marks.`;
      }

      const botMsg = {
        id: `ai-b-${Date.now()}`,
        sender: 'assistant',
        content: pedagogicalResponse,
        timestamp: 'Just now',
        mode,
        groundedSource: 'SS1 Pilot Syllabus • WAEC/NECO Academic Standards'
      };
      setAiMessagesList(prev => [...prev, botMsg]);
    }, 350);
  };

  const handleRateAIMessage = (messageId, rating) => {
    setAiMessagesList(prev => prev.map(m => m.id === messageId ? { ...m, helpfulRating: rating } : m));
    showToast(rating === 'helpful' ? 'Thank you for your feedback!' : 'Feedback noted for curriculum tuning.');
  };

  // Discussions: Bookmark & Create
  const handleToggleBookmarkTopic = (topicId) => {
    setDiscussionsList(prev => prev.map(t => t.id === topicId ? { ...t, isBookmarked: !t.isBookmarked } : t));
    showToast('Topic bookmark toggled.');
  };

  const handleCreateTopic = (newT) => {
    const topic = {
      ...newT,
      id: `disc-${Date.now()}`,
      repliesCount: 0,
      replies: []
    };
    setDiscussionsList(prev => [topic, ...prev]);
    showToast('New study discussion posted!');
  };

  const handleVerifyReply = (topicId, replyId) => {
    setDiscussionsList(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          replies: t.replies.map(r => r.id === replyId ? { ...r, isVerified: !r.isVerified } : r)
        };
      }
      return t;
    }));
    showToast('Teacher verification badge updated.');
  };

  const handleSignalConfusion = (topicId) => {
    const topic = discussionsList.find(t => t.id === topicId);
    if (topic) {
      setConfusionSignalsList(prev => [
        {
          id: `conf-${Date.now()}`,
          topicId,
          topicTitle: topic.title,
          subject: topic.subject,
          classGroup: topic.classGroup,
          studentCount: 1,
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }
    showToast('Anonymous confusion signal sent to your subject teacher.');
  };

  const handleToggleReviewSubmission = (subId) => {
    setSubmissionsList(prev => prev.map(s => s.id === subId ? { ...s, status: 'Reviewed' } : s));
    showToast('Submission marked as Reviewed.');
  };

  // Counts for Badges
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

  // Active items for detail views
  const currentClass = classesList.find(c => c.id === selectedClassId) || classesList[0];
  const currentAssignment = assignmentsList.find(a => a.id === selectedAssignmentId) || assignmentsList[0];

  // Topbar Title
  const getPageHeaderTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return currentRole === 'teacher' ? 'Teacher Dashboard' : currentRole === 'admin' ? 'School Administration' : 'Student Dashboard';
      case 'classes':
        return 'My Enrolled Classes';
      case 'class-detail':
        return currentClass?.name || 'Class Space';
      case 'assignments':
        return 'Assignments & Tasks';
      case 'assignment-detail':
        return currentAssignment?.title || 'Assignment Detail';
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
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          animation: 'fadeIn 120ms ease'
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
            onSignOut={handleSignOut}
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
          onSignOut={handleSignOut}
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
              showToast('All notifications marked as read.');
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
                  classes={classesList}
                  onCreateClass={handleCreateClass}
                  onUpdateClass={handleUpdateClass}
                  onDeleteClass={handleDeleteClass}
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
                onSignOut={handleSignOut}
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

      {/* Responsive layout CSS */}
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
