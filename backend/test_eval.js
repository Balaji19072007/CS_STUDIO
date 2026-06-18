const { runCodeTest } = require('./util/codeRunner');
const TestEvaluationService = require('./util/testEvaluationService');
const TestInputCleaner = require('./util/testInputCleaner');
const problemData = require('./util/problemData.json');

async function testLang(id, solCode) {
    const p = problemData.find(x => x.id === id);
    if (!p) {
        console.log(`Problem ${id} not found`);
        return;
    }
    console.log('Testing Problem', id, p.title, p.language);
    const evalSvc = new TestEvaluationService();
    let passed = 0;
    for (const tc of p.testCases) {
        const cleanedInput = TestInputCleaner.cleanTestInput(tc.input, p.language);
        const result = await runCodeTest(p.language, solCode, cleanedInput);
        const cleanedOutput = evalSvc.cleanOutput(result.stdout);
        const expected = tc.expected || tc.expected_output || tc.expectedOutput;
        const comparison = evalSvc.compareOutputs(cleanedOutput, expected, p.language);
        if (comparison.passed) passed++;
        else console.log('Failed TC:', {input: cleanedInput, expected, actual: cleanedOutput, stderr: result.stderr, diff: comparison.difference});
    }
    console.log(passed + '/' + p.testCases.length + ' passed.\n');
}

(async () => {
    // Problem 1 (C) - Simple I/O
    await testLang(1, '#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("Sum: %d\\nProduct: %d\\n", a+b, a*b); return 0; }');

    // Problem 51 (Python) - Simple I/O
    await testLang(51, 'print(input()[::-1])');
})();
