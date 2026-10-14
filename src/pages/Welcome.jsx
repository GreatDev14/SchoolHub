import React from 'react';
import { BookOpen, ArrowRight, Sparkles, Calendar, CheckCircle2, FolderArchive, GraduationCap } from 'lucide-react';
export const Welcome = ({ onExploreDemo, onGoToSignIn, onSelectRoleAndEnter }) => {
    return (<div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <header style={{
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: '#FFFFFF'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-navy)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(23, 36, 58, 0.25)'
        }}>
            <BookOpen size={22} color="#FFFFFF" strokeWidth={2.4}/>
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
              School Hub
            </span>
            <span style={{
            marginLeft: '8px',
            fontSize: '0.72rem',
            backgroundColor: 'var(--accent-blue-soft)',
            color: 'var(--accent-blue)',
            padding: '2px 8px',
            borderRadius: '999px',
            fontWeight: 700
        }}>
              PILOT PREVIEW
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onGoToSignIn} className="btn btn-secondary btn-sm">
            Sign In Demo
          </button>
          <button onClick={onExploreDemo} className="btn btn-primary btn-sm">
            Explore Prototype &rarr;
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '56px 24px', width: '100%' }}>
        {/* Pilot Tag */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: 'var(--accent-blue-soft)',
            border: '1px solid var(--accent-blue-border)',
            color: 'var(--accent-blue)',
            fontSize: '0.82rem',
            fontWeight: 700
        }}>
            <Sparkles size={14}/> Initial Day-Student Pilot • SS1 Dynamo &amp; SS1 Horizon
          </div>
        </div>

        {/* Headlines */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '18px'
        }}>
            Your school, <span style={{ color: 'var(--accent-blue)' }}>connected.</span>
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            fontWeight: 400
        }}>
            A simpler, central place to learn, share classwork, track lesson timetables, and stay up to date. Designed from the ground up for clean, distraction-free secondary education.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '54px',
            flexWrap: 'wrap'
        }}>
          <button onClick={onExploreDemo} className="btn btn-primary btn-lg">
            <span>Explore the demo</span>
            <ArrowRight size={18}/>
          </button>

          <button onClick={onGoToSignIn} className="btn btn-secondary btn-lg">
            <span>Sign in demo</span>
          </button>
        </div>

        {/* Instant Role Preview Jumpers */}
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '56px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px'
        }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                Test Sample Personas Directly:
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Select a fictional pilot account to enter the prototype immediately without typing credentials:
              </p>
            </div>
            <span style={{
            fontSize: '0.72rem',
            color: 'var(--color-warning)',
            backgroundColor: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            padding: '3px 10px',
            borderRadius: '999px',
            fontWeight: 600
        }}>
              Zero Password Required
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            <button onClick={() => onSelectRoleAndEnter('student')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            textAlign: 'left',
            transition: 'all 140ms ease'
        }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-blue)';
            e.currentTarget.style.backgroundColor = 'var(--accent-blue-soft)';
        }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
        }}>
              <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#356AE6',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
                AO
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                  Adaeze Okonkwo
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                  Student Persona • SS1 Dynamo
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  View timetable, submit assignments, classwork
                </div>
              </div>
              <ArrowRight size={16} color="var(--accent-blue)"/>
            </button>

            <button onClick={() => onSelectRoleAndEnter('teacher')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            textAlign: 'left',
            transition: 'all 140ms ease'
        }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0D9488';
            e.currentTarget.style.backgroundColor = '#F0FDFA';
        }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
        }}>
              <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#0D9488',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
                BA
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                  Mr. Babatunde Alabi
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0D9488', fontWeight: 600 }}>
                  Teacher Persona • Math &amp; Physics
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Create assignments, post notices, view submissions
                </div>
              </div>
              <ArrowRight size={16} color="#0D9488"/>
            </button>

            <button onClick={() => onSelectRoleAndEnter('admin')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            textAlign: 'left',
            transition: 'all 140ms ease'
        }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#7C3AED';
            e.currentTarget.style.backgroundColor = '#F5F3FF';
        }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
        }}>
              <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
                CN
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                  Mrs. Clara Nnamdi
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
                  Admin Persona • Pilot Coordinator
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Monitor pilot classes, view user rosters, audits
                </div>
              </div>
              <ArrowRight size={16} color="#7C3AED"/>
            </button>
          </div>
        </div>

        {/* Feature Preview Grid */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '56px'
        }}>
          <div className="card">
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'var(--accent-blue-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
        }}>
              <GraduationCap size={20} color="var(--accent-blue)"/>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
              My Classes &amp; Notes
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Dedicated class hubs for SS1 Dynamo and SS1 Horizon subjects with classwork, resources, and moderated discussion.
            </p>
          </div>

          <div className="card">
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-warning-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
        }}>
              <CheckCircle2 size={20} color="var(--color-warning)"/>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Tracked Assignments
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Clear due date reminders, downloadable instructions, and simulated digital submissions with local state confirmation.
            </p>
          </div>

          <div className="card">
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-success-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
        }}>
              <Calendar size={20} color="var(--color-success)"/>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Day-Student Timetable
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              A clean Monday-to-Friday schedule tailored for day students, with room assignments and subject teachers clearly displayed.
            </p>
          </div>

          <div className="card">
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: '#F5F3FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
        }}>
              <FolderArchive size={20} color="#7C3AED"/>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Learning Centre
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Central repository for revision notes, worksheets, specimen past papers, and video guides without cluttered ads.
            </p>
          </div>
        </div>

        {/* Discreet Pilot Disclaimer Footer */}
        <div style={{
            textAlign: 'center',
            padding: '24px',
            borderTop: '1px solid var(--border-light)',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            lineHeight: 1.6
        }}>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Prototype Preview — Sample Information Only
          </p>
          <p>
            This visual mockup is built to evaluate the School Hub user experience for SS1 Dynamo and SS1 Horizon.
            No official school endorsement, real student credentials, or live database storage is represented.
          </p>
        </div>
      </main>
    </div>);
};
