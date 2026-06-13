import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cs_lesson_bookmarks';

const getBookmarks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(getBookmarks);

  useEffect(() => {
    const handler = () => setBookmarks(getBookmarks());
    window.addEventListener('storage', handler);
    window.addEventListener('bookmarks-updated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('bookmarks-updated', handler);
    };
  }, []);

  const toggleBookmark = useCallback((topicId) => {
    setBookmarks((prev) => {
      const next = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('bookmarks-updated'));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (topicId) => bookmarks.includes(topicId),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}

export default function LessonBookmarkButton({ topicId, className = '' }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(getBookmarks().includes(topicId));
    const handler = () => setIsBookmarked(getBookmarks().includes(topicId));
    window.addEventListener('bookmarks-updated', handler);
    return () => window.removeEventListener('bookmarks-updated', handler);
  }, [topicId]);

  const handleToggle = (e) => {
    e.stopPropagation();
    const bookmarks = getBookmarks();
    const next = bookmarks.includes(topicId)
      ? bookmarks.filter((id) => id !== topicId)
      : [...bookmarks, topicId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('bookmarks-updated'));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
    >
      <svg
        className={`w-4 h-4 transition-colors duration-200 ${
          isBookmarked
            ? 'text-yellow-500 fill-yellow-500'
            : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
        }`}
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
