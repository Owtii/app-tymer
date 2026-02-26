import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Seed data
const SEED_EVENTS = [
    {
        id: 'evt-1',
        title: 'Dentist Appointment',
        time: '13:30',
        date: getTodayStr(),
        color: '#FF3C5D',
        duration: 60,
        location: 'Central Dental Clinic, NY',
        travelMode: 'drive',
        travelMinutes: 30,
        walkMinutes: 10,
        type: 'appointment'
    },
    {
        id: 'evt-2',
        title: 'Team Sync',
        time: '15:00',
        date: getTodayStr(),
        color: '#5E5CE6',
        duration: 60,
        location: 'Office Meeting Room 2',
        travelMode: 'drive',
        travelMinutes: 20,
        walkMinutes: 5,
        type: 'work'
    }
];

const SEED_ALARMS = [
    {
        id: 'alm-1',
        name: 'Work Wake Up',
        time: '07:00',
        type: 'morning',
        smart: true,
        active: true,
        days: [false, true, true, true, true, true, false] // Mon-Fri
    },
    {
        id: 'alm-2',
        name: 'Weekend Drift',
        time: '09:00',
        type: 'morning',
        smart: true,
        active: true,
        days: [true, false, false, false, false, false, true] // Sat-Sun
    },
    {
        id: 'alm-3',
        name: 'Pick up kids',
        time: '14:30',
        type: 'regular',
        smart: false,
        active: true,
        days: [false, true, false, false, false, false, false]
    }
];

const loadFromStorage = (key, fallback) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
};

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState(() => loadFromStorage('punct_events', SEED_EVENTS));
    const [alarms, setAlarms] = useState(() => loadFromStorage('punct_alarms', SEED_ALARMS));
    const [homeLocation, setHomeLocationState] = useState(() => loadFromStorage('punct_home', null));

    // Persist on change
    useEffect(() => {
        localStorage.setItem('punct_events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('punct_alarms', JSON.stringify(alarms));
    }, [alarms]);

    useEffect(() => {
        if (homeLocation) localStorage.setItem('punct_home', JSON.stringify(homeLocation));
    }, [homeLocation]);

    const setHomeLocation = (location) => {
        setHomeLocationState(location);
    };

    // Event CRUD
    const addEvent = (event) => {
        const newEvent = {
            ...event,
            id: `evt-${Date.now()}`,
            date: event.date || getTodayStr(),
            color: event.color || '#FF3C5D'
        };
        setEvents(prev => [...prev, newEvent]);
        return newEvent;
    };

    const updateEvent = (id, updates) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    // Alarm CRUD
    const addAlarm = (alarm) => {
        const newAlarm = { ...alarm, id: `alm-${Date.now()}` };
        setAlarms(prev => [...prev, newAlarm]);
        return newAlarm;
    };

    const updateAlarm = (id, updates) => {
        setAlarms(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const deleteAlarm = (id) => {
        setAlarms(prev => prev.filter(a => a.id !== id));
    };

    const toggleAlarm = (id) => {
        setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    // Get events for a specific date
    const getEventsForDate = (dateStr) => {
        return events.filter(e => e.date === dateStr);
    };

    // Get nearest upcoming event based on current time (today only)
    const getNextEvent = () => {
        const now = new Date();
        const todayStr = getTodayStr();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const upcoming = events
            .filter(e => !e.date || e.date === todayStr)
            .map(e => {
                const [h, m] = e.time.split(':').map(Number);
                const eventMinutes = h * 60 + m;
                const departMinutes = eventMinutes - (e.travelMinutes || 0) - (e.walkMinutes || 0);
                return { ...e, eventMinutes, departMinutes };
            })
            .filter(e => e.departMinutes > nowMinutes)
            .sort((a, b) => a.eventMinutes - b.eventMinutes);

        return upcoming[0] || null;
    };

    return (
        <AppContext.Provider value={{
            events, addEvent, updateEvent, deleteEvent,
            alarms, addAlarm, updateAlarm, deleteAlarm, toggleAlarm,
            getNextEvent, getEventsForDate,
            homeLocation, setHomeLocation
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be inside AppProvider');
    return ctx;
};

export default AppContext;
