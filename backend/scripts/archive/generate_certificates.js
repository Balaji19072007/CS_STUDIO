const { db } = require('./config/firebase');
const { collection, getDocs, doc, setDoc, getDoc, Timestamp } = require('firebase/firestore');
const { getUserSubscription, PLANS, FEATURES } = require('./controllers/subscriptionController');

// --- Helper to verify course completion ---
async function analyzeCourseStructure(courseId) {
    let totalTopics = 0;
    let totalQuizzes = 0;
    let title = "";

    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
        title = courseSnap.data().title;
        // Iterate phases to count
        const phasesRef = collection(db, 'courses', courseId, 'phases');
        const phasesSnap = await getDocs(phasesRef);

        for (const phaseDoc of phasesSnap.docs) {
            const topicsRef = collection(db, 'courses', courseId, 'phases', phaseDoc.id, 'topics');
            const topicsSnap = await getDocs(topicsRef);

            // Count quizzes vs topics
            topicsSnap.forEach(t => {
                if (t.id.startsWith("quiz-")) totalQuizzes++;
                else totalTopics++;
            });
        }
    }
    return { title, totalTopics, totalQuizzes };
}

async function generateCertificates() {
    try {
        console.log("🚀 Starting Certificate Generation...");

        // 1. Get All Courses Structure (to validate true completion)
        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);
        const courseMap = {};

        for (const cDoc of coursesSnap.docs) {
            const struct = await analyzeCourseStructure(cDoc.id);
            courseMap[cDoc.id] = struct;
            console.log(`📚 Analyzed ${struct.title}: ${struct.totalTopics} Topics, ${struct.totalQuizzes} Quizzes`);
        }

        // 2. Scan Progress Collection
        const progressRef = collection(db, 'progress');
        const progressSnap = await getDocs(progressRef);

        console.log(`🔍 Scanning ${progressSnap.size} progress records...`);

        let issuedCount = 0;

        for (const progDoc of progressSnap.docs) {
            const data = progDoc.data();
            const progressId = progDoc.id; // Format: userId_courseId

            // Extract IDs
            const parts = progressId.split("_");
            if (parts.length < 2) continue;

            // Logic to handle potential composite keys if userId contains underscores?
            // Assuming standard userId (no underscores) or specific format.
            // Safe bet: last part is courseId (usually fixed), rest is userId. 
            // BUT simpler: courseIds are likely known (c-programming, python-mastery, java-enterprise).
            // Let's rely on standard split for now or data fields if they exist.

            const courseId = parts[parts.length - 1];
            const userId = parts.slice(0, parts.length - 1).join("_");

            if (!courseMap[courseId]) continue; // Unknown course

            const { title, totalTopics, totalQuizzes } = courseMap[courseId];

            // 3. Check Eligibility
            const topicsDone = data.completedTopics?.length || 0;
            const quizzesDone = data.completedQuizzes?.length || 0;
            const percentage = data.progressPercent || 0;

            const isComplete = (topicsDone >= totalTopics && quizzesDone >= totalQuizzes) || percentage === 100;

            if (isComplete) {
                // 4. Check Subscription (PRO or ENTERPRISE only)
                const subscription = await getUserSubscription(userId);

                if (subscription.plan === PLANS.FREE) {
                    console.log(`    ⚠️ User ${userId} is on FREE plan. Certificates require PRO or ENTERPRISE. Skipping.`);
                    continue;
                }

                // 5. Get User Details
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    console.log(`   ⚠️ User ${userId} not found. Skipping.`);
                    continue;
                }

                const userData = userSnap.data();
                const userName = userData.displayName || userData.name || "Valued User";

                // 5. Generate Certificate
                const now = new Date();
                const yyyymmdd = now.toISOString().split('T')[0].replace(/-/g, '');
                const certId = `CERT-${courseId}-${userId}-${yyyymmdd}`;

                const certRef = doc(db, 'certificates', certId);

                // Idempotency: Check if already issued? setDoc merge=true handles updates, 
                // but we might want to preserve original issue date if it exists.
                // For now, simpler to just overwrite or merge.

                const certData = {
                    userId: userId,
                    courseId: courseId,
                    courseTitle: title,
                    userName: userName,
                    issuedAt: Timestamp.now(),
                    certificateId: certId,
                    verificationUrl: `https://cs-studio.app/verify/${certId}`,
                    status: "issued"
                };

                // Use simple set (merge)
                await setDoc(certRef, certData, { merge: true });

                console.log(`    🏆 Issued Certificate to ${userName} for ${title}`);
                issuedCount++;
            }
        }

        console.log(`\n🎉 Certificate Generation Complete! Issued: ${issuedCount}`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error generating certificates:", error);
        process.exit(1);
    }
}

generateCertificates();
