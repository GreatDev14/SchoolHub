import React, { useState } from 'react';
import { X, PlusCircle, CheckSquare, Sparkles } from 'lucide-react';
import { Assignment, PilotClassGroup } from '../types';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  onCreate: (newAssignment: Partial<Assignment>) => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  teacherName,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [classGroup, setClassGroup] = useState<PilotClassGroup>('SS1 Dynamo');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [dueTime, setDueTime] = useState('11:59 PM');
  const [points, setPoints] = useState(25);
  const [instructions, setInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter an assignment title.');
      return;
    }
    if (!instructions.trim()) {
      setErrorMsg('Please provide instructions for the students.');
      return;
    }

    onCreate({
      title: title.trim(),
      subject,
      classGroup,
      dueDate,
      dueTime,
      points,
      instructions: instructions.trim(),
      teacherName,
      status: 'not_started',
      attachmentName: 'Exercise_Handout_Sample.pdf',
      attachmentSize: '420 KB'
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
            <span className="badge badge-blue">Teacher Workspace</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
              Create New Demo Assignment
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
            <label className="form-label">Assignment Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Quadratic Inequalities Problem Set 2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English Language">English Language</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Class Stream</label>
              <select
                className="form-select"
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value as PilotClassGroup)}
              >
                <option value="SS1 Dynamo">SS1 Dynamo</option>
                <option value="SS1 Horizon">SS1 Horizon</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Points / Weight</label>
              <input
                type="number"
                className="form-input"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                min={5}
                max={100}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Task Instructions &amp; Question Details</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Describe what students need to solve, write, or submit..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
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
            💡 <strong>Demo Simulation:</strong> This assignment will be added to the prototype's active memory and visible across student dashboards and assignment lists immediately.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Publish Demo Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
