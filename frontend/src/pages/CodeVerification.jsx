// src/pages/CodeVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { buildApiUrl } from '../config/api.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTheme } from '../hooks/useTheme.jsx';
import { runTestCases, submitSolution } from '../api/problemApi.js';
import { SkeletonLesson } from '../components/common/SkeletonLoader';
import { ErrorPage } from '../components/common/ErrorPages';

const CodeVerification = () => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawId = searchParams.get('problemId');
  const problemId = rawId ? parseInt(rawId, 10) : null;

  // State for problem data
  const [problem, setProblem] = useState(null);
  const [isLoadingProblem, setIsLoadingProblem] = useState(true);
  const [problemError, setProblemError] = useState(null);

  // State for form inputs
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');

  // State for execution results
  const [actualOutput, setActualOutput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Load problem data
  useEffect(() => {
    const loadProblem = async () => {
      if (!problemId) {
        setProblemError('No problem ID provided');
        setIsLoadingProblem(false);
        return;
      }

      try {
        setIsLoadingProblem(true);
        setProblemError(null);

        const response = await fetch(buildApiUrl(`/api/problems/${problemId}`));
        if (!response.ok) {
          throw new Error('Failed to load problem');
        }

        const problemData = await response.json();
        setProblem(problemData);
        setLanguage(problemData.language || 'python');

        // Set default code template
        const template = getDefaultTemplate(problemData.language || 'python');
        setCode(template);

      } catch (err) {
        console.error('Error loading problem:', err);
        setProblemError(err.message || 'Failed to load problem');
      } finally {
        setIsLoadingProblem(false);
      }
    };

    loadProblem();
  }, [problemId]);

  const getDefaultTemplate = (lang) => {
    const templates = {
      'c': `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}`,
      'cpp': `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
      'java': `public class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
      'python': `# Write your solution here\n\n`,
      'javascript': `// Write your solution here\nconst solution = (input) => {\n  //...\n  return "Output";\n};\n\n// console.log(solution(input));`
    };
    return templates[lang] || '// Write your solution here';
  };

  const SUPPORTED_LANGUAGES = [
    { value: 'python', label: 'Python', monaco: 'python' },
    { value: 'c', label: 'C', monaco: 'c' },
    { value: 'cpp', label: 'C++', monaco: 'cpp' },
    { value: 'java', label: 'Java', monaco: 'java' },
    { value: 'javascript', label: 'JavaScript', monaco: 'javascript' }
  ];

  const DEFAULT_CODE = {
    python: `print("Hello World")`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
    javascript: `console.log("Hello World");`
  };


  const handleRunCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to run.');
      return;
    }

    setIsRunning(true);
    setError('');
    setActualOutput('');
    setVerificationResult(null);

    try {
      // Run tests to get results
      const result = await runTestCases(problemId, code, language);

      // Show output from the first test case
      if (result.passedCount > 0 || result.failedTests > 0) {
        const firstTest = result.testCases && result.testCases[0];
        if (firstTest) {
          setActualOutput(firstTest.actualOutput || 'No output');
          if (!firstTest.passed) {
            setError(`Test failed: ${firstTest.difference || 'Output mismatch'}`);
          }
        }
      } else {
        setActualOutput('No tests executed');
      }

    } catch (err) {
      console.error('Run code error:', err);
      setError(err.message || 'Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to submit.');
      return;
    }

    if (!problem) {
      setError('Problem data not loaded.');
      return;
    }

    setIsVerifying(true);
    setError('');
    setVerificationResult(null);
    setActualOutput('');

    try {
      // Submit the solution for final verification
      const result = await submitSolution(problemId, code, language);

      const isCorrect = result.isSolved;
      const accuracy = result.accuracy || 0;

      setVerificationResult({
        correct: isCorrect,
        message: isCorrect ? 'Solution Accepted! Problem Solved!' : `Tests failed (${accuracy}% accuracy)`,
        accuracy: accuracy,
        totalTests: result.totalTests || 0,
        passedCount: result.passedCount || 0
      });

      if (isCorrect) {
        // Navigate back to problems page after a delay
        setTimeout(() => {
          navigate('/problems');
        }, 2000);
      }

    } catch (err) {
      console.error('Submit solution error:', err);
      setError(err.message || 'Failed to submit solution');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setCode(DEFAULT_CODE[language] || '');
    setActualOutput('');
    setVerificationResult(null);
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to use the code verification tool.
          </p>
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isLoadingProblem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SkeletonLesson />
      </div>
    );
  }

  if (problemError || !problem) {
    return (
      <ErrorPage
        title="Problem Not Found"
        description={problemError || 'The requested problem could not be loaded.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/problems')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Problems
          </button>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Problem #{problem.problemId}: {problem.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Solve this coding problem by writing correct code that passes all test cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            {/* Problem Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {problem.language}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {problem.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 mb-4">
                  <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
                </div>

                {problem.inputFormat && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Input Format</h4>
                    <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: problem.inputFormat }} />
                  </div>
                )}

                {problem.outputFormat && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Output Format</h4>
                    <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: problem.outputFormat }} />
                  </div>
                )}
              </div>
            </div>

            {/* Test Cases Preview */}
            {problem.examples && problem.examples.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sample Test Cases</h3>
                <div className="space-y-4">
                  {problem.examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Input:</span>
                        <pre className="mt-1 text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border text-gray-900 dark:text-gray-100">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expected Output:</span>
                        <pre className="mt-1 text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border text-gray-900 dark:text-gray-100">
                          {example.output || example.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning || isVerifying}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isRunning ? (
                  <>
                    <Loader size="sm" className="mr-2" />
                    Running...
                  </>
                ) : (
                  'Run Code'
                )}
              </button>

              <button
                onClick={handleVerifyCode}
                disabled={isRunning || isVerifying}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isVerifying ? (
                  <>
                    <Loader size="sm" className="mr-2" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Column - Code Editor & Results */}
          <div className="space-y-6">
            {/* Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor ({language})</h3>
              </div>
              <div className="h-96">
                <Editor
                  height="100%"
                  language={SUPPORTED_LANGUAGES.find(l => l.value === language)?.monaco || 'python'}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>

            {/* Output/Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {verificationResult ? 'Submission Result' : 'Output'}
                </h3>
              </div>
              <div className="p-4">
                {verificationResult ? (
                  <div className={`rounded-lg p-4 ${
                    verificationResult.correct
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <div className="flex items-center mb-2">
                      {verificationResult.correct ? (
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <h3 className={`text-lg font-semibold ${
                        verificationResult.correct ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                      }`}>
                        {verificationResult.correct ? 'Solution Accepted!' : 'Tests Failed'}
                      </h3>
                    </div>
                    <p className={`text-sm mb-2 ${
                      verificationResult.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {verificationResult.message}
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>Passed: {verificationResult.passedCount || 0} / {verificationResult.totalTests || 0} tests</p>
                      <p>Accuracy: {verificationResult.accuracy || 0}%</p>
                    </div>
                  </div>
                ) : (
                  <pre className="text-sm font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded border text-gray-900 dark:text-gray-100 min-h-24 whitespace-pre-wrap">
                    {actualOutput || 'Click "Run Code" to see the output here...'}
                  </pre>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">How to Use</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Write your code in the editor above</li>
                <li>• Click "Run Code" to test with sample input and see output</li>
                <li>• Click "Submit Solution" to run against all test cases</li>
                <li>• If all tests pass, the problem will be marked as solved</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
