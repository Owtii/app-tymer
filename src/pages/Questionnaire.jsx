import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Questionnaire.css';

const questions = [
    { id: 1, question: 'How much time do you need to get ready?', options: ['15 mins', '30 mins', '45 mins', '1 hour+'] },
    { id: 2, question: 'How do you prefer to arrive?', options: ['Early (15m buffer)', 'On Time', 'Just in Time'] },
    { id: 3, question: 'How do you usually move?', options: ['Car', 'Public Transit', 'Walking', 'Bicycle'] },
    { id: 4, question: 'What is your main goal with Punct?', options: ['Never be late', 'Reduce stress', 'Coordinate with friends'] },
    { id: 5, question: 'How did you find us?', options: ['Social Media', 'Friend', 'App Store', 'Ad'] },
    { id: 6, question: 'Enable "Invisible Time" checking?', options: ['Yes, analyze all delays', 'No, simpler is better'] }
];

const loadingSteps = [
    { label: 'Analyzing your answers', threshold: 25 },
    { label: 'Defining nutrient requirements', threshold: 55 },
    { label: 'Estimating weight progress', threshold: 85 }, // Placeholder text from user screenshot, keeping it or adapting? User updated screenshot showed nutrition but context is time. I'll stick to generic or screenshot text. Screenshot had nutrition text? Let's use screenshot text as requested "like this screenshot"
    { label: 'Adjusting nutrition tips', threshold: 100 }
];
// Wait, user app is about TIME. The screenshot they uploaded had nutrition text. 
// I should probably adapt it to TIME context but keep the visual structure.
// "like this screenshot" usually means visual structure. I will use Time context text but visual structure.
const timeSteps = [
    { label: 'Analyzing your answers', threshold: 25 },
    { label: 'Calculating travel buffers', threshold: 50 },
    { label: 'Optimizing daily routes', threshold: 80 },
    { label: 'Finalizing your plan', threshold: 100 }
];

const Questionnaire = () => {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [view, setView] = useState('questions');
    const [loadingProgress, setLoadingProgress] = useState(0);

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

    const handleSelect = (option) => {
        setAnswers(prev => ({ ...prev, [questions[currentQ].id]: option }));
    };

    const [shake, setShake] = useState(false);

    const handleNext = () => {
        const hasAnswer = answers[questions[currentQ].id];

        if (!hasAnswer) {
            setShake(true);
            setTimeout(() => setShake(false), 300); // Reset after animation
            return;
        }

        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            setView('loading');
        }
    };

    const isSelected = (option) => answers[questions[currentQ].id] === option;

    const renderCircle = () => {
        const radius = 100; // 200px width
        const stroke = 16; // Thicker (was 12)
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;

        return (
            <div className="progress-ring-wrapper">
                <svg height={radius * 2} width={radius * 2}>
                    <circle
                        stroke="#F1F2F6"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="var(--color-brand-primary)"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
                        strokeLinecap="round" // Round Caps
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        transform={`rotate(-90 ${radius} ${radius})`}
                    />
                </svg>
                <div className="ring-text">
                    <span className="ring-percent">{loadingProgress}%</span>
                </div>
            </div>
        );
    };

    if (view === 'loading') {
        return (
            <div className="questionnaire-container"> {/* Re-use container for full height */}
                <div className="processing-screen">
                    <div className="loading-content">
                        {renderCircle()}

                        <div className="loading-text-block">
                            <h2 className="loading-title">Personalizing plan</h2>

                            <div className="steps-list">
                                {timeSteps.map((step, idx) => {
                                    const isCompleted = loadingProgress >= step.threshold;
                                    // Is current if not completed but previous one is completed (or it's first)
                                    const isCurrent = !isCompleted && (idx === 0 || loadingProgress >= timeSteps[idx - 1].threshold);

                                    return (
                                        <div key={idx} className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                            <div className="step-icon">
                                                {isCompleted ? (
                                                    <div className="step-check"><Check size={14} strokeWidth={3} /></div>
                                                ) : isCurrent ? (
                                                    <div className="step-spinner" />
                                                ) : (
                                                    <div className="step-circle" />
                                                )}
                                            </div>
                                            <span className="step-label">{step.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="finish-action-wrapper">
                        <div className={`finish-btn ${loadingProgress === 100 ? 'visible' : ''}`}>
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={() => navigate('/auth')}
                                className="fitted-btn"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="questionnaire-container">
            <header className="questionnaire-header">
                <Button variant="ghost" size="sm" onClick={() => {
                    if (currentQ > 0) setCurrentQ(prev => prev - 1);
                    else navigate('/onboarding');
                }}>
                    <ArrowLeft size={24} />
                </Button>
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    />
                </div>
                <div style={{ width: 32 }} />
            </header>

            <main className="question-content">
                <span className="step-count">Question {currentQ + 1} of {questions.length}</span>
                <h2 className="question-text">{questions[currentQ].question}</h2>

                <div className="options-list">
                    {questions[currentQ].options.map((option) => (
                        <Card
                            key={option}
                            className={`option-card ${isSelected(option) ? 'active-option' : ''}`}
                            padding="md"
                            onClick={() => handleSelect(option)}
                        >
                            <span className="option-text">{option}</span>
                            {isSelected(option) && <Check size={20} className="check-icon" />}
                        </Card>
                    ))}
                </div>
            </main>

            <footer className="questionnaire-footer-wrapper">
                <Button
                    variant="accent"
                    size="lg"
                    onClick={handleNext}
                    className={`fitted-btn ${shake ? 'btn-shake' : ''}`}
                    style={{
                        backgroundColor: !answers[questions[currentQ].id] ? '#323235' : undefined, // Matches new Button Hover/Lighter Grey
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </footer>
        </div>
    );
};

export default Questionnaire;
