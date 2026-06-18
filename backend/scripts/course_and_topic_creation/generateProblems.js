const fs = require('fs');
const path = require('path');

const languages = ['C', 'Python', 'Java', 'JavaScript', 'C++'];
const difficulties = ['Easy', 'Medium', 'Hard'];

// Helper to get diverse problem templates
const getTemplates = () => {
    return [
        {
            title: "Sum of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to find the sum of two integers provided as input.",
            inputFormat: "Two integers separated by space or newline.",
            outputFormat: "Print the sum of the two numbers.",
            tags: ["math", "basic"],
            logic: (a, b) => a + b
        },
        {
            title: "Difference of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to find the difference between two integers (First - Second).",
            inputFormat: "Two integers separated by space or newline.",
            outputFormat: "Print the difference.",
            tags: ["math", "basic"],
            logic: (a, b) => a - b
        },
        {
            title: "Product of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to calculate the product of two integers.",
            inputFormat: "Two integers.",
            outputFormat: "Print the product.",
            tags: ["math", "basic"],
            logic: (a, b) => a * b
        },
        {
            title: "Division of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to perform integer division (First / Second). Assume second is non-zero.",
            inputFormat: "Two integers.",
            outputFormat: "Print the integer quotient.",
            tags: ["math", "basic"],
            logic: (a, b) => Math.floor(a / b)
        },
        {
            title: "Remainder of Division",
            difficulty: "Easy",
            statement: "Write a program to find the remainder when the first number is divided by the second.",
            inputFormat: "Two integers.",
            outputFormat: "Print the remainder.",
            tags: ["math", "basic"],
            logic: (a, b) => a % b
        },
        {
            title: "Check Even or Odd",
            difficulty: "Easy",
            statement: "Write a program to check if a number is even or odd.",
            inputFormat: "A single integer.",
            outputFormat: "Print 'Even' or 'Odd'.",
            tags: ["math", "condition"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 100);
                return { input: `${n}`, expected: n % 2 === 0 ? "Even" : "Odd" };
            }
        },
        {
            title: "Check Positive or Negative",
            difficulty: "Easy",
            statement: "Write a program to check if a number is positive, negative, or zero.",
            inputFormat: "A single integer.",
            outputFormat: "Print 'Positive', 'Negative', or 'Zero'.",
            tags: ["math", "condition"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 200) - 100;
                let exp = "Zero";
                if (n > 0) exp = "Positive";
                if (n < 0) exp = "Negative";
                return { input: `${n}`, expected: exp };
            }
        },
        {
            title: "Maximum of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to find the maximum of two numbers.",
            inputFormat: "Two integers.",
            outputFormat: "Print the larger number.",
            tags: ["math", "condition"],
            logic: (a, b) => Math.max(a, b)
        },
        {
            title: "Minimum of Two Numbers",
            difficulty: "Easy",
            statement: "Write a program to find the minimum of two numbers.",
            inputFormat: "Two integers.",
            outputFormat: "Print the smaller number.",
            tags: ["math", "condition"],
            logic: (a, b) => Math.min(a, b)
        },
        {
            title: "Square of a Number",
            difficulty: "Easy",
            statement: "Write a program to calculate the square of a number.",
            inputFormat: "A single integer.",
            outputFormat: "Print the square.",
            tags: ["math"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 20);
                return { input: `${n}`, expected: `${n * n}` };
            }
        },
        {
            title: "Cube of a Number",
            difficulty: "Easy",
            statement: "Write a program to calculate the cube of a number.",
            inputFormat: "A single integer.",
            outputFormat: "Print the cube.",
            tags: ["math"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 15);
                return { input: `${n}`, expected: `${n * n * n}` };
            }
        },
        {
            title: "Vote Eligibility",
            difficulty: "Easy",
            statement: "Write a program to check if a person is eligible to vote. Age must be 18 or older.",
            inputFormat: "A single integer representing age.",
            outputFormat: "Print 'Eligible' or 'Not Eligible'.",
            tags: ["condition"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 80);
                return { input: `${n}`, expected: n >= 18 ? "Eligible" : "Not Eligible" };
            }
        },
        {
            title: "Sum of First N Natural Numbers",
            difficulty: "Easy",
            statement: "Write a program to calculate the sum of first N natural numbers.",
            inputFormat: "A positive integer N.",
            outputFormat: "Print the sum.",
            tags: ["loops", "math"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 50) + 1;
                const sum = (n * (n + 1)) / 2;
                return { input: `${n}`, expected: `${sum}` };
            }
        },
        {
            title: "Print Numbers 1 to N",
            difficulty: "Easy",
            statement: "Write a program to print numbers from 1 to N separated by spaces.",
            inputFormat: "A positive integer N.",
            outputFormat: "Numbers from 1 to N.",
            tags: ["loops"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 10) + 1;
                let res = [];
                for (let i = 1; i <= n; i++) res.push(i);
                return { input: `${n}`, expected: res.join(' ') };
            }
        },
        {
            title: "Print N to 1",
            difficulty: "Easy",
            statement: "Write a program to print numbers from N down to 1 separated by spaces.",
            inputFormat: "A positive integer N.",
            outputFormat: "Numbers from N to 1.",
            tags: ["loops"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 10) + 1;
                let res = [];
                for (let i = n; i >= 1; i--) res.push(i);
                return { input: `${n}`, expected: res.join(' ') };
            }
        },
        {
            title: "Factorial of a Number",
            difficulty: "Medium",
            statement: "Calculate the factorial of a given number N.",
            inputFormat: "A non-negative integer.",
            outputFormat: "Print the factorial.",
            tags: ["loops", "math"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 10);
                let f = 1;
                for (let i = 1; i <= n; i++) f *= i;
                return { input: `${n}`, expected: `${f}` };
            }
        },
        {
            title: "Check Prime Number",
            difficulty: "Medium",
            statement: "Check if a given number N is Prime or not.",
            inputFormat: "A positive integer.",
            outputFormat: "Print 'Prime' or 'Not Prime'.",
            tags: ["math", "loops"],
            generateTestCase: () => {
                const isPrime = (num) => {
                    if (num <= 1) return false;
                    for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
                    return true;
                };
                const n = Math.floor(Math.random() * 50) + 2;
                return { input: `${n}`, expected: isPrime(n) ? "Prime" : "Not Prime" };
            }
        },
        {
            title: "Fibonacci Series",
            difficulty: "Medium",
            statement: "Print the first N terms of the Fibonacci series (starting 0, 1).",
            inputFormat: "Integer N (N >= 2)",
            outputFormat: "First N terms separated by space.",
            tags: ["loops", "series"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 10) + 2;
                let fib = [0, 1];
                for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2]);
                return { input: `${n}`, expected: fib.slice(0, n).join(' ') };
            }
        },
        {
            title: "Reverse a Number",
            difficulty: "Medium",
            statement: "Reverse the digits of a given integer.",
            inputFormat: "An integer.",
            outputFormat: "The reversed number.",
            tags: ["math", "loops"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 900) + 100;
                return { input: `${n}`, expected: `${parseInt(n.toString().split('').reverse().join(''))}` };
            }
        },
        {
            title: "Sum of Digits",
            difficulty: "Medium",
            statement: "Calculate the sum of digits of a given number.",
            inputFormat: "A positive integer.",
            outputFormat: "The sum of digits.",
            tags: ["math", "loops"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 1000);
                const s = n.toString().split('').reduce((a, c) => a + parseInt(c), 0);
                return { input: `${n}`, expected: `${s}` };
            }
        },
        {
            title: "Area of Rectangle",
            difficulty: "Easy",
            statement: "Calculate area of a rectangle given length and width.",
            inputFormat: "Two integers separated by space (Length Width)",
            outputFormat: "Area value",
            tags: ["math"],
            logic: (a, b) => a * b
        },
        {
            title: "Perimeter of Rectangle",
            difficulty: "Easy",
            statement: "Calculate perimeter of a rectangle given length and width.",
            inputFormat: "Two integers separated by space",
            outputFormat: "Perimeter value",
            tags: ["math"],
            logic: (a, b) => 2 * (a + b)
        },
        {
            title: "Simple Interest",
            difficulty: "Easy",
            statement: "Calculate Simple Interest given Principal, Rate, and Time. (SI = P*R*T / 100). Output integer part.",
            inputFormat: "Three integers P, R, T",
            outputFormat: "Simple Interest (Integer)",
            tags: ["math"],
            generateTestCase: () => {
                const P = 1000, R = 5, T = 2;
                return { input: `${P} ${R} ${T}`, expected: `${(P * R * T) / 100}` };
            }
        },
        {
            title: "Result of (A + B) * C",
            difficulty: "Easy",
            statement: "Calculate (A + B) * C for three integers.",
            inputFormat: "Three integers A, B, C.",
            outputFormat: "Result value.",
            tags: ["math"],
            logic: (a, b, c) => (a + b) * c,
            generateTestCase: () => {
                const a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10), c = Math.floor(Math.random() * 10);
                return { input: `${a} ${b} ${c}`, expected: `${(a + b) * c}` };
            }
        },
        {
            title: "Swap Two Numbers",
            difficulty: "Easy",
            statement: "Read two numbers and print them in swapped order.",
            inputFormat: "Two integers A and B.",
            outputFormat: "B followed by A.",
            tags: ["basic"],
            generateTestCase: () => {
                const a = Math.floor(Math.random() * 100), b = Math.floor(Math.random() * 100);
                return { input: `${a} ${b}`, expected: `${b} ${a}` };
            }
        },
        {
            title: "Check Leap Year",
            difficulty: "Easy",
            statement: "Check if a year is a Leap Year. (Divisible by 4 and not 100, or divisible by 400).",
            inputFormat: "A single integer Year.",
            outputFormat: "Print 'Leap Year' or 'Not a Leap Year'.",
            tags: ["condition", "math"],
            generateTestCase: () => {
                const y = Math.floor(Math.random() * 2000) + 1000;
                const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
                return { input: `${y}`, expected: isLeap ? "Leap Year" : "Not a Leap Year" };
            }
        },
        {
            title: "Celsius to Fahrenheit",
            difficulty: "Easy",
            statement: "Convert temperature from Celsius to Fahrenheit. F = (C * 9/5) + 32. Print integer part.",
            inputFormat: "Integer C.",
            outputFormat: "Integer F.",
            tags: ["math"],
            logic: (c) => Math.floor((c * 9 / 5) + 32)
        },
        {
            title: "Fahrenheit to Celsius",
            difficulty: "Easy",
            statement: "Convert temperature from Fahrenheit to Celsius. C = (F - 32) * 5/9. Print integer part.",
            inputFormat: "Integer F.",
            outputFormat: "Integer C.",
            tags: ["math"],
            logic: (f) => Math.floor((f - 32) * 5 / 9)
        },
        {
            title: "Area of Square",
            difficulty: "Easy",
            statement: "Calculate area of a square given logic side L.",
            inputFormat: "Integer L.",
            outputFormat: "Area.",
            tags: ["math"],
            logic: (l) => l * l
        },
        {
            title: "Perimeter of Square",
            difficulty: "Easy",
            statement: "Calculate perimeter of a square given side L.",
            inputFormat: "Integer L.",
            outputFormat: "Perimeter.",
            tags: ["math"],
            logic: (l) => 4 * l
        },
        {
            title: "Days in Month",
            difficulty: "Easy",
            statement: "Print number of days in a given month number (1 for Jan, 2 for Feb... 12 for Dec). Assume not leap year for Feb (28 days).",
            inputFormat: "Integer Month (1-12).",
            outputFormat: "Number of days.",
            tags: ["condition"],
            logic: (m) => {
                if (m == 2) return 28;
                if ([4, 6, 9, 11].includes(m)) return 30;
                return 31;
            }
        },
        {
            title: "Count Digits",
            difficulty: "Easy",
            statement: "Count the number of digits in a non-negative integer.",
            inputFormat: "Integer N.",
            outputFormat: "Count of digits.",
            tags: ["loops"],
            generateTestCase: () => {
                const n = Math.floor(Math.random() * 10000);
                return { input: `${n}`, expected: `${n.toString().length}` };
            }
        },
        {
            title: "Sum of Squares",
            difficulty: "Easy",
            statement: "Calculate sum of squares of two numbers (a^2 + b^2).",
            inputFormat: "Two integers a, b.",
            outputFormat: "Result.",
            tags: ["math"],
            logic: (a, b) => a * a + b * b
        },
        {
            title: "Cube Root (Integer)",
            difficulty: "Medium",
            statement: "Find the integer cube root of a number if it exists perfectly, else print floor value.",
            inputFormat: "Integer N.",
            outputFormat: "Cube root.",
            tags: ["math"],
            logic: (n) => Math.floor(Math.cbrt(n))
        },
        {
            title: "Check Divisibility by 5 and 11",
            difficulty: "Easy",
            statement: "Check if a number is divisible by both 5 and 11.",
            inputFormat: "Integer N.",
            outputFormat: "Print 'Divisible' or 'Not Divisible'.",
            tags: ["math", "condition"],
            logic: (n) => (n % 5 === 0 && n % 11 === 0) ? "Divisible" : "Not Divisible"
        },
        {
            title: "Largest of Three",
            difficulty: "Easy",
            statement: "Find the largest of three numbers.",
            inputFormat: "Three integers.",
            outputFormat: "The largest number.",
            tags: ["math", "condition"],
            logic: (a, b, c) => Math.max(a, b, c),
            generateTestCase: () => {
                const a = Math.floor(Math.random() * 100), b = Math.floor(Math.random() * 100), c = Math.floor(Math.random() * 100);
                return { input: `${a} ${b} ${c}`, expected: `${Math.max(a, b, c)}` };
            }
        },
        {
            title: "Discount Calculator",
            difficulty: "Easy",
            statement: "Calculate price after 10% discount.",
            inputFormat: "Original Price P (integer).",
            outputFormat: "Price after discount (integer part).",
            tags: ["math"],
            logic: (p) => Math.floor(p * 0.9)
        }
    ];
};

