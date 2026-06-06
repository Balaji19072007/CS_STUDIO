const mongoose = require('mongoose');
const { getDailyProblem } = require('./controllers/problemController');
const Problem = require('./models/Problem');
const Progress = require('./models/Progress');
const User = require('./models/User');

// Mock Express Request/Response
const req = {
    user: { id: '676d66e77607755b413158f9' } // Use a valid user ID (replace if known, or find one)
};

const res = {
    json: (data) => console.log('Response JSON:', JSON.stringify(data, null, 2)),
    status: (code) => ({
        send: (msg) => console.log(`Status ${code}: ${msg}`),
        json: (data) => console.log(`Status ${code} JSON:`, data)
    })
};

async function run() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cs_studio', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to DB');

        // Find a user to test with (or use the ID above if valid)
        const user = await User.findOne();
        if (user) {
            console.log('Testing with user:', user.username, user._id);
            req.user.id = user._id.toString();
        } else {
            console.log('No user found');
            return;
        }

        // 1. Fetch Daily Problem
        console.log('--- Fetching Daily Problem ---');
        await getDailyProblem(req, res);

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
