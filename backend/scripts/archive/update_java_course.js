const { db } = require('./config/firebase');
const { collection, getDocs, doc, writeBatch, setDoc } = require('firebase/firestore');

const javaCourseData = {
    courseId: "java-programming",
    title: "Java Programming",
    description: "Master Java with this comprehensive curriculum covering basics, OOP, Collections, and Advanced concepts.",
    level: "Beginner",
    topicsCount: 200, // Approximate
    phases: [
        {
            phaseNumber: 1,
            title: "Introduction & Basics",
            topics: ["Java HOME", "Java Intro", "Java Get Started", "Java Syntax", "Java Statements", "Java Output", "Print Text", "Print Numbers", "Java Comments"]
        },
        {
            phaseNumber: 2,
            title: "Variables & Data Handling",
            topics: [
                "Java Variables", "Variables", "Print Variables", "Multiple Variables", "Identifiers", "Constants (final)", "Real-Life Examples",
                "Java Data Types", "Numbers", "Booleans", "Characters", "Non-Primitive Types", "var Keyword", "Real-Life Examples (Types)"
            ]
        },
        {
            phaseNumber: 3,
            title: "Operators & Expressions",
            topics: ["Java Operators", "Arithmetic Operators", "Assignment Operators", "Comparison Operators", "Logical Operators", "Precedence", "Java Booleans"]
        },
        {
            phaseNumber: 4,
            title: "Strings & Text",
            topics: ["Java Strings", "Concatenation", "Numbers and Strings", "Special Characters"]
        },
        {
            phaseNumber: 5,
            title: "Control Flow",
            topics: ["Java If…Else", "If Statement", "Else Statement", "Else If Statement", "Short Hand If…Else", "Nested If", "Logical Operators in If", "Real-Life Examples (If)", "Java Switch"]
        },
        {
            phaseNumber: 6,
            title: "Loops",
            topics: ["Java While Loop", "Do/While Loop", "Real-Life Examples (While)", "Java For Loop", "Nested Loops", "For-Each Loop", "Real-Life Examples (For)"]
        },
        {
            phaseNumber: 7,
            title: "Arrays",
            topics: [
                "Java Arrays", "Loop Through an Array", "Multidimensional Arrays", "Real-Life Examples (Arrays)",
                "Java Arrays Methods", "compare()", "equals()", "sort()", "fill()", "length"
            ]
        },
        {
            phaseNumber: 8,
            title: "Methods & Recursion",
            topics: [
                "Java Methods", "Java Method Parameters", "Parameters", "Return Values", "Java Recursion",
                "Java Output Methods", "print()", "printf()", "println()"
            ]
        },
        {
            phaseNumber: 9,
            title: "Object-Oriented Programming (Core Java)",
            topics: [
                "Java OOP", "Java Classes / Objects", "Java Class Attributes", "Java Class Methods", "Java Constructors",
                "Java this Keyword", "Java Modifiers", "Access Modifiers", "Non-Access Modifiers", "Java Encapsulation",
                "Java Inheritance", "Java Polymorphism", "Java super Keyword", "Java Abstraction", "Java Interface",
                "Java Inner Classes", "Java Anonymous Classes"
            ]
        },
        {
            phaseNumber: 10,
            title: "Enums & Dates",
            topics: ["Java Enum", "Enums", "Enum Constructor", "Java Date"]
        },
        {
            phaseNumber: 11,
            title: "User Input & Errors",
            topics: ["Java User Input", "Java Errors", "Errors", "Debugging", "Exceptions", "Multiple Exceptions", "try-with-resources"]
        },
        {
            phaseNumber: 12,
            title: "File Handling & I/O",
            topics: [
                "Java File Handling", "Create Files", "Write Files", "Read Files", "Delete Files",
                "Java I/O Streams", "FileInputStream", "FileOutputStream", "BufferedReader", "BufferedWriter"
            ]
        },
        {
            phaseNumber: 13,
            title: "Collections & Data Structures",
            topics: [
                "Java Data Structures", "Java Collections",
                "Lists", "Java List", "Java ArrayList", "Java LinkedList", "Java List Sorting",
                "Sets", "Java Set", "Java HashSet", "Java TreeSet", "Java LinkedHashSet",
                "Maps", "Java Map", "Java HashMap", "Java TreeMap", "Java LinkedHashMap",
                "Java Iterator", "Java Algorithms"
            ]
        },
        {
            phaseNumber: 14,
            title: "Advanced Java",
            topics: ["Java Wrapper Classes", "Java Generics", "Java Annotations", "Java RegEx", "Java Threads", "Java Lambda", "Java Advanced Sorting"]
        },
        {
            phaseNumber: 15,
            title: "How-To Programs (Practice Section)",
            topics: [
                "Java How Tos", "Add Two Numbers", "Swap Two Variables", "Even / Odd", "Reverse a Number",
                "Palindrome Check", "Fibonacci", "Prime Number", "Array Problems", "String Problems", "Collections Loops"
            ]
        },
        {
            phaseNumber: 16,
            title: "Reference Section",
            topics: [
                "Java Reference", "Java Keywords", "Java String Methods", "Java Math Methods",
                "Java ArrayList Methods", "Java LinkedList Methods", "Java HashMap Methods", "Java Scanner Methods", "Java System / I/O Methods"
            ]
        },
        {
            phaseNumber: 17,
            title: "Practice & Career",
            topics: [
                "Java Examples", "Java Videos", "Java Compiler", "Java Exercises", "Java Quiz",
                "Java Projects", "Java Server", "Java Syllabus", "Java Study Plan", "Java Interview Q&A", "Java Certificate"
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
        console.log("🚀 Starting Java Course Update...");
        await forceUpdateCourse(javaCourseData);
        console.log("\n✨ Java Course updated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        process.exit(1);
    }
}

main();
