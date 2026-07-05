import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

const LEARNING_PATHS_DATA = [
    {
        id: 'full-stack-engineer',
        title: 'Full Stack Engineer',
        description: 'Master both frontend and backend development to build complete web applications from scratch.',
        icon: 'layout',
        color: 'from-purple-600 to-indigo-600',
        courses: 6,
        duration: '6-8 Months',
        difficulty: 'Beginner to Advanced'
    },
    {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Learn to extract insights from data using Python, statistics, and machine learning models.',
        icon: 'bar-chart-2',
        color: 'from-blue-600 to-cyan-600',
        courses: 5,
        duration: '5-7 Months',
        difficulty: 'Intermediate'
    },
    {
        id: 'cyber-security-specialist',
        title: 'Cyber Security Specialist',
        description: 'Defend systems against attacks, learn ethical hacking, and master network security protocols.',
        icon: 'shield',
        color: 'from-red-600 to-rose-600',
        courses: 7,
        duration: '8-10 Months',
        difficulty: 'Advanced'
    },
    {
        id: 'ai-ml-engineer',
        title: 'AI / ML Engineer',
        description: 'Build the future with neural networks, deep learning, and scalable AI architectures.',
        icon: 'cpu',
        color: 'from-pink-600 to-rose-600',
        courses: 6,
        duration: '7-9 Months',
        difficulty: 'Advanced'
    }
];

const LearningPaths = () => {
    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, []);

    return (
        <div className="w-full min-h-screen dark-gradient-secondary block transition-colors duration-300">
            <SEO 
                title="Learning Paths"
                description="Follow our curated learning paths to master in-demand skills and land your dream job in tech."
            />
            
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Breadcrumbs items={[{ label: 'Learning Paths', path: '/learning-paths' }]} />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-6 mb-4">
                        Curated <span className="text-primary-600 dark:text-primary-500">Learning Paths</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Structured, step-by-step tracks designed by industry experts to take you from beginner to professional.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {LEARNING_PATHS_DATA.map((path) => (
                        <Link 
                            to={`/learning-paths/${path.id}`} 
                            key={path.id}
                            className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group hover:-translate-y-1"
                        >
                            <div className={`sm:w-48 bg-gradient-to-br ${path.color} p-8 flex items-center justify-center`}>
                                <i data-feather={path.icon} className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform duration-300"></i>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {path.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">
                                    {path.description}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
                                        <i data-feather="book" className="w-3.5 h-3.5"></i>
                                        {path.courses} Courses
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
                                        <i data-feather="clock" className="w-3.5 h-3.5"></i>
                                        {path.duration}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPaths;
