import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, RotateCw, Bookmark, CheckCircle2, Volume2, FileText, Sparkles } from 'lucide-react';

export const AudioPlayerModal = ({ episode, isOpen, onClose, onToggleBookmark, onMarkCompleted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.speechSynthesis) {
      setIsSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    if (episode) {
      setCurrentSeconds(episode.lastPositionSeconds || 0);
      setIsPlaying(false);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [episode, isOpen]);

  // Handle play/pause with Web Speech API
  const handleTogglePlay = () => {
    if (typeof window === 'undefined') return;

    if (isPlaying) {
      if (window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          setIsPlaying(true);
        } else {
          window.speechSynthesis.cancel();
          const textToSpeak = episode.transcript || episode.description || episode.title;
          const utter = new SpeechSynthesisUtterance(textToSpeak);
          utter.rate = playbackSpeed;
          utter.pitch = 1.0;

          utter.onboundary = (e) => {
            if (e.charIndex && episode.durationMinutes) {
              const fraction = e.charIndex / textToSpeak.length;
              setCurrentSeconds(Math.round(fraction * (episode.durationMinutes * 60)));
            }
          };

          utter.onend = () => {
            setIsPlaying(false);
            setCurrentSeconds(episode.durationMinutes * 60);
            onMarkCompleted(episode.id);
          };

          utter.onerror = () => {
            setIsPlaying(false);
          };

          utteranceRef.current = utter;
          window.speechSynthesis.speak(utter);
          setIsPlaying(true);
        }
      } else {
        // Fallback timer if speech synth not available
        setIsPlaying(true);
      }
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    onClose();
  };

  // Speed changer
  const cycleSpeed = () => {
    let nextSpeed = 1.0;
    if (playbackSpeed === 1.0) nextSpeed = 1.25;
    else if (playbackSpeed === 1.25) nextSpeed = 1.5;
    else nextSpeed = 1.0;

    setPlaybackSpeed(nextSpeed);
    if (isPlaying && typeof window !== 'undefined' && window.speechSynthesis) {
      // Re-speak with updated rate from current position
      window.speechSynthesis.cancel();
      const textToSpeak = episode.transcript || episode.description;
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.rate = nextSpeed;
      utter.onend = () => {
        setIsPlaying(false);
        onMarkCompleted(episode.id);
      };
      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    }
  };

  if (!isOpen || !episode) return null;

  const totalSeconds = (episode.durationMinutes || 5) * 60;
  const progressPercent = Math.min(100, (currentSeconds / totalSeconds) * 100);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const skipSeconds = (delta) => {
    const next = Math.max(0, Math.min(totalSeconds, currentSeconds + delta));
    setCurrentSeconds(next);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container max-w-2xl" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
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
              borderRadius: '8px',
              backgroundColor: 'var(--accent-blue-soft)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--accent-blue-border)'
            }}>
              <Volume2 size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-blue">{episode.subject}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{episode.classGroup}</span>
                <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
                  Live Speech Audio
                </span>
              </div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                {episode.title}
              </h2>
            </div>
          </div>
          <button onClick={handleClose} aria-label="Close audio player" style={{ color: 'var(--text-muted)', padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Player Core Area */}
        <div style={{ padding: '24px 28px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-navy)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {isPlaying ? (
                <div className="audio-wave">
                  <div className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF' }} />
                  <div className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF' }} />
                  <div className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF' }} />
                  <div className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF' }} />
                  <div className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF' }} />
                </div>
              ) : (
                <Volume2 size={24} />
              )}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
              {episode.speakerTeacher}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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
              onChange={(e) => setCurrentSeconds((Number(e.target.value) / 100) * totalSeconds)}
              style={{
                width: '100%',
                accentColor: 'var(--accent-blue)',
                height: '6px',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span className="tabular-nums">{formatTime(currentSeconds)}</span>
              <span className="tabular-nums">{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => onToggleBookmark(episode.id)}
              className="btn btn-secondary btn-sm"
              style={{ color: episode.isBookmarked ? 'var(--color-warning)' : 'inherit' }}
            >
              <Bookmark size={14} style={{ fill: episode.isBookmarked ? 'var(--color-warning)' : 'none' }} />
              <span>{episode.isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => skipSeconds(-15)}
                className="btn btn-ghost btn-sm"
                title="Rewind 15s"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={handleTogglePlay}
                className="btn btn-primary"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>

              <button
                onClick={() => skipSeconds(15)}
                className="btn btn-ghost btn-sm"
                title="Fast forward 15s"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RotateCw size={16} />
              </button>
            </div>

            <button
              onClick={cycleSpeed}
              className="btn btn-secondary btn-sm tabular-nums"
              style={{ minWidth: '48px', fontWeight: 700 }}
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {/* Transcript Section */}
        <div style={{ padding: '18px 24px', backgroundColor: 'var(--bg-page)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              <FileText size={14} color="var(--accent-blue)" />
              <span>Lesson Notes Transcript</span>
            </div>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}
            >
              {showTranscript ? 'Hide' : 'Show'}
            </button>
          </div>

          {showTranscript && (
            <div style={{
              padding: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxHeight: '140px',
              overflowY: 'auto',
              whiteSpace: 'pre-line'
            }}>
              {episode.transcript || episode.description}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Uses your browser's audio synthesis engine for natural speech.
            </span>
            <button
              onClick={() => {
                onMarkCompleted(episode.id);
                handleClose();
              }}
              className="btn btn-secondary btn-sm"
            >
              <CheckCircle2 size={14} color="var(--color-success)" />
              <span>Mark Completed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
