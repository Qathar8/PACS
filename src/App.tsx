import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PlayersPage from './pages/PlayersPage';
import TrainingPage from './pages/TrainingPage';
import MatchesPage from './pages/MatchesPage';
import FeesPage from './pages/FeesPage';
import MedicalPage from './pages/MedicalPage';
import ScoutingPage from './pages/ScoutingPage';
import GroupsPage from './pages/GroupsPage';
import AssessmentsPage from './pages/AssessmentsPage';
import DrillsPage from './pages/DrillsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import EventsPage from './pages/EventsPage';
import ReportsPage from './pages/ReportsPage';
import Layout from './components/Layout';
import './index.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/players" element={
              <ProtectedRoute>
                <PlayersPage />
              </ProtectedRoute>
            } />
            <Route path="/groups" element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            } />
            <Route path="/training" element={
              <ProtectedRoute>
                <TrainingPage />
              </ProtectedRoute>
            } />
            <Route path="/matches" element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            } />
            <Route path="/assessments" element={
              <ProtectedRoute>
                <AssessmentsPage />
              </ProtectedRoute>
            } />
            <Route path="/drills" element={
              <ProtectedRoute>
                <DrillsPage />
              </ProtectedRoute>
            } />
            <Route path="/fees" element={
              <ProtectedRoute>
                <FeesPage />
              </ProtectedRoute>
            } />
            <Route path="/medical" element={
              <ProtectedRoute>
                <MedicalPage />
              </ProtectedRoute>
            } />
            <Route path="/scouting" element={
              <ProtectedRoute>
                <ScoutingPage />
              </ProtectedRoute>
            } />
            <Route path="/announcements" element={
              <ProtectedRoute>
                <AnnouncementsPage />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;