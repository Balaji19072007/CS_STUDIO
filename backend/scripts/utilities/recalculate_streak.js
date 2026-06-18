const { db } = require('../config/firebase');
const Progress = require('../models/Progress');

/**
 * Script to recalculate streak for a specific user
 * This will trigger the new streak calculation logic
 */
async function recalculateStreak() {
    try {
        // Replace with your actual user ID
        const userId = 'RxXsWoDkNyMRnK0pTLWN';

        console.log(`🔄 Recalculating streak for user: ${userId}`);

        // Call updateUserStats which now includes streak calculation
        await Progress.updateUserStats(userId, 100, true);

        console.log('✅ Streak recalculation complete!');
        console.log('📊 Check your dashboard to see the updated streak');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error recalculating streak:', error);
        process.exit(1);
    }
}

recalculateStreak();
