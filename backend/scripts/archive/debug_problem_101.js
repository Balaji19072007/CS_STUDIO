const path = require('path');
const { runCodeTest } = require('./util/codeRunner');
const TestEvaluationService = require('./util/testEvaluationService');
const courseProblemData = require('./util/courseProblemData.json');

async function testProblem101() {
    console.log('--- Debugging Problem 101: C Fun Print ---');

    // 1. Get Problem Data
    const problem = courseProblemData.find(p => p.id === 101);
    if (!problem) {
        console.error('Problem 101 not found!');
        return;
    }
    console.log('Problem loaded:', problem.title);

    // 2. Define User Code (The "Correct" Solution)
    const code = `#include <stdio.h>

int main() {
    printf("C is fun!");
    return 0;
}`;

    const language = 'C';
    const evaluationService = new TestEvaluationService();

    // 3. Run Test Case
    const testCase = problem.testCases[0];
    console.log(`Test Input: "${testCase.input}"`);
    console.log(`Expected Output (raw): ${JSON.stringify(testCase.expected)}`);

    try {
        console.log('Running code...');
        const result = await runCodeTest(language, code, testCase.input);

        console.log('--- Execution Result ---');
        console.log(`Exit Code: ${result.exitCode}`);
        console.log(`Stdout (raw): ${JSON.stringify(result.stdout)}`);
        console.log(`Stderr: ${result.stderr}`);

        // 4. Evaluation
        const cleanedActual = evaluationService.cleanOutput(result.stdout);
        const cleanedExpected = evaluationService.cleanOutput(testCase.expected);

        console.log('--- Evaluation ---');
        console.log(`Cleaned Actual:   ${JSON.stringify(cleanedActual)}`);
        console.log(`Cleaned Expected: ${JSON.stringify(cleanedExpected)}`);

        const comparison = evaluationService.compareOutputs(cleanedActual, cleanedExpected, language);
        console.log('Comparison Result:', JSON.stringify(comparison, null, 2));

        if (comparison.passed) {
            console.log('✅ TEST PASSED');
        } else {
            console.log('❌ TEST FAILED');
        }

    } catch (err) {
        console.error('Execution Error:', err);
    }
}

testProblem101();
