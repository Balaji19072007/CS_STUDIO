import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

import { contentService } from '../services/contentService';

const Docs = () => {
    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300 pb-20">
            <SEO 
                title="Documentation & Guides"
                description="Learn how to use CS Studio, compile code in the cloud, and build real-world software."
            />
            
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <Breadcrumbs items={[{ label: 'Documentation', path: '/docs' }]} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-4">
                        CS Studio <span className="text-primary-600 dark:text-primary-500">Documentation</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Everything you need to know about the platform, our cloud IDE, and how to maximize your learning.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">
                    {contentService.getPublishedContent('doc').map((section, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                {section.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.items.map((doc) => (
                                    <Link 
                                        to={`/docs/${doc.slug}`} 
                                        key={doc.id}
                                        className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-750 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                {doc.title}
                                            </h3>
                                            <i data-feather="arrow-right" className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all"></i>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {doc.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Docs;
