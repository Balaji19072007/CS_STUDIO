const { db } = require('./config/firebase');
const { collection, getDocs, doc, setDoc } = require('firebase/firestore');

function generateDiagram(topicTitle, courseTitle) {
    const title = topicTitle.toLowerCase();
    const course = courseTitle.toLowerCase();

    if (title.includes('variable') || title.includes('data type')) {
        return `
Variables Store Data
====================

    +----------------+
    | Variable Name  |
    +----------------+
    | Type: int      |
    | Value: 42      |
    +----------------+
         |
         v
    Memory Location
`;
    }

    if (title.includes('array') || title.includes('list')) {
        return `
Array Structure
===============

Index:  0    1    2    3    4
       +----+----+----+----+----+
Array: | 10 | 20 | 30 | 40 | 50 |
       +----+----+----+----+----+
         ^
         |
    First Element
`;
    }

    if (title.includes('loop') || title.includes('iteration')) {
        return `
Loop Flow
=========

    START
      |
      v
  +-------+
  | Check |---No--> EXIT
  +-------+
      |
     Yes
      |
      v
  +---------+
  | Execute |
  | Code    |
  +---------+
      |
      +---> (back to Check)
`;
    }

    if (title.includes('function') || title.includes('method')) {
        return `
Function Concept
================

    Input Parameters
         |
         v
    +-----------+
    | Function  |
    | Process   |
    +-----------+
         |
         v
    Return Value
`;
    }

    if (title.includes('if') || title.includes('condition')) {
        return `
Conditional Flow
================

       Condition?
          /  \\
        Yes   No
         |     |
         v     v
      Code A  Code B
`;
    }

    if (title.includes('pointer') || title.includes('reference')) {
        return `
Pointer Concept
===============

  Variable     Memory
  +------+     +-----+
  | ptr  |---> | 100 |
  +------+     +-----+
    Addr        Value
`;
    }

    if (title.includes('stack') || title.title === 'stack') {
        return `
Stack Structure (LIFO)
======================

    Push -->  +-----+
              | Top |
              +-----+
              |  B  |
              +-----+
              |  A  |
              +-----+
    <-- Pop
`;
    }

    if (title.includes('queue')) {
        return `
Queue Structure (FIFO)
======================

Enqueue -->  +---+---+---+---+
             | A | B | C | D |
             +---+---+---+---+
                           --> Dequeue
`;
    }

    if (title.includes('tree') || title.includes('binary')) {
        return `
Binary Tree
===========

        Root
         |
      +--+--+
      |     |
     Left  Right
      |     |
    +--+  +--+
    |  |  |  |
`;
    }

    if (title.includes('linked list')) {
        return `
Linked List
===========

+-----+    +-----+    +-----+
| 10  |--->| 20  |--->| 30  |---> NULL
+-----+    +-----+    +-----+
 Head       Node       Tail
`;
    }

    if (title.includes('sort') || title.includes('search')) {
        return `
Algorithm Flow
==============

    Input Array
        |
        v
    +---------+
    | Process |
    +---------+
        |
        v
    Sorted Array
`;
    }

    if (title.includes('class') || title.includes('object')) {
        return `
Class and Object
================

    Class (Blueprint)
    +---------------+
    | Properties    |
    | Methods       |
    +---------------+
          |
          v
    Object (Instance)
    +---------------+
    | name: "John"  |
    | age: 25       |
    +---------------+
`;
    }

    return `
${topicTitle}
${'='.repeat(topicTitle.length)}

    Concept Overview
    +--------------+
    |   ${topicTitle.substring(0, 10)}   |
    +--------------+
         |
         v
    Implementation
`;
}

async function generateTopicDiagrams() {
    try {
        console.log("🚀 Starting Diagram Generation...");

        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);

        let updatedCount = 0;

        for (const courseDoc of coursesSnap.docs) {
            const courseId = courseDoc.id;
            const courseData = courseDoc.data();
            const courseTitle = courseData.title || courseId;

            console.log(`📚 Processing course: ${courseTitle}`);

            const phasesRef = collection(db, 'courses', courseId, 'phases');
            const phasesSnap = await getDocs(phasesRef);

            for (const phaseDoc of phasesSnap.docs) {
                const phaseId = phaseDoc.id;

                const topicsRef = collection(db, 'courses', courseId, 'phases', phaseId, 'topics');
                const topicsSnap = await getDocs(topicsRef);

                for (const topicDoc of topicsSnap.docs) {
                    const topicId = topicDoc.id;

                    if (topicId.startsWith('quiz-')) continue;

                    const topicData = topicDoc.data();

                    if (topicData.diagram) continue;

                    const topicTitle = topicData.title || topicId;

                    const diagram = generateDiagram(topicTitle, courseTitle);

                    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);

                    await setDoc(topicRef, {
                        diagram: diagram
                    }, { merge: true });

                    console.log(`    ✅ Diagram added for: ${topicTitle}`);
                    updatedCount++;
                }
            }
        }

        console.log(`\n🎉 Diagram Generation Complete! Updated ${updatedCount} topics`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error generating diagrams:", error);
        process.exit(1);
    }
}

generateTopicDiagrams();
