import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, Users, User } from 'lucide-react';
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

                {/* Center FAB */}
                <div className="nav-fab-wrapper">
                    <button className="nav-fab">
                        <span className="nav-fab-plus">+</span>
                    </button>
                </div>

                <NavLink to="/app/groups" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users size={20} />
                </NavLink>

                <NavLink to="/app/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <User size={20} />
                </NavLink>
            </nav>
        </div>
    );
};

export default AppLayout;
