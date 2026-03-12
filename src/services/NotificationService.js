/**
 * NotificationService — Web Audio API alarm sounds + browser notifications
 * Plays a synthesized alarm tone when plans or alarms reach their scheduled time.
 */

let audioContext = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
};

/**
 * Play a synthesized alarm tone (no external audio files needed).
 * Creates a pleasant but attention-grabbing beep pattern.
 */
export const playAlarmSound = (type = 'plan') => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const gain = ctx.createGain();
        gain.connect(ctx.destination);

        if (type === 'alarm') {
            // Alarm: 3 urgent beeps
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = 880;
                osc.connect(gain);
                const start = now + i * 0.35;
                gain.gain.setValueAtTime(0.3, start);
                gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
                osc.start(start);
                osc.stop(start + 0.25);
            }
        } else {
            // Plan: 2 gentle tones (ascending)
            const freqs = [523, 659]; // C5, E5
            for (let i = 0; i < 2; i++) {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = freqs[i];
                osc.connect(gain);
                const start = now + i * 0.3;
                gain.gain.setValueAtTime(0.25, start);
                gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4);
                osc.start(start);
                osc.stop(start + 0.4);
            }
        }
    } catch (e) {
        console.warn('Audio playback failed:', e);
    }
};

/**
 * Request browser notification permission (call once on app load).
 */
export const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
    }
};

/**
 * Show a browser notification.
 */
export const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
    }
};

/**
 * Get the current time as minutes since midnight.
 */
const getNowMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
};

/**
 * Get today's day index (0=Sun, 1=Mon, ..., 6=Sat).
 */
const getTodayDayIndex = () => new Date().getDay();

/**
 * Get today's date string (YYYY-MM-DD).
 */
const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Check events and alarms, fire notifications for ones hitting their time.
 * Tracks which IDs have already been notified to avoid duplicates.
 * Returns the updated set of notified IDs.
 */
export const checkAndNotify = (events, alarms, notifiedSet) => {
    const nowMin = getNowMinutes();
    const todayDay = getTodayDayIndex();
    const todayStr = getTodayStr();
    const newNotified = new Set(notifiedSet);

    // Check plan events (for today)
    events.forEach(event => {
        if (event.date && event.date !== todayStr) return;
        const [h, m] = event.time.split(':').map(Number);
        const eventMin = h * 60 + m;
        // Notify at departure time (event time minus travel)
        const departMin = eventMin - (event.travelMinutes || 0) - (event.walkMinutes || 0);
        const departKey = `depart-${event.id}`;
        const arriveKey = `arrive-${event.id}`;

        // Departure alert
        if (nowMin === departMin && !newNotified.has(departKey)) {
            playAlarmSound('plan');
            showNotification('Time to Leave!', `Leave now for "${event.title}" to arrive on time.`);
            newNotified.add(departKey);
        }

        // Event time alert
        if (nowMin === eventMin && !newNotified.has(arriveKey)) {
            playAlarmSound('plan');
            showNotification('Event Starting', `"${event.title}" is starting now.`);
            newNotified.add(arriveKey);
        }
    });

    // Check alarms
    alarms.forEach(alarm => {
        if (!alarm.active) return;
        if (alarm.days && !alarm.days[todayDay]) return;
        const [h, m] = alarm.time.split(':').map(Number);
        const alarmMin = h * 60 + m;
        const alarmKey = `alarm-${alarm.id}`;

        if (nowMin === alarmMin && !newNotified.has(alarmKey)) {
            playAlarmSound('alarm');
            showNotification('Alarm', `${alarm.name || 'Alarm'} — ${alarm.time}`);
            newNotified.add(alarmKey);
        }
    });

    return newNotified;
};
