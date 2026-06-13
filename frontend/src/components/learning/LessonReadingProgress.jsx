import { useState, useEffect, useRef, useCallback } from 'react';

const MIN_CONTENT_HEIGHT = 600;

export default function LessonReadingProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef?.current || document.getElementById('topic-scroll-container');
      if (!el) {
        rafRef.current = null;
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);
      const pct = Math.min(Math.max(Math.round((scrollTop / maxScroll) * 100), 0), 100);
      setProgress(pct);
      setVisible(scrollHeight > MIN_CONTENT_HEIGHT && maxScroll > 100);
      rafRef.current = null;
    });
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef?.current || document.getElementById('topic-scroll-container');
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, containerRef]);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mb-0">
      <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
