const { db } = require('./config/firebase');
const { collection, getDocs, doc, setDoc } = require('firebase/firestore');

// --- Helper: normalize text for matching ---
function normalize(text) {
    return text ? text.toLowerCase().replace(/[^a-z0-9 ]/g, "") : "";
}

// --- Helper: Simple scoring for matching ---
function calculateMatchScore(problemText, topicTitle, topicKeywords) {
    const pText = normalize(problemText);
    const tTitle = normalize(topicTitle);

    let score = 0;

    // Title Match
    if (pText.includes(tTitle)) score += 10;

    // Keyword tokens
    const tokens = tTitle.split(" ");
    for (const token of tokens) {
        if (token.length > 3 && pText.includes(token)) {
            score += 2;
        }
    }

    return score;
}

async function linkProblems() {
    try {
        console.log("🚀 Starting Problem-Topic Linking...");

        // 1. Fetch All Problems
        const problemsRef = collection(db, 'problems');
        const problemsSnap = await getDocs(problemsRef);
        console.log(`📦 Found ${problemsSnap.size} problems.`);

        if (problemsSnap.empty) {
            console.log("No problems found. Exiting.");
            process.exit(0);
        }

        // 2. Fetch All Courses & Topics into Memory (Cache)
        // Structure: Map<Language, Array<TopicObj>>
        const courseTopicsMap = {};

        const coursesRef = collection(db, 'courses');
        const coursesSnap = await getDocs(coursesRef);

        for (const courseDoc of coursesSnap.docs) {
            const courseData = courseDoc.data();
            const courseId = courseDoc.id;

            // Normalize language key: 'c', 'python', 'java'
            let langKey = "unknown";
            if (courseId.includes("c-programming")) langKey = "c";
            else if (courseId.includes("python")) langKey = "python";
            else if (courseId.includes("java")) langKey = "java";

            if (!courseTopicsMap[langKey]) courseTopicsMap[langKey] = [];

            const phasesRef = collection(db, 'courses', courseId, 'phases');
            const phasesSnap = await getDocs(phasesRef);

            for (const phaseDoc of phasesSnap.docs) {
                const phaseData = phaseDoc.data();
                const topicsRef = collection(db, 'courses', courseId, 'phases', phaseDoc.id, 'topics');
                const topicsSnap = await getDocs(topicsRef);

                for (const topicDoc of topicsSnap.docs) {
                    const topicData = topicDoc.data();
                    // Skip quizzes
                    if (topicData.type === 'quiz' || topicDoc.id.startsWith('quiz-')) continue;

                    courseTopicsMap[langKey].push({
                        courseId: courseId,
                        phaseNumber: phaseData.phaseNumber,
                        topicNumber: topicData.topicNumber || topicDoc.id, // Fallback
                        title: topicData.title,
                        id: topicDoc.id
                    });
                }
            }
        }
        console.log("📚 Course/Topic Map built.");

        let linkedCount = 0;

        // 3. Process Each Problem
        for (const problemDoc of problemsSnap.docs) {
            const problem = problemDoc.data();

            // Skip if already linked (unless we want to force update, request said "Skip problems that already have topicNumber", but also "Do NOT overwrite existing links")
            if (problem.topicNumber && problem.courseId) {
                // console.log(`   ⏭️ Problem ${problem.title} already linked.`);
                continue;
            }

            // Determine Problem Language
            // Problem might have 'language' field like 'c', 'python', 'java', 'javascript'
            // Or 'tags' array. Let's assume 'language' field or infer from title.
            // Adjust this based on your actual data schema.
            let probLang = "unknown";
            const pTitle = normalize(problem.title || "");
            const pLang = normalize(problem.language || "");

            if (pLang === 'c' || pTitle.includes(" c ")) probLang = "c";
            else if (pLang === 'python' || pTitle.includes("python")) probLang = "python";
            else if (pLang === 'java' || pTitle.includes("java")) probLang = "java";
            // Default heuristics if just "c" appears in title carefully
            else if (pTitle.startsWith("c ")) probLang = "c";

            if (probLang === "unknown") {
                console.log(`   ⚠️ Could not identify language for: ${problem.title}. Skipping.`);
                continue;
            }

            // Get relevant topics
            const candidateTopics = courseTopicsMap[probLang] || [];

            if (candidateTopics.length === 0) {
                console.log(`   ⚠️ No topics found for language: ${probLang}.`);
                continue;
            }

            // Find match
            let bestMatch = null;
            let maxScore = -1;

            const problemText = (problem.title || "") + " " + (problem.description || "");

            for (const topic of candidateTopics) {
                const score = calculateMatchScore(problemText, topic.title);
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = topic;
                }
            }

            // Fallback: If no good match (score == 0), assign to first topic of first phase (1.1) 
            // OR skip. User said: "Every unlinked problem is connected to exactly one topic".
            // So we MUST link it.
            if (!bestMatch || maxScore <= 0) {
                // Sort to find 1.1
                candidateTopics.sort((a, b) => {
                    if (a.phaseNumber !== b.phaseNumber) return a.phaseNumber - b.phaseNumber;
                    return a.topicNumber.localeCompare(b.topicNumber, undefined, { numeric: true });
                });
                bestMatch = candidateTopics[0];
                // console.log(`   🔸 Low match for ${problem.title}, assigning default: ${bestMatch.topicNumber}`);
            }

            // Update Problem
            if (bestMatch) {
                const problemRef = doc(db, 'problems', problemDoc.id);

                await setDoc(problemRef, {
                    courseId: bestMatch.courseId,
                    phaseNumber: bestMatch.phaseNumber,
                    topicNumber: bestMatch.topicNumber,
                    linkedTopicTitle: bestMatch.title // Optional: for debugging
                }, { merge: true });

                console.log(`   🔗 Linked "${problem.title}" -> [${probLang}] ${bestMatch.title} (${bestMatch.topicNumber})`);
                linkedCount++;
            }
        }

        console.log(`\n🎉 Linking Complete! Linked ${linkedCount} problems.`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error linking problems:", error);
        process.exit(1);
    }
}

linkProblems();
