const { db } = require('./config/firebase');
const { doc, setDoc, collection, getDocs } = require('firebase/firestore');

// Phase 2 Content Generator: Variables & Data Handling
const phase2Content = {
    "C Variables": {
        purpose: "To understand how to store and manipulate data in C programs using variables",
        definition: "A variable is a named storage location in computer memory that holds a value which can be changed during program execution. Each variable has a specific data type that determines what kind of data it can store.",
        why: "Variables are fundamental to programming as they allow programs to be dynamic, store user input, perform calculations, and maintain state. Without variables, programs would only perform fixed operations.",
        keyConcepts: [
            "Variables must be declared before use",
            "Each variable has a data type (int, float, char, etc.)",
            "Variables are stored in memory at specific addresses",
            "Variable names are case-sensitive",
            "Good naming improves code readability"
        ],
        syntax: "data_type variable_name = initial_value;\\n\\nExamples:\\nint age = 25;\\nfloat price = 19.99;\\nchar grade = 'A';",
        exampleProgram: "#include <stdio.h>\\n\\nint main() {\\n    // Declare and initialize variables\\n    int studentAge = 20;\\n    float gpa = 3.75;\\n    char grade = 'A';\\n    \\n    // Display values\\n    printf(\"Student Age: %d\\\\n\", studentAge);\\n    printf(\"GPA: %.2f\\\\n\", gpa);\\n    printf(\"Grade: %c\\\\n\", grade);\\n    \\n    return 0;\\n}",
        challengeTime: "Create a program that stores and displays your personal information: name (string), age (int), height in meters (float), and favorite letter (char).",
        keypoints: [
            "Always initialize variables before using them",
            "Choose meaningful variable names",
            "Use appropriate data types for different kinds of data",
            "Variables must be declared in C before use (unlike Python)",
            "Memory is allocated when variables are declared"
        ],
        commonMistakes: [
            "Forgetting to declare a variable before using it",
            "Using variables without initialization (contains garbage values)",
            "Incorrect data type selection (e.g., using int for decimal numbers)",
            "Naming variables with reserved keywords",
            "Not matching format specifiers with variable types in printf"
        ],
        summary: "Variables are essential containers for storing data in C programs. They must be declared with a specific data type before use, and proper naming conventions improve code readability and maintainability."
    },

    "Create Variables": {
        purpose: "To learn the syntax and best practices for creating variables in C",
        definition: "Creating a variable involves declaring its data type and name, optionally initializing it with a value. This process allocates memory and establishes how the data will be stored and accessed.",
        why: "Understanding variable creation is crucial for writing any C program. Proper variable creation ensures type safety, prevents errors, and makes code more maintainable.",
        keyConcepts: [
            "Declaration syntax: type name;",
            "Initialization syntax: type name = value;",
            "Can declare multiple variables in one line",
            "Uninitialized variables contain garbage values",
            "Local vs global variable creation"
        ],
        syntax: "// Single declaration\\nint count;\\n\\n// Declaration with initialization\\nint count = 0;\\n\\n// Multiple declarations\\nint a, b, c;\\n\\n// Multiple with initialization\\nint x = 5, y = 10, z = 15;",
        exampleProgram: "#include <stdio.h>\\n\\nint main() {\\n    // Different ways to create variables\\n    int a;              // Declaration only\\n    int b = 10;         // Declaration + initialization\\n    int c = 20, d = 30; // Multiple variables\\n    \\n    a = 5;  // Assignment after declaration\\n    \\n    printf(\"a = %d\\\\n\", a);\\n    printf(\"b = %d\\\\n\", b);\\n    printf(\"c = %d, d = %d\\\\n\", c, d);\\n    \\n    return 0;\\n}",
        challengeTime: "Create a program with 5 different integer variables: declare 2 without initialization, 2 with initialization, and 1 using multiple declaration. Then assign values and print all of them.",
        keypoints: [
            "Always initialize variables or assign before reading",
            "Declaration allocates memory, initialization sets a value",
            "Can combine declaration and initialization for clarity",
            "Multiple declaration saves lines but may reduce readability",
            "Variables created inside functions are local to that function"
        ],
        commonMistakes: [
            "Reading uninitialized variables (undefined behavior)",
            "Forgetting semicolon after declaration",
            "Mixing data types in multiple declaration",
            "Using undeclared variables",
            "Declaring same variable name twice in same scope"
        ],
        summary: "Variable creation in C requires explicit type declaration. While you can declare variables without initialization, it's best practice to initialize them to avoid undefined behavior from garbage values."
    },

    "Variable Names": {
        purpose: "To learn the rules and conventions for naming variables in C programming",
        definition: "Variable naming is the process of choosing identifiers for variables following C language rules and best practices. Good names make code self-documenting and easier to understand.",
        why: "Proper variable naming is crucial for code readability, maintenance, and collaboration. Well-named variables serve as inline documentation and reduce the need for comments.",
        keyConcepts: [
            "Must start with letter or underscore",
            "Can contain letters, digits, underscores",
            "Case-sensitive (age != Age)",
            "Cannot use reserved keywords",
            "Convention: use camelCase or snake_case"
        ],
        syntax: "// Valid names\\nint age;\\nint studentCount;\\nint total_marks;\\nint _privateVar;\\nint value2;\\n\\n// Invalid names\\n// int 2value;     // starts with digit\\n// int int;        // reserved keyword\\n// int my-var;     // contains hyphen\\n// int my var;     // contains space",
        exampleProgram: "#include <stdio.h>\\n\\nint main() {\\n    // Good variable names\\n    int studentAge = 18;\\n    float averageScore = 85.5;\\n    int totalStudents = 30;\\n    char firstInitial = 'J';\\n    \\n    // Less clear names (avoid)\\n    int a = 18;      // What does 'a' represent?\\n    float x = 85.5;  // Not descriptive\\n    \\n    printf(\"Student Age: %d\\\\n\", studentAge);\\n    printf(\"Average Score: %.1f\\\\n\", averageScore);\\n    printf(\"Total Students: %d\\\\n\", totalStudents);\\n    \\n    return 0;\\n}",
        challengeTime: "Create a program with variables for a product: use meaningful names for product ID, price, quantity in stock, and discount percentage. Print all values with labels.",
        keypoints: [
            "Use descriptive names that explain purpose",
            "Follow consistent naming convention throughout code",
            "Avoid single-letter names except for loop counters",
            "Use camelCase or snake_case consistently",
            "Longer names are okay if they improve clarity"
        ],
        commonMistakes: [
            "Using single letters for important variables",
            "Starting names with digits",
            "Using reserved keywords as names",
            "Inconsistent naming convention in same program",
            "Using confusing abbreviations"
        ],
        summary: "Variable names must follow C syntax rules and should be descriptive and consistent. Good naming practices make code self-documenting and significantly improve code quality and maintainability."
    }
};

// Continue with remaining topics...
module.exports = { phase2Content };
