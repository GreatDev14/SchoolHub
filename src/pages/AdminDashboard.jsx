import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Sparkles, Search, KeyRound, Flag, Check, X, PlusCircle } from 'lucide-react';
export const AdminDashboard = ({ userProfile, adminUsers, teacherRequests, classCodes, contentReports, onApproveTeacherRequest, onDeclineTeacherRequest, onRevokeClassCode, onGenerateClassCode, onDismissReport, onActionReport, onSwitchRole, onNavigate }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [roleFilter, setRoleFilter] = useState('all');
    const [searchUser, setSearchUser] = useState('');
    const [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
    const [newCodeName, setNewCodeName] = useState('');
    const [newCodeArm, setNewCodeArm] = useState('SS1 Dynamo');
    const [newCodeDesc, setNewCodeDesc] = useState('');
    const filteredUsers = adminUsers.filter(u => {
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        const matchesSearch = u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
            (u.classGroup && u.classGroup.toLowerCase().includes(searchUser.toLowerCase()));
        return matchesRole && matchesSearch;
    });
    const pendingTeacherRequestsCount = teacherRequests.filter(r => r.status === 'Pending Review').length;
    const pendingReportsCount = contentReports.filter(r => r.status === 'Pending Review').length;
    const handleCreateCode = (e) => {
        e.preventDefault();
        if (!newCodeName.trim())
            return;
        onGenerateClassCode({
            code: newCodeName.trim().toUpperCase(),
            classGroup: newCodeArm,
            description: newCodeDesc || `${newCodeArm} Student Access Pass`,
            maxUses: 35,
            currentUses: 0,
            expiresAt: '2026-12-31',
            status: 'Active'
        });
        setNewCodeName('');
        setNewCodeDesc('');
        setShowGenerateCodeModal(false);
    };
    return (<div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Header Greeting */}
      <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '28px',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)'
        }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#EDE9FE',
            color: '#6D28D9',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.74rem',
            fontWeight: 700,
            marginBottom: '8px'
        }}>
            <Sparkles size={13}/> Administration Console • Pilot Oversight
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            letterSpacing: '-0.03em',
            lineHeight: 1.2
        }}>
            Welcome, {userProfile.name}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Pilot oversight for <strong>SS1 Dynamo</strong> (32 Students) and <strong>SS1 Horizon</strong> (32 Students).
          </p>
        </div>

        {/* Quick Role Switcher Pills */}
        <div style={{
            backgroundColor: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Test As Another Persona
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onSwitchRole('student')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
              Enter as Student
            </button>
            <button onClick={() => onSwitchRole('teacher')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
              Enter as Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '2px',
            overflowX: 'auto'
        }}>
        {[
            { id: 'overview', label: 'Overview & Metrics' },
            { id: 'teacher-requests', label: `Teacher Approvals ${pendingTeacherRequestsCount > 0 ? `(${pendingTeacherRequestsCount})` : ''}`, badge: pendingTeacherRequestsCount },
            { id: 'class-codes', label: `Class Codes (${classCodes.filter(c => c.status === 'Active').length} Active)` },
            { id: 'moderation', label: `Content Reports ${pendingReportsCount > 0 ? `(${pendingReportsCount})` : ''}`, badge: pendingReportsCount },
            { id: 'directory', label: `User Directory (${adminUsers.length})` }
        ].map(tab => {
            const isActive = activeTab === tab.id;
            return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '8px 8px 0 0',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    border: isActive ? '1px solid var(--border-light)' : '1px solid transparent',
                    borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                    whiteSpace: 'nowrap',
                    transition: 'all 120ms ease'
                }}>
              <span>{tab.label}</span>
            </button>);
        })}
      </div>

      {/* Advisory Notice */}
      <div style={{
            padding: '14px 18px',
            backgroundColor: '#EFF6FF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#1E40AF',
            fontSize: '0.84rem'
        }}>
        <ShieldAlert size={20} color="#2563EB" style={{ flexShrink: 0 }}/>
        <div>
          <strong>Administrator Prototype Environment:</strong> Approval, code generation, and moderation actions operate strictly in local demonstration state. Real student and faculty records require an authorised school database and backend server.
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Pilot Scope Stats */}
          <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
            }}>
            <div className="card">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Enrolled Day Students</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
                64 Students
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>
                SS1 Dynamo (32) + SS1 Horizon (32)
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Approved Teachers</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
                8 Verified
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-warning)', fontWeight: 600, marginTop: '4px' }}>
                {pendingTeacherRequestsCount} Pending Approval
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Class Codes</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
                {classCodes.filter(c => c.status === 'Active').length} Codes
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>
                62 total invitations redeemed
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Weekly Lesson Periods</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '4px' }}>
                24 Periods
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>
                Zero room schedule clashes
              </div>
            </div>
          </div>

          {/* Arms Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            <div className="card" style={{ borderLeft: '4px solid #356AE6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-blue">PILOT ARM 1</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)' }}>● Active</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                SS1 Dynamo
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Mathematics, Physical Sciences &amp; Humanities Focus
              </p>
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
            }}>
                <span>Students: <strong>32 Day Students</strong></span>
                <span>Active Subjects: <strong>6</strong></span>
                <span>Code: <code style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>DYN-2026-MTH</code></span>
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #16845B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-green">PILOT ARM 2</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)' }}>● Active</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                SS1 Horizon
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Biological Sciences, Chemistry &amp; Social Sciences Focus
              </p>
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
            }}>
                <span>Students: <strong>32 Day Students</strong></span>
                <span>Active Subjects: <strong>6</strong></span>
                <span>Code: <code style={{ color: 'var(--color-success)', fontWeight: 700 }}>HRZ-2026-BIO</code></span>
              </div>
            </div>
          </div>
        </div>)}

      {/* TAB 2: TEACHER ACCESS REQUESTS QUEUE */}
      {activeTab === 'teacher-requests' && (<div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Teacher Verification &amp; Access Requests
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Teachers must be approved by an authorized administrator before receiving publishing and assignment permissions.
              </p>
            </div>
            <span className="badge badge-amber">
              {pendingTeacherRequestsCount} Pending Review
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {teacherRequests.map(req => (<div key={req.id} style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: req.status === 'Pending Review' ? '#FFFBEB' : '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-navy)' }}>
                      {req.teacherName}
                    </span>
                    <span className={`badge ${req.status === 'Approved' ? 'badge-green' : req.status === 'Declined' ? 'badge-red' : 'badge-amber'}`}>
                      {req.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Email: {req.email} • Subjects: <strong>{req.subjects}</strong> • Arm: <strong>{req.classGroup}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Requested: {req.requestedAt} • Note: "{req.notes}"
                  </div>
                </div>

                {req.status === 'Pending Review' ? (<div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onApproveTeacherRequest(req.id)} className="btn btn-sm" style={{ backgroundColor: 'var(--color-success)', color: '#FFFFFF' }}>
                      <Check size={14}/>
                      <span>Approve Teacher</span>
                    </button>
                    <button onClick={() => onDeclineTeacherRequest(req.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--color-danger)' }}>
                      <X size={14}/>
                      <span>Decline</span>
                    </button>
                  </div>) : (<div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Decision recorded in local demo state
                  </div>)}
              </div>))}
          </div>
        </div>)}

      {/* TAB 3: CLASS CODES & ENROLLMENT */}
      {activeTab === 'class-codes' && (<div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Class Codes &amp; Student Invitation Keys
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Manage school-issued entrance keys that allow students to join SS1 Dynamo and SS1 Horizon.
              </p>
            </div>
            <button onClick={() => setShowGenerateCodeModal(true)} className="btn btn-primary btn-sm">
              <PlusCircle size={15}/>
              <span>Generate New Code</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {classCodes.map(codeItem => (<div key={codeItem.id} style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: codeItem.status === 'Active' ? '#FFFFFF' : 'var(--bg-card-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px'
                }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <code style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    backgroundColor: 'var(--accent-blue-soft)',
                    color: 'var(--accent-blue)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                }}>
                      {codeItem.code}
                    </code>
                    <span className={`badge ${codeItem.classGroup === 'SS1 Dynamo' ? 'badge-blue' : 'badge-green'}`}>
                      {codeItem.classGroup}
                    </span>
                    <span className={`badge ${codeItem.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {codeItem.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {codeItem.description}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Usages: <strong>{codeItem.currentUses} / {codeItem.maxUses} seats used</strong> • Expires: {codeItem.expiresAt}
                  </div>
                </div>

                {codeItem.status === 'Active' && (<button onClick={() => onRevokeClassCode(codeItem.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--color-danger)' }}>
                    Revoke Code
                  </button>)}
              </div>))}
          </div>
        </div>)}

      {/* TAB 4: CONTENT MODERATION QUEUE */}
      {activeTab === 'moderation' && (<div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Content Moderation &amp; Flagged Posts
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Review discussion posts and notices flagged by students or teachers to maintain safe school conduct.
              </p>
            </div>
            <span className="badge badge-neutral">
              {contentReports.length} Total Reports
            </span>
          </div>

          {contentReports.length === 0 ? (<div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={36} color="var(--color-success)" style={{ margin: '0 auto 8px auto' }}/>
              <p style={{ fontWeight: 600 }}>Moderation queue is empty</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No flagged posts requiring administrator intervention.</p>
            </div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contentReports.map(rep => (<div key={rep.id} style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: rep.status === 'Pending Review' ? '#FEF2F2' : '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px'
                    }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-red"><Flag size={11}/> Flagged Content</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                        "{rep.targetTitle}"
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Reported by: {rep.reportedBy} • Reason: <em>"{rep.reason}"</em>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Timestamp: {rep.timestamp} • Status: <strong>{rep.status}</strong>
                    </div>
                  </div>

                  {rep.status === 'Pending Review' ? (<div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => onDismissReport(rep.id)} className="btn btn-secondary btn-sm">
                        Dismiss Flag
                      </button>
                      <button onClick={() => onActionReport(rep.id)} className="btn btn-sm" style={{ backgroundColor: 'var(--color-danger)', color: '#FFFFFF' }}>
                        Take Down Content
                      </button>
                    </div>) : (<span className="badge badge-neutral">{rep.status}</span>)}
                </div>))}
            </div>)}
        </div>)}

      {/* TAB 5: USER DIRECTORY */}
      {activeTab === 'directory' && (<div className="card">
          <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '14px'
            }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                Pilot User Directory ({filteredUsers.length} records)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Fictional accounts participating in the SS1 Dynamo &amp; SS1 Horizon pilot
              </p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'student', label: 'Students' },
                { id: 'teacher', label: 'Teachers' },
                { id: 'admin', label: 'Admins' }
            ].map(tab => (<button key={tab.id} onClick={() => setRoleFilter(tab.id)} className={`btn btn-sm ${roleFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '999px', fontSize: '0.78rem' }}>
                  {tab.label}
                </button>))}
            </div>
          </div>

          {/* User Search Input */}
          <div style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 14px',
                backgroundColor: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
            }}>
            <Search size={16} color="var(--text-muted)"/>
            <input type="text" placeholder="Search by name, demo email, or stream group..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                backgroundColor: 'transparent'
            }}/>
          </div>

          {/* Directory Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>NAME</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>ROLE</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>GROUP / STREAM</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>STATUS</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>LAST ACTIVE</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (<tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={`badge ${user.role === 'admin' ? 'badge-neutral' : user.role === 'teacher' ? 'badge-blue' : 'badge-green'}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                      {user.classGroup || 'Faculty Coordinator'}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--color-success)'
                }}>
                        <CheckCircle2 size={13}/> {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                      {user.lastActive}
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>)}

      {/* Generate Class Code Modal Dialog */}
      {showGenerateCodeModal && (<div className="modal-overlay" onClick={() => setShowGenerateCodeModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={20} color="var(--accent-blue)"/>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  Issue New Pilot Class Code
                </h3>
              </div>
              <button onClick={() => setShowGenerateCodeModal(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={18}/>
              </button>
            </div>

            <form onSubmit={handleCreateCode} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Code Identifier (Alphanumeric)</label>
                <input type="text" className="form-input" placeholder="e.g. DYN-TERM1-EXP" value={newCodeName} onChange={(e) => setNewCodeName(e.target.value)} style={{ textTransform: 'uppercase', fontWeight: 700 }} required/>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Target Class Arm</label>
                <select className="form-select" value={newCodeArm} onChange={(e) => setNewCodeArm(e.target.value)}>
                  <option value="SS1 Dynamo">SS1 Dynamo</option>
                  <option value="SS1 Horizon">SS1 Horizon</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description / Purpose</label>
                <input type="text" className="form-input" placeholder="e.g. Science Laboratory Entrance Pass" value={newCodeDesc} onChange={(e) => setNewCodeDesc(e.target.value)}/>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowGenerateCodeModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Issue Code (Local Demo)
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
