import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, Users, User, Plus } from 'lucide-react';
import './AppLayout.css';

const AppLayout = () => {
    return (
        <div className="app-layout">
            <main className="app-content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/app/home" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                    <Home size={24} />
                    <span className="text-[10px] font-bold">Home</span>
                </NavLink>

                <NavLink to="/app/calendar" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                    <Calendar size={24} />
                    <span className="text-[10px] font-bold">Schedule</span>
                </NavLink>

                <div className="relative -top-8">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-xl hover:scale-105 transition-transform">
                        <Plus size={32} strokeWidth={3} />
                    </button>
                </div>

                <NavLink to="/app/groups" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                    <Users size={24} />
                    <span className="text-[10px] font-bold">Groups</span>
                </NavLink>

                <NavLink to="/app/insights" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                    <span className="material-symbols-outlined text-[24px]">bar_chart</span>
                    <span className="text-[10px] font-bold">Stats</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AppLayout;
