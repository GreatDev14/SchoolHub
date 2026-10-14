import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, Flag, Send, Pin, Bookmark, HelpCircle, CheckCircle2, ArrowLeft, Plus, Search, Check } from 'lucide-react';
export const Discussions = ({ topics, userProfile, onAddReply, onReportTopic, onToggleBookmarkTopic, onCreateTopic, onVerifyReply, onSignalConfusion }) => {
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [quickFilter, setQuickFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [replyInput, setReplyInput] = useState('');
    const [flagFeedback, setFlagFeedback] = useState(null);
    const [confusionFeedback, setConfusionFeedback] = useState(null);
    // New topic modal form
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Ask a question');
    const [newSubject, setNewSubject] = useState('Mathematics');
    const [newClassGroup] = useState(userProfile.classGroup || 'SS1 Dynamo');
    const [newTopicTag, setNewTopicTag] = useState('');
    const selectedTopic = topics.find(t => t.id === selectedTopicId);
    const categories = [
        'Ask a question',
        'Homework help',
        'Lesson discussion',
        'Study group',
        'Class updates',
        'Poll or quick check'
    ];
    const filteredTopics = topics.filter(t => {
        const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.topicTag && t.topicTag.toLowerCase().includes(searchQuery.toLowerCase()));
        let matchesFilter = true;
        if (quickFilter === 'unanswered') {
            matchesFilter = t.replies.length === 0;
        }
        else if (quickFilter === 'answered') {
            matchesFilter = t.replies.length > 0;
        }
        else if (quickFilter === 'bookmarked') {
            matchesFilter = !!t.isBookmarked;
        }
        return matchesCategory && matchesSearch && matchesFilter;
    });
    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyInput.trim() || !selectedTopicId)
            return;
        onAddReply(selectedTopicId, replyInput.trim());
        setReplyInput('');
    };
    const handleFlagReport = () => {
        if (selectedTopic && onReportTopic) {
            onReportTopic(selectedTopic.title, 'Flagged by user for academic conduct review');
        }
        setFlagFeedback('Topic has been submitted to the administrator moderation queue.');
        setTimeout(() => setFlagFeedback(null), 3500);
    };
    const handleSignalConfusion = (topicId) => {
        if (onSignalConfusion) {
            onSignalConfusion(topicId);
        }
        setConfusionFeedback('Anonymous confusion signal sent to your subject teacher.');
        setTimeout(() => setConfusionFeedback(null), 3000);
    };
    const handleCreateTopicSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim())
            return;
        if (onCreateTopic) {
            onCreateTopic({
                title: newTitle.trim(),
                category: newCategory,
                classGroup: newClassGroup,
                subject: newSubject,
                topicTag: newTopicTag.trim() || undefined,
                authorName: userProfile.name,
                authorRole: userProfile.role === 'teacher' ? 'Teacher' : 'Student',
                date: 'Just now',
                pinned: false,
                isAnswered: false,
                isBookmarked: false
            });
        }
        setNewTitle('');
        setNewTopicTag('');
        setShowCreateModal(false);
    };
    return (<div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Moderation Rules Banner */}
      <div style={{
            padding: '14px 18px',
            backgroundColor: '#FEF9C3',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FEF08A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            color: '#854D0E',
            fontSize: '0.85rem'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="#CA8A04" style={{ flexShrink: 0 }}/>
          <span>
            <strong>Moderated Academic Forum:</strong> All questions and responses are visible to subject teachers and school administrators.
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A16207' }}>
          Pilot SS1 Dynamo &amp; Horizon
        </span>
      </div>

      {flagFeedback && (<div style={{
                padding: '12px 16px',
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-success-border)',
                color: 'var(--color-success)',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
          <CheckCircle2 size={16}/>
          <span>{flagFeedback}</span>
        </div>)}

      {confusionFeedback && (<div style={{
                padding: '12px 16px',
                backgroundColor: '#F3E8FF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E9D5FF',
                color: '#6B21A8',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
          <HelpCircle size={16}/>
          <span>{confusionFeedback}</span>
        </div>)}

      {selectedTopic ? (
        /* SINGLE TOPIC THREAD VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button onClick={() => setSelectedTopicId(null)} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
            }}>
            <ArrowLeft size={16}/>
            <span>Back to All Discussion Topics</span>
          </button>

          <div className="card" style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span className="badge badge-blue">{selectedTopic.subject}</span>
                  <span className="badge badge-neutral">{selectedTopic.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedTopic.classGroup}</span>
                  {selectedTopic.topicTag && (<span className="badge badge-purple" style={{ fontFamily: 'monospace' }}>#{selectedTopic.topicTag}</span>)}
                  {selectedTopic.pinned && (<span className="badge badge-amber"><Pin size={10}/> PINNED</span>)}
                </div>

                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {selectedTopic.title}
                </h1>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Started by <strong>{selectedTopic.authorName}</strong> ({selectedTopic.authorRole}) • {selectedTopic.date}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {onToggleBookmarkTopic && (<button onClick={() => onToggleBookmarkTopic(selectedTopic.id)} className="btn btn-secondary btn-sm" style={{ color: selectedTopic.isBookmarked ? '#D97706' : 'inherit' }}>
                    <Bookmark size={14} style={{ fill: selectedTopic.isBookmarked ? '#D97706' : 'none' }}/>
                    <span>{selectedTopic.isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>)}

                <button onClick={() => handleSignalConfusion(selectedTopic.id)} className="btn btn-secondary btn-sm" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', borderColor: '#E9D5FF' }}>
                  <HelpCircle size={14}/>
                  <span>I'm Confused</span>
                </button>

                <button onClick={handleFlagReport} className="btn btn-secondary btn-sm" title="Report thread" style={{ color: '#DC2626' }}>
                  <Flag size={14}/>
                </button>
              </div>
            </div>

            {/* Replies List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Replies ({selectedTopic.replies.length})
              </div>

              {selectedTopic.replies.map(rep => (<div key={rep.id} style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: rep.isTeacherVerified ? '#ECFDF5' : rep.authorRole === 'Teacher' ? 'var(--accent-blue-soft)' : 'var(--bg-card-subtle)',
                    border: `1px solid ${rep.isTeacherVerified ? '#A7F3D0' : rep.authorRole === 'Teacher' ? 'var(--accent-blue-border)' : 'var(--border-light)'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                        {rep.authorName}
                      </span>
                      <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: rep.authorRole === 'Teacher' ? 'var(--accent-blue)' : 'var(--text-secondary)'
                }}>
                        [{rep.authorRole}]
                      </span>
                      {rep.isTeacherVerified && (<span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
                          <CheckCircle2 size={12}/> Teacher Verified Solution
                        </span>)}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rep.date}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>
                    {rep.content}
                  </p>

                  {userProfile.role === 'teacher' && !rep.isTeacherVerified && onVerifyReply && (<div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(0, 0, 0, 0.06)', display: 'flex', justifyContent: 'flex-end' }}>
                      <button onClick={() => onVerifyReply(selectedTopic.id, rep.id)} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={14}/> Mark as Verified Solution
                      </button>
                    </div>)}
                </div>))}
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} style={{ marginTop: '20px' }}>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>
                  Post a reply as <strong>{userProfile.name}</strong> ({userProfile.roleTitle.split('•')[0].trim()}):
                </label>
                <textarea className="form-textarea" rows={3} placeholder="Type your response or question for this academic thread..." value={replyInput} onChange={e => setReplyInput(e.target.value)}/>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Demonstration mode: reply will append to local topic state.
                </span>
                <button type="submit" disabled={!replyInput.trim()} className="btn btn-primary btn-sm">
                  <Send size={14}/>
                  <span>Post Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>) : (
        /* TOPICS FEED LIST */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Class Discussions &amp; Study Threads
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Collaborative peer learning and teacher-verified solutions for SS1 Dynamo &amp; Horizon.
              </p>
            </div>

            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary btn-sm">
              <Plus size={16}/>
              <span>Ask a Question</span>
            </button>
          </div>

          {/* Category filter pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setSelectedCategory('all')} className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '999px', fontSize: '0.76rem' }}>
              All Topics ({topics.length})
            </button>
            {categories.map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '999px', fontSize: '0.76rem' }}>
                {cat}
              </button>))}
          </div>

          {/* Quick filter & search bar */}
          <div className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} color="var(--text-muted)"/>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search topics, questions, formulas..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', backgroundColor: 'transparent' }}/>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'unanswered', label: 'Unanswered' },
                { id: 'answered', label: 'Answered' },
                { id: 'bookmarked', label: 'Bookmarked' }
            ].map(f => (<button key={f.id} onClick={() => setQuickFilter(f.id)} style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: quickFilter === f.id ? 800 : 500,
                    backgroundColor: quickFilter === f.id ? 'var(--accent-blue-soft)' : 'transparent',
                    color: quickFilter === f.id ? 'var(--accent-blue)' : 'var(--text-secondary)'
                }}>
                  {f.label}
                </button>))}
            </div>
          </div>

          {/* Topics list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredTopics.map(topic => (<div key={topic.id} onClick={() => setSelectedTopicId(topic.id)} className="card card-hover" style={{
                    cursor: 'pointer',
                    padding: '18px 22px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span className="badge badge-blue">{topic.subject}</span>
                    <span className="badge badge-neutral">{topic.category}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{topic.classGroup}</span>
                    {topic.topicTag && (<span className="badge badge-purple" style={{ fontFamily: 'monospace' }}>#{topic.topicTag}</span>)}
                    {topic.pinned && (<span className="badge badge-amber"><Pin size={10}/> PINNED</span>)}
                    {topic.replies.length === 0 && (<span className="badge badge-red">Unanswered</span>)}
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    {topic.title}
                  </h3>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Started by {topic.authorName} ({topic.authorRole}) • {topic.date}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {onToggleBookmarkTopic && (<button onClick={e => {
                        e.stopPropagation();
                        onToggleBookmarkTopic(topic.id);
                    }} style={{ color: topic.isBookmarked ? '#D97706' : 'var(--text-muted)' }}>
                      <Bookmark size={16} style={{ fill: topic.isBookmarked ? '#D97706' : 'none' }}/>
                    </button>)}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 700
                }}>
                    <MessageSquare size={14} color="var(--accent-blue)"/>
                    <span>{topic.replies.length} replies</span>
                  </div>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* New Topic Modal */}
      {showCreateModal && (<div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ padding: '24px', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Ask a Question / Start a Discussion
              </h3>
              <button onClick={() => setShowCreateModal(false)} style={{ color: 'var(--text-muted)', fontWeight: 700 }}>
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTopicSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="form-label">Subject</label>
                <select value={newSubject} onChange={e => setNewSubject(e.target.value)} className="form-select">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English Language">English Language</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>

              <div>
                <label className="form-label">Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="form-select">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Title / Question *</label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Question 14 surd sign error" className="form-input"/>
              </div>

              <div>
                <label className="form-label">Syllabus Tag (Optional)</label>
                <input type="text" value={newTopicTag} onChange={e => setNewTopicTag(e.target.value)} placeholder="e.g. Radicals & Quadratic" className="form-input"/>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" disabled={!newTitle.trim()} className="btn btn-primary btn-sm">Publish Discussion</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
