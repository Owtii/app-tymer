import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Onboarding.css';

// Import assets
import imgNeverRush from '../assets/onboarding_never_rush_3d_1769479610554.png';
import imgSmartArrival from '../assets/onboarding_smart_arrival_3d_1769479626052.png';
import imgMeetSynced from '../assets/onboarding_meet_synced_3d_1769479639934.png';
import imgOwnTime from '../assets/onboarding_own_time_3d_1769479655346.png';

const slides = [
    { id: 1, title: 'Never Rush', description: 'AI plans your logistics so you don\'t have to.', image: imgNeverRush },
    { id: 2, title: 'Smart Arrival', description: 'Automatically calculating travel, parking, and walking times.', image: imgSmartArrival },
    { id: 3, title: 'Meet Synced', description: 'Unique routes for your group to arrive together.', image: imgMeetSynced },
    { id: 4, title: 'Own Time', description: 'Built for personal growth and total privacy.', image: imgOwnTime }
];

const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            navigate('/questionnaire');
        }
    };

    const handleSkip = () => {
        navigate('/questionnaire');
    };

    const isLastSlide = currentIndex === slides.length - 1;

    return (
        <div className="onboarding-container">
            <div
                className="onboarding-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="onboarding-slide">
                        <div className="slide-content">
                            {/* Static 3D Asset Container (No animation) */}
                            <div className="image-container-3d">
                                <img src={slide.image} alt={slide.title} className="slide-3d-image" />
                            </div>

                            <div className="text-content">
                                <h1 className="slide-title">{slide.title}</h1>
                                <p className="slide-description">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="onboarding-controls">
                <div className="pagination">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>

                {/* Buttons Stack */}
                <div className="btn-stack">
                    <Button
                        variant="accent"
                        size="lg"
                        onClick={handleNext}
                        className="fitted-btn"
                    >
                        {isLastSlide ? 'Get Started' : 'Next'}
                    </Button>

                    {/* Placeholder to keep layout stable when skip disappears */}
                    <div className="skip-container">
                        {!isLastSlide && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="skip-btn"
                                onClick={handleSkip}
                            >
                                Skip
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
