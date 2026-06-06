const { db } = require('./config/firebase');
const { doc, getDoc, collection, getDocs } = require('firebase/firestore');

async function checkPhase1() {
    const courseId = 'c-programming';
    const phaseId = 'phase-1';

    // Get first topic from Phase 1
    const topicsSnapshot = await getDocs(collection(db, 'courses', courseId, 'phases', phaseId, 'topics'));

    if (topicsSnapshot.empty) {
        console.log("No topics found in Phase 1");
        return;
    }

    // Get first topic
    const firstTopic = topicsSnapshot.docs[0];
    console.log("Topic ID:", firstTopic.id);
    console.log("Topic Data:", JSON.stringify(firstTopic.data(), null, 2));

    process.exit(0);
}

checkPhase1().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
