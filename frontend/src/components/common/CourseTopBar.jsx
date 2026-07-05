import React from 'react';
import { Link } from 'react-router-dom';

const CourseTopBar = ({ courseTitle }) => {
  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md flex items-center shrink-0 relative z-[60] w-full px-4 sm:px-8 lg:px-10">
      <nav className="flex text-base sm:text-lg font-medium w-full">
        <ol className="flex items-center space-x-2 sm:space-x-3">
          <li>
            <Link 
              to="/" 
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center justify-center p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </li>
          <li>
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <Link 
              to="/courses" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-2 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Courses
            </Link>
          </li>
          <li>
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] sm:max-w-md px-2">
            {courseTitle || 'Course'}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default CourseTopBar;
