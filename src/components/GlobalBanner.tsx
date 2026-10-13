import React from 'react';
import { UserRole } from '../types';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface GlobalBannerProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  onResetDemo: () => void;
}

export const GlobalBanner: React.FC<GlobalBannerProps> = ({
  currentRole,
  onSwitchRole,
  onResetDemo
}) => {
  return (
    <div style={{
      backgroundColor: '#17243A',
      color: '#FFFFFF',
      padding: '7px 16px',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: 'rgba(53, 106, 230, 0.35)',
          color: '#93B5FD',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.04em'
        }}>
          <Sparkles size={12} /> PROTOTYPE
        </span>
        <span style={{ color: '#E2E8F0', fontWeight: 500 }}>
          School Hub Pilot Mockup • Fictional Sample Data (SS1 Dynamo &amp; SS1 Horizon)
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Role Mode:</span>
        <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '2px' }}>
          {(['student', 'teacher', 'admin'] as UserRole[]).map((r) => {
            const isActive = currentRole === r;
            const labels = { student: 'Student', teacher: 'Teacher', admin: 'Admin' };
            return (
              <button
                key={r}
                onClick={() => onSwitchRole(r)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#356AE6' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  transition: 'all 120ms ease'
                }}
              >
                {labels[r]}
              </button>
            );
          })}
        </div>

        <button
          onClick={onResetDemo}
          title="Reset sample data"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#94A3B8',
            fontSize: '0.75rem',
            padding: '3px 8px',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <RefreshCw size={12} /> Reset Data
        </button>
      </div>
    </div>
  );
};
