const { db } = require('./config/firebase');
const { doc, getDoc } = require('firebase/firestore');

async function checkPhase2Data() {
    const courseId = 'c-programming';
    const phaseId = 'phase-2';
    const topicId = '2.1';

    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (topicSnap.exists()) {
        const data = topicSnap.data();
        console.log("=== Phase 2 Topic 2.1 Data ===");
        console.log("Title:", data.title);
        console.log("\nHas exampleCode:", !!data.exampleCode);
        console.log("exampleCode length:", data.exampleCode?.length);
        console.log("\nFirst 200 chars of exampleCode:");
        console.log(data.exampleCode?.substring(0, 200));
        console.log("\nAll fields:", Object.keys(data));
    } else {
        console.log("Topic 2.1 not found!");
    }

    process.exit(0);
}

checkPhase2Data().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
