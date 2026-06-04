const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../frontend/src/data/cProgrammingChallengeFallbacks.js');
let content = fs.readFileSync(filePath, 'utf8');

const projectChallenge = `
  {
    id: 18005,
    topic_id: 'c-p18-t5',
    title: 'Project 1: Calculator',
    description: \`A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.

In this project, you will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.

### Features
*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)
*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)
*   **Multiplication**: (e.g., 5 × 4 = 20)
*   **Division**: (e.g., 20 ÷ 5 = 4)

### How the Project Works
1.  User enters first number.
2.  User enters second number.
3.  User selects operation: \`1.Add\`, \`2.Subtract\`, \`3.Multiply\`, \`4.Divide\`
4.  Program performs selected operation and prints Result.

**Note:** For division, if the second number is 0, print \`Cannot divide by zero\`. Otherwise, print the result in the format \`Result = X.XX\` (2 decimal places).\`,
    difficulty: 'Medium',
    language: 'C',
    starter_code: \`#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    scanf("%f",&a);
    scanf("%f",&b);
    scanf("%d",&choice);

    // Write your logic here

    return 0;
}\`,
    solution_code: \`#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    scanf("%f",&a);
    scanf("%f",&b);
    scanf("%d",&choice);

    switch(choice)
    {
        case 1:
            printf("Result = %.2f",a+b);
            break;
        case 2:
            printf("Result = %.2f",a-b);
            break;
        case 3:
            printf("Result = %.2f",a*b);
            break;
        case 4:
            if(b!=0)
                printf("Result = %.2f",a/b);
            else
                printf("Cannot divide by zero");
            break;
        default:
            printf("Invalid Choice");
    }

    return 0;
}\`,
    test_cases: [
      {
        input: "10\\n5\\n1\\n",
        expected_output: "Result = 15.00"
      },
      {
        input: "20\\n10\\n2\\n",
        expected_output: "Result = 10.00"
      },
      {
        input: "5\\n4\\n3\\n",
        expected_output: "Result = 20.00"
      },
      {
        input: "20\\n5\\n4\\n",
        expected_output: "Result = 4.00"
      },
      {
        input: "5\\n0\\n4\\n",
        expected_output: "Cannot divide by zero"
      }
    ],
    hints: [
        "Take two numbers from the user using scanf.",
        "Take the choice from the user.",
        "Use switch-case to determine the operation and print 'Result = X.XX' or 'Cannot divide by zero'."
    ]
  }
`;

// Insert before the last closing bracket of CHALLENGES array
const insertIndex = content.lastIndexOf('];');
if (insertIndex !== -1 && !content.includes("'c-p18-t5'")) {
    content = content.slice(0, insertIndex) + ',' + projectChallenge + content.slice(insertIndex);
    fs.writeFileSync(filePath, content);
    console.log("Successfully inserted Project 1 into fallbacks.");
} else {
    console.log("Could not insert or already exists.");
}

// Also need to insert in getFallbackChallengeByTopicId logic
const switchIndex = content.indexOf('switch (topicId) {');
if (switchIndex !== -1 && !content.includes("case 'c-p18-t5':")) {
    const insertionPoint = content.indexOf('default:', switchIndex);
    const switchCode = "    case 'c-p18-t5':\n      return getFallbackChallengeById(18005);\n";
    content = content.slice(0, insertionPoint) + switchCode + content.slice(insertionPoint);
    fs.writeFileSync(filePath, content);
    console.log("Successfully inserted switch case.");
}
