import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
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

const TOTAL_STEPS = questions.length + 2; // +2 for name and location

const timeSteps = [
    { label: 'Analyzing your answers.', threshold: 25 },
    { label: 'Calculating travel buffers.', threshold: 50 },
    { label: 'Optimizing daily routes.', threshold: 80 },
    { label: 'Finalizing your plan.', threshold: 100 }
];

const Questionnaire = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [userName, setUserName] = useState('');
    const [userLocation, setUserLocation] = useState({ address: '', coords: null });
    const [answers, setAnswers] = useState({});
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [shake, setShake] = useState(false);
    const [view, setView] = useState('questions');
    const [finalized, setFinalized] = useState(false);

    useEffect(() => {
        if (view === 'loading') {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [view]);

    useEffect(() => {
        if (loadingProgress >= 97 && !finalized) {
            const timer = setTimeout(() => setFinalized(true), 400);
            return () => clearTimeout(timer);
        }
    }, [loadingProgress, finalized]);

    const handleNext = () => {
        if (currentStep === 0) {
            if (!userName.trim()) {
                setShake(true);
                setTimeout(() => setShake(false), 300);
                return;
            }
            localStorage.setItem('punct_user_name', userName.trim());
            setCurrentStep(1);
        } else if (currentStep === 1) {
            if (userLocation.coords) {
                localStorage.setItem('punct_home', JSON.stringify({
                    address: userLocation.address,
                    coords: userLocation.coords
                }));
            }
            setCurrentStep(2);
        } else {
            const qIndex = currentStep - 2;
            const hasAnswer = answers[questions[qIndex].id];
            if (!hasAnswer) {
                setShake(true);
                setTimeout(() => setShake(false), 300);
                return;
            }
            if (currentStep < TOTAL_STEPS - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                setView('loading');
            }
        }
    };

    const handleBack = () => {
        if (currentStep === 0) {
            navigate('/onboarding');
        } else {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSelect = (option) => {
        const qIndex = currentStep - 2;
        setAnswers(prev => ({ ...prev, [questions[qIndex].id]: option }));
    };

    const isSelected = (option) => {
        const qIndex = currentStep - 2;
        return answers[questions[qIndex].id] === option;
    };

    const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

    // ─── Finalizing screen ───
    if (view === 'loading') {
        const circumference = 2 * Math.PI * 74;
        const strokeDashoffset = circumference - (Math.min(loadingProgress, 100) / 100) * circumference;

        return (
            <div className="q-container">
                <div className="finalizing-wrapper">
                    <div className={`finalizing-screen ${finalized ? 'done' : ''}`}>
                        <div className="final-ring-wrapper">
                            <svg width="180" height="180" viewBox="0 0 180 180">
                                <circle cx="90" cy="90" r="74" stroke="var(--color-border)" strokeWidth="14" fill="transparent" />
                                <circle cx="90" cy="90" r="74" stroke="var(--color-brand)" strokeWidth="14" fill="transparent"
                                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                                    transform="rotate(-90 90 90)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                />
                            </svg>
                            <div className="final-ring-text">
                                <span className="final-percent">{Math.min(loadingProgress, 100)}%</span>
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
                    </div>

                    <div className={`final-success ${finalized ? 'show' : ''}`}>
                        <div className="final-success-icon">
                            <Check size={44} strokeWidth={3} color="#FFFFFF" />
                        </div>
                        <h2 className="final-success-title">You're All Set!</h2>
                        <p className="final-success-subtitle">Your personalized plan is ready</p>
                    </div>
                </div>

                <div className="final-footer">
                    <button
                        className={`q-next-btn ${finalized ? 'visible' : 'hidden'}`}
                        onClick={() => navigate('/auth')}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    // ─── Unified questions view ───
    const isNameStep = currentStep === 0;
    const isLocationStep = currentStep === 1;
    const isQuestionStep = currentStep >= 2;
    const qIndex = currentStep - 2;

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

            <div className="q-label">QUESTION {currentStep + 1} OF {TOTAL_STEPS}</div>

            {isNameStep && (
                <>
                    <h2 className="q-question">What's your name?</h2>
                    <div className="q-input-area">
                        <input
                            className="q-underline-input"
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                            autoFocus
                            maxLength={30}
                        />
                    </div>
                </>
            )}

            {isLocationStep && (
                <>
                    <h2 className="q-question">Where do you live?</h2>
                    <div className="q-input-area">
                        <div className="q-underline-address">
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
                </>
            )}

            {isQuestionStep && (
                <>
                    <h2 className="q-question">{questions[qIndex].question}</h2>
                    <div className="q-options">
                        {questions[qIndex].options.map((option) => (
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
                </>
            )}

            <div className="q-footer">
                <button
                    className={`q-next-btn ${shake ? 'btn-shake' : ''}`}
                    onClick={handleNext}
                >
                    {currentStep < TOTAL_STEPS - 1 ? 'Next' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default Questionnaire;
