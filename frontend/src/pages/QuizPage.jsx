import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, getQuizQuestionsWithOptions, submitQuizAttempt, getUserQuizAttempts } from '../api/quizApi';
import { updateCourseProgress } from '../api/progressApi';
import { useAuth } from '../hooks/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { QuizSkeleton } from '../components/common/SkeletonLoader';

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
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false); // Toggle review mode
    const [warnings, setWarnings] = useState(0);
    const [violationMsg, setViolationMsg] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
                    setHistory(attempts);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz:', error);
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

    const startQuiz = async () => {
        setViolationMsg(null);
        setAnswers({});
        setResults(null);
        setShowAnswers(false);
        setWarnings(0);
        setCurrentQuestionIndex(0);

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

    const handleSubmit = async () => {
        if (!user) return alert('Please sign in');

        // Removed strict validation check for unanswered questions

        try {
            setSubmitting(true);

            // Calculate Results
            let correctCount = 0;
            const answerDetails = questions.map(question => {
                const userAnswer = answers[question.id] !== undefined ? answers[question.id] : null;
                let isCorrect = false;

                if (question.question_type === 'true_false') {
                    isCorrect = userAnswer === question.correct_answer;
                } else {
                    isCorrect = parseInt(userAnswer) === parseInt(question.correct_answer);
                }

                if (isCorrect) correctCount++;
                return { questionId: question.id, selectedAnswer: userAnswer, isCorrect };
            });

            const score = Math.round((correctCount / questions.length) * 100);
            const passed = score >= (quiz.pass_percentage || 60);

            // Submit
            await submitQuizAttempt(user.id, resolvedQuizId, answerDetails, score, passed);
            await updateCourseProgress(user.id, courseId);

            // Refresh history
            const attempts = await getUserQuizAttempts(user.id, resolvedQuizId);
            setHistory(attempts);

            if (passed) {
                window.dispatchEvent(
                    new CustomEvent('course-progress-updated', {
                        detail: { courseId }
                    })
                );
            }

            setResults({
                score, pass_percentage: quiz.pass_percentage || 60, passed,
                correct: correctCount, incorrect: questions.length - correctCount,
                total: questions.length, answerDetails
            });

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
            setGameState('COMPLETED');
        } catch (error) {
            console.error(error);
            alert('Submission failed: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

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
                        <div></div>
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
                        disabled={!(history.length > 0 && history.some(h => h.passed))}
                        className={`rounded-xl px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${(history.length > 0 && history.some(h => h.passed)) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500' : 'cursor-not-allowed bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600'}`}
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

        if (!q) return null; // Safety check

        return (
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0F172A] select-none text-left">
                <div className="bg-gray-50/90 dark:bg-[#0F172A]/90 backdrop-blur-md px-6 py-4 border-b border-gray-200 dark:border-gray-800 transition-colors flex justify-between items-center shrink-0 z-40">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white max-w-[70%] truncate transition-colors">{quiz.title}</h2>
                    <div className="flex flex-col items-end">
                        <div className="text-gray-500 dark:text-gray-400 font-mono font-semibold">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </div>
                        {warnings > 0 && (
                            <div className="text-red-500 text-sm font-bold animate-pulse mt-1">
                                ⚠️ {3 - warnings} Warnings Left
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 flex flex-col items-center">
                    <div className="w-full max-w-4xl bg-white dark:bg-[#1E293B] rounded-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-xl transition-colors">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
                            <span className="text-blue-600 dark:text-blue-400 font-bold mr-3">Q{currentQuestionIndex + 1}.</span>
                            {q.question_text}
                        </h3>

                        {q.code_snippet && (
                            <SyntaxHighlighter language="c" style={vscDarkPlus} className="rounded-lg mb-8 text-base">
                                {q.code_snippet}
                            </SyntaxHighlighter>
                        )}

                        <div className="space-y-4">
                            {q.question_type === 'true_false' ? (
                                ['true', 'false'].map(opt => (
                                    <label key={opt} className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all ${answers[q.id] === opt ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md' : 'bg-gray-50 dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                        <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => handleAnswerChange(q.id, opt)} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-4 capitalize font-semibold text-lg">{opt}</span>
                                    </label>
                                ))
                            ) : (
                                q.options.map((opt, i) => (
                                    <label key={opt.id} className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all ${answers[q.id] === String(i) ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md' : 'bg-gray-50 dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                        <input type="radio" name={q.id} value={i} checked={answers[q.id] === String(i)} onChange={() => handleAnswerChange(q.id, String(i))} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-4 font-semibold text-lg">{opt.option_text}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center shrink-0 z-30 transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={isFirstQuestion}
                        className={`px-8 py-3 font-bold rounded-lg transition-all ${isFirstQuestion ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                        Previous
                    </button>
                    
                    <div className="flex gap-4">
                        {!isLastQuestion ? (
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Quiz'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderResults = () => (
        <div className="max-w-7xl mx-auto px-4 py-8 text-left md:px-8 lg:px-12">
            <div className={`text-center p-8 rounded-2xl border-2 mb-8 transition-colors ${results.passed ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
                <div className="text-6xl mb-4">{results.passed ? '🏆' : '💔'}</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{results.passed ? 'Great Job!' : 'Quiz Failed'}</h2>
                <div className="text-5xl font-black text-gray-900 dark:text-white my-4 transition-colors">{results.score}%</div>
                <p className="text-gray-600 dark:text-gray-400 transition-colors">Pass Mark: {results.pass_percentage}%</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg transition-colors"><div className="text-2xl font-bold text-gray-900 dark:text-white">{results.total}</div><div className="text-xs text-gray-500 dark:text-gray-400">Total</div></div>
                    <div className="bg-green-50 dark:bg-green-500/10 p-3 rounded-lg transition-colors"><div className="text-2xl font-bold text-green-600 dark:text-green-400">{results.correct}</div><div className="text-xs text-green-600 dark:text-green-300">Correct</div></div>
                    <div className="bg-red-50 dark:bg-red-500/10 p-3 rounded-lg transition-colors"><div className="text-2xl font-bold text-red-600 dark:text-red-400">{results.incorrect}</div><div className="text-xs text-red-600 dark:text-red-300">Incorrect</div></div>
                    <div className="bg-blue-50 dark:bg-gray-800/50 p-3 rounded-lg transition-colors"><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div><div className="text-xs text-blue-600 dark:text-blue-300">Skipped</div></div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
                {!embedded ? (
                    <button onClick={() => setGameState('IDLE')} className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-xl font-bold transition-colors whitespace-nowrap">Back to Menu</button>
                ) : (
                    <button onClick={onNext} disabled={isLast} className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-bold transition-all shadow-sm whitespace-nowrap ${isLast ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800/50 dark:text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 shadow-lg'}`}>
                        <span className="hidden sm:inline">Continue to Next Lesson</span>
                        <span className="sm:hidden">Next Lesson</span>
                    </button>
                )}
                <button onClick={() => setShowAnswers(!showAnswers)} className="px-6 py-3 border-2 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold rounded-xl transition-colors">
                    {showAnswers ? 'Hide Answers' : 'View Answers'}
                </button>
            </div>

            {showAnswers && (
                <div className="space-y-6">
                    {questions.map((q) => {
                        const detail = results.answerDetails.find(d => d.questionId === q.id);
                        const isCorr = detail?.isCorrect;

                        return (
                            <div key={q.id} className={`p-6 rounded-xl border transition-colors ${isCorr ? 'border-green-500/30 bg-green-50 dark:bg-green-500/5' : 'border-red-500/30 bg-red-50 dark:bg-red-500/5'}`}>
                                <div className="flex gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isCorr ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {isCorr ? '✓' : '✗'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 dark:text-white font-medium mb-2 transition-colors">{q.question_text}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">Your Answer: <span className={isCorr ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                            {q.question_type === 'true_false' ? detail?.selectedAnswer : q.options[detail?.selectedAnswer]?.option_text || 'None'}
                                        </span></p>
                                        {!isCorr && (
                                            <p className="text-sm text-green-600 dark:text-green-400 transition-colors">Correct Answer: <span>
                                                {q.question_type === 'true_false' ? q.correct_answer : q.options.find(o => o.is_correct)?.option_text}
                                            </span></p>
                                        )}
                                        {q.explanation && (
                                            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs text-blue-800 dark:text-blue-200 transition-colors">
                                                <strong>ℹ️ Explanation:</strong> {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

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
            {gameState !== 'RUNNING' && !embedded && (
                <header className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-700/50 px-4 py-3 flex items-center gap-4 transition-colors">
                    <button onClick={() => navigate(`/courses/${courseId}/learn`)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:text-white transition-colors">←</button>
                    <span className="font-bold text-gray-900 dark:text-white transition-colors">Exit Quiz</span>
                </header>
            )}

            {gameState === 'IDLE' && renderStartScreen()}
            {gameState === 'RUNNING' && renderActiveQuiz()}
            {gameState === 'COMPLETED' && renderResults()}
        </div>
    );
};

export default QuizPage;
