const { db } = require('./config/firebase');
const { doc, setDoc, collection } = require('firebase/firestore');

// Phase 1: Introduction & Basics - Comprehensive Content
const phase1Content = {
    phaseNumber: 1,
    phaseTitle: "Introduction & Basics",
    topics: [
        {
            topicNumber: "1.1",
            title: "C Home",
            purpose: "Welcome to C Programming! This topic introduces you to the C programming language and why it's one of the most important languages to learn.",
            definition: "C is a powerful general-purpose programming language developed in the early 1970s by Dennis Ritchie at Bell Labs. It's known for its efficiency, portability, and direct access to hardware.",
            syntax: `// C is structured around functions
int main() {
    // Program code goes here
    return 0;
}`,
            exampleCode: `#include <stdio.h>

int main() {
    printf("Welcome to C Programming!");
    return 0;
}`,
            expectedOutput: "Welcome to C Programming!",
            explanation: "C forms the foundation of many modern programming languages including C++, C#, and Java. Learning C helps you understand how computers work at a fundamental level.",
            practiceChallenge: "Write a C program that prints 'Hello, C Programming World!' to the console.",
            hints: [
                "Start with #include <stdio.h>",
                "Use the main() function",
                "Use printf() to display output"
            ]
        },
        {
            topicNumber: "1.2",
            title: "C Intro",
            purpose: "Understand what C is, its history, and why it remains relevant in modern programming",
            definition: "C is a procedural programming language that provides low-level access to memory and efficient performance. It's used in operating systems, embedded systems, and system software.",
            syntax: `// Basic C program structure
#include <header_file.h>  // Preprocessor directive

int main() {              // Main function
    // Statements
    return 0;            // Return statement
}`,
            exampleCode: `#include <stdio.h>

int main() {
    // This is a simple C program
    printf("Why learn C?\\n");
    printf("1. It is fast and efficient\\n");
    printf("2. It is portable across platforms\\n");
    printf("3. It teaches you how memory works\\n");
    return 0;
}`,
            expectedOutput: `Why learn C?
1. It is fast and efficient
2. It is portable across platforms
3. It teaches you how memory works`,
            explanation: "C is called a 'middle-level language' because it combines features of both high-level and low-level languages. It was created for developing the UNIX operating system and has since become one of the most widely used programming languages.",
            practiceChallenge: "Create a program that displays three benefits of learning C programming.",
            hints: [
                "Use multiple printf() statements",
                "Include \\n for new lines",
                "Remember to return 0 at the end"
            ]
        },
        {
            topicNumber: "1.3",
            title: "C Get Started",
            purpose: "Learn how to set up your C programming environment and write your first program",
            definition: "Getting started with C involves installing a compiler (like GCC or Clang), setting up an IDE or text editor, and understanding the compilation process.",
            syntax: `// Compilation process:
// 1. Write code:      program.c
// 2. Compile:         gcc program.c -o program
// 3. Run:             ./program (or program.exe on Windows)

#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`,
            exampleCode: `#include <stdio.h>

int main() {
    printf("My First C Program!\\n");
    printf("Compilation successful!\\n");
    printf("C programming is fun!\\n");
    return 0;
}`,
            expectedOutput: `My First C Program!
Compilation successful!
C programming is fun!`,
            explanation: "To run C programs: 1) Write your code in a .c file, 2) Compile it using a C compiler (gcc, clang), 3) Execute the compiled program. The compiler converts your C code into machine code that the computer can execute.",
            practiceChallenge: "Write a program that prints 'Setup Complete!' and your name on separate lines.",
            hints: [
                "Use two printf() statements",
                "Add \\n for line breaks",
                "Remember the main() function structure"
            ]
        },
        {
            topicNumber: "1.4",
            title: "C Syntax",
            purpose: "Master the fundamental syntax rules and structure of C programs",
            definition: "C syntax refers to the set of rules that define how a C program should be written. This includes proper use of semicolons, braces, indentation, and statement structure.",
            syntax: `// C Syntax Rules:
#include <library.h>     // Include directive (no semicolon)

int main() {             // Function definition
    statement1;          // Statements end with semicolon
    statement2;
    return 0;            // Return value
}                        // Closing brace

/* Key Syntax Rules:
   - Statements end with semicolon (;)
   - Code blocks use braces { }
   - C is case-sensitive
   - Whitespace is ignored (except in strings)
*/`,
            exampleCode: `#include <stdio.h>

int main() {
    // Demonstrate C syntax
    printf("C is case-sensitive\\n");
    printf("Every statement ends with semicolon;\\n");
    printf("Braces { } group code blocks\\n");
    
    // Multiple statements
    printf("Statement 1\\n");
    printf("Statement 2\\n");
    printf("Statement 3\\n");
    
    return 0;
}`,
            expectedOutput: `C is case-sensitive
Every statement ends with semicolon;
Braces { } group code blocks
Statement 1
Statement 2
Statement 3`,
            explanation: "C syntax is strict: missing a semicolon causes compilation errors. Braces { } define code blocks. C is case-sensitive (Main ≠ main). Indentation improves readability but doesn't affect execution.",
            practiceChallenge: "Write a program with proper syntax that prints your favorite programming quote.",
            hints: [
                "Include stdio.h header",
                "Use proper braces for main()",
                "End each statement with semicolon",
                "Use \\n for new lines"
            ]
        },
        {
            topicNumber: "1.5",
            title: "C Statements",
            purpose: "Understand different types of statements in C and how they control program execution",
            definition: "A statement in C is a complete instruction that performs an action. Each statement ends with a semicolon and can be an expression, declaration, or control statement.",
            syntax: `// Types of C Statements:

// 1. Expression Statement
a = 5;                    // Assignment
printf("Hello");          // Function call
x + y;                    // Expression (does nothing alone)

// 2. Declaration Statement
int x;                    // Variable declaration
int y = 10;              // Declaration with initialization

// 3. Compound Statement (Block)
{
    int a = 5;
    printf("%d", a);
}

// 4. Control Statements
if (condition) { }       // Conditional
while (condition) { }    // Loop
return 0;               // Return statement`,
            exampleCode: `#include <stdio.h>

int main() {
    // Declaration statement
    int number;
    
    // Assignment statement
    number = 42;
    
    // Expression statement (function call)
    printf("The number is: %d\\n", number);
    
    // Compound statement
    {
        int temp = 100;
        printf("Temporary value: %d\\n", temp);
    }
    
    // Another expression statement
    printf("Program execution complete\\n");
    
    // Return statement
    return 0;
}`,
            expectedOutput: `The number is: 42
Temporary value: 100
Program execution complete`,
            explanation: "Statements are executed sequentially from top to bottom. Expression statements perform actions (like printing or calculations), declaration statements create variables, and control statements change the flow of execution.",
            practiceChallenge: "Create a program with at least 3 different types of statements: declaration, assignment, and output.",
            hints: [
                "Declare an integer variable",
                "Assign it a value",
                "Print the value using printf()",
                "Each statement needs a semicolon"
            ]
        },
        {
            topicNumber: "1.6",
            title: "C Output",
            purpose: "Learn to display output to the console using printf() function",
            definition: "Output in C is primarily done using the printf() function from stdio.h library. It allows you to display text, numbers, and formatted data to the standard output (console).",
            syntax: `// printf() syntax:
printf("format string", arguments);

// Common format specifiers:
printf("%d", integer);      // Print integer
printf("%f", float);        // Print floating-point
printf("%c", character);    // Print character
printf("%s", string);       // Print string
printf("%%");               // Print % symbol

// Multiple values:
printf("%d %s", number, text);`,
            exampleCode: `#include <stdio.h>

int main() {
    // Simple text output
    printf("Hello, World!\\n");
    
    // Output with integers
    int age = 25;
    printf("Age: %d\\n", age);
    
    // Output with floating-point numbers
    float price = 19.99;
    printf("Price: $%.2f\\n", price);
    
    // Output with characters
    char grade = 'A';
    printf("Grade: %c\\n", grade);
    
    // Multiple values
    printf("Name: %s, Age: %d\\n", "John", age);
    
    return 0;
}`,
            expectedOutput: `Hello, World!
Age: 25
Price: $19.99
Grade: A
Name: John, Age: 25`,
            explanation: "printf() is the primary output function in C. The %d, %f, %c, %s are format specifiers that tell printf() how to display the data. The \\n creates a new line. You can print multiple values in one printf() statement.",
            practiceChallenge: "Write a program that prints your name, age, and favorite number using appropriate format specifiers.",
            hints: [
                "Use %s for strings (name)",
                "Use %d for integers (age, number)",
                "Include \\n for line breaks",
                "Test with different values"
            ]
        },
        {
            topicNumber: "1.7",
            title: "Print Text",
            purpose: "Master printing text and strings to the console",
            definition: "Printing text in C involves using printf() with string literals. Text must be enclosed in double quotes and can include escape sequences for special formatting.",
            syntax: `// Printing text:
printf("Simple text");                    // Basic text
printf("Text with\\nnew line");          // New line escape
printf("Tab\\tseparated");                // Tab escape
printf("Quote: \\"Hello\\"");            // Escaped quotes
printf("Backslash: \\\\");                // Escaped backslash

// Multiple lines:
printf("Line 1\\n");
printf("Line 2\\n");
printf("Line 3\\n");`,
            exampleCode: `#include <stdio.h>

int main() {
    // Print simple text
    printf("Welcome to C Programming!\\n");
    
    // Print multiline text
    printf("This is line 1\\n");
    printf("This is line 2\\n");
    printf("This is line 3\\n");
    
    // Print text with special characters
    printf("\\nQuoted text: \\"Learning C\\"\\n");
    printf("Path example: C:\\\\Users\\\\Documents\\n");
    printf("Tab separated\\tvalues\\there\\n");
    
    // ASCII art
    printf("\\n  *\\n");
    printf(" ***\\n");
    printf("*****\\n");
    
    return 0;
}`,
            expectedOutput: `Welcome to C Programming!
This is line 1
This is line 2
This is line 3

Quoted text: "Learning C"
Path example: C:\\Users\\Documents
Tab separated	values	here

  *
 ***
*****`,
            explanation: "Text in C must be within double quotes. Escape sequences (\\n, \\t, \\\\, \\\") allow you to include special characters. The printf() function automatically processes these escape sequences when displaying text.",
            practiceChallenge: "Create a program that prints a simple box pattern using text and asterisks (*) over multiple lines.",
            hints: [
                "Use multiple printf() statements",
                "Use \\n for new lines",
                "Combine text and symbols",
                "Create a rectangle pattern"
            ]
        },
        {
            topicNumber: "1.8",
            title: "New Lines",
            purpose: "Learn to control output formatting using new line characters and line breaks",
            definition: "New lines in C are created using the escape sequence \\n. This moves the cursor to the beginning of the next line, essential for formatting readable output.",
            syntax: `// New line methods:

// Method 1: \\n within string
printf("Line 1\\nLine 2\\n");

// Method 2: \\n at end
printf("First line\\n");
printf("Second line\\n");

// Method 3: Multiple \\n for blank lines
printf("Text\\n\\n\\n");  // Creates 2 blank lines after text

// Method 4: putchar() for single newline
putchar('\\n');`,
            exampleCode: `#include <stdio.h>

int main() {
    // Single new line
    printf("Hello\\n");
    printf("World\\n");
    
    // Multiple contents on one line (no \\n)
    printf("This ");
    printf("is ");
    printf("one ");
    printf("line\\n");
    
    // Multiple new lines for spacing
    printf("Paragraph 1\\n");
    printf("\\n");  // Blank lines
    printf("Paragraph 2\\n");
    
    // New line at different positions
    printf("Start\\nMiddle\\nEnd\\n");
    
    // \\n vs no \\n demonstration
    printf("No newline here");
    printf(" - still same line\\n");
    printf("This is a new line\\n");
    
    return 0;
}`,
            expectedOutput: `Hello
World
This is one line
Paragraph 1

Paragraph 2
Start
Middle
End
No newline here - still same line
This is a new line`,
            explanation: "The \\n escape sequence is crucial for formatting output. Without it, all output appears on the same line. Multiple \\n characters create blank lines. Always end your output with \\n for proper console formatting.",
            practiceChallenge: "Write a program that displays a 3-line address (Name, Street, City) with proper line breaks.",
            hints: [
                "Use \\n after each line",
                "You can use one printf() with multiple \\n",
                "Or use separate printf() statements",
                "Test the output format"
            ]
        },
        {
            topicNumber: "1.9",
            title: "C Comments",
            purpose: "Understand how to add comments to document your code and improve readability",
            definition: "Comments are non-executable lines in your code used to explain what the code does. They are ignored by the compiler and are essential for code documentation and collaboration.",
            syntax: `// Single-line comment
// This is ignored by the compiler

/* 
   Multi-line comment
   Can span multiple lines
   Also ignored by compiler
*/

int main() {
    printf("Hello");  // Inline comment
    
    /* This section
       prints output */
    printf("World");
    
    return 0;
}`,
            exampleCode: `#include <stdio.h>

/*
 * Program: Comment Demonstration
 * Author: C Student
 * Purpose: Show different comment styles
 */

int main() {
    // This is a single-line comment
    printf("Program started\\n");
    
    /* This is a multi-line comment
       that explains the next section
       of code in detail */
    
    int number = 42;  // Declare and initialize variable
    
    printf("The number is: %d\\n", number);  // Display number
    
    // TODO: Add more features later
    // FIXME: Check for edge cases
    
    /*
     * End of program
     * Return: 0 for success
     */
    return 0;  // Exit successfully
}`,
            expectedOutput: `Program started
The number is: 42`,
            explanation: "Comments don't affect program execution but are vital for code maintenance. Use // for single-line comments and /* */ for multi-line comments. Good comments explain WHY code does something, not just WHAT it does. Common conventions include TODO, FIXME, and NOTE tags.",
            practiceChallenge: "Write a program that calculates the sum of two numbers, with comments explaining each step.",
            hints: [
                "Add a header comment describing the program",
                "Comment each variable declaration",
                "Explain the calculation step",
                "Add a comment before the return statement"
            ]
        }
    ]
};

