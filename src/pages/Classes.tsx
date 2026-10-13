import React, { useState } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  Users,
  FolderArchive,
  CheckSquare,
  Clock,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ClassSubject, PilotClassGroup } from '../types';

interface ClassesProps {
  classes: ClassSubject[];
  onSelectClass: (classId: string) => void;
  onOpenJoinCodeModal?: () => void;
}

export const Classes: React.FC<ClassesProps> = ({ classes, onSelectClass, onOpenJoinCodeModal }) => {
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = classes.filter(cls => {
    const matchesGroup = filterGroup === 'all' || cls.classGroup === filterGroup || (cls.studentCount > 32);
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
            My Enrolled Classes
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Academic subjects and classroom spaces for the SS1 Dynamo &amp; SS1 Horizon pilot stream.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onOpenJoinCodeModal && (
            <button
              onClick={onOpenJoinCodeModal}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              <span>+ Join with Class Code</span>
            </button>
          )}

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Pilot Groups' },
              { id: 'SS1 Dynamo', label: 'SS1 Dynamo' },
              { id: 'SS1 Horizon', label: 'SS1 Horizon' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterGroup(tab.id)}
                className={`btn btn-sm ${filterGroup === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '999px', fontSize: '0.8rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Filter classes by subject name, code, or teacher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            backgroundColor: 'transparent'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Class Cards Grid */}
      {filtered.length === 0 ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <GraduationCap size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            No matching classes found
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Try resetting your search query or group filter tab.
          </p>
          <button
            onClick={() => { setFilterGroup('all'); setSearchQuery(''); }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '16px' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map(cls => (
            <div
              key={cls.id}
              onClick={() => onSelectClass(cls.id)}
              className="card card-hover"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                borderTop: `4px solid ${cls.colorAccent}`
              }}
            >
              <div>
                {/* Header tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-light)'
                  }}>
                    {cls.code}
                  </span>
                  <span className={`badge ${cls.classGroup === 'SS1 Dynamo' ? 'badge-blue' : 'badge-green'}`}>
                    {cls.classGroup}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--primary-navy)',
                  marginBottom: '6px'
                }}>
                  {cls.name}
                </h3>

                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {cls.description}
                </p>

                <div style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: 'var(--text-main)',
                  marginBottom: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ fontWeight: 600 }}>Instructor: {cls.teacherName}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Room: {cls.room}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Time: {cls.schedule}</div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FolderArchive size={14} color="var(--accent-blue)" /> {cls.resourceCount} Files
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckSquare size={14} color="var(--color-warning)" /> {cls.assignmentCount} Tasks
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--accent-blue)',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}>
                  <span>Enter</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
