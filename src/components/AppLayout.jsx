import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, User, Award } from 'lucide-react';
import './AppLayout.css';

const AppLayout = () => {
    return (
        <div className="app-layout">
            <main className="app-content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/app/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={24} />
                    <span className="nav-label">Home</span>
                </NavLink>

                <NavLink to="/app/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Calendar size={24} />
                    <span className="nav-label">Calendar</span>
                </NavLink>

                <NavLink to="/app/groups" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users size={24} />
                    <span className="nav-label">Groups</span>
                </NavLink>

                <NavLink to="/app/insights" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Award size={24} /> {/* Or BarChart2 */}
                    <span className="nav-label">Insights</span>
                </NavLink>

                <NavLink to="/app/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <User size={24} />
                    <span className="nav-label">Profile</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AppLayout;
