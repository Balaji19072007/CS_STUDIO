import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const FullPageLoader = ({ message = 'Initializing CS Studio...', isReady = false, onComplete }) => {
    const { isDark } = useTheme();
    const [progress, setProgress] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [finishing, setFinishing] = useState(false);
    
    const progressRef = useRef(0);
    const stepTimerRef = useRef(null);

    // Phase 1: fake progress up to 88%
    useEffect(() => {
        setFadeIn(true);
        
        const target = 88;
        const step = () => {
            const current = progressRef.current;
            const remaining = target - current;
            // Ease out the fake progress
            const increment = Math.max(0.5, remaining * 0.1); 
            
            progressRef.current += increment;
            if (progressRef.current > target) progressRef.current = target;
            setProgress(Math.floor(progressRef.current));
            
            if (progressRef.current < target) {
                stepTimerRef.current = setTimeout(step, Math.random() * 150 + 100);
            }
        };
        stepTimerRef.current = setTimeout(step, 100);

        return () => clearTimeout(stepTimerRef.current);
    }, []);

    // Phase 2: completion rush
    useEffect(() => {
        if (!isReady) return;

        clearTimeout(stepTimerRef.current);

        const rushToHundred = () => {
            progressRef.current = Math.min(progressRef.current + 4, 100);
            setProgress(Math.floor(progressRef.current));
            
            if (progressRef.current < 100) {
                stepTimerRef.current = setTimeout(rushToHundred, 16);
            } else {
                stepTimerRef.current = setTimeout(() => {
                    setFinishing(true);
                    stepTimerRef.current = setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 600); // Match CSS fade out duration
                }, 300); // Hold briefly at 100%
            }
        };
        rushToHundred();

        return () => clearTimeout(stepTimerRef.current);
    }, [isReady, onComplete]);

    // Premium minimal styling
    const bg = isDark
        ? '#09090b' // Very dark, almost black (zinc-950)
        : '#ffffff'; // Pure white
        
    const textColor = isDark ? '#f4f4f5' : '#18181b'; // zinc-100 / zinc-900
    const subTextColor = isDark ? '#a1a1aa' : '#71717a'; // zinc-400 / zinc-500
    
    // Primary brand color
    const primaryColor = isDark ? '#3b82f6' : '#2563eb'; // blue-500 / blue-600
    const trackColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: bg,
                opacity: finishing ? 0 : (fadeIn ? 1 : 0),
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: finishing ? 'none' : 'all',
            }}
        >
            <style>{`
                @keyframes logoPulse {
                    0% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.0); }
                    50% { transform: scale(1); box-shadow: 0 4px 20px 0 rgba(59, 130, 246, 0.15); }
                    100% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.0); }
                }
                @keyframes sweep {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '320px',
                padding: '0 1.5rem',
                animation: 'fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}>
                
                {/* Logo / Brand Element */}
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: isDark ? '#18181b' : '#ffffff',
                    border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2.5rem',
                    color: primaryColor,
                    fontSize: '20px',
                    fontWeight: '800',
                    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                    letterSpacing: '-0.5px',
                    animation: 'logoPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}>
                    CS
                </div>

                {/* Progress Section */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: textColor,
                            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                            letterSpacing: '-0.01em',
                        }}>
                            {message}
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: subTextColor,
                            fontFamily: '"Inter", "JetBrains Mono", monospace',
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {progress}%
                        </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: trackColor,
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {/* Progress Bar Fill */}
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            backgroundColor: primaryColor,
                            borderRadius: '9999px',
                            transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Animated Shine Effect */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                width: '40%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                animation: 'sweep 1.5s infinite linear',
                            }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FullPageLoader;
