import React from 'react';
import { X, Calendar, User, Bell } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementModalProps {
  announcement: Announcement | null;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${announcement.category === 'Class Update' ? 'badge-blue' : announcement.category === 'Event' ? 'badge-amber' : 'badge-neutral'}`}>
              {announcement.category}
            </span>
            {announcement.classGroup && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {announcement.classGroup}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{ color: 'var(--text-muted)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '12px' }}>
          {announcement.title}
        </h3>

        <div style={{
          padding: '12px 14px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>Author: <strong>{announcement.authorName}</strong> ({announcement.authorRole})</div>
          <div>Published: <strong>{announcement.date}</strong></div>
        </div>

        <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {announcement.content}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
