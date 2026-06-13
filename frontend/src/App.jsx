// src/App.jsx

import React, { useState, useCallback, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { useTheme } from './hooks/useTheme.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import {
  DashboardErrorBoundary,
  CourseErrorBoundary,
  QuizErrorBoundary,
  CommunityErrorBoundary,
  AdminErrorBoundary,
} from './components/common/routeErrorBoundaries.jsx';
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
import { Toaster } from './components/ui/sonner.tsx';
import { NotFoundPage } from './components/common/ErrorPages.jsx';
import { SkeletonDashboard, SkeletonLesson, SkeletonQuiz, ChallengeSkeleton } from './components/common/SkeletonLoader.jsx';
import './App.css';

// Custom hook to use the auth context
import FullPageLoader from './components/common/FullPageLoader.jsx';
import RouteTransition from './components/common/RouteTransition.jsx';
import NavigationProgress from './components/common/NavigationProgress.jsx';
import { NavigationProgressProvider } from './hooks/useNavigationProgress.jsx';

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
  const initialLoadRef = useRef(false);
  const handleLoaderComplete = useCallback(() => {
    initialLoadRef.current = true;
    setShowLoader(false);
  }, []);

  // Show the loader while auth is pending OR while re-authenticating after OAuth callback
  if (showLoader || loading) {
    return (
      <FullPageLoader
        message={initialLoadRef.current ? "Verifying session..." : "Initializing CS Studio..."}
        isReady={!loading}
        onComplete={handleLoaderComplete}
      />
    );
  }

  // Page refresh handling is now done in index.html for better reliability

  return (
    <>
      <Toaster
        richColors
        closeButton
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
          },
        }}
      />
      <NavigationProgressProvider>
      <NavigationProgress />
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

        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              {isLoggedIn ? <UserHomePage /> : <Home />}
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/signin" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              <SignIn />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/signup" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              <SignUp />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/auth/callback" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              <AuthCallback />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/forgot-password" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonLesson />}>
              <ForgotPassword />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/reset-password" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonLesson />}>
              <ResetPassword />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/problems" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Problems />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/courses" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Courses />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/courses/:courseId" element={<DashboardErrorBoundary><ProtectedRoute><RouteTransition><Navigate to="learn" replace /></RouteTransition></ProtectedRoute></DashboardErrorBoundary>} />
          <Route path="/courses/:courseId/learn" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <CourseLearning />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />
          <Route path="/courses/:courseId/learn/topic/:topicId" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <CourseLearning />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />
          <Route path="/courses/:courseId/learn/quiz/:quizId" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonQuiz />}>
                <CourseLearning />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />

          {/* Legacy routes - redirected or fallback */}
          <Route path="/courses/:courseId/topic/:topicId" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <TopicContent />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />
          <Route path="/courses/:courseId/quiz/:quizId" element={
            <QuizErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonQuiz />}>
                <QuizPage />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </QuizErrorBoundary>
          } />
          {/* Legacy routes - kept for backward compatibility */}
          <Route path="/courses/:courseId/phases/:phaseId" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <PhaseTopics />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />
          <Route path="/courses/:courseId/phases/:phaseId/topics/:topicId" element={
            <CourseErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <TopicContent />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CourseErrorBoundary>
          } />
          <Route path="/leaderboard" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Leaderboard />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/community" element={
            <CommunityErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Community />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </CommunityErrorBoundary>
          } />
          <Route path="/settings" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Settings />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/solve" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<ChallengeSkeleton />}>
                <SolveProblem />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/challenge/:problemId" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<ChallengeSkeleton />}>
                <CourseChallenge />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/course-challenge/:challengeId" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<ChallengeSkeleton />}>
                <CourseChallengePage />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/course-project/:projectId" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<ChallengeSkeleton />}>
                <ProjectEditorPage />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/code" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Code />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/code-verification" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonLesson />}>
                <CodeVerification />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/my-courses" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <MyCourses />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/my-progress" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <MyProgress />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/problem-stats" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <MyProblemStats />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/notifications" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <Notifications />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/admin" element={
            <AdminErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <AdminDashboard />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </AdminErrorBoundary>
          } />
          <Route path="/certificates" element={
            <DashboardErrorBoundary>
            <ProtectedRoute>
              <RouteTransition>
              <Suspense fallback={<SkeletonDashboard />}>
                <MyCertificates />
              </Suspense>
              </RouteTransition>
            </ProtectedRoute>
            </DashboardErrorBoundary>
          } />
          <Route path="/certificates/verify/:certificateId" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              <VerifyCertificate />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />
          <Route path="/verify-certificate" element={
            <DashboardErrorBoundary>
            <RouteTransition>
            <Suspense fallback={<SkeletonDashboard />}>
              <VerifyCertificate />
            </Suspense>
            </RouteTransition>
            </DashboardErrorBoundary>
          } />

          {/* Catch-all route - 404 */}
          <Route path="*" element={<DashboardErrorBoundary><RouteTransition><NotFoundPage /></RouteTransition></DashboardErrorBoundary>} />
        </Routes>
        </AnimatePresence>
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
    </NavigationProgressProvider>
    </>
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
