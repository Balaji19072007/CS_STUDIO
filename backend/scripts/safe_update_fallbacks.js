const fs = require('fs');
let c = fs.readFileSync('backend/data/cProgrammingChallengeFallbacks.js', 'utf8');

const projectChallengeCode = `    case 18005:
      return {
        id: 18005,
        topic_id: 'c-p18-t5',
        title: 'Project 1: Calculator',
        description: \`A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.\\n\\nIn this project, you will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.\\n\\n### Features\\n*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)\\n*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)\\n*   **Multiplication**: (e.g., 5 × 4 = 20)\\n*   **Division**: (e.g., 20 ÷ 5 = 4)\\n\\n### How the Project Works\\n1.  User enters first number.\\n2.  User enters second number.\\n3.  User selects operation: \\\`1.Add\\\`, \\\`2.Subtract\\\`, \\\`3.Multiply\\\`, \\\`4.Divide\\\`\\n4.  Program performs selected operation and prints Result.\\n\\n**Note:** For division, if the second number is 0, print \\\`Cannot divide by zero\\\`. Otherwise, print the result in the format \\\`Result = X.XX\\\` (2 decimal places).\`,
        difficulty: 'Medium',
        language: 'C',
        starter_code: \`#include <stdio.h>\\n\\nint main()\\n{\\n    float a,b;\\n    int choice;\\n\\n    scanf("%f",&a);\\n    scanf("%f",&b);\\n    scanf("%d",&choice);\\n\\n    // Write your logic here\\n\\n    return 0;\\n}\`,
        solution_code: \`#include <stdio.h>\\n\\nint main()\\n{\\n    float a,b;\\n    int choice;\\n\\n    scanf("%f",&a);\\n    scanf("%f",&b);\\n    scanf("%d",&choice);\\n\\n    switch(choice)\\n    {\\n        case 1:\\n            printf("Result = %.2f",a+b);\\n            break;\\n        case 2:\\n            printf("Result = %.2f",a-b);\\n            break;\\n        case 3:\\n            printf("Result = %.2f",a*b);\\n            break;\\n        case 4:\\n            if(b!=0)\\n                printf("Result = %.2f",a/b);\\n            else\\n                printf("Cannot divide by zero");\\n            break;\\n        default:\\n            printf("Invalid Choice");\\n    }\\n\\n    return 0;\\n}\`,
        test_cases: [
          { input: "10\\n5\\n1\\n", expected_output: "Result = 15.00" },
          { input: "20\\n10\\n2\\n", expected_output: "Result = 10.00" },
          { input: "5\\n4\\n3\\n", expected_output: "Result = 20.00" },
          { input: "20\\n5\\n4\\n", expected_output: "Result = 4.00" },
          { input: "5\\n0\\n4\\n", expected_output: "Cannot divide by zero" }
        ],
        hints: [
            "Take two numbers from the user using scanf.",
            "Take the choice from the user.",
            "Use switch-case to determine the operation and print 'Result = X.XX' or 'Cannot divide by zero'."
        ]
      };\n`;

if (!c.includes('case 18005:')) {
    const fn1 = c.indexOf('const getFallbackChallengeById = (id) => {');
    const fn2 = c.indexOf('const getFallbackChallengeByTopicId = (topicId) => {');
    const def1 = c.lastIndexOf('    default:', fn2);
    c = c.slice(0, def1) + projectChallengeCode + c.slice(def1);
}

if (!c.includes("case 'c-p18-t5':")) {
    const fn2 = c.indexOf('const getFallbackChallengeByTopicId = (topicId) => {');
    const fn3 = c.indexOf('const getFallbackChallengeByTopicTitle = (topicTitle) => {');
    const def2 = c.lastIndexOf('    default:', fn3);
    const code2 = "    case 'c-p18-t5':\n      return getFallbackChallengeById(18005);\n";
    c = c.slice(0, def2) + code2 + c.slice(def2);
}

if (!c.includes('case "Project 1: Calculator":')) {
    const fn3 = c.indexOf('const getFallbackChallengeByTopicTitle = (topicTitle) => {');
    const def3 = c.lastIndexOf('    default:');
    const code3 = "    case \"Project 1: Calculator\":\n      return getFallbackChallengeById(18005);\n";
    c = c.slice(0, def3) + code3 + c.slice(def3);
}

fs.writeFileSync('backend/data/cProgrammingChallengeFallbacks.js', c);
console.log('Backend fallbacks successfully and safely updated!');
