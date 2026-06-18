const { db } = require('../config/firebase'); // Adjusted path for scripts folder
const { doc, setDoc, collection, getDocs, updateDoc } = require('firebase/firestore');

// Real Data for Phase 1 Topics
const phase1Data = {
    "What is C Programming?": {
        syntax: `// C files end with .c extension
// To compile: gcc filename.c -o outputname
// To run: ./outputname`,
        exampleProgram: `#include <stdio.h>

int main() {
    printf("C is a powerful procedural language!\\n");
    return 0;
}`,
        practiceProblem: {
            description: "Write a program that prints 'Hello, World!' to the console.",
            starterCode: `#include <stdio.h>

int main() {
    // Your code here
    
    return 0;
}`
        }
    },
    "Setting Up Development Environment": {
        syntax: `// Standard compiler installation check:
// Windows: gcc --version
// Mac/Linux: gcc --version`,
        exampleProgram: `#include <stdio.h>

int main() {
    printf("If this runs, your environment is set up!\\n");
    return 0;
}`,
        practiceProblem: {
            description: "Write a program that prints the version of C you are using (just a print statement saying 'C Standard').",
            starterCode: `#include <stdio.h>

int main() {
    // Print "C Standard"
    
    return 0;
}`
        }
    },
    "Structure of a C Program": {
        syntax: `// Header inclusion
#include <stdio.h>

// specific function
void myFunction() {
   // body
}

// Entry point
int main() {
    // statements
    return 0;
}`,
        exampleProgram: `#include <stdio.h>

// This is a function
void greet() {
    printf("This is a separate function.\\n");
}

int main() {
    printf("Starting main...\\n");
    greet(); // Calling the function
    return 0;
}`,
        practiceProblem: {
            description: "Modify the program to add a second function called 'goodbye' that prints 'Goodbye!' and call it after 'greet'.",
            starterCode: `#include <stdio.h>

void greet() {
    printf("Hello!\\n");
}

// Add goodbye function here

int main() {
    greet();
    // Call goodbye here
    return 0;
}`
        }
    },
    "Your First C Program": {
        syntax: `#include <stdio.h>

int main() {
   // code goes here
   return 0; 
}`,
        exampleProgram: `#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    return 0;
}`,
        practiceProblem: {
            description: "Change the program to print your name instead of the welcome message.",
            starterCode: `#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    return 0;
}`
        }
    },
    "Comments and Documentation": {
        syntax: `// This is a single-line comment

/* 
   This is a 
   multi-line comment 
*/`,
        exampleProgram: `#include <stdio.h>

int main() {
    // This prints a message
    printf("Comments are ignored by the compiler.\\n");
    
    /* 
       Optimized for readability.
       Returns 0 for success.
    */
    return 0;
}`,
        practiceProblem: {
            description: "Add comments to the code explaining what each line does, then run it.",
            starterCode: `#include <stdio.h>

int main() {
    int x = 5;
    printf("%d", x);
    return 0;
}`
        }
    },
    "Compilation Process": {
        syntax: `// 1. Preprocessing (.c -> .i)
// 2. Compilation (.i -> .s)
// 3. Assembly (.s -> .o)
// 4. Linking (.o -> .exe)`,
        exampleProgram: `#include <stdio.h>

#define PI 3.14 // Preprocessor directive

int main() {
    printf("Value of PI: %.2f\\n", PI);
    return 0;
}`,
        practiceProblem: {
            description: "Define a macro MAX_SCORE as 100 using #define and print it.",
            starterCode: `#include <stdio.h>

// Define MAX_SCORE here

int main() {
    // Print MAX_SCORE
    return 0;
}`
        }
    },
    "Constants and Literals": {
        syntax: `const int MAX_VALUE = 100;
#define PI 3.14159`,
        exampleProgram: `#include <stdio.h>

int main() {
    const int AGE = 25;
    printf("Age is constant: %d\\n", AGE);
    // AGE = 26; // This would cause an error
    return 0;
}`,
        practiceProblem: {
            description: "Try to modify a constant variable 'LIMIT' set to 50. Observe the error, then fix it by removing the modification.",
            starterCode: `#include <stdio.h>

int main() {
    const int LIMIT = 50;
    // LIMIT = 60; // Uncomment to see error
    printf("Limit: %d", LIMIT);
    return 0;
}`
        }
    },
    "Variables and Data Types": {
        syntax: `int age = 25;
float height = 5.9;
char grade = 'A';
double pi = 3.1415926535;`,
        exampleProgram: `#include <stdio.h>

int main() {
    int items = 10;
    float cost = 9.99;
    printf("Items: %d, Cost: $%.2f\\n", items, cost);
    return 0;
}`,
        practiceProblem: {
            description: "Declare a variable 'year' as an integer (e.g., 2024) and 'letter' as a char (e.g., 'C'), then print them.",
            starterCode: `#include <stdio.h>

int main() {
    // Declare variables here
    
    // Print variables
    return 0;
}`
        }
    },
    "Input and Output Operations": {
        syntax: `printf("Format string %d", var);
scanf("%d", &var);`,
        exampleProgram: `#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);
    printf("You are %d years old.\\n", age);
    return 0;
}`,
        practiceProblem: {
            description: "Write a program that asks for two numbers and prints their sum.",
            starterCode: `#include <stdio.h>

int main() {
    int a, b;
    // Ask for input
    
    // Calculate and print sum
    return 0;
}`
        }
    }
};

