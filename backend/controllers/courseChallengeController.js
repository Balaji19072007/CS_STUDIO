const { supabase } = require('../config/supabase');
const { runCodeTest } = require('../util/codeRunner');
const {
  getFallbackChallengeById,
  getFallbackChallengeByTopicId,
} = require('../data/cProgrammingChallengeFallbacks');

const parseHints = (hints) => {
  if (!hints) return [];
  if (Array.isArray(hints)) return hints;

  if (typeof hints === 'string') {
    try {
      const parsed = JSON.parse(hints);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      return hints
        .split('\n')
        .map((hint) => hint.trim())
        .filter(Boolean);
    }
  }

  return [hints];
};

const normalizeOutput = (value) =>
  (value || '')
    .toString()
    .replace(/\s+/g, ' ')
    .trim();

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

const pickBestProgressRow = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  return rows.reduce((best, row) => (shouldPreferProgressEntry(row, best) ? row : best), null);
};

const countCompletedProgressRows = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return 0;
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

  return Array.from(byTopicId.values()).filter(isProgressCompleted).length;
};

const isMissingColumnError = (error, columnName) => {
  const message = [error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return message.includes('column') && message.includes(columnName.toLowerCase());
};

const persistTopicCompletionWithPayload = async (userId, topicId, payload) => {
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
    })
    .select('*');

  if (insertError) {
    throw insertError;
  }

  return insertedRows && insertedRows.length > 0 ? insertedRows[0] : null;
};

const serializeChallenge = (
  challenge,
  { solved = false, solvedAt = null, includeLockedFields = true } = {}
) => {
  const response = {
    ...challenge,
    hints: parseHints(challenge.hints),
    solved,
    solved_at: solvedAt,
  };

  if (!includeLockedFields) {
    delete response.reference_output;
    delete response.solution_code;
  }

  return response;
};

