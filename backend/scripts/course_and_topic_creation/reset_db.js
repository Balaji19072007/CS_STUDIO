
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { db } = require('../config/firebase');
const { collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
const { getAuth, deleteUser } = require('firebase-admin/auth');
const admin = require('firebase-admin');

// Initialize Admin SDK for Auth Deletion if not already (assuming service account if available, 
// else we can only delete Firestore data. Client SDK cannot delete other users easily).
// Since we might not have admin SDK setup specifically for this env, we'll try Firestore only first, 
// or assume the user just means "database records".
// Actually, to delete "accounts" (Auth), we need Admin SDK. 
// If the user is using client-side auth, we can't delete accounts from a node script easily without Admin credentials.
// I'll assume clearing Firestore 'users' collection and 'progress' is what they mainly see.
// But they said "created two accounts", implying Firebase Auth.
// Without Admin SDK credentials provided in the environment (only API key is usually client), 
// I can only clean the Firestore Data.
// I will try to clean Firestore 'users', 'progress', 'leaderboard'.

async function resetDatabase() {
    try {
        console.log('Starting Database Reset (Firestore Data Only)...');

        const collectionsToClear = ['users', 'progress', 'leaderboard', 'notifications'];

        for (const colName of collectionsToClear) {
            console.log(`Clearing collection: ${colName}`);
            const colRef = collection(db, colName);
            const snapshot = await getDocs(colRef);

            if (snapshot.empty) {
                console.log(`  - ${colName} is already empty.`);
                continue;
            }

            console.log(`  - Found ${snapshot.size} documents in ${colName}. Deleting...`);
            const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, colName, d.id)));
            await Promise.all(deletePromises);
            console.log(`  - Cleared ${colName}.`);
        }

        console.log('Database Reset Complete. Please manually delete users from Firebase Auth Console if needed, as this script lacks Admin privileges.');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();
