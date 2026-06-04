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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#101827]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe sm:hidden">
            <div className="flex justify-around items-center h-16 px-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200
                            ${isActive
                                ? 'text-blue-600 dark:text-blue-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }
                        `}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileBottomNav;
