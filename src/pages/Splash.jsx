import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import './Splash.css';

const Splash = () => {
    const navigate = useNavigate();
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // Plain logo -> Smooth transition
        const timer = setTimeout(() => {
            setFading(true); // Start fade out
            setTimeout(() => {
                navigate('/welcome');
            }, 500); // Wait for fade
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={`splash-container ${fading ? 'fade-out' : ''}`}>
            <div className="logo-wrapper">
                <Clock size={64} className="splash-logo" />
                {/* Optional: Add name if requested, user said "plain logo" but usually expects brand name too. Keeping minimal. */}
            </div>
        </div>
    );
};

export default Splash;
