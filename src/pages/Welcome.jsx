import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-headline">
                    Be on time.<br />Everytyme
                </h1>
            </div>

            <div className="welcome-actions">
                <button
                    className="welcome-btn-primary"
                    onClick={() => navigate('/onboarding')}
                >
                    Get Started
                </button>

                <span
                    className="welcome-login-link"
                    onClick={() => navigate('/auth')}
                >
                    I already have a account
                </span>
            </div>
        </div>
    );
};

export default Welcome;
