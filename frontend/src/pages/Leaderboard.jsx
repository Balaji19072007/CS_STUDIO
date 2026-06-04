// frontend/src/pages/Leaderboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';
import { fetchLeaderboard, fetchUserRank, fetchTotalUsers } from '../api/leaderboardApi.js';
import TopUserStats from '../components/TopUserStats.jsx';

// --- HELPER FUNCTIONS ---
const generateInitials = (name) => {
    if (typeof name !== 'string' || !name) {
        return 'U';
    }

    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
        return parts.map(n => n[0]).join('').toUpperCase().substring(0, 2);
    } else if (parts.length === 1 && parts[0].length > 0) {
        return parts[0].charAt(0).toUpperCase();
    }
    return 'U';
};

// --- COMPONENTS ---

// Redesigned Podium Card for Top 3
const PodiumCard = ({ user, rank }) => {
    const initials = generateInitials(user.name || user.username);

    // Standard Podium Order: 2 (Left), 1 (Center), 3 (Right)
    const getRankOrder = (rank) => {
        switch (rank) {
            case 1: return 'order-2'; // Center
            case 2: return 'order-1'; // Left
            case 3: return 'order-3'; // Right
            default: return '';
        }
    };

    const getRankClass = (rank) => {
        switch (rank) {
            case 1: return 'rank-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-yellow-500/50 border-4 border-yellow-400';
            case 2: return 'rank-2 bg-gradient-to-r from-gray-300 to-gray-400 text-black shadow-gray-400/50 border-4 border-gray-300';
            case 3: return 'rank-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-amber-700/50 border-4 border-amber-600';
            default: return 'bg-gray-200';
        }
    };

    // Responsive Size Classes: Smaller on mobile, Larger on desktop
    const getSizeClass = (rank) => {
        return rank === 1
            ? 'h-16 w-16 text-xl md:h-24 md:w-24 md:text-3xl'
            : 'h-12 w-12 text-lg md:h-20 md:w-20 md:text-2xl';
    };

    const getNameSizeClass = (rank) => {
        return rank === 1
            ? 'text-xs sm:text-lg md:text-xl'
            : 'text-[10px] sm:text-base md:text-lg';
    };

    const getHeightClass = (rank) => {
        switch (rank) {
            case 1: return 'h-40 md:h-60'; // Mobile height vs Desktop
            case 2: return 'h-32 md:h-52';
            case 3: return 'h-28 md:h-48';
            default: return 'h-24';
        }
    };

    return (
        <div className={`podium flex flex-col items-center p-1 md:p-4 w-1/3 md:w-auto ${getRankOrder(rank)}`}>
            {/* Rank Badge */}
            <div className={`mb-1 md:mb-2 px-2 md:px-4 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm font-bold ${rank === 1 ? 'bg-yellow-100 text-yellow-800' : rank === 2 ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'}`}>
                #{rank}
            </div>

            {/* User Card */}
            <div
                className={`bg-gray-900 rounded-xl shadow-lg p-2 md:p-4 w-full text-center transition-all duration-300 border border-gray-700/50 ${getHeightClass(rank)} flex flex-col justify-between`}
                style={{ transform: rank === 1 ? 'translateY(-10px)' : 'translateY(0)' }}
            >
                {/* Avatar Section */}
                <div className="flex justify-center mb-1 md:mb-2">
                    {user.photoUrl ? (
                        <div className={`${getSizeClass(rank)} rounded-full overflow-hidden border-2 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : 'border-amber-500'} shadow-lg relative`}>
                            <img
                                src={user.photoUrl}
                                alt={user.name || user.username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                            <div className={`${getSizeClass(rank)} rounded-full ${getRankClass(rank)} items-center justify-center font-bold shadow-lg avatar-fallback hidden`}>
                                {initials}
                            </div>
                        </div>
                    ) : (
                        <div className={`${getSizeClass(rank)} rounded-full ${getRankClass(rank)} flex items-center justify-center font-bold shadow-lg`}>
                            {initials}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className={`font-bold text-white ${getNameSizeClass(rank)} mb-0.5 truncate px-1`}>
                        {user.name || user.username}
                    </h3>

                    <div className="hidden md:block">
                        {user.username && (
                            <p className="text-gray-400 text-xs mb-2">@{user.username}</p>
                        )}
                    </div>

                    {/* Stats Removed as per request (showing only Name & Avatar) */}
                    {/* <div className="space-y-1 mt-auto w-full px-2 hidden md:block">...</div> */}
                </div>
            </div>

            {/* Award Icon for 1st Place - Shown on desktop, smaller or hidden on mobile if cluttered */}
            {rank === 1 && (
                <div className="mt-2 text-yellow-500 hidden md:block">
                    <i data-feather="award" className="w-8 h-8 md:w-10 md:h-10"></i>
                </div>
            )}
        </div>
    );
};

// Leaderboard Table Row for remaining users
const LeaderboardTableRow = ({ user, index }) => {
    const { user: currentUser } = useAuth();
    const initials = generateInitials(user.name || user.username);
    const isCurrentUser = currentUser && user._id === currentUser.id;

    const rowClass = isCurrentUser
        ? 'bg-primary-50 border-l-4 border-primary-500 dark:bg-primary-900/20 dark:border-primary-400'
        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50';

    const rank = user.rank || index + 1; // Correct rank passed from parent

    return (
        <tr className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/50 transition-colors duration-200 ${rowClass}`}>
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                <div className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full ${rank <= 3 ? 'bg-yellow-500 text-black font-bold' :
                    'bg-gray-700 text-gray-300'
                    }`}>
                    {rank}
                </div>
            </td>
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">
                <div className="flex items-center">
                    {user.photoUrl ? (
                        <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden flex items-center justify-center mr-2 md:mr-3 border ${isCurrentUser ? 'border-primary-500' : 'border-gray-600'
                            } relative`}>
                            <img
                                src={user.photoUrl}
                                alt={user.name || user.username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                            <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${isCurrentUser ? 'bg-primary-500/20' : 'bg-gray-700'
                                } items-center justify-center text-xs md:text-sm font-bold avatar-fallback hidden`}>
                                <span className={isCurrentUser ? 'text-primary-400' : 'text-gray-300'}>{initials}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${isCurrentUser ? 'bg-primary-500/20' : 'bg-gray-700'
                            } flex items-center justify-center text-xs md:text-sm font-bold mr-2 md:mr-3`}>
                            <span className={isCurrentUser ? 'text-primary-400' : 'text-gray-300'}>{initials}</span>
                        </div>
                    )}
                    <div>
                        <div className={`font-medium ${isCurrentUser ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                            {user.name || user.username}
                        </div>
                        {user.username && (
                            <div className="text-gray-400 text-[10px] md:text-xs">@{user.username}</div>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-center">
                <span className="font-semibold text-white">{user.problemsSolved || user.solved || 0}</span>
            </td>
            {/* Hide less important columns on mobile */}
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-center text-gray-300 hidden sm:table-cell">
                {(user.accuracy !== undefined || user.averageAccuracy !== undefined) ? `${user.accuracy || Math.round(user.averageAccuracy)}%` : 'N/A'}
            </td>
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-center text-gray-300 hidden sm:table-cell">
                {user.currentStreak || user.streak || 0} days
            </td>
            <td className="px-2 md:px-4 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-center font-semibold text-primary-400">
                {user.totalPoints || user.points || 0}
            </td>
        </tr>
    );
};


// Mobile Card Component
const LeaderboardMobileCard = ({ user, rank }) => {
    const { user: currentUser } = useAuth();
    const isCurrentUser = currentUser && user._id === currentUser.id;
    const initials = generateInitials(user.name || user.username);

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border mb-2 transition-all ${isCurrentUser
            ? 'bg-primary-900/10 border-primary-500/30'
            : 'bg-gray-800/40 border-gray-700/30'
            }`}>

            <div className="flex items-center gap-3 overflow-hidden">
                {/* Rank */}
                <span className={`flex-shrink-0 w-6 text-center font-bold text-sm ${rank <= 3 ? 'text-yellow-500' : 'text-gray-500'}`}>
                    #{rank}
                </span>

                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                    {user.photoUrl ? (
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            className={`w-9 h-9 rounded-full object-cover border ${isCurrentUser ? 'border-primary-500' : 'border-gray-600'}`}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                if (fallback) fallback.classList.remove('hidden');
                            }}
                        />
                    ) : null}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs avatar-fallback ${user.photoUrl ? 'hidden' : ''
                        } ${isCurrentUser ? 'bg-primary-900/50 text-primary-200' : 'bg-gray-700 text-gray-300'}`}>
                        {initials}
                    </div>
                </div>

                {/* Name */}
                <div className="min-w-0 pr-2">
                    <h3 className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-primary-400' : 'text-white'}`}>
                        {user.name || user.username}
                    </h3>
                </div>
            </div>

            {/* Stats - Right Aligned */}
            <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-sm font-bold text-yellow-500">
                    {user.totalPoints || user.points || 0}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    {user.problemsSolved || user.solved || 0} Solved
                </span>
            </div>
        </div>
    );
};



// --- MAIN COMPONENT ---
const Leaderboard = () => {
    const { isLoggedIn } = useAuth();

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [timeframe, setTimeframe] = useState('all-time');
    const [category, setCategory] = useState('all');
    // const [isVisible, setIsVisible] = useState(false); // Removed unused visibility logic
    const [isLoading, setIsLoading] = useState(true);
    const [, setTotalUsers] = useState(0);
    const [userRank, setUserRank] = useState(null);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const fetchLeaderboardData = useCallback(async (tf, cat) => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch leaderboard data
            const data = await fetchLeaderboard(tf, cat);
            setLeaderboardData(data);

            // Fetch total users count
            try {
                const totalData = await fetchTotalUsers();
                setTotalUsers(totalData.totalUsers || data.length);
            } catch (error) {
                console.warn('Could not fetch total users, using fallback:', error);
                setTotalUsers(data.length);
            }

            // Fetch current user's rank if logged in
            if (isLoggedIn) {
                try {
                    const rankData = await fetchUserRank();
                    setUserRank(rankData);
                } catch (error) {
                    console.warn('Could not fetch user rank:', error);
                }
            }
        } catch (error) {
            console.error('API Error:', error);
            setError('Failed to load leaderboard data. Please try again later.');
            setLeaderboardData([]);
            setTotalUsers(0);
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    // Helper function to integrate current user and ensure proper ranking
    const compileLeaderboard = useCallback((apiData) => {
        if (!apiData || apiData.length === 0) return [];

        // Sort by problems solved (descending) and then by points (descending)
        const sortedData = [...apiData].sort((a, b) => {
            const aSolved = a.problemsSolved || a.solved || 0;
            const bSolved = b.problemsSolved || b.solved || 0;
            const aPoints = a.totalPoints || a.points || 0;
            const bPoints = b.totalPoints || b.points || 0;

            if (bSolved !== aSolved) return bSolved - aSolved;
            return bPoints - aPoints;
        });

        // Add rank to each user
        return sortedData.map((user, index) => ({
            ...user,
            rank: index + 1,
            name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
        }));
    }, []);

    // --- EFFECTS ---

    // Effect to fetch leaderboard data when filters change
    useEffect(() => {
        const loadData = async () => {
            await fetchLeaderboardData(timeframe, category);
        };

        loadData();

        if (typeof feather !== 'undefined' && feather.replace) {
            setTimeout(() => feather.replace(), 100);
        }
    }, [timeframe, category, fetchLeaderboardData]);

    // Removed scroll listener logic as sticky footer is gone

    // --- RENDER DATA ---
    const allUsers = compileLeaderboard(leaderboardData);
    const topThree = allUsers.slice(0, 3);

    // User requested list to "start from top players from 1" below the podium
    // So we pass 'allUsers' to the map, not 'remainingUsers'
    const usersToList = allUsers;

    // Pagination Logic
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = usersToList.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(usersToList.length / itemsPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Hero Section */}
            <div className="gradient-bg text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating opacity-20 lg:block hidden">
                    <i data-feather="award" className="w-40 h-40 text-primary-500"></i>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 relative z-10">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight sm:text-6xl">
                            <span className="block">Global</span>
                            <span className="block text-primary-400">Leaderboard</span>
                        </h1>
                        <p className="mt-2 md:mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
                            Compete with developers worldwide!
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12 pb-24 md:pb-12">
                {/* Controls and Stats */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-200 dark:border-gray-700/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="mb-2 md:mb-0">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Global Rankings</h2>
                        </div>
                        <div className="flex flex-row gap-2 md:gap-4 w-full md:w-auto">
                            <div className="relative flex-1 group">
                                <select
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(e.target.value)}
                                    className="filter-dropdown"
                                >
                                    <option value="all-time">All Time</option>
                                    <option value="monthly">This Month</option>
                                    <option value="weekly">This Week</option>
                                    <option value="daily">Today</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-hover:text-primary-400 transition-colors">
                                    <i data-feather="chevron-down" className="w-5 h-5"></i>
                                </div>
                            </div>
                            <div className="relative flex-1 group">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="filter-dropdown"
                                >
                                    <option value="all">All</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-hover:text-primary-400 transition-colors">
                                    <i data-feather="chevron-down" className="w-5 h-5"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- NEW: Current User Stats OR "Join Leaderboard" Message --- */}
                {isLoggedIn && userRank && !isLoading && (
                    <TopUserStats rankData={userRank} />
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
                        <p className="text-gray-400 mt-4 text-lg">Loading leaderboard...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="text-center py-16">
                        <i data-feather="alert-triangle" className="w-16 h-16 text-red-400 mx-auto mb-4"></i>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to Load Leaderboard</h3>
                        <p className="text-gray-400">{error}</p>
                        <button
                            onClick={() => fetchLeaderboardData(timeframe, category)}
                            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Podium Section - Top 3 */}
                {!isLoading && !error && topThree.length > 0 && (
                    <div className="mb-8 md:mb-12">
                        <div className="flex flex-row items-end justify-center gap-1 md:gap-8 max-w-4xl mx-auto">
                            {topThree.map((user) => (
                                <PodiumCard key={user._id || user.username} user={user} rank={user.rank} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!isLoading && !error && allUsers.length === 0 && (
                    <div className="text-center py-16">
                        <i data-feather="users" className="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Leaderboard Data Yet</h3>
                    </div>
                )}

                {/* Leaderboard Table for ALL users (Starts from 1) */}
                {!isLoading && !error && usersToList.length > 0 && (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700/50">
                            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700/50">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Full Rankings</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/50">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Rank
                                            </th>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Solved
                                            </th>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                                                Accuracy
                                            </th>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                                                Streak
                                            </th>
                                            <th scope="col" className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Points
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/50">
                                        {currentUsers.map((user, index) => (
                                            <LeaderboardTableRow
                                                key={user._id || user.username}
                                                user={user}
                                                index={indexOfFirstUser + index}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-2">
                            {currentUsers.map((user) => (
                                <LeaderboardMobileCard
                                    key={user._id || user.username}
                                    user={user}
                                    rank={user.rank}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="text-gray-400 text-sm">
                                Page {currentPage} of {Math.ceil(usersToList.length / itemsPerPage)}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === Math.ceil(usersToList.length / itemsPerPage)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === Math.ceil(usersToList.length / itemsPerPage)
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                    : 'bg-primary-600 text-white hover:bg-primary-700 border border-primary-500'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}

        </div>
    );
};

export default Leaderboard;
