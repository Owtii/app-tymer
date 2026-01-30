import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Toggles state
    const [googleCal, setGoogleCal] = useState(false);
    const [appleCal, setAppleCal] = useState(false);
    const [emailScan, setEmailScan] = useState(true); // Default to on as per design

    return (
        <div className="relative flex h-full w-full flex-col mx-auto max-w-md pb-32 min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-200 font-sans">
            {/* Header - No Back Button as this is a main tab */}
            <header className="flex items-center justify-center px-6 py-5 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm sticky top-0 z-50">
                <h1 className="text-base font-bold tracking-tight">Profile & Settings</h1>
            </header>

            <div className="flex flex-col items-center px-6 mb-10 pt-2">
                <div className="relative group cursor-pointer">
                    <div
                        className="h-28 w-28 rounded-full bg-cover bg-center shadow-lg border-[4px] border-white dark:border-surface-dark transition-transform duration-300 transform group-hover:scale-105"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2cAHwEoQH1Fn3SRqXvk8GRYPaeBErPv2xoxbgeptCukcjm2hEaA-p-M_kcIYC_qn3UbUxHD46d2oHPb8BWgfcqU5WImkP5vvVer4nbf6Ht8tpZC7Ho1C1k8qBNkJpCOaSoEzxqfwOdd0U0z2NReyBxwDFfwdC7gA8BtvTDvyOEwPVJNzSShGzVu8qq55qfEH3KiYuXVYp7bX5ppMjH7aSe4GbjvDDzKpOjy4QDQLvh32tgclaF1EUG6Jemy3nOOXPazEf_u0iZQ8v")' }}
                    >
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white dark:bg-surface-dark rounded-full p-2 shadow-md border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-primary text-sm font-bold block">edit</span>
                    </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-center tracking-tight font-heading">Alex Johnson</h2>
                <div className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-rose-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-md shadow-primary/20 flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[14px] fill-current">verified</span>
                    Premium
                </div>
            </div>

            {/* Logistics Engine */}
            <div className="px-6 mb-10">
                <div className="flex items-center gap-2 mb-4 pl-1">
                    <span className="text-2xl filter drop-shadow-sm select-none">🚘</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Logistics Engine</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <button className="bg-gray-50 dark:bg-surface-dark rounded-2xl p-3 flex flex-col items-center justify-center gap-2 aspect-[4/4.5] shadow-sm hover:shadow-md transition-shadow active:scale-95 duration-200 border border-transparent dark:border-gray-800">
                        <div className="text-3xl mb-1 filter drop-shadow-sm">🚗</div>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Transport</span>
                        <span className="text-sm font-bold text-primary">Car</span>
                    </button>
                    <button className="bg-gray-50 dark:bg-surface-dark rounded-2xl p-3 flex flex-col items-center justify-center gap-2 aspect-[4/4.5] shadow-sm hover:shadow-md transition-shadow active:scale-95 duration-200 border border-transparent dark:border-gray-800">
                        <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">timer</span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Duration</span>
                        <span className="text-sm font-bold text-primary">30m</span>
                    </button>
                    <button className="bg-gray-50 dark:bg-surface-dark rounded-2xl p-3 flex flex-col items-center justify-center gap-2 aspect-[4/4.5] shadow-sm hover:shadow-md transition-shadow active:scale-95 duration-200 border border-transparent dark:border-gray-800">
                        <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">hourglass_top</span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Buffer</span>
                        <span className="text-sm font-bold text-primary">5m</span>
                    </button>
                </div>
            </div>

            {/* Sync & Intelligence */}
            <div className="px-6 mb-10">
                <div className="flex items-center gap-2 mb-5 pl-1">
                    <span className="text-2xl filter drop-shadow-sm select-none">📅</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sync & Intelligence</h3>
                </div>
                <div className="flex flex-col gap-7">
                    {/* Google Cal Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <span className="text-base font-semibold">Google Calendar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={googleCal}
                                onChange={() => setGoogleCal(!googleCal)}
                            />
                            <div className="w-11 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-rose-500"></div>
                        </label>
                    </div>

                    {/* Apple Cal Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                                <span className="material-symbols-outlined">event</span>
                            </div>
                            <span className="text-base font-semibold">Apple Calendar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={appleCal}
                                onChange={() => setAppleCal(!appleCal)}
                            />
                            <div className="w-11 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-rose-500"></div>
                        </label>
                    </div>

                    {/* Email Scan Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-semibold">Email Scanning</span>
                                <span className="text-xs text-slate-500">For flights & events</span>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={emailScan}
                                onChange={() => setEmailScan(!emailScan)}
                            />
                            <div className="w-11 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-rose-500"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* App Behavior */}
            <div className="px-6 mb-8">
                <div className="flex items-center gap-2 mb-5 pl-1">
                    <span className="text-2xl filter drop-shadow-sm select-none">⚙️</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">App Behavior</h3>
                </div>
                <div className="flex flex-col gap-6">
                    <button className="flex items-center justify-between cursor-pointer group w-full text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                                <span className="material-symbols-outlined">notifications</span>
                            </div>
                            <span className="text-base font-semibold">Notifications</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Strict</span>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-xl">chevron_right</span>
                        </div>
                    </button>
                    <button className="flex items-center justify-between cursor-pointer group w-full text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <span className="text-base font-semibold">Saved Locations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Home / Work</span>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-xl">chevron_right</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 mt-auto mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full py-4 rounded-2xl bg-gray-50 dark:bg-surface-dark text-slate-500 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mb-2 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">help</span>
                    Help & Support
                </button>
                <button
                    onClick={() => navigate('/welcome')}
                    className="w-full py-3 text-center text-primary text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                    Log Out
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4 font-medium tracking-wide">Punct v2.4.0 (Build 412)</p>
            </div>

        </div>
    );
};

export default Profile;
