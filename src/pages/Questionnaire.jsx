import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import AddressInput from '../components/AddressInput';
import './Questionnaire.css';

// Import onboarding slide assets
import imgNeverRush from '../assets/onboarding_never_rush_3d_1769479610554.png';
import imgSmartArrival from '../assets/onboarding_smart_arrival_3d_1769479626052.png';
import imgMeetSynced from '../assets/onboarding_meet_synced_3d_1769479639934.png';
import imgOwnTime from '../assets/onboarding_own_time_3d_1769479655346.png';

/* ─────────────────────────────────────────────────────
   PHASE DEFINITIONS
   phase 0 & 1 = non-skippable (wake-up questions)
   phase 2, 3, 4 = skippable
───────────────────────────────────────────────────── */
const phases = [
    { name: 'The Basics', skippable: false },
    { name: 'Your Internal Clock', skippable: false },
    { name: 'Time & Commuting', skippable: true },
    { name: 'Group Dynamics', skippable: true },
    { name: 'Almost Done', skippable: true },
];

/* ─────────────────────────────────────────────────────
   18 QUESTIONS
───────────────────────────────────────────────────── */
const questions = [
    // Phase 0: The Basics & Your Goal (Q1-Q3)
    {
        id: 1, phase: 0, multi: true,
        question: 'What do you want this app to help you with?',
        subtitle: 'Select all that apply',
        options: [
            'Wake up on the first alarm.',
            'Stop rushing and leave on time.',
            'Coordinate with friends.',
        ]
    },
    {
        id: 2, phase: 0,
        question: 'How old are you?',
        options: ['Under 18', '18 to 24', '25 to 34', '35 or older']
    },
    {
        id: 3, phase: 0,
        question: 'How do you identify?',
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
    },

    // Phase 1: Waking Up & The Internal Clock (Q4-Q10)
    {
        id: 4, phase: 1,
        question: 'How many times do you hit snooze?',
        options: [
            '0 times — I never snooze.',
            '1 to 2 times.',
            '3 to 4 times.',
            'I lose count.',
        ]
    },
    {
        id: 5, phase: 1,
        question: 'Why do you struggle to wake up?',
        options: [
            'I stay up too late scrolling.',
            'My bed is just too comfortable.',
            'I feel physically exhausted.',
            'I sleep right through the alarm.',
        ]
    },
    {
        id: 6, phase: 1,
        question: 'When does your body naturally wake up?',
        options: ['Before 7:00 AM', '7:00 – 9:00 AM', '9:00 – 11:00 AM', 'Past 11:00 AM']
    },
    {
        id: 7, phase: 1,
        question: 'How long until you feel fully awake?',
        options: [
            'Under 5 minutes.',
            '15 to 30 minutes.',
            'Up to an hour.',
            'Not until I have caffeine.',
        ]
    },
    {
        id: 8, phase: 1,
        question: 'How many hours of sleep do you get?',
        options: ['Less than 5 hours', '5 to 6 hours', '7 to 8 hours', '9+ hours']
    },
    {
        id: 9, phase: 1,
        question: 'What task would force you out of bed?',
        options: [
            'Solving math or memory problems.',
            'Shaking my phone vigorously.',
            'Scanning a barcode in another room.',
            'A ridiculously loud alarm.',
        ]
    },
    {
        id: 10, phase: 1,
        question: 'How do you feel right after waking up?',
        options: [
            'Energized and ready to go.',
            'A bit groggy, but okay.',
            'Stressed, rushed, and anxious.',
            'Completely drained.',
        ]
    },

    // Phase 2: Time Blindness & Commuting (Q11-Q14)
    {
        id: 11, phase: 2,
        question: 'How long does it take you to get ready?',
        options: ['Under 15 minutes', '15 to 30 minutes', '30 to 60 minutes', 'Over an hour']
    },
    {
        id: 12, phase: 2,
        question: 'Why do you usually end up running late?',
        options: [
            'Doing "one more thing" first.',
            'Losing my keys, wallet, or phone.',
            'Unexpected traffic or delays.',
            'Underestimating commute time.',
        ]
    },
    {
        id: 13, phase: 2,
        question: 'How do you usually commute?',
        options: ['Personal car', 'Public transit', 'Walk or bike', 'Rideshare (Uber/Lyft)']
    },
    {
        id: 14, phase: 2,
        question: 'Do you underestimate how long tasks take?',
        options: [
            'Rarely — I\'m realistic with time.',
            'Sometimes, depending on the day.',
            'Almost always.',
        ]
    },

    // Phase 3: Group Dynamics & Accountability (Q15-Q17)
    {
        id: 15, phase: 3,
        question: 'Are you first or last to arrive at events?',
        options: [
            'Always first.',
            'Right on time.',
            'Usually a few minutes late.',
            'Always the last one.',
        ]
    },
    {
        id: 16, phase: 3,
        question: 'How much location are you willing to share?',
        options: [
            'Full live map tracking.',
            'Just my ETA.',
            'None — respect my privacy.',
        ]
    },
    {
        id: 17, phase: 3,
        question: 'How do you react when friends make you late?',
        options: [
            'I get pretty frustrated.',
            'I adjust and just leave later.',
            'I don\'t mind — I\'m flexible.',
        ]
    },

    // Phase 4: Final Step (Q18)
    {
        id: 18, phase: 4,
        question: 'Where did you first hear about us?',
        options: ['TikTok', 'Instagram / Facebook', 'A friend told me', 'App Store / Play Store', 'Other']
    },
];

