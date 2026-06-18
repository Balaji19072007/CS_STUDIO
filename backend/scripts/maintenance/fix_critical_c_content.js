const { Client } = require('pg');

// Connection string with encoded password
const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

// Topic-specific content templates
const contentTemplates = {
    // Phase 1: Introduction to C
    "What is C Programming?": {
        syntax: `// C Program Structure\n#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to C Programming!\\n");\n    return 0;\n}`,
        challenge: {
            description: "Write a C program that prints 'Hello, World!' to the console.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`
        }
    },
    "History of C": {
        syntax: `// C was developed by Dennis Ritchie at Bell Labs in 1972\n// File extension: .c`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("C Language - Created in 1972\\n");\n    printf("Developer: Dennis Ritchie\\n");\n    return 0;\n}`,
        challenge: {
            description: "Create a program that displays information about C programming language (name, year, creator).",
            starter: `#include <stdio.h>\n\nint main() {\n    // Display C language info\n    \n    return 0;\n}`
        }
    },
    "Setting Up C Environment": {
        syntax: `// Compilation command\ngcc filename.c -o outputname\n\n// Execution\n./outputname`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Environment is set up correctly!\\n");\n    return 0;\n}`,
        challenge: {
            description: "Write a program to verify your C environment is working by printing a success message.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Print success message\n    \n    return 0;\n}`
        }
    },
    "Basic Structure of a C Program": {
        syntax: `#include <stdio.h>  // Preprocessor directive\n\nint main() {         // Main function\n    // Statements\n    return 0;        // Return statement\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("This is a basic C program\\n");\n    printf("It has a header, main function, and statements\\n");\n    return 0;\n}`,
        challenge: {
            description: "Create a C program with proper structure that prints your name and age.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Print your name and age\n    \n    return 0;\n}`
        }
    },

    // Phase 2: Variables & Data Types
    "Variables": {
        syntax: `data_type variable_name = value;\n\n// Example:\nint age = 25;\nfloat price = 9.99;`,
        example: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.8;\n    \n    printf("Age: %d\\n", age);\n    printf("Height: %.1f\\n", height);\n    return 0;\n}`,
        challenge: {
            description: "Declare variables for student name (use char array), age, and grade, then print them.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Declare and initialize variables\n    \n    // Print the values\n    \n    return 0;\n}`
        }
    },
    "Data Types": {
        syntax: `int    // Integer: 4 bytes\nfloat  // Floating point: 4 bytes\nchar   // Character: 1 byte\ndouble // Double precision: 8 bytes`,
        example: `#include <stdio.h>\n\nint main() {\n    int num = 10;\n    float pi = 3.14;\n    char grade = 'A';\n    double salary = 50000.50;\n    \n    printf("Integer: %d\\n", num);\n    printf("Float: %.2f\\n", pi);\n    printf("Char: %c\\n", grade);\n    printf("Double: %.2lf\\n", salary);\n    return 0;\n}`,
        challenge: {
            description: "Create variables of each data type (int, float, char, double) and print their values.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Declare variables of different types\n    \n    // Print each variable\n    \n    return 0;\n}`
        }
    },
    "Constants": {
        syntax: `#define PI 3.14159  // Preprocessor constant\n\nconst int MAX = 100;  // Constant variable`,
        example: `#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    const int DAYS_IN_WEEK = 7;\n    float radius = 5.0;\n    float area = PI * radius * radius;\n    \n    printf("Days in week: %d\\n", DAYS_IN_WEEK);\n    printf("Circle area: %.2f\\n", area);\n    return 0;\n}`,
        challenge: {
            description: "Define a constant for the speed of light and calculate how far light travels in 5 seconds.",
            starter: `#include <stdio.h>\n#define SPEED_OF_LIGHT 299792458  // m/s\n\nint main() {\n    // Calculate distance\n    \n    return 0;\n}`
        }
    },

    // Operators
    "Arithmetic Operators": {
        syntax: `+   // Addition\n-   // Subtraction\n*   // Multiplication\n/   // Division\n%   // Modulus`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    \n    printf("Addition: %d\\n", a + b);\n    printf("Subtraction: %d\\n", a - b);\n    printf("Multiplication: %d\\n", a * b);\n    printf("Division: %d\\n", a / b);\n    printf("Modulus: %d\\n", a % b);\n    return 0;\n}`,
        challenge: {
            description: "Write a program to calculate the area and perimeter of a rectangle given length and width.",
            starter: `#include <stdio.h>\n\nint main() {\n    int length = 10, width = 5;\n    // Calculate area and perimeter\n    \n    return 0;\n}`
        }
    },
    "Relational Operators": {
        syntax: `==  // Equal to\n!=  // Not equal to\n>   // Greater than\n<   // Less than\n>=  // Greater than or equal to\n<=  // Less than or equal to`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    \n    printf("a == b: %d\\n", a == b);\n    printf("a != b: %d\\n", a != b);\n    printf("a > b: %d\\n", a > b);\n    printf("a < b: %d\\n", a < b);\n    return 0;\n}`,
        challenge: {
            description: "Compare two numbers and print whether the first is greater, less, or equal to the second.",
            starter: `#include <stdio.h>\n\nint main() {\n    int num1 = 15, num2 = 20;\n    // Compare and print results\n    \n    return 0;\n}`
        }
    },
    "Logical Operators": {
        syntax: `&&  // Logical AND\n||  // Logical OR\n!   // Logical NOT`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 1, b = 0;\n    \n    printf("a && b: %d\\n", a && b);\n    printf("a || b: %d\\n", a || b);\n    printf("!a: %d\\n", !a);\n    return 0;\n}`,
        challenge: {
            description: "Check if a number is between 10 and 20 using logical AND operator.",
            starter: `#include <stdio.h>\n\nint main() {\n    int num = 15;\n    // Check if num is between 10 and 20\n    \n    return 0;\n}`
        }
    },

    // Control Flow
    "if Statement": {
        syntax: `if (condition) {\n    // code to execute if true\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int age = 18;\n    \n    if (age >= 18) {\n        printf("You are an adult\\n");\n    }\n    return 0;\n}`,
        challenge: {
            description: "Write a program to check if a number is positive using an if statement.",
            starter: `#include <stdio.h>\n\nint main() {\n    int num = 10;\n    // Check if positive\n    \n    return 0;\n}`
        }
    },
    "if-else Statement": {
        syntax: `if (condition) {\n    // code if true\n} else {\n    // code if false\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int num = 7;\n    \n    if (num % 2 == 0) {\n        printf("%d is even\\n", num);\n    } else {\n        printf("%d is odd\\n", num);\n    }\n    return 0;\n}`,
        challenge: {
            description: "Check if a student passed or failed based on marks (passing mark is 40).",
            starter: `#include <stdio.h>\n\nint main() {\n    int marks = 45;\n    // Check pass or fail\n    \n    return 0;\n}`
        }
    },
    "Nested if-else": {
        syntax: `if (condition1) {\n    if (condition2) {\n        // code\n    }\n} else {\n    // code\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int num = 15;\n    \n    if (num > 0) {\n        if (num % 2 == 0) {\n            printf("Positive even\\n");\n        } else {\n            printf("Positive odd\\n");\n        }\n    } else {\n        printf("Negative or zero\\n");\n    }\n    return 0;\n}`,
        challenge: {
            description: "Determine if a number is positive even, positive odd, or negative/zero using nested if-else.",
            starter: `#include <stdio.h>\n\nint main() {\n    int num = 12;\n    // Nested if-else logic\n    \n    return 0;\n}`
        }
    },
    "switch Statement": {
        syntax: `switch (expression) {\n    case value1:\n        // code\n        break;\n    case value2:\n        // code\n        break;\n    default:\n        // code\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int day = 3;\n    \n    switch (day) {\n        case 1:\n            printf("Monday\\n");\n            break;\n        case 2:\n            printf("Tuesday\\n");\n            break;\n        case 3:\n            printf("Wednesday\\n");\n            break;\n        default:\n            printf("Other day\\n");\n    }\n    return 0;\n}`,
        challenge: {
            description: "Create a simple calculator using switch that performs +, -, *, / based on user choice (use a char for operation).",
            starter: `#include <stdio.h>\n\nint main() {\n    char op = '+';\n    int a = 10, b = 5;\n    // Switch statement for calculator\n    \n    return 0;\n}`
        }
    },

    // Loops
    "for Loop": {
        syntax: `for (initialization; condition; increment) {\n    // code to repeat\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("Count: %d\\n", i);\n    }\n    return 0;\n}`,
        challenge: {
            description: "Print the first 10 natural numbers using a for loop.",
            starter: `#include <stdio.h>\n\nint main() {\n    // For loop to print 1 to 10\n    \n    return 0;\n}`
        }
    },
    "while Loop": {
        syntax: `while (condition) {\n    // code to repeat\n    // update condition\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int i = 1;\n    \n    while (i <= 5) {\n        printf("Number: %d\\n", i);\n        i++;\n    }\n    return 0;\n}`,
        challenge: {
            description: "Calculate the sum of numbers from 1 to 10 using a while loop.",
            starter: `#include <stdio.h>\n\nint main() {\n    int i = 1, sum = 0;\n    // While loop to calculate sum\n    \n    return 0;\n}`
        }
    },
    "do-while Loop": {
        syntax: `do {\n    // code to repeat\n    // update condition\n} while (condition);`,
        example: `#include <stdio.h>\n\nint main() {\n    int i = 1;\n    \n    do {\n        printf("Value: %d\\n", i);\n        i++;\n    } while (i <= 5);\n    return 0;\n}`,
        challenge: {
            description: "Print numbers from 10 to 1 in reverse order using a do-while loop.",
            starter: `#include <stdio.h>\n\nint main() {\n    int i = 10;\n    // Do-while loop\n    \n    return 0;\n}`
        }
    },
    "break Statement": {
        syntax: `break;  // Exits the loop immediately`,
        example: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            break;\n        }\n        printf("%d ", i);\n    }\n    printf("\\nLoop terminated\\n");\n    return 0;\n}`,
        challenge: {
            description: "Find and print the first number divisible by 7 between 1 and 50, then exit the loop.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Loop with break\n    \n    return 0;\n}`
        }
    },
    "continue Statement": {
        syntax: `continue;  // Skips current iteration`,
        example: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i == 3) {\n            continue;\n        }\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}`,
        challenge: {
            description: "Print all numbers from 1 to 10 except multiples of 3 using continue.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Loop with continue\n    \n    return 0;\n}`
        }
    },

    // Functions
    "Functions": {
        syntax: `return_type function_name(parameters) {\n    // function body\n    return value;\n}`,
        example: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(5, 3);\n    printf("Sum: %d\\n", result);\n    return 0;\n}`,
        challenge: {
            description: "Create a function to calculate the square of a number and call it from main.",
            starter: `#include <stdio.h>\n\n// Define square function here\n\nint main() {\n    // Call the function\n    \n    return 0;\n}`
        }
    },
    "Function Parameters": {
        syntax: `void function(int param1, float param2) {\n    // Use param1 and param2\n}`,
        example: `#include <stdio.h>\n\nvoid greet(char name[], int age) {\n    printf("Hello %s, you are %d years old\\n", name, age);\n}\n\nint main() {\n    greet("Alice", 25);\n    return 0;\n}`,
        challenge: {
            description: "Write a function that takes two parameters (length and width) and prints the area of a rectangle.",
            starter: `#include <stdio.h>\n\n// Define function here\n\nint main() {\n    // Call function\n    \n    return 0;\n}`
        }
    },
    "Return Statement": {
        syntax: `return value;  // Returns value to caller\nreturn;        // Returns from void function`,
        example: `#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}\n\nint main() {\n    int result = max(10, 20);\n    printf("Maximum: %d\\n", result);\n    return 0;\n}`,
        challenge: {
            description: "Create a function that returns 1 if a number is even, 0 if odd.",
            starter: `#include <stdio.h>\n\n// Define isEven function\n\nint main() {\n    // Test the function\n    \n    return 0;\n}`
        }
    },

    // Arrays
    "Arrays": {
        syntax: `data_type array_name[size];\n\n// Example:\nint numbers[5] = {1, 2, 3, 4, 5};`,
        example: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    \n    for (int i = 0; i < 5; i++) {\n        printf("Element %d: %d\\n", i, arr[i]);\n    }\n    return 0;\n}`,
        challenge: {
            description: "Declare an array of 5 integers, initialize it, and print all elements.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Declare and initialize array\n    \n    // Print elements\n    \n    return 0;\n}`
        }
    },
    "Accessing Array Elements": {
        syntax: `array_name[index]  // Access element at index\n\n// Index starts at 0`,
        example: `#include <stdio.h>\n\nint main() {\n    int marks[3] = {85, 90, 78};\n    \n    printf("First mark: %d\\n", marks[0]);\n    printf("Second mark: %d\\n", marks[1]);\n    printf("Third mark: %d\\n", marks[2]);\n    return 0;\n}`,
        challenge: {
            description: "Create an array of 5 numbers and print only the first and last elements.",
            starter: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {5, 10, 15, 20, 25};\n    // Print first and last\n    \n    return 0;\n}`
        }
    },

    // Default template for any topic not specifically listed
    "default": {
        syntax: `// Topic-specific C syntax\n// Replace with actual code`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Example for this topic\\n");\n    return 0;\n}`,
        challenge: {
            description: "Practice exercise related to this topic.",
            starter: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`
        }
    }
};

// Generate content based on topic title
function generateContent(topicTitle) {
    // Check if we have specific content for this topic
    if (contentTemplates[topicTitle]) {
        return contentTemplates[topicTitle];
    }

    // Otherwise, generate generic but relevant content based on keywords
    const title = topicTitle.toLowerCase();

    // Pattern matching for common topics
    if (title.includes('printf')) {
        return {
            syntax: `printf("format string", arguments);\n\n// Format specifiers:\n// %d - integer\n// %f - float\n// %c - character\n// %s - string`,
            example: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    printf("Age: %d\\n", age);\n    printf("Hello World!\\n");\n    return 0;\n}`,
            challenge: {
                description: "Use printf to display your name, age, and favorite number with proper formatting.",
                starter: `#include <stdio.h>\n\nint main() {\n    // Use printf here\n    \n    return 0;\n}`
            }
        };
    } else if (title.includes('scanf')) {
        return {
            syntax: `scanf("format string", &variable);\n\n// Example:\nint num;\nscanf("%d", &num);`,
            example: `#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter your age: ");\n    scanf("%d", &age);\n    printf("You are %d years old\\n", age);\n    return 0;\n}`,
            challenge: {
                description: "Write a program that takes two numbers as input and prints their sum.",
                starter: `#include <stdio.h>\n\nint main() {\n    int a, b;\n    // Read input and print sum\n    \n    return 0;\n}`
            }
        };
    } else if (title.includes('pointer')) {
        return {
            syntax: `int *ptr;  // Pointer declaration\nptr = &variable;  // Address assignment\n*ptr = value;  // Dereferencing`,
            example: `#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    \n    printf("Value: %d\\n", *ptr);\n    printf("Address: %p\\n", ptr);\n    return 0;\n}`,
            challenge: {
                description: "Declare an integer variable and a pointer, assign the address, and print both value and address.",
                starter: `#include <stdio.h>\n\nint main() {\n    // Declare variable and pointer\n    \n    return 0;\n}`
            }
        };
    } else if (title.includes('string')) {
        return {
            syntax: `char str[size];  // String declaration\nchar name[] = "Hello";  // String initialization`,
            example: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char name[20] = "Alice";\n    \n    printf("Name: %s\\n", name);\n    printf("Length: %lu\\n", strlen(name));\n    return 0;\n}`,
            challenge: {
                description: "Declare a string with your name and print it along with its length.",
                starter: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    // Declare and print string\n    \n    return 0;\n}`
            }
        };
    } else if (title.includes('struct')) {
        return {
            syntax: `struct structure_name {\n    data_type member1;\n    data_type member2;\n};`,
            example: `#include <stdio.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float grade;\n};\n\nint main() {\n    struct Student s1 = {"John", 20, 85.5};\n    printf("Name: %s\\n", s1.name);\n    printf("Age: %d\\n", s1.age);\n    return 0;\n}`,
            challenge: {
                description: "Create a structure for a Book with title, author, and price. Declare a variable and print its details.",
                starter: `#include <stdio.h>\n\n// Define structure here\n\nint main() {\n    // Use structure\n    \n    return 0;\n}`
            }
        };
    }

    // Default fallback
    return contentTemplates.default;
}

