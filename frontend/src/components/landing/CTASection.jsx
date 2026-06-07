import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-32 bg-white dark:bg-[#0F172A] relative transition-colors duration-500 border-t border-gray-200/50 dark:border-white/5">
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-12 md:p-24 rounded-[3rem] bg-gray-900 dark:bg-gradient-to-br dark:from-[#0B1120] dark:via-[#1E293B] dark:to-[#0F172A] border border-gray-800 dark:border-white/10 text-center relative overflow-hidden shadow-2xl dark:shadow-premium-lg"
                >
                    {/* Subtle inner glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-600/30 via-transparent to-transparent pointer-events-none"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight relative z-10">
                        Ready to Initialize?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light relative z-10">
                        Join the ranks of thousands of exceptional developers. Architect flawlessly, learn relentlessly, and build the future with CS Studio.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
                        <Link to="/signup" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-gray-900 bg-white rounded-2xl hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
                            Launch Workspace 
                            <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </Link>
                        <span className="text-gray-400 font-semibold text-sm">or</span>
                        <Link to="/courses" className="text-white font-semibold hover:text-primary-400 transition-colors w-full sm:w-auto">
                            View Syllabus
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
