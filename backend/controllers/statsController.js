const { supabase } = require('../config/supabase');

exports.getUserStats = async (req, res) => {
  try {
    // Get total users
    const { count: totalUsers, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (userError) throw userError;

    // Get rating stats
    const { data: ratings, error: ratingError } = await supabase
      .from('ratings')
      .select('rating');

    if (ratingError && ratingError.code !== 'PGRST116') { // Ignore if not found or table empty
      console.error('Rating fetch error:', ratingError);
    }

    let satisfactionRate = 96;
    let totalRatings = ratings?.length || 0;

    if (totalRatings > 0) {
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const avg = sum / totalRatings;
      satisfactionRate = Math.round((avg / 5) * 100);
    }

    res.json({
      totalUsers: totalUsers || 0,
      satisfactionRate,
      totalRatings
    });
  } catch (err) {
    console.error('Get user stats error:', err.message);
    res.status(500).json({
      msg: 'Server error while fetching stats',
      error: err.message
    });
  }
};

exports.checkRatingStatus = async (req, res) => {
  const userId = req.user.id;
  console.log(`[Stats] Checking rating status for user: ${userId}`);

  try {
    // Check if cleaning user data is needed, sticking to Supabase
    // Select last_rating_prompt_at to handle snooze logic
    const { data: user, error } = await supabase
      .from('users')
      .select('rating_shown, last_rating_prompt_at, accumulated_usage_time, usage_start_time')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.warn(`[Stats] User not found in database: ${userId}`);
      // Return success: false instead of 404 to prevent axios errors in console
      return res.json({ success: false, msg: 'User not found' });
    }

    // Check if already rated
    const { data: existingRating } = await supabase
      .from('ratings')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingRating) {
      return res.json({
        success: true,
        showRating: false,
        reason: 'already_rated'
      });
    }

    // Time constants
    const TEN_MINUTES = 10 * 60 * 1000;
    const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

    let accumulatedTime = user.accumulated_usage_time || 0;

    if (user.usage_start_time) {
      const currentSessionTime = Date.now() - new Date(user.usage_start_time).getTime();
      accumulatedTime += currentSessionTime;
    }

    // Determine if we should show rating
    // 1. Must satisfy minimum usage (10 mins) OR have completed 3+ course topics
    // 2. AND (Never shown OR Snoozed for > 5 days)

    let showRating = false;
    let reason = 'tracking';

    // Get completed course topics count to power the dual trigger
    const { data: courseProgress } = await supabase
      .from('user_course_progress')
      .select('completed_topics')
      .eq('user_id', userId);
      
    const totalCompletedCourseTopics = courseProgress 
      ? courseProgress.reduce((sum, cp) => sum + (cp.completed_topics || 0), 0) 
      : 0;

    if (accumulatedTime >= TEN_MINUTES || totalCompletedCourseTopics >= 3) {
      if (!user.rating_shown) {
        showRating = true; // First time eligible
        reason = accumulatedTime >= TEN_MINUTES ? 'usage_time' : 'topics_completed';
      } else if (user.last_rating_prompt_at) {
        // Check snooze timer
        const lastPrompt = new Date(user.last_rating_prompt_at).getTime();
        if (Date.now() - lastPrompt > FIVE_DAYS) {
          showRating = true; // Snooze expired
          reason = 'snoozed_expired';
        } else {
          reason = 'snoozed';
        }
      } else {
        // Fallback: rating_shown is true but no timestamp (migration case)
        showRating = true;
      }
    } else {
      reason = 'insufficient_time_and_topics';
    }

    res.json({
      success: true,
      showRating,
      accumulatedTime,
      timeRequired: TEN_MINUTES,
      timeRemaining: Math.max(0, TEN_MINUTES - accumulatedTime),
      reason
    });
  } catch (err) {
    console.error('Check rating status error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error while checking rating status' });
  }
};

exports.startUsageTracking = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Update the usage start time
    await supabase.from('users').update({
      usage_start_time: new Date().toISOString(),
      last_active_at: new Date().toISOString()
    }).eq('id', userId);

    return res.json({ success: true, tracking: true, message: 'Tracking started' });

  } catch (err) {
    console.error('[Stats] ERROR in startUsageTracking:', err);
    res.status(500).json({ success: false, msg: 'Server error starting tracking' });
  }
};

exports.stopUsageTracking = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: user } = await supabase.from('users').select('usage_start_time, accumulated_usage_time').eq('id', userId).single();

    if (!user || !user.usage_start_time) {
      return res.json({ success: true, tracking: false });
    }

    const sessionTime = Date.now() - new Date(user.usage_start_time).getTime();
    const newAccumulatedTime = (user.accumulated_usage_time || 0) + sessionTime;

    await supabase.from('users').update({
      accumulated_usage_time: newAccumulatedTime,
      usage_start_time: null,
      last_active_at: new Date().toISOString()
    }).eq('id', userId);

    res.json({ success: true, sessionTime, accumulatedTime: newAccumulatedTime });
  } catch (err) {
    console.error('Stop usage tracking error:', err.message);
    res.status(500).json({ success: false, msg: 'Error stopping tracking' });
  }
};

exports.submitRating = async (req, res) => {
  const { rating, feedback } = req.body;
  const userId = req.user.id;

  try {
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    const { data: existing } = await supabase.from('ratings').select('id').eq('user_id', userId).single();

    if (existing) {
      return res.status(400).json({ msg: 'You have already rated our application' });
    }

    // Insert rating
    const { error } = await supabase.from('ratings').insert({
      user_id: userId,
      rating,
      feedback: feedback || '',
      created_at: new Date().toISOString()
    });

    if (error) throw error;

    // Update user
    await supabase.from('users').update({
      rating_shown: true
    }).eq('id', userId);

    res.json({
      success: true,
      msg: 'Thank you for your feedback!',
      rating,
      feedback: feedback || ''
    });

  } catch (err) {
    console.error('Submit rating error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error while submitting rating' });
  }
};

exports.markRatingShown = async (req, res) => {
  const userId = req.user.id;
  try {
    await supabase.from('users').update({
      rating_shown: true,
      last_rating_prompt_at: new Date().toISOString()
    }).eq('id', userId);
    res.json({ success: true, message: 'Rating marked as shown' });
  } catch (err) {
    console.error('Mark rating shown error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// ==========================================
// COURSE RATING LOGIC
// ==========================================

exports.submitCourseRating = async (req, res) => {
  const { courseId, rating, feedback } = req.body;
  const userId = req.user.id;

  try {
    if (!courseId) return res.status(400).json({ msg: 'Course ID is required' });
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    // Check if user already rated this specific course
    const { data: existing } = await supabase
      .from('course_ratings')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existing) {
      return res.status(400).json({ msg: 'You have already rated this course' });
    }

    // Insert course rating
    const { error } = await supabase.from('course_ratings').insert({
      user_id: userId,
      course_id: courseId,
      rating,
      feedback: feedback || '',
      created_at: new Date().toISOString()
    });

    if (error) throw error;

    res.json({
      success: true,
      msg: 'Thank you for rating the course!',
      rating,
      feedback: feedback || ''
    });

  } catch (err) {
    console.error('Submit course rating error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error while submitting course rating' });
  }
};

exports.checkCourseRatingStatus = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  try {
    // Check if user already rated this specific course
    const { data: existing } = await supabase
      .from('course_ratings')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existing) {
      return res.json({ success: true, hasRated: true });
    }

    res.json({ success: true, hasRated: false });
  } catch (err) {
    console.error('Check course rating status error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error checking course rating status' });
  }
};