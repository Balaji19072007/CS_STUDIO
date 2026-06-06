import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Trophy, Flame, Target, BookOpen, Clock, ArrowRight,
    Activity, Star, Zap, ChevronRight, PlayCircle, BarChart2, Compass, CheckCircle, Check, Play
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { fetchUserRank } from '../api/leaderboardApi.js';
import { fetchDailyProblem, fetchRecommendedProblems } from '../api/problemApi.js';
import { getEnrolledCourses } from '../api/courseApi.js';
import { buildApiUrl } from '../config/api.js';
import TopUserStats from '../components/TopUserStats.jsx';
import { DashboardSkeleton } from '../components/common/SkeletonLoader';

// Inline SVG Activity Graph Component
const ActivityGraph = ({ history }) => {
    // 1. Process data for last 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));

        // Use Local Time for date string to match data processing logic
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return {
            date: `${year}-${month}-${day}`,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            count: 0
        };
    });

    if (history) {
        history.forEach(item => {
            // Use solvedAt as primary source for activity graph
            const dateVal = item.solvedAt || item.lastSubmission;
            if (dateVal) {
                const dateObj = new Date(dateVal);
                if (!isNaN(dateObj.getTime())) {
                    // Normalize to Local Date (YYYY-MM-DD)
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const dateKey = `${year}-${month}-${day}`;

                    const dayStat = last7Days.find(d => d.date === dateKey);
                    if (dayStat) {
                        dayStat.count++;
                    }
                }
            }
        });
    }

    // 2. Responsive SVG calculation
    const [width, setWidth] = useState(300); // Default fallback width
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if (entries[0] && entries[0].contentRect.width > 0) {
                setWidth(entries[0].contentRect.width);
            }
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const maxCount = Math.max(...last7Days.map(d => d.count), 5); // Minimum max of 5 for scale
    const height = 180; // Increased height to prevent clipping
    const paddingX = 30;
    const paddingY = 40; // More top/bottom padding
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    const points = last7Days.map((d, i) => {
        const x = paddingX + (i / (last7Days.length - 1)) * chartWidth;
        const y = height - paddingY - (d.count / maxCount) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Activity
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">Last 7 Days</span>
            </div>

            <div className="relative h-44 w-full z-10" ref={containerRef}>
                {/* Empty State Overlay */}
                {(!history || history.length === 0) && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">No activity this week</p>
                        <Link to="/problems" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md">
                            Solve a Problem
                        </Link>
                    </div>
                )}
                {/* SVG Graph */}
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Area Gradient Definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Filled Area */}
                    <path
                        d={`M${paddingX},${height - paddingY} ${points} L${width - paddingX},${height - paddingY} Z`}
                        fill="url(#gradient)"
                    />

                    {/* Line Path */}
                    <polyline
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        points={points}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    />

                    {/* Data Points */}
                    {last7Days.map((d, i) => {
                        const x = paddingX + (i / (last7Days.length - 1)) * chartWidth;
                        const y = height - paddingY - (d.count / maxCount) * chartHeight;
                        return (
                            <g key={i} className="group/point">
                                <circle cx={x} cy={y} r="4" className="fill-white dark:fill-gray-900 stroke-blue-500 stroke-2 group-hover/point:r-6 transition-all duration-300 cursor-pointer" />
                                {/* Tooltip */}
                                <g className="opacity-0 group-hover/point:opacity-100 transition-opacity duration-300">
                                    <rect x={x - 15} y={y - 35} width="30" height="20" rx="4" className="fill-gray-800 dark:fill-gray-800 stroke-none" />
                                    <text x={x} y={y - 21} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                                        {d.count}
                                    </text>
                                </g>
                                {/* X-Axis Labels */}
                                <text x={x} y={height - paddingY + 24} textAnchor="middle" fontSize="12" fontWeight="500" className="fill-gray-500 dark:fill-gray-400">
                                    {d.dayName}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};


const UserHomePage = () => {
    const { user } = useAuth();
    const [rankData, setRankData] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [difficultyStats, setDifficultyStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // New Data States
    // const [dailyProblem, setDailyProblem] = useState(null);
    const [recommendedProblems, setRecommendedProblems] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [ongoingCourses, setOngoingCourses] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { 'x-auth-token': token } : {};
                const cacheKey = `dashboard_data_v5_${user.uid || user.id}`;

                let shouldInvalidate = sessionStorage.getItem('invalidate_dashboard_cache');

                // FORCE INVALIDATION if returning from a solved problem
                if (location.state?.solved) {
                    console.log('🚀 Returned from successful solution, invalidating cache!');
                    shouldInvalidate = 'true';
                    // Clear the state so it doesn't loop (optional, but good practice if we pushed history)
                    // But here we just use it as a trigger.
                }

                if (shouldInvalidate) {
                    console.log('♻️ Invalidating Dashboard Cache');
                    sessionStorage.removeItem(cacheKey);
                    sessionStorage.removeItem('invalidate_dashboard_cache');
                }

                const cachedData = sessionStorage.getItem(cacheKey);
                // Only use cache if NOT invalidating
                if (cachedData && !shouldInvalidate) {
                    const data = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    // 5 minute cache validity
                    if (now - data.timestamp < 5 * 60 * 1000) {
                        setRankData(data.rankData);
                        setUserStats(data.userStats);
                        setDifficultyStats(data.difficultyStats);
                        // setDailyProblem(data.dailyProblem);
                        setRecommendedProblems(data.recommendedProblems);
                        setUserHistory(data.userHistory);
                        setOngoingCourses(data.ongoingCourses || []);
                        setLoading(false);
                        return;
                    }
                }

                let rData = null;
                try {
                    rData = await fetchUserRank();
                    setRankData(rData);
                } catch {
                    setRankData(null);
                }

                let sData = null;
                if (token) {
                    const pStatsRes = await fetch(buildApiUrl(`/api/progress/user-stats?t=${new Date().getTime()}`), { headers });
                    if (pStatsRes.ok) {
                        sData = await pStatsRes.json();
                        console.log('📊 Stats API Response:', sData);
                        if (sData.success) {
                            setUserStats(sData.progressStats);
                            setDifficultyStats(sData.difficultyBreakdown);
                            setUserStats(prev => ({ ...prev, ...sData.userStats }));
                            console.log('✅ Stats loaded:', { userStats: sData.userStats, difficultyStats: sData.difficultyBreakdown });
                        }
                    } else {
                        console.warn('⚠️ Stats API failed:', pStatsRes.status);
                    }
                }

                const [daily, recommended, historyRes, enrolledCourses] = await Promise.all([
                    fetchDailyProblem().catch(() => null),
                    fetchRecommendedProblems().catch(() => []),
                    token ? fetch(buildApiUrl(`/api/progress/history?t=${new Date().getTime()}`), { headers }) : Promise.resolve(null),
                    token ? getEnrolledCourses().catch(() => []) : Promise.resolve([])
                ]);

                // Manually force 'solved' on daily problem if we just solved it, 
                // just in case API is lagging (Eventual Consistency)
                if (location.state?.solved && daily && daily.problemId) {
                    daily.solved = true;
                }

                // setDailyProblem(daily);
                setRecommendedProblems(recommended);
                setOngoingCourses((enrolledCourses || []).filter(c => c.progress < 100));

                let hDataList = [];
                if (historyRes && historyRes.ok) {
                    const hData = await historyRes.json();
                    if (hData.success) {
                        hDataList = hData.history;
                        setUserHistory(hDataList);
                        console.log('📈 History loaded:', hDataList.length, 'items');
                    }
                } else {
                    console.log('ℹ️ No history data available');
                }

                sessionStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: new Date().getTime(),
                    rankData: rData,
                    userStats: sData ? { ...sData.progressStats, ...sData.userStats } : null,
                    difficultyStats: sData ? sData.difficultyBreakdown : null,
                    dailyProblem: daily,
                    recommendedProblems: recommended,
                    userHistory: hDataList,
                    ongoingCourses: (enrolledCourses || []).filter(c => c.progress < 100)
                }));

            } catch (error) {
                console.warn("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadData();
        }
    }, [user, location.key, location.state]); // Add location dependencies to trigger re-run on navigation

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    if (!user) return null;

    if (loading) {
        return <DashboardSkeleton />;
    }

    // --- STREAK CALCULATION ---
    const hasSolvedToday = userHistory?.some(h => {
        if (h.status !== 'solved' || !h.solvedAt) return false;
        const solvedDate = new Date(h.solvedAt);
        const today = new Date();
        return solvedDate.getDate() === today.getDate() &&
               solvedDate.getMonth() === today.getMonth() &&
               solvedDate.getFullYear() === today.getFullYear();
    }) || false;

    // --- MASTERY LEVEL CALCULATION ---
    const MASTERY_LEVELS = [
        { name: 'Beginner', target: { Easy: 20, Medium: 10, Hard: 5 }, icon: '🌱' },
        { name: 'Novice', target: { Easy: 40, Medium: 25, Hard: 10 }, icon: '🌟' },
        { name: 'Intermediate', target: { Easy: 75, Medium: 50, Hard: 20 }, icon: '⚔️' },
        { name: 'Advanced', target: { Easy: 150, Medium: 100, Hard: 40 }, icon: '🔥' },
        { name: 'Expert', target: { Easy: 250, Medium: 175, Hard: 80 }, icon: '💎' },
        { name: 'Master', target: { Easy: 400, Medium: 300, Hard: 150 }, icon: '👑' }
    ];

    const currentStats = {
        Easy: difficultyStats?.Easy || 0,
        Medium: difficultyStats?.Medium || 0,
        Hard: difficultyStats?.Hard || 0
    };

    let currentLevelName = 'Rookie';
    let currentIcon = '🥚';
    let targetLevel = MASTERY_LEVELS[0];
    let isMax = false;

    for (let i = 0; i < MASTERY_LEVELS.length; i++) {
        const req = MASTERY_LEVELS[i].target;
        if (currentStats.Easy >= req.Easy && currentStats.Medium >= req.Medium && currentStats.Hard >= req.Hard) {
            currentLevelName = MASTERY_LEVELS[i].name;
            currentIcon = MASTERY_LEVELS[i].icon;
            targetLevel = MASTERY_LEVELS[i + 1];
        } else {
            targetLevel = MASTERY_LEVELS[i];
            break;
        }
    }

    if (!targetLevel) {
        isMax = true;
        targetLevel = MASTERY_LEVELS[MASTERY_LEVELS.length - 1]; // Cap at Master stats
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f111a] pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-3 sm:gap-4 pb-4 sm:pb-6 md:pb-8 border-b border-gray-200 dark:border-gray-800 text-center md:text-left">
                    <div className="space-y-1 sm:space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight">
                            {getGreeting()}, <span className="text-blue-600 dark:text-blue-500">{user.name || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName) || 'Developer'}</span>!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Ready to push your limits today?</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-mono italic">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

                    {/* --- LEFT COLUMN (8/12 - 2/3 roughly) --- */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-8">

                        {/* 1. Daily Practice Card */}
                        {loading ? (
                            <div className="h-40 sm:h-48 rounded-2xl sm:rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                        ) : hasSolvedToday ? (
                            // Render COMPLETED State
                            <div className="block relative group overflow-hidden rounded-2xl sm:rounded-3xl transition-all shadow-lg shadow-green-900/10 hover:scale-[1.01]">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700 opacity-95 transition-opacity"></div>
                                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                                    <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-white/10 flex items-center gap-1.5">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Completed
                                            </span>
                                            {/* Desktop Streak Badge */}
                                            <div className="hidden md:flex items-center gap-1.5 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                                                <Flame className="w-3.5 h-3.5 text-orange-200 fill-orange-200" />
                                                <span className="text-orange-100 font-bold text-xs">{userStats?.currentStreak || 0} Day Streak</span>
                                            </div>
                                        </div>

                                        {/* Mobile Streak Badge (Top Right) */}
                                        <div className="md:hidden absolute top-5 right-5 flex items-center justify-end">
                                            <span className="text-orange-100 font-extrabold text-2xl tracking-tighter mr-0.5">{userStats?.currentStreak || 0}</span>
                                            <Flame className="w-5 h-5 text-orange-200 fill-orange-200" />
                                        </div>

                                        <div>
                                            <div className="flex items-start justify-between gap-4">
                                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                                    Awesome! Streak Maintained.
                                                </h2>
                                                <div className="md:hidden flex-shrink-0 bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-xl flex items-center justify-center border border-white/20">
                                                    <Check className="w-5 h-5 stroke-[3]" />
                                                </div>
                                            </div>
                                            <p className="hidden md:block text-green-50 text-xs sm:text-sm opacity-90 max-w-xl">
                                                You've crushed a problem today and kept your streak alive. Come back tomorrow for more!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-shrink-0">
                                        <div className="bg-white/20 backdrop-blur-md text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                                            <Check className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Render ACTIVE (TODO) State
                            <div className="block relative group overflow-hidden rounded-lg sm:rounded-xl transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-orange-900/20 shadow-lg border border-orange-500/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-90 transition-opacity"></div>
                                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-32 bg-black/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                                <div className="relative p-5 md:p-8 flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase px-2 py-1 md:px-3 rounded-full shadow-sm border border-white/10 whitespace-nowrap">
                                            Daily Practice
                                        </span>
                                        {/* Desktop Streak Badge */}
                                        <div className="hidden md:flex items-center gap-1.5 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 whitespace-nowrap">
                                            <Flame className="w-3.5 h-3.5 text-orange-100 fill-orange-100" />
                                            <span className="text-orange-50 font-bold text-xs">{userStats?.currentStreak || 0} Day Streak at Risk!</span>
                                        </div>
                                        {/* Mobile Streak Badge */}
                                        <div className="flex md:hidden items-center whitespace-nowrap ml-auto" title="Current Streak">
                                            <span className="text-orange-50 font-extrabold text-sm shadow-sm">{userStats?.currentStreak || 0}</span>
                                            <Flame className="w-4 h-4 text-orange-200 fill-orange-200 drop-shadow-sm" />
                                        </div>
                                    </div>

                                    {/* 2. Title and Button Row */}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white leading-tight">
                                                Maintain Your Streak
                                            </h2>
                                            <p className="hidden md:block text-orange-50/90 text-sm max-w-2xl mt-2 line-clamp-2">
                                                Today you have not solved any problem. Solve a new problem of your choice to keep your streak alive!
                                            </p>
                                        </div>

                                        <Link to="/problems" className="flex-shrink-0">
                                            <div className="bg-white text-orange-600 px-5 py-3 sm:px-6 sm:py-4 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform font-bold whitespace-nowrap">
                                                Solve Now
                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 fill-current" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Stats & Actions Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:gap-8">
                            {/* Activity Graph */}
                            <div>
                                <ActivityGraph history={userHistory} />
                            </div>
                        </div>

                        {/* 3. Current Course */}
                        {ongoingCourses && ongoingCourses.length > 0 ? (
                            <div className="space-y-6">
                                {ongoingCourses.map((course) => (
                                    <div key={course.id} className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm dark:shadow-none">
                                        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                                            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                                                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-md">
                                                    <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                Jump Back In
                                            </h2>
                                        </div>
                                        <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-6 sm:gap-8">
                                            <div className="w-full md:w-64 aspect-video rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                {course.coverImage && course.coverImage !== '/api/placeholder/400/300' ? (
                                                    <img
                                                        src={course.coverImage}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-700">{course.icon || '💻'}</span>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                        <Play className="w-5 h-5 text-white ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center space-y-4">
                                                <div>
                                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">Full Stack Path</span>
                                                        <span>•</span>
                                                        <span>{course.currentModule || 'Basics'}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                                        <span className="text-gray-500 dark:text-gray-400">{course.progress}% Complete</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 relative"
                                                            style={{ width: `${course.progress}%` }}
                                                        >
                                                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link to={`/courses/${course.id}`} className="w-max px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all font-bold text-sm flex items-center gap-2 shadow-lg shadow-gray-900/10 dark:shadow-white/5 active:scale-95">
                                                    Resume Learning
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#151821] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden group transition-all">
                                {/* Subtle decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                                
                                <div className="relative z-10 text-center sm:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100 dark:border-indigo-500/20">
                                        <BookOpen className="w-3.5 h-3.5" />
                                        Start Learning
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight text-gray-900 dark:text-white">No Ongoing Courses</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto sm:mx-0 leading-relaxed">
                                        You don't have any ongoing courses right now. Ready to master new concepts? Explore our structured courses and build your foundational knowledge step by step!
                                    </p>
                                </div>
                                
                                <Link to="/courses" className="relative z-10 flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                                    Browse Catalog
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}

                    </div>

                    {/* --- RIGHT COLUMN (4/12 - 1/3 roughly) --- */}
                    <div className="lg:col-span-4 space-y-6 sm:space-y-8">

                        {/* 1. Rank Card */}
                        {loading ? (
                            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl sm:rounded-3xl animate-pulse"></div>
                        ) : (
                            rankData ? (
                                <TopUserStats rankData={rankData} />
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 border border-gray-200 dark:border-gray-700 text-center shadow-sm dark:shadow-none">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                        <BarChart2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Rank Yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">Solve problems to enter the leaderboard!</p>
                                    <Link to="/problems" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                        Start Solving
                                    </Link>
                                </div>
                            )
                        )}


                        {/* 3. Mastery Widget */}
                        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700/50 p-5 sm:p-6 shadow-xl dark:shadow-xl hover:border-pink-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <span className="p-1.5 bg-pink-100 dark:bg-pink-500/20 rounded-lg">
                                        <Target className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                                    </span>
                                    Mastery Progress
                                </h2>
                                <div className="text-right">
                                    <div className="text-lg sm:text-xl font-extrabold flex items-center justify-end gap-1.5 text-gray-900 dark:text-white">
                                        <span className="drop-shadow-sm">{currentIcon}</span> <span>{currentLevelName}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                                        {isMax ? 'Max Level Reached!' : `Next Goal: ${targetLevel.name}`}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 sm:space-y-6">
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 dark:text-green-400 font-bold group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors">Easy</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{currentStats.Easy} <span className="text-gray-400 dark:text-gray-600">/ {targetLevel.target.Easy}</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-green-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] relative" style={{ width: `${Math.min((currentStats.Easy / targetLevel.target.Easy) * 100, 100)}%` }}>
                                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-yellow-600 dark:text-yellow-400 font-bold group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors">Medium</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{currentStats.Medium} <span className="text-gray-400 dark:text-gray-600">/ {targetLevel.target.Medium}</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.4)] relative" style={{ width: `${Math.min((currentStats.Medium / targetLevel.target.Medium) * 100, 100)}%` }}>
                                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-600 dark:text-red-400 font-bold group-hover:text-red-500 dark:group-hover:text-red-300 transition-colors">Hard</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{currentStats.Hard} <span className="text-gray-400 dark:text-gray-600">/ {targetLevel.target.Hard}</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-red-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] relative" style={{ width: `${Math.min((currentStats.Hard / targetLevel.target.Hard) * 100, 100)}%` }}>
                                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Recommended Problems */}
                        {recommendedProblems.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700/50 p-5 sm:p-6 shadow-xl dark:shadow-xl">
                                <div className="flex justify-between items-center mb-5 sm:mb-6">
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        <span className="p-1.5 bg-cyan-100 dark:bg-cyan-500/20 rounded-lg">
                                            <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                        </span>
                                        For You
                                    </h2>
                                    <Link to="/problems" className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors uppercase tracking-wide">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {recommendedProblems.map((problem, index) => (
                                        <Link key={problem.problemId || index} to={`/solve?problemId=${problem.problemId}`} state={{ from: '/' }} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl sm:rounded-2xl transition-all group">
                                            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-inner ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-500' :
                                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500' :
                                                        'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500'
                                                    }`}>
                                                    {problem.difficulty ? problem.difficulty[0] : '?'}
                                                </div>
                                                <div className="overflow-hidden min-w-0">
                                                    <h3 className="text-gray-900 dark:text-white font-bold text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{problem.title}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{problem.category || 'General'}</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all border border-gray-100 dark:border-transparent">
                                                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 group-hover:text-white" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserHomePage;
