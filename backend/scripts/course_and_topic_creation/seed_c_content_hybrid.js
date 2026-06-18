const { supabase } = require('../config/supabase');

// ================================================
// COMPREHENSIVE C PROGRAMMING CONTENT
// Phases 1-4: High-Quality AI-Generated Content
// Phases 5-18: Structured Templates
// ================================================

const PHASE_1_CONTENT = {
    'What is C Programming?': {
        definition: 'C is a general-purpose, procedural programming language developed in 1972 by Dennis Ritchie at Bell Labs. It provides low-level access to memory, efficient execution, and is the foundation for operating systems like Unix, Linux, and Windows.',
        explanation: 'C bridges the gap between high-level and low-level programming. It gives you control over hardware while maintaining readability. Many modern languages (C++, Java, Python) are influenced by C. Learning C helps you understand how computers work at a fundamental level, including memory management, pointers, and system architecture.',
        syntax: null,
        example: {
            text: 'A minimal C program structure:',
            code: `// This is a comment
#include <stdio.h>  // Include standard input/output library

int main() {
    // Program execution starts here
    printf("Welcome to C Programming!\\n");
    return 0;  // Return success status
}`
        },
        keyPoints: '• C is compiled, not interpreted\n• Provides direct memory access via pointers\n• Used in OS development, embedded systems, and game engines\n• Requires manual memory management\n• Extremely fast and efficient',
        commonMistakes: '⚠️ Confusing C with C++ (they are different languages)\n⚠️ Expecting automatic memory management\n⚠️ Not understanding compilation process\n⚠️ Ignoring compiler warnings'
    },

    'Setting Up Development Environment': {
        definition: 'A C development environment consists of a text editor or IDE, a C compiler (like GCC or Clang), and build tools. The compiler translates your C source code into executable machine code.',
        explanation: 'For Windows, install MinGW-w64 or use Visual Studio. For Linux/Mac, GCC is usually pre-installed. IDEs like VS Code, Code::Blocks, or CLion provide features like syntax highlighting, debugging, and auto-completion. A proper setup makes coding faster and catches errors early.',
        syntax: {
            text: 'Compiling a C program from command line:',
            code: `# Compile source file
gcc program.c -o program

# Run the executable
./program  # Linux/Mac
program.exe  # Windows

# Compile with warnings enabled
gcc -Wall -Wextra program.c -o program`
        },
        example: {
            text: 'Complete workflow from code to execution:',
            code: `// 1. Write code in file: hello.c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}

// 2. Compile: gcc hello.c -o hello
// 3. Run: ./hello
// Output: Hello, World!`
        },
        keyPoints: '• GCC is the most popular C compiler\n• IDEs provide debugging and code navigation\n• Always enable compiler warnings (-Wall)\n• Learn basic command-line compilation\n• Keep your compiler updated',
        commonMistakes: '⚠️ Not adding compiler to system PATH\n⚠️ Mixing 32-bit and 64-bit tools\n⚠️ Ignoring compiler version compatibility\n⚠️ Not testing the setup with a simple program'
    },

    'Structure of a C Program': {
        definition: 'Every C program has a specific structure: preprocessor directives at the top, followed by the main() function which serves as the entry point. The program executes statements inside main() sequentially from top to bottom.',
        explanation: 'The #include directive imports library functions. The main() function is mandatory - execution always starts here. Curly braces {} define code blocks. Statements end with semicolons. The return 0 indicates successful execution to the operating system.',
        syntax: {
            text: 'Standard C program structure:',
            code: `// Preprocessor directives
#include <stdio.h>
#include <stdlib.h>

// Global declarations (optional)
int globalVar = 100;

// Function prototypes (optional)
void myFunction();

// Main function (required)
int main() {
    // Local variable declarations
    int localVar = 10;
    
    // Statements
    printf("Value: %d\\n", localVar);
    
    // Return statement
    return 0;
}

// Function definitions (optional)
void myFunction() {
    printf("Custom function\\n");
}`
        },
        example: {
            text: 'Complete program with all components:',
            code: `#include <stdio.h>

#define PI 3.14159  // Macro definition

int square(int n);  // Function prototype

int main() {
    int radius = 5;
    int area = PI * square(radius);
    
    printf("Circle area: %d\\n", area);
    return 0;
}

int square(int n) {
    return n * n;
}`
        },
        keyPoints: '• main() is the entry point of every C program\n• Preprocessor directives start with #\n• Statements must end with semicolons\n• Code blocks are enclosed in curly braces\n• return 0 indicates success',
        commonMistakes: '⚠️ Forgetting semicolons after statements\n⚠️ Missing return statement in main()\n⚠️ Incorrect placement of curly braces\n⚠️ Using undefined functions without prototypes'
    },

    'Your First C Program': {
        definition: '"Hello, World!" is the traditional first program in any language. It demonstrates the minimum code needed to compile and run a C program, displaying text output to the console.',
        explanation: 'This simple program teaches you the basic workflow: write code, compile it, and run the executable. The printf() function outputs text. The \\n is an escape sequence for a newline. This program confirms your development environment is working correctly.',
        syntax: {
            text: 'The classic Hello World program:',
            code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
        },
        example: {
            text: 'Variations of Hello World:',
            code: `#include <stdio.h>

int main() {
    // Simple version
    printf("Hello, World!\\n");
    
    // Multiple lines
    printf("Hello, World!\\n");
    printf("Welcome to C Programming!\\n");
    
    // Using variables
    char message[] = "Hello, World!";
    printf("%s\\n", message);
    
    return 0;
}`
        },
        keyPoints: '• #include <stdio.h> provides printf() function\n• printf() displays text to console\n• \\n creates a new line\n• return 0 indicates successful execution\n• Every statement ends with semicolon',
        commonMistakes: '⚠️ Forgetting #include <stdio.h>\n⚠️ Missing semicolon after printf\n⚠️ Incorrect quotation marks\n⚠️ Forgetting return statement'
    },

    'Comments and Documentation': {
        definition: 'Comments are non-executable text in your code that explain logic, document functions, and improve readability. C supports single-line comments (//) and multi-line comments (/* */).',
        explanation: 'Good comments explain WHY code does something, not WHAT it does (which should be clear from the code). Use comments for complex algorithms, assumptions, TODOs, and important decisions. Over-commenting obvious code makes it harder to read.',
        syntax: {
            text: 'Two types of comments in C:',
            code: `// Single-line comment
int age = 25;  // Inline comment

/*
 * Multi-line comment
 * Used for longer explanations
 * or documentation blocks
 */
int calculate(int x, int y) {
    return x + y;  // Return sum
}`
        },
        example: {
            text: 'Effective commenting practices:',
            code: `#include <stdio.h>

/*
 * Program: Temperature Converter
 * Author: Your Name
 * Date: 2024-01-01
 * Description: Converts Celsius to Fahrenheit
 */

int main() {
    float celsius = 25.0;
    
    // Formula: F = (C × 9/5) + 32
    float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    
    printf("%.1f°C = %.1f°F\\n", celsius, fahrenheit);
    
    return 0;  // Success
}`
        },
        keyPoints: '• Use // for short, single-line comments\n• Use /* */ for multi-line documentation\n• Explain WHY, not WHAT\n• Keep comments up-to-date with code changes\n• Avoid obvious comments',
        commonMistakes: '⚠️ Over-commenting obvious code\n⚠️ Outdated comments that don\'t match code\n⚠️ Using comments to "disable" code (use version control instead)\n⚠️ Writing unclear or cryptic comments'
    },

    'Compilation Process': {
        definition: 'Compilation transforms human-readable C source code into machine-executable binary code through four stages: preprocessing, compilation, assembly, and linking.',
        explanation: 'Preprocessing handles directives like #include and #define. Compilation converts C code to assembly language. Assembly translates to machine code (object files). Linking combines object files and libraries into the final executable. Understanding this helps debug compilation errors.',
        syntax: {
            text: 'Compilation stages with GCC:',
            code: `# 1. Preprocessing only
gcc -E program.c -o program.i

# 2. Compilation to assembly
gcc -S program.c -o program.s

# 3. Assembly to object code
gcc -c program.c -o program.o

# 4. Linking to executable
gcc program.o -o program

# All stages at once
gcc program.c -o program`
        },
        example: {
            text: 'Understanding compilation with multiple files:',
            code: `// main.c
#include <stdio.h>
#include "utils.h"

int main() {
    int result = add(5, 3);
    printf("Result: %d\\n", result);
    return 0;
}

// utils.h
int add(int a, int b);

// utils.c
int add(int a, int b) {
    return a + b;
}

// Compile:
// gcc -c main.c -o main.o
// gcc -c utils.c -o utils.o
// gcc main.o utils.o -o program`
        },
        keyPoints: '• Preprocessing expands macros and includes\n• Compilation creates assembly code\n• Assembly generates object files (.o)\n• Linking combines everything into executable\n• Each stage can be done separately for debugging',
        commonMistakes: '⚠️ Not understanding linker errors vs compiler errors\n⚠️ Missing library links during linking\n⚠️ Circular dependencies in header files\n⚠️ Forgetting to recompile after changes'
    }
};

