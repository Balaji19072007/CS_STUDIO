const { db } = require('../config/firebase');
const { collection, doc, setDoc, writeBatch } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedProblems = async () => {
    try {
        console.log('🔗 Connecting to Firestore...');

        // Read JSON file
        const problemDataPath = path.join(__dirname, '../util/problemData.json');
        const courseProblemDataPath = path.join(__dirname, '../util/courseProblemData.json');

        const problemData1 = JSON.parse(fs.readFileSync(problemDataPath, 'utf8'));
        let problemData2 = [];
        try {
            problemData2 = JSON.parse(fs.readFileSync(courseProblemDataPath, 'utf8'));
        } catch (e) {
            console.warn('Warning: could not read courseProblemData.json', e.message);
        }

        const problemData = [...problemData1, ...problemData2];

        console.log(`Found ${problemData.length} problems to seed.`);

        const batch = writeBatch(db);
        let count = 0;

        for (const p of problemData) {
            // Use problemId as document ID if unique, or let Firestore generate.
            // Problem model uses 'problemId' as a field.
            // Let's use 'problemId' value as the Doc ID for easier lookup relative to integer ID?
            // Or just a random ID. The Problem model query logic matches 'problemId' field.
            // Let's use auto-id but ensure data is correct.

            // Actually, for consistency, let's try to use the problem ID if it's a string, 
            // but it's an integer in JSON (1, 2, 3...). 
            // Firestore IDs must be strings.
            const docRef = doc(collection(db, 'problems')); // Auto ID

            const problemDoc = {
                ...p,
                problemId: p.id,
                // Ensure array fields are arrays
                examples: p.examples || [],
                hints: p.hints || [],
                testCases: p.testCases || [],
                solution: p.solution || {},
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Remove 'id' if we want to stick to 'problemId'
            delete problemDoc.id;

            batch.set(docRef, problemDoc);
            count++;
        }

        await batch.commit();
        console.log(`✅ Seeded ${count} problems successfully into Firestore.`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedProblems();
