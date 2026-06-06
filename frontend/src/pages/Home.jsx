// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import UserHomePage from './UserHomePage.jsx';
import Loader from '../components/common/Loader.jsx';

// Use relative URLs since CORS is now enabled
// Use relative URLs since CORS is now enabled
const API_BASE_URL = ''; // Empty for relative URLs

const FEATURE_DATA = [
    { title: "Interactive Visuals", icon: "eye", description: "See algorithms come to life with step-by-step animations." },
    { title: "Instant Feedback", icon: "check-circle", description: "Get real-time validation and error explanations." },
    { title: "Progress Tracking", icon: "bar-chart", description: "Monitor your growth with detailed statistics." }
];

const PATHS_DATA = [
    { title: "C Programming", icon: "cpu", subtitle: "System & Embedded", description: "Master the foundation of modern computing." },
    { title: "Python Mastery", icon: "code", subtitle: "Data & AI", description: "Learn the most popular language for Data Science." },
    { title: "Java Enterprise", icon: "coffee", subtitle: "Backend Systems", description: "Build robust, scalable enterprise applications." }
];

const TESTIMONIALS_DATA = [
    { name: "Sarah J.", title: "Software Engineer", quote: "The visuals made understanding recursion so much easier!", initials: "SJ" },
    { name: "Mike T.", title: "CS Student", quote: "Finally passed my DS&A course thanks to these animations.", initials: "MT" },
    { name: "Alex R.", title: "Self Taught", quote: "Best platform for visual learners. Highly recommended.", initials: "AR" }
];

// --- Helper Components for Visual Appeal ---

const AbstractBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="var(--color-primary-500)" strokeWidth="0.5" opacity="0.1" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            <circle cx="25%" cy="30%" r="50" fill="var(--color-primary-400)" opacity="0.08" className="animate-float-slow" />
            <circle cx="75%" cy="80%" r="80" fill="var(--color-primary-500)" opacity="0.05" className="animate-float-reverse" />
        </svg>
    </div>
);

const InteractiveDemo = () => {
    useEffect(() => {
        feather.replace();
    });

    return (
        <div className="relative w-full max-w-xl rounded-2xl shadow-premium-lg overflow-hidden card-hover border-4 border-primary-500/50 hover:border-primary-500">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4">

                <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-700 pb-3 mb-3">
                    <div className="flex items-center">
                        <span className="text-primary-400 mr-2">Problem 42:</span> Merge Sort Implementation
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-yellow-400 bg-yellow-500/20">Medium</span>
                        <i data-feather="clock" className="w-4 h-4"></i>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 h-[300px]">

                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-auto border border-gray-700">
                        <p className="text-white font-semibold mb-2 text-left">Code (Python)</p>
                        <pre className="text-gray-300 text-left whitespace-pre-wrap">
                            {`def mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        
        mergeSort(L)
        mergeSort(R)
        
        i = j = k = 0
        
        # Merge the sorted halves
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        
        # Check for any remaining elements
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    
    return arr`}
                        </pre>
                    </div>

                    <div className="flex flex-col space-y-4">

                        <div className="bg-gray-900 rounded-lg p-3 overflow-auto flex-1 border border-gray-700">
                            <p className="text-white font-semibold mb-2 text-left">Console Output</p>
                            <pre className="text-xs text-left">
                                <div className="text-green-500">Input: [12, 11, 13, 5]</div>
                                <div className="text-green-500">Output: [5, 11, 12, 13]</div>
                                <div className="text-primary-400">Status: Accepted</div>
                            </pre>

                            <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 w-full"></div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-3 overflow-hidden flex-1 border border-gray-700 flex flex-col items-center justify-center">
                            <i data-feather="bar-chart-2" className="w-8 h-8 text-primary-400 mb-2"></i>
                            <p className="text-sm text-gray-400 text-center">
                                Live Merge View
                            </p>
                            <span className="text-xs text-green-500 mt-1">Sorting in Progress...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary-500 p-2 rounded-full shadow-xl">
                <i data-feather="terminal" className="w-6 h-6 text-white"></i>
            </div>
        </div>
    );
};

// API Debug Component
const APIDebug = () => {
    const [apiStatus, setApiStatus] = useState('Testing API...');
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const testAPI = async () => {
            try {
                console.log('Testing API endpoint: /api/stats/user-stats');
                const response = await fetch('/api/stats/user-stats');
                const contentType = response.headers.get('content-type');
                const responseText = await response.text();

                console.log('Response status:', response.status);
                console.log('Content-Type:', contentType);
                console.log('Response text:', responseText);

                if (contentType && contentType.includes('text/html')) {
                    setApiStatus('❌ API ERROR: Got HTML page instead of JSON');
                    setResponseData(responseText.substring(0, 200) + '...');
                } else if (response.ok) {
                    const data = JSON.parse(responseText);
                    setApiStatus('✅ API SUCCESS');
                    setResponseData(data);
                } else {
                    setApiStatus(`❌ API ERROR: ${response.status} ${response.statusText}`);
                    setResponseData(responseText);
                }
            } catch (error) {
                console.error('API test error:', error);
                setApiStatus(`❌ NETWORK ERROR: ${error.message}`);
                setResponseData(null);
            }
        };

        testAPI();
    }, []);

    return (
        <div className="fixed top-4 left-4 bg-gray-800 text-white p-4 rounded-lg z-50 text-xs max-w-md border border-yellow-500">
            <div className="font-bold mb-2 text-yellow-400">API Debug Info:</div>
            <div className="mb-2">{apiStatus}</div>
            {responseData && (
                <div className="mt-2">
                    <div className="font-semibold">Response:</div>
                    <pre className="text-xs mt-1 overflow-auto max-h-32 bg-gray-900 p-2 rounded">
                        {typeof responseData === 'string'
                            ? responseData
                            : JSON.stringify(responseData, null, 2)
                        }
                    </pre>
                </div>
            )}
        </div>
    );
};

