import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import api from '../../config/api';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    let isProcessing = false;

    const processSession = async (session) => {
        if (isProcessing) return;
        isProcessing = true;

        try {
            // Send tokens to backend to set HttpOnly cookies
            const response = await api.post('/api/auth/session/set-cookie', {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_in: session.expires_in
            });

            if (response.status !== 200) {
                throw new Error(response.data.msg || 'Failed to initialize session');
            }

            // Clean up localStorage to maintain security (prevent XSS extraction)
            // We just remove the supabase keys since we use HttpOnly cookies
            for (let key in localStorage) {
                if (key.startsWith('sb-')) {
                    localStorage.removeItem(key);
                }
            }

            // Notify AuthContext
            window.dispatchEvent(new Event('auth-login'));

            setTimeout(() => {
                navigate('/');
            }, 500);

        } catch (err) {
            console.error('OAuth Callback Error:', err);
            setError(err.message);
            setTimeout(() => navigate('/signin'), 3000);
        }
    };

    // The Supabase JS client automatically handles the PKCE `?code=` in the URL 
    // and exchanges it for a session. It then fires the SIGNED_IN event.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            processSession(session);
        }
    });

    // Fallback: If the session was already exchanged before the listener attached
    supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
             setError(error.message);
             setTimeout(() => navigate('/signin'), 3000);
        } else if (session) {
             processSession(session);
        } else if (location.hash.includes('error=')) {
             // Handle Implicit Flow errors or OAuth rejection
             const params = new URLSearchParams(location.hash.substring(1));
             setError(params.get('error_description') || 'Authentication failed');
             setTimeout(() => navigate('/signin'), 3000);
        }
    });

    return () => {
        authListener.subscription.unsubscribe();
    };
  }, [location, navigate]);

  return (
    <div className="min-h-screen dark-gradient-secondary flex flex-col items-center justify-center p-6 text-white">
        {!error ? (
            <div className="flex flex-col items-center space-y-4">
                <Loader className="w-10 h-10 animate-spin text-primary-500" />
                <h2 className="text-xl font-bold">Completing authentication...</h2>
                <p className="text-gray-400">Please wait while we log you in securely.</p>
            </div>
        ) : (
            <div className="bg-red-500/10 border border-red-500 p-6 rounded-2xl max-w-md w-full text-center space-y-4">
                <h2 className="text-xl font-bold text-red-500">Authentication Failed</h2>
                <p className="text-gray-300">{error}</p>
                <p className="text-sm text-gray-500">Redirecting back to login...</p>
            </div>
        )}
    </div>
  );
};

export default AuthCallback;
