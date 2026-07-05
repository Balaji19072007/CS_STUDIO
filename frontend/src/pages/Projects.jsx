import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

import { contentService } from '../services/contentService';

const Projects = () => {
    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, []);

    return (
        <div className="w-full min-h-screen dark-gradient-secondary block transition-colors duration-300">
            <SEO 
                title="Projects Showcase"
                description="Explore our curated collection of practice projects and capstones. Build real-world applications to add to your developer portfolio."
            />
            
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Breadcrumbs items={[{ label: 'Projects', path: '/projects' }]} />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-6 mb-4">
                        Build Your <span className="text-primary-600 dark:text-primary-500">Portfolio</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Stop watching tutorials. Start building real applications to solidify your skills and stand out to employers.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentService.getPublishedContent('project').map((project) => (
                        <Link 
                            to={`/projects/${project.id}`} 
                            key={project.id}
                            className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
                        >
                            <div className={`h-48 w-full bg-gradient-to-br ${project.imageBg} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                <i data-feather={project.icon} className="w-16 h-16 text-white opacity-90 transform group-hover:scale-110 transition-transform duration-300 relative z-10"></i>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                        project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {project.difficulty}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t, idx) => (
                                        <span key={idx} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
