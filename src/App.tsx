import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import HeatmapPage from './pages/HeatmapPage';
import AlertsPage from './pages/AlertsPage';

import { ToastProvider } from './components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
