import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Radio, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  BookOpen, 
  Clock, 
  Calendar, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LiveLearningSession } from '../../types';

interface LiveRoomModalProps {
  session: LiveLearningSession | null;
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (sessionId: string, questionText: string) => void;
  onUpvoteQuestion: (sessionId: string, questionId: string) => void;
  onOpenResourcePreview?: (title: string) => void;
}

export const LiveRoomModal: React.FC<LiveRoomModalProps> = ({
  session,
  isOpen,
  onClose,
  onAddQuestion,
  onUpvoteQuestion,
  onOpenResourcePreview
}) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [hasConnected, setHasConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'qa' | 'agenda' | 'chat'>('qa');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 'c1', sender: 'Chinedu Eze', text: 'Good afternoon Mr. Alabi!', time: '4:02 PM' },
    { id: 'c2', sender: 'Mr. Babatunde Alabi', text: 'Welcome everyone! We will start with surds conjugate examples on the board in 2 minutes.', time: '4:03 PM', isHost: true },
    { id: 'c3', sender: 'Fatima Sanusi', text: 'Audio is clear sir 👍', time: '4:04 PM' }
  ]);

  if (!isOpen || !session) return null;

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    onAddQuestion(session.id, newQuestion.trim());
    setNewQuestion('');
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        sender: 'You (Student)',
        text: chatInput.trim(),
        time: 'Just now'
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container max-w-4xl"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#F87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Radio size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-blue">{session.subject}</span>
                <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>{session.classGroup}</span>
                <span className={`badge ${session.status === 'Live now' ? 'badge-red' : 'badge-neutral'}`} style={{ fontWeight: 800 }}>
                  ● {session.status.toUpperCase()}
                </span>
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: '#FFFFFF' }}>
                {session.title}
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94A3B8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', minHeight: '440px' }}>
          {/* Left: Video / Stage Canvas */}
          <div style={{
            backgroundColor: '#020617',
            padding: '24px',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #1E293B'
          }}>
            {/* Simulated Live Stream Feed */}
            <div style={{
              aspectRatio: '16/9',
              borderRadius: '12px',
              backgroundColor: '#0F172A',
              border: '1px solid #1E293B',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#1E293B',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <Video size={28} />
              </div>

              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF' }}>
                {session.hostTeacher}'s Virtual Teaching Board
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px', maxWidth: '320px', lineHeight: 1.4 }}>
                Interactive audio and whiteboard stream. Student microphones are muted by default with moderated Q&amp;A queue.
              </p>

              <button
                onClick={() => setHasConnected(!hasConnected)}
                className="btn btn-primary btn-sm"
                style={{
                  marginTop: '16px',
                  backgroundColor: hasConnected ? '#16845B' : 'var(--accent-blue)',
                  borderColor: hasConnected ? '#16845B' : 'var(--accent-blue)',
                  fontWeight: 800
                }}
              >
                <Radio size={14} />
                <span>{hasConnected ? 'Connected to Stream (Demo Active)' : 'Connect to Live Audio/Video'}</span>
              </button>
            </div>

            {/* Session details */}
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #1E293B', fontSize: '0.75rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <span><Calendar size={13} /> {session.date} • {session.time}</span>
                <span><Clock size={13} /> {session.durationMinutes}m duration</span>
                <span><Users size={13} /> {session.hostTeacher}</span>
              </div>
              {session.attachedResourceTitle && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #1E293B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
                    <BookOpen size={14} color="var(--accent-blue)" />
                    <span>{session.attachedResourceTitle}</span>
                  </div>
                  {onOpenResourcePreview && (
                    <button
                      onClick={() => onOpenResourcePreview(session.attachedResourceTitle!)}
                      style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.72rem' }}
                    >
                      View
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Interaction Center (Tabs: Q&A / Chat / Agenda) */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-card-subtle)' }}>
              {[
                { id: 'qa', label: `Live Q&A (${session.studentQuestions.length})`, icon: HelpCircle },
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'agenda', label: 'Agenda', icon: BookOpen }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    flex: 1,
                    padding: '12px 10px',
                    fontSize: '0.78rem',
                    fontWeight: activeTab === t.id ? 800 : 600,
                    color: activeTab === t.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    borderBottom: activeTab === t.id ? '2px solid var(--accent-blue)' : 'none',
                    backgroundColor: activeTab === t.id ? '#FFFFFF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <t.icon size={14} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Q&A Tab */}
            {activeTab === 'qa' && (
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  {session.studentQuestions.map(q => (
                    <div
                      key={q.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{q.author}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px', fontWeight: 600 }}>{q.question}</div>
                      </div>
                      <button
                        onClick={() => onUpvoteQuestion(session.id, q.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                      >
                        <ThumbsUp size={12} />
                        <span>{q.votes}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleQuestionSubmit} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Ask a Question in this Session:</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={e => setNewQuestion(e.target.value)}
                      placeholder="e.g. Can we review Question 14?"
                      className="form-input"
                      style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                    />
                    <button type="submit" disabled={!newQuestion.trim()} className="btn btn-primary btn-sm">
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {chatMessages.map(msg => (
                    <div key={msg.id} style={{ fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 700, color: msg.isHost ? 'var(--accent-blue)' : 'var(--text-main)' }}>{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '6px', marginTop: '2px' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type polite classroom message..."
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                  />
                  <button type="submit" disabled={!chatInput.trim()} className="btn btn-primary btn-sm">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}

            {/* Agenda Tab */}
            {activeTab === 'agenda' && (
              <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '8px' }}>
                  Session Lesson Plan
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {session.agenda}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#D97706" />
            <span>Honest prototype: Live room is simulated locally for day-student pilot evaluation.</span>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};
