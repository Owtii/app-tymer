import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, Plus, Trash2, X, Car, PersonStanding, Bus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './CalendarView.css';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const TRAVEL_MODES = [
    { id: 'drive', label: 'Drive', icon: Car },
    { id: 'walk', label: 'Walk', icon: PersonStanding },
    { id: 'transit', label: 'Transit', icon: Bus }
];

const CalendarView = () => {
    const { events, addEvent, deleteEvent } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: '', time: '', location: '',
        travelMode: 'drive', travelMinutes: 20, walkMinutes: 5,
        type: 'appointment'
    });

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const currentDayIdx = today.getDay();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.time) return;
        addEvent({
            ...form,
            travelMinutes: Number(form.travelMinutes),
            walkMinutes: Number(form.walkMinutes)
        });
        setForm({ title: '', time: '', location: '', travelMode: 'drive', travelMinutes: 20, walkMinutes: 5, type: 'appointment' });
        setShowForm(false);
    };

    const formatTime = (t) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <h2 className="cal-title">Schedule</h2>
                <button className="cal-add-btn" onClick={() => setShowForm(true)}>
                    <Plus size={18} />
                    <span>Add Event</span>
                </button>
            </header>

            {/* Week strip */}
            <div className="cal-week-strip">
                {DAY_LABELS.map((day, i) => {
                    const diff = i - currentDayIdx;
                    const d = new Date(today);
                    d.setDate(d.getDate() + diff);
                    return (
                        <div key={i} className={`cal-day ${i === currentDayIdx ? 'active' : ''}`}>
                            <span className="cal-day-name">{day}</span>
                            <span className="cal-day-num">{d.getDate()}</span>
                        </div>
                    );
                })}
            </div>

            {/* Date label */}
            <p className="cal-date-label">{dateStr}</p>

            {/* Event list */}
            <div className="cal-events">
                {events.length === 0 && (
                    <div className="cal-empty">
                        <Clock size={40} color="#E2E2E2" />
                        <p>No events planned</p>
                        <span>Tap "Add Event" to create one</span>
                    </div>
                )}

                {events.map((event) => (
                    <div key={event.id} className={`cal-event-card strip-${event.type || 'appointment'}`}>
                        <div className="cal-event-top">
                            <span className="cal-event-time">{formatTime(event.time)}</span>
                            <button className="cal-event-delete" onClick={() => deleteEvent(event.id)}>
                                <Trash2 size={15} />
                            </button>
                        </div>
                        <h4 className="cal-event-title">{event.title}</h4>
                        {event.location && (
                            <div className="cal-event-loc">
                                <MapPin size={13} />
                                <span>{event.location}</span>
                            </div>
                        )}
                        <div className="cal-event-travel">
                            <span className="cal-travel-pill">
                                {event.travelMode === 'drive' && <Car size={12} />}
                                {event.travelMode === 'walk' && <PersonStanding size={12} />}
                                {event.travelMode === 'transit' && <Bus size={12} />}
                                {event.travelMinutes}min {event.travelMode}
                            </span>
                            {event.walkMinutes > 0 && (
                                <span className="cal-travel-pill">
                                    <PersonStanding size={12} />
                                    {event.walkMinutes}min walk
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Event Modal */}
            {showForm && (
                <div className="cal-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="cal-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cal-modal-header">
                            <h3>New Event</h3>
                            <button className="cal-modal-close" onClick={() => setShowForm(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="cal-form">
                            <div className="cal-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="Dentist Appointment"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="cal-form-group">
                                <label>Time</label>
                                <input
                                    type="time"
                                    value={form.time}
                                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="cal-form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="123 Main St, NY"
                                    value={form.location}
                                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                />
                            </div>

                            {/* Travel mode selector */}
                            <div className="cal-form-group">
                                <label>Travel Mode</label>
                                <div className="cal-mode-selector">
                                    {TRAVEL_MODES.map(mode => (
                                        <button
                                            type="button"
                                            key={mode.id}
                                            className={`cal-mode-btn ${form.travelMode === mode.id ? 'active' : ''}`}
                                            onClick={() => setForm(f => ({ ...f, travelMode: mode.id }))}
                                        >
                                            <mode.icon size={16} />
                                            <span>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="cal-form-row">
                                <div className="cal-form-group half">
                                    <label>Travel (min)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.travelMinutes}
                                        onChange={e => setForm(f => ({ ...f, travelMinutes: e.target.value }))}
                                    />
                                </div>
                                <div className="cal-form-group half">
                                    <label>Walk (min)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.walkMinutes}
                                        onChange={e => setForm(f => ({ ...f, walkMinutes: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="cal-form-submit">Add Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
