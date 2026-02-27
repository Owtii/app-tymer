import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Zap, Target, Award, CalendarCheck, Route } from 'lucide-react';
import './Insights.css';

const Insights = () => {
    // Mock data — in a real app this comes from event tracking
    const weeklyData = [
        { day: 'Mon', score: 90 },
        { day: 'Tue', score: 85 },
        { day: 'Wed', score: 100 },
        { day: 'Thu', score: 95 },
        { day: 'Fri', score: 80 },
        { day: 'Sat', score: 100 },
        { day: 'Sun', score: 100 },
    ];

    const avgScore = Math.round(weeklyData.reduce((a, b) => a + b.score, 0) / weeklyData.length);
    const trend = +4; // vs last week

    const stats = [
        { icon: Zap, label: 'Current Streak', value: '7 days', color: '#FF9500' },
        { icon: Award, label: 'Best Streak', value: '14 days', color: '#5E5CE6' },
        { icon: CalendarCheck, label: 'Perfect Days', value: '12', color: '#34C759' },
        { icon: Clock, label: 'Time Saved', value: '45 min', color: 'var(--color-brand)' },
    ];

    const categories = [
        { name: 'Work', pct: 95, events: 18 },
        { name: 'Social', pct: 80, events: 8 },
        { name: 'Family', pct: 100, events: 5 },
        { name: 'Health', pct: 60, events: 4 },
    ];

    const recentActivity = [
        { event: 'Dentist Appointment', status: 'on-time', delta: '+3 min early' },
        { event: 'Team Sync', status: 'on-time', delta: 'Right on time' },
        { event: 'Gym Session', status: 'late', delta: '5 min late' },
    ];

    return (
        <div className="ins-container">
            {/* Header */}
            <header className="ins-header">
                <div>
                    <h1 className="ins-title">Insights</h1>
                    <p className="ins-subtitle">Your punctuality at a glance</p>
                </div>
            </header>

            {/* Punctuality Score Hero */}
            <div className="ins-hero-card">
                <div className="ins-hero-top">
                    <div>
                        <span className="ins-hero-label">WEEKLY SCORE</span>
                        <div className="ins-hero-score-row">
                            <span className="ins-hero-score">{avgScore}%</span>
                            <span className={`ins-trend ${trend >= 0 ? 'up' : 'down'}`}>
                                {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {trend >= 0 ? '+' : ''}{trend}%
                            </span>
                        </div>
                    </div>
                    <div className="ins-hero-badge">
                        <Target size={20} />
                    </div>
                </div>
                <div className="ins-chart">
                    <ResponsiveContainer width="100%" height={120}>
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" hide />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--color-bg-card)', borderRadius: '12px',
                                    border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)',
                                    fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 600
                                }}
                                labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="var(--color-brand)" strokeWidth={2.5}
                                fillOpacity={1} fill="url(#scoreGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="ins-chart-labels">
                        {weeklyData.map(d => <span key={d.day}>{d.day[0]}</span>)}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="ins-stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="ins-stat-card">
                        <div className="ins-stat-icon" style={{ background: `${s.color}12`, color: s.color }}>
                            <s.icon size={18} />
                        </div>
                        <span className="ins-stat-value">{s.value}</span>
                        <span className="ins-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Category Breakdown */}
            <div className="ins-section">
                <h3 className="ins-section-title">By Category</h3>
                <div className="ins-category-card">
                    {categories.map((cat, i) => (
                        <div key={i} className="ins-cat-row">
                            <div className="ins-cat-info">
                                <span className="ins-cat-name">{cat.name}</span>
                                <span className="ins-cat-events">{cat.events} events</span>
                            </div>
                            <div className="ins-cat-bar-wrap">
                                <div className="ins-cat-bar">
                                    <div className="ins-cat-fill" style={{
                                        width: `${cat.pct}%`,
                                        background: cat.pct >= 90 ? '#34C759' : cat.pct >= 70 ? '#FF9500' : 'var(--color-brand)'
                                    }} />
                                </div>
                            </div>
                            <span className="ins-cat-pct">{cat.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="ins-section">
                <h3 className="ins-section-title">Recent Activity</h3>
                <div className="ins-activity-card">
                    {recentActivity.map((a, i) => (
                        <div key={i} className="ins-activity-row">
                            <div className={`ins-activity-dot ${a.status}`} />
                            <div className="ins-activity-info">
                                <span className="ins-activity-name">{a.event}</span>
                                <span className="ins-activity-delta">{a.delta}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;
