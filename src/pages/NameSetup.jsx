import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NameSetup.css';

const NameSetup = () => {
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleContinue = () => {
        if (!name.trim()) return;
        localStorage.setItem('punct_user_name', name.trim());
        navigate('/app/home');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleContinue();
    };

    return (
        <div className="name-setup">
            <div className="name-setup-content">
                <div className="name-setup-emoji">👋</div>
                <h1 className="name-setup-title">What's your name?</h1>
                <p className="name-setup-subtitle">We'll use this to personalize your experience</p>
                <div className="name-input-wrapper" onClick={() => inputRef.current?.focus()}>
                    <span className={`name-input-label${isFocused || name ? ' hidden' : ''}`}>Enter your name</span>
                    <input
                        ref={inputRef}
                        className="name-setup-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        maxLength={30}
                    />
                </div>
                <button
                    className="name-setup-btn"
                    onClick={handleContinue}
                    disabled={!name.trim()}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default NameSetup;