async function updatePhase1() {
    try {
        console.log("🚀 Starting Phase 1 Content Update for C Programming...\n");

        const courseId = "c-programming";
        const phaseId = "phase-1";

        // Update each topic
        for (const topic of phase1Content.topics) {
            const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topic.topicNumber);

            await setDoc(topicRef, {
                topicNumber: topic.topicNumber,
                title: topic.title,
                purpose: topic.purpose,
                definition: topic.definition,
                syntax: topic.syntax,
                exampleCode: topic.exampleCode,
                expectedOutput: topic.expectedOutput,
                explanation: topic.explanation,
                practiceChallenge: topic.practiceChallenge,
                hints: topic.hints,
                isLocked: topic.topicNumber === "1.1" ? false : true // Only unlock first topic
            }, { merge: true });

            console.log(`✅ Updated ${topic.topicNumber}: ${topic.title}`);
        }

        console.log("\n🎉 Phase 1 Content Successfully Updated!");
        console.log(`📊 Total Topics Updated: ${phase1Content.topics.length}`);
        console.log("\n📝 All topics now have:");
        console.log("   ✓ Purpose and Definition");
        console.log("   ✓ Proper C Syntax Examples");
        console.log("   ✓ Working Code Examples");
        console.log("   ✓ Expected Output");
        console.log("   ✓ Detailed Explanations");
        console.log("   ✓ Practice Challenges");
        console.log("   ✓ Learning Hints");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating Phase 1:", error);
        process.exit(1);
    }
}

updatePhase1();
