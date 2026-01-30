import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Button from '../components/Button';
import './Welcome.css';

// Reuse 3D assets for background decor
import imgNeverRush from '../assets/onboarding_never_rush_3d_1769479610554.png';
import imgSmartArrival from '../assets/onboarding_smart_arrival_3d_1769479626052.png';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            {/* Background Floating Elements */}
            <div className="bg-decor-layer">
                <img src={imgNeverRush} className="floating-obj obj-1" alt="" />
                <img src={imgSmartArrival} className="floating-obj obj-2" alt="" />
            </div>

            <div className="welcome-content">
                <div className="brand-hero">
                    <div className="logo-box">
                        <Clock size={40} className="brand-icon" />
                    </div>
                    <h1 className="brand-title">Punct</h1>
                    <p className="brand-slogan">Be on time.<br />Every time.</p>
                </div>
            </div>

            <div className="welcome-actions">
                <Button
                    variant="accent"
                    size="lg"
                    onClick={() => navigate('/onboarding')}
                    className="fitted-btn"
                >
                    Get Started
                </Button>

                <div className="login-prompt">
                    <span className="prompt-text" onClick={() => navigate('/auth')}>
                        I already have an account
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
