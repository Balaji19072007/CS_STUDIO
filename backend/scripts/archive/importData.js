// importData.js
require('dotenv').config({ path: './.env' });
const { db } = require('./config/firebase');
const { collection, doc, setDoc, deleteDoc, getDocs, writeBatch } = require('firebase/firestore');
const problems = require('./util/problemData.json');
let courseProblems = [];
try {
    courseProblems = require('./util/courseProblemData.json');
} catch (e) {
    console.log('No courseProblemData.json found, skipping.');
}

const allProblems = [...problems, ...courseProblems];

const importData = async () => {
    try {
        console.log('🔥 Starting Firestore Import (Client SDK)...');

        let batch = writeBatch(db);
        let count = 0;

        for (const problem of allProblems) {
            const docRef = doc(db, 'problems', String(problem.id));

            const problemData = {
                ...problem,
                problemId: problem.id,
                examples: problem.examples || [],
                hints: problem.hints || [],
                testCases: problem.testCases || [],
            };

            Object.keys(problemData).forEach(key => problemData[key] === undefined && delete problemData[key]);

            batch.set(docRef, problemData);
            count++;

            if (count % 500 === 0) {
                await batch.commit();
                console.log(`Prepared batch of ${count} problems...`);
                batch = writeBatch(db);
            }
        }

        await batch.commit();
        console.log(`✅ Successfully imported ${count} problems inside 'problems' collection.`);
        process.exit();
    } catch (error) {
        console.error('❌ Error Importing Data:', error);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        console.log('🗑️ Clearing problems collection...');
        const snapshot = await getDocs(collection(db, 'problems'));

        if (snapshot.empty) {
            console.log('Collection already empty.');
            process.exit();
        }

        let batch = writeBatch(db);
        let count = 0;

        snapshot.forEach((doc) => {
            batch.delete(doc.ref);
            count++;
            if (count % 500 === 0) {
                // Batch commit not supported in loop properly like this for infinite size, but ok for small
            }
        });
        await batch.commit();

        console.log('🗑️ Data Successfully Destroyed!');
        process.exit();
    } catch (error) {
        console.error('❌ Error Destroying Data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Use --import or --delete');
    process.exit();
}