const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function addPhase6FunctionsRecursion() {
    const courseId = 'c-programming';
    const phaseId = 'phase-6';

    const topics = {
        "6.8": {
            title: "Switch with Functions",
            purpose: "Organize switch cases by calling functions for cleaner, more maintainable code",
            definition: "Using functions with switch statements separates decision logic from action logic. Each case calls a function, making code modular, testable, and easier to maintain.",
            why: "Large switch statements with lots of code in each case become messy. Functions keep switch clean and make each action reusable.",
            keyConcepts: ["Function calls in cases", "Code organization", "Modularity", "Separation of concerns"],
            syntax: `// Functions for each action
void action1() {
    // Action 1 code
}

void action2() {
    // Action 2 code
}

// Clean switch
switch (choice) {
    case 1:
        action1();
        break;
    case 2:
        action2();
        break;
}`,
            syntaxExplanation: [
                "Define functions for each major action",
                "Switch cases simply call the appropriate function",
                "Keeps switch statement short and readable",
                "Functions can be reused elsewhere in program"
            ],
            exampleCode: `#include <stdio.h>

// Function declarations
void newGame() {
    printf("\\n=== Starting New Game ===\\n");
    printf("Loading world...\\n");
    printf("Creating character...\\n");
    printf("Game started!\\n");
}

void loadGame() {
    printf("\\n=== Loading Saved Game ===\\n");
    printf("Found save file: game_save_01.dat\\n");
    printf("Loading progress...\\n");
    printf("Welcome back!\\n");
}

void showSettings() {
    printf("\\n=== Settings ===\\n");
    printf("1. Graphics: High\\n");
    printf("2. Sound: On\\n");
    printf("3. Difficulty: Medium\\n");
}

void showCredits() {
    printf("\\n=== Credits ===\\n");
    printf("Developer: Game Studios\\n");
    printf("Music: Composer Name\\n");
    printf("Art: Artist Team\\n");
}

void exitGame() {
    printf("\\n=== Exiting Game ===\\n");
    printf("Saving progress...\\n");
    printf("Thank you for playing!\\n");
}

// Calculator functions
float add(float a, float b) {
    return a + b;
}

float subtract(float a, float b) {
    return a - b;
}

float multiply(float a, float b) {
    return a * b;
}

float divide(float a, float b) {
    if (b != 0) {
        return a / b;
    } else {
        printf("Error: Division by zero\\n");
        return 0;
    }
}

int main() {
    // 1. Game Menu using functions
    int menuChoice = 2;
    
    printf("=== Game Menu ===\\n");
    printf("1. New Game\\n");
    printf("2. Load Game\\n");
    printf("3. Settings\\n");
    printf("4. Credits\\n");
    printf("5. Exit\\n");
    printf("\\nChoice: %d\\n", menuChoice);
    
    switch (menuChoice) {
        case 1:
            newGame();
            break;
        case 2:
            loadGame();
            break;
        case 3:
            showSettings();
            break;
        case 4:
            showCredits();
            break;
        case 5:
            exitGame();
            break;
        default:
            printf("Invalid choice\\n");
    }
    
    // 2. Calculator using functions
    float num1 = 15.0, num2 = 4.0;
    char operator = '/';
    float result;
    
    printf("\\n=== Calculator ===\\n");
    printf("%.1f %c %.1f = ", num1, operator, num2);
    
    switch (operator) {
        case '+':
            result = add(num1, num2);
            printf("%.1f\\n", result);
            break;
        case '-':
            result = subtract(num1, num2);
            printf("%.1f\\n", result);
            break;
        case '*':
            result = multiply(num1, num2);
            printf("%.1f\\n", result);
            break;
        case '/':
            result = divide(num1, num2);
            if (num2 != 0) {
                printf("%.2f\\n", result);
            }
            break;
        default:
            printf("Invalid operator\\n");
    }
    
    return 0;
}`,
            output: `=== Game Menu ===
1. New Game
2. Load Game
3. Settings
4. Credits
5. Exit

Choice: 2

=== Loading Saved Game ===
Found save file: game_save_01.dat
Loading progress...
Welcome back!

=== Calculator ===
15.0 / 4.0 = 3.75`,
            practiceProblem: "Write a program: banking menu (1=Deposit, 2=Withdraw, 3=Check Balance, 4=Transfer). Create separate functions for each operation",
            practiceProblemId: 6008,
            keyPoints: ["Call functions from switch cases", "Keeps switch clean and readable", "Makes code modular and reusable"],
            commonMistakes: ["Putting too much code directly in cases", "Not using functions when cases are complex", "Forgetting to declare functions before main"],
            summary: ["Use functions to handle complex case logic", "Switch becomes clean decision point", "Each function is reusable and testable"],
            order: 8
        },
        "6.9": {
            title: "Switch with Recursion",
            purpose: "Use switch with recursive functions for menu systems and state machines",
            definition: "Recursion with switch creates repeating menu systems where the function calls itself based on user choice. Perfect for interactive programs that loop until user exits.",
            why: "Many programs need continuous interaction - ATMs, games, interactive menus. Recursion with switch creates elegant loops that continue until the user chooses to exit.",
            keyConcepts: ["Recursive menu", "Base case for exit", "State machines", "Self-calling functions"],
            syntax: `void menu() {
    int choice;
    printf("Menu: ");
    scanf("%d", &choice);
    
    switch (choice) {
        case 1:
            // Action 1
            menu();  // Recursive call
            break;
        case 0:
            // Exit (base case)
            break;
    }
}`,
            syntaxExplanation: [
                "Function calls itself to repeat menu",
                "Base case (usually 'exit' option) stops recursion",
                "Switch handles different menu choices",
                "Creates interactive loop without explicit while"
            ],
            exampleCode: `#include <stdio.h>

// Simple recursive menu
void displayMenu() {
    int choice;
    
    printf("\\n=== Simple Calculator Menu ===\\n");
    printf("1. Add\\n");
    printf("2. Subtract\\n");
    printf("3. Multiply\\n");
    printf("4. Divide\\n");
    printf("0. Exit\\n");
    printf("Choice: ");
    scanf("%d", &choice);
    
    float a, b, result;
    
    switch (choice) {
        case 1:
            printf("Enter two numbers: ");
            scanf("%f %f", &a, &b);
            result = a + b;
            printf("Result: %.2f + %.2f = %.2f\\n", a, b, result);
            displayMenu();  // Show menu again
            break;
            
        case 2:
            printf("Enter two numbers: ");
            scanf("%f %f", &a, &b);
            result = a - b;
            printf("Result: %.2f - %.2f = %.2f\\n", a, b, result);
            displayMenu();  // Show menu again
            break;
            
        case 3:
            printf("Enter two numbers: ");
            scanf("%f %f", &a, &b);
            result = a * b;
            printf("Result: %.2f * %.2f = %.2f\\n", a, b, result);
            displayMenu();  // Show menu again
            break;
            
        case 4:
            printf("Enter two numbers: ");
            scanf("%f %f", &a, &b);
            if (b != 0) {
                result = a / b;
                printf("Result: %.2f / %.2f = %.2f\\n", a, b, result);
            } else {
                printf("Error: Division by zero\\n");
            }
            displayMenu();  // Show menu again
            break;
            
        case 0:
            printf("\\nThank you! Goodbye.\\n");
            // Base case - don't call menu again
            break;
            
        default:
            printf("Invalid choice! Try again.\\n");
            displayMenu();  // Show menu again
    }
}

// State machine example
void processState(int state) {
    printf("\\nCurrent State: %d\\n", state);
    
    switch (state) {
        case 1:
            printf("State 1: Initialization\\n");
            printf("Moving to State 2...\\n");
            processState(2);
            break;
            
        case 2:
            printf("State 2: Processing\\n");
            printf("Moving to State 3...\\n");
            processState(3);
            break;
            
        case 3:
            printf("State 3: Validation\\n");
            printf("Moving to State 4...\\n");
            processState(4);
            break;
            
        case 4:
            printf("State 4: Completion\\n");
            printf("Process finished!\\n");
            // Base case - stop
            break;
            
        default:
            printf("Invalid state!\\n");
    }
}

int main() {
    // Example 1: Interactive menu (commented out to avoid input)
    // printf("Starting calculator...\\n");
    // displayMenu();
    
    // Example 2: State machine
    printf("=== State Machine Demo ===\\n");
    printf("Starting process...\\n");
    processState(1);
    
    // Simulate what the menu would show
    printf("\\n=== Menu System (Simulation) ===\\n");
    printf("This would run interactively:\\n");
    printf("- User selects operation\\n");
    printf("- Performs calculation\\n");
    printf("- Shows menu again\\n");
    printf("- Continues until user selects Exit (0)\\n");
    
    return 0;
}`,
            output: `=== State Machine Demo ===
Starting process...

Current State: 1
State 1: Initialization
Moving to State 2...

Current State: 2
State 2: Processing
Moving to State 3...

Current State: 3
State 3: Validation
Moving to State 4...

Current State: 4
State 4: Completion
Process finished!

=== Menu System (Simulation) ===
This would run interactively:
- User selects operation
- Performs calculation
- Shows menu again
- Continues until user selects Exit (0)`,
            practiceProblem: "Write a program: recursive menu for number operations (1=Square, 2=Cube, 3=Factorial, 0=Exit). Menu repeats until user exits",
            practiceProblemId: 6009,
            keyPoints: ["Recursion creates menu loop", "Base case (exit) stops recursion", "Perfect for interactive programs"],
            commonMistakes: ["No base case (infinite loop)", "Stack overflow from too many recursive calls", "Not clearing input buffer"],
            summary: ["Switch with recursion creates interactive menus", "Function calls itself to repeat menu", "Base case (exit option) stops recursion"],
            order: 9
        }
    };

    console.log("🚀 Adding Functions and Recursion topics to Phase 6...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully added ${count} topics to Phase 6!`);
    console.log(`📚 Phase 6 now complete with 9 topics total`);
    process.exit(0);
}

addPhase6FunctionsRecursion().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