const getCodeSnippet = (lang, template) => {
    // Basic code generation
    if (lang === 'Python') {
        if (template.title.includes("Sum")) return `a, b = map(int, input().split())\\nprint(a + b)`;
        if (template.title.includes("Difference")) return `a, b = map(int, input().split())\\nprint(a - b)`;
        if (template.title.includes("Product")) return `a, b = map(int, input().split())\\nprint(a * b)`;
        if (template.title.includes("Check Even")) return `n = int(input())\\nprint("Even" if n % 2 == 0 else "Odd")`;
        return `# Solution for ${template.title} in Python\\n# Logic: Refer to problem statement`;
    }
    if (lang === 'C') {
        if (template.title.includes("Sum")) return `#include <stdio.h>\\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a+b); return 0; }`;
        return `#include <stdio.h>\\nint main() { \\n    // Solution for ${template.title}\\n    return 0; \\n}`;
    }
    if (lang === 'Java') {
        return `import java.util.Scanner;\\npublic class Main {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        // Solution for ${template.title}\\n    }\\n}`;
    }
    if (lang === 'JavaScript') {
        return `// Solution for ${template.title}\\nconst fs = require('fs');\\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\\n// Logic here`;
    }
    if (lang === 'C++') {
        return `#include <iostream>\\nusing namespace std;\\nint main() {\\n    // Solution for ${template.title}\\n    return 0;\\n}`;
    }
    return "// Code";
};

