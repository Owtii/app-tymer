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
        type: 'age',
        options: []
    },
    {
        id: 3, phase: 0,
        question: 'How do you identify?',
        options: ['Male', 'Female', 'Prefer not to say']
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
   → LOADING → DONE
=============================================== */
const QUESTION_OFFSET = 2;               // first question at step index 2
const TOTAL_QUESTION_STEPS = questions.length; // 18
const TOTAL_STEPS = QUESTION_OFFSET + TOTAL_QUESTION_STEPS; // 20

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
    const [progressAnimating, setProgressAnimating] = useState(false);
    const [infoSlideIndex, setInfoSlideIndex] = useState(0);
    const contentRef = useRef(null);
    const ageWheelRef = useRef(null);
    const AGE_MIN = 0;
    const AGE_MAX = 150;
    const AGE_ITEM_HEIGHT = 64;
    const ages = Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => AGE_MIN + i);

    // Track which age is currently selected via scroll
    const selectedAge = answers[2] ? parseInt(answers[2]) : null;

    // ─── Loading progress timer ───
    useEffect(() => {
        if (view === 'loading') {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) { clearInterval(interval); return 100; }
                    return prev + 1;
                });
            }, 80);
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

    // ─── Auto-slide info carousel during loading ───
    useEffect(() => {
        if (view === 'loading' && !finalized) {
            const interval = setInterval(() => {
                setInfoSlideIndex(prev => (prev + 1) % infoSlides.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [view, finalized]);

    // ─── Trigger slide-in animation on step change ───
    useEffect(() => {
        setAnimating(true);
        setProgressAnimating(true);
        const timeout = setTimeout(() => setAnimating(false), 350);
        const progressTimeout = setTimeout(() => setProgressAnimating(false), 800);
        return () => { clearTimeout(timeout); clearTimeout(progressTimeout); };
    }, [currentStep]);

    // ─── Scroll to selected age on mount ───
    useEffect(() => {
        // Compute directly: age question is Q2 (index 1 in questions array), at step QUESTION_OFFSET + 1
        const ageStepIndex = QUESTION_OFFSET + 1; // Q2 is the second question
        if (currentStep !== ageStepIndex) return;

        const initScroll = () => {
            if (!ageWheelRef.current) return;
            const currentAge = answers[2] ? parseInt(answers[2]) : 20;
            const index = currentAge - AGE_MIN;
            // Items start after a spacer of height = containerH/2 - itemH/2
            // To center item N, scroll so that: spacerH + index*itemH is at containerH/2 - itemH/2
            // scrollTop = index * AGE_ITEM_HEIGHT
            ageWheelRef.current.scrollTop = index * AGE_ITEM_HEIGHT;
            if (!answers[2]) {
                setAnswers(prev => ({ ...prev, 2: '20' }));
            }
        };

        // Wait for DOM to be fully ready after animation
        const timer = setTimeout(initScroll, 150);
        return () => clearTimeout(timer);
    }, [currentStep]);

    const handleAgeScroll = () => {
        if (!ageWheelRef.current) return;
        const scrollTop = ageWheelRef.current.scrollTop;
        // Items start after a spacer. The spacer height = containerH/2 - itemH/2
        // The center of the viewport is at scrollTop + containerH/2
        // The item at the center = (scrollTop) / AGE_ITEM_HEIGHT since spacer accounts for the offset
        const index = Math.round(scrollTop / AGE_ITEM_HEIGHT);
        const clampedIndex = Math.max(0, Math.min(ages.length - 1, index));
        const age = ages[clampedIndex];
        if (age !== selectedAge) {
            setAnswers(prev => ({ ...prev, 2: String(age) }));
        }
    };

    const scrollToAge = (age) => {
        if (!ageWheelRef.current) return;
        const index = age - AGE_MIN;
        ageWheelRef.current.scrollTo({ top: index * AGE_ITEM_HEIGHT, behavior: 'smooth' });
    };

    /* ═════════════════════════════
       HELPERS
    ═════════════════════════════ */
    const isNameStep = currentStep === 0;
    const isLocationStep = currentStep === 1;
    const isQuestionStep = currentStep >= QUESTION_OFFSET && currentStep < TOTAL_STEPS;
    const qIndex = currentStep - QUESTION_OFFSET;
    const currentQuestion = isQuestionStep ? questions[qIndex] : null;
    const currentPhase = currentQuestion ? phases[currentQuestion.phase] : null;
    const isSkippable = currentPhase ? currentPhase.skippable : false;

    const isAnswered = () => {
        if (!currentQuestion) return false;
        if (currentQuestion.type === 'age') return !!answers[currentQuestion.id];
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
    };

    const handleSkip = () => {
        if (isQuestionStep) {
            const currentPhaseId = currentQuestion.phase;
            let nextStep = currentStep + 1;
            while (nextStep < TOTAL_STEPS) {
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
        return '';
    };

    const getPhaseBadge = () => {
        if (isNameStep || isLocationStep) return null;
        if (isQuestionStep && currentPhase) return currentPhase.name;
        return null;
    };

    /* ═════════════════════════════════════════════════
       RENDER: LOADING / FINALIZING
    ═════════════════════════════════════════════════ */
    if (view === 'loading') {
        const currentTaskIdx = timeSteps.findIndex(s => loadingProgress < s.threshold);
        const currentTask = currentTaskIdx >= 0 ? timeSteps[currentTaskIdx] : timeSteps[timeSteps.length - 1];
        const pct = Math.min(loadingProgress, 100);
        const hundreds = Math.floor(pct / 100);
        const tens = Math.floor((pct % 100) / 10);
        const ones = pct % 10;

        const renderDigitStrip = (digit, key) => (
            <div className="pers-digit-roller" key={key}>
                <div
                    className="pers-digit-strip"
                    style={{ transform: `translateY(-${digit * 72}px)` }}
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <div className="pers-digit-num" key={n}>{n}</div>
                    ))}
                </div>
            </div>
        );

        const handleTouchStart = (e) => {
            e.currentTarget._touchStartX = e.touches[0].clientX;
        };
        const handleTouchEnd = (e) => {
            const startX = e.currentTarget._touchStartX;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    setInfoSlideIndex(prev => Math.min(prev + 1, infoSlides.length - 1));
                } else {
                    setInfoSlideIndex(prev => Math.max(prev - 1, 0));
                }
            }
        };

        return (
            <div className="q-container pers-container">
                <div className="pers-content">
                    {/* Odometer percentage */}
                    <div className="pers-percent-wrapper">
                        {hundreds > 0 && renderDigitStrip(hundreds, 'h')}
                        {(hundreds > 0 || tens > 0) && renderDigitStrip(tens, 't')}
                        {renderDigitStrip(ones, 'o')}
                        <span className="pers-percent-sign">%</span>
                    </div>
                    <p className="pers-title">We're setting everything up for you</p>

                    {/* Loading bar */}
                    <div className="pers-bar-track">
                        <div className="pers-bar-fill" style={{ width: `${Math.min(loadingProgress, 100)}%` }} />
                    </div>
                    <p className="pers-task-label">{currentTask.label}</p>

                    {/* Task list */}
                    <div className="pers-tasks">
                        {timeSteps.map((step, idx) => {
                            const isCompleted = loadingProgress >= step.threshold;
                            const isCurrent = !isCompleted && (idx === 0 || loadingProgress >= timeSteps[idx - 1].threshold);
                            return (
                                <div key={idx} className={`pers-task-row ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                    <div className="pers-task-dot">
                                        {(isCompleted || isCurrent) ? (
                                            <div className="pers-dot-filled" />
                                        ) : (
                                            <div className="pers-dot-empty" />
                                        )}
                                    </div>
                                    <span className="pers-task-text">{step.label}</span>
                                    {isCompleted && (
                                        <div className="pers-task-check">
                                            <Check size={14} strokeWidth={3} color="#FF3C5D" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Info carousel */}
                    <div
                        className="pers-carousel"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="pers-carousel-track" style={{ transform: `translateX(-${infoSlideIndex * 100}%)` }}>
                            {infoSlides.map((slide) => (
                                <div key={slide.id} className="pers-carousel-slide">
                                    <img src={slide.image} alt={slide.title} className="pers-carousel-img" />
                                    <h3 className="pers-carousel-title">{slide.title}</h3>
                                    <p className="pers-carousel-desc">{slide.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pers-carousel-dots">
                            {infoSlides.map((_, i) => (
                                <div
                                    key={i}
                                    className={`pers-carousel-dot ${i === infoSlideIndex ? 'active' : ''}`}
                                    onClick={() => setInfoSlideIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confetti */}
                {finalized && <div className="pers-confetti" />}

                {/* Continue button */}
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
                    <ChevronLeft size={24} strokeWidth={3} />
                </button>
                <div className="q-progress-track">
                    <div className={`q-progress-fill ${progressAnimating ? 'animating' : ''}`} style={{ width: `${progressPercent}%` }} />
                </div>
                <div style={{ width: 24 }} /> {/* Spacer */}
            </div>

            {/* ─── PHASE BADGE + STEP LABEL (hidden on question steps) ─── */}
            {!isQuestionStep && (
                <div className="q-meta">
                    {phaseBadge && <span className="q-phase-badge">{phaseBadge}</span>}
                    <div className="q-label">{getStepLabel()}</div>
                </div>
            )}

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

                        {/* AGE PICKER */}
                        {currentQuestion.type === 'age' ? (
                            <div className="q-age-picker">
                                <span className="q-age-side-text">I'm</span>
                                <div className="q-age-wheel">
                                    <div className="q-age-highlight" />
                                    <div
                                        className="q-age-wheel-inner"
                                        ref={ageWheelRef}
                                        onScroll={handleAgeScroll}
                                    >
                                        {/* Top spacer */}
                                        <div style={{ height: `calc(50% - ${AGE_ITEM_HEIGHT / 2}px)` }} />
                                        {ages.map(age => {
                                            const isSelected = selectedAge === age;
                                            const isAdjacent = selectedAge && Math.abs(selectedAge - age) === 1;
                                            return (
                                                <div
                                                    key={age}
                                                    className={`q-age-item${isSelected ? ' selected' : ''}${isAdjacent ? ' adjacent' : ''}`}
                                                    onClick={() => scrollToAge(age)}
                                                >
                                                    {age}
                                                </div>
                                            );
                                        })}
                                        {/* Bottom spacer */}
                                        <div style={{ height: `calc(50% - ${AGE_ITEM_HEIGHT / 2}px)` }} />
                                    </div>
                                </div>
                                <span className="q-age-side-text">yrs old</span>
                            </div>
                        ) : (
                            /* NORMAL OPTIONS */
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
                                                <Check size={13} strokeWidth={3} color="#FFFFFF" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
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
                    {currentStep >= TOTAL_STEPS - 1 ? 'See My Results' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default Questionnaire;
