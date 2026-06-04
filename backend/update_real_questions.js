const { supabase } = require('./config/supabase');

// ============================================================
// COMPREHENSIVE C PROGRAMMING QUESTION BANK
// Organized by topic area
// ============================================================
const QUESTION_BANK = {
  // Phase 1: Introduction to C Programming
  intro: [
    {
      question_type: 'multiple_choice',
      question_text: 'Who created the C programming language?',
      options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'Linus Torvalds', 'Ken Thompson'],
      correct_index: 0,
      explanation: 'Dennis Ritchie created C at Bell Labs between 1969 and 1973.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the correct file extension for a C source file?',
      options: ['.c', '.cpp', '.cs', '.java'],
      correct_index: 0,
      explanation: 'C source files use the .c extension.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function is the entry point of every C program?',
      options: ['main()', 'start()', 'begin()', 'run()'],
      correct_index: 0,
      explanation: 'Every C program must have a main() function as its entry point.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which header file is needed to use printf() and scanf()?',
      options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<math.h>'],
      correct_index: 0,
      explanation: '<stdio.h> is the standard input/output header that provides printf() and scanf().'
    },
    {
      question_type: 'true_false',
      question_text: 'C is a high-level, object-oriented programming language.',
      correct_answer: false,
      explanation: 'C is a structured procedural language. It is NOT object-oriented.'
    },
    {
      question_type: 'code_output',
      question_text: 'What is the output of the following program?',
      code_snippet: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
      options: ['Hello, World!', 'Hello World', 'hello, world!', 'No output'],
      correct_index: 0,
      explanation: 'printf() prints the string exactly as given.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `return 0;` statement mean at the end of main()?',
      options: ['Program executed successfully', 'Program failed', 'Program restarted', 'No meaning'],
      correct_index: 0,
      explanation: 'By convention, return 0 from main() signals successful program execution to the OS.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which phase converts C source code into machine code?',
      options: ['Compilation', 'Linking', 'Preprocessing', 'Execution'],
      correct_index: 0,
      explanation: 'The compiler translates human-readable C source code into machine code (object files).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the purpose of comments in C?',
      options: ['To explain code for humans; ignored by compiler', 'To speed up the program', 'To declare variables', 'To include libraries'],
      correct_index: 0,
      explanation: 'Comments are ignored by the compiler and are purely for documentation purposes.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How do you write a single-line comment in C?',
      options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '-- This is a comment'],
      correct_index: 0,
      explanation: '// is used for single-line comments. /* */ is for multi-line comments.'
    },
    {
      question_type: 'true_false',
      question_text: 'C programs must be compiled before they can be executed.',
      correct_answer: true,
      explanation: 'C is a compiled language. Source code must be compiled to machine code first.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a preprocessor directive in C?',
      options: ['An instruction processed before compilation (e.g., #include)', 'A function declaration', 'A variable definition', 'A comment style'],
      correct_index: 0,
      explanation: 'Preprocessor directives like #include are processed before the compilation step.'
    },
  ],

  // Phase 2: Data Types and Variables
  datatypes: [
    {
      question_type: 'multiple_choice',
      question_text: 'Which data type is used to store a single character in C?',
      options: ['char', 'string', 'letter', 'character'],
      correct_index: 0,
      explanation: 'The `char` type stores a single character (1 byte).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the size of an `int` on most 32-bit systems?',
      options: ['4 bytes', '2 bytes', '8 bytes', '1 byte'],
      correct_index: 0,
      explanation: 'An int is typically 4 bytes (32 bits) on modern 32-bit and 64-bit systems.'
    },
    {
      question_type: 'code_output',
      question_text: 'What will be printed?',
      code_snippet: `#include <stdio.h>
int main() {
    int x = 10;
    float y = 3.14;
    printf("%d %.2f", x, y);
    return 0;
}`,
      options: ['10 3.14', '10.00 3.14', '10 3', 'Error'],
      correct_index: 0,
      explanation: '%d prints an integer, %.2f prints a float with 2 decimal places.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which of the following is a valid variable name in C?',
      options: ['_myVar', '2myVar', 'my-var', 'my var'],
      correct_index: 0,
      explanation: 'Variable names can start with a letter or underscore, not a digit, and cannot contain spaces or hyphens.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the correct way to declare an integer variable `age` with value 25?',
      options: ['int age = 25;', 'integer age = 25;', 'int age == 25;', 'var age = 25;'],
      correct_index: 0,
      explanation: 'In C, use `int` to declare an integer variable followed by an assignment.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which data type stores decimal numbers with double precision?',
      options: ['double', 'float', 'long', 'decimal'],
      correct_index: 0,
      explanation: '`double` provides double-precision floating point (8 bytes) vs float\'s single precision (4 bytes).'
    },
    {
      question_type: 'true_false',
      question_text: 'In C, you must declare a variable before using it.',
      correct_answer: true,
      explanation: 'C requires variables to be declared (with a type) before they can be used.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `const` keyword do in C?',
      options: ['Makes a variable read-only (its value cannot change)', 'Declares a global variable', 'Allocates memory dynamically', 'Defines a function'],
      correct_index: 0,
      explanation: '`const` makes a variable\'s value immutable after initialization.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What format specifier is used to print a float value?',
      options: ['%f', '%d', '%s', '%c'],
      correct_index: 0,
      explanation: '%f is used to print float values with printf().'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the output of `sizeof(char)` in C?',
      options: ['1', '2', '4', '8'],
      correct_index: 0,
      explanation: 'char is always 1 byte in C, regardless of platform.'
    },
    {
      question_type: 'true_false',
      question_text: 'The `float` type has higher precision than `double`.',
      correct_answer: false,
      explanation: '`double` has higher precision (64-bit) than `float` (32-bit).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is variable scope in C?',
      options: ['The region of code where the variable is accessible', 'The size of the variable in bytes', 'The data type of the variable', 'The initial value of the variable'],
      correct_index: 0,
      explanation: 'Scope defines where in the program a variable can be accessed.'
    },
  ],

  // Phase 3: Operators and Expressions
  operators: [
    {
      question_type: 'multiple_choice',
      question_text: 'What is the result of `10 % 3` in C?',
      options: ['1', '3', '0', '10'],
      correct_index: 0,
      explanation: 'The modulo operator `%` returns the remainder. 10 divided by 3 is 3 remainder 1.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does the following program print?',
      code_snippet: `#include <stdio.h>
int main() {
    int a = 5, b = 2;
    printf("%d %d %d", a+b, a-b, a*b);
    return 0;
}`,
      options: ['7 3 10', '7 2 10', '5 3 10', 'Error'],
      correct_index: 0,
      explanation: '5+2=7, 5-2=3, 5*2=10'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `++` operator do?',
      options: ['Increments a variable by 1', 'Adds 2 to a variable', 'Concatenates strings', 'Multiplies by 2'],
      correct_index: 0,
      explanation: '++ is the increment operator; it adds 1 to the operand.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the difference between `i++` and `++i`?',
      options: ['i++ returns old value then increments; ++i increments then returns new value', 'They are identical', '++i adds 2; i++ adds 1', 'i++ works only in loops'],
      correct_index: 0,
      explanation: 'This is the post-increment vs pre-increment distinction.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which operator is used for logical AND in C?',
      options: ['&&', '||', '&', 'AND'],
      correct_index: 0,
      explanation: '&& is the logical AND operator. & is the bitwise AND operator.'
    },
    {
      question_type: 'code_output',
      question_text: 'What is the output of the following?',
      code_snippet: `#include <stdio.h>
int main() {
    int x = 5;
    printf("%d", x > 3 ? 1 : 0);
    return 0;
}`,
      options: ['1', '0', '5', 'Error'],
      correct_index: 0,
      explanation: 'The ternary operator: since 5 > 3 is true (non-zero), it prints 1.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `a /= 2` mean?',
      options: ['a = a / 2', 'a = 2 / a', 'a = a / 2.0', 'Divide and discard'],
      correct_index: 0,
      explanation: '/= is the compound division assignment operator.'
    },
    {
      question_type: 'true_false',
      question_text: 'In C, the `==` operator is used to compare two values for equality.',
      correct_answer: true,
      explanation: '== is the equality comparison operator. = is the assignment operator.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the result of `!0` in C?',
      options: ['1 (true)', '0 (false)', '-1', 'Undefined'],
      correct_index: 0,
      explanation: 'The logical NOT of 0 (false) is 1 (true).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is integer division? e.g., `7 / 2` in C with int variables',
      options: ['3 (truncates the decimal)', '3.5', '4 (rounds up)', '0'],
      correct_index: 0,
      explanation: 'Integer division truncates the fractional part. 7/2 = 3, not 3.5.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which of the following is a bitwise operator?',
      options: ['& (AND)', '&& (Logical AND)', '== (Equality)', '!= (Not equal)'],
      correct_index: 0,
      explanation: '& is the bitwise AND operator that works on individual bits.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is operator precedence?',
      options: ['The order in which operators are evaluated in an expression', 'The speed of operator execution', 'The type of operand required', 'The number of operands needed'],
      correct_index: 0,
      explanation: 'Precedence determines evaluation order, e.g., * is evaluated before + in 2+3*4.'
    },
  ],

  // Phase 4: Input and Output
  io: [
    {
      question_type: 'multiple_choice',
      question_text: 'What function is used to read input from the user in C?',
      options: ['scanf()', 'read()', 'input()', 'gets()'],
      correct_index: 0,
      explanation: 'scanf() is the standard library function for formatted input.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What format specifier is used to read an integer with scanf()?',
      options: ['%d', '%f', '%s', '%c'],
      correct_index: 0,
      explanation: '%d is used for integer (decimal) input/output.'
    },
    {
      question_type: 'code_output',
      question_text: 'Which of the following correctly reads an integer into variable `n`?',
      code_snippet: `#include <stdio.h>
int main() {
    int n;
    // Which call correctly reads an integer?
    return 0;
}`,
      options: ['scanf("%d", &n);', 'scanf("%d", n);', 'scanf(n);', 'read(n);'],
      correct_index: 0,
      explanation: 'scanf requires the address of the variable (using &) to store the input.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `\\n` represent in a printf() format string?',
      options: ['A newline character', 'A tab character', 'A null terminator', 'A backslash'],
      correct_index: 0,
      explanation: '\\n is an escape sequence that moves the cursor to the next line.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `\\t` represent in a printf() format string?',
      options: ['A horizontal tab', 'A newline', 'A null character', 'A terminal character'],
      correct_index: 0,
      explanation: '\\t is the escape sequence for a horizontal tab character.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the correct way to print the value of a character variable `c`?',
      options: ['printf("%c", c);', 'printf("%d", c);', 'printf("%s", c);', 'printf(c);'],
      correct_index: 0,
      explanation: '%c is the format specifier for printing a single character.'
    },
    {
      question_type: 'true_false',
      question_text: 'You need to pass the address of a variable to scanf() using the & operator.',
      correct_answer: true,
      explanation: 'scanf() needs a pointer (memory address) to store the value it reads.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What format specifier would you use to print a double?',
      options: ['%lf', '%f', '%d', '%D'],
      correct_index: 0,
      explanation: 'Use %lf with scanf for double; printf accepts %f or %lf for double.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `printf("%-10d", 42)` do?',
      options: ['Prints 42 left-aligned in a field 10 chars wide', 'Prints -10 and then 42', 'Prints 42 right-aligned in 10 chars', 'Causes an error'],
      correct_index: 0,
      explanation: 'The - flag causes left-alignment within the specified field width.'
    },
  ],

  // Phase 5: Control Flow - Decision Making
  control_flow: [
    {
      question_type: 'multiple_choice',
      question_text: 'Which keyword is used for conditional branching in C?',
      options: ['if', 'when', 'check', 'condition'],
      correct_index: 0,
      explanation: '`if` is the primary conditional statement in C.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code print?',
      code_snippet: `#include <stdio.h>
int main() {
    int x = 10;
    if (x > 5)
        printf("Greater");
    else
        printf("Smaller");
    return 0;
}`,
      options: ['Greater', 'Smaller', 'Error', 'Nothing'],
      correct_index: 0,
      explanation: '10 > 5 is true, so the if block executes and prints "Greater".'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a `switch` statement used for?',
      options: ['Multi-way branching based on value of an expression', 'Looping a fixed number of times', 'Declaring multiple variables', 'Allocating memory'],
      correct_index: 0,
      explanation: 'switch allows branching to different cases based on the value of an integral expression.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What happens if you forget the `break` in a switch case?',
      options: ['Fall-through: execution continues to the next case', 'The program crashes', 'The compiler gives an error', 'The case is skipped'],
      correct_index: 0,
      explanation: 'Without break, execution "falls through" to the next case.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `default` case in a switch do?',
      options: ['Executes when no other case matches', 'Always executes', 'Executes first', 'Is mandatory'],
      correct_index: 0,
      explanation: '`default` acts as a catch-all when no other case value matches.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code print?',
      code_snippet: `#include <stdio.h>
int main() {
    int a = 5, b = 10;
    if (a > b)
        printf("A");
    else if (a == b)
        printf("Equal");
    else
        printf("B");
    return 0;
}`,
      options: ['B', 'A', 'Equal', 'Error'],
      correct_index: 0,
      explanation: 'a(5) is not greater than b(10), and not equal to b, so else executes: prints B.'
    },
    {
      question_type: 'true_false',
      question_text: 'In C, any non-zero integer value is treated as true in a conditional.',
      correct_answer: true,
      explanation: 'C does not have a boolean type; 0 is false and any non-zero value is true.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a nested if statement?',
      options: ['An if statement inside another if statement', 'An if with multiple conditions', 'An if without an else', 'Two if statements in sequence'],
      correct_index: 0,
      explanation: 'Nested ifs allow checking conditions only when an outer condition is met.'
    },
  ],

  // Phase 6: Control Flow - Loops
  loops: [
    {
      question_type: 'multiple_choice',
      question_text: 'Which loop in C checks the condition AFTER executing the body at least once?',
      options: ['do-while loop', 'while loop', 'for loop', 'None of these'],
      correct_index: 0,
      explanation: 'The do-while loop executes its body at least once before checking the condition.'
    },
    {
      question_type: 'code_output',
      question_text: 'How many times does this loop execute?',
      code_snippet: `#include <stdio.h>
int main() {
    int i;
    for (i = 0; i < 5; i++) {
        printf("%d ", i);
    }
    return 0;
}`,
      options: ['5 times (0 1 2 3 4)', '4 times (1 2 3 4)', '6 times (0 1 2 3 4 5)', '0 times'],
      correct_index: 0,
      explanation: 'The loop runs while i < 5, from i=0 to i=4, which is 5 iterations.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `break` statement do inside a loop?',
      options: ['Immediately exits the innermost loop', 'Skips the current iteration', 'Restarts the loop', 'Pauses execution'],
      correct_index: 0,
      explanation: '`break` exits the innermost loop or switch immediately.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does the `continue` statement do inside a loop?',
      options: ['Skips the remaining code in the current iteration and starts the next', 'Exits the loop', 'Restarts from the beginning', 'Does nothing'],
      correct_index: 0,
      explanation: '`continue` skips the rest of the current loop body and continues to the next iteration.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which is true about a `while` loop?',
      options: ['It checks the condition before each iteration', 'It always executes at least once', 'It requires an initialization expression', 'It cannot use break'],
      correct_index: 0,
      explanation: 'A while loop tests the condition before executing the loop body.'
    },
    {
      question_type: 'code_output',
      question_text: 'What is the output?',
      code_snippet: `#include <stdio.h>
int main() {
    int i = 0;
    while (i < 3) {
        printf("%d ", i);
        i++;
    }
    return 0;
}`,
      options: ['0 1 2', '1 2 3', '0 1 2 3', 'Infinite loop'],
      correct_index: 0,
      explanation: 'Loop runs for i=0, i=1, i=2; stops when i becomes 3 (not < 3).'
    },
    {
      question_type: 'true_false',
      question_text: 'An infinite loop can be created with `for(;;)` in C.',
      correct_answer: true,
      explanation: 'for(;;) creates an infinite loop; all three parts (init, condition, update) are optional.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a nested loop?',
      options: ['A loop inside another loop', 'A loop with multiple conditions', 'A loop that runs once', 'A loop using goto'],
      correct_index: 0,
      explanation: 'Nested loops are loops placed inside the body of another loop.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code output?',
      code_snippet: `#include <stdio.h>
int main() {
    int i = 1;
    do {
        printf("%d ", i);
        i++;
    } while (i <= 3);
    return 0;
}`,
      options: ['1 2 3', '0 1 2', '1 2 3 4', '2 3 4'],
      correct_index: 0,
      explanation: 'do-while prints i then increments; runs for i=1, 2, 3; stops when i becomes 4.'
    },
  ],

  // Phase 7-8: Functions
  functions: [
    {
      question_type: 'multiple_choice',
      question_text: 'What is a function prototype in C?',
      options: ['A declaration of the function before its definition, telling the compiler its name, return type, and parameters', 'The implementation of the function', 'A call to the function', 'A comment describing the function'],
      correct_index: 0,
      explanation: 'A prototype lets the compiler know about a function before it\'s actually defined.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the return type of a function that does NOT return a value?',
      options: ['void', 'null', 'int', '0'],
      correct_index: 0,
      explanation: '`void` indicates the function returns no value.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this program print?',
      code_snippet: `#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    printf("%d", add(3, 4));
    return 0;
}`,
      options: ['7', '34', '3', '4'],
      correct_index: 0,
      explanation: 'add(3, 4) returns 3+4 = 7.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is "pass by value" in C function calls?',
      options: ['A copy of the argument is passed; the original is not modified', 'The original variable is directly modified', 'Only pointers can be passed', 'Values are passed by reference'],
      correct_index: 0,
      explanation: 'By default, C passes arguments by value — the function gets a copy.'
    },
    {
      question_type: 'true_false',
      question_text: 'In C, a function must be declared before it is called (unless a prototype is provided).',
      correct_answer: true,
      explanation: 'The compiler must know about a function before its call site; prototypes satisfy this requirement.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a recursive function?',
      options: ['A function that calls itself', 'A function with no parameters', 'A function returning void', 'A function inside another function'],
      correct_index: 0,
      explanation: 'Recursive functions call themselves to solve problems by breaking them into smaller subproblems.'
    },
    {
      question_type: 'code_output',
      question_text: 'What is the output?',
      code_snippet: `#include <stdio.h>
void greet() {
    printf("Hello!");
}
int main() {
    greet();
    greet();
    return 0;
}`,
      options: ['Hello!Hello!', 'Hello!\nHello!', 'Hello!', 'Error'],
      correct_index: 0,
      explanation: 'greet() is called twice; printf has no newline, so both print together.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the scope of a local variable in C?',
      options: ['Only within the function/block where it is declared', 'Throughout the entire program', 'In the file where it is declared', 'Only in header files'],
      correct_index: 0,
      explanation: 'Local variables exist only within the block (function, loop, if) where they are declared.'
    },
  ],

  // Phase 9-10: Arrays and Strings
  arrays: [
    {
      question_type: 'multiple_choice',
      question_text: 'How do you declare an integer array of size 5 in C?',
      options: ['int arr[5];', 'array int arr[5];', 'int arr = [5];', 'int[5] arr;'],
      correct_index: 0,
      explanation: 'Array declaration syntax: type name[size];'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the index of the first element in a C array?',
      options: ['0', '1', '-1', 'Undefined'],
      correct_index: 0,
      explanation: 'C arrays are zero-indexed; the first element is at index 0.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code print?',
      code_snippet: `#include <stdio.h>
int main() {
    int arr[3] = {10, 20, 30};
    printf("%d %d %d", arr[0], arr[1], arr[2]);
    return 0;
}`,
      options: ['10 20 30', '0 1 2', '30 20 10', 'Error'],
      correct_index: 0,
      explanation: 'arr[0]=10, arr[1]=20, arr[2]=30 — printed in order.'
    },
    {
      question_type: 'true_false',
      question_text: 'In C, accessing an array out of its bounds causes a compile-time error.',
      correct_answer: false,
      explanation: 'C does NOT check bounds at compile or runtime. Out-of-bounds access is undefined behavior (memory corruption).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How do you find the length of an array at compile time?',
      options: ['sizeof(arr) / sizeof(arr[0])', 'arr.length', 'length(arr)', 'strlen(arr)'],
      correct_index: 0,
      explanation: 'sizeof(arr) gives total bytes; dividing by element size gives element count.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How is a string represented in C?',
      options: ['As a char array terminated by a null character \'\\0\'', 'As a string object', 'As an int array', 'As a linked list'],
      correct_index: 0,
      explanation: 'C strings are char arrays ending with the null terminator \'\\0\'.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function returns the length of a string (not including \'\\0\')?',
      options: ['strlen()', 'sizeof()', 'length()', 'strlength()'],
      correct_index: 0,
      explanation: 'strlen() from <string.h> counts characters until the null terminator.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function copies one string to another?',
      options: ['strcpy()', 'strdup()', 'copy()', 'memcpy()'],
      correct_index: 0,
      explanation: 'strcpy(dest, src) copies src into dest, including the null terminator.'
    },
    {
      question_type: 'code_output',
      question_text: 'What is the output?',
      code_snippet: `#include <stdio.h>
#include <string.h>
int main() {
    char s[] = "Hello";
    printf("%lu", strlen(s));
    return 0;
}`,
      options: ['5', '6', '4', '0'],
      correct_index: 0,
      explanation: '"Hello" has 5 characters. strlen does not count the null terminator.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function compares two strings?',
      options: ['strcmp()', 'strcmp()', 'equals()', 'compare()'],
      correct_index: 0,
      explanation: 'strcmp(s1, s2) returns 0 if equal, negative if s1 < s2, positive if s1 > s2.'
    },
  ],

  // Phase 11-12: Pointers
  pointers: [
    {
      question_type: 'multiple_choice',
      question_text: 'What is a pointer in C?',
      options: ['A variable that stores the memory address of another variable', 'A special type of array', 'A function parameter', 'An alias for a variable'],
      correct_index: 0,
      explanation: 'A pointer is a variable holding the address of another variable.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which operator gives the address of a variable?',
      options: ['& (address-of)', '* (dereference)', '-> (arrow)', '. (dot)'],
      correct_index: 0,
      explanation: 'The & (address-of) operator returns the memory address of a variable.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which operator is used to access the value at a pointer\'s address?',
      options: ['* (dereference)', '& (address-of)', '-> (arrow)', '. (dot)'],
      correct_index: 0,
      explanation: 'The * dereference operator accesses the value at the address held by a pointer.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code print?',
      code_snippet: `#include <stdio.h>
int main() {
    int x = 10;
    int *p = &x;
    printf("%d", *p);
    return 0;
}`,
      options: ['10', 'Address of x', '0', 'Error'],
      correct_index: 0,
      explanation: '*p dereferences the pointer to get the value at x\'s address, which is 10.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a NULL pointer?',
      options: ['A pointer that does not point to any valid memory location', 'A pointer to a 0 value', 'An uninitialized pointer', 'A pointer to NULL type'],
      correct_index: 0,
      explanation: 'NULL is a special value (0) for pointers indicating they point to nothing.'
    },
    {
      question_type: 'true_false',
      question_text: 'Pointer arithmetic in C automatically adjusts by the size of the data type pointed to.',
      correct_answer: true,
      explanation: 'If `int *p`, then `p+1` moves the address by sizeof(int) bytes, not 1 byte.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a double pointer (pointer to pointer)?',
      options: ['A pointer that stores the address of another pointer', 'A pointer to a double type', 'Two pointers to the same variable', 'An invalid concept in C'],
      correct_index: 0,
      explanation: 'int **pp declares pp as a pointer to a pointer to int.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How are arrays and pointers related in C?',
      options: ['An array name acts as a constant pointer to the first element', 'They are completely unrelated', 'Arrays are always 4 bytes', 'Pointers can\'t access arrays'],
      correct_index: 0,
      explanation: 'The array name decays to a pointer to its first element in most expressions.'
    },
  ],

  // Phase 13: Structures and Unions
  structs: [
    {
      question_type: 'multiple_choice',
      question_text: 'What is a `struct` in C?',
      options: ['A user-defined data type that groups variables of different types', 'A built-in integer type', 'A function that structures code', 'A type of loop'],
      correct_index: 0,
      explanation: 'A struct (structure) lets you combine different data types under one name.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How do you access a member of a struct variable (not a pointer)?',
      options: ['. (dot operator)', '-> (arrow operator)', '* (dereference)', '& (address-of)'],
      correct_index: 0,
      explanation: 'Use the dot (.) operator to access struct members directly.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'How do you access a member through a struct pointer?',
      options: ['-> (arrow operator)', '. (dot operator)', '* (dereference)', '& (address-of)'],
      correct_index: 0,
      explanation: 'The arrow (->) operator dereferences the pointer and accesses the member in one step.'
    },
    {
      question_type: 'code_output',
      question_text: 'What does this code print?',
      code_snippet: `#include <stdio.h>
struct Point {
    int x;
    int y;
};
int main() {
    struct Point p = {3, 4};
    printf("%d %d", p.x, p.y);
    return 0;
}`,
      options: ['3 4', '4 3', '0 0', 'Error'],
      correct_index: 0,
      explanation: 'p.x is initialized to 3 and p.y to 4.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the key difference between a `struct` and a `union`?',
      options: ['A union shares memory between all members; struct allocates separate space for each', 'A union can only hold integers', 'They are identical', 'A struct cannot hold chars'],
      correct_index: 0,
      explanation: 'In a union, all members share the SAME memory location. Only one member can hold a value at a time.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is `typedef` commonly used for with structs?',
      options: ['To create an alias so you can use the type without the `struct` keyword', 'To define a template', 'To inherit from a struct', 'To allocate memory for a struct'],
      correct_index: 0,
      explanation: 'typedef struct { ... } Point; lets you write Point instead of struct Point.'
    },
    {
      question_type: 'true_false',
      question_text: 'Structures in C can contain member functions like classes in C++.',
      correct_answer: false,
      explanation: 'C structs can only contain data members. Member functions are a C++ feature.'
    },
  ],

  // Phase 14: Dynamic Memory Allocation
  memory: [
    {
      question_type: 'multiple_choice',
      question_text: 'Which function allocates memory on the heap at runtime?',
      options: ['malloc()', 'alloc()', 'new()', 'calloc()'],
      correct_index: 0,
      explanation: 'malloc(size) allocates `size` bytes from the heap and returns a void pointer.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `calloc()` do differently from `malloc()`?',
      options: ['calloc also initializes all allocated memory to zero', 'calloc is faster', 'calloc allocates on the stack', 'calloc takes one argument instead of two'],
      correct_index: 0,
      explanation: 'calloc(n, size) allocates n*size bytes AND zero-initializes the memory.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function should you call to release heap-allocated memory?',
      options: ['free()', 'delete()', 'release()', 'dealloc()'],
      correct_index: 0,
      explanation: 'free(ptr) returns the memory back to the heap to prevent memory leaks.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a memory leak?',
      options: ['Allocated memory that is never freed, causing wasted resources', 'Reading memory at an invalid address', 'Writing beyond an array boundary', 'Using a NULL pointer'],
      correct_index: 0,
      explanation: 'Memory leaks occur when malloc\'d memory is never free\'d, consuming heap space indefinitely.'
    },
    {
      question_type: 'true_false',
      question_text: 'After calling free(ptr), you should set ptr = NULL to avoid a dangling pointer.',
      correct_answer: true,
      explanation: 'Setting freed pointers to NULL prevents accidentally using them again (dangling pointer bug).'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `realloc()` do?',
      options: ['Resizes a previously allocated memory block', 'Reallocates to a different type', 'Re-initializes to zero', 'Frees old memory and allocates new'],
      correct_index: 0,
      explanation: 'realloc(ptr, newSize) resizes the memory block pointed to by ptr.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What header file must be included to use malloc, calloc, realloc, and free?',
      options: ['<stdlib.h>', '<stdio.h>', '<memory.h>', '<malloc.h>'],
      correct_index: 0,
      explanation: '<stdlib.h> provides the dynamic memory allocation functions.'
    },
  ],

  // Phase 15: File Handling
  files: [
    {
      question_type: 'multiple_choice',
      question_text: 'Which function is used to open a file in C?',
      options: ['fopen()', 'open()', 'fileopen()', 'startfile()'],
      correct_index: 0,
      explanation: 'fopen(filename, mode) opens a file and returns a FILE* pointer.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What mode string opens a file for writing (creating or overwriting)?',
      options: ['"w"', '"r"', '"a"', '"rw"'],
      correct_index: 0,
      explanation: '"w" mode creates the file if it doesn\'t exist or truncates it if it does.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does mode `"a"` do when opening a file?',
      options: ['Opens for appending; adds content at the end without erasing existing data', 'Opens for reading from the start', 'Creates a new empty file', 'Opens as a binary file'],
      correct_index: 0,
      explanation: '"a" (append) mode positions the write pointer at the end of existing content.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function closes an open file in C?',
      options: ['fclose()', 'close()', 'endfile()', 'EOF()'],
      correct_index: 0,
      explanation: 'fclose(fp) closes the file and flushes any buffered data.'
    },
    {
      question_type: 'true_false',
      question_text: 'You should always check if fopen() returned NULL before using the file pointer.',
      correct_answer: true,
      explanation: 'If the file cannot be opened, fopen returns NULL. Using a NULL pointer causes a crash.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'Which function reads a line from a file?',
      options: ['fgets()', 'fscanf()', 'fread()', 'getline()'],
      correct_index: 0,
      explanation: 'fgets(buffer, n, fp) reads up to n-1 chars from the file into buffer.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does EOF stand for?',
      options: ['End Of File', 'End Of Function', 'End Of Format', 'Error On File'],
      correct_index: 0,
      explanation: 'EOF is a special sentinel value returned by I/O functions when the file ends.'
    },
  ],

  // Phase 16-18: Advanced Topics
  advanced: [
    {
      question_type: 'multiple_choice',
      question_text: 'What is a preprocessor macro in C?',
      options: ['A code fragment given a name via #define, substituted before compilation', 'A complex function', 'A type definition', 'An inline assembly block'],
      correct_index: 0,
      explanation: '#define NAME value creates a text-substitution macro processed before compilation.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What does `#ifdef` do?',
      options: ['Conditionally compiles code only if the specified macro is defined', 'Defines an integer variable', 'Includes a file if it exists', 'Checks if a variable is initialized'],
      correct_index: 0,
      explanation: '#ifdef MACRO ... #endif compiles that block only when MACRO has been defined.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a function pointer in C?',
      options: ['A pointer that stores the address of a function', 'A pointer returned by a function', 'A parameter of a function', 'An array of functions'],
      correct_index: 0,
      explanation: 'Function pointers allow functions to be stored in variables and passed as arguments.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a header guard (#ifndef ... #define ... #endif) used for?',
      options: ['Preventing a header file from being included more than once', 'Defining constants', 'Making functions private', 'Enabling optimization'],
      correct_index: 0,
      explanation: 'Include guards prevent multiple inclusion of the same header file in a compilation unit.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the `volatile` keyword used for?',
      options: ['Telling the compiler the variable can change unexpectedly (e.g., by hardware)', 'Making a variable constant', 'Allocating volatile memory', 'Speeding up variable access'],
      correct_index: 0,
      explanation: '`volatile` prevents the compiler from optimizing away accesses to hardware-mapped variables.'
    },
    {
      question_type: 'true_false',
      question_text: 'C supports object-oriented programming features like inheritance and polymorphism natively.',
      correct_answer: false,
      explanation: 'C is a procedural language. OOP is a feature of C++, not C.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is a segmentation fault?',
      options: ['A runtime error caused by accessing memory the program is not allowed to access', 'A compilation error', 'A type mismatch error', 'An integer overflow'],
      correct_index: 0,
      explanation: 'Segfaults occur with null/dangling pointer dereference or out-of-bounds array access.'
    },
    {
      question_type: 'multiple_choice',
      question_text: 'What is the purpose of the `static` keyword for a local variable?',
      options: ['The variable retains its value between function calls', 'The variable becomes a constant', 'The variable is global', 'The variable is stored on the heap'],
      correct_index: 0,
      explanation: '`static` local variables persist across function calls (unlike ordinary local variables).'
    },
  ],
};

