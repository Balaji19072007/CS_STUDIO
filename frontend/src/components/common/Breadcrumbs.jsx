import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap hide-scrollbar py-2" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        title="Home"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-600 flex-shrink-0" />
            
            {isLast ? (
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
