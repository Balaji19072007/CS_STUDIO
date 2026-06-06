const { db } = require('./config/firebase');
const { doc, getDocs, collection, setDoc, updateDoc } = require('firebase/firestore');

async function verifyPhaseUpdate() {
    const courseId = 'c-programming';

    console.log("🔍 Verifying Phase 6 and 7...\n");

    // Get Phase 6
    const phase6Ref = doc(db, 'courses', courseId, 'phases', 'phase-6');
    const phase6Doc = await getDoc(phase6Ref);

    if (phase6Doc.exists()) {
        console.log(`Phase 6: ${phase6Doc.data().title || 'NO TITLE'}`);
    } else {
        console.log("Phase 6: NOT FOUND");
    }

    // Get Phase 7
    const phase7Ref = doc(db, 'courses', courseId, 'phases', 'phase-7');
    const phase7Doc = await getDoc(phase7Ref);

    if (phase7Doc.exists()) {
        console.log(`Phase 7: ${phase7Doc.data().title || 'NO TITLE'}`);

        // Count topics
        const topicsRef = collection(db, 'courses', courseId, 'phases', 'phase-7', 'topics');
        const topicsSnap = await getDocs(topicsRef);
        console.log(`Phase 7 has ${topicsSnap.size} topics`);
    } else {
        console.log("Phase 7: NOT FOUND");
    }

    console.log("\n✅ Verification complete");
    process.exit(0);
}

const { getDoc } = require('firebase/firestore');

verifyPhaseUpdate().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
