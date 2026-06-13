import React, { useState, useEffect } from 'react';
import * as feather from '../util/featherIcons';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';
import { buildApiUrl } from '../config/api.js';
import { SkeletonDashboard } from '../components/common/SkeletonLoader';
import { ErrorPage } from '../components/common/ErrorPages';
import EmptyState from '../components/common/EmptyState';

const MyProgress = () => {
  const { isLoggedIn } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [heatmapData, setHeatmapData] = useState({});

  const fetchData = async () => {
    if (!isLoggedIn) { setLoading(false); return; }
    setFetchError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const headers = { 'x-auth-token': token };

      const [statsRes, historyRes, coursesRes] = await Promise.all([
        fetch(buildApiUrl('/api/progress/user-stats'), { headers }),
        fetch(buildApiUrl('/api/progress/history'), { headers }),
        fetch(buildApiUrl('/api/courses/enrolled'), { headers }),
      ]);

      const statsData = await statsRes.json();
      const historyData = await historyRes.json();
      const coursesData = await coursesRes.json();

      if (statsData.success) setStats(statsData);
      if (historyData.success) {
        setHistory(historyData.history);
        processHeatmap(historyData.history);
      }
      if (coursesData.success) {
        setEnrolledCourses(coursesData.courses);
      }

    } catch (error) {
      console.error("Failed to fetch progress data:", error);
      setFetchError(error?.message || 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!loading && typeof feather !== 'undefined') {
      feather.replace();
    }
  });

  // Process history into date counts for heatmap
  const processHeatmap = (historyItems) => {
    const counts = {};
    historyItems.forEach(item => {
      // Use solvedAt if available, fallback to lastSubmission
      const dateVal = item.solvedAt || item.lastSubmission;
      if (!dateVal) return;

      try {
        const dateObj = new Date(dateVal);
        if (isNaN(dateObj.getTime())) return;

        // Group by Local Date (YYYY-MM-DD)
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;

        counts[dateKey] = (counts[dateKey] || 0) + 1;
      } catch {
        console.warn("Skipping invalid date in heatmap:", dateVal);
      }
    });
    setHeatmapData(counts);
  };

  // Helper to generate last 365 days in local time
  const generateYearDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      days.push(`${year}-${month}-${day}`);
    }
    return days;
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  if (fetchError) {
    return (
      <ErrorPage
        title="Unable to load progress"
        description={fetchError}
        onRetry={fetchData}
      />
    );
  }

  if (!stats) {
    return (
      <ErrorPage
        title="Unable to load progress"
        description="We couldn't fetch your latest stats. Please try again later."
        onRetry={fetchData}
      />
    );
  }

  const { userStats, difficultyBreakdown } = stats;
  const yearDays = generateYearDays();
  return (
    <div className="min-h-screen bg-gray-50 dark:dark-gradient-secondary pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Back Button */}
        <div className="flex items-center">
          <button onClick={() => window.history.back()} className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white" title="Go Back">
            <i data-feather="arrow-left" className="w-5 h-5"></i>
          </button>
        </div>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              My Progress
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
              Consistent effort builds mastery. Track your daily contributions and skill growth here.
            </p>
          </div>

          {/* Streak Badge */}
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md p-5 rounded-3xl border border-gray-200 dark:border-gray-700/50 flex flex-col items-center justify-center shadow-xl group hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-4xl font-black text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">{userStats.currentStreak || 0}</span>
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">🔥</span>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em] mt-2 text-center">Day Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- LEFT COLUMN (2/3) --- */}
          <div className="lg:col-span-2 space-y-8">

            {/* 0. Enrolled Courses */}
            {enrolledCourses.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl relative overflow-hidden">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <i data-feather="book-open" className="w-5 h-5 text-indigo-500 dark:text-indigo-400"></i>
                  My Enrolled Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => (
                    <Link key={course.id} to={`/courses/${course.id}/learn`} className="group flex flex-col justify-between bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                            {course.coverImage && course.coverImage !== '/api/placeholder/400/300' ? (
                              <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl">{course.icon || '💻'}</span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{course.title}</h3>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-500 dark:text-gray-400">Progress</span>
                          <span className="text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
                <EmptyState
                  icon="📚"
                  iconType="primary"
                  title="No enrolled courses"
                  description="Enroll in a course to start tracking your progress here."
                  compact
                  action={
                    <Link to="/courses" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                      Browse Courses
                    </Link>
                  }
                />
              </div>
            )}

            {/* 1. Contribution Graph */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl relative overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i data-feather="grid" className="w-5 h-5 text-green-500 dark:text-green-400"></i>
                Contribution Activity
              </h2>

              {/* Heatmap Grid - Simplified Top-First Layout */}
              <div className="flex flex-wrap gap-1.5 justify-start">
                {yearDays.slice(-364).reverse().map((date) => {
                  const count = heatmapData[date] || 0;

                  // Default (Empty): Dark gray in dark mode
                  let colorClass = 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700';

                  // Level 1: Low activity - Dark visible green
                  if (count > 0) colorClass = 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800';

                  // Level 2: Medium activity - Mid green
                  if (count > 2) colorClass = 'bg-green-300 dark:bg-green-600 border-green-400 dark:border-green-500';

                  // Level 3: High activity - Bright neon green
                  if (count > 5) colorClass = 'bg-green-500 dark:bg-green-400 border-green-600 dark:border-green-300 shadow-[0_0_8px_rgba(74,222,128,0.5)]'; // green-400 glow

                  return (
                    <div
                      key={date}
                      title={`${date}: ${count} solutions`}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] ${colorClass} transition-all hover:scale-125 hover:z-10 cursor-help`}
                    ></div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500 font-medium">
                <span>Less</span>
                <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-300 dark:bg-green-600 border border-green-400 dark:border-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 dark:bg-green-400 border border-green-600 dark:border-green-300 rounded-sm"></div>
                <span>More</span>
              </div>
            </div>

            {/* 2. Recent History Table (Mini) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <i data-feather="clock" className="w-5 h-5 text-blue-500 dark:text-blue-400"></i>
                  Recent Activity
                </h2>
                <Link to="/problem-stats" className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
                  View Full History <i data-feather="arrow-right" className="w-3 h-3"></i>
                </Link>
              </div>

              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.slice(0, 5).map(item => (
                    <div key={item.problemId} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'solved' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.lastSubmission || item.solvedAt ? new Date(item.lastSubmission || item.solvedAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400">
                        {item.bestAccuracy || 0}% Acc
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="⏳"
                  iconType="default"
                  title="No recent activity"
                  description="Solve your first problem to start building your history."
                  compact
                />
              )}
            </div>

          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <div className="space-y-8">

            {/* 1. Skill Mastery Bars */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i data-feather="cpu" className="w-5 h-5 text-purple-500 dark:text-purple-400"></i>
                Skill Mastery
              </h2>
              <div className="space-y-6">
                {[
                  { label: 'Easy Problems', count: difficultyBreakdown?.Easy || 0, total: 50, color: 'bg-green-500' },
                  { label: 'Medium Problems', count: difficultyBreakdown?.Medium || 0, total: 30, color: 'bg-yellow-500' },
                  { label: 'Hard Problems', count: difficultyBreakdown?.Hard || 0, total: 20, color: 'bg-red-500' },
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-gray-600 dark:text-gray-300">{skill.label}</span>
                      <span className="text-gray-900 dark:text-white">{skill.count} / {skill.total}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                        style={{ width: `${Math.min((skill.count / skill.total) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
