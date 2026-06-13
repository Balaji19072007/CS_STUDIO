import { useState, useEffect, useRef, useCallback } from 'react';

export default function QuizTimer({ totalMinutes, onTimeUp, isRunning }) {
  const [timeRemaining, setTimeRemaining] = useState(totalMinutes * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeRemaining(totalMinutes * 60);
  }, [totalMinutes]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isUrgent = timeRemaining < 60;
  const isWarning = timeRemaining < 120 && timeRemaining >= 60;

  return (
    <div className="flex items-center gap-2">
      <svg
        className={`w-4 h-4 ${isUrgent ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-gray-400'}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span
        className={`font-mono font-bold tabular-nums transition-colors duration-300 ${
          isUrgent
            ? 'text-red-500 animate-pulse'
            : isWarning
            ? 'text-amber-500'
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      {isUrgent && (
        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Time</span>
      )}
    </div>
  );
}

export function useQuestionTimer() {
  const [questionTimes, setQuestionTimes] = useState({});
  const questionStartRef = useRef(null);

  const startQuestion = useCallback((index) => {
    questionStartRef.current = Date.now();
  }, []);

  const endQuestion = useCallback((index) => {
    if (questionStartRef.current) {
      const elapsed = Math.round((Date.now() - questionStartRef.current) / 1000);
      setQuestionTimes((prev) => ({ ...prev, [index]: elapsed }));
    }
  }, []);

  const getTotalTime = useCallback(() => {
    return Object.values(questionTimes).reduce((sum, t) => sum + t, 0);
  }, [questionTimes]);

  return { questionTimes, startQuestion, endQuestion, getTotalTime };
}
