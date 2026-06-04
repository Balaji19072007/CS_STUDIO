import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Award, Bell, Moon, Sun } from 'lucide-react';
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
            <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#101827]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-14 px-4 flex items-center justify-between sm:hidden transition-all duration-300">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        CS
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {/* Notification Icon */}
                    <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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

            {/* Height spacer */}
            <div className="h-14 sm:hidden"></div>

            {/* Profile Dropdown Menu */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                    <div className="fixed top-16 right-4 z-50 w-64 bg-white dark:bg-[#1c273a] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 sm:hidden animate-in fade-in slide-in-from-top-5 duration-200">
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
                        <div className="p-2 space-y-1">
                            <Link
                                to="/settings"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            >
                                <User className="w-4 h-4" />
                                Profile Settings
                            </Link>
                            <Link
                                to="/settings"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </Link>
                            <Link
                                to="/leaderboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            >
                                <Award className="w-4 h-4" />
                                Leaderboard
                            </Link>


                            <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1"></div>
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
