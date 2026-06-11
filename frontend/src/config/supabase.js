import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, options) => {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new Headers(options?.headers || {});
        headers.set('Authorization', `Bearer ${token}`);
        options = { ...options, headers };
      }
      return fetch(url, options);
    },
  },
});
