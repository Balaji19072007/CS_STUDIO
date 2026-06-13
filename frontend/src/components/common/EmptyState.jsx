import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const EmptyState = ({
  icon,
  iconType = 'default',
  title = 'No data found',
  description = 'There is nothing here yet.',
  action,
  secondaryAction,
  className = '',
  animated = true,
  compact = false,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const iconBgMap = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
    primary: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    warning: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    danger: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400',
    success: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center w-full',
        compact ? 'py-8 px-4' : 'py-16 px-4',
        className
      )}
      style={{
        opacity: animated && !visible ? 0 : 1,
        transform: animated && !visible ? 'translateY(12px)' : 'translateY(0)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      role="status"
    >
      <div className={cn(
        'flex items-center justify-center rounded-2xl mb-5',
        compact ? 'w-12 h-12' : 'w-16 h-16 sm:w-20 sm:h-20',
        iconBgMap[iconType] || iconBgMap.default,
      )}>
        {icon ? (
          typeof icon === 'string' ? (
            <span className={cn(compact ? 'text-xl' : 'text-2xl sm:text-3xl')} role="img" aria-hidden="true">{icon}</span>
          ) : (
            <div className={cn(compact ? 'w-5 h-5' : 'w-7 h-7 sm:w-8 sm:h-8')}>
              {icon}
            </div>
          )
        ) : (
          <svg className={cn(compact ? 'w-5 h-5' : 'w-7 h-7 sm:w-8 sm:h-8')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        )}
      </div>

      <h3 className={cn(
        'font-bold text-gray-900 dark:text-white',
        compact ? 'text-base' : 'text-xl sm:text-2xl',
        'mb-2'
      )}>
        {title}
      </h3>

      {description && (
        <p className={cn(
          'text-gray-500 dark:text-gray-400 max-w-md leading-relaxed',
          compact ? 'text-sm' : 'text-sm sm:text-base',
          'mb-6'
        )}>
          {description}
        </p>
      )}

      {action && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
