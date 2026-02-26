import React, { useState, useRef, useEffect, useCallback } from 'react';
import './IOSTimePicker.css';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const periods = ['AM', 'PM'];

const ScrollColumn = ({ items, selected, onChange, formatItem }) => {
    const containerRef = useRef(null);
    const isScrollingRef = useRef(false);
    const timeoutRef = useRef(null);

    const selectedIdx = items.indexOf(selected);

    useEffect(() => {
        if (containerRef.current && !isScrollingRef.current) {
            containerRef.current.scrollTop = selectedIdx * ITEM_HEIGHT;
        }
    }, [selectedIdx]);

    const handleScroll = useCallback(() => {
        isScrollingRef.current = true;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const idx = Math.round(scrollTop / ITEM_HEIGHT);
            const clamped = Math.max(0, Math.min(items.length - 1, idx));
            containerRef.current.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' });
            if (items[clamped] !== selected) {
                onChange(items[clamped]);
            }
            setTimeout(() => { isScrollingRef.current = false; }, 150);
        }, 80);
    }, [items, selected, onChange]);

    return (
        <div className="ios-picker-column">
            <div
                className="ios-picker-scroll"
                ref={containerRef}
                onScroll={handleScroll}
                style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
            >
                <div style={{ height: CENTER_INDEX * ITEM_HEIGHT }} />
                {items.map((item, i) => {
                    const isSelected = item === selected;
                    return (
                        <div
                            key={i}
                            className={`ios-picker-item ${isSelected ? 'selected' : ''}`}
                            style={{ height: ITEM_HEIGHT }}
                            onClick={() => {
                                onChange(item);
                                if (containerRef.current) {
                                    containerRef.current.scrollTo({ top: i * ITEM_HEIGHT, behavior: 'smooth' });
                                }
                            }}
                        >
                            {formatItem ? formatItem(item) : item}
                        </div>
                    );
                })}
                <div style={{ height: CENTER_INDEX * ITEM_HEIGHT }} />
            </div>
        </div>
    );
};

const IOSTimePicker = ({ value, onChange }) => {
    // Parse value "HH:mm" (24h) into 12h components
    const parse24h = (val) => {
        const [h24, m] = (val || '12:00').split(':').map(Number);
        const period = h24 >= 12 ? 'PM' : 'AM';
        const h12 = h24 % 12 || 12;
        return { hour: h12, minute: m, period };
    };

    const { hour: initH, minute: initM, period: initP } = parse24h(value);
    const [hour, setHour] = useState(initH);
    const [minute, setMinute] = useState(initM);
    const [period, setPeriod] = useState(initP);

    // Sync back to parent whenever values change
    useEffect(() => {
        let h24 = hour;
        if (period === 'AM' && h24 === 12) h24 = 0;
        if (period === 'PM' && h24 !== 12) h24 += 12;
        const newVal = `${String(h24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        if (newVal !== value) {
            onChange(newVal);
        }
    }, [hour, minute, period]);

    return (
        <div className="ios-picker-wrapper">
            <div className="ios-picker-highlight" />
            <div className="ios-picker-columns">
                <ScrollColumn
                    items={hours}
                    selected={hour}
                    onChange={setHour}
                    formatItem={(h) => h}
                />
                <div className="ios-picker-separator">:</div>
                <ScrollColumn
                    items={minutes}
                    selected={minute}
                    onChange={setMinute}
                    formatItem={(m) => String(m).padStart(2, '0')}
                />
                <ScrollColumn
                    items={periods}
                    selected={period}
                    onChange={setPeriod}
                />
            </div>
        </div>
    );
};

export default IOSTimePicker;