// Generic Generators for other topics
function generateGenericContent(topicTitle) {
    const safeTitle = topicTitle.replace(/[^a-zA-Z0-9]/g, '');

    return {
        syntax: `// Syntax for ${topicTitle}
// Standard C implementation pattern

Type variableName = value;
function_name(arguments);`,
        exampleProgram: `#include <stdio.h>

int main() {
    // Example demonstrating ${topicTitle}
    printf("Demonstrating ${topicTitle}...\\n");
    
    // Logic implementation
    int result = 100;
    printf("Result: %d\\n", result);
    
    return 0;
}`,
        practiceProblem: {
            description: `Create a program that implements ${topicTitle} and prints the output.`,
            starterCode: `#include <stdio.h>

int main() {
    // Implement ${topicTitle} here
    
    return 0;
}`
        }
    };
}

async function updateAllContent() {
    console.log("🚀 Starting Smart Content Update...");
    const courseId = 'c-programming';

    try {
        const phasesRef = collection(db, 'courses', courseId, 'phases');
        const phasesSnap = await getDocs(phasesRef);

        for (const phaseDoc of phasesSnap.docs) {
            const phaseId = phaseDoc.id;
            const phaseData = phaseDoc.data();
            console.log(`Processing Phase ${phaseData.phaseNumber}: ${phaseData.title}`);

            const topicsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics');
            const topicsSnap = await getDocs(topicsRef);

            for (const topicDoc of topicsSnap.docs) {
                const topicId = topicDoc.id;
                const topicData = topicDoc.data();
                const title = topicData.title;

                let newContent = {};

                // Use specific data if available (Partial Match check)
                const specificKey = Object.keys(phase1Data).find(k => title.includes(k) || k.includes(title));

                if (specificKey) {
                    console.log(`  ✅ Finding specific content for: ${title}`);
                    const data = phase1Data[specificKey];
                    newContent = {
                        syntax: data.syntax,
                        example_program: data.exampleProgram,
                        practice_problem: JSON.stringify(data.practiceProblem) // Store object as string if needed, or structured
                    };
                } else {
                    console.log(`  ⚠️ Using generic content for: ${title}`);
                    const data = generateGenericContent(title);
                    newContent = {
                        syntax: data.syntax,
                        example_program: data.exampleProgram,
                        practice_problem: JSON.stringify(data.practiceProblem)
                    };
                }

                // Update Firestore
                await updateDoc(doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId), newContent);

                // Also update the separate 'practice_problems' collection? 
                // Currently user asks for "practice problem" in the content. 
                // We'll update the topic document directly as 'practice_problem' (legacy) or 'challenge'
                // Based on schema, TopicContent.jsx reads `practiceProblems` from a subcollection or the topic itself?
                // Let's check: TopicContent.jsx fetches `getPracticeProblems(topicId)`. 
                // This means we need to populate a SUBCOLLECTION `practice_problems` for the topic.

                const problemsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId, 'practice_problems');
                const problemsSnap = await getDocs(problemsRef);

                const problemData = specificKey ? phase1Data[specificKey].practiceProblem : generateGenericContent(title).practiceProblem;

                if (problemsSnap.empty) {
                    // Create new
                    await setDoc(doc(problemsRef), {
                        problem_description: problemData.description,
                        starter_code: problemData.starterCode,
                        solution_code: problemData.starterCode.replace("// Your code here", "// Solution"),
                        hints: ["Check syntax", "Remember headers"],
                        test_cases: [],
                        order_index: 0
                    });
                } else {
                    // Update existing
                    const problemDoc = problemsSnap.docs[0]; // Assume 1 problem per topic for now
                    await updateDoc(doc(problemsRef, problemDoc.id), {
                        problem_description: problemData.description,
                        starter_code: problemData.starterCode,
                        solution_code: problemData.starterCode.replace("// Your code here", "// Solution")
                    });
                }
            }
        }
        console.log("🎉 Content Update Complete!");
    } catch (e) {
        console.error("Error updating content:", e);
    }
}

updateAllContent();
