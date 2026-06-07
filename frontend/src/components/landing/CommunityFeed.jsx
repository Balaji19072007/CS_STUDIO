import React from 'react';
import { motion } from 'framer-motion';

const activities = [
    { user: "AlexChen", action: "solved Hard problem", item: "Median of Two Sorted Arrays", time: "2m ago" },
    { user: "SarahDev", action: "earned certificate", item: "Advanced Systems Design", time: "15m ago" },
    { user: "MikeT", action: "reached Top 1%", item: "Global Leaderboard", time: "1h ago" },
    { user: "Elena_K", action: "published solution", item: "Dynamic Programming Guide", time: "2h ago" }
];

const CommunityFeed = () => {
    return (
        <section className="py-32 bg-white dark:bg-[#0B1120] relative transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Text */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-200 dark:border-emerald-500/20"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Global Ecosystem
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
                        >
                            Compete. Collaborate. Conquer.
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8"
                        >
                            Integrate into a thriving ecosystem of engineers. Exchange paradigms, architect solutions together, and elevate your coding standards on a global leaderboard.
                        </motion.p>
                    </div>

                    {/* Right: Feed Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative"
                        style={{ perspective: 1000 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-[80px] -z-10 rounded-full"></div>
                        
                        <div className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-white/5">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Activity Feed
                                </h3>
                            </div>
                            
                            <div className="space-y-4">
                                {activities.map((act, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                                            {act.user.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                <span className="font-bold">{act.user}</span> {act.action}
                                            </p>
                                            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 mt-1">{act.item}</p>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{act.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommunityFeed;
