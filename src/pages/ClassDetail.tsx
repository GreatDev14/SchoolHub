import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  CheckSquare,
  FolderArchive,
  MessageSquare,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Download,
  Send
} from 'lucide-react';
import {
  ClassSubject,
  Assignment,
  LearningResource,
  Announcement,
  DiscussionTopic
} from '../types';

interface ClassDetailProps {
  cls: ClassSubject;
  assignments: Assignment[];
  resources: LearningResource[];
  announcements: Announcement[];
  discussions: DiscussionTopic[];
  onBack: () => void;
  onOpenAssignment: (assignmentId: string) => void;
  onOpenResourcePreview: (resource: LearningResource) => void;
}

export const ClassDetail: React.FC<ClassDetailProps> = ({
  cls,
  assignments,
  resources,
  announcements,
  discussions,
  onBack,
  onOpenAssignment,
  onOpenResourcePreview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'classwork' | 'resources' | 'discussion'>('overview');

  const classAssignments = assignments.filter(a => a.subject.toLowerCase() === cls.name.toLowerCase());
  const classResources = resources.filter(r => r.subject.toLowerCase() === cls.name.toLowerCase());
  const classAnnouncements = announcements.filter(a => a.classGroup === cls.classGroup || !a.classGroup);
  const classDiscussions = discussions.filter(d => d.subject.toLowerCase() === cls.name.toLowerCase() || d.classGroup === cls.classGroup);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={16} />
          <span>Back to All Classes</span>
        </button>
      </div>

      {/* Class Banner Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        borderTop: `6px solid ${cls.colorAccent}`,
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)'
              }}>
                {cls.code}
              </span>
              <span className={`badge ${cls.classGroup === 'SS1 Dynamo' ? 'badge-blue' : 'badge-green'}`}>
                {cls.classGroup}
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
              {cls.name}
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '680px' }}>
              {cls.description}
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card-subtle)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            minWidth: '240px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Class Schedule &amp; Venue
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-navy)', marginTop: '4px' }}>
              {cls.schedule}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              📍 {cls.room}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              👨‍🏫 {cls.teacherName}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '24px',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '16px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'classwork', label: `Classwork (${classAssignments.length})`, icon: CheckSquare },
            { id: 'resources', label: `Resources (${classResources.length})`, icon: FolderArchive },
            { id: 'discussion', label: `Discussions (${classDiscussions.length})`, icon: MessageSquare }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--accent-blue-soft)' : 'transparent',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-blue-border)' : '1px solid transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Recent Class Notices */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '12px' }}>
              Class Announcements
            </h3>
            {classAnnouncements.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No announcements for this subject.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {classAnnouncements.map(ann => (
                  <div
                    key={ann.id}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-navy)' }}>
                      {ann.title}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                      {ann.content}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      {ann.authorName} • {ann.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Homework Card */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '12px' }}>
              Pending Tasks
            </h3>
            {classAssignments.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No pending assignments for this class.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {classAssignments.map(asg => (
                  <div
                    key={asg.id}
                    onClick={() => onOpenAssignment(asg.id)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                        {asg.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-warning)', fontWeight: 600 }}>
                        Due {asg.dueDate}
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--accent-blue)" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'classwork' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
              Assigned Classwork &amp; Projects
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {classAssignments.length} total tasks
            </span>
          </div>

          {classAssignments.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <CheckSquare size={36} color="var(--text-muted)" style={{ margin: '0 auto 8px auto' }} />
              <p style={{ fontWeight: 600 }}>No assignments posted for this class yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {classAssignments.map(asg => (
                <div
                  key={asg.id}
                  onClick={() => onOpenAssignment(asg.id)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                      {asg.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Instructions: {asg.instructions.slice(0, 90)}...
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Due Date: <strong>{asg.dueDate} ({asg.dueTime})</strong> • Worth {asg.points} points
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className={`badge ${asg.status === 'submitted' ? 'badge-green' : 'badge-amber'}`}>
                      {asg.status === 'submitted' ? 'Submitted' : 'In Progress'}
                    </span>
                    <button className="btn btn-secondary btn-sm">
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
              Lesson Handouts &amp; Revision Resources
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {classResources.length} files available
            </span>
          </div>

          {classResources.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <FolderArchive size={36} color="var(--text-muted)" style={{ margin: '0 auto 8px auto' }} />
              <p style={{ fontWeight: 600 }}>No downloadable materials uploaded yet for this subject.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {classResources.map(res => (
                <div
                  key={res.id}
                  onClick={() => onOpenResourcePreview(res)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-blue">{res.category}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{res.fileSize}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                      {res.title}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                      {res.description}
                    </p>
                  </div>
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 600
                  }}>
                    <span>Preview Note</span>
                    <Download size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'discussion' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                Moderated Class Discussions
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Ask homework questions and share study notes directly with classmates and the instructor.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {classDiscussions.map(topic => (
              <div
                key={topic.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                  {topic.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Started by {topic.authorName} ({topic.authorRole}) • {topic.date}
                </div>

                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {topic.replies.map(rep => (
                    <div
                      key={rep.id}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '6px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.8rem'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '2px' }}>
                        {rep.authorName} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({rep.authorRole})</span>
                      </div>
                      <div style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>
                        {rep.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
