import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const NavigationProgressContext = createContext(null);

export function NavigationProgressProvider({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const hideTimerRef = useRef(null);

  const startNavigation = useCallback(() => {
    clearTimeout(hideTimerRef.current);
    setIsNavigating(true);
  }, []);

  const endNavigation = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <NavigationProgressContext.Provider value={{ isNavigating, startNavigation, endNavigation }}>
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  const ctx = useContext(NavigationProgressContext);
  if (!ctx) {
    throw new Error('useNavigationProgress must be used within a NavigationProgressProvider');
  }
  return ctx;
}
