const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection } = require('firebase/firestore');

async function checkMissingPhase() {
    const courseId = 'c-programming';

    console.log("🔍 Checking all phases in database...\n");

    const phasesRef = collection(db, 'courses', courseId, 'phases');
    const phasesSnap = await getDocs(phasesRef);

    const phases = [];
    phasesSnap.forEach(doc => {
        const phaseNum = parseInt(doc.id.split('-')[1]);
        phases.push({
            id: doc.id,
            num: phaseNum,
            title: doc.data().title,
            description: doc.data().description
        });
    });

    // Sort by phase number
    phases.sort((a, b) => a.num - b.num);

    console.log("Current phases in Firebase:\n");
    phases.forEach(phase => {
        console.log(`${phase.id}: ${phase.title}`);
    });

    // Check for Arrays & Strings
    console.log("\n🔍 Looking for 'Arrays & Strings' phase...\n");
    const arraysPhase = phases.find(p =>
        p.title && (
            p.title.toLowerCase().includes('array') ||
            p.title.toLowerCase().includes('string')
        )
    );

    if (arraysPhase) {
        console.log(`✅ Found: ${arraysPhase.id} - ${arraysPhase.title}`);

        // Check its topics
        const topicsRef = collection(db, 'courses', courseId, 'phases', arraysPhase.id, 'topics');
        const topicsSnap = await getDocs(topicsRef);
        console.log(`   Has ${topicsSnap.size} topics`);
    } else {
        console.log("❌ Arrays & Strings phase NOT FOUND!");
        console.log("\nThis phase was likely lost during renumbering.");
        console.log("Need to restore it as Phase 8.");
    }

    process.exit(0);
}

checkMissingPhase().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
