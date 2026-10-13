import React, { useState } from 'react';
import { X, Bell, Sparkles } from 'lucide-react';
import { Announcement, AnnouncementCategory, PilotClassGroup } from '../types';

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorName: string;
  authorRole: 'Teacher' | 'School Admin';
  onCreate: (newAnnouncement: Partial<Announcement>) => void;
}

export const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({
  isOpen,
  onClose,
  authorName,
  authorRole,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AnnouncementCategory>('Class Update');
  const [classGroup, setClassGroup] = useState<string>('SS1 Dynamo');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter an announcement headline.');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please enter the announcement notice text.');
      return;
    }

    onCreate({
      title: title.trim(),
      category,
      classGroup: classGroup === 'All Classes' ? undefined : classGroup,
      content: content.trim(),
      authorName,
      authorRole,
      date: 'Just now',
      isRead: false
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <span className="badge badge-blue">{authorRole} Workspace</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
              Broadcast School / Class Notice
            </h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Notice Headline</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Practical Lab Preparations for Physics Trial"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Notice Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
              >
                <option value="Class Update">Class Update</option>
                <option value="General Notice">General Notice</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Target Audience / Stream</label>
              <select
                className="form-select"
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
              >
                <option value="SS1 Dynamo">SS1 Dynamo Only</option>
                <option value="SS1 Horizon">SS1 Horizon Only</option>
                <option value="All Classes">All Pilot Students (Combined)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Notice Details &amp; Message Body</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Write the communication for students..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div style={{
            padding: '10px 14px',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #E2E8F0',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            📢 <strong>Demonstration Broadcast:</strong> Notice will be immediately placed at the top of the announcement stream with an "Unread" indicator.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