/* ─────────────────────────────────────────────────────
   INFO SLIDES (moved to the end)
───────────────────────────────────────────────────── */
const infoSlides = [
    { id: 1, title: 'Never Rush', description: 'AI plans your logistics so you don\'t have to.', image: imgNeverRush },
    { id: 2, title: 'Smart Arrival', description: 'Automatically calculating travel, parking, and walking times.', image: imgSmartArrival },
    { id: 3, title: 'Meet Synced', description: 'Unique routes for your group to arrive together.', image: imgMeetSynced },
    { id: 4, title: 'Own Time', description: 'Built for personal growth and total privacy.', image: imgOwnTime },
];

/* ─────────────────────────────────────────────────────
   LOADING STEPS
───────────────────────────────────────────────────── */
const timeSteps = [
    { label: 'Analyzing your answers.', threshold: 25 },
    { label: 'Calculating travel buffers.', threshold: 50 },
    { label: 'Optimizing daily routes.', threshold: 80 },
    { label: 'Finalizing your plan.', threshold: 100 },
];

/* ===============================================
   NAME STEP (step 0)  →  LOCATION STEP (step 1)
   → 18 QUESTIONS (steps 2-19)
   → INFO SLIDES (steps 20-23)
   → LOADING → DONE
=============================================== */
const QUESTION_OFFSET = 2;               // first question at step index 2
const TOTAL_QUESTION_STEPS = questions.length; // 18
const INFO_OFFSET = QUESTION_OFFSET + TOTAL_QUESTION_STEPS; // step 20
const INFO_COUNT = infoSlides.length;     // 4
const TOTAL_STEPS = INFO_OFFSET + INFO_COUNT; // 24

/* ─── Phase boundaries (question indices, 0-based) ─── */
const WAKE_UP_END = 9; // Q1-Q10 → indices 0..9 (phases 0 & 1) are non-skippable

