import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SocialSync.css';

const SocialSync = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-full w-full flex-col overflow-x-hidden max-w-md mx-auto pb-24">
            <style>{`
                .gradient-text {
                    background: linear-gradient(135deg, #f0425f 0%, #b83248 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .gradient-bg {
                    background: linear-gradient(135deg, #f0425f 0%, #ff6b81 100%);
                }
                .gradient-bg-subtle {
                    background: linear-gradient(180deg, rgba(240, 66, 95, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
                }
            `}</style>
            {/* Header */}
            <header className="sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md pt-6 pb-2 px-6 flex items-center justify-between border-b border-transparent transition-all duration-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Groups</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-body">Manage your punctuality circles</p>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '28px' }}>settings</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Action Buttons */}
                <div className="px-6 py-6 grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center gap-2 h-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 group">
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">qr_code_scanner</span>
                        <span className="text-sm font-semibold">Join via Code</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 h-20 rounded-2xl gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95">
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="text-sm font-semibold">Create Group</span>
                    </button>
                </div>

                {/* Groups List Title */}
                <div className="px-6 pb-2 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Active Circles</h2>
                    <button className="text-primary text-sm font-semibold hover:opacity-80">Sort by Score</button>
                </div>

                {/* Group Cards */}
                <div className="flex flex-col gap-4 px-6 pb-6">
                    {/* Card 1: High Score */}
                    <div
                        onClick={() => navigate('/group/1')}
                        className="relative bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
                    >
                        {/* Subtle Gradient Accent */}
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                        <div className="flex justify-between items-start mb-4 pl-2">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Sunday Brunch Crew</h3>
                                <div className="flex items-center gap-1 mt-1.5">
                                    <div className="flex -space-x-2">
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC_uMsKhdfOFOBBU9h-Mn-r2z2QtvhAFvvjCIdlCjYz5l87sVwr60YBDDn3KavoflPXdgsMuDh-fKm1IwBf-OsR5Qe-sh0l2BVdUcpt8MPeCSQLFQ-75pHzS5lyaXB-c-Aj6s2dz48EPuYIBxMuHd2mYM4e7UE8RxolJli1_cI2GUq17mjZjIEaz08LeNFPMLWjPm1RZD1eZ3zHriA4WTFcIDiNNSQuecj7dokmG-JQixlIRK_EUJltPIddQjQkbRWVSBWMyG4eBRO" />
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB91mo4lp0C9gu1hE2Aa7q8McTXUCtT8kg1zKkKhDsNxb5noYrQi0XVb8ON7JRg-Oo4WdjlOIIju4q6k6_ELnnHzhukjPoxGtZcyw54vh1sBytJG0tHUOIkFnVEH2fd8yH7NxOp1AF2sECZV2Wqi0x0130BO5s_ti2w1uuD4K-G5qnNb-cgQ-bftknmVagPnsfn7OpfKxHTXH3DAdyq6Y3qTcWCluv04dl9l2bHa5_yMtN8j62jTCEt-PkfgO-X0nnFn2I_g8UG6FaU" />
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">+3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-emerald-500">98</span>
                                    <span className="text-sm font-bold text-emerald-500">%</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full mt-1">Excellent</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 pl-4 ml-2 border border-slate-100 dark:border-slate-800">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined text-[20px]">calendar_clock</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Next Event</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">11:00 AM • The Diner</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                        </div>
                    </div>

                    {/* Card 2: Medium Score */}
                    <div className="relative bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                        <div className="flex justify-between items-start mb-4 pl-2">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Marketing Team</h3>
                                <div className="flex items-center gap-1 mt-1.5">
                                    <div className="flex -space-x-2">
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMXR8pkM9dqIlK0GtmHSd_ZSZ_0Se04VcbFeHUoIq_zu0Vxo-TG7ga_JRgL6tCN4dMxGe46xVtORehgwmBN7XyaY1IflN1wpGajy0qXCel3NI0zmp6FvfnxvnXKRb6E13oCoCQcGQWralegHSWmGDjB5ItAN6pPyhiHOTD6jNWlrYmC4itiVye-g3wttsRbZVbAj91-M6S4N72k1F461unSusS6aojYUl_hzv9ipK0duIeXCw6RXYaiaxdhf22lNXaEaZTmTvi-DUJ" />
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">+8</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold gradient-text">84</span>
                                    <span className="text-sm font-bold text-primary">%</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">Late Risk</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 pl-4 ml-2 border border-slate-100 dark:border-slate-800">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-[20px]">event_busy</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Next Event</p>
                                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 italic">No upcoming events</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                        </div>
                    </div>

                    {/* Card 3: New */}
                    <div className="relative bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group opacity-90 hover:opacity-100">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300 dark:bg-slate-600"></div>
                        <div className="flex justify-between items-start mb-4 pl-2">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Gaming Night</h3>
                                <div className="flex items-center gap-1 mt-1.5">
                                    <div className="flex -space-x-2">
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0i9lSPYR1u4EWiW0_Q0NJuWI42v1oX99h-RZWa3peHpB7KXv26_st4Nce7aCQR4XoxssZReu_fG03rccAQqzYWRTeBxRxuAM1PvSMxZTxGeIMtewrAN6dcgweCnnbto9GrIBc0NoFsk4Ip7X1qKBgv9bTMkdxe0cUlrjErlybh7YVqcGgCGV8z2LlgsWEsajvr6pSMBVToNUodDyK-Ii2hfXQoQH935NGQTo8tB9XJQA0saS5iXjDUKaXtEO2Nm9M3xa9FIKkX72j" />
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhOmLk1_3yswPucAkbCUyF7efkNrx_37lv5559accrTH6mft6IbIRkQcrnZ5Fhda-I3_FVoeLq2fdmiogXVgvq2asaR_bUMZ9lj24XrmBPR6atvBzuSL_w56ULHYYoC1KMq5Yrij0d0cQ9PHLIFunLaWEGrhDX-ttQVkQ95PGiDtBIxX6kM_RZVSbopYoC0XIdXb6hde05gGbWr2T64331UNS8hOwisIDN5ojldpfW_7wYxQ8iwl_JXspGmTExNHxT1w17LqtoiFTv" />
                                        <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPqkS645Broom5l3SdxsZ-S-NOYDQ7bBjtWNgSb50OmdZnccT4aJn2c0rhH3-yfpJqTtXE1ke7T4BZWTLlruT52zIUPxlacTHqYUZRjrFpw6jY4emISKTuSfmCYKz4qMadLOcViLgI1hPlchaqx2XwXCyif2VO926gW_Ml6chB6cQr4rKXRGkOG4ZB8oIbqCtAzSrqV2HCXcLF9BmmzTsZNJ2_hiVHb5NSwMEtqWmmZyXN5tzSiAMOJdXk8s5KDERIVbnPZDeQtMh7" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-400">--</span>
                                    <span className="text-sm font-bold text-slate-400">%</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full mt-1">New</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 pl-4 ml-2 border border-slate-100 dark:border-slate-800">
                            <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Next Event</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Tomorrow • 8:00 PM</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                        </div>
                    </div>
                </div>

                {/* Marketing Space */}
                <div className="px-6 pb-6">
                    <div className="rounded-3xl gradient-bg-subtle p-6 text-center border border-primary/10">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="material-symbols-outlined text-primary text-3xl">emoji_events</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Boost Your Score</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-body">Groups with over 95% punctuality unlock exclusive rewards.</p>
                        <button className="text-primary font-bold text-sm hover:underline">Learn more</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SocialSync;
