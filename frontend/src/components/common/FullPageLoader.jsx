import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

/* ─── Tiny canvas-based code-rain (green chars falling) ─── */
function CodeRainCanvas({ isDark }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const chars = '01アイウエオカキクケコ#$%&CS{}[]<>;()';
        const fontSize = 13;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = isDark ? 'rgba(10,14,39,0.12)' : 'rgba(240,245,255,0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;
            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const alpha = Math.random() * 0.5 + 0.1;
                ctx.fillStyle = isDark
                    ? `rgba(99,179,237,${alpha})`
                    : `rgba(59,130,246,${alpha})`;
                ctx.fillText(char, i * fontSize, y * fontSize);
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };

        const interval = setInterval(draw, 50);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                opacity: isDark ? 0.35 : 0.2,
                pointerEvents: 'none',
            }}
        />
    );
}

/* ─── Floating particle dots ─── */
function Particles({ isDark }) {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 6,
    }));

    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: isDark
                            ? 'radial-gradient(circle, #60a5fa, #818cf8)'
                            : 'radial-gradient(circle, #3b82f6, #6366f1)',
                        opacity: 0,
                        animation: `floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite`,
                        boxShadow: isDark
                            ? '0 0 8px #60a5fa'
                            : '0 0 6px #3b82f6',
                    }}
                />
            ))}
        </>
    );
}

/* ─── Loading status messages ─── */
const STATUS_MSGS = [
    'Compiling modules...',
    'Loading environment...',
    'Fetching user data...',
    'Optimizing performance...',
    'Almost ready...',
];

