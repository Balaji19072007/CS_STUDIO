const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function populatePhases6to16() {
    const courseId = 'c-programming';

    // Phase 6: C Switch
    const phase6Topics = {
        "6.1": {
            title: "Switch Statement",
            purpose: "Simplify multi-way branching when checking a variable against multiple constant values",
            definition: "Switch statement compares a variable against multiple constant values (cases) and executes the matching case. Cleaner than long if-else-if chains for discrete value checking.",
            why: "When you need to check one variable against many possible values, switch is cleaner and more readable than multiple if-else statements.",
            keyConcepts: ["Switch expression", "Case labels", "Break statement", "Default case", "Constant expressions"],
            syntax: `switch (variable) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no match
}`,
            syntaxExplanation: [
                "`switch(variable)`: Variable to check (must be int or char)",
                "`case value:`: Each possible value (must be constant)",
                "`break`: Exit switch after case executes",
                "`default`: Executes if no case matches (optional)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int day = 3;
    
    printf("Day %d is: ", day);
    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }
    
    // Grade evaluation
    char grade = 'B';
    printf("\\nGrade %c: ", grade);
    
    switch (grade) {
        case 'A':
            printf("Excellent! 90-100%%\\n");
            break;
        case 'B':
            printf("Very Good! 80-89%%\\n");
            break;
        case 'C':
            printf("Good! 70-79%%\\n");
            break;
        case 'D':
            printf("Pass! 60-69%%\\n");
            break;
        case 'F':
            printf("Fail! Below 60%%\\n");
            break;
        default:
            printf("Invalid grade\\n");
    }
    
    return 0;
}`,
            output: `Day 3 is: Wednesday

Grade B: Very Good! 80-89%`,
            practiceProblem: "Write a program using switch to create a simple calculator: input two numbers and an operator (+, -, *, /), display result",
            practiceProblemId: 6001,
            keyPoints: ["Use for checking one variable against multiple constants", "Always use break to prevent fall-through", "default handles unmatched cases"],
            commonMistakes: ["Forgetting break (causes fall-through)", "Using variables in case (must be constants)", "Not including default case"],
            summary: ["Switch checks one variable against multiple constant values", "Cleaner than long if-else-if for discrete values", "Remember break after each case"],
            order: 1
        },
        "6.2": {
            title: "Break in Switch",
            purpose: "Prevent fall-through by exiting switch after matching case executes",
            definition: "Break statement in switch terminates the switch block and prevents execution from falling through to subsequent cases. Without break, all cases after the match will execute.",
            why: "Fall-through behavior (executing multiple cases) is rarely desired. Break ensures only the matched case executes.",
            keyConcepts: ["Fall-through behavior", "Break necessity", "Intentional fall-through", "Case grouping"],
            syntax: `switch (value) {
    case 1:
        printf("One");
        break;  // Exit switch
    case 2:
        printf("Two");
        break;  // Exit switch
}

// Without break (fall-through)
switch (value) {
    case 1:
        printf("One");
        // Falls through to case 2
    case 2:
        printf("Two");
}`,
            syntaxExplanation: [
                "`break`: Exits switch immediately after case executes",
                "Without break: execution continues to next case (fall-through)",
                "Fall-through can be intentional for grouping cases",
                "Last case doesn't need break (but good practice to include)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. With break (correct)
    int choice = 2;
    printf("=== With Break ===\\n");
    printf("Choice: %d\\n", choice);
    
    switch (choice) {
        case 1:
            printf("Option 1 selected\\n");
            break;
        case 2:
            printf("Option 2 selected\\n");
            break;
        case 3:
            printf("Option 3 selected\\n");
            break;
    }
    
    // 2. Without break (fall-through)
    printf("\\n=== Without Break (Fallthrough) ===\\n");
    printf("Choice: %d\\n", choice);
    
    switch (choice) {
        case 1:
            printf("Option 1 selected\\n");
            // No break! Falls through
        case 2:
            printf("Option 2 selected\\n");
            // No break! Falls through
        case 3:
            printf("Option 3 selected\\n");
    }
    
    // 3. Intentional fall-through (grouping cases)
    char grade = 'A';
    printf("\\n=== Grouped Cases ===\\n");
    printf("Grade: %c -> ", grade);
    
    switch (grade) {
        case 'A':
        case 'B':
            printf("Above average\\n");
            break;
        case 'C':
            printf("Average\\n");
            break;
        case 'D':
        case 'F':
            printf("Below average\\n");
            break;
    }
    
    return 0;
}`,
            output: `=== With Break ===
Choice: 2
Option 2 selected

=== Without Break (Fallthrough) ===
Choice: 2
Option 2 selected
Option 3 selected

=== Grouped Cases ===
Grade: A -> Above average`,
            practiceProblem: "Write a program: menu with options 1-4. Show what happens with and without break statements (demonstrate fall-through)",
            practiceProblemId: 6002,
            keyPoints: ["Always use break unless intentional fall-through", "Fall-through executes all subsequent cases", "Use fall-through to group related cases"],
            commonMistakes: ["Forgetting break (most common bug)", "Not understanding fall-through behavior", "Unnecessary break after default"],
            summary: ["Break prevents fall-through to next case", "Without break, all subsequent cases execute", "Use fall-through intentionally for grouping"],
            order: 2
        },
        "6.3": {
            title: "Default Case",
            purpose: "Handle all values not matched by specific cases",
            definition: "The default case executes when none of the specific case values match. It's like the else in if-else-if chains - a catch-all for everything not explicitly handled.",
            why: "Good programs handle unexpected input gracefully. Default ensures your switch doesn't silently fail when given unhandled values.",
            keyConcepts: ["Catch-all case", "Error handling", "Input validation", "Optional but recommended"],
            syntax: `switch (value) {
    case 1:
        // Handle 1
        break;
    case 2:
        // Handle 2
        break;
    default:
        // Handle everything else
}`,
            syntaxExplanation: [
                "`default:`: Executes if no case matches",
                "Can appear anywhere but conventionally at end",
                "Doesn't need break (but include for consistency)",
                "Optional but highly recommended"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. Menu with validation
    int option = 9;
    
    printf("=== Menu Selection ===\\n");
    printf("1. New Game\\n");
    printf("2. Load Game\\n");
    printf("3. Settings\\n");
    printf("4. Exit\\n");
    printf("\\nYour choice: %d\\n", option);
    
    switch (option) {
        case 1:
            printf("✓ Starting new game...\\n");
            break;
        case 2:
            printf("✓ Loading saved game...\\n");
            break;
        case 3:
            printf("✓ Opening settings...\\n");
            break;
        case 4:
            printf("✓ Exiting game...\\n");
            break;
        default:
            printf("✗ Invalid option! Please choose 1-4.\\n");
    }
    
    // 2. Month days
    int month = 2;
    int year = 2024;
    int days;
    
    printf("\\n=== Days in Month ===\\n");
    printf("Month: %d, Year: %d\\n", month, year);
    
    switch (month) {
        case 1: case 3: case 5: case 7:
        case 8: case 10: case 12:
            days = 31;
            break;
        case 4: case 6: case 9: case 11:
            days = 30;
            break;
        case 2:
            // Leap year check
            if (year % 4 == 0)
                days = 29;
            else
                days = 28;
            break;
        default:
            printf("Invalid month!\\n");
            days = 0;
    }
    
    if (days > 0) {
        printf("Days: %d\\n", days);
    }
    
    // 3. Character classification
    char ch = '@';
    printf("\\n=== Character Type ===\\n");
    printf("Character: %c\\n", ch);
    
    switch (ch) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            printf("Type: Vowel\\n");
            break;
        default:
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                printf("Type: Consonant\\n");
            } else {
                printf("Type: Not a letter\\n");
            }
    }
    
    return 0;
}`,
            output: `=== Menu Selection ===
