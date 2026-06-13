import React, { useEffect, useState } from 'react';
import { CheckCircle, Award, Sparkles, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessState = ({
  title = 'Success!',
  description = 'Operation completed successfully.',
  action,
  secondaryAction,
  variant = 'default',
  showConfetti = false,
  className = ''
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showConfetti && visible) {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#6366f1', '#8b5cf6', '#a78bfa'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#6366f1', '#8b5cf6', '#a78bfa'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [showConfetti, visible]);

  const iconMap = {
    default: CheckCircle,
    achievement: Award,
    celebration: PartyPopper,
    stars: Star,
  };

  const colorMap = {
    default: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-500',
    achievement: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-500',
    celebration: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-500',
    stars: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-500',
  };

  const IconComponent = iconMap[variant] || CheckCircle;

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="relative mb-6">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colorMap[variant]} blur-3xl rounded-full animate-pulse-slow`}
          style={{ opacity: visible ? 0.4 : 0 }}
        />
        <div
          className={`relative p-4 rounded-2xl bg-gradient-to-br ${colorMap[variant]} border shadow-xl transition-all duration-500`}
          style={{
            transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
          }}
        >
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        {visible && variant === 'celebration' && (
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500 animate-ping" />
        )}
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {action}
        {secondaryAction}
      </div>
    </div>
  );
};

export default SuccessState;
