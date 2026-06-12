import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: async (url, options) => {
      const injectToken = (opts, tokenStr) => {
        if (!tokenStr) return opts;
        const headers = new Headers(opts?.headers || {});
        headers.set('Authorization', `Bearer ${tokenStr}`);
        return { ...opts, headers };
      };

      const token = localStorage.getItem('token');
      let finalOptions = injectToken(options, token);

      let response = await fetch(url, finalOptions);

      if (response.status === 401) {
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
          const refreshRes = await fetch(`${apiBaseUrl}/api/auth/session/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            if (data.success && data.token) {
              localStorage.setItem('token', data.token);
              finalOptions = injectToken(options, data.token);
              response = await fetch(url, finalOptions);
            } else {
              localStorage.removeItem('token');
            }
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auto-refresh failed in Supabase fetch:', error);
          localStorage.removeItem('token');
        }
      }

      return response;
    },
  },
});
