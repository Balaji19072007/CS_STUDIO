const { db } = require('./config/firebase');
const { getDocs, collection } = require('firebase/firestore');

async function finalVerification() {
    const courseId = 'c-programming';

    const phasesRef = collection(db, 'courses', courseId, 'phases');
    const phasesSnap = await getDocs(phasesRef);

    const phases = [];
    phasesSnap.forEach(doc => {
        const phaseNum = parseInt(doc.id.split('-')[1]);
        phases.push({
            id: doc.id,
            num: phaseNum,
            title: doc.data().title
        });
    });

    phases.sort((a, b) => a.num - b.num);

    console.log("\n" + "=".repeat(60));
    console.log("  FINAL C PROGRAMMING COURSE STRUCTURE");
    console.log("=".repeat(60) + "\n");

    console.log(`Total Phases: ${phases.length}\n`);

    phases.forEach((phase, index) => {
        console.log(`${String(index + 1).padStart(2)}. Phase ${phase.num}: ${phase.title}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ VERIFICATION COMPLETE");
    console.log("=".repeat(60));

    // Count topics
    let totalTopics = 0;
    for (const phase of phases) {
        const topicsRef = collection(db, 'courses', courseId, 'phases', phase.id, 'topics');
        const topicsSnap = await getDocs(topicsRef);
        totalTopics += topicsSnap.size;
    }

    console.log(`\n📊 Statistics:`);
    console.log(`   Total Phases: ${phases.length}`);
    console.log(`   Total Topics: ${totalTopics}`);
    console.log(`   Average Topics per Phase: ${(totalTopics / phases.length).toFixed(1)}`);

    process.exit(0);
}

finalVerification().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
