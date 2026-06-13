import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ServerErrorPage, NetworkErrorPage } from './ErrorPages';

const createFallback = (PageComponent) => ({ retry }) => (
  <PageComponent onRetry={retry} />
);

export const DashboardErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(ServerErrorPage)}>
    {children}
  </ErrorBoundary>
);

export const CourseErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(ServerErrorPage)}>
    {children}
  </ErrorBoundary>
);

export const QuizErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(ServerErrorPage)}>
    {children}
  </ErrorBoundary>
);

export const CommunityErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(ServerErrorPage)}>
    {children}
  </ErrorBoundary>
);

export const AdminErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(ServerErrorPage)}>
    {children}
  </ErrorBoundary>
);

export const NetworkErrorBoundary = ({ children }) => (
  <ErrorBoundary fallback={createFallback(NetworkErrorPage)}>
    {children}
  </ErrorBoundary>
);
