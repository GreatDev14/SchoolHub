import React, { useState } from 'react';
import { Bell, CheckCheck, Search } from 'lucide-react';
export const Announcements = ({ announcements, onOpenAnnouncement, onMarkAllAsRead }) => {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const filtered = announcements.filter(item => {
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.authorName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const unreadCount = announcements.filter(a => !a.isRead).length;
    return (<div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
            School &amp; Class Announcements
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Official notices, timetables, academic updates, and pilot communications.
          </p>
        </div>

        {unreadCount > 0 && (<button onClick={onMarkAllAsRead} className="btn btn-secondary btn-sm">
            <CheckCheck size={16}/>
            <span>Mark All as Read ({unreadCount})</span>
          </button>)}
      </div>

      {/* Filter Chips & Search Bar */}
      <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '16px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-xs)'
        }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'Class Update', label: 'Class Updates' },
            { id: 'General Notice', label: 'General Notices' },
            { id: 'Event', label: 'Events' }
        ].map(tab => (<button key={tab.id} onClick={() => setCategoryFilter(tab.id)} className={`btn btn-sm ${categoryFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '999px', fontSize: '0.78rem' }}>
              {tab.label}
            </button>))}
        </div>

        {/* Search */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            minWidth: '220px'
        }}>
          <Search size={15} color="var(--text-muted)"/>
          <input type="text" placeholder="Search notices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
            border: 'none',
            outline: 'none',
            fontSize: '0.82rem',
            backgroundColor: 'transparent',
            width: '100%'
        }}/>
        </div>
      </div>

      {/* Feed List */}
      {filtered.length === 0 ? (<div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <Bell size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }}/>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            No announcements found
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            There are currently no notices matching your filter.
          </p>
        </div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(item => (<div key={item.id} onClick={() => onOpenAnnouncement(item)} className="card card-hover" style={{
                    cursor: 'pointer',
                    padding: '20px 24px',
                    borderLeft: !item.isRead ? '4px solid var(--accent-blue)' : '1px solid var(--border-light)',
                    backgroundColor: !item.isRead ? '#FAFBFD' : '#FFFFFF',
                    transition: 'all 120ms ease'
                }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${item.category === 'Class Update' ? 'badge-blue' : item.category === 'Event' ? 'badge-amber' : 'badge-neutral'}`}>
                    {item.category}
                  </span>
                  {item.classGroup && (<span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {item.classGroup}
                    </span>)}
                  {!item.isRead && (<span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
                      NEW
                    </span>)}
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {item.date}
                </span>
              </div>

              <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--primary-navy)',
                    marginBottom: '6px'
                }}>
                {item.title}
              </h3>

              <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    margin: 0
                }}>
                {item.content}
              </p>

              <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                }}>
                <div>
                  Posted by: <strong>{item.authorName}</strong> ({item.authorRole})
                </div>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                  Read full notice &rarr;
                </span>
              </div>
            </div>))}
        </div>)}
    </div>);
};
