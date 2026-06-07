import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveDemo = () => {
    const [activeTab, setActiveTab] = useState('sorting');
    
    // Simple mock bars for visualization
    const bars = [40, 70, 20, 90, 50, 80, 30, 60, 10, 100];

    return (
        <section className="py-32 bg-white dark:bg-[#0B1120] relative transition-colors duration-500 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
                    >
                        See Code Come Alive.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto"
                    >
                        Deconstruct complex logic with our cinematic algorithmic visualizer.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto rounded-[2.5rem] bg-gray-50 dark:bg-[#1E293B]/40 border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-md flex flex-col md:flex-row"
                >
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-white/80 dark:bg-black/20 border-r border-gray-200 dark:border-white/5 p-6 flex flex-col gap-4">
                        <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Visualizers</div>
                        <button 
                            onClick={() => setActiveTab('sorting')}
                            className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${activeTab === 'sorting' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            Quick Sort
                        </button>
                        <button 
                            onClick={() => setActiveTab('graph')}
                            className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${activeTab === 'graph' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            Dijkstra's Path
                        </button>
                        <button 
                            onClick={() => setActiveTab('tree')}
                            className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${activeTab === 'tree' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            AVL Tree
                        </button>
                    </div>

                    {/* Main Stage */}
                    <div className="flex-1 p-8 md:p-12 relative flex items-center justify-center min-h-[400px]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        
                        {activeTab === 'sorting' && (
                            <div className="flex items-end justify-center gap-2 md:gap-4 h-64 w-full z-10">
                                {bars.map((height, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                                        className={`w-6 md:w-10 rounded-t-lg ${i === 3 || i === 7 ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-primary-500/80 dark:bg-primary-500/50'}`}
                                    ></motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab !== 'sorting' && (
                            <div className="text-center z-10">
                                <div className="w-16 h-16 rounded-full border-4 border-primary-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-500 font-mono">Compiling {activeTab} engine...</p>
                            </div>
                        )}
                        
                        {/* Overlay to simulate interaction */}
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <div className="px-3 py-1 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-full text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold backdrop-blur-md shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                RUNNING
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveDemo;
