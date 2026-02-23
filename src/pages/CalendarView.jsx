import React, { useState } from 'react';
import { Menu, Clock, MapPin, Plus, X, Car, PersonStanding, Bus, MoreVertical, Cpu, Pencil, Trash2, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './CalendarView.css';

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TRAVEL_MODES = [
    { id: 'drive', label: 'Drive', icon: Car },
    { id: 'walk', label: 'Walk', icon: PersonStanding },
    { id: 'transit', label: 'Transit', icon: Bus }
];

const CalendarView = () => {
    const { events, addEvent, deleteEvent } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [form, setForm] = useState({
        title: '', time: '', location: '',
        travelMode: 'drive', travelMinutes: 20, walkMinutes: 5,
        type: 'appointment'
    });

    const today = new Date();
    const currentDayIdx = today.getDay(); // 0=Sun
    const monthName = MONTH_NAMES[today.getMonth()];
    const year = today.getFullYear();

    // Get week days around today
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + (i - currentDayIdx));
        weekDays.push({
            dayName: DAY_NAMES_SHORT[i],
            date: d.getDate(),
            isSunday: i === 0,
            isActive: i === currentDayIdx,
            fullDate: d
        });
    }

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

    const getTravelIcon = (mode) => mode === 'transit' ? Bus : mode === 'walk' ? PersonStanding : Car;

    const todayDateStr = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="calendar-container">
            {/* Hamburger Menu */}
            <button className="cal-menu-btn" onClick={() => { }}>
                <Menu size={24} />
            </button>

            {/* Month Title */}
            <h2 className="cal-month-title">{monthName} {year}</h2>

            {/* Week Strip */}
            <div className="cal-week-strip">
                {weekDays.map((day, i) => (
                    <div key={i} className={`cal-day ${day.isActive ? 'active' : ''} ${day.isSunday ? 'sunday' : ''}`}>
                        <span className="cal-day-name">{day.dayName}</span>
                        <span className="cal-day-num">{day.date}</span>
                    </div>
                ))}
            </div>

            {/* Today Row */}
            <div className="cal-today-row">
                <span className="cal-today-label">Today</span>
                <button className="cal-add-event-btn" onClick={() => setShowForm(true)}>
                    <span>+ Add Event</span>
                </button>
            </div>

            {/* Event Cards */}
            <div className="cal-events">
                {events.length === 0 && (
                    <div className="cal-empty">
                        <Clock size={40} color="#E2E2E2" />
                        <p>No events planned</p>
                        <span>Tap "+ Add Event" to create one</span>
                    </div>
                )}

                {events.map((event) => {
                    const TravelIcon = getTravelIcon(event.travelMode);
                    return (
                        <div key={event.id} className="cal-event-card">
                            {/* Top: SMART PLAN + menu */}
                            <div className="cal-event-top">
                                <div className="cal-smart-label">
                                    <Cpu size={16} strokeWidth={1.5} />
                                    <span>SMART PLAN</span>
                                </div>
                                <button className="cal-event-menu-btn" onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}>
                                    <MoreVertical size={14} />
                                </button>
                            </div>

                            {/* Actions Menu */}
                            {activeMenu === event.id && (
                                <div className="cal-event-actions-menu">
                                    <button onClick={() => { setActiveMenu(null); }}>
                                        <Pencil size={14} />
                                        <span>Edit</span>
                                    </button>
                                    <button className="delete-action" onClick={() => { deleteEvent(event.id); setActiveMenu(null); }}>
                                        <Trash2 size={14} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            )}

                            {/* Title */}
                            <h3 className="cal-event-title">{event.title}</h3>

                            {/* Location */}
                            {event.location && (
                                <div className="cal-event-location">
                                    <MapPin size={13} strokeWidth={1.5} />
                                    <span>{event.location}</span>
                                </div>
                            )}

                            {/* Info Pills */}
                            <div className="cal-event-pills">
                                <div className="cal-pill">
                                    <Bell size={14} strokeWidth={1.5} />
                                    <span>{formatTime(event.time)}</span>
                                </div>
                                <div className="cal-pill">
                                    <TravelIcon size={14} strokeWidth={1.5} />
                                    <span>{event.travelMinutes}min {event.travelMode}</span>
                                </div>
                            </div>

                            {/* Bottom: Avatars + View */}
                            <div className="cal-event-bottom">
                                <div className="cal-avatar-group">
                                    <div className="cal-avatar"></div>
                                    <div className="cal-avatar"></div>
                                    <div className="cal-avatar">
                                        <span className="cal-avatar-count">+3</span>
                                    </div>
                                </div>
                                <button className="cal-view-btn">
                                    <span>View</span>
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Date Section Divider */}
                {events.length > 0 && (
                    <>
                        <div className="cal-section-divider">
                            <hr className="cal-section-line" />
                        </div>
                        <h3 className="cal-section-date">{todayDateStr}</h3>

                        {/* Repeat event cards for 2nd section */}
                        {events.map((event) => {
                            const TravelIcon = getTravelIcon(event.travelMode);
                            return (
                                <div key={`s2-${event.id}`} className="cal-event-card">
                                    <div className="cal-event-top">
                                        <div className="cal-smart-label">
                                            <Cpu size={16} strokeWidth={1.5} />
                                            <span>SMART PLAN</span>
                                        </div>
                                        <button className="cal-event-menu-btn" onClick={() => setActiveMenu(activeMenu === `s2-${event.id}` ? null : `s2-${event.id}`)}>
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>

                                    {activeMenu === `s2-${event.id}` && (
                                        <div className="cal-event-actions-menu">
                                            <button onClick={() => setActiveMenu(null)}>
                                                <Pencil size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button className="delete-action" onClick={() => { deleteEvent(event.id); setActiveMenu(null); }}>
                                                <Trash2 size={14} />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    )}

                                    <h3 className="cal-event-title">{event.title}</h3>

                                    {event.location && (
                                        <div className="cal-event-location">
                                            <MapPin size={13} strokeWidth={1.5} />
                                            <span>{event.location}</span>
                                        </div>
                                    )}

                                    <div className="cal-event-pills">
                                        <div className="cal-pill">
                                            <Bell size={14} strokeWidth={1.5} />
                                            <span>{formatTime(event.time)}</span>
                                        </div>
                                        <div className="cal-pill">
                                            <TravelIcon size={14} strokeWidth={1.5} />
                                            <span>{event.travelMinutes}min {event.travelMode}</span>
                                        </div>
                                    </div>

                                    <div className="cal-event-bottom">
                                        <div className="cal-avatar-group">
                                            <div className="cal-avatar"></div>
                                            <div className="cal-avatar"></div>
                                            <div className="cal-avatar">
                                                <span className="cal-avatar-count">+3</span>
                                            </div>
                                        </div>
                                        <button className="cal-view-btn">
                                            <span>View</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
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
