import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Home, ShieldOff, WifiOff, AlertTriangle, SearchX, BookOpen, FileQuestion, HelpCircle, ServerCrash, Bug } from 'lucide-react';

// ─── Base Error Page Layout ───────────────────────────────────────
const ErrorPageLayout = ({ icon, title, description, primaryAction, secondaryAction, errorCode, className = '' }) => {
  return (
    <div className={`min-h-[80vh] flex items-center justify-center px-4 py-16 ${className}`}>
      <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse-slow" />
            <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 shadow-xl">
              {icon}
            </div>
          </div>
        </div>

        {errorCode && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Bug className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400">Error {errorCode}</span>
          </div>
        )}

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </div>
  );
};

// ─── 404 Not Found Page ───────────────────────────────────────────
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full animate-pulse-slow" />
            <div className="relative">
              <div className="text-[120px] sm:text-[160px] font-black leading-none bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent select-none">
                404
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
                <SearchX className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 animate-bounce-slow" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Page not found
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── 500 Server Error Page ────────────────────────────────────────
export const ServerErrorPage = ({ onRetry }) => {
  return (
    <ErrorPageLayout
      icon={<ServerCrash className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />}
      title="Server error"
      description="Our servers encountered an unexpected issue. Our team has been notified and is working to resolve it."
      errorCode="500"
      primaryAction={
        <button
          onClick={onRetry || (() => window.location.reload())}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all duration-200 font-medium shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      }
      secondaryAction={
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      }
    />
  );
};

// ─── Network Error Page ───────────────────────────────────────────
export const NetworkErrorPage = ({ onRetry }) => {
  return (
    <ErrorPageLayout
      icon={<WifiOff className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />}
      title="Connection lost"
      description="We're having trouble connecting to our servers. Please check your internet connection and try again."
      errorCode="NETWORK"
      primaryAction={
        <button
          onClick={onRetry || (() => window.location.reload())}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200 font-medium shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30"
        >
          <RefreshCw className="w-4 h-4" />
          Retry connection
        </button>
      }
      secondaryAction={
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      }
    />
  );
};

// ─── Unauthorized Page ────────────────────────────────────────────
export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorPageLayout
      icon={<ShieldOff className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />}
      title="Access denied"
      description="You don't have permission to access this page. Please sign in with an authorized account to continue."
      errorCode="403"
      primaryAction={
        <button
          onClick={() => navigate('/signin')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 font-medium shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30"
        >
          <ShieldOff className="w-4 h-4" />
          Sign in
        </button>
      }
      secondaryAction={
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      }
    />
  );
};

// ─── Course Not Found Page ────────────────────────────────────────
export const CourseNotFoundPage = ({ courseName }) => {
  return (
    <ErrorPageLayout
      icon={<BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500" />}
      title={courseName ? `"${courseName}" not found` : "Course not found"}
      description="This course may have been removed, renamed, or is no longer available. Check your enrolled courses or browse the catalog."
      primaryAction={
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
        >
          <BookOpen className="w-4 h-4" />
          Browse courses
        </Link>
      }
      secondaryAction={
        <Link
          to="/my-courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          My courses
        </Link>
      }
    />
  );
};

// ─── Lesson Not Found Page ────────────────────────────────────────
export const LessonNotFoundPage = () => {
  return (
    <ErrorPageLayout
      icon={<FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 text-violet-500" />}
      title="Lesson not found"
      description="This lesson may have been removed or is no longer part of the curriculum. Check the course outline for available lessons."
      primaryAction={
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200 font-medium shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30"
        >
          <BookOpen className="w-4 h-4" />
          View courses
        </Link>
      }
      secondaryAction={
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      }
    />
  );
};

// ─── Quiz Not Found Page ──────────────────────────────────────────
export const QuizNotFoundPage = () => {
  return (
    <ErrorPageLayout
      icon={<HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />}
      title="Quiz not found"
      description="This quiz may have been removed or is no longer available. Check the course outline for available quizzes."
      primaryAction={
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 font-medium shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
        >
          <BookOpen className="w-4 h-4" />
          View courses
        </Link>
      }
      secondaryAction={
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      }
    />
  );
};

// ─── Generic Error Page (for any error with retry) ────────────────
export const ErrorPage = ({ title, description, error, onRetry, fullPage = true }) => {
  const containerClass = fullPage
    ? 'min-h-[80vh] flex items-center justify-center px-4 py-16'
    : 'flex items-center justify-center px-4 py-12';

  return (
    <div className={containerClass}>
      <div className="max-w-lg w-full text-center space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title || 'Something went wrong'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {description || 'An unexpected error occurred. Please try again.'}
          </p>
          {error && import.meta.env.DEV && (
            <details className="mt-4 text-left">
              <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                Error details
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-red-500 overflow-auto max-h-32">
                {typeof error === 'string' ? error : error.message || JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default { NotFoundPage, ServerErrorPage, NetworkErrorPage, UnauthorizedPage, CourseNotFoundPage, LessonNotFoundPage, QuizNotFoundPage, ErrorPage };
