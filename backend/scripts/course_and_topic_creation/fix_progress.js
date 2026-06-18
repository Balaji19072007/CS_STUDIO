
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Progress = require('../models/Progress');
const User = require('../models/User');

async function fixProgressConfirm() {
    try {
        console.log('Starting Progress Fix...');

        // 1. Fetch all progress
        console.log('Fetching all progress records...');
        const allProgress = await Progress.find({});
        console.log(`Found ${allProgress.length} progress records.`);

        let updatedCount = 0;
        const userIdsToUpdate = new Set();

        for (const p of allProgress) {
            let needsUpdate = false;

            // Fix 1: Status 'solved' if accuracy 100
            if (p.bestAccuracy === 100 && p.status !== 'solved') {
                console.log(`Fixing status for Progress ${p.id} (User: ${p.userId}, Problem: ${p.problemId}) - Accuracy 100 but status ${p.status}`);
                p.status = 'solved';
                needsUpdate = true;
            }

            // Fix 2: Invalid Date
            const dateObj = new Date(p.lastSubmission);
            if (isNaN(dateObj.getTime())) {
                console.log(`Fixing Invalid Date for Progress ${p.id} (User: ${p.userId}, Problem: ${p.problemId}) - Date: ${p.lastSubmission}`);
                p.lastSubmission = new Date().toISOString(); // Default to now
                needsUpdate = true;
            }

            if (needsUpdate) {
                await p.save();
                updatedCount++;
                userIdsToUpdate.add(p.userId);
            } else {
                // Determine if we should update user stats anyway (in case count is wrong)
                // We'll update all unique users found just to be safe
                userIdsToUpdate.add(p.userId);
            }
        }

        console.log(`Updated ${updatedCount} progress records.`);

        // 2. Recalculate User Stats
        console.log(`Recalculating stats for ${userIdsToUpdate.size} users...`);
        for (const userId of userIdsToUpdate) {
            // We can pass dummy values since updateUserStats recalculates from DB
            // But updateUserStats expects (userId, accuracy, isSolved) to potentially update average accuracy logic incrementally?
            // Wait, looking at updateUserStats in Progress.js:
            // It recalculates average accuracy from ALL solved docs.
            // So arguments accuracy/isSolved are only used for... wait lines 66-69 use reduced sum.
            // Actually it just grabs all solved docs and recalculates. The args are unused for calculation!
            // Wait, line 66: if (isSolved && solvedDocs.length > 0)
            // It seems it re-calculates based on stored data.
            // Let's call it with isSolved=true to trigger the recalc logic if that's what triggers it.
            // Actually, looking at code:
            /*
            const solvedDocs = await this.find({ userId, status: 'solved' });
            user.problemsSolved = solvedDocs.length;
            if (isSolved && solvedDocs.length > 0) { ... }
            */
            // If I pass isSolved=true, it recalculates average. If false, it might skip average update?
            // The condition `if (isSolved && ...)` is odd. It should probably always recalculate based on fetch.
            // To be safe, I'll pass true.

            console.log(`Updating stats for user: ${userId}`);
            await Progress.updateUserStats(userId, 0, true);
        }

        console.log('Fix Complete.');
        process.exit(0);

    } catch (error) {
        console.error('Error during fix:', error);
        process.exit(1);
    }
}

fixProgressConfirm();
