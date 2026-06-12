import React from 'react';

// Lightweight Sentry-like error monitoring for production
// Replace DSN with your actual Sentry DSN when deploying

const MONITORING_DSN = import.meta.env.VITE_SENTRY_DSN || null;

const monitoring = {
  enabled: !!MONITORING_DSN,

  init() {
    if (this.enabled) {
      // Sentry.init({ dsn: MONITORING_DSN, environment: import.meta.env.MODE });
      console.log('[Monitoring] Sentry initialized');
    }
  },

  captureException(error, context = {}) {
    if (this.enabled) {
      // Sentry.captureException(error, { extra: context });
    }
    // Always log to console in development
    if (import.meta.env.DEV) {
      console.error('[Monitoring] Exception:', error, context);
    }
  },

  captureMessage(message, level = 'info') {
    if (this.enabled) {
      // Sentry.captureMessage(message, level);
    }
    if (import.meta.env.DEV) {
      console.log(`[Monitoring] ${level}: ${message}`);
    }
  },

  setUser(user) {
    if (this.enabled && user) {
      // Sentry.setUser({ id: user.id, email: user.email });
    }
  },

  clearUser() {
    if (this.enabled) {
      // Sentry.setUser(null);
    }
  },
};

export default monitoring;
