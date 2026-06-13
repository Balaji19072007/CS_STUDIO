import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function QuizReviewMode({ questions, results }) {
  const [expandedExplanations, setExpandedExplanations] = useState({});

  if (!results?.answerDetails) return null;

  const toggleExplanation = (qId) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        const detail = results.answerDetails.find((d) => d.questionId === q.id);
        const isCorr = detail?.isCorrect;
        const isExpanded = expandedExplanations[q.id];
        const userAnswerDisplay =
          q.question_type === 'true_false'
            ? detail?.selectedAnswer !== null
              ? String(detail?.selectedAnswer)
              : 'Not answered'
            : detail?.selectedAnswer !== null && q.options[detail?.selectedAnswer]
            ? q.options[detail?.selectedAnswer].option_text
            : 'Not answered';

        const correctAnswerDisplay =
          q.question_type === 'true_false'
            ? q.correct_answer
            : q.options.find((o) => o.is_correct)?.option_text;

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.2 }}
            className={`rounded-xl border-2 p-5 transition-colors ${
              isCorr
                ? 'border-green-300 dark:border-green-700/60 bg-green-50/80 dark:bg-green-500/5'
                : 'border-red-300 dark:border-red-700/60 bg-red-50/80 dark:bg-red-500/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                  isCorr
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {isCorr ? '✓' : '✗'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white font-semibold mb-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">Q{idx + 1}.</span>
                  {q.question_text}
                </p>

                {q.code_snippet && (
                  <div className="mt-2 mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <SyntaxHighlighter
                      language="c"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.8rem' }}
                    >
                      {q.code_snippet}
                    </SyntaxHighlighter>
                  </div>
                )}

                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Your answer:</span>{' '}
                    <span className={isCorr ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                      {userAnswerDisplay}
                    </span>
                  </p>
                  {!isCorr && (
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Correct answer:</span>{' '}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {correctAnswerDisplay}
                      </span>
                    </p>
                  )}
                </div>

                {q.explanation && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {isExpanded ? 'Hide explanation' : 'Show explanation'}
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 p-3.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            {q.explanation}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
