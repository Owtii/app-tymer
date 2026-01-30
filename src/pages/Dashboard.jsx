import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, CloudRain, Clock, ChevronRight, Plus, Sunrise } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState('12:45');
    const [activeTab, setActiveTab] = useState('morning');

    useEffect(() => {
        const timer = setInterval(() => {
            const [min, sec] = timeLeft.split(':').map(Number);
            let newMin = min;
            let newSec = sec - 1;
            if (newSec < 0) {
                newSec = 59;
                newMin -= 1;
            }
            setTimeLeft(`${newMin}:${newSec.toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const alarms = [
        { id: 1, time: '07:30', days: 'Mon, Tue, Wed, Thu, Fri', label: 'Work', active: true, type: 'morning' },
        { id: 2, time: '09:00', days: 'Sat, Sun', label: 'Weekend Drift', active: false, type: 'morning' },
        { id: 3, time: '14:30', days: 'Mon', label: 'Pick up kids', active: true, type: 'regular' },
    ];

    const filteredAlarms = alarms.filter(a => activeTab === 'morning' ? a.type === 'morning' : a.type === 'regular');

    // New Segment Logic with Gradient
    // New Segment Logic with Gradient
    const renderSegments = () => {
        const segments = [];
        const count = 48; // Total segments
        const radius = 90;
        const center = 100;

        const activeIndex = 36; // ~75% full

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 360;
            const radian = (angle - 90) * (Math.PI / 180);

            const isActive = i < activeIndex;

            const length = isActive ? 12 : 6;
            const width = isActive ? 4 : 2;

            const x1 = center + (radius - length / 2) * Math.cos(radian);
            const y1 = center + (radius - length / 2) * Math.sin(radian);
            const x2 = center + (radius + length / 2) * Math.cos(radian);
            const y2 = center + (radius + length / 2) * Math.sin(radian);

            let color = '#E6E6E6'; // Default inactive grey
            if (isActive) {
                // Red Gradient Logic: Bright Red -> Deep Red
                const ratio = i / activeIndex;

                if (ratio < 0.33) color = '#FF3B30'; // Bright Red (Start)
                else if (ratio < 0.66) color = '#FF2D55'; // Deep Red (Middle)
                else color = '#D70015'; // Darker Red (End)
            }

            segments.push(
                <line
                    key={i}
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke={color}
                    strokeWidth={width}
                    strokeLinecap="round"
                    style={{ transition: 'all 0.3s ease' }}
                />
            );
        }
        return segments;
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="user-greeting">
                    <h1 className="greeting-text">Good Morning, Ali</h1>
                    <p className="date-text">Tuesday, Jan 26</p>
                </div>
                <div className="header-actions">
                    <Button variant="ghost" size="sm" className="icon-btn">
                        <Bell size={20} />
                    </Button>
                </div>
            </header>

            <main className="dashboard-main">
                {/* Timer */}
                <section className="timer-section">
                    <div className="timer-ring-container">
                        <div className="timer-content">
                            <span className="timer-label">Leave in</span>
                            <span className="timer-value">{timeLeft}</span>
                            <span className="timer-sub">min</span>
                        </div>

                        <svg className="timer-svg" viewBox="0 0 200 200">
                            {renderSegments()}
                        </svg>
                    </div>
                </section>

                {/* Sync Info */}
                <section className="sync-section">
                    <Card padding="lg" className="next-event-card">
                        <div className="event-header">
                            <div className="event-info">
                                <span className="event-label">Up Next</span>
                                <h3 className="event-title">Dentist Appointment</h3>
                            </div>
                            <div className="weather-pill">
                                <CloudRain size={14} />
                                <span>Rainy</span>
                            </div>
                        </div>

                        <div className="event-details">
                            <div className="detail-row">
                                <Clock size={16} className="detail-icon" />
                                <span>09:00 AM - 10:00 AM</span>
                            </div>
                            <div className="detail-row">
                                <MapPin size={16} className="detail-icon" />
                                <span>Central Dental Clinic, NY</span>
                            </div>
                        </div>

                        <div className="event-actions">
                            <Button
                                variant="secondary" // Changed to secondary/grey
                                fullWidth
                                onClick={() => navigate('/logistics')}
                                className="logistics-btn" // Custom class for red accent text
                                style={{ justifyContent: 'space-between' }}
                            >
                                <span>View Logistics</span>
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* Alarms Section */}
                <section className="alarms-section">
                    <div className="alarms-tabs">
                        <button
                            className={`alarm-tab ${activeTab === 'morning' ? 'active' : ''}`}
                            onClick={() => setActiveTab('morning')}
                        >
                            <Sunrise size={16} />
                            Morning
                        </button>
                        <button
                            className={`alarm-tab ${activeTab === 'regular' ? 'active' : ''}`}
                            onClick={() => setActiveTab('regular')}
                        >
                            <Clock size={16} />
                            Regular
                        </button>
                    </div>

                    <div className="alarms-list">
                        {filteredAlarms.map(alarm => (
                            <Card key={alarm.id} className="alarm-card" padding="md">
                                <div className="alarm-info">
                                    <span className="alarm-time">{alarm.time}</span>
                                    <span className="alarm-days">{alarm.days}</span>
                                    <span className="alarm-label">{alarm.label}</span>
                                </div>
                                <div className={`alarm-toggle ${alarm.active ? 'active' : ''}`}>
                                    <div className="toggle-thumb" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

            </main>

            <button className="fab-add">
                <Plus size={24} />
            </button>
        </div>
    );
};

export default Dashboard;