const FullPageLoader = ({ message = 'Initializing CS Studio...', isReady = false, onComplete }) => {
    const { isDark } = useTheme();
    const [progress, setProgress] = useState(0);
    const [statusIdx, setStatusIdx] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [finishing, setFinishing] = useState(false);
    const msgIntervalRef = useRef(null);
    const progressRef = useRef(0);
    const stepTimerRef = useRef(null);

    // ── Phase 1: fake progress up to 85% while loading ──
    useEffect(() => {
        setFadeIn(true);

        const target = 85;
        const step = () => {
            progressRef.current += Math.random() * 3 + 0.5;
            if (progressRef.current > target) progressRef.current = target;
            setProgress(Math.floor(progressRef.current));
            if (progressRef.current < target) {
                stepTimerRef.current = setTimeout(step, 140);
            }
        };
        stepTimerRef.current = setTimeout(step, 200);

        msgIntervalRef.current = setInterval(() => {
            setStatusIdx((prev) => (prev + 1) % STATUS_MSGS.length);
        }, 1800);

        return () => {
            clearInterval(msgIntervalRef.current);
            clearTimeout(stepTimerRef.current);
        };
    }, []);

    // ── Phase 2: when auth is done → rush to 100%, then fade out ──
    useEffect(() => {
        if (!isReady) return;

        // Stop fake progress & status cycling
        clearTimeout(stepTimerRef.current);
        clearInterval(msgIntervalRef.current);

        // Animate from current value to 100 quickly
        const rushToHundred = () => {
            progressRef.current = Math.min(progressRef.current + 4, 100);
            setProgress(Math.floor(progressRef.current));
            setStatusIdx(STATUS_MSGS.length); // triggers "Ready!" label
            if (progressRef.current < 100) {
                stepTimerRef.current = setTimeout(rushToHundred, 18);
            } else {
                // Hold at 100% for 600ms so the user sees it, then fade out
                setTimeout(() => {
                    setFinishing(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 520); // matches CSS transition below
                }, 600);
            }
        };
        rushToHundred();
    }, [isReady]); // eslint-disable-line react-hooks/exhaustive-deps

    const bg = isDark
        ? 'linear-gradient(135deg, #0A0E27 0%, #0D1B3E 50%, #0A0E27 100%)'
        : 'linear-gradient(135deg, #EFF6FF 0%, #E0EAFF 50%, #EFF6FF 100%)';

    // Which label to show
    const statusLabel = statusIdx >= STATUS_MSGS.length ? '✓ Ready!' : STATUS_MSGS[statusIdx];

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
                transition: finishing ? 'opacity 0.5s ease' : 'opacity 0.6s ease',
                overflow: 'hidden',
                pointerEvents: finishing ? 'none' : 'all',
            }}
        >
            {/* Keyframe styles */}
            <style>{`
                @keyframes floatParticle {
                    0%   { transform: translateY(0px) scale(1); opacity: 0; }
                    20%  { opacity: 0.8; }
                    50%  { transform: translateY(-60px) scale(1.3); opacity: 0.6; }
                    80%  { opacity: 0.4; }
                    100% { transform: translateY(-120px) scale(0.8); opacity: 0; }
                }
                @keyframes orbitOuter {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes orbitInner {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes corePulse {
                    0%, 100% { transform: scale(1);   box-shadow: 0 0 40px #3b82f6, 0 0 80px #6366f140; }
                    50%      { transform: scale(1.08); box-shadow: 0 0 60px #60a5fa, 0 0 120px #818cf860; }
                }
                @keyframes glowRing {
                    0%, 100% { opacity: 0.4; }
                    50%      { opacity: 0.9; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes statusFade {
                    0%   { opacity: 0; transform: translateY(6px); }
                    15%  { opacity: 1; transform: translateY(0); }
                    85%  { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-6px); }
                }
                @keyframes progressShine {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
                @keyframes bgPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50%      { opacity: 0.7; transform: scale(1.1); }
                }
            `}</style>

            {/* Canvas code rain */}
            <CodeRainCanvas isDark={isDark} />

            {/* Floating particles */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <Particles isDark={isDark} />
            </div>

            {/* Radial glow blobs */}
            <div style={{
                position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
            }}>
                <div style={{
                    position: 'absolute', top: '25%', left: '20%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, #3b82f660, transparent 70%)'
                        : 'radial-gradient(circle, #bfdbfe80, transparent 70%)',
                    animation: 'bgPulse 5s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', top: '50%', right: '15%',
                    width: 320, height: 320, borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, #6366f150, transparent 70%)'
                        : 'radial-gradient(circle, #c7d2fe80, transparent 70%)',
                    animation: 'bgPulse 6s 2s ease-in-out infinite',
                }} />
            </div>

            {/* ── Main card ── */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                padding: '3rem 4rem',
                borderRadius: '2rem',
                background: isDark
                    ? 'rgba(15, 23, 50, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: isDark
                    ? '1px solid rgba(99,179,237,0.15)'
                    : '1px solid rgba(59,130,246,0.2)',
                boxShadow: isDark
                    ? '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,179,237,0.08)'
                    : '0 24px 80px rgba(59,130,246,0.15), 0 0 0 1px rgba(255,255,255,0.8)',
                animation: 'slideUp 0.7s ease both',
            }}>

                {/* ── Orbital animation ── */}
                <div style={{ position: 'relative', width: 140, height: 140 }}>

                    {/* Outer ring */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        border: `2px solid ${isDark ? 'rgba(99,179,237,0.25)' : 'rgba(59,130,246,0.25)'}`,
                        animation: 'orbitOuter 4s linear infinite',
                    }}>
                        {/* Orbiting dot outer */}
                        <div style={{
                            position: 'absolute', top: -5, left: '50%',
                            transform: 'translateX(-50%)',
                            width: 10, height: 10, borderRadius: '50%',
                            background: isDark
                                ? 'linear-gradient(135deg,#60a5fa,#818cf8)'
                                : 'linear-gradient(135deg,#3b82f6,#6366f1)',
                            boxShadow: isDark ? '0 0 12px #60a5fa' : '0 0 10px #3b82f6',
                        }} />
                    </div>

                    {/* Middle ring */}
                    <div style={{
                        position: 'absolute', inset: 20,
                        borderRadius: '50%',
                        border: `1.5px solid ${isDark ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)'}`,
                        animation: 'orbitInner 3s linear infinite',
                        animationDelay: '-1s',
                    }}>
                        {/* Orbiting dot inner */}
                        <div style={{
                            position: 'absolute', bottom: -4, left: '50%',
                            transform: 'translateX(-50%)',
                            width: 8, height: 8, borderRadius: '50%',
                            background: isDark
                                ? 'linear-gradient(135deg,#a78bfa,#f472b6)'
                                : 'linear-gradient(135deg,#6366f1,#ec4899)',
                            boxShadow: isDark ? '0 0 10px #a78bfa' : '0 0 8px #6366f1',
                        }} />
                    </div>

                    {/* Inner ring */}
                    <div style={{
                        position: 'absolute', inset: 38,
                        borderRadius: '50%',
                        border: `1px dashed ${isDark ? 'rgba(248,200,100,0.25)' : 'rgba(234,179,8,0.3)'}`,
                        animation: 'orbitOuter 6s linear infinite',
                        animationDelay: '-2s',
                    }} />

                    {/* Core logo */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <div style={{
                            width: 58, height: 58, borderRadius: '1rem',
                            background: isDark
                                ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                                : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: 'corePulse 2.5s ease-in-out infinite',
                            boxShadow: '0 0 40px #3b82f6, 0 0 80px #6366f140',
                            fontSize: 22, fontWeight: 900, color: '#fff',
                            letterSpacing: '-0.5px',
                            fontFamily: '"Segoe UI", system-ui, sans-serif',
                            userSelect: 'none',
                        }}>
                            CS
                        </div>
                    </div>
                </div>

                {/* ── Text section ── */}
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        background: isDark
                            ? 'linear-gradient(135deg,#e2e8f0,#93c5fd)'
                            : 'linear-gradient(135deg,#1e3a8a,#4f46e5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: '"Segoe UI", system-ui, sans-serif',
                    }}>
                        {message}
                    </h1>

                    {/* Animated status message */}
                    <p
                        key={statusIdx}
                        style={{
                            margin: '0.4rem 0 0',
                            fontSize: '0.68rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: statusIdx >= STATUS_MSGS.length
                                ? (isDark ? 'rgba(96,165,250,0.95)' : 'rgba(37,99,235,0.95)')
                                : (isDark ? 'rgba(148,163,184,0.8)' : 'rgba(71,85,105,0.7)'),
                            fontFamily: 'monospace',
                            fontWeight: statusIdx >= STATUS_MSGS.length ? 700 : 400,
                            animation: 'statusFade 1.8s ease both',
                        }}
                    >
                        {statusLabel}
                    </p>
                </div>

                {/* ── Progress bar ── */}
                <div style={{ width: '100%', maxWidth: 280 }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginBottom: '0.4rem',
                    }}>
                        <span style={{
                            fontSize: '0.6rem', letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.6)',
                            fontFamily: 'monospace',
                        }}>Loading</span>
                        <span style={{
                            fontSize: '0.6rem', letterSpacing: '0.05em',
                            color: isDark ? 'rgba(96,165,250,0.8)' : 'rgba(59,130,246,0.9)',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{progress}%</span>
                    </div>
                    {/* Track */}
                    <div style={{
                        width: '100%', height: 4, borderRadius: 99,
                        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(59,130,246,0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {/* Fill */}
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            borderRadius: 99,
                            background: isDark
                                ? 'linear-gradient(90deg,#3b82f6,#818cf8,#a78bfa)'
                                : 'linear-gradient(90deg,#2563eb,#6366f1)',
                            transition: 'width 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Shine sweep */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0,
                                width: '40%', height: '100%',
                                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)',
                                animation: 'progressShine 1.8s ease-in-out infinite',
                            }} />
                        </div>
                    </div>
                </div>

                {/* ── Bottom dots ── */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                        <div key={i} style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: isDark ? '#60a5fa' : '#3b82f6',
                            opacity: 0.4,
                            animation: `corePulse 1.4s ${i * 0.2}s ease-in-out infinite`,
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FullPageLoader;
