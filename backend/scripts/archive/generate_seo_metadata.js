const { db } = require('./config/firebase');
const { collection, getDocs, doc, setDoc } = require('firebase/firestore');

async function generateSEOMetadata() {
    try {
        console.log("🚀 Starting SEO Metadata Generation...");

        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);

        let updatedCount = 0;

        for (const courseDoc of coursesSnap.docs) {
            const courseId = courseDoc.id;
            const courseData = courseDoc.data();
            const courseTitle = courseData.title || courseId;

            console.log(`📚 Processing course: ${courseTitle}`);

            const phasesRef = collection(db, 'courses', courseId, 'phases');
            const phasesSnap = await getDocs(phasesRef);

            for (const phaseDoc of phasesSnap.docs) {
                const phaseId = phaseDoc.id;

                const topicsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics');
                const topicsSnap = await getDocs(topicsRef);

                for (const topicDoc of topicsSnap.docs) {
                    const topicId = topicDoc.id;

                    if (topicId.startsWith('quiz-')) continue;

                    const topicData = topicDoc.data();

                    if (topicData.seoTitle) continue;

                    const topicTitle = topicData.title || topicId;

                    const seoTitle = `${topicTitle} - ${courseTitle} Tutorial | CS Studio`;

                    const seoDescription = `Learn ${topicTitle.toLowerCase()} in ${courseTitle}. Beginner-friendly tutorial with examples, explanations, and practice problems. Master programming concepts step-by-step.`;

                    const keywords = [
                        topicTitle.toLowerCase(),
                        courseTitle.toLowerCase(),
                        'tutorial',
                        'beginner',
                        'programming',
                        'learn',
                        'code',
                        'practice'
                    ].slice(0, 8);

                    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);

                    await setDoc(topicRef, {
                        seoTitle: seoTitle.substring(0, 60),
                        seoDescription: seoDescription.substring(0, 160),
                        seoKeywords: keywords
                    }, { merge: true });

                    console.log(`    ✅ SEO added for: ${topicTitle}`);
                    updatedCount++;
                }
            }
        }

        console.log(`\n🎉 SEO Generation Complete! Updated ${updatedCount} topics`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error generating SEO metadata:", error);
        process.exit(1);
    }
}

generateSEOMetadata();
