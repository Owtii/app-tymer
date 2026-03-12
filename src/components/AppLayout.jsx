import { useState, useEffect, useMemo, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { CustomHome, CustomCalendar, CustomBell, CustomChart, CustomUser } from './CustomIcons';
import './AppLayout.css';

const NAV_ITEMS = [
    { to: '/app/home', icon: CustomHome, label: 'Home' },
    { to: '/app/calendar', icon: CustomCalendar, label: 'Calendar' },
    { to: '/app/alarm', icon: CustomBell, label: 'Alarm' },
    { to: '/app/insights', icon: CustomChart, label: 'Insights' },
    { to: '/app/profile', icon: CustomUser, label: 'Profile' },
];

// Map paths to numeric indices for slide direction
const PATH_INDEX = {
    '/app/home': 0,
    '/app/calendar': 1,
    '/app/alarm': 2,
    '/app/insights': 3,
    '/app/profile': 4,
};

const AppLayout = () => {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);
    const [slideDirection, setSlideDirection] = useState('none');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const activeIndex = useMemo(() => {
        const idx = NAV_ITEMS.findIndex(item => location.pathname.startsWith(item.to));
        return idx >= 0 ? idx : 0;
    }, [location.pathname]);

    // Determine slide direction on path change
    useEffect(() => {
        const prevPath = prevPathRef.current;
        const prevIndex = PATH_INDEX[prevPath] ?? 0;
        const currIndex = PATH_INDEX[location.pathname] ?? 0;

        if (prevPath !== location.pathname) {
            if (currIndex > prevIndex) {
                setSlideDirection('slide-left');
            } else if (currIndex < prevIndex) {
                setSlideDirection('slide-right');
            } else {
                setSlideDirection('slide-fade');
            }
            setIsTransitioning(true);

            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 420);

            prevPathRef.current = location.pathname;
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    return (
        <div className="app-layout">
            <main className="app-content">
                <div className={`page-slide-transition ${slideDirection}`} key={location.pathname}>
                    <Outlet />
                </div>
            </main>

            <nav className="bottom-nav liquid-glass">
                {/* Glass shimmer animation layer */}
                <div className="nav-glass-shimmer" />

                {/* Glide indicator — liquid glass */}
                <div
                    className="nav-glide-indicator liquid-glass-indicator"
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                />

                {NAV_ITEMS.map((item, index) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <div className="nav-icon-wrapper">
                            <item.icon size={19} />
                        </div>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default AppLayout;
