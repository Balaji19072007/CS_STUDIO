// src/components/problems/ProblemCard.jsx
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Code, Check, Edit2 } from 'lucide-react';

const languageDisplayNames = {
    'C': 'C', 'C++': 'C++', 'Java': 'Java', 'Python': 'Python', 'JavaScript': 'JS',
    'C#': 'C#', 'Ruby': 'Ruby', 'Go': 'Go', 'Swift': 'Swift', 'Kotlin': 'Kotlin',
    'Rust': 'Rust', 'PHP': 'PHP'
};

const ProblemCard = ({ problem }) => {
    const { isLoggedIn } = useAuth();
    const problemId = problem.problemId || problem.id;

    // Check status from props (calculated in parent)
    const status = problem.status || 'todo';

    const statusTexts = {
        solved: 'Solved',
        attempted: 'Attempted',
        todo: 'To Do'
    };

    const statusClasses = status === 'solved'
        ? 'text-green-800 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-900/30 dark:border-green-700/50'
        : status === 'attempted'
            ? 'text-yellow-800 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-700/50'
            : 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-700';

    const difficultyKey = problem.difficulty?.toLowerCase() || 'easy';
    const difficultyClasses = difficultyKey === 'easy'
        ? 'text-green-400'
        : difficultyKey === 'medium'
            ? 'text-yellow-400'
            : 'text-red-400';

    const handleSolveClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            // Note: Alerts are generally forbidden in modern UIs; using console log as alternative to prevent crashes
            console.log('Action blocked: User must be signed in to solve problems.');
        }
    };

    return (
        <div
            id={`problem-${problemId}`} // ADDED ID for scrolling
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl p-3 sm:p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 card-hover"
        >
            <div className="flex flex-row justify-between items-center gap-3">

                {/* Left Side: Title & Mobile Status */}
                <div className="flex flex-col sm:flex-row sm:items-center min-w-0 flex-1">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white leading-snug truncate pr-2">
                        <span className="text-primary-600 dark:text-primary-400 mr-2">#{problemId}</span>
                        {problem.title}
                    </h3>

                    <div className="hidden sm:flex flex-wrap items-center gap-2 mt-2 sm:mt-0 sm:ml-4">
                        {/* Language Tag (Desktop) */}
                        <span className="language-tag inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {languageDisplayNames[problem.language] || problem.language}
                        </span>

                        {/* Status Tag (Desktop) */}
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusClasses}`}>
                            {statusTexts[status]}
                        </span>
                    </div>
                </div>

                {/* Right Side: Metadata & Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Mobile Solved Tick */}
                    {status === 'solved' && (
                        <Check className="w-4 h-4 text-green-400 sm:hidden" />
                    )}

                    {/* Difficulty */}
                    <span className={`inline-flex items-center justify-center sm:px-2 sm:py-0.5 rounded-full text-xs font-semibold sm:border sm:border-gray-700 dark-tag-style`}>
                        {/* Desktop Dot */}
                        <span className={`hidden sm:block w-2 h-2 rounded-full mr-1 ${difficultyKey === 'easy' ? 'bg-green-500' : difficultyKey === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>

                        {/* Desktop Text */}
                        <span className={`hidden sm:inline ${difficultyClasses}`}>{problem.difficulty}</span>

                        {/* Mobile Letter (E/M/H) */}
                        <span className={`sm:hidden font-bold ${difficultyKey === 'easy' ? 'text-green-400' : difficultyKey === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                            {problem.difficulty ? problem.difficulty.charAt(0).toUpperCase() : 'E'}
                        </span>
                    </span>

                    {/* Action Button */}
                    <Link
                        to={isLoggedIn ? `/solve?problemId=${problemId}` : '/signin'}
                        onClick={handleSolveClick}
                        className={`inline-flex items-center justify-center rounded-lg flex-shrink-0 transition-colors ${isLoggedIn ? 'bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary-600 dark:hover:text-white sm:!bg-green-600 sm:!text-white sm:hover:!bg-green-700 sm:dark:!bg-green-600 sm:dark:!text-white sm:dark:hover:!bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'}`}
                    >
                        {/* Desktop: Solve Button */}
                        <span className="hidden sm:flex items-center px-3 py-1.5 text-sm font-medium">
                            {status === 'solved' ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Solved
                                </>
                            ) : (
                                <>
                                    <Code className="w-4 h-4 mr-2" />
                                    Solve
                                </>
                            )}
                        </span>

                        {/* Mobile: Pen Icon */}
                        <span className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                            {status === 'solved' ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default memo(ProblemCard);