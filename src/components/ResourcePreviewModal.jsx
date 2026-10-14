import React from 'react';
import { X, Download, FileText, Sparkles } from 'lucide-react';
export const ResourcePreviewModal = ({ resource, onClose }) => {
    if (!resource)
        return null;
    return (<div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-blue">{resource.category}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
              {resource.subject} • {resource.classGroup}
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20}/>
          </button>
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '8px' }}>
          {resource.title}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          {resource.description}
        </p>

        {/* Simulated Document Viewer Frame */}
        <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '24px',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', marginBottom: '12px' }}>
              <FileText size={20}/>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Document Preview Frame • {resource.type}</span>
            </div>
            <div style={{
            backgroundColor: '#FFFFFF',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            lineHeight: 1.6
        }}>
              <p style={{ fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '6px' }}>
                Summary Overview: {resource.title}
              </p>
              <p style={{ marginBottom: '8px' }}>
                This educational resource contains curated study guidance, sample questions, and step-by-step methodologies prepared specifically for SS1 students participating in the term pilot.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Format: {resource.type} • File size: {resource.fileSize} • Last revised on: {resource.updatedDate}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '14px' }}>
            <Sparkles size={13} color="var(--accent-blue)"/>
            <span>Prototype reader view simulated. Official textbooks and notes remain school property.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Size: {resource.fileSize}
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => alert(`[Prototype Notice] In this front-end demo, downloading "${resource.title}" is simulated.`)} className="btn btn-secondary btn-sm">
              <Download size={14}/>
              <span>Download File</span>
            </button>
            <button onClick={onClose} className="btn btn-primary btn-sm">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>);
};
