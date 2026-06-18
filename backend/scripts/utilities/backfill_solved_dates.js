const { db } = require('../config/firebase');
const { collection, getDocs, updateDoc, doc, query, where } = require('firebase/firestore');

/**
 * Migration script to backfill solvedAt dates for existing solved problems
 * Sets solvedAt = lastSubmission for all solved problems that don't have solvedAt
 */
async function backfillSolvedDates() {
    try {
        console.log('🔄 Starting migration: Backfill solvedAt dates...');

        const progressRef = collection(db, 'progress');
        const solvedQuery = query(progressRef, where('status', '==', 'solved'));
        const snapshot = await getDocs(solvedQuery);

        console.log(`📊 Found ${snapshot.size} solved problems`);

        let updated = 0;
        let skipped = 0;

        for (const docSnapshot of snapshot.docs) {
            const data = docSnapshot.data();

            // Only update if solvedAt is missing
            if (!data.solvedAt && data.lastSubmission) {
                await updateDoc(doc(db, 'progress', docSnapshot.id), {
                    solvedAt: data.lastSubmission
                });
                updated++;
                console.log(`✅ Updated problem ${data.problemId} for user ${data.userId}`);
            } else if (data.solvedAt) {
                skipped++;
            } else {
                console.log(`⚠️ Problem ${data.problemId} has no lastSubmission date, skipping`);
                skipped++;
            }
        }

        console.log('\n📈 Migration Summary:');
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   📊 Total: ${snapshot.size}`);
        console.log('\n✨ Migration complete!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
backfillSolvedDates();
