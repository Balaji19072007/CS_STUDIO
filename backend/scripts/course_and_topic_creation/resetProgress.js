const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

// Initialize Firebase Admin (Using existing config approach or default if local)
// We assume GOOGLE_APPLICATION_CREDENTIALS is set or we use serviceAccount
// Since server.js initializes it, we can try to reuse or just init here.
// For a standalone script, safest is to re-init.

if (!admin.apps.length) {
    try {
        // Try standard init (works if GOOGLE_APPLICATION_CREDENTIALS is set)
        admin.initializeApp();
    } catch (e) {
        // Backup: Use service account from file if available in dev
        const serviceAccount = require('./serviceAccountKey.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
}

const db = getFirestore();

async function resetAllProgress() {
    console.log("🚀 Starting Global Progress Reset...");

    try {
        const progressCollection = db.collection('progress');
        const snapshot = await progressCollection.get();

        if (snapshot.empty) {
            console.log("✅ No progress documents found.");
            return;
        }

        console.log(`Found ${snapshot.size} progress documents. Resetting...`);

        const batchSize = 500;
        let batch = db.batch();
        let count = 0;
        let batchCount = 0;

        for (const doc of snapshot.docs) {
            // Option 1: Delete the document (Resetting to 'todo' effectively means no record)
            batch.delete(doc.ref);

            // Option 2: Update status to 'todo' (Keeps record but valid as 'todo')
            // batch.update(doc.ref, { 
            //     status: 'todo', 
            //     bestAccuracy: 0, 
            //     lastSubmission: null,
            //     'timer.isRunning': false
            // });

            count++;

            if (count % batchSize === 0) {
                await batch.commit();
                batchCount++;
                console.log(`Commit batch ${batchCount} (${count} docs processed)`);
                batch = db.batch();
            }
        }

        if (count % batchSize !== 0) {
            await batch.commit();
            console.log(`Commit final batch (${count} docs total)`);
        }

        console.log("✅ All progress documents deleted. Users are now at 'todo' state.");

        // OPTIONAL: Reset User Stats (Total Points, Problems Solved)
        console.log("🔄 Resetting User Stats...");
        const usersCollection = db.collection('users');
        const userSnapshot = await usersCollection.get();

        let userBatch = db.batch();
        let userCount = 0;

        for (const doc of userSnapshot.docs) {
            userBatch.update(doc.ref, {
                problemsSolved: 0,
                totalPoints: 0,
                averageAccuracy: 0
            });
            userCount++;

            if (userCount % batchSize === 0) {
                await userBatch.commit();
                userBatch = db.batch();
            }
        }

        if (userCount % batchSize !== 0) {
            await userBatch.commit();
        }

        console.log(`✅ Reset stats for ${userCount} users.`);

    } catch (error) {
        console.error("❌ Error resetting progress:", error);
    }
}

resetAllProgress().then(() => {
    console.log("Process Complete.");
    process.exit(0);
});
