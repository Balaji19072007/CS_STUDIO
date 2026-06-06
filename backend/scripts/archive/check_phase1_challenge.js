const { db } = require('./config/firebase');
const { doc, getDoc } = require('firebase/firestore');

async function checkPhase1Challenge() {
    const courseId = 'c-programming';
    const phaseId = 'phase-1';
    const topicId = '1.1'; // First topic

    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (topicSnap.exists()) {
        const data = topicSnap.data();
        console.log("=== Phase 1 Topic Fields ===");
        console.log("Title:", data.title);
        console.log("Has practiceProblemId:", data.practiceProblemId);
        console.log("practiceProblem:", data.practiceProblem);
        console.log("\nAll fields:", Object.keys(data));
    }

    process.exit(0);
}

checkPhase1Challenge().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
