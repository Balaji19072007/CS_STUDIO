const { db } = require('./config/firebase');
const { collection, getDocs, doc, writeBatch, setDoc } = require('firebase/firestore');

// --- DATA DEFINITIONS ---

// Helper to expand subtopics into a flat top-level list while preserving order
// The user provided indented lists. We will flatten them.
const pythonPhases = [
    {
        phaseNumber: 1,
        title: "Introduction & Basics",
        topics: ["Python HOME", "Python Intro", "Python Get Started", "Python Syntax", "Python Statements", "Python Output", "Print Text", "Print Numbers", "Python Comments"]
    },
    {
        phaseNumber: 2,
        title: "Variables & Data Handling",
        topics: ["Python Variables", "Variable Names", "Assign Multiple Values", "Output Variables", "Global Variables", "Python Data Types", "Python Numbers", "Python Casting", "Python Constants (conceptual)", "Python None"]
    },
    {
        phaseNumber: 3,
        title: "Strings & Text Processing",
        topics: ["Python Strings", "Slicing Strings", "Modify Strings", "Concatenate Strings", "Format Strings", "Escape Characters", "String Methods", "Python String Formatting"]
    },
    {
        phaseNumber: 4,
        title: "Operators & Expressions",
        topics: ["Python Operators", "Arithmetic Operators", "Assignment Operators", "Comparison Operators", "Logical Operators", "Identity Operators", "Membership Operators", "Bitwise Operators", "Operator Precedence", "Python Booleans"]
    },
    {
        phaseNumber: 5,
        title: "Control Flow",
        topics: ["Python If...Else", "Python If", "Python Elif", "Python Else", "Shorthand If", "Logical Operators", "Nested If", "Pass Statement", "Python Match"]
    },
    {
        phaseNumber: 6,
        title: "Loops",
        topics: ["Python While Loops", "Python For Loops", "Python Range", "Break / Continue (implicit)"]
    },
    {
        phaseNumber: 7,
        title: "Core Data Structures",
        topics: [
            "Python Lists", "Access Items", "Change Items", "Add Items", "Remove Items", "Loop Lists", "List Comprehension", "Sort Lists", "Copy Lists", "Join Lists", "List Methods",
            "Python Tuples", "Access Tuples", "Update Tuples", "Unpack Tuples", "Loop Tuples", "Join Tuples", "Tuple Methods",
            "Python Sets", "Access Set Items", "Add Set Items", "Remove Set Items", "Loop Sets", "Join Sets", "Frozenset", "Set Methods",
            "Python Dictionaries", "Access Items", "Change Items", "Add Items", "Remove Items", "Loop Dictionaries", "Copy Dictionaries", "Nested Dictionaries", "Dictionary Methods"
        ]
    },
    {
        phaseNumber: 8,
        title: "Functions",
        topics: ["Python Functions", "Python Arguments", "Python *args / **kwargs", "Python Scope", "Python Lambda", "Python Recursion", "Python Generators", "Python Decorators"]
    },
    {
        phaseNumber: 9,
        title: "Modules & Packages",
        topics: ["Python Modules", "Python PIP", "Python Virtual Environment"]
    },
    {
        phaseNumber: 10,
        title: "File Handling & Exceptions",
        topics: ["Python File Handling", "Read Files", "Write/Create Files", "Delete Files", "Python Try...Except"]
    },
    {
        phaseNumber: 11,
        title: "Built-in Utilities",
        topics: ["Python User Input", "Python Math", "Python Dates", "Python JSON", "Python RegEx"]
    },
    {
        phaseNumber: 12,
        title: "Object-Oriented Programming",
        topics: ["Python OOP", "Python Classes / Objects", "Python init Method", "Python self Parameter", "Python Class Properties", "Python Class Methods", "Inheritance", "Polymorphism", "Encapsulation", "Inner Classes"]
    },
    {
        phaseNumber: 13,
        title: "Advanced Iteration & Internals",
        topics: ["Python Iterators", "Python Arrays"]
    },
    {
        phaseNumber: 14,
        title: "Data Science & Visualization (Optional Track)",
        topics: ["NumPy Tutorial", "Pandas Tutorial", "SciPy Tutorial", "Matplotlib", "Plotting", "Charts", "Subplots"]
    },
    {
        phaseNumber: 15,
        title: "Machine Learning (Optional Track)",
        topics: ["Machine Learning Basics", "Regression", "Classification", "Clustering", "Model Evaluation"]
    },
    {
        phaseNumber: 16,
        title: "Data Structures & Algorithms",
        topics: ["Python DSA", "Lists & Arrays", "Stacks & Queues", "Linked Lists", "Trees & Graphs", "Searching Algorithms", "Sorting Algorithms"]
    },
    {
        phaseNumber: 17,
        title: "Databases",
        topics: ["Python MySQL", "Python MongoDB"]
    },
    {
        phaseNumber: 18,
        title: "Practice & Career",
        topics: ["Python Examples", "Python Exercises", "Python Quiz", "Python Compiler", "Python Projects", "Python Interview Q&A", "Python Bootcamp", "Python Certificate"]
    }
];

