import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
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
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [view, setView] = useState('questions');
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
        if (currentQ > 0) {
            setCurrentQ(prev => prev - 1);
        } else {
            navigate('/onboarding');
        }
    };

    const isSelected = (option) => answers[questions[currentQ].id] === option;

    // Finalizing/Loading screen
    if (view === 'loading') {
        const circumference = 2 * Math.PI * 88; // radius 88
        const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;

        return (
            <div className="q-container">
                <div className="finalizing-screen">
                    {/* Progress ring */}
                    <div className="final-ring-wrapper">
                        <svg width="212" height="212" viewBox="0 0 212 212">
                            <circle
                                cx="106"
                                cy="106"
                                r="88"
                                stroke="#F0F0F0"
                                strokeWidth="18"
                                fill="transparent"
                            />
                            <circle
                                cx="106"
                                cy="106"
                                r="88"
                                stroke="#FF3C5D"
                                strokeWidth="18"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform="rotate(-90 106 106)"
                                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                            />
                        </svg>
                        <div className="final-ring-text">
                            <span className="final-percent">{loadingProgress}%</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="final-title">Personalizing Plan</h2>

                    {/* Steps card */}
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

                    {/* Continue button */}
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

    // Questions view
    const progressPercent = ((currentQ + 1) / questions.length) * 100;

    return (
        <div className="q-container">
            {/* Header */}
            <div className="q-header">
                <button className="q-back-btn" onClick={handleBack}>
                    <ChevronLeft size={26} strokeWidth={3} />
                </button>
                <div className="q-progress-track">
                    <div className="q-progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            {/* Question label */}
            <div className="q-label">QUESTION {currentQ + 1} OF {questions.length}</div>

            {/* Question text */}
            <h2 className="q-question">{questions[currentQ].question}</h2>

            {/* Options */}
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

            {/* Next button */}
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
