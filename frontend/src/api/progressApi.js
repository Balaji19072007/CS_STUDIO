import { supabase } from '../config/supabase';

/**
 * Progress API - Track user progress through courses
 */

const getFirstRow = (rows) => (Array.isArray(rows) && rows.length > 0 ? rows[0] : null);

const isProgressCompleted = (entry) =>
  Boolean(entry?.completed === true || entry?.status === 'completed' || entry?.completed_at);

const getProgressTimestamp = (entry) =>
  entry?.completed_at || entry?.updated_at || entry?.created_at || entry?.started_at || null;

const shouldPreferProgressEntry = (candidate, existing) => {
  if (!existing) {
    return true;
  }

  const candidateCompleted = isProgressCompleted(candidate);
  const existingCompleted = isProgressCompleted(existing);

  if (candidateCompleted !== existingCompleted) {
    return candidateCompleted;
  }

  return new Date(getProgressTimestamp(candidate) || 0).getTime()
    >= new Date(getProgressTimestamp(existing) || 0).getTime();
};

const normalizeProgressRows = (rows) => {
  if (!Array.isArray(rows)) {
    return [];
  }

  const byTopicId = new Map();

  rows.forEach((row) => {
    const topicId = row?.topic_id;
    if (!topicId) {
      return;
    }

    const current = byTopicId.get(topicId);
    if (shouldPreferProgressEntry(row, current)) {
      byTopicId.set(topicId, row);
    }
  });

  return Array.from(byTopicId.values());
};

const isMissingColumnError = (error, columnName) => {
  const message = [error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return message.includes('column') && message.includes(columnName.toLowerCase());
};

const persistTopicCompletionWithPayload = async (userId, topicId, payload) => {
  const completedAt = payload.completed_at || new Date().toISOString();

  const { data: updatedRows, error: updateError } = await supabase
    .from('user_progress')
    .update(payload)
    .eq('user_id', userId)
    .eq('topic_id', topicId)
    .select('*');

  if (updateError) {
    throw updateError;
  }

  if (updatedRows && updatedRows.length > 0) {
    return updatedRows[0];
  }

  const { data: insertedRows, error: insertError } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      topic_id: topicId,
      ...payload,
      completed_at: completedAt,
    })
    .select('*');

  if (insertError) {
    throw insertError;
  }

  return getFirstRow(insertedRows);
};

// Get user's overall course progress
export const getUserCourseProgress = async (userId, courseId) => {
  try {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .order('last_accessed_at', { ascending: false, nullsFirst: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return getFirstRow(data);
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    return null;
  }
};

// Get all user course progress entries
export const getAllUserCourseProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed_at', { ascending: false, nullsFirst: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching all user course progress:', error);
    return [];
  }
};

// Get user's topic progress
export const getUserTopicProgress = async (userId, topicId) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .order('completed_at', { ascending: false, nullsFirst: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return getFirstRow(normalizeProgressRows(data));
  } catch (error) {
    console.error('Error fetching user topic progress:', error);
    return null;
  }
};

// Get all user progress for a course
export const getAllUserProgressForCourse = async (userId, courseId) => {
  try {
    const queryCourseId = courseId === 'c-programming' ? 'c-lang' : courseId;
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        topics!inner (
          id,
          phases!inner (
            id,
            course_id
          )
        )
      `)
      .eq('user_id', userId)
      .eq('topics.phases.course_id', queryCourseId);

    if (error) {
      throw error;
    }

    return normalizeProgressRows(data);
  } catch (error) {
    console.error('Error fetching all user progress:', error);
    return [];
  }
};

// Mark topic as complete
export const markTopicComplete = async (userId, topicId) => {
  try {
    const completedAt = new Date().toISOString();
    const payloads = [
      { status: 'completed', completed_at: completedAt },
      { completed: true, completed_at: completedAt },
    ];

    for (let index = 0; index < payloads.length; index += 1) {
      const payload = payloads[index];

      try {
        return await persistTopicCompletionWithPayload(userId, topicId, payload);
      } catch (error) {
        const keys = Object.keys(payload);
        const canRetry =
          index < payloads.length - 1 &&
          keys.some((key) => isMissingColumnError(error, key));

        if (!canRetry) {
          throw error;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error marking topic complete:', error);
    throw error;
  }
};

// Update course progress
export const updateCourseProgress = async (userId, courseId) => {
  try {
    const queryCourseId = courseId === 'c-programming' ? 'c-lang' : courseId;
    const { count: totalTopics, error: totalTopicsError } = await supabase
      .from('topics')
      .select(
        `
          id,
          phases!inner(course_id)
        `,
        { count: 'exact', head: true }
      )
      .eq('phases.course_id', queryCourseId);

    if (totalTopicsError) {
      throw totalTopicsError;
    }

    if (!totalTopics) {
      return null;
    }

    const { data: progressRows, error: progressError } = await supabase
      .from('user_progress')
      .select(
        `
          *,
          topics!inner(
            phases!inner(course_id)
          )
        `
      )
      .eq('user_id', userId)
      .eq('topics.phases.course_id', queryCourseId);

    if (progressError) {
      throw progressError;
    }

    const completedTopics = normalizeProgressRows(progressRows).filter(isProgressCompleted).length;

    const progressPercentage = Math.round(((completedTopics || 0) / totalTopics) * 100);
    const payload = {
      progress_percentage: progressPercentage,
      last_accessed_at: new Date().toISOString(),
    };

    const { data: updatedRows, error: updateError } = await supabase
      .from('user_course_progress')
      .update(payload)
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select('*');

    if (updateError) {
      throw updateError;
    }

    if (updatedRows && updatedRows.length > 0) {
      return updatedRows[0];
    }

    const { data: insertedRows, error: insertError } = await supabase
      .from('user_course_progress')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress_percentage: progressPercentage,
        last_accessed_at: new Date().toISOString(),
      })
      .select('*');

    if (insertError) {
      throw insertError;
    }

    return getFirstRow(insertedRows);
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
};

// Get phase progress
export const getPhaseProgress = async (userId, phaseId) => {
  try {
    const { count: totalTopics, error: totalTopicsError } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })
      .eq('phase_id', phaseId);

    if (totalTopicsError) {
      throw totalTopicsError;
    }

    if (!totalTopics) {
      return { total: 0, completed: 0, percentage: 0 };
    }

    const { data: progressRows, error: progressError } = await supabase
      .from('user_progress')
      .select(
        `
          *,
          topics!inner(phase_id)
        `
      )
      .eq('user_id', userId)
      .eq('topics.phase_id', phaseId);

    if (progressError) {
      throw progressError;
    }

    const completedTopics = normalizeProgressRows(progressRows).filter(isProgressCompleted).length;
    const percentage = Math.round(((completedTopics || 0) / totalTopics) * 100);

    return {
      total: totalTopics,
      completed: completedTopics || 0,
      percentage,
    };
  } catch (error) {
    console.error('Error getting phase progress:', error);
    return { total: 0, completed: 0, percentage: 0 };
  }
};
