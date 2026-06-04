
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage if available
  const storedUser = localStorage.getItem('userData');
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSession = async (session) => {
    if (!session?.user) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      setLoading(false);
      return;
    }

    const token = session.access_token;

    // Fetch detailed profile from backend using the Supabase JWT
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const profile = await response.json();
        const userData = {
          ...profile,
          token: token,
          userId: profile.id,
          // Map Supabase snake_case to camelCase for frontend components
          firstName: profile.first_name,
          lastName: profile.last_name,
          photoUrl: profile.photo_url || session.user.user_metadata?.avatar_url,
          totalPoints: profile.total_points,
          problemsSolved: profile.problems_solved,
          currentStreak: profile.current_streak,
          // Fallbooks
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || session.user.email,
          role: profile.role || 'student'
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('token', token);
      } else {
        console.error('Failed to fetch profile', response.statusText);
        // Fallback to basic session info
        const userData = {
          id: session.user.id,
          userId: session.user.id,
          email: session.user.email,
          photoUrl: session.user.user_metadata?.avatar_url,
          token: token,
          role: 'student'
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('token', token);
      }

    } catch (err) {
      console.error('Auth Profile Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    // Usually handled by Supabase Auth UI, but if manual login needed:
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    isAuthenticated,
    isLoggedIn: isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
