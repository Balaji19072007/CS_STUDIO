const { db } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

async function listCTopics() {
    try {
        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);

        // Find C Language course (title "C Language")
        const cCourse = coursesSnap.docs.find(d => d.data().title === "C Language");
        if (!cCourse) {
            console.log("C Language course not found");
            return;
        }

        console.log(`Course: ${cCourse.data().title} (${cCourse.id})`);

        const phasesRef = collection(db, 'courses', cCourse.id, 'phases');
        const phasesSnap = await getDocs(phasesRef);

        // Sort phases? Assuming default order or rely on ID/title
        const phases = phasesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        for (const phase of phases) {
            console.log(`  Phase: ${phase.title} (ID: ${phase.id})`);
            const topicsRef = collection(db, 'courses', cCourse.id, 'phases', phase.id, 'topics');
            const topicsSnap = await getDocs(topicsRef);

            topicsSnap.forEach(t => {
                console.log(`    Topic: ${t.data().title} (ID: ${t.id})`);
            });
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

listCTopics();
