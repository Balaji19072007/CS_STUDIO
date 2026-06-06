const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function populatePhase4() {
    const courseId = 'c-programming';
    const phaseId = 'phase-4';

    const topics = {
        "4.1": {
            title: "String Basics",
            purpose: "Learn how strings (text) are stored and used in C programs",
            definition: "In C, a string is an array of characters ending with a special null character ('\\0'). Strings are used to store and manipulate text data.",
            why: "Most programs work with text - names, messages, file paths. Understanding strings is essential for user interaction and data processing.",
            keConcepts: ["Character arrays", "Null terminator (\\0)", "String literals", "Memory layout"],
            syntax: `char name[20] = "John";     // String with space for 20 chars
char msg[] = "Hello";        // Size calculated automatically
char str[6] = {'H','e','l','l','o','\\0'};  // Manual initialization`,
            syntaxExplanation: [
                "`char name[20]`: Declares character array (string) with max 19 characters + null terminator",
                "`\"Hello\"`: String literal automatically adds `\\0` at end",
                "`\\0`: Null terminator marks end of string (required)"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // Different ways to create strings
    char name1[20] = "Alice";
    char name2[] = "Bob";
    char name3[6] = {'J', 'o', 'h', 'n', '\\0'};
    
    printf("Name 1: %s\\n", name1);
    printf("Name 2: %s\\n", name2);
    printf("Name 3: %s\\n", name3);
    
    // String with spaces
    char message[] = "Hello World!";
    printf("\\nMessage: %s\\n", message);
    
    // Accessing individual characters
    printf("First character: %c\\n", message[0]);
    printf("Last character before null: %c\\n", message[11]);
    
    return 0;
}`,
            output: `Name 1: Alice
Name 2: Bob
Name 3: John

Message: Hello World!
First character: H
Last character before null: !`,
            practiceProblem: "Write a program to create 3 strings: yourName, yourCity, yourCountry, and display them in a formatted sentence",
            practiceProblemId: 4001,
            keyPoints: ["Strings are character arrays ending with \\0", "Always reserve space for null terminator", "Use %s to print strings"],
            commonMistakes: ["Forgetting null terminator", "Array too small for string + \\0", "Using %d instead of %s for strings"],
            summary: ["Strings in C are character arrays with \\0 at end", "String literals automatically add null terminator", "Always account for \\0 when sizing arrays"],
            order: 1
        },
        "4.2": {
            title: "String Input/Output",
            purpose: "Learn to read and display strings from user input",
            definition: "String input/output involves reading text from users (scanf, fgets) and displaying it (printf, puts). Each method has different behaviors and use cases.",
            why: "Interactive programs need to get text input from users and display results. Proper input handling prevents security issues and bugs.",
            keyConcepts: ["printf with %s", "scanf limitations", "fgets for safe input", "puts function"],
            syntax: `// Output
printf("Name: %s\\n", str);
puts(str);  // Automatically adds newline

// Input (dangerous - no length check)
scanf("%s", str);

// Input (safe - prevents overflow)
fgets(str, sizeof(str), stdin);`,
            syntaxExplanation: [
                "`printf(\"%s\", str)`: Prints string, you control formatting",
                "`puts(str)`: Prints string and adds newline automatically",
                "`scanf(\"%s\", str)`: Reads until whitespace (DANGEROUS - can overflow)",
                "`fgets(str, size, stdin)`: Safe input, reads up to size-1 characters"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    char name[50];
    char city[50];
    
    // Output examples
    puts("=== String Output Demo ===");
    printf("Using printf: %s\\n", "Hello");
    puts("Using puts: Hello");
    
    // Input with scanf (only works for single words)
    printf("\\nEnter your first name: ");
    scanf("%s", name);
    printf("Hello, %s!\\n", name);
    
    // Clear input buffer
    while(getchar() != '\\n');
    
    // Input with fgets (handles spaces)
    printf("\\nEnter your city: ");
    fgets(city, sizeof(city), stdin);
    
    // Remove newline that fgets adds
    city[strcspn(city, "\\n")] = 0;
    
    printf("You live in: %s\\n", city);
    
    return 0;
}`,
            output: `=== String Output Demo ===
Using printf: Hello
Using puts: Hello

Enter your first name: John
Hello, John!

Enter your city: New York
You live in: New York`,
            practiceProblem: "Write a program to input full name (with spaces) using fgets and display a greeting message",
            practiceProblemId: 4002,
            keyPoints: ["Use printf/puts for output", "fgets is safer than scanf for strings", "scanf stops at whitespace"],
            commonMistakes: ["Using scanf for strings with spaces", "Not checking input buffer", "Forgetting to remove newline from fgets"],
            summary: ["printf and puts display strings", "scanf reads single words only", "fgets is safe for multi-word input"],
            order: 2
        },
        "4.3": {
            title: "String Functions",
            purpose: "Use built-in functions to manipulate strings efficiently",
            definition: "C provides a library (string.h) with functions for common string operations like finding length, copying, concatenating, and comparing strings.",
            why: "String functions save time and prevent errors. They handle complex operations that would be tedious to write manually.",
            keyConcepts: ["strlen", "strcpy", "strcat", "strcmp", "strchr", "strstr"],
            syntax: `#include <string.h>

strlen(str);           // Get length
strcpy(dest, src);     // Copy string
strcat(dest, src);     // Concatenate (append)
strcmp(str1, str2);    // Compare strings
strchr(str, ch);       // Find character
strstr(str, substr);   // Find substring`,
            syntaxExplanation: [
                "`strlen(str)`: Returns number of characters (excluding \\0)",
                "`strcpy(dest, src)`: Copies src string to dest",
                "`strcat(dest, src)`: Appends src to end of dest",
                "`strcmp(str1, str2)`: Returns 0 if equal, <0 if str1<str2, >0 if str1>str2"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[50] = "Hello";
    char str2[50] = "World";
    char str3[100];
    
    // strlen - get length
    printf("Length of '%s': %lu\\n", str1, strlen(str1));
    
    // strcpy - copy string
    strcpy(str3, str1);
    printf("Copied string: %s\\n", str3);
    
    // strcat - concatenate
    strcat(str3, " ");
    strcat(str3, str2);
    printf("Concatenated: %s\\n", str3);
    
    // strcmp - compare
    if (strcmp(str1, str2) == 0) {
        printf("Strings are equal\\n");
    } else {
        printf("Strings are different\\n");
    }
    
    // strchr - find character
    char* pos = strchr(str3, 'W');
    if (pos != NULL) {
        printf("Found 'W' at position: %ld\\n", pos - str3);
    }
    
    // strstr - find substring
    if (strstr(str3, "World") != NULL) {
        printf("Found 'World' in string\\n");
    }
    
    return 0;
}`,
            output: `Length of 'Hello': 5
Copied string: Hello
Concatenated: Hello World
Strings are different
Found 'W' at position: 6
Found 'World' in string`,
            practiceProblem: "Write a program to input two strings, compare them, find their lengths, and create a new string by concatenating them",
            practiceProblemId: 4003,
            keyPoints: ["Always #include <string.h>", "strlen doesn't count \\0", "strcmp returns 0 for equal strings"],
            commonMistakes: ["Forgetting to include string.h", "Destination too small in strcpy/strcat", "Using == instead of strcmp for comparison"],
            summary: ["String functions in string.h simplify string operations", "strlen, strcpy, strcat, strcmp are most common", "Always ensure destination has enough space"],
            order: 3
        },
        "4.4": {
            title: "String Concatenation",
            purpose: "Learn to join multiple strings together into one",
            definition: "String concatenation means combining two or more strings into a single string. In C, this is done using strcat() function or manual character copying.",
            why: "Building dynamic messages, file paths, and formatted output often requires joining strings together.",
            keyConcepts: ["strcat function", "Destination size", "Multiple concatenations", "Manual concatenation"],
            syntax: `char dest[100] = "Hello";
char src[] = " World";

strcat(dest, src);    // dest becomes "Hello World"

// Multiple concatenations
strcat(dest, "!");
strcat(dest, " :)");  // dest becomes "Hello World! :)"`,
            syntaxExplanation: [
                "`strcat(dest, src)`: Appends src to end of dest",
                "Destination must have enough space for both strings + \\0",
                "Returns pointer to destination string",
                "Original src string remains unchanged"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    char fullName[100] = "John";
    char middle[] = " Peter";
    char last[] = " Doe";
    
    printf("First name: %s\\n", fullName);
    
    // Concatenate middle name
    strcat(fullName, middle);
    printf("With middle: %s\\n", fullName);
    
    // Concatenate last name
    strcat(fullName, last);
    printf("Full name: %s\\n\\n", fullName);
    
    // Building a sentence
    char greeting[200] = "Hello";
    strcat(greeting, ", ");
    strcat(greeting, "welcome to");
    strcat(greeting, " C programming");
    strcat(greeting, "!");
    
    printf("Greeting: %s\\n\\n", greeting);
    
    // Practical: Build file path
    char path[100] = "/home/user";
    strcat(path, "/documents");
    strcat(path, "/file.txt");
    printf("File path: %s\\n", path);
    
    return 0;
}`,
            output: `First name: John
With middle: John Peter
Full name: John Peter Doe

Greeting: Hello, welcome to C programming!

File path: /home/user/documents/file.txt`,
            practiceProblem: "Write a program to input first name, last name, and age, then create a sentence: 'Hi, I am [first] [last], [age] years old'",
            practiceProblemId: 4004,
            keyPoints: ["Destination must be large enough", "strcat modifies destination", "Can chain multiple strcat calls"],
            commonMistakes: ["Destination array too small (buffer overflow)", "Trying to concatenate to string literal", "Not accounting for \\0 in size calculation"],
            summary: ["strcat() appends one string to another", "Destination must have sufficient space", "Useful for building dynamic strings"],
            order: 4
        },
        "4.5": {
            title: "String Comparison",
            purpose: "Learn how to properly compare strings for equality and ordering",
            definition: "String comparison checks if strings are equal or determines their alphabetical order. In C, use strcmp() function instead of == operator.",
            why: "Comparing strings is essential for sorting, searching, and validating user input. The == operator doesn't work for strings in C.",
            keyConcepts: ["strcmp function", "Return values", "Case sensitivity", "Alphabetical order"],
            syntax: `#include <string.h>

strcmp(str1, str2);
// Returns 0 if equal
// Returns <0 if str1 comes before str2
// Returns >0 if str1 comes after str2

// Usage
if (strcmp(str1, str2) == 0)
    // Strings are equal`,
            syntaxExplanation: [
                "`strcmp(s1, s2) == 0`: Strings are identical",
                "`strcmp(s1, s2) < 0`: s1 comes before s2 alphabetically",
                "`strcmp(s1, s2) > 0`: s1 comes after s2 alphabetically",
                "Comparison is case-sensitive (A != a)"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    char password[] = "secret123";
    char input[50];
    
    printf("Enter password: ");
    scanf("%s", input);
    
    // Check if passwords match
    if (strcmp(password, input) == 0) {
        printf("Access granted!\\n\\n");
    } else {
        printf("Access denied!\\n\\n");
    }
    
    // Alphabetical comparison
    char name1[] = "Alice";
    char name2[] = "Bob";
    char name3[] = "Alice";
    
    printf("Comparing '%s' and '%s': %d\\n", name1, name2, strcmp(name1, name2));
    printf("Comparing '%s' and '%s': %d\\n", name1, name3, strcmp(name1, name3));
    printf("Comparing '%s' and '%s': %d\\n", name2, name1, strcmp(name2, name1));
    
    // Sorting example
    if (strcmp(name1, name2) < 0) {
        printf("\\n%s comes before %s\\n", name1, name2);
    } else {
        printf("\\n%s comes before %s\\n", name2, name1);
    }
    
    return 0;
}`,
            output: `Enter password: secret123
Access granted!

Comparing 'Alice' and 'Bob': -1
Comparing 'Alice' and 'Alice': 0
Comparing 'Bob' and 'Alice': 1

Alice comes before Bob`,
            practiceProblem: "Write a program to compare two words entered by user and tell which comes first alphabetically or if they are same",
            practiceProblemId: 4005,
            keyPoints: ["Use strcmp, not == to compare strings", "Returns 0 for equal strings", "Case-sensitive comparison"],
            commonMistakes: ["Using == instead of strcmp", "Expecting true/false instead of 0/<0/>0", "Forgetting case-sensitivity"],
            summary: ["strcmp() compares strings in C", "Returns 0 if equal, <0 or >0 for ordering", "Never use == to compare strings"],
            order: 5
        },
        "4.6": {
            title: "Character Arrays vs Strings",
            purpose: "Understand the relationship between character arrays and strings",
            definition: "A string is a special type of character array that ends with null terminator ('\\0'). All strings are character arrays, but not all character arrays are valid strings.",
            why: "Understanding this distinction prevents common bugs like missing null terminators and helps you work with both text and binary data.",
            keyConcepts: ["Null terminator requirement", "Array vs string", "String functions need \\0", "Memory representation"],
            syntax: `// Valid string (has \\0)
char str[] = "Hello";           // Automatic \\0
char str2[6] = {'H','e','l','l','o','\\0'};

// Character array (NOT a string)
char chars[5] = {'H','e','l','l','o'};  // Missing \\0
// Can't use string functions safely`,
            syntaxExplanation: [
                "String = character array + null terminator (\\0)",
                "String functions (strlen, printf %s) require \\0 to find the end",
                "Character array without \\0 is not a valid string",
                "Manual arrays need explicit \\0 at end"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    // Valid string (has null terminator)
    char validString[] = "Hello";
    printf("Valid string: %s\\n", validString);
    printf("Length: %lu\\n\\n", strlen(validString));
    
    // Character array initializedas string
    char alsoValid[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};
    printf("Also valid: %s\\n", alsoValid);
    printf("Length: %lu\\n\\n", strlen(alsoValid));
    
    // Character array WITHOUT null terminator (NOT a string)
    char notString[5] = {'H', 'e', 'l', 'l', 'o'};
    
    // Unsafe - strlen and printf will read past array!
    printf("Printing as characters:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%c", notString[i]);
    }
    printf("\\n\\n");
    
    // Showing memory layout
    printf("Memory layout of 'Hello':\\n");
    for (int i = 0; i <= 5; i++) {
        printf("Index %d: '%c' (ASCII: %d)\\n", 
               i, validString[i], validString[i]);
    }
    
    return 0;
}`,
            output: `Valid string: Hello
Length: 5

Also valid: Hello
Length: 5

Printing as characters:
Hello

Memory layout of 'Hello':
Index 0: 'H' (ASCII: 72)
Index 1: 'e' (ASCII: 101)
Index 2: 'l' (ASCII: 108)
Index 3: 'l' (ASCII: 108)
Index 4: 'o' (ASCII: 111)
Index 5: '' (ASCII: 0)`,
            practiceProblem: "Write a program showing the difference: create a proper string and a char array without \\0, display both safely",
            practiceProblemId: 4006,
            keyPoints: ["Strings MUST have \\0 at end", "String literals add \\0 automatically", "Character arrays can exist without \\0"],
            commonMistakes: ["Forgetting \\0 when manually initializing", "Array size too small to include \\0", "Using string functions on arrays without \\0"],
            summary: ["Strings are character arrays ending with \\0", "\\0 tells string functions where string ends", "Always ensure space for null terminator"],
            order: 6
        }
    };

    console.log("🚀 Populating Phase 4: C Strings...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully populated ${count} topics for Phase 4!`);
    process.exit(0);
}

populatePhase4().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
