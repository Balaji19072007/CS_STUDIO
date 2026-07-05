import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { NotFoundPage } from '../components/common/ErrorPages';
import { contentService } from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPost = () => {
    const { slug } = useParams();
    
    // Find the blog post from our static data
    const post = contentService.getContentBySlug('blog', slug);

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [slug]);

    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <SEO 
                title={`${post.title} - CS Studio Blog`}
                description={post.excerpt}
                type="article"
            />
            
            {/* Hero Section */}
            <div className={`pt-24 pb-16 relative z-10 bg-gradient-to-br ${post.imageBg} text-white`}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <Breadcrumbs items={[
                        { label: 'Blog', path: '/blog' },
                        { label: post.title, path: `/blog/${slug}` }
                    ]} />
                    
                    <div className="mt-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                                {post.category}
                            </span>
                            <span className="text-sm font-medium text-gray-200 flex items-center">
                                <i data-feather="clock" className="w-4 h-4 mr-1.5"></i>
                                {post.readTime}
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 text-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 font-bold text-lg border border-white/30">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{post.author}</p>
                                    <p className="text-xs">{post.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <article className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                    prose-code:text-primary-600 dark:prose-code:text-primary-400
                ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </article>
                
                {/* Author Bio / Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Written by {post.author}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Building the tools and curriculum to help you master computer science.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* More Posts (Placeholder for future) */}
            <div className="bg-gray-100 dark:bg-gray-800/50 py-16 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Want more?</h2>
                    <Link 
                        to="/blog"
                        className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-all duration-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
                    >
                        <i data-feather="arrow-left" className="mr-2 w-5 h-5"></i>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