const getDbChallengeById = async (challengeId) => {
  const numericId = Number.parseInt(challengeId, 10);
  if (Number.isNaN(numericId)) {
    return null;
  }

  const { data, error } = await supabase
    .from('course_challenges')
    .select('*')
    .eq('id', numericId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};

const getDbChallengeByTopicId = async (topicId) => {
  const { data, error } = await supabase
    .from('course_challenges')
    .select('*')
    .eq('topic_id', topicId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};

const getDbChallengeSolvedState = async (userId, challengeId) => {
  if (!userId || !challengeId) {
    return { solved: false, solvedAt: null };
  }

  const { data: status } = await supabase
    .from('course_challenge_status')
    .select('status, solved_at')
    .eq('user_id', userId)
    .eq('course_challenge_id', challengeId)
    .single();

  if (status && status.status === 'solved') {
    return {
      solved: true,
      solvedAt: status.solved_at,
    };
  }

  return { solved: false, solvedAt: null };
};

const getTopicSolvedState = async (userId, topicId) => {
  if (!userId || !topicId) {
    return { solved: false, solvedAt: null };
  }

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('topic_id', topicId)
    .limit(20);

  const progress = pickBestProgressRow(progressRows);

  return {
    solved: isProgressCompleted(progress),
    solvedAt: progress?.completed_at || null,
  };
};

const resolveChallengeById = async (challengeId) => {
  const databaseChallenge = await getDbChallengeById(challengeId);
  
  if (databaseChallenge) {
    const fallbackChallenge = getFallbackChallengeByTopicId(databaseChallenge.topic_id);
    return {
      source: 'database',
      challenge: {
        ...databaseChallenge,
        starter_code: databaseChallenge.starter_code || fallbackChallenge?.starter_code || '',
        test_input: databaseChallenge.test_input || fallbackChallenge?.test_input || '',
        test_args: databaseChallenge.test_args || fallbackChallenge?.test_args || []
      },
    };
  }

  const fallbackChallenge = getFallbackChallengeById(challengeId);
  if (fallbackChallenge) {
    return {
      source: 'fallback',
      challenge: fallbackChallenge,
    };
  }

  // Check if this is a Java fallback challenge ID (300000+ range)
  const numericId = Number.parseInt(challengeId, 10);
  if (!Number.isNaN(numericId) && numericId >= 300000 && numericId < 400000) {
    const diff = numericId - 300000;
    const phaseNum = Math.floor(diff / 100);
    const topicNum = diff % 100;
    const topicId = `java-p${phaseNum}-t${topicNum}`;
    const javaChallenge = await getJavaFallbackChallengeByTopicId(topicId);
    if (javaChallenge) {
      return {
        source: 'fallback',
        challenge: javaChallenge,
      };
    }
  }

  return null;
};

const getJavaFallbackChallengeByTopicId = async (topicId) => {
  if (!topicId || !topicId.startsWith('java-')) return null;

  const parts = topicId.split('-');
  const phaseNum = parts.length > 1 ? parts[1].replace(/^p/, '') : '0';
  const topicNum = parts.length > 2 ? parts[2].replace(/^t/, '') : '0';

  // Try to get the actual topic title from the database
  let displayTitle = `Topic ${phaseNum}.${topicNum}`;
  try {
    const { data } = await supabase
      .from('topics')
      .select('title')
      .eq('id', topicId)
      .single();
    if (data?.title) {
      displayTitle = data.title;
    }
  } catch {
    // Fallback to generated title
  }

  return {
    id: 300000 + parseInt(phaseNum || '0', 10) * 100 + parseInt(topicNum || '0', 10),
    title: `Challenge: ${displayTitle}`,
    description: `Write a Java program that demonstrates your understanding of ${displayTitle}. Apply the concepts you learned in this topic to solve the following problem.\n\nImplement a complete Java solution in a class called \`Main\`. Ensure your program compiles and runs correctly. Focus on writing clean, well-structured code that showcases the key concepts from this topic.`,
    reference_output: '',
    test_input: '',
    test_args: [],
    starter_code: 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
    solution_code: '',
    hints: [],
    topic_id: topicId,
    course_id: 'java-programming',
    language: 'Java',
  };
};

const resolveChallengeByTopicId = async (topicId) => {
  const fallbackChallenge = getFallbackChallengeByTopicId(topicId) || await getJavaFallbackChallengeByTopicId(topicId);
  const databaseChallenge = await getDbChallengeByTopicId(topicId);
  
  if (databaseChallenge) {
    return {
      source: 'database',
      challenge: {
        ...databaseChallenge,
        starter_code: databaseChallenge.starter_code || fallbackChallenge?.starter_code || '',
        test_input: databaseChallenge.test_input || fallbackChallenge?.test_input || '',
        test_args: databaseChallenge.test_args || fallbackChallenge?.test_args || []
      },
    };
  }

  if (fallbackChallenge) {
    return {
      source: 'fallback',
      challenge: fallbackChallenge,
    };
  }

  return null;
};

const updateCourseProgress = async (userId, courseId) => {
  if (!userId || !courseId) {
    return;
  }

  const { count: totalTopics } = await supabase
    .from('topics')
    .select('id, phases!inner(id, course_id)', { count: 'exact', head: true })
    .eq('phases.course_id', courseId);

  if (!totalTopics) {
    return;
  }

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('*, topics!inner(id, phases!inner(id, course_id))')
    .eq('user_id', userId)
    .eq('topics.phases.course_id', courseId);

  const completedTopics = countCompletedProgressRows(progressRows);
  const progressPercentage = Math.round(((completedTopics || 0) / totalTopics) * 100);
  const payload = {
    user_id: userId,
    course_id: courseId,
    progress_percentage: progressPercentage,
    last_accessed_at: new Date().toISOString(),
  };

  const { data: updatedRows, error: updateError } = await supabase
    .from('user_course_progress')
    .update(payload)
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .select('id');

  if (updateError) {
    console.error('updateCourseProgress update error:', updateError.message);
    return;
  }

  if (updatedRows && updatedRows.length > 0) {
    return;
  }

  const { error: insertError } = await supabase
    .from('user_course_progress')
    .insert(payload);

  if (insertError) {
    console.error('updateCourseProgress insert error:', insertError.message);
  }
};

const markTopicComplete = async (userId, topicId, courseId) => {
  if (!userId || !topicId) {
    return;
  }

  const { data: existingRows } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('topic_id', topicId)
    .limit(20);

  const existingProgress = pickBestProgressRow(existingRows);
  const completedAt = existingProgress?.completed_at || new Date().toISOString();
  const payloads = [
    { status: 'completed', completed_at: completedAt },
    { completed: true, completed_at: completedAt },
  ];

  for (let index = 0; index < payloads.length; index += 1) {
    const payload = payloads[index];

    try {
      await persistTopicCompletionWithPayload(userId, topicId, payload);
      break;
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

  await updateCourseProgress(userId, courseId);
};

exports.getChallenge = async (req, res) => {
  try {
    const resolved = await resolveChallengeById(req.params.challengeId);
    const userId = req.user ? req.user.id : null;

    if (!resolved) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    const { source, challenge } = resolved;
    const solvedState =
      source === 'database'
        ? await getDbChallengeSolvedState(userId, challenge.id)
        : await getTopicSolvedState(userId, challenge.topic_id);

    return res.json(
      serializeChallenge(challenge, {
        solved: solvedState.solved,
        solvedAt: solvedState.solvedAt,
        includeLockedFields: true,
      })
    );
  } catch (error) {
    console.error('getChallenge error:', error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getChallengeByTopic = async (req, res) => {
  try {
    const resolved = await resolveChallengeByTopicId(req.params.topicId);
    const userId = req.user ? req.user.id : null;

    if (!resolved) {
      return res.json(null);
    }

    const { source, challenge } = resolved;
    const solvedState =
      source === 'database'
        ? await getDbChallengeSolvedState(userId, challenge.id)
        : await getTopicSolvedState(userId, challenge.topic_id);

    return res.json(
      serializeChallenge(challenge, {
        solved: solvedState.solved,
        solvedAt: solvedState.solvedAt,
        includeLockedFields: false,
      })
    );
  } catch (error) {
    console.error('getChallengeByTopic error:', error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.runChallenge = async (req, res) => {
  try {
    const { code, language, custom_input } = req.body;
    if (!code) {
      return res.status(400).json({ msg: 'No code provided' });
    }

    const resolved = await resolveChallengeById(req.params.challengeId);
    if (!resolved) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    const targetLanguage = language || resolved.challenge.language || 'C';
    let inputToUse = custom_input !== undefined ? custom_input : (resolved.challenge.test_input || '');
    inputToUse = inputToUse.replace(/\\n/g, '\n');
    
    console.log('[DEBUG] runChallenge test_input:', JSON.stringify(inputToUse));
    const result = await runCodeTest(
      targetLanguage,
      code,
      inputToUse,
      resolved.challenge.test_args || []
    );

    if (result.stderr && !result.stdout) {
      return res.json({
        success: false,
        message: 'Compilation/Runtime Error',
        error: result.stderr,
      });
    }

    return res.json({
      success: true,
      output: result.stdout || 'Program executed successfully.',
    });
  } catch (error) {
    console.error('runChallenge error:', error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.submitChallenge = async (req, res) => {
  try {
    const { code, language } = req.body;
    const userId = req.user.id;

    if (!code) {
      return res.status(400).json({ msg: 'No code provided' });
    }

    const resolved = await resolveChallengeById(req.params.challengeId);
    if (!resolved) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    const { source, challenge } = resolved;
    const targetLanguage = language || challenge.language || 'C';
    let rawTestInput = challenge.test_input;
    let rawReferenceOutput = challenge.reference_output;

    if (rawTestInput === undefined && challenge.test_cases && challenge.test_cases.length > 0) {
      rawTestInput = challenge.test_cases[0].input;
      rawReferenceOutput = challenge.test_cases[0].expected_output;
    }

    let parsedInput = rawTestInput || '';
    parsedInput = parsedInput.replace(/\\n/g, '\n');

    const result = await runCodeTest(
      targetLanguage,
      code,
      parsedInput,
      challenge.test_args || []
    );

    console.log('[DEBUG] submitChallenge result:', JSON.stringify(result));

    if (result.stderr && !result.stdout) {
      return res.json({
        success: false,
        message: 'Compilation Failed',
        error: `ExitCode: ${result.exitCode}\nParsedInput: ${JSON.stringify(parsedInput)}\nStderr: ${result.stderr}`,
      });
    }

    const actual = normalizeOutput(result.stdout);
    const expected = normalizeOutput(rawReferenceOutput || '');

    // Smart validation: if reference_output contains [Address], [Pointer], [Date] or [File],
    // match the format using a pattern instead of exact string comparison.
    let isCorrect;
    if (challenge.reference_output && (
        challenge.reference_output.includes('[Address]') ||
        challenge.reference_output.includes('[Pointer]') ||
        challenge.reference_output.includes('[Date]') ||
        challenge.reference_output.includes('[File]')
    )) {
      // Build a regex from the expected pattern:
      // replace special tokens with regex patterns
      const hexPattern = '(0x[0-9a-fA-F]+|[0-9a-fA-F]+)';
      const datePattern = '(.+)';
      const filePattern = '(.+)';
      const escapedExpected = expected
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')  // escape regex special chars
        .replace(/\\\[Address\\\]/g, hexPattern)
        .replace(/\\\[Pointer\\\]/g, hexPattern)
        .replace(/\\\[Date\\\]/g, datePattern)
        .replace(/\\\[File\\\]/g, filePattern);
      const regex = new RegExp('^' + escapedExpected + '$', 'i');
      isCorrect = regex.test(actual);
    } else if ((challenge.topic_id && challenge.topic_id.toLowerCase().includes('project')) || (challenge.title && challenge.title.toLowerCase().includes('project'))) {
      // For projects, the user is building a full application and will likely have 
      // extra console UI (e.g. "Enter Number: "). We just need to check if the 
      // required calculation output is present anywhere in their total output.
      isCorrect = actual.includes(expected);
    } else {
      isCorrect = actual === expected;
    }

    console.log('[DEBUG] actual:', actual);
    console.log('[DEBUG] expected:', expected);
    console.log('[DEBUG] isCorrect:', isCorrect);
    console.log('[DEBUG] topic_id:', challenge.topic_id);
    console.log('[DEBUG] title:', challenge.title);

    if (!isCorrect) {
      return res.json({
        success: false,
        message: 'Incorrect Output',
        output: actual,
        expected,
      });
    }

    try {
      if (source === 'database') {
        await supabase.from('course_challenge_status').upsert(
          {
            user_id: userId,
            course_challenge_id: challenge.id,
            status: 'solved',
            solved_at: new Date().toISOString(),
          },
          { onConflict: 'user_id, course_challenge_id' }
        );
      }

      await markTopicComplete(userId, challenge.topic_id, challenge.course_id);
    } catch (progressError) {
      console.error('submitChallenge progress save error:', progressError);
      // We don't return 500 here, because the user's solution WAS correct.
      // We still want to show them success even if their topic_id is missing from the db.
    }

    return res.json({
      success: true,
      message: 'Execution successful.',
      output: result.stdout,
      debug_test_input: resolved.challenge.test_input
    });
  } catch (error) {
    console.error('submitChallenge error:', error.message);
    return res.status(500).json({ msg: 'Server Error', error: error.message });
  }
};
