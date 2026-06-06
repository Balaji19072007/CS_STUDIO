const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function populatePhase3() {
    const courseId = 'c-programming';
    const phaseId = 'phase-3';

    const topics = {
        "3.1": {
            title: "Arithmetic Operators",
            purpose: "Learn to perform basic mathematical operations in C programs",
            definition: "Arithmetic operators are symbols used to perform mathematical calculations like addition, subtraction, multiplication, division, and modulus (remainder).",
            why: "Every program needs calculations - from simple math to complex algorithms. Arithmetic operators are the foundation of all computations.",
            keyConcepts: ["Addition (+)", "Subtraction (-)", "Multiplication (*)", "Division (/)", "Modulus (%)"],
            syntax: `int a = 10, b = 3;
int sum = a + b;       // 13
int diff = a - b;      // 7
int product = a * b;   // 30
int quotient = a / b;  // 3
int remainder = a % b; // 1`,
            syntaxExplanation: [
                "`+`: Adds two numbers (a + b = 13)",
                "`-`: Subtracts second from first (a - b = 7)",
                "`*`: Multiplies two numbers (a * b = 30)",
                "`/`: Divides first by second (10 / 3 = 3 in integer division)",
                "`%`: Returns remainder after division (10 % 3 = 1)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int a = 20, b = 6;
    
    printf("Numbers: a = %d, b = %d\\n\\n", a, b);
    
    printf("Addition: %d + %d = %d\\n", a, b, a + b);
    printf("Subtraction: %d - %d = %d\\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b);
    printf("Division: %d / %d = %d\\n", a, b, a / b);
    printf("Modulus: %d %% %d = %d\\n", a, b, a % b);
    
    // Practical example: Calculate total price
    int itemPrice = 50;
    int quantity = 7;
    int total = itemPrice * quantity;
    printf("\\nTotal price: $%d\\n", total);
    
    return 0;
}`,
            output: `Numbers: a = 20, b = 6

Addition: 20 + 6 = 26
Subtraction: 20 - 6 = 14
Multiplication: 20 * 6 = 120
Division: 20 / 6 = 3
Modulus: 20 % 6 = 2

Total price: $350`,
            practiceProblem: "Write a program to calculate the area and perimeter of a rectangle given length = 15 and width = 8 using arithmetic operators",
            practiceProblemId: 3001,
            keyPoints: ["Use + - * for basic math", "/ gives quotient (integer division truncates)", "% gives remainder (useful for finding even/odd)"],
            commonMistakes: ["Forgetting integer division truncates (7/2 = 3, not 3.5)", "Using % with floats (only works with integers)", "Dividing by zero (program crashes)"],
            summary: ["Arithmetic operators perform mathematical calculations", "+ - * / % cover all basic math operations", "Integer division truncates decimal part"],
            order: 1
        },
        "3.2": {
            title: "Assignment Operators",
            purpose: "Learn efficient ways to assign and update variable values",
            definition: "Assignment operators are used to assign values to variables. Compound assignment operators combine arithmetic operations with assignment for cleaner code.",
            why: "Assignment is one of the most common operations. Compound operators make code shorter and more readable.",
            keyConcepts: ["Simple assignment (=)", "Compound operators (+=, -=, *=, /=, %=)", "Right-to-left evaluation", "Shorthand notation"],
            syntax: `int x = 10;        // Simple assignment

x += 5;            // Same as: x = x + 5
x -= 3;            // Same as: x = x - 3
x *= 2;            // Same as: x = x * 2
x /= 4;            // Same as: x = x / 4
x %= 3;            // Same as: x = x % 3`,
            syntaxExplanation: [
                "`=`: Assigns value on right to variable on left",
                "`+=`: Add and assign (x += 5 means x = x + 5)",
                "`-=`: Subtract and assign (x -= 3 means x = x - 3)",
                "`*=, /=, %=`: Multiply, divide, modulus and assign respectively"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int score = 100;
    printf("Initial score: %d\\n\\n", score);
    
    // Add bonus points
    score += 50;
    printf("After bonus (+= 50): %d\\n", score);
    
    // Penalty
    score -= 20;
    printf("After penalty (-= 20): %d\\n", score);
    
    // Double points event
    score *= 2;
    printf("After doubling (*= 2): %d\\n", score);
    
    // Divide by difficulty
    score /= 4;
    printf("After adjustment (/= 4): %d\\n", score);
    
    // Find remainder
    score %= 50;
    printf("Remainder (%%= 50): %d\\n", score);
    
    return 0;
}`,
            output: `Initial score: 100

After bonus (+= 50): 150
After penalty (-= 20): 130
After doubling (*= 2): 260
After adjustment (/= 4): 65
Remainder (%= 50): 15`,
            practiceProblem: "Write a program with a bank balance of 1000, add deposit of 500, subtract withdrawal of 200, then calculate 5% interest using compound operators",
            practiceProblemId: 3002,
            keyPoints: ["Compound operators are shorthand for operation + assignment", "More readable and less error-prone", "Commonly used in loops and calculations"],
            commonMistakes: ["Confusing = (assignment) with == (comparison)", "Wrong order: x =+ 5 instead of x += 5", "Forgetting compound operators modify the variable"],
            summary: ["Assignment operators store values in variables", "Compound operators combine operation with assignment", "Makes code cleaner: x += 5 instead of x = x + 5"],
            order: 2
        },
        "3.3": {
            title: "Comparison Operators",
            purpose: "Learn to compare values and make decisions in programs",
            definition: "Comparison operators compare two values and return 1 (true) or 0 (false). They are essential for making decisions in if statements and loops.",
            why: "Programs need to make decisions based on conditions. Comparison operators enable all conditional logic.",
            keyConcepts: ["Equality operators (==, !=)", "Relational operators (<, >, <=, >=)", "Boolean results (1 or 0)", "Use in conditions"],
            syntax: `int a = 5, b = 10;

a == b;    // Equal to (0, false)
a != b;    // Not equal to (1, true)
a > b;     // Greater than (0, false)
a < b;     // Less than (1, true)
a >= b;    // Greater than or equal (0, false)
a <= b;    // Less than or equal (1, true)`,
            syntaxExplanation: [
                "`==`: Checks if two values are equal (returns 1 if true, 0 if false)",
                "`!=`: Checks if two values are NOT equal",
                "`>` and `<`: Check greater than or less than",
                "`>=` and `<=`: Include equality in comparison"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int studentAge = 18;
    int votingAge = 18;
    int drivingAge = 16;
    
    printf("Student age: %d\\n\\n", studentAge);
    
    // Equality checks
    printf("Can vote? (age == %d): %d\\n", votingAge, studentAge == votingAge);
    printf("Not a minor? (age != 15): %d\\n\\n", studentAge != 15);
    
    // Relational checks
    printf("Above driving age? (age > %d): %d\\n", drivingAge, studentAge > drivingAge);
    printf("Below 21? (age < 21): %d\\n", studentAge < 21);
    printf("At least 18? (age >= 18): %d\\n", studentAge >= 18);
    printf("At most 20? (age <= 20): %d\\n", studentAge <= 20);
    
    // Practical example
    int score = 85;
    int passScore = 50;
    printf("\\nScore: %d\\n", score);
    printf("Passed? (score >= %d): %d\\n", passScore, score >= passScore);
    
    return 0;
}`,
            output: `Student age: 18

Can vote? (age == 18): 1
Not a minor? (age != 15): 1

Above driving age? (age > 16): 1
Below 21? (age < 21): 1
At least 18? (age >= 18): 1
At most 20? (age <= 20): 1

Score: 85
Passed? (score >= 50): 1`,
            practiceProblem: "Write a program to check if a number is: equal to 100, greater than 50, and less than or equal to 150. Display all comparison results",
            practiceProblemId: 3003,
            keyPoints: ["Returns 1 for true, 0 for false", "Use == for equality, not = (assignment)", "Commonly used in if statements and loops"],
            commonMistakes: ["Using = instead of == (assignment vs comparison)", "Confusing > with >= (strict vs inclusive)", "Not understanding 1 means true, 0 means false"],
            summary: ["Comparison operators compare two values", "Return 1 (true) or 0 (false)", "Essential for if statements and decision-making"],
            order: 3
        },
        "3.4": {
            title: "Logical Operators",
            purpose: "Combine multiple conditions to make complex decisions",
            definition: "Logical operators combine multiple boolean expressions. AND (&&) requires all conditions true, OR (||) requires at least one true, NOT (!) inverts a condition.",
            why: "Real-world decisions often depend on multiple conditions. Logical operators let you combine simple checks into complex logic.",
            keyConcepts: ["AND operator (&&)", "OR operator (||)", "NOT operator (!)", "Short-circuit evaluation", "Truth tables"],
            syntax: `int age = 20, hasLicense = 1;

// AND: Both must be true
age >= 18 && hasLicense    // true

// OR: At least one must be true
age < 18 || hasLicense     // true

// NOT: Inverts the result
!hasLicense                // false`,
            syntaxExplanation: [
                "`&&` (AND): Returns 1 only if BOTH conditions are true",
                "`||` (OR): Returns 1 if AT LEAST ONE condition is true",
                "`!` (NOT): Inverts the result (1 becomes 0, 0 becomes 1)",
                "Short-circuit: && stops if first is false, || stops if first is true"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    int hasLicense = 1;
    int hasInsurance = 0;
    
    printf("Age: %d\\n", age);
    printf("Has license: %d\\n", hasLicense);
    printf("Has insurance: %d\\n\\n", hasInsurance);
    
    // AND: Both conditions must be true
    printf("Can drive? (age >= 18 AND hasLicense): %d\\n", 
           age >= 18 && hasLicense);
    
    // OR: At least one must be true
    printf("Can enter? (age >= 18 OR hasLicense): %d\\n", 
           age >= 18 || hasLicense);
    
    // NOT: Invert the condition
    printf("No insurance? (NOT hasInsurance): %d\\n", !hasInsurance);
    
    // Complex condition
    printf("\\nFully qualified driver? (age >= 18 AND hasLicense AND hasInsurance): %d\\n",
           age >= 18 && hasLicense && hasInsurance);
    
    // Practical: Eligibility check
    int score = 75;
    int attendance = 85;
    printf("\\nPassed? (score >= 50 AND attendance >= 75): %d\\n",
           score >= 50 && attendance >= 75);
    
    return 0;
}`,
            output: `Age: 20
Has license: 1
Has insurance: 0

Can drive? (age >= 18 AND hasLicense): 1
Can enter? (age >= 18 OR hasLicense): 1
No insurance? (NOT hasInsurance): 1

Fully qualified driver? (age >= 18 AND hasLicense AND hasInsurance): 0

Passed? (score >= 50 AND attendance >= 75): 1`,
            practiceProblem: "Write a program to check student eligibility: passed if (marks >= 40 AND attendance >= 75) OR (marks >= 50), display result",
            practiceProblemId: 3004,
            keyPoints: ["&& requires ALL conditions true", "|| requires AT LEAST ONE true", "! inverts true/false", "Use parentheses for clarity"],
            commonMistakes: ["Using & or | (bitwise) instead of && or ||", "Not using parentheses in complex conditions", "Forgetting short-circuit evaluation"],
            summary: ["Logical operators combine multiple conditions", "&& (AND), || (OR), ! (NOT)", "Essential for complex decision-making"],
            order: 4
        },
        "3.5": {
            title: "Bitwise Operators",
            purpose: "Manipulate individual bits for low-level operations and optimization",
            definition: "Bitwise operators work on individual bits (0s and 1s) of integer values. Used for flags, masks, and performance-critical operations.",
            why: "Bitwise operations are extremely fast and memory-efficient. Essential for systems programming, embedded systems, and optimization.",
            keyConcepts: ["AND (&)", "OR (|)", "XOR (^)", "NOT (~)", "Left shift (<<)", "Right shift (>>)"],
            syntax: `int a = 5;    // Binary: 0101
int b = 3;    // Binary: 0011

a & b;        // AND: 0001 = 1
a | b;        // OR:  0111 = 7
a ^ b;        // XOR: 0110 = 6
~a;           // NOT: 1010 = -6
a << 1;       // Left shift: 1010 = 10
a >> 1;       // Right shift: 0010 = 2`,
            syntaxExplanation: [
                "`&` (AND): Bit is 1 only if both bits are 1",
                "`|` (OR): Bit is 1 if at least one bit is 1",
                "`^` (XOR): Bit is 1 if bits are different",
                "`~` (NOT): Flips all bits (0→1, 1→0)",
                "`<<`: Shifts bits left (multiplies by 2)",
                "`>>`: Shifts bits right (divides by 2)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int a = 5;    // Binary: 0101
    int b = 3;    // Binary: 0011
    
    printf("a = %d (binary: 0101)\\n", a);
    printf("b = %d (binary: 0011)\\n\\n", b);
    
    printf("a & b (AND):  %d\\n", a & b);      // 0001 = 1
    printf("a | b (OR):   %d\\n", a | b);      // 0111 = 7
    printf("a ^ b (XOR):  %d\\n", a ^ b);      // 0110 = 6
    printf("~a (NOT):     %d\\n\\n", ~a);      // Inverts all bits
    
    // Bit shifting
    printf("a << 1 (left shift):  %d (multiply by 2)\\n", a << 1);
    printf("a >> 1 (right shift): %d (divide by 2)\\n\\n", a >> 1);
    
    // Practical: Check if number is even/odd
    int num = 7;
    printf("Is %d even? %d\\n", num, !(num & 1));
    
    // Practical: Fast multiplication by powers of 2
    int value = 10;
    printf("%d * 4 = %d (using << 2)\\n", value, value << 2);
    
    return 0;
}`,
            output: `a = 5 (binary: 0101)
b = 3 (binary: 0011)

a & b (AND):  1
a | b (OR):   7
a ^ b (XOR):  6
~a (NOT):     -6

a << 1 (left shift):  10 (multiply by 2)
a >> 1 (right shift): 2 (divide by 2)

Is 7 even? 0
10 * 4 = 40 (using << 2)`,
            practiceProblem: "Write a program to swap two numbers using XOR (without temporary variable): a=15, b=20. Display before and after",
            practiceProblemId: 3005,
            keyPoints: ["Work on individual bits, not whole numbers", "Very fast operations", "<< multiplies by 2, >> divides by 2", "Used for flags and optimization"],
            commonMistakes: ["Confusing & (bitwise) with && (logical)", "Confusing | (bitwise) with || (logical)", "Not understanding binary representation"],
            summary: ["Bitwise operators manipulate individual bits", "Used for optimization and low-level programming", "Shift operators are fast multiply/divide by 2"],
            order: 5
        },
        "3.6": {
            title: "Increment and Decrement",
            purpose: "Learn shorthand operators to increase or decrease values by 1",
            definition: "Increment (++) adds 1 to a variable, decrement (--) subtracts 1. They can be prefix (++x) or postfix (x++), which affects when the change happens.",
            why: "Incrementing/decrementing by 1 is extremely common, especially in loops. These operators make code cleaner and more efficient.",
            keyConcepts: ["Increment (++)", "Decrement (--)", "Prefix vs postfix", "Side effects", "Use in loops"],
            syntax: `int x = 5;

++x;    // Pre-increment: x becomes 6, returns 6
x++;    // Post-increment: returns 5, then x becomes 6

--x;    // Pre-decrement: x becomes 5, returns 5
x--;    // Post-decrement: returns 6, then x becomes 5`,
            syntaxExplanation: [
                "`++x` (prefix): Increment first, then use the value",
                "`x++` (postfix): Use the value first, then increment",
                "`--x` (prefix): Decrement first, then use",
                "`x--` (postfix): Use first, then decrement"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int a = 5;
    
    printf("Initial value: a = %d\\n\\n", a);
    
    // Post-increment
    printf("a++ returns: %d\\n", a++);
    printf("After a++, a = %d\\n\\n", a);
    
    // Pre-increment
    a = 5;  // Reset
    printf("++a returns: %d\\n", ++a);
    printf("After ++a, a = %d\\n\\n", a);
    
    // Post-decrement
    a = 5;  // Reset
    printf("a-- returns: %d\\n", a--);
    printf("After a--, a = %d\\n\\n", a);
    
    // Pre-decrement
    a = 5;  // Reset
    printf("--a returns: %d\\n", --a);
    printf("After --a, a = %d\\n\\n", a);
    
    // Practical: Loop counter
    printf("Countdown: ");
    for (int i = 5; i > 0; i--) {
        printf("%d ", i);
    }
    printf("\\n");
    
    return 0;
}`,
            output: `Initial value: a = 5

a++ returns: 5
After a++, a = 6

++a returns: 6
After ++a, a = 6

a-- returns: 5
After a--, a = 4

--a returns: 4
After --a, a = 4

Countdown: 5 4 3 2 1 `,
            practiceProblem: "Write a program demonstrating the difference between x++ and ++x with initial value 10, showing what each returns and final value",
            practiceProblemId: 3006,
            keyPoints: ["++ adds 1, -- subtracts 1", "Prefix: change then use", "Postfix: use then change", "Most common in loops"],
            commonMistakes: ["Not understanding prefix vs postfix difference", "Using on constants (5++ is invalid)", "Complex expressions with side effects"],
            summary: ["++ increments by 1, -- decrements by 1", "Prefix (++x): change first, then use", "Postfix (x++): use first, then change"],
            order: 6
        },
        "3.7": {
            title: "Ternary Operator",
            purpose: "Write simple if-else statements in a single line using conditional operator",
            definition: "The ternary operator (? :) is a shorthand for simple if-else statements. It evaluates a condition and returns one of two values based on whether the condition is true or false.",
            why: "Makes code more concise for simple conditional assignments. Improves readability when used appropriately.",
            keyConcepts: ["Conditional operator (? :)", "Inline if-else", "Three operands", "Return value", "Readability"],
            syntax: `condition ? valueIfTrue : valueIfFalse;

// Example
int age = 20;
char* status = age >= 18 ? "Adult" : "Minor";

// Equivalent to:
// if (age >= 18)
//     status = "Adult";
// else
//     status = "Minor";`,
            syntaxExplanation: [
                "Format: `condition ? value1 : value2`",
                "If condition is true (1), returns value1",
                "If condition is false (0), returns value2",
                "Can be nested but avoid for readability"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    int score = 75;
    int num = -5;
    
    // Basic ternary
    char* status = age >= 18 ? "Adult" : "Minor";
    printf("Age: %d -> Status: %s\\n", age, status);
    
    // With integers
    char* result = score >= 50 ? "Pass" : "Fail";
    printf("Score: %d -> Result: %s\\n", score, result);
    
    // Finding max
    int a = 10, b = 20;
    int max = a > b ? a : b;
    printf("Max of %d and %d: %d\\n", a, b, max);
    
    // Absolute value
    int absolute = num < 0 ? -num : num;
    printf("Absolute value of %d: %d\\n", num, absolute);
    
    // Nested (not recommended for readability)
    char* grade = score >= 90 ? "A" : 
                  score >= 75 ? "B" : 
                  score >= 50 ? "C" : "F";
    printf("Grade: %s\\n", grade);
    
    return 0;
}`,
            output: `Age: 20 -> Status: Adult
Score: 75 -> Result: Pass
Max of 10 and 20: 20
Absolute value of -5: 5
Grade: B`,
            practiceProblem: "Write a program using ternary operator to find: max of two numbers, check if even/odd, and determine discount (>=100 gets 10% else 5%)",
            practiceProblemId: 3007,
            keyPoints: ["Shorthand for simple if-else", "Returns a value (can assign directly)", "Keep it simple - avoid deep nesting"],
            commonMistakes: ["Overusing nested ternary (hard to read)", "Forgetting it returns a value", "Using for complex logic (use if-else instead)"],
            summary: ["Ternary operator: condition ? value1 : value2", "Inline alternative to simple if-else", "Use for simple conditions only"],
            order: 7
        },
        "3.8": {
            title: "Operator Precedence",
            purpose: "Understand the order in which operators are evaluated in expressions",
            definition: "Operator precedence determines which operators are evaluated first in an expression. Operators with higher precedence are evaluated before those with lower precedence.",
            why: "Understanding precedence prevents bugs from incorrect calculation order. Essential for writing complex expressions correctly.",
            keyConcepts: ["Precedence levels", "Associativity", "Parentheses override", "Expression evaluation order"],
            syntax: `// Without parentheses (precedence rules)
int result = 5 + 3 * 2;        // = 11 (* before +)
int value = 10 - 6 / 2;        // = 7 (/ before -)

// With parentheses (force order)
int result = (5 + 3) * 2;      // = 16
int value = (10 - 6) / 2;      // = 2`,
            syntaxExplanation: [
                "Highest to Lowest: `()` → `++ --` → `* / %` → `+ -` → `< <= > >=` → `== !=` → `&&` → `||` → `?:` → `=`",
                "Multiplication/Division before Addition/Subtraction",
                "Comparison before Logical operators",
                "Use parentheses when in doubt for clarity"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Precedence examples
    int a = 5 + 3 * 2;
    printf("5 + 3 * 2 = %d (not 16)\\n", a);
    
    int b = (5 + 3) * 2;
    printf("(5 + 3) * 2 = %d\\n\\n", b);
    
    // Complex expression
    int x = 10, y = 5, z = 2;
    int result = x + y * z - 3;
    printf("%d + %d * %d - 3 = %d\\n", x, y, z, result);
    printf("Evaluation: 10 + (5*2) - 3 = 10 + 10 - 3 = 17\\n\\n");
    
    // With parentheses
    int result2 = (x + y) * (z - 3);
    printf("(%d + %d) * (%d - 3) = %d\\n\\n", x, y, z, result2);
    
    // Comparison with arithmetic
    int age = 20;
    int canVote = age >= 18 && age <= 100;
    printf("Can vote (age=%d): %d\\n", age, canVote);
    
    // Assignment has lowest precedence
    int m = 5;
    int n = m += 3;  // m = m + 3, then n = m
    printf("m = %d, n = %d\\n", m, n);
    
    return 0;
}`,
            output: `5 + 3 * 2 = 11 (not 16)
(5 + 3) * 2 = 16

10 + 5 * 2 - 3 = 17
Evaluation: 10 + (5*2) - 3 = 10 + 10 - 3 = 17

(10 + 5) * (2 - 3) = -15

Can vote (age=20): 1
m = 8, n = 8`,
            practiceProblem: "Write a program to calculate: (a) 3+4*5, (b) (3+4)*5, (c) 10-6/2, (d) (10-6)/2 and explain why results differ",
            practiceProblemId: 3008,
            keyPoints: ["* / % before + -", "Parentheses override precedence", "Use () for clarity even when not needed", "When in doubt, use parentheses"],
            commonMistakes: ["Assuming left-to-right evaluation", "Not using parentheses in complex expressions", "Forgetting && || have low precedence"],
            summary: ["Precedence determines evaluation order", "Multiplication/Division before Addition/Subtraction", "Use parentheses to control and clarify order"],
            order: 8
        }
    };

    console.log("🚀 Populating Phase 3: C Operators...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully populated ${count} topics for Phase 3!`);
    process.exit(0);
}

populatePhase3().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
