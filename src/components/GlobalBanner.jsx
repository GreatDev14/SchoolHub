import React from 'react';
import { RotateCcw } from 'lucide-react';

export const GlobalBanner = ({ currentRole, onSwitchRole, onResetDemo }) => {
  return (
    <div style={{
      backgroundColor: 'var(--primary-navy)',
      color: '#FFFFFF',
      padding: '8px 20px',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          color: '#E2E8F0',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.7rem',
          letterSpacing: '0.05em'
        }}>
          SCHOOL ENVIRONMENT
        </span>
        <span style={{ color: '#CBD5E1', fontSize: '0.78rem' }}>
          School-wide classes • Primary &amp; Secondary
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#94A3B8', fontSize: '0.76rem' }}>Active Persona:</span>
        <div style={{
          display: 'inline-flex',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-sm)',
          padding: '2px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {['student', 'teacher', 'admin'].map((r) => {
            const isActive = currentRole === r;
            const labels = { student: 'Student (Ada)', teacher: 'Teacher (Alabi)', admin: 'Admin (Nnamdi)' };
            return (
              <button
                key={r}
                type="button"
                onClick={() => onSwitchRole(r)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  transition: 'background-color 120ms ease, color 120ms ease'
                }}
              >
                {labels[r]}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onResetDemo}
          title="Reset demonstration data to defaults"
          className="btn btn-ghost btn-sm"
          style={{
            color: '#94A3B8',
            fontSize: '0.75rem',
            padding: '4px 8px',
            minHeight: '28px',
            gap: '6px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <RotateCcw size={13} />
          <span>Reset State</span>
        </button>
      </div>
    </div>
  );
};
