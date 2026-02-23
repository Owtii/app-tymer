import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, Bell, BarChart3, User } from 'lucide-react';
import './AppLayout.css';

const AppLayout = () => {
    return (
        <div className="app-layout">
            <main className="app-content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/app/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={20} />
                </NavLink>

                <NavLink to="/app/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Calendar size={20} />
                </NavLink>

                <NavLink to="/app/alarm" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Bell size={20} />
                </NavLink>

                <NavLink to="/app/insights" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BarChart3 size={20} />
                </NavLink>

                <NavLink to="/app/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <User size={20} />
                </NavLink>
            </nav>
        </div>
    );
};

export default AppLayout;