1. New Game
2. Load Game
3. Settings
4. Exit

Your choice: 9
✗ Invalid option! Please choose 1-4.

=== Days in Month ===
Month: 2, Year: 2024
Days: 29

=== Character Type ===
Character: @
Type: Not a letter`,
            practiceProblem: "Write a program: traffic light colors (R/Y/G for Red/Yellow/Green) -> display action, use default for invalid input",
            practiceProblemId: 6003,
            keyPoints: ["Default handles all unmatched values", "Essential for input validation", "Can contain any code (including if statements)"],
            commonMistakes: ["Omitting default (silent failures)", "Not validating input", "Putting default in middle (confusing)"],
            summary: ["Default case handles all unmatched values", "Acts like else in if-else chains", "Always include for robust error handling"],
            order: 3
        },
        "6.4": {
            title: "Real-Life Switch Examples",
            purpose: "Apply switch statements to practical real-world scenarios",
            definition: "Real-world switch examples demonstrate practical applications like menu systems, command processing, state machines, and user input handling.",
            why: "Understanding practical applications shows how switch makes real programs cleaner and more maintainable.",
            keyConcepts: ["Menu systems", "Command processing", "State handling", "Input validation"],
            syntax: `// Menu system pattern
switch (userChoice) {
    case 1:
        performAction1();
        break;
    case 2:
        performAction2();
        break;
    default:
        showError();
}`,
            syntaxExplanation: [
                "Use switch for discrete user choices",
                "Each case represents a distinct action",
                "Default provides error feedback",
                "Clean alternative to long if-else chains"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. Calculator
    printf("=== Simple Calculator ===\\n");
    float num1 = 10.0, num2 = 3.0;
    char operator = '/';
    float result;
    
    printf("%.2f %c %.2f = ", num1, operator, num2);
    
    switch (operator) {
        case '+':
            result = num1 + num2;
            printf("%.2f\\n", result);
            break;
        case '-':
            result = num1 - num2;
            printf("%.2f\\n", result);
            break;
        case '*':
            result = num1 * num2;
            printf("%.2f\\n", result);
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
                printf("%.2f\\n", result);
            } else {
                printf("Error: Division by zero\\n");
            }
            break;
        default:
            printf("Error: Invalid operator\\n");
    }
    
    // 2. Vending Machine
    printf("\\n=== Vending Machine ===\\n");
    int itemCode = 102;
    
    printf("Item Code: %d\\n", itemCode);
    
    switch (itemCode) {
        case 101:
            printf("Dispensing: Chips ($1.50)\\n");
            printf("Enjoy your snack!\\n");
            break;
        case 102:            printf("Dispensing: Soda ($1.00)\\n");
            printf("Cold and refreshing!\\n");
            break;
        case 103:
            printf("Dispensing: Chocolate ($2.00)\\n");
            printf("Sweet treat!\\n");
            break;
        case 104:
            printf("Dispensing: Water ($0.50)\\n");
            printf("Stay hydrated!\\n");
            break;
        default:
            printf("Error: Invalid item code\\n");
            printf("Please select code 101-104\\n");
    }
    
    // 3. ATM Menu
    printf("\\n=== ATM System ===\\n");
    int choice = 3;
    float balance = 1000.0;
    
    printf("Balance: $%.2f\\n", balance);
    printf("Choice: %d - ", choice);
    
    switch (choice) {
        case 1:
            printf("Check Balance\\n");
            printf("Your balance is: $%.2f\\n", balance);
            break;
        case 2:
            printf("Withdraw Cash\\n");
            printf("Amount: $%.2f\\n", 200.0);
            printf("New balance: $%.2f\\n", balance - 200.0);
            break;
        case 3:
            printf("Deposit Cash\\n");
            printf("Amount: $%.2f\\n", 500.0);
            printf("New balance: $%.2f\\n", balance + 500.0);
            break;
        case 4:
            printf("Transfer Funds\\n");
            printf("Transfer feature...\\n");
            break;
        case 5:
            printf("Exit\\n");
            printf("Thank you!\\n");
            break;
        default:
            printf("Invalid option\\n");
            printf("Please choose 1-5\\n");
    }
    
    return 0;
}`,
            output: `=== Simple Calculator ===
10.00 / 3.00 = 3.33

=== Vending Machine ===
Item Code: 102
Dispensing: Soda ($1.00)
Cold and refreshing!

=== ATM System ===
Balance: $1000.00
Choice: 3 - Deposit Cash
Amount: $500.00
New balance: $1500.00`,
            practiceProblem: "Write a program: restaurant menu with 5 items (codes 1-5), show item name and price, calculate total with tax using switch",
            practiceProblemId: 6004,
            keyPoints: ["Switch ideal for menus and command systems", "Each case is a distinct user action", "Always validate with default"],
            commonMistakes: ["Not handling invalid input", "Missing break statements", "When if-else would be simpler"],
            summary: ["Switch perfect for menus, calculators, and command systems", "Clean, readable code for discrete choices", "Real applications use switch extensively"],
            order: 4
        }
    };

    console.log("🚀 Populating Phase 6: C Switch...");
    const phaseId = 'phase-6';

    for (const [topicId, content] of Object.entries(phase6Topics)) {
        const topicRef = doc(db, courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
    }

    console.log(`\n🎉 Phase 6 complete with ${Object.keys(phase6Topics).length} topics!`);
    console.log("📚 Progress: 4/16 phases done\n");

    process.exit(0);
}

populatePhases6to16().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
