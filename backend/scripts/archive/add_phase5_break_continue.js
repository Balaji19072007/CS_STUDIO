const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function addPhase5BreakContinue() {
    const courseId = 'c-programming';
    const phaseId = 'phase-5';

    const topic = {
        "5.7": {
            title: "Break and Continue",
            purpose: "Learn to control program flow by skipping or exiting loops and switch statements",
            definition: "Break exits a loop or switch statement immediately. Continue skips the rest of the current loop iteration and jumps to the next iteration. Both provide fine-grained control over program execution.",
            why: "Sometimes you need to exit early from a loop when a condition is met, or skip certain iterations. Break and continue make these patterns simple and clear.",
            keyConcepts: ["Break statement", "Continue statement", "Loop control", "Early exit", "Skip iteration"],
            syntax: `// Break - exit loop immediately
while (condition) {
    if (exitCondition) {
        break;  // Exit loop now
    }
}

// Continue - skip to next iteration
for (int i = 0; i < 10; i++) {
    if (skipCondition) {
        continue;  // Skip rest, go to next i
    }
}`,
            syntaxExplanation: [
                "`break`: Immediately exits the innermost loop or switch",
                "`continue`: Skips remaining code in current iteration, starts next iteration",
                "break is used to stop searching when item is found",
                "continue is used to skip specific cases while continuing loop"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. BREAK - Exit loop early
    printf("=== Break Example: Find Number ===\\n");
    int numbers[] = {5, 12, 8, 20, 15, 7};
    int target = 20;
    int found = 0;
    
    for (int i = 0; i < 6; i++) {
        printf("Checking: %d\\n", numbers[i]);
        if (numbers[i] == target) {
            printf("✓ Found %d at position %d!\\n", target, i);
            found = 1;
            break;  // Stop searching
        }
    }
    
    if (!found) {
        printf("Number not found\\n");
    }
    
    // 2. CONTINUE - Skip certain iterations
    printf("\\n=== Continue Example: Print Odd Numbers ===\\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue;  // Skip even numbers
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    // 3. CONTINUE - Skip specific values
    printf("\\n=== Skip Multiples of 3 ===\\n");
    for (int i = 1; i <= 15; i++) {
        if (i % 3 == 0) {
            continue;  // Skip 3, 6, 9, 12, 15
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    // 4. BREAK - Password attempts
    printf("\\n=== Password Attempts (Max 3) ===\\n");
    char correctPass[] = "secret";
    int attempts = 0;
    int maxAttempts = 3;
    
    while (attempts < maxAttempts) {
        char input[20];
        printf("Attempt %d - Enter password: ", attempts + 1);
        scanf("%s", input);
        
        if (strcmp(input, correctPass) == 0) {
            printf("✓ Access granted!\\n");
            break;  // Exit loop on success
        } else {
            printf("✗ Incorrect\\n");
            attempts++;
        }
    }
    
    if (attempts == maxAttempts) {
        printf("Account locked\\n");
    }
    
    // 5. Real-life: Process only valid data
    printf("\\n=== Process Positive Numbers Only ===\\n");
    int data[] = {5, -2, 8, -1, 12, 0, 7, -3};
    int sum = 0;
    
    for (int i = 0; i < 8; i++) {
        if (data[i] <= 0) {
            printf("Skipping: %d\\n", data[i]);
            continue;  // Skip non-positive
        }
        printf("Adding: %d\\n", data[i]);
        sum += data[i];
    }
    printf("Sum of positive numbers: %d\\n", sum);
    
    return 0;
}`,
            output: `=== Break Example: Find Number ===
Checking: 5
Checking: 12
Checking: 8
Checking: 20
✓ Found 20 at position 3!

=== Continue Example: Print Odd Numbers ===
1 3 5 7 9 

=== Skip Multiples of 3 ===
1 2 4 5 7 8 10 11 13 14 

=== Password Attempts (Max 3) ===
Attempt 1 - Enter password: wrong
✗ Incorrect
Attempt 2 - Enter password: secret
✓ Access granted!

=== Process Positive Numbers Only ===
Adding: 5
Skipping: -2
Adding: 8
Skipping: -1
Adding: 12
Skipping: 0
Adding: 7
Skipping: -3
Sum of positive numbers: 32`,
            practiceProblem: "Write a program: loop 1-20, use continue to skip multiples of 5, use break to stop if number > 15. Print all processed numbers",
            practiceProblemId: 5007,
            keyPoints: ["break exits loop immediately", "continue skips to next iteration", "Useful for search and filtering"],
            commonMistakes: ["Using outside loops (causes error)", "Forgetting break in switch cases", "Overusing when if-else would be clearer"],
            summary: ["break exits loop/switch immediately", "continue skips rest of current iteration", "Essential for controlling loop flow"],
            order: 7
        }
    };

    console.log("🚀 Adding break and continue topic to Phase 5...");

    const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', '5.7');
    await setDoc(topicRef, topic, { merge: true });
    console.log(`✅ 5.7: ${topic.title}`);

    console.log(`\n🎉 Phase 5 now complete with 7 topics!`);
    process.exit(0);
}

addPhase5BreakContinue().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
