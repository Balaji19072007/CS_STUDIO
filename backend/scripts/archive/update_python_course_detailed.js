const { db } = require('./config/firebase');
const { doc, setDoc, writeBatch } = require('firebase/firestore');

const pythonCourseData = {
    courseId: "python-programming",
    title: "Python Programming",
    description: "Master Python from basics to advanced topics including Data Science, Machine Learning, and Web Development concepts.",
    level: "Beginner",
    topicsCount: 150, // Approximate
    phases: [
        {
            phaseNumber: 1,
            title: "Introduction & Basics",
            topics: [
                "Python HOME", "Python Intro", "Python Get Started", "Python Syntax",
                "Python Statements", "Python Output", "Print Text", "Print Numbers", "Python Comments"
            ]
        },
        {
            phaseNumber: 2,
            title: "Variables & Data Handling",
            topics: [
                "Python Variables", "Variable Names", "Assign Multiple Values", "Output Variables",
                "Global Variables", "Python Data Types", "Python Numbers", "Python Casting",
                "Python Constants (conceptual)", "Python None"
            ]
        },
        {
            phaseNumber: 3,
            title: "Strings & Text Processing",
            topics: [
                "Python Strings", "Slicing Strings", "Modify Strings", "Concatenate Strings",
                "Format Strings", "Escape Characters", "String Methods", "Python String Formatting"
            ]
        },
        {
            phaseNumber: 4,
            title: "Operators & Expressions",
            topics: [
                "Python Operators", "Arithmetic Operators", "Assignment Operators", "Comparison Operators",
                "Logical Operators", "Identity Operators", "Membership Operators", "Bitwise Operators",
                "Operator Precedence", "Python Booleans"
            ]
        },
        {
            phaseNumber: 5,
            title: "Control Flow",
            topics: [
                "Python If...Else", "Python If", "Python Elif", "Python Else", "Shorthand If",
                "Logical Operators", "Nested If", "Pass Statement", "Python Match"
            ]
        },
        {
            phaseNumber: 6,
            title: "Loops",
            topics: [
                "Python While Loops", "Python For Loops", "Python Range", "Break / Continue (implicit)"
            ]
        },
        {
            phaseNumber: 7,
            title: "Core Data Structures",
            topics: [
                "Python Lists", "Access Items", "Change Items", "Add Items", "Remove Items",
                "Loop Lists", "List Comprehension", "Sort Lists", "Copy Lists", "Join Lists", "List Methods",
                "Python Tuples", "Access Tuples", "Update Tuples", "Unpack Tuples", "Loop Tuples",
                "Join Tuples", "Tuple Methods",
                "Python Sets", "Access Set Items", "Add Set Items", "Remove Set Items", "Loop Sets",
                "Join Sets", "Frozenset", "Set Methods",
                "Python Dictionaries", "Access Items", "Change Items", "Add Items", "Remove Items",
                "Loop Dictionaries", "Copy Dictionaries", "Nested Dictionaries", "Dictionary Methods"
            ]
        },
        {
            phaseNumber: 8,
            title: "Functions",
            topics: [
                "Python Functions", "Python Arguments", "Python *args / **kwargs", "Python Scope",
                "Python Lambda", "Python Recursion", "Python Generators", "Python Decorators"
            ]
        },
        {
            phaseNumber: 9,
            title: "Modules & Packages",
            topics: [
                "Python Modules", "Python PIP", "Python Virtual Environment"
            ]
        },
        {
            phaseNumber: 10,
            title: "File Handling & Exceptions",
            topics: [
                "Python File Handling", "Read Files", "Write/Create Files", "Delete Files", "Python Try...Except"
            ]
        },
        {
            phaseNumber: 11,
            title: "Built-in Utilities",
            topics: [
                "Python User Input", "Python Math", "Python Dates", "Python JSON", "Python RegEx"
            ]
        },
        {
            phaseNumber: 12,
            title: "Object-Oriented Programming",
            topics: [
                "Python OOP", "Python Classes / Objects", "Python init Method", "Python self Parameter",
                "Python Class Properties", "Python Class Methods", "Inheritance", "Polymorphism",
                "Encapsulation", "Inner Classes"
            ]
        },
        {
            phaseNumber: 13,
            title: "Advanced Iteration & Internals",
            topics: [
                "Python Iterators", "Python Arrays"
            ]
        },
        {
            phaseNumber: 14,
            title: "Data Science & Visualization (Optional Track)",
            topics: [
                "NumPy Tutorial", "Pandas Tutorial", "SciPy Tutorial", "Matplotlib",
                "Plotting", "Charts", "Subplots"
            ]
        },
        {
            phaseNumber: 15,
            title: "Machine Learning (Optional Track)",
            topics: [
                "Machine Learning Basics", "Regression", "Classification", "Clustering", "Model Evaluation"
            ]
        },
        {
            phaseNumber: 16,
            title: "Data Structures & Algorithms",
            topics: [
                "Python DSA", "Lists & Arrays", "Stacks & Queues", "Linked Lists", "Trees & Graphs",
                "Searching Algorithms", "Sorting Algorithms"
            ]
        },
        {
            phaseNumber: 17,
            title: "Databases",
            topics: [
                "Python MySQL", "Python MongoDB"
            ]
        },
        {
            phaseNumber: 18,
            title: "Practice & Career",
            topics: [
                "Python Examples", "Python Exercises", "Python Quiz", "Python Compiler",
                "Python Projects", "Python Interview Q&A", "Python Bootcamp", "Python Certificate"
            ]
        }
    ]
};

async function updatePythonCourse() {
    try {
        console.log("🚀 Starting Python Course Content Update...");

        const batch = writeBatch(db);

        // 1. Update Course Document
        const courseRef = doc(db, 'courses', pythonCourseData.courseId);
        await setDoc(courseRef, {
            title: pythonCourseData.title,
            description: pythonCourseData.description,
            level: pythonCourseData.level,
            topicsCount: pythonCourseData.topicsCount
        }, { merge: true });
        console.log(`✅ Course document updated.`);

        // 2. Process Phases and Topics
        for (const phase of pythonCourseData.phases) {
            const phaseId = `phase-${phase.phaseNumber}`;
            const phaseRef = doc(db, 'courses', pythonCourseData.courseId, 'phases', phaseId);

            await setDoc(phaseRef, {
                phaseNumber: phase.phaseNumber,
                title: phase.title
            }, { merge: true });
            console.log(`  🔹 Phase ${phase.phaseNumber}: ${phase.title}`);

            for (let i = 0; i < phase.topics.length; i++) {
                const topicTitle = phase.topics[i];
                const topicId = `${phase.phaseNumber}.${i + 1}`;
                const topicRef = doc(db, 'courses', pythonCourseData.courseId, 'phases', phaseId, 'topics', topicId);

                await setDoc(topicRef, {
                    topicNumber: topicId,
                    title: topicTitle,
                    isLocked: !(phase.phaseNumber === 1 && i < 3) // Unlock first few topics
                }, { merge: true });
                console.log(`     - ${topicId}: ${topicTitle}`);
            }
        }

        console.log("\n🎉 Python Course Updated Successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating course:", error);
        process.exit(1);
    }
}

updatePythonCourse();
