import React, { useState } from 'react';
import { courseRatingAPI } from '../../config/api';
import './RatingPopup.css'; // Reuse existing CSS base, we'll add custom inline styles or tailwind classes

const CourseRatingModal = ({ courseId, courseTitle, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const emojis = ['😞', '😐', '🙂', '😊', '🤩'];
  const labels = ['Needs Work', 'Okay', 'Good', 'Great', 'Excellent'];

  const handleSubmit = async () => {
    if (rating === 0) {
      setMessage('Please select a rating first');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await courseRatingAPI.submitCourseRating({
        courseId,
        rating,
        feedback
      });

      if (response.data.success) {
        setMessage('Thank you for rating this course!');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error submitting rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarIcon = ({ filled, hovered, onClick, onMouseEnter, onMouseLeave }) => (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`cursor-pointer transition-all duration-200 ${hovered ? 'scale-110 text-yellow-400' : ''} ${filled ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-slate-300 dark:text-slate-600'}`}
      viewBox="0 0 24 24"
      width="40"
      height="40"
    >
      <path
        fill="currentColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] bg-slate-900/60 backdrop-blur-sm transition-all">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-200 dark:border-slate-800">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-1">How is the course?</h3>
            <p className="text-blue-100 text-sm font-medium">
              {courseTitle || 'Help us improve your learning experience'}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Emoji Reaction (Dynamic) */}
          <div className="flex justify-center mb-6 h-16 items-center">
            {rating > 0 || hoverRating > 0 ? (
              <div className="text-center animate-in slide-in-from-bottom-2 fade-in duration-200">
                <span className="text-5xl block mb-2 filter drop-shadow-md">
                  {emojis[(hoverRating || rating) - 1]}
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {labels[(hoverRating || rating) - 1]}
                </span>
              </div>
            ) : (
              <div className="text-slate-300 dark:text-slate-600 animate-pulse text-sm font-bold uppercase tracking-widest">
                Select a rating
              </div>
            )}
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={star <= rating}
                hovered={star <= hoverRating}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>

          {/* Feedback Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Optional Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What do you like? What could be better?"
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all resize-none font-medium"
              rows="3"
              maxLength="500"
            />
            <div className="text-right text-xs text-slate-400 mt-2 font-medium">
              {feedback.length}/500
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center justify-center ${message.includes('Thank you') ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}>
              {message}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
            >
              Maybe Later
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
              className="flex-1 py-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Submit Rating'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseRatingModal;
