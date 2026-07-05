import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProblemById } from '../api/problemApi';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ChallengeSkeleton } from '../components/common/SkeletonLoader';
import { Code, ExternalLink, Hash, CheckCircle, BarChart, Clock, Database } from 'lucide-react';
import { NotFoundPage } from '../components/common/ErrorPages';

const ProblemDetail = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProblem = async () => {
            try {
                const data = await fetchProblemById(problemId);
                if (data && data.problem) {
                    setProblem(data.problem);
                } else if (data && data.title) {
                    setProblem(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to load problem:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadProblem();
    }, [problemId]);

    if (loading) return <ChallengeSkeleton />;
    if (error || !problem) return <NotFoundPage />;

    const difficultyKey = problem.difficulty?.toLowerCase() || 'easy';
    const difficultyColor = difficultyKey === 'easy' ? 'text-green-500 bg-green-500/10 border-green-500/20' 
        : difficultyKey === 'medium' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' 
        : 'text-red-500 bg-red-500/10 border-red-500/20';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <SEO 
                title={`${problem.title} - Coding Problem`}
                description={problem.description?.substring(0, 160) || `Solve the ${problem.title} coding problem on CS Studio.`}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": problem.title,
                    "description": problem.description,
                    "articleSection": "Coding Practice"
                }}
            />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={[
                    { label: 'Problems', path: '/problems' },
                    { label: problem.title, path: `/problems/${problemId}` }
                ]} />

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                    <div className="p-8 md:p-10 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${difficultyColor}`}>
                                {problem.difficulty || 'Easy'}
                            </span>
                            {problem.tags && problem.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full">
                                    <Hash className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {problem.problemId || problemId}. {problem.title}
                        </h1>

                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => navigate(`/solve?problemId=${problem.problemId || problemId}`)}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 hover:scale-105"
                            >
                                <Code className="w-5 h-5" />
                                Solve Challenge
                            </button>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 prose prose-gray dark:prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-primary-500" />
                            Problem Statement
                        </h3>
                        <div 
                            className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 mb-10"
                            dangerouslySetInnerHTML={{ __html: problem.description }}
                        />

                        {problem.examples && problem.examples.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    Examples
                                </h3>
                                <div className="space-y-6">
                                    {problem.examples.map((ex, idx) => (
                                        <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                                            <div className="mb-2">
                                                <span className="font-semibold text-gray-900 dark:text-gray-200">Input: </span>
                                                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm text-pink-500 dark:text-pink-400">{ex.input}</code>
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold text-gray-900 dark:text-gray-200">Output: </span>
                                                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm text-blue-500 dark:text-blue-400">{ex.output}</code>
                                            </div>
                                            {ex.explanation && (
                                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                                                    <span className="font-semibold">Explanation: </span>
                                                    {ex.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {problem.constraints && problem.constraints.length > 0 && (
                            <div className="mb-8 p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                                <h3 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-400">Constraints</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                                    {problem.constraints.map((constraint, idx) => (
                                        <li key={idx}><code className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded text-sm text-orange-600 dark:text-orange-300">{constraint}</code></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                <Clock className="w-5 h-5" />
                                <span>Time Limit: {problem.timeLimit || 2} seconds</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                <Database className="w-5 h-5" />
                                <span>Memory Limit: {problem.memoryLimit || 256} MB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
