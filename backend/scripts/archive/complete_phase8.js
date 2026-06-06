const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function completePhase8() {
    const courseId = 'c-programming';
    const phaseId = 'phase-8';

    const topics = {
        "8.5": {
            title: "Array Algorithms",
            purpose: "Master common array operations like searching, sorting, and manipulation",
            definition: "Array algorithms are systematic methods for processing arrays. Common ones include linear search, binary search, bubble sort, and array reversal. These form the foundation of data processing.",
            why: "Real programs constantly search, sort, and manipulate data. Understanding array algorithms is essential for efficient programming.",
            keyConcepts: ["Linear search", "Binary search", "Sorting algorithms", "Array reversal", "Finding min/max"],
            syntax: `// Linear search
for (int i = 0; i < size; i++) {
    if (arr[i] == target) return i;
}

// Bubble sort
for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
        if (arr[j] > arr[j+1]) {
            // Swap
        }
    }
}`,
            syntaxExplanation: [
                "Linear search: check each element sequentially",
                "Binary search: requires sorted array, divides search space",
                "Bubble sort: repeatedly swaps adjacent elements",
                "Always check array bounds"
            ],
            exampleCode: `#include <stdio.h>

// Linear search
int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}

// Find minimum
int findMin(int arr[], int size) {
    int min = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// Reverse array
void reverseArray(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

// Bubble sort
void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int size = 7;
    
    printf("=== Original Array ===\\n");
    printArray(numbers, size);
    
    // Linear search
    printf("\\n=== Linear Search ===\\n");
    int target = 22;
    int index = linearSearch(numbers, size, target);
    if (index != -1) {
        printf("Found %d at index %d\\n", target, index);
    } else {
        printf("%d not found\\n", target);
    }
    
    // Find minimum
    printf("\\n=== Find Minimum ===\\n");
    printf("Minimum value: %d\\n", findMin(numbers, size));
    
    // Reverse array
    printf("\\n=== Reverse Array ===\\n");
    reverseArray(numbers, size);
    printf("Reversed: ");
    printArray(numbers, size);
    
    // Restore and sort
    int numbers2[] = {64, 34, 25, 12, 22, 11, 90};
    printf("\\n=== Bubble Sort ===\\n");
    printf("Before: ");
    printArray(numbers2, size);
    bubbleSort(numbers2, size);
    printf("After:  ");
    printArray(numbers2, size);
    
    return 0;
}`,
            output: `=== Original Array ===
64 34 25 12 22 11 90 

=== Linear Search ===
Found 22 at index 4

=== Find Minimum ===
Minimum value: 11

=== Reverse Array ===
Reversed: 90 11 22 12 25 34 64 

=== Bubble Sort ===
Before: 64 34 25 12 22 11 90 
After:  11 12 22 25 34 64 90 `,
            practiceProblem: "Write functions: (1) find maximum in array, (2) count occurrences of a value, (3) remove duplicates from sorted array",
            practiceProblemId: 8005,
            keyPoints: ["Linear search is simple but slow (O(n))", "Sorting enables faster searching", "Always validate array indices"],
            commonMistakes: ["Off-by-one errors in loops", "Not checking if array is empty", "Forgetting to return search results"],
            summary: ["Array algorithms are fundamental for data processing", "Search and sort are most common operations", "Practice improves problem-solving skills"],
            order: 5
        },
        "8.6": {
            title: "Passing Arrays to Functions",
            purpose: "Learn how arrays are passed to functions and why they behave differently from regular variables",
            definition: "When you pass an array to a function in C, you're actually passing a pointer to the first element. This means functions can modify the original array (pass by reference), unlike normal variables which are copied (pass by value).",
            why: "Understanding array passing is crucial - modifications inside functions affect the original array. You must also pass the size separately since arrays don't carry size information.",
            keyConcepts: ["Array decay", "Pass by reference", "Size parameter", "Modifying original array"],
            syntax: `// Function receiving array
void processArray(int arr[], int size) {
    // Modifications affect original
    arr[0] = 100;
}

// Alternative syntax (equivalent)
void processArray(int* arr, int size) {
    arr[0] = 100;
}

// Calling
int myArray[5] = {1, 2, 3, 4, 5};
processArray(myArray, 5);`,
            syntaxExplanation: [
                "arr[] and *arr are equivalent in function parameters",
                "Array name decays to pointer when passed",
                "Must pass size separately (arrays don't know their size)",
                "Changes inside function affect original array"
            ],
            exampleCode: `#include <stdio.h>

// Function to display array
void displayArray(int arr[], int size) {
    printf("[ ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\\n");
}

// Function to modify array
void doubleValues(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;
    }
}

// Function to calculate sum
int calculateSum(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

// Function to fill array
void fillArray(int arr[], int size, int value) {
    for (int i = 0; i < size; i++) {
        arr[i] = value;
    }
}

// Return multiple values using arrays
void getStats(int arr[], int size, int* max, int* min, float* avg) {
    *max = arr[0];
    *min = arr[0];
    int sum = arr[0];
    
    for (int i = 1; i < size; i++) {
        if (arr[i] > *max) *max = arr[i];
        if (arr[i] < *min) *min = arr[i];
        sum += arr[i];
    }
    *avg = sum / (float)size;
}

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};
    
    printf("=== Display Array ===\\n");
    printf("Original: ");
    displayArray(numbers, 5);
    
    // Modify array
    printf("\\n=== Modify Array ===\\n");
    doubleValues(numbers, 5);
    printf("After doubling: ");
    displayArray(numbers, 5);
    
    // Calculate sum
    printf("\\n=== Calculate Sum ===\\n");
    int sum = calculateSum(numbers, 5);
    printf("Sum: %d\\n", sum);
    
    // Fill array
    printf("\\n=== Fill Array ===\\n");
    fillArray(numbers, 5, 99);
    printf("After filling with 99: ");
    displayArray(numbers, 5);
    
    // Get statistics
    printf("\\n=== Get Statistics ===\\n");
    int scores[] = {85, 92, 78, 95, 88};
    int max, min;
    float avg;
    getStats(scores, 5, &max, &min, &avg);
    printf("Scores: ");
    displayArray(scores, 5);
    printf("Max: %d, Min: %d, Average: %.2f\\n", max, min, avg);
    
    return 0;
}`,
            output: `=== Display Array ===
Original: [ 10 20 30 40 50 ]

=== Modify Array ===
After doubling: [ 20 40 60 80 100 ]

=== Calculate Sum ===
Sum: 300

=== Fill Array ===
After filling with 99: [ 99 99 99 99 99 ]

=== Get Statistics ===
Scores: [ 85 92 78 95 88 ]
Max: 95, Min: 78, Average: 87.60`,
            practiceProblem: "Write function normalizeArray(arr, size) that finds max value and divides all elements by it. Test with array of numbers",
            practiceProblemId: 8006,
            keyPoints: ["Arrays passed by reference (modifications persist)", "Always pass size as separate parameter", "Array name is pointer to first element"],
            commonMistakes: ["Forgetting to pass size", "Trying to return array directly", "Not understanding pass by reference"],
            summary: ["Arrays automatically passed by reference", "Size must be passed separately", "Functions can modify original array"],
            order: 6
        },
        "8.7": {
            title: "String Manipulation Techniques",
            purpose: "Master advanced string operations for real-world text processing",
            definition: "String manipulation includes operations like trimming whitespace, converting case, tokenizing (splitting), and validating input. These are essential for handling user input and text processing.",
            why: "Real programs constantly process text - usernames, commands, file content, user input. Advanced string techniques make your programs robust and user-friendly.",
            keyConcepts: ["String parsing", "Tokenization", "Case conversion", "Input validation", "String trimming"],
            syntax: `#include <string.h>
#include <ctype.h>

// Case conversion
char ch = tolower('A');  // 'a'
char ch2 = toupper('b'); // 'B'

// Tokenization
char* token = strtok(str, " ");

// Character checks
if (isdigit(ch)) { }
if (isalpha(ch)) { }`,
            syntaxExplanation: [
                "ctype.h provides character classification functions",
                "strtok splits string by delimiter",
                "tolower/toupper convert case",
                "isdigit/isalpha check character types"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Convert string to uppercase
void toUpperCase(char str[]) {
    for (int i = 0; str[i] != '\\0'; i++) {
        str[i] = toupper(str[i]);
    }
}

// Convert string to lowercase
void toLowerCase(char str[]) {
    for (int i = 0; str[i] != '\\0'; i++) {
        str[i] = tolower(str[i]);
    }
}

// Count words in string
int countWords(char str[]) {
    int count = 0;
    int inWord = 0;
    
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == ' ' || str[i] == '\\t' || str[i] == '\\n') {
            inWord = 0;
        } else if (inWord == 0) {
            inWord = 1;
            count++;
        }
    }
    return count;
}

// Remove spaces from string
void removeSpaces(char str[]) {
    int i = 0, j = 0;
    while (str[i]) {
        if (str[i] != ' ') {
            str[j++] = str[i];
        }
        i++;
    }
    str[j] = '\\0';
}

// Check if string is palindrome
int isPalindrome(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (tolower(str[i]) != tolower(str[len - 1 - i])) {
            return 0;
        }
    }
    return 1;
}

// Tokenize string
void tokenizeDemo(char str[]) {
    char temp[100];
    strcpy(temp, str);  // strtok modifies string
    
    printf("Tokens: ");
    char* token = strtok(temp, " ");
    while (token != NULL) {
        printf("'%s' ", token);
        token = strtok(NULL, " ");
    }
    printf("\\n");
}

int main() {
    // Case conversion
    char text1[] = "Hello World";
    printf("=== Case Conversion ===\\n");
    printf("Original: %s\\n", text1);
    toUpperCase(text1);
    printf("Uppercase: %s\\n", text1);
    toLowerCase(text1);
    printf("Lowercase: %s\\n", text1);
    
    // Word count
    char sentence[] = "The quick brown fox jumps";
    printf("\\n=== Word Count ===\\n");
    printf("Sentence: %s\\n", sentence);
    printf("Word count: %d\\n", countWords(sentence));
    
    // Remove spaces
    char text2[] = "H e l l o";
    printf("\\n=== Remove Spaces ===\\n");
    printf("Original: '%s'\\n", text2);
    removeSpaces(text2);
    printf("No spaces: '%s'\\n", text2);
    
    // Palindrome check
    printf("\\n=== Palindrome Check ===\\n");
    char word1[] = "radar";
    char word2[] = "hello";
    printf("'%s' is %s\\n", word1, isPalindrome(word1) ? "palindrome" : "not palindrome");
    printf("'%s' is %s\\n", word2, isPalindrome(word2) ? "palindrome" : "not palindrome");
    
    // Tokenization
    printf("\\n=== Tokenization ===\\n");
    char text3[] = "apple banana cherry date";
    printf("Original: %s\\n", text3);
    tokenizeDemo(text3);
    
    return 0;
}`,
            output: `=== Case Conversion ===
Original: Hello World
Uppercase: HELLO WORLD
Lowercase: hello world

=== Word Count ===
Sentence: The quick brown fox jumps
Word count: 5

=== Remove Spaces ===
Original: 'H e l l o'
No spaces: 'Hello'

=== Palindrome Check ===
'radar' is palindrome
'hello' is not palindrome

=== Tokenization ===
Original: apple banana cherry date
Tokens: 'apple' 'banana' 'cherry' 'date' `,
            practiceProblem: "Write function: (1) trim whitespace from both ends, (2) replace all occurrences of character, (3) check if string contains only digits",
            practiceProblemId: 8007,
            keyPoints: ["Use ctype.h for character operations", "strtok modifies original string", "Always null-terminate after manipulation"],
            commonMistakes: ["Modifying string literals", "Not copying before strtok", "Buffer overflow in manipulation"],
            summary: ["String manipulation essential for text processing", "ctype.h provides useful character functions", "Always handle edge cases and validate input"],
            order: 7
        }
    };

    console.log("🚀 Completing Phase 8: Arrays & Strings...\n");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content);
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n✅ Phase 8 completed with ${count} additional topics!`);
    console.log(`📊 Phase 8 now has 7 total topics\n`);

    process.exit(0);
}

completePhase8().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
