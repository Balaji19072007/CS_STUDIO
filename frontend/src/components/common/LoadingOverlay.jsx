import React from 'react';

const LoadingOverlay = ({
  visible = false,
  message = 'Loading...',
  blur = true,
  transparent = false,
  className = '',
}) => {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        blur ? 'backdrop-blur-sm' : '',
        transparent ? 'bg-black/20' : 'bg-white/80 dark:bg-gray-900/80',
        'transition-all duration-300',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700" />
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>
        {message && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
            {message}
          </p>
        )}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

// ─── Full Page Loading State ──────────────────────────────────────
export const FullPageLoading = ({ message = 'Loading content...' }) => (
  <div
    className="min-h-[80vh] flex items-center justify-center px-4"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-500">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-[3px] border-gray-200 dark:border-gray-700" />
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-[3px] border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-[3px] border-transparent border-r-emerald-500 dark:border-r-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      <p className="text-base font-medium text-gray-600 dark:text-gray-400 animate-pulse">
        {message}
      </p>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// ─── Inline Loading State ─────────────────────────────────────────
export const InlineLoading = ({ message = 'Loading...', size = 'md' }) => {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center justify-center gap-3 py-8" role="status" aria-live="polite">
      <div className={`${spinnerSize} rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 animate-spin`} />
      <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>
    </div>
  );
};

// ─── Section Loading State ────────────────────────────────────────
export const SectionLoading = ({ message = 'Loading section...' }) => (
  <div
    className="flex items-center justify-center py-16"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

import { cn } from '../../lib/utils';

export default LoadingOverlay;
