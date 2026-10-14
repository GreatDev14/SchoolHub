import React from 'react';
import { LayoutDashboard, GraduationCap, CheckSquare, Bell, Calendar, FolderArchive, MessageSquare, Settings, LogOut, BookOpen } from 'lucide-react';
export const Sidebar = ({ currentPage, onNavigate, userProfile, onSignOut, unreadAnnouncementsCount, pendingAssignmentsCount }) => {
    const isTeacher = userProfile.role === 'teacher';
    const isAdmin = userProfile.role === 'admin';
    const navItems = [
        {
            id: 'dashboard',
            label: isTeacher ? 'Teacher Dashboard' : isAdmin ? 'Admin Dashboard' : 'Dashboard',
            icon: LayoutDashboard,
            badge: null
        },
        {
            id: 'classes',
            label: isTeacher ? 'My Classes & Students' : 'My Classes',
            icon: GraduationCap,
            badge: '2 Groups'
        },
        {
            id: 'assignments',
            label: 'Assignments',
            icon: CheckSquare,
            badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount}` : null,
            badgeVariant: 'amber'
        },
        {
            id: 'announcements',
            label: 'Announcements',
            icon: Bell,
            badge: unreadAnnouncementsCount > 0 ? `${unreadAnnouncementsCount} new` : null,
            badgeVariant: 'blue'
        },
        {
            id: 'timetable',
            label: 'Timetable',
            icon: Calendar,
            badge: null
        },
        {
            id: 'learning-centre',
            label: 'Learning Centre',
            icon: FolderArchive,
            badge: null
        },
        {
            id: 'discussions',
            label: 'Class Discussions',
            icon: MessageSquare,
            badge: null
        }
    ];
    return (<aside style={{
            width: 'var(--sidebar-width)',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 36px)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            userSelect: 'none'
        }}>
      {/* Brand Header */}
      <div style={{
            padding: '22px 20px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-navy)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(23, 36, 58, 0.25)'
        }}>
            <BookOpen size={20} color="#FFFFFF" strokeWidth={2.4}/>
          </div>
          <div>
            <div style={{
            fontWeight: 800,
            fontSize: '1.08rem',
            color: 'var(--primary-navy)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
        }}>
              School Hub
            </div>
            <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
            fontWeight: 500
        }}>
              Pilot SS1 • Dynamo &amp; Horizon
            </div>
          </div>
        </div>
      </div>

      {/* Role Pill Card */}
      <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
        <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: userProfile.role === 'admin' ? '#7C3AED' : userProfile.role === 'teacher' ? '#0D9488' : '#356AE6',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          {userProfile.avatarInitials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 700,
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }}>
            {userProfile.name}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }}>
            {userProfile.roleTitle}
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        }}>
        <div style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '6px 10px',
            marginBottom: '2px'
        }}>
          Platform Modules
        </div>

        {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const IconComponent = item.icon;
            return (<button key={item.id} onClick={() => onNavigate(item.id)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-main)',
                    backgroundColor: isActive ? 'var(--accent-blue-soft)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
                    textAlign: 'left',
                    transition: 'all 120ms ease'
                }} onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
                        e.currentTarget.style.color = 'var(--primary-navy)';
                    }
                }} onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-main)';
                    }
                }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <IconComponent size={18} color={isActive ? 'var(--accent-blue)' : '#64748B'} strokeWidth={isActive ? 2.3 : 1.8}/>
                <span>{item.label}</span>
              </div>

              {item.badge && (<span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '999px',
                        backgroundColor: item.badgeVariant === 'blue' ? 'var(--accent-blue-soft)' : item.badgeVariant === 'amber' ? 'var(--color-warning-bg)' : '#F1F5F9',
                        color: item.badgeVariant === 'blue' ? 'var(--accent-blue)' : item.badgeVariant === 'amber' ? 'var(--color-warning)' : '#475569',
                        border: `1px solid ${item.badgeVariant === 'blue' ? 'var(--accent-blue-border)' : item.badgeVariant === 'amber' ? 'var(--color-warning-border)' : '#E2E8F0'}`
                    }}>
                  {item.badge}
                </span>)}
            </button>);
        })}
      </nav>

      {/* Footer Navigation */}
      <div style={{
            padding: '14px 12px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        }}>
        <button onClick={() => onNavigate('profile')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: currentPage === 'profile' ? 700 : 500,
            color: currentPage === 'profile' ? 'var(--accent-blue)' : 'var(--text-secondary)',
            backgroundColor: currentPage === 'profile' ? 'var(--accent-blue-soft)' : 'transparent'
        }}>
          <Settings size={18} color={currentPage === 'profile' ? 'var(--accent-blue)' : '#64748B'}/>
          <span>Profile &amp; Settings</span>
        </button>

        <button onClick={onSignOut} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--color-danger)',
            backgroundColor: 'transparent'
        }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-danger-bg)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
          <LogOut size={18} color="var(--color-danger)"/>
          <span>Exit to Welcome</span>
        </button>
      </div>
    </aside>);
};