const cPhases = [
    {
        phaseNumber: 1,
        title: "Introduction & Basics",
        topics: ["C Home", "C Intro", "C Get Started", "C Syntax", "C Statements", "C Output", "Print Text", "New Lines", "C Comments"]
    },
    {
        phaseNumber: 2,
        title: "Variables & Data Handling",
        topics: ["C Variables", "Create Variables", "Variable Names", "Change Values", "Multiple Variables", "Format Specifiers", "Real-Life Examples (Variables)", "C Data Types", "Numbers", "Characters", "Decimal Precision", "Memory Size", "Extended Types", "C Type Conversion", "C Constants"]
    },
    {
        phaseNumber: 3,
        title: "Operators & Expressions",
        topics: ["C Operators", "Arithmetic Operators", "Assignment Operators", "Comparison Operators", "Logical Operators", "Operator Precedence", "C Booleans"]
    },
    {
        phaseNumber: 4,
        title: "Control Flow",
        topics: ["C If...Else", "If Statement", "Else Statement", "Else If Statement", "Short Hand If", "Nested If", "Logical Operators in If", "Real-Life Examples (If/Else)", "C Switch"]
    },
    {
        phaseNumber: 5,
        title: "Loops",
        topics: ["C While Loop", "Do/While Loop", "Real-Life Examples (While)", "C For Loop", "Nested Loops", "Real-Life Examples (For)", "C Break / Continue"]
    },
    {
        phaseNumber: 6,
        title: "Functions",
        topics: ["C Functions", "Function Declaration", "Function Parameters", "Variable Scope", "Math Functions", "Inline Functions", "Recursion", "Function Pointers"]
    },
    {
        phaseNumber: 7,
        title: "Arrays & Strings",
        topics: ["C Arrays", "Array Size", "Array Loops", "Multidimensional Arrays", "Real-Life Examples (Arrays)", "C Strings", "Special Characters", "String Functions"]
    },
    {
        phaseNumber: 8,
        title: "Input & Memory Basics",
        topics: ["C User Input", "C Memory Address"]
    },
    {
        phaseNumber: 9,
        title: "Pointers (Core C Concept)",
        topics: ["C Pointers", "Pointer Syntax", "Pointers & Arrays", "Pointer Arithmetic", "Pointer to Pointer"]
    },
    {
        phaseNumber: 10,
        title: "Structures & Enums",
        topics: ["C Structures", "Nested Structures", "Structs & Pointers", "Struct Padding", "C Unions", "typedef Keyword", "C Enums"]
    },
    {
        phaseNumber: 11,
        title: "Memory Management",
        topics: ["C Memory Management", "Allocate Memory (malloc)", "Access Memory", "Reallocate Memory (realloc)", "Deallocate Memory (free)", "Structs and Memory"]
    },
    {
        phaseNumber: 12,
        title: "Files Handling",
        topics: ["C Files Basics", "Create Files", "Write to Files", "Read Files"]
    },
    {
        phaseNumber: 13,
        title: "Error Handling & Debugging",
        topics: ["C Errors", "NULL Pointer", "Error Handling Techniques", "Input Validation", "Debugging Tips"]
    },
    {
        phaseNumber: 14,
        title: "Advanced C Concepts",
        topics: ["Macros", "Storage Classes", "Bitwise Operators", "Fixed-width Integers", "Organize Code", "Date & Time", "Random Numbers"]
    },
    {
        phaseNumber: 15,
        title: "Practice & Mastery",
        topics: ["C Examples", "Real-Life Examples Collection", "Exercises", "Quiz", "Challenges", "Compiler Usage"]
    },
    {
        phaseNumber: 16,
        title: "Career & Reference",
        topics: ["C Projects", "C Interview Q&A", "C Syllabus", "C Study Plan", "C Certificate"]
    }
];

const pythonCourseData = {
    courseId: "python-programming",
    title: "Python Programming",
    description: "Master Python from basics to advanced topics including Data Science, Machine Learning, and Web Development concepts.",
    level: "Beginner",
    topicsCount: 180,
    phases: pythonPhases
};

const cCourseData = {
    courseId: "c-programming",
    title: "C Programming",
    description: "Master the C language with this comprehensive curriculum covering basics, pointers, memory management, and advanced concepts.",
    level: "Beginner",
    topicsCount: 160,
    phases: cPhases
};

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

    // Update Phases
    for (const phase of courseData.phases) {
        const phaseId = `phase-${phase.phaseNumber}`;
        const phaseRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId);

        // Add 'order' field for Phases too
        await setDoc(phaseRef, {
            phaseNumber: phase.phaseNumber,
            title: phase.title,
            order: phase.phaseNumber // CRITICAL: For sorting
        }, { merge: true });

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
                order: i + 1 // CRITICAL: For sorting
            });
            batchCount++;
        }

        if (batchCount > 0) await batch.commit();
        console.log(`    ✅ Phase ${phase.phaseNumber}: ${phase.title} (${batchCount} topics updated with order)`);
    }
}

async function main() {
    try {
        console.log("🚀 Starting Sort-Order Fix Update...");
        await forceUpdateCourse(cCourseData);
        await forceUpdateCourse(pythonCourseData);
        console.log("\n✨ Courses updated with correct 'order' fields!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        process.exit(1);
    }
}

main();
