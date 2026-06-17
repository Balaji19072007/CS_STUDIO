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
                    }, 800); // Smooth transition duration
                }, 200); // Brief pause at 100%
            }
        };
        rushToHundred();

        return () => clearTimeout(stepTimerRef.current);
    }, [isReady, onComplete]);

    // Elegant Styling
    const bg = isDark ? '#030712' : '#f8fafc'; // Very deep blue-black / slate-50
    const glassBg = isDark ? 'rgba(17, 24, 39, 0.45)' : 'rgba(255, 255, 255, 0.65)';
    const glassBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
    const glassShadow = isDark ? '0 10px 40px -10px rgba(0, 0, 0, 0.5)' : '0 10px 40px -10px rgba(31, 38, 135, 0.08)';
    
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const primaryColor = isDark ? '#3b82f6' : '#2563eb';
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
                transform: finishing ? 'scale(1.05)' : 'scale(1)',
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: finishing ? 'none' : 'all',
                overflow: 'hidden'
            }}
        >
            <style>{`
                @keyframes floatOrb1 {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes floatOrb2 {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 40px) scale(1.1); }
                    66% { transform: translate(20px, -20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>

            {/* Ambient Background Orbs */}
            <div style={{
                position: 'absolute',
                width: '45vw',
                height: '45vw',
                minWidth: '400px',
                minHeight: '400px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0,0,0,0) 70%)',
                top: '5%',
                left: '10%',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'floatOrb1 15s ease-in-out infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                width: '50vw',
                height: '50vw',
                minWidth: '400px',
                minHeight: '400px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(0,0,0,0) 70%)',
                bottom: '5%',
                right: '10%',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'floatOrb2 18s ease-in-out infinite',
                pointerEvents: 'none',
            }} />

            {/* Glassmorphic Minimal Card */}
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'calc(100% - 2rem)',
                maxWidth: '360px',
                padding: 'clamp(1.5rem, 6vw, 2.5rem)',
                borderRadius: '24px',
                background: glassBg,
                border: `1px solid ${glassBorder}`,
                boxShadow: glassShadow,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                animation: 'fadeSlideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                zIndex: 10,
            }}>
                
                {/* Clean Logo Box */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: isDark ? '#111827' : '#ffffff',
                    border: `1px solid ${glassBorder}`,
                    boxShadow: isDark ? '0 8px 20px -4px rgba(0,0,0,0.4)' : '0 8px 20px -4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <span style={{
                        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '24px',
                        fontWeight: '800',
                        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                        letterSpacing: '-0.5px',
                    }}>
                        CS
                    </span>
                    {/* Inner subtle shimmer on the box */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                        pointerEvents: 'none'
                    }} />
                </div>

                {/* Progress Section */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                        <span style={{
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            color: textColor,
                            fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                            letterSpacing: '-0.01em',
                        }}>
                            {message}
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: primaryColor,
                            fontFamily: '"Inter", "JetBrains Mono", monospace',
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {progress}%
                        </span>
                    </div>

                    {/* Clean Progress Track */}
                    <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: trackColor,
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {/* Smooth Gradient Fill */}
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)',
                            borderRadius: '9999px',
                            transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Inner Continuous Shimmer */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s infinite linear',
                            }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FullPageLoader;
