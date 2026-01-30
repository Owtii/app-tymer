import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Questionnaire from './pages/Questionnaire';
import './design-system.css';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Logistics from './pages/Logistics';
import SocialSync from './pages/SocialSync';
// New pages will be imported here
import CalendarView from './pages/CalendarView';
import Profile from './pages/Profile';
import Insights from './pages/Insights';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/auth" element={<Auth />} />

          {/* Main App Routes Wrapped in Layout */}
          <Route path="/app" element={<AppLayout />}>
            <Route path="home" element={<Dashboard />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="groups" element={<SocialSync />} />
            <Route path="insights" element={<Insights />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<Navigate to="/app/home" replace />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/social" element={<Navigate to="/app/groups" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
