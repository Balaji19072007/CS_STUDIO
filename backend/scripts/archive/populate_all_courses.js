const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

const allCourses = [
    {
        courseId: "c-programming",
        title: "C Programming",
        phases: [
            {
                phaseNumber: 1,
                title: "Programming Basics",
                topics: [
                    { id: "1.1", title: "What Is Programming" },
                    { id: "1.2", title: "What Is C Language" },
                    { id: "1.3", title: "Program Structure" },
                    { id: "1.4", title: "First C Program" }
                ]
            },
            {
                phaseNumber: 2,
                title: "Data and Variables",
                topics: [
                    { id: "2.1", title: "Variables" },
                    { id: "2.2", title: "Data Types" },
                    { id: "2.3", title: "Constants" },
                    { id: "2.4", title: "Input and Output" }
                ]
            },
            {
                phaseNumber: 3,
                title: "Operators and Control Flow",
                topics: [
                    { id: "3.1", title: "Arithmetic Operators" },
                    { id: "3.2", title: "Relational Operators" },
                    { id: "3.3", title: "If Statements" },
                    { id: "3.4", title: "Switch Statements" }
                ]
            },
            {
                phaseNumber: 4,
                title: "Loops and Functions",
                topics: [
                    { id: "4.1", title: "While Loop" },
                    { id: "4.2", title: "For Loop" },
                    { id: "4.3", title: "Do While Loop" },
                    { id: "4.4", title: "Functions Basics" }
                ]
            },
            {
                phaseNumber: 5,
                title: "Arrays and Strings",
                topics: [
                    { id: "5.1", title: "Arrays Basics" },
                    { id: "5.2", title: "Array Operations" },
                    { id: "5.3", title: "Strings Basics" },
                    { id: "5.4", title: "String Functions" }
                ]
            }
        ]
    },
    {
        courseId: "python-programming",
        title: "Python Programming",
        phases: [
            {
                phaseNumber: 1,
                title: "Python Basics",
                topics: [
                    { id: "1.1", title: "Introduction to Python" },
                    { id: "1.2", title: "Setting Up Environment" },
                    { id: "1.3", title: "Python Syntax" },
                    { id: "1.4", title: "First Python Program" }
                ]
            },
            {
                phaseNumber: 2,
                title: "Data Types and Variables",
                topics: [
                    { id: "2.1", title: "Variables in Python" },
                    { id: "2.2", title: "Numbers and Strings" },
                    { id: "2.3", title: "Booleans and None" },
                    { id: "2.4", title: "Type Conversion" }
                ]
            },
            {
                phaseNumber: 3,
                title: "Control Flow",
                topics: [
                    { id: "3.1", title: "Conditional Statements" },
                    { id: "3.2", title: "While Loops" },
                    { id: "3.3", title: "For Loops" },
                    { id: "3.4", title: "Break and Continue" }
                ]
            },
            {
                phaseNumber: 4,
                title: "Functions and Modules",
                topics: [
                    { id: "4.1", title: "Defining Functions" },
                    { id: "4.2", title: "Function Arguments" },
                    { id: "4.3", title: "Return Values" },
                    { id: "4.4", title: "Importing Modules" }
                ]
            },
            {
                phaseNumber: 5,
                title: "Lists, Tuples, Dictionaries",
                topics: [
                    { id: "5.1", title: "Lists Basics" },
                    { id: "5.2", title: "List Operations" },
                    { id: "5.3", title: "Tuples Basics" },
                    { id: "5.4", title: "Dictionaries Basics" }
                ]
            }
        ]
    },
    {
        courseId: "java-programming",
        title: "Java Programming",
        phases: [
            {
                phaseNumber: 1,
                title: "Java Basics",
                topics: [
                    { id: "1.1", title: "Introduction to Java" },
                    { id: "1.2", title: "JVM and Bytecode" },
                    { id: "1.3", title: "Java Program Structure" },
                    { id: "1.4", title: "First Java Program" }
                ]
            },
            {
                phaseNumber: 2,
                title: "Variables and Data Types",
                topics: [
                    { id: "2.1", title: "Variables in Java" },
                    { id: "2.2", title: "Primitive Data Types" },
                    { id: "2.3", title: "Type Casting" },
                    { id: "2.4", title: "Input and Output" }
                ]
            },
            {
                phaseNumber: 3,
                title: "Control Statements",
                topics: [
                    { id: "3.1", title: "If-Else Statements" },
                    { id: "3.2", title: "Switch Statement" },
                    { id: "3.3", title: "While and Do-While" },
                    { id: "3.4", title: "For Loops" }
                ]
            },
            {
                phaseNumber: 4,
                title: "OOP Basics",
                topics: [
                    { id: "4.1", title: "Classes and Objects" },
                    { id: "4.2", title: "Method Declaration" },
                    { id: "4.3", title: "Constructors" },
                    { id: "4.4", title: "Access Modifiers" }
                ]
            },
            {
                phaseNumber: 5,
                title: "Arrays and Strings",
                topics: [
                    { id: "5.1", title: "Array Declaration" },
                    { id: "5.2", title: "Looping Through Arrays" },
                    { id: "5.3", title: "String Class" },
                    { id: "5.4", title: "String Methods" }
                ]
            }
        ]
    }
];

async function populateValues() {
    try {
        console.log("🚀 Starting Bulk Course Population...");

        for (const course of allCourses) {
            console.log(`\n📚 Processing Course: ${course.title} (${course.courseId})`);

            // 1. Create Course Document
            const courseRef = doc(db, 'courses', course.courseId);
            await setDoc(courseRef, {
                courseId: course.courseId,
                title: course.title,
                level: "Beginner"
            }, { merge: true });
            console.log(`   ✅ Course document created/updated.`);

            // 2. Create Phases
            for (const phase of course.phases) {
                const phaseId = `phase-${phase.phaseNumber}`;
                const phaseRef = doc(db, 'courses', course.courseId, 'phases', phaseId);

                await setDoc(phaseRef, {
                    phaseNumber: phase.phaseNumber,
                    title: phase.title
                }, { merge: true });
                console.log(`     🔹 Phase ${phase.phaseNumber}: ${phase.title}`);

                // 3. Create Topics
                for (const topic of phase.topics) {
                    const topicId = topic.id;
                    const topicRef = doc(db, 'courses', course.courseId, 'phases', phaseId, 'topics', topicId);

                    await setDoc(topicRef, {
                        topicNumber: topic.id,
                        title: topic.title,
                        isLocked: topic.id !== "1.1" // Example logic: unlock first topic only
                    }, { merge: true });
                    console.log(`        - Topic ${topic.id}: ${topic.title}`);
                }
            }
        }

        console.log("\n🎉 All courses populated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error populating courses:", error);
        process.exit(1);
    }
}

populateValues();
