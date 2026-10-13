import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  Sparkles, 
  Play, 
  Pause, 
  CheckCircle2, 
  FileText, 
  UploadCloud 
} from 'lucide-react';
import { AudioPodcastEpisode } from '../../types';

interface NotesToAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (episode: Omit<AudioPodcastEpisode, 'id'>) => void;
  defaultTeacherName?: string;
}

export const NotesToAudioModal: React.FC<NotesToAudioModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  defaultTeacherName = 'Mr. Babatunde Alabi'
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('');
  const [classGroup, setClassGroup] = useState('SS1 Dynamo');
  const [notesText, setNotesText] = useState('');
  const [voicePersona, setVoicePersona] = useState('Mr. Alabi - Clear Academic');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [generatedReady, setGeneratedReady] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  if (!isOpen) return null;

  const wordCount = notesText.trim() ? notesText.trim().split(/\s+/).length : 0;
  const estimatedMinutes = Math.max(2, Math.round(wordCount / 120));

  const handleStartGeneration = () => {
    if (!notesText.trim() || !title.trim()) return;
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
      setTimeout(() => {
        setGenerationStep(3);
        setTimeout(() => {
          setIsGenerating(false);
          setGeneratedReady(true);
        }, 800);
      }, 900);
    }, 900);
  };

  const handlePublishClick = () => {
    onPublish({
      title: title.trim(),
      seriesTitle: `${subject} Audio Quick Notes`,
      subject,
      topic: topic.trim() || title.trim(),
      speakerTeacher: defaultTeacherName,
      classGroup,
      durationMinutes: estimatedMinutes,
      releaseDate: 'Today',
      description: `Audio synthesis generated from teacher lesson notes: ${notesText.substring(0, 140)}...`,
      transcript: notesText.trim(),
      isBookmarked: false,
      isCompleted: false,
      lastPositionSeconds: 0
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container max-w-3xl"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 22px',
          backgroundColor: '#312E81',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#A5B4FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mic size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-purple" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', border: 'none' }}>
                  Teacher Audio Studio
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                  Simulated TTS Pipeline
                </span>
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: '#FFFFFF' }}>
                Convert Lesson Notes to Educational Audio
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#C7D2FE' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', maxHeight: '72vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!generatedReady ? (
            <>
              {/* Row 1: Selects */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label className="form-label">Subject *</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} className="form-select">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="English Language">English Language</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Class Group *</label>
                  <select value={classGroup} onChange={e => setClassGroup(e.target.value)} className="form-select">
                    <option value="SS1 Dynamo">SS1 Dynamo</option>
                    <option value="SS1 Horizon">SS1 Horizon</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Voice Synthesizer Persona</label>
                  <select value={voicePersona} onChange={e => setVoicePersona(e.target.value)} className="form-select">
                    <option value="Mr. Alabi - Clear Academic">Mr. Alabi (Clear Academic)</option>
                    <option value="Mrs. Adewale - Narrative & Rhetoric">Mrs. Adewale (Warm Eloquent)</option>
                    <option value="Dr. Ibe - Science Analytical">Dr. Ibe (Science Analytical)</option>
                    <option value="Standard Studio Narrator">Standard Studio Narrator</option>
                  </select>
                </div>
              </div>

              {/* Title & Topic */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label className="form-label">Episode Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Master Note: Solving Conjugate Radicals"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Topic / Sub-Unit Tag</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. Surds & Quadratic Equations"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Notes Input */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Paste Teacher Lesson Notes or Lecture Script *
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {wordCount} words • ~{estimatedMinutes} min audio
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={notesText}
                  onChange={e => setNotesText(e.target.value)}
                  placeholder={`Paste your lesson notes outline here. Example:
"Welcome students. When multiplying surds by their conjugates, observe that (a + √b)(a - √b) simplifies cleanly into a² - b. This eliminates the radical entirely from denominators..."`}
                  className="form-textarea"
                />
              </div>

              {/* Generation Progress Indicator */}
              {isGenerating && (
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-blue-soft)',
                  border: '1px solid var(--accent-blue-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                    <span>Synthesizing Educational Audio...</span>
                    <span>Step {generationStep} of 3</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#D3E0FB', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(generationStep / 3) * 100}%`, height: '100%', backgroundColor: 'var(--accent-blue)', transition: 'width 400ms ease' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>
                    {generationStep === 1 && 'Extracting key pedagogical concepts and emphasis markers...'}
                    {generationStep === 2 && `Applying voice model "${voicePersona}" at natural cadence...`}
                    {generationStep === 3 && 'Generating synchronized transcript and markers...'}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Ready preview */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={24} color="var(--color-success)" />
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-success)' }}>
                      Audio Synthesis Complete!
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#14532D' }}>
                      {title} • {estimatedMinutes} minutes • Ready for review &amp; publishing
                    </p>
                  </div>
                </div>
                <button onClick={() => setGeneratedReady(false)} className="btn btn-secondary btn-sm">
                  Edit Script
                </button>
              </div>

              {/* In-modal player preview */}
              <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>{title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{subject} • {defaultTeacherName} • Voice: {voicePersona}</div>
                  </div>
                  <button
                    onClick={() => setIsPreviewPlaying(!isPreviewPlaying)}
                    className="btn btn-primary"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
                  >
                    {isPreviewPlaying ? <Pause size={18} style={{ fill: '#FFFFFF' }} /> : <Play size={18} style={{ fill: '#FFFFFF', marginLeft: '2px' }} />}
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Synchronized Episode Transcript:
                </h5>
                <div style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  maxHeight: '160px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-line'
                }}>
                  {notesText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 22px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Sparkles size={14} color="#D97706" />
            <span>Simulated TTS Engine • Local demonstration without cloud API costs</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            {!generatedReady ? (
              <button
                onClick={handleStartGeneration}
                disabled={isGenerating || !notesText.trim() || !title.trim()}
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: '#4F46E5', borderColor: '#4F46E5', fontWeight: 800 }}
              >
                <Sparkles size={14} />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate Audio'}</span>
              </button>
            ) : (
              <button
                onClick={handlePublishClick}
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: '#16845B', borderColor: '#16845B', fontWeight: 800 }}
              >
                <UploadCloud size={14} />
                <span>Publish to Learning Centre</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