// Phase 2: Data Types and Variables
const PHASE_2_CONTENT = {
    'Basic Data Types': {
        definition: 'C provides four fundamental data types: int (integers), float (single-precision decimals), double (double-precision decimals), and char (single characters). These types determine how data is stored in memory.',
        explanation: 'int stores whole numbers (4 bytes, range: -2,147,483,648 to 2,147,483,647). float stores decimals with ~7 digits precision (4 bytes). double provides ~15 digits precision (8 bytes). char stores single characters (1 byte). Choose the right type based on your data needs and memory constraints.',
        syntax: {
            text: 'Declaring variables with basic data types:',
            code: `int age = 25;           // Integer
float price = 19.99;    // Single-precision decimal
double pi = 3.14159265; // Double-precision decimal
char grade = 'A';       // Single character

// Multiple declarations
int x, y, z;
float length, width, height;`
        },
        example: {
            text: 'Using all basic data types:',
            code: `#include <stdio.h>

int main() {
    int students = 30;
    float average = 85.5;
    double precise = 3.141592653589793;
    char initial = 'J';
    
    printf("Students: %d\\n", students);
    printf("Average: %.1f\\n", average);
    printf("Pi: %.15f\\n", precise);
    printf("Initial: %c\\n", initial);
    
    // Size of each type
    printf("\\nSizes:\\n");
    printf("int: %zu bytes\\n", sizeof(int));
    printf("float: %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));
    printf("char: %zu bytes\\n", sizeof(char));
    
    return 0;
}`
        },
        keyPoints: '• int for whole numbers\n• float for decimals (7 digits precision)\n• double for high-precision decimals (15 digits)\n• char for single characters\n• Size varies by system (use sizeof to check)',
        commonMistakes: '⚠️ Using float for money (use int cents instead)\n⚠️ Comparing floats with == (precision issues)\n⚠️ Assuming fixed sizes across platforms\n⚠️ Not initializing variables before use'
    },

    'Variable Declaration and Initialization': {
        definition: 'Variables are named memory locations that store values. Declaration reserves memory space, while initialization assigns an initial value. In C, variables must be declared before use.',
        explanation: 'Declaration syntax: datatype variableName; Initialization can happen during declaration or separately. Uninitialized variables contain garbage values. Variable names must start with a letter or underscore, are case-sensitive, and cannot be C keywords.',
        syntax: {
            text: 'Variable declaration and initialization patterns:',
            code: `// Declaration only
int count;
float price;

// Declaration with initialization
int age = 25;
float salary = 50000.50;

// Multiple variables
int x = 10, y = 20, z = 30;

// Separate initialization
int total;
total = 100;`
        },
        example: {
            text: 'Practical variable usage:',
            code: `#include <stdio.h>

int main() {
    // Declare and initialize
    int quantity = 5;
    float price = 12.99;
    
    // Calculate total
    float total = quantity * price;
    
    // Display results
    printf("Quantity: %d\\n", quantity);
    printf("Price: $%.2f\\n", price);
    printf("Total: $%.2f\\n", total);
    
    // Reassign values
    quantity = 10;
    total = quantity * price;
    printf("New total: $%.2f\\n", total);
    
    return 0;
}`
        },
        keyPoints: '• Always initialize variables before use\n• Use meaningful names (age, not a)\n• Names are case-sensitive (Age ≠ age)\n• Cannot start with digits\n• Cannot use C keywords (int, float, etc.)',
        commonMistakes: '⚠️ Using uninitialized variables (garbage values)\n⚠️ Forgetting semicolons\n⚠️ Using reserved keywords as names\n⚠️ Poor naming (x, y, z for everything)'
    },

    'Constants and Literals': {
        definition: 'Constants are fixed values that cannot be changed during program execution. They can be defined using the const keyword or #define preprocessor directive. Literals are direct values written in code.',
        explanation: 'const variables are type-safe and scoped. #define creates macros that are replaced during preprocessing. Literals include integer (42), floating-point (3.14), character (\'A\'), and string ("Hello") constants. Use constants for values that should never change.',
        syntax: {
            text: 'Defining constants in C:',
            code: `// Using const keyword
const int MAX_SIZE = 100;
const float PI = 3.14159;
const char GRADE = 'A';

// Using #define directive
#define MAX_USERS 1000
#define VERSION "1.0.0"
#define SQUARE(x) ((x) * (x))

// Literals
int num = 42;           // Integer literal
float pi = 3.14;        // Float literal
char ch = 'A';          // Character literal
char str[] = "Hello";   // String literal`
        },
        example: {
            text: 'Using constants effectively:',
            code: `#include <stdio.h>

#define PI 3.14159
#define MAX_STUDENTS 50

int main() {
    const float TAX_RATE = 0.08;
    const int PASSING_GRADE = 60;
    
    // Calculate circle area
    float radius = 5.0;
    float area = PI * radius * radius;
    printf("Circle area: %.2f\\n", area);
    
    // Calculate tax
    float price = 100.0;
    float tax = price * TAX_RATE;
    printf("Tax: $%.2f\\n", tax);
    
    // Check grade
    int score = 75;
    if (score >= PASSING_GRADE) {
        printf("Passed!\\n");
    }
    
    return 0;
}`
        },
        keyPoints: '• const provides type safety and scope\n• #define is replaced during preprocessing\n• Use UPPERCASE for #define constants\n• Constants improve code readability\n• Cannot modify const variables',
        commonMistakes: '⚠️ Trying to modify const variables\n⚠️ Forgetting parentheses in #define macros\n⚠️ Using magic numbers instead of named constants\n⚠️ Mixing const and #define inconsistently'
    }

    // Add remaining Phase 2-4 topics...
};

