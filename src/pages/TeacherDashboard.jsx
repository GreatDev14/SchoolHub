import React from 'react';
import { CheckSquare, Bell, PlusCircle, FileText, ArrowRight, BookOpen, Sparkles, CheckCircle2, Clock } from 'lucide-react';
export const TeacherDashboard = ({ userProfile, classes, assignments, announcements, submissions, confusionSignals = [], onOpenCreateAssignment, onOpenCreateAnnouncement, onOpenNotesToAudio, onNavigate, onToggleReviewSubmission }) => {
    // Teacher's classes
    const myClasses = classes.filter(c => c.teacherName.includes('Alabi') || c.teacherEmail.includes('alabi'));
    return (<div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Teacher Greeting Header */}
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
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)'
        }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#CCFBF1',
            color: '#0F766E',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.74rem',
            fontWeight: 700
        }}>
              <Sparkles size={13}/> Teacher Workspace • SS1 Pilot Stream
            </div>
            <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.74rem',
            fontWeight: 600,
            border: '1px solid #BFDBFE'
        }}>
              <CheckCircle2 size={13}/> Verified Instructor (Approved by Admin)
            </div>
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            letterSpacing: '-0.03em',
            lineHeight: 1.2
        }}>
            Welcome, {userProfile.name} 📚
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Lead Instructor for <strong>Mathematics &amp; Physics</strong> (SS1 Dynamo). You have <strong>{submissions.filter(s => s.status === 'Pending Review').length} submissions</strong> awaiting review.
          </p>
        </div>

        {/* Quick Teacher Actions */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {onOpenNotesToAudio && (<button onClick={onOpenNotesToAudio} className="btn btn-primary btn-sm" style={{ backgroundColor: '#4F46E5', borderColor: '#4F46E5' }}>
              <FileText size={16}/>
              <span>Notes-to-Audio Studio</span>
            </button>)}
          <button onClick={onOpenCreateAssignment} className="btn btn-primary btn-sm">
            <PlusCircle size={16}/>
            <span>Create Assignment</span>
          </button>
          <button onClick={onOpenCreateAnnouncement} className="btn btn-secondary btn-sm">
            <Bell size={16}/>
            <span>Post Notice</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
        }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#E0F2FE',
            color: '#0284C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <BookOpen size={24}/>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Classes Taught</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {myClasses.length} Groups
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>64 Day Students</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-warning-bg)',
            color: 'var(--color-warning)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CheckSquare size={24}/>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Assignments</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {assignments.length} Tasks
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Posted across pilot</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Clock size={24}/>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Submissions</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {submissions.length} Total
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', fontWeight: 600 }}>2 Pending Review</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#F5F3FF',
            color: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Bell size={24}/>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Class Notices</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {announcements.length} Published
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Latest: Revision note</div>
          </div>
        </div>
      </div>

      {/* Main Grid: My Taught Classes & Recent Submissions */}
      <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px'
        }}>
        {/* Left: Classes Managed */}
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-light)'
        }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                Classes Under My Supervision
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Subject spaces where you are assigned as lead teacher
              </p>
            </div>
            <button onClick={() => onNavigate('classes')} style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
              All Classes &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myClasses.map(cls => (<div key={cls.id} onClick={() => onNavigate('class-detail', cls.id)} style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                      {cls.name}
                    </span>
                    <span className="badge badge-blue">{cls.classGroup}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Schedule: {cls.schedule} • {cls.room}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>
                    {cls.studentCount} Students Enrolled • {cls.resourceCount} Files
                  </div>
                </div>

                <ArrowRight size={18} color="var(--accent-blue)"/>
              </div>))}
          </div>
        </div>

        {/* Right: Recent Student Submissions */}
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-light)'
        }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                Recent Student Submissions
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Fictional submission activity from pilot day students
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Demo Feed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {submissions.map(sub => (<div key={sub.id} style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                    {sub.studentName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {sub.assignmentTitle} ({sub.subject})
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Received: {sub.submittedAt}
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${sub.status === 'Reviewed' ? 'badge-green' : 'badge-amber'}`}>
                    {sub.status}
                  </span>
                  {onToggleReviewSubmission && sub.status === 'Pending Review' && (<button onClick={() => onToggleReviewSubmission(sub.id)} className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                      Mark Reviewed
                    </button>)}
                </div>
              </div>))}
          </div>
        </div>
      </div>

      {/* Topic Confusion Signals from Students (Section 32) */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                Topic Confusion Signals (Student Feedback)
              </h3>
              <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                Pedagogical Sensor
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Anonymous signals sent by students when encountering difficulty on particular lesson concepts.
            </p>
          </div>

          <button onClick={() => onNavigate('learning-centre')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
            <span>Open Learning Centre</span>
            <ArrowRight size={14}/>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {(confusionSignals.length > 0 ? confusionSignals : [
            { id: 'conf-1', subject: 'Mathematics', topic: 'Conjugate surd rationalization with multiple radicals', classGroup: 'SS1 Dynamo', confusedCount: 7 },
            { id: 'conf-2', subject: 'Physics', topic: 'Ticker timer dot spacing to velocity conversion', classGroup: 'SS1 Dynamo', confusedCount: 5 },
            { id: 'conf-3', subject: 'Chemistry', topic: 'Electronegativity trend anomalies in Period 3', classGroup: 'SS1 Horizon', confusedCount: 4 }
        ]).map(sig => (<div key={sig.id} style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{sig.subject}</span>
                  <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#DC2626',
                backgroundColor: '#FEE2E2',
                padding: '2px 8px',
                borderRadius: '999px'
            }}>
                    {sig.confusedCount} Students Flagged
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                  {sig.topic}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Class: {sig.classGroup}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {onOpenNotesToAudio && (<button onClick={onOpenNotesToAudio} className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '0.72rem', padding: '6px' }}>
                    Synthesize Audio Note
                  </button>)}
                <button onClick={() => onNavigate('learning-centre')} className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: '0.72rem', padding: '6px' }}>
                  Schedule Live Surgery
                </button>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
