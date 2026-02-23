import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home as HomeIcon, Car, PersonStanding, Bus, MapPin, Clock, Navigation, ChevronRight, Footprints } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './RouteDetails.css';

const RouteDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { events } = useAppContext();

    const event = useMemo(() => events.find(e => e.id === eventId), [events, eventId]);

    if (!event) {
        return (
            <div className="route-details-container">
                <button className="route-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <div className="route-not-found">
                    <MapPin size={40} color="#E2E2E2" />
                    <p>Event not found</p>
                </div>
            </div>
        );
    }

    const TravelIcon = event.travelMode === 'transit' ? Bus : event.travelMode === 'walk' ? PersonStanding : Car;
    const travelLabel = event.travelMode === 'transit' ? 'Transit' : event.travelMode === 'walk' ? 'Walk' : 'Drive';
    const totalTravel = (event.travelMinutes || 0) + (event.walkMinutes || 0);

    const fmt = (t) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const getDepartTime = () => {
        const [h, m] = event.time.split(':').map(Number);
        const totalMin = h * 60 + m - totalTravel;
        const dH = Math.floor(((totalMin % 1440) + 1440) % 1440 / 60);
        const dM = ((totalMin % 1440) + 1440) % 1440 % 60;
        const ampm = dH >= 12 ? 'PM' : 'AM';
        return `${dH % 12 || 12}:${dM.toString().padStart(2, '0')} ${ampm}`;
    };

    const steps = [];
    steps.push({
        icon: HomeIcon,
        label: 'Leave Home',
        time: getDepartTime(),
        description: 'Start your journey',
        color: '#FF3C5D'
    });
    steps.push({
        icon: TravelIcon,
        label: `${travelLabel} — ${event.travelMinutes} min`,
        time: '',
        description: event.travelMode === 'drive' ? 'Take your usual route via highway' : event.travelMode === 'transit' ? 'Take bus/train to destination area' : 'Walk to destination',
        color: '#4A56DD'
    });
    if (event.walkMinutes > 0 && event.travelMode !== 'walk') {
        steps.push({
            icon: Footprints,
            label: `Walk — ${event.walkMinutes} min`,
            time: '',
            description: 'Walk from parking/stop to destination',
            color: '#34C759'
        });
    }
    steps.push({
        icon: MapPin,
        label: 'Arrive',
        time: fmt(event.time),
        description: event.location || 'Destination',
        color: '#FF3C5D'
    });

    return (
        <div className="route-details-container">
            {/* Header */}
            <header className="route-details-header">
                <button className="route-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <h2 className="route-details-title">Route Details</h2>
            </header>

            {/* Event Info Card */}
            <div className="route-event-card">
                <div className="route-event-top">
                    <TravelIcon size={18} color="#696969" />
                    <span className="route-event-name">{event.title}</span>
                </div>
                <div className="route-event-times">
                    <div className="route-time-block">
                        <span className="route-time-label">Depart</span>
                        <span className="route-time-value">{getDepartTime()}</span>
                    </div>
                    <ChevronRight size={16} color="#D4D4D4" />
                    <div className="route-time-block">
                        <span className="route-time-label">Arrive</span>
                        <span className="route-time-value">{fmt(event.time)}</span>
                    </div>
                </div>
                <div className="route-event-total">
                    <Clock size={14} color="#979797" />
                    <span>Total travel: {totalTravel} min</span>
                </div>
                {event.location && (
                    <div className="route-event-destination">
                        <MapPin size={14} color="#979797" />
                        <span>{event.location}</span>
                    </div>
                )}
            </div>

            {/* Step-by-step breakdown */}
            <h3 className="route-steps-title">Step-by-Step</h3>
            <div className="route-steps">
                {steps.map((step, i) => (
                    <div key={i} className="route-step">
                        <div className="route-step-line-col">
                            <div className="route-step-dot" style={{ background: step.color }}>
                                <step.icon size={14} color="#FFFFFF" />
                            </div>
                            {i < steps.length - 1 && <div className="route-step-line" />}
                        </div>
                        <div className="route-step-content">
                            <div className="route-step-header">
                                <span className="route-step-label">{step.label}</span>
                                {step.time && <span className="route-step-time">{step.time}</span>}
                            </div>
                            <span className="route-step-desc">{step.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RouteDetails;
