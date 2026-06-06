import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';

const MyProblemStats = () => {
    const { isLoggedIn, loading: authLoading } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, solved, attempted

    useEffect(() => {
        const fetchHistory = async () => {
            if (!isLoggedIn) return;
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/progress/history', {
                    headers: {
                        'x-auth-token': token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setHistory(data.history);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [isLoggedIn]);

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    });

    const formatTime = (ms) => {
        if (!ms) return 'N/A';
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredHistory = history.filter(item => {
        if (filter === 'all') return true;
        return item.status === filter;
    });

    if (authLoading || loading) {
        return (
            <div className="min-h-screen dark-gradient-secondary flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark-gradient-secondary pt-6 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <div className="flex items-center mb-6">
                    <button onClick={() => window.history.back()} className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white" title="Go Back">
                        <i data-feather="arrow-left" className="w-5 h-5"></i>
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                            <i data-feather="bar-chart-2" className="text-primary-400"></i>
                            My Problem Stats
                        </h1>
                        <p className="text-gray-400 mt-1">Track your accuracy, speed, and history.</p>
                    </div>

                    <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
                        {['all', 'solved', 'attempted'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalized ${filter === f
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Table */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
                    {filteredHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-900 border-b border-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Problem</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time Taken</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/4">Accuracy</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {filteredHistory.map((item) => (
                                        <tr key={item.problemId} className="group hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <Link to={`/solve/${item.problemId}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                                                        #{item.problemId}. {item.title}
                                                    </Link>
                                                    <span className={`text-xs mt-1 w-max px-2 py-0.5 rounded-full font-medium ${item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                                                        item.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                                            'bg-red-500/10 text-red-400'
                                                        }`}>
                                                        {item.difficulty}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status === 'solved' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                                        <i data-feather="check-circle" className="w-3 h-3"></i> Solved
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-600/30 text-gray-300 border border-gray-600/30">
                                                        <i data-feather="clock" className="w-3 h-3"></i> Attempted
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                                                {formatTime(item.timeTaken)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full max-w-[140px]">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-400">Score</span>
                                                        <span className={`font-bold ${item.bestAccuracy >= 90 ? 'text-green-400' :
                                                            item.bestAccuracy >= 50 ? 'text-yellow-400' : 'text-red-400'
                                                            }`}>
                                                            {item.bestAccuracy}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${item.bestAccuracy >= 90 ? 'bg-green-500' :
                                                                item.bestAccuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                                }`}
                                                            style={{ width: `${item.bestAccuracy}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400 text-right">
                                                {formatDate(item.status === 'solved' ? item.solvedAt : item.lastSubmission)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4">
                            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <i data-feather="code" className="w-8 h-8"></i>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">No problems found</h3>
                            <p className="text-gray-400 mb-6">You haven't attempted any problems in this category yet.</p>
                            <Link to="/problems" className="dark-btn px-6 py-2 rounded-lg inline-flex items-center">
                                Browse Problems
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyProblemStats;
