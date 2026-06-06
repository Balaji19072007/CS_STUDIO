import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, BookOpen, Users, Trophy } from 'lucide-react';

const MobileBottomNav = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/problems', icon: List, label: 'Problems' },
        { path: '/courses', icon: BookOpen, label: 'Courses' },
        { path: '/community', icon: Users, label: 'Community' },
        { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
        // Profile is in top bar as per request
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#101827]/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 pb-[env(safe-area-inset-bottom)] sm:hidden transform-gpu shadow-[0_-4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.2)]">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300
                            ${isActive
                                ? 'text-blue-600 dark:text-blue-500 scale-105'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:scale-105'
                            }
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-blue-50 dark:bg-blue-500/10 p-2.5 rounded-2xl' : 'p-2'}`}>
                                    <item.icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110 text-blue-600 dark:text-blue-500' : ''}`} />
                                </div>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileBottomNav;
