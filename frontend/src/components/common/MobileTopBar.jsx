import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Award, Bell, Moon, Sun, BarChart2, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useNotifications } from '../../hooks/useNotifications';

const MobileTopBar = () => {
    const { user, logout } = useAuth();
    const { toggleTheme, isDark } = useTheme();
    const { unreadCount } = useNotifications();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#101827]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 h-14 px-4 flex items-center justify-between sm:hidden transition-colors duration-300 transform-gpu shadow-sm dark:shadow-[0_4px_25px_rgba(0,0,0,0.1)]">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        CS
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {/* Notification Icon */}
                    <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#101827]"></span>
                        )}
                    </Link>

                    {/* Profile Icon */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-blue-500 transition-all shadow-sm"
                    >
                        {user?.avatar || user?.photoUrl ? (
                            <img
                                src={user.avatar || user.photoUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                <User className="w-4 h-4" />
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Profile Dropdown Menu */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                    <div className="fixed top-16 right-4 z-50 w-64 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-[#1c273a]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 sm:hidden animate-in fade-in slide-in-from-top-5 duration-200">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTheme();
                                }}
                                className={`p-2 rounded-xl transition-all active:scale-95 ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate uppercase tracking-wide text-sm">
                                    {user?.name || user?.firstName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User'}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to="/my-progress"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <div className={`mb-2 p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-blue-400 group-hover:bg-gray-700' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                                        <BarChart2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-center font-semibold">Progress</span>
                                </Link>
                                <Link
                                    to="/my-courses"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <div className={`mb-2 p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-indigo-400 group-hover:bg-gray-700' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'}`}>
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-center font-semibold">Courses</span>
                                </Link>
                                <Link
                                    to="/problem-stats"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <div className={`mb-2 p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-emerald-400 group-hover:bg-gray-700' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'}`}>
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-center font-semibold">History</span>
                                </Link>
                                <Link
                                    to="/settings"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <div className={`mb-2 p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-purple-400 group-hover:bg-gray-700' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}`}>
                                        <Settings className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-center font-semibold">Settings</span>
                                </Link>
                            </div>
                            
                            <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-2"></div>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MobileTopBar;
