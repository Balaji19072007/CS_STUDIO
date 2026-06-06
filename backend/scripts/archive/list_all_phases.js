const { db } = require('./config/firebase');
const { doc, getDocs, collection, setDoc } = require('firebase/firestore');

async function listAndCountPhases() {
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

    console.log(`\n📊 COMPLETE PHASE LIST (${phases.length} total):\n`);
    console.log("=".repeat(50));
    phases.forEach(phase => {
        console.log(`${phase.num}. ${phase.id.padEnd(12)} → ${phase.title}`);
    });
    console.log("=".repeat(50));

    // Check for gaps
    console.log("\n🔍 Checking for missing phase numbers...\n");
    const expectedPhases = Array.from({ length: 17 }, (_, i) => i + 3); // phases 3-19
    const actualPhaseNums = phases.map(p => p.num);
    const missing = expectedPhases.filter(num => !actualPhaseNums.includes(num));

    if (missing.length > 0) {
        console.log(`❌ Missing phases: ${missing.join(', ')}`);
        console.log(`   Need to create ${missing.length} more phase(s) to reach 17 total\n`);
    } else if (phases.length === 17) {
        console.log("✅ All 17 phases present!\n");
    } else {
        console.log(`⚠️  Have ${phases.length} phases, ${17 - phases.length} ${phases.length < 17 ? 'short' : 'extra'}\n`);
    }

    // Show Phase 7 and 8 specifically
    const p7 = phases.find(p => p.num === 7);
    const p8 = phases.find(p => p.num === 8);

    console.log("📌 KEY PHASES:");
    console.log(`   Phase 7: ${p7 ? p7.title : 'MISSING'}`);
    console.log(`   Phase 8: ${p8 ? p8.title : 'MISSING'}`);

    process.exit(0);
}

listAndCountPhases().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
