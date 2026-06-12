import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as feather from '../util/featherIcons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { buildApiUrl } from '../config/api.js';
import { ChallengeSkeleton } from '../components/common/SkeletonLoader';
import { setupCompilerSocket, sendCodeForExecution, sendInputToProgram, stopCodeExecution } from '../api/problemApi.js';
import socketService from '../services/socketService.js';
import ProjectCalculatorUI from '../components/ProjectCalculatorUI';
import ProjectStudentManagementUI from '../components/ProjectStudentManagementUI';
import ProjectTextEditorUI from '../components/ProjectTextEditorUI';
import { generateCalculatorHTML } from '../utils/projectExporters';

const getSolvedTopicKey = (topicId) => `course_challenge_solved_${topicId}`;

const useFloatingNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
        window.setTimeout(() => setNotification(null), 4200);
    }, []);

    return [notification, showNotification];
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

const ProjectEditorPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [cmdArgs, setCmdArgs] = useState('');
    const [output, setOutput] = useState('Workspace initialized. Compile and run your code to see output...');
    const [isSolved, setIsSolved] = useState(false);
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showCalculatorMode, setShowCalculatorMode] = useState(false);
    const [showStudentManagementMode, setShowStudentManagementMode] = useState(false);
    const [showTextEditorMode, setShowTextEditorMode] = useState(false);
    
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
    const [notification, showFloatingNotification] = useFloatingNotification();

    const fetchChallenge = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(buildApiUrl(`/api/course-challenges/${projectId}`), {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to fetch project details');
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
            const savedCode = localStorage.getItem(`course_challenge_code_${projectId}`);
            setCode(
                savedCode || data.starter_code ||
                '#include <stdio.h>\n\nint main() {\n    /* Write your project logic here. */\n    return 0;\n}'
            );
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchChallenge();
    }, [fetchChallenge]);

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
                    if (prev === 'Workspace initialized. Compile and run your code to see output...' || prev === 'Running...\n') {
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
            if (previous === 'Workspace initialized. Compile and run your code to see output...') {
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
        setOutput('Executing project code...\n');
        setOutputError(false);
        setIsWaitingForInput(false);
        
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

    const handleCheckCode = async () => {
        if (!code.trim()) {
            showFloatingNotification('Please write some code before checking.', 'error');
            return;
        }

        setSubmitting(true);
        setOutput('Checking your logic against project requirements...\n');
        setOutputError(false);

        try {
            const response = await fetch(buildApiUrl(`/api/course-challenges/${projectId}/submit`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ code, language: challenge?.language || 'C' }),
            });
            const result = await response.json();

            if (result.success) {
                handleOutput(`All logic checks passed. Your core logic is correct! You can now run the full project.`, false);
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
                }

                showFloatingNotification('Code check successful! Run Project is now enabled.', 'success');
            } else {
                let failureMessage = `Code Check Failed: ${result.message || 'Solution failed'}\n\n`;
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
                showFloatingNotification('The logic check did not pass.', 'error');
            }
        } catch (submitError) {
            handleOutput(`Check Error: ${submitError.message}`, true);
            showFloatingNotification('Checking the logic failed.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        const javaDefault = 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
        const cDefault = '#include <stdio.h>\n\nint main() {\n    /* Write your project logic here. */\n    return 0;\n}';
        const lang = (challenge?.language || '').toLowerCase();
        const defaultCode = challenge?.starter_code || (lang === 'java' ? javaDefault : cDefault);
        setCode(defaultCode);
        localStorage.setItem(`course_challenge_code_${projectId}`, defaultCode);
        setOutput('Workspace initialized. Compile and run your code to see output...');
        setOutputError(false);
        showFloatingNotification('Workspace reset to the starter template.', 'info');
    };

    const handleDownloadProject = () => {
        const isCalculatorProject = challenge?.id === 18005 || challenge?.title?.toLowerCase().includes('calculator');
        
        if (isCalculatorProject) {
            const htmlContent = generateCalculatorHTML();
            const element = document.createElement("a");
            const file = new Blob([htmlContent], { type: 'text/html' });
            element.href = URL.createObjectURL(file);
            element.download = 'calculator_app.html';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } else {
            const element = document.createElement("a");
            const file = new Blob([code], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            const fileName = challenge?.title ? challenge.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'project';
            element.download = `${fileName}.c`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

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
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-gray-100 dark:bg-[#0F172A] font-sans">
            {notification ? (
                <div
                    className={`fixed right-4 top-4 z-50 rounded-lg p-4 text-sm font-medium text-white shadow-xl ${notification.type === 'success'
                            ? 'bg-emerald-600'
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

            {/* Top Navigation Bar */}
            <div className="relative z-10 flex flex-none items-center justify-between border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-[#1E293B] px-6 py-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(location.state?.from || '/courses')}
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        title="Back to Course"
                    >
                        <Icon name="arrow-left" className="h-5 w-5" />
                    </button>
                    <div className="mx-2 hidden h-6 w-px bg-gray-300 dark:bg-gray-700 sm:block"></div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Project Workspace</div>
                        <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">{challenge.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {isSolved ? (
                        <div className="flex items-center rounded-full border border-emerald-500/50 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                            <Icon name="check-circle" className="mr-2 h-4 w-4" />
                            Logic Verified
                        </div>
                    ) : (
                        <div className="flex items-center rounded-full border border-blue-500/50 bg-blue-100 dark:bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-700 dark:text-blue-400">
                            <Icon name="code" className="mr-2 h-4 w-4" />
                            Writing Logic
                        </div>
                    )}
                </div>
            </div>

            {/* Main Workspace Area */}
            <div className="flex w-full flex-1 flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-6 lg:px-6 lg:py-6 lg:items-stretch">
                
                {/* Left Panel: Project Details & Hints */}
                <div className="flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151F32] shadow-xl lg:w-[38%] rounded-2xl min-h-[500px]">
                    <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-indigo-50/50 dark:bg-indigo-900/20 px-6 py-4 flex-none">
                        <Icon name="book-open" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-sm font-extrabold text-indigo-900 dark:text-indigo-100 uppercase tracking-widest">Project Requirements</h2>
                    </div>
                    
                    <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8 text-left">
                        <div className="prose prose-sm md:prose-base prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-5 prose-li:leading-relaxed prose-ul:my-4 prose-ul:list-disc prose-ul:ml-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:ml-6 prose-strong:text-indigo-700 dark:prose-strong:text-indigo-400">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {(() => {
                                    const parts = challenge.description?.split('<!-- SPLIT -->') || [];
                                    return parts.length > 1 ? parts[1] : parts[0];
                                })()}
                            </ReactMarkdown>
                        </div>
                        
                        {challenge.hints && challenge.hints.length > 0 && (
                            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800/60">
                                <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Hints & Logic Guide</h3>
                                <div className="space-y-4">
                                    {challenge.hints.map((hint, i) => (
                                        <div key={i} className="flex gap-4 text-sm md:text-base text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 shadow-sm">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Icon name="info" className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="leading-relaxed prose prose-sm prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {hint.replace(/\\n/g, '\n')}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Editor, Console, and Action Buttons */}
                <div className="flex w-full flex-col gap-4 lg:w-[62%]">
                    
                    {/* Editor Box */}
                    <div className="relative flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl rounded-2xl min-h-[500px] lg:min-h-[650px]">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E293B] px-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <Icon name="code" className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-sm font-bold tracking-wide text-gray-800 dark:text-white">Logic Editor (C)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleReset}
                                    className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                    title="Reset Code"
                                >
                                    <Icon name="refresh-cw" className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(code).then(() => showFloatingNotification('Code copied to clipboard.', 'success'))}
                                    className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                    title="Copy Code"
                                >
                                    <Icon name="copy" className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1 min-h-0 bg-[#1e1e1e]">
                            <div className="absolute inset-0">
                                <Editor
                                    height="100%"
                                    width="100%"
                                    language="c"
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(value) => {
                                        const val = value || '';
                                        setCode(val);
                                        localStorage.setItem(`course_challenge_code_${projectId}`, val);
                                    }}
                                    options={{
                                        fontSize: 15,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        minimap: { enabled: false },
                                        wordWrap: 'on',
                                        padding: { top: 20 },
                                        scrollbar: { 
                                            vertical: 'visible', 
                                            horizontal: 'visible',
                                            alwaysConsumeMouseWheel: false 
                                        },
                                        lightbulb: { enabled: false },
                                        quickSuggestions: false,
                                        scrollBeyondLastLine: false
                                    }}
                                />
                            </div>
                        </div>

                        {/* Editor Action Bar (Run & Check) */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E293B] px-5 py-4">
                            <div className="flex items-center gap-2 flex-1 max-w-sm">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    <Icon name="terminal" className="w-4 h-4" />
                                </div>
                                <input 
                                    type="text" 
                                    value={cmdArgs} 
                                    onChange={(e) => setCmdArgs(e.target.value)}
                                    placeholder="CLI Args (e.g., arg1 arg2)"
                                    className="flex-1 w-full px-4 py-2 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                                    disabled={running || submitting}
                                />
                            </div>
                            <div className="flex items-center gap-3 justify-end">
                                {running && (
                                    <button
                                        onClick={handleStopExecution}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600 shadow-lg"
                                    >
                                        <Icon name="square" className="h-4 w-4" />
                                        <span>Stop</span>
                                    </button>
                                )}
                                <button
                                    onClick={handleRunCode}
                                    disabled={running || submitting}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 dark:bg-gray-700 px-6 py-2.5 text-sm font-bold text-gray-800 dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                                >
                                    {running ? <Icon name="loader" className="h-4 w-4 animate-spin" /> : <Icon name="play" className="h-4 w-4" />}
                                    <span>{running ? 'Running...' : 'Run Code'}</span>
                                </button>
                                <button
                                    onClick={handleCheckCode}
                                    disabled={running || submitting}
                                    className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-colors disabled:opacity-50 ${isSolved ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                                >
                                    {submitting ? (
                                        <Icon name="loader" className="h-4 w-4 animate-spin" />
                                    ) : isSolved ? (
                                        <Icon name="check-circle" className="h-4 w-4" />
                                    ) : (
                                        <Icon name="check" className="h-4 w-4" />
                                    )}
                                    <span>{isSolved ? 'Verified (Re-check)' : submitting ? 'Checking...' : 'Check Code'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Console & Run Project Button Container */}
                    <div className="flex flex-col gap-4 mb-8">
                        {/* Console Output */}
                        <div className="flex h-64 lg:h-72 flex-col overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] shadow-xl rounded-2xl">
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] px-5 py-2.5">
                                <div className="flex items-center gap-2">
                                    <Icon name="terminal" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-gray-700 dark:text-gray-300">Console Output</span>
                                </div>
                                {isWaitingForInput && (
                                    <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold animate-pulse">Waiting for input...</span>
                                )}
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
                                className={`custom-scrollbar flex-1 w-full p-5 text-left font-mono text-[13px] leading-relaxed resize-none outline-none
                                    ${outputError ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}
                                    ${isWaitingForInput && isInputReady ? 'ring-2 ring-yellow-500/50 ring-inset' : ''}
                                    bg-transparent`}
                                style={{
                                    caretColor: isWaitingForInput && isInputReady ? '#fbbf24' : 'transparent',
                                }}
                            />
                        </div>


                        {/* Download & Run Full Project Buttons */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <button
                                onClick={handleDownloadProject}
                                className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-md w-full md:w-auto justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                            >
                                <Icon name="download" className="h-5 w-5" />
                                <span>Download Code</span>
                            </button>

                            <button
                                disabled={!isSolved}
                                onClick={() => {
                                    if (challenge?.topic_id === 'c-p18-t7') {
                                        setShowTextEditorMode(true);
                                    } else if (challenge?.topic_id === 'c-p18-t6') {
                                        setShowStudentManagementMode(true);
                                    } else {
                                        setShowCalculatorMode(true);
                                    }
                                }}
                                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 shadow-xl w-full md:w-auto justify-center ${
                                    isSolved 
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white transform hover:-translate-y-1 shadow-[0_10px_25px_rgba(16,185,129,0.3)]' 
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-70'
                                }`}
                            >
                                <Icon name="play-circle" className="h-6 w-6" />
                                <span>Run Project</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {showCalculatorMode && (
                <ProjectCalculatorUI 
                    projectId={projectId} 
                    code={code} 
                    onClose={() => setShowCalculatorMode(false)} 
                />
            )}

            {showStudentManagementMode && (
                <ProjectStudentManagementUI 
                    projectId={projectId} 
                    code={code} 
                    onClose={() => setShowStudentManagementMode(false)} 
                />
            )}

            {showTextEditorMode && (
                <ProjectTextEditorUI 
                    projectId={projectId} 
                    code={code} 
                    onClose={() => setShowTextEditorMode(false)} 
                />
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
                .blink { animation: blinker 1s linear infinite; }
                @keyframes blinker { 50% { opacity: 0; } }
            `,
                }}
            />
        </div>
    );
};

export default ProjectEditorPage;

