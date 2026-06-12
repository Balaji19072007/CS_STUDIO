import { supabase } from '../config/supabase';
import { buildApiUrl } from '../config/api.js';

const getCModule = (() => {
  let mod = null;
  return async () => {
    if (!mod) mod = await import('../data/cProgrammingPhaseFallbacks.js');
    return mod;
  };
})();

const getJavaModule = (() => {
  let mod = null;
  return async () => {
    if (!mod) mod = await import('../data/javaProgrammingPhaseFallbacks.js');
    return mod;
  };
})();

const isCProgrammingCourse = (courseId) => courseId === 'c-programming' || courseId === 'c-lang' || courseId === 'C';
const isJavaProgrammingCourse = (courseId) => courseId === 'java-programming' || courseId === 'Java';

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
      const cModule = await getCModule();
      return cModule.getFallbackPhases(courseId);
    }
    if (isJavaProgrammingCourse(courseId)) {
      const javaModule = await getJavaModule();
      return javaModule.getJavaFallbackPhases(courseId);
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
      const cModule = await getCModule();
      return cModule.getFallbackPhases(courseId);
    }
    if (isJavaProgrammingCourse(courseId)) {
      const javaModule = await getJavaModule();
      return javaModule.getJavaFallbackPhases(courseId);
    }
    throw error;
  }
};

export const getPhase = async (phaseId) => {
  try {
    const cModule = await getCModule();
    const fallbackPhase = cModule.getFallbackPhase(phaseId);
    if (fallbackPhase) return fallbackPhase;

    const javaModule = await getJavaModule();
    const javaFallbackPhase = await javaModule.getJavaFallbackPhase(phaseId);
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
    const cModule = await getCModule();
    const fallbackTopics = cModule.getFallbackTopics(phaseId);
    if (fallbackTopics && fallbackTopics.length > 0) return fallbackTopics;

    const javaModule = await getJavaModule();
    const javaFallbackTopics = await javaModule.getJavaFallbackTopics(phaseId);
    if (javaFallbackTopics && javaFallbackTopics.length > 0) return javaFallbackTopics;

    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('phase_id', phaseId)
      .order('order_index');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    const cModule = await getCModule();
    const fallbackTopics = cModule.getFallbackTopics(phaseId);
    if (fallbackTopics && fallbackTopics.length > 0) return fallbackTopics;

    const javaModule = await getJavaModule();
    const javaFallbackTopics = await javaModule.getJavaFallbackTopics(phaseId);
    if (javaFallbackTopics && javaFallbackTopics.length > 0) return javaFallbackTopics;
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

    const cModule = await getCModule();
    let fallbackTopic = cModule.getFallbackTopicMetadata(topicId);
    if (!fallbackTopic) {
      const javaModule = await getJavaModule();
      fallbackTopic = await javaModule.getJavaFallbackTopicMetadata(topicId);
    }

    if (error) {
      if (fallbackTopic) return fallbackTopic;
      throw error;
    }

    if (!fallbackTopic) return data;

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
    const cModule = await getCModule();
    let fallbackTopic = cModule.getFallbackTopicMetadata(topicId);
    if (!fallbackTopic) {
      const javaModule = await getJavaModule();
      fallbackTopic = await javaModule.getJavaFallbackTopicMetadata(topicId);
    }
    if (fallbackTopic) return fallbackTopic;
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
      const cModule = await getCModule();
      if (cModule.hasFallbackTopicContent(topicId)) {
        return cModule.getFallbackTopicContent(topicId);
      }
      const javaModule = await getJavaModule();
      if (await javaModule.hasJavaFallbackTopicContent(topicId)) {
        return javaModule.getJavaFallbackTopicContent(topicId);
      }
      throw error;
    }

    if (!data || data.length === 0) {
      const cModule = await getCModule();
      if (cModule.hasFallbackTopicContent(topicId)) {
        return cModule.getFallbackTopicContent(topicId);
      }
      const javaModule = await getJavaModule();
      if (await javaModule.hasJavaFallbackTopicContent(topicId)) {
        return javaModule.getJavaFallbackTopicContent(topicId);
      }
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching topic content:', error);
    const cModule = await getCModule();
    if (cModule.hasFallbackTopicContent(topicId)) {
      return cModule.getFallbackTopicContent(topicId);
    }
    const javaModule = await getJavaModule();
    if (await javaModule.hasJavaFallbackTopicContent(topicId)) {
      return javaModule.getJavaFallbackTopicContent(topicId);
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
    return data || [];
  } catch (error) {
    console.error('Error fetching practice problems:', error);
    return [];
  }
};

export const getTopicLearningMeta = async (topicId) => {
  const cModule = await getCModule();
  const cMeta = cModule.getFallbackTopicLearningMeta(topicId);
  if (cMeta) return cMeta;
  const javaModule = await getJavaModule();
  return javaModule.getJavaFallbackTopicLearningMeta(topicId);
};

export const getCourseChallenge = async (topicId) => {
  try {
    const res = await fetch(buildApiUrl(`/api/course-challenges/topic/${topicId}`), {
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
