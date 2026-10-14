import React, { useState } from 'react';
import { X, KeyRound, AlertCircle } from 'lucide-react';
export const JoinClassModal = ({ isOpen, onClose, availableCodes, onJoinSuccess }) => {
    const [inputCode, setInputCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        const clean = inputCode.trim().toUpperCase();
        if (!clean) {
            setErrorMsg('Please enter a class invitation code.');
            return;
        }
        const matched = availableCodes.find(c => c.code.toUpperCase() === clean);
        if (!matched) {
            setErrorMsg(`Code "${clean}" is invalid or unrecognised. Try sample code "DYN-2026-MTH" or "HRZ-2026-BIO".`);
            return;
        }
        if (matched.status === 'Revoked' || matched.status === 'Expired') {
            setErrorMsg(`This invitation code is ${matched.status.toLowerCase()} and cannot be used.`);
            return;
        }
        onJoinSuccess(matched.classGroup, matched.code);
        setInputCode('');
        setErrorMsg('');
        onClose();
    };
    return (<div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--accent-blue-soft)',
            color: 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
              <KeyRound size={20}/>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Join Class with Code
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                School-issued enrollment for SS1 Dynamo &amp; SS1 Horizon
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20}/>
          </button>
        </div>

        {errorMsg && (<div style={{
                padding: '10px 14px',
                backgroundColor: 'var(--color-danger-bg)',
                color: 'var(--color-danger)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
            <AlertCircle size={16}/>
            <span>{errorMsg}</span>
          </div>)}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Invitation Code</label>
            <input type="text" className="form-input" placeholder="e.g. DYN-2026-MTH or HRZ-2026-BIO" value={inputCode} onChange={(e) => {
            setInputCode(e.target.value);
            setErrorMsg('');
        }} style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}/>
            <span className="form-hint">
              Enter the 10-character code provided by your class teacher or pilot coordinator.
            </span>
          </div>

          {/* Sample Code Helper Pills */}
          <div style={{
            padding: '12px 14px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            fontSize: '0.78rem'
        }}>
            <span style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>Sample Codes to Test:</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => setInputCode('DYN-2026-MTH')} style={{
            padding: '3px 8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: 'var(--accent-blue)',
            fontWeight: 700
        }}>
                DYN-2026-MTH (SS1 Dynamo)
              </button>
              <button type="button" onClick={() => setInputCode('HRZ-2026-BIO')} style={{
            padding: '3px 8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: 'var(--color-success)',
            fontWeight: 700
        }}>
                HRZ-2026-BIO (SS1 Horizon)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Confirm &amp; Join Class
            </button>
          </div>
        </form>
      </div>
    </div>);
};
