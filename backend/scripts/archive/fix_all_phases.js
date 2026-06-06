const { db } = require('./config/firebase');
const { doc, getDoc, getDocs, collection, setDoc } = require('firebase/firestore');

async function fixAllPhases() {
    const courseId = 'c-programming';

    console.log("🔍 Checking ALL phases in database...\n");

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

    phases.sort((a, b) => a.num - b.num);

    console.log(`Found ${phases.length} phases:\n`);
    phases.forEach(phase => {
        console.log(`  ${phase.id}: ${phase.title}`);
    });

    // Now let's fix Phase 7 and Phase 8 titles
    console.log("\n🔧 Fixing Phase 7 and 8...\n");

    // Phase 7 should be Functions
    const phase7Ref = doc(db, 'courses', courseId, 'phases', 'phase-7');
    await setDoc(phase7Ref, {
        title: "Functions",
        description: "Learn to create reusable code with functions, recursion, and function pointers",
        order: 7
    }, { merge: true });
    console.log("✅ Phase 7 → Functions");

    // Phase 8 should be Arrays & Strings
    const phase8Ref = doc(db, 'courses', courseId, 'phases', 'phase-8');
    await setDoc(phase8Ref, {
        title: "Arrays & Strings",
        description: "Master arrays for storing multiple values and strings for text manipulation",
        order: 8
    }, { merge: true });
    console.log("✅ Phase 8 → Arrays & Strings");

    // Verify topics
    console.log("\n📚 Verifying topics...\n");

    const phase7TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-7', 'topics');
    const phase7TopicsSnap = await getDocs(phase7TopicsRef);
    console.log(`Phase 7 (Functions): ${phase7TopicsSnap.size} topics`);
    let phase7HasFunctions = false;
    phase7TopicsSnap.forEach(doc => {
        const title = doc.data().title || '';
        console.log(`  - ${doc.id}: ${title}`);
        if (title.toLowerCase().includes('function') || title.toLowerCase().includes('recursion')) {
            phase7HasFunctions = true;
        }
    });

    const phase8TopicsRef = collection(db, 'courses', courseId, 'phases', 'phase-8', 'topics');
    const phase8TopicsSnap = await getDocs(phase8TopicsRef);
    console.log(`\nPhase 8 (Arrays & Strings): ${phase8TopicsSnap.size} topics`);
    let phase8HasArrays = false;
    phase8TopicsSnap.forEach(doc => {
        const title = doc.data().title || '';
        console.log(`  - ${doc.id}: ${title}`);
        if (title.toLowerCase().includes('array') || title.toLowerCase().includes('string')) {
            phase8HasArrays = true;
        }
    });

    console.log("\n📊 Status:");
    console.log(`Total phases: ${phases.length}`);
    console.log(`Phase 7 has function topics: ${phase7HasFunctions ? 'YES ✅' : 'NO ❌ (needs fixing)'}`);
    console.log(`Phase 8 has array topics: ${phase8HasArrays ? 'YES ✅' : 'NO ❌ (needs fixing)'}`);

    process.exit(0);
}

fixAllPhases().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
