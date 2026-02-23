import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            navigate('/welcome');
        }
    };

    return (
        <div className="ob-container">
            {/* Top bar: back arrow + pagination */}
            <div className="ob-topbar">
                <button className="ob-back-btn" onClick={handleBack}>
                    <ChevronLeft size={26} strokeWidth={3} />
                </button>

                <div className="ob-pagination">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`ob-dot ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div style={{ width: 26 }} /> {/* Spacer */}
            </div>

            {/* Slide track */}
            <div
                className="ob-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="ob-slide">
                        {/* Image */}
                        <div className="ob-image-wrapper">
                            <img src={slide.image} alt={slide.title} className="ob-image" />
                        </div>

                        {/* Text */}
                        <div className="ob-text">
                            <h1 className="ob-title">{slide.title}</h1>
                            <p className="ob-description">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom: Next button */}
            <div className="ob-footer">
                <button className="ob-next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
