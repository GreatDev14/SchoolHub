import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentDetailProps {
  assignment: Assignment;
  onBack: () => void;
  onSubmitAssignment: (assignmentId: string, notes: string) => void;
}

export const AssignmentDetail: React.FC<AssignmentDetailProps> = ({
  assignment,
  onBack,
  onSubmitAssignment
}) => {
  const [submissionText, setSubmissionText] = useState(assignment.submissionNotes || '');
  const [selectedFileMock, setSelectedFileMock] = useState<string | null>(assignment.status === 'submitted' ? 'My_Completed_Solution.pdf' : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(assignment.status === 'submitted');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      onSubmitAssignment(assignment.id, submissionText || 'Work submitted via School Hub demo prototype.');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={16} />
          <span>Back to Assignments</span>
        </button>
      </div>

      {/* Main Assignment Details Card */}
      <div className="card">
        {/* Status header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-blue">{assignment.subject}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {assignment.classGroup}</span>
          </div>

          <span className={`badge ${submittedSuccess ? 'badge-green' : assignment.status === 'past_due' ? 'badge-red' : 'badge-amber'}`}>
            {submittedSuccess ? 'Submitted (Demo Recorded)' : assignment.status === 'past_due' ? 'Past Due' : 'Submission Open'}
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
          {assignment.title}
        </h2>

        {/* Metadata Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Instructor
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginTop: '2px' }}>
              {assignment.teacherName}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Due Date &amp; Time
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-warning)', marginTop: '2px' }}>
              {assignment.dueDate} at {assignment.dueTime}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Maximum Score
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginTop: '2px' }}>
              {assignment.points} Marks
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '8px' }}>
            Task Instructions
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {assignment.instructions}
          </p>
        </div>

        {/* Attached Document / Resource */}
        {assignment.attachmentName && (
          <div style={{
            padding: '14px 18px',
            backgroundColor: 'var(--accent-blue-soft)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--accent-blue-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={22} color="var(--accent-blue)" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                  {assignment.attachmentName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Reference Document • {assignment.attachmentSize || '350 KB'}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`[Prototype Notice] In this demo preview, "${assignment.attachmentName}" is an illustrative reference file.`)}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        )}

        {/* Submission Section */}
        <div style={{
          borderTop: '2px dashed var(--border-light)',
          paddingTop: '24px'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '4px' }}>
            Your Work &amp; Submission
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            Enter your written responses or simulate attaching your solved worksheet file below.
          </p>

          {submittedSuccess ? (
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-success-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-success-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-success)' }}>
                <CheckCircle2 size={24} />
                <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Assignment Successfully Submitted!</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                Your submission has been recorded in the local prototype state.
                {assignment.submittedAt ? ` Recorded on ${assignment.submittedAt}.` : ' Recorded just now.'}
              </p>
              {submissionText && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--color-success-border)'
                }}>
                  <strong>Submitted Notes:</strong> {submissionText}
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  Edit / Re-submit (Demo)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Text answer input */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  Student Comments / Text Solution (Optional)
                </label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Type your workings, algebraic steps, or commentary here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                />
              </div>

              {/* Simulated File Upload Drag Area */}
              <div>
                <label className="form-label">
                  Attach Solution Document / Scanned Page
                </label>
                <div
                  onClick={() => setSelectedFileMock(selectedFileMock ? null : 'Ada_Math_Worksheet_Solution.pdf')}
                  style={{
                    border: '2px dashed var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: selectedFileMock ? 'var(--accent-blue-soft)' : 'var(--bg-card-subtle)',
                    cursor: 'pointer',
                    transition: 'all 120ms ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <Upload size={28} color={selectedFileMock ? 'var(--accent-blue)' : 'var(--text-muted)'} style={{ margin: '0 auto 8px auto' }} />
                  {selectedFileMock ? (
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-blue)' }}>
                        Attached: {selectedFileMock}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Click again to remove or change this mock file
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                        Click to simulate selecting a file from your computer
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Supports PDF, PNG, DOCX (Demo simulation only)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ⚠️ Prototype note: Submissions update local demonstration state only.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ minWidth: '160px' }}
                >
                  {isSubmitting ? 'Recording Demo...' : 'Submit Assignment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
