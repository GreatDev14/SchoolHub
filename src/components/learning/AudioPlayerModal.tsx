import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Bookmark, 
  CheckCircle2, 
  Volume2, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { AudioPodcastEpisode } from '../../types';

interface AudioPlayerModalProps {
  episode: AudioPodcastEpisode | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onMarkCompleted: (id: string) => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  episode,
  isOpen,
  onClose,
  onToggleBookmark,
  onMarkCompleted
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(true);

  useEffect(() => {
    if (episode) {
      setCurrentSeconds(episode.lastPositionSeconds || 0);
      setIsPlaying(false);
    }
  }, [episode]);

  // Simulated playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && episode) {
      const totalSeconds = episode.durationMinutes * 60;
      interval = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            onMarkCompleted(episode.id);
            return totalSeconds;
          }
          return Math.min(totalSeconds, prev + playbackSpeed);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, episode]);

  if (!isOpen || !episode) return null;

  const totalSeconds = episode.durationMinutes * 60;
  const progressPercent = Math.min(100, (currentSeconds / totalSeconds) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentSeconds((val / 100) * totalSeconds);
  };

  const skipSeconds = (delta: number) => {
    setCurrentSeconds(prev => Math.max(0, Math.min(totalSeconds, prev + delta)));
  };

  const cycleSpeed = () => {
    if (playbackSpeed === 1.0) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else setPlaybackSpeed(1.0);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container max-w-2xl"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Volume2 size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-blue">{episode.subject}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{episode.classGroup}</span>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Simulated Audio</span>
              </div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                {episode.title}
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Player Core Area */}
        <div style={{ padding: '24px 28px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              backgroundColor: 'var(--accent-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto',
              boxShadow: '0 8px 20px rgba(53, 106, 230, 0.3)'
            }}>
              <Volume2 size={32} />
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
              {episode.speakerTeacher}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {episode.seriesTitle || 'Educational Audio Lesson'}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '16px' }}>
            <input 
              type="range"
              min="0"
              max="100"
              value={progressPercent}
              onChange={handleSeek}
              style={{
                width: '100%',
                accentColor: 'var(--accent-blue)',
                height: '6px',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>{formatTime(currentSeconds)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => onToggleBookmark(episode.id)}
              className="btn btn-secondary btn-sm"
              style={{ color: episode.isBookmarked ? '#D97706' : 'inherit' }}
            >
              <Bookmark size={14} style={{ fill: episode.isBookmarked ? '#D97706' : 'none' }} />
              <span>{episode.isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => skipSeconds(-15)}
                className="btn btn-secondary btn-sm"
                title="Rewind 15s"
              >
                <RotateCcw size={16} />
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn btn-primary"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  padding: 0,
                  boxShadow: '0 4px 14px rgba(53, 106, 230, 0.4)'
                }}
              >
                {isPlaying ? <Pause size={22} style={{ fill: '#FFFFFF' }} /> : <Play size={22} style={{ fill: '#FFFFFF', marginLeft: '3px' }} />}
              </button>

              <button 
                onClick={() => skipSeconds(15)}
                className="btn btn-secondary btn-sm"
                title="Forward 15s"
              >
                <RotateCw size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={cycleSpeed}
                className="btn btn-secondary btn-sm"
                style={{ fontWeight: 800, minWidth: '46px' }}
              >
                {playbackSpeed.toFixed(2).replace(/\.00$/, '')}x
              </button>

              <button
                onClick={() => onMarkCompleted(episode.id)}
                className="btn btn-secondary btn-sm"
                style={{ color: episode.isCompleted ? 'var(--color-success)' : 'inherit' }}
                title="Mark as completed"
              >
                <CheckCircle2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-card-subtle)', maxHeight: '240px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              <FileText size={15} color="var(--accent-blue)" />
              <span>Lesson Transcript &amp; Key Concepts</span>
            </div>
            <button 
              onClick={() => setShowTranscript(!showTranscript)}
              style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700 }}
            >
              {showTranscript ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {showTranscript && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-blue-soft)',
                border: '1px solid var(--accent-blue-border)',
                fontSize: '0.78rem',
                color: 'var(--accent-blue-hover)'
              }}>
                <strong>Summary:</strong> {episode.description}
              </div>

              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {episode.transcript}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#D97706" />
            <span>Honest prototype: audio playback &amp; transcripts are simulated locally.</span>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
