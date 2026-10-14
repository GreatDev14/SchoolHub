import React, { useState } from 'react';
import { CheckSquare, Search, Clock, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
export const Assignments = ({ assignments, onSelectAssignment }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    // Extract unique subjects
    const subjects = Array.from(new Set(assignments.map(a => a.subject)));
    const filtered = assignments.filter(item => {
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSubject && matchesSearch;
    });
    const getStatusBadge = (status) => {
        switch (status) {
            case 'submitted':
                return <span className="badge badge-green"><CheckCircle2 size={12}/> Submitted</span>;
            case 'in_progress':
                return <span className="badge badge-blue"><Clock size={12}/> In Progress</span>;
            case 'past_due':
                return <span className="badge badge-red"><AlertTriangle size={12}/> Past Due</span>;
            case 'not_started':
            default:
                return <span className="badge badge-amber"><Clock size={12}/> Not Started</span>;
        }
    };
    return (<div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
          Assignments &amp; Class Tasks
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          View deadlines, download exercise guidelines, and submit completed coursework for SS1 pilot subjects.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: 'var(--shadow-xs)'
        }}>
        {/* Status Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>
            Status:
          </span>
          {[
            { id: 'all', label: `All (${assignments.length})` },
            { id: 'not_started', label: `Not Started (${assignments.filter(a => a.status === 'not_started').length})` },
            { id: 'in_progress', label: `In Progress (${assignments.filter(a => a.status === 'in_progress').length})` },
            { id: 'submitted', label: `Submitted (${assignments.filter(a => a.status === 'submitted').length})` },
            { id: 'past_due', label: `Past Due (${assignments.filter(a => a.status === 'past_due').length})` }
        ].map(tab => (<button key={tab.id} onClick={() => setStatusFilter(tab.id)} className={`btn btn-sm ${statusFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '999px', fontSize: '0.78rem' }}>
              {tab.label}
            </button>))}
        </div>

        {/* Search & Subject Dropdown */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '220px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
        }}>
            <Search size={16} color="var(--text-muted)"/>
            <input type="text" placeholder="Search assignments by title or topic..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '0.85rem',
            backgroundColor: 'transparent'
        }}/>
          </div>

          <div style={{ minWidth: '180px' }}>
            <select className="form-select" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
              <option value="all">All Subjects</option>
              {subjects.map(s => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignment List */}
      {filtered.length === 0 ? (<div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <CheckSquare size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }}/>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            No assignments match your criteria
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Clear your active filters to see all available class assignments.
          </p>
          <button onClick={() => { setStatusFilter('all'); setSubjectFilter('all'); setSearchQuery(''); }} className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }}>
            Clear Filters
          </button>
        </div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(asg => (<div key={asg.id} onClick={() => onSelectAssignment(asg.id)} className="card card-hover" style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '20px 24px',
                    flexWrap: 'wrap'
                }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                    {asg.subject}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ({asg.classGroup})
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {asg.title}
                </h3>

                <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                  {asg.instructions}
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: '8px'
                }}>
                  <span>Instructor: <strong>{asg.teacherName}</strong></span>
                  <span>Due: <strong>{asg.dueDate} ({asg.dueTime})</strong></span>
                  <span>Value: <strong>{asg.points} pts</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {getStatusBadge(asg.status)}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                }}>
                  <span>View Details</span>
                  <ArrowRight size={16}/>
                </div>
              </div>
            </div>))}
        </div>)}
    </div>);
};
