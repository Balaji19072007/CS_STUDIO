const { db } = require('./config/firebase');
const { doc, setDoc } = require('firebase/firestore');

async function addPhase4ExtraTopics() {
    const courseId = 'c-programming';
    const phaseId = 'phase-4';

    const topics = {
        "4.7": {
            title: "String Manipulation",
            purpose: "Learn to modify and transform strings programmatically",
            definition: "String manipulation involves changing string contents like reversing, replacing characters, removing spaces, or extracting substrings.",
            why: "Data cleaning, formatting, and text processing require modifying strings. These skills are essential for real-world applications.",
            keyConcepts: ["String reversal", "Character replacement", "Substring extraction", "Whitespace removal"],
            syntax: `// Manual string reversal
for (int i = 0, j = len-1; i < j; i++, j--) {
    char temp = str[i];
    str[i] = str[j];
    str[j] = temp;
}

// Character replacement
str[i] = toupper(str[i]);  // Convert to uppercase`,
            syntaxExplanation: [
                "Swap characters from both ends moving toward center for reversal",
                "Access individual characters with `str[i]` to modify them",
                "Use loops to process each character",
                "`toupper()` and `tolower()` from ctype.h convert case"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char str[100] = "Hello World";
    char original[100];
    strcpy(original, str);
    
    printf("Original: %s\\n\\n", original);
    
    // 1. Reverse string
    int len = strlen(str);
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
    printf("Reversed: %s\\n", str);
    
    // 2. Convert to uppercase
    strcpy(str, original);
    for (int i = 0; str[i] != '\\0'; i++) {
        str[i] = toupper(str[i]);
    }
    printf("Uppercase: %s\\n", str);
    
    // 3. Convert to lowercase
    for (int i = 0; str[i] != '\\0'; i++) {
        str[i] = tolower(str[i]);
    }
    printf("Lowercase: %s\\n", str);
    
    // 4. Replace character
    strcpy(str, original);
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == 'o') {
            str[i] = '*';
        }
    }
    printf("Replace 'o' with '*': %s\\n", str);
    
    return 0;
}`,
            output: `Original: Hello World

Reversed: dlroW olleH
Uppercase: HELLO WORLD
Lowercase: hello world
Replace 'o' with '*': Hell* W*rld`,
            practiceProblem: "Write a program to input a sentence and: (a) reverse it, (b) convert to uppercase, (c) count vowels",
            practiceProblemId: 4007,
            keyPoints: ["Access characters with str[i] to modify", "Use loops to process entire string", "toupper/tolower from ctype.h for case conversion"],
            commonMistakes: ["Modifying string literals (use arrays)", "Off-by-one errors in loops", "Forgetting to include ctype.h"],
            summary: ["Strings can be modified character by character", "Common operations: reverse, case conversion, replacement", "Use loops and character access for manipulation"],
            order: 7
        },
        "4.8": {
            title: "String to Number Conversion",
            purpose: "Convert strings representing numbers into actual numeric values",
            definition: "String to number conversion transforms text like '123' into the integer 123 or '3.14' into the float 3.14. Essential for processing user input and file data.",
            why: "Input from users and files comes as strings. Converting to numbers allows mathematical operations and validations.",
            keyConcepts: ["atoi function", "atof function", "atol function", "Error handling", "Input validation"],
            syntax: `#include <stdlib.h>

int num = atoi(str);        // String to int
double val = atof(str);     // String to double
long lnum = atol(str);      // String to long

// Examples
atoi("123")    → 123
atof("3.14")   → 3.14
atoi("45abc")  → 45 (stops at non-digit)`,
            syntaxExplanation: [
                "`atoi(str)`: Converts string to integer (ASCII to integer)",
                "`atof(str)`: Converts string to double/float",
                "`atol(str)`: Converts string to long integer",
                "Conversion stops at first non-numeric character"
            ],
            exampleCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char numStr[] = "123";
    char floatStr[] = "45.67";
    char mixedStr[] = "89abc";
    
    // String to integer
    int num = atoi(numStr);
    printf("String '%s' to int: %d\\n", numStr, num);
    printf("Double the value: %d\\n\\n", num * 2);
    
    // String to float
    double fnum = atof(floatStr);
    printf("String '%s' to float: %.2f\\n", floatStr, fnum);
    printf("Square the value: %.2f\\n\\n", fnum * fnum);
    
    // Mixed string (stops at letter)
    int mixed = atoi(mixedStr);
    printf("String '%s' to int: %d\\n\\n", mixedStr, mixed);
    
    // Practical: Calculate age from input
    char ageInput[10];
    printf("Enter your age: ");
    scanf("%s", ageInput);
    
    int age = atoi(ageInput);
    int yearsTo100 = 100 - age;
    printf("You have %d years until 100!\\n\\n", yearsTo100);
    
    // Practical: Sum from string
    char num1[] = "50";
    char num2[] = "75";
    int sum = atoi(num1) + atoi(num2);
    printf("%s + %s = %d\\n", num1, num2, sum);
    
    return 0;
}`,
            output: `String '123' to int: 123
Double the value: 246

String '45.67' to float: 45.67
Square the value: 2085.69

String '89abc' to int: 89

Enter your age: 25
You have 75 years until 100!

50 + 75 = 125`,
            practiceProblem: "Write a program to input two numbers as strings, convert them to integers using atoi, and display their sum, difference, and product",
            practiceProblemId: 4008,
            keyPoints: ["atoi for string to integer", "atof for string to float/double", "Returns 0 if string doesn't start with number"],
            commonMistakes: ["Not including stdlib.h", "Expecting error for invalid input (returns 0 instead)", "Forgetting conversion stops at non-digit"],
            summary: ["atoi, atof, atol convert strings to numbers", "Essential for processing text input", "Conversion stops at first non-numeric character"],
            order: 8
        },
        "4.9": {
            title: "Common String Problems",
            purpose: "Solve practical string manipulation challenges",
            definition: "Common string problems include checking palindromes, counting characters, finding substrings, and validating formats. These patterns appear frequently in real applications.",
            why: "Understanding these patterns helps solve real-world problems like data validation, text processing, and algorithm development.",
            keyConcepts: ["Palindrome checking", "Character counting", "Word counting", "String validation"],
            syntax: `// Check if palindrome
int isPalindrome(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len/2; i++) {
        if (str[i] != str[len-1-i])
            return 0;  // Not palindrome
    }
    return 1;  // Is palindrome
}`,
            syntaxExplanation: [
                "Compare characters from both ends moving inward",
                "If any pair doesn't match, not a palindrome",
                "If all pairs match, it's a palindrome",
                "Only need to check half the string"
            ],
            exampleCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char text[] = "Hello World! How are you?";
    printf("Text: %s\\n\\n", text);
    
    // 1. Count vowels
    int vowels = 0;
    for (int i = 0; text[i] != '\\0'; i++) {
        char ch = tolower(text[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || 
            ch == 'o' || ch == 'u') {
            vowels++;
        }
    }
    printf("Number of vowels: %d\\n", vowels);
    
    // 2. Count words (spaces + 1)
    int words = 1;
    for (int i = 0; text[i] != '\\0'; i++) {
        if (text[i] == ' ' && text[i+1] != ' ' && text[i+1] != '\\0') {
            words++;
        }
    }
    printf("Number of words: %d\\n\\n", words);
    
    // 3. Check palindrome
    char word1[] = "radar";
    char word2[] = "hello";
    
    // Check word1
    int len1 = strlen(word1);
    int isPalin1 = 1;
    for (int i = 0; i < len1/2; i++) {
        if (word1[i] != word1[len1-1-i]) {
            isPalin1 = 0;
            break;
        }
    }
    printf("'%s' is palindrome: %s\\n", word1, isPalin1 ? "Yes" : "No");
    
    // Check word2
    int len2 = strlen(word2);
    int isPalin2 = 1;
    for (int i = 0; i < len2/2; i++) {
        if (word2[i] != word2[len2-1-i]) {
            isPalin2 = 0;
            break;
        }
    }
    printf("'%s' is palindrome: %s\\n", word2, isPalin2 ? "Yes" : "No");
    
    return 0;
}`,
            output: `Text: Hello World! How are you?

Number of vowels: 8
Number of words: 4

'radar' is palindrome: Yes
'hello' is palindrome: No`,
            practiceProblem: "Write a program to check if a word is palindrome, count total characters (excluding spaces), and find length of longest word",
            practiceProblemId: 4009,
            keyPoints: ["Use loops to scan string character by character", "Palindrome: compare from both ends", "Count by checking conditions in loop"],
            commonMistakes: ["Not handling case sensitivity for palindrome", "Miscounting words at string boundaries", "Off-by-one errors in loops"],
            summary: ["Common patterns: palindrome, counting, validation", "Use loops and conditionals to process strings", "Build complex solutions from simple operations"],
            order: 9
        }
    };

    console.log("🚀 Adding 3 more topics to Phase 4...");
    let count = 0;

    for (const [topicId, content] of Object.entries(topics)) {
        const topicRef = doc(db, 'courses', courseId, 'phases', phaseId, 'topics', topicId);
        await setDoc(topicRef, content, { merge: true });
        console.log(`✅ ${topicId}: ${content.title}`);
        count++;
    }

    console.log(`\n🎉 Successfully added ${count} topics to Phase 4!`);
    console.log(`📚 Phase 4 now has 9 topics total`);
    process.exit(0);
}

addPhase4ExtraTopics().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});