// Map phase IDs to question categories
function getQuestionsForPhase(phaseId, title) {
  const phaseNum = parseInt((phaseId.match(/\d+/) || ['0'])[0]);
  const titleLower = (title || '').toLowerCase();
  
  // Select the appropriate question category based on phase number or title
  if (phaseNum === 1 || titleLower.includes('introduction')) return QUESTION_BANK.intro;
  if (phaseNum === 2 || titleLower.includes('data type') || titleLower.includes('variable')) return QUESTION_BANK.datatypes;
  if (phaseNum === 3 || titleLower.includes('operator')) return QUESTION_BANK.operators;
  if (phaseNum === 4 || titleLower.includes('input') || titleLower.includes('output')) return QUESTION_BANK.io;
  if (phaseNum === 5 || titleLower.includes('decision') || titleLower.includes('condition')) return QUESTION_BANK.control_flow;
  if (phaseNum === 6 || titleLower.includes('loop')) return QUESTION_BANK.loops;
  if (phaseNum === 7 || phaseNum === 8 || titleLower.includes('function')) return QUESTION_BANK.functions;
  if (phaseNum === 9 || phaseNum === 10 || titleLower.includes('array') || titleLower.includes('string')) return QUESTION_BANK.arrays;
  if (phaseNum === 11 || phaseNum === 12 || titleLower.includes('pointer')) return QUESTION_BANK.pointers;
  if (phaseNum === 13 || titleLower.includes('struct') || titleLower.includes('union')) return QUESTION_BANK.structs;
  if (phaseNum === 14 || titleLower.includes('memory') || titleLower.includes('dynamic')) return QUESTION_BANK.memory;
  if (phaseNum === 15 || titleLower.includes('file')) return QUESTION_BANK.files;
  
  // For advanced phases, mix questions from multiple banks
  const allAdvanced = [...QUESTION_BANK.advanced, ...QUESTION_BANK.pointers.slice(0, 4), ...QUESTION_BANK.memory.slice(0, 4)];
  return allAdvanced;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(pool, count) {
  const shuffled = shuffle(pool);
  // If not enough, repeat from shuffled pool
  if (shuffled.length >= count) return shuffled.slice(0, count);
  const result = [];
  while (result.length < count) {
    const needed = count - result.length;
    result.push(...shuffled.slice(0, Math.min(needed, shuffled.length)));
  }
  return result;
}

async function run() {
  console.log('🚀 Starting quiz question update...\n');

  // 1. Get all quizzes with phase info
  const { data: quizzes, error: qError } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, phase_id');

  if (qError) throw qError;
  console.log(`Found ${quizzes.length} quizzes total.\n`);

  // 2. Get phases for their titles
  const phaseIds = [...new Set(quizzes.map(q => q.phase_id))];
  const { data: phases } = await supabase
    .from('phases')
    .select('id, title')
    .in('id', phaseIds);

  const phaseMap = {};
  (phases || []).forEach(p => { phaseMap[p.id] = p.title; });

  // 3. Process each quiz
  for (const quiz of quizzes) {
    const phaseTitle = phaseMap[quiz.phase_id] || '';
    console.log(`\nProcessing: ${quiz.title} (Phase: ${phaseTitle})`);

    // First: get all existing question IDs for this quiz
    const { data: existingQs } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    if (existingQs && existingQs.length > 0) {
      const qIds = existingQs.map(q => q.id);

      // Delete user_quiz_answers first (FK constraint: answers reference question IDs)
      await supabase.from('user_quiz_answers').delete().in('question_id', qIds);

      // Now safe to delete questions (cascade will delete quiz_question_options)
      const { error: delError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quiz.id);

      if (delError) {
        console.error('  ❌ Failed to delete old questions:', delError.message);
        continue;
      }
    }

    // Pick questions from appropriate bank
    const pool = getQuestionsForPhase(quiz.phase_id, phaseTitle);
    const numToInsert = Math.min(15, pool.length);
    const selected = pickQuestions(pool, numToInsert);

    let questionCount = 0;
    for (let i = 0; i < selected.length; i++) {
      const q = selected[i];

      // Shuffle options and find the new correct index
      let finalOpts = [];
      let correctAnswerVal;

      if (q.question_type === 'multiple_choice' || q.question_type === 'code_output') {
        const optsObjects = q.options.map((opt, idx) => ({
          option_text: opt,
          is_correct_orig: idx === q.correct_index
        }));
        
        // Shuffle optsObjects
        for (let j = optsObjects.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [optsObjects[j], optsObjects[k]] = [optsObjects[k], optsObjects[j]];
        }
        
        const newCorrectIndex = optsObjects.findIndex(o => o.is_correct_orig);
        correctAnswerVal = newCorrectIndex.toString();
        
        finalOpts = optsObjects.map((o, idx) => ({
            option_text: o.option_text,
            is_correct: o.is_correct_orig,
            order_index: idx + 1
        }));
      } else if (q.question_type === 'true_false') {
        correctAnswerVal = q.correct_answer ? 'true' : 'false';
      }

      const { data: insertedQ, error: insertErr } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_type: q.question_type,
          question_text: q.question_text,
          code_snippet: q.code_snippet || null,
          correct_answer: correctAnswerVal,
          explanation: q.explanation || '',
          order_index: i + 1
        })
        .select('id')
        .single();

      if (insertErr) {
        console.error(`  ❌ Failed to insert question ${i + 1}:`, insertErr.message);
        continue;
      }

      // Insert options
      if (q.question_type === 'multiple_choice' || q.question_type === 'code_output') {
        const dbOpts = finalOpts.map(o => ({
            question_id: insertedQ.id,
            option_text: o.option_text,
            is_correct: o.is_correct,
            order_index: o.order_index
        }));

        const { error: optErr } = await supabase
          .from('quiz_question_options')
          .insert(dbOpts);

        if (optErr) {
          console.error(`  ❌ Failed to insert options:`, optErr.message);
        }
      } else if (q.question_type === 'true_false') {
        await supabase.from('quiz_question_options').insert([
          { question_id: insertedQ.id, option_text: 'True', is_correct: q.correct_answer === true, order_index: 1 },
          { question_id: insertedQ.id, option_text: 'False', is_correct: q.correct_answer === false, order_index: 2 },
        ]);
      }

      questionCount++;
    }

    console.log(`  ✅ Inserted ${questionCount} real questions.`);
  }

  console.log('\n✨ Done! All quizzes now have real C programming questions.');
}

run().catch(console.error);
