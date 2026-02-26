import { useState, useEffect, useMemo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Bell, BarChart3, User } from 'lucide-react';
import './AppLayout.css';

const NAV_ITEMS = [
    { to: '/app/home', icon: Home },
    { to: '/app/calendar', icon: Calendar },
    { to: '/app/alarm', icon: Bell },
    { to: '/app/insights', icon: BarChart3 },
    { to: '/app/profile', icon: User },
];

const AppLayout = () => {
    const location = useLocation();

    const activeIndex = useMemo(() => {
        const idx = NAV_ITEMS.findIndex(item => location.pathname.startsWith(item.to));
        return idx >= 0 ? idx : 0;
    }, [location.pathname]);

    return (
        <div className="app-layout">
            <main className="app-content">
                <div className="page-transition" key={location.pathname}>
                    <Outlet />
                </div>
            </main>

            <nav className="bottom-nav">
                {/* Glide indicator */}
                <div
                    className="nav-glide-indicator"
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                />

                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default AppLayout;
