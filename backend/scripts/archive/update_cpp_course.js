const { db } = require('./config/firebase');
const { collection, getDocs, doc, writeBatch, setDoc } = require('firebase/firestore');

const cppCourseData = {
    courseId: "cpp-programming",
    title: "C++ Programming",
    description: "Master C++ usage for systems programming, game development, and high-performance applications.",
    level: "Beginner",
    topicsCount: 200, // Approximate
    phases: [
        {
            phaseNumber: 1,
            title: "Introduction & Basics",
            topics: ["C++ HOME", "C++ Intro", "C++ Get Started", "C++ Syntax", "C++ Statements", "C++ Output", "Print Text", "Print Numbers", "New Lines", "C++ Comments"]
        },
        {
            phaseNumber: 2,
            title: "Variables & Data Types",
            topics: [
                "C++ Variables", "Declare Variables", "Multiple Variables", "Identifiers", "Constants", "Real-Life Examples",
                "C++ Data Types", "Basic Data Types", "Numbers", "Booleans", "Characters", "Strings", "auto Keyword", "Real-Life Examples (Data Types)"
            ]
        },
        {
            phaseNumber: 3,
            title: "Operators & Expressions",
            topics: [
                "C++ Operators", "Arithmetic", "Assignment", "Comparison", "Logical", "Precedence",
                "C++ Booleans", "Boolean Values", "Boolean Expressions"
            ]
        },
        {
            phaseNumber: 4,
            title: "Strings & Input",
            topics: [
                "C++ Strings", "Strings Intro", "Concatenation", "Numbers and Strings", "String Length", "Access Strings", "Special Characters",
                "User Input Strings", "Omitting Namespace", "C-Style Strings", "C++ User Input"
            ]
        },
        {
            phaseNumber: 5,
            title: "Control Flow",
            topics: [
                "C++ If…Else", "if", "else", "else if", "Short-hand if…else", "Nested if", "Logical Operators", "C++ Switch"
            ]
        },
        {
            phaseNumber: 6,
            title: "Loops",
            topics: [
                "C++ While Loop", "Do/While Loop", "Real-Life Examples (While)",
                "C++ For Loop", "For Loop", "Nested Loops", "Foreach Loop", "Real-Life Examples (For)", "C++ Break / Continue"
            ]
        },
        {
            phaseNumber: 7,
            title: "Arrays",
            topics: [
                "C++ Arrays", "Arrays", "Arrays and Loops", "Omit Array Size", "Get Array Size", "Multidimensional Arrays", "Real-Life Examples (Arrays)"
            ]
        },
        {
            phaseNumber: 8,
            title: "Functions",
            topics: [
                "C++ Functions", "C++ Function Parameters", "Parameters / Arguments", "Default Parameters", "Multiple Parameters", "Return Values",
                "Pass by Reference", "Pass Arrays", "Pass Structures", "C++ Function Overloading", "C++ Scope", "C++ Recursion", "C++ Lambda"
            ]
        },
        {
            phaseNumber: 9,
            title: "References, Pointers & Memory",
            topics: [
                "C++ References", "Create References", "Memory Address",
                "C++ Pointers", "Create Pointers", "Dereferencing", "Modify Pointers",
                "C++ Memory Management", "new and delete"
            ]
        },
        {
            phaseNumber: 10,
            title: "Structures & Enums",
            topics: ["C++ Structures", "C++ Enums"]
        },
        {
            phaseNumber: 11,
            title: "Object-Oriented Programming (Core C++)",
            topics: [
                "C++ OOP", "C++ Classes / Objects", "C++ Class Methods", "C++ Constructors", "Constructor Overloading", "C++ Access Specifiers",
                "C++ Encapsulation", "C++ Friend Functions", "C++ Inheritance", "Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance",
                "C++ Polymorphism", "Virtual Functions", "C++ Templates"
            ]
        },
        {
            phaseNumber: 12,
            title: "Files & Date",
            topics: ["C++ Files", "C++ Date"]
        },
        {
            phaseNumber: 13,
            title: "Errors & Exceptions",
            topics: ["C++ Errors", "C++ Debugging", "C++ Exceptions", "C++ Input Validation"]
        },
        {
            phaseNumber: 14,
            title: "STL & Data Structures",
            topics: [
                "C++ Data Structures & STL", "C++ Vectors", "C++ List", "C++ Stack", "C++ Queue", "C++ Deque", "C++ Sets", "C++ Maps",
                "C++ Iterators", "C++ Algorithms"
            ]
        },
        {
            phaseNumber: 15,
            title: "Namespaces",
            topics: ["C++ Namespaces"]
        },
        {
            phaseNumber: 16,
            title: "Practice & Projects",
            topics: ["C++ How To", "Add Two Numbers", "Random Numbers", "C++ Projects"]
        },
        {
            phaseNumber: 17,
            title: "Reference Section",
            topics: [
                "C++ Reference", "C++ Keywords", "C++ Libraries", "<iostream>", "<fstream>", "<cmath>", "<string>", "<cstring>", "<ctime>", "<vector>", "<algorithm>"
            ]
        },
        {
            phaseNumber: 18,
            title: "Assessment & Career",
            topics: [
                "C++ Examples", "C++ Real-Life Examples", "C++ Compiler", "C++ Exercises", "C++ Quiz", "C++ Syllabus", "C++ Study Plan", "C++ Certificate"
            ]
        }
    ]
};

