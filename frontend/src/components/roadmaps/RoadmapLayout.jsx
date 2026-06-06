import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useTheme } from '../../contexts/ThemeContext';

// --- Styles for the Roadmap Timeline ---

const TimelineNode = ({ number, status }) => {
    // Status: 'completed' | 'active' | 'locked'

    const styles = {
        completed: {
            bg: 'bg-emerald-500',
            text: 'text-white',
            border: 'border-emerald-500',
            shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]'
        },
        active: {
            bg: 'bg-blue-500',
            text: 'text-white',
            border: 'border-blue-500',
            shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]'
        },
        locked: {
            bg: 'bg-gray-800',
            text: 'text-gray-400',
            border: 'border-gray-700',
            shadow: ''
        }
    };

    const currentStyle = styles[status];

    return (
        <div className="flex flex-col items-center mr-6 md:mr-10 relative z-10">
            {/* Circle Node */}
            <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-2xl font-bold border-4 transition-all duration-500 ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} ${currentStyle.shadow}`}
            >
                {status === 'completed' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    number
                )}
            </div>
        </div>
    );
};

// Main Roadmap Item Component
const RoadmapItem = ({ phase, index, status, isExpanded, onToggle, onMarkComplete, isLast }) => {
    // status: 'completed' | 'active' | 'locked'

    const cardStyles = {
        completed: 'border-emerald-500/50 bg-emerald-900/10 hover:border-emerald-500',
        active: 'border-blue-500/50 bg-blue-900/10 hover:border-blue-500',
        locked: 'border-gray-700 bg-gray-800/30 opacity-75'
    };

    const badgeStyles = {
        completed: 'bg-emerald-500/20 text-emerald-400',
        active: 'bg-blue-500/20 text-blue-400',
        locked: 'bg-gray-700 text-gray-400'
    };

    return (
        <div className="relative flex group">
            {/* Vertical Connecting Line */}
            {!isLast && (
                <div className="absolute left-6 md:left-8 top-16 bottom-[-3rem] w-1 bg-gray-700 -z-0">
                    {/* Colored overlay for completed sections */}
                    {(status === 'completed') && (
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-emerald-500"></div>
                    )}
                </div>
            )}

            {/* Node (Circle) */}
            <TimelineNode number={phase.phase} status={status} isLast={isLast} />

            {/* Content Card */}
            <div className="flex-1 pb-12">
                <div
                    onClick={() => onToggle(index)}
                    className={`rounded-xl border-2 p-5 md:p-6 transition-all duration-300 cursor-pointer ${cardStyles[status]} ${isExpanded ? 'ring-2 ring-primary-500/20' : ''}`}
                >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className={`text-xl font-bold ${status === 'locked' ? 'text-gray-400' : 'text-white'}`}>
                                {phase.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[status]}`}>
                                {phase.weeks}
                            </span>
                        </div>

                        {/* Chevron */}
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${status === 'locked' ? 'text-gray-600' : 'text-gray-400'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {/* Goal Description Row */}
                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <span className="text-lg">🎯</span>
                        <span className={`${status === 'locked' ? 'text-gray-500' : 'text-gray-300'}`}>
                            {phase.goal}
                        </span>
                    </div>

                    {/* EXPANDED CONTENT */}
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isExpanded ? 'grid-rows-[1fr] mt-6 pt-6 border-t border-gray-700' : 'grid-rows-[0fr]'
                        }`}>
                        <div className="overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Topics */}
                                <div>
                                    <h4 className="font-semibold text-white mb-4 flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'active' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                                        Key Topics
                                    </h4>
                                    <ul className="space-y-3">
                                        {phase.topics.map((topic, i) => (
                                            <li key={i} className="flex items-start text-gray-400 text-sm">
                                                <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Practice */}
                                <div>
                                    <h4 className="font-semibold text-white mb-4 flex items-center">
                                        <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                                        Hands-on Practice
                                    </h4>
                                    <ul className="space-y-3">
                                        {phase.practice.map((item, i) => (
                                            <li key={i} className="flex items-start text-gray-400 text-sm">
                                                <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Mark Complete Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkComplete(index);
                                    }}
                                    disabled={status === 'locked' || status === 'completed'}
                                    className={`px-6 py-2 rounded-lg font-bold transition-all ${status === 'completed'
                                        ? 'bg-emerald-500/20 text-emerald-500 cursor-default'
                                        : status === 'active'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {status === 'completed' ? 'Phase Completed' : 'Mark Phase as Complete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Outcome Section Component
const OutcomeSection = ({ data }) => {
    return (
        <div className="mt-8 p-6 rounded-2xl bg-[#111827] border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Learning Outcome</h2>
            <p className="text-gray-400 mb-8">{data.outcome}</p>

            <h3 className="text-lg font-semibold text-white mb-4">Career Paths</h3>
            <div className="flex flex-wrap gap-3">
                {data.career_paths.map((path, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm border border-gray-700">
                        {path}
                    </span>
                ))}
            </div>
        </div>
    );
};

const RoadmapLayout = ({ data, roadmapId }) => {
    // const { isLoggedIn } = useAuth();
    // We assume dark mode is default/preferred for this view, but could use theme hook if needed
    const [completedPhases, setCompletedPhases] = useState([]);
    const [expandedPhases, setExpandedPhases] = useState([0]);
    const [isLoading, setIsLoading] = useState(true);

    // Use roadmapId to generate unique localStorage key
    const storageKey = `${roadmapId}-progress`;

    useEffect(() => {
        // Load progress from localStorage
        const loadProgress = () => {
            try {
                const savedProgress = localStorage.getItem(storageKey);
                if (savedProgress) {
                    setCompletedPhases(JSON.parse(savedProgress));
                } else {
                    setCompletedPhases([]);
                }
            } catch {
                setCompletedPhases([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadProgress();
    }, [storageKey]);

    const handleMarkComplete = (phaseIndex) => {
        const canMarkComplete = phaseIndex === 0 || completedPhases.includes(phaseIndex - 1);

        if (!canMarkComplete) return;

        const newCompletedPhases = [...completedPhases];
        if (!newCompletedPhases.includes(phaseIndex)) {
            newCompletedPhases.push(phaseIndex);
            setCompletedPhases(newCompletedPhases);
            localStorage.setItem(storageKey, JSON.stringify(newCompletedPhases));
        }
    };

    const handleExpandToggle = (phaseIndex) => {
        // If closing
        if (expandedPhases.includes(phaseIndex)) {
            setExpandedPhases(prev => prev.filter(p => p !== phaseIndex));
        } else {
            // If opening, close others for focus (optional, but cleaner)
            setExpandedPhases(prev => [...prev, phaseIndex]);
        }
    };

    const getPhaseStatus = (index) => {
        if (completedPhases.includes(index)) return 'completed';
        if (index === 0 || completedPhases.includes(index - 1)) return 'active';
        return 'locked';
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-100 font-sans pb-20">

            {/* Header Section */}
            <div className="bg-[#111827] border-b border-gray-800 pt-24 pb-12 mb-12 relative">
                {/* Back Button */}
                <div className="absolute top-24 left-4 lg:left-8">
                    <Link to="/roadmaps" className="inline-flex items-center text-gray-400 hover:text-white transition-colors bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        {data.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        {data.description}
                    </p>

                    <div className="flex flex-wrap gap-6 mt-8">
                        <div className="flex items-center text-gray-300 bg-gray-800 px-4 py-2 rounded-lg">
                            <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {data.estimated_hours} Hours
                        </div>
                        <div className="flex items-center text-gray-300 bg-gray-800 px-4 py-2 rounded-lg">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            {data.difficulty}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 bg-gray-800 rounded-full h-2 w-full max-w-md overflow-hidden">
                        <div
                            className="bg-emerald-500 h-full transition-all duration-700"
                            style={{ width: `${(completedPhases.length / data.phases.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                        {completedPhases.length} of {data.phases.length} phases completed
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="relative">
                    {data.phases.map((phase, index) => (
                        <RoadmapItem
                            key={index}
                            phase={phase}
                            index={index}
                            status={getPhaseStatus(index)}
                            isExpanded={expandedPhases.includes(index)}
                            onToggle={handleExpandToggle}
                            onMarkComplete={handleMarkComplete}
                            isLast={index === data.phases.length - 1}
                        />
                    ))}
                </div>

                <OutcomeSection data={data} />
            </div>

        </div>
    );
};

export default RoadmapLayout;
