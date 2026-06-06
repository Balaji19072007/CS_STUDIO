const { db } = require('./config/firebase');
const { doc, setDoc, writeBatch } = require('firebase/firestore');

const cCourseData = {
    courseId: "c-programming",
    title: "C Programming",
    description: "Master the C language with this comprehensive curriculum covering basics, pointers, memory management, and advanced concepts.",
    level: "Beginner",
    topicsCount: 100, // Approximate
    phases: [
        {
            phaseNumber: 1,
            title: "Introduction & Basics",
            topics: [
                "C Home", "C Intro", "C Get Started", "C Syntax", "C Statements",
                "C Output", "Print Text", "New Lines", "C Comments"
            ]
        },
        {
            phaseNumber: 2,
            title: "Variables & Data Handling",
            topics: [
                "C Variables", "Create Variables", "Variable Names", "Change Values", "Multiple Variables",
                "Format Specifiers", "Real-Life Examples (Variables)", "C Data Types", "Numbers",
                "Characters", "Decimal Precision", "Memory Size", "Extended Types",
                "C Type Conversion", "C Constants"
            ]
        },
        {
            phaseNumber: 3,
            title: "Operators & Expressions",
            topics: [
                "C Operators", "Arithmetic Operators", "Assignment Operators", "Comparison Operators",
                "Logical Operators", "Operator Precedence", "C Booleans"
            ]
        },
        {
            phaseNumber: 4,
            title: "Control Flow",
            topics: [
                "C If...Else", "If Statement", "Else Statement", "Else If Statement", "Short Hand If",
                "Nested If", "Logical Operators in If", "Real-Life Examples (If/Else)", "C Switch"
            ]
        },
        {
            phaseNumber: 5,
            title: "Loops",
            topics: [
                "C While Loop", "Do/While Loop", "Real-Life Examples (While)", "C For Loop",
                "Nested Loops", "Real-Life Examples (For)", "C Break / Continue"
            ]
        },
        {
            phaseNumber: 6,
            title: "Functions",
            topics: [
                "C Functions", "Function Declaration", "Function Parameters", "Variable Scope",
                "Math Functions", "Inline Functions", "Recursion", "Function Pointers"
            ]
        },
        {
            phaseNumber: 7,
            title: "Arrays & Strings",
            topics: [
                "C Arrays", "Array Size", "Array Loops", "Multidimensional Arrays",
                "Real-Life Examples (Arrays)", "C Strings", "Special Characters", "String Functions"
            ]
        },
        {
            phaseNumber: 8,
            title: "Input & Memory Basics",
            topics: [
                "C User Input", "C Memory Address"
            ]
        },
        {
            phaseNumber: 9,
            title: "Pointers (Core C Concept)",
            topics: [
                "C Pointers", "Pointer Syntax", "Pointers & Arrays", "Pointer Arithmetic", "Pointer to Pointer"
            ]
        },
        {
            phaseNumber: 10,
            title: "Structures & Enums",
            topics: [
                "C Structures", "Nested Structures", "Structs & Pointers", "Struct Padding",
                "C Unions", "typedef Keyword", "C Enums"
            ]
        },
        {
            phaseNumber: 11,
            title: "Memory Management",
            topics: [
                "C Memory Management", "Allocate Memory (malloc)", "Access Memory",
                "Reallocate Memory (realloc)", "Deallocate Memory (free)", "Structs and Memory"
            ]
        },
        {
            phaseNumber: 12,
            title: "Files Handling",
            topics: [
                "C Files Basics", "Create Files", "Write to Files", "Read Files"
            ]
        },
        {
            phaseNumber: 13,
            title: "Error Handling & Debugging",
            topics: [
                "C Errors", "NULL Pointer", "Error Handling Techniques", "Input Validation", "Debugging Tips"
            ]
        },
        {
            phaseNumber: 14,
            title: "Advanced C Concepts",
            topics: [
                "Macros", "Storage Classes", "Bitwise Operators", "Fixed-width Integers",
                "Organize Code", "Date & Time", "Random Numbers"
            ]
        },
        {
            phaseNumber: 15,
            title: "Practice & Mastery",
            topics: [
                "C Examples", "Real-Life Examples Collection", "Exercises", "Quiz",
                "Challenges", "Compiler Usage"
            ]
        },
        {
            phaseNumber: 16,
            title: "Career & Reference",
            topics: [
                "C Projects", "C Interview Q&A", "C Syllabus", "C Study Plan", "C Certificate"
            ]
        }
    ]
};

async function updateCCourse() {
    try {
        console.log("🚀 Starting C Course Content Update...");

        const batch = writeBatch(db); // Use batch for atomic updates if possible, but standard loop is safer for large deep structures

        // 1. Update Course Document
        const courseRef = doc(db, 'courses', cCourseData.courseId);
        await setDoc(courseRef, {
            title: cCourseData.title,
            description: cCourseData.description,
            level: cCourseData.level,
            topicsCount: cCourseData.topicsCount
        }, { merge: true });
        console.log(`✅ Course document updated.`);

        // 2. Process Phases and Topics
        for (const phase of cCourseData.phases) {
            const phaseId = `phase-${phase.phaseNumber}`;
            const phaseRef = doc(db, 'courses', cCourseData.courseId, 'phases', phaseId);

            await setDoc(phaseRef, {
                phaseNumber: phase.phaseNumber,
                title: phase.title
            }, { merge: true });
            console.log(`  🔹 Phase ${phase.phaseNumber}: ${phase.title}`);

            for (let i = 0; i < phase.topics.length; i++) {
                const topicTitle = phase.topics[i];
                const topicId = `${phase.phaseNumber}.${i + 1}`;
                const topicRef = doc(db, 'courses', cCourseData.courseId, 'phases', phaseId, 'topics', topicId);

                await setDoc(topicRef, {
                    topicNumber: topicId,
                    title: topicTitle,
                    isLocked: !(phase.phaseNumber === 1 && i < 3) // Unlock first few topics
                }, { merge: true });
                console.log(`     - ${topicId}: ${topicTitle}`);
            }
        }

        console.log("\n🎉 C Course Updated Successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating course:", error);
        process.exit(1);
    }
}

updateCCourse();
