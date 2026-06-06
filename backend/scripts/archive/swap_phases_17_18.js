const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection, setDoc, deleteDoc } = require('firebase/firestore');

async function swapPhases17And18() {
    const courseId = 'c-programming';

    console.log("🔄 Swapping Phase 17 and Phase 18...\n");

    // Get Phase 17 data
    const phase17Ref = doc(db, 'courses', courseId, 'phases', 'phase-17');
    const phase17Doc = await getDoc(phase17Ref);
    const phase17Data = phase17Doc.data();

    console.log(`Phase 17: ${phase17Data.title}`);

    // Get Phase 18 data
    const phase18Ref = doc(db, 'courses', courseId, 'phases', 'phase-18');
    const phase18Doc = await getDoc(phase18Ref);
    const phase18Data = phase18Doc.data();

    console.log(`Phase 18: ${phase18Data.title}\n`);

    // Get all topics from Phase 17
    const phase17TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-17', 'topics');
    const phase17TopicsSnap = await getDocs(phase17TopicsRef);

    console.log(`Phase 17 has ${phase17TopicsSnap.size} topics`);

    const phase17Topics = [];
    phase17TopicsSnap.forEach(doc => {
        phase17Topics.push({ id: doc.id, data: doc.data() });
    });

    // Get all topics from Phase 18
    const phase18TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-18', 'topics');
    const phase18TopicsSnap = await getDocs(phase18TopicsRef);

    console.log(`Phase 18 has ${phase18TopicsSnap.size} topics\n`);

    const phase18Topics = [];
    phase18TopicsSnap.forEach(doc => {
        phase18Topics.push({ id: doc.id, data: doc.data() });
    });

    // Delete all old topics
    console.log("🗑️  Deleting old topics...");
    for (const topic of phase17Topics) {
        await deleteDoc(doc(db, 'courses', courseId, 'phases', 'phase-17', 'topics', topic.id));
    }
    for (const topic of phase18Topics) {
        await deleteDoc(doc(db, 'courses', courseId, 'phases', 'phase-18', 'topics', topic.id));
    }

    // Swap phase metadata
    console.log("\n🔄 Swapping phase metadata...");
    await setDoc(phase17Ref, {
        ...phase18Data,
        order: 17
    });
    console.log(`✅ Phase 17 now: ${phase18Data.title}`);

    await setDoc(phase18Ref, {
        ...phase17Data,
        order: 18
    });
    console.log(`✅ Phase 18 now: ${phase17Data.title}`);

    // Add Phase 18 topics to Phase 17 (with updated IDs)
    console.log("\n📝 Moving topics...");
    for (const topic of phase18Topics) {
        // Change topic ID from 18.x to 17.x
        const oldId = topic.id;
        const newId = oldId.replace('18.', '17.');

        const newTopicRef = doc(db, 'courses', courseId, 'phases', 'phase-17', 'topics', newId);
        await setDoc(newTopicRef, topic.data);
        console.log(`   Moved ${oldId} → ${newId}`);
    }

    // Add Phase 17 topics to Phase 18 (with updated IDs)
    for (const topic of phase17Topics) {
        // Change topic ID from 17.x to 18.x
        const oldId = topic.id;
        const newId = oldId.replace('17.', '18.');

        const newTopicRef = doc(db, 'courses', courseId, 'phases', 'phase-18', 'topics', newId);
        await setDoc(newTopicRef, topic.data);
        console.log(`   Moved ${oldId} → ${newId}`);
    }

    console.log("\n🎉 Swap complete!");
    console.log(`Phase 17: ${phase18Data.title}`);
    console.log(`Phase 18: ${phase17Data.title}`);

    process.exit(0);
}

swapPhases17And18().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
