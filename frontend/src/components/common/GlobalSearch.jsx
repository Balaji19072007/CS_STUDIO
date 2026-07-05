import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, Loader, ArrowRight } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { useAuth } from '../../hooks/useAuth';

const SEARCH_ENDPOINTS = [
  { key: 'courses', label: 'Courses', url: '/api/courses/search?q=' },
  { key: 'problems', label: 'Problems', url: '/api/problems/search?q=' },
  { key: 'roadmaps', label: 'Roadmaps', url: '/api/roadmaps/search?q=' },
  { key: 'community', label: 'Community', url: '/api/community/search?q=' },
];

const flattenedDocs = contentService.getPublishedContent('doc').reduce((acc, section) => {
    return acc.concat(section.items);
}, []);

const GlobalSearch = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ courses: [], problems: [], roadmaps: [], projects: [], blog: [], docs: [], community: [] });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const flatResults = [
    ...results.courses.map(r => ({ ...r, type: 'course' })),
    ...results.problems.map(r => ({ ...r, type: 'problem' })),
    ...(results.roadmaps || []).map(r => ({ ...r, type: 'roadmap' })),
    ...(results.projects || []).map(r => ({ ...r, type: 'project' })),
    ...(results.blog || []).map(r => ({ ...r, type: 'blog' })),
    ...(results.docs || []).map(r => ({ ...r, type: 'docs' })),
    ...results.community.map(r => ({ ...r, type: 'community' })),
  ];

  const performSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults({ courses: [], problems: [], roadmaps: [], projects: [], blog: [], docs: [], community: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // 1. Perform Local Search for Static Content
    const lowerQ = q.toLowerCase();
    
    const localProjects = contentService.getPublishedContent('project').filter(p => 
        p.title.toLowerCase().includes(lowerQ) || p.description.toLowerCase().includes(lowerQ)
    );
    
    const localBlog = contentService.getPublishedContent('blog').filter(p => 
        p.title.toLowerCase().includes(lowerQ) || (p.description && p.description.toLowerCase().includes(lowerQ))
    );
    
    const localDocs = flattenedDocs.filter(d => 
        d.title.toLowerCase().includes(lowerQ) || d.description.toLowerCase().includes(lowerQ)
    );

    // 2. Perform API Search for Dynamic Content
    try {
      const activeEndpoints = user 
        ? SEARCH_ENDPOINTS 
        : SEARCH_ENDPOINTS.filter(ep => ep.key !== 'community');

      const responses = await Promise.allSettled(
        activeEndpoints.map(ep =>
          fetch(ep.url + encodeURIComponent(q), { credentials: 'include' })
            .then(r => {
              if (!r.ok) throw new Error('API Error');
              return r.json();
            })
            .then(d => ({ key: ep.key, data: d.data || d.results || [] }))
            .catch(() => ({ key: ep.key, data: [] }))
        )
      );

      const merged = { 
          courses: [], problems: [], roadmaps: [], community: [],
          projects: localProjects, 
          blog: localBlog, 
          docs: localDocs 
      };
      
      responses.forEach(r => {
        if (r.status === 'fulfilled') {
          merged[r.value.key] = r.value.data;
        }
      });
      setResults(merged);
    } catch {
      // Silently fail search but still show local results
      setResults(prev => ({ ...prev, projects: localProjects, blog: localBlog, docs: localDocs }));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelectedIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(val), 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      const item = flatResults[selectedIndex];
      if (item) navigateToResult(item);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setResults({ courses: [], problems: [], roadmaps: [], projects: [], blog: [], docs: [], community: [] });
    }
  };

  const navigateToResult = (item) => {
    const paths = {
      course: `/courses/${item.id || item._id}`,
      problem: `/solve?problemId=${item.id || item._id}`,
      roadmap: `/roadmaps/${item.slug || item.id || item._id}`,
      project: `/projects/${item.slug || item.id || item._id}`,
      community: `/community/${item.id || item._id}`,
    };
    window.location.href = paths[item.type] || '/';
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults({ courses: [], problems: [], roadmaps: [], projects: [], blog: [], docs: [], community: [] });
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const resultCount = flatResults.length;

  return (
    <div className="relative w-full max-w-lg" role="search">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search courses, problems, community... (Ctrl+K)"
          className="w-full pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          aria-label="Search courses, problems, and community posts"
          aria-expanded={isOpen && (query.length > 0 || resultCount > 0)}
          aria-controls="search-results"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
          role="combobox"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (query.length > 0 || resultCount > 0) && (
        <div
          id="search-results"
          role="listbox"
          className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center py-8" role="status">
              <Loader className="w-5 h-5 animate-spin text-blue-500" aria-hidden="true" />
              <span className="sr-only">Searching...</span>
            </div>
          ) : resultCount === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            flatResults.map((item, idx) => (
              <button
                key={`${item.type}-${item.id || item._id || idx}`}
                id={`search-result-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  idx === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => navigateToResult(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                  item.type === 'course' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                  item.type === 'problem' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                  item.type === 'roadmap' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                  item.type === 'project' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' :
                  item.type === 'blog' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                  item.type === 'docs' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' :
                  'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                }`}>
                  {item.type === 'course' ? 'C' : 
                   item.type === 'problem' ? 'P' : 
                   item.type === 'roadmap' ? 'R' :
                   item.type === 'project' ? 'Pr' :
                   item.type === 'blog' ? 'B' :
                   item.type === 'docs' ? 'D' :
                   'Co'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title || item.name || 'Untitled'}</div>
                  <div className="text-xs text-gray-400 truncate capitalize">{item.type}</div>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
