// src/pages/Code.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CodeEditor from '../components/problems/CodeEditor.jsx';
import * as feather from 'feather-icons';
import socketService from '../services/socketService.js';

const Code = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isDark, setIsDark] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');

    // Parse query params
    const sourceParam = searchParams.get('source');
    const langParam = searchParams.get('lang');

    // Helper to map URL lang param to Editor supported language
    const getLanguageFromParam = (param) => {
        if (!param) return 'Python'; // Default
        const lower = param.toLowerCase();
        if (lower === 'c') return 'C';
        if (lower === 'cpp' || lower === 'c++') return 'C++';
        if (lower === 'java') return 'Java';
        if (lower === 'python' || lower === 'py') return 'Python';
        if (lower === 'javascript' || lower === 'js') return 'JavaScript';
        return 'Python'; // Fallback
    };

    const initialLanguage = getLanguageFromParam(langParam);

    // Safe decode with fallback for malformed URIs
    let initialCode;
    if (sourceParam) {
        try {
            initialCode = decodeURIComponent(sourceParam);
        } catch (error) {
            console.warn('Failed to decode source param, using raw value:', error);
            // If decoding fails, try using the raw source
            initialCode = sourceParam;
        }
    }

    useEffect(() => {
        feather.replace();

        const checkTheme = () => {
            setIsDark(document.body.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Initialize socket service when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token') || 'anonymous';
        if (!socketService.isConnected) {
            console.log('🔌 Initializing socket service for freeform playground...');
            socketService.connect(token);
        }

        // Listen for connection status changes
        const updateStatus = () => {
            setConnectionStatus(socketService.isConnected ? 'connected' : 'disconnected');
        };

        // Initial status
        updateStatus();

        // Check status periodically
        const statusInterval = setInterval(updateStatus, 2000);

        return () => {
            clearInterval(statusInterval);
        };
    }, []);

    const handleGoBack = () => {
        // Use navigate(-1) to preserve scroll position/history state
        navigate(-1);
    };

    const handleRetryConnection = () => {
        const token = localStorage.getItem('token');
        if (token) {
            socketService.manualReconnect();
        }
    };

    // Theme-aware classes for button appearance
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const cardBorder = isDark ? 'border-gray-700' : 'border-gray-300';
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';

    // Determine Monaco theme based on current theme
    const monacoTheme = isDark ? 'vs-dark' : 'vs-light';

    return (
        <div className="min-h-screen flex flex-col dark-gradient-secondary p-4 sm:p-6 lg:p-8 relative">

            {/* --- GO BACK BUTTON (TOP LEFT) --- */}
            {/* --- GO BACK BUTTON (TOP LEFT) - Hidden on Mobile --- */}
            <button
                onClick={handleGoBack}
                className={`hidden lg:inline-flex absolute top-10 left-4 sm:left-6 lg:left-8 dark-btn-secondary items-center px-4 py-2 rounded-lg text-sm font-medium z-40 border ${cardBorder} ${cardBg} ${textSecondary} hover:${textPrimary}`}
            >
                <i data-feather="arrow-left" className="w-4 h-4 mr-2"></i> Go Back
            </button>

            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col pt-0 lg:pt-12">
                <h1 className="text-xl sm:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                    <button onClick={handleGoBack} className="lg:hidden mr-3 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 18L8 12L14 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <i data-feather="terminal" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-primary-500"></i>
                    <span className="lg:hidden">Freehand Coding</span>
                    <span className="hidden lg:inline">Freehand Coding Playground</span>
                </h1>
                <p className="hidden lg:block text-gray-400 mb-4">Run quick tests and experiments across supported languages (C, Python, Java...) using our real-time compiler service.</p>

                {/* Connection Status Indicator - Hidden on Mobile */}
                <div className="hidden lg:flex mb-4 items-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${connectionStatus === 'connected'
                        ? 'bg-green-600/30 text-green-300'
                        : connectionStatus === 'connecting'
                            ? 'bg-yellow-600/30 text-yellow-300'
                            : 'bg-red-600/30 text-red-300'
                        }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected'
                            ? 'bg-green-400 animate-pulse'
                            : connectionStatus === 'connecting'
                                ? 'bg-yellow-400 animate-pulse'
                                : 'bg-red-400'
                            }`}></div>
                        {connectionStatus === 'connected'
                            ? 'Compiler Connected'
                            : connectionStatus === 'connecting'
                                ? 'Connecting to Compiler...'
                                : 'Compiler Disconnected'
                        }
                    </div>
                    {connectionStatus !== 'connected' && (
                        <button
                            onClick={handleRetryConnection}
                            className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            <i data-feather="refresh-cw" className="w-3 h-3 mr-1"></i> Retry
                        </button>
                    )}
                </div>

                {/* Editor fills the height of the container */}
                <div className="flex-grow min-h-0 h-[calc(100vh-14rem)] lg:h-[calc(100vh-10rem)]">
                    <CodeEditor
                        theme={monacoTheme}
                        initialCode={initialCode}
                        language={initialLanguage}
                    />
                </div>
            </div>

            {/* FAB Button to Problems */}
            <Link
                to="/problems"
                className="fixed bottom-6 right-6 dark-btn inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium z-50"
            >
                <i data-feather="book" className="w-4 h-4 mr-2"></i> Browse Problems
            </Link>
        </div>
    );
};

export default Code;