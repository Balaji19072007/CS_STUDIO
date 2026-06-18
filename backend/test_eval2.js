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
    // Problem 101 (Java) - Basic Hello World Java
    await testLang(101, `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
    }
}`);

    // Problem 151 (C++) - Basic Hello World C++
    await testLang(151, `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, C++ World!\\n";
    return 0;
}`);

    // Problem 201 (JS) - Basic Console Output JavaScript
    await testLang(201, `console.log("Hello, JavaScript!");`);
})();
