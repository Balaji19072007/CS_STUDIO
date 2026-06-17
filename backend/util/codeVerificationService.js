const CodeExecutionService = require('./codeExecutionService');
const TestEvaluationService = require('./testEvaluationService');

class CodeVerificationService {
  constructor() {
    this.executionService = new CodeExecutionService();
    this.evaluationService = new TestEvaluationService();
    // Dangerous keywords/patterns to reject
    this.dangerousPatterns = [
      /\b(import|require)\s*\(\s*['"`]fs['"`]\s*\)/gi, // File system access
      /\b(import|require)\s*\(\s*['"`]child_process['"`]\s*\)/gi, // Process spawning
      /\b(import|require)\s*\(\s*['"`]os['"`]\s*\)/gi, // OS operations
      /\bexec\(/gi, // Direct execution
      /\bspawn\(/gi, // Process spawning
      /\bfork\(/gi, // Process forking
      /\b(system|shell_exec|popen)\s*\(/gi, // System calls
      /\brm\s+/gi, // File deletion
      /\brmdir\s+/gi, // Directory deletion
      /\bunlink\s*\(/gi, // File unlinking
      /\bchmod\s+/gi, // Permission changes
      /\bchown\s+/gi, // Ownership changes
      /\bkill\s*\(/gi, // Process killing
      /\bos\._exit\s*\(/gi, // OS exit
      /\bwhile\s*\(\s*true\s*\)/gi, // Infinite loops
      /\bfor\s*\(\s*;;\s*\)/gi, // Infinite loops
      /\bRecursionError/gi, // Potential infinite recursion
      /\bStackOverflowError/gi, // Stack overflow
      /\bOutOfMemoryError/gi, // Memory issues
      /\bInfiniteLoop/gi, // Infinite loops
      /\bSystem\.exit\s*\(/gi, // Java system exit
      /\bRuntime\.getRuntime\(\)\.exec\s*\(/gi, // Java runtime exec
      /\bnew\s+ProcessBuilder\s*\(/gi, // Java process builder
      /\bnew\s+File\s*\(/gi, // Java file operations
      /\bFiles\./gi, // Java NIO files
      /\bPaths\./gi, // Java paths
      /\b#include\s*<windows\.h>/gi, // Windows API
      /\b#include\s*<unistd\.h>/gi, // Unix system calls
      /\bsystem\s*\(/gi, // C system calls
      /\bexecve?\s*\(/gi, // C exec functions
      /\bfork\s*\(/gi, // C fork
      /\bkill\s*\(/gi, // C kill
      /\bremove\s*\(/gi, // C file remove
      /\brmdir\s*\(/gi, // C directory remove
      /\bchmod\s*\(/gi, // C chmod
      /\bchown\s*\(/gi, // C chown
    ];
  }

  /**
   * Check if code contains potentially harmful patterns
   * @param {string} code - The code to check
   * @returns {boolean} True if code appears safe, false if dangerous
   */
  isCodeSafe(code) {
    for (const pattern of this.dangerousPatterns) {
      if (pattern.test(code)) {
        console.warn(`🚨 Dangerous pattern detected: ${pattern}`);
        return false;
      }
    }
    return true;
  }

  /**
   * Verify code correctness by running it with provided input and comparing output exactly
   * @param {string} code - The user's submitted code
   * @param {string} language - Programming language (python, c, cpp, java, javascript)
   * @param {string} input - Input data to pass to the code
   * @param {string} expectedOutput - Expected output for exact comparison
   * @returns {object} Verification result with correctness and details
   */
  async verifyCode(code, language, input, expectedOutput) {
    try {
      console.log(`🔍 Verifying ${language} code with exact output matching`);

      // Security check: reject potentially harmful code
      if (!this.isCodeSafe(code)) {
        return {
          correct: false,
          error: 'Code contains potentially harmful patterns and cannot be executed',
          executionTime: 0,
          message: 'Security violation'
        };
      }

      // Execute the code with the provided input
      const executionResult = await this.executionService.executeCode(code, language, input);

      if (!executionResult.success) {
        return {
          correct: false,
          error: executionResult.error,
          executionTime: executionResult.executionTime,
          message: 'Code execution failed'
        };
      }

      // Perform comparison using TestEvaluationService
      const actualOutput = executionResult.output;
      const evaluationResult = this.evaluationService.compareOutputs(actualOutput, expectedOutput, language);
      const correct = evaluationResult.passed;

      return {
        correct,
        actualOutput,
        expectedOutput,
        executionTime: executionResult.executionTime,
        message: correct ? 'Code is correct' : 'Output mismatch',
        difference: correct ? null : evaluationResult.difference || this.generateDifference(actualOutput, expectedOutput)
      };

    } catch (error) {
      console.error('❌ Code verification error:', error);
      return {
        correct: false,
        error: error.message,
        executionTime: 0,
        message: 'Verification process failed'
      };
    }
  }

  /**
   * Generate a simple difference report for exact comparison
   */
  generateDifference(actual, expected) {
    const actualLines = actual.split('\n');
    const expectedLines = expected.split('\n');

    if (actualLines.length !== expectedLines.length) {
      return `Line count mismatch: got ${actualLines.length}, expected ${expectedLines.length}`;
    }

    for (let i = 0; i < actualLines.length; i++) {
      if (actualLines[i] !== expectedLines[i]) {
        return `Line ${i + 1} mismatch:\nGot: "${actualLines[i]}"\nExpected: "${expectedLines[i]}"`;
      }
    }

    return 'Unknown difference (possible whitespace or encoding issue)';
  }
}

module.exports = CodeVerificationService;