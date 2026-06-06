const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

// Phase 1: Clean and Simple Syntax Examples
const phase1CleanContent = {
    topics: [
        {
            topicNumber: "1.1",
            title: "C Home",
            syntax: `int main() {
    return 0;
}`
        },
        {
            topicNumber: "1.2",
            title: "C Intro",
            syntax: `#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`
        },
        {
            topicNumber: "1.3",
            title: "C Get Started",
            syntax: `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`
        },
        {
            topicNumber: "1.4",
            title: "C Syntax",
            syntax: `#include <stdio.h>

int main() {
    statement1;
    statement2;
    return 0;
}`
        },
        {
            topicNumber: "1.5",
            title: "C Statements",
            syntax: `int x;              // Declaration
x = 5;              // Assignment
printf("%d", x);    // Function call
return 0;           // Return statement`
        },
        {
            topicNumber: "1.6",
            title: "C Output",
            syntax: `printf("text");
printf("%d", number);
printf("%f", decimal);
printf("%c", character);
printf("%s", string);`
        },
        {
            topicNumber: "1.7",
            title: "Print Text",
            syntax: `printf("Simple text");
printf("Line 1\\nLine 2");
printf("Tab\\tseparated");
printf("Quote: \\"text\\"");`
        },
        {
            topicNumber: "1.8",
            title: "New Lines",
            syntax: `printf("First line\\n");
printf("Second line\\n");
printf("Multiple\\n\\n\\nlines");`
        },
        {
            topicNumber: "1.9",
            title: "C Comments",
            syntax: `// Single-line comment

/* Multi-line
   comment */

int x = 5;  // Inline comment`
        }
    ]
};

async function updatePhase1Clean() {
    try {
        console.log("🚀 Updating Phase 1 with Clean Syntax...\n");

        const courseId = "c-programming";
        const phaseId = "phase-1";

        for (const topic of phase1CleanContent.topics) {
            const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topic.topicNumber);

            await setDoc(topicRef, {
                syntax: topic.syntax
            }, { merge: true });

            console.log(`✅ Updated ${topic.topicNumber}: ${topic.title} - Simplified syntax`);
        }

        console.log("\n🎉 Phase 1 Syntax Simplified!");
        console.log("📝 All syntax examples are now clean and minimal");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

updatePhase1Clean();
