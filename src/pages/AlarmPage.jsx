import React, { useState } from 'react';
import { Bell, Plus, X, Cpu, Pencil, Trash2, Volume2, Vibrate, Music, Timer, Calculator, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './AlarmPage.css';

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const SOUNDS = [
    { id: 'classic', name: 'Classic Alarm', icon: Bell },
    { id: 'gentle', name: 'Gentle Rise', icon: Volume2 },
    { id: 'melody', name: 'Morning Melody', icon: Music },
    { id: 'vibrate', name: 'Vibrate Only', icon: Vibrate }
];

const DISMISS_TASKS = [
    { id: 'none', name: 'None (Swipe)', icon: Smartphone },
    { id: 'math', name: 'Math Problem', icon: Calculator },
    { id: 'shake', name: 'Shake Phone', icon: Smartphone },
    { id: 'timer', name: 'Hold Timer', icon: Timer }
];

const AlarmPage = () => {
    const { alarms, addAlarm, updateAlarm, deleteAlarm, toggleAlarm } = useAppContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAlarm, setEditingAlarm] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [newAlarm, setNewAlarm] = useState({
        name: '', time: '07:00', type: 'regular', smart: false, active: true,
        days: [false, true, true, true, true, true, false],
        sound: 'classic', dismissTask: 'none'
    });

    const fmt = (t) => {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const handleAdd = () => {
        if (!newAlarm.name || !newAlarm.time) return;
        addAlarm({ ...newAlarm, type: 'regular' });
        setNewAlarm({
            name: '', time: '07:00', type: 'regular', smart: false, active: true,
            days: [false, true, true, true, true, true, false],
            sound: 'classic', dismissTask: 'none'
        });
        setShowAddModal(false);
    };

    const handleEditSave = () => {
        if (!editingAlarm) return;
        updateAlarm(editingAlarm.id, {
            name: editingAlarm.name, time: editingAlarm.time,
            days: editingAlarm.days, smart: editingAlarm.smart,
            sound: editingAlarm.sound || 'classic',
            dismissTask: editingAlarm.dismissTask || 'none'
        });
        setEditingAlarm(null);
    };

    return (
        <div className="alarm-page-container">
            {/* Header */}
            <header className="alarm-page-header">
                <h2 className="alarm-page-title">Alarms</h2>
                <button className="alarm-page-add-btn" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} />
                    <span>New Alarm</span>
                </button>
            </header>

            {/* Alarm List */}
            <div className="alarm-page-list">
                {alarms.length === 0 && (
                    <div className="alarm-page-empty">
                        <Bell size={40} color="#E2E2E2" />
                        <p>No alarms set</p>
                        <span>Tap "New Alarm" to create one</span>
                    </div>
                )}

                {alarms.map(alarm => (
                    <div key={alarm.id} className={`alarm-page-card ${!alarm.active ? 'off' : ''}`}>
                        <div className="alarm-page-card-top">
                            <div className="alarm-page-label">
                                {alarm.smart && <Cpu size={14} color="#FF3C5D" />}
                                <span className={alarm.smart ? 'smart' : ''}>{alarm.name || 'Alarm'}</span>
                            </div>
                            <div className="alarm-page-card-actions">
                                <button className="alarm-page-action-btn" onClick={() => setEditingAlarm({ ...alarm, sound: alarm.sound || 'classic', dismissTask: alarm.dismissTask || 'none' })}>
                                    <Pencil size={14} color="#979797" />
                                </button>
                                <button className="alarm-page-action-btn" onClick={() => setConfirmDelete(alarm.id)}>
                                    <Trash2 size={14} color="#979797" />
                                </button>
                            </div>
                        </div>

                        <div className="alarm-page-card-mid">
                            <span className="alarm-page-time">{fmt(alarm.time)}</span>
                            <div className={`alarm-page-toggle ${alarm.active ? 'on' : ''}`} onClick={() => toggleAlarm(alarm.id)}>
                                <div className="alarm-page-toggle-thumb" />
                            </div>
                        </div>

                        <div className="alarm-page-card-bottom">
                            <div className="alarm-page-days">
                                {DAY_NAMES.map((d, i) => (
                                    <span key={i} className={alarm.days[i] ? 'day-on' : 'day-off'}>{d}</span>
                                ))}
                            </div>
                            <div className="alarm-page-meta">
                                {alarm.sound && alarm.sound !== 'classic' && (
                                    <span className="alarm-meta-pill">{SOUNDS.find(s => s.id === alarm.sound)?.name || alarm.sound}</span>
                                )}
                                {alarm.dismissTask && alarm.dismissTask !== 'none' && (
                                    <span className="alarm-meta-pill">{DISMISS_TASKS.find(t => t.id === alarm.dismissTask)?.name || alarm.dismissTask}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Alarm Modal */}
            {showAddModal && (
                <div className="alarm-page-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="alarm-page-modal" onClick={e => e.stopPropagation()}>
                        <div className="alarm-page-modal-header">
                            <h3>New Alarm</h3>
                            <button className="alarm-page-modal-close" onClick={() => setShowAddModal(false)}><X size={20} /></button>
                        </div>
                        <div className="alarm-page-form">
                            <div className="alarm-page-form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Morning Wake Up" value={newAlarm.name} onChange={e => setNewAlarm(a => ({ ...a, name: e.target.value }))} />
                            </div>
                            <div className="alarm-page-form-group">
                                <label>Time</label>
                                <input type="time" value={newAlarm.time} onChange={e => setNewAlarm(a => ({ ...a, time: e.target.value }))} />
                            </div>
                            <div className="alarm-page-form-group">
                                <label>Days</label>
                                <div className="alarm-page-days-picker">
                                    {DAY_NAMES.map((d, i) => (
                                        <button key={i} type="button" className={`alarm-page-day-btn ${newAlarm.days[i] ? 'active' : ''}`}
                                            onClick={() => { const u = [...newAlarm.days]; u[i] = !u[i]; setNewAlarm(a => ({ ...a, days: u })); }}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sound Selection */}
                            <div className="alarm-page-form-group">
                                <label>Alarm Sound</label>
                                <div className="alarm-page-sound-grid">
                                    {SOUNDS.map(sound => (
                                        <button key={sound.id} type="button"
                                            className={`alarm-page-sound-btn ${newAlarm.sound === sound.id ? 'active' : ''}`}
                                            onClick={() => setNewAlarm(a => ({ ...a, sound: sound.id }))}>
                                            <sound.icon size={16} />
                                            <span>{sound.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dismiss Task */}
                            <div className="alarm-page-form-group">
                                <label>Dismiss Task</label>
                                <div className="alarm-page-sound-grid">
                                    {DISMISS_TASKS.map(task => (
                                        <button key={task.id} type="button"
                                            className={`alarm-page-sound-btn ${newAlarm.dismissTask === task.id ? 'active' : ''}`}
                                            onClick={() => setNewAlarm(a => ({ ...a, dismissTask: task.id }))}>
                                            <task.icon size={16} />
                                            <span>{task.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="alarm-page-form-group">
                                <label className="alarm-page-smart-row"><span>Smart Alarm</span>
                                    <div className={`alarm-page-toggle small ${newAlarm.smart ? 'on' : ''}`} onClick={() => setNewAlarm(a => ({ ...a, smart: !a.smart }))}>
                                        <div className="alarm-page-toggle-thumb" />
                                    </div>
                                </label>
                            </div>

                            <button className="alarm-page-form-submit" onClick={handleAdd}>Add Alarm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Alarm Modal */}
            {editingAlarm && (
                <div className="alarm-page-modal-overlay" onClick={() => setEditingAlarm(null)}>
                    <div className="alarm-page-modal" onClick={e => e.stopPropagation()}>
                        <div className="alarm-page-modal-header">
                            <h3>Edit Alarm</h3>
                            <button className="alarm-page-modal-close" onClick={() => setEditingAlarm(null)}><X size={20} /></button>
                        </div>
                        <div className="alarm-page-form">
                            <div className="alarm-page-form-group">
                                <label>Name</label>
                                <input type="text" value={editingAlarm.name} onChange={e => setEditingAlarm(a => ({ ...a, name: e.target.value }))} />
                            </div>
                            <div className="alarm-page-form-group">
                                <label>Time</label>
                                <input type="time" value={editingAlarm.time} onChange={e => setEditingAlarm(a => ({ ...a, time: e.target.value }))} />
                            </div>
                            <div className="alarm-page-form-group">
                                <label>Days</label>
                                <div className="alarm-page-days-picker">
                                    {DAY_NAMES.map((d, i) => (
                                        <button key={i} type="button" className={`alarm-page-day-btn ${editingAlarm.days[i] ? 'active' : ''}`}
                                            onClick={() => { const u = [...editingAlarm.days]; u[i] = !u[i]; setEditingAlarm(a => ({ ...a, days: u })); }}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="alarm-page-form-group">
                                <label>Alarm Sound</label>
                                <div className="alarm-page-sound-grid">
                                    {SOUNDS.map(sound => (
                                        <button key={sound.id} type="button"
                                            className={`alarm-page-sound-btn ${editingAlarm.sound === sound.id ? 'active' : ''}`}
                                            onClick={() => setEditingAlarm(a => ({ ...a, sound: sound.id }))}>
                                            <sound.icon size={16} />
                                            <span>{sound.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="alarm-page-form-group">
                                <label>Dismiss Task</label>
                                <div className="alarm-page-sound-grid">
                                    {DISMISS_TASKS.map(task => (
                                        <button key={task.id} type="button"
                                            className={`alarm-page-sound-btn ${editingAlarm.dismissTask === task.id ? 'active' : ''}`}
                                            onClick={() => setEditingAlarm(a => ({ ...a, dismissTask: task.id }))}>
                                            <task.icon size={16} />
                                            <span>{task.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="alarm-page-form-group">
                                <label className="alarm-page-smart-row"><span>Smart Alarm</span>
                                    <div className={`alarm-page-toggle small ${editingAlarm.smart ? 'on' : ''}`} onClick={() => setEditingAlarm(a => ({ ...a, smart: !a.smart }))}>
                                        <div className="alarm-page-toggle-thumb" />
                                    </div>
                                </label>
                            </div>

                            <button className="alarm-page-form-submit" onClick={handleEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {confirmDelete && (
                <div className="alarm-page-modal-overlay" onClick={() => setConfirmDelete(null)}>
                    <div className="alarm-page-confirm" onClick={e => e.stopPropagation()}>
                        <div className="alarm-page-confirm-icon">
                            <Trash2 size={28} color="#FF3C5D" />
                        </div>
                        <h3>Delete Alarm?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="alarm-page-confirm-btns">
                            <button className="alarm-page-confirm-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
                            <button className="alarm-page-confirm-delete" onClick={() => { deleteAlarm(confirmDelete); setConfirmDelete(null); }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlarmPage;
