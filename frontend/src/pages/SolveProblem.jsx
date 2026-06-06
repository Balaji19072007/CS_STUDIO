// src/pages/SolveProblem.jsx
// Updated: Redesigned with Test Cases tab, Solution locking, and robust Submission logic.
// Now supports detailed test results from backend "runTestCases".

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import * as feather from 'feather-icons';
import { fetchProblemById, submitSolution, runTestCases, fetchProblemTestCases, fetchProblemProgress, updateProblemProgress } from '../api/problemApi.js';
// import { testAPI } from '../config/api.js';
import Loader from '../components/common/Loader.jsx';
import CodeEditorForSolvePage from '../components/problems/CodeEditorForSolvePage.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { ProblemManager } from '../utils/problemManager.js';

// ---------- Constants ----------
const TIME_TO_REVEAL_MINUTES = 60;
const TIME_TO_REVEAL_MS = TIME_TO_REVEAL_MINUTES * 60 * 1000;
const GRACE_PERIOD_MS = 5 * 60 * 1000; // 5 minutes

// ---------- Utilities ----------
const useTheme = () => {
  const getThemeStatus = () =>
    document.documentElement.classList.contains('dark') ||
    document.body.classList.contains('dark-theme');

  const [isDark, setIsDark] = useState(getThemeStatus());

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(getThemeStatus()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return { isDark };
};

const useFloatingNotification = () => {
  const [notification, setNotification] = useState(null);
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4200);
  }, []);
  return [notification, showNotification];
};