// Rating Prompt Component
const RatingPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const checkRatingEligibility = async () => {
            if (!isLoggedIn) return;

            try {
                const token = localStorage.getItem('token');
                console.log('Checking rating eligibility...');

                const response = await fetch('/api/stats/rating-eligibility', {
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json'
                    }
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    console.log('Rating eligibility API returned HTML - endpoint likely missing');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    console.log('Rating eligibility response:', data);
                    if (data.eligible) {
                        const hasSeenPrompt = sessionStorage.getItem('hasSeenRatingPrompt');
                        if (!hasSeenPrompt) {
                            setShowPrompt(true);
                            sessionStorage.setItem('hasSeenRatingPrompt', 'true');
                        }
                    }
                } else if (response.status === 401) {
                    console.log('Authentication failed for rating eligibility check');
                    // Token might be invalid, clear it
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                }
            } catch (error) {
                console.log('Rating eligibility check failed:', error.message);
            }
        };

        const timer = setTimeout(checkRatingEligibility, 2000);
        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    const handleRating = async (rating) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/stats/submit-rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ rating })
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                console.log('Submit rating API returned HTML - endpoint likely missing');
                setShowPrompt(false);
                return;
            }

            if (response.ok) {
                console.log('Rating submitted successfully');
                setShowPrompt(false);
                window.location.reload();
            } else if (response.status === 401) {
                console.log('Authentication failed, clearing token');
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                setShowPrompt(false);
            } else {
                console.error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Failed to submit rating:', error);
            setShowPrompt(false);
        }
    };

    const handleClose = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="dark-glass p-8 rounded-2xl max-w-md w-full border border-gray-600">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">How would you rate your experience?</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <i data-feather="x" className="w-5 h-5"></i>
                    </button>
                </div>

                <p className="text-gray-300 mb-6">
                    You've been using CS Studio for a while now. We'd love to hear your feedback!
                </p>

                <div className="flex justify-center space-x-3 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            onClick={() => handleRating(star)}
                            className="text-3xl text-yellow-400 hover:scale-110 transition-transform duration-200 hover:text-yellow-300"
                            title={`${star} star${star > 1 ? 's' : ''}`}
                        >
                            ⭐
                        </button>
                    ))}
                </div>

                <p className="text-gray-400 text-sm text-center">
                    Your feedback helps us improve the learning experience!
                </p>
            </div>
        </div>
    );
};

// --- Main Home Component ---

