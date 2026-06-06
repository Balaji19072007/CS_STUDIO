import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import UserHomePage from './UserHomePage.jsx';
import Loader from '../components/common/Loader.jsx';
import api from '../config/api.js';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Constants ---
const FEATURE_DATA = [
    { title: "Multi-Language Compiler", icon: "terminal", description: "Write, compile, and run C, C++, Java, Python, and JS instantly in the cloud.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    { title: "Web Project Builder", icon: "layout", description: "Live HTML/CSS/JS editor with real-time preview for building full web projects.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    { title: "Global Leaderboard", icon: "award", description: "Compete with peers, earn XP, and climb the global ranks through daily challenges.", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
    { title: "Real-Time Community", icon: "users", description: "Chat with fellow developers, share code, and get unstuck in our active community.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    { title: "Interactive Visuals", icon: "eye", description: "See algorithms come to life with step-by-step memory and execution animations.", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    { title: "Verified Certificates", icon: "check-circle", description: "Earn industry-recognized certificates upon mastering learning paths and courses.", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30" }
];

const PATHS_DATA = [
    { title: "Frontend Web Dev", icon: "monitor", subtitle: "UI & UX", description: "Master HTML, CSS, React, and build stunning web interfaces." },
    { title: "Python Mastery", icon: "code", subtitle: "Data & AI", description: "Learn the most popular language for Data Science and Machine Learning." },
    { title: "Java Enterprise", icon: "coffee", subtitle: "Backend Systems", description: "Build robust, scalable enterprise applications with Java." },
    { title: "C & C++ Systems", icon: "cpu", subtitle: "Performance", description: "Master memory management and high-performance system design." }
];

const TESTIMONIALS_DATA = [
    { name: "Sarah J.", title: "Software Engineer", quote: "The real-time compiler is blazing fast. I can practice Java without setting up an IDE!", initials: "SJ" },
    { name: "Mike T.", title: "CS Student", quote: "The global leaderboard keeps me motivated. I do the daily problem every morning.", initials: "MT" },
    { name: "Alex R.", title: "Self Taught", quote: "Building HTML/JS projects right in the browser and sharing them is a game changer.", initials: "AR" }
];

// --- Helper Components ---
const AbstractBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <svg className="w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);

const InteractiveDemo = () => {
    useEffect(() => { feather.replace(); });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="relative w-full max-w-2xl mx-auto rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden border border-gray-700/50 bg-[#0F172A]/80 backdrop-blur-xl"
        >
            {/* Fake Mac Window Header */}
            <div className="flex items-center px-4 py-3 bg-[#1E293B]/80 border-b border-gray-700/50">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400 flex items-center gap-2">
                    <i data-feather="code" className="w-3 h-3"></i> compiler.cs-studio.in
                </div>
            </div>

            <div className="p-5 font-mono text-sm leading-relaxed">
                <div className="flex text-gray-400 mb-4 text-xs border-b border-gray-800 pb-2">
                    <span className="text-blue-400 mr-4 border-b border-blue-400 pb-2">main.py</span>
                    <span className="hover:text-white cursor-pointer mr-4">App.jsx</span>
                    <span className="hover:text-white cursor-pointer">Solution.java</span>
                </div>
                
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    className="overflow-hidden whitespace-nowrap border-r-2 border-primary-500 pr-2"
                >
                    <span className="text-purple-400">def</span> <span className="text-blue-400">calculate_fibonacci</span>(n):
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> n &lt;= <span className="text-yellow-400">1</span>:
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> n
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> calculate_fibonacci(n-<span className="text-yellow-400">1</span>) + calculate_fibonacci(n-<span className="text-yellow-400">2</span>)
                </motion.div>
                <br />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
                    <span className="text-gray-500"># Compiling and executing in cloud...</span>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 0.5 }}
                    className="mt-4 p-3 bg-black/50 rounded-lg border border-gray-800"
                >
                    <div className="text-xs text-gray-500 mb-1">Terminal Output</div>
                    <div className="text-green-400">&gt; Result: 55</div>
                    <div className="text-gray-400 text-xs mt-1">Execution Time: 0.042ms</div>
                </motion.div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-600 to-blue-600 p-3 rounded-full shadow-2xl animate-bounce-slow">
                <i data-feather="zap" className="w-6 h-6 text-white"></i>
            </div>
        </motion.div>
    );
};

// --- Main Home Component ---
const Home = () => {
    const { isLoggedIn, loading } = useAuth();
    const [userStats, setUserStats] = useState({ totalUsers: 15200, satisfactionRate: 99 });
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        feather.replace();
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/stats/user-stats');
                if (response.status === 200) {
                    setUserStats(prev => ({ ...prev, ...response.data }));
                }
            } catch (e) { console.error('Stats fetch error:', e); }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
                <Loader size="lg" message="Loading CS Studio..." className="text-primary-500" />
            </div>
        );
    }

    if (isLoggedIn) {
        return <UserHomePage />;
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 overflow-hidden font-sans selection:bg-primary-500/30">
            
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden perspective-1000">
                <AbstractBackground />
                
                <motion.div 
                    style={{ y: yHero, opacity: opacityHero }}
                    className="max-w-7xl mx-auto px-6 relative z-10 w-full"
                >
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="text-center lg:text-left space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium"
                            >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                </span>
                                CS Studio 2.0 is Live
                            </motion.div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
                            >
                                Code. Compile.<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-blue-400 to-purple-500">
                                    Conquer.
                                </span>
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                The ultimate ecosystem for developers. From a blazing-fast multi-language compiler and live web project editor, to global leaderboards and a real-time community.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Link to="/signup" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary-600 rounded-xl hover:bg-primary-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-1">
                                    Start Building Now
                                    <i data-feather="arrow-right" className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                                <Link to="/problems" className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 transition-all duration-200 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:text-white hover:-translate-y-1 backdrop-blur-sm">
                                    Explore Problems
                                </Link>
                            </motion.div>
                        </div>

                        <div className="relative perspective-1000">
                            <InteractiveDemo />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* STATS SECTION */}
            <section className="relative z-20 py-10 bg-gradient-to-b from-transparent to-[#0F172A] border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                            <div className="text-4xl font-extrabold text-white mb-2">{userStats.totalUsers.toLocaleString()}+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Coders</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
                            <div className="text-4xl font-extrabold text-white mb-2">5+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Languages</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
                            <div className="text-4xl font-extrabold text-white mb-2">500+</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Challenges</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center">
                            <div className="text-4xl font-extrabold text-white mb-2">{userStats.satisfactionRate}%</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Satisfaction</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 bg-[#0F172A] relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-500 font-bold tracking-wide uppercase text-sm mb-3"
                        >
                            Powerful Capabilities
                        </motion.h2>
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold text-white"
                        >
                            Everything you need to excel.
                        </motion.h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURE_DATA.map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="p-8 rounded-2xl bg-[#1E293B]/50 border border-gray-700/50 backdrop-blur-md hover:border-gray-600 transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <i data-feather={feature.icon} className={`w-7 h-7 ${feature.color}`}></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEARNING PATHS */}
            <section className="py-24 bg-[#0B1120] relative border-t border-gray-800">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Structured Roadmaps</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Follow industry-standard learning paths designed to take you from beginner to hired professional.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PATHS_DATA.map((path, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col p-6 rounded-2xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-gray-700/50"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                                        <i data-feather={path.icon} className="w-5 h-5 text-gray-300"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{path.title}</h4>
                                        <span className="text-xs text-primary-400 font-semibold">{path.subtitle}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-6 flex-1">{path.description}</p>
                                <Link to="/roadmaps" className="text-sm font-bold text-white hover:text-primary-400 transition-colors flex items-center group">
                                    View Roadmap <i data-feather="arrow-right" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-[#0F172A] border-t border-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Wall of Love</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS_DATA.map((test, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, type: "spring" }}
                                className="p-8 rounded-2xl bg-[#1E293B]/40 border border-gray-700/50 relative"
                            >
                                <i data-feather="message-circle" className="absolute top-6 right-6 w-8 h-8 text-gray-700/30"></i>
                                <div className="flex gap-1 mb-6">
                                    {[1,2,3,4,5].map(s => <i key={s} data-feather="star" className="w-4 h-4 text-yellow-500 fill-current"></i>)}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-8 italic">"{test.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                        {test.initials}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">{test.name}</div>
                                        <div className="text-gray-500 text-xs">{test.title}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-[#0B1120] relative">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[2.5rem] bg-gradient-to-br from-primary-900/40 via-blue-900/40 to-purple-900/40 border border-primary-500/20 backdrop-blur-3xl text-center relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)]"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                        
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Ready to level up?
                        </h2>
                        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of developers worldwide. Code faster, learn better, and build the future with CS Studio.
                        </p>
                        <Link to="/signup" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-primary-600 rounded-2xl hover:bg-primary-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] hover:-translate-y-1 overflow-hidden">
                            <span className="relative z-10 flex items-center">
                                Create Free Account <i data-feather="zap" className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform"></i>
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </section>
            
        </div>
    );
};

export default Home;
