import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuroraBackground from './AuroraBackground.jsx';
import FloatingEditorMockup from './FloatingEditorMockup.jsx';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500">
            <AuroraBackground />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-center lg:text-left space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 shadow-sm backdrop-blur-md"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                            </span>
                            <span className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200">
                                CS Studio v2.0 • The Future is Here
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900 dark:text-white"
                        >
                            Master Code. <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-500 to-purple-600 dark:from-primary-400 dark:via-blue-400 dark:to-purple-400">
                                Engineer the Future.
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                        >
                            The ultimate platform for ambitious developers. Experience zero-latency compilation, competitive arenas, and interactive visualizations inside an enterprise-grade cloud architecture.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                        >
                            <Link to="/signup" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 overflow-hidden">
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black dark:to-white"></span>
                                <span className="relative flex items-center">
                                    Start Building for Free
                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </Link>
                            <Link to="/problems" className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-700 dark:text-gray-300 transition-all duration-300 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1 backdrop-blur-md shadow-sm">
                                Explore Platform
                            </Link>
                        </motion.div>
                    </div>

                    <div className="relative w-full h-full flex items-center justify-center mt-10 lg:mt-0">
                        <FloatingEditorMockup />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
