// frontend/src/components/common/CodeEditorFloatingIcon.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as feather from 'feather-icons';

const CodeEditorFloatingIcon = () => {
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        feather.replace();
    }, [isMobile]); // Re-run feather when visibility changes

    // Hide on quiz and courses pages
    if (location.pathname.includes('/courses') || location.pathname.includes('/quiz')) {
        return null;
    }

    // Mobile background should be transparent as per user request
    const mobileClasses = isMobile ? 'bg-transparent shadow-none' : 'dark-gradient-accent shadow-lg';

    return (
        <Link
            to="/code"
            className={`fixed bottom-24 right-6 h-10 w-10 md:h-14 md:w-14 rounded-full text-white flex items-center justify-center transition-all duration-300 z-50 hover:shadow-xl ${mobileClasses}`}
            title="Code Editor - Freeform Playground"
        >
            <i data-feather="edit-3" className="h-5 w-5 md:h-6 md:w-6"></i>
        </Link>
    );
};

export default CodeEditorFloatingIcon;
