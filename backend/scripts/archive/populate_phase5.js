const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function populatePhase5() {
    const courseId = 'c-programming';
    const phaseId = 'phase-5';

    const topics = {
        "5.1": {
            title: "If Statement",
            purpose: "Make decisions in programs by executing code only when conditions are true",
            definition: "The if statement checks a condition and executes a block of code only if that condition is true (non-zero). It's the foundation of decision-making in programming.",
            why: "Programs need to respond differently to different situations. If statements enable your code to make intelligent decisions based on data.",
            keyConcepts: ["Conditional execution", "Boolean expressions", "Code blocks", "Control flow"],
            syntax: `if (condition) {
    // Code executes only if condition is true
}

// Example
if (age >= 18) {
    printf("You can vote");
}`,
            syntaxExplanation: [
                "`if (condition)`: Tests if condition is true (non-zero)",
                "Code in `{ }` runs only if condition is true",
                "If condition is false (0), code block is skipped",
                "Can have single statement without braces (not recommended)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    int score = 85;
    int temperature = 30;
    
    // Simple if statement
    printf("Age: %d\\n", age);
    if (age >= 18) {
        printf("You are an adult!\\n");
    }
    
    // Multiple if statements
    printf("\\nScore: %d\\n", score);
    if (score >= 90) {
        printf("Excellent!\\n");
    }
    if (score >= 50) {
        printf("You passed!\\n");
    }
    
    // Practical: Temperature warning
    printf("\\nTemperature: %d°C\\n", temperature);
    if (temperature > 35) {
        printf("⚠️ Heat warning!\\n");
    }
    if (temperature < 0) {
        printf("❄️ Freezing!\\n");
    }
    
    // With multiple conditions
    int hasTicket = 1;
    int hasID = 1;
    
    if (age >= 18 && hasTicket && hasID) {
        printf("\\n✓ Entry allowed\\n");
    }
    
    return 0;
}`,
            output: `Age: 20
You are an adult!

Score: 85
You passed!

Temperature: 30°C

✓ Entry allowed`,
            practiceProblem: "Write a program to check: if number is positive, if it's greater than 100, and if it's even (using if statements separately)",
            practiceProblemId: 5001,
            keyPoints: ["Executes code only when condition is true", "Condition can be any expression that evaluates to 0 (false) or non-zero (true)", "Use braces for clarity"],
            commonMistakes: ["Using = instead of == for comparison", "Forgetting braces for multi-line blocks", "Not understanding true/false as 1/0"],
            summary: ["if statement executes code when condition is true", "Foundation of all decision-making in programs", "Condition is any expression evaluated as true/false"],
            order: 1
        },
        "5.2": {
            title: "Else Statement",
            purpose: "Execute alternative code when if condition is false",
            definition: "The else statement provides an alternative path of execution when the if condition is false. It creates a binary choice: do this OR do that.",
            why: "Most decisions have two outcomes. Else ensures your program handles both the true and false cases explicitly.",
            keyConcepts: ["Binary choice", "Alternative execution", "if-else pair", "Mutual exclusivity"],
            syntax: `if (condition) {
    // Executes if condition is true
} else {
    // Executes if condition is false
}

// Example
if (age >= 18) {
    printf("Adult");
} else {
    printf("Minor");
}`,
            syntaxExplanation: [
                "`else` must follow an if statement",
                "Exactly one block executes: either if OR else",
                "No condition on else (it catches everything not caught by if)",
                "Creates clear two-way branching"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 15;
    int score = 45;
    int number = 7;
    
    // Basic if-else
    printf("Age: %d\\n", age);
    if (age >= 18) {
        printf("Status: Adult\\n");
    } else {
        printf("Status: Minor\\n");
    }
    
    // Pass/Fail
    printf("\\nScore: %d\\n", score);
    if (score >= 50) {
        printf("Result: PASS ✓\\n");
    } else {
        printf("Result: FAIL ✗\\n");
    }
    
    // Even/Odd
    printf("\\nNumber: %d\\n", number);
    if (number % 2 == 0) {
        printf("Type: Even\\n");
    } else {
        printf("Type: Odd\\n");
    }
    
    // Practical: Login validation
    char password[] = "secret";
    char input[] = "wrong";
    
    printf("\\nAttempting login...\\n");
    if (strcmp(password, input) == 0) {
        printf("✓ Login successful!\\n");
        printf("Welcome back!\\n");
    } else {
        printf("✗ Login failed\\n");
        printf("Incorrect password\\n");
    }
    
    return 0;
}`,
            output: `Age: 15
Status: Minor

Score: 45
Result: FAIL ✗

Number: 7
Type: Odd

Attempting login...
✗ Login failed
Incorrect password`,
            practiceProblem: "Write a program to check if a number is positive or negative (handle 0 as neither), and check if temperature is hot (>30) or cold",
            practiceProblemId: 5002,
            keyPoints: ["Else handles the false case", "Only one block executes (if OR else)", "No condition needed on else"],
            commonMistakes: ["Using else without preceding if", "Putting condition on else", "Thinking both blocks can execute"],
            summary: ["else provides alternative when if is false", "Creates binary decision: this OR that", "Exactly one block executes"],
            order: 2
        },
        "5.3": {
            title: "Else If",
            purpose: "Handle multiple distinct conditions with priority order",
            definition: "Else-if chains let you test multiple conditions in sequence. The first true condition executes, and the rest are skipped. Used for mutually exclusive choices.",
            why: "Real-world decisions often have more than two outcomes. Else-if handles multiple possibilities cleanly and efficiently.",
            keyConcepts: ["Multiple conditions", "Priority order", "First match wins", "Mutual exclusivity"],
            syntax: `if (condition1) {
    // If condition1 is true
} else if (condition2) {
    // If condition1 false, condition2 true
} else if (condition3) {
    // If previous false, condition3 true
} else {
    // If all conditions false
}`,
            syntaxExplanation: [
                "Tests conditions in order from top to bottom",
                "First true condition executes, rest are skipped",
                "Optional final `else` catches all remaining cases",
                "More efficient than separate if statements"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int score = 85;
    int age = 25;
    int temperature = 22;
    
    // Grade system
    printf("Score: %d\\n", score);
    if (score >= 90) {
        printf("Grade: A (Excellent)\\n");
    } else if (score >= 80) {
        printf("Grade: B (Very Good)\\n");
    } else if (score >= 70) {
        printf("Grade: C (Good)\\n");
    } else if (score >= 60) {
        printf("Grade: D (Pass)\\n");
    } else {
        printf("Grade: F (Fail)\\n");
    }
    
    // Age groups
    printf("\\nAge: %d\\n", age);
    if (age < 13) {
        printf("Category: Child\\n");
    } else if (age < 20) {
        printf("Category: Teenager\\n");
    } else if (age < 60) {
        printf("Category: Adult\\n");
    } else {
        printf("Category: Senior\\n");
    }
    
    // Weather description
    printf("\\nTemperature: %d°C\\n", temperature);
    if (temperature > 35) {
        printf("Weather: Very Hot 🔥\\n");
    } else if (temperature > 25) {
        printf("Weather: Warm ☀️\\n");
    } else if (temperature > 15) {
        printf("Weather: Pleasant 🌤️\\n");
    } else if (temperature > 5) {
        printf("Weather: Cold 🌥️\\n");
    } else {
        printf("Weather: Very Cold ❄️\\n");
    }
    
    return 0;
}`,
            output: `Score: 85
Grade: B (Very Good)

Age: 25
Category: Adult

Temperature: 22°C
Weather: Pleasant 🌤️`,
            practiceProblem: "Write a program to classify BMI: <18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, >=30 Obese (use else-if)",
            practiceProblemId: 5003,
            keyPoints: ["Use for multiple mutually exclusive conditions", "First true condition wins", "More efficient than separate ifs"],
            commonMistakes: ["Wrong order (should go from specific to general)", "Using separate ifs instead (tests all conditions)", "Forgetting final else for default case"],
            summary: ["else-if chains handle multiple conditions", "Tests in order, first true condition executes", "Efficient for mutually exclusive choices"],
            order: 3
        },
        "5.4": {
            title: "Nested If",
            purpose: "Make multi-level decisions by placing if statements inside other if statements",
            definition: "Nested if means placing one if statement inside another. Used when a decision depends on multiple independent conditions that need to be checked in stages.",
            why: "Complex decisions often require checking multiple levels of conditions. Nested ifs allow step-by-step validation and multi-criteria decision-making.",
            keyConcepts: ["Inner and outer conditions", "Multi-level checking", "Indentation", "Validation stages"],
            syntax: `if (outer_condition) {
    // Outer condition is true
    if (inner_condition) {
        // Both outer AND inner are true
    }
}

// Example
if (hasTicket) {
    if (age >= 18) {
        printf("Entry allowed");
    }
}`,
            syntaxExplanation: [
                "Inner if only executes if outer if is true",
                "Allows step-by-step checking of conditions",
                "Use proper indentation for readability",
                "Can nest multiple levels (but avoid deep nesting)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    int hasTicket = 1;
    int hasID = 1;
    int score = 85;
    int attendance = 90;
    
    // Simple nested if
    printf("=== Concert Entry Check ===\\n");
    printf("Age: %d, Ticket: %s, ID: %s\\n", 
           age, hasTicket ? "Yes" : "No", hasID ? "Yes" : "No");
    
    if (age >= 18) {
        printf("✓ Age requirement met\\n");
        if (hasTicket) {
            printf("✓ Valid ticket\\n");
            if (hasID) {
                printf("✓ ID verified\\n");
                printf("🎉 ENTRY GRANTED!\\n");
            } else {
                printf("✗ Need ID\\n");
            }
        } else {
            printf("✗ No ticket\\n");
        }
    } else {
        printf("✗ Under 18, entry denied\\n");
    }
    
    // Scholarship eligibility
    printf("\\n=== Scholarship Check ===\\n");
    printf("Score: %d, Attendance: %d%%\\n", score, attendance);
    
    if (score >= 50) {
        printf("✓ Score requirement met\\n");
        if (attendance >= 75) {
            printf("✓ Attendance requirement met\\n");
            
            // Further classification
            if (score >= 90 && attendance >= 95) {
                printf("Award: Full Scholarship\\n");
            } else if (score >= 80) {
                printf("Award: Partial Scholarship\\n");
            } else {
                printf("Award: Certificate\\n");
            }
        } else {
            printf("✗ Insufficient attendance\\n");
        }
    } else {
        printf("✗ Score too low\\n");
    }
    
    return 0;
}`,
            output: `=== Concert Entry Check ===
Age: 20, Ticket: Yes, ID: Yes
✓ Age requirement met
✓ Valid ticket
✓ ID verified
🎉 ENTRY GRANTED!

=== Scholarship Check ===
Score: 85, Attendance: 90%
✓ Score requirement met
✓ Attendance requirement met
Award: Partial Scholarship`,
            practiceProblem: "Write a program: if number is positive, check if it's even (print 'Positive Even') or odd (print 'Positive Odd'). If negative, just print 'Negative'",
            practiceProblemId: 5004,
            keyPoints: ["Inner if only runs if outer if is true", "Good for multi-stage validation", "Keep nesting depth reasonable (2-3 levels max)"],
            commonMistakes: ["Too deep nesting (hard to read)", "Poor indentation", "When else-if would be clearer"],
            summary: ["Nested if places if inside another if", "Inner condition checked only if outer is true", "Use for multi-level decision-making"],
            order: 4
        },
        "5.5": {
            title: "Short Hand If (Ternary)",
            purpose: "Write simple if-else in a single line for cleaner code",
            definition: "The ternary operator (? :) is a compact way to write simple if-else statements in one line. Perfect for assignments and simple conditions.",
            why: "For simple conditions, ternary operator makes code more concise and readable. Commonly used for conditional assignments.",
            keyConcepts: ["Ternary operator", "Inline conditions", "Conditional assignment", "Code brevity"],
            syntax: `variable = condition ? valueIfTrue : valueIfFalse;

// Example
char* status = age >= 18 ? "Adult" : "Minor";

// Equivalent to:
// if (age >= 18)
//     status = "Adult";
// else
//     status = "Minor";`,
            syntaxExplanation: [
                "`condition ? value1 : value2`: if condition true, return value1, else value2",
                "Entire expression returns a value",
                "Perfect for simple assignments",
                "Keep it simple - don't nest too deeply"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    int score = 85;
    int a = 10, b = 25;
    int num = 7;
    
    // Basic ternary
    char* status = age >= 18 ? "Adult" : "Minor";
    printf("Age: %d -> %s\\n", age, status);
    
    // Pass/Fail
    char* result = score >= 50 ? "PASS" : "FAIL";
    printf("Score: %d -> %s\\n", score, result);
    
    // Find max
    int max = a > b ? a : b;
    printf("\\nMax of %d and %d: %d\\n", a, b, max);
    
    // Find min
    int min = a < b ? a : b;
    printf("Min of %d and %d: %d\\n", a, b, min);
    
    // Even/Odd
    char* type = num % 2 == 0 ? "Even" : "Odd";
    printf("\\n%d is %s\\n", num, type);
    
    // Absolute value
    int value = -15;
    int absolute = value < 0 ? -value : value;
    printf("Absolute value of %d: %d\\n", value, absolute);
    
    // Nested (use sparingly)
    char* grade = score >= 90 ? "A" :
                  score >= 80 ? "B" :
                  score >= 70 ? "C" : "F";
    printf("\\nGrade: %s\\n", grade);
    
    return 0;
}`,
            output: `Age: 20 -> Adult
Score: 85 -> PASS

Max of 10 and 25: 25
Min of 10 and 25: 10

7 is Odd
Absolute value of -15: 15

Grade: B`,
            practiceProblem: "Write a program using ternary: find max of two numbers, check if number is even/odd, and apply discount (>=100 gets 10% else 5%)",
            practiceProblemId: 5005,
            keyPoints: ["Compact alternative to simple if-else", "Returns a value for assignment", "Keep it simple for readability"],
            commonMistakes: ["Overusing nested ternary (hard to read)", "Using for complex logic", "Forgetting it must return a value"],
            summary: ["Ternary operator: condition ? value1 : value2", "One-line alternative to simple if-else", "Best for simple conditional assignments"],
            order: 5
        },
        "5.6": {
            title: "Real-Life If Examples",
            purpose: "Apply if statements to solve practical real-world problems",
            definition: "Real-life if examples demonstrate how conditional logic solves everyday problems like login systems, discount calculations, age verification, and input validation.",
            why: "Understanding practical applications helps you see how if statements power real applications and prepares you for building actual software.",
            keyConcepts: ["Input validation", "Business logic", "User authentication", "Conditional calculations"],
            syntax: `// Login validation
if (strcmp(username, correctUser) == 0 && 
    strcmp(password, correctPass) == 0) {
    printf("Login successful");
} else {
    printf("Invalid credentials");
}

// Discount calculation
if (amount >= 1000) {
    discount = amount * 0.20;  // 20%
} else if (amount >= 500) {
    discount = amount * 0.10;  // 10%
}`,
            syntaxExplanation: [
                "Validate input before processing",
                "Check multiple conditions for business rules",
                "Provide clear feedback to users",
                "Handle edge cases and error conditions"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    // 1. Shopping discount calculator
    float purchaseAmount = 850.0;
    float discount = 0.0;
    
    printf("=== Shopping Discount Calculator ===\\n");
    printf("Purchase Amount: $%.2f\\n", purchaseAmount);
    
    if (purchaseAmount >= 1000) {
        discount = purchaseAmount * 0.20;  // 20% off
        printf("Discount: 20%% (Premium Customer)\\n");
    } else if (purchaseAmount >= 500) {
        discount = purchaseAmount * 0.15;  // 15% off
        printf("Discount: 15%% (Regular Customer)\\n");
    } else if (purchaseAmount >= 100) {
        discount = purchaseAmount * 0.05;  // 5% off
        printf("Discount: 5%% (First Time Offer)\\n");
    } else {
        printf("No discount (Minimum $100 required)\\n");
    }
    
    printf("Discount Amount: $%.2f\\n", discount);
    printf("Final Price: $%.2f\\n\\n", purchaseAmount - discount);
    
    // 2. Grade calculator with remarks
    int marks = 78;
    
    printf("=== Grade Report ===\\n");
    printf("Marks: %d\\n", marks);
    
    if (marks >= 90) {
        printf("Grade: A+\\n");
        printf("Remark: Outstanding!\\n");
    } else if (marks >= 80) {
        printf("Grade: A\\n");
        printf("Remark: Excellent\\n");
    } else if (marks >= 70) {
        printf("Grade: B\\n");
        printf("Remark: Good\\n");
    } else if (marks >= 60) {
        printf("Grade: C\\n");
        printf("Remark: Average\\n");
    } else if (marks >= 50) {
        printf("Grade: D\\n");
        printf("Remark: Pass\\n");
    } else {
        printf("Grade: F\\n");
        printf("Remark: Fail - Need improvement\\n");
    }
    
    // 3. Age verification system
    printf("\\n=== Movie Ticket Booking ===\\n");
    int customerAge = 16;
    char movieRating = 'R';  // G, PG, PG-13, R
    
    printf("Customer Age: %d\\n", customerAge);
    printf("Movie Rating: %c\\n", movieRating);
    
    if (movieRating == 'G') {
        printf("✓ Ticket issued (General Audience)\\n");
    } else if (movieRating == 'P' && customerAge >= 13) {
        printf("✓ Ticket issued (PG-13)\\n");
    } else if (movieRating == 'R' && customerAge >= 18) {
        printf("✓ Ticket issued (Restricted)\\n");
    } else {
        printf("✗ Sorry, age restriction applies\\n");
    }
    
    return 0;
}`,
            output: `=== Shopping Discount Calculator ===
Purchase Amount: $850.00
Discount: 15% (Regular Customer)
Discount Amount: $127.50
Final Price: $722.50

=== Grade Report ===
Marks: 78
Grade: B
Remark: Good

=== Movie Ticket Booking ===
Customer Age: 16
Movie Rating: R
✗ Sorry, age restriction applies`,
            practiceProblem: "Write a program for ATM withdrawal: if balance >= amount AND amount <= daily_limit (5000), allow withdrawal, else show appropriate error message",
            practiceProblemId: 5006,
            keyPoints: ["Validate input before processing", "Provide clear user feedback", "Handle all possible cases"],
            commonMistakes: ["Not validating user input", "Missing edge cases", "Unclear error messages"],
            summary: ["If statements power real-world decision logic", "Common uses: validation, authentication, calculations", "Always handle all possible cases clearly"],
            order: 6
        }
    };

    console.log("🚀 Populating Phase 5: C If...Else...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully populated ${count} topics for Phase 5!`);
    process.exit(0);
}

populatePhase5().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
