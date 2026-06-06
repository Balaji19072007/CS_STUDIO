const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function createPhase18() {
    const courseId = 'c-programming';
    const phaseId = 'phase-18';

    // Set phase metadata
    const phaseRef = doc(db, 'courses', courseId, 'phases', phaseId);
    await setDoc(phaseRef, {
        title: "Preprocessor Directives",
        description: "Learn to use preprocessor directives for macros, conditional compilation, and file inclusion",
        order: 18
    });

    const topics = {
        "18.1": {
            title: "Preprocessor Basics",
            purpose: "Understand how the C preprocessor modifies source code before compilation",
            definition: "The preprocessor is a text substitution tool that runs before the compiler. It processes directives (lines starting with #) to include files, define macros, and conditionally compile code.",
            why: "Preprocessor directives make code more flexible, portable, and maintainable. They enable code reuse, platform-specific code, and debugging controls.",
            keyConcepts: ["Preprocessor directives", "#define", "#include", "Macros", "Text substitution"],
            syntax: `#include <header.h>     // Include system header
#include "myfile.h"     // Include local file
#define PI 3.14159      // Define constant
#define MAX(a,b) ((a)>(b)?(a):(b))  // Define macro`,
            syntaxExplanation: [
                "Preprocessor runs before compilation",
                "# directives are processed first",
                "#include inserts file contents",
                "#define creates text substitutions"
            ],
            exampleCode: `#include <stdio.h>

// Define constants
#define PI 3.14159
#define MAX_SIZE 100
#define PROGRAM_NAME "My C Program"

// Define macros
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define PRINT_VAR(var) printf(#var " = %d\\\\n", var)

int main() {
    // Using constants
    printf("=== Constants ===\\\\n");
    printf("PI = %.5f\\\\n", PI);
    printf("Max Size = %d\\\\n", MAX_SIZE);
    printf("Program: %s\\\\n", PROGRAM_NAME);
    
    // Using macros
    printf("\\\\n=== Macros ===\\\\n");
    int num = 5;
    printf("Square of %d = %d\\\\n", num, SQUARE(num));
    printf("SQUARE(3+2) = %d\\\\n", SQUARE(3+2));
    
    int a = 10, b = 20;
    printf("MAX(%d, %d) = %d\\\\n", a, b, MAX(a, b));
    
    // Stringification
    printf("\\\\n=== Stringification ===\\\\n");
    int value = 42;
    PRINT_VAR(value);
    
    return 0;
}`,
            output: `=== Constants ===
PI = 3.14159
Max Size = 100
Program: My C Program

=== Macros ===
Square of 5 = 25
SQUARE(3+2) = 25
MAX(10, 20) = 20

=== Stringification ===
value = 42`,
            practiceProblem: "Define constants for circle calculations (PI, AREA macro, CIRCUMFERENCE macro). Calculate for radius 5 and 10",
            practiceProblemId: 18001,
            keyPoints: ["Preprocessor runs before compiler", "#define creates text substitutions", "Macros can have parameters"],
            commonMistakes: ["Not using parentheses in macros", "Forgetting macros are text substitution", "Semicolons in #define"],
            summary: ["Preprocessor processes # directives before compilation", "#define creates constants and macros", "Powerful but requires careful use"],
            order: 1
        },
        "18.2": {
            title: "Conditional Compilation",
            purpose: "Compile different code based on conditions for debugging and platform-specific code",
            definition: "Conditional compilation uses #if, #ifdef, #ifndef, #else, #endif to include or exclude code sections during compilation. Essential for cross-platform development and debugging.",
            why: "Different platforms need different code. Debug builds need extra checks. Conditional compilation handles this without changing source code.",
            keyConcepts: ["#ifdef", "#ifndef", "#if", "#else", "#endif", "Platform-specific code"],
            syntax: `#ifdef DEBUG
    // Debug code
#endif

#ifndef HEADER_H
#define HEADER_H
    // Header contents
#endif

#if defined(WINDOWS)
    // Windows code
#elif defined(LINUX)
    // Linux code
#endif`,
            syntaxExplanation: [
                "#ifdef checks if macro is defined",
                "#ifndef checks if macro is NOT defined",
                "#if evaluates compile-time expressions",
                "#else and #endif complete conditional blocks"
            ],
            exampleCode: `#include <stdio.h>

// Define different modes
#define DEBUG 1
#define PLATFORM_WINDOWS 1

int main() {
    printf("=== Conditional Compilation Demo ===\\\\n\\\\n");
    
    // Debug mode code
    #ifdef DEBUG
        printf("[DEBUG MODE ENABLED]\\\\n");
        printf("Verbose logging active\\\\n\\\\n");
    #endif
    
    // Platform-specific code
    #ifdef PLATFORM_WINDOWS
        printf("Platform: Windows\\\\n");
        printf("Using Windows-specific code\\\\n");
    #elif defined(PLATFORM_LINUX)
        printf("Platform: Linux\\\\n");
        printf("Using Linux-specific code\\\\n");
    #else
        printf("Platform: Unknown\\\\n");
    #endif
    
    // Feature flags
    #define FEATURE_ADVANCED 1
    
    printf("\\\\n=== Features ===\\\\n");
    printf("Basic features: Enabled\\\\n");
    
    #ifdef FEATURE_ADVANCED
        printf("Advanced features: Enabled\\\\n");
    #else
        printf("Advanced features: Disabled\\\\n");
    #endif
    
    return 0;
}`,
            output: `=== Conditional Compilation Demo ===

[DEBUG MODE ENABLED]
Verbose logging active

Platform: Windows
Using Windows-specific code

=== Features ===
Basic features: Enabled
Advanced features: Enabled`,
            practiceProblem: "Create program with DEBUG mode that prints extra info when enabled, normal output when disabled",
            practiceProblemId: 18002,
            keyPoints: ["Conditional compilation for different builds", "Platform-specific code handling", "Debug vs release builds"],
            commonMistakes: ["Forgetting #endif", "Nested conditionals without clear structure", "Not testing all conditions"],
            summary: ["#ifdef, #ifndef for conditional compilation", "Enables platform-specific and debug code", "Code included/excluded at compile time"],
            order: 2
        }
    };

    console.log("🚀 Creating Phase 18: Preprocessor Directives...\n");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content);
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Phase 18 created with ${count} topics!`);
    console.log(`📊 Total phases now: 17 (Phases 3-19)`);
    console.log("\n✅ Course structure complete!");

    process.exit(0);
}

createPhase18().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
