import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Chrome, Mail } from 'lucide-react';
import Button from '../components/Button';
import './Auth.css';

// Reuse 3D assets for consistent vibe
import imgOwnTime from '../assets/onboarding_own_time_3d_1769479655346.png';

const Auth = () => {
    const navigate = useNavigate();

    const handleAuth = () => {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/app/home');
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-decor">
                <img src={imgOwnTime} className="auth-floating-img" alt="" />
            </div>

            <div className="auth-content">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Login to sync your world.</p>

                <div className="auth-methods">
                    <Button variant="secondary" fullWidth className="auth-method-btn" onClick={handleAuth}>
                        <Apple size={24} />
                        <span>Continue with Apple</span>
                    </Button>

                    <Button variant="secondary" fullWidth className="auth-method-btn" onClick={handleAuth}>
                        <Chrome size={24} />
                        <span>Continue with Google</span>
                    </Button>

                    <Button variant="secondary" fullWidth className="auth-method-btn" onClick={handleAuth}>
                        <Mail size={24} />
                        <span>Continue with Email</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
