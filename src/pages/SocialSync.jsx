import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Hash, Share2, MessageCircle, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './SocialSync.css';

// Mock Data
const activeGroups = [
    { id: 1, name: 'Cinema Trip', members: 5, status: 'Active', time: '19:45' },
    { id: 2, name: 'Sunday Brunch', members: 3, status: 'Planned', time: 'Sunday 11:00' }
];

const groupMembers = [
    { id: 1, name: 'You', status: 'ontrack', progress: 75, avatar: 'https://placehold.co/100x100/007AFF/FFFFFF?text=Me' },
    { id: 2, name: 'Sarah', status: 'ontrack', progress: 60, avatar: 'https://placehold.co/100x100/FF9500/FFFFFF?text=S' },
    { id: 3, name: 'Mike', status: 'delayed', progress: 40, avatar: 'https://placehold.co/100x100/FF3B30/FFFFFF?text=M' },
    { id: 4, name: 'Emma', status: 'arrived', progress: 100, avatar: 'https://placehold.co/100x100/34C759/FFFFFF?text=E' },
    { id: 5, name: 'John', status: 'ontrack', progress: 80, avatar: 'https://placehold.co/100x100/5856D6/FFFFFF?text=J' },
];

const SocialSync = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list', 'join', 'create', 'detail'
    const [selectedGroup, setSelectedGroup] = useState(null);

    // --- SUB-COMPONENTS ---

    const GroupListView = () => (
        <div className="group-list-view">
            <div className="action-row">
                <Card className="action-card" onClick={() => setView('join')} padding="md">
                    <div className="icon-badge"><Hash size={20} /></div>
                    <span>Join via Code</span>
                </Card>
                <Card className="action-card" onClick={() => setView('create')} padding="md">
                    <div className="icon-badge badge-blue"><Plus size={20} /></div>
                    <span>Create Group</span>
                </Card>
            </div>

            <h3 className="section-title">Active Groups</h3>
            <div className="groups-list">
                {activeGroups.map(group => (
                    <Card
                        key={group.id}
                        className="group-item-card"
                        padding="md"
                        onClick={() => { setSelectedGroup(group); setView('detail'); }}
                    >
                        <div className="group-icon">
                            <Users size={20} />
                        </div>
                        <div className="group-info-list">
                            <h4 className="group-name">{group.name}</h4>
                            <span className="group-meta">{group.members} members • {group.time}</span>
                        </div>
                        <ChevronRight size={16} className="chevron-icon" />
                    </Card>
                ))}
            </div>
        </div>
    );

    const JoinGroupView = () => (
        <div className="form-view">
            <Card padding="lg">
                <h3>Join Group</h3>
                <p className="form-desc">Enter the 6-digit code shared by your friend.</p>
                <input type="text" placeholder="X Y Z - 1 2 3" className="code-input" />
                <Button variant="primary" fullWidth onClick={() => setView('list')}>Join Group</Button>
            </Card>
        </div>
    );

    const CreateGroupView = () => (
        <div className="form-view">
            <Card padding="lg">
                <h3>Create New Group</h3>
                <p className="form-desc">Set up a group for your next event.</p>
                <input type="text" placeholder="Group Name (e.g. Cinema)" className="text-input" />
                <Button variant="primary" fullWidth onClick={() => setView('list')}>Create & Invite</Button>
            </Card>
        </div>
    );

    const DetailView = () => (
        <div className="social-view">
            {/* Reuse existing Sync Circle logic */}
            <div className="sync-circle-container">
                <svg className="sync-svg" viewBox="0 0 300 300">
                    <circle cx="150" cy="150" r="120" className="sync-track" />
                    <circle cx="150" cy="30" r="8" className="destination-marker" />
                    {groupMembers.map((member) => {
                        const angleDeg = 90 + (member.progress / 100) * 180;
                        const r = 120;
                        const rad = (angleDeg * Math.PI) / 180;
                        const x = 150 + r * Math.cos(rad);
                        const y = 150 + r * Math.sin(rad);

                        return (
                            <g key={member.id} className="avatar-group">
                                <circle cx={x} cy={y} r="18" fill="var(--color-bg-app)" stroke={member.status === 'delayed' ? 'var(--color-brand-primary)' : 'var(--color-brand-primary)'} strokeWidth="2" />
                                <clipPath id={`clip-${member.id}`}><circle cx={x} cy={y} r="15" /></clipPath>
                                <image x={x - 15} y={y - 15} width="30" height="30" href={member.avatar} clipPath={`url(#clip-${member.id})`} />
                            </g>
                        );
                    })}
                </svg>
                <div className="center-info">
                    <span className="info-time">12m</span>
                    <span className="info-label">to go</span>
                </div>
            </div>

            <div className="members-list">
                {groupMembers.map(member => (
                    <Card key={member.id} className="member-card" padding="sm" variant={member.id === 1 ? 'glass' : 'default'}>
                        <div className="member-avatar">
                            <div className={`avatar-status status-${member.status}`}></div>
                            <img src={member.avatar} alt={member.name} className="avatar-img" />
                        </div>
                        <div className="member-info">
                            <span className="member-name">{member.name} {member.id === 1 && '(You)'}</span>
                            <span className="member-status-text">
                                {member.status === 'arrived' ? 'Arrived' : member.status === 'delayed' ? 'Delayed' : 'On Track'}
                            </span>
                        </div>
                        <div className="member-action">
                            {member.id !== 1 && member.status !== 'arrived' && (
                                <Button variant="ghost" size="sm" className="nudge-btn">Nudge</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

    return (
        <div className="social-container">
            <header className="social-header">
                {view !== 'list' ? (
                    <Button variant="ghost" size="sm" onClick={() => setView('list')} className="back-btn">
                        <ArrowLeft size={24} />
                    </Button>
                ) : <div style={{ width: 24 }} />} {/* Spacer */}

                <div className="header-title">
                    <h2>{view === 'detail' ? selectedGroup?.name : 'Groups'}</h2>
                    {view === 'detail' && <span className="group-status">Synced Arrival: {selectedGroup?.time}</span>}
                </div>

                {view === 'detail' ? (
                    <Button variant="ghost" size="sm" className="action-btn">
                        <Share2 size={24} />
                    </Button>
                ) : <div style={{ width: 24 }} />}
            </header>

            {view === 'list' && <GroupListView />}
            {view === 'join' && <JoinGroupView />}
            {view === 'create' && <CreateGroupView />}
            {view === 'detail' && <DetailView />}

            {view === 'detail' && (
                <footer className="social-footer">
                    <Button variant="primary" fullWidth>
                        <MessageCircle size={18} style={{ marginRight: 8 }} />
                        Group Chat
                    </Button>
                </footer>
            )}
        </div>
    );
};

export default SocialSync;