// Generate problems
const allProblems = [];
let idCounter = 100;

const templates = getTemplates();
console.log(`Loaded ${templates.length} templates.`);

languages.forEach(lang => {
    templates.forEach((tmpl) => {
        const problem = {
            id: idCounter++,
            title: `${tmpl.title}`,
            language: lang,
            difficulty: tmpl.difficulty,
            problemStatement: tmpl.statement,
            inputFormat: tmpl.inputFormat,
            outputFormat: tmpl.outputFormat,
            solution: {
                explanation: `To solve '${tmpl.title}', we need to apply basic ${tmpl.tags.join(', ')} logic. \\n1. Read the input.\\n2. Perform the operation using proper syntax for ${lang}.\\n3. Print result.`,
                code: getCodeSnippet(lang, tmpl)
            },
            hints: [
                `Use correct input sequence for ${lang}.`,
                "Process logic step-by-step.",
                "Ensure standard output format."
            ],
            testCases: []
        };

        // Generate 3 random test cases
        for (let i = 0; i < 3; i++) {
            if (tmpl.generateTestCase) {
                problem.testCases.push(tmpl.generateTestCase());
            } else if (tmpl.logic) {
                const a = Math.floor(Math.random() * 100) + 1;
                const b = Math.floor(Math.random() * 100) + 1;
                // Basic binary op input
                const input = `${a} ${b}`;
                let output = tmpl.logic(a, b);
                problem.testCases.push({ input, expected: `${output}` });
            }
        }
        allProblems.push(problem);
    });
});

