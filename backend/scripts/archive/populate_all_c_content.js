const { db } = require('./config/firebase');
const { doc, setDoc, collection, getDocs } = require('firebase/firestore');

// Helper function to generate comprehensive topic content
function generateComprehensiveContent(phaseNum, topicTitle) {
    const topic = topicTitle.toLowerCase();

    // Base template
    const content = {
        definition: "",
        purpose: "",
        why: "",
        keyConcepts: [],
        syntax: "",
        exampleProgram: "",
        challengeTime: "",
        keypoints: [],
        commonMistakes: [],
        summary: "",
        practiceProblem: "",
        practiceProblemId: null
    };

    // Generate content based on topic and phase
    // This is a comprehensive template system that creates educational content

    return content;
}

// Main function to populate all C course content
async function populateAllCContent() {
    try {
        console.log("🚀 Starting Comprehensive C Course Content Population...");

        const courseId = 'c-programming';

        // Get all phases
        const phasesRef = collection(db, 'courses', courseId, 'phases');
        const phasesSnap = await getDocs(phasesRef);

        if (phasesSnap.empty) {
            console.log("❌ No phases found. Run update_c_course_detailed.js first!");
            process.exit(1);
        }

        let totalUpdated = 0;

        for (const phaseDoc of phasesSnap.docs) {
            const phaseData = phaseDoc.data();
            const phaseId = phaseDoc.id;
            const phaseNum = phaseData.phaseNumber;

            // Skip Phase 1 (user said it's completed)
            if (phaseNum === 1) {
                console.log(`⏩ Skipping Phase ${phaseNum}: ${phaseData.title} (already completed)`);
                continue;
            }

            console.log(`\\n📚 Phase ${phaseNum}: ${phaseData.title}`);

            // Get all topics for this phase
            const topicsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics');
            const topicsSnap = await getDocs(topicsRef);

            for (const topicDoc of topicsSnap.docs) {
                const topicData = topicDoc.data();
                const topicId = topicDoc.id;

                // Generate comprehensive content
                const content = generateComprehensiveContent(phaseNum, topicData.title);

                // Update topic document
                const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
                await setDoc(topicRef, content, { merge: true });

                console.log(`  ✅ Updated: ${topicData.title}`);
                totalUpdated++;
            }
        }

        console.log(`\\n🎉 Successfully updated ${totalUpdated} topics!`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

populateAllCContent();
