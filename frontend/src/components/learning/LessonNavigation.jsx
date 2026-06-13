import { motion } from 'framer-motion';

const DifficultyBadge = ({ difficulty }) => {
  if (!difficulty && difficulty !== 0) return null;

  const labels = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];
  const colors = [
    'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    'border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300',
  ];

  const diffNum = Number(difficulty);
  const idx = Number.isFinite(diffNum) ? Math.min(Math.max(Math.floor(diffNum) - 1, 0), 4) : 0;
  const label = labels[idx];
  const colorClass = colors[idx];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colorClass.split(' ')[0].replace('border-', 'bg-')}`} />
      {label}
    </span>
  );
};

const ReadingTime = ({ minutes }) => {
  if (!minutes && minutes !== 0) return null;

  const display = typeof minutes === 'number' ? `${minutes} min` : minutes;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {display} read
    </span>
  );
};

const ContinueLearningButton = ({ targetTopicId, courseId, onContinue, className = '' }) => {
  if (!targetTopicId) return null;

  return (
    <button
      onClick={onContinue}
      className={`inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.98] ${className}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Continue Learning
    </button>
  );
};

const SectionDivider = () => (
  <div className="relative my-10 sm:my-14">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200 dark:border-gray-800" />
    </div>
    <div className="relative flex justify-center">
      <span className="bg-gray-50 dark:bg-[#0F172A] px-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
        Continue
      </span>
    </div>
  </div>
);

export { DifficultyBadge, ReadingTime, ContinueLearningButton, SectionDivider };

export default function LessonNavigation({
  onPrevious,
  onNext,
  onMarkComplete,
  isFirst,
  isLast,
  prevTitle,
  nextTitle,
  hasChallenge,
  challengeSolved,
}) {
  const handleNextClick = async () => {
    if (hasChallenge && !challengeSolved) return;
    const canProceed = onMarkComplete ? await onMarkComplete() : true;
    if (canProceed && onNext) onNext();
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onPrevious}
        disabled={isFirst}
        className={`group flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${
          isFirst
            ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600'
            : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-sm'
        }`}
      >
        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline truncate max-w-[120px]">{prevTitle || 'Previous'}</span>
        <span className="sm:hidden">Back</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNextClick}
        disabled={hasChallenge && !challengeSolved}
        title={hasChallenge && !challengeSolved ? 'Complete the challenge to continue' : ''}
        className={`group flex items-center gap-2 rounded-xl px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${
          hasChallenge && !challengeSolved
            ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30'
        }`}
      >
        <span className="hidden sm:inline truncate max-w-[120px]">{nextTitle || (isLast ? 'Finish' : 'Next')}</span>
        <span className="sm:hidden">{isLast ? 'Finish' : 'Next'}</span>
        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}