async function deleteCollection(collectionPath) {
    const colRef = collection(db, ...collectionPath);
    const docsSnapshot = await getDocs(colRef);

    if (docsSnapshot.empty) return;

    const batch = writeBatch(db);
    docsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`    🗑️ Deleted collection: ${collectionPath.join('/')} (${docsSnapshot.size} docs)`);
}

async function forceUpdateCourse(courseData) {
    console.log(`\n📘 Processing Course: ${courseData.title}`);

    // Update Course Doc
    const courseRef = doc(db, 'courses', courseData.courseId);
    await setDoc(courseRef, {
        title: courseData.title,
        description: courseData.description,
        level: courseData.level,
        topicsCount: courseData.topicsCount
    }, { merge: true });

    // 1. CLEANUP
    console.log(`  🧹 Cleaning up existing data...`);
    for (let p = 1; p <= 30; p++) {
        const phaseId = `phase-${p}`;
        await deleteCollection(['courses', courseData.courseId, 'phases', phaseId, 'topics']);
    }
    await deleteCollection(['courses', courseData.courseId, 'phases']);

    // 2. POPULATE with ORDER
    console.log(`  📝 Writing new data...`);
    for (const phase of courseData.phases) {
        const phaseId = `phase-${phase.phaseNumber}`;
        const phaseRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId);

        await setDoc(phaseRef, {
            phaseNumber: phase.phaseNumber,
            title: phase.title,
            order: phase.phaseNumber
        });

        const batch = writeBatch(db);
        let batchCount = 0;

        for (let i = 0; i < phase.topics.length; i++) {
            const topicTitle = phase.topics[i];
            const topicId = `${phase.phaseNumber}.${i + 1}`;
            const topicRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId, 'topics', topicId);

            batch.set(topicRef, {
                topicNumber: topicId,
                title: topicTitle,
                isLocked: !(phase.phaseNumber === 1 && i < 3),
                order: i + 1
            });
            batchCount++;
        }

        if (batchCount > 0) await batch.commit();
        console.log(`    ✅ Phase ${phase.phaseNumber}: ${phase.title} (${batchCount} topics)`);
    }
}

async function main() {
    try {
        console.log("🚀 Starting C++ Course Update...");
        await forceUpdateCourse(cppCourseData);
        console.log("\n✨ C++ Course updated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        process.exit(1);
    }
}

main();
