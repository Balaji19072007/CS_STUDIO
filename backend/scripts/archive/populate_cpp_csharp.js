const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

const newCourses = [
    {
        courseId: "cpp-programming",
        title: "C++ Programming",
        description: "Master C++ usage for systems programming, game development, and high-performance applications.",
        level: "Beginner",
        topicsCount: 20,
        phases: [
            {
                phaseNumber: 1,
                title: "Introduction to C++",
                topics: [
                    { id: "1.1", title: "C++ History & Features" },
                    { id: "1.2", title: "Setting up Environment" },
                    { id: "1.3", title: "Basic Syntax" },
                    { id: "1.4", title: "Input/Output Stream" }
                ]
            },
            {
                phaseNumber: 2,
                title: "Variables & Data Types",
                topics: [
                    { id: "2.1", title: "Variables & Constants" },
                    { id: "2.2", title: "Primitive Data Types" },
                    { id: "2.3", title: "Modifiers & Storage Classes" },
                    { id: "2.4", title: "Type Casting" }
                ]
            },
            {
                phaseNumber: 3,
                title: "Object-Oriented Programming",
                topics: [
                    { id: "3.1", title: "Classes and Objects" },
                    { id: "3.2", title: "Constructors & Destructors" },
                    { id: "3.3", title: "Encapsulation" },
                    { id: "3.4", title: "Inheritance & Polymorphism" }
                ]
            },
            {
                phaseNumber: 4,
                title: "Advanced C++",
                topics: [
                    { id: "4.1", title: "Pointers & References" },
                    { id: "4.2", title: "Memory Management" },
                    { id: "4.3", title: "Templates" },
                    { id: "4.4", title: "Exception Handling" }
                ]
            },
            {
                phaseNumber: 5,
                title: "STL (Standard Template Library)",
                topics: [
                    { id: "5.1", title: "Vectors & Lists" },
                    { id: "5.2", title: "Maps & Sets" },
                    { id: "5.3", title: "Algorithms" },
                    { id: "5.4", title: "Iterators" }
                ]
            }
        ]
    },
    {
        courseId: "csharp-programming",
        title: "C# Programming",
        description: "Learn C# for building Windows applications, game development with Unity, and enterprise backend systems.",
        level: "Beginner",
        topicsCount: 20,
        phases: [
            {
                phaseNumber: 1,
                title: "Introduction to C#",
                topics: [
                    { id: "1.1", title: "Introduction to .NET" },
                    { id: "1.2", title: "Setting up Visual Studio" },
                    { id: "1.3", title: "Program Structure" },
                    { id: "1.4", title: "Console I/O" }
                ]
            },
            {
                phaseNumber: 2,
                title: "Core Concepts",
                topics: [
                    { id: "2.1", title: "Variables & Data Types" },
                    { id: "2.2", title: "Operators & Expressions" },
                    { id: "2.3", title: "Control Flow Statements" },
                    { id: "2.4", title: "Arrays & Strings" }
                ]
            },
            {
                phaseNumber: 3,
                title: "OOP in C#",
                topics: [
                    { id: "3.1", title: "Classes & Objects" },
                    { id: "3.2", title: "Methods & Parameters" },
                    { id: "3.3", title: "Inheritance & Polymorphism" },
                    { id: "3.4", title: "Interfaces & Abstract Classes" }
                ]
            },
            {
                phaseNumber: 4,
                title: "Advanced Features",
                topics: [
                    { id: "4.1", title: "Delegates & Events" },
                    { id: "4.2", title: "Exception Handling" },
                    { id: "4.3", title: "Generics" },
                    { id: "4.4", title: "LINQ Basics" }
                ]
            },
            {
                phaseNumber: 5,
                title: "Asynchronous Programming",
                topics: [
                    { id: "5.1", title: "Threads & Tasks" },
                    { id: "5.2", title: "Async & Await" },
                    { id: "5.3", title: "File Handling" },
                    { id: "5.4", title: "Working with JSON" }
                ]
            }
        ]
    }
];

async function populateCourses() {
    try {
        console.log("🚀 Starting C++ & C# Course Population...");

        for (const course of newCourses) {
            console.log(`\n📚 Processing Course: ${course.title} (${course.courseId})`);

            // 1. Create/Update Course Document
            const courseRef = doc(db, 'courses', course.courseId);
            await setDoc(courseRef, {
                courseId: course.courseId,
                title: course.title,
                description: course.description,
                level: course.level,
                topicsCount: course.topicsCount
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
                        isLocked: topic.id !== "1.1"
                    }, { merge: true });
                    console.log(`        - Topic ${topic.id}: ${topic.title}`);
                }
            }
        }

        console.log("\n🎉 Courses populated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error populating courses:", error);
        process.exit(1);
    }
}

populateCourses();
