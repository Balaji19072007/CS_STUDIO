const Problem = require('./models/Problem');
const { db } = require('./config/firebase');

async function verify() {
    try {
        console.log('🔍 Verifying Problems Collection...');
        const problems = await Problem.find();
        console.log(`✅ Found ${problems.length} problems.`);

        if (problems.length > 0) {
            console.log('--- Sample Problem ---');
            console.log(problems[0]);
        } else {
            console.error('❌ No problems found! Data import might have failed.');
        }

        const count = problems.length; // Problem.countDocuments() not implemented in static, using find().length is fine for now
        console.log(`Count check: ${count}`);

    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

verify();
