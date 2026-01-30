import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Award, Clock } from 'lucide-react';
import Card from '../components/Card';
import './Insights.css';

const Insights = () => {
    const weeklyData = [
        { day: 'Mon', score: 90 },
        { day: 'Tue', score: 85 },
        { day: 'Wed', score: 100 },
        { day: 'Thu', score: 95 },
        { day: 'Fri', score: 80 },
        { day: 'Sat', score: 100 },
        { day: 'Sun', score: 100 },
    ];

    const categoryData = [
        { name: 'Work', value: 95 },
        { name: 'Social', value: 80 },
        { name: 'Family', value: 100 },
        { name: 'Gym', value: 60 },
    ];

    return (
        <div className="insights-container">
            <header className="insights-header">
                <h2>Insights</h2>
                <span className="subtitle">Your punctuality history</span>
            </header>

            <main className="insights-content">
                {/* Weekly Score Card */}
                <Card padding="lg" className="chart-card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Weekly Streak</h3>
                            <p className="card-val">92% <span className="trend-up"><TrendingUp size={14} /> +4%</span></p>
                        </div>
                        <div className="icon-badge badge-gold">
                            <Award size={20} />
                        </div>
                    </div>

                    <div className="chart-wrapper area-chart">
                        <ResponsiveContainer width="100%" height={150}>
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', borderRadius: '8px', border: 'none' }} />
                                <Area type="monotone" dataKey="score" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="week-days-labels">
                        {weeklyData.map(d => <span key={d.day}>{d.day[0]}</span>)}
                    </div>
                </Card>

                {/* Category Breakdown */}
                <Card padding="lg" className="chart-card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Success by Category</h3>
                        </div>
                    </div>

                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value >= 90 ? '#34C759' : entry.value >= 80 ? '#007AFF' : '#FF9500'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        {/* Custom Legend Overlay since Axis is tricky in minimalist chart */}
                        <div className="category-labels-overlay">
                            {categoryData.map(cat => (
                                <div key={cat.name} className="cat-row">
                                    <span className="cat-name">{cat.name}</span>
                                    <span className="cat-val">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Highlight Stat */}
                <div className="stats-row">
                    <Card className="mini-stat-card" padding="md">
                        <Clock size={24} className="stat-icon icon-blue" />
                        <span className="stat-num">45h</span>
                        <span className="stat-desc">Time Saved</span>
                    </Card>
                    <Card className="mini-stat-card" padding="md">
                        <Award size={24} className="stat-icon icon-gold" />
                        <span className="stat-num">12</span>
                        <span className="stat-desc">Perfect Days</span>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Insights;
