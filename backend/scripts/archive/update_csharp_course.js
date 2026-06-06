const { db } = require('./config/firebase');
const { collection, getDocs, doc, writeBatch, setDoc } = require('firebase/firestore');

const csharpCourseData = {
    courseId: "csharp-programming",
    title: "C# Programming",
    description: "Master C# for building Windows applications, game development with Unity, and enterprise backend systems.",
    level: "Beginner",
    topicsCount: 150, // Approximate
    phases: [
        {
            phaseNumber: 1,
            title: "Introduction & Basics",
            topics: ["C# HOME", "C# Intro", "C# Get Started", "C# Syntax", "C# Statements", "C# Output", "C# Comments"]
        },
        {
            phaseNumber: 2,
            title: "Variables & Constants",
            topics: ["C# Variables", "Variables", "Display Variables", "Multiple Variables", "Identifiers", "C# Constants"]
        },
        {
            phaseNumber: 3,
            title: "Data Types & Input",
            topics: ["C# Data Types", "C# User Input"]
        },
        {
            phaseNumber: 4,
            title: "Operators & Expressions",
            topics: ["C# Operators", "Arithmetic", "Assignment", "Comparison", "Logical"]
        },
        {
            phaseNumber: 5,
            title: "Strings",
            topics: ["C# Strings", "Strings", "Concatenation", "Interpolation", "Access Strings", "Special Characters"]
        },
        {
            phaseNumber: 6,
            title: "Control Flow",
            topics: ["C# If…Else", "if", "else", "else if", "Short-hand if…else", "C# Switch"]
        },
        {
            phaseNumber: 7,
            title: "Loops",
            topics: ["C# For Loop", "For Loop", "Foreach Loop", "C# While Loop", "C# Break / Continue"]
        },
        {
            phaseNumber: 8,
            title: "Arrays",
            topics: ["C# Arrays", "Arrays", "Loop Through an Array", "Sort Arrays", "Multidimensional Arrays"]
        },
        {
            phaseNumber: 9,
            title: "Methods",
            topics: ["C# Methods", "C# Method Parameters", "Parameters", "Default Parameter", "Return Values", "Named Arguments", "C# Method Overloading"]
        },
        {
            phaseNumber: 10,
            title: "Object-Oriented Programming (Core C#)",
            topics: [
                "C# OOP", "C# Classes / Objects", "Classes and Objects", "Multiple Objects", "C# Class Members",
                "C# Constructors", "C# Access Modifiers", "C# Properties", "C# Inheritance", "C# Polymorphism",
                "C# Abstraction", "C# Interface", "Interface", "Multiple Interfaces", "C# Enums"
            ]
        },
        {
            phaseNumber: 11,
            title: "Files & Exceptions",
            topics: ["C# Files", "C# Exceptions"]
        },
        {
            phaseNumber: 12,
            title: "How-To Programs (Practice)",
            topics: ["C# How To", "Add Two Numbers"]
        },
        {
            phaseNumber: 13,
            title: "Examples & Practice",
            topics: ["C# Examples", "C# Compiler", "C# Exercises", "C# Quiz"]
        },
        {
            phaseNumber: 14,
            title: "Career & Learning Path",
            topics: ["C# Server", "C# Syllabus", "C# Study Plan", "C# Certificate"]
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
        console.log("🚀 Starting C# Course Update...");
        await forceUpdateCourse(csharpCourseData);
        console.log("\n✨ C# Course updated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        process.exit(1);
    }
}

main();
