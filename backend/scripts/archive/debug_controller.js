const problemController = require('./controllers/problemController');
const progressController = require('./controllers/progressController');
const { db } = require('./config/firebase');
const { collection, getDocs, limit, query } = require('firebase/firestore');

// Mock helpers
const mockRes = () => {
    const res = {};
    res.json = (data) => {
        console.log('✅ RESPONSE JSON:', JSON.stringify(data).substring(0, 200) + '...');
        return res;
    };
    res.status = (code) => {
        console.log('❌ STATUS:', code);
        return res;
    };
    res.send = (msg) => {
        console.log('❌ SEND:', msg);
        return res;
    };
    return res;
};

async function run() {
    try {
        console.log('Fetching a user ID...');
        const userQ = query(collection(db, 'users'), limit(1));
        const users = await getDocs(userQ);
        if (users.empty) {
            console.log('No users found, cannot test authenticated routes properly.');
            return;
        }
        const userId = users.docs[0].id;
        console.log('Using User ID:', userId);

        const req = {
            user: { id: userId },
            params: {}
        };

        console.log('\n--- Testing problemController.getProblems ---');
        await problemController.getProblems(req, mockRes());

        console.log('\n--- Testing progressController.getUserStats ---');
        await progressController.getUserStats(req, mockRes());

    } catch (err) {
        console.error('CRITICAL TEST ERROR:', err);
    }
}

run();
