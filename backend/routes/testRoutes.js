const express = require('express');
const router = express.Router();
const TestRunner = require('../util/testRunner');
const CodeVerificationService = require('../util/codeVerificationService');
const { supabase } = require('../config/supabase');

const testRunner = new TestRunner();
const codeVerificationService = new CodeVerificationService();

/**
 * Run tests for a problem
 */
router.post('/run-tests', async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, code, language'
      });
    }

    console.log(`🧪 Test request for problem ${problemId}, language: ${language}`);

    const results = await testRunner.runTests(problemId, code, language);

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('❌ Test route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Run sample tests only
 */
router.post('/run-sample-tests', async (req, res) => {
  try {
    const { problemId, code, language, maxSamples = 2 } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, code, language'
      });
    }

    const results = await testRunner.runSampleTests(problemId, code, language, maxSamples);

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('❌ Sample test route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Validate code syntax (basic check)
 */
router.post('/validate-syntax', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    // Basic syntax validation - you can enhance this per language
    const validation = validateSyntax(code, language);

    res.json({
      success: true,
      data: validation
    });

  } catch (error) {
    console.error('❌ Syntax validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get problem test cases (without solutions)
 */
router.get('/problem/:problemId/test-cases', async (req, res) => {
  try {
    const { problemId } = req.params;

    const { data: problem, error } = await supabase
      .from('problems')
      .select('*')
      .eq('problem_id', parseInt(problemId))
      .single();

    if (error || !problem) {
      return res.status(404).json({
        success: false,
        error: `Problem with ID ${problemId} not found`
      });
    }

    const exampleList = problem.examples || problem.test_cases || [];

    const testCases = exampleList.map(example => ({
      input: example.input,
      output: example.output || example.expectedOutput,
      explanation: example.explanation
    }));

    res.json({
      success: true,
      data: {
        problemId: problem.problemId,
        title: problem.title,
        difficulty: problem.difficulty,
        testCases: testCases
      }
    });

  } catch (error) {
    console.error('❌ Get test cases error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Verify code correctness with exact output matching
 */
router.post('/verify-code', async (req, res) => {
  try {
    const { code, language, input, expectedOutput } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    console.log(`🔍 Verification request for ${language} code`);

    const result = await codeVerificationService.verifyCode(code, language, input || '', expectedOutput || '');

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Code verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * AI Tutor Chat endpoint
 */
router.post('/ai-tutor/chat', async (req, res) => {
  try {
    const { message, context, problemId, language, aiModel } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    console.log(`🤖 AI Tutor chat request - Model: ${aiModel}, Context: ${context}`);

    // For now, return a mock response. In a real implementation, you would integrate with OpenAI API
    let response = '';

    if (aiModel === 'chatgpt') {
      // Mock ChatGPT response with line-by-line streaming simulation
      response = `I understand you're asking about programming concepts. Let me help you break this down step by step:

First, let's consider the fundamentals of what you're working with.

When dealing with variables and data types, it's important to understand how different programming languages handle memory allocation and type safety.

For example, in strongly typed languages like Java or C++, you need to explicitly declare variable types, while in dynamically typed languages like Python or JavaScript, the interpreter handles type inference automatically.

This difference affects how you approach problem-solving and code design. Would you like me to elaborate on any specific aspect of this topic?`;
    } else {
      // Custom AI tutor response
      response = `Hello! I'm your AI Programming Tutor. I can help you understand programming concepts, provide hints for coding problems, and guide you through algorithmic thinking.

Based on your question, here's what I can help you with:

• **Programming Fundamentals**: Variables, loops, functions, data structures
• **Problem-Solving Strategies**: Breaking down complex problems into smaller steps
• **Debugging Techniques**: Finding and fixing common programming errors
• **Algorithmic Thinking**: Understanding efficient solutions to problems

What specific topic would you like to explore? Feel free to ask me anything about programming!`;
    }

    res.json({
      success: true,
      data: {
        response: response,
        timestamp: new Date().toISOString(),
        aiModel: aiModel || 'custom'
      }
    });

  } catch (error) {
    console.error('❌ AI Tutor chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function for basic syntax validation
function validateSyntax(code, language) {
  const issues = [];

  // Basic common validations
  if (!code.trim()) {
    issues.push('Code is empty');
  }

  // Language-specific validations
  switch (language.toLowerCase()) {
    case 'python':
      if (!code.includes('\n') && code.length > 100) {
        issues.push('Python code should have proper line breaks');
      }
      break;

    case 'c':
    case 'cpp':
      if (!code.includes('{') || !code.includes('}')) {
        issues.push('C/C++ code should have proper braces');
      }
      if (!code.includes('int main') && !code.includes('void main')) {
        issues.push('C/C++ code should have a main function');
      }
      break;

    case 'java':
      if (!code.includes('class') || !code.includes('{') || !code.includes('}')) {
        issues.push('Java code should have a class with proper braces');
      }
      if (!code.includes('public static void main')) {
        issues.push('Java code should have a main method');
      }
      break;
  }

  return {
    isValid: issues.length === 0,
    issues: issues,
    warning: issues.length > 0 ? 'Code may have syntax issues' : 'Syntax appears valid'
  };
}

module.exports = router;