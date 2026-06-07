import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [inView, end]);

    return (
        <div ref={ref} className="text-center px-4">
            <div className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tighter">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    );
};

const StatsCounters = () => {
    return (
        <section className="relative z-20 py-20 bg-white dark:bg-[#0B1120] border-y border-gray-200/50 dark:border-white/5 transition-colors duration-500 shadow-sm overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary-500/5 dark:bg-primary-500/10 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 divide-x-0 md:divide-x divide-gray-200 dark:divide-white/10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Counter end={25000} label="Elite Engineers" suffix="+" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <Counter end={0} label="Compiler Latency" suffix="ms" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <Counter end={500} label="Architectural Challenges" suffix="+" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <Counter end={100} label="Free Infrastructure" suffix="%" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StatsCounters;
