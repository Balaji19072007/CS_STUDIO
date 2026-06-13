import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigationProgress } from '../../hooks/useNavigationProgress.jsx';
import { useRouteTransition } from '../../hooks/useRouteTransition.js';

const variants = {
  dashboard: {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  lesson: {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  challenge: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
  },
  minimal: {
    initial: { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
  },
};

export default function RouteTransition({ children, variant: explicitVariant }) {
  const autoVariant = useRouteTransition(location.pathname);
  const variant = explicitVariant || autoVariant;
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { startNavigation, endNavigation } = useNavigationProgress();
  const prevPathRef = useRef(location.pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = location.pathname;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      startNavigation();
    }
  }, [location.pathname, startNavigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      endNavigation();
    }, 120);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
