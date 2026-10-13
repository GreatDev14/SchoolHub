import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  CheckSquare,
  Calendar,
  MoreHorizontal,
  X,
  Bell,
  FolderArchive,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSignOut: () => void;
  unreadAnnouncementsCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
  userProfile,
  onSignOut,
  unreadAnnouncementsCount
}) => {
  const bottomItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'classes', label: 'Classes', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'more', label: 'Menu', icon: MoreHorizontal }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 100,
            backdropFilter: 'blur(3px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%',
              maxWidth: '320px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 16px',
              animation: 'slideInLeft 200ms ease-out'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-navy)' }}>
                  School Hub
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Pilot SS1 Dynamo &amp; Horizon
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-page)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} color="var(--text-main)" />
              </button>
            </div>

            {/* User status */}
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: '8px',
              margin: '14px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-blue)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {userProfile.avatarInitials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{userProfile.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {userProfile.roleTitle}
                </div>
              </div>
            </div>

            {/* Drawer Links */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'classes', label: 'My Classes', icon: GraduationCap },
                { id: 'assignments', label: 'Assignments', icon: CheckSquare },
                { id: 'announcements', label: `Announcements ${unreadAnnouncementsCount > 0 ? `(${unreadAnnouncementsCount})` : ''}`, icon: Bell },
                { id: 'timetable', label: 'Timetable', icon: Calendar },
                { id: 'learning-centre', label: 'Learning Centre', icon: FolderArchive },
                { id: 'discussions', label: 'Class Discussions', icon: MessageSquare },
                { id: 'profile', label: 'Profile & Settings', icon: Settings }
              ].map((item) => {
                const isActive = currentPage === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-main)',
                      backgroundColor: isActive ? 'var(--accent-blue-soft)' : 'transparent',
                      textAlign: 'left',
                      minHeight: '44px'
                    }}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Exit button */}
            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  width: '100%',
                  borderRadius: '8px',
                  color: 'var(--color-danger)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  minHeight: '44px'
                }}
              >
                <LogOut size={18} />
                <span>Exit Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--bottom-nav-height)',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
          boxShadow: '0 -2px 10px rgba(15, 23, 42, 0.05)'
        }}
      >
        {bottomItems.map((item) => {
          const isActive = currentPage === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'more') {
                  // open drawer
                  // trigger callback
                  onNavigate('more');
                } else {
                  onNavigate(item.id);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '6px 12px',
                minWidth: '56px',
                minHeight: '44px',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                position: 'relative'
              }}
            >
              <IconComponent size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
