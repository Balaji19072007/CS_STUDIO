const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function createPhase7Functions() {
    const courseId = 'c-programming';
    const phaseId = 'phase-7';

    const topics = {
        "7.1": {
            title: "Function Basics",
            purpose: "Learn to create reusable blocks of code that perform specific tasks",
            definition: "A function is a self-contained block of code that performs a specific task. Functions help organize code, avoid repetition, and make programs easier to understand and maintain.",
            why: "Without functions, you'd repeat the same code everywhere. Functions let you write code once and reuse it many times, making programs shorter and easier to maintain.",
            keyConcepts: ["Function declaration", "Function definition", "Function call", "Return type", "Parameters"],
            syntax: `// Function declaration (prototype)
returnType functionName(parameters);

// Function definition
returnType functionName(parameters) {
    // Function body
    return value;
}

// Function call
result = functionName(arguments);`,
            syntaxExplanation: [
                "Declaration tells compiler function exists (usually before main)",
                "Definition contains actual code that runs",
                "Call executes the function with given arguments",
                "Return type specifies what type of value function returns (int, float, void)"
            ],
            exampleCode: `#include <stdio.h>

// Function declarations
void greet();
int add(int a, int b);
float calculateArea(float radius);

int main() {
    // 1. Simple function call (no parameters, no return)
    greet();
    
    // 2. Function with parameters and return value
    int sum = add(10, 20);
    printf("\\nSum: %d\\n", sum);
    
    // 3. Function with calculation
    float area = calculateArea(5.0);
    printf("Area of circle (radius 5): %.2f\\n", area);
    
    // Call add multiple times
    printf("\\nMultiple calls:\\n");
    printf("5 + 3 = %d\\n", add(5, 3));
    printf("100 + 200 = %d\\n", add(100, 200));
    printf("7 + 9 = %d\\n", add(7, 9));
    
    return 0;
}

// Function definitions

void greet() {
    printf("=== Welcome to C Functions! ===\\n");
    printf("Functions make code reusable\\n");
}

int add(int a, int b) {
    int result = a + b;
    return result;
}

float calculateArea(float radius) {
    float pi = 3.14159;
    float area = pi * radius * radius;
    return area;
}`,
            output: `=== Welcome to C Functions! ===
Functions make code reusable

Sum: 30
Area of circle (radius 5): 78.54

Multiple calls:
5 + 3 = 8
100 + 200 = 300
7 + 9 = 16`,
            practiceProblem: "Write a program with functions: multiply(a,b), findMax(a,b), isEven(n). Call each function and display results",
            practiceProblemId: 7001,
            keyPoints: ["Functions avoid code repetition", "Declare before main, define after", "Call functions by name with arguments"],
            commonMistakes: ["Forgetting to declare function before main", "Parameter types don't match arguments", "Missing return statement"],
            summary: ["Functions are reusable blocks of code", "Declare before using, define implementation", "Make code modular and maintainable"],
            order: 1
        },
        "7.2": {
            title: "Function Parameters",
            purpose: "Pass data to functions using parameters for flexible, reusable code",
            definition: "Parameters are variables listed in function declaration that receive values when function is called. Arguments are actual values passed to function. Parameters make functions work with different data.",
            why: "Functions are useful when they can work with different values. Parameters let one function handle many different inputs.",
            keyConcepts: ["Parameters vs Arguments", "Pass by value", "Multiple parameters", "Parameter order"],
            syntax: `// Parameters in declaration
returnType funcName(type param1, type param2);

// Calling with arguments
funcName(value1, value2);

// Example
int multiply(int a, int b) {
    return a * b;
}

result = multiply(5, 3);  // 5 and 3 are arguments`,
            syntaxExplanation: [
                "Parameters are variables in function definition",
                "Arguments are actual values passed when calling",
                "C uses pass-by-value (copies values, doesn't modify originals)",
                "Parameter order matters - must match when calling"
            ],
            exampleCode: `#include <stdio.h>

// Functions with different numbers of parameters

// No parameters
void printLine() {
    printf("------------------------\\n");
}

// One parameter
void printSquare(int num) {
    printf("Square of %d = %d\\n", num, num * num);
}

// Two parameters
int findMax(int a, int b) {
    if (a > b)
        return a;
    else
        return b;
}

// Three parameters
float calculateAverage(float a, float b, float c) {
    return (a + b + c) / 3.0;
}

// Multiple parameters
void displayInfo(char name[], int age, float height) {
    printf("Name: %s\\n", name);
    printf("Age: %d years\\n", age);
    printf("Height: %.2f cm\\n", height);
}

int main() {
    // No parameters
    printLine();
    printf("Function Parameter Examples\\n");
    printLine();
    
    // One parameter
    printf("\\n");
    printSquare(5);
    printSquare(10);
    printSquare(7);
    
    // Two parameters
    printf("\\n");
    printf("Max of 15 and 28: %d\\n", findMax(15, 28));
    printf("Max of 100 and 50: %d\\n", findMax(100, 50));
    
    // Three parameters
    printf("\\n");
    float avg = calculateAverage(85.5, 92.0, 78.5);
    printf("Average of 85.5, 92.0, 78.5: %.2f\\n", avg);
    
    // Multiple mixed types
    printf("\\n");
    displayInfo("Alice", 25, 165.5);
    
    return 0;
}`,
            output: `------------------------
Function Parameter Examples
------------------------

Square of 5 = 25
Square of 10 = 100
Square of 7 = 49

Max of 15 and 28: 28
Max of 100 and 50: 100

Average of 85.5, 92.0, 78.5: 85.33

Name: Alice
Age: 25 years
Height: 165.50 cm`,
            practiceProblem: "Write functions: power(base, exponent), calculateGrade(marks, total), displayReceipt(item, price, quantity)",
            practiceProblemId: 7002,
            keyPoints: ["Parameters receive values from arguments", "C uses pass-by-value (copies data)", "Can have multiple parameters of different types"],
            commonMistakes: ["Wrong number of arguments", "Argument types don't match parameters", "Wrong order of arguments"],
            summary: ["Parameters make functions flexible", "Arguments are actual values passed to parameters", "Order and type must match"],
            order: 2
        },
        "7.3": {
            title: "Return Values",
            purpose: "Get results back from functions to use in your program",
            definition: "Return value is data that a function sends back to caller. Functions can return int, float, char, etc., or void (nothing). Only one value can be returned directly.",
            why: "Functions need to give back results - calculations, status codes, found values. Return makes functions produce useful output.",
            keyConcepts: ["Return statement", "Return types", "Void functions", "Using return values"],
            syntax: `// Function that returns int
int add(int a, int b) {
    return a + b;  // Returns result
}

// Void function (returns nothing)
void printMessage() {
    printf("Hello");
    // No return needed
}

// Using return value
int result = add(5, 3);`,
            syntaxExplanation: [
                "`return value;` sends value back to caller",
                "Return type in declaration must match actual return value",
                "`void` means function returns nothing",
                "Execution stops at return statement"
            ],
            exampleCode: `#include <stdio.h>

// Functions with different return types

// Returns int
int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Returns float
float celsiusToFahrenheit(float celsius) {
    return (celsius * 9.0 / 5.0) + 32.0;
}

// Returns char
char getGrade(int score) {
    if (score >= 90) return 'A';
    else if (score >= 80) return 'B';
    else if (score >= 70) return 'C';
    else if (score >= 60) return 'D';
    else return 'F';
}

// Returns int (1=true, 0=false)
int isPrime(int num) {
    if (num <= 1) return 0;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) return 0;
    }
    return 1;
}

// Void function (no return)
void displayResult(int num, int fact) {
    printf("Factorial of %d = %d\\n", num, fact);
}

int main() {
    // Using int return
    int fact5 = factorial(5);
    printf("Factorial of 5: %d\\n", fact5);
    displayResult(6, factorial(6));
    
    // Using float return
    printf("\\n");
    float tempF = celsiusToFahrenheit(25.0);
    printf("25°C = %.1f°F\\n", tempF);
    printf("0°C = %.1f°F\\n", celsiusToFahrenheit(0.0));
    
    // Using char return
    printf("\\n");
    char grade = getGrade(85);
    printf("Score 85 -> Grade: %c\\n", grade);
    printf("Score 72 -> Grade: %c\\n", getGrade(72));
    
    // Using boolean return (int as true/false)
    printf("\\n");
    printf("Is 17 prime? %s\\n", isPrime(17) ? "Yes" : "No");
    printf("Is 20 prime? %s\\n", isPrime(20) ? "Yes" : "No");
    
    return 0;
}`,
            output: `Factorial of 5: 120
Factorial of 6 = 720

25°C = 77.0°F
0°C = 32.0°F

Score 85 -> Grade: B
Score 72 -> Grade: C

Is 17 prime? Yes
Is 20 prime? No`,
            practiceProblem: "Write functions that return: (1) area of rectangle, (2) if number is even (1/0), (3) larger of two numbers",
            practiceProblemId: 7003,
            keyPoints: ["return sends value back to caller", "Return type must match declaration", "void functions don't return anything"],
            commonMistakes: ["Return type mismatch", "Missing return in non-void function", "Trying to return multiple values directly"],
            summary: ["Return statement sends value back", "Can return int, float, char, etc., or void", "Only one value returned directly"],
            order: 3
        },
        "7.4": {
            title: "Recursion",
            purpose: "Solve problems by having functions call themselves",
            definition: "Recursion is when a function calls itself to solve smaller versions of the same problem. Must have a base case to stop, otherwise infinite loop occurs.",
            why: "Some problems are naturally recursive (factorials, trees, fibonacci). Recursion provides elegant solutions to complex problems.",
            keyConcepts: ["Base case", "Recursive case", "Call stack", "Divide and conquer"],
            syntax: `returnType recursive(parameters) {
    if (base_case) {
        return simple_result;  // Stop
    }
    // Recursive case
    return recursive(smaller_problem);
}

// Example
int factorial(int n) {
    if (n <= 1) return 1;      // Base
    return n * factorial(n-1);  // Recursive
}`,
            syntaxExplanation: [
                "Base case: simple case that stops recursion",
                "Recursive case: function calls itself with smaller input",
                "Each call goes on call stack, returns when base reached",
                "Must make progress toward base case"
            ],
            exampleCode: `#include <stdio.h>

// Factorial using recursion
int factorial(int n) {
    printf("  factorial(%d) called\\n", n);
    if (n <= 1) {
        printf("  Base case reached: return 1\\n");
        return1;
    }
    int result = n * factorial(n - 1);
    printf("  factorial(%d) returning %d\\n", n, result);
    return result;
}

// Fibonacci number
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Sum of digits
int sumDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}

// Power function
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// Count down
void countdown(int n) {
    if (n == 0) {
        printf("Blastoff!\\n");
        return;
    }
    printf("%d... ", n);
    countdown(n - 1);
}

int main() {
    // Factorial with trace
    printf("=== Factorial (with trace) ===\\n");
    int fact = factorial(4);
    printf("Result: %d\\n", fact);
    
    // Fibonacci
    printf("\\n=== Fibonacci Sequence ===\\n");
    printf("First 10 Fibonacci numbers: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    
    // Sum of digits
    printf("\\n=== Sum of Digits ===\\n");
    int num = 12345;
    printf("Sum of digits in %d: %d\\n", num, sumDigits(num));
    
    // Power
    printf("\\n=== Power Function ===\\n");
    printf("2^5 = %d\\n", power(2, 5));
    printf("3^4 = %d\\n", power(3, 4));
    
    // Countdown
    printf("\\n=== Countdown ===\\n");
    countdown(5);
    
    return 0;
}`,
            output: `=== Factorial (with trace) ===
  factorial(4) called
  factorial(3) called
  factorial(2) called
  factorial(1) called
  Base case reached: return 1
  factorial(2) returning 2
  factorial(3) returning 6
  factorial(4) returning 24
Result: 24

=== Fibonacci Sequence ===
First 10 Fibonacci numbers: 0 1 1 2 3 5 8 13 21 34 

=== Sum of Digits ===
Sum of digits in 12345: 15

=== Power Function ===
2^5 = 32
3^4 = 81

=== Countdown ===
5... 4... 3... 2... 1... Blastoff!`,
            practiceProblem: "Write recursive functions: (1) sum of 1 to n, (2) reverse a number, (3) GCD of two numbers using Euclidean algorithm",
            practiceProblemId: 7004,
            keyPoints: ["Must have base case to stop", "Function calls itself with simpler input", "Each call uses stack memory"],
            commonMistakes: ["No base case (infinite recursion)", "Not progressing toward base", "Stack overflow from too many calls"],
            summary: ["Recursion: function calls itself", "Base case stops recursion", "Elegant for naturally recursive problems"],
            order: 4
        },
        "7.5": {
            title: "Function Scope and Lifetime",
            purpose: "Understand where variables are accessible and how long they exist",
            definition: "Scope determines where a variable can be accessed. Lifetime is how long a variable exists. Local variables exist only during function execution, global variables exist throughout program.",
            why: "Understanding scope prevents bugs from unexpected variable access or modification. Proper scope makes code safer and more predictable.",
            keyConcepts: ["Local variables", "Global variables", "Static variables", "Variable lifetime"],
            syntax: `int global = 100;  // Global scope

void function() {
    int local = 10;      // Local scope
    static int count = 0; // Static local
    count++;
}

int main() {
    int x = 5;  // Local to main
    function();
}`,
            syntaxExplanation: [
                "Local: accessible only within function, destroyed when function returns",
                "Global: accessible everywhere, exists entire program",
                "Static local: local scope but retains value between calls",
                "Parameters are local to function"
            ],
            exampleCode: `#include <stdio.h>

// Global variable
int globalCounter = 0;

// Function demonstrating local variables
void localExample() {
    int local = 10;  // Created each call
    local++;
    printf("Local variable: %d\\n", local);
}

// Function with static variable
void staticExample() {
    static int staticVar = 0;  // Created once, persists
    staticVar++;
    printf("Static variable: %d\\n", staticVar);
}

// Function using global
void incrementGlobal() {
    globalCounter++;
    printf("Global counter: %d\\n", globalCounter);
}

// Scope demonstration
int x = 100;  // Global x

void scopeTest() {
    int x = 50;  // Local x (shadows global)
    printf("Inside function, local x = %d\\n", x);
    printf("Global x (via scope) = %d\\n", ::x);  // Can't access in C easily
}

int main() {
    printf("=== Local Variables ===\\n");
    localExample();  // local = 11
    localExample();  // local = 11 again (reset)
    localExample();  // local = 11 again
    
    printf("\\n=== Static Variables ===\\n");
    staticExample();  // staticVar = 1
    staticExample();  // staticVar = 2
    staticExample();  // staticVar = 3
    
    printf("\\n=== Global Variables ===\\n");
    printf("Initial global: %d\\n", globalCounter);
    incrementGlobal();  // 1
    incrementGlobal();  // 2
    incrementGlobal();  // 3
    
    printf("\\n=== Variable Scope ===\\n");
    printf("Global x in main: %d\\n", x);
    scopeTest();
    printf("Global x after function: %d\\n", x);
    
    // Local variable in main
    int mainLocal = 777;
    printf("\\nLocal in main: %d\\n", mainLocal);
    
    return 0;
}`,
            output: `=== Local Variables ===
Local variable: 11
Local variable: 11
Local variable: 11

=== Static Variables ===
Static variable: 1
Static variable: 2
Static variable: 3

=== Global Variables ===
Initial global: 0
Global counter: 1
Global counter: 2
Global counter: 3

=== Variable Scope ===
Global x in main: 100
Inside function, local x = 50
Global x after function: 100

Local in main: 777`,
            practiceProblem: "Write a function callCount() using static variable that tracks and displays how many times it's been called",
            practiceProblemId: 7005,
            keyPoints: ["Local: function scope only", "Global: entire program access", "Static: retains value between calls"],
            commonMistakes: ["Overusing globals", "Shadowing variables unintentionally", "Not understanding static persistence"],
            summary: ["Scope: where variable is accessible", "Local variables die after function", "Static variables persist between calls"],
            order: 5
        },
        "7.6": {
            title: "Function Pointers",
            purpose: "Store and call functions dynamically using pointers",
            definition: "Function pointer is a variable that stores the address of a function. Allows calling functions indirectly, passing functions as arguments, and creating callback mechanisms.",
            why: "Function pointers enable advanced patterns like callbacks, plugin systems, and dynamic function selection. Essential for flexible, extensible code.",
            keyConcepts: ["Pointer to function", "Function address", "Calling via pointer", "Callback functions"],
            syntax: `// Declare function pointer
returnType (*pointerName)(paramTypes);

// Assign function address
pointerName = functionName;

// Call via pointer
result = (*pointerName)(arguments);
// Or shorthand:
result = pointerName(arguments);`,
            syntaxExplanation: [
                "`returnType (*ptr)(params)`: declares function pointer",
                "`ptr = funcName`: assigns function address (no parentheses)",
                "`(*ptr)(args)` or `ptr(args)`: calls function via pointer",
                "Function name without () is its address"
            ],
            exampleCode: `#include <stdio.h>

// Simple functions
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

// Function that takes function pointer
int operate(int x, int y, int (*operation)(int, int)) {
    return operation(x, y);
}

// Callback example
void processArray(int arr[], int size, void (*callback)(int)) {
    for (int i = 0; i < size; i++) {
        callback(arr[i]);
    }
}

void printSquare(int n) {
    printf("%d ", n * n);
}

void printDouble(int n) {
    printf("%d ", n * 2);
}

int main() {
    // 1. Basic function pointer
    printf("=== Basic Function Pointer ===\\n");
    int (*funcPtr)(int, int);
    
    funcPtr = add;
    printf("add(10, 5) = %d\\n", funcPtr(10, 5));
    
    funcPtr = subtract;
    printf("subtract(10, 5) = %d\\n", funcPtr(10, 5));
    
    funcPtr = multiply;
    printf("multiply(10, 5) = %d\\n", funcPtr(10, 5));
    
    // 2. Passing function as parameter
    printf("\\n=== Function as Parameter ===\\n");
    printf("operate(8, 3, add) = %d\\n", operate(8, 3, add));
    printf("operate(8, 3, subtract) = %d\\n", operate(8, 3, subtract));
    printf("operate(8, 3, multiply) = %d\\n", operate(8, 3, multiply));
    
    // 3. Array of function pointers (calculator)
    printf("\\n=== Function Pointer Array ===\\n");
    int (*operations[3])(int, int) = {add, subtract, multiply};
    char* names[] = {"Add", "Subtract", "Multiply"};
    
    for (int i = 0; i < 3; i++) {
        printf("%s(6, 2) = %d\\n", names[i], operations[i](6, 2));
    }
    
    // 4. Callback function
    printf("\\n=== Callback Function ===\\n");
    int numbers[] = {1, 2, 3, 4, 5};
    
    printf("Squares: ");
    processArray(numbers, 5, printSquare);
    printf("\\n");
    
    printf("Doubles: ");
    processArray(numbers, 5, printDouble);
    printf("\\n");
    
    return 0;
}`,
            output: `=== Basic Function Pointer ===
add(10, 5) = 15
subtract(10, 5) = 5
multiply(10, 5) = 50

=== Function as Parameter ===
operate(8, 3, add) = 11
operate(8, 3, subtract) = 5
operate(8, 3, multiply) = 24

=== Function Pointer Array ===
Add(6, 2) = 8
Subtract(6, 2) = 4
Multiply(6, 2) = 12

=== Callback Function ===
Squares: 1 4 9 16 25 
Doubles: 2 4 6 8 10 `,
            practiceProblem: "Create a calculator using function pointer array. User selects operation (0=+, 1=-, 2=*, 3=/), program calls correct function via pointer",
            practiceProblemId: 7006,
            keyPoints: ["Function pointers store function addresses", "Enable dynamic function calls", "Used for callbacks and flexible design"],
            commonMistakes: ["Wrong syntax for declaration", "Calling with () when assigning", "Mismatched function signatures"],
            summary: ["Function pointers store function addresses", "Call functions dynamically", "Enable callbacks and plugin patterns"],
            order: 6
        }
    };

    console.log("🚀 Populating Phase 7: Functions...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully populated ${count} topics for Phase 7!`);
    process.exit(0);
}

createPhase7Functions().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
