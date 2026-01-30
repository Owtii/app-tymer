import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './CalendarView.css';

const CalendarView = () => {
    const navigate = useNavigate();
    const today = 'Jan 26, 2026';

    const events = [
        {
            id: 1,
            title: 'Dentist Appointment',
            time: '09:00 - 10:00',
            location: 'Central Dental Clinic',
            type: 'appointment',
            logisticsAvailable: true
        },
        {
            id: 2,
            title: 'Team Sync',
            time: '13:00 - 14:00',
            location: 'Office Meeting Room 2',
            type: 'work',
            logisticsAvailable: false
        },
        {
            id: 3,
            title: 'Gym Session',
            time: '18:00 - 19:30',
            location: 'FitFirst Gym',
            type: 'personal',
            logisticsAvailable: true
        }
    ];

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <div className="date-selector">
                    <Button variant="ghost" size="sm">
                        <ChevronLeft size={20} />
                    </Button>
                    <h2>{today}</h2>
                    <Button variant="ghost" size="sm">
                        <ChevronRight size={20} />
                    </Button>
                </div>
                <Button variant="ghost" size="sm">
                    <CalendarIcon size={20} />
                </Button>
            </header>

            <div className="calendar-grid-mock">
                {/* Simple visual mock of week view */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className={`calendar-day ${i === 2 ? 'active' : ''}`}>
                        <span className="day-name">{day}</span>
                        <span className="day-num">{24 + i}</span>
                        {i === 2 && <div className="day-dot" />}
                    </div>
                ))}
            </div>

            <main className="schedule-list">
                <h3 className="section-title">Schedule</h3>

                {events.map((event) => (
                    <Card key={event.id} className="event-item" padding="md">
                        <div className={`event-strip strip-${event.type}`} />

                        <div className="event-content">
                            <div className="event-time-loc">
                                <span className="ev-time">{event.time}</span>
                                <span className="ev-loc">
                                    <MapPin size={12} /> {event.location}
                                </span>
                            </div>
                            <h4 className="ev-title">{event.title}</h4>

                            {event.logisticsAvailable && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="route-btn"
                                    onClick={() => navigate('/logistics')}
                                >
                                    <Clock size={14} style={{ marginRight: 4 }} />
                                    View Route
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </main>
        </div>
    );
};

export default CalendarView;
