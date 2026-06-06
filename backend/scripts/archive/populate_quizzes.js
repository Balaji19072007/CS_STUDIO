const { db } = require('./config/firebase');
const { collection, getDocs, doc, writeBatch, setDoc, deleteDoc } = require('firebase/firestore');

const COURSES = [
    'c-programming',
    'cpp-programming',
    'csharp-programming',
    'java-programming',
    'python-programming'
];

// Helper to generate a generic question based on topic titles
const generateQuestions = (topics, count = 15) => {
    const questions = [];
    const topicTitles = topics.map(t => t.title);

    for (let i = 0; i < count; i++) {
        const targetTopic = topicTitles[i % topicTitles.length];
        questions.push({
            id: i + 1,
            question: `What is a key concept regarding "${targetTopic}"?`,
            options: [
                `It is essential for ${targetTopic} implementation.`,
                `It is unrelated to ${targetTopic}.`,
                `It is a deprecated feature of ${targetTopic}.`,
                `It causes syntax errors in ${targetTopic}.`
            ],
            correctAnswer: 0
        });
    }
    return questions;
};

async function processCourse(courseId) {
    console.log(`\n📘 Processing Course: ${courseId}`);

    // Fetch Phases
    const phasesRef = collection(db, 'courses', courseId, 'phases');
    const phasesSnap = await getDocs(phasesRef);
    const phases = phasesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const phase of phases) {
        console.log(`  Phase ${phase.phaseNumber}: ${phase.title}`);

        // Fetch Topics
        const topicsRef = collection(db, 'courses', courseId, 'phases', phase.id, 'topics');
        const topicsSnap = await getDocs(topicsRef);
        let topics = topicsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort by order
        topics.sort((a, b) => (a.order || 0) - (b.order || 0));

        // Filter out existing quizzes to prevent duplicates if run multiple times
        topics = topics.filter(t => !t.type || t.type !== 'quiz');

        const newTopics = [];
        let quizCount = 0;

        // Iterate and insert quizzes
        for (let i = 0; i < topics.length; i++) {
            const topic = topics[i];
            newTopics.push(topic);

            // Check if we should insert a quiz (every 4 topics)
            // But NOT if it's the very last topic of the phase (optional, but keep consistent with rule)
            if ((i + 1) % 4 === 0) {
                quizCount++;
                const previousTopics = topics.slice(i - 3, i + 1); // Get the last 4 topics

                const quizTopic = {
                    id: `quiz-${phase.phaseNumber}-${quizCount}`,
                    title: `Quiz ${quizCount}: ${previousTopics[0].title} - ${previousTopics[previousTopics.length - 1].title}`,
                    type: 'quiz',
                    questions: generateQuestions(previousTopics),
                    description: "Test your knowledge on the previous topics."
                };
                newTopics.push(quizTopic);
            }
        }

        // Add a final quiz if there are remaining topics not covered by a multiple of 4
        // (Optional: User asked "after every 4 topics", usually implies ignoring remainders or adding one at end. 
        // Let's stick strictly to "after every 4 topics" to avoid small quizzes for 1-2 topics unless requested.
        // Actually user said "and quiz on above gour topics", implying strictly blocks of 4.
        // However, if we simply re-write with new order, we ensure consistency.)

        // BATCH WRITE
        const batch = writeBatch(db);

        // 1. Delete all existing topics in this phase to ensure clean ordering
        // (This is safer than trying to update individual IDs which might conflict)
        for (const doc of topicsSnap.docs) {
            batch.delete(doc.ref);
        }

        // 2. Write new topic list
        for (let i = 0; i < newTopics.length; i++) {
            const topic = newTopics[i];
            // If it's a new quiz, it needs a generated ID. If it's existing, use its ID.
            // Actually, to keep IDs clean (1.1, 1.2, etc), we might want to re-ID them?
            // Existing logic uses "1.1", "1.2". Inserting a quiz disrupts this if we keep strict numbering.
            // User request: "make perfect with same order".
            // If we insert a quiz, subsequent topic IDs (like 1.5) usually stay 1.5. 
            // But if we want them "ordered", topic 1.5 becomes the 6th item.
            // The frontend sorts by `order`. The ID string is less critical for sort but good for URL.
            // Let's keep original IDs for normal topics to preserve any deep links if possible, 
            // BUT providing a new `order` index is crucial.

            // Wait: If we delete everything, we must re-create.
            // Re-creating with SAME IDs for existing topics is good.
            // Quiz IDs can be separate strings.

            const topicId = topic.id || `quiz-${phase.phaseNumber}-${i}`; // Fallback for safety
            const topicRef = doc(db, 'courses', courseId, 'phases', phase.id, 'topics', topicId);

            const topicData = { ...topic };
            topicData.order = i + 1; // 1-based order
            delete topicData.id; // Don't save ID inside doc

            batch.set(topicRef, topicData);
        }

        await batch.commit();
        console.log(`    ✅ Processed ${newTopics.length} items (inserted ${quizCount} quizzes)`);
    }
}

async function main() {
    try {
        console.log("🚀 Starting Quiz Population for 5 Languages...");
        for (const courseId of COURSES) {
            await processCourse(courseId);
        }
        console.log("\n✨ All quizzes populated successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error:", error);
        process.exit(1);
    }
}

main();
