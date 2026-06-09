import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Crown, Award } from 'lucide-react';

// Top User Stats Component
const TopUserStats = ({ rankData }) => {
    if (!rankData || !rankData.user) return null;
    const { user, rank } = rankData;
    const hasParticipated = (user.problemsSolved || 0) > 0;

    return (
        <div className="mb-8">
            {hasParticipated ? (
                <div className="bg-white dark:dark-glass rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="w-32 h-32 text-gray-900 dark:text-white" />
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-6 relative z-10 w-full">
                        <div className="flex items-center gap-5 flex-shrink-0 w-full sm:w-auto lg:w-full justify-center sm:justify-start lg:justify-center">
                            <div className="relative">
                                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 dark:dark-glass border border-gray-200 dark:border-white/10 shadow-inner group-hover:border-blue-500/50 transition-colors">
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-0.5">Rank</span>
                                    <span className="text-3xl font-black text-gray-900 dark:text-white">#{rank}</span>
                                </div>
                                <div className="absolute -top-2 -right-2 bg-yellow-500 w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    <Crown className="w-3 h-3 text-black fill-current" />
                                </div>
                            </div>
                            <div className="text-center sm:text-left lg:text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Your Stats</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Keep climbing!</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
                            <div className="grid grid-cols-3 gap-2 h-full items-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">{user.problemsSolved || 0}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold text-center">Solved</div>
                                </div>
                                <div className="flex flex-col items-center justify-center border-x border-gray-200 dark:border-white/10 relative">
                                    <div className="text-lg md:text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{user.totalPoints || 0}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold text-center">Points</div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-lg md:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                                        {user.accuracy !== undefined ? user.accuracy : Math.round(user.averageAccuracy || 0)}%
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold text-center">Accuracy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:dark-glass backdrop-blur rounded-3xl p-8 border border-dashed border-gray-200 dark:border-white/20 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700/50 mb-4 text-blue-500 dark:text-blue-400">
                        <Award className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join the Leaderboard</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 text-sm">
                        Solve at least <span className="text-blue-600 dark:text-blue-400 font-bold">one problem</span> to unlock your global rank and compete!
                    </p>
                    <Link to="/problems" className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-900/20 font-bold text-sm">
                        Start Solving Now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TopUserStats;
