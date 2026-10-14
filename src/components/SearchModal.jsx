import React, { useState } from 'react';
import { Search, X, BookOpen, CheckSquare, Bell, FolderArchive, ArrowRight } from 'lucide-react';
export const SearchModal = ({ isOpen, onClose, classes, assignments, announcements, resources, onNavigateToItem }) => {
    const [query, setQuery] = useState('');
    if (!isOpen)
        return null;
    const q = query.toLowerCase().trim();
    const filteredClasses = q ? classes.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.teacherName.toLowerCase().includes(q)) : [];
    const filteredAssignments = q ? assignments.filter(a => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)) : [];
    const filteredAnnouncements = q ? announcements.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)) : [];
    const filteredResources = q ? resources.filter(r => r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q)) : [];
    const totalResults = filteredClasses.length + filteredAssignments.length + filteredAnnouncements.length + filteredResources.length;
    return (<div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: 0 }}>
        {/* Search Input Bar */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-light)'
        }}>
          <Search size={20} color="var(--accent-blue)"/>
          <input type="text" placeholder="Search classes, assignments, resources, or notices..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            color: 'var(--text-main)',
            backgroundColor: 'transparent'
        }}/>
          {query && (<button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)' }}>
              <X size={18}/>
            </button>)}
          <button onClick={onClose} style={{
            padding: '4px 8px',
            backgroundColor: '#F1F5F9',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
        }}>
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '16px' }}>
          {!query ? (<div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Type a keyword to search across the School Hub pilot.</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Mathematics', 'Physics', 'Linear Equations', 'Exam', 'SS1 Dynamo'].map(keyword => (<button key={keyword} onClick={() => setQuery(keyword)} style={{
                    fontSize: '0.78rem',
                    padding: '4px 10px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderRadius: '999px',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-secondary)'
                }}>
                    "{keyword}"
                  </button>))}
              </div>
            </div>) : totalResults === 0 ? (<div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p style={{ fontWeight: 600 }}>No results found for "{query}"</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Try searching for a subject like "Math" or a class group like "SS1 Dynamo".
              </p>
            </div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Classes */}
              {filteredClasses.length > 0 && (<div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Classes ({filteredClasses.length})
                  </div>
                  {filteredClasses.map(cls => (<div key={cls.id} onClick={() => {
                        onNavigateToItem('class-detail', cls.id);
                        onClose();
                    }} style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 120ms ease'
                    }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <BookOpen size={16} color="var(--accent-blue)"/>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{cls.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>({cls.classGroup})</span>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-muted)"/>
                    </div>))}
                </div>)}

              {/* Assignments */}
              {filteredAssignments.length > 0 && (<div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Assignments ({filteredAssignments.length})
                  </div>
                  {filteredAssignments.map(asg => (<div key={asg.id} onClick={() => {
                        onNavigateToItem('assignment-detail', asg.id);
                        onClose();
                    }} style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckSquare size={16} color="var(--color-warning)"/>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{asg.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{asg.subject} • Due {asg.dueDate}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-muted)"/>
                    </div>))}
                </div>)}

              {/* Resources */}
              {filteredResources.length > 0 && (<div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Learning Resources ({filteredResources.length})
                  </div>
                  {filteredResources.map(res => (<div key={res.id} onClick={() => {
                        onNavigateToItem('learning-centre');
                        onClose();
                    }} style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FolderArchive size={16} color="var(--color-success)"/>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{res.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{res.subject} • {res.category}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-muted)"/>
                    </div>))}
                </div>)}

              {/* Announcements */}
              {filteredAnnouncements.length > 0 && (<div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Announcements ({filteredAnnouncements.length})
                  </div>
                  {filteredAnnouncements.map(ann => (<div key={ann.id} onClick={() => {
                        onNavigateToItem('announcements');
                        onClose();
                    }} style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Bell size={16} color="#8B5CF6"/>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{ann.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ann.authorName} • {ann.date}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-muted)"/>
                    </div>))}
                </div>)}
            </div>)}
        </div>
      </div>
    </div>);
};
