const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection, setDoc } = require('firebase/firestore');

async function checkAndFixPhaseStructure() {
    const courseId = 'c-programming';

    console.log("🔍 Checking current phase structure...\n");

    // Check all phases
    const phasesRef = collection(db, 'courses', courseId, 'phases');
    const phasesSnap = await getDocs(phasesRef);

    console.log(`Found ${phasesSnap.size} phases\n`);

    const phases = [];
    phasesSnap.forEach(doc => {
        phases.push({ id: doc.id, ...doc.data() });
    });

    // Sort by ID
    phases.sort((a, b) => {
        const numA = parseInt(a.id.split('-')[1]);
        const numB = parseInt(b.id.split('-')[1]);
        return numA - numB;
    });

    phases.forEach(phase => {
        console.log(`${phase.id}: ${phase.title || 'NO TITLE'}`);
    });

    console.log("\n📝 Fixing Phase 6 and 7...\n");

    // Update Phase 6 title
    const phase6Ref = doc(db, 'courses', courseId, 'phases', 'phase-6');
    await setDoc(phase6Ref, {
        title: "Switch Case",
        description: "Master switch statements for multi-way branching and menu systems",
        order: 6
    }, { merge: true });
    console.log("✅ Phase 6 renamed to: Switch Case");

    // Ensure Phase 7 exists with correct title
    const phase7Ref = doc(db, 'courses', courseId, 'phases', 'phase-7');
    await setDoc(phase7Ref, {
        title: "Functions",
        description: "Learn to create reusable code with functions, recursion, and function pointers",
        order: 7
    }, { merge: true });
    console.log("✅ Phase 7 set to: Functions");

    // Check topics in both phases
    console.log("\n📚 Checking topics...\n");

    const phase6TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-6', 'topics');
    const phase6TopicsSnap = await getDocs(phase6TopicsRef);
    console.log(`Phase 6 (Switch Case) has ${phase6TopicsSnap.size} topics`);

    const phase7TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-7', 'topics');
    const phase7TopicsSnap = await getDocs(phase7TopicsRef);
    console.log(`Phase 7 (Functions) has ${phase7TopicsSnap.size} topics`);

    console.log("\n✅ Phase structure fixed!");
    console.log("📊 Total phases: Should now show 17 phases (3-19)");

    process.exit(0);
}

checkAndFixPhaseStructure().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
