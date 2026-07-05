import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { NotFoundPage } from '../components/common/ErrorPages';
import { contentService } from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocDetail = () => {
    const { docId } = useParams();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Find the specific document and flatten all documents for easy previous/next linking
    let currentDoc = null;
    let categoryName = '';
    const allDocs = [];
    
    contentService.getPublishedContent('doc').forEach(category => {
        category.items.forEach(item => {
            allDocs.push(item);
            if (item.slug === docId) {
                currentDoc = item;
                categoryName = category.category;
            }
        });
    });

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [docId, isSidebarOpen]);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!currentDoc) {
        return <NotFoundPage />;
    }

    const currentIndex = allDocs.findIndex(d => d.slug === docId);
    const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

    return (
        <div className="w-full min-h-screen bg-white dark:bg-[#0f1117] transition-colors duration-300">
            <SEO 
                title={`${currentDoc.title} - CS Studio Docs`}
                description={currentDoc.description}
            />
            
            {/* Top Navigation Bar for Docs */}
            <div className="pt-16 md:pt-20 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        <Breadcrumbs items={[
                            { label: 'Docs', path: '/docs' },
                            { label: categoryName, path: '/docs' },
                            { label: currentDoc.title, path: `/docs/${docId}` }
                        ]} />
                        
                        {/* Mobile Sidebar Toggle */}
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            <i data-feather={isSidebarOpen ? "x" : "menu"} className="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start">
                
                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:pt-8 md:pb-24 md:h-[calc(100vh-4rem)] md:overflow-y-auto pt-24 pb-10 overflow-y-auto shadow-2xl md:shadow-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <nav className="px-6 md:px-0 md:pr-8">
                        {contentService.getPublishedContent('doc').map((section, idx) => (
                            <div key={idx} className="mb-8">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm tracking-wider uppercase">
                                    {section.category}
                                </h4>
                                <ul className="space-y-2">
                                    {section.items.map((item) => {
                                        const isActive = item.slug === docId;
                                        return (
                                            <li key={item.id}>
                                                <Link 
                                                    to={`/docs/${item.slug}`}
                                                    className={`block py-1.5 px-3 rounded-lg text-sm transition-colors duration-200 ${
                                                        isActive 
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-20 md:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 pt-8 pb-24 md:pl-12 lg:pl-16">
                    <article className="prose prose-lg dark:prose-invert max-w-3xl
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-md
                        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                        prose-code:text-primary-600 dark:prose-code:text-primary-400
                        prose-hr:border-gray-200 dark:prose-hr:border-gray-800
                    ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {currentDoc.content}
                        </ReactMarkdown>
                    </article>
                    
                    {/* Next/Prev Navigation */}
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl">
                        {prevDoc ? (
                            <Link 
                                to={`/docs/${prevDoc.slug}`}
                                className="w-full sm:w-1/2 flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-left group"
                            >
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center">
                                    <i data-feather="arrow-left" className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-1"></i>
                                    Previous
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white text-lg">
                                    {prevDoc.title}
                                </span>
                            </Link>
                        ) : <div className="w-full sm:w-1/2"></div>}
                        
                        {nextDoc && (
                            <Link 
                                to={`/docs/${nextDoc.slug}`}
                                className="w-full sm:w-1/2 flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-right group"
                            >
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-end">
                                    Next
                                    <i data-feather="arrow-right" className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1"></i>
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white text-lg">
                                    {nextDoc.title}
                                </span>
                            </Link>
                        )}
                    </div>
                </main>
                
            </div>
        </div>
    );
};

export default DocDetail;
