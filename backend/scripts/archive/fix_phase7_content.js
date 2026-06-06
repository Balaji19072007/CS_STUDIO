const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection, setDoc, deleteDoc } = require('firebase/firestore');

async function fixPhase7Content() {
    const courseId = 'c-programming';

    console.log("🔍 Checking Phase 7 and Phase 8...\n");

    // Check Phase 7
    const phase7TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-7', 'topics');
    const phase7TopicsSnap = await getDocs(phase7TopicsRef);

    console.log(`Phase 7 has ${phase7TopicsSnap.size} topics:`);
    phase7TopicsSnap.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.title}`);
    });

    // Check Phase 8
    const phase8TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-8', 'topics');
    const phase8TopicsSnap = await getDocs(phase8TopicsRef);

    console.log(`\nPhase 8 has ${phase8TopicsSnap.size} topics:`);
    phase8TopicsSnap.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.title}`);
    });

    // Check if Phase 7 has the wrong content (arrays instead of functions)
    let hasWrongContent = false;
    phase7TopicsSnap.forEach(doc => {
        const title = doc.data().title || '';
        if (title.toLowerCase().includes('array') || title.toLowerCase().includes('string')) {
            hasWrongContent = true;
        }
    });

    if (hasWrongContent) {
        console.log("\n⚠️  Phase 7 has wrong content (Arrays instead of Functions)");
        console.log("🔄 Fixing: Deleting Phase 7 topics and re-adding correct Functions topics...\n");

        // Delete all Phase 7 topics
        for (const doc of phase7TopicsSnap.docs) {
            await deleteDoc(doc.ref);
            console.log(`   Deleted: ${doc.id}`);
        }

        // Re-add correct Functions topics
        const functionsTopics = {
            "7.1": {
                title: "Function Basics",
                purpose: "Learn to create reusable blocks of code that perform specific tasks",
                definition: "A function is a self-contained block of code that performs a specific task. Functions help organize code, avoid repetition, and make programs easier to understand and maintain.",
                why: "Without functions, you'd repeat the same code everywhere. Functions let you write code once and reuse it many times, making programs shorter and easier to maintain.",
                keyConcepts: ["Function declaration", "Function definition", "Function call", "Return type", "Parameters"],
                syntax: `// Function declaration (prototype)
returnType functionName(parameters);

// Function definition
returnType functionName(parameters) {
    // Function body
    return value;
}

// Function call
result = functionName(arguments);`,
                syntaxExplanation: [
                    "Declaration tells compiler function exists (usually before main)",
                    "Definition contains actual code that runs",
                    "Call executes the function with given arguments",
                    "Return type specifies what type of value function returns (int, float, void)"
                ],
                exampleCode: `#include <stdio.h>

// Function declarations
void greet();
int add(int a, int b);
float calculateArea(float radius);

int main() {
    // 1. Simple function call (no parameters, no return)
    greet();
    
    // 2. Function with parameters and return value
    int sum = add(10, 20);
    printf("\\\\nSum: %d\\\\n", sum);
    
    // 3. Function with calculation
    float area = calculateArea(5.0);
    printf("Area of circle (radius 5): %.2f\\\\n", area);
    
    // Call add multiple times
    printf("\\\\nMultiple calls:\\\\n");
    printf("5 + 3 = %d\\\\n", add(5, 3));
    printf("100 + 200 = %d\\\\n", add(100, 200));
    printf("7 + 9 = %d\\\\n", add(7, 9));
    
    return 0;
}

// Function definitions

void greet() {
    printf("=== Welcome to C Functions! ===\\\\n");
    printf("Functions make code reusable\\\\n");
}

int add(int a, int b) {
    int result = a + b;
    return result;
}

float calculateArea(float radius) {
    float pi = 3.14159;
    float area = pi * radius * radius;
    return area;
}`,
                output: `=== Welcome to C Functions! ===
Functions make code reusable

Sum: 30
Area of circle (radius 5): 78.54

Multiple calls:
5 + 3 = 8
100 + 200 = 300
7 + 9 = 16`,
                practiceProblem: "Write a program with functions: multiply(a,b), findMax(a,b), isEven(n). Call each function and display results",
                practiceProblemId: 7001,
                keyPoints: ["Functions avoid code repetition", "Declare before main, define after", "Call functions by name with arguments"],
                commonMistakes: ["Forgetting to declare function before main", "Parameter types don't match arguments", "Missing return statement"],
                summary: ["Functions are reusable blocks of code", "Declare before using, define implementation", "Make code modular and maintainable"],
                order: 1
            }
        };

        // Add just one topic for now as verification
        const topicRef = doc(db, 'courses', courseId, 'phases', 'phase-7', 'topics', '7.1');
        await setDoc(topicRef, functionsTopics["7.1"]);
        console.log("\n✅ Added correct Function topic 7.1");

        // Update Phase 7 metadata
        const phase7Ref = doc(db, 'courses', courseId, 'phases', 'phase-7');
        await setDoc(phase7Ref, {
            title: "Functions",
            description: "Learn to create reusable code with functions, recursion, and function pointers",
            order: 7
        }, { merge: true });

        // Update Phase 8 metadata (old Phase 7 content)
        const phase8Ref = doc(db, 'courses', courseId, 'phases', 'phase-8');
        const phase8Doc = await getDoc(phase8Ref);
        if (phase8Doc.exists()) {
            const phase8Title = phase8Doc.data().title;
            console.log(`\n✅ Phase 8 is: ${phase8Title}`);
        }

        console.log("\n✅ Phase 7 fixed!");
    } else {
        console.log("\n✅ Phase 7 already has correct Functions content");
    }

    process.exit(0);
}

fixPhase7Content().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
