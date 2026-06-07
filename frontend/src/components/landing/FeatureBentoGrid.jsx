import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        title: "Next-Gen Cloud IDE",
        description: "Zero-latency compilation across 5+ languages in a secure cloud environment.",
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        ),
        colSpan: "md:col-span-2",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        border: "border-blue-200 dark:border-blue-500/20"
    },
    {
        title: "Global Arena",
        description: "Compete in algorithmic challenges with elite engineers worldwide.",
        icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
        ),
        colSpan: "md:col-span-1",
        bg: "bg-amber-50 dark:bg-amber-500/10",
        border: "border-amber-200 dark:border-amber-500/20"
    },
    {
        title: "Immersive Web Studio",
        description: "Architect full-stack web applications with our live HTML/CSS/JS engine. See changes instantly.",
        icon: (
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
        ),
        colSpan: "md:col-span-1",
        bg: "bg-purple-50 dark:bg-purple-500/10",
        border: "border-purple-200 dark:border-purple-500/20"
    },
    {
        title: "Industry-Grade Certification",
        description: "Secure cryptographically verified credentials recognized by leading technology enterprises.",
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ),
        colSpan: "md:col-span-2",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        border: "border-emerald-200 dark:border-emerald-500/20"
    }
];

const FeatureBentoGrid = () => {
    return (
        <section className="py-32 bg-[#F8FAFC] dark:bg-[#0F172A] relative transition-colors duration-500 border-y border-gray-200/50 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-widest border border-primary-200 dark:border-primary-500/20"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Unparalleled Capabilities
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
                    >
                        Built for Elite Performers.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8, scale: 1.01 }}
                            className={`group relative overflow-hidden rounded-[2.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1E293B]/60 backdrop-blur-xl p-10 shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${feature.colSpan}`}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 translate-x-4 -translate-y-4 scale-150 pointer-events-none">
                                {feature.icon}
                            </div>
                            
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-10 border backdrop-blur-md ${feature.bg} ${feature.border} shadow-inner`}>
                                {feature.icon}
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{feature.title}</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-lg relative z-10">{feature.description}</p>
                            
                            {/* Decorative gradient glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureBentoGrid;
