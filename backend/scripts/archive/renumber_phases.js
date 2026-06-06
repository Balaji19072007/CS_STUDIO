const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection, setDoc, deleteDoc } = require('firebase/firestore');

async function renumberPhases() {
    const courseId = 'c-programming';

    console.log("🔄 Starting phase renumbering process...\n");
    console.log("Plan:");
    console.log("- Old Phase 7 → New Phase 8");
    console.log("- Old Phase 8 → New Phase 9");
    console.log("- ... and so on up to Phase 16 → Phase 17");
    console.log("- Insert new 'Functions' as Phase 7\n");

    // First, get all current phases
    const phasesRef = collection(db, 'courses', courseId, 'phases');
    const phasesSnap = await getDocs(phasesRef);

    const phases = [];
    phasesSnap.forEach(doc => {
        const phaseNum = parseInt(doc.id.split('-')[1]);
        if (phaseNum >= 7 && phaseNum <= 16) {
            phases.push({ id: doc.id, num: phaseNum, data: doc.data() });
        }
    });

    // Sort in reverse order (start from highest)
    phases.sort((a, b) => b.num - a.num);

    console.log(`Found ${phases.length} phases to renumber (7-16)\n`);

    // Renumber from highest to lowest to avoid conflicts
    for (const phase of phases) {
        const oldPhaseId = phase.id;
        const newPhaseNum = phase.num + 1;
        const newPhaseId = `phase-${newPhaseNum}`;

        console.log(`📦 Moving ${oldPhaseId} (${phase.data.title}) → ${newPhaseId}`);

        // Get all topics from old phase
        const oldTopicsRef = collection(db, 'courses', courseId, 'phases', oldPhaseId, 'topics');
        const oldTopicsSnap = await getDocs(oldTopicsRef);

        console.log(`   Found ${oldTopicsSnap.size} topics to move`);

        // Copy phase metadata to new location
        const newPhaseRef = doc(db, 'courses', courseId, 'phases', newPhaseId);
        await setDoc(newPhaseRef, {
            ...phase.data,
            order: newPhaseNum
        });

        // Copy all topics to new phase
        for (const topicDoc of oldTopicsSnap.docs) {
            const oldTopicId = topicDoc.id;
            // Update topic ID to match new phase number
            const topicParts = oldTopicId.split('.');
            const newTopicId = `${newPhaseNum}.${topicParts[1]}`;

            const topicData = topicDoc.data();
            const newTopicRef = doc(db, 'courses', courseId, 'phases', newPhaseId, 'topics', newTopicId);
            await setDoc(newTopicRef, topicData);

            console.log(`   ✓ Copied topic ${oldTopicId} → ${newTopicId}`);
        }

        // Delete old phase topics
        for (const topicDoc of oldTopicsSnap.docs) {
            await deleteDoc(topicDoc.ref);
        }

        // Delete old phase
        const oldPhaseRef = doc(db, 'courses', courseId, 'phases', oldPhaseId);
        await deleteDoc(oldPhaseRef);

        console.log(`   ✅ Completed moving ${oldPhaseId} → ${newPhaseId}\n`);
    }

    console.log("✅ All phases renumbered successfully!");
    console.log("\n📊 Final structure:");
    console.log("Phase 6: Switch Case");
    console.log("Phase 7: Functions (NEW)");
    console.log("Phase 8: (was Phase 7)");
    console.log("Phase 9: (was Phase 8)");
    console.log("...");
    console.log("Phase 17: (was Phase 16)");
    console.log("\nTotal: 17 phases (3-19)");

    process.exit(0);
}

renumberPhases().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
