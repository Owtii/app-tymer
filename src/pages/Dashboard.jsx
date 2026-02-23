import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, Sunrise, Clock, Home as HomeIcon, Car, Footprints, ChevronRight, Cpu, Plus, X, Bus, PersonStanding, CalendarOff, Pencil, Trash2, MapPin, Navigation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Dashboard.css';

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Dashboard = () => {
    const navigate = useNavigate();
    const { events, alarms, addAlarm, updateAlarm, deleteAlarm, toggleAlarm, getNextEvent, updateEvent, deleteEvent } = useAppContext();
    const [activeTab, setActiveTab] = useState('plans');
    const [now, setNow] = useState(new Date());
    const [editingAlarm, setEditingAlarm] = useState(null);
    const [showAddAlarm, setShowAddAlarm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null); // { type: 'alarm'|'event', id }
    const [newAlarm, setNewAlarm] = useState({
        name: '', time: '07:00', type: 'regular', smart: false, active: true,
        days: [false, true, true, true, true, true, false]
    });

    // Tick every second for live countdown
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    // Next upcoming event
    const nextEvent = useMemo(() => getNextEvent(), [events, now]);

    // Countdown to departure
    const countdown = useMemo(() => {
        if (!nextEvent) return null;
        const [h, m] = nextEvent.time.split(':').map(Number);
        const eventMin = h * 60 + m;
        const departMin = eventMin - (nextEvent.travelMinutes || 0) - (nextEvent.walkMinutes || 0);
        const nowTotalSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const departTotalSec = departMin * 60;
        const diff = departTotalSec - nowTotalSec;
        if (diff <= 0) return { hours: 0, min: 0, sec: 0, totalMin: 0, totalSec: 0 };
        return {
            hours: Math.floor(diff / 3600),
            min: Math.floor((diff % 3600) / 60),
            sec: diff % 60,
            totalMin: Math.floor(diff / 60),
            totalSec: diff
        };
    }, [nextEvent, now]);

    // Timer display: >24h = "24h+", >1min = "H:MM" or "MM", last min = "0:SS"
    const timeDisplay = useMemo(() => {
        if (!countdown) return '--:--';
        if (countdown.totalSec <= 0) return "0:00";
        if (countdown.hours >= 24) return "24h+";
        if (countdown.totalMin < 1) return `0:${countdown.sec.toString().padStart(2, '0')}`;
        if (countdown.hours > 0) return `${countdown.hours}:${countdown.min.toString().padStart(2, '0')}`;
        return `${countdown.min}`;
    }, [countdown]);

    const timerUnit = useMemo(() => {
        if (!countdown || countdown.totalSec <= 0) return '';
        if (countdown.hours >= 24) return '';
        if (countdown.totalMin < 1) return 'sec';
        if (countdown.hours > 0) return 'hrs';
        return 'min';
    }, [countdown]);

    // Format time
    const fmt = (t) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    // Calculate departure time for an event
    const getDepartTime = (event) => {
        const [h, m] = event.time.split(':').map(Number);
        const totalMin = h * 60 + m - (event.travelMinutes || 0) - (event.walkMinutes || 0);
        const dH = Math.floor(((totalMin % 1440) + 1440) % 1440 / 60);
        const dM = ((totalMin % 1440) + 1440) % 1440 % 60;
        const ampm = dH >= 12 ? 'PM' : 'AM';
        return `${dH % 12 || 12}:${dM.toString().padStart(2, '0')} ${ampm}`;
    };

    // Route progress: percentage of journey elapsed
    const routeProgress = useMemo(() => {
        if (!nextEvent || !countdown) return 0;
        const totalTravel = (nextEvent.travelMinutes || 0) + (nextEvent.walkMinutes || 0);
        if (totalTravel === 0) return 0;
        const elapsed = totalTravel - countdown.totalMin;
        return Math.max(0, Math.min(100, (elapsed / totalTravel) * 100));
    }, [nextEvent, countdown]);

    // Current leg label for route
    const currentLeg = useMemo(() => {
        if (!nextEvent || !countdown) return 'home';
        const totalTravel = (nextEvent.travelMinutes || 0) + (nextEvent.walkMinutes || 0);
        if (totalTravel === 0) return 'home';
        const elapsed = totalTravel - countdown.totalMin;
        if (elapsed <= 0) return 'home';
        if (elapsed <= (nextEvent.travelMinutes || 0)) return 'travel';
        return 'walk';
    }, [nextEvent, countdown]);

    // Filtered alarms (only regular now)
    const filteredAlarms = alarms.filter(a => a.type === 'regular');

    // Sleep calculation for alarm display
    const calcSleep = (alarmTime) => {
        const [h, m] = alarmTime.split(':').map(Number);
        const alarmMin = h * 60 + m;
        const nowMin = now.getHours() * 60 + now.getMinutes();
        let diff = alarmMin - nowMin;
        if (diff <= 0) diff += 1440;
        return `${Math.floor(diff / 60)}h ${diff % 60}m`;
    };

    // Date string
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    // Add alarm
    const handleAddAlarm = () => {
        if (!newAlarm.name || !newAlarm.time) return;
        addAlarm({ ...newAlarm, type: 'regular' });
        setNewAlarm({ name: '', time: '07:00', type: 'regular', smart: false, active: true, days: [false, true, true, true, true, true, false] });
        setShowAddAlarm(false);
    };

    // Edit alarm save
    const handleEditSave = () => {
        if (!editingAlarm) return;
        updateAlarm(editingAlarm.id, { name: editingAlarm.name, time: editingAlarm.time, days: editingAlarm.days, smart: editingAlarm.smart });
        setEditingAlarm(null);
    };

    // Edit event save
    const handleEventEditSave = () => {
        if (!editingEvent) return;
        updateEvent(editingEvent.id, {
            title: editingEvent.title, time: editingEvent.time, location: editingEvent.location,
            travelMode: editingEvent.travelMode, travelMinutes: Number(editingEvent.travelMinutes), walkMinutes: Number(editingEvent.walkMinutes)
        });
        setEditingEvent(null);
    };

    const TravelIcon = nextEvent?.travelMode === 'transit' ? Bus : nextEvent?.travelMode === 'walk' ? PersonStanding : Car;
    const getTravelIcon = (mode) => mode === 'transit' ? Bus : mode === 'walk' ? PersonStanding : Car;

    return (
        <div className="dash-container">
            {/* Header */}
            <header className="dash-header">
                <div className="dash-header-left">
                    <p className="dash-date">{dateStr}</p>
                    <h1 className="dash-greeting">{greeting},<br />Alex</h1>
                </div>
                <div className="dash-weather-pill">
                    <CloudRain size={16} strokeWidth={2} />
                    <span>Rain: 15° C</span>
                </div>
            </header>

            {/* Hero Widget Card */}
            {nextEvent ? (
                <section className="dash-hero-card">
                    {/* Top row */}
                    <div className="hero-top-row">
                        <div className="hero-event-info">
                            <TravelIcon size={18} color="#696969" />
                            <span className="hero-event-name">
                                {nextEvent.title.length > 18 ? nextEvent.title.substring(0, 18).toUpperCase() + '...' : nextEvent.title.toUpperCase()}
                            </span>
                        </div>
                        <div className="hero-top-actions">
                            <button className="hero-edit-btn" onClick={() => setEditingEvent({ ...nextEvent })}>
                                <Pencil size={15} color="#979797" />
                            </button>
                            <div className="hero-arrive-pill">
                                <span>Arrive {fmt(nextEvent.time)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timer + Status */}
                    <div className="hero-center">
                        <span className="hero-leave-label">LEAVE IN</span>
                        <div className="hero-timer-row">
                            <span className="hero-timer-value">{timeDisplay}</span>
                            {timerUnit && <span className="hero-timer-unit">{timerUnit}</span>}
                        </div>
                        <div className="hero-status">
                            <div className="status-dot-outer">
                                <div className="status-dot-inner"></div>
                            </div>
                            <span className="status-text">
                                {countdown && countdown.totalMin > 15 ? 'On time' : countdown && countdown.totalMin > 0 ? 'Leaving soon' : 'Time to go!'}
                            </span>
                        </div>
                    </div>

                    {/* Route Breakdown */}
                    <div className="hero-route">
                        <div className="route-header">
                            <span className="route-title">Route</span>
                            <span className="route-total">{(nextEvent.travelMinutes || 0) + (nextEvent.walkMinutes || 0)} min</span>
                        </div>

                        {/* Progress bar with position indicator */}
                        <div className="route-slider-wrapper">
                            <div className="route-slider-track">
                                <div className="route-slider-fill" style={{ width: `${routeProgress}%` }}></div>
                                <div className="route-slider-thumb" style={{ left: `${routeProgress}%` }}>
                                    <Navigation size={10} color="#FFFFFF" />
                                </div>
                            </div>
                        </div>

                        <div className="route-legs">
                            <div className={`route-leg ${currentLeg === 'home' ? 'current' : ''}`}>
                                <HomeIcon size={14} color={currentLeg === 'home' ? '#FF3C5D' : '#A1A1A1'} />
                                <span>Home</span>
                            </div>
                            <ChevronRight size={12} color="#D4D4D4" />
                            <div className={`route-leg ${currentLeg === 'travel' ? 'current' : ''}`}>
                                <TravelIcon size={14} color={currentLeg === 'travel' ? '#FF3C5D' : '#A1A1A1'} />
                                <span>{nextEvent.travelMinutes}m</span>
                            </div>
                            {nextEvent.walkMinutes > 0 && nextEvent.travelMode !== 'walk' && (
                                <>
                                    <ChevronRight size={12} color="#D4D4D4" />
                                    <div className={`route-leg ${currentLeg === 'walk' ? 'current' : ''}`}>
                                        <Footprints size={14} color={currentLeg === 'walk' ? '#FF3C5D' : '#A1A1A1'} />
                                        <span>{nextEvent.walkMinutes}m</span>
                                    </div>
                                </>
                            )}
                            <ChevronRight size={12} color="#D4D4D4" />
                            <div className="route-leg">
                                <MapPin size={14} color="#A1A1A1" />
                                <span>Arrive</span>
                            </div>
                        </div>

                        {nextEvent.location && (
                            <div className="route-destination">
                                <MapPin size={12} color="#979797" />
                                <span>{nextEvent.location}</span>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <section className="dash-hero-card dash-hero-empty">
                    <CalendarOff size={36} color="#E2E2E2" />
                    <h3 className="empty-title">No Upcoming Events</h3>
                    <p className="empty-subtitle">Add an event in your calendar to see it here</p>
                </section>
            )}

            {/* Section Tabs */}
            <div className="dash-section-header">
                <div className="dash-alarm-tabs">
                    <button
                        className={`dash-tab ${activeTab === 'plans' ? 'active' : ''}`}
                        onClick={() => setActiveTab('plans')}
                    >
                        <Sunrise size={13} />
                        <span>Plans</span>
                    </button>
                    <button
                        className={`dash-tab ${activeTab === 'alarm' ? 'active' : ''}`}
                        onClick={() => setActiveTab('alarm')}
                    >
                        <Clock size={13} />
                        <span>Alarm</span>
                    </button>
                </div>
            </div>

            {/* ========== PLANS TAB ========== */}
            {activeTab === 'plans' && (
                <div className="dash-alarms">
                    {events.length === 0 && (
                        <div className="alarm-empty">
                            <p>No plans for today</p>
                        </div>
                    )}
                    {events.map(event => {
                        const EventIcon = getTravelIcon(event.travelMode);
                        const totalTravel = (event.travelMinutes || 0) + (event.walkMinutes || 0);
                        return (
                            <div key={event.id} className="alarm-card">
                                <div className="alarm-card-top">
                                    <div className="alarm-label-row">
                                        <EventIcon size={14} color="#FF3C5D" />
                                        <span className="alarm-name-label smart-pink">{fmt(event.time)}</span>
                                    </div>
                                    <div className="alarm-actions">
                                        <button className="alarm-action-btn" onClick={() => setEditingEvent({ ...event })}>
                                            <Pencil size={14} color="#979797" />
                                        </button>
                                        <button className="alarm-action-btn" onClick={() => setConfirmDelete({ type: 'event', id: event.id })}>
                                            <Trash2 size={14} color="#979797" />
                                        </button>
                                    </div>
                                </div>

                                <div className="alarm-card-mid">
                                    <div className="alarm-time-col">
                                        <span className="alarm-time" style={{ fontSize: '28px', lineHeight: '34px' }}>{event.title}</span>
                                    </div>
                                </div>

                                <div className="plan-info-row">
                                    <div className="plan-detail-item">
                                        <EventIcon size={13} color="#979797" />
                                        <span>{totalTravel} min travel</span>
                                    </div>
                                    <div className="plan-detail-item">
                                        <Clock size={13} color="#979797" />
                                        <span>Depart {getDepartTime(event)}</span>
                                    </div>
                                </div>
                                {event.location && (
                                    <div className="plan-address">
                                        <MapPin size={12} color="#979797" />
                                        <span>{event.location}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ========== ALARM TAB ========== */}
            {activeTab === 'alarm' && (
                <div className="dash-alarms">
                    {filteredAlarms.length === 0 && (
                        <div className="alarm-empty">
                            <p>No alarms set</p>
                        </div>
                    )}
                    {filteredAlarms.map(alarm => (
                        <div key={alarm.id} className={`alarm-card ${!alarm.active ? 'alarm-off' : ''}`}>
                            <div className="alarm-card-top">
                                <div className="alarm-label-row">
                                    <Cpu size={14} color={alarm.smart ? '#FF3C5D' : '#979797'} />
                                    <span className={`alarm-name-label ${alarm.smart ? 'smart-pink' : ''}`}>
                                        {alarm.name || 'Alarm'}
                                    </span>
                                </div>
                                <span className="alarm-days-text">
                                    {DAY_NAMES.map((d, i) => (
                                        <span key={i} className={alarm.days[i] ? 'day-active' : 'day-inactive'}>{d} </span>
                                    ))}
                                </span>
                            </div>

                            <div className="alarm-card-mid">
                                <span className="alarm-time">{fmt(alarm.time)}</span>
                                <div className={`alarm-toggle ${alarm.active ? 'on' : ''}`} onClick={() => toggleAlarm(alarm.id)}>
                                    <div className="toggle-thumb" />
                                </div>
                            </div>

                            <div className="alarm-card-bottom">
                                <span className="alarm-sleep">{alarm.active ? calcSleep(alarm.time) + ' sleep' : ''}</span>
                                <div className="alarm-actions">
                                    <button className="alarm-action-btn" onClick={() => setEditingAlarm({ ...alarm })}>
                                        <Pencil size={14} color="#979797" />
                                    </button>
                                    <button className="alarm-action-btn" onClick={() => setConfirmDelete({ type: 'alarm', id: alarm.id })}>
                                        <Trash2 size={14} color="#979797" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button className="alarm-add-btn" onClick={() => setShowAddAlarm(true)}>
                        <Plus size={18} />
                        <span>Add Alarm</span>
                    </button>
                </div>
            )}

            {/* Add Alarm Modal */}
            {showAddAlarm && (
                <div className="alarm-modal-overlay" onClick={() => setShowAddAlarm(false)}>
                    <div className="alarm-modal" onClick={e => e.stopPropagation()}>
                        <div className="alarm-modal-header">
                            <h3>New Alarm</h3>
                            <button className="alarm-modal-close" onClick={() => setShowAddAlarm(false)}><X size={20} /></button>
                        </div>
                        <div className="alarm-form">
                            <div className="alarm-form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Meeting reminder" value={newAlarm.name} onChange={e => setNewAlarm(a => ({ ...a, name: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Time</label>
                                <input type="time" value={newAlarm.time} onChange={e => setNewAlarm(a => ({ ...a, time: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Days</label>
                                <div className="alarm-days-picker">
                                    {DAY_NAMES.map((d, i) => (
                                        <button key={i} type="button" className={`alarm-day-btn ${newAlarm.days[i] ? 'active' : ''}`}
                                            onClick={() => { const u = [...newAlarm.days]; u[i] = !u[i]; setNewAlarm(a => ({ ...a, days: u })); }}
                                        >{d}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="alarm-form-group">
                                <label className="alarm-smart-toggle"><span>Smart Alarm</span>
                                    <div className={`alarm-toggle small ${newAlarm.smart ? 'on' : ''}`} onClick={() => setNewAlarm(a => ({ ...a, smart: !a.smart }))}>
                                        <div className="toggle-thumb" />
                                    </div>
                                </label>
                            </div>
                            <button className="alarm-form-submit" onClick={handleAddAlarm}>Add Alarm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Alarm Modal */}
            {editingAlarm && (
                <div className="alarm-modal-overlay" onClick={() => setEditingAlarm(null)}>
                    <div className="alarm-modal" onClick={e => e.stopPropagation()}>
                        <div className="alarm-modal-header">
                            <h3>Edit Alarm</h3>
                            <button className="alarm-modal-close" onClick={() => setEditingAlarm(null)}><X size={20} /></button>
                        </div>
                        <div className="alarm-form">
                            <div className="alarm-form-group">
                                <label>Name</label>
                                <input type="text" value={editingAlarm.name} onChange={e => setEditingAlarm(a => ({ ...a, name: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Time</label>
                                <input type="time" value={editingAlarm.time} onChange={e => setEditingAlarm(a => ({ ...a, time: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Days</label>
                                <div className="alarm-days-picker">
                                    {DAY_NAMES.map((d, i) => (
                                        <button key={i} type="button" className={`alarm-day-btn ${editingAlarm.days[i] ? 'active' : ''}`}
                                            onClick={() => { const u = [...editingAlarm.days]; u[i] = !u[i]; setEditingAlarm(a => ({ ...a, days: u })); }}
                                        >{d}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="alarm-form-group">
                                <label className="alarm-smart-toggle"><span>Smart Alarm</span>
                                    <div className={`alarm-toggle small ${editingAlarm.smart ? 'on' : ''}`} onClick={() => setEditingAlarm(a => ({ ...a, smart: !a.smart }))}>
                                        <div className="toggle-thumb" />
                                    </div>
                                </label>
                            </div>
                            <button className="alarm-form-submit" onClick={handleEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {editingEvent && (
                <div className="alarm-modal-overlay" onClick={() => setEditingEvent(null)}>
                    <div className="alarm-modal" onClick={e => e.stopPropagation()}>
                        <div className="alarm-modal-header">
                            <h3>Edit Event</h3>
                            <button className="alarm-modal-close" onClick={() => setEditingEvent(null)}><X size={20} /></button>
                        </div>
                        <div className="alarm-form">
                            <div className="alarm-form-group">
                                <label>Title</label>
                                <input type="text" value={editingEvent.title} onChange={e => setEditingEvent(ev => ({ ...ev, title: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Time</label>
                                <input type="time" value={editingEvent.time} onChange={e => setEditingEvent(ev => ({ ...ev, time: e.target.value }))} />
                            </div>
                            <div className="alarm-form-group">
                                <label>Address</label>
                                <input type="text" value={editingEvent.location || ''} onChange={e => setEditingEvent(ev => ({ ...ev, location: e.target.value }))} />
                            </div>
                            <div className="cal-form-row">
                                <div className="alarm-form-group half">
                                    <label>Travel (min)</label>
                                    <input type="number" min="0" value={editingEvent.travelMinutes} onChange={e => setEditingEvent(ev => ({ ...ev, travelMinutes: e.target.value }))} />
                                </div>
                                <div className="alarm-form-group half">
                                    <label>Walk (min)</label>
                                    <input type="number" min="0" value={editingEvent.walkMinutes} onChange={e => setEditingEvent(ev => ({ ...ev, walkMinutes: e.target.value }))} />
                                </div>
                            </div>
                            <button className="alarm-form-submit" onClick={handleEventEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="alarm-modal-overlay" onClick={() => setConfirmDelete(null)}>
                    <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                        <div className="confirm-icon">
                            <Trash2 size={28} color="#FF3C5D" />
                        </div>
                        <h3 className="confirm-title">Delete {confirmDelete.type === 'alarm' ? 'Alarm' : 'Event'}?</h3>
                        <p className="confirm-subtitle">This action cannot be undone.</p>
                        <div className="confirm-buttons">
                            <button className="confirm-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
                            <button className="confirm-delete" onClick={() => {
                                if (confirmDelete.type === 'alarm') deleteAlarm(confirmDelete.id);
                                else deleteEvent(confirmDelete.id);
                                setConfirmDelete(null);
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
