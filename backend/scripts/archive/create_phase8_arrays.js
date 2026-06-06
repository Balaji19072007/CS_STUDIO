const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function createPhase8ArraysStrings() {
    const courseId = 'c-programming';
    const phaseId = 'phase-8';

    // First, set phase metadata
    const phaseRef = doc(db, 'courses', courseId, 'phases', phaseId);
    await setDoc(phaseRef, {
        title: "Arrays & Strings",
        description: "Master arrays for storing multiple values and strings for text manipulation",
        order: 8
    });

    const topics = {
        "8.1": {
            title: "Array Basics",
            purpose: "Store and access multiple values of the same type in a single variable",
            definition: "An array is a collection of elements of the same data type stored in contiguous memory locations. Arrays allow you to store multiple values under one name and access them using an index.",
            why: "Instead of creating separate variables (num1, num2, num3...), arrays let you store hundreds or thousands of values efficiently in one structure.",
            keyConcepts: ["Array declaration", "Indexing", "Array size", "Contiguous memory", "Zero-based indexing"],
            syntax: `// Declaration
type arrayName[size];

// Initialization
int numbers[5] = {10, 20, 30, 40, 50};

// Access element
value = numbers[0];  // First element
numbers[2] = 100;    // Modify element`,
            syntaxExplanation: [
                "Declare with type, name, and size in square brackets",
                "Index starts at 0 (first element is [0], not [1])",
                "Size must be constant (known at compile time)",
                "Access elements using arrayName[index]"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. Declare and initialize
    int scores[5] = {85, 92, 78, 95, 88};
    
    printf("=== Student Scores ===\\n");
    printf("Score 1: %d\\n", scores[0]);
    printf("Score 2: %d\\n", scores[1]);
    printf("Score 3: %d\\n", scores[2]);
    printf("Score 4: %d\\n", scores[3]);
    printf("Score 5: %d\\n", scores[4]);
    
    // 2. Loop through array
    printf("\\n=== All Scores ===\\n");
    for (int i = 0; i < 5; i++) {
        printf("Student %d: %d\\n", i + 1, scores[i]);
    }
    
    // 3. Modify array elements
    printf("\\n=== After Bonus Points ===\\n");
    for (int i = 0; i < 5; i++) {
        scores[i] += 5;  // Add 5 bonus points
        printf("Student %d: %d\\n", i + 1, scores[i]);
    }
    
    // 4. Calculate sum and average
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    float average = sum / 5.0;
    printf("\\nTotal: %d\\n", sum);
    printf("Average: %.2f\\n", average);
    
    // 5. Find maximum
    int max = scores[0];
    for (int i = 1; i < 5; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    printf("Highest score: %d\\n", max);
    
    return 0;
}`,
            output: `=== Student Scores ===
Score 1: 85
Score 2: 92
Score 3: 78
Score 4: 95
Score 5: 88

=== All Scores ===
Student 1: 85
Student 2: 92
Student 3: 78
Student 4: 95
Student 5: 88

=== After Bonus Points ===
Student 1: 90
Student 2: 97
Student 3: 83
Student 4: 100
Student 5: 93

Total: 463
Average: 92.60
Highest score: 100`,
            practiceProblem: "Create an array of 10 numbers, calculate sum, average, and find minimum and maximum values",
            practiceProblemId: 8001,
            keyPoints: ["Arrays store multiple values of same type", "Index starts at 0", "Use loops to process arrays"],
            commonMistakes: ["Off-by-one errors (accessing array[size])", "Not initializing array elements", "Using wrong size in loops"],
            summary: ["Arrays store multiple values under one name", "Access elements using zero-based index", "Perfect for storing collections of data"],
            order: 1
        },
        "8.2": {
            title: "Multidimensional Arrays",
            purpose: "Store data in table/matrix format with rows and columns",
            definition: "Multidimensional arrays are arrays of arrays. A 2D array is like a table with rows and columns. Used for matrices, grids, game boards, and tabular data.",
            why: "Real-world data often has multiple dimensions - spreadsheets, game boards, images, matrices. 2D arrays represent this naturally.",
            keyConcepts: ["2D arrays", "Rows and columns", "Matrix notation", "Nested loops"],
            syntax: `// 2D Array declaration
type arrayName[rows][columns];

// Initialization
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access element
value = matrix[row][column];`,
            syntaxExplanation: [
                "First index is row, second is column",
                "Initialize with nested braces for each row",
                "Access: matrix[i][j] means element at row i, column j",
                "Use nested loops to process 2D arrays"
            ],
            exampleCode: `#include <stdio.h>

int main() {
    // 1. 2D Array - Multiplication table
    int table[5][5];
    
    printf("=== Multiplication Table ===\\n");
    printf("     ");
    for (int j = 1; j <= 5; j++) {
        printf("%4d", j);
    }
    printf("\\n   ");
    for (int j = 0; j < 20; j++) printf("-");
    printf("\\n");
    
    // Fill and display
    for (int i = 1; i <= 5; i++) {
        printf("%2d | ", i);
        for (int j = 1; j <= 5; j++) {
            table[i-1][j-1] = i * j;
            printf("%4d", table[i-1][j-1]);
        }
        printf("\\n");
    }
    
    // 2. Student grades (3 students, 4 subjects)
    int grades[3][4] = {
        {85, 90, 78, 92},  // Student 1
        {88, 76, 95, 84},  // Student 2
        {92, 89, 91, 87}   // Student 3
    };
    
    printf("\\n=== Student Grades ===\\n");
    char* subjects[] = {"Math", "Science", "English", "History"};
    
    for (int i = 0; i < 3; i++) {
        printf("Student %d: ", i + 1);
        for (int j = 0; j < 4; j++) {
            printf("%s=%d  ", subjects[j], grades[i][j]);
        }
        
        // Calculate average for this student
        int sum = 0;
        for (int j = 0; j < 4; j++) {
            sum += grades[i][j];
        }
        printf(" | Avg: %.1f", sum / 4.0);
        printf("\\n");
    }
    
    // 3. Matrix operations
    int matrix[2][2] = {{1, 2}, {3, 4}};
    printf("\\n=== Matrix ===\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    
    return 0;
}`,
            output: `=== Multiplication Table ===
        1   2   3   4   5
   --------------------
 1 |    1   2   3   4   5
 2 |    2   4   6   8  10
 3 |    3   6   9  12  15
 4 |    4   8  12  16  20
 5 |    5  10  15  20  25

=== Student Grades ===
Student 1: Math=85  Science=90  English=78  History=92   | Avg: 86.2
Student 2: Math=88  Science=76  English=95  History=84   | Avg: 85.8
Student 3: Math=92  Science=89  English=91  History=87   | Avg: 89.8

=== Matrix ===
1 2 
3 4 `,
            practiceProblem: "Create a 3x3 matrix, fill with user input, then display original matrix and its transpose",
            practiceProblemId: 8002,
            keyPoints: ["2D arrays are arrays of arrays", "Use two indices [row][column]", "Process with nested loops"],
            commonMistakes: ["Confusing row and column order", "Wrong loop bounds", "Not initializing all elements"],
            summary: ["2D arrays store tabular data", "Access with [row][column]", "Use nested loops to process"],
            order: 2
        },
        "8.3": {
            title: "String Basics in C",
            purpose: "Work with text data using character arrays",
            definition: "In C, strings are arrays of characters ending with a null terminator '\\0'. Strings represent text - names, messages, words, sentences.",
            why: "Most programs need to work with text - usernames, messages, file names, etc. Strings are fundamental for text processing.",
            keyConcepts: ["Character arrays", "Null terminator", "String literals", "String initialization"],
            syntax: `// String declaration and initialization
char str1[20] = "Hello";
char str2[] = "World";  // Size determined automatically
char str3[10];

// String literal
printf("%s", "Hello World");

// Null terminator
// "Hi" is actually stored as: 'H' 'i' '\\0'`,
            syntaxExplanation: [
                "Strings are char arrays with '\\0' at end",
                "Double quotes create string literals",
                "Always reserve space for null terminator",
                "Size = number of characters + 1 for '\\0'"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    // 1. String initialization
    char name1[20] = "Alice";
    char name2[] = "Bob";  // Automatic sizing
    char greeting[50] = "Hello, World!";
    
    printf("=== String Display ===\\n");
    printf("Name 1: %s\\n", name1);
    printf("Name 2: %s\\n", name2);
    printf("Greeting: %s\\n", greeting);
    
    // 2. String length
    printf("\\n=== String Length ===\\n");
    printf("Length of '%s': %lu\\n", name1, strlen(name1));
    printf("Length of '%s': %lu\\n", greeting, strlen(greeting));
    
    // 3. Character by character access
    printf("\\n=== Character Access ===\\n");
    char word[] = "HELLO";
    printf("Word: %s\\n", word);
    printf("Characters: ");
    for (int i = 0; i < strlen(word); i++) {
        printf("%c ", word[i]);
    }
    printf("\\n");
    
    // 4. Modifying strings
    char message[30] = "Good Morning";
    printf("\\n=== String Modification ===\\n");
    printf("Original: %s\\n", message);
    
    // Change to uppercase
    for (int i = 0; i < strlen(message); i++) {
        if (message[i] >= 'a' && message[i] <= 'z') {
            message[i] = message[i] - 32;  // Convert to uppercase
        }
    }
    printf("Uppercase: %s\\n", message);
    
    // 5. String input
    char username[50];
    printf("\\n=== String Input ===\\n");
    printf("Enter your name: ");
    scanf("%s", username);  // Note: no & needed for arrays
    printf("Welcome, %s!\\n", username);
    
    return 0;
}`,
            output: `=== String Display ===
Name 1: Alice
Name 2: Bob
Greeting: Hello, World!

=== String Length ===
Length of 'Alice': 5
Length of 'Hello, World!': 13

=== Character Access ===
Word: HELLO
Characters: H E L L O 

=== String Modification ===
Original: Good Morning
Uppercase: GOOD MORNING

=== String Input ===
Enter your name: John
Welcome, John!`,
            practiceProblem: "Write a program to input a string, count vowels and consonants, and display the string in reverse",
            practiceProblemId: 8003,
            keyPoints: ["Strings are char arrays ending with '\\0'", "Use %s to print strings", "strlen() gives length"],
            commonMistakes: ["Forgetting null terminator space", "Buffer overflow (too small array)", "Using = for string copy (won't work)"],
            summary: ["Strings are character arrays with null terminator", "Always account for '\\0' in size", "Use string.h functions for manipulation"],
            order: 3
        },
        "8.4": {
            title: "String Functions",
            purpose: "Use standard library functions for efficient string manipulation",
            definition: "C provides string.h library with functions for common string operations: copying, comparing, concatenating, and searching strings.",
            why: "Writing string operations from scratch is error-prone. Standard functions are tested, optimized, and handle edge cases.",
            keyConcepts: ["string.h library", "strcpy", "strcmp", "strcat", "strlen"],
            syntax: `#include <string.h>

strlen(str)          // String length
strcpy(dest, src)    // Copy string
strcat(dest, src)    // Concatenate strings
strcmp(str1, str2)   // Compare strings
strchr(str, ch)      // Find character
strstr(str, substr)  // Find substring`,
            syntaxExplanation: [
                "`strlen(str)`: Returns number of chars (excluding '\\0')",
                "`strcpy(dest, src)`: Copies src to dest (overwrites dest)",
                "`strcat(dest, src)`: Appends src to end of dest",
                "`strcmp(s1, s2)`: Returns 0 if equal, <0 if s1<s2, >0 if s1>s2"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>

int main() {
    // 1. strlen - String length
    char str1[] = "Hello World";
    printf("=== strlen ===\\n");
    printf("String: '%s'\\n", str1);
    printf("Length: %lu characters\\n", strlen(str1));
    
    // 2. strcpy - Copy string
    char source[] = "Programming";
    char destination[50];
    printf("\\n=== strcpy ===\\n");
    strcpy(destination, source);
    printf("Source: %s\\n", source);
    printf("Destination: %s\\n", destination);
    
    // 3. strcat - Concatenate
    char first[50] = "Hello ";
    char second[] = "World!";
    printf("\\n=== strcat ===\\n");
    printf("First: '%s'\\n", first);
    printf("Second: '%s'\\n", second);
    strcat(first, second);
    printf("After concat: '%s'\\n", first);
    
    // 4. strcmp - Compare
    char pass1[] = "secret123";
    char pass2[] = "secret123";
    char pass3[] = "wrong";
    printf("\\n=== strcmp ===\\n");
    
    if (strcmp(pass1, pass2) == 0) {
        printf("'%s' == '%s' ✓ Match!\\n", pass1, pass2);
    }
    
    if (strcmp(pass1, pass3) != 0) {
        printf("'%s' != '%s' ✗ Different!\\n", pass1, pass3);
    }
    
    // 5. strchr - Find character
    char text[] = "programming";
    printf("\\n=== strchr ===\\n");
    printf("Text: '%s'\\n", text);
    char* result = strchr(text, 'g');
    if (result != NULL) {
        printf("Found 'g' at position: %ld\\n", result - text);
    }
    
    // 6. strstr - Find substring
    char sentence[] = "The quick brown fox";
    printf("\\n=== strstr ===\\n");
    printf("Sentence: '%s'\\n", sentence);
    char* found = strstr(sentence, "brown");
    if (found != NULL) {
        printf("Found 'brown' at position: %ld\\n", found - sentence);
        printf("Substring from there: '%s'\\n", found);
    }
    
    return 0;
}`,
            output: `=== strlen ===
String: 'Hello World'
Length: 11 characters

=== strcpy ===
Source: Programming
Destination: Programming

=== strcat ===
First: 'Hello '
Second: 'World!'
After concat: 'Hello World!'

=== strcmp ===
'secret123' == 'secret123' ✓ Match!
'secret123' != 'wrong' ✗ Different!

=== strchr ===
Text: 'programming'
Found 'g' at position: 3

=== strstr ===
Sentence: 'The quick brown fox'
Found 'brown' at position: 10
Substring from there: 'brown fox'`,
            practiceProblem: "Create a login system: compare username/password, display welcome message by concatenating strings",
            practiceProblemId: 8004,
            keyPoints: ["Use string.h for string operations", "strcmp returns 0 for equal strings", "strcpy and strcat modify destination"],
            commonMistakes: ["Using = to copy strings", "Destination too small for strcat", "Comparing strings with =="],
            summary: ["string.h provides essential string functions", "Use library functions instead of writing from scratch", "Always ensure destination has enough space"],
            order: 4
        }
    };

    console.log("🚀 Creating Phase 8: Arrays & Strings...\n");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content);
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Phase 8: Arrays & Strings created with ${count} topics!`);
    console.log("📊 Course now has proper structure with Arrays & Strings phase");

    process.exit(0);
}

createPhase8ArraysStrings().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
