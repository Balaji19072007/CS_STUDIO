import React from 'react';
import { motion } from 'framer-motion';

const paths = [
    { title: "Frontend Architecture", subtitle: "UI/UX", color: "blue" },
    { title: "Enterprise Backend", subtitle: "Systems", color: "purple" },
    { title: "Machine Learning", subtitle: "Data & AI", color: "emerald" },
    { title: "Competitive Programming", subtitle: "Algorithms", color: "amber" }
];

const RoadmapVisualization = () => {
    return (
        <section className="py-32 bg-[#F8FAFC] dark:bg-[#0F172A] relative transition-colors duration-500 border-y border-gray-200/50 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
                    >
                        Structured Pathways.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto"
                    >
                        Follow meticulously crafted roadmaps designed to transform you into an industry leader.
                    </motion.p>
                </div>

                <div className="relative max-w-4xl mx-auto hidden md:block">
                    {/* Connecting Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 -translate-x-1/2 opacity-20 rounded-full"></div>
                    
                    <div className="space-y-20">
                        {paths.map((path, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="w-[45%] flex justify-end">
                                    {i % 2 === 0 ? (
                                        <div className="text-right">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{path.title}</h3>
                                            <p className={`text-${path.color}-500 font-bold uppercase tracking-wider text-sm mt-1`}>{path.subtitle}</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-32 rounded-2xl bg-white dark:bg-[#1E293B]/60 border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden group backdrop-blur-md">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center backdrop-blur-sm border border-gray-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                                                    <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="z-20 flex items-center justify-center w-10 h-10 rounded-full bg-[#F8FAFC] dark:bg-[#0F172A] border-4 border-[#F8FAFC] dark:border-[#0F172A] shadow-inner">
                                    <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                                </div>
                                
                                <div className="w-[45%] flex justify-start">
                                    {i % 2 !== 0 ? (
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{path.title}</h3>
                                            <p className={`text-${path.color}-500 font-bold uppercase tracking-wider text-sm mt-1`}>{path.subtitle}</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-32 rounded-2xl bg-white dark:bg-[#1E293B]/60 border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden group backdrop-blur-md">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center backdrop-blur-sm border border-gray-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                                                    <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-8 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-amber-500 opacity-20 rounded-full"></div>
                    {paths.map((path, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative pl-12"
                        >
                            <div className="absolute left-2 top-2 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-[#F8FAFC] dark:bg-[#0F172A] border-2 border-[#F8FAFC] dark:border-[#0F172A] -translate-x-1/2">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            </div>
                            <div className="bg-white dark:bg-[#1E293B]/60 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{path.title}</h3>
                                <p className="text-primary-500 font-bold uppercase tracking-wider text-xs mt-1">{path.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapVisualization;
