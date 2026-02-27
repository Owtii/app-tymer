import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, MapPin } from 'lucide-react';
import AddressInput from '../components/AddressInput';
import './Questionnaire.css';

const questions = [
    { id: 1, question: 'How much time do you need to get ready?', options: ['15 minutes', '30 minutes', '45 minutes', '1 hour+'] },
    { id: 2, question: 'How do you prefer to arrive?', options: ['Early (15m buffer)', 'On Time', 'Just in Time'] },
    { id: 3, question: 'How do you usually move?', options: ['Car', 'Public Transit', 'Walking', 'Bicycle'] },
    { id: 4, question: 'What is your main goal with Punct?', options: ['Never be late', 'Reduce stress', 'Coordinate with friends'] },
    { id: 5, question: 'How did you find us?', options: ['Social Media', 'Friend', 'App Store', 'Ad'] },
    { id: 6, question: 'Enable "Invisible Time" checking?', options: ['Yes, analyze all delays', 'No, simpler is better'] }
];

const timeSteps = [
    { label: 'Analyzing your answers.', threshold: 25 },
    { label: 'Calculating travel buffers.', threshold: 50 },
    { label: 'Optimizing daily routes.', threshold: 80 },
    { label: 'Finalizing your plan.', threshold: 100 }
];

const Questionnaire = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('name'); // 'name' | 'location' | 'questions' | 'loading'
    const [userName, setUserName] = useState('');
    const [userLocation, setUserLocation] = useState({ address: '', coords: null });
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (view === 'loading') {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 99) {
                        clearInterval(interval);
                        return 99;
                    }
                    return prev + 1;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [view]);

    // ─── Name step ───
    const handleNameContinue = () => {
        if (!userName.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 300);
            return;
        }
        localStorage.setItem('punct_user_name', userName.trim());
        setView('location');
    };

    // ─── Location step ───
    const handleLocationContinue = () => {
        if (userLocation.coords) {
            localStorage.setItem('punct_home', JSON.stringify({
                address: userLocation.address,
                coords: userLocation.coords
            }));
        }
        setView('questions');
    };

    // ─── Question navigation ───
    const handleSelect = (option) => {
        setAnswers(prev => ({ ...prev, [questions[currentQ].id]: option }));
    };

    const handleNext = () => {
        const hasAnswer = answers[questions[currentQ].id];
        if (!hasAnswer) {
            setShake(true);
            setTimeout(() => setShake(false), 300);
            return;
        }
        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            setView('loading');
        }
    };

    const handleBack = () => {
        if (view === 'name') {
            navigate('/onboarding');
        } else if (view === 'location') {
            setView('name');
        } else if (view === 'questions' && currentQ === 0) {
            setView('location');
        } else if (view === 'questions') {
            setCurrentQ(prev => prev - 1);
        }
    };

    const isSelected = (option) => answers[questions[currentQ].id] === option;

    // ─── Name screen ───
    if (view === 'name') {
        return (
            <div className="q-container">
                <div className="q-header">
                    <button className="q-back-btn" onClick={handleBack}>
                        <ChevronLeft size={26} strokeWidth={3} />
                    </button>
                    <div className="q-progress-track">
                        <div className="q-progress-fill" style={{ width: '0%' }} />
                    </div>
                </div>
                <div className="q-setup-screen">
                    <div className="q-setup-emoji">👋</div>
                    <h2 className="q-setup-title">What's your name?</h2>
                    <p className="q-setup-subtitle">We'll use this to personalize your experience</p>
                    <input
                        className="q-setup-input"
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNameContinue()}
                        autoFocus
                        maxLength={30}
                    />
                </div>
                <div className="q-setup-footer">
                    <button
                        className={`q-next-btn ${shake ? 'btn-shake' : ''}`}
                        onClick={handleNameContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    // ─── Location screen ───
    if (view === 'location') {
        return (
            <div className="q-container">
                <div className="q-header">
                    <button className="q-back-btn" onClick={handleBack}>
                        <ChevronLeft size={26} strokeWidth={3} />
                    </button>
                    <div className="q-progress-track">
                        <div className="q-progress-fill" style={{ width: '5%' }} />
                    </div>
                </div>
                <div className="q-setup-screen">
                    <div className="q-setup-emoji">📍</div>
                    <h2 className="q-setup-title">Where do you live?</h2>
                    <p className="q-setup-subtitle">This helps us calculate travel times accurately</p>
                    <div className="q-setup-address">
                        <AddressInput
                            value={{ address: userLocation.address }}
                            onChange={(loc) => setUserLocation({
                                address: loc.address,
                                coords: loc.coords
                            })}
                            placeholder="Search your home address..."
                        />
                    </div>
                </div>
                <div className="q-setup-footer">
                    <button className="q-next-btn" onClick={handleLocationContinue}>
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    // ─── Finalizing screen ───
    if (view === 'loading') {
        const circumference = 2 * Math.PI * 74;
        const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;

        return (
            <div className="q-container">
                <div className="finalizing-screen">
                    <div className="final-ring-wrapper">
                        <svg width="180" height="180" viewBox="0 0 180 180">
                            <circle cx="90" cy="90" r="74" stroke="var(--color-border)" strokeWidth="14" fill="transparent" />
                            <circle cx="90" cy="90" r="74" stroke="var(--color-brand)" strokeWidth="14" fill="transparent"
                                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                                transform="rotate(-90 90 90)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                            />
                        </svg>
                        <div className="final-ring-text">
                            <span className="final-percent">{loadingProgress}%</span>
                        </div>
                    </div>
                    <h2 className="final-title">Personalizing Plan</h2>
                    <div className="final-steps-card">
                        {timeSteps.map((step, idx) => {
                            const isCompleted = loadingProgress >= step.threshold;
                            const isCurrent = !isCompleted && (idx === 0 || loadingProgress >= timeSteps[idx - 1].threshold);
                            return (
                                <div key={idx} className={`final-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                    <div className="final-step-icon">
                                        {isCompleted ? (
                                            <div className="final-check-circle">
                                                <Check size={12} strokeWidth={3} color="#FFFFFF" />
                                            </div>
                                        ) : isCurrent ? (
                                            <div className="final-spinner" />
                                        ) : (
                                            <div className="final-empty-circle" />
                                        )}
                                    </div>
                                    <span className="final-step-label">{step.label}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="final-footer">
                        <button
                            className={`q-next-btn ${loadingProgress >= 99 ? 'visible' : 'hidden'}`}
                            onClick={() => navigate('/auth')}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Questions view ───
    const progressPercent = 10 + ((currentQ + 1) / questions.length) * 90;

    return (
        <div className="q-container">
            <div className="q-header">
                <button className="q-back-btn" onClick={handleBack}>
                    <ChevronLeft size={26} strokeWidth={3} />
                </button>
                <div className="q-progress-track">
                    <div className="q-progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            <div className="q-label">QUESTION {currentQ + 1} OF {questions.length}</div>
            <h2 className="q-question">{questions[currentQ].question}</h2>

            <div className="q-options">
                {questions[currentQ].options.map((option) => (
                    <button
                        key={option}
                        className={`q-option ${isSelected(option) ? 'selected' : ''}`}
                        onClick={() => handleSelect(option)}
                    >
                        <span className="q-option-text">{option}</span>
                        <div className={`q-radio ${isSelected(option) ? 'checked' : ''}`}>
                            {isSelected(option) && <Check size={14} strokeWidth={3} color="#FF3C5D" />}
                        </div>
                    </button>
                ))}
            </div>

            <div className="q-footer">
                <button
                    className={`q-next-btn ${shake ? 'btn-shake' : ''}`}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Questionnaire;
