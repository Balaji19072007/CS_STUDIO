const { db } = require('../config/firebase');
const { collection, getDocs, query, where } = require('firebase/firestore');

async function checkProblem() {
    console.log('Checking for Problem 1001...');
    try {
        const problemsRef = collection(db, 'problems');
        const q = query(problemsRef, where('problemId', '==', 1001));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('❌ Problem 1001 NOT FOUND in Firestore');
        } else {
            console.log(`✅ Found ${snapshot.size} document(s) for 1001`);
            snapshot.forEach(doc => {
                console.log('Data:', JSON.stringify(doc.data(), null, 2));
            });
        }
    } catch (e) {
        console.error('Error:', e);
    }
    process.exit(0);
}

checkProblem();
