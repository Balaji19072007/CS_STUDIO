import { motion } from 'framer-motion';

const BADGES = {
  perfect: {
    label: 'Perfect Score',
    icon: '★',
    gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    textClass: 'text-yellow-700 dark:text-yellow-300',
    bgClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderClass: 'border-yellow-400/40',
    shadowClass: 'shadow-yellow-500/20',
  },
  gold: {
    label: 'Gold',
    icon: '🥇',
    gradient: 'from-yellow-300 via-amber-300 to-yellow-400',
    textClass: 'text-amber-700 dark:text-amber-300',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    borderClass: 'border-amber-400/40',
    shadowClass: 'shadow-amber-500/20',
  },
  silver: {
    label: 'Silver',
    icon: '🥈',
    gradient: 'from-gray-200 via-slate-300 to-gray-400',
    textClass: 'text-slate-600 dark:text-slate-300',
    bgClass: 'bg-slate-50 dark:bg-slate-800/50',
    borderClass: 'border-slate-400/40',
    shadowClass: 'shadow-slate-500/20',
  },
  bronze: {
    label: 'Bronze',
    icon: '🥉',
    gradient: 'from-amber-600 via-orange-500 to-amber-700',
    textClass: 'text-orange-700 dark:text-orange-300',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-400/40',
    shadowClass: 'shadow-orange-500/20',
  },
};

export function getBadge(score) {
  if (score === 100) return BADGES.perfect;
  if (score >= 90) return BADGES.gold;
  if (score >= 75) return BADGES.silver;
  if (score >= 50) return BADGES.bronze;
  return null;
}

export default function QuizAchievementBadge({ score, className = '' }) {
  const badge = getBadge(score);
  if (!badge) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 shadow-lg ${badge.bgClass} ${badge.borderClass} ${badge.shadowClass} ${className}`}
    >
      <motion.span
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.5 }}
        className="text-lg"
      >
        {badge.icon}
      </motion.span>
      <span className={`text-sm font-bold ${badge.textClass}`}>{badge.label}</span>
    </motion.div>
  );
}
