import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Filter,
  Sparkles,
  BookOpen,
  CalendarDays,
  ListTodo,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { TimetableEntry, CalendarEvent } from '../types';

interface TimetableProps {
  timetable: TimetableEntry[];
  calendarEvents: CalendarEvent[];
  initialClassGroup?: string;
}

export const Timetable: React.FC<TimetableProps> = ({
  timetable,
  calendarEvents,
  initialClassGroup = 'SS1 Dynamo'
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'calendar'>('lessons');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Wednesday');
  const [selectedGroup, setSelectedGroup] = useState<string>(initialClassGroup || 'SS1 Dynamo');

  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const currentLessons = timetable.filter(t => {
    const matchesDay = t.day === selectedDay;
    const matchesGroup = selectedGroup === 'all' || t.classGroup === selectedGroup;
    return matchesDay && matchesGroup;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
            Timetable &amp; Academic Calendar
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Day-student lesson periods, room schedules, Continuous Assessment dates, and term deadlines.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-card-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setActiveTab('lessons')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'lessons' ? 700 : 500,
              backgroundColor: activeTab === 'lessons' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'lessons' ? 'var(--primary-navy)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'lessons' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'calendar' ? 700 : 500,
              backgroundColor: activeTab === 'calendar' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'calendar' ? 'var(--primary-navy)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'calendar' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Academic Calendar ({calendarEvents.length})
          </button>
        </div>
      </div>

      {activeTab === 'lessons' ? (
        <>
          {/* Stream Filter & Day Switcher Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Pilot Stream:</span>
              {['SS1 Dynamo', 'SS1 Horizon', 'all'].map(grp => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`btn btn-sm ${selectedGroup === grp ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '999px', fontSize: '0.78rem' }}
                >
                  {grp === 'all' ? 'All Streams' : grp}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Bell Hours: 8:30 AM – 2:45 PM (Day Students)
            </div>
          </div>

          {/* Weekday Switcher Tabs */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '6px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            {days.map(d => {
              const isSelected = selectedDay === d;
              const isToday = d === 'Wednesday'; // Simulated "Today"
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: isSelected ? 'var(--accent-blue)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                    transition: 'all 120ms ease'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: isSelected ? 800 : 600 }}>
                    {d}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: isSelected ? 'rgba(255, 255, 255, 0.85)' : isToday ? 'var(--accent-blue)' : 'var(--text-muted)',
                    fontWeight: isToday ? 700 : 500,
                    marginTop: '2px'
                  }}>
                    {isToday ? 'TODAY' : 'Lesson Day'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Lesson Schedule Cards for Selected Day */}
          <div className="card">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {selectedDay} Schedule ({currentLessons.length} Lessons)
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Showing stream: <strong>{selectedGroup === 'all' ? 'Combined Pilot' : selectedGroup}</strong>
                </span>
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-info)',
                backgroundColor: 'var(--color-info-bg)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontWeight: 600
              }}>
                Day-Student Schedule: 8:30 AM – 2:45 PM
              </div>
            </div>

            {currentLessons.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Calendar size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  No lessons scheduled for this stream on {selectedDay}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Select another stream or check another day of the week.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentLessons.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '18px 20px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-light)',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Time Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FFFFFF',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--primary-navy)',
                      minWidth: '150px'
                    }}>
                      <Clock size={16} color="var(--accent-blue)" />
                      <span>{item.time}</span>
                    </div>

                    {/* Lesson Info */}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                          {item.subject}
                        </h4>
                        <span className={`badge ${item.classGroup === 'SS1 Dynamo' ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: '0.68rem' }}>
                          {item.classGroup}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} /> {item.room}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={13} /> {item.teacher}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase'
                    }}>
                      Period {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Academic Calendar & Term Events View */
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Term 1 Academic Calendar &amp; Deadlines
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Key assessment milestones, continuous assessment testing windows, and school events
              </p>
            </div>
            <span className="badge badge-blue">Term 1 (2026/2027)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {calendarEvents.map(evt => (
              <div
                key={evt.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className={`badge ${evt.category === 'Exam / CA' ? 'badge-amber' : evt.category === 'Academic Deadline' ? 'badge-blue' : 'badge-green'}`}>
                      {evt.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Audience: {evt.audience}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    {evt.title}
                  </h4>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '700px' }}>
                    {evt.description}
                  </p>
                </div>

                <div style={{
                  padding: '8px 14px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  textAlign: 'right'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                    {evt.date}
                  </div>
                  {evt.time && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {evt.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
