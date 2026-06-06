import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/me');

      if (response.ok) {
        const profile = await response.json();
        
        // Ensure user is updated
        const userData = {
          ...profile,
          userId: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          photoUrl: profile.photo_url || profile.avatar_url,
          totalPoints: profile.total_points,
          problemsSolved: profile.problems_solved,
          currentStreak: profile.current_streak,
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || (profile.email ? profile.email.split('@')[0] : 'Developer'),
          role: profile.role || 'student'
        };

        setUser(userData);
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        // Try refresh
        const refreshRes = await fetch('/api/auth/session/refresh', { method: 'POST' });
        if (refreshRes.ok) {
          // If refresh worked, fetch session again
          const retryRes = await fetch('/api/auth/me');
          if (retryRes.ok) {
            const profile = await retryRes.json();
            const userData = {
                ...profile,
                userId: profile.id,
                name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || (profile.email ? profile.email.split('@')[0] : 'Developer'),
                role: profile.role || 'student'
            };
            setUser(userData);
            setIsAuthenticated(true);
            return;
          }
        }
        
        // Refresh failed or no session
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Auth Profile Fetch Error:', err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    const handleLoginEvent = () => fetchSession();
    window.addEventListener('auth-login', handleLoginEvent);
    
    return () => window.removeEventListener('auth-login', handleLoginEvent);
  }, []);

  const login = (token, userData) => {
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/session/logout', { method: 'POST' });
      setUser(null);
      setIsAuthenticated(false);
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
    refreshSession: fetchSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
