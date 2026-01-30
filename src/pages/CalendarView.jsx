import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(24); // Default to 'Today'

    // Mock Data for the week
    const weekDays = [
        { day: 'Mon', date: 23, active: false, past: true },
        { day: 'Tue', date: 24, active: true, past: false }, // Active
        { day: 'Wed', date: 25, active: false, past: false },
        { day: 'Thu', date: 26, active: false, past: false },
        { day: 'Fri', date: 27, active: false, past: false },
        { day: 'Sat', date: 28, active: false, past: false },
    ];

    return (
        <div className="relative flex h-full w-full flex-col overflow-x-hidden max-w-md mx-auto pb-24">
            {/* Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-6 pb-4 border-b border-transparent transition-all">
                <button className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">menu</span>
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">October</h2>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Today</span>
                </div>
                <button className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">add_circle</span>
                </button>
            </header>

            {/* Date Scroller */}
            <div className="bg-background-light dark:bg-background-dark pb-6 pt-2 z-10 sticky top-[72px]">
                <div className="flex gap-3 px-6 overflow-x-auto no-scrollbar snap-x">
                    {weekDays.map((day, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDate(day.date)}
                            className={`flex flex-col h-16 min-w-[4rem] shrink-0 items-center justify-center gap-1 rounded-2xl snap-center transition-all cursor-pointer border-2
                                ${day.active
                                    ? 'bg-primary border-primary shadow-lg shadow-primary/30 text-white transform scale-105'
                                    : 'bg-white dark:bg-surface-dark border-transparent text-slate-500 hover:border-primary/30'
                                }
                                ${day.past && !day.active ? 'opacity-50 grayscale' : ''}
                            `}
                        >
                            <span className="text-xs font-bold uppercase tracking-wide opacity-80">{day.day}</span>
                            <span className="text-xl font-bold">{day.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Content */}
            <div className="relative flex-1 px-6 py-4 space-y-6">
                {/* Vertical Line */}
                <div className="absolute left-[44px] top-4 bottom-20 w-0.5 bg-slate-200 dark:bg-slate-800 z-0 rounded-full"></div>

                {/* Current Time Indicator */}
                <div className="relative z-10 flex items-center pl-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-background-dark shadow-sm"></div>
                    <div className="h-0.5 bg-primary/20 flex-1 ml-3 rounded-full"></div>
                    <span className="text-primary text-xs font-bold ml-2 bg-primary/10 px-2 py-0.5 rounded-full">08:45 AM</span>
                </div>

                {/* Event 1: Punct Buffer */}
                <div className="relative z-10 flex group">
                    <div className="absolute left-[8px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-400">08:50</span>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full border-2 border-background-light dark:border-background-dark"></div>
                    </div>

                    <div className="ml-12 w-full bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group-hover:shadow-md transition-all">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300 dark:bg-slate-600"></div>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Travel Buffer</h3>
                            <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg">Active</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            <span>Guaranteed arrival safety</span>
                        </div>
                    </div>
                </div>

                {/* Event 2: Strategy Meeting */}
                <div className="relative z-10 flex">
                    <div className="absolute left-[8px] top-8 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-900 dark:text-white">09:00</span>
                        <div className="w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-white dark:ring-background-dark"></div>
                    </div>

                    <div className="ml-12 w-full bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden hover:shadow-md transition-all cursor-pointer">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Q3 Strategy Meeting</h3>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Marketing Team</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                <span className="material-symbols-outlined">videocam</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                                <span className="font-medium">09:00 - 10:30 AM</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span className="truncate">San Francisco HQ, Room 402</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <img className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                <img className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                <img className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark" src="https://i.pravatar.cc/100?img=3" alt="User" />
                                <div className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-dark bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">+4</div>
                            </div>
                            <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                        </div>
                    </div>
                </div>

                {/* Event 3: Lunch */}
                <div className="relative z-10 flex">
                    <div className="absolute left-[8px] top-8 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-400">12:30</span>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    </div>

                    <div className="ml-12 w-full bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden hover:shadow-md transition-all cursor-pointer opacity-90">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Team Lunch</h3>
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined text-[18px]">restaurant</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">The Italian Place • SoHo</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CalendarView;
