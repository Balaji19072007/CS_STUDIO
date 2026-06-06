const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function populatePhase2Perfect() {
    const courseId = 'c-programming';
    const phaseId = 'phase-2';

    const topics = {
        "2.1": {
            title: "C Variables",
            purpose: "To understand how to store and manipulate data in C programs using variables",
            definition: "A variable is a named storage location in computer memory that holds a value which can be changed during program execution.",
            why: "Variables are fundamental to programming as they allow programs to be dynamic, store user input, perform calculations, and maintain state.",
            keyConcepts: ["Declaration before use", "Data type requirement", "Memory allocation", "Case sensitivity"],
            syntax: `data_type variable_name = value;

int age = 25;
float price = 19.99;
char grade = 'A';`,
            syntaxExplanation: [
                "`data_type`: Specifies what kind of data (int, float, char, etc.)",
                "`variable_name`: Identifier to access the stored value",
                "`= value`: Optional initialization with a starting value"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 20;
    float gpa = 3.75;
    char grade = 'A';
    
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    
    return 0;
}`,
            output: `Age: 20
GPA: 3.75
Grade: A`,
            practiceProblem: "Write a program to store and display your name (string), age (int), height in meters (float), and favorite letter (char)",
            practiceProblemId: 2001,
            keyPoints: ["Always initialize variables before use", "Choose meaningful variable names", "Match data type to value type"],
            commonMistakes: ["Using variables before initialization", "Wrong data type for value", "Mismatched format specifiers in printf"],
            summary: ["Variables store data in named memory locations", "Must declare type before using", "Initialization prevents undefined behavior"],
            order: 1
        },
        "2.2": {
            title: "Create Variables",
            purpose: "To learn the different ways of creating and declaring variables in C",
            definition: "Variable creation involves declaring the data type and name, with optional initialization of values",
            why: "Understanding different declaration methods helps write cleaner, more efficient code",
            keyConcepts: ["Declaration syntax", "Initialization", "Multiple declarations", "Memory allocation"],
            syntax: `// Declaration only
int count;

// Declaration with initialization
int count = 0;

// Multiple declarations
int a, b, c;
int x = 1, y = 2, z = 3;`,
            syntaxExplanation: [
                "`int count;`: Declares variable without initializing (contains garbage value)",
                "`int count = 0;`: Declares and initializes in one statement",
                "`int a, b, c;`: Declares multiple variables of same type together"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Different ways to create variables
    int a = 5;              // Initialize with value
    int b = 10, c = 15;     // Multiple with values
    int sum;                // Declare first
    
    sum = a + b + c;        // Assign later
    
    printf("a = %d, b = %d, c = %d\\n", a, b, c);
    printf("Sum = %d\\n", sum);
    
    return 0;
}`,
            output: `a = 5, b = 10, c = 15
Sum = 30`,
            practiceProblem: "Write a program to declare 5 integer variables using different methods (some initialized, some not), then assign values and display all of them",
            practiceProblemId: 2002,
            keyPoints: ["Declare variables at the beginning of blocks", "Initialize important variables immediately", "Group related variables together"],
            commonMistakes: ["Reading uninitialized variables", "Forgetting semicolons", "Mixing different data types in same declaration"],
            summary: ["Variables can be declared with or without initialization", "Multiple variables of same type can be declared together", "Uninitialized variables contain garbage values"],
            order: 2
        },
        "2.3": {
            title: "Variable Names",
            purpose: "Learn the rules and best practices for naming variables in C",
            definition: "Variable names (identifiers) must follow specific rules and conventions for valid C code",
            why: "Good naming makes code readable, maintainable, and prevents errors",
            keyConcepts: ["Naming rules", "Case sensitivity", "Best practices", "Reserved keywords"],
            syntax: `// Valid names
int age;
int studentCount;
int _privateVar;
float total_price;

// Invalid names
// int 2fast;       // Can't start with digit
// int my-var;      // Can't use hyphen
// int return;      // Can't use keyword`,
            syntaxExplanation: [
                "Must start with letter (a-z, A-Z) or underscore (_)",
                "Can contain letters, digits (0-9), and underscores",
                "Cannot use C keywords (int, return, if, etc.)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Descriptive variable names
    int studentAge = 18;
    float avgScore = 85.5;
    char firstInitial = 'J';
    
    // Poor names (valid but unclear)
    int a = 18;      // What is 'a'?
    float x = 85.5;  // What is 'x'?
    
    printf("Student Age: %d\\n", studentAge);
    printf("Average Score: %.1f\\n", avgScore);
    printf("Initial: %c\\n", firstInitial);
    
    return 0;
}`,
            output: `Student Age: 18
Average Score: 85.5
Initial: J`,
            practiceProblem: "Write a program with variables for a product: productID, productName, price, quantityInStock, discountPercent - use proper naming conventions",
            practiceProblemId: 2003,
            keyPoints: ["Use camelCase or snake_case consistently", "Make names descriptive and meaningful", "Avoid single-letter names except for loops"],
            commonMistakes: ["Starting names with numbers", "Using reserved keywords as names", "Confusing names (temp, tmp, data)"],
            summary: ["Variable names must follow C syntax rules", "Descriptive names improve code readability", "Case matters: age ≠ Age ≠ AGE"],
            order: 3
        },
        "2.4": {
            title: "Change Values",
            purpose: "Learn how to update and modify variable values after declaration",
            definition: "Variables can be reassigned new values using the assignment operator (=) after initial declaration",
            why: "Programs need to update data dynamically based on calculations, user input, and logic",
            keyConcepts: ["Assignment operator", "Value updates", "Overwriting", "Expression evaluation"],
            syntax: `int score = 50;       // Initial value
score = 75;           // Change to new value
score = score + 10;   // Update using current value
score += 5;           // Compound assignment`,
            syntaxExplanation: [
                "`score = 75;`: Assigns new value, old value is lost",
                "`score = score + 10;`: Uses current value in calculation",
                "`score += 5;`: Shorthand for score = score + 5"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int score = 50;
    printf("Initial score: %d\\n", score);
    
    score = 75;  // Change value
    printf("New score: %d\\n", score);
    
    score = score + 10;  // Add to current value
    printf("After bonus: %d\\n", score);
    
    score += 5;  // Compound assignment
    printf("Final score: %d\\n", score);
    
    return 0;
}`,
            output: `Initial score: 50
New score: 75
After bonus: 85
Final score: 90`,
            practiceProblem: "Write a program with a counter starting at 0, increment it by 1 five times, printing the value after each increment",
            practiceProblemId: 2004,
            keyPoints: ["Assignment (=) is different from equality (==)", "Right side is evaluated first, then assigned to left", "Previous value is completely replaced"],
            commonMistakes: ["Using == instead of = for assignment", "Forgetting to update loop counters", "Not storing calculation results"],
            summary: ["Variables are mutable - values can change", "Use assignment operator (=) to update values", "Previous value is overwritten when reassigning"],
            order: 4
        },
        "2.5": {
            title: "Multiple Variables",
            purpose: "Learn to declare and manage multiple related variables efficiently",
            definition: "Multiple variables of the same data type can be declared and initialized in a single statement",
            why: "Efficient variable management makes code cleaner and reduces repetition",
            keyConcepts: ["Comma separation", "Group declarations", "Mixed initialization", "Code organization"],
            syntax: `// Declare multiple without values
int a, b, c;

// Declare multiple with same value
int x = 5, y = 5, z = 5;

// Declare with different values
int num1 = 10, num2 = 20, num3 = 30;`,
            syntaxExplanation: [
                "`int a, b, c;`: Declares three integers (uninitialized)",
                "`int x = 1, y = 2;`: Declares and initializes each separately",
                "Each variable gets its own memory space"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Multiple related variables
    int math = 85, science = 90, english = 88;
    int total, average;
    
    total = math + science + english;
    average = total / 3;
    
    printf("Math: %d\\n", math);
    printf("Science: %d\\n", science);
    printf("English: %d\\n", english);
    printf("Total: %d\\n", total);
    printf("Average: %d\\n", average);
    
    return 0;
}`,
            output: `Math: 85
Science: 90
English: 88
Total: 263
Average: 87`,
            practiceProblem: "Write a program to declare 3 subject marks in one line, calculate total and average in float, then display results",
            practiceProblemId: 2005,
            keyPoints: ["Group related variables of same type", "Can mix initialized and uninitialized in one statement", "Improves code readability"],
            commonMistakes: ["Trying to mix data types in one declaration", "Forgetting commas between variables", "Confusing declaration order with initialization"],
            summary: ["Multiple variables of same type can be declared together", "Separate each variable with comma", "Cleaner code organization"],
            order: 5
        },
        "2.6": {
            title: "Format Specifiers",
            purpose: "Learn format codes for displaying different data types correctly",
            definition: "Format specifiers are placeholder codes in printf() that tell C how to format and display variables",
            why: "Each data type requires its own format specifier for correct input/output operations",
            keyConcepts: ["Format codes", "Type matching", "Precision control", "Output formatting"],
            syntax: `printf("%d", intVar);     // Integer
printf("%f", floatVar);    // Float
printf("%.2f", price);     // Float with 2 decimals
printf("%c", charVar);     // Character
printf("%s", stringVar);   // String`,
            syntaxExplanation: [
                "`%d`: Integer values (int, short, long)",
                "`%f`: Floating-point values (float, double)",
                "`%.2f`: Float with exactly 2 decimal places",
                "`%c`: Single character",
                "`%s`: String (character array)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int age = 25;
    float gpa = 3.85666;
    char grade = 'A';
    double pi = 3.14159265359;
    
    printf("Age: %d years\\n", age);
    printf("GPA: %.2f\\n", gpa);        // 2 decimals
    printf("Grade: %c\\n", grade);
    printf("Pi: %.5f\\n", pi);          // 5 decimals
    
    // Multiple values
    printf("Student: Age=%d, GPA=%.2f, Grade=%c\\n", age, gpa, grade);
    
    return 0;
}`,
            output: `Age: 25 years
GPA: 3.86
Grade: A
Pi: 3.14159
Student: Age=25, GPA=3.86, Grade=A`,
            practiceProblem: "Write a program displaying your info: name (string), age (int), height in meters (float with 2 decimals), initial (char)",
            practiceProblemId: 2006,
            keyPoints: ["Format specifier must match variable type", "Use %.nf to control decimal places", "Order of specifiers must match argument order"],
            commonMistakes: ["Using %d for float (shows garbage)", "Using %f for int (undefined behavior)", "Mismatching argument count and specifier count"],
            summary: ["Format specifiers tell printf() how to display values", "%d for int, %f for float, %c for char", "Precision can be controlled with %.nf"],
            order: 6
        },
        "2.7": {
            title: "Real-Life Examples (Variables)",
            purpose: "Apply variable concepts to solve practical real-world problems",
            definition: "Using variables to model real-world scenarios like calculations, conversions, and data processing",
            why: "Real applications demonstrate practical use of programming concepts",
            keyConcepts: ["Problem solving", "Formula implementation", "Data modeling", "Calculations"],
            syntax: `// Temperature conversion
float celsius, fahrenheit;
celsius = 25.0;
fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

// Area calculation
float length = 10.5, width = 5.2;
float area = length * width;`,
            syntaxExplanation: [
                "Declare variables for real-world quantities",
                "Use appropriate data types (int for counts, float for measurements)",
                "Store intermediate results in variables for clarity"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Shopping bill calculation
    float itemPrice = 100.0;
    float taxRate = 0.18;      // 18%
    float discount = 0.10;     // 10%
    
    float discountAmount = itemPrice * discount;
    float priceAfterDiscount = itemPrice - discountAmount;
    float taxAmount = priceAfterDiscount * taxRate;
    float finalPrice = priceAfterDiscount + taxAmount;
    
    printf("Item Price: $%.2f\\n", itemPrice);
    printf("Discount (10%%): -$%.2f\\n", discountAmount);
    printf("After Discount: $%.2f\\n", priceAfterDiscount);
    printf("Tax (18%%): +$%.2f\\n", taxAmount);
    printf("Final Price: $%.2f\\n", finalPrice);
    
    return 0;
}`,
            output: `Item Price: $100.00
Discount (10%): -$10.00
After Discount: $90.00
Tax (18%): +$16.20
Final Price: $106.20`,
            practiceProblem: "Write a program to calculate rectangle area and perimeter given length=10.5 and width=7.3 (use float, display with 2 decimals)",
            practiceProblemId: 2007,
            keyPoints: ["Use descriptive names for real-world quantities", "Break complex calculations into steps", "Use appropriate data types for measurements"],
            commonMistakes: ["Integer division when decimals needed", "Not using float for money calculations", "Forgetting to store intermediate results"],
            summary: ["Variables model real-world data and quantities", "Use appropriate types: int for counts, float for measurements", "Store intermediate calculations for clarity"],
            order: 7
        },
        "2.8": {
            title: "C Data Types",
            purpose: "Understand the different categories of data types available in C",
            definition: "Data types specify what kind of data a variable can store and how much memory it occupies",
            why: "Choosing the right data type ensures correct behavior and efficient memory usage",
            keyConcepts: ["Basic types", "Type sizes", "Value ranges", "Memory efficiency"],
            syntax: `int age = 25;              // Whole numbers
float price = 99.99;       // Decimal numbers
char grade = 'A';          // Single characters
double pi = 3.14159265;    // High precision decimals
_Bool flag = 1;            // True/false (0 or 1)`,
            syntaxExplanation: [
                "`int`: Whole numbers, typically 4 bytes (-2B to +2B range)",
                "`float`: Decimals, 4 bytes (~6-7 digit precision)",
                "`char`: Single character, 1 byte (ASCII values 0-255)",
                "`double`: High precision decimals, 8 bytes (~15 digits)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int students = 100;
    float average = 85.567;
    char grade = 'A';
    double precisePi = 3.14159265358979;
    
    printf("Students: %d\\n", students);
    printf("Average: %.2f\\n", average);
    printf("Grade: %c\\n", grade);
    printf("Pi (10 decimals): %.10f\\n", precisePi);
    
    // Size of each type
    printf("\\nSize of int: %lu bytes\\n", sizeof(int));
    printf("Size of float: %lu bytes\\n", sizeof(float));
    printf("Size of char: %lu bytes\\n", sizeof(char));
    printf("Size of double: %lu bytes\\n", sizeof(double));
    
    return 0;
}`,
            output: `Students: 100
Average: 85.57
Grade: A
Pi (10 decimals): 3.1415926536

Size of int: 4 bytes
Size of float: 4 bytes
Size of char: 1 bytes
Size of double: 8 bytes`,
            practiceProblem: "Write a program declaring one variable of each basic type (int, float, char, double) with example values and display all using correct format specifiers",
            practiceProblemId: 2008,
            keyPoints: ["int for whole numbers and counting", "float for decimals and measurements", "char for single letters/symbols", "double for scientific calculations"],
            commonMistakes: ["Using int when decimals are needed", "Wasting memory with double for simple decimals", "Overflow by exceeding type's range"],
            summary: ["C provides multiple data types for different needs", "Each type has specific size and value range", "Choose type based on data requirements"],
            order: 8
        },
        "2.9": {
            title: "Numbers",
            purpose: "Work effectively with numeric data types in C",
            definition: "Numeric types include integers (whole numbers) and floating-point (decimal numbers) for mathematical operations",
            why: "Almost all programs involve numeric calculations, counting, or measurements",
            keyConcepts: ["Integer arithmetic", "Floating-point precision", "Type ranges", "Division behavior"],
            syntax: `// Integer types
int count = 42;
short small = 100;
long big = 1000000L;

// Floating-point types
float decimal = 3.14f;
double precise = 2.718281828;`,
            syntaxExplanation: [
                "`int`: Standard integer, good for most whole numbers",
                "`float`: Decimal numbers with ~6-7 digits precision",
                "`double`: Decimal numbers with ~15 digits precision",
                "Use `f` suffix for float literals, `L` for long literals"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int students = 30;
    float avgScore = 78.567;
    double pi = 3.141592653589793;
    
    // Integer division vs float division
    int a = 7, b = 2;
    int intResult = a / b;           // Integer division
    float floatResult = (float)a / b;  // Float division
    
    printf("Students: %d\\n", students);
    printf("Average Score: %.2f\\n", avgScore);
    printf("Pi (15 decimals): %.15f\\n", pi);
    printf("\\n%d / %d (int) = %d\\n", a, b, intResult);
    printf("%d / %d (float) = %.2f\\n", a, b, floatResult);
    
    return 0;
}`,
            output: `Students: 30
Average Score: 78.57
Pi (15 decimals): 3.141592653589793

7 / 2 (int) = 3
7 / 2 (float) = 3.50`,
            practiceProblem: "Write a program to calculate compound interest: principal=1000, rate=5.5%, time=3 years (A = P(1 + r/100)^t), display result with 2 decimals",
            practiceProblemId: 2009,
            keyPoints: ["Use int for counting and whole numbers", "Use float/double for measurements and calculations", "Watch for integer division losing decimals"],
            commonMistakes: ["Integer division when float needed (7/2 = 3)", "Comparing floats with == (precision errors)", "Overflow when number exceeds type range"],
            summary: ["int for whole numbers, float/double for decimals", "Integer division truncates decimal part", "Choose precision based on calculation needs"],
            order: 9
        },
        "2.10": {
            title: "Characters",
            purpose: "Work with the char data type for storing single characters",
            definition: "The char type stores a single character and is represented internally as an integer (ASCII value)",
            why: "Characters are fundamental for text processing, user input, and string building",
            keyConcepts: ["char type", "ASCII values", "Character literals", "Character operations"],
            syntax: `char letter = 'A';         // Letter
char digit = '5';          // Digit character
char symbol = '$';         // Symbol
char newline = '\\n';      // Escape sequence`,
            syntaxExplanation: [
                "`char letter = 'A';`: Store single character using single quotes",
                "Characters stored as numbers (ASCII): 'A' = 65, 'a' = 97",
                "Can perform arithmetic: 'A' + 1 = 'B'"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    char first = 'J';
    char middle = 'K';
    char last = 'R';
    
    printf("Initials: %c.%c.%c.\\n", first, middle, last);
    
    // Character arithmetic
    char letter = 'A';
    printf("Letter: %c\\n", letter);
    printf("ASCII value: %d\\n", letter);
    printf("Next letter: %c\\n", letter + 1);
    
    // Upper to lower case
    char upper = 'M';
    char lower = upper + 32;  // Difference between upper and lower in ASCII
    printf("Uppercase: %c, Lowercase: %c\\n", upper, lower);
    
    return 0;
}`,
            output: `Initials: J.K.R.
Letter: A
ASCII value: 65
Next letter: B
Uppercase: M, Lowercase: m`,
            practiceProblem: "Write a program to store first letter of each word in your full name (3 char variables) and display as initials with periods",
            practiceProblemId: 2010,
            keyPoints: ["Use single quotes for char literals", "Double quotes are for strings, not char", "Can print as %c (character) or %d (ASCII value)"],
            commonMistakes: ["Using double quotes instead of single", "Trying to store multiple characters in char", "Confusing char with string"],
            summary: ["char stores single character (1 byte)", "Characters are stored as ASCII numbers internally", "Use single quotes for character literals"],
            order: 10
        },
        "2.11": {
            title: "Decimal Precision",
            purpose: "Control the number of decimal places displayed in floating-point output",
            definition: "Precision control in printf() allows specifying exactly how many decimal digits to show",
            why: "Essential for displaying money, measurements, and scientific data with appropriate accuracy",
            keyConcepts: ["Format precision", "Rounding", "Display control", "Decimal places"],
            syntax: `float pi = 3.14159265;

printf("%.2f", pi);   // 3.14 (2 decimals)
printf("%.5f", pi);   // 3.14159 (5 decimals)
printf("%f", pi);     // 3.141593 (default 6)`,
            syntaxExplanation: [
                "`%.2f`: Display exactly 2 decimal places (rounds if needed)",
                "`%.5f`: Display exactly 5 decimal places",
                "Default `%f` shows 6 decimal places"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    float price = 19.99567;
    double pi = 3.14159265358979;
    
    printf("Price variations:\\n");
    printf("1 decimal:  $%.1f\\n", price);
    printf("2 decimals: $%.2f\\n", price);
    printf("3 decimals: $%.3f\\n", price);
    
    printf("\\nPi variations:\\n");
    printf("2 decimals: %.2f\\n", pi);
    printf("5 decimals: %.5f\\n", pi);
    printf("10 decimals: %.10f\\n", pi);
    printf("Default: %f\\n", pi);
    
    return 0;
}`,
            output: `Price variations:
1 decimal:  $20.0
2 decimals: $20.00
3 decimals: $20.000

Pi variations:
2 decimals: 3.14
5 decimals: 3.14159
10 decimals: 3.1415926536
Default: 3.141593`,
            practiceProblem: "Write a program with a float number 123.456789 and display it with 1, 2, 3, 4, and 5 decimal places in separate lines",
            practiceProblemId: 2011,
            keyPoints: ["%.2f is standard for money (2 decimals)", "Precision only affects display, not stored value", "Automatically rounds when reducing decimals"],
            commonMistakes: ["Thinking precision changes the actual value", "Not using precision for monetary amounts", "Confusing precision with accuracy"],
            summary: ["Use %.nf to control decimal places in output", "Common: %.2f for money, %.1f for simple measurements", "Only affects display, not the stored value"],
            order: 11
        },
        "2.12": {
            title: "Memory Size",
            purpose: "Understand how much memory different data types occupy",
            definition: "Each data type occupies a specific number of bytes in memory, affecting storage capacity and range",
            why: "Understanding memory usage is crucial for optimization and avoiding overflow errors",
            keyConcepts: ["sizeof operator", "Type sizes", "Memory efficiency", "Platform variations"],
            syntax: `sizeof(int)       // Returns size in bytes
sizeof(char)      // Always 1 byte
sizeof(float)     // Typically 4 bytes
sizeof(double)    // Typically 8 bytes`,
            syntaxExplanation: [
                "`sizeof(type)`: Returns memory size in bytes",
                "`sizeof(variable)`: Returns size of variable's type",
                "Sizes may vary between systems (32-bit vs 64-bit)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int num = 100;
    float price = 99.99;
    char letter = 'A';
    double pi = 3.14159;
    
    printf("Type Sizes (in bytes):\\n");
    printf("==================\\n");
    printf("char:   %lu byte(s)\\n", sizeof(char));
    printf("int:    %lu byte(s)\\n", sizeof(int));
    printf("float:  %lu byte(s)\\n", sizeof(float));
    printf("double: %lu byte(s)\\n", sizeof(double));
    
    printf("\\nVariable Sizes:\\n");
    printf("num:    %lu byte(s)\\n", sizeof(num));
    printf("price:  %lu byte(s)\\n", sizeof(price));
    printf("letter: %lu byte(s)\\n", sizeof(letter));
    printf("pi:     %lu byte(s)\\n", sizeof(pi));
    
    return 0;
}`,
            output: `Type Sizes (in bytes):
==================
char:   1 byte(s)
int:    4 byte(s)
float:  4 byte(s)
double: 8 byte(s)

Variable Sizes:
num:    4 byte(s)
price:  4 byte(s)
letter: 1 byte(s)
pi:     8 byte(s)`,
            practiceProblem: "Write a program to find and display sizes of: char, short, int, long, float, double using sizeof() operator",
            practiceProblemId: 2012,
            keyPoints: ["sizeof() is compile-time operator", "char is always 1 byte", "Sizes may differ on different systems"],
            commonMistakes: ["Assuming sizes are same on all systems", "Not considering memory in large arrays", "Ignoring memory constraints in embedded systems"],
            summary: ["sizeof() operator returns memory size in bytes", "Typical sizes: char=1, int=4, float=4, double=8", "Sizes can vary by platform and compiler"],
            order: 12
        },
        "2.13": {
            title: "Extended Types",
            purpose: "Learn about type modifiers that extend the range of basic types",
            definition: "Modifiers like short, long, and unsigned change the size and range of integer types",
            why: "Extended types provide fine control over memory usage and value ranges",
            keyConcepts: ["Type modifiers", "Range extension", "Memory optimization", "Signed vs unsigned"],
            syntax: `short num = 100;              // Smaller int (2 bytes)
long bigNum = 1000000L;       // Larger int (8 bytes)
unsigned int count = 500;     // Only positive (0 to 4B)
long long huge = 9223372036854775807LL;`,
            syntaxExplanation: [
                "`short`: Smaller range, saves memory (typically 2 bytes)",
                "`long`: Larger range for big numbers (typically 8 bytes)",
                "`unsigned`: Only positive, doubles the positive range",
                "`long long`: Very large numbers (typically 8 bytes)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    short smallNum = 100;
    int normalNum = 50000;
    long bigNum = 1234567890L;
    unsigned int positiveOnly = 4000000000U;
    
    printf("short:    %d (size: %lu bytes)\\n", smallNum, sizeof(short));
    printf("int:      %d (size: %lu bytes)\\n", normalNum, sizeof(int));
    printf("long:     %ld (size: %lu bytes)\\n", bigNum, sizeof(long));
    printf("unsigned: %u (size: %lu bytes)\\n", positiveOnly, sizeof(unsigned int));
    
    // Demonstrating unsigned range
    unsigned int maxUnsigned = 4294967295U;
    printf("\\nMax unsigned int: %u\\n", maxUnsigned);
    
    return 0;
}`,
            output: `short:    100 (size: 2 bytes)
int:      50000 (size: 4 bytes)
long:     1234567890 (size: 8 bytes)
unsigned: 4000000000 (size: 4 bytes)

Max unsigned int: 4294967295`,
            practiceProblem: "Write a program comparing short, int, and long by displaying their sizes and example large values",
            practiceProblemId: 2013,
            keyPoints: ["short saves memory for small numbers", "long/long long for very large numbers", "unsigned doubles positive range but can't store negatives"],
            commonMistakes: ["Unsigned overflow (wraps around)", "Not using U/L suffixes for literals", "Using short when range might exceed ±32K"],
            summary: ["Modifiers adjust range and memory usage", "short (smaller), long (larger), unsigned (positive only)", "Choose based on value range requirements"],
            order: 13
        },
        "2.14": {
            title: "C Type Conversion",
            purpose: "Learn to convert between different data types safely and correctly",
            definition: "Type conversion changes a value from one data type to another, either implicitly or explicitly",
            why: "Necessary for mixed-type operations and avoiding precision loss in calculations",
            keyConcepts: ["Implicit conversion", "Explicit casting", "Type promotion", "Precision loss"],
            syntax: `// Explicit casting
int x = (int)3.14;           // 3.14 -> 3
float y = (float)5 / 2;      // 5/2 = 2.5 (not 2)

// Implicit conversion
float z = 5;                 // int 5 -> float 5.0
int a = 3.9;                 // 3.9 -> 3 (truncates)`,
            syntaxExplanation: [
                "`(int)3.14`: Explicitly cast float to int (truncates decimals)",
                "`(float)a / b`: Cast before division to preserve decimals",
                "Implicit: Automatically converts when assigning different types"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    int a = 7, b = 2;
    float result1, result2;
    
    // Integer division problem
    result1 = a / b;              // int/int = int = 3
    printf("Without cast: %.2f\\n", result1);
    
    // Solution: Cast to float
    result2 = (float)a / b;       // float/int = float = 3.5
    printf("With cast: %.2f\\n", result2);
    
    // Explicit conversions
    float pi = 3.14159;
    int truncated = (int)pi;
    printf("\\nFloat %.2f -> int %d\\n", pi, truncated);
    
    // Implicit conversion
    float auto_convert = 5;       // int to float
    printf("Implicit: int 5 -> float %.1f\\n", auto_convert);
    
    return 0;
}`,
            output: `Without cast: 3.00
With cast: 3.50

Float 3.14 -> int 3
Implicit: int 5 -> float 5.0`,
            practiceProblem: "Write a program to calculate percentage: score=75 (int), total=90 (int). Calculate percentage as float with 2 decimals using casting",
            practiceProblemId: 2014,
            keyPoints: ["Cast before division to avoid integer division", "Casting can lose precision (float to int)", "Use explicit casts for clarity"],
            commonMistakes: ["Integer division losing decimals (7/2 = 3)", "Casting after operation instead of before", "Not realizing implicit conversion happens"],
            summary: ["Type conversion allows mixing different types", "Explicit: (type) for manual conversion", "Implicit: automatic when assigning types"],
            order: 14
        },
        "2.15": {
            title: "C Constants",
            purpose: "Create immutable values that cannot be modified after initialization",
            definition: "Constants are declared with 'const' keyword, preventing accidental modification of fixed values",
            why: "Constants protect important values from changes and make code intent clear",
            keyConcepts: ["const keyword", "Immutability", "Read-only values", "Naming conventions"],
            syntax: `const float PI = 3.14159;
const int MAX_STUDENTS = 100;
const char GRADE_A = 'A';

// Error if trying to modify
// PI = 3.14;  // Compile error!`,
            syntaxExplanation: [
                "`const type NAME = value;`: Declares constant that can't change",
                "Must initialize when declaring",
                "Convention: Use UPPERCASE names for constants"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Constants for a circle calculation
    const float PI = 3.14159;
    const float radius = 5.0;
    
    // Calculate area and circumference
    float area = PI * radius * radius;
    float circumference = 2 * PI * radius;
    
    printf("Circle Properties:\\n");
    printf("Radius: %.2f\\n", radius);
    printf("Area: %.2f\\n", area);
    printf("Circumference: %.2f\\n", circumference);
    
    // This would cause error:
    // PI = 3.14;  // Error: assignment of read-only variable
    
    // Common constants
    const int MAX_SIZE = 100;
    const float TAX_RATE = 0.18;
    printf("\\nMax Size: %d\\n", MAX_SIZE);
    printf("Tax Rate: %.0f%%\\n", TAX_RATE * 100);
    
    return 0;
}`,
            output: `Circle Properties:
Radius: 5.00
Area: 78.54
Circumference: 31.42

Max Size: 100
Tax Rate: 18%`,
            practiceProblem: "Write a program using const for rectangle length=10.5 and width=7.2, calculate and display area and perimeter",
            practiceProblemId: 2015,
            keyPoints: ["Use const for values that shouldn't change", "Must initialize immediately", "Compiler prevents accidental modification"],
            commonMistakes: ["Declaring const without initializing", "Trying to modify const variables", "Not using const when values are fixed"],
            summary: ["const makes variables read-only after initialization", "Prevents accidental value changes", "Use UPPERCASE naming convention for constants"],
            order: 15
        }
    };

    console.log("🚀 Populating Properly Formatted Phase 2 Content...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ Updated: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully populated ${count} properly formatted topics for Phase 2!`);
    process.exit(0);
}

populatePhase2Perfect().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
