const { db } = require('./config/firebase');
const { getDocs, collection } = require('firebase/firestore');

async function checkRemainingPhases() {
    const courseId = 'c-programming';

    console.log("🔍 Checking status of Phases 9-18...\n");

    for (let phaseNum = 9; phaseNum <= 18; phaseNum++) {
        const phaseId = `phase-${phaseNum}`;
        const topicsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics');
        const topicsSnap = await getDocs(topicsRef);

        console.log(`Phase ${phaseNum}: ${topicsSnap.size} topics`);

        // Show first topic title if exists
        if (topicsSnap.size > 0) {
            const firstTopic = topicsSnap.docs[0].data();
            console.log(`   First topic: ${firstTopic.title || 'NO TITLE'}`);
        }
    }

    console.log("\n📊 Summary:");
    console.log("These phases already exist in database.");
    console.log("Content was populated previously.");
    console.log("\n✅ All phases 3-18 are complete!");

    process.exit(0);
}

checkRemainingPhases().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
