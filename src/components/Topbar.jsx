import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronRight, CheckCheck } from 'lucide-react';
export const Topbar = ({ pageTitle, breadcrumbs = ['School Hub'], userProfile, notifications, onMarkNotificationRead, onMarkAllNotificationsRead, onNavigate, onOpenMobileMenu, onSearchClick }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return (<header style={{
            height: 'var(--topbar-height)',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            boxShadow: 'var(--shadow-xs)'
        }}>
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button onClick={onOpenMobileMenu} aria-label="Open mobile menu" className="mobile-only-btn" style={{
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <Menu size={20} color="var(--primary-navy)"/>
        </button>

        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            fontWeight: 500
        }}>
            {breadcrumbs.map((crumb, idx) => (<React.Fragment key={idx}>
                {idx > 0 && <ChevronRight size={12} color="var(--text-muted)"/>}
                <span>{crumb}</span>
              </React.Fragment>))}
            <ChevronRight size={12} color="var(--text-muted)"/>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{pageTitle}</span>
          </div>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--primary-navy)',
            letterSpacing: '-0.02em',
            marginTop: '1px'
        }}>
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications & User Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Search Bar Button */}
        <button onClick={onSearchClick} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-page)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 14px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            minWidth: '180px',
            transition: 'all 120ms ease'
        }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}>
          <Search size={15} color="var(--text-secondary)"/>
          <span style={{ flex: 1, textAlign: 'left' }}>Quick find...</span>
          <kbd style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '4px',
            padding: '1px 5px',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            fontWeight: 600
        }}>
            /
          </kbd>
        </button>

        {/* Notifications Button with Popover */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(!showNotifications)} aria-label="View notifications" style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: showNotifications ? 'var(--accent-blue-soft)' : 'var(--bg-page)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: showNotifications ? 'var(--accent-blue)' : 'var(--text-main)',
            transition: 'all 120ms ease'
        }}>
            <Bell size={18}/>
            {unreadCount > 0 && (<span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--color-danger)',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 800,
                minWidth: '18px',
                height: '18px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                border: '2px solid #FFFFFF'
            }}>
                {unreadCount}
              </span>)}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (<div style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-light)',
                zIndex: 100,
                overflow: 'hidden'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-card-subtle)'
            }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                  Notifications ({unreadCount} new)
                </div>
                {unreadCount > 0 && (<button onClick={onMarkAllNotificationsRead} style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <CheckCheck size={14}/> Mark all read
                  </button>)}
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (<div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    No notifications
                  </div>) : (notifications.map((item) => (<div key={item.id} onClick={() => {
                    onMarkNotificationRead(item.id);
                    if (item.linkPage) {
                        onNavigate(item.linkPage);
                        setShowNotifications(false);
                    }
                }} style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: item.isRead ? '#FFFFFF' : 'var(--accent-blue-soft)',
                    cursor: 'pointer',
                    transition: 'background 120ms ease'
                }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.isRead ? '#FFFFFF' : 'var(--accent-blue-soft)')}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--primary-navy)' }}>
                          {item.title}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {item.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                        {item.message}
                      </p>
                    </div>)))}
              </div>

              <div style={{
                padding: '10px 16px',
                textAlign: 'center',
                borderTop: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card-subtle)'
            }}>
                <button onClick={() => {
                onNavigate('announcements');
                setShowNotifications(false);
            }} style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                  View Announcements Feed &rarr;
                </button>
              </div>
            </div>)}
        </div>

        {/* User Pill Button (navigates to Profile) */}
        <button onClick={() => onNavigate('profile')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px 4px 6px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-card)',
            transition: 'all 120ms ease'
        }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue-border)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
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
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>
              {userProfile.name.split(' ')[0]}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              {userProfile.role.toUpperCase()}
            </div>
          </div>
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mobile-only-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>);
};
