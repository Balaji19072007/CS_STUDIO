import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import * as feather from 'feather-icons';
import CourseLearning from './CourseLearning';

const Courses = () => {
    const [activeCourse, setActiveCourse] = useState('c');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef(null);
    const activeTabRef = useRef(null);
    // const navigate = useNavigate();

    const courseList = [
        { id: 'c', name: 'C', icon: '📘' },
        { id: 'java', name: 'Java', icon: '☕' },
        { id: 'python', name: 'Python', icon: '🐍' },
        { id: 'cpp', name: 'C++', icon: '🚀' },
        { id: 'csharp', name: 'C#', icon: '#️⃣' }
        // { id: 'web', name: 'Web Dev', icon: '🌐' },
        // { id: 'app', name: 'App Dev', icon: '📱' },
        // { id: 'aiml', name: 'AI & ML', icon: '🧠' }
    ];

    // Initialize feather icons on mount and when active course changes
    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [activeCourse]);

    // Update sliding indicator position
    useEffect(() => {
        // We use setTimeout to ensure fonts/layout have rendered before calculating widths
        const updateIndicator = () => {
            if (activeTabRef.current && navRef.current) {
                const activeTab = activeTabRef.current;
                setIndicatorStyle({
                    left: activeTab.offsetLeft,
                    width: activeTab.offsetWidth
                });

                // Optional: scroll the active tab into view if it's off-screen on mobile
                activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        };

        const timer = setTimeout(updateIndicator, 50);
        return () => clearTimeout(timer);
    }, [activeCourse]);

    // recalculate on window resize
    useEffect(() => {
        const handleResize = () => {
            if (activeTabRef.current) {
                setIndicatorStyle({
                    left: activeTabRef.current.offsetLeft,
                    width: activeTabRef.current.offsetWidth
                });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeCourseData = courseList.find(c => c.id === activeCourse);

    return (
        <div className="w-full pt-14 lg:pt-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 h-[100dvh] lg:h-[calc(100dvh-4rem)] overflow-hidden flex flex-col">
            {/* Course Navbar (Internal) - Moved to top, added border, smaller height */}
            <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Horizontal scroll container */}
                        <div
                            ref={navRef}
                            className="flex overflow-x-auto hide-scrollbar justify-start xl:justify-center relative"
                        >
                            {courseList.map((course) => {
                                const isActive = activeCourse === course.id;
                                return (
                                    <button
                                        key={course.id}
                                        ref={isActive ? activeTabRef : null}
                                        onClick={() => {
                                            if (activeCourse === course.id && (course.id === 'c' || course.id === 'java')) {
                                                sessionStorage.removeItem('cs_embedded_topic');
                                                sessionStorage.removeItem('cs_embedded_quiz');
                                                window.dispatchEvent(new Event('reset-course-learning'));
                                            } else {
                                                setActiveCourse(course.id);
                                            }
                                        }}
                                        className={`flex items-center whitespace-nowrap px-6 py-4 text-sm md:text-base font-semibold tracking-wide transition-colors duration-300 relative z-10 ${isActive
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/30'
                                            }`}
                                    >
                                        {course.name}
                                    </button>
                                );
                            })}

                            {/* Sliding Indicator Line */}
                            <div
                                className="absolute bottom-0 h-[3px] bg-primary-500 dark:bg-primary-400 transition-all duration-300 ease-out rounded-t-full z-20"
                                style={{
                                    left: `${indicatorStyle.left}px`,
                                    width: `${indicatorStyle.width}px`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Dynamic Content Area */}
            {activeCourse === 'c' || activeCourse === 'java' ? (
                <div className="flex-1 w-full overflow-hidden">
                    <CourseLearning embeddedCourseId={activeCourse === 'c' ? 'c-lang' : 'java-programming'} />
                </div>
            ) : (
                <div className="flex-1 w-full overflow-y-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-5xl mx-auto mt-6 lg:mt-12">
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-12 md:p-20 text-center shadow-xl dark:shadow-2xl transition-all duration-300 relative overflow-hidden">
                            {/* Decorative background glow for dark mode */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl pointer-events-none opacity-0 dark:opacity-20 transition-opacity duration-300">
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-500 rounded-full blur-[100px]"></div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="text-7xl md:text-8xl mb-8 transform hover:scale-110 transition-transform duration-500 drop-shadow-md">
                                    {activeCourseData?.icon}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                                    {activeCourseData?.name} Course
                                </h2>

                                <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-sm tracking-wide mb-8 transition-colors duration-300 border border-primary-200 dark:border-primary-500/20 shadow-sm">
                                    <i data-feather="clock" className="w-4 h-4 mr-2 animate-pulse"></i>
                                    COMING SOON
                                </div>

                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300 max-w-xl mx-auto leading-relaxed">
                                    We are working hard to build the most comprehensive and engaging curriculum for <span className="font-semibold text-gray-900 dark:text-white">{activeCourseData?.name}</span>. Check back soon for updates!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom scrollbar hiding style just for this component */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Courses;
