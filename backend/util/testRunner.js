const TestEvaluationService = require('./testEvaluationService');
const CodeExecutionService = require('./codeExecutionService');
const { supabase } = require('../config/supabase');

class TestRunner {
  constructor() {
    this.evaluationService = new TestEvaluationService();
    this.executionService = new CodeExecutionService();
  }

  /**
   * Run all test cases for a problem against user's code
   */
  async runTests(problemId, userCode, language) {
    try {
      console.log(`🧪 Running tests for problem ${problemId}, language: ${language}`);
      
      // Get problem with test cases
      const { data: problem, error } = await supabase
        .from('problems')
        .select('*')
        .eq('problem_id', problemId)
        .single();

      if (error || !problem) {
        throw new Error(`Problem with ID ${problemId} not found`);
      }

      const examples = problem.examples || problem.test_cases || [];

      if (!examples || examples.length === 0) {
        throw new Error(`No test cases found for problem ${problemId}`);
      }

      const results = {
        problemId: problem.problem_id,
        title: problem.title,
        difficulty: problem.difficulty,
        totalTests: examples.length,
        passedTests: 0,
        failedTests: 0,
        testCases: [],
        executionTime: 0,
        overallResult: 'FAILED'
      };

      const startTime = Date.now();

      // Run each test case
      for (let i = 0; i < examples.length; i++) {
        const testCase = examples[i];
        const testResult = await this.runSingleTestCase(
          userCode, 
          language, 
          testCase, 
          i + 1
        );
        
        results.testCases.push(testResult);
        
        if (testResult.passed) {
          results.passedTests++;
        } else {
          results.failedTests++;
        }
      }

      results.executionTime = Date.now() - startTime;
      results.overallResult = results.failedTests === 0 ? 'PASSED' : 'FAILED';

      console.log(`✅ Test run completed: ${results.passedTests}/${results.totalTests} passed`);
      
      return results;

    } catch (error) {
      console.error('❌ Test runner error:', error);
      throw error;
    }
  }

  /**
   * Run a single test case
   */
  async runSingleTestCase(userCode, language, testCase, testNumber) {
    try {
      console.log(`🔍 Running test case ${testNumber}:`, {
        input: testCase.input.substring(0, 100) + '...',
        expectedOutput: testCase.expectedOutput?.substring(0, 100) + '...' || testCase.output?.substring(0, 100) + '...'
      });

      const input = testCase.input;
      const expectedOutput = testCase.expectedOutput || testCase.output;

      // Execute the code with the test input
      const executionResult = await this.executionService.executeCode(
        userCode, 
        language, 
        input
      );

      if (!executionResult.success) {
        return {
          testNumber,
          input,
          expectedOutput,
          actualOutput: null,
          passed: false,
          error: executionResult.error,
          executionTime: executionResult.executionTime || 0
        };
      }

      // Compare the output
      const comparisonResult = this.evaluationService.compareOutputs(
        executionResult.output, 
        expectedOutput,
        language
      );

      return {
        testNumber,
        input,
        expectedOutput,
        actualOutput: executionResult.output,
        passed: comparisonResult.passed,
        matchType: comparisonResult.matchType,
        difference: comparisonResult.difference,
        executionTime: executionResult.executionTime || 0
      };

    } catch (error) {
      console.error(`❌ Test case ${testNumber} error:`, error);
      return {
        testNumber,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput || testCase.output,
        actualOutput: null,
        passed: false,
        error: error.message,
        executionTime: 0
      };
    }
  }

  /**
   * Run sample test cases only (for initial testing)
   */
  async runSampleTests(problemId, userCode, language, maxSamples = 2) {
    try {
      const { data: problem, error } = await supabase
        .from('problems')
        .select('*')
        .eq('problem_id', problemId)
        .single();

      if (error || !problem) {
        throw new Error(`Problem with ID ${problemId} not found`);
      }

      const examples = problem.examples || problem.test_cases || [];
      if (!examples || examples.length === 0) {
        throw new Error(`No test cases found for problem ${problemId}`);
      }

      const sampleTestCases = examples.slice(0, maxSamples);
      const results = {
        problemId: problem.problem_id,
        title: problem.title,
        sampleTests: [],
        totalSamples: sampleTestCases.length
      };

      for (let i = 0; i < sampleTestCases.length; i++) {
        const testCase = sampleTestCases[i];
        const testResult = await this.runSingleTestCase(
          userCode, 
          language, 
          testCase, 
          i + 1
        );
        
        results.sampleTests.push(testResult);
      }

      return results;

    } catch (error) {
      console.error('❌ Sample test runner error:', error);
      throw error;
    }
  }
}

module.exports = TestRunner;