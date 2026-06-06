const Discussion = require('./models/Discussion');
const Problem = require('./models/Problem');
require('dotenv').config();

const verifyModels = async () => {
    try {
        console.log('--- Testing Discussion ---');
        const discussions = await Discussion.find();
        console.log(`Discussions found: ${discussions.length}`);
        if (discussions.length > 0) {
            console.log('First discussion:', discussions[0]);
        }

        console.log('\n--- Testing Problem ---');
        const problems = await Problem.find();
        console.log(`Problems found: ${problems.length}`);
        if (problems.length > 0) { // Fix: check length, not just truthy
            console.log('First problem:', problems[0]);
        }

    } catch (err) {
        console.error('Model verification failed:', err);
    }
    process.exit(0);
};

verifyModels();
