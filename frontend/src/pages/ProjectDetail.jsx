import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { NotFoundPage } from '../components/common/ErrorPages';
import { contentService } from '../services/contentService';
import { useAuth } from '../hooks/useAuth';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const { isLoggedIn } = useAuth();
    
    // Find the project from our static data
    const project = contentService.getContentBySlug('project', projectId);

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [projectId]);

    if (!project) {
        return <NotFoundPage />;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <SEO 
                title={`${project.title} - Project Overview`}
                description={project.description}
            />
            
            <div className={`pt-24 pb-16 relative z-10 bg-gradient-to-br ${project.imageBg} text-white`}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <Breadcrumbs items={[
                        { label: 'Projects', path: '/projects' },
                        { label: project.title, path: `/projects/${projectId}` }
                    ]} />
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
                        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <i data-feather={project.icon} className="w-12 h-12 text-white"></i>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                                    {project.title}
                                </h1>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-6 justify-center md:justify-start">
                                <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                                    project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                    project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                    'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}>
                                    {project.difficulty}
                                </span>
                                {project.tech.map((t, idx) => (
                                    <span key={idx} className="text-sm font-medium bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to start building?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Launch the interactive IDE to start writing code, testing your implementation, and completing the project requirements.
                    </p>
                    
                    <Link 
                        to={isLoggedIn ? `/course-project/${projectId}` : `/signin?redirect=/course-project/${projectId}`}
                        className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/30 hover:-translate-y-1"
                    >
                        {isLoggedIn ? 'Launch Project Workspace' : 'Sign in to Start'}
                        <i data-feather="terminal" className="ml-2 w-5 h-5"></i>
                    </Link>
                    
                    {!isLoggedIn && (
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">Sign up for free</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
