import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState('12:45');

    useEffect(() => {
        // Simple countdown logic simulation
        const timer = setInterval(() => {
            // Logic kept simple for visual fidelity
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen font-body text-slate-900 pb-24">

            {/* Header */}
            <header className="pt-10 px-6 pb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight font-display tracking-tight">Good Morning,<br />Alex</h1>
                </div>
                <div className="bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-full border border-sky-100 dark:border-sky-800 flex items-center gap-1.5 shadow-sm">
                    <span className="text-sm">🌧️</span>
                    <span className="text-xs font-bold text-sky-700 dark:text-sky-300">Rain: +5m buffer</span>
                </div>
            </header>

            <main className="flex-1 px-6 space-y-8">

                {/* Hero Card: Point of No Return */}
                <section className="bg-white dark:bg-surface-dark rounded-[24px] p-6 shadow-soft relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Point of No Return</span>
                        <span className="material-symbols-outlined text-slate-300">more_horiz</span>
                    </div>

                    <div className="flex flex-col items-center py-2">
                        <span className="text-sm font-semibold text-slate-400 mb-[-5px]">LEAVE IN</span>
                        <div className="text-[80px] font-black text-slate-900 dark:text-white leading-none tracking-tighter tabular-nums font-display">
                            12:45
                        </div>
                    </div>

                    {/* Logistics Bar */}
                    <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between relative">
                            {/* Segment 1: Drive */}
                            <div className="flex flex-col items-center gap-1 z-10">
                                <span className="material-symbols-outlined text-slate-400 text-lg">directions_car</span>
                                <span className="text-[10px] font-bold text-slate-500">15m</span>
                            </div>

                            {/* Connector Line */}
                            <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full relative overflow-hidden">
                                <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-orange-400 to-rose-500 rounded-full"></div>
                            </div>

                            {/* Segment 2: Parking */}
                            <div className="flex flex-col items-center gap-1 z-10">
                                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-500 text-xs font-bold">local_parking</span>
                                </div>
                                <span className="text-[10px] font-bold text-rose-500">5m</span>
                            </div>

                            {/* Connector Line */}
                            <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full"></div>

                            {/* Segment 3: Walk */}
                            <div className="flex flex-col items-center gap-1 z-10">
                                <span className="material-symbols-outlined text-slate-300 text-lg">directions_walk</span>
                                <span className="text-[10px] font-bold text-slate-300">5m</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today's Schedule</span>
                    </div>

                    <div className="relative pl-4 space-y-6">
                        {/* Vertical Line */}
                        <div className="absolute left-[23px] top-2 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>

                        {/* Item 1: Done */}
                        <div className="flex items-center gap-4 opacity-50 grayscale">
                            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-surface-dark flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-xs text-white">check</span>
                            </div>
                            <div className="flex items-center justify-between w-full bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-50">
                                <span className="text-sm font-semibold line-through">Wake Up Alarm</span>
                                <span className="text-xs font-bold">07:00 AM</span>
                            </div>
                        </div>

                        {/* Item 2: Active (Dentist) */}
                        <div className="flex items-center gap-4 relative">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 border-2 border-white dark:border-surface-dark shadow-[0_0_10px_rgba(244,63,94,0.5)] shrink-0 z-10"></div>
                            <div className="flex flex-col w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-lg shadow-rose-100 dark:shadow-none border-l-4 border-l-rose-500">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-base font-bold text-slate-900 dark:text-white">Dentist Appointment</span>
                                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[10px] font-bold text-rose-500 uppercase">Now</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>Dr. Smith • Downtown</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 3: Lunch Team */}
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 dark:border-slate-600 shrink-0"></div>
                            <div className="flex items-center justify-between w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Lunch with Team</p>
                                    <p className="text-xs text-slate-400">12:30 PM • The Diner</p>
                                </div>
                                <div className="flex -space-x-2">
                                    <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?img=12" alt="u1" />
                                    <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?img=15" alt="u2" />
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] border border-white font-bold">+2</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
