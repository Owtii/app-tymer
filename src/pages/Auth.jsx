import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Mail } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const navigate = useNavigate();

    const handleAuth = () => {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/app/home');
    };

    return (
        <div className="auth-container">
            {/* Header */}
            <div className="auth-header">
                <h1 className="auth-title">Welcome<br />Back</h1>
                <p className="auth-subtitle">
                    Log in to sync your schedules and stay punctual with your daily tasks.
                </p>
            </div>

            {/* Auth buttons */}
            <div className="auth-buttons">
                {/* Continue with Apple */}
                <button className="auth-btn auth-btn-apple" onClick={handleAuth}>
                    <Apple size={18} fill="white" strokeWidth={0} />
                    <span>Continue with Apple</span>
                </button>

                {/* Continue with Google */}
                <button className="auth-btn auth-btn-google" onClick={handleAuth}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                {/* Continue with Email */}
                <button className="auth-btn auth-btn-email" onClick={handleAuth}>
                    <Mail size={18} strokeWidth={2} />
                    <span>Continue with Email</span>
                </button>
            </div>

            {/* Sign up link */}
            <div className="auth-footer">
                <span className="auth-signup-text">
                    Don't have an account? <span className="auth-signup-link">Sign Up</span>
                </span>
            </div>
        </div>
    );
};

export default Auth;
