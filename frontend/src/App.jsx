// src/App.jsx

import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { useTheme } from './hooks/useTheme.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

import MobileTopBar from './components/common/MobileTopBar.jsx';
import MobileBottomNav from './components/common/MobileBottomNav.jsx';

// Page imports
import Home from './pages/Home.jsx';
import UserHomePage from './pages/UserHomePage.jsx';

import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Settings from './pages/Settings.jsx';
import AuthCallback from './components/auth/AuthCallback.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Problems from './pages/Problems.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import CourseLearning from './pages/CourseLearning.jsx';
import PhaseTopics from './pages/PhaseTopics.jsx';
import TopicContent from './pages/TopicContent.jsx';
import QuizPage from './pages/QuizPage.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Community from './pages/Community.jsx';
import Code from './pages/Code.jsx';
import CodeVerification from './pages/CodeVerification.jsx';
import SolveProblem from './pages/SolveProblem.jsx';
import CourseChallenge from './pages/CourseChallenge.jsx';
import CourseChallengePage from './pages/CourseChallengePage.jsx';
import ProjectEditorPage from './pages/ProjectEditorPage.jsx';
import MyCourses from './pages/MyCourses.jsx';
import MyProgress from './pages/MyProgress.jsx';
import MyProblemStats from './pages/MyProblemStats.jsx';
import Notifications from './pages/Notifications.jsx';
import MyCertificates from './pages/MyCertificates.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import VerifyCertificate from './pages/VerifyCertificate.jsx';
import RatingPopup from './components/common/RatingPopup.jsx';
import CodeEditorFloatingIcon from './components/common/CodeEditorFloatingIcon.jsx';
import './App.css';

// Custom hook to use the auth context
import FullPageLoader from './components/common/FullPageLoader.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AuthProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// Separate component to use hooks
function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  // Keep the loader visible until it signals completion (progress hits 100% + fade-out)
  const [showLoader, setShowLoader] = useState(true);
  const handleLoaderComplete = useCallback(() => setShowLoader(false), []);

  // Show the loader while auth is pending OR until the loader's own animation finishes
  if (showLoader) {
    return (
      <FullPageLoader
        message="Initializing CS Studio..."
        isReady={!loading}
        onComplete={handleLoaderComplete}
      />
    );
  }

  // Page refresh handling is now done in index.html for better reliability

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>

      {/* Mobile Top Bar - Only visible on mobile when logged in - Hidden on Solve page */}
      {isLoggedIn && !location.pathname.startsWith('/solve') && !location.pathname.startsWith('/challenge') && !location.pathname.startsWith('/course-challenge') && !location.pathname.startsWith('/course-project') && <MobileTopBar />}

      {/* Main Navbar - Hidden on mobile if logged in (handled via CSS classes in Navbar component) */}
      {!(location.pathname === '/' && !isLoggedIn) && location.pathname !== '/signin' && location.pathname !== '/signup' && <Navbar />}

      <main
        className={`flex-grow flex flex-col ${location.pathname.startsWith('/solve') || location.pathname.startsWith('/challenge') || location.pathname.startsWith('/course-challenge') || location.pathname.startsWith('/course-project') || location.pathname.startsWith('/courses') ? 'pt-0 lg:pt-16' : ((location.pathname === '/' && !isLoggedIn) || location.pathname === '/signin' || location.pathname === '/signup' ? 'pt-0' : 'pt-14 lg:pt-16')} pb-24 sm:pb-0 max-w-[100vw] overflow-x-hidden`}
        style={{ minHeight: '60vh' }}
      >

        <Routes>
          <Route path="/" element={isLoggedIn ? <UserHomePage /> : <Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Navigate to="learn" replace />} />
          <Route path="/courses/:courseId/learn" element={<CourseLearning />} />
          <Route path="/courses/:courseId/learn/topic/:topicId" element={<CourseLearning />} />
          <Route path="/courses/:courseId/learn/quiz/:quizId" element={<CourseLearning />} />

          {/* Legacy routes - redirected or fallback */}
          <Route path="/courses/:courseId/topic/:topicId" element={<TopicContent />} />
          <Route path="/courses/:courseId/quiz/:quizId" element={<QuizPage />} />
          {/* Legacy routes - kept for backward compatibility */}
          <Route path="/courses/:courseId/phases/:phaseId" element={<PhaseTopics />} />
          <Route path="/courses/:courseId/phases/:phaseId/topics/:topicId" element={<TopicContent />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/solve" element={<ProtectedRoute><SolveProblem /></ProtectedRoute>} />
          <Route path="/challenge/:problemId" element={<ProtectedRoute><CourseChallenge /></ProtectedRoute>} />
          <Route path="/course-challenge/:challengeId" element={<ProtectedRoute><CourseChallengePage /></ProtectedRoute>} />
          <Route path="/course-project/:projectId" element={<ProtectedRoute><ProjectEditorPage /></ProtectedRoute>} />
          <Route path="/code" element={<ProtectedRoute><Code /></ProtectedRoute>} />
          <Route path="/code-verification" element={<ProtectedRoute><CodeVerification /></ProtectedRoute>} />
          <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
          <Route path="/my-progress" element={<ProtectedRoute><MyProgress /></ProtectedRoute>} />
          <Route path="/problem-stats" element={<ProtectedRoute><MyProblemStats /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
          <Route path="/certificates/verify/:certificateId" element={<VerifyCertificate />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />

          {/* Catch-all route - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RatingPopup />
      {!location.pathname.startsWith('/solve') &&
        !location.pathname.startsWith('/challenge') &&
        !location.pathname.startsWith('/course-challenge') &&
        !location.pathname.startsWith('/course-project') &&
        !location.pathname.startsWith('/courses/') &&
        !location.pathname.startsWith('/certificates') &&
        !location.pathname.startsWith('/verify-certificate') &&
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/code' &&
        location.pathname !== '/settings' &&
        location.pathname !== '/problems' &&
        location.pathname !== '/my-progress' &&
        location.pathname !== '/problem-stats' &&
        !(location.pathname === '/' && !isLoggedIn) &&
        <CodeEditorFloatingIcon />}

      {location.pathname !== '/' && !location.pathname.startsWith('/solve') && !location.pathname.startsWith('/challenge') && !location.pathname.startsWith('/course-challenge') && !location.pathname.startsWith('/course-project') && !location.pathname.startsWith('/courses') && <Footer />}

      {/* Mobile Bottom Navigation - Only visible on mobile when logged in */}
      {isLoggedIn && !location.pathname.startsWith('/solve') && !location.pathname.startsWith('/challenge') && !location.pathname.startsWith('/course-challenge') && !location.pathname.startsWith('/course-project') && <MobileBottomNav />}
    </div>
  );
}

// Protected Route Component using useAuth hook
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Replaced inline spinner with professional FullPageLoader
    return <FullPageLoader message="Verifying access..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default App;
