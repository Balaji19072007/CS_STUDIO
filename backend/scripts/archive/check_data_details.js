const { db } = require('./config/firebase');
const { collection, getDocs, limit, query } = require('firebase/firestore');

async function checkDetails() {
    try {
        console.log('--- PROBLEMS ---');
        const probQ = query(collection(db, 'problems'), limit(1));
        const probs = await getDocs(probQ);
        if (!probs.empty) {
            const data = probs.docs[0].data();
            console.log('Problem Keys:', Object.keys(data));
            console.log('problemId:', data.problemId, 'typeof:', typeof data.problemId);
        } else {
            console.log('No problems.');
        }

        console.log('--- PROGRESS ---');
        const progQ = query(collection(db, 'progress'), limit(1));
        const progs = await getDocs(progQ);
        if (!progs.empty) {
            const data = progs.docs[0].data();
            console.log('Progress Keys:', Object.keys(data));
            console.log('userId:', data.userId, 'problemId:', data.problemId);
        } else {
            console.log('No progress.');
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

checkDetails();