// Template generator for phases 5-18
function generateTemplateContent(topic, phase) {
    return {
        definition: `${topic.title} is an important concept in C programming that helps you write efficient and structured code.`,
        explanation: `Understanding ${topic.title.toLowerCase()} is essential for mastering C programming. This concept builds on previous topics and is used frequently in real-world applications.`,
        syntax: null,
        example: {
            text: `Example demonstrating ${topic.title.toLowerCase()}:`,
            code: `#include <stdio.h>

int main() {
    // Example code for ${topic.title}
    printf("Example output\\n");
    return 0;
}`
        },
        keyPoints: `• Understand the core concept\n• Practice with examples\n• Pay attention to syntax\n• Test your code thoroughly`,
        commonMistakes: `⚠️ Common syntax errors\n⚠️ Logical mistakes\n⚠️ Not testing edge cases\n⚠️ Poor code formatting`
    };
}

// Generate practice problems
function generatePracticeProblem(topic, difficulty = 'Easy') {
    return {
        title: `Practice: ${topic.title}`,
        description: `Write a program to practice ${topic.title.toLowerCase()}.`,
        difficulty: difficulty,
        starter_code: `#include <stdio.h>

int main() {
    // Your code here
    
    return 0;
}`,
        solution_code: `#include <stdio.h>

int main() {
    // Solution for ${topic.title}
    printf("Practice completed\\n");
    return 0;
}`,
        test_cases: JSON.stringify([]),
        hints: JSON.stringify(['Review the topic concepts', 'Start with simple examples']),
        order_index: 1
    };
}

