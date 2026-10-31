import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, ArrowRight, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
export const DemoSignIn = ({ onSignInSuccess, onBackToWelcome }) => {
    const [selectedRole, setSelectedRole] = useState('student');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState('signin');
    const [fullName, setFullName] = useState('');
    const [schoolCode, setSchoolCode] = useState('SHS-IUS-2026');
    const [classCode, setClassCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const roleCredentials = {
        student: {
            id: 'ada.okonkwo@demo.schoolhub.local',
            name: 'Adaeze (Ada) Okonkwo',
            title: 'Day Student • SS1 Dynamo'
        },
        teacher: {
            id: 'b.alabi@demo.schoolhub.local',
            name: 'Mr. Babatunde Alabi',
            title: 'Teacher • Mathematics & Physics'
        },
        admin: {
            id: 'c.nnamdi@demo.schoolhub.local',
            name: 'Mrs. Clara Nnamdi',
            title: 'Pilot Coordinator & Admin'
        }
    };
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setPassword('');
        setErrorMsg('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!identifier.trim()) {
            setErrorMsg('Please provide your email address.');
            return;
        }
        if (!password.trim()) {
            setErrorMsg('Please enter your password.');
            return;
        }
        if (mode === 'signup') {
            if (!fullName.trim()) {
                setErrorMsg('Please enter your full name.');
                return;
            }
            if (!schoolCode.trim()) {
                setErrorMsg('Please enter your school code.');
                return;
            }
            if (selectedRole === 'student' && !classCode.trim()) {
                setErrorMsg('Please enter your class code.');
                return;
            }
            const { error } = await supabase.auth.signUp({
                email: identifier.trim(),
                password,
                options: {
                    data: {
                        full_name: fullName.trim(),
                        school_code: schoolCode.trim().toUpperCase(),
                        class_code: classCode.trim().toUpperCase(),
                        requested_role: selectedRole === 'teacher' ? 'teacher' : 'student'
                    }
                }
            });
            if (error) {
                setErrorMsg(error.message);
            } else {
                setErrorMsg(selectedRole === 'teacher'
                    ? 'Account created. Your teacher access is pending administrator approval.'
                    : 'Account created. Check your email if confirmation is required, then sign in.');
                setMode('signin');
            }
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: identifier.trim(),
            password
        });
        if (error) {
            setErrorMsg(error.message);
            return;
        }
        onSignInSuccess(selectedRole);
    };

    const handlePasswordReset = async () => {
        if (!identifier.includes('@')) {
            setErrorMsg('Enter your email address before requesting a password reset.');
            return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(identifier.trim(), {
            redirectTo: `${window.location.origin}/reset-password`
        });
        setErrorMsg(error ? error.message : 'Password reset email sent. Check your inbox.');
    };
    return (<div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-page)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
        }}>
      {/* Return button */}
      <div style={{ width: '100%', maxWidth: '440px', marginBottom: '16px' }}>
        <button onClick={onBackToWelcome} style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        }}>
          &larr; Back to Welcome Page
        </button>
      </div>

      <div style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            padding: '32px 28px'
        }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-navy)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(23, 36, 58, 0.25)'
        }}>
            <BookOpen size={24} color="#FFFFFF" strokeWidth={2.4}/>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
            Sign In to School Hub
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Prototype access for SS1 Dynamo &amp; SS1 Horizon
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '16px' }}>
          <button type="button" onClick={() => { setMode('signin'); setErrorMsg(''); }} className="btn btn-sm" style={{ background: mode === 'signin' ? 'var(--primary-navy)' : 'var(--bg-card-subtle)', color: mode === 'signin' ? '#fff' : 'var(--text-secondary)' }}>Sign In</button>
          <button type="button" onClick={() => { setMode('signup'); setErrorMsg(''); }} className="btn btn-sm" style={{ background: mode === 'signup' ? 'var(--primary-navy)' : 'var(--bg-card-subtle)', color: mode === 'signup' ? '#fff' : 'var(--text-secondary)' }}>Create Account</button>
        </div>

        {/* Account type */}
        <div style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            ACCOUNT TYPE:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mode === 'signup' ? 'repeat(2, 1fr)' : '1fr',
            gap: '6px',
            backgroundColor: 'var(--bg-card-subtle)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
        }}>
            {(mode === 'signup' ? ['student', 'teacher'] : ['student']).map((role) => {
            const isSelected = selectedRole === role;
            const labels = { student: 'Student', teacher: 'Teacher' };
            return (<button key={role} type="button" onClick={() => handleRoleSelect(role)} style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    color: isSelected ? 'var(--primary-navy)' : 'var(--text-secondary)',
                    boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                    border: isSelected ? '1px solid var(--border-light)' : '1px solid transparent',
                    transition: 'all 120ms ease'
                }}>
                  {labels[role]}
                </button>);
        })}
          </div>

          <div style={{
            marginTop: '8px',
            padding: '8px 12px',
            backgroundColor: 'var(--accent-blue-soft)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <span>{mode === 'signup' ? 'Creating' : 'Signing in as'}: <strong>{selectedRole === 'teacher' ? 'Teacher' : 'Student'}</strong></span>
            <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>Verified account</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {errorMsg && (<div style={{
                padding: '10px 14px',
                backgroundColor: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-danger)',
                fontSize: '0.82rem',
                marginBottom: '16px'
            }}>
              {errorMsg}
            </div>)}

          {mode === 'signup' && (<>
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" /></div>
            <div className="form-group"><label className="form-label">School Code</label><input className="form-input" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value.toUpperCase())} placeholder="SHS-IUS-2026" /></div>
            {selectedRole === 'student' && <div className="form-group"><label className="form-label">Class Code</label><input className="form-input" value={classCode} onChange={(e) => setClassCode(e.target.value.toUpperCase())} placeholder="e.g. IUS-SS1-DYN-2026" /></div>}
          </>)}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@school.edu"/>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={handlePasswordReset} style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>Forgot password?</button>
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                {showPassword ? <EyeOff size={13}/> : <Eye size={13}/>}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
              </div>
            </div>
            <input type={showPassword ? 'text' : 'password'} className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            <span>Sign In Securely</span>
            <ArrowRight size={16}/>
          </button>
        </form>

        {/* Prototype Disclaimer */}
        <div style={{
            marginTop: '24px',
            padding: '12px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            display: 'flex',
            gap: '8px'
        }}>
          <ShieldAlert size={16} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }}/>
          <div>
            <strong>Secure account access:</strong> Your school, class, and dashboard permissions are verified by School Hub’s authenticated backend.
          </div>
        </div>
      </div>
    </div>);
};
