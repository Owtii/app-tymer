import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 flex justify-center items-start pt-4 transition-colors duration-300">
            <div className="w-full max-w-sm mx-auto bg-background-light dark:bg-background-dark min-h-screen relative overflow-hidden">

                {/* Helper Syles for this page specific effects */}
                <style>{`
          .avatar-glow-green { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #d1fae5; }
          .avatar-glow-red { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ffe4e6; }
          .dark .avatar-glow-green { box-shadow: 0 0 0 2px #1f2937, 0 0 0 4px rgba(16, 185, 129, 0.3); }
          .dark .avatar-glow-red { box-shadow: 0 0 0 2px #1f2937, 0 0 0 4px rgba(225, 29, 72, 0.3); }
        `}</style>

                {/* Status Bar Mock (Visual only) */}
                <div className="px-6 pt-2 pb-4 flex justify-between items-center z-20 relative">
                    <span className="text-sm font-semibold dark:text-white">9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <span className="material-symbols-outlined text-sm dark:text-white">signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-sm dark:text-white">wifi</span>
                        <span className="material-symbols-outlined text-sm dark:text-white">battery_full</span>
                    </div>
                </div>

                <div className="px-6 mb-6 relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                        </button>
                        <div className="flex -space-x-3">
                            <img alt="User 1" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0IAoXs15gw5KOW0IwsNto0hU_3YTxQHZd4YLcu5k-JkTaxSeMeDwk8N-g5YfUM59peR6mhcYZEWBIlCMi0eW7dmbkwzHCWM2TLyvVWriHk9eiFkmB82FnqTC1hpsO0okg2FfJF1PYk1iOACDlumrCv_MgVi0xpogjV7i4aX7B88KeskX4BW-_66qv-EYBJGUKEvx28EWAAteQnKgT8VZyQWnNkj8FsiTWlFzP2bjD7Xlh5m6oHvaMXLsuak0z8yX0hA_DDiRVGEbc" />
                            <img alt="User 2" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwxqFPLXJ4v3sIx1K37vERCFJUpCWqfpJL8tIpbETcjxnfivE8RGtQsQoByi_iPzE5f708en4AFs0GtRv_9MCpFWfAerElusDSdRupJTJREdOeBnYrMwdUMKhM358D84GrGUzg_mdaYSMv6KBFUH0bP6cg7Cc3ZGypDJl7TMfPDemdI0Ckby2NgaQTnTGbI6ZuAw_xMif2DfAgREQzdhxE1B2QsxqEt0vYnNk-ge3L3FE0oy-TQx8B_oXi_4HPCxR8pZ1PmT7ye0lr" />
                            <img alt="User 3" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3LBvwKZQLXSrX8ftnBdyD4hOKotesiVMYZMzqRN8VR1QhsknflWvLtD5cLywuzP_d7Fuds6DN1aErSxCWbeOPzR_ljyc2etmRr_lx-U4Rrrub43h8jhnE_PfkXHHrH5W-Wpff1AW_WDEXKmEtyY9LaLjdZG5IlWq-685vA07viEK5FGO_Eaf9a6TjFJiCBjQ-b6kYZZ0_BcoCGnwXS3wOu0Ow180OCEidy6PVlxoquUnm2q4O_J06u6v2eIL8-IwgXKapYL3HxRaa" />
                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-gradient-to-br from-rose-500 to-primary flex items-center justify-center text-white text-[10px] font-bold">+2</div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Dinner at Sotto</h1>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <span className="bg-white dark:bg-surface-dark px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-xs text-primary">schedule</span> 8:00 PM
                        </span>
                        <span className="bg-white dark:bg-surface-dark px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-xs text-primary">location_on</span> Downtown
                        </span>
                    </div>
                </div>

                <div className="px-6 mb-8">
                    <div className="bg-gradient-to-br from-rose-500 via-primary to-rose-700 rounded-2xl p-6 text-white shadow-glow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-300 opacity-10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
                                    <p className="text-rose-100 text-sm font-medium">Live Event Status</p>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">3/5 Arrived</h2>
                                <p className="text-rose-100 text-xs mt-2 opacity-90 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                                    Collective Countdown: 14:20
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 shadow-inner border border-white/10">
                                <span className="material-symbols-outlined text-2xl">groups</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-[10px] text-rose-100 font-medium mb-1.5 px-1">
                                <span>Start</span>
                                <span>Event Time</span>
                            </div>
                            <div className="bg-black/20 rounded-full h-2.5 w-full overflow-hidden backdrop-blur-sm">
                                <div className="bg-white h-full rounded-full w-3/5 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 space-y-4 pb-32">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <h3 className="text-lg font-bold">Party Progress</h3>
                        <span className="text-xs text-primary font-medium bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-lg">Real-time</span>
                    </div>

                    {/* User 1 */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-soft flex items-center gap-4 transition-transform active:scale-[0.98]">
                        <div className="relative">
                            <img alt="Alex Avatar" className="w-12 h-12 rounded-full bg-blue-100 avatar-glow-green" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKp3GvPUiNNdG74uhcryc4_YS-Ygz19t892FothkM8hZQaQwOTSWt_Vpb5zhc4zLec21A3m79Fa0Km2J2q1GpKZrdCY1mLLsWVNok2lA67Q4GDQErcS_X7NO8F7l1rRieDQYpoSPs6UmZhurVYA1bFv8Ra10TufCxigGrARGwTzAlBYfIEFKGtUYBkf-rMyZXQTydS7_oPylFFXQX6UmbowNWEnAdE_on_Nbx6dKFnCKL_J2BPgsD4LL_OfPT8VgARRtXiLaVHVdYt" />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-background-dark w-4 h-4 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">Alex M.</h4>
                                <span className="text-gray-500 text-xs font-bold bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">Transit</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">directions_walk</span> Arriving in 4 min
                            </p>
                        </div>
                    </div>

                    {/* User 2 */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-soft flex items-center gap-4 transition-transform active:scale-[0.98] ring-1 ring-rose-100 dark:ring-rose-900/30">
                        <div className="relative">
                            <img alt="Sarah Avatar" className="w-12 h-12 rounded-full bg-rose-100 avatar-glow-red" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsoFplBAQltq7Td09ThhF4773HDrIdMBJt-NqATOd2BYrIsZCw2I_agKnSefYXg_sXntKkk-o1ybhbASRblUpnx3HKIUre1iIR4E3CemL-Vm2KXwUANW6cf_Gy5T5X1LMp2wEcxnOIi-lgXCmtsranqlsnPayhxGZvyxEMHtRq5SCY26bDAeZjPiPU9SAUKLx0ld9aHEOIwlQPpoPtFkVWvPqqMBDxn2F27EGuiFpiqOd38e3dBjoY2MHTfYupka_bDlJ8WpbBeOTa" />
                            <div className="absolute -bottom-1 -right-1 bg-primary border-2 border-white dark:border-background-dark w-4 h-4 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">Sarah J.</h4>
                                <span className="text-primary text-xs font-bold bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-md">Late (+8m)</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-primary h-1.5 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]" style={{ width: '45%' }}></div>
                            </div>
                            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                                <span className="material-symbols-outlined text-[10px]">warning</span> Heavy traffic on 5th
                            </p>
                        </div>
                    </div>

                    {/* User 3 */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-soft flex items-center gap-4 transition-transform active:scale-[0.98]">
                        <div className="relative">
                            <img alt="Mike Avatar" className="w-12 h-12 rounded-full bg-purple-100 avatar-glow-green" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5aTjvK5OiWBNQbOYIcHXPeJ1ac7ExVbksbtDTpVApR8vWp17OktqBiMI8ddrKEpmtJh1268wqk5DMGMZpmqNiwQNdD30uuAH6z7BFqZLfUhzlS91mWWw5NkUNv0GyNrNvMXrgycUM3vOZ5YDUomDnIafYD0cWqg0_zZhEWr7Ukk7Yqqi2ZY7wW0QAH0KuNrbsiNAaw3qiYxng8sO2Z10lAg6Ft14H7_3nR2TLtfx9tPiuEgYbwPrpoindxfHLtyctHZVt3pS2EAU1" />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-background-dark w-4 h-4 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">Mike T.</h4>
                                <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md">Arrived</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">local_cafe</span> Waiting nearby
                            </p>
                        </div>
                    </div>

                    {/* User 4 */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-soft flex items-center gap-4 transition-transform active:scale-[0.98]">
                        <div className="relative">
                            <img alt="Jessica Avatar" className="w-12 h-12 rounded-full bg-indigo-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRgyASSguvIFrNJeaQEWCVI2gIlqgtYwRTZzwMVCXOh9Vyiq1_DOxkwxEFFAAIhLj78wKOnAA_zfii3DHZ6Q_vG8o4MZxFnzH1qCFfj7S0tUDp1e2zO2-FQxk9TvnWDR9fcn09aM_7U67Xr7iqWk4J2oTPJ61x1NMe-yNXedxsTLAaomagGAJUC-Y6ZXgSCPna14ytoY3-PlMoWGQP_etTJFehNTHDW436nBBdSaqntDT5g8RAdRYTAO3aqp42rnUzVQfonIsKcgWW" />
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 border-2 border-white dark:border-background-dark w-4 h-4 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">Jessica L.</h4>
                                <span className="text-yellow-500 text-xs font-bold bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-md">Ready</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">home</span> Leaving in 2 min
                            </p>
                        </div>
                    </div>

                    {/* User 5 - David */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 shadow-none border border-dashed border-gray-200 dark:border-gray-700 flex items-center gap-4 opacity-70">
                        <div className="relative">
                            <img alt="David Avatar" className="w-12 h-12 rounded-full bg-orange-100 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBZxVbq9J1EI8zJzwqVjUGbYkJE1CeNBQYjKrf8VsjQI8LaBzqawj-C0nhNFzWd-rxb27g-CJsMhHNT4Uk9VUsKKSD97c3oJbRwEyYvAaEne06Dg0aNmRypp9LG-mUYPtxgRQZbHnLgO3aUwwFy7z_TT9LMGsVqmdMrx5CXgTkeOF5ImtKVzrpkGtD4YMxBzd7wYSO55PQxDpssXuscvjgZ5WDirKfhoPyPHpGhaKUhEAb6kDaXbQ72x7-W5uB7KzhDMCKccncab8d" />
                            <div className="absolute -bottom-1 -right-1 bg-gray-400 border-2 border-white dark:border-background-dark w-4 h-4 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-500 dark:text-gray-400">David B.</h4>
                                <span className="text-gray-500 text-xs font-bold bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-md">Arrived</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">check_circle</span> At venue
                            </p>
                        </div>
                    </div>

                </div>

                <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center z-30 pointer-events-none">
                    <button className="pointer-events-auto bg-white dark:bg-surface-dark text-gray-400 hover:text-primary transition-colors p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined">chat_bubble_outline</span>
                    </button>
                    <button className="pointer-events-auto bg-gradient-to-r from-rose-500 to-primary text-white px-8 py-3.5 rounded-full shadow-glow font-bold flex items-center gap-2 transform active:scale-95 transition-all hover:shadow-lg hover:brightness-110">
                        <span className="material-symbols-outlined text-xl">bolt</span> Send Smart Nudge
                    </button>
                    <button className="pointer-events-auto bg-white dark:bg-surface-dark text-gray-400 hover:text-primary transition-colors p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/80 dark:via-background-dark/80 to-transparent pointer-events-none z-20"></div>
            </div>
        </div>
    );
};

export default GroupDetails;