const Home = () => {
    // --- CONDITIONAL RENDERING FOR LOGGED IN USERS ---
    // Prevent flash of public content while auth is loading
    const { isLoggedIn, loading } = useAuth();
    const [userStats, setUserStats] = useState({
        totalUsers: 12500,
        satisfactionRate: 99
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats/user-stats');
                if (response.ok) {
                    const data = await response.json();
                    setUserStats(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error('Failed to fetch user stats:', error);
            }
        };
        fetchStats();
    }, []);


    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader size="lg" message="Loading..." className="text-white" />
            </div>
        );
    }

    if (isLoggedIn) {
        return <UserHomePage />;
    }

    return (
        <div className="min-h-screen dark-gradient-secondary">

            <div id="hero-section" className="gradient-bg text-white relative overflow-hidden min-h-screen flex items-center border-b border-gray-700">
                <AbstractBackground />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 lg:py-24 relative z-20 w-full">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="text-center lg:text-left lg:col-span-6 space-y-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                <span className="block text-white mb-2">Master Coding</span>
                                <span className="block text-primary-400">The Visual Way</span>
                            </h1>

                            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Learn algorithms and data structures with interactive visualizations. See your code come to life.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                                <Link
                                    to="/signup"
                                    className="dark-btn flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    Start Free Trial
                                </Link>
                                <Link
                                    to="/problems"
                                    className="dark-btn-secondary flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    Explore Problems
                                </Link>
                            </div>

                            <p className="text-sm text-gray-400">
                                Join <span className="text-primary-400 font-semibold">{userStats?.totalUsers?.toLocaleString() || 0}+</span> developers
                            </p>
                        </div>

                        {/* Visual Content */}
                        <div className="mt-12 lg:mt-0 lg:col-span-6">
                            {/* Desktop Demo */}
                            <div className="hidden lg:block">
                                <InteractiveDemo />
                            </div>

                            {/* Mobile Simplified View */}
                            <div className="lg:hidden space-y-4">
                                <div className="dark-glass p-6 rounded-2xl border border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <i data-feather="code" className="w-6 h-6 text-primary-400"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Interactive Learning</h3>
                                            <p className="text-gray-400 text-sm">Visual code execution</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="dark-glass p-4 rounded-xl border border-gray-700 text-center">
                                        <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mx-auto mb-2">
                                            <i data-feather="zap" className="w-5 h-5 text-primary-400"></i>
                                        </div>
                                        <p className="text-white text-sm font-medium">Fast Compiler</p>
                                    </div>
                                    <div className="dark-glass p-4 rounded-xl border border-gray-700 text-center">
                                        <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mx-auto mb-2">
                                            <i data-feather="award" className="w-5 h-5 text-primary-400"></i>
                                        </div>
                                        <p className="text-white text-sm font-medium">Get Certified</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section - Clean & Spacious */}
            <div className="py-12 sm:py-16 lg:py-20 dark-gradient-secondary border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                    <div className="bg-gray-800/50 rounded-3xl border border-gray-700 p-8 sm:p-10 lg:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                            <div className="text-center space-y-2">
                                <div className="text-3xl sm:text-4xl font-bold text-white">
                                    {userStats?.totalUsers?.toLocaleString() || 0}+
                                </div>
                                <div className="text-sm sm:text-base text-gray-400">Active Learners</div>
                            </div>

                            <div className="text-center space-y-2">
                                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                                <div className="text-sm sm:text-base text-gray-400">Lessons</div>
                            </div>

                            <div className="text-center space-y-2">
                                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                                <div className="text-sm sm:text-base text-gray-400">Problems</div>
                            </div>

                            <div className="text-center space-y-2">
                                <div className="text-3xl sm:text-4xl font-bold text-white">
                                    {userStats?.satisfactionRate || 100}%
                                </div>
                                <div className="text-sm sm:text-base text-gray-400">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 sm:py-20 lg:py-24 dark-gradient-secondary">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                    <div className="text-center mb-12 sm:mb-16 space-y-4">
                        <h2 className="text-sm sm:text-base text-primary-500 font-semibold tracking-wide uppercase">Why Choose CS Studio</h2>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                            Learn Faster with Visual Tools
                        </p>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Interactive features designed for deep understanding
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {FEATURE_DATA.map((feature, index) => (
                            <div key={index} className="dark-glass p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 flex items-center justify-center mb-4">
                                    <i data-feather={feature.icon} className="w-6 h-6 text-white"></i>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Learning Paths */}
            <div className="py-16 sm:py-20 lg:py-24 dark-gradient-secondary border-t border-gray-700">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                    <div className="text-center mb-12 sm:mb-16 space-y-4">
                        <h2 className="text-sm sm:text-base text-primary-500 font-semibold tracking-wide uppercase">Your Learning Path</h2>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                            Structured Roadmaps
                        </p>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Follow career-focused paths to build job-ready skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {PATHS_DATA.map((path, index) => (
                            <div key={index} className="dark-glass p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                                        <i data-feather={path.icon} className="w-6 h-6 text-primary-400"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                                        <p className="text-sm text-primary-400">{path.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">{path.description}</p>
                                <Link
                                    to="/roadmaps"
                                    className="dark-btn-secondary w-full text-center inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300"
                                >
                                    Explore Roadmap
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 sm:py-20 lg:py-24 dark-gradient-secondary border-t border-gray-700">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                    <div className="text-center mb-12 sm:mb-16 space-y-4">
                        <h2 className="text-sm sm:text-base text-primary-500 font-semibold tracking-wide uppercase">Success Stories</h2>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                            Loved by Developers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {TESTIMONIALS_DATA.map((testimonial, index) => (
                            <div key={index} className="dark-glass p-6 sm:p-8 rounded-2xl border border-gray-700">
                                <div className="flex gap-1 mb-4">
                                    {Array(5).fill(0).map((_, i) => (
                                        <i key={i} data-feather="star" className="w-4 h-4 text-yellow-400 fill-current"></i>
                                    ))}
                                </div>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 flex items-center justify-center text-white font-bold text-sm">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 sm:py-20 lg:py-24 dark-gradient-secondary">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-base sm:text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of developers. Start your free trial today.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Start Free Trial
                            <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                        </Link>
                    </div>
                </div>
            </div>



            <button
                id="back-to-top"
                onClick={scrollToTop}
                className={`fixed bottom-40 sm:bottom-24 right-6 h-12 w-12 rounded-full dark-gradient-accent text-white hidden md:flex items-center justify-center transition-all duration-300 shadow-lg z-50 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <i data-feather="arrow-up" className="h-5 w-5"></i>
            </button>

            <RatingPrompt />
        </div>
    );
};

export default Home;