async function updateTopicContent() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('✅ Connected to Supabase');

        // Fetch all topics for C Programming
        const topicsQuery = `
            SELECT t.id, t.title, t.phase_id
            FROM topics t
            JOIN phases p ON t.phase_id = p.id
            WHERE p.course_id = 'c-programming'
            ORDER BY p.order_index, t.order_index;
        `;

        const { rows: topics } = await client.query(topicsQuery);
        console.log(`📚 Found ${topics.length} topics to update`);

        let updatedCount = 0;

        for (const topic of topics) {
            console.log(`\n🔄 Processing: "${topic.title}"`);

            try {
                const content = generateContent(topic.title);

                // 1. CLEANUP: Delete existing Syntax, Example, and Challenge content
                await client.query(`
                    DELETE FROM topic_content 
                    WHERE topic_id = $1 
                    AND content_type IN ('syntax', 'example', 'practice_problem', 'challenge');
                `, [topic.id]);

                // Also delete from practice_problems table
                await client.query(`
                    DELETE FROM practice_problems 
                    WHERE topic_id = $1;
                `, [topic.id]);

                // 2. Insert SYNTAX
                const syntaxQuery = `
                    INSERT INTO topic_content (topic_id, content_type, content_text, order_index)
                    VALUES ($1, 'syntax', $2, 4);
                `;
                await client.query(syntaxQuery, [topic.id, content.syntax]);
                console.log('  ✓ Syntax updated');

                // 3. Insert EXAMPLE
                const exampleQuery = `
                    INSERT INTO topic_content (topic_id, content_type, content_text, order_index)
                    VALUES ($1, 'example', $2, 5);
                `;
                await client.query(exampleQuery, [topic.id, content.example]);
                console.log('  ✓ Example updated');

                // 4. Insert CHALLENGE TIME (Practice Problem)
                const challengeQuery = `
                    INSERT INTO practice_problems (topic_id, title, description, starter_code, difficulty, order_index)
                    VALUES ($1, 'Challenge Time', $2, $3, 'Easy', 1);
                `;
                await client.query(challengeQuery, [
                    topic.id,
                    content.challenge.description,
                    content.challenge.starter
                ]);
                console.log('  ✓ Challenge Time updated');

                updatedCount++;

            } catch (topicError) {
                console.error(`❌ FAILED to update topic "${topic.title}":`, topicError.message);
            }
        }

        console.log(`\n🎉 SUCCESS! Updated ${updatedCount} topics with Syntax, Examples, and Challenges`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.end();
    }
}

updateTopicContent();
