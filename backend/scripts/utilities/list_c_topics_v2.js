const { db } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

const fs = require('fs');

async function listCTopics() {
    try {
        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);

        const courses = coursesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        let output = "";

        for (const course of courses) {
            output += "COURSE: " + course.title + " (" + course.id + ")\n";

            const phasesRef = collection(db, 'courses', course.id, 'phases');
            const phasesSnap = await getDocs(phasesRef);

            output += "  Phases Count: " + phasesSnap.size + "\n";

            phasesSnap.forEach(p => {
                output += "    PHASE: " + p.data().title + " (" + p.id + ")\n";
            });
            output += "------------------\n";
        }

        fs.writeFileSync('c_topics_output.txt', output);
        console.log("Written to c_topics_output.txt");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

listCTopics();
