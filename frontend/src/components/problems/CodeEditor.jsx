// src/components/problems/CodeEditor.jsx
import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Editor from '@monaco-editor/react';
import { API_CONFIG } from '../../config/api.js';
import { setupCompilerSocket, sendCodeForExecution, sendInputToProgram, stopCodeExecution } from '../../api/problemApi.js';
import socketService from '../../services/socketService.js';

// --- CONFIGURATION ---
const MONACO_LANGUAGE_MAP = {
  'C': 'c', 'C++': 'cpp', 'Java': 'java', 'Python': 'python', 'JavaScript': 'javascript',
};

const SUPPORTED_LANGUAGES = ['C', 'C++', 'Java', 'Python', 'JavaScript'];

// Add execution language mapping
const EXECUTION_LANGUAGE_MAP = {
  'C': 'c',
  'C++': 'cpp',
  'Java': 'java',
  'Python': 'python',
  'JavaScript': 'javascript'
};

const DEFAULT_CODE = {
  'C': `#include <stdio.h>\n\nint main() {\n    int number;\n    printf("Please enter a number: ");\n    scanf("%d", &number);\n    printf("You entered: %d\\n", number);\n    return 0;\n}`,

  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number;\n    cout << "Enter a number: ";\n    cin >> number;\n    cout << "You entered: " << number << endl;\n    return 0;\n}`,

  'Java': `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter a number: ");\n        int number = scanner.nextInt();\n        System.out.println("You entered: " + number);\n        scanner.close();\n    }\n}`,

  'Python': `user_input = input("Enter number: ")\nprint("You entered:", user_input)`,

  'JavaScript': `const readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.question('Enter number: ', (answer) => {\n  console.log('You entered:', answer);\n  rl.close();\n});`
};

