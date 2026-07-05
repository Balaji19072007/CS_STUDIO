import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

import { contentService } from '../services/contentService';

const Blog = () => {
    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300 pb-20">
            <SEO 
                title="Engineering Blog"
                description="Read tutorials, technical deep dives, and announcements from the CS Studio engineering team."
            />
            
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-4">
                        CS Studio <span className="text-primary-600 dark:text-primary-500">Blog</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Insights, tutorials, and engineering deep dives to help you level up your coding skills.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentService.getPublishedContent('blog').map((post) => (
                        <Link 
                            to={`/blog/${post.slug}`} 
                            key={post.id}
                            className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
                        >
                            <div className={`h-48 w-full bg-gradient-to-br ${post.imageBg} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                <i data-feather="file-text" className="w-12 h-12 text-white opacity-80 transform group-hover:scale-110 transition-transform duration-300 relative z-10"></i>
                                
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                    {post.category}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-3">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <i data-feather="calendar" className="w-3.5 h-3.5 mr-1.5"></i>
                                        {post.date}
                                    </div>
                                    <div className="flex items-center text-xs font-semibold text-primary-600 dark:text-primary-400">
                                        Read Article <i data-feather="arrow-right" className="w-3.5 h-3.5 ml-1"></i>
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

export default Blog;
