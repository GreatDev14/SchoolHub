import React from 'react';
import { AlertTriangle } from 'lucide-react';
export const ConfirmDialog = ({ isOpen, title, message, confirmLabel = 'Confirm Action', cancelLabel = 'Cancel', confirmVariant = 'danger', onConfirm, onCancel }) => {
    if (!isOpen)
        return null;
    return (<div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: confirmVariant === 'danger' ? 'var(--color-danger-bg)' : 'var(--accent-blue-soft)',
            color: confirmVariant === 'danger' ? 'var(--color-danger)' : 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            <AlertTriangle size={20}/>
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
              {title}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '22px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onCancel} className="btn btn-secondary btn-sm">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={`btn btn-sm ${confirmVariant === 'danger' ? 'btn-navy' : 'btn-primary'}`} style={confirmVariant === 'danger' ? { backgroundColor: 'var(--color-danger)', color: '#FFFFFF' } : {}}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>);
};