const CodeEditor = forwardRef(({
  initialCode = DEFAULT_CODE['Python'],
  language: propLanguage = 'Python',
  theme: propTheme = 'vs-dark',
  isProblemSolver = false
}, ref) => {

  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(propLanguage);
  const [theme, setTheme] = useState(propTheme);

  // State for real-time input handling
  const [cmdArgs, setCmdArgs] = useState('');
  const [output, setOutput] = useState('Output will appear here.');
  const [isRunning, setIsRunning] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [error, setError] = useState('');


  const editorRef = useRef(null);
  const terminalRef = useRef(null);
  const inputBufferRef = useRef('');
  const isInputActiveRef = useRef(false);

  // Sync props to internal state
  useEffect(() => {
    setCode(initialCode);
    setTheme(propTheme);
    setLanguage(propLanguage);
  }, [initialCode, propTheme, propLanguage]);

  // Update code when language changes
  // Update code when language changes
  useEffect(() => {
    if (!isProblemSolver) {
      // Only reset to default code if the user manually changed the language
      // (i.e., current language is different from the prop passed language)
      if (language !== propLanguage) {
        setCode(DEFAULT_CODE[language] || '');
        setOutput('Output will appear here.');
        setError('');
        setIsRunning(false);
        setIsWaitingForInput(false);
        inputBufferRef.current = '';
        isInputActiveRef.current = false;
      }
    }
  }, [language, isProblemSolver, propLanguage]);

  // --- Theme-aware classes ---
  const isDarkTheme = theme === 'vs-dark' || theme === 'hc-black';
  const toolbarBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-100';
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-300';
  const ioHeaderBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-200';
  const ioBodyBg = isDarkTheme ? 'bg-gray-900' : 'bg-white';

  const textMain = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-gray-400' : 'text-gray-600';

  const outputTextClass = isDarkTheme ? 'text-green-400' : 'text-green-600';
  const errorTextClass = isDarkTheme ? 'text-red-400' : 'text-red-600';
  const inputPromptClass = isDarkTheme ? 'text-yellow-400' : 'text-yellow-600';
  // ----------------------------------------------------

  // --- Socket.IO Initialization and Listeners (FIXED) ---
  useEffect(() => {
    // Initialize socket service if not already connected
    const token = localStorage.getItem('token') || 'anonymous';
    if (!socketService.isConnected) {
      console.log('🔌 Initializing socket service for freeform editor...');
      socketService.connect(token);
    }

    // Set up compiler socket with the centralized service
    setupCompilerSocket((output, isError, isRunningState, isWaitingInput) => {
      if (isWaitingInput !== undefined) {
        setIsWaitingForInput(isWaitingInput);
        isInputActiveRef.current = isWaitingInput;
      }

      if (isRunningState === false) {
        setIsWaitingForInput(false);
        isInputActiveRef.current = false;
      }

      if (isError) {
        setError(output);
      } else {
        setOutput(prev => {
          if (prev === 'Output will appear here.' || prev === 'Executing...\n') {
            return output;
          }
          return prev + output;
        });
      }

      setIsRunning(Boolean(isRunningState));
    });

    return () => {
      // Remove compiler-specific event listeners
      socketService.removeCompilerListeners();
      const socket = socketService.socket;
      if (socket) {
        socket.off('connect_error');
        socket.off('disconnect');
      }
    };
  }, []);

  // Handle terminal key presses for input
  useEffect(() => {
    const handleTerminalKeyPress = (e) => {
      if (!isWaitingForInput || !terminalRef.current) return;

      // Only handle if terminal is focused
      if (document.activeElement !== terminalRef.current) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        // Send the input buffer
        if (inputBufferRef.current.trim() !== '') {
          if (socketService.isConnected) {
            sendInputToProgram(inputBufferRef.current);
            // Add the input to output with a newline
            setOutput(prev => prev + inputBufferRef.current + '\n');
            inputBufferRef.current = '';
            // setIsWaitingForInput(false); // Keep input active
            isInputActiveRef.current = true; // Keep active
          }
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        // Remove last character from input buffer
        if (inputBufferRef.current.length > 0) {
          inputBufferRef.current = inputBufferRef.current.slice(0, -1);
          setOutput(prev => {
            // Remove the last visible character from output
            const lines = prev.split('\n');
            if (lines.length > 0) {
              const lastLine = lines[lines.length - 1];
              // Only modify if we're in active input mode
              if (isInputActiveRef.current && lastLine.length > 0) {
                lines[lines.length - 1] = lastLine.slice(0, -1);
                return lines.join('\n');
              }
            }
            return prev;
          });
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        // Add character to input buffer
        inputBufferRef.current += e.key;
        setOutput(prev => prev + e.key);
      }
    };

    document.addEventListener('keydown', handleTerminalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleTerminalKeyPress);
    };
  }, [isWaitingForInput]);

  // Focus terminal when waiting for input
  useEffect(() => {
    if (isWaitingForInput && terminalRef.current) {
      terminalRef.current.focus();
    }
  }, [isWaitingForInput]);

  // Use proper execution language mapping
  const handleRunCode = useCallback((codeToRun) => {
    if (!socketService.isConnected) {
      setOutput('Compiler service is disconnected. Check network.');
      return;
    }

    setIsRunning(true);
    setIsWaitingForInput(false);
    isInputActiveRef.current = false;
    setOutput('Running...\n');
    setError('');
    inputBufferRef.current = '';

    // Use the correct execution language mapping
    const executionLanguage = EXECUTION_LANGUAGE_MAP[language] || language.toLowerCase();

    try {
      sendCodeForExecution(codeToRun, executionLanguage, '', cmdArgs);
    } catch (error) {
      setOutput(`Execution Error: ${error.message}`);
      setIsRunning(false);
    }
  }, [language, cmdArgs]);

  // Stop execution
  const handleStopExecution = useCallback(() => {
    if (socketService.isConnected) {
      stopCodeExecution();
    }
    setIsRunning(false);
    setIsWaitingForInput(false);
    isInputActiveRef.current = false;
  }, []);

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    runCode: handleRunCode,
    stopCode: handleStopExecution,
    getCode: () => editorRef.current?.getValue() || code,
  }));

  // --- UI Handlers (Only active in Freeform mode) ---
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'output'

  const handleInternalRunCode = () => {
    if (!isProblemSolver) {
      if (isRunning) {
        handleStopExecution();
      } else {
        if (window.innerWidth < 1024) setMobileTab('output');
        handleRunCode(code);
      }
    }
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language] || '');
    setOutput('Output will appear here.');
    setError('');
    setIsRunning(false);
    setIsWaitingForInput(false);
    inputBufferRef.current = '';
    isInputActiveRef.current = false;
  };

  const handleCopyCode = () => {
    const codeToCopy = editorRef.current?.getValue() || code;
    navigator.clipboard.writeText(codeToCopy);
  };

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Code will be updated automatically via useEffect
  };

  const showControls = !isProblemSolver;
  const finalLanguage = language;
  const finalTheme = theme;

  // --- Terminal Output Rendering Logic ---
  const renderTerminalOutput = () => {
    if (error) {
      return <pre className={`${errorTextClass} font-mono text-sm whitespace-pre-wrap text-left`}>{error}</pre>;
    }

    let displayOutput = output;

    return (
      <pre className={`font-mono text-sm whitespace-pre-wrap ${outputTextClass} text-left`}>
        {displayOutput}
        {isWaitingForInput && (
          <span className={`${inputPromptClass} blink`}>█</span>
        )}
      </pre>
    );
  };

  // Handle terminal click to focus
  const handleTerminalClick = () => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  };

  return (
    <div className={`flex flex-col h-full ${ioBodyBg} ${showControls ? `rounded-lg border ${borderClass}` : 'border-none'} overflow-hidden`}>

      {/* --- DESKTOP TOOLBAR (Hidden on Mobile) --- */}
      {showControls && (
        <div className={`hidden lg:flex items-center justify-between px-4 py-3 ${toolbarBg} border-b ${borderClass}`}>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select
              value={finalLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`px-3 py-2 ${ioBodyBg} border ${borderClass} ${textMain} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}> {lang} </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className={`hidden md:flex items-center px-2 py-1.5 border rounded-md ${borderClass} ${ioBodyBg} focus-within:ring-2 focus-within:ring-blue-500 transition-shadow`}>
              <span className={`text-xs mr-2 font-medium opacity-70 ${textMain}`}>Args:</span>
              <input 
                type="text" 
                placeholder="arg1 arg2..."
                className={`bg-transparent text-sm font-mono w-32 focus:outline-none ${textMain} placeholder-gray-400`}
                value={cmdArgs}
                onChange={(e) => setCmdArgs(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <button
              onClick={handleCopyCode}
              className={`px-3 py-2 ${toolbarBg} hover:${ioHeaderBg} ${textSecondary} rounded-md text-sm transition-colors border ${borderClass}`}
              title="Copy Code"
            > 📋 Copy </button>
            <button
              onClick={handleReset}
              className={`px-3 py-2 ${toolbarBg} hover:${ioHeaderBg} ${textSecondary} rounded-md text-sm transition-colors border ${borderClass}`}
              title="Reset Code"
            > 🔄 Reset </button>
            <button
              onClick={handleInternalRunCode}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
              {isRunning ? '⏹️ Stop' : '▶️ Run Code'}
            </button>
          </div>
        </div>
      )}

      {/* --- MOBILE TOOLBAR (Visible Only on Mobile) --- */}
      {showControls && (
        <div className="lg:hidden flex flex-col border-b border-gray-200 dark:border-gray-700">
          {/* Row 1: Tabs and Run Button */}
          <div className={`flex items-center justify-between p-2 ${toolbarBg} gap-1 overflow-x-auto custom-scrollbar`}>
            <div className="flex gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => setMobileTab('editor')}
                className={`px-3 sm:px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileTab === 'editor'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
              >
                Main
              </button>
              <button
                onClick={() => setMobileTab('output')}
                className={`px-3 sm:px-4 py-1.5 rounded text-sm font-medium transition-colors ${mobileTab === 'output'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
              >
                Output
              </button>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-1">
              <div className={`flex items-center px-1.5 py-1 border rounded-md ${borderClass} ${ioBodyBg} focus-within:ring-1 focus-within:ring-blue-500`}>
                <span className={`text-[10px] mr-1 font-medium opacity-70 ${textMain} hidden sm:inline`}>Args:</span>
                <input 
                  type="text" 
                  placeholder="args..."
                  className={`bg-transparent text-xs font-mono w-14 sm:w-16 min-w-0 focus:outline-none ${textMain} placeholder-gray-400`}
                  value={cmdArgs}
                  onChange={(e) => setCmdArgs(e.target.value)}
                  disabled={isRunning}
                />
              </div>
              <button
                onClick={handleInternalRunCode}
                className={`w-9 h-8 sm:w-10 flex shrink-0 items-center justify-center rounded transition-colors ${isRunning
                  ? 'bg-red-600 text-white'
                  : 'bg-green-600 text-white'
                  }`}
              >
                {isRunning ? (
                  <div className="w-3 h-3 bg-white rounded-sm" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Row 2: Controls (Language, Copy, Reset) - Only visible in Editor Tab */}
          {mobileTab === 'editor' && (
            <div className={`flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800`}>
              {/* Language Selector */}
              <select
                value={finalLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className={`text-xs font-medium bg-transparent border-none focus:ring-0 ${textMain} p-0 cursor-pointer`}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"> {lang} </option>
                ))}
              </select>

              <div className="flex gap-4">
                <button onClick={handleCopyCode} className={`${textSecondary} hover:${textMain}`} title="Copy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
                <button onClick={handleReset} className={`${textSecondary} hover:${textMain}`} title="Reset">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editor */}
      <div className={`flex-1 overflow-hidden ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
        <Editor
          height="100%"
          language={MONACO_LANGUAGE_MAP[finalLanguage]}
          theme={finalTheme}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            }
          }}
        />
      </div>

      {/* Input/Output Section */}
      {showControls && (
        <div className={`
          border-t ${borderClass} flex-col 
          ${mobileTab === 'output' ? 'flex h-full' : 'hidden lg:flex lg:h-64'}
        `}>
          <div className={`flex border-b ${borderClass} h-full`}>

            {/* Terminal View */}
            <div className="flex-1 flex flex-col">
              <div className={`px-4 py-2 ${ioHeaderBg} font-semibold text-sm ${textMain} lg:block hidden`}>
                Terminal
                {(error || isRunning || isWaitingForInput) && (
                  <span className={`ml-2 ${error ? errorTextClass :
                    isWaitingForInput ? inputPromptClass : textSecondary
                    }`}>
                    ({error ? 'Error' : isWaitingForInput ? 'Waiting for input' : 'Live'})
                  </span>
                )}
              </div>

              {/* Mobile Terminal Header just to show status if needed, or hide it to maximize space */}
              <div className={`px-4 py-2 ${ioHeaderBg} font-semibold text-sm ${textMain} lg:hidden flex justify-between`}>
                <span>Console Output</span>
                {(error || isRunning || isWaitingForInput) && (
                  <span className={`${error ? errorTextClass : isWaitingForInput ? inputPromptClass : textSecondary}`}>
                    {error ? 'Error' : isWaitingForInput ? 'Waiting for input' : 'Live'}
                  </span>
                )}
              </div>

              <div className={`h-full flex flex-col`}>

                {/* Terminal Display - Clickable and focusable */}
                <div
                  ref={terminalRef}
                  tabIndex={0}
                  onClick={handleTerminalClick}
                  className={`flex-1 px-4 py-2 ${ioBodyBg} overflow-auto font-mono text-sm whitespace-pre-wrap outline-none cursor-text text-left ${isWaitingForInput ? 'ring-1 ring-yellow-500' : ''
                    }`}
                  style={{
                    caretColor: isWaitingForInput ? (isDarkTheme ? '#fbbf24' : '#d97706') : 'transparent',
                    textAlign: 'left'
                  }}
                >
                  {renderTerminalOutput()}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CodeEditor;