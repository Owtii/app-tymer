import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CustomBell } from './CustomIcons';
import { playAlarmSound } from '../services/NotificationService';
import './AlarmRinging.css';

// ── Math problem generator ──
const generateMathProblem = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;
    switch (op) {
        case '+':
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            answer = a + b;
            break;
        case '-':
            a = Math.floor(Math.random() * 50) + 30;
            b = Math.floor(Math.random() * 30) + 5;
            answer = a - b;
            break;
        case '×':
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            answer = a * b;
            break;
        default:
            a = 10; b = 5; answer = 15;
    }
    return { question: `${a} ${op} ${b}`, answer };
};

const SNOOZE_MINUTES = 5;

const AlarmRinging = ({ alarm, onStop, onSnooze }) => {
    // ── Slide-to-dismiss state ──
    const [stopSliderX, setStopSliderX] = useState(0);
    const [snoozeSliderX, setSnoozeSliderX] = useState(0);
    const [activeSlider, setActiveSlider] = useState(null);
    const stopTrackRef = useRef(null);
    const snoozeTrackRef = useRef(null);
    const startXRef = useRef(0);
    const trackWidthRef = useRef(0);

    // ── Task states ──
    const [showTask, setShowTask] = useState(false);
    const [mathProblem, setMathProblem] = useState(null);
    const [mathAnswer, setMathAnswer] = useState('');
    const [mathError, setMathError] = useState(false);
    const [shakeCount, setShakeCount] = useState(0);
    const [holdProgress, setHoldProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);

    const holdTimerRef = useRef(null);
    const soundIntervalRef = useRef(null);
    const mathInputRef = useRef(null);
    const shakeTarget = 15;
    const dismissTask = alarm?.dismissTask || 'none';

    // ── Play alarm sound on loop ──
    useEffect(() => {
        playAlarmSound('alarm');
        soundIntervalRef.current = setInterval(() => {
            playAlarmSound('alarm');
        }, 3000);
        return () => {
            if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
        };
    }, []);

    // ── Generate math problem ──
    useEffect(() => {
        if (dismissTask === 'math') {
            setMathProblem(generateMathProblem());
        }
    }, [dismissTask]);

    // ── Focus math input when task screen appears ──
    useEffect(() => {
        if (showTask && dismissTask === 'math' && mathInputRef.current) {
            setTimeout(() => mathInputRef.current?.focus(), 300);
        }
    }, [showTask, dismissTask]);

    // ── Shake detection via devicemotion ──
    useEffect(() => {
        if (!showTask || dismissTask !== 'shake') return;
        let lastX = 0, lastY = 0, lastZ = 0;
        const threshold = 15;

        const handleMotion = (e) => {
            const acc = e.accelerationIncludingGravity;
            if (!acc || acc.x === undefined) return;
            const deltaX = Math.abs(acc.x - lastX);
            const deltaY = Math.abs(acc.y - lastY);
            const deltaZ = Math.abs(acc.z - lastZ);
            if (deltaX + deltaY + deltaZ > threshold) {
                setShakeCount(prev => {
                    const next = prev + 1;
                    if (next >= shakeTarget) onStop();
                    return next;
                });
            }
            lastX = acc.x; lastY = acc.y; lastZ = acc.z;
        };

        window.addEventListener('devicemotion', handleMotion);
        return () => window.removeEventListener('devicemotion', handleMotion);
    }, [showTask, dismissTask, onStop]);

    // ── Handle slide complete ──
    const handleSlideComplete = useCallback((type) => {
        if (type === 'snooze') {
            onSnooze(SNOOZE_MINUTES);
            return;
        }
        // Stop: check if we need a dismiss task
        if (dismissTask === 'none') {
            onStop();
        } else {
            setShowTask(true);
            if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
        }
    }, [dismissTask, onStop, onSnooze]);

    // ── Pointer-based slider drag ──
    const handlePointerDown = useCallback((e, type) => {
        e.preventDefault();
        const trackRef = type === 'stop' ? stopTrackRef : snoozeTrackRef;
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        startXRef.current = clientX;
        trackWidthRef.current = rect.width - 60; // thumb width is 56 + margin
        setActiveSlider(type);
    }, []);

    const handlePointerMove = useCallback((e) => {
        if (!activeSlider) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - startXRef.current;
        const percent = Math.max(0, Math.min(100, (deltaX / trackWidthRef.current) * 100));
        if (activeSlider === 'stop') {
            setStopSliderX(percent);
        } else {
            setSnoozeSliderX(percent);
        }
    }, [activeSlider]);

    const handlePointerUp = useCallback(() => {
        if (!activeSlider) return;
        const val = activeSlider === 'stop' ? stopSliderX : snoozeSliderX;
        if (val > 80) {
            handleSlideComplete(activeSlider);
        }
        setStopSliderX(0);
        setSnoozeSliderX(0);
        setActiveSlider(null);
    }, [activeSlider, stopSliderX, snoozeSliderX, handleSlideComplete]);

    useEffect(() => {
        if (activeSlider) {
            const moveHandler = (e) => handlePointerMove(e);
            const upHandler = () => handlePointerUp();
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
            window.addEventListener('touchmove', moveHandler, { passive: false });
            window.addEventListener('touchend', upHandler);
            return () => {
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
                window.removeEventListener('touchmove', moveHandler);
                window.removeEventListener('touchend', upHandler);
            };
        }
    }, [activeSlider, handlePointerMove, handlePointerUp]);

    // ── Math submit ──
    const handleMathSubmit = () => {
        if (!mathProblem) return;
        if (parseInt(mathAnswer, 10) === mathProblem.answer) {
            onStop();
        } else {
            setMathError(true);
            setMathAnswer('');
            setMathProblem(generateMathProblem());
            setTimeout(() => setMathError(false), 600);
        }
    };

    // ── Hold timer ──
    const startHold = () => {
        setIsHolding(true);
        setHoldProgress(0);
        const startTime = Date.now();
        const duration = 5000;
        holdTimerRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / duration) * 100);
            setHoldProgress(progress);
            if (progress >= 100) {
                clearInterval(holdTimerRef.current);
                onStop();
            }
        }, 50);
    };

    const endHold = () => {
        setIsHolding(false);
        setHoldProgress(0);
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };

    // ── Format time ──
    const formatTime = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return {
            hours: `${h % 12 || 12}`,
            minutes: m.toString().padStart(2, '0'),
            period: ampm
        };
    };

    const { hours, minutes, period } = formatTime(alarm.time);

    // ═══════════════════════════════════
    // TASK SCREEN (math / shake / hold)
    // ═══════════════════════════════════
    if (showTask) {
        return (
            <div className="alarm-ringing-overlay">
                <div className="alarm-ringing-task-screen">
                    <div className="alarm-task-header">
                        <h2>Dismiss Alarm</h2>
                        <p>{alarm.name || 'Alarm'}</p>
                    </div>

                    {dismissTask === 'math' && mathProblem && (
                        <div className="alarm-task-content">
                            <div className="alarm-math-card">
                                <span className="alarm-math-label">Solve to dismiss</span>
                                <div className="alarm-math-question">{mathProblem.question} = ?</div>
                                <div className={`alarm-math-input-row ${mathError ? 'shake' : ''}`}>
                                    <input
                                        ref={mathInputRef}
                                        type="number"
                                        inputMode="numeric"
                                        className="alarm-math-input"
                                        value={mathAnswer}
                                        onChange={(e) => setMathAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleMathSubmit()}
                                        placeholder="Answer"
                                    />
                                    <button className="alarm-math-submit" onClick={handleMathSubmit}>
                                        ✓
                                    </button>
                                </div>
                                {mathError && <span className="alarm-math-error">Wrong answer, try again!</span>}
                            </div>
                        </div>
                    )}

                    {dismissTask === 'shake' && (
                        <div className="alarm-task-content">
                            <div className="alarm-shake-card">
                                <div className="alarm-shake-icon">📱</div>
                                <span className="alarm-shake-label">Shake your phone!</span>
                                <div className="alarm-shake-progress-track">
                                    <div
                                        className="alarm-shake-progress-fill"
                                        style={{ width: `${(shakeCount / shakeTarget) * 100}%` }}
                                    />
                                </div>
                                <span className="alarm-shake-count">{shakeCount} / {shakeTarget}</span>
                                <button
                                    className="alarm-shake-fallback"
                                    onClick={() => {
                                        setShakeCount(prev => {
                                            const next = prev + 1;
                                            if (next >= shakeTarget) setTimeout(onStop, 200);
                                            return next;
                                        });
                                    }}
                                >
                                    Tap to simulate shake
                                </button>
                            </div>
                        </div>
                    )}

                    {dismissTask === 'timer' && (
                        <div className="alarm-task-content">
                            <div className="alarm-hold-card">
                                <span className="alarm-hold-label">Hold the button for 5 seconds</span>
                                <button
                                    className={`alarm-hold-button ${isHolding ? 'holding' : ''}`}
                                    onMouseDown={startHold}
                                    onMouseUp={endHold}
                                    onMouseLeave={endHold}
                                    onTouchStart={startHold}
                                    onTouchEnd={endHold}
                                >
                                    <svg className="alarm-hold-svg" viewBox="0 0 100 100">
                                        <circle className="alarm-hold-track-circle" cx="50" cy="50" r="44" />
                                        <circle
                                            className="alarm-hold-progress-circle"
                                            cx="50" cy="50" r="44"
                                            style={{ strokeDashoffset: 276.46 - (276.46 * holdProgress / 100) }}
                                        />
                                    </svg>
                                    <span className="alarm-hold-text">
                                        {isHolding ? `${Math.round(holdProgress)}%` : 'HOLD'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════
    // MAIN RINGING SCREEN
    // ═══════════════════════════════════
    return (
        <div className="alarm-ringing-overlay">
            <div className="alarm-ringing-screen">
                {/* Pulsing background rings */}
                <div className="alarm-ring-pulse ring-1" />
                <div className="alarm-ring-pulse ring-2" />
                <div className="alarm-ring-pulse ring-3" />

                {/* Bell icon */}
                <div className="alarm-ringing-bell">
                    <CustomBell size={44} color="#fff" />
                </div>

                {/* Alarm name */}
                <span className="alarm-ringing-name">{alarm.name || 'Alarm'}</span>

                {/* Time display */}
                <div className="alarm-ringing-time">
                    <span className="alarm-ringing-hours">{hours}</span>
                    <span className="alarm-ringing-colon">:</span>
                    <span className="alarm-ringing-minutes">{minutes}</span>
                    <span className="alarm-ringing-period">{period}</span>
                </div>

                {/* Slide-to-dismiss sliders */}
                <div className="alarm-ringing-sliders">
                    {/* Stop slider */}
                    <div className="alarm-slide-track stop" ref={stopTrackRef}>
                        <div
                            className="alarm-slide-fill stop"
                            style={{ width: `${stopSliderX}%` }}
                        />
                        <div
                            className="alarm-slide-thumb"
                            style={{ left: `calc(${stopSliderX}% * 0.85 + 4px)` }}
                            onMouseDown={(e) => handlePointerDown(e, 'stop')}
                            onTouchStart={(e) => handlePointerDown(e, 'stop')}
                        >
                            <div className="alarm-slide-thumb-inner stop">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,18 15,12 9,6" /></svg>
                            </div>
                        </div>
                        <span className="alarm-slide-text">slide to stop</span>
                    </div>

                    {/* Snooze slider */}
                    <div className="alarm-slide-track snooze" ref={snoozeTrackRef}>
                        <div
                            className="alarm-slide-fill snooze"
                            style={{ width: `${snoozeSliderX}%` }}
                        />
                        <div
                            className="alarm-slide-thumb"
                            style={{ left: `calc(${snoozeSliderX}% * 0.85 + 4px)` }}
                            onMouseDown={(e) => handlePointerDown(e, 'snooze')}
                            onTouchStart={(e) => handlePointerDown(e, 'snooze')}
                        >
                            <div className="alarm-slide-thumb-inner snooze">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,18 15,12 9,6" /></svg>
                            </div>
                        </div>
                        <span className="alarm-slide-text snooze">snooze · {SNOOZE_MINUTES} min</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlarmRinging;
