import React, { useState, useRef, useEffect } from 'react';
import { Menu, Clock, MapPin, Plus, X, Car, PersonStanding, Bus, MoreVertical, Cpu, Pencil, Trash2, Bell, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import IOSTimePicker from '../components/IOSTimePicker';
import AddressInput from '../components/AddressInput';
import { getDirections } from '../services/MapboxService';
import './CalendarView.css';

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TRAVEL_MODES = [
    { id: 'drive', label: 'Drive', icon: Car },
    { id: 'walk', label: 'Walk', icon: PersonStanding },
    { id: 'transit', label: 'Transit', icon: Bus }
];

const COLOR_PRESETS = [
    '#FF3C5D', '#FF9500', '#34C759',
    '#5E5CE6', '#007AFF', '#AF52DE'
];

const toDateStr = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const CalendarView = () => {
    const { events, addEvent, updateEvent, deleteEvent, homeLocation } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [daysToShow, setDaysToShow] = useState(14);
    const [expanded, setExpanded] = useState(false);
    const scrollRef = useRef(null);

    const today = new Date();
    const todayStr = toDateStr(today);

    // Start from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState(todayStr);

    const emptyForm = {
        title: '', time: '09:00', location: '', locationCoords: null,
        travelMode: 'drive', travelMinutes: 0, walkMinutes: 0,
        type: 'appointment', color: '#FF3C5D', date: todayStr
    };

    const [form, setForm] = useState(emptyForm);

    // Build array of days: starts from yesterday (-1)
    const calendarDays = [];
    for (let i = -1; i < daysToShow; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        const dateStr = toDateStr(d);
        const dayEvents = events.filter(e => e.date === dateStr);
        calendarDays.push({
            dayName: DAY_NAMES_SHORT[d.getDay()],
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
            dateStr,
            isToday: i === 0,
            isYesterday: i === -1,
            isSunday: d.getDay() === 0,
            isSelected: dateStr === selectedDate,
            hasEvents: dayEvents.length > 0,
            eventColors: [...new Set(dayEvents.map(e => e.color || '#FF3C5D'))]
        });
    }

    // Selected date label
    const selDate = new Date(selectedDate + 'T00:00:00');
    const yesterdayStr = toDateStr(yesterday);
    const selLabel = selectedDate === todayStr ? 'Today' :
        selectedDate === yesterdayStr ? 'Yesterday' :
            selDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    // Selected month display
    const selMonth = MONTH_NAMES[selDate.getMonth()];
    const selYear = selDate.getFullYear();

    // Events for selected date
    const dateEvents = events.filter(e => e.date === selectedDate);

    const handleSelectDay = (dateStr) => {
        setSelectedDate(dateStr);
    };

    const handleShowMore = () => {
        setDaysToShow(prev => prev + 30);
    };

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    // Auto-calculate route from home
    const autoCalcRoute = async (destCoords, travelMode) => {
        if (!homeLocation?.coords || !destCoords) return { travel: 0, walk: 0 };
        try {
            const travelMin = await getDirections(homeLocation.coords, destCoords, travelMode);
            return { travel: travelMin || 0, walk: 0 };
        } catch {
            return { travel: 0, walk: 0 };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.time) return;

        // Auto-calc route if we have coords
        let travelMinutes = form.travelMinutes || 0;
        let walkMinutes = form.walkMinutes || 0;
        if (form.locationCoords && homeLocation?.coords) {
            const route = await autoCalcRoute(form.locationCoords, form.travelMode);
            travelMinutes = route.travel;
            walkMinutes = route.walk;
        }

        addEvent({
            title: form.title,
            time: form.time,
            date: selectedDate,
            color: form.color,
            location: form.location,
            locationCoords: form.locationCoords,
            travelMode: form.travelMode,
            travelMinutes,
            walkMinutes,
            type: form.type
        });
        setForm(emptyForm);
        setShowForm(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingEvent || !editingEvent.title || !editingEvent.time) return;

        let travelMinutes = editingEvent.travelMinutes || 0;
        let walkMinutes = editingEvent.walkMinutes || 0;
        if (editingEvent.locationCoords && homeLocation?.coords) {
            const route = await autoCalcRoute(editingEvent.locationCoords, editingEvent.travelMode);
            travelMinutes = route.travel;
            walkMinutes = route.walk;
        }

        updateEvent(editingEvent.id, {
            title: editingEvent.title,
            time: editingEvent.time,
            color: editingEvent.color,
            location: editingEvent.location,
            locationCoords: editingEvent.locationCoords,
            travelMode: editingEvent.travelMode,
            travelMinutes,
            walkMinutes
        });
        setEditingEvent(null);
    };

    const formatTime = (t) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const getTravelIcon = (mode) => mode === 'transit' ? Bus : mode === 'walk' ? PersonStanding : Car;

    const openEditModal = (event) => {
        setEditingEvent({ ...event });
        setActiveMenu(null);
    };

    return (
        <div className={`calendar-container ${showForm || editingEvent ? 'modal-open' : ''}`}>
            {/* Hamburger Menu */}
            <button className="cal-menu-btn" onClick={() => { }}>
                <Menu size={24} />
            </button>

            {/* Month Title */}
            <h2 className="cal-month-title">{selMonth} {selYear}</h2>

            {/* Horizontal Scrollable Day Strip */}
            <div className="cal-scroll-wrapper">
                <div className={`cal-week-strip ${expanded ? 'expanded' : ''}`} ref={scrollRef}>
                    {calendarDays.map((day) => (
                        <div
                            key={day.dateStr}
                            className={`cal-day ${day.isSelected ? 'active' : ''} ${day.isYesterday ? 'yesterday' : ''}`}
                            onClick={() => handleSelectDay(day.dateStr)}
                        >
                            <span className={`cal-day-name ${day.isSunday ? 'sunday-bold' : ''}`}>{day.dayName}</span>
                            <span className="cal-day-num">{day.date}</span>
                            {day.hasEvents && (
                                <div className="cal-day-dots">
                                    {day.eventColors.slice(0, 3).map((color, i) => (
                                        <span key={i} className="cal-day-dot" style={{ background: color }} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button className="cal-show-more-btn" onClick={handleShowMore}>
                        <ChevronRight size={18} />
                        <span>More</span>
                    </button>
                </div>
                <button className="cal-expand-toggle" onClick={toggleExpand}>
                    <ChevronDown size={16} className={expanded ? 'rotated' : ''} />
                    <span>{expanded ? 'Less' : 'Expand'}</span>
                </button>
            </div>

            {/* Today Row */}
            <div className="cal-today-row">
                <span className="cal-today-label">{selLabel}</span>
                <button className="cal-add-event-btn" onClick={() => setShowForm(true)}>
                    <span>+ Add Event</span>
                </button>
            </div>

            {/* Event Cards */}
            <div className="cal-events">
                {dateEvents.length === 0 && (
                    <div className="cal-empty">
                        <Clock size={40} color="#E2E2E2" />
                        <p>No events planned</p>
                        <span>Tap "+ Add Event" to create one</span>
                    </div>
                )}

                {dateEvents.map((event) => {
                    const TravelIcon = getTravelIcon(event.travelMode);
                    const eventColor = event.color || '#FF3C5D';
                    return (
                        <div key={event.id} className="cal-event-card">
                            {/* Top: SMART PLAN + menu */}
                            <div className="cal-event-top">
                                <div className="cal-smart-label" style={{ color: eventColor }}>
                                    <Cpu size={16} strokeWidth={1.5} style={{ color: eventColor }} />
                                    <span style={{ color: eventColor }}>SMART PLAN</span>
                                </div>
                                <button className="cal-event-menu-btn" onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}>
                                    <MoreVertical size={14} />
                                </button>
                            </div>

                            {/* Actions Menu */}
                            {activeMenu === event.id && (
                                <div className="cal-event-actions-menu">
                                    <button onClick={() => openEditModal(event)}>
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
                                <div className="cal-pill" style={{ background: `${eventColor}15` }}>
                                    <Bell size={14} strokeWidth={1.5} style={{ color: eventColor }} />
                                    <span style={{ color: eventColor }}>{formatTime(event.time)}</span>
                                </div>
                                <div className="cal-pill">
                                    <TravelIcon size={14} strokeWidth={1.5} />
                                    <span>{(event.travelMinutes || 0) + (event.walkMinutes || 0)}min {event.travelMode}</span>
                                </div>
                            </div>

                            {/* Bottom: Avatars */}
                            <div className="cal-event-bottom">
                                <div className="cal-avatar-group">
                                    <div className="cal-avatar"></div>
                                    <div className="cal-avatar"></div>
                                    <div className="cal-avatar">
                                        <span className="cal-avatar-count">+3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Event Modal */}
            {showForm && (
                <div className="cal-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="cal-modal cal-modal-fullscreen" onClick={(e) => e.stopPropagation()}>
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
                                <IOSTimePicker
                                    value={form.time}
                                    onChange={(time) => setForm(f => ({ ...f, time }))}
                                />
                            </div>
                            <div className="cal-form-group">
                                <label>Address</label>
                                <AddressInput
                                    value={{ address: form.location }}
                                    onChange={(loc) => setForm(f => ({
                                        ...f,
                                        location: loc.address,
                                        locationCoords: loc.coords
                                    }))}
                                    placeholder="Search address..."
                                />
                            </div>

                            {/* Color Picker */}
                            <div className="cal-form-group">
                                <label>Event Color</label>
                                <div className="cal-color-picker">
                                    {COLOR_PRESETS.map(color => (
                                        <button
                                            type="button"
                                            key={color}
                                            className={`cal-color-swatch ${form.color === color ? 'active' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setForm(f => ({ ...f, color }))}
                                        />
                                    ))}
                                </div>
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

                            <button type="submit" className="cal-form-submit">Add Event</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {editingEvent && (
                <div className="cal-modal-overlay" onClick={() => setEditingEvent(null)}>
                    <div className="cal-modal cal-modal-fullscreen" onClick={(e) => e.stopPropagation()}>
                        <div className="cal-modal-header">
                            <h3>Edit Event</h3>
                            <button className="cal-modal-close" onClick={() => setEditingEvent(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="cal-form">
                            <div className="cal-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={editingEvent.title}
                                    onChange={e => setEditingEvent(ev => ({ ...ev, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="cal-form-group">
                                <label>Time</label>
                                <IOSTimePicker
                                    value={editingEvent.time}
                                    onChange={(time) => setEditingEvent(ev => ({ ...ev, time }))}
                                />
                            </div>
                            <div className="cal-form-group">
                                <label>Address</label>
                                <AddressInput
                                    value={{ address: editingEvent.location }}
                                    onChange={(loc) => setEditingEvent(ev => ({
                                        ...ev,
                                        location: loc.address,
                                        locationCoords: loc.coords
                                    }))}
                                    placeholder="Search address..."
                                />
                            </div>

                            {/* Color Picker */}
                            <div className="cal-form-group">
                                <label>Event Color</label>
                                <div className="cal-color-picker">
                                    {COLOR_PRESETS.map(color => (
                                        <button
                                            type="button"
                                            key={color}
                                            className={`cal-color-swatch ${editingEvent.color === color ? 'active' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setEditingEvent(ev => ({ ...ev, color }))}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Travel mode selector */}
                            <div className="cal-form-group">
                                <label>Travel Mode</label>
                                <div className="cal-mode-selector">
                                    {TRAVEL_MODES.map(mode => (
                                        <button
                                            type="button"
                                            key={mode.id}
                                            className={`cal-mode-btn ${editingEvent.travelMode === mode.id ? 'active' : ''}`}
                                            onClick={() => setEditingEvent(ev => ({ ...ev, travelMode: mode.id }))}
                                        >
                                            <mode.icon size={16} />
                                            <span>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="cal-form-submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
