import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getQuiz, getQuizQuestionsWithOptions, submitQuizAttempt, getUserQuizAttempts } from '../api/quizApi';
import { updateCourseProgress } from '../api/progressApi';
import { useAuth } from '../hooks/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { QuizSkeleton } from '../components/common/SkeletonLoader';
import QuizTimer from '../components/learning/QuizTimer';
import QuestionNavigator from '../components/learning/QuestionNavigator';
import QuizAchievementBadge from '../components/learning/QuizAchievementBadge';
import QuizReviewMode from '../components/learning/QuizReviewMode';
import { ErrorPage } from '../components/common/ErrorPages';

const QuizPage = ({ embedded = false, quizId = null, onNext, onPrevious, isFirst, isLast }) => {
    const { courseId, quizId: paramQuizId } = useParams();
    const { user } = useAuth();
    const resolvedQuizId = quizId || paramQuizId;
    const navigate = useNavigate();

    // States: 'IDLE', 'RUNNING', 'COMPLETED'
    const [gameState, setGameState] = useState('IDLE');
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [history, setHistory] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false); // Toggle review mode
    const [warnings, setWarnings] = useState(0);
    const [violationMsg, setViolationMsg] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
    const [timeUp, setTimeUp] = useState(false);
    const [showExplanations, setShowExplanations] = useState({});
    const confettiFiredRef = useRef(false);

    // Initial Data Fetch
    useEffect(() => {
        if (!resolvedQuizId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [quizData, questionsData] = await Promise.all([
                    getQuiz(resolvedQuizId),
                    getQuizQuestionsWithOptions(resolvedQuizId)
                ]);

                setQuiz(quizData);
                setQuestions(questionsData);

                // Fetch History
                if (user) {
                    const attempts = await getUserQuizAttempts(user.id, resolvedQuizId);
                    setHistory(attempts || []);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching quiz:', err);
                setError(err?.message || 'Failed to load quiz');
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedQuizId]);

    // Anti-Cheat & Fullscreen Logic
    useEffect(() => {
        if (gameState !== 'RUNNING') return;

        const handleViolation = (reason) => {
            setWarnings(prev => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    terminateQuiz(`Quiz terminated! Too many violations. Last: ${reason}`);
                    return 0; // Reset
                }
                return newCount;
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation("Switched tabs/windows");
            }
        };

        const handleBlur = () => {
            handleViolation("Left window focus");
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                handleViolation("Exited fullscreen");
            }
        };

        // Disable copy-paste/context menu
        const preventCopy = (e) => { e.preventDefault(); return false; };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('contextmenu', preventCopy);
        document.addEventListener('copy', preventCopy);
        document.addEventListener('cut', preventCopy);
        document.addEventListener('paste', preventCopy);
        document.addEventListener('selectstart', preventCopy); // Disable text selection

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('contextmenu', preventCopy);
            document.removeEventListener('copy', preventCopy);
            document.removeEventListener('cut', preventCopy);
            document.removeEventListener('paste', preventCopy);
            document.removeEventListener('selectstart', preventCopy);
        };
    }, [gameState]);

    const timeLimitMinutes = quiz?.time_limit || 30;

    const handleFlagQuestion = useCallback((index) => {
        setFlaggedQuestions((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    }, []);

    const startQuiz = async () => {
        setViolationMsg(null);
        setAnswers({});
        setResults(null);
        setShowAnswers(false);
        setWarnings(0);
        setCurrentQuestionIndex(0);
        setFlaggedQuestions(new Set());
        setTimeUp(false);
        setShowExplanations({});
        confettiFiredRef.current = false;

        // Enter Fullscreen
        try {
            await document.documentElement.requestFullscreen();
            setGameState('RUNNING');
        } catch (err) {
            console.error("Fullscreen denied:", err);
            alert("Please allow fullscreen to take the quiz.");
        }
    };

    const terminateQuiz = (reason) => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
        setGameState('IDLE');
        setViolationMsg(reason);
        setAnswers({});
        setWarnings(0);
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const fireConfetti = useCallback(() => {
        if (confettiFiredRef.current) return;
        confettiFiredRef.current = true;
        const duration = 2000;
        const end = Date.now() + duration;
        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'],
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    }, []);

    const handleSubmit = async () => {
        if (!user) return alert('Please sign in');

        try {
            setSubmitting(true);

            let correctCount = 0;
            const answerDetails = questions.map(question => {
                const userAnswer = answers[question.id] !== undefined ? answers[question.id] : null;
                let isCorrect = false;

                if (question.question_type === 'true_false') {
                    isCorrect = String(userAnswer) === String(question.correct_answer);
                } else {
                    isCorrect = parseInt(userAnswer) === parseInt(question.correct_answer);
                }

                if (isCorrect) correctCount++;
                return { questionId: question.id, selectedAnswer: userAnswer, isCorrect };
            });

            const score = Math.round((correctCount / questions.length) * 100);
            const passed = score >= (quiz?.pass_percentage ?? 60);

            await submitQuizAttempt(user.id, resolvedQuizId, answerDetails, score, passed);
            await updateCourseProgress(user.id, courseId);

            const attempts = await getUserQuizAttempts(user.id, resolvedQuizId);
            setHistory(attempts || []);

            if (passed) {
                window.dispatchEvent(
                    new CustomEvent('course-progress-updated', {
                        detail: { courseId }
                    })
                );
            }

            setResults({
                score, pass_percentage: quiz?.pass_percentage ?? 60, passed,
                correct: correctCount, incorrect: questions.length - correctCount,
                total: questions.length, answerDetails
            });

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
            setGameState('COMPLETED');

            if (passed) {
                setTimeout(() => fireConfetti(), 300);
            }
        } catch (error) {
            console.error(error);
            alert('Submission failed: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleTimeUp = useCallback(() => {
        setTimeUp(true);
        handleSubmit();
    }, []);

    // --- RENDERERS ---

    const renderStartScreen = () => (
        <div className="max-w-7xl mx-auto px-4 py-8 text-left md:px-8 lg:px-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">{quiz?.title}</h1>

            {violationMsg && (
                <div className="bg-red-500/10 border border-red-500 text-red-700 dark:text-red-200 p-4 rounded-lg mb-8 animate-pulse">
                    ⚠️ {violationMsg}
                </div>
            )}

            <div className="bg-white dark:bg-[#1E293B] rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl mb-10 text-left transition-colors">
                <h3 className="text-xl font-bold text-amber-600 dark:text-yellow-400 mb-4 flex items-center gap-2">
                    ⚠️ Strict Quiz Rules
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 transition-colors">
                    <li className="flex items-start gap-2">🔹 Quiz will launch in <strong className="text-gray-900 dark:text-white">Fullscreen Mode</strong>.</li>
                    <li className="flex items-start gap-2">🔹 <strong>Do NOT switch tabs</strong> or separate windows.</li>
                    <li className="flex items-start gap-2">🔹 <strong>Do NOT exit fullscreen</strong> until finished.</li>
                    <li className="flex items-start gap-2">🔹 Copying, pasting, and text selection are <strong>Disabled</strong>.</li>
                    <li className="flex items-start gap-2">❌ Violation of these rules will <strong>terminate the quiz immediately</strong>.</li>
                </ul>
            </div>

            <button
                onClick={startQuiz}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
            >
                🚀 Start Quiz
            </button>

            {/* History Section */}
            {history.length > 0 && (
                <div className="mt-12 text-left">
                    <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-4 transition-colors">📜 Past Attempts</h3>
                    <div className="bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
                        {history.map((attempt, i) => (
                            <div key={attempt.id} className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Attempt {history.length - i}</span>
                                    <div className="text-xs text-gray-500">{new Date(attempt.completed_at).toLocaleString()}</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${attempt.passed ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                    {attempt.score}% {attempt.passed ? 'PASS' : 'FAIL'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Embedded Navigation */}
            {embedded && (
                <div className="mt-8 sm:mt-12 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6 sm:pt-8 gap-3">
                    {isFirst ? (
                        <div className="hidden sm:block"></div>
                    ) : (
                        <button
                            onClick={onPrevious}
                            className={`rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all whitespace-nowrap border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`}
                        >
                            <span className="hidden sm:inline">Previous Lesson</span>
                            <span className="sm:hidden">Previous</span>
                        </button>
                    )}

                    <button
                        onClick={async () => {
                            const allPassed = history.length > 0 && history.some(h => h.passed);
                            if (allPassed) {
                                if (onNext) {
                                    onNext();
                                }
                            }
                        }}
                        disabled={!(history.length > 0 && history.some(h => h.passed)) || loading}
                        className={`rounded-xl px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${(history.length > 0 && history.some(h => h.passed)) && !loading ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500' : 'cursor-not-allowed bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600'}`}
                    >
                        <span className="hidden sm:inline">{isLast ? 'Finish Course' : 'Continue to Next Lesson'}</span>
                        <span className="sm:hidden">{isLast ? 'Finish' : 'Next'}</span>
                    </button>
                </div>
            )}
        </div>
    );

    const renderActiveQuiz = () => {
        const q = questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        const isFirstQuestion = currentQuestionIndex === 0;
        const progressPct = ((currentQuestionIndex + 1) / questions.length) * 100;

        if (!q) return null;

        return (
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0F172A] select-none text-left">
                <div className="bg-gray-50/90 dark:bg-[#0F172A]/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 transition-colors shrink-0 z-40">
                    <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-xs">{quiz.title}</h2>
                            <QuizTimer
                                totalMinutes={timeLimitMinutes}
                                onTimeUp={handleTimeUp}
                                isRunning={gameState === 'RUNNING'}
                            />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <QuestionNavigator
                                totalQuestions={questions.length}
                                currentIndex={currentQuestionIndex}
                                answers={Object.fromEntries(
                                    questions.map((question, i) => [i, answers[question.id]])
                                )}
                                flaggedQuestions={flaggedQuestions}
                                onNavigate={(i) => setCurrentQuestionIndex(i)}
                            />
                            {warnings > 0 && (
                                <div className="text-red-500 text-[10px] font-bold animate-pulse whitespace-nowrap">
                                    ⚠️ {3 - warnings}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            initial={false}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="bg-white dark:bg-[#1E293B] rounded-xl p-6 md:p-10 border border-gray-200 dark:border-gray-700 shadow-xl transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white flex-1">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold mr-3">Q{currentQuestionIndex + 1}.</span>
                                        {q.question_text}
                                    </h3>
                                    <button
                                        onClick={() => handleFlagQuestion(currentQuestionIndex)}
                                        className={`p-2 rounded-lg shrink-0 transition-colors ${
                                            flaggedQuestions.has(currentQuestionIndex)
                                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                        title={flaggedQuestions.has(currentQuestionIndex) ? 'Unflag question' : 'Flag for review'}
                                    >
                                        <svg className="w-4 h-4" fill={flaggedQuestions.has(currentQuestionIndex) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                        </svg>
                                    </button>
                                </div>

                                {q.code_snippet && (
                                    <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <SyntaxHighlighter language="c" style={vscDarkPlus} customStyle={{ margin: 0, fontSize: '0.9rem' }}>
                                            {q.code_snippet}
                                        </SyntaxHighlighter>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {q.question_type === 'true_false' ? (
                                        ['true', 'false'].map(opt => (
                                            <label key={opt} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                answers[q.id] === opt
                                                    ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md'
                                                    : 'bg-gray-50 dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                            }`}>
                                                <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => handleAnswerChange(q.id, opt)} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-4 capitalize font-semibold text-lg">{opt}</span>
                                            </label>
                                        ))
                                    ) : (
                                        q.options.map((opt, i) => (
                                            <label key={opt.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                answers[q.id] === String(i)
                                                    ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md'
                                                    : 'bg-gray-50 dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                            }`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 shrink-0 ${
                                                    answers[q.id] === String(i)
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <input type="radio" name={q.id} value={i} checked={answers[q.id] === String(i)} onChange={() => handleAnswerChange(q.id, String(i))} className="sr-only" />
                                                <span className="font-semibold text-lg">{opt.option_text}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex justify-between items-center shrink-0 z-30 transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={isFirstQuestion}
                        className={`px-5 sm:px-8 py-2.5 sm:py-3 font-bold rounded-lg transition-all text-sm sm:text-base ${
                            isFirstQuestion
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                        }`}
                    >
                        Previous
                    </motion.button>

                    <div className="flex items-center gap-3">
                        {!isLastQuestion ? (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                className="px-5 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg text-sm sm:text-base"
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="px-5 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 disabled:opacity-50 text-sm sm:text-base"
                            >
                                {submitting ? 'Submitting...' : 'Submit Quiz'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-left md:px-8 lg:px-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`text-center p-8 rounded-2xl border-2 mb-8 transition-colors ${results.passed ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                    className="text-6xl mb-4"
                >
                    {results.passed ? '🎉' : '💪'}
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">
                    {results.passed ? 'Congratulations!' : 'Keep Going!'}
                </h2>

                <div className="flex items-center justify-center gap-3 my-3">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
                        className="text-5xl font-black text-gray-900 dark:text-white transition-colors"
                    >
                        {results.score}%
                    </motion.div>
                    {results.passed && (
                        <QuizAchievementBadge score={results.score} />
                    )}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                    Pass mark: {results.pass_percentage}% · {results.correct}/{results.total} correct
                </p>

                {timeUp && (
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-semibold mt-2">
                        ⏱ Time's up! Your quiz was automatically submitted.
                    </p>
                )}

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-md mx-auto">
                    {[
                        { label: 'Correct', value: results.correct, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-500/10' },
                        { label: 'Incorrect', value: results.incorrect, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
                        { label: 'Total', value: results.total, color: 'text-gray-900 dark:text-white', bg: 'bg-gray-100 dark:bg-gray-800/50' },
                    ].map((stat) => (
                        <div key={stat.label} className={`${stat.bg} p-3 rounded-xl transition-colors`}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                                className={`text-2xl font-bold ${stat.color}`}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
                {!embedded ? (
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setGameState('IDLE')}
                        className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-xl font-bold transition-colors whitespace-nowrap"
                    >
                        Try Again
                    </motion.button>
                ) : (
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        disabled={isLast || !results.passed}
                        className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-bold transition-all shadow-sm whitespace-nowrap ${isLast || !results.passed ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800/50 dark:text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 shadow-lg'}`}
                    >
                        Next Lesson
                    </motion.button>
                )}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="px-6 py-2.5 border-2 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold rounded-xl transition-colors text-sm"
                >
                    {showAnswers ? 'Hide Review' : 'Review Answers'}
                </motion.button>
            </div>

            <AnimatePresence>
                {showAnswers && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <QuizReviewMode questions={questions} results={results} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        );
    };

    if (error) {
        return <ErrorPage title="Failed to load quiz" description={error} onRetry={() => window.location.reload()} />;
    }

    if (loading) return <QuizSkeleton />;

    if (!quiz) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">📝</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Coming Soon</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">This quiz is being prepared. Check back later!</p>
                    <button onClick={() => navigate(`/courses/${courseId}/learn`)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">Back to Course</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors ${gameState === 'RUNNING' ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}>
            <style>{`
                .select-none { user-select: none; -webkit-user-select: none; }
            `}</style>

            {/* Nav (Only visible if NOT running) */}
            {gameState !== 'RUNNING' && (
                <header className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-700/50 px-4 py-3 flex items-center gap-4 transition-colors">
                    <button onClick={() => navigate(`/courses/${courseId}/learn`)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:text-white transition-colors">←</button>
                    <span className="font-bold text-gray-900 dark:text-white transition-colors">{embedded ? 'Quiz' : 'Exit Quiz'}</span>
                </header>
            )}

            {gameState === 'IDLE' && renderStartScreen()}
            {gameState === 'RUNNING' && renderActiveQuiz()}
            {gameState === 'COMPLETED' && renderResults()}
        </div>
    );
};

export default QuizPage;
