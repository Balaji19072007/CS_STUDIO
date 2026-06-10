// src/components/problems/CodeEditorForSolvePage.jsx
import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Editor from '@monaco-editor/react';
import { sendInputToProgram, setupCompilerSocket, sendCodeForExecution, stopCodeExecution } from '../../api/problemApi.js';
import socketService from '../../services/socketService.js';

// --- CONFIGURATION ---
const MONACO_LANGUAGE_MAP = {
  'C': 'c', 'c': 'c',
  'C++': 'cpp', 'cpp': 'cpp',
  'Java': 'java', 'java': 'java',
  'Python': 'python', 'python': 'python',
  'JavaScript': 'javascript', 'javascript': 'javascript'
};
const EXECUTION_LANGUAGE_MAP = {
  'C': 'c', 'c': 'c',
  'C++': 'cpp', 'cpp': 'cpp',
  'Java': 'java', 'java': 'java',
  'Python': 'python', 'python': 'python',
  'JavaScript': 'javascript', 'javascript': 'javascript'
};

const DEFAULT_CODE = {
  'C': `#include <stdio.h>\n\nint main() {\n    int number;\n    printf("Please enter a number: ");\n    scanf("%d", &number);\n    printf("You entered: %d\\n", number);\n    return 0;\n}`,

  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,

  'Java': `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,

  'Python': `\n# Write your code here\n`,

  'JavaScript': `// Write your code here\nconst solution = (input) => {\n  return "Output";\n};`
};

const CodeEditorForSolvePage = forwardRef(({
  initialCode = DEFAULT_CODE['Python'],
  language: propLanguage = 'Python',
  theme: propTheme = 'vs-dark',
  onOutputReceived,
  onCodeChange,
}, ref) => {

  const [code, setCode] = useState(initialCode);
  const [language] = useState(propLanguage);
  const [theme] = useState(propTheme);

  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  const editorRef = useRef(null);
  const inputBufferRef = useRef('');
  // parent's console DOM node (passed via setTerminalRef)
  const consoleDomRef = useRef(null);

  // Sync props to internal state
  useEffect(() => {
    setCode(initialCode);
    // Theme and Language props are read-only here
  }, [initialCode, propTheme, propLanguage]);

  // --- Socket.IO Initialization and Listeners (FIXED) ---
  useEffect(() => {
    // Initialize socket service if not already connected
    const token = localStorage.getItem('token') || 'anonymous';
    if (!socketService.isConnected) {
      console.log('🔌 Initializing socket service for compiler...');
      socketService.connect(token);
    }

    // Set up compiler socket with the centralized service
    setupCompilerSocket((output, isError, isRunningState, isWaitingInput) => {
      let currentWaitingState = isWaitingInput;
      if (isWaitingInput !== undefined) {
        setIsWaitingForInput(isWaitingInput);
      }
      if (isRunningState === false) {
        setIsWaitingForInput(false);
        currentWaitingState = false;
      }
      if (onOutputReceived) {
        // Pass all state info (including isWaitingInput) to parent
        onOutputReceived(output, isError, isRunningState, currentWaitingState);
      }
    });

    return () => {
      // Don't disconnect the socket service completely as it might be used elsewhere
      // Just remove the compiler-specific event listeners
      // socketService.removeCompilerListeners() would be cleaner if exposed, 
      // but modifying existing method is safer.
      const socket = socketService.socket;
      if (socket) {
        socket.off('execution-result');
        socket.off('execution-output');
        socket.off('waiting-for-input');
        socket.off('connect_error');
        socket.off('disconnect');
      }
    };
  }, [onOutputReceived]);





  const handleRunCode = useCallback((codeToRun) => {
    if (!socketService.isConnected) {
      if (onOutputReceived) onOutputReceived('Compiler service is disconnected. Check network.', true, false);
      return;
    }
    setIsWaitingForInput(false);
    inputBufferRef.current = '';

    const executionLanguage = EXECUTION_LANGUAGE_MAP[language] || language.toLowerCase();

    // FIX: Use imported sendCodeForExecution helper
    try {
      sendCodeForExecution(codeToRun, executionLanguage);
    } catch (error) {
      if (onOutputReceived) onOutputReceived(`Execution Error: ${error.message}`, true, false);
    }

  }, [language, onOutputReceived]);

  const handleStopExecution = useCallback(() => {
    // FIX: Use imported stopCodeExecution helper
    try {
      stopCodeExecution();
    } catch (error) {
      console.error('Error stopping execution:', error);
    }

    inputBufferRef.current = '';

    // Explicitly update parent state to stop running
    if (onOutputReceived) onOutputReceived('\nExecution stopped by user.\n', true, false, false);
  }, [onOutputReceived]);

  const handleEditorChange = (value) => {
    setCode(value || '');
    if (onCodeChange) onCodeChange(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setTimeout(() => editor?.focus?.(), 50);
  };

  // --- Expose public methods via ref (FIXED) ---
  useImperativeHandle(ref, () => ({
    runCode: (c) => handleRunCode(c),
    stopCode: handleStopExecution,
    getCode: () => editorRef.current?.getValue() || code,
    // EXPOSED: Function to receive the parent's console DOM node
    setTerminalRef: (node) => { consoleDomRef.current = node; },
    getIsWaitingForInput: () => isWaitingForInput,
  }));

  const finalLanguage = language;
  const finalTheme = theme;

  return (
    <div className={`flex flex-col h-full border-none overflow-hidden`}>
      <div className={`flex-1 overflow-hidden h-full`}>
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
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              alwaysConsumeMouseWheel: false,
            },
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
            formatOnType: true,
            formatOnPaste: true,
          }}
        />
      </div>
    </div>
  );
});

export default CodeEditorForSolvePage;
