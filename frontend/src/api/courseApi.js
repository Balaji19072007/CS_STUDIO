import { supabase } from '../config/supabase';
import { buildApiUrl } from '../config/api.js';
import {
  getFallbackPhases,
  getFallbackTopicContent,
  getFallbackTopicLearningMeta,
  getFallbackTopicMetadata,
  getFallbackTopics,
  hasFallbackTopicContent,
  isCProgrammingCourse,
  getFallbackPhase,
} from '../data/cProgrammingPhaseFallbacks.js';
import {
  getJavaFallbackPhases,
  getJavaFallbackTopicContent,
  getJavaFallbackTopicLearningMeta,
  getJavaFallbackTopicMetadata,
  getJavaFallbackTopics,
  hasJavaFallbackTopicContent,
  isJavaProgrammingCourse,
  getJavaFallbackPhase,
} from '../data/javaProgrammingPhaseFallbacks.js';

const getAuthHeaders = (includeJson = false) => {
  const headers = {};
  const token = localStorage.getItem('token');

  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const getJavaCourseFallback = (courseId) => ({
  id: courseId,
  title: 'Java Programming',
  description: 'Master Java programming from basics to advanced concepts.',
});

export const getCourse = async (courseId) => {
  try {
    if (isCProgrammingCourse(courseId)) {
      return {
        id: courseId,
        title: 'C Programming',
        description: 'Master C programming from basics to advanced concepts.',
      };
    }
    if (isJavaProgrammingCourse(courseId)) {
      return getJavaCourseFallback(courseId);
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    if (isCProgrammingCourse(courseId)) {
      return {
        id: courseId,
        title: 'C Programming',
        description: 'Master C programming from basics to advanced concepts.',
      };
    }
    if (isJavaProgrammingCourse(courseId)) {
      return getJavaCourseFallback(courseId);
    }
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('title');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const fetchLastActiveCourse = async () => {
  try {
    const res = await fetch(buildApiUrl('/api/courses/last-active'), {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch last active course');
    const data = await res.json();
    return data.success ? data.course : null;
  } catch (error) {
    console.error('Error fetching last active course:', error);
    return null;
  }
};

export const getEnrolledCourses = async () => {
  try {
    const res = await fetch(buildApiUrl('/api/courses/enrolled'), {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch enrolled courses');
    const data = await res.json();
    return data.success ? data.courses : [];
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    return [];
  }
};

export const getPhases = async (courseId) => {
  try {
    if (isCProgrammingCourse(courseId)) {
      return getFallbackPhases(courseId);
    }
    if (isJavaProgrammingCourse(courseId)) {
      return getJavaFallbackPhases(courseId);
    }

    const { data, error } = await supabase
      .from('phases')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching phases:', error);
    if (isCProgrammingCourse(courseId)) {
      return getFallbackPhases(courseId);
    }
    if (isJavaProgrammingCourse(courseId)) {
      return getJavaFallbackPhases(courseId);
    }
    throw error;
  }
};

export const getPhase = async (phaseId) => {
  try {
    const fallbackPhase = getFallbackPhase(phaseId);
    if (fallbackPhase) return fallbackPhase;

    const javaFallbackPhase = getJavaFallbackPhase(phaseId);
    if (javaFallbackPhase) return javaFallbackPhase;

    const { data, error } = await supabase
      .from('phases')
      .select('*')
      .eq('id', phaseId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching phase:', error);
    throw error;
  }
};

export const getTopics = async (phaseId) => {
  try {
    const fallbackTopics = getFallbackTopics(phaseId);
    if (fallbackTopics && fallbackTopics.length > 0) {
      return fallbackTopics;
    }

    const javaFallbackTopics = getJavaFallbackTopics(phaseId);
    if (javaFallbackTopics && javaFallbackTopics.length > 0) {
      return javaFallbackTopics;
    }

    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('phase_id', phaseId)
      .order('order_index');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    const fallbackTopics = getFallbackTopics(phaseId);
    if (fallbackTopics && fallbackTopics.length > 0) {
      return fallbackTopics;
    }
    const javaFallbackTopics = getJavaFallbackTopics(phaseId);
    if (javaFallbackTopics && javaFallbackTopics.length > 0) {
      return javaFallbackTopics;
    }
    throw error;
  }
};

export const getTopic = async (topicId) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .single();

    const fallbackTopic = getFallbackTopicMetadata(topicId) || getJavaFallbackTopicMetadata(topicId);

    if (error) {
      if (fallbackTopic) {
        return fallbackTopic;
      }
      throw error;
    }

    if (!fallbackTopic) {
      return data;
    }

    return {
      ...fallbackTopic,
      ...data,
      description:
        data?.description && data.description.trim().length > 20
          ? data.description
          : fallbackTopic.description,
    };
  } catch (error) {
    console.error('Error fetching topic:', error);
    const fallbackTopic = getFallbackTopicMetadata(topicId) || getJavaFallbackTopicMetadata(topicId);
    if (fallbackTopic) {
      return fallbackTopic;
    }
    throw error;
  }
};

export const getTopicContent = async (topicId) => {
  try {
    const { data, error } = await supabase
      .from('topic_content')
      .select('*')
      .eq('topic_id', topicId)
      .order('order_index');

    if (error) {
      if (hasFallbackTopicContent(topicId)) {
        return getFallbackTopicContent(topicId);
      }
      if (hasJavaFallbackTopicContent(topicId)) {
        return getJavaFallbackTopicContent(topicId);
      }
      throw error;
    }

    if (!data || data.length === 0) {
      if (hasFallbackTopicContent(topicId)) {
        return getFallbackTopicContent(topicId);
      }
      if (hasJavaFallbackTopicContent(topicId)) {
        return getJavaFallbackTopicContent(topicId);
      }
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching topic content:', error);
    if (hasFallbackTopicContent(topicId)) {
      return getFallbackTopicContent(topicId);
    }
    if (hasJavaFallbackTopicContent(topicId)) {
      return getJavaFallbackTopicContent(topicId);
    }
    throw error;
  }
};

export const getPracticeProblems = async (topicId) => {
  try {
    const { data, error } = await supabase
      .from('practice_problems')
      .select('*')
      .eq('topic_id', topicId)
      .order('order_index');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching practice problems:', error);
    throw error;
  }
};

export const getTopicLearningMeta = (topicId) =>
  getFallbackTopicLearningMeta(topicId) || getJavaFallbackTopicLearningMeta(topicId);

export const getCourseChallenge = async (topicId) => {
  try {
    const res = await fetch(`${buildApiUrl(`/api/course-challenges/topic/${topicId}`)}?t=${Date.now()}`, {
      headers: {
        ...getAuthHeaders(),
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch challenge');
    return await res.json();
  } catch (error) {
    console.error('Error fetching course challenge:', error);
    return null;
  }
};

export const getCourseChallengeById = async (challengeId) => {
  try {
    const res = await fetch(buildApiUrl(`/api/course-challenges/${challengeId}`), {
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch challenge');
    return await res.json();
  } catch (error) {
    console.error('Error fetching course challenge by ID:', error);
    throw error;
  }
};

export const runCourseChallenge = async (challengeId, code, language = 'C', custom_input = '') => {
  const res = await fetch(buildApiUrl(`/api/course-challenges/${challengeId}/run`), {
    method: 'POST',
    headers: getAuthHeaders(true),
      credentials: 'include',
    body: JSON.stringify({ code, language, custom_input }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || 'Failed to run challenge');
  }

  return data;
};

export const getPracticeProblemById = async (problemId) => {
  try {
    const res = await fetch(buildApiUrl(`/api/practice-problems/${problemId}`), {
      headers: getAuthHeaders(true),
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch practice problem');
    return await res.json();
  } catch (error) {
    console.error('Error fetching practice problem by ID:', error);
    throw error;
  }
};

export const runPracticeProblem = async (problemId, code, language = 'C') => {
  const res = await fetch(buildApiUrl(`/api/practice-problems/${problemId}/run`), {
    method: 'POST',
    headers: getAuthHeaders(true),
      credentials: 'include',
    body: JSON.stringify({ code, language }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || 'Failed to run practice problem');
  }

  return data;
};

export const submitPracticeProblem = async (problemId, code, language = 'C') => {
  const res = await fetch(buildApiUrl(`/api/practice-problems/${problemId}/submit`), {
    method: 'POST',
    headers: getAuthHeaders(true),
      credentials: 'include',
    body: JSON.stringify({ code, language }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || 'Failed to submit practice problem');
  }

  return data;
};

export const getCourseModules = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching course modules:', error);
    throw error;
  }
};
