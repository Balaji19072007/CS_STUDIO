const { db } = require('./config/firebase');
const { collection, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

const COURSE_LEVELS = {
    'C Programming': 'Beginner',
    'Python Programming': 'Beginner',
    'Java Programming': 'Intermediate',
    'C++ Programming': 'Advanced',
    'C# Programming': 'Intermediate',
    'Full Stack Web Development': 'Intermediate',
    'Mobile App Development': 'Intermediate',
    'Data Science': 'Intermediate',
    'AI & Machine Learning': 'Advanced',
    'DevOps': 'Advanced',
    'Cyber Security': 'Advanced'
};

async function updateCourseLevels() {
    console.log('🔄 Starting course level updates...\n');

    const coursesRef = collection(db, 'courses');
    let updated = 0;
    let notFound = 0;

    for (const [courseTitle, level] of Object.entries(COURSE_LEVELS)) {
        try {
            // Find course by title
            const q = query(coursesRef, where("title", "==", courseTitle));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log(`  ⚠️  Course not found: "${courseTitle}"`);
                notFound++;
                continue;
            }

            // Update the first matching document
            const courseDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, 'courses', courseDoc.id), { level });

            console.log(`  ✅ Updated "${courseTitle}" → ${level}`);
            updated++;

        } catch (error) {
            console.error(`  ❌ Error updating "${courseTitle}":`, error.message);
        }
    }

    console.log('\n----------------------------------------');
    console.log('Update Complete!');
    console.log(`Updated: ${updated}`);
    console.log(`Not Found: ${notFound}`);
    console.log('----------------------------------------');

    process.exit(0);
}

updateCourseLevels();
