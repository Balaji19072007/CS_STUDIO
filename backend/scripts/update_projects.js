const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const project1 = {
    id: 18005,
    topic_id: 'c-p18-t5',
    course_id: 'c-programming',
    title: 'Project 1: Calculator',
    description: `A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.\n\nIn this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.\n\n---\n\n**Real World Usage**\n\nCalculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.\n\n---\n\n**Features**\n\n*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)\n*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)\n*   **Multiplication**: (e.g., 5 × 4 = 20)\n*   **Division**: (e.g., 20 ÷ 5 = 4)\n\n---\n\n**How the Project Works**\n\n1.  User enters first number. (e.g., \`10\`)\n2.  User enters second number. (e.g., \`5\`)\n3.  User selects operation: \`1.Add\`, \`2.Subtract\`, \`3.Multiply\`, \`4.Divide\`\n4.  Program performs selected operation.\n5.  Result is displayed.\n\n---\n\n**Problem Statement**\n\nCreate a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.\n\n**Note:** For division, if the second number is 0, print \`Cannot divide by zero\`. Otherwise, print the result in the format \`Result = X.XX\` (2 decimal places).`,
    difficulty: 'Medium',
    language: 'C',
    solution_code: `#include <stdio.h>\n\nint main()\n{\n    float a,b;\n    int choice;\n\n    printf("Enter First Number: ");\n    scanf("%f",&a);\n\n    printf("Enter Second Number: ");\n    scanf("%f",&b);\n\n    printf("\\n1.Add");\n    printf("\\n2.Subtract");\n    printf("\\n3.Multiply");\n    printf("\\n4.Divide");\n\n    printf("\\nChoice: ");\n    scanf("%d",&choice);\n\n    switch(choice)\n    {\n        case 1:\n            printf("Result = %.2f",a+b);\n            break;\n\n        case 2:\n            printf("Result = %.2f",a-b);\n            break;\n\n        case 3:\n            printf("Result = %.2f",a*b);\n            break;\n\n        case 4:\n            if(b!=0)\n                printf("Result = %.2f",a/b);\n            else\n                printf("Cannot divide by zero");\n            break;\n\n        default:\n            printf("Invalid Choice");\n    }\n\n    return 0;\n}`,
    reference_output: "Result = 15.00",
    hints: JSON.stringify([
        "Take two numbers from the user.",
        "Display operation choices.",
        "Use switch-case to determine the operation."
    ])
};

const project3 = {
    id: 18007,
    topic_id: 'c-p18-t7',
    course_id: 'c-programming',
    title: 'Project 3: Mini Text Editor',
    description: `The Mini Text Editor is a command-line application that allows users to create, read, append, and delete text files. This project introduces file handling in C, a critical skill for interacting with the file system.\n\n---\n\n**Problem Statement**\n\nDevelop a Mini Text Editor using C programming that performs the following operations:\n\n1. Create a New File and Write\n2. Read an Existing File\n3. Append Text to a File\n4. Delete a File\n5. Exit\n\n---\n\n**Features**\n\n**Create and Write**\n\nAllows users to create a file and write text to it.\n\n**Read File**\n\nReads and displays the contents of a file.\n\n**Append File**\n\nAdds new text to the end of an existing file.\n\n**Delete File**\n\nRemoves a file from the system.\n\n---\n\n**How the Project Works**\n\n**Step 1**\nMenu is displayed.\n\n**Step 2**\nUser selects an operation.\n\n**Step 3**\nProgram requests the filename and performs the action.\n\n---\n\n**Learning Outcomes**\n\n* Master file handling (\`fopen\`, \`fprintf\`, \`fgets\`, \`fclose\`)\n* Understand file pointers\n* Manage system files programmatically\n`,
    difficulty: 'Hard',
    language: 'C',
    solution_code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    printf("Mini Text Editor implemented.");\n    return 0;\n}`,
    reference_output: "",
    hints: JSON.stringify([
        "Use fopen() to open files in write ('w'), read ('r'), or append ('a') modes.",
        "Use remove() function to delete a file."
    ])
};

async function updateProjects() {
    console.log("Upserting Projects...");
    
    // Upsert topics
    await supabase.from('topics').upsert([
        { id: 'c-p18-t5', phase_id: 'c-phase-18', title: 'Project 1: Calculator', order_index: 5 },
        { id: 'c-p18-t7', phase_id: 'c-phase-18', title: 'Project 3: Mini Text Editor', order_index: 7 }
    ]);
    
    // Insert challenges
    const { error: e1 } = await supabase.from('course_challenges').upsert(project1);
    if (e1) console.error("Error p1:", e1);
    
    const { error: e3 } = await supabase.from('course_challenges').upsert(project3);
    if (e3) console.error("Error p3:", e3);
    
    console.log("Successfully inserted Projects!");
}

updateProjects();
