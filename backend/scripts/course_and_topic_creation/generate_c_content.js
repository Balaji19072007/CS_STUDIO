const { supabase } = require('../config/supabase');

// ================================================
// CONTENT GENERATION TEMPLATES
// ================================================

// Content template structure for topic_content
function generateTopicContent(topic, phaseContext) {
    const topicLower = topic.title.toLowerCase();
    const content = [];

    // 1. DEFINITION (always first)
    content.push({
        content_type: 'definition',
        content_text: generateDefinition(topic, phaseContext),
        order_index: 1
    });

    // 2. EXPLANATION
    content.push({
        content_type: 'explanation',
        content_text: generateExplanation(topic, phaseContext),
        order_index: 2
    });

    // 3. SYNTAX (if applicable)
    const syntax = generateSyntax(topic, phaseContext);
    if (syntax) {
        content.push({
            content_type: 'syntax',
            content_text: syntax.text,
            code_example: syntax.code,
            code_language: 'c',
            order_index: 3
        });
    }

    // 4. EXAMPLE
    const example = generateExample(topic, phaseContext);
    content.push({
        content_type: 'example',
        content_text: example.text,
        code_example: example.code,
        code_language: 'c',
        order_index: syntax ? 4 : 3
    });

    // 5. KEY POINTS (note)
    const nextIndex = syntax ? 5 : 4;
    content.push({
        content_type: 'note',
        content_text: generateKeyPoints(topic, phaseContext),
        order_index: nextIndex
    });

    // 6. COMMON MISTAKES (tip)
    content.push({
        content_type: 'tip',
        content_text: generateCommonMistakes(topic, phaseContext),
        order_index: nextIndex + 1
    });

    return content;
}

// ================================================
// CONTENT GENERATORS
// ================================================

function generateDefinition(topic, phase) {
    const title = topic.title;

    // Pattern-based definitions
    const definitions = {
        // Phase 1: Introduction
        'What is C Programming?': 'C is a general-purpose, procedural programming language developed in 1972 by Dennis Ritchie at Bell Labs. It provides low-level access to memory and is widely used for system programming, embedded systems, and application development.',
        'Setting Up Development Environment': 'A development environment for C includes a compiler (like GCC or Clang), a text editor or IDE (like VS Code, Code::Blocks), and necessary build tools to write, compile, and execute C programs.',
        'Structure of a C Program': 'A C program consists of preprocessor directives (#include), a main() function as the entry point, variable declarations, statements, and optionally other functions. Every C program must have exactly one main() function.',
        'Your First C Program': 'The "Hello World" program is the traditional first program that displays text output. It demonstrates the basic structure of a C program including headers, main function, and output statements.',
        'Comments and Documentation': 'Comments are non-executable text in code used to explain logic and improve readability. C supports single-line comments (//) and multi-line comments (/* */).',
        'Compilation Process': 'Compilation transforms C source code into executable machine code through four stages: preprocessing (handling directives), compilation (converting to assembly), assembly (creating object code), and linking (combining object files).',

        // Phase 2: Data Types
        'Basic Data Types': 'C provides fundamental data types to store different kinds of values: int (integers), float (single-precision decimals), double (double-precision decimals), and char (single characters).',
        'Variable Declaration and Initialization': 'Variables are named memory locations that store values. Declaration reserves memory, while initialization assigns an initial value. Variables must be declared before use in C.',
        'Constants and Literals': 'Constants are fixed values that cannot be changed during program execution. They can be defined using the const keyword or #define directive. Literals are direct values written in code.',
        'Type Modifiers': 'Type modifiers alter the properties of basic data types: signed/unsigned (sign representation), short/long (size modification). They help optimize memory usage and value ranges.',
        'sizeof Operator': 'The sizeof operator returns the size in bytes of a data type or variable. It is evaluated at compile-time and is useful for memory allocation and portability.',
        'Type Conversion and Casting': 'Type conversion changes a value from one data type to another. Implicit conversion happens automatically, while explicit conversion (casting) is done manually using the cast operator.',
        'Enumeration Types': 'Enumerations (enum) define a set of named integer constants, making code more readable and maintainable. Each enumerator is assigned an integer value, starting from 0 by default.',

        // Add more definitions for other topics...
    };

    return definitions[title] || `${title} is a fundamental concept in C programming that helps developers write efficient and structured code.`;
}

function generateExplanation(topic, phase) {
    const title = topic.title;

    const explanations = {
        'What is C Programming?': 'C is known for its efficiency, portability, and close-to-hardware capabilities. It forms the foundation for many modern languages like C++, Java, and Python. Understanding C helps you grasp how computers work at a lower level, including memory management and system operations.',
        'Setting Up Development Environment': 'To start programming in C, you need to install a compiler that translates your code into machine language. Popular choices include GCC (GNU Compiler Collection) for Linux/Mac and MinGW for Windows. An IDE like Code::Blocks or VS Code provides features like syntax highlighting, debugging, and project management.',
        'Structure of a C Program': 'Every C program follows a specific structure. The #include directive imports libraries, the main() function contains the program logic, and statements are executed sequentially. Proper structure ensures your code is organized and maintainable.',
        'Comments and Documentation': 'Good comments explain WHY code does something, not WHAT it does (which should be clear from the code itself). Use comments to document complex logic, assumptions, and important decisions. Avoid over-commenting obvious code.',

        // Add more explanations...
    };

    return explanations[title] || `This concept is essential for understanding how ${title.toLowerCase()} works in C programming and how to apply it effectively in your programs.`;
}

