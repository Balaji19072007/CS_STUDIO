import { useMemo } from 'react';

export default function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answers,
  flaggedQuestions,
  onNavigate,
}) {
  const stats = useMemo(() => {
    let answered = 0;
    let unanswered = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] !== undefined && answers[i] !== null) answered++;
      else unanswered++;
    }
    return { answered, unanswered };
  }, [answers, totalQuestions]);

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mr-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {stats.answered}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          {stats.unanswered}
        </span>
      </div>
      <div className="flex gap-1 overflow-x-auto max-w-[240px] sm:max-w-sm pb-0.5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isCurrent = i === currentIndex;
          const isAnswered = answers[i] !== undefined && answers[i] !== null;
          const isFlagged = flaggedQuestions?.has(i);

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                isCurrent
                  ? 'ring-2 ring-blue-500 bg-blue-500 text-white scale-110 shadow-md'
                  : isFlagged
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                  : isAnswered
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={`Question ${i + 1}${isFlagged ? ' (flagged)' : ''}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
