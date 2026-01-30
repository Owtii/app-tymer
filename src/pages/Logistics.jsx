import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Coffee, MapPin, Footprints, ParkingSquare } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Logistics.css';

const Logistics = () => {
    const navigate = useNavigate();

    const timelineEvents = [
        {
            id: 1,
            time: '07:30',
            duration: '30m',
            title: 'Wake Up & Ready',
            icon: <Coffee size={20} />,
            type: 'prep',
            status: 'completed'
        },
        {
            id: 2,
            time: '08:00',
            duration: '25m',
            title: 'Drive to City Center',
            subtext: 'Moderate Traffic (+5m)',
            icon: <Car size={20} />,
            type: 'travel',
            status: 'upcoming'
        },
        {
            id: 3,
            time: '08:35', /* 08:25 + 10m buffer in real app logic */
            duration: '10m',
            title: 'Find Parking',
            subtext: 'Structure A - Level 3',
            icon: <ParkingSquare size={20} />,
            type: 'parking',
            status: 'upcoming'
        },
        {
            id: 4,
            time: '08:45',
            duration: '15m',
            title: 'Walk to Clinic',
            icon: <Footprints size={20} />,
            type: 'walking',
            status: 'upcoming'
        },
        {
            id: 5,
            time: '09:00',
            title: 'Arrival',
            icon: <MapPin size={20} />,
            type: 'destination',
            status: 'upcoming',
            isLast: true
        }
    ];

    return (
        <div className="logistics-container">
            <header className="logistics-header">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={24} />
                </Button>
                <h2>Logistics Breakdown</h2>
                <div style={{ width: 40 }} /> {/* Spacer for balance */}
            </header>

            <main className="timeline-view">
                <div className="timeline-line"></div>

                {timelineEvents.map((event, index) => (
                    <div key={event.id} className={`timeline-item item-${event.status}`}>
                        <div className="timeline-time">
                            <span className="time-text">{event.time}</span>
                            {event.duration && <span className="duration-pill">{event.duration}</span>}
                        </div>

                        <div className="timeline-node">
                            <div className={`node-icon icon-${event.type}`}>
                                {event.icon}
                            </div>
                        </div>

                        <Card className="timeline-content" variant={event.status === 'upcoming' ? 'default' : 'glass'} padding="md">
                            <h3 className="event-title">{event.title}</h3>
                            {event.subtext && <p className="event-sub">{event.subtext}</p>}
                        </Card>
                    </div>
                ))}

                <div className="invisible-time-summary">
                    <Card variant="default" className="summary-card">
                        <h4>Total "Invisible Time"</h4>
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="stat-val">50m</span>
                                <span className="stat-label">Travel</span>
                            </div>
                            <div className="divider" />
                            <div className="stat">
                                <span className="stat-val">0m</span>
                                <span className="stat-label">Slack</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Logistics;
