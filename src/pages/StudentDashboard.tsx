import React from 'react';
import {
  GraduationCap,
  CheckSquare,
  Bell,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  FolderArchive,
  MessageSquare,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  UserProfile,
  ClassSubject,
  Assignment,
  Announcement,
  TimetableEntry
} from '../types';

interface StudentDashboardProps {
  userProfile: UserProfile;
  classes: ClassSubject[];
  assignments: Assignment[];
  announcements: Announcement[];
  timetable: TimetableEntry[];
  onNavigate: (page: string, itemId?: string) => void;
  onOpenAnnouncementModal: (announcement: Announcement) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userProfile,
  classes,
  assignments,
  announcements,
  timetable,
  onNavigate,
  onOpenAnnouncementModal
}) => {
  // Pilot student classes (e.g., SS1 Dynamo)
  const studentClasses = classes.filter(c => c.classGroup === userProfile.classGroup || c.studentCount > 32);
  const pendingAssignments = assignments.filter(a => a.status === 'not_started' || a.status === 'in_progress');
  const unreadAnnouncements = announcements.filter(a => !a.isRead);

  // Today's lessons (Wednesday demo)
  const todayLessons = timetable.filter(t => t.day === 'Wednesday' && t.classGroup === (userProfile.classGroup || 'SS1 Dynamo'));

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="badge badge-green">Submitted</span>;
      case 'in_progress':
        return <span className="badge badge-blue">In Progress</span>;
      case 'past_due':
        return <span className="badge badge-red">Past Due</span>;
      case 'not_started':
      default:
        return <span className="badge badge-amber">Not Started</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Live Now Alert Banner if session is active */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#FEF2F2',
        borderRadius: 'var(--radius-md)',
        border: '1px solid #FECACA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            display: 'flex'
          }}>
            <Sparkles size={16} />
          </span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-red" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                ● LIVE LEARNING ROOM ACTIVE
              </span>
              <span style={{ fontSize: '0.75rem', color: '#991B1B', fontWeight: 600 }}>
                Mathematics • SS1 Dynamo
              </span>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#7F1D1D', marginTop: '2px' }}>
              Surds Simplification &amp; Conjugate Rationalization Live Surgery with Mr. Alabi
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('learning-centre')}
          className="btn btn-primary btn-sm"
          style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
        >
          <span>Enter Live Room</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Friendly Student Greeting Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '28px',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFD 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--accent-blue-soft)',
              color: 'var(--accent-blue)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 700
            }}>
              <Sparkles size={13} /> {userProfile.classGroup || 'SS1 Dynamo'} • Day Student Pilot
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 700,
              border: '1px solid #FDE68A'
            }}>
              🔥 5-Day Study Streak
            </div>
          </div>

          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            letterSpacing: '-0.03em',
            lineHeight: 1.2
          }}>
            Good morning, {userProfile.name.split(' ')[0]} 👋
          </h2>
          <p style={{
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            marginTop: '4px'
          }}>
            Here’s what’s happening with your schoolwork today. You have <strong>{pendingAssignments.length} assignments</strong> in progress.
          </p>
        </div>

        {/* Quick action buttons right in greeting */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('learning-centre')}
            className="btn btn-primary btn-sm"
          >
            <BookOpen size={16} />
            <span>Learning Centre</span>
          </button>
          <button
            onClick={() => onNavigate('assignments')}
            className="btn btn-secondary btn-sm"
          >
            <CheckSquare size={16} />
            <span>Assignments</span>
          </button>
          <button
            onClick={() => onNavigate('timetable')}
            className="btn btn-secondary btn-sm"
          >
            <Calendar size={16} />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {/* Classes Card */}
        <div
          onClick={() => onNavigate('classes')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--accent-blue-soft)',
            color: 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <GraduationCap size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>My Classes</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
              {studentClasses.length} Subjects
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '2px' }}>
              SS1 Dynamo Class &rarr;
            </div>
          </div>
        </div>

        {/* Assignments Due */}
        <div
          onClick={() => onNavigate('assignments')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-warning-bg)',
            color: 'var(--color-warning)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CheckSquare size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Assignments Due</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
              {pendingAssignments.length} Pending
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-warning)', fontWeight: 600, marginTop: '2px' }}>
              Next: Mathematics (Oct 15)
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div
          onClick={() => onNavigate('announcements')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Bell size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Announcements</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
              {unreadAnnouncements.length} New
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '2px' }}>
              Includes Math revision notes
            </div>
          </div>
        </div>

        {/* Timetable summary */}
        <div
          onClick={() => onNavigate('timetable')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#F5F3FF',
            color: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Clock size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Today's Lessons</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
              {todayLessons.length} Scheduled
            </div>
            <div style={{ fontSize: '0.72rem', color: '#7C3AED', fontWeight: 600, marginTop: '2px' }}>
              Wed: Math • Civic • Library
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Assignments & Classes), Right (Today's Lessons & Announcements) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Upcoming Assignments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  Upcoming Assignments
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Active tasks for SS1 Dynamo
                </span>
              </div>
              <button
                onClick={() => onNavigate('assignments')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                View all &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {assignments.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('assignment-detail', item.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 120ms ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                        {item.subject}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>• Due {item.dueDate}</span>
                    </div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'var(--primary-navy)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Teacher: {item.teacherName}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {getStatusBadge(item.status)}
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Class Shortcut Cards */}
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  My Enrolled Classes
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Click to access classwork &amp; resources
                </span>
              </div>
              <button
                onClick={() => onNavigate('classes')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                All Classes &rarr;
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {studentClasses.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => onNavigate('class-detail', cls.id)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 120ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cls.colorAccent;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '6px',
                    height: '24px',
                    borderRadius: '3px',
                    backgroundColor: cls.colorAccent,
                    marginBottom: '8px'
                  }} />
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                    {cls.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {cls.room}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '6px' }}>
                    {cls.resourceCount} Resources
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Timetable & Latest Announcements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Today's Schedule Card */}
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  Today's Lessons (Wednesday)
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Day-student timetable schedule
                </span>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                Full Week &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayLessons.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  No lessons scheduled for this day group.
                </div>
              ) : (
                todayLessons.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: idx === 0 ? 'var(--accent-blue-soft)' : 'var(--bg-card-subtle)',
                      border: `1px solid ${idx === 0 ? 'var(--accent-blue-border)' : 'var(--border-light)'}`
                    }}
                  >
                    <div style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      backgroundColor: idx === 0 ? 'var(--accent-blue)' : '#E2E8F0',
                      color: idx === 0 ? '#FFFFFF' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.time}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                        {item.subject}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                        {item.room} • {item.teacher}
                      </div>
                    </div>

                    {idx === 0 && (
                      <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                        NEXT UP
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Announcements Feed Card */}
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  Latest Announcements
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  School &amp; class communications
                </span>
              </div>
              <button
                onClick={() => onNavigate('announcements')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                Feed &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {announcements.slice(0, 3).map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => onOpenAnnouncementModal(ann)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: !ann.isRead ? '#F0FDF4' : 'var(--bg-card-subtle)',
                    border: `1px solid ${!ann.isRead ? 'var(--color-success-border)' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    transition: 'all 120ms ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = !ann.isRead ? 'var(--color-success-border)' : 'var(--border-light)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className={`badge ${ann.category === 'Class Update' ? 'badge-blue' : ann.category === 'Event' ? 'badge-amber' : 'badge-neutral'}`}>
                      {ann.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {ann.date}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)', marginBottom: '4px' }}>
                    {ann.title}
                  </div>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0
                  }}>
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
