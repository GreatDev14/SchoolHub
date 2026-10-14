import React, { useState } from 'react';
import { RefreshCw, LogOut, ShieldAlert, CheckCircle2 } from 'lucide-react';
export const ProfileSettings = ({ userProfile, onUpdateProfile, onSwitchRole, onResetData, onSignOut }) => {
    const [displayName, setDisplayName] = useState(userProfile.name);
    const [isSaved, setIsSaved] = useState(false);
    // Demo toggles
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [assignmentReminders, setAssignmentReminders] = useState(true);
    const [discussionNotifs, setDiscussionNotifs] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!displayName.trim())
            return;
        onUpdateProfile({
            name: displayName.trim(),
            avatarInitials: displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };
    return (<div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
          Profile &amp; Application Settings
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Configure your local demonstration preferences and preview account details.
        </p>
      </div>

      {isSaved && (<div style={{
                padding: '12px 18px',
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-success-border)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.85rem'
            }}>
          <CheckCircle2 size={18}/>
          <span>Display name updated in local demo state!</span>
        </div>)}

      {/* Account Profile Card */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '16px' }}>
          User Information (Demo State)
        </h3>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            backgroundColor: 'var(--accent-blue)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
              {userProfile.avatarInitials}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary-navy)' }}>
                {userProfile.name}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {userProfile.email}
              </div>
              <span className="badge badge-blue" style={{ marginTop: '4px', fontSize: '0.7rem' }}>
                {userProfile.roleTitle}
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Editable Display Name</label>
            <input type="text" className="form-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your full name"/>
            <span className="form-hint">
              Changes update your greeting and sidebar name instantly for this browser session.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Display Name
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences (Demo Toggles) */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '16px' }}>
          Notification Demonstrations
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                Assignment Due Date Alerts
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Show banner notifications 24 hours prior to homework deadlines
              </div>
            </div>
            <input type="checkbox" checked={assignmentReminders} onChange={(e) => setAssignmentReminders(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}/>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                Daily Timetable &amp; Schedule Summary
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Morning notification highlighting today's scheduled lesson rooms
              </div>
            </div>
            <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}/>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                Discussion Forum Replies
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Notify when a teacher or classmate responds to your study question
              </div>
            </div>
            <input type="checkbox" checked={discussionNotifs} onChange={(e) => setDiscussionNotifs(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}/>
          </label>
        </div>
      </div>

      {/* Role Switcher & Prototype Reset Actions */}
      <div className="card" style={{ borderColor: 'var(--border-light)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
          Prototype Administration Actions
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          Switch between roles or reset local changes back to the initial sample state:
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => onSwitchRole('student')} className={`btn btn-sm ${userProfile.role === 'student' ? 'btn-primary' : 'btn-secondary'}`}>
            Role: Ada (Student)
          </button>
          <button onClick={() => onSwitchRole('teacher')} className={`btn btn-sm ${userProfile.role === 'teacher' ? 'btn-primary' : 'btn-secondary'}`}>
            Role: Mr. Alabi (Teacher)
          </button>
          <button onClick={() => onSwitchRole('admin')} className={`btn btn-sm ${userProfile.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}>
            Role: Mrs. Nnamdi (Admin)
          </button>
          <button onClick={onResetData} className="btn btn-secondary btn-sm" style={{ color: 'var(--color-warning)' }}>
            <RefreshCw size={14}/>
            <span>Reset Demo Data</span>
          </button>
          <button onClick={onSignOut} className="btn btn-secondary btn-sm" style={{ color: 'var(--color-danger)' }}>
            <LogOut size={14}/>
            <span>Sign Out to Welcome</span>
          </button>
        </div>
      </div>

      {/* Persistent Disclaimer */}
      <div style={{
            padding: '14px',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #E2E8F0',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            display: 'flex',
            gap: '10px'
        }}>
        <ShieldAlert size={18} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }}/>
        <div>
          <strong>Local Mockup Storage:</strong> All profile edits and simulated settings are preserved only within your browser memory for this demonstration. No personal information is transmitted to external servers.
        </div>
      </div>
    </div>);
};