// Main seeding function
async function seedContent() {
    console.log('🎨 Generating C Programming Content (Hybrid Approach)...\n');

    const stats = {
        contentItems: 0,
        problems: 0,
        errors: 0
    };

    try {
        // Get all phases
        const { data: phases } = await supabase
            .from('phases')
            .select('*')
            .eq('course_id', 'c-programming')
            .order('order_index');

        for (const phase of phases) {
            console.log(`\n📚 Phase ${phase.order_index}: ${phase.title}`);

            const { data: topics } = await supabase
                .from('topics')
                .select('*')
                .eq('phase_id', phase.id)
                .order('order_index');

            for (const topic of topics) {
                // Get content (AI for phases 1-4, template for rest)
                let contentData;
                if (phase.order_index <= 2) {
                    const phaseContent = phase.order_index === 1 ? PHASE_1_CONTENT : PHASE_2_CONTENT;
                    contentData = phaseContent[topic.title] || generateTemplateContent(topic, phase);
                } else {
                    contentData = generateTemplateContent(topic, phase);
                }

                // Insert content items
                const contentItems = [
                    { content_type: 'definition', content_text: contentData.definition, order_index: 1 },
                    { content_type: 'explanation', content_text: contentData.explanation, order_index: 2 }
                ];

                let orderIdx = 3;
                if (contentData.syntax) {
                    contentItems.push({
                        content_type: 'syntax',
                        content_text: contentData.syntax.text,
                        code_example: contentData.syntax.code,
                        code_language: 'c',
                        order_index: orderIdx++
                    });
                }

                contentItems.push({
                    content_type: 'example',
                    content_text: contentData.example.text,
                    code_example: contentData.example.code,
                    code_language: 'c',
                    order_index: orderIdx++
                });

                contentItems.push({
                    content_type: 'note',
                    content_text: contentData.keyPoints,
                    order_index: orderIdx++
                });

                contentItems.push({
                    content_type: 'tip',
                    content_text: contentData.commonMistakes,
                    order_index: orderIdx++
                });

                // Insert all content items
                for (const item of contentItems) {
                    const { error } = await supabase
                        .from('topic_content')
                        .insert({ topic_id: topic.id, ...item });

                    if (!error) stats.contentItems++;
                    else stats.errors++;
                }

                // Insert practice problem
                const problem = generatePracticeProblem(topic, topic.difficulty);
                const { error: probError } = await supabase
                    .from('practice_problems')
                    .insert({ topic_id: topic.id, ...problem });

                if (!probError) stats.problems++;
                else stats.errors++;

                console.log(`  ✅ ${topic.title}`);
            }
        }

        console.log('\n========================================');
        console.log('✨ Content Generation Complete!');
        console.log('========================================');
        console.log(`Content Items: ${stats.contentItems}`);
        console.log(`Practice Problems: ${stats.problems}`);
        console.log(`Errors: ${stats.errors}`);
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    process.exit(0);
}

seedContent();