console.log(`Generated ${allProblems.length} new problems.`);

const existingPath = path.join(__dirname, '../util/problemData.json');
let finalData = [];

try {
    if (fs.existsSync(existingPath)) {
        const existingRaw = fs.readFileSync(existingPath, 'utf8');
        const existing = JSON.parse(existingRaw);

        // Normalize existing problems to have hints/testCases if missing
        const normalizedExisting = existing.map(p => ({
            ...p,
            hints: p.hints || ["Review the problem statement.", "Check edge cases."],
            testCases: p.testCases || []
        }));

        // Concat existing + new
        finalData = [...normalizedExisting, ...allProblems];
    } else {
        finalData = allProblems;
    }
} catch (e) {
    console.error("Error reading existing file, starting fresh:", e);
    finalData = allProblems;
}

// Re-assign IDs to be sequential
finalData = finalData.map((p, index) => ({ ...p, id: index + 1 }));

fs.writeFileSync(existingPath, JSON.stringify(finalData, null, 2));
console.log('Saved to backend/util/problemData.json');

// Also save to frontend
const frontendPath = path.join(__dirname, '../../frontend/src/data/problemData.json');
try {
    fs.writeFileSync(frontendPath, JSON.stringify(finalData, null, 2));
    console.log('Saved to frontend/src/data/problemData.json');
} catch (e) {
    console.error("Could not save to frontend path:", e);
}
