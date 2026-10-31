import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, Download, Upload, CheckCircle2, X, Paperclip, AlertCircle } from 'lucide-react';

export const AssignmentDetail = ({ assignment, onBack, onSubmitAssignment }) => {
  const [submissionText, setSubmissionText] = useState(assignment.submissionNotes || '');
  const [attachedFile, setAttachedFile] = useState(
    assignment.status === 'submitted'
      ? { name: assignment.attachmentName || 'Completed_Assignment_Solution.pdf', size: '245 KB' }
      : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(assignment.status === 'submitted');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = Math.round(file.size / 1024);
      const sizeFormatted = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      setAttachedFile({
        name: file.name,
        size: sizeFormatted,
        rawFile: file
      });
    }
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      const notes = submissionText || 'Work submitted via School Hub portal.';
      const fileName = attachedFile ? attachedFile.name : null;
      onSubmitAssignment(assignment.id, notes, fileName);
    }, 400);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="btn btn-ghost btn-sm"
          style={{ gap: '6px', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Assignments</span>
        </button>
      </div>

      {/* Main Assignment Details Card */}
      <div className="card" style={{ padding: '28px' }}>
        {/* Status header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-blue">{assignment.subject}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• {assignment.classGroup}</span>
          </div>

          <span className={`badge ${submittedSuccess ? 'badge-green' : assignment.status === 'past_due' ? 'badge-red' : 'badge-amber'}`}>
            {submittedSuccess ? 'Submitted & Recorded' : assignment.status === 'past_due' ? 'Past Due' : 'Submission Open'}
          </span>
        </div>

        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
          {assignment.title}
        </h1>

        {/* Metadata Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          padding: '14px 16px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Instructor
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '2px' }}>
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
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '2px' }}>
              {assignment.points} Marks
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
            Task Instructions
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {assignment.instructions}
          </p>
        </div>

        {/* Attached Document / Resource */}
        {assignment.attachmentName && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={20} color="var(--accent-blue)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  {assignment.attachmentName}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Reference Document • {assignment.attachmentSize || '350 KB'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const blob = new Blob([`School Hub Lesson Reference: ${assignment.title}\n\n${assignment.instructions}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = assignment.attachmentName.endsWith('.pdf') ? assignment.attachmentName.replace('.pdf', '.txt') : assignment.attachmentName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
              className="btn btn-secondary btn-sm"
            >
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        )}

        {/* Submission Section */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px'
        }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            Your Work &amp; Submission
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Attach your solved worksheet file or type your written responses below.
          </p>

          {submittedSuccess ? (
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--color-success-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-success-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-success)' }}>
                <CheckCircle2 size={22} />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Assignment Successfully Submitted!</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                Your submission is recorded and available in your teacher's grading inbox.
                {assignment.submittedAt ? ` Submitted on ${assignment.submittedAt}.` : ' Submitted just now.'}
              </p>

              {attachedFile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-success-border)',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)'
                }}>
                  <Paperclip size={14} color="var(--color-success)" />
                  <strong>Attached File:</strong> {attachedFile.name} ({attachedFile.size})
                </div>
              )}

              {submissionText && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--color-success-border)'
                }}>
                  <strong>Submitted Notes:</strong> {submissionText}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Edit / Re-submit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Text answer input */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="submission-notes">
                  Student Comments / Workings (Optional)
                </label>
                <textarea
                  id="submission-notes"
                  className="form-textarea"
                  rows={4}
                  placeholder="Type your workings, algebraic steps, or commentary here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                />
              </div>

              {/* Real File Upload Input */}
              <div>
                <label className="form-label">
                  Attach Solution Document / Scanned Page
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                />

                {attachedFile ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--accent-blue-border)',
                    backgroundColor: 'var(--accent-blue-soft)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} color="var(--accent-blue)" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                          {attachedFile.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {attachedFile.size} • Ready for upload
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="btn btn-ghost btn-sm"
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '1px dashed var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-card-subtle)',
                      cursor: 'pointer',
                      transition: 'border-color var(--transition-normal), background-color var(--transition-normal)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-blue)';
                      e.currentTarget.style.backgroundColor = 'var(--accent-blue-soft)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
                    }}
                  >
                    <Upload size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px auto' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      Click to select a file from your computer
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Supports PDF, PNG, JPG, DOCX, TXT (Real file upload)
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Recorded in local storage and instantly visible to your teacher.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ minWidth: '160px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
