import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NameSetup.css';

const NameSetup = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

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
                <input
                    className="name-setup-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    maxLength={30}
                />
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
