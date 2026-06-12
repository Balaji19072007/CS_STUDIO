// src/App.jsx

import React, { useState, useCallback, lazy, Suspense } from 'react';
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

// Lazy-loaded page components for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const UserHomePage = lazy(() => import('./pages/UserHomePage.jsx'));

const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const AuthCallback = lazy(() => import('./components/auth/AuthCallback.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'));
const Problems = lazy(() => import('./pages/Problems.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const CourseLearning = lazy(() => import('./pages/CourseLearning.jsx'));
const PhaseTopics = lazy(() => import('./pages/PhaseTopics.jsx'));
const TopicContent = lazy(() => import('./pages/TopicContent.jsx'));
const QuizPage = lazy(() => import('./pages/QuizPage.jsx'));
const Leaderboard = lazy(() => import('./pages/Leaderboard.jsx'));
const Community = lazy(() => import('./pages/Community.jsx'));
const Code = lazy(() => import('./pages/Code.jsx'));
const CodeVerification = lazy(() => import('./pages/CodeVerification.jsx'));
const SolveProblem = lazy(() => import('./pages/SolveProblem.jsx'));
const CourseChallenge = lazy(() => import('./pages/CourseChallenge.jsx'));
const CourseChallengePage = lazy(() => import('./pages/CourseChallengePage.jsx'));
const ProjectEditorPage = lazy(() => import('./pages/ProjectEditorPage.jsx'));
const MyCourses = lazy(() => import('./pages/MyCourses.jsx'));
const MyProgress = lazy(() => import('./pages/MyProgress.jsx'));
const MyProblemStats = lazy(() => import('./pages/MyProblemStats.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const MyCertificates = lazy(() => import('./pages/MyCertificates.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate.jsx'));

// Keep these eagerly loaded since they render on most pages
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
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-blue-600 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Mobile Top Bar - Only visible on mobile when logged in - Hidden on Solve page */}
      {isLoggedIn && !location.pathname.startsWith('/solve') && !location.pathname.startsWith('/challenge') && !location.pathname.startsWith('/course-challenge') && !location.pathname.startsWith('/course-project') && <MobileTopBar />}

      {/* Main Navbar - Hidden on mobile if logged in (handled via CSS classes in Navbar component) */}
      {!(location.pathname === '/' && !isLoggedIn) && location.pathname !== '/signin' && location.pathname !== '/signup' && <Navbar />}

      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-grow flex flex-col ${location.pathname.startsWith('/solve') || location.pathname.startsWith('/challenge') || location.pathname.startsWith('/course-challenge') || location.pathname.startsWith('/course-project') || location.pathname.startsWith('/courses') ? 'pt-0 lg:pt-16' : ((location.pathname === '/' && !isLoggedIn) || location.pathname === '/signin' || location.pathname === '/signup' ? 'pt-0' : 'pt-14 lg:pt-16')} pb-24 sm:pb-0 max-w-[100vw] overflow-x-hidden`}
        style={{ minHeight: '60vh' }}
      >

        <ErrorBoundary>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/" element={isLoggedIn ? <UserHomePage /> : <Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/courses/:courseId" element={<ProtectedRoute><Navigate to="learn" replace /></ProtectedRoute>} />
          <Route path="/courses/:courseId/learn" element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} />
          <Route path="/courses/:courseId/learn/topic/:topicId" element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} />
          <Route path="/courses/:courseId/learn/quiz/:quizId" element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} />

          {/* Legacy routes - redirected or fallback */}
          <Route path="/courses/:courseId/topic/:topicId" element={<ProtectedRoute><TopicContent /></ProtectedRoute>} />
          <Route path="/courses/:courseId/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          {/* Legacy routes - kept for backward compatibility */}
          <Route path="/courses/:courseId/phases/:phaseId" element={<ProtectedRoute><PhaseTopics /></ProtectedRoute>} />
          <Route path="/courses/:courseId/phases/:phaseId/topics/:topicId" element={<ProtectedRoute><TopicContent /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
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
        </Suspense>
        </ErrorBoundary>
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