const Questionnaire = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [userName, setUserName] = useState('');
    const [userLocation, setUserLocation] = useState({ address: '', coords: null });
    const [answers, setAnswers] = useState({});
    const [multiAnswers, setMultiAnswers] = useState({}); // for Q1 multi-select
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [shake, setShake] = useState(false);
    const [view, setView] = useState('questions'); // 'questions' | 'loading'
    const [finalized, setFinalized] = useState(false);
    const [slideDir, setSlideDir] = useState('next'); // animation direction
    const [animating, setAnimating] = useState(false);
    const contentRef = useRef(null);

    // ─── Loading progress timer ───
    useEffect(() => {
        if (view === 'loading') {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) { clearInterval(interval); return 100; }
                    return prev + 1;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [view]);

    // ─── Finalize ───
    useEffect(() => {
        if (loadingProgress >= 97 && !finalized) {
            const timer = setTimeout(() => setFinalized(true), 400);
            return () => clearTimeout(timer);
        }
    }, [loadingProgress, finalized]);

    // ─── Trigger slide-in animation on step change ───
    useEffect(() => {
        setAnimating(true);
        const timeout = setTimeout(() => setAnimating(false), 350);
        return () => clearTimeout(timeout);
    }, [currentStep]);

    /* ═════════════════════════════
       HELPERS
    ═════════════════════════════ */
    const isNameStep = currentStep === 0;
    const isLocationStep = currentStep === 1;
    const isQuestionStep = currentStep >= QUESTION_OFFSET && currentStep < INFO_OFFSET;
    const isInfoStep = currentStep >= INFO_OFFSET && currentStep < TOTAL_STEPS;
    const qIndex = currentStep - QUESTION_OFFSET;
    const infoIndex = currentStep - INFO_OFFSET;
    const currentQuestion = isQuestionStep ? questions[qIndex] : null;
    const currentPhase = currentQuestion ? phases[currentQuestion.phase] : null;
    const isSkippable = currentPhase ? currentPhase.skippable : isInfoStep;

    /* ─── Check if current question is answered ─── */
    const isAnswered = () => {
        if (!currentQuestion) return false;
        if (currentQuestion.multi) {
            const sel = multiAnswers[currentQuestion.id] || [];
            return sel.length > 0;
        }
        return !!answers[currentQuestion.id];
    };

    /* ═════════════════════════════
       NAVIGATION
    ═════════════════════════════ */
    const goToStep = (nextStep, dir = 'next') => {
        setSlideDir(dir);
        setCurrentStep(nextStep);
    };

    const handleNext = () => {
        // Name step
        if (isNameStep) {
            if (!userName.trim()) { triggerShake(); return; }
            localStorage.setItem('punct_user_name', userName.trim());
            goToStep(1);
            return;
        }
        // Location step
        if (isLocationStep) {
            if (userLocation.coords) {
                localStorage.setItem('punct_home', JSON.stringify({
                    address: userLocation.address,
                    coords: userLocation.coords,
                }));
            }
            goToStep(2);
            return;
        }
        // Question step
        if (isQuestionStep) {
            if (!isSkippable && !isAnswered()) { triggerShake(); return; }
            if (currentStep < TOTAL_STEPS - 1) {
                goToStep(currentStep + 1);
            } else {
                startLoading();
            }
            return;
        }
        // Info step
        if (isInfoStep) {
            if (currentStep < TOTAL_STEPS - 1) {
                goToStep(currentStep + 1);
            } else {
                startLoading();
            }
            return;
        }
    };

    const handleSkip = () => {
        if (isQuestionStep) {
            // skip to next phase boundary or info slides
            const currentPhaseId = currentQuestion.phase;
            let nextStep = currentStep + 1;
            while (nextStep < INFO_OFFSET) {
                const nextQ = questions[nextStep - QUESTION_OFFSET];
                if (nextQ && nextQ.phase !== currentPhaseId) break;
                nextStep++;
            }
            if (nextStep >= TOTAL_STEPS) {
                startLoading();
            } else {
                goToStep(nextStep);
            }
        }
    };

    const handleBack = () => {
        if (currentStep === 0) {
            navigate('/welcome');
        } else {
            goToStep(currentStep - 1, 'back');
        }
    };

    const startLoading = () => {
        localStorage.setItem('punct_onboarding_answers', JSON.stringify({ ...answers, multi: multiAnswers }));
        setView('loading');
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 300);
    };

    /* ═════════════════════════════
       SELECTION HANDLERS
    ═════════════════════════════ */
    const handleSelect = (option) => {
        if (!currentQuestion) return;
        if (currentQuestion.multi) {
            setMultiAnswers(prev => {
                const current = prev[currentQuestion.id] || [];
                if (current.includes(option)) {
                    return { ...prev, [currentQuestion.id]: current.filter(o => o !== option) };
                }
                return { ...prev, [currentQuestion.id]: [...current, option] };
            });
        } else {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
        }
    };

    const isSelected = (option) => {
        if (!currentQuestion) return false;
        if (currentQuestion.multi) {
            return (multiAnswers[currentQuestion.id] || []).includes(option);
        }
        return answers[currentQuestion.id] === option;
    };

    /* ═════════════════════════════
       PROGRESS
    ═════════════════════════════ */
    const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

    /* ═════════════════════════════
       PHASE LABEL STRING
    ═════════════════════════════ */
    const getStepLabel = () => {
        if (isNameStep) return 'GETTING STARTED';
        if (isLocationStep) return 'YOUR LOCATION';
        if (isQuestionStep) return `QUESTION ${qIndex + 1} OF ${TOTAL_QUESTION_STEPS}`;
        if (isInfoStep) return `DISCOVER ${infoIndex + 1} OF ${INFO_COUNT}`;
        return '';
    };

    const getPhaseBadge = () => {
        if (isNameStep || isLocationStep) return null;
        if (isQuestionStep && currentPhase) return currentPhase.name;
        if (isInfoStep) return 'How It Works';
        return null;
    };

    /* ═════════════════════════════════════════════════
       RENDER: LOADING / FINALIZING
    ═════════════════════════════════════════════════ */
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

    /* ═════════════════════════════════════════════════
       RENDER: MAIN FLOW
    ═════════════════════════════════════════════════ */
    const phaseBadge = getPhaseBadge();
    const animClass = animating ? (slideDir === 'next' ? 'q-slide-in-right' : 'q-slide-in-left') : '';

    return (
        <div className="q-container">
            {/* ─── HEADER ─── */}
            <div className="q-header">
                <button className="q-back-btn" onClick={handleBack}>
                    <ChevronLeft size={26} strokeWidth={3} />
                </button>
                <div className="q-progress-track">
                    <div className="q-progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div style={{ width: 26 }} /> {/* Spacer */}
            </div>

            {/* ─── PHASE BADGE + STEP LABEL ─── */}
            <div className="q-meta">
                {phaseBadge && <span className="q-phase-badge">{phaseBadge}</span>}
                <div className="q-label">{getStepLabel()}</div>
            </div>

            {/* ─── ANIMATED CONTENT AREA ─── */}
            <div className={`q-content ${animClass}`} ref={contentRef}>
                {/* NAME STEP */}
                {isNameStep && (
                    <>
                        <h2 className="q-question">What's your name?</h2>
                        <p className="q-subtitle">We'll personalize your experience with this.</p>
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

                {/* LOCATION STEP */}
                {isLocationStep && (
                    <>
                        <h2 className="q-question">Where do you live?</h2>
                        <p className="q-subtitle">We'll calculate commute times from here.</p>
                        <div className="q-input-area">
                            <div className="q-underline-address">
                                <AddressInput
                                    value={{ address: userLocation.address }}
                                    onChange={(loc) => setUserLocation({
                                        address: loc.address,
                                        coords: loc.coords,
                                    })}
                                    placeholder="Search your home address..."
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* QUESTION STEP */}
                {isQuestionStep && currentQuestion && (
                    <>
                        <h2 className="q-question">{currentQuestion.question}</h2>
                        {currentQuestion.subtitle && (
                            <p className="q-subtitle">{currentQuestion.subtitle}</p>
                        )}
                        <div className="q-options">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    className={`q-option ${isSelected(option) ? 'selected' : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span className="q-option-text">{option}</span>
                                    <div className={`q-radio ${isSelected(option) ? 'checked' : ''}`}>
                                        {isSelected(option) && (
                                            currentQuestion.multi
                                                ? <Check size={13} strokeWidth={3} color="#FFFFFF" />
                                                : <Check size={14} strokeWidth={3} color="#FF3C5D" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* INFO SLIDES */}
                {isInfoStep && (
                    <div className="q-info-slide">
                        <div className="q-info-image-wrapper">
                            <img
                                src={infoSlides[infoIndex].image}
                                alt={infoSlides[infoIndex].title}
                                className="q-info-image"
                            />
                        </div>
                        <h2 className="q-info-title">{infoSlides[infoIndex].title}</h2>
                        <p className="q-info-description">{infoSlides[infoIndex].description}</p>
                    </div>
                )}
            </div>

            {/* ─── FOOTER ─── */}
            <div className="q-footer">
                {isSkippable && isQuestionStep && !isAnswered() && (
                    <button className="q-skip-btn" onClick={handleSkip}>
                        Skip section
                    </button>
                )}
                <button
                    className={`q-next-btn ${shake ? 'btn-shake' : ''}`}
                    onClick={handleNext}
                >
                    {currentStep >= TOTAL_STEPS - 1 ? 'See My Results' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Questionnaire;