function generateSyntax(topic, phase) {
    const title = topic.title;

    const syntaxMap = {
        'Variable Declaration and Initialization': {
            text: 'Variables are declared by specifying the data type followed by the variable name. Initialization can be done during declaration or separately.',
            code: `// Declaration
int age;
float salary;
char grade;

// Declaration with initialization
int count = 0;
float pi = 3.14159;
char letter = 'A';`
        },
        'printf() Function': {
            text: 'The printf() function outputs formatted text to the console. It uses format specifiers to display different data types.',
            code: `printf("format string", arguments);

// Examples:
printf("Hello, World!");
printf("Number: %d", 42);
printf("Name: %s, Age: %d", "John", 25);`
        },
        'if Statement': {
            text: 'The if statement executes a block of code only if a specified condition is true.',
            code: `if (condition) {
    // code to execute if condition is true
}

// Example:
if (age >= 18) {
    printf("You are an adult");
}`
        },
        'for Loop': {
            text: 'The for loop repeats a block of code a specific number of times using initialization, condition, and increment/decrement.',
            code: `for (initialization; condition; update) {
    // code to repeat
}

// Example:
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}`
        },

        // Add more syntax examples...
    };

    return syntaxMap[title] || null;
}

function generateExample(topic, phase) {
    const title = topic.title;

    const examples = {
        'Your First C Program': {
            text: 'A simple program that prints "Hello, World!" to the console.',
            code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
        },
        'Variable Declaration and Initialization': {
            text: 'Program demonstrating variable declaration and initialization.',
            code: `#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.9;
    char grade = 'A';
    
    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);
    
    return 0;
}`
        },
        'Arithmetic Operators': {
            text: 'Program demonstrating all arithmetic operators.',
            code: `#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Division: %d\\n", a / b);
    printf("Modulus: %d\\n", a % b);
    
    return 0;
}`
        },

        // Add more examples...
    };

    return examples[title] || {
        text: `Example demonstrating ${title.toLowerCase()}.`,
        code: `#include <stdio.h>

int main() {
    // Example code for ${title}
    printf("Example output\\n");
    return 0;
}`
    };
}

function generateKeyPoints(topic, phase) {
    const title = topic.title;

    const keyPoints = {
        'What is C Programming?': '• C is a compiled, procedural language\n• Provides low-level memory access\n• Foundation for many modern languages\n• Widely used in system programming and embedded systems\n• Requires manual memory management',
        'Variable Declaration and Initialization': '• Variables must be declared before use\n• Choose meaningful variable names\n• Initialize variables to avoid garbage values\n• Variable names are case-sensitive\n• Cannot start with a digit',
        'if Statement': '• Condition must be in parentheses\n• Use curly braces even for single statements (best practice)\n• Condition evaluates to true (non-zero) or false (zero)\n• Can be nested for complex logic',

        // Add more key points...
    };

    return keyPoints[title] || `• Understand the core concept of ${title.toLowerCase()}\n• Practice with multiple examples\n• Pay attention to syntax rules\n• Test your code thoroughly`;
}

function generateCommonMistakes(topic, phase) {
    const title = topic.title;

    const mistakes = {
        'Variable Declaration and Initialization': '⚠️ Using uninitialized variables leads to unpredictable behavior\n⚠️ Forgetting semicolons after declarations\n⚠️ Using reserved keywords as variable names\n⚠️ Mixing data types without proper conversion',
        'if Statement': '⚠️ Using = (assignment) instead of == (comparison)\n⚠️ Forgetting curly braces for multi-line blocks\n⚠️ Placing semicolon after if condition\n⚠️ Not handling all possible cases',
        'for Loop': '⚠️ Off-by-one errors in loop conditions\n⚠️ Infinite loops due to incorrect update expressions\n⚠️ Modifying loop counter inside the loop body\n⚠️ Forgetting to initialize the counter',

        // Add more common mistakes...
    };

    return mistakes[title] || `⚠️ Pay attention to syntax details\n⚠️ Test edge cases\n⚠️ Avoid common logical errors\n⚠️ Use proper formatting for readability`;
}

// ================================================
// PRACTICE PROBLEM GENERATOR
// ================================================

