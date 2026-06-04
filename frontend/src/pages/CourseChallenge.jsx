import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPracticeProblemById, runPracticeProblem, submitPracticeProblem } from '../api/courseApi.js';
import Loader from '../components/common/Loader.jsx';
import CodeEditorForSolvePage from '../components/problems/CodeEditorForSolvePage.jsx';
import { ProblemManager } from '../utils/problemManager.js';
import * as feather from 'feather-icons';

// Constants
const CHALLENGE_DURATION_SECONDS = 300; // 5 minutes

// Icon Helper
const Icon = ({ name, className = '' }) => {
    if (!name || !feather.icons[name]) return null;
    const svg = feather.icons[name].toSvg({ class: className });
    return <span dangerouslySetInnerHTML={{ __html: svg }} className="flex items-center" />;
};

const CourseChallenge = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);

    // Data State
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Logic State
    const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION_SECONDS);
    const [code, setCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState(null);
    const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'solution'
    const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);

    // Status State
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSolved, setIsSolved] = useState(false);

    // Formatting Helper
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // 1. Fetch Problem & Init
    useEffect(() => {
        const loadProblem = async () => {
            if (!problemId) return;
            try {
                const data = await getPracticeProblemById(problemId);
                setProblem(data);

                const progress = ProblemManager.initializeProblemData(problemId);
                const savedCode = progress.userCode;
                const cBoilerplate = `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    printf("Hello World");\n    return 0;\n}`;

                // Detection: If saved code looks like Java (which was the bug), ignore it.
                let initialCode = data.starter_code || cBoilerplate;
                if (savedCode) {
                    const isJava = savedCode.includes('public class') || savedCode.includes('System.out.println');
                    if (!isJava) {
                        initialCode = savedCode;
                    }
                }

                setCode(initialCode);

                if (progress.solved) {
                    setIsSolved(true);
                    setIsSolutionUnlocked(true);
                    setTimeLeft(0);
                    setConsoleOutput({
                        type: 'success',
                        text: '🎉 You have already solved this problem.\nYou can view the solution or try again.'
                    });
                }

            } catch (error) {
                console.error("Failed to load challenge:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProblem();
    }, [problemId]);

    // 2. Timer Logic (Local Countdown)
    useEffect(() => {
        // If loading, or solved (and we want to stop timer), do nothing.
        // But for "Challenge", we might want the timer to run anyway unless solved?
        // Let's stop it if solved to show "Done".
        if (loading || isSolved || timeLeft <= 0) {
            if (timeLeft <= 0 && !isSolutionUnlocked) setIsSolutionUnlocked(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsSolutionUnlocked(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, isSolved, timeLeft, isSolutionUnlocked]);


    // 3. Actions
    const handleRun = async () => {
        if (!editorRef.current) return;
        setIsRunning(true);
        setConsoleOutput({ type: 'info', text: 'Compiling and Running...' });

        try {
            const currentCode = editorRef.current.getCode();
            const result = await runPracticeProblem(problemId, currentCode, problem?.language || 'C');

            if (!result.success) {
                setConsoleOutput({ type: 'error', text: result.error || result.message || 'Execution failed.' });
            } else {
                setConsoleOutput({
                    type: 'success',
                    text: result.output ? result.output.toString() : 'No output returned.'
                });
            }
        } catch (e) {
            setConsoleOutput({ type: 'error', text: `Execution Failed: ${e.message}` });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (!editorRef.current) return;
        setIsSubmitting(true);
        setConsoleOutput({ type: 'info', text: 'Submitting solution...' });

        try {
            const currentCode = editorRef.current.getCode();
            const result = await submitPracticeProblem(problemId, currentCode, problem?.language || 'C');

            if (result.isSolved) {
                setIsSolved(true);
                setIsSolutionUnlocked(true);
                ProblemManager.markAsSolved(problemId);
                // Invalidate dashboard cache so UserHomePage re-fetches stats
                sessionStorage.setItem('invalidate_dashboard_cache', 'true');
                setConsoleOutput({ type: 'success', text: '🎉 Correct Answer! Challenge Completed!\nYou can now view the Solution tab.' });
            } else {
                let errorMsg = '❌ Wrong Answer.';
                if (result.failureDetails && result.failureDetails.expected && result.failureDetails.actual) {
                    errorMsg += `\nExpected: [${result.failureDetails.expected}]\nActual:   [${result.failureDetails.actual}]`;
                } else if (!result.error) {
                    errorMsg += ' Please check your logic and try again.';
                }
                setConsoleOutput({ type: 'error', text: errorMsg });
            }
        } catch (e) {
            setConsoleOutput({ type: 'error', text: `Submission Error: ${e.message}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loader />;
    if (!problem) return <div className="text-white text-center mt-20">Problem Not Found</div>;

    return (
        <div className="h-screen flex flex-col bg-[#0F172A] text-gray-300 font-sans overflow-hidden">
            {/* --- HEADER --- */}
            <header className="h-14 bg-[#1E293B] border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700/50"
                    >
                        <Icon name="arrow-left" className="w-4 h-4" />
                        Back
                    </button>
                    <div className="h-6 w-px bg-gray-700"></div>
                    <h1 className="font-semibold text-white tracking-wide text-sm sm:text-base flex items-center gap-2">
                        <Icon name="code" className="w-4 h-4 text-blue-400" />
                        {problem.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${timeLeft <= 60 && !isSolved ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                        <Icon name="clock" className="w-4 h-4" />
                        <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT PANEL (Problem/Solution) */}
                <div className="w-4/12 flex flex-col border-r border-gray-700 bg-[#0F172A]">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-700 bg-[#1E293B]">
                        <button
                            onClick={() => setActiveTab('problem')}
                            className={`flex-1 py-4 text-sm font-medium transition-all relative ${activeTab === 'problem'
                                ? 'text-blue-400'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            Problem Statement
                            {activeTab === 'problem' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                            )}
                        </button>
                        <button
                            onClick={() => isSolutionUnlocked && setActiveTab('solution')}
                            disabled={!isSolutionUnlocked}
                            className={`flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-2 ${activeTab === 'solution'
                                ? 'text-green-400'
                                : isSolutionUnlocked
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-600 cursor-not-allowed opacity-50'
                                }`}
                        >
                            Solution
                            {!isSolutionUnlocked && <Icon name="lock" className="w-3 h-3" />}
                            {activeTab === 'solution' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700">
                        {activeTab === 'problem' ? (
                            <div className="space-y-6 animate-fadeIn">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 text-center">{problem.title}</h2>
                                    <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {problem.description /* DB col is description, not problemStatement */}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-4 text-left">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Input Format</h3>
                                        <code className="text-sm text-blue-300 font-mono block whitespace-pre-wrap">{problem.input_format || "None"}</code>
                                    </div>
                                    <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-4 text-left">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Output Format</h3>
                                        <code className="text-sm text-green-300 font-mono block whitespace-pre-wrap">{problem.output_format || "Standard Output"}</code>
                                    </div>
                                    {problem.hints && problem.hints.length > 0 && (
                                        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-4 text-left">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hints</h3>
                                            <ul className="list-disc list-inside text-sm text-yellow-300 space-y-1">
                                                {Array.isArray(problem.hints)
                                                    ? problem.hints.map((h, i) => <li key={i}>{h}</li>)
                                                    : <li>{problem.hints}</li>
                                                }
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-lg">
                                    <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                        <Icon name="check-circle" className="w-5 h-5" />
                                        Detailed Explanation
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        {problem.description || "Review the reference solution below."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Icon name="code" className="w-4 h-4 text-blue-400" />
                                        Implementation logic
                                    </h3>
                                    <div className="relative group">
                                        <pre className="bg-[#0b1120] p-4 rounded-lg border border-gray-700 overflow-x-auto text-sm font-mono text-blue-100 shadow-inner text-left">
                                            <code>{problem.solution_code || "// Solution code not available yet."}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL (Editor & Console) */}
                <div className="flex-1 flex flex-col bg-[#1E1E2E]">
                    {/* Editor Code Area */}
                    <div className="flex-1 relative overflow-hidden">
                        <CodeEditorForSolvePage
                            ref={editorRef}
                            initialCode={code}
                            language="c"
                            theme="vs-dark"
                            onChange={(val) => setCode(val)}
                        />
                    </div>

                    {/* ACTION BAR (Fixed between Editor and Console) */}
                    <div className="h-16 flex items-center justify-between px-6 bg-[#1E293B] border-t border-gray-700 shrink-0 select-none shadow-lg z-10">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                            <Icon name="terminal" className="w-3.5 h-3.5" />
                            {consoleOutput ? 'Console Output' : 'Console Ready'}
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm transition-all flex items-center gap-2 disabled:opacity-50 hover:shadow-lg focus:ring-2 focus:ring-gray-500/50"
                            >
                                {isRunning ? <Icon name="loader" className="w-4 h-4 animate-spin" /> : <Icon name="play" className="w-4 h-4" />}
                                Run Code
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isRunning || isSubmitting}
                                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 hover:shadow-xl focus:ring-2 transform active:scale-95 ${isSolved
                                    ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20 focus:ring-green-500/50'
                                    : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 focus:ring-blue-500/50'
                                    }`}
                            >
                                {isSubmitting ? <Icon name="loader" className="w-4 h-4 animate-spin" /> : isSolved ? <Icon name="check" className="w-4 h-4" /> : <Icon name="send" className="w-4 h-4" />}
                                {isSolved ? 'Solved!' : isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                    {/* CONSOLE OUTPUT DRAWER (Collapsible below Action Bar) */}
                    <div className={`bg-[#0F172A] border-t border-gray-800 transition-all duration-300 ease-in-out flex flex-col ${consoleOutput ? 'h-[35%]' : 'h-0'}`}>
                        {consoleOutput && (
                            <div className="flex-1 flex flex-col overflow-hidden relative group">
                                <button
                                    onClick={() => setConsoleOutput(null)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-white p-1 rounded-md hover:bg-gray-800 transition-colors z-10"
                                    title="Close Console"
                                >
                                    <Icon name="x" className="w-4 h-4" />
                                </button>

                                <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300 whitespace-pre-wrap selection:bg-blue-500/30 text-left">
                                    {consoleOutput.text}
                                    {/* Debug Hint if empty */}
                                    {consoleOutput.text === "No output returned." && (
                                        <div className="mt-4 p-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-yellow-200 text-xs">
                                            Run Check: No standard output found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseChallenge;
