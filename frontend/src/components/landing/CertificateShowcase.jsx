import React from 'react';
import { motion } from 'framer-motion';

const CertificateShowcase = () => {
    return (
        <section className="py-32 bg-white dark:bg-[#0B1120] relative transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Certificate Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative"
                        style={{ perspective: 1000 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 blur-[80px] -z-10 rounded-full"></div>
                        
                        <div className="w-full aspect-[1.414/1] bg-white dark:bg-[#0F172A] border-[8px] border-gray-100 dark:border-[#1E293B] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-6 md:p-10 relative overflow-hidden flex flex-col justify-between group">
                            
                            {/* Certificate Background Pattern */}
                            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                            {/* Certificate Content */}
                            <div className="relative z-10 border border-gray-200 dark:border-gray-800 p-6 md:p-8 h-full flex flex-col justify-between group-hover:border-amber-500/30 transition-colors duration-500 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-sm">
                                
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 shadow-sm"></div>
                                        <span className="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest text-[10px] md:text-xs">CS Studio</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[8px] md:text-[10px] text-gray-500 font-mono uppercase">ID: CS-9X82-KPL</div>
                                        <div className="text-[8px] md:text-[10px] text-gray-500 font-mono uppercase">Verify: cs-studio.in/v</div>
                                    </div>
                                </div>

                                <div className="text-center my-4 md:my-6">
                                    <h4 className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Certificate of Excellence</h4>
                                    <h3 className="text-2xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4 md:mb-6">Advanced Algorithms</h3>
                                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-light italic">This certifies that</p>
                                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2 border-b border-gray-300 dark:border-gray-700 inline-block pb-1 px-4">Alex Chen</p>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="text-center">
                                        <div className="border-b border-gray-400 w-16 md:w-24 mb-1"></div>
                                        <div className="text-[8px] md:text-[10px] uppercase text-gray-500">Director</div>
                                    </div>
                                    
                                    {/* Seal */}
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center">
                                            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-[10px] md:text-xs font-mono text-gray-800 dark:text-gray-300 mb-1">2026-06-07</div>
                                        <div className="text-[8px] md:text-[10px] uppercase text-gray-500">Date Issued</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
                        >
                            Verifiable Credentials.
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8"
                        >
                            Validate your expertise with cryptographically secure certificates. Our credentials are recognized by top technology enterprises and can be instantly verified on our platform.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-4 text-sm font-bold text-gray-900 dark:text-white"
                        >
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0B1120] bg-gray-200 dark:bg-gray-800 flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                ))}
                            </div>
                            <span>Join 10,000+ certified engineers</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificateShowcase;
