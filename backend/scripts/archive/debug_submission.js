const mongoose = require('mongoose');
require('dotenv').config();
const { db } = require('./config/firebase');
const Progress = require('./models/Progress');
const User = require('./models/User');

const run = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Test User Fetch
        console.log('Fetching a user from Firestore...');
        // We'll just fetch *any* user to test with
        const topUsers = await User.getTopUsers(1);
        if (topUsers.length === 0) {
            console.log('No users found in Firestore. Cannot test.');
            process.exit(0);
        }
        const user = topUsers[0];
        console.log(`✅ Found user: ${user.username} (${user.id})`);

        // Test Progress Fetch/Create
        console.log('Testing getUserProgress...');
        const problemId = 999; // Mock problem ID
        const progress = await Progress.getUserProgress(user.id, problemId);
        console.log('✅ Progress retrieved:', progress ? 'Yes' : 'No');

        progress.lastSubmission = new Date();
        console.log('Testing progress.save()...');
        await progress.save();
        console.log('✅ Progress saved successfully');

        // Test Progress Update
        console.log('Testing updateUserStats...');
        // Simulate a solve with 100% accuracy
        const updatedUser = await Progress.updateUserStats(user.id, 100, true);

        console.log('✅ updateUserStats result:', updatedUser ? 'Success' : 'Failed (returned null)');
        if (updatedUser) {
            console.log('Updated Stats:', {
                problemsSolved: updatedUser.problemsSolved,
                totalPoints: updatedUser.totalPoints,
                averageAccuracy: updatedUser.averageAccuracy
            });
        }

    } catch (err) {
        console.error('💥 Error in debug script:', err);
        console.error(err.stack);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

run();
