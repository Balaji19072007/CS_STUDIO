import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as feather from '../util/featherIcons';
import { buildApiUrl } from '../config/api.js';
import { ChallengeSkeleton } from '../components/common/SkeletonLoader';
import { setupCompilerSocket, sendCodeForExecution, sendInputToProgram, stopCodeExecution } from '../api/problemApi.js';
import socketService from '../services/socketService.js';



const getSolvedTopicKey = (topicId) => `course_challenge_solved_${topicId}`;

const useFloatingNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
        window.setTimeout(() => setNotification(null), 4200);
    }, []);

    return [notification, showNotification];
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const Icon = ({ name, className = '' }) => {
    if (!name || !feather.icons[name]) {
        return null;
    }

    return <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`} dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg({ class: 'w-full h-full' }) }} />;
};

const processBackspaces = (previous, incoming) => {
    const combined = previous + incoming;
    const output = [];

    for (let index = 0; index < combined.length; index += 1) {
        const character = combined[index];
        if (character === '\b') {
            if (output.length > 0) {
                output.pop();
            }
        } else {
            output.push(character);
        }
    }

    return output.join('');
};

const CourseChallengePage = ({ challengeId: challengeIdOverride = null }) => {
    const { challengeId: routeChallengeId } = useParams();
    const challengeId = challengeIdOverride || routeChallengeId;
    const navigate = useNavigate();
    const location = useLocation();

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [mobileSubTab, setMobileSubTab] = useState('code');
    const [code, setCode] = useState('');
    const [cmdArgs, setCmdArgs] = useState('');
    const [output, setOutput] = useState('Compile and run your code to see output...');
    const [isSolved, setIsSolved] = useState(false);
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    // Terminal execution states
    const [isWaitingForInput, setIsWaitingForInput] = useState(false);
    const terminalRef = useRef(null);
    const lockedOutputRef = useRef('');
    const inputBufferRef = useRef('');
    const isInputActiveRef = useRef(false);
    const inputReadyTimerRef = useRef(null);
    const [userTyping, setUserTyping] = useState('');
    const [isInputReady, setIsInputReady] = useState(false);
    
    const [error, setError] = useState(null);
    const [outputError, setOutputError] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);
    const [notification, showFloatingNotification] = useFloatingNotification();

    const LOCK_TIME_SECONDS = 300;

    const fetchChallenge = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(buildApiUrl(`/api/course-challenges/${challengeId}`), {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to fetch challenge');
            }

            if (data.hints && typeof data.hints === 'string') {
                try {
                    data.hints = JSON.parse(data.hints);
                } catch {
                    data.hints = data.hints.split('\n').filter((hint) => hint.trim());
                }
            }

            if (!Array.isArray(data.hints)) {
                data.hints = data.hints ? [data.hints] : [];
            }

            setChallenge(data);
            setIsSolved(Boolean(data.solved));
            const savedCode = localStorage.getItem(`course_challenge_code_${challengeId}`);
            setCode(
                savedCode || data.starter_code ||
                '#include <stdio.h>\n\nint main() {\n    /* Write your code here. */\n    return 0;\n}'
            );
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    }, [challengeId]);

    useEffect(() => {
        fetchChallenge();

        const startTimeKey = `course_challenge_start_${challengeId}`;
        let startTime = parseInt(localStorage.getItem(startTimeKey), 10);
        if (!startTime || isNaN(startTime)) {
            startTime = Date.now();
            localStorage.setItem(startTimeKey, startTime.toString());
        }

        // Initialize elapsed time immediately
        const initialElapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeElapsed(initialElapsed);
        if (initialElapsed >= LOCK_TIME_SECONDS) {
            setIsSolutionUnlocked(true);
        }

        const interval = window.setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            setTimeElapsed(elapsedSeconds);
            if (elapsedSeconds >= LOCK_TIME_SECONDS) {
                setIsSolutionUnlocked(true);
            }
        }, 1000);

        return () => window.clearInterval(interval);
    }, [fetchChallenge, challengeId]);

    // WebSocket execution setup
    useEffect(() => {
        const token = localStorage.getItem('token') || 'anonymous';
        if (!socketService.isConnected) {
            socketService.connect(token);
        }

        setupCompilerSocket((newOutput, isError, isRunningState, isWaitingInput) => {
            if (isWaitingInput !== undefined) {
                setIsWaitingForInput(isWaitingInput);
                isInputActiveRef.current = isWaitingInput;
            }

            if (isRunningState === false) {
                setIsWaitingForInput(false);
                isInputActiveRef.current = false;
            }

            if (isError) {
                setOutputError(true);
                setOutput(prev => prev + newOutput);
            } else {
                setOutput(prev => {
                    if (prev === 'Compile and run your code to see output...' || prev === 'Running...\n') {
                        return newOutput;
                    }
                    return processBackspaces(prev, newOutput);
                });
            }

            if (isRunningState !== undefined) {
                setRunning(Boolean(isRunningState));
            }
        });

        return () => {
            socketService.removeCompilerListeners();
            const socket = socketService.socket;
            if (socket) {
                socket.off('connect_error');
                socket.off('disconnect');
            }
        };
    }, []);

    // Debounced lock: waits 150ms after last output chunk before locking boundary.
    // Also watches `output` so multi-input programs re-lock for subsequent prompts.
    useEffect(() => {
        if (isWaitingForInput) {
            if (inputReadyTimerRef.current) clearTimeout(inputReadyTimerRef.current);
            setIsInputReady(false);
            setUserTyping('');
            inputReadyTimerRef.current = setTimeout(() => {
                if (terminalRef.current) {
                    const currentVal = terminalRef.current.value;
                    lockedOutputRef.current = currentVal;
                    setIsInputReady(true);
                    terminalRef.current.focus();
                    terminalRef.current.setSelectionRange(currentVal.length, currentVal.length);
                }
            }, 150);
        } else {
            if (inputReadyTimerRef.current) clearTimeout(inputReadyTimerRef.current);
            setIsInputReady(false);
            setUserTyping('');
        }
        return () => {
            if (inputReadyTimerRef.current) clearTimeout(inputReadyTimerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWaitingForInput, output]);

    // Inline terminal textarea handlers
    const handleTerminalChange = useCallback((e) => {
        if (!isWaitingForInput || !isInputReady) return;
        const newVal = e.target.value;
        const locked = lockedOutputRef.current;
        if (newVal.startsWith(locked)) {
            setUserTyping(newVal.slice(locked.length).replace(/\n/g, ''));
        }
    }, [isWaitingForInput, isInputReady]);

    const handleTerminalKeyDown = useCallback((e) => {
        if (!isWaitingForInput || !isInputReady) return;
        if (e.key === 'Enter') {
            e.preventDefault();
            const input = userTyping;
            if (socketService.isConnected) {
                sendInputToProgram(input);
                const newOutput = lockedOutputRef.current + input + '\n';
                lockedOutputRef.current = newOutput;
                setOutput(newOutput);
                setUserTyping('');
                inputBufferRef.current = '';
                isInputActiveRef.current = true;
            }
        }
    }, [isWaitingForInput, isInputReady, userTyping]);


    const handleOutput = (nextOutput, isError) => {
        setOutput((previous) => {
            if (previous === 'Compile and run your code to see output...') {
                return nextOutput;
            }
            return processBackspaces(previous, nextOutput);
        });
        setOutputError(isError);
    };

    const handleRunCode = () => {
        if (!code.trim()) {
            showFloatingNotification('Please write some code first.', 'error');
            return;
        }

        if (!socketService.isConnected) {
            showFloatingNotification('Compiler service is disconnected.', 'error');
            return;
        }

        setRunning(true);
        setOutput('Executing code...\n');
        setOutputError(false);
        setIsWaitingForInput(false);
        
        // Use default test arguments if this is the mastery challenge that requires them
        // otherwise let user specify arguments
        const argsToUse = cmdArgs || (challenge?.test_args ? challenge.test_args.join(' ') : '');

        socketService.onNotification((notification) => {
            if (notification.type === 'execution-completed') {
                setRunning(false);
                setIsWaitingForInput(false);
            }
        });

        try {
            sendCodeForExecution(code, challenge?.language?.toLowerCase() || 'c', '', argsToUse);
        } catch (error) {
            handleOutput(`Execution Error: ${error.message}`, true);
            setRunning(false);
        }
    };

    const handleStopExecution = () => {
        if (socketService.isConnected) {
            stopCodeExecution();
        }
        setRunning(false);
        setIsWaitingForInput(false);
        isInputActiveRef.current = false;
    };

    const handleSubmit = async () => {
        if (!code.trim()) {
            showFloatingNotification('Please write some code before submitting.', 'error');
            return;
        }

        setSubmitting(true);
        setOutput('Validating your solution against the challenge requirements...\n');
        setOutputError(false);

        try {
            const response = await fetch(buildApiUrl(`/api/course-challenges/${challengeId}/submit`), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ code, language: challenge?.language || 'C' }),
            });
            const result = await response.json();

            if (result.success) {
                handleOutput(`All test cases passed.`, false);
                setIsSolved(true);

                if (challenge?.topic_id) {
                    const solvedPayload = {
                        challengeId: challenge.id,
                        courseId: challenge.course_id,
                        topicId: challenge.topic_id,
                        solvedAt: new Date().toISOString(),
                    };

                    sessionStorage.setItem(
                        getSolvedTopicKey(challenge.topic_id),
                        JSON.stringify(solvedPayload)
                    );

                    window.dispatchEvent(
                        new CustomEvent('course-challenge-solved', {
                            detail: solvedPayload,
                        })
                    );

                    window.dispatchEvent(
                        new CustomEvent('course-progress-updated', {
                            detail: {
                                courseId: challenge.course_id,
                            },
                        })
                    );
                    
                    sessionStorage.setItem('invalidate_dashboard_cache', 'true');
                }

                showFloatingNotification('Challenge completed successfully.', 'success');
            } else {
                let failureMessage = `Validation failed: ${result.message || 'Solution failed'}\n\n`;
                if (result.output) {
                    failureMessage += `Your Output:\n${result.output}`;
                }
                if (result.expected) {
                    failureMessage += `\n\nExpected Output:\n${result.expected}`;
                }
                if (result.error) {
                    failureMessage += `\n\nError Detail:\n${result.error}`;
                }

                handleOutput(failureMessage, true);
                showFloatingNotification('The submission did not pass yet.', 'error');
            }
        } catch (submitError) {
            handleOutput(`Submission Error: ${submitError.message}`, true);
            showFloatingNotification('Submitting the solution failed.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        const javaDefault = 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
        const cDefault = '#include <stdio.h>\n\nint main(void) {\n    /* Write your code here. */\n    return 0;\n}';
        const lang = (challenge?.language || '').toLowerCase();
        const defaultCode = challenge?.starter_code || (lang === 'java' ? javaDefault : cDefault);
        setCode(defaultCode);
        localStorage.setItem(`course_challenge_code_${challengeId}`, defaultCode);
        setOutput('Compile and run your code to see output...');
        setOutputError(false);
        showFloatingNotification('Code reset to the starter template.', 'info');
    };


    const summaryCards = useMemo(
        () => [
            {
                label: 'Input',
                value: challenge?.input_format || 'No input required.',
            },
            {
                label: 'Output',
                value: challenge?.output_format || 'Print the exact required result.',
            },
            {
                label: 'Hints',
                value: Array.isArray(challenge?.hints) && challenge.hints.length > 0
                    ? `${challenge.hints.length} hint${challenge.hints.length > 1 ? 's' : ''} available`
                    : 'No hints provided',
            },
        ],
        [challenge]
    );

    if (loading) {
        return <ChallengeSkeleton />;
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0F172A] text-red-500 dark:text-red-400">
                <div className="text-center">
                    <div className="mb-4 text-5xl">!</div>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[100dvh] pb-16 lg:pb-0 lg:h-screen flex-col overflow-hidden bg-gray-50 dark:bg-[#0F172A]">
            {notification ? (
                <div
                    className={`fixed right-4 top-4 z-50 rounded-lg p-4 text-sm font-medium text-white shadow-xl ${notification.type === 'success'
                            ? 'bg-green-600'
                            : notification.type === 'error'
                                ? 'bg-red-600'
                                : 'bg-blue-600'
                        }`}
                >
                    <div className="flex items-center">
                        <Icon
                            name={
                                notification.type === 'success'
                                    ? 'check-circle'
                                    : notification.type === 'error'
                                        ? 'x-octagon'
                                        : 'info'
                            }
                            className="mr-3 h-5 w-5"
                        />
                        <span>{notification.message}</span>
                    </div>
                </div>
            ) : null}

            <div className="relative z-10 flex flex-none flex-row items-center justify-between w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => navigate(location.state?.from || '/courses')}
                        className="flex items-center justify-center p-2 sm:w-10 sm:h-10 rounded-lg sm:border border-transparent sm:border-gray-200 dark:sm:border-gray-700 bg-transparent sm:bg-white dark:sm:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        title="Back to Course"
                    >
                        <Icon name="arrow-left" className="h-5 w-5 sm:h-5 sm:w-5" />
                    </button>
                    <div className="mx-1 hidden h-6 w-px bg-gray-300 dark:bg-gray-700 sm:block"></div>
                    <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate max-w-[140px] sm:max-w-none">{challenge.title}</h1>
                </div>

                <div className="flex items-center">
                    {isSolved ? (
                        <div className="flex items-center rounded-full border border-green-500/50 bg-green-100 dark:bg-green-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-green-700 dark:text-green-500 whitespace-nowrap">
                            <Icon name="check-circle" className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Solved
                        </div>
                    ) : isSolutionUnlocked ? (
                        <div className="flex items-center rounded-full border border-blue-500/50 bg-blue-100 dark:bg-blue-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                            <Icon name="unlock" className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Unlocked
                        </div>
                    ) : (
                        <div className="flex items-center rounded-full border border-yellow-500/50 bg-yellow-100 dark:bg-yellow-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-yellow-700 dark:text-yellow-400 whitespace-nowrap">
                            <Icon name="clock" className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            {formatTime(Math.max(0, LOCK_TIME_SECONDS - timeElapsed))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-0 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-0 overflow-hidden px-0 py-0 lg:flex-row lg:gap-6 lg:px-8 lg:py-6">
                {/* MOBILE TAB BAR */}
                <div className="lg:hidden flex border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm shrink-0">
                    {['overview', 'code', 'hints', 'solution'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab === 'solution' && !isSolutionUnlocked && !isSolved ? 'Solution 🔒' : tab}
                        </button>
                    ))}
                </div>

                {/* LEFT COLUMN */}
                <div className={`flex-1 lg:flex-none h-full flex-col overflow-hidden border-t-0 lg:border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl lg:w-[46%] lg:rounded-xl ${activeTab === 'code' ? 'hidden lg:flex' : 'flex'}`}>
                    {/* DESKTOP TABS */}
                    <div className="hidden lg:flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2 lg:px-0">
                        {['overview', 'hints', 'solution'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab === 'code' ? 'overview' : tab)}
                                className={`flex-1 border-b-2 py-4 text-sm font-medium uppercase tracking-wider transition-all ${(activeTab === tab || (activeTab === 'code' && tab === 'overview'))
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {tab === 'solution' && !isSolutionUnlocked && !isSolved ? 'Solution (locked)' : tab}
                            </button>
                        ))}
                    </div>

                    <div className="custom-scrollbar flex-1 overflow-y-auto p-6 text-left text-gray-800 dark:text-gray-200">
                        {activeTab === 'overview' ? (
                            <div className="space-y-6">
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Challenge Brief</h3>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">{challenge.description}</p>
                                </div>

                                <div className="grid gap-4">
                                    {summaryCards.map((card) => (
                                        <div key={card.label} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-5">
                                            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{card.label}</h4>
                                            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{card.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {activeTab === 'hints' ? (
                            <div className="space-y-4">
                                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Helpful Hints</h3>
                                {challenge.hints && challenge.hints.length > 0 ? (
                                    <div className="space-y-4">
                                        {challenge.hints.map((hint, index) => (
                                            <div key={hint} className="rounded-r-xl border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 p-5">
                                                <div className="flex items-start gap-4">
                                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 dark:bg-yellow-500/20 font-bold text-yellow-700 dark:text-yellow-400">
                                                        {index + 1}
                                                    </span>
                                                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">{hint}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-gray-500">No hints available for this challenge.</div>
                                )}
                            </div>
                        ) : null}

                        {activeTab === 'solution' ? (
                            <div>
                                {isSolutionUnlocked || isSolved ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-50 dark:bg-blue-900/20 p-5 text-blue-700 dark:text-blue-300">
                                            <Icon name="unlock" className="h-5 w-5" />
                                            <h4 className="text-lg font-bold">Solution Unlocked</h4>
                                        </div>
                                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Solution Code</h4>
                                            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-300">{challenge.solution_code || 'Not available'}</pre>
                                        </div>
                                        {challenge.reference_output ? (
                                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Expected Output</h4>
                                                <pre className="font-mono text-sm text-gray-800 dark:text-gray-300">{challenge.reference_output}</pre>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
                                        <div className="text-6xl text-gray-300 dark:text-gray-700">Locked</div>
                                        <div>
                                            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Solution Locked</h3>
                                            <p className="mb-6 text-gray-600 dark:text-gray-400">The solution will unlock in:</p>
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-500">{formatTime(Math.max(0, LOCK_TIME_SECONDS - timeElapsed))}</div>
                                        </div>
                                        <p className="mt-4 max-w-sm text-gray-500">
                                            Give the challenge a real attempt first. The learning value is strongest when you try to solve it yourself.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={`mt-0 lg:mt-0 flex-1 lg:flex-none h-full w-full flex-col gap-0 lg:gap-4 lg:h-full lg:w-[54%] ${activeTab === 'code' ? 'flex' : 'hidden lg:flex'}`}>
                    
                    {/* MOBILE CODE TOPBAR */}
                    <div className="lg:hidden flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMobileSubTab('code')}
                                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileSubTab === 'code'
                                    ? 'border border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                main.{challenge?.language?.toLowerCase() || 'c'}
                            </button>
                            <button
                                onClick={() => setMobileSubTab('output')}
                                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileSubTab === 'output'
                                    ? 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                    : 'border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                Output
                            </button>
                        </div>
                        <button
                            onClick={handleRunCode}
                            disabled={running || submitting}
                            className={`flex-none px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center justify-center ${running || submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {running || submitting ? <Icon name="loader" className="h-4 w-4 animate-spin" /> : <Icon name="play" className="h-4 w-4" />}
                        </button>
                    </div>

                    <div className={`relative flex flex-1 flex-col overflow-hidden border-t-0 lg:border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl lg:rounded-xl ${mobileSubTab === 'code' ? 'flex' : 'hidden lg:flex'}`}>
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Icon name="code" className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                <span className="text-sm font-semibold text-gray-800 dark:text-white">C Playground</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleReset}
                                    className="rounded-md p-1.5 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
                                    title="Reset Code"
                                >
                                    <Icon name="refresh-cw" className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(code).then(() => showFloatingNotification('Code copied to clipboard.', 'success'))}
                                    className="rounded-md p-1.5 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
                                    title="Copy Code"
                                >
                                    <Icon name="copy" className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <Editor
                                height="100%"
                                language="c"
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => {
                                    const val = value || '';
                                    setCode(val);
                                    localStorage.setItem(`course_challenge_code_${challengeId}`, val);
                                }}
                                options={{
                                    fontSize: 14,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    minimap: { enabled: false },
                                    wordWrap: 'on',
                                    padding: { top: 16 },
                                    scrollbar: { vertical: 'visible', horizontal: 'visible' },
                                    lightbulb: { enabled: false },
                                    quickSuggestions: false
                                }}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
                            <div className="flex items-center gap-2 flex-1 max-w-sm">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                    <Icon name="terminal" className="w-4 h-4" />
                                </div>
                                <input 
                                    type="text" 
                                    value={cmdArgs} 
                                    onChange={(e) => setCmdArgs(e.target.value)}
                                    placeholder="Command-line args (e.g., arg1 arg2)"
                                    className="flex-1 w-full px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                                    disabled={running || submitting}
                                />
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 justify-end hidden lg:flex">
                            {running && (
                                <button
                                    onClick={handleStopExecution}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 shadow-lg"
                                >
                                    <Icon name="square" className="h-4 w-4" />
                                    <span>Stop</span>
                                </button>
                            )}
                            <button
                                onClick={handleRunCode}
                                disabled={running || submitting}
                                className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 px-5 py-2 text-sm font-medium text-gray-800 dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                            >
                                {running ? <Icon name="loader" className="h-4 w-4 animate-spin" /> : <Icon name="play" className="h-4 w-4" />}
                                <span>{running ? 'Running...' : 'Run'}</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={running || submitting || isSolved}
                                className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-lg transition-colors disabled:opacity-50 ${isSolved ? 'cursor-default bg-green-600' : 'bg-blue-600 hover:bg-blue-500'
                                    }`}
                            >
                                {submitting ? (
                                    <Icon name="loader" className="h-4 w-4 animate-spin" />
                                ) : isSolved ? (
                                    <Icon name="check" className="h-4 w-4" />
                                ) : (
                                    <Icon name="send" className="h-4 w-4" />
                                )}
                                <span>{isSolved ? 'Solved' : submitting ? 'Submitting...' : 'Submit'}</span>
                            </button>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-1 lg:flex-none h-full lg:h-64 flex-col overflow-hidden border-t-0 lg:border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1E1E1E] shadow-xl lg:rounded-xl ${mobileSubTab === 'output' ? 'flex' : 'hidden lg:flex'}`}>
                        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2">
                            <Icon name="terminal" className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300">Console Output</span>
                            {isWaitingForInput && (
                                <span className="text-yellow-600 dark:text-yellow-400 text-xs font-semibold ml-2">(Waiting for input...)</span>
                            )}
                            <div className="ml-auto lg:hidden">
                                {running && (
                                    <button
                                        onClick={handleStopExecution}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700 shadow-sm"
                                    >
                                        <Icon name="square" className="h-3 w-3" />
                                        <span>Stop</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <textarea
                            ref={terminalRef}
                            value={output + (isWaitingForInput && isInputReady ? userTyping : '')}
                            readOnly={!isWaitingForInput || !isInputReady}
                            onChange={handleTerminalChange}
                            onKeyDown={handleTerminalKeyDown}
                            onClick={() => {
                                if (isWaitingForInput && isInputReady && terminalRef.current) {
                                    terminalRef.current.focus();
                                    const len = terminalRef.current.value.length;
                                    terminalRef.current.setSelectionRange(len, len);
                                }
                            }}
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            enterKeyHint="send"
                            className={`custom-scrollbar flex-1 w-full p-4 text-left font-mono text-sm resize-none outline-none
                                ${outputError ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}
                                ${isWaitingForInput && isInputReady ? 'ring-1 ring-yellow-500' : ''}
                                bg-transparent`}
                            style={{
                                caretColor: isWaitingForInput && isInputReady ? '#fbbf24' : 'transparent',
                            }}
                        />

                        <div className="lg:hidden p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                             <button
                                onClick={handleSubmit}
                                disabled={running || submitting || isSolved}
                                className={`w-full flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-colors disabled:opacity-50 ${isSolved ? 'cursor-default bg-green-600' : 'bg-blue-600 hover:bg-blue-500'
                                    }`}
                            >
                                {submitting ? (
                                    <Icon name="loader" className="h-4 w-4 animate-spin" />
                                ) : isSolved ? (
                                    <Icon name="check" className="h-4 w-4" />
                                ) : (
                                    <Icon name="send" className="h-4 w-4" />
                                )}
                                <span>{isSolved ? 'Solved' : submitting ? 'Submitting...' : 'Submit Challenge'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `,
                }}
            />
        </div>
    );
};

export default CourseChallengePage;

