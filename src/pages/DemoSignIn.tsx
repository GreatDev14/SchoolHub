import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Check
} from 'lucide-react';
import { UserRole } from '../types';

interface DemoSignInProps {
  onSignInSuccess: (role: UserRole) => void;
  onBackToWelcome: () => void;
}

export const DemoSignIn: React.FC<DemoSignInProps> = ({
  onSignInSuccess,
  onBackToWelcome
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('ada.okonkwo@demo.schoolhub.local');
  const [password, setPassword] = useState('demo-pilot-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roleCredentials: Record<UserRole, { id: string; name: string; title: string }> = {
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

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setIdentifier(roleCredentials[role].id);
    setPassword('demo-pilot-2026');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please provide a demo username or email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter a demo password.');
      return;
    }

    // Success in demo prototype
    onSignInSuccess(selectedRole);
  };

  return (
    <div style={{
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
        <button
          onClick={onBackToWelcome}
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
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
            <BookOpen size={24} color="#FFFFFF" strokeWidth={2.4} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
            Sign In to School Hub
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Prototype access for SS1 Dynamo &amp; SS1 Horizon
          </p>
        </div>

        {/* Demo Role Switcher Tabs */}
        <div style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            CHOOSE DEMO PERSONA:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            backgroundColor: 'var(--bg-card-subtle)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}>
            {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => {
              const isSelected = selectedRole === role;
              const labels = { student: 'Student', teacher: 'Teacher', admin: 'Admin' };
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    color: isSelected ? 'var(--primary-navy)' : 'var(--text-secondary)',
                    boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                    border: isSelected ? '1px solid var(--border-light)' : '1px solid transparent',
                    transition: 'all 120ms ease'
                  }}
                >
                  {labels[role]}
                </button>
              );
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
            <span>Active: <strong>{roleCredentials[selectedRole].name}</strong></span>
            <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>({roleCredentials[selectedRole].title.split('•')[0].trim()})</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-danger)',
              fontSize: '0.82rem',
              marginBottom: '16px'
            }}>
              {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email or Demo Username</label>
            <input
              type="text"
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. ada.okonkwo@demo.schoolhub.local"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Demo Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            <span>Enter as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
            <ArrowRight size={16} />
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
          <ShieldAlert size={16} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Demonstration Role Switcher:</strong> This prototype simulates role permissions for preview purposes. No real passwords are collected or sent to any server.
          </div>
        </div>
      </div>
    </div>
  );
};