const formatMs = (ms) => {
  if (!ms || ms <= 0) return '00:00';
  const s = Math.ceil(ms / 1000);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

// React-safe Icon component to avoid DOM conflicts
const Icon = ({ name, className = '' }) => {
  if (!name || !feather.icons[name]) return null;
  const svg = feather.icons[name].toSvg({ class: className });
  return <span dangerouslySetInnerHTML={{ __html: svg }} style={{ display: 'contents' }} />;
};

const getDefaultTemplate = (language) => {
  const templates = {
    'C': `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}`,
    'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
    'Java': `public class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
    'Python': `# Write your solution here\n\n`,
    'JavaScript': `// Write your solution here\nconst solution = (input) => {\n  //...\n  return "Output";\n};\n\n// console.log(solution(input));`
  };
  return templates[language] || '// Write your solution here';
};

// Safe Renderer for Inputs
const SafeContent = ({ content }) => {
  if (content === null || content === undefined) return <span className="text-gray-500 italic">Empty</span>;
  if (typeof content === 'object') return <pre>{JSON.stringify(content, null, 2)}</pre>;

  // Unescape literal "\n" to actual newlines for display
  const displayContent = String(content).replace(/\\n/g, '\n');
  return <div className="whitespace-pre-wrap font-mono">{displayContent}</div>;
};

// process backspaces robustly for prev + incoming chunks
function processBackspaces(prev, incoming) {
  const buffer = prev + incoming;
  const out = [];
  for (let i = 0; i < buffer.length; i++) {
    const ch = buffer[i];
    if (ch === '\b') {
      if (out.length > 0) out.pop();
    } else {
      out.push(ch);
    }
  }
  return out.join('');
}

// ---------- Component ----------
const SolveProblem = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const fromPath = location.state?.from || '/problems';

  const rawId = searchParams.get('problemId');
  const problemId = rawId ? parseInt(rawId, 10) : NaN;

  // core state
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState(null); // { passed: boolean, results: [], accuracy: number }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('description');

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Run your code to see the output here.');
  const [mobileSubTab, setMobileSubTab] = useState('code'); // 'code' | 'output'
  const [isRunning, setIsRunning] = useState(false);
  const [outputError, setOutputError] = useState(false);

  const [hints, setHints] = useState([]);

  const [notification, showFloatingNotification] = useFloatingNotification();
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true); // Default to open (Standard view)

  // timer display
  const [timeState, setTimeState] = useState(formatMs(TIME_TO_REVEAL_MINUTES * 60 * 1000));

  // refs
  const editorRef = useRef(null);
  const consoleRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const language = (problem && problem.language) || 'C';
  const nextProblemId = Number.isFinite(problemId) && problemId < (ProblemManager.TOTAL_PROBLEMS || 1000) ? problemId + 1 : null;

  // ---------- Timer logic (per-problem) ----------
  const initializeOrResumeTimer = useCallback(() => {
    if (!Number.isFinite(problemId)) return;
    const prog = ProblemManager.getProblemProgress(problemId) || {};

    if (prog.solved) {
      setTimeState('00:00');
      return;
    }
    if (!prog.startTime) {
      ProblemManager.startTimer(problemId);
    } else {
      if (prog.pausedAt && typeof prog.timeRemaining === 'number') {
        ProblemManager.resumeTimer?.(problemId);
      }
      if (prog.graceStart) {
        const elapsed = Date.now() - prog.graceStart;
        if (elapsed > GRACE_PERIOD_MS) {
          ProblemManager.resetTimer?.(problemId);
          ProblemManager.startTimer(problemId);
          ProblemManager.clearGraceStart?.(problemId);
        } else {
          ProblemManager.resumeTimer?.(problemId);
        }
      }
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    timerIntervalRef.current = setInterval(() => {
      const p = ProblemManager.getProblemProgress(problemId) || {};
      if (p.solved) {
        setTimeState('00:00');
        clearInterval(timerIntervalRef.current);
        return;
      }
      const remaining = typeof p.timeRemaining === 'number' ? p.timeRemaining : TIME_TO_REVEAL_MINUTES * 60 * 1000;
      setTimeState(formatMs(remaining));

      // Check if solution should be revealed when time runs out
      if (remaining <= 0) {
        setTimeState('00:00');
        ProblemManager.stopTimer?.(problemId);
        clearInterval(timerIntervalRef.current);
      }
    }, 1000);
  }, [problemId]);

  // ---------- Load problem and testcases ----------
  useEffect(() => {
    let canceled = false;
    if (!Number.isFinite(problemId)) {
      setError('Invalid problem identifier.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const load = async () => {
      try {
        if (!ProblemManager.getProblemProgress(problemId).initialized) {
          ProblemManager.initializeProblemData(problemId);
        }

        // Fetch problem details
        const fetched = await fetchProblemById(problemId);

        // Map Supabase snake_case to Frontend expected keys
        const mappedProblem = {
          ...fetched,
          problemStatement: fetched.description || fetched.problemStatement || '<p>No statement provided.</p>',
          inputFormat: fetched.input_format || fetched.inputFormat || '<p>No input format provided.</p>',
          outputFormat: fetched.output_format || fetched.outputFormat || '<p>No output format provided.</p>',
          // Parse solution_template if it's a JSON string, or use as is if object/string
          solution: fetched.solution_template
            ? (typeof fetched.solution_template === 'string' && fetched.solution_template.startsWith('{')
              ? JSON.parse(fetched.solution_template)
              : fetched.solution_template)
            : (fetched.solution || {}),
          hints: fetched.hints || []
        };
        // Normalize solution code access (DB might store it nested or flat)
        if (mappedProblem.solution && !mappedProblem.solution.code && typeof mappedProblem.solution === 'object') {
          // If solution structure matches DB migration (JSON stringified), it might have 'code' inside.
          // If solution_template was just the code string, handle that? 
          // Audit said solution_template is JSON.
        }

        // Fetch test cases
        let fetchedTc = [];
        try {
          const tcResponse = await fetchProblemTestCases(problemId);
          fetchedTc = tcResponse.testCases || [];
        } catch (e) {
          console.warn("Could not fetch test cases", e);
        }

        // SYNC: Fetch User Progress from Backend
        if (isLoggedIn) {
          try {
            const progressData = await fetchProblemProgress(problemId);

            if (progressData && progressData.progress) {
              const { status } = progressData.progress;
              const localProg = ProblemManager.getProblemProgress(problemId);

              // If backend says solved but local says no, update local
              if (status === 'solved' && !localProg.solved) {
                ProblemManager.markAsSolved(problemId);
              }
            }
          } catch (progErr) {
            console.warn("Could not sync progress from backend", progErr);
          }
        }

        if (canceled) return;
        setProblem(mappedProblem);
        setTestCases(fetchedTc || []);

        const saved = ProblemManager.getUserCode(problemId);
        const initialCode = saved || mappedProblem.templateCode || getDefaultTemplate(mappedProblem.language || 'C');
        setCode(initialCode);

        const prog = ProblemManager.getProblemProgress(problemId) || {};
        // Double check status after potential sync
        if (prog.solved) ProblemManager.markAsSolved?.(problemId);

        // Hint logic
        if (Array.isArray(mappedProblem.hints) && mappedProblem.hints.length > 0) {
          setHints(mappedProblem.hints);
        } else if (mappedProblem.solution?.explanation) {
          // Fallback to extract from solution explanation if empty
        }

        initializeOrResumeTimer();
      } catch (err) {
        console.error('Failed to load problem:', err);
        setError(`Could not load problem #${problemId}. Please try again.`);
      } finally {
        if (!canceled) setIsLoading(false);
      }
    };

    load();

    return () => {
      canceled = true;
      const progress = ProblemManager.getProblemProgress(problemId) || {};

      // AUTO-MARK ATTEMPTED: If user spent > 5 minutes (300,000ms) and not solved
      const timeSpent = progress.timeElapsed || 0;
      if (isLoggedIn && !progress.solved && timeSpent > 300000) {
        // Fire and forget status update
        updateProblemProgress(problemId, { status: 'attempted', timeSpent: 0 }).catch(console.error);
      }

      if (!progress.solved && progress.timeRemaining > 0 && !progress.solved) {
        ProblemManager.setGraceStart?.(problemId, Date.now());
      }
      ProblemManager.pauseTimer?.(problemId);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [problemId, initializeOrResumeTimer, isLoggedIn]);

  // register console ref with editor
  useEffect(() => {
    if (consoleRef.current && editorRef.current?.setTerminalRef) editorRef.current.setTerminalRef(consoleRef.current);
  }, [problem]);

  // feather.replace() REMOVED to prevent React DOM conflicts

  // persist code
  useEffect(() => {
    if (code && !isLoading && Number.isFinite(problemId)) {
      ProblemManager.saveUserCode?.(problemId, code);
    }
  }, [code, isLoading, problemId]);

  // ---------- Content Protection (Aggressive "OTT Style") ----------
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e) => e.preventDefault();

    // 2. Aggressive Key Blocking
    const handleKeyDown = (e) => {
      // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, Ctrl+S, Ctrl+U
      // Also block Shift+Window+S (Snipping Tool shortcut on some configs)
      if (
        (e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'u', 'p', 's'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        showFloatingNotification(`Action blocked for security.`, 'error');
      }

      // PrintScreen: Immediate Blackout
      if (e.key === 'PrintScreen') {
        const appRoot = document.getElementById('root') || document.body;
        appRoot.style.visibility = 'hidden'; // Instant hide

        // Restore after a delay
        setTimeout(() => {
          appRoot.style.visibility = 'visible';
          showFloatingNotification('Screenshots are disabled.', 'error');
        }, 1000);
      }
    };

    // 3. Disable Drag/Drop & Paste
    const handleDragStart = (e) => e.preventDefault();
    const handlePaste = (e) => {
      e.preventDefault();
      showFloatingNotification('Paste is disabled.', 'error');
    };

    // 4. "OTT Style" Focus Protection (Hides content when switching windows/snipping tool)
    const handleBlur = () => {
      document.body.style.opacity = '0'; // Hide everything
    };

    const handleFocus = () => {
      document.body.style.opacity = '1'; // Show everything
    };

    // Attach Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('paste', handlePaste);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // CSS Injection for User Select & Print Hiding
    const style = document.createElement('style');
    style.id = 'content-protection-css';
    style.innerHTML = `
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      /* Aggressive Print Hiding */
      @media print {
        html, body {
           display: none !important;
           height: 0 !important;
           overflow: hidden !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('paste', handlePaste);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      const existingStyle = document.getElementById('content-protection-css');
      if (existingStyle) existingStyle.remove();
      // Ensure opacity is restored on unmount
      document.body.style.opacity = '1';
    };
  }, [showFloatingNotification]);

  // ---------- Output handling ----------
  const handleOutputReceived = useCallback((newOutput, isError, isRunningState, isWaitingInput = false) => {
    setIsRunning(Boolean(isRunningState));
    setIsWaitingForInput(isWaitingInput);

    if (isWaitingInput) {
      setTimeout(() => consoleRef.current?.focus?.(), 0);
      return;
    }

    setOutput(prev => {
      if (typeof newOutput !== 'string') return prev;
      if (!isRunningState && newOutput.includes('Execution')) {
        return newOutput;
      }
      const processed = processBackspaces(prev, newOutput);
      return processed;
    });

    setOutputError(Boolean(isError));
  }, []);



  // ---------- Execute / Stop ----------
  const handleRunCode = async () => {
    if (window.innerWidth < 1024) {
      setMobileSubTab('output');
    }

    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      handleOutputReceived('Execution Failed: Please write some code first.\n', true, false);
      return;
    }
    if (!isLoggedIn) {
      showFloatingNotification('You must be signed in to run code.', 'error');
      navigate('/signin');
      return;
    }

    setIsRunning(true);
    setIsConsoleOpen(true); // Auto-open console
    setOutput('Running...\n');
    setOutputError(false);

    try {
      if (editorRef.current?.runCode) {
        editorRef.current.runCode(currentCode);
      } else {
        handleOutputReceived('Code execution not available.\n', true, false);
        setIsRunning(false);
      }
    } catch (err) {
      console.error('Code execution failed', err);
      handleOutputReceived(`Execution Error: ${err.message}\n`, true, false);
      setIsRunning(false);
    }
  };

  const handleStopCode = () => {
    if (editorRef.current?.stopCode) {
      editorRef.current.stopCode();
      setIsRunning(false);
      handleOutputReceived('\nExecution stopped by user.\n', true, false);
      showFloatingNotification('Execution stopped', 'info');
    }
  };

  // ---------- Run Test Cases ----------
  const handleRunTestCases = async () => {
    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      showFloatingNotification('Please enter code to test.', 'error');
      return;
    }
    if (!isLoggedIn) {
      showFloatingNotification('Sign in to run tests.', 'error');
      return;
    }

    setIsRunning(true);
    setTestResults(null);
    setOutput("Running Test Cases...\n");
    setActiveTab('testcases'); // Switch to test tab to show results

    try {
      const result = await runTestCases(problemId, currentCode, language);

      // Backend now returns: { success: true, results: [{input, expected, output, passed, error}], passed: bool, accuracy: number }
      const detailedResults = result.results || [];

      // Map detailed results if available, otherwise just use summary
      if (detailedResults.length > 0) {
        setTestResults({
          passed: result.passed,
          accuracy: result.accuracy,
          passedCount: detailedResults.filter(r => r.passed).length,
          totalCount: detailedResults.length,
          details: detailedResults
        });
      } else {
        // Fallback for backward compatibility if backend didn't update (though we know it did)
        setTestResults({
          passed: result.passed,
          accuracy: result.accuracy,
          passedCount: result.passed ? testCases.length : Math.floor((result.accuracy / 100) * testCases.length),
          totalCount: testCases.length,
          details: []
        });
      }

      setOutput(`Test Execution Complete: ${result.accuracy}% Passed.\nCheck "Test Cases" tab for detailed results.`);

      if (result.passed) {
        showFloatingNotification('All Test Cases Passed! You can now Submit.', 'success');
      } else {
        showFloatingNotification(`Matched ${result.accuracy}% of test cases.`, 'warning');
      }

    } catch (err) {
      console.error("Test execution error", err);
      // Ensure we don't crash or show error page
      const errMsg = err.message || 'Unknown error occurred';
      if (errMsg.includes("Network Error")) {
        showFloatingNotification('Could not connect to server. Is backend running?', 'error');
      } else {
        showFloatingNotification(`Test execution failed: ${errMsg}`, 'error');
      }
      setOutput(`Test Error: ${errMsg}\nCheck console for details.`);
    } finally {
      setIsRunning(false);
    }
  };


  // ---------- Submit ----------
  const handleSubmitCode = useCallback(async () => {
    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      showFloatingNotification('Please enter code before submitting.', 'error');
      return;
    }
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    setIsRunning(true);
    setOutput('Validating solution against all test cases...');
    setOutputError(false);

    try {
      // Calculate time spent
      const prog = ProblemManager.getProblemProgress(problemId) || {};
      const timeSpent = prog.timeElapsed + (prog.startTime > 0 ? (Date.now() - prog.startTime) : 0);

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const result = await submitSolution(problemId, currentCode, language, timeSpent, timezone);

      const isSolved = Boolean(result.isSolved);

      if (isSolved) {
        if (result.warning) {
          showFloatingNotification(result.warning, 'warning');
        } else {
          showFloatingNotification('Solution Accepted! Problem Solved!', 'success');
        }
        setOutput('Solution Verified: Accepted!\nAll test cases passed.');
        ProblemManager.markAsSolved(problemId);

        // Invalidate dashboard cache so it refreshes on next visit
        sessionStorage.setItem('invalidate_dashboard_cache', 'true');
        console.log('✅ Dashboard cache invalidation flag set');

        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }

        // Auto-navigation removed as per user request
      } else {
        let statusMsg = `Submission failed: ${result.accuracy}% Accuracy.`;
        statusMsg += '\nPlease ensure your solution handles all edge cases.';

        // Populate test results if submit returns them (it typically doesn't, but logic could be similar)
        // Ideally submit just validates. We can show error.

        setOutput(statusMsg);
        setOutputError(true);
        showFloatingNotification('Solution failed verification.', 'error');
      }

    } catch (err) {
      const errMsg = err.response?.data?.msg || err.message || 'Verification failed.';
      setOutput(`Submission Error: ${errMsg}`);
      setOutputError(true);
      showFloatingNotification(errMsg, 'error');
    } finally {
      setIsRunning(false);
    }
  }, [code, isLoggedIn, navigate, problemId, language, showFloatingNotification]);

  // Copy, reset, load solution
  const copyCodeToClipboard = () => {
    const currentCode = editorRef.current?.getCode() || code;
    navigator.clipboard.writeText(currentCode).then(() => showFloatingNotification('Code copied!', 'success'));
  };

  const importSolution = () => {
    if (problem?.solution?.code) {
      setCode(problem.solution.code);
      showFloatingNotification('Solution code imported to editor.', 'success');
    }
  };

  const resetCode = () => {
    const template = problem?.templateCode || getDefaultTemplate(language);
    setCode(template);
    setOutput('Code reset to original template.');
    ProblemManager.saveUserCode?.(problemId, template);
    showFloatingNotification('Code reset.', 'info');
  };

  // UI helpers
  const containerBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const linkHover = isDark ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-100';

  const NotificationPopup = () => {
    if (!notification) return null;
    const baseClass = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-sm font-medium transition-transform transform duration-300';
    let colorClass, icon;
    switch (notification.type) {
      case 'success': colorClass = 'bg-green-600 text-white'; icon = 'check-circle'; break;
      case 'error': colorClass = 'bg-red-600 text-white'; icon = 'x-octagon'; break;
      case 'warning': colorClass = 'bg-yellow-600 text-black'; icon = 'alert-triangle'; break;
      default: colorClass = 'bg-blue-600 text-white'; icon = 'info'; break;
    }
    return (
      <div className={`${baseClass} ${colorClass} animate-fade-in-down`}>
        <div className="flex items-center">
          <Icon name={icon} className="w-5 h-5 mr-3" />
          <span>{notification.message}</span>
        </div>
      </div>
    );
  };

  const StatusBadge = () => {
    const prog = ProblemManager.getProblemProgress(problemId) || {};
    const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;

    if (prog.solved) {
      return (
        <div className="flex items-center text-sm font-mono font-bold text-green-500 border border-green-500/50 rounded-full px-3 py-1 bg-green-500/10">
          <Icon name="check-circle" className="w-4 h-4 mr-2" /> Solved!
        </div>
      );
    }
    if (isSolutionAvailable) {
      return (
        <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} border border-blue-500/50 rounded-full px-3 py-1 bg-blue-500/10`}>
          <Icon name="unlock" className="w-4 h-4 mr-2" /> Solution
        </div>
      );
    }
    return (
      <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'} border border-yellow-500/50 rounded-full px-3 py-1 bg-yellow-500/10`}>
        <Icon name="clock" className="w-4 h-4 mr-2" /> {timeState}
      </div>
    );
  };

  // Check if solution is available
  const prog = ProblemManager.getProblemProgress(problemId) || {};
  const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;

  const sanitizedProblemStatement = problem?.problemStatement || '<p>No statement provided.</p>';
  const sanitizedSolutionExplanation = problem?.solution?.explanation || '<p>Solution explanation not available.</p>';

  if (isLoading) return <Loader message="Loading problem details..." size="lg" />;
  if (error || !problem) return <div className={`min-h-screen ${containerBg} p-12 text-center text-red-400`}>{error || 'Problem data is unavailable.'}</div>;

  const displayId = (problem && (problem.problemId ?? problem.id)) ?? problemId;

  return (
    <div className={`h-screen ${containerBg} transition-colors duration-500 flex flex-col overflow-hidden no-select`}>
      <NotificationPopup />

      {/* Mobile header (Simplified) */}
      {/* Mobile header (Simplified) */}
      <div className="lg:hidden flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => {
            const isSolved = ProblemManager.getProblemProgress(problemId)?.solved;
            navigate(fromPath, { state: { solved: isSolved } });
          }} className={`text-gray-500`}><Icon name="arrow-left" /></button>
          <span className={`font-bold ${textPrimary}`}>#{displayId} {problem.title}</span>
          <StatusBadge />
        </div>
      </div>

      {/* Removed py-4 on mobile to attach content to header */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-screen-2xl mx-auto w-full px-0 lg:px-8 py-0 lg:py-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-6 text-left">
          <button onClick={() => {
            const isSolved = ProblemManager.getProblemProgress(problemId)?.solved;
            if (fromPath === '/problems') {
              navigate(fromPath, { state: { scrollToId: `problem-${displayId}`, solved: isSolved } });
            } else {
              navigate(fromPath, { state: { solved: isSolved } });
            }
          }} className={`inline-flex items-center px-4 py-2 border ${borderClass} rounded-lg text-sm font-medium ${isDark ? 'text-gray-200 bg-gray-700' : 'text-gray-700 bg-white'} ${linkHover} transition-colors`}>
            <Icon name="arrow-left" className="w-4 h-4 mr-2" /> {fromPath === '/' ? 'Back to Dashboard' : 'Back to Problems'}
          </button>
          {ProblemManager.getProblemProgress(problemId)?.solved && nextProblemId && (
            <button onClick={() => navigate(`/solve?problemId=${nextProblemId}`)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors">
              Next Problem #{nextProblemId} <Icon name="arrow-right" className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-6 overflow-hidden">

          {/* MOBILE TAB BAR (lg:hidden) */}
          {/* Fixed at top of content area on mobile */}
          <div className="lg:hidden flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {['description', 'code', 'testcases', 'solution'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                {tab === 'testcases' ? 'Tests' : tab}
              </button>
            ))}
          </div>

          {/* LEFT COLUMN: Tabs (Description, Test Cases, Solution, [Desktop only: Code view is separate]) */}
          {/* Logic: On Mobile, hide this column if activeTab is 'code'. On Desktop, always show. */}
          <div className={`lg:w-1/2 flex flex-col h-full overflow-hidden ${activeTab === 'code' ? 'hidden lg:flex' : 'flex'}`}>
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl h-full transition-colors border-b lg:border-b-0 ${borderClass} overflow-hidden flex flex-col`}>

              {/* Desktop Tabs Header (Hidden on Mobile) */}
              <div className={`hidden lg:flex border-b ${borderClass} bg-gray-50 dark:bg-gray-800`}>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'description' || activeTab === 'code' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Description</button>
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'testcases' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Test Cases</button>
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'solution' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Solution{isSolutionAvailable ? '' : ' 🔒'}</button>
              </div>

              {/* Tab Content */}
              <div className="p-4 lg:p-6 overflow-y-auto flex-1 custom-scrollbar">

                {/* 1. DESCRIPTION TAB */}
                {/* Show if tab is description OR if tab is code (on desktop, left pane defaults to desc) */}
                {(activeTab === 'description' || activeTab === 'code') && (
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-6 text-left`}>
                    <div className="space-y-4">
                      <h2 className={`text-2xl font-bold ${textPrimary}`}>#{problem.problemId}. {problem.title}</h2>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800`}>{language}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{problem.difficulty}</span>
                      </div>
                      <div className="prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: sanitizedProblemStatement.split('Input Format')[0] }} />
                    </div>

                    {/* Input/Output Formats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 border-blue-500`}>
                        <h3 className="font-bold text-sm mb-1 text-blue-600 dark:text-blue-400">Input Format</h3>
                        <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.inputFormat }} />
                      </div>
                      <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 border-purple-500`}>
                        <h3 className="font-bold text-sm mb-1 text-purple-600 dark:text-purple-400">Output Format</h3>
                        <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.outputFormat }} />
                      </div>
                    </div>

                    {/* Hints Section */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className={`font-semibold ${textPrimary} mb-2 flex items-center`}><Icon name="lightbulb" className="w-4 h-4 mr-2 text-yellow-500" /> Hints</h3>
                      <ul className="space-y-2 list-disc pl-5 text-sm">
                        {hints.length > 0 ? hints.map((h, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: h }}></li>
                        )) : <li className="text-gray-500">No hints available.</li>}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. TEST CASES TAB */}
                {activeTab === 'testcases' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center">
                        <Icon name="info" className="w-4 h-4 mr-2" /> How Test Cases Work
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        <span className="lg:hidden">
                          Your code runs against multiple inputs, including hidden ones. Outputs must match exactly.
                        </span>
                        <span className="hidden lg:inline">
                          We run your code against multiple sets of inputs.
                          <strong> Hidden test cases</strong> check for edge cases.
                          If your output doesn't match the expected output exactly (including spaces/newlines), the test fails.
                          Click "Run Test Cases" to verify your logic before submitting.
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className={`font-bold text-lg ${textPrimary}`}>Test Cases</h3>
                      <button
                        onClick={handleRunTestCases}
                        disabled={isRunning}
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center min-w-[140px] ${isRunning ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isRunning ? (
                          <>
                            <Loader size="sm" color="white" className="mr-2" showText={false} />
                            <span>Running...</span>
                          </>
                        ) : (
                          <>
                            <Icon name="play" className="w-4 h-4 mr-2" />
                            <span>Run Test Cases</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Summary Result Banner */}
                    {testResults && (
                      <div className={`p-3 rounded-lg border ${testResults.passed ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <div className="font-bold text-sm">{testResults.passed ? 'All Test Cases Passed' : 'Some Test Cases Failed'}</div>
                        <div className="text-xs mt-1">Passed {testResults.passedCount} of {testResults.totalCount} ({testResults.accuracy}%)</div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {(testResults?.details && testResults.details.length > 0 ? testResults.details : (testCases || [])).map((item, idx) => {
                        const isResult = typeof item.passed === 'boolean';
                        const statusColor = isResult
                          ? (item.passed ? 'text-green-500' : 'text-red-500')
                          : 'text-gray-400';

                        return (
                          <div key={idx} className={`p-4 rounded-lg border ${borderClass} ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                            <div className="flex justify-between mb-2">
                              <div className="text-xs font-bold uppercase text-gray-500">Test Case {idx + 1}</div>
                              <div className={`text-xs font-bold ${statusColor}`}>
                                {isResult ? (item.passed ? 'PASSED' : 'FAILED') : 'Not Run'}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Input</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-black/50 text-gray-200' : 'bg-white text-gray-900'} border ${borderClass}`}><SafeContent content={item.input} /></div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Expected Output</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-black/50 text-gray-200' : 'bg-white text-gray-900'} border ${borderClass}`}><SafeContent content={item.expected || item.output} /></div>
                              </div>
                            </div>

                            {isResult && !item.passed && (
                              <div className="mt-2 text-sm font-mono">
                                <div className="text-xs text-red-400 mb-1">Your Output</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border text-red-700 dark:text-red-300`}>
                                  <SafeContent content={item.output} />
                                  {item.error && (
                                    <div className="mt-2 pt-2 border-t border-red-300 dark:border-red-700 text-xs text-red-500 font-semibold">
                                      Stderr:
                                      <SafeContent content={item.error} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {(!testCases || testCases.length === 0) && <div className="text-gray-500 text-center py-8">No test cases available to display.</div>}
                    </div>
                  </div>
                )}

                {/* 3. SOLUTION TAB */}
                {activeTab === 'solution' && (
                  <div className="h-full flex flex-col">
                    {!isSolutionAvailable ? (
                      <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                          <Icon name="lock" className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Solution Locked</h3>
                        <p className={`max-w-md ${textSecondary} mb-4`}>
                          The solution is locked to encourage you to try solving it first.
                          It will unlock automatically after the timer expires.
                        </p>
                        <div className="font-mono text-2xl font-bold text-yellow-500">
                          {timeState}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
                          <div className={`flex justify-between items-center p-3 border-b ${borderClass} ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <span className={`font-semibold text-sm ${textPrimary}`}>Solution Code</span>
                            <button
                              onClick={importSolution}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded flex items-center transition-colors"
                            >
                              <Icon name="download" className="w-3 h-3 mr-1" /> Import to Editor
                            </button>
                          </div>
                          <pre className={`p-4 text-sm font-mono text-left overflow-x-auto ${isDark ? 'bg-black text-gray-300' : 'bg-gray-800 text-white'}`}>
                            {problem.solution?.code}
                          </pre>
                        </div>

                        <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'}`}>
                          <h3 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">Explanation</h3>
                          <div className={`text-sm leading-relaxed ${textPrimary}`} dangerouslySetInnerHTML={{ __html: sanitizedSolutionExplanation }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Code Editor */}
          {/* Logic: On Mobile, only show if activeTab is 'code'. On Desktop, always show. */}
          {/* Changed mt-6 to mt-0 to attach to the tab bar on mobile */}
          <div className={`lg:w-1/2 flex flex-col h-full overflow-hidden mt-0 lg:mt-0 ${activeTab === 'code' ? 'flex' : 'hidden lg:flex'}`}>
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-hidden flex flex-col flex-1 transition-colors border-b lg:border-b ${borderClass}`}>

              {/* MOBILE CODE TOPBAR (Replicating requested design) */}
              <div className="lg:hidden flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex gap-2">
                  {/* Main Tab */}
                  <button
                    onClick={() => setMobileSubTab('code')}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileSubTab === 'code'
                      ? 'border border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    main.{language === 'Python' ? 'py' : language === 'JavaScript' ? 'js' : language === 'Java' ? 'java' : 'c'}
                  </button>

                  {/* Output Tab */}
                  <button
                    onClick={() => setMobileSubTab('output')}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileSubTab === 'output'
                      ? 'border border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    Output
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="w-10 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    {isRunning ? <Loader size="xs" color="white" showText={false} /> : <Icon name="play" className="w-4 h-4 fill-current" />}
                  </button>
                </div>
              </div>

              {/* DESKTOP TOOLBAR (Hidden on Mobile) */}
              <div className={`hidden lg:flex justify-between items-center p-3 border-b ${borderClass}`}>
                <h2 className={`font-semibold ${textPrimary} flex items-center`}>
                  <Icon name="code" className="w-4 h-4 mr-2" /> Editor ({language})
                </h2>
                <div className="flex space-x-2">
                  <button onClick={resetCode} className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition`}>
                    <Icon name="refresh-cw" className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={copyCodeToClipboard} className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition`}>
                    <Icon name="copy" className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Editor Container - Visible if Desktop OR (Mobile AND subTab is 'code') */}
              <div className={`flex-1 min-h-0 relative ${mobileSubTab === 'code' ? 'block' : 'hidden lg:block'}`}>
                <CodeEditorForSolvePage
                  ref={editorRef}
                  initialCode={code}
                  language={language}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  onOutputReceived={handleOutputReceived}
                  onCodeChange={setCode}
                />
              </div>

              {/* Submit Button Area - Visible if Desktop OR (Mobile AND subTab is 'code') */}
              {/* Action Bar (Between Editor and Console) */}
              <div className={`flex items-center justify-between p-2 border-t ${borderClass} ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${mobileSubTab === 'code' ? 'flex' : 'hidden lg:flex'}`}>
                <button
                  onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                  className={`flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-colors ${isConsoleOpen ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <Icon name="terminal" className="w-4 h-4 mr-2" />
                  Console Output
                  <Icon name={isConsoleOpen ? 'chevron-down' : 'chevron-up'} className="w-4 h-4 ml-2" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={isRunning ? handleStopCode : handleRunCode}
                    className={`px-4 py-1.5 rounded text-sm font-bold text-white transition flex items-center ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {isRunning ? (
                      <>
                        <Icon name="square" className="w-3 h-3 mr-2 fill-current" /> Stop
                      </>
                    ) : (
                      <>
                        <Icon name="play" className="w-3 h-3 mr-2 fill-current" /> Run Code
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSubmitCode}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-bold transition flex items-center"
                  >
                    <Icon name="send" className="w-3 h-3 mr-2" /> Submit
                  </button>
                </div>
              </div>

              {/* Collapsible Output Console Container */}
              {isConsoleOpen && (
                <div className={`
                    ${mobileSubTab === 'output' ? 'flex flex-1' : 'hidden lg:flex'} 
                    lg:border-t ${borderClass} 
                    flex-col overflow-hidden bg-white dark:bg-gray-800
                    h-72 transition-all duration-300 ease-in-out relative group
                  `}>

                  {/* Close Button for Console */}
                  <button
                    onClick={() => setIsConsoleOpen(false)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Close Console"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>

                  <div
                    className={`p-4 font-mono text-sm text-left h-full overflow-y-auto whitespace-pre-wrap outline-none cursor-text ${isDark ? 'text-gray-300' : 'text-gray-800'} ${outputError ? 'text-red-400' : ''} ${isWaitingForInput ? 'ring-2 ring-yellow-500/50' : ''}`}
                    ref={consoleRef}
                    tabIndex={0}
                    onClick={() => consoleRef.current?.focus()}
                    style={{
                      caretColor: 'transparent'
                    }}
                  >
                    {output.replace(/\\n/g, '\n')}
                    {isWaitingForInput && (
                      <span className="inline-block w-2 h-5 align-middle bg-yellow-500 animate-pulse ml-1"></span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default SolveProblem;