function generatePracticeProblems(topic, phase) {
    const problems = [];
    const title = topic.title;

    // Generate 1-2 practice problems based on topic
    const problemTemplates = {
        'Variable Declaration and Initialization': [
            {
                title: 'Calculate Rectangle Area',
                description: 'Write a program that declares variables for length and width of a rectangle, initializes them with values, and calculates the area.',
                difficulty: 'Easy',
                starter_code: `#include <stdio.h>

int main() {
    // Declare and initialize length and width
    
    // Calculate area
    
    // Print the result
    
    return 0;
}`,
                solution_code: `#include <stdio.h>

int main() {
    int length = 10;
    int width = 5;
    int area = length * width;
    
    printf("Area: %d\\n", area);
    
    return 0;
}`,
                test_cases: [
                    { input: '', expected_output: 'Area: 50' }
                ],
                hints: ['Declare two integer variables', 'Multiply length by width', 'Use printf to display the result']
            }
        ],
        'Arithmetic Operators': [
            {
                title: 'Simple Calculator',
                description: 'Create a program that takes two numbers and performs all arithmetic operations (+, -, *, /, %).',
                difficulty: 'Easy',
                starter_code: `#include <stdio.h>

int main() {
    int num1 = 20, num2 = 4;
    
    // Perform all arithmetic operations
    
    return 0;
}`,
                solution_code: `#include <stdio.h>

int main() {
    int num1 = 20, num2 = 4;
    
    printf("Addition: %d\\n", num1 + num2);
    printf("Subtraction: %d\\n", num1 - num2);
    printf("Multiplication: %d\\n", num1 * num2);
    printf("Division: %d\\n", num1 / num2);
    printf("Modulus: %d\\n", num1 % num2);
    
    return 0;
}`,
                test_cases: [
                    { input: '', expected_output: 'Addition: 24\nSubtraction: 16\nMultiplication: 80\nDivision: 5\nModulus: 0' }
                ],
                hints: ['Use all five arithmetic operators', 'Print each result on a new line']
            }
        ],

        // Add more problem templates...
    };

    const topicProblems = problemTemplates[title] || [
        {
            title: `Practice: ${title}`,
            description: `Write a program to practice ${title.toLowerCase()}.`,
            difficulty: 'Easy',
            starter_code: `#include <stdio.h>

int main() {
    // Your code here
    
    return 0;
}`,
            solution_code: `#include <stdio.h>

int main() {
    // Solution for ${title}
    printf("Practice problem\\n");
    return 0;
}`,
            test_cases: [],
            hints: ['Review the topic concepts', 'Start with simple examples']
        }
    ];

    return topicProblems.map((prob, idx) => ({
        ...prob,
        order_index: idx + 1,
        test_cases: JSON.stringify(prob.test_cases),
        hints: JSON.stringify(prob.hints)
    }));
}

// ================================================
// MAIN SEEDING FUNCTION
// ================================================

async function seedCProgrammingContent() {
    console.log('🎨 Generating C Programming Content...\n');
    console.log('This will populate topic_content and practice_problems for all 135 topics.\n');

    let stats = {
        topicsProcessed: 0,
        contentAdded: 0,
        problemsAdded: 0,
        errors: 0
    };

    try {
        // Get all C Programming phases
        const { data: phases } = await supabase
            .from('phases')
            .select('id, title, order_index')
            .eq('course_id', 'c-programming')
            .order('order_index');

        console.log(`Found ${phases.length} phases\n`);

        for (const phase of phases) {
            console.log(`\n📚 Phase ${phase.order_index}: ${phase.title}`);

            // Get topics for this phase
            const { data: topics } = await supabase
                .from('topics')
                .select('*')
                .eq('phase_id', phase.id)
                .order('order_index');

            console.log(`  Processing ${topics.length} topics...`);

            for (const topic of topics) {
                try {
                    // Generate content
                    const contentItems = generateTopicContent(topic, phase);

                    // Insert content items
                    for (const item of contentItems) {
                        const { error } = await supabase
                            .from('topic_content')
                            .insert({
                                topic_id: topic.id,
                                ...item
                            });

                        if (error) {
                            console.error(`    ❌ Content error (${topic.title}):`, error.message);
                            stats.errors++;
                        } else {
                            stats.contentAdded++;
                        }
                    }

                    // Generate practice problems
                    const problems = generatePracticeProblems(topic, phase);

                    for (const problem of problems) {
                        const { error } = await supabase
                            .from('practice_problems')
                            .insert({
                                topic_id: topic.id,
                                ...problem
                            });

                        if (error) {
                            console.error(`    ❌ Problem error (${topic.title}):`, error.message);
                            stats.errors++;
                        } else {
                            stats.problemsAdded++;
                        }
                    }

                    console.log(`    ✅ ${topic.title}`);
                    stats.topicsProcessed++;

                } catch (error) {
                    console.error(`    ❌ Error processing ${topic.title}:`, error.message);
                    stats.errors++;
                }
            }
        }

        console.log('\n========================================');
        console.log('✨ Content Generation Complete!');
        console.log('========================================');
        console.log(`Topics Processed: ${stats.topicsProcessed}`);
        console.log(`Content Items Added: ${stats.contentAdded}`);
        console.log(`Practice Problems Added: ${stats.problemsAdded}`);
        console.log(`Errors: ${stats.errors}`);
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }

    process.exit(0);
}

seedCProgrammingContent();
