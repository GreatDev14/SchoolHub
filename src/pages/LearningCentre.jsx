import React, { useState } from 'react';
import { BookOpen, Headphones, Radio, Bot, HelpCircle, Layers, Flame, Bookmark, Search, Play, Clock, CheckCircle2, Calendar, Sparkles, ArrowRight, Plus, ThumbsUp, ThumbsDown, Send, Eye, Mic, Users } from 'lucide-react';
export const LearningCentre = ({ resources, podcasts, liveSessions, quizSets, flashcardDecks, achievements, revisionTasks, aiMessages, userRole, onOpenResourcePreview, onPlayPodcast, onOpenLiveSession, onOpenNotesToAudio, onStartQuiz, onOpenFlashcards, onToggleBookmarkPodcast, onToggleBookmarkDeck, onToggleRevisionTask, onAddRevisionTask, onSendAIMessage, onRateAIMessage, initialTab = 'overview' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    // AI Tutor internal state
    const [selectedAIMode, setSelectedAIMode] = useState('Teach me step by step');
    const [aiInputText, setAiInputText] = useState('');
    // Revision task form state
    const [showAddRevision, setShowAddRevision] = useState(false);
    const [newRevSubject, setNewRevSubject] = useState('Mathematics');
    const [newRevTopic, setNewRevTopic] = useState('');
    const [newRevDate, setNewRevDate] = useState('Today');
    const [newRevDuration, setNewRevDuration] = useState(25);
    const subjects = Array.from(new Set([
        ...resources.map(r => r.subject),
        ...podcasts.map(p => p.subject),
        ...quizSets.map(q => q.subject)
    ]));
    const completedRevisionCount = revisionTasks.filter(t => t.isCompleted).length;
    const liveNowSession = liveSessions.find(s => s.status === 'Live now');
    const continuePodcast = podcasts.find(p => p.isCompleted === false) || podcasts[0];
    const handleSendAI = (e) => {
        e.preventDefault();
        if (!aiInputText.trim())
            return;
        onSendAIMessage(aiInputText.trim(), selectedAIMode);
        setAiInputText('');
    };
    const handlePromptPillClick = (prompt, mode) => {
        setSelectedAIMode(mode);
        onSendAIMessage(prompt, mode);
    };
    const handleCreateRevisionSubmit = (e) => {
        e.preventDefault();
        if (!newRevTopic.trim())
            return;
        onAddRevisionTask({
            subject: newRevSubject,
            topic: newRevTopic.trim(),
            scheduledDate: newRevDate,
            durationMinutes: Number(newRevDuration) || 20
        });
        setNewRevTopic('');
        setShowAddRevision(false);
    };
    return (<div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
              Learning Centre
            </h1>
            <span className="badge badge-blue">SS1 Pilot Hub</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Teacher-approved notes, educational podcasts, live learning surgeries, formative quizzes &amp; revision tools.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {userRole === 'teacher' && (<button onClick={onOpenNotesToAudio} className="btn btn-primary btn-sm" style={{ backgroundColor: '#4F46E5', borderColor: '#4F46E5' }}>
              <Mic size={15}/>
              <span>Notes-to-Audio Studio</span>
            </button>)}

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            border: '1px solid #FDE68A'
        }}>
            <Flame size={15} color="#D97706"/>
            <span>5-Day Study Streak</span>
          </div>
        </div>
      </div>

      {/* Live Now Alert Banner if session is active */}
      {liveNowSession && (<div style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#991B1B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: '0 4px 14px rgba(153, 27, 27, 0.25)'
            }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
              <Radio size={20}/>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                backgroundColor: '#FFFFFF',
                color: '#991B1B',
                fontWeight: 800,
                fontSize: '0.68rem',
                padding: '2px 8px',
                borderRadius: '999px',
                letterSpacing: '0.04em'
            }}>
                  ● LIVE ROOM ACTIVE
                </span>
                <span style={{ fontSize: '0.78rem', color: '#FEE2E2', fontWeight: 600 }}>
                  {liveNowSession.subject} • {liveNowSession.classGroup}
                </span>
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginTop: '2px' }}>
                {liveNowSession.title}
              </h3>
            </div>
          </div>
          <button onClick={() => onOpenLiveSession(liveNowSession)} className="btn btn-secondary btn-sm" style={{ backgroundColor: '#FFFFFF', color: '#991B1B', fontWeight: 800 }}>
            <span>Enter Live Room</span>
            <ArrowRight size={14}/>
          </button>
        </div>)}

      {/* Navigation Tabs (9 Tabs as specified in Master Plan Sections 22-29) */}
      <div className="learning-tabs">
        {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'lessons', label: 'Lessons & Notes', icon: Eye, count: resources.length },
            { id: 'podcasts', label: 'Audio & Podcasts', icon: Headphones, count: podcasts.length },
            { id: 'live', label: 'Live Learning', icon: Radio, count: liveSessions.length },
            { id: 'ai-tutor', label: 'AI Tutor (Demo)', icon: Bot },
            { id: 'quizzes', label: 'Practice & Quizzes', icon: HelpCircle, count: quizSets.length },
            { id: 'flashcards', label: 'Flashcards & Revision', icon: Layers, count: flashcardDecks.length },
            { id: 'progress', label: 'My Progress', icon: Flame },
            { id: 'saved', label: 'Saved Items', icon: Bookmark }
        ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`learning-tab-btn ${isActive ? 'active' : ''}`}>
              <Icon size={16}/>
              <span>{tab.label}</span>
              {tab.count !== undefined && (<span style={{
                        fontSize: '0.68rem',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        backgroundColor: isActive ? 'var(--accent-blue)' : '#E2E8F0',
                        color: isActive ? '#FFFFFF' : '#475569',
                        fontWeight: 700
                    }}>
                  {tab.count}
                </span>)}
            </button>);
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: OVERVIEW & CONTINUE LEARNING                           */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Top Row: Continue Learning Card & Daily Goal Widget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {/* Continue Audio Lesson Card */}
            {continuePodcast && (<div style={{
                    padding: '22px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--primary-navy)',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#93C5FD',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                }}>
                      <Headphones size={13}/> Continue Audio Lesson
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      {continuePodcast.lastPositionSeconds ? 'In Progress' : 'New'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                    {continuePodcast.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '6px', lineHeight: 1.4 }}>
                    {continuePodcast.description}
                  </p>
                </div>

                <div style={{
                    marginTop: '18px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    {continuePodcast.speakerTeacher} • {continuePodcast.durationMinutes} mins
                  </div>
                  <button onClick={() => onPlayPodcast(continuePodcast)} className="btn btn-primary btn-sm" style={{ backgroundColor: 'var(--accent-blue)', fontWeight: 700 }}>
                    <Play size={14} style={{ fill: '#FFFFFF' }}/>
                    <span>Resume Listening</span>
                  </button>
                </div>
              </div>)}

            {/* Daily Learning Goal Widget */}
            <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                    Today's Study Goal
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'monospace' }}>
                    {completedRevisionCount} / {revisionTasks.length} Completed
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E2E8F0',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: '10px'
            }}>
                  <div style={{
                width: `${(completedRevisionCount / (revisionTasks.length || 1)) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--color-success)',
                transition: 'width 300ms ease'
            }}/>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Complete today's revision tasks and 1 practice quiz to maintain your 5-day streak.
                </p>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {revisionTasks.slice(0, 2).map(task => (<div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <button onClick={() => onToggleRevisionTask(task.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', textAlign: 'left' }}>
                      <CheckCircle2 size={16} color={task.isCompleted ? 'var(--color-success)' : '#CBD5E1'}/>
                      <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-main)' }}>
                        {task.topic}
                      </span>
                    </button>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{task.durationMinutes}m</span>
                  </div>))}
              </div>
            </div>
          </div>

          {/* Jump Section: 6 Tiles */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '0.04em' }}>
              Explore Learning Centre Wings
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
              {[
                { tab: 'lessons', label: 'Lessons & Notes', desc: 'Read verified study sheets', icon: BookOpen, color: '#356AE6', bg: '#EEF3FE' },
                { tab: 'podcasts', label: 'Audio Lessons', desc: 'Listen on mobile during commute', icon: Headphones, color: '#7C3AED', bg: '#F5F3FF' },
                { tab: 'live', label: 'Live Surgery', desc: 'Whiteboard Q&A sessions', icon: Radio, color: '#DC2626', bg: '#FEE2E2' },
                { tab: 'ai-tutor', label: 'AI Tutor', desc: 'Step-by-step help 24/7', icon: Bot, color: '#9333EA', bg: '#FAF5FF' },
                { tab: 'quizzes', label: 'Practice Quizzes', desc: 'Formative speed tests', icon: HelpCircle, color: '#D97706', bg: '#FEF3C7' },
                { tab: 'flashcards', label: 'Flashcards', desc: 'Active recall formulas', icon: Layers, color: '#16845B', bg: '#E8F5EE' }
            ].map(tile => {
                const Icon = tile.icon;
                return (<div key={tile.tab} onClick={() => setActiveTab(tile.tab)} className="card card-hover" style={{ padding: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: tile.bg,
                        color: tile.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px'
                    }}>
                      <Icon size={20}/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                        {tile.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {tile.desc}
                      </div>
                    </div>
                  </div>);
            })}
            </div>
          </div>

          {/* Quick Spotlight Rows: Recommended Audio Lessons & Self-Paced Quizzes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
            {/* Podcasts list */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                  <Headphones size={18} color="#7C3AED"/>
                  <span>Recommended Audio Lessons</span>
                </div>
                <button onClick={() => setActiveTab('podcasts')} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                  View all ({podcasts.length}) &rarr;
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {podcasts.slice(0, 3).map(pod => (<div key={pod.id} onClick={() => onPlayPodcast(pod)} style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#F5F3FF',
                    color: '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                        <Play size={14} style={{ fill: '#7C3AED' }}/>
                      </div>
                      <div>
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>{pod.subject}</span>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-navy)', marginTop: '2px' }}>
                          {pod.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {pod.speakerTeacher} • {pod.durationMinutes}m
                        </div>
                      </div>
                    </div>
                    {pod.isCompleted && <CheckCircle2 size={16} color="var(--color-success)"/>}
                  </div>))}
              </div>
            </div>

            {/* Quizzes list */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                  <HelpCircle size={18} color="#D97706"/>
                  <span>Self-Paced Practice Quizzes</span>
                </div>
                <button onClick={() => setActiveTab('quizzes')} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                  View all ({quizSets.length}) &rarr;
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quizSets.map(qz => (<div key={qz.id} onClick={() => onStartQuiz(qz)} style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    gap: '12px'
                }}>
                    <div>
                      <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>{qz.subject} • {qz.topic}</span>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-navy)', marginTop: '2px' }}>
                        {qz.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {qz.questionsCount} Multiple Choice Items
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {qz.bestScore !== undefined && (<span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{qz.bestScore}%</span>)}
                      <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                        Take
                      </button>
                    </div>
                  </div>))}
              </div>
            </div>
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 2: LESSONS & NOTES                                         */}
      {/* ============================================================== */}
      {activeTab === 'lessons' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search & Subject Bar */}
          <div className="card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Search size={16} color="var(--text-muted)"/>
              <input type="text" placeholder="Search notes, formulas, summaries..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', backgroundColor: 'transparent' }}/>
            </div>
            <div style={{ minWidth: '160px' }}>
              <select className="form-select" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} style={{ padding: '6px 10px', fontSize: '0.82rem' }}>
                <option value="all">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {resources
                .filter(r => (selectedSubject === 'all' || r.subject === selectedSubject) &&
                (r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase())))
                .map(res => (<div key={res.id} onClick={() => onOpenResourcePreview(res)} className="card card-hover" style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-blue">{res.subject}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{res.fileSize}</span>
                    </div>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                      {res.title}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                      {res.description}
                    </p>
                  </div>
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Updated {res.updatedDate}</span>
                    <button style={{ color: 'var(--accent-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={13}/> Preview
                    </button>
                  </div>
                </div>))}
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 3: AUDIO & PODCASTS                                        */}
      {/* ============================================================== */}
      {activeTab === 'podcasts' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Teacher banner */}
          {userRole === 'teacher' && (<div style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#EEF2FF',
                    border: '1px solid #C7D2FE',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mic size={22} color="#4F46E5"/>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#312E81' }}>
                    Teacher Audio Creation Studio
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#4338CA' }}>
                    Convert written lesson notes into simulated podcast episodes for your students.
                  </div>
                </div>
              </div>
              <button onClick={onOpenNotesToAudio} className="btn btn-primary btn-sm" style={{ backgroundColor: '#4F46E5' }}>
                Launch Studio
              </button>
            </div>)}

          {/* Podcasts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
            {podcasts.map(pod => (<div key={pod.id} className="card card-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-purple">{pod.subject}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pod.classGroup}</span>
                    </div>
                    {onToggleBookmarkPodcast && (<button onClick={() => onToggleBookmarkPodcast(pod.id)} style={{ color: pod.isBookmarked ? '#D97706' : 'var(--text-muted)' }}>
                        <Bookmark size={16} style={{ fill: pod.isBookmarked ? '#D97706' : 'none' }}/>
                      </button>)}
                  </div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    {pod.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {pod.speakerTeacher} • {pod.seriesTitle}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                    {pod.description}
                  </p>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    <Clock size={13}/>
                    <span>{pod.durationMinutes} mins</span>
                    {pod.isCompleted && <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>• Completed</span>}
                  </div>
                  <button onClick={() => onPlayPodcast(pod)} className="btn btn-primary btn-sm" style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}>
                    <Play size={13} style={{ fill: '#FFFFFF' }}/>
                    <span>Play Episode</span>
                  </button>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 4: LIVE LEARNING SESSIONS                                  */}
      {/* ============================================================== */}
      {activeTab === 'live' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
                padding: '12px 16px',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
            }}>
            Live Learning Surgeries connect day students with subject teachers for focused problem-solving after school hours.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {liveSessions.map(session => (<div key={session.id} className="card" style={{
                    padding: '22px',
                    borderColor: session.status === 'Live now' ? '#F87171' : 'var(--border-light)',
                    backgroundColor: session.status === 'Live now' ? '#FEF2F2' : '#FFFFFF'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className={`badge ${session.status === 'Live now' ? 'badge-red' : session.status === 'Upcoming' ? 'badge-blue' : 'badge-neutral'}`}>
                        ● {session.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {session.subject} • {session.classGroup}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                      {session.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13}/> Host: {session.hostTeacher}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13}/> {session.date} • {session.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13}/> {session.durationMinutes} mins
                      </span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '10px', lineHeight: 1.5, maxWidth: '680px' }}>
                      {session.agenda}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {session.studentQuestionsCount} Questions submitted
                    </span>
                    <button onClick={() => onOpenLiveSession(session)} className="btn btn-primary btn-sm" style={{
                    backgroundColor: session.status === 'Live now' ? '#DC2626' : 'var(--primary-navy)',
                    borderColor: session.status === 'Live now' ? '#DC2626' : 'var(--primary-navy)',
                    fontWeight: 800
                }}>
                      <Radio size={14}/>
                      <span>{session.status === 'Live now' ? 'Enter Live Room' : 'View Session & Submit Qs'}</span>
                    </button>
                  </div>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 5: INTERACTIVE AI TUTOR                                   */}
      {/* ============================================================== */}
      {activeTab === 'ai-tutor' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Disclaimer banner */}
          <div style={{
                padding: '14px 18px',
                backgroundColor: '#FEF3C7',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #FDE68A',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '0.82rem',
                color: '#92400E'
            }}>
            <Sparkles size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }}/>
            <div>
              <strong>Simulated AI Curriculum Tutor (Local Prototype Demonstration):</strong> Answers are constrained strictly to the SS1 pilot syllabus. AI assistance supports independent practice and never replaces your teacher.
            </div>
          </div>

          {/* Mode pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Teaching Mode:</span>
            {[
                'Teach me step by step',
                'Explain simply',
                'Give me a hint',
                'Quiz me',
                'Give me an example',
                'Help me revise'
            ].map(m => (<button key={m} onClick={() => setSelectedAIMode(m)} className={`btn btn-sm ${selectedAIMode === m ? 'btn-primary' : 'btn-secondary'}`} style={{
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    padding: '4px 12px',
                    minHeight: '30px',
                    backgroundColor: selectedAIMode === m ? '#7C3AED' : '#FFFFFF',
                    borderColor: selectedAIMode === m ? '#7C3AED' : 'var(--border-light)'
                }}>
                {m}
              </button>))}
          </div>

          {/* Quick Prompts */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Try asking:</span>
            {[
                { text: 'Explain the quadratic discriminant formula', mode: 'Teach me step by step' },
                { text: 'Why does a ticker-timer period equal 0.02s?', mode: 'Explain simply' },
                { text: 'Help me write a thesis statement for solar microgrids', mode: 'Give me an example' }
            ].map((p, i) => (<button key={i} onClick={() => handlePromptPillClick(p.text, p.mode)} className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '4px 10px', minHeight: '28px', borderRadius: '999px' }}>
                “{p.text}”
              </button>))}
          </div>

          {/* Messages list */}
          <div className="card" style={{ padding: '20px', minHeight: '360px', maxHeight: '460px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {aiMessages.map(msg => (<div key={msg.id} style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  {msg.sender === 'user' ? 'You' : 'AI Curriculum Tutor'} • {msg.timestamp}
                </div>
                <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--bg-card-subtle)',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line'
                }}>
                  {msg.content}
                </div>
                {msg.sender === 'assistant' && (<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>📖 {msg.groundedSource || 'Curriculum Reference: SS1 Pilot Syllabus'}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => onRateAIMessage(msg.id, 'helpful')} style={{ color: msg.helpfulRating === 'helpful' ? 'var(--color-success)' : 'inherit' }}>
                        <ThumbsUp size={12}/>
                      </button>
                      <button onClick={() => onRateAIMessage(msg.id, 'not_helpful')} style={{ color: msg.helpfulRating === 'not_helpful' ? '#DC2626' : 'inherit' }}>
                        <ThumbsDown size={12}/>
                      </button>
                    </div>
                  </div>)}
              </div>))}
          </div>

          {/* Form */}
          <form onSubmit={handleSendAI} style={{ display: 'flex', gap: '10px' }}>
            <input type="text" value={aiInputText} onChange={e => setAiInputText(e.target.value)} placeholder={`Ask the AI tutor a question in "${selectedAIMode}" mode...`} className="form-input" style={{ flex: 1 }}/>
            <button type="submit" disabled={!aiInputText.trim()} className="btn btn-primary" style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}>
              <Send size={15}/>
              <span>Ask</span>
            </button>
          </form>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 6: PRACTICE & QUIZZES                                      */}
      {/* ============================================================== */}
      {activeTab === 'quizzes' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
                padding: '12px 16px',
                backgroundColor: '#F3E8FF',
                color: '#6B21A8',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E9D5FF',
                fontSize: '0.8rem'
            }}>
            Formative practice quizzes provide immediate explanations to deepen concept understanding. Scores are formative and not official continuous assessments.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {quizSets.map(quiz => (<div key={quiz.id} className="card card-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge badge-purple">{quiz.subject}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{quiz.classGroup}</span>
                  </div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    {quiz.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Topic: {quiz.topic} • {quiz.questionsCount} Questions
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {quiz.bestScore !== undefined ? (<span className="badge badge-green">Best: {quiz.bestScore}%</span>) : (<span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Not attempted yet</span>)}
                  <button onClick={() => onStartQuiz(quiz)} className="btn btn-primary btn-sm" style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}>
                    <Play size={13} style={{ fill: '#FFFFFF' }}/>
                    <span>{quiz.bestScore !== undefined ? 'Retake Quiz' : 'Start Quiz'}</span>
                  </button>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 7: FLASHCARDS & REVISION PLANNER                           */}
      {/* ============================================================== */}
      {activeTab === 'flashcards' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Flashcard decks */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Active Recall Flashcard Decks
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {flashcardDecks.map(deck => (<div key={deck.id} className="card card-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-amber">{deck.subject}</span>
                      {onToggleBookmarkDeck && (<button onClick={() => onToggleBookmarkDeck(deck.id)} style={{ color: deck.isBookmarked ? '#D97706' : 'var(--text-muted)' }}>
                          <Bookmark size={16} style={{ fill: deck.isBookmarked ? '#D97706' : 'none' }}/>
                        </button>)}
                    </div>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                      {deck.title}
                    </h3>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Curated by {deck.authorTeacher} • {deck.cards.length} Cards
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                    <button onClick={() => onOpenFlashcards(deck)} className="btn btn-primary btn-sm" style={{ width: '100%', backgroundColor: '#D97706', borderColor: '#D97706' }}>
                      <Layers size={14}/>
                      <span>Review Deck</span>
                    </button>
                  </div>
                </div>))}
            </div>
          </div>

          {/* Daily Revision Planner */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  Daily Revision Planner Checklist
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Organize your study blocks across subjects to avoid last-minute exam pressure.
                </p>
              </div>
              <button onClick={() => setShowAddRevision(!showAddRevision)} className="btn btn-secondary btn-sm">
                <Plus size={14}/>
                <span>Add Revision Task</span>
              </button>
            </div>

            {showAddRevision && (<form onSubmit={handleCreateRevisionSubmit} style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Subject</label>
                    <select value={newRevSubject} onChange={e => setNewRevSubject(e.target.value)} className="form-select" style={{ padding: '8px' }}>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="English Language">English Language</option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Topic / Objective</label>
                    <input type="text" value={newRevTopic} onChange={e => setNewRevTopic(e.target.value)} placeholder="e.g. Surds practice" className="form-input" style={{ padding: '8px' }}/>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setShowAddRevision(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" disabled={!newRevTopic.trim()} className="btn btn-primary btn-sm">Save Task</button>
                </div>
              </form>)}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {revisionTasks.map(task => (<div key={task.id} style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => onToggleRevisionTask(task.id)}>
                      <CheckCircle2 size={18} color={task.isCompleted ? 'var(--color-success)' : '#CBD5E1'}/>
                    </button>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', textDecoration: task.isCompleted ? 'line-through' : 'none', color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-main)' }}>
                        {task.topic}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {task.subject} • {task.scheduledDate}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                    {task.durationMinutes} mins
                  </span>
                </div>))}
            </div>
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 8: MY PROGRESS & ACHIEVEMENTS SHELF                        */}
      {/* ============================================================== */}
      {activeTab === 'progress' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Streak Banner */}
          <div style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: 'var(--shadow-sm)'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '2.5rem' }}>🔥</div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#FEF3C7' }}>
                  Day Student Learning Streak
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                  5 Days In A Row!
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#FEF3C7', marginTop: '2px' }}>
                  Active learning logged each day this week. Keep up the consistency!
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', backgroundColor: 'rgba(0, 0, 0, 0.15)', padding: '12px 18px', borderRadius: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, display: 'block' }}>3</span>
                <span style={{ fontSize: '0.68rem', color: '#FEF3C7', textTransform: 'uppercase' }}>Podcasts</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, display: 'block' }}>100%</span>
                <span style={{ fontSize: '0.68rem', color: '#FEF3C7', textTransform: 'uppercase' }}>Top Quiz</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, display: 'block' }}>20+</span>
                <span style={{ fontSize: '0.68rem', color: '#FEF3C7', textTransform: 'uppercase' }}>Cards</span>
              </div>
            </div>
          </div>

          {/* Badges Grid */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Milestones &amp; Achievement Shelf
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {achievements.map(ach => (<div key={ach.id} className="card" style={{
                    padding: '18px',
                    backgroundColor: ach.isEarned ? '#FFFFFF' : 'var(--bg-card-subtle)',
                    borderColor: ach.isEarned ? '#FDE68A' : 'var(--border-light)'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '2rem' }}>{ach.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                          {ach.category}
                        </span>
                        {ach.isEarned && <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Earned</span>}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-navy)', marginTop: '2px' }}>
                        {ach.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {ach.description}
                      </div>
                      {ach.earnedDate && (<div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                          Awarded on {ach.earnedDate}
                        </div>)}
                    </div>
                  </div>
                </div>))}
            </div>
          </div>
        </div>)}

      {/* ============================================================== */}
      {/* TAB 9: SAVED ITEMS                                             */}
      {/* ============================================================== */}
      {activeTab === 'saved' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Your Bookmarked Study Materials
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {podcasts.filter(p => p.isBookmarked).map(pod => (<div key={pod.id} onClick={() => onPlayPodcast(pod)} className="card card-hover" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Headphones size={20} color="#7C3AED"/>
                  <div>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{pod.subject}</span>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>{pod.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pod.durationMinutes}m • {pod.speakerTeacher}</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#7C3AED' }}>Play</button>
              </div>))}

            {flashcardDecks.filter(d => d.isBookmarked).map(deck => (<div key={deck.id} onClick={() => onOpenFlashcards(deck)} className="card card-hover" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layers size={20} color="#D97706"/>
                  <div>
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>{deck.subject}</span>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>{deck.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{deck.cards.length} Cards • {deck.authorTeacher}</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#D97706' }}>Review</button>
              </div>))}
          </div>
        </div>)}
    </div>);
};
