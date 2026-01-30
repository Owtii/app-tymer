import React from 'react';
import { User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Profile</h1>
            </header>

            <div className="profile-hero">
                <div className="avatar-large">
                    <span className="avatar-text">A</span>
                </div>
                <h2 className="profile-name">Ali</h2>
                <p className="profile-email">ali@example.com</p>
            </div>

            <main className="settings-list">
                <section className="settings-group">
                    <h3 className="group-title">Preferences</h3>
                    <Card className="settings-card" padding="none">
                        <div className="setting-item">
                            <div className="setting-icon"><Settings size={20} /></div>
                            <span className="setting-label">General</span>
                        </div>
                        <div className="divider-h" />
                        <div className="setting-item">
                            <div className="setting-icon"><Bell size={20} /></div>
                            <span className="setting-label">Notifications</span>
                        </div>
                        <div className="divider-h" />
                        <div className="setting-item">
                            <div className="setting-icon"><Shield size={20} /></div>
                            <span className="setting-label">Privacy & Data</span>
                        </div>
                    </Card>
                </section>

                <section className="settings-group">
                    <Button variant="secondary" fullWidth className="logout-btn">
                        <LogOut size={18} style={{ marginRight: 8 }} />
                        Log Out
                    </Button>
                </section>
            </main>
        </div>
    );
};

export default Profile;
