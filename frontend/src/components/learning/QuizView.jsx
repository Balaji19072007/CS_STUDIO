import React, { useState, useEffect, useRef } from 'react';

const QuizView = ({ topic, onComplete }) => {
    // Game States: 'intro', 'playing', 'result', 'review', 'terminated'
    const [gameState, setGameState] = useState('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({}); // { questionIndex: optionIndex }
    const [score, setScore] = useState(0);
    const [warningCount, setWarningCount] = useState(0);

    // Timing
    const [questionTimes, setQuestionTimes] = useState({}); // { questionIndex: timeInSeconds }
    const [currentQStartTime, setCurrentQStartTime] = useState(null);

    const quizRef = useRef(null);

    // --- EFFECT: Handle Fullscreen & Security Listeners ---
    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarningCount(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 3) {
                        terminateQuiz();
                    }
                    return newCount;
                });
            }
        };

        const preventCopy = (e) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('contextmenu', preventCopy);
        document.addEventListener('copy', preventCopy);
        document.addEventListener('cut', preventCopy);
        document.addEventListener('selectstart', preventCopy);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('contextmenu', preventCopy);
            document.removeEventListener('copy', preventCopy);
            document.removeEventListener('cut', preventCopy);
            document.removeEventListener('selectstart', preventCopy);

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log(err));
            }
        };
    }, [gameState]);

    // Track time per question
    useEffect(() => {
        if (gameState === 'playing') {
            setCurrentQStartTime(Date.now());
        }
    }, [currentQuestionIndex, gameState]);

    const terminateQuiz = () => {
        setGameState('terminated');
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
    };

    const handleStart = async () => {
        try {
            if (quizRef.current) {
                await quizRef.current.requestFullscreen();
            }
        } catch (err) {
            console.error("Fullscreen denied:", err);
        }
        setGameState('playing');
        setWarningCount(0);
        setAnswers({});
        setCurrentQuestionIndex(0);
    };

    const handleOptionSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleNext = () => {
        // Record time for this question
        const timeTaken = (Date.now() - currentQStartTime) / 1000;
        setQuestionTimes(prev => ({ ...prev, [currentQuestionIndex]: timeTaken }));

        // Save answer (null if skipped)
        const newAnswers = { ...answers, [currentQuestionIndex]: selectedOption };
        setAnswers(newAnswers);

        if (currentQuestionIndex < topic.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            finishQuiz(newAnswers);
        }
    };

    const finishQuiz = (finalAnswers) => {
        let newScore = 0;
        topic.questions.forEach((q, index) => {
            if (finalAnswers[index] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
        setGameState('result');
        if (onComplete) onComplete(newScore);
    };

    const handleRestart = () => {
        setGameState('intro');
        setWarningCount(0);
        setAnswers({});
        setQuestionTimes({});
        setScore(0);
        setCurrentQuestionIndex(0);
    };

    // --- RENDER CONTENT ---
    const renderContent = () => {
        if (!topic.questions || topic.questions.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-6 animate-bounce">🚧</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quiz Under Construction</h3>
                    <p className="text-slate-400">Questions are being prepared.</p>
                </div>
            );
        }

        if (gameState === 'terminated') {
            return (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="bg-red-500/10 p-12 rounded-3xl border border-red-500/30 backdrop-blur-xl max-w-lg w-full">
                        <div className="text-7xl mb-6">⚠️</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Quiz Terminated</h2>
                        <p className="text-red-300 text-lg mb-8 leading-relaxed">
                            For security reasons, the quiz was terminated due to multiple tab/window switches.
                        </p>
                        <button
                            onClick={handleRestart}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02]"
                        >
                            Restart Quiz
                        </button>
                    </div>
                </div>
            );
        }

        if (gameState === 'intro') {
            return (
                <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center pt-10 px-4 max-w-7xl mx-auto h-full">
                    {/* Visual Card */}
                    <div className="flex-1 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 rounded-3xl p-10 flex flex-col items-center justify-center border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-9xl mb-8 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">📝</div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">{topic.title}</h2>
                            <div className="flex items-center justify-center gap-4 text-slate-300 text-lg">
                                <span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>{topic.questions.length} Questions</span>
                                <span>•</span>
                                <span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>~{topic.questions.length} Mins</span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Card */}
                    <div className="flex-1 bg-slate-900/60 rounded-3xl p-10 border border-slate-700/50 flex flex-col backdrop-blur-xl shadow-2xl">
                        <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                            Instructions
                            <span className="text-sm font-normal px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Read Carefully</span>
                        </h3>

                        <div className="space-y-6 flex-1">
                            {[
                                { title: "Full Screen Mode", desc: "The quiz keeps you focused by enforcing full screen." },
                                { title: "Anti-Cheating", desc: "Tab switching (max 3 times) and copy-paste are disabled." },
                                { title: "No Going Back", desc: "Once submitted, you cannot change your answer." },
                                { title: "Score & Analysis", desc: "Detailed breakdown available after completion." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                                        <p className="text-slate-400 leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <button
                                onClick={handleStart}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3"
                            >
                                Start Challenge
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (gameState === 'result') {
            const skipped = topic.questions.reduce((acc, _, i) => acc + (answers[i] === null ? 1 : 0), 0);
            const wrong = topic.questions.length - score - skipped;
            const percentage = Math.round((score / topic.questions.length) * 100);
            const totalTime = Object.values(questionTimes).reduce((a, b) => a + b, 0);

            return (
                <div className="max-w-5xl mx-auto h-full flex items-center justify-center p-4">
                    <div className="w-full bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl relative overflow-hidden">
                        {/* Background Effects */}
                        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${percentage >= 70 ? 'from-green-500/10' : 'from-red-500/10'} to-transparent blur-3xl rounded-full pointer-events-none`}></div>

                        <div className="text-center mb-10 relative z-10">
                            <div className="inline-block p-4 rounded-full bg-white/5 mb-6 backdrop-blur-sm border border-white/10">
                                <div className="text-5xl">{percentage >= 80 ? '🏆' : percentage >= 50 ? '👏' : '💪'}</div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">Quiz Complete</h2>
                            <p className="text-slate-400 text-lg">You've mastered this session!</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
                            {[
                                { label: 'Total Score', value: `${score}/${topic.questions.length}`, color: 'text-white' },
                                { label: 'Accuracy', value: `${percentage}%`, color: percentage >= 70 ? 'text-green-400' : 'text-blue-400' },
                                { label: 'Skipped', value: `${skipped}`, color: 'text-yellow-400' },
                                { label: 'Time Taken', value: `${Math.round(totalTime)}s`, color: 'text-purple-400' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors">
                                    <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                                    <div className="text-slate-400 font-medium uppercase tracking-wider text-xs">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Visual Bar */}
                        <div className="mb-10 relative z-10">
                            <div className="flex justify-between text-sm font-bold mb-3 px-1">
                                <span className="text-green-400">{score} Correct</span>
                                <span className="text-yellow-400">{skipped} Skipped</span>
                                <span className="text-red-400">{wrong} Incorrect</span>
                            </div>
                            <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                                <div style={{ width: `${(score / topic.questions.length) * 100}%` }} className="bg-gradient-to-r from-green-500 to-emerald-400 h-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <div style={{ width: `${(skipped / topic.questions.length) * 100}%` }} className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full"></div>
                                <div style={{ width: `${(wrong / topic.questions.length) * 100}%` }} className="bg-gradient-to-r from-red-500 to-rose-500 h-full"></div>
                            </div>
                        </div>

                        <div className="flex gap-6 relative z-10">
                            <button
                                onClick={() => setGameState('review')}
                                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold border border-slate-600 transition-all hover:-translate-y-0.5"
                            >
                                Review Answers
                            </button>
                            <button
                                onClick={handleRestart}
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (gameState === 'review') {
            return (
                <div className="max-w-4xl mx-auto h-full overflow-y-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0F172A]/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 z-20 shadow-xl">
                        <h2 className="text-2xl font-bold text-white pl-2">Answer Breakdown</h2>
                        <button
                            onClick={() => setGameState('result')}
                            className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700"
                        >
                            Back to Results
                        </button>
                    </div>

                    <div className="space-y-6 pb-12">
                        {topic.questions.map((q, qIndex) => {
                            const userAnswer = answers[qIndex];
                            const isSkipped = userAnswer === null;
                            const isCorrect = userAnswer === q.correctAnswer;
                            const time = questionTimes[qIndex] || 0;

                            return (
                                <div key={q.id} className="bg-slate-800/40 rounded-2xl p-6 lg:p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="flex justify-between items-start gap-4 mb-6">
                                        <h3 className="text-xl font-semibold text-white leading-relaxed">
                                            <span className="text-slate-500 mr-3 text-lg">#{qIndex + 1}</span>
                                            {q.question}
                                        </h3>
                                        <div className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap border flex items-center gap-2 ${isCorrect
                                                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                                : isSkipped
                                                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                            }`}>
                                            {isCorrect ? 'Correct' : isSkipped ? 'Not Answered' : 'Incorrect'}
                                            <span className="text-xs opacity-70 border-l border-current pl-2 ml-1">{Math.round(time)}s</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {q.options.map((opt, optIndex) => {
                                            const isSelected = userAnswer === optIndex;
                                            const isTargetCorrect = q.correctAnswer === optIndex;

                                            let containerStyle = "border-slate-700 bg-slate-800/30 text-slate-400";
                                            let icon = <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs text-slate-500">{String.fromCharCode(65 + optIndex)}</div>;

                                            if (isTargetCorrect) {
                                                containerStyle = "border-green-500/50 bg-green-500/10 text-green-300 font-medium shadow-[0_0_10px_rgba(34,197,94,0.1)]";
                                                icon = <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>;
                                            } else if (isSelected && !isCorrect) {
                                                containerStyle = "border-red-500/50 bg-red-500/10 text-red-300";
                                                icon = <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>;
                                            }

                                            return (
                                                <div key={optIndex} className={`w-full p-4 rounded-xl border text-left text-base ${containerStyle} flex items-center gap-4 transition-all`}>
                                                    {icon}
                                                    <span>{opt}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        // PLAYING VIEW
        const currentQuestion = topic.questions[currentQuestionIndex];
        return (
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Progress Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-slate-800">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        style={{ width: `${((currentQuestionIndex + 1) / topic.questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* Header Info */}
                <div className="flex items-center justify-between px-6 py-6 absolute top-2 left-0 right-0 z-20">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 shadow-lg">
                        Question <span className="text-white font-bold ml-1">{currentQuestionIndex + 1}</span> / {topic.questions.length}
                    </div>
                    {warningCount > 0 && (
                        <div className="animate-pulse bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                            ⚠️ Warning {warningCount}/3
                        </div>
                    )}
                </div>

                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto w-full">
                    <div className="max-w-4xl w-full translate-y-4">
                        {/* Question Card */}
                        <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-12 border border-slate-700/50 shadow-2xl relative overflow-hidden group">

                            {/* Subtle Gradients */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-1000"></div>
                            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-1000"></div>

                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-10 leading-relaxed relative z-10 font-sans tracking-wide">
                                {currentQuestion.question}
                            </h2>

                            <div className="grid gap-4 relative z-10">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleOptionSelect(index)}
                                            className={`w-full p-5 rounded-2xl text-left transition-all duration-200 border-2 flex items-center gap-5 group/opt relative overflow-hidden ${isSelected
                                                    ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-[1.01]'
                                                    : 'border-slate-800 bg-slate-800/30 hover:bg-slate-800 hover:border-slate-600 hover:shadow-lg'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 text-lg font-bold transition-all duration-300 flex-shrink-0 ${isSelected
                                                    ? 'border-blue-500 bg-blue-500 text-white shadow-lg rotate-3'
                                                    : 'border-slate-600 text-slate-500 bg-slate-800 group-hover/opt:border-slate-500 group-hover/opt:text-slate-300'
                                                }`}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover/opt:text-white'
                                                }`}>
                                                {option}
                                            </span>

                                            {/* Selection Glint Effect */}
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] animate-[glint_1s_ease-in-out_infinite]"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-12 flex justify-end relative z-10">
                                <button
                                    onClick={handleNext}
                                    className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-xl ${selectedOption !== null
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:-translate-y-0.5'
                                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                                        }`}
                                >
                                    <span>{currentQuestionIndex === topic.questions.length - 1 ? 'Submit & Finish' : (selectedOption !== null ? 'Next Question' : 'Skip & Continue')}</span>
                                    <svg className={`w-5 h-5 transition-transform ${selectedOption !== null ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            ref={quizRef}
            className={`w-full h-full bg-[#0F172A] transition-all duration-500 ${gameState === 'playing' ? 'fixed inset-0 z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0F172A] to-black' : ''}`}
        >
            {renderContent()}
        </div>
    );
};

export default QuizView;
