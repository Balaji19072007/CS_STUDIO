const { db } = require('./config/firebase');
const { doc, getDoc } = require('firebase/firestore');

async function comparePhases() {
    const courseId = 'c-programming';

    // Get Phase 1 topic
    const phase1Ref = doc(db, 'courses', courseId, 'phases', 'phase-1', 'topics', '1.1');
    const phase1Snap = await getDoc(phase1Ref);

    // Get Phase 2 topic
    const phase2Ref = doc(db, 'courses', courseId, 'phases', 'phase-2', 'topics', '2.1');
    const phase2Snap = await getDoc(phase2Ref);

    if (phase1Snap.exists() && phase2Snap.exists()) {
        const p1 = phase1Snap.data();
        const p2 = phase2Snap.data();

        console.log("=== PHASE 1 (Working) ===");
        console.log("exampleCode exists:", !!p1.exampleCode);
        console.log("exampleCode type:", typeof p1.exampleCode);
        console.log("Sample (first 150 chars):");
        console.log(p1.exampleCode.substring(0, 150));

        console.log("\n=== PHASE 2 (Error) ===");
        console.log("exampleCode exists:", !!p2.exampleCode);
        console.log("exampleCode type:", typeof p2.exampleCode);
        console.log("Sample (first 150 chars):");
        console.log(p2.exampleCode.substring(0, 150));

        console.log("\n=== COMPARISON ===");
        console.log("Phase 1 length:", p1.exampleCode.length);
        console.log("Phase 2 length:", p2.exampleCode.length);
        console.log("Are they different?:", p1.exampleCode !== p2.exampleCode);
    }

    process.exit(0);
}

comparePhases().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
