// frontend/src/pages/Problems.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as feather from 'feather-icons';
import { fetchAllProblems } from '../api/problemApi.js';
import { ProblemManager } from '../utils/problemManager.js';
import ProblemCard from '../components/problems/ProblemCard.jsx';
import { ProblemsSkeleton } from '../components/common/SkeletonLoader';
import { useAuth } from '../hooks/useAuth.jsx';



// ---------- Constants ----------
const FILTER_OPTIONS = {
    difficulty: ['All', 'Easy', 'Medium', 'Hard'],
    language: ['All', 'C', 'C++', 'Java', 'Python', 'JavaScript'],
};

// ---------- Component ----------
const Problems = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    const [allProblems, setAllProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [, setProgress] = useState(ProblemManager.getGlobalProgress());

    const [filters, setFilters] = useState({
        difficulty: 'All',
        language: 'All',
        search: ''
    });

    // --- Data Fetching ---
    useEffect(() => {
        let isMounted = true;

        const getStatus = (p) => {
            const prog = ProblemManager.getProblemProgress(p.problemId || p.id);
            if (prog.solved) return 'solved';
            // Mark as attempted if there are submissions OR if user has spent time on it
            if (prog.submissions.length > 0 || prog.timeElapsed > 0 || prog.startTime > 0) return 'attempted';
            return 'todo';
        };

        const loadProblems = async () => {
            try {
                const data = await fetchAllProblems();
                if (isMounted) {
                    // Backend now provides 'status' based on user progress. 
                    // We trust backend for status to ensure multi-user isolation.
                    // ProblemManager (local storage) is secondary/cache but can be stale or wrong across users.

                    const problemsWithStatus = data.map(p => ({
                        ...p,
                        // Use backend status if available and not 'todo' (or always if we trust it completely)
                        // If backend says 'todo' but local says 'solved', we have a conflict.
                        // Given the requirement, BACKEND IS TRUTH.
                        status: p.status || 'todo'
                    }));

                    // Deduplicate problems just in case backend or strict mode causes issues
                    const uniqueProblems = problemsWithStatus.filter((prob, index, self) =>
                        index === self.findIndex((p) => p.problemId === prob.problemId)
                    );

                    setAllProblems(uniqueProblems);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error fetching problems:', err);
                if (isMounted) {
                    setError('Failed to load coding problems.');
                    setIsLoading(false);
                }
            }
        };

        const updateProgress = () => {
            if (isMounted) {
                setProgress(ProblemManager.getGlobalProgress());
                setAllProblems(prev => prev.map(p => {
                    const localStatus = getStatus(p);
                    // Merge backend status (p.status) effectively with local status
                    // If either says solved, it's solved.
                    const isSolved = p.status === 'solved' || localStatus === 'solved';
                    const isAttempted = p.status === 'attempted' || localStatus === 'attempted';

                    return {
                        ...p,
                        status: isSolved ? 'solved' : (isAttempted ? 'attempted' : 'todo')
                    };
                }));
            }
        };

        loadProblems();

        // Listener for local storage changes
        window.addEventListener('storage', updateProgress);
        // Custom event listener for internal updates
        window.addEventListener('problem_progress_updated', updateProgress);

        return () => {
            isMounted = false;
            window.removeEventListener('storage', updateProgress);
            window.removeEventListener('problem_progress_updated', updateProgress);
        };
    }, []);

    // --- Filtering Logic ---
    const applyFilters = useCallback((problems, currentFilters) => {
        return problems.filter(problem => {
            const matchesDifficulty = currentFilters.difficulty === 'All' || problem.difficulty === currentFilters.difficulty;
            const matchesLanguage = currentFilters.language === 'All' || problem.language === currentFilters.language;

            const searchLower = currentFilters.search.toLowerCase();
            const matchesSearch = !searchLower ||
                problem.title.toLowerCase().includes(searchLower) ||
                (problem.tags && problem.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
                (problem.difficulty && problem.difficulty.toLowerCase().includes(searchLower));

            return matchesDifficulty && matchesLanguage && matchesSearch;
        });
    }, []);

    useEffect(() => {
        setFilteredProblems(applyFilters(allProblems, filters));
    }, [allProblems, filters, applyFilters]);

    // --- Scrolling to Solved Problem ---
    useEffect(() => {
        if (location.state?.scrollToId && filteredProblems.length > 0 && !isLoading) {
            const targetId = location.state.scrollToId;
            // Short delay to ensure DOM is ready
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Optional: Highlight the card briefly
                    element.classList.add('ring-2', 'ring-green-500');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-green-500'), 2000);
                }
            }, 500);

            // Clear state to prevent re-scroll on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state, filteredProblems, isLoading]);


    // --- Handlers ---
    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value,
            // When filtering by a specific type, usually reset search unless explicitly searching
            search: type === 'search' ? value : prev.search,
        }));
    };

    const handleSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handleSolveClick = (problemId, e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            // In a real app, this would trigger a modal or redirection to sign-in
            console.log('Redirecting to sign-in...');
        }
    };

    // --- Progress Display Calculation (Keep logic for filtering/sorting if needed later) ---
    // Final feather-icons rendering
    useEffect(() => {
        feather.replace();
    }, [filters]); // Re-run when filters change to ensure icons load if DOM updates

    if (isLoading) return <ProblemsSkeleton />;

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Hero Section - Minimal */}
            <div className="pt-24 pb-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
                        Sharpen Your <span className="text-primary-500">Coding Skills</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
                        Tackle our collection of {allProblems.length} language-agnostic coding challenges.
                    </p>

                    <Link
                        to="/solve?problemId=1"
                        onClick={(e) => handleSolveClick(1, e)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                        <i data-feather="terminal" className="w-4 h-4 text-gray-900"></i>
                        Try First Problem
                    </Link>
                </div>
            </div>

            {/* Main Content & Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">

                {/* Filters and Search - Minimal */}
                <div className="mb-10 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pb-6 border-b border-gray-800">

                    {/* Search Box - Minimal Underline */}
                    <div className="relative w-full md:w-96 order-2 md:order-1">
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="w-full bg-transparent border-b border-gray-700 px-0 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            value={filters.search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <i data-feather="search" className="absolute right-0 top-2.5 w-4 h-4 text-gray-500"></i>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-4 w-full md:w-auto order-1 md:order-2 overflow-x-auto pb-2 md:pb-0">
                        {/* Difficulty Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-transparent text-gray-300 py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none hover:text-white transition-colors text-sm font-medium"
                                value={filters.difficulty}
                                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                            >
                                {FILTER_OPTIONS.difficulty.map(option => (
                                    <option key={option} value={option} className="bg-gray-800 text-white">{option === 'All' ? 'All Difficulties' : option}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                                <i data-feather="chevron-down" className="w-4 h-4"></i>
                            </div>
                        </div>

                        {/* Language Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-transparent text-gray-300 py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none hover:text-white transition-colors text-sm font-medium"
                                value={filters.language}
                                onChange={(e) => handleFilterChange('language', e.target.value)}
                            >
                                {FILTER_OPTIONS.language.map(option => (
                                    <option key={option} value={option} className="bg-gray-800 text-white">{option === 'All' ? 'All Languages' : option}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                                <i data-feather="chevron-down" className="w-4 h-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problem List */}
                {error ? (
                    <div className="text-center text-red-400 mt-10 p-8 bg-gray-800 rounded-xl border border-red-900/50">{error}</div>
                ) : filteredProblems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                            <i data-feather="search" className="w-8 h-8 text-gray-500"></i>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No problems found</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                            We couldn't find any problems matches "{filters.search}". Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => setFilters({ difficulty: 'All', language: 'All', search: '' })}
                            className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-white transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProblems.map(problem => (
                            <ProblemCard
                                key={problem.problemId || problem.id} // FIX: Ensures unique key using problemId or fallback id
                                problem={problem}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Final feather-icons rendering */}
        </div>
    );
};

export default Problems;
