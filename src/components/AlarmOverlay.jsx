import React from 'react';
import { useAppContext } from '../context/AppContext';
import AlarmRinging from './AlarmRinging';

/**
 * AlarmOverlay — renders the full-screen alarm ringing screen
 * when an alarm is triggered. Placed at the top level of the app
 * so it overlays everything.
 */
const AlarmOverlay = () => {
    const { ringingAlarm, stopRinging, snoozeRinging } = useAppContext();

    if (!ringingAlarm) return null;

    return (
        <AlarmRinging
            alarm={ringingAlarm}
            onStop={stopRinging}
            onSnooze={snoozeRinging}
        />
    );
};

export default AlarmOverlay;
