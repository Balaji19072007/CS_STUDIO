const { db } = require('./config/firebase');
const { collection, doc, setDoc } = require('firebase/firestore');

const courseData = {
    courseId: "c-programming",
    title: "C Programming",
    level: "Beginner",
    phases: [
        {
            phaseNumber: 1,
            title: "Programming Basics",
            topics: [
                { id: "1.1", title: "What Is Programming" },
                { id: "1.2", title: "What Is C Language" },
                { id: "1.3", title: "Program Structure" },
                { id: "1.4", title: "First C Program" }
            ],
            quiz: { id: "quiz-1", number: "1.Q1", title: "Basics of C" }
        },
        {
            phaseNumber: 2,
            title: "Data and Variables",
            topics: [
                { id: "2.1", title: "Variables" },
                { id: "2.2", title: "Data Types" },
                { id: "2.3", title: "Constants" },
                { id: "2.4", title: "Input and Output" }
            ],
            quiz: { id: "quiz-2", number: "2.Q1", title: "Variables and Data" }
        },
        {
            phaseNumber: 3,
            title: "Operators and Control Flow",
            topics: [
                { id: "3.1", title: "Arithmetic Operators" },
                { id: "3.2", title: "Relational Operators" },
                { id: "3.3", title: "If Statements" },
                { id: "3.4", title: "Switch Statements" }
            ],
            quiz: { id: "quiz-3", number: "3.Q1", title: "Operators and Conditions" }
        },
        {
            phaseNumber: 4,
            title: "Loops and Functions",
            topics: [
                { id: "4.1", title: "While Loop" },
                { id: "4.2", title: "For Loop" },
                { id: "4.3", title: "Do While Loop" },
                { id: "4.4", title: "Functions Basics" }
            ],
            quiz: { id: "quiz-4", number: "4.Q1", title: "Loops and Functions" }
        },
        {
            phaseNumber: 5,
            title: "Arrays and Strings",
            topics: [
                { id: "5.1", title: "Arrays Basics" },
                { id: "5.2", title: "Array Operations" },
                { id: "5.3", title: "Strings Basics" },
                { id: "5.4", title: "String Functions" }
            ],
            quiz: { id: "quiz-5", number: "5.Q1", title: "Arrays and Strings" }
        }
    ]
};

async function createCourseStructure() {
    try {
        console.log(`Starting to create course: ${courseData.title}...`);

        // 1. Create Course Document
        const courseRef = doc(db, 'courses', courseData.courseId);
        await setDoc(courseRef, {
            courseId: courseData.courseId,
            title: courseData.title,
            level: courseData.level
        }, { merge: true });
        console.log(`✅ Course document created.`);

        // 2. Create Phases
        for (const phase of courseData.phases) {
            const phaseId = `phase-${phase.phaseNumber}`;
            const phaseRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId);

            await setDoc(phaseRef, {
                phaseNumber: phase.phaseNumber,
                title: phase.title
            }, { merge: true });
            console.log(`  👉 Phase ${phase.phaseNumber} created.`);

            // 3. Create Topics for this Phase
            for (const topic of phase.topics) {
                // Topic ID corresponds to topic number e.g. "1.1" -> documentId "1.1" seems weird but requested: "Topic documentId format: <topicNumber>"
                // Wait, typically document IDs shouldn't have dots if they are to be clean, but Firestore allows it.
                // The user said: "Topic documentId format: <topicNumber>" (e.g. 1.1)

                // NOTE: Using topic number as ID.
                const topicId = topic.id;
                const topicRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId, 'topics', topicId);

                await setDoc(topicRef, {
                    topicNumber: topic.id,
                    title: topic.title
                }, { merge: true });
                console.log(`    🔹 Topic ${topic.id} created.`);
            }

            // 4. Create Quiz for this Phase
            // "Quiz documentId format: quiz-<phaseNumber>"
            if (phase.quiz) {
                const quizId = phase.quiz.id;
                // Placing quiz in 'quizzes' subcollection under the phase
                const quizRef = doc(db, 'courses', courseData.courseId, 'phases', phaseId, 'quizzes', quizId);

                await setDoc(quizRef, {
                    quizNumber: phase.quiz.number,
                    title: phase.quiz.title,
                    type: "quiz"
                }, { merge: true });
                console.log(`    ❓ Quiz ${phase.quiz.number} created.`);
            }
        }

        console.log(`\n🎉 Course structure creation complete!`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating course structure:", error);
        process.exit(1);
    }
}

createCourseStructure();
