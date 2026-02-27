import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Settings, Bell, Shield, LogOut, ChevronRight,
    Clock, Car, MapPin, FileText, Trash2, Info, Mail,
    Lock, Download, HelpCircle, Smartphone
} from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [userName] = useState(() => localStorage.getItem('punct_user_name') || 'User');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/welcome');
    };

    return (
        <div className="prof-container">
            {/* Header */}
            <header className="prof-header">
                <h1 className="prof-page-title">Settings</h1>
            </header>

            {/* Profile Hero */}
            <div className="prof-hero">
                <div className="prof-avatar">
                    <span className="prof-avatar-text">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="prof-name">{userName}</h2>
                <p className="prof-email">Punct Free Plan</p>
            </div>

            {/* Account Section */}
            <div className="prof-section">
                <h3 className="prof-section-title">Account</h3>
                <div className="prof-card">
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(94, 92, 230, 0.08)', color: '#5E5CE6' }}>
                                <User size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Display Name</span>
                                <span className="prof-item-value">{userName}</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(0, 122, 255, 0.08)', color: '#007AFF' }}>
                                <Mail size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Email</span>
                                <span className="prof-item-value">Not set</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(52, 199, 89, 0.08)', color: '#34C759' }}>
                                <Lock size={18} />
                            </div>
                            <span className="prof-item-label">Change Password</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                </div>
            </div>

            {/* Preferences Section */}
            <div className="prof-section">
                <h3 className="prof-section-title">Preferences</h3>
                <div className="prof-card">
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(255, 149, 0, 0.08)', color: '#FF9500' }}>
                                <Clock size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Ready Time</span>
                                <span className="prof-item-value">30 minutes</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(255, 60, 93, 0.08)', color: 'var(--color-brand)' }}>
                                <Car size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Default Travel</span>
                                <span className="prof-item-value">Driving</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(94, 92, 230, 0.08)', color: '#5E5CE6' }}>
                                <MapPin size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Home Address</span>
                                <span className="prof-item-value">Set location</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(0, 122, 255, 0.08)', color: '#007AFF' }}>
                                <Bell size={18} />
                            </div>
                            <span className="prof-item-label">Notifications</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                </div>
            </div>

            {/* Data & Privacy */}
            <div className="prof-section">
                <h3 className="prof-section-title">Data & Privacy</h3>
                <div className="prof-card">
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(52, 199, 89, 0.08)', color: '#34C759' }}>
                                <Download size={18} />
                            </div>
                            <span className="prof-item-label">Export Data</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(142, 142, 147, 0.08)', color: '#8E8E93' }}>
                                <Shield size={18} />
                            </div>
                            <span className="prof-item-label">Privacy Policy</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(142, 142, 147, 0.08)', color: '#8E8E93' }}>
                                <Trash2 size={18} />
                            </div>
                            <span className="prof-item-label">Clear History</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="prof-section">
                <h3 className="prof-section-title">About</h3>
                <div className="prof-card">
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(142, 142, 147, 0.08)', color: '#8E8E93' }}>
                                <Smartphone size={18} />
                            </div>
                            <div className="prof-item-text">
                                <span className="prof-item-label">Version</span>
                                <span className="prof-item-value">1.0.0</span>
                            </div>
                        </div>
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(142, 142, 147, 0.08)', color: '#8E8E93' }}>
                                <FileText size={18} />
                            </div>
                            <span className="prof-item-label">Terms of Service</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                    <div className="prof-divider" />
                    <div className="prof-item">
                        <div className="prof-item-left">
                            <div className="prof-item-icon" style={{ background: 'rgba(142, 142, 147, 0.08)', color: '#8E8E93' }}>
                                <HelpCircle size={18} />
                            </div>
                            <span className="prof-item-label">Help & Support</span>
                        </div>
                        <ChevronRight size={16} className="prof-item-chevron" />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="prof-section">
                <button className="prof-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
                <button className="prof-delete-btn">
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;
