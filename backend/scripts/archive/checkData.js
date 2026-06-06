const { db } = require('./config/firebase');
const { collection, getDocs } = require('firebase/firestore');

async function check() {
    try {
        console.log('Checking problems...');
        const problemsRef = collection(db, 'problems');
        const snapshot = await getDocs(problemsRef);
        console.log(`Found ${snapshot.size} problems.`);
        if (!snapshot.empty) {
            console.log('First problem:', snapshot.docs[0].data().title);
        }

        console.log('Checking discussions...');
        // Discussions might not be migrated yet or used, but let's check
        // const discRef = collection(db, 'discussions');
        // const discSnapshot = await getDocs(discRef);
        // console.log(`Found ${discSnapshot.size} discussions.`);

        console.log('Checking users...');
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        console.log(`Found ${usersSnapshot.size} users.`);

        if (!usersSnapshot.empty) {
            console.log('First user:', usersSnapshot.docs[0].data().email);
        }

        console.log('Checking progress...');
        const progressRef = collection(db, 'progress');
        const progressSnapshot = await getDocs(progressRef);
        console.log(`Found ${progressSnapshot.size} progress records.`);

    } catch (err) {
        console.error('Error:', err);
    }
}

check();

