const { supabase } = require('../config/supabase');
const { runCodeTest } = require('../util/codeRunner');

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

const parseTestCases = (testCases) => {
  if (!testCases) return [];
  if (Array.isArray(testCases)) return testCases;

  if (typeof testCases === 'string') {
    try {
      const parsed = JSON.parse(testCases);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  return [];
};

const normalizeOutput = (value) =>
  (value || '')
    .toString()
    .replace(/\s+/g, ' ')
    .trim();

const serializePracticeProblem = (problem) => ({
  ...problem,
  description: problem.description || problem.problem_description || '',
  problem_description: problem.problem_description || problem.description || '',
  hints: parseHints(problem.hints),
  test_cases: parseTestCases(problem.test_cases),
});

const loadPracticeProblem = async (problemId) => {
  const { data, error } = await supabase
    .from('practice_problems')
    .select('*')
    .eq('id', problemId)
    .single();

  if (error || !data) {
    return null;
  }

  return serializePracticeProblem(data);
};

exports.getPracticeProblem = async (req, res) => {
  try {
    const practiceProblem = await loadPracticeProblem(req.params.problemId);

    if (!practiceProblem) {
      return res.status(404).json({ msg: 'Practice problem not found' });
    }

    res.json(practiceProblem);
  } catch (error) {
    console.error('getPracticeProblem error:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.runPracticeProblem = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ msg: 'No code provided' });
    }

    const practiceProblem = await loadPracticeProblem(req.params.problemId);

    if (!practiceProblem) {
      return res.status(404).json({ msg: 'Practice problem not found' });
    }

    const targetLanguage = language || 'C';
    const input = practiceProblem.test_cases[0]?.input || '';
    const result = await runCodeTest(targetLanguage, code, input);

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
    console.error('runPracticeProblem error:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.submitPracticeProblem = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ msg: 'No code provided' });
    }

    const practiceProblem = await loadPracticeProblem(req.params.problemId);

    if (!practiceProblem) {
      return res.status(404).json({ msg: 'Practice problem not found' });
    }

    const targetLanguage = language || 'C';
    const testCases = practiceProblem.test_cases.length > 0
      ? practiceProblem.test_cases
      : [{ input: '', expected: null }];

    let passedCount = 0;
    let firstFailure = null;

    for (const testCase of testCases) {
      const input = testCase.input || '';
      const userResult = await runCodeTest(targetLanguage, code, input);

      if (userResult.stderr && !userResult.stdout) {
        return res.json({
          success: false,
          isSolved: false,
          message: 'Compilation Failed',
          error: userResult.stderr,
        });
      }

      let expectedOutput = testCase.expected ?? testCase.expectedOutput ?? null;

      if (expectedOutput === null) {
        if (!practiceProblem.solution_code) {
          return res.status(400).json({
            success: false,
            isSolved: false,
            message: 'Practice problem is missing solution metadata',
          });
        }

        const solutionResult = await runCodeTest(targetLanguage, practiceProblem.solution_code, input);
        expectedOutput = solutionResult.stdout;
      }

      const actual = normalizeOutput(userResult.stdout);
      const expected = normalizeOutput(expectedOutput);

      if (actual === expected) {
        passedCount += 1;
      } else if (!firstFailure) {
        firstFailure = {
          input,
          expected,
          actual,
        };
      }
    }

    const totalTests = testCases.length;
    const accuracy = totalTests > 0 ? (passedCount / totalTests) * 100 : 0;
    const isSolved = accuracy === 100;

    res.json({
      success: true,
      isSolved,
      accuracy: Math.floor(accuracy),
      passedCount,
      totalTests,
      message: isSolved ? 'Solution accepted!' : 'Keep trying!',
      failureDetails: firstFailure,
    });
  } catch (error) {
    console.error('submitPracticeProblem error:', error.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};
