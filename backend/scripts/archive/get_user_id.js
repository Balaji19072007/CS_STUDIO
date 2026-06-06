const { db } = require('./config/firebase');
const { collection, getDocs, limit, query } = require('firebase/firestore');

async function getUserId() {
    try {
        const userQ = query(collection(db, 'users'), limit(1));
        const users = await getDocs(userQ);
        if (!users.empty) {
            console.log('VALID_USER_ID:', users.docs[0].id);
        } else {
            console.log('No users found');
        }
    } catch (err) {
        console.error(err);
    }
}

getUserId();
