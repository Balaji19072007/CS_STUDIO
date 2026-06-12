import * as Sentry from '@sentry/react';

const monitoring = {
  get enabled() { return !!import.meta.env.VITE_SENTRY_DSN; },

  captureException(error, context = {}) {
    if (this.enabled) {
      Sentry.captureException(error, { extra: context });
    }
    if (import.meta.env.DEV) {
      console.error('[Monitoring] Exception:', error, context);
    }
  },

  captureMessage(message, level = 'info') {
    if (this.enabled) {
      Sentry.captureMessage(message, level);
    }
    if (import.meta.env.DEV) {
      console.log(`[Monitoring] ${level}: ${message}`);
    }
  },

  setUser(user) {
    if (this.enabled && user) {
      Sentry.setUser({ id: user.id, email: user.email });
    }
  },

  clearUser() {
    if (this.enabled) {
      Sentry.setUser(null);
    }
  },
};

export default monitoring;
