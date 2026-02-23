import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
    const navigate = useNavigate();
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFading(true);
            setTimeout(() => {
                navigate('/welcome');
            }, 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={`splash-container ${fading ? 'fade-out' : ''}`}>
            {/* Colorful gradient blobs */}
            <div className="splash-blobs">
                <div className="blob blob-yellow"></div>
                <div className="blob blob-red"></div>
                <div className="blob blob-purple-1"></div>
                <div className="blob blob-purple-2"></div>
                <div className="blob blob-white"></div>
                <div className="blob blob-pink"></div>
            </div>

            {/* Frosted glass overlay */}
            <div className="splash-glass"></div>

            {/* Logo text */}
            <span className="splash-logo-text">logo</span>
        </div>
    );
};

export default Splash;
