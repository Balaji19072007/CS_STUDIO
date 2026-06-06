const { db } = require('./config/firebase');
const { doc, getDoc } = require('firebase/firestore');

async function viewPhase1Topic() {
    const courseId = 'c-programming';
    const phaseId = 'phase-1';
    const topicId = '1.3'; // C Syntax topic

    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (topicSnap.exists()) {
        console.log("=== PHASE 1 TOPIC STRUCTURE ===");
        console.log(JSON.stringify(topicSnap.data(), null, 2));
    } else {
        console.log("Topic not found");
    }

    process.exit(0);
}

viewPhase1Topic().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
