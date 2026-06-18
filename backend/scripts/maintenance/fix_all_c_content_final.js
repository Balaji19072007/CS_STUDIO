const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

// Use a function to get content to save memory/complexity
function getContent(title) {
    const t = title.toLowerCase();

    // --- PHASE 1: INTRODUCTION ---
    if (t.includes('what is c') || t.includes('intro')) return {
        syntax: `// C Program Structure\n#include <stdio.h>\n\nint main() {\n    // Code goes here\n    return 0;\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to C!\\n");\n    return 0;\n}`,
        challenge: { desc: "Write a program that prints 'Hello, C!' to the screen.", code: `#include <stdio.h>\n\nint main() {\n    // Print message\n    \n    return 0;\n}` }
    };
    if (t.includes('history')) return {
        syntax: `// Developed by Dennis Ritchie (1972)\n// At Bell Labs\n// Derived from B language`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("C was born in 1972.\\n");\n    return 0;\n}`,
        challenge: { desc: "Print the year C was developed.", code: `#include <stdio.h>\n\nint main() {\n    // Print year\n    return 0;\n}` }
    };
    if (t.includes('setup') || t.includes('environment')) return {
        syntax: `gcc filename.c -o output\n./output`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Environment Ready\\n");\n    return 0;\n}`,
        challenge: { desc: "Write a simple program to test your compiler.", code: `#include <stdio.h>\n\nint main() {\n    // Test code\n    return 0;\n}` }
    };
    if (t.includes('structure') || t.includes('boiler')) return {
        syntax: `#include <header_file>\n\nint main() {\n    // statements\n    return 0;\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    printf("Structure demo\\n");\n    return 0;\n}`,
        challenge: { desc: "Write a minimal C program structure.", code: `#include <stdio.h>\n\nint main() {\n    return 0;\n}` }
    };
    if (t.includes('comment')) return {
        syntax: `// Single line comment\n\n/* \n   Multi-line \n   comment \n*/`,
        example: `#include <stdio.h>\n\nint main() {\n    // This is a comment\n    printf("Comments result in no output\\n");\n    return 0;\n}`,
        challenge: { desc: "Write a program with both single and multi-line comments.", code: `#include <stdio.h>\n\nint main() {\n    // Add comments here\n    \n    return 0;\n}` }
    };
    if (t.includes('printf') || t.includes('output')) return {
        syntax: `printf("format_string", argument_list);`,
        example: `#include <stdio.h>\n\nint main() {\n    int age = 22;\n    printf("I am %d years old.\\n", age);\n    return 0;\n}`,
        challenge: { desc: "Use printf to display your name and favorite number.", code: `#include <stdio.h>\n\nint main() {\n    // Use printf\n    return 0;\n}` }
    };
    if (t.includes('scanf') || t.includes('input')) return {
        syntax: `scanf("format_specifier", &variable);`,
        example: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter number: ");\n    scanf("%d", &num);\n    printf("You entered: %d\\n", num);\n    return 0;\n}`,
        challenge: { desc: "Ask the user for their age and print it back.", code: `#include <stdio.h>\n\nint main() {\n    int age;\n    // Input and Output\n    return 0;\n}` }
    };

    // --- PHASE 2: VARIABLES & DATA TYPES ---
    if (t.includes('variable')) return {
        syntax: `type variable_name = value;\n\n// Examples:\nint count = 5;\nchar letter = 'A';`,
        example: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    float y = 5.5;\n    printf("x=%d, y=%.1f\\n", x, y);\n    return 0;\n}`,
        challenge: { desc: "Declare an integer and a float variable, assign values, and print them.", code: `#include <stdio.h>\n\nint main() {\n    // Declare variables\n    return 0;\n}` }
    };
    if (t.includes('data type')) return {
        syntax: `int    (4 bytes)\nfloat  (4 bytes)\ndouble (8 bytes)\nchar   (1 byte)`,
        example: `#include <stdio.h>\n\nint main() {\n    char c = 'K';\n    int i = 100;\n    printf("%c %d\\n", c, i);\n    return 0;\n}`,
        challenge: { desc: "Declare variables of type int, char, and double. Print their values.", code: `#include <stdio.h>\n\nint main() {\n    // code here\n    return 0;\n}` }
    };
    if (t.includes('constant') || t.includes('literal')) return {
        syntax: `const type variable = value;\n// OR\n#define NAME value`,
        example: `#include <stdio.h>\n#define PI 3.14\n\nint main() {\n    const int MAX = 10;\n    printf("PI: %.2f, MAX: %d\\n", PI, MAX);\n    return 0;\n}`,
        challenge: { desc: "Define a constant for PI and calculate appropriate circle area.", code: `#include <stdio.h>\n\nint main() {\n    // Define constant\n    return 0;\n}` }
    };
    if (t.includes('keyword')) return {
        syntax: `// C reserved words cannot be variable names\nint, return, if, else, while, for...`,
        example: `#include <stdio.h>\n\nint main() {\n    int _validName = 1;\n    // int if = 2; // Error\n    printf("%d\\n", _validName);\n    return 0;\n}`,
        challenge: { desc: "Create 3 variables with valid names (avoid keywords).", code: `#include <stdio.h>\n\nint main() {\n    // Valid declarations\n    return 0;\n}` }
    };

    // --- PHASE 3: OPERATORS ---
    if (t.includes('arithmetic')) return {
        syntax: `+  (Add)\n-  (Subtract)\n*  (Multiply)\n/  (Divide)\n%  (Modulus)`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf("Sum: %d\\n", a+b);\n    printf("Rem: %d\\n", a%b);\n    return 0;\n}`,
        challenge: { desc: "Calculate the sum, difference, product, and quotient of two numbers.", code: `#include <stdio.h>\n\nint main() {\n    int x = 12, y = 4;\n    // perform operations\n    return 0;\n}` }
    };
    if (t.includes('relational') || t.includes('comparison')) return {
        syntax: `==  (Equal)\n!=  (Not Equal)\n>   (Greater)\n<   (Less)\n>=  (Greater Eq)\n<=  (Less Eq)`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    if (a < b) printf("a is less\\n");\n    return 0;\n}`,
        challenge: { desc: "Read two numbers and print which one is larger.", code: `#include <stdio.h>\n\nint main() {\n    // Compare numbers\n    return 0;\n}` }
    };
    if (t.includes('logical')) return {
        syntax: `&&  (AND)\n||  (OR)\n!   (NOT)`,
        example: `#include <stdio.h>\n\nint main() {\n    int age = 25;\n    int hasId = 1;\n    if (age > 18 && hasId) printf("Allowed\\n");\n    return 0;\n}`,
        challenge: { desc: "Check if a number is between 10 and 50 (inclusive).", code: `#include <stdio.h>\n\nint main() {\n    int num = 30;\n    // Logic check\n    return 0;\n}` }
    };
    if (t.includes('bitwise')) return {
        syntax: `& (AND), | (OR), ^ (XOR)\n~ (NOT), << (Left Shift), >> (Right Shift)`,
        example: `#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3; // 101, 011\n    printf("AND: %d\\n", a & b); // 001 = 1\n    return 0;\n}`,
        challenge: { desc: "Perform bitwise AND and OR on two integers.", code: `#include <stdio.h>\n\nint main() {\n    int x = 12, y = 10;\n    // Bitwise ops\n    return 0;\n}` }
    };
    if (t.includes('assignment')) return {
        syntax: `=   (Assign)\n+=  (Add assign)\n-=  (Sub assign)\n*=  (Mul assign)`,
        example: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    x += 5; // x = 15\n    printf("%d\\n", x);\n    return 0;\n}`,
        challenge: { desc: "Start with x=10, add 5, then multiply by 2 using assignment operators.", code: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    // Ops\n    return 0;\n}` }
    };

    // --- PHASE 4: CONTROL FLOW ---
    if (t.includes('if') && !t.includes('else')) return {
        syntax: `if (condition) {\n    // executed if condition is true\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int val = 10;\n    if (val > 5) printf("Big\\n");\n    return 0;\n}`,
        challenge: { desc: "Write a program that prints 'Passed' if marks are above 40.", code: `#include <stdio.h>\n\nint main() {\n    int marks = 60;\n    // check pass\n    return 0;\n}` }
    };
    if (t.includes('if-else') || t.includes('else if')) return {
        syntax: `if (cond) {\n  // A\n} else if (cond2) {\n  // B\n} else {\n  // C\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int temp = 30;\n    if (temp > 25) printf("Hot\\n");\n    else printf("Cold\\n");\n    return 0;\n}`,
        challenge: { desc: "Check if a number is positive, negative, or zero.", code: `#include <stdio.h>\n\nint main() {\n    int num = -5;\n    // logic\n    return 0;\n}` }
    };
    if (t.includes('switch')) return {
        syntax: `switch(var) {\n    case 1: // code; break;\n    case 2: // code; break;\n    default: // code;\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int opt = 1;\n    switch(opt) {\n        case 1: printf("One\\n"); break;\n        default: printf("Other\\n");\n    }\n    return 0;\n}`,
        challenge: { desc: "Print the name of the day (1=Monday, etc) using switch.", code: `#include <stdio.h>\n\nint main() {\n    int day = 3;\n    // switch\n    return 0;\n}` }
    };
    if (t.includes('for loop') || t === 'for') return {
        syntax: `for (init; cond; step) {\n    // body\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    for(int i=0; i<5; i++) {\n        printf("%d ", i);\n    }\n    return 0;\n}`,
        challenge: { desc: "Print the first 10 natural numbers using a for loop.", code: `#include <stdio.h>\n\nint main() {\n    // loop\n    return 0;\n}` }
    };
    if (t.includes('while')) return {
        syntax: `while (condition) {\n    // body\n}`,
        example: `#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while(i < 3) {\n        printf("Hi\\n");\n        i++;\n    }\n    return 0;\n}`,
        challenge: { desc: "Print even numbers from 2 to 10 using a while loop.", code: `#include <stdio.h>\n\nint main() {\n    // while loop\n    return 0;\n}` }
    };
    if (t.includes('do-while') || t.includes('do while')) return {
        syntax: `do {\n    // body\n} while (condition);`,
        example: `#include <stdio.h>\n\nint main() {\n    int i = 0;\n    do {\n        printf("%d\\n", i);\n        i++;\n    } while(i < 1);\n    return 0;\n}`,
        challenge: { desc: "Print 'Run once' using a do-while loop even if the condition is false.", code: `#include <stdio.h>\n\nint main() {\n    // do-while\n    return 0;\n}` }
    };
    if (t.includes('break')) return {
        syntax: `break; // Exits loop/switch immediately`,
        example: `#include <stdio.h>\n\nint main() {\n    for(int i=0; i<10; i++) {\n        if(i==5) break;\n        printf("%d ", i);\n    }\n    return 0;\n}`,
        challenge: { desc: "Run a loop to 100 but stop (break) when the number is 10.", code: `#include <stdio.h>\n\nint main() {\n    // break test\n    return 0;\n}` }
    };
    if (t.includes('continue')) return {
        syntax: `continue; // Skips to next iteration`,
        example: `#include <stdio.h>\n\nint main() {\n    for(int i=0; i<5; i++) {\n        if(i==2) continue;\n        printf("%d ", i);\n    }\n    return 0;\n}`,
        challenge: { desc: "Print 1 to 10 but skip the number 5 using continue.", code: `#include <stdio.h>\n\nint main() {\n    // continue test\n    return 0;\n}` }
    };

    // --- PHASE 5: FUNCTIONS ---
    if (t.includes('function definition') || t === 'functions') return {
        syntax: `returnType funcName(params) {\n    // body\n    return val;\n}`,
        example: `#include <stdio.h>\n\nvoid sayHi() {\n    printf("Hi!\\n");\n}\n\nint main() {\n    sayHi();\n    return 0;\n}`,
        challenge: { desc: "Define a function 'greet' that prints 'Welcome' and call it.", code: `#include <stdio.h>\n\n// define func\n\nint main() {\n    // call func\n    return 0;\n}` }
    };
    if (t.includes('parameter') || t.includes('argument')) return {
        syntax: `void myFunc(int a, float b) {\n    // use a and b\n}`,
        example: `#include <stdio.h>\n\nvoid add(int a, int b) {\n    printf("%d\\n", a+b);\n}\n\nint main() {\n    add(5, 10);\n    return 0;\n}`,
        challenge: { desc: "Write a function that accepts two integers and prints the larger one.", code: `#include <stdio.h>\n\n// function\n\nint main() {\n    // call\n    return 0;\n}` }
    };
    if (t.includes('recursion')) return {
        syntax: `void recurse() {\n    if (base_case) return;\n    recurse();\n}`,
        example: `#include <stdio.h>\n\nint fact(int n) {\n    if(n<=1) return 1;\n    return n * fact(n-1);\n}\n\nint main() {\n    printf("%d\\n", fact(5));\n    return 0;\n}`,
        challenge: { desc: "Calculate the factorial of 4 using a recursive function.", code: `#include <stdio.h>\n\n// recursive func\n\nint main() {\n    // call\n    return 0;\n}` }
    };

    // --- PHASE 6: ARRAYS ---
    if (t.includes('array') && !t.includes('2d')) return {
        syntax: `type name[size];\n// Init\nint arr[] = {1, 2, 3};`,
        example: `#include <stdio.h>\n\nint main() {\n    int nums[3] = {10, 20, 30};\n    printf("%d\\n", nums[0]);\n    return 0;\n}`,
        challenge: { desc: "Create an array of 5 integers and print the 3rd element.", code: `#include <stdio.h>\n\nint main() {\n    // array\n    return 0;\n}` }
    };
    if (t.includes('2d') || t.includes('multidim')) return {
        syntax: `type name[rows][cols];\nint m[2][2] = {{1,2}, {3,4}};`,
        example: `#include <stdio.h>\n\nint main() {\n    int grid[2][2] = {{1,0}, {0,1}};\n    printf("%d\\n", grid[0][0]);\n    return 0;\n}`,
        challenge: { desc: "Initialize a 2x2 matrix and print its elements.", code: `#include <stdio.h>\n\nint main() {\n    // matrix\n    return 0;\n}` }
    };
    if (t.includes('string')) return {
        syntax: `char str[] = "Hello";\n// or\nchar str[20];`,
        example: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = "Code";\n    printf("Str: %s\\n", s);\n    return 0;\n}`,
        challenge: { desc: "Declare a string with your name and print it.", code: `#include <stdio.h>\n\nint main() {\n    // string\n    return 0;\n}` }
    };

    // --- PHASE 7: POINTERS ---
    if (t.includes('pointer')) return {
        syntax: `int *ptr;\nptr = &var;   // Address\n*ptr = 10;    // Value`,
        example: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *p = &x;\n    printf("Val: %d\\n", *p);\n    return 0;\n}`,
        challenge: { desc: "Create a pointer to an integer variables and print the value using the pointer.", code: `#include <stdio.h>\n\nint main() {\n    int a = 50;\n    // pointer ops\n    return 0;\n}` }
    };

    // --- PHASE 8: STRUCTURES ---
    if (t.includes('struct')) return {
        syntax: `struct Name {\n    int member1;\n    char member2;\n};`,
        example: `#include <stdio.h>\n\nstruct Point {\n    int x, y;\n};\n\nint main() {\n    struct Point p = {1, 2};\n    printf("%d %d\\n", p.x, p.y);\n    return 0;\n}`,
        challenge: { desc: "Define a struct 'Student' with id and marks. Create one instance and print details.", code: `#include <stdio.h>\n\nstruct Student {\n    // members\n};\n\nint main() {\n    // usage\n    return 0;\n}` }
    };
    if (t.includes('union')) return {
        syntax: `union Data {\n    int i;\n    float f;\n}; // Shared memory`,
        example: `#include <stdio.h>\n\nunion Data {\n    int i;\n    char c;\n};\n\nint main() {\n    union Data d;\n    d.i = 65;\n    printf("As char: %c\\n", d.c);\n    return 0;\n}`,
        challenge: { desc: "Define a union with an int and a float. Assign int and print.", code: `#include <stdio.h>\n\n// union\n\nint main() {\n    // usage\n    return 0;\n}` }
    };
    if (t.includes('enum')) return {
        syntax: `enum Day {SUN, MON, TUE};\nenum Day today = SUN;`,
        example: `#include <stdio.h>\n\nenum Level {LOW, MEDIUM, HIGH};\n\nint main() {\n    enum Level l = MEDIUM;\n    printf("%d\\n", l);\n    return 0;\n}`,
        challenge: { desc: "Create an enum for Colors (RED, GREEN, BLUE) and print one.", code: `#include <stdio.h>\n\n// enum\n\nint main() {\n    // usage\n    return 0;\n}` }
    };

    // --- PHASE 9: MEMORY & FILES ---
    if (t.includes('malloc') || t.includes('alloc') || t.includes('heap')) return {
        syntax: `ptr = (cast*) malloc(size);\nfree(ptr);`,
        example: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*)malloc(sizeof(int));\n    *p = 100;\n    printf("%d\\n", *p);\n    free(p);\n    return 0;\n}`,
        challenge: { desc: "Allocate memory for one integer using malloc, assign 5, and print it.", code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // dynamic memory\n    return 0;\n}` }
    };
    if (t.includes('file') || t.includes('fopen')) return {
        syntax: `FILE *fp = fopen("file.txt", "w");\nfprintf(fp, "text");\nfclose(fp);`,
        example: `#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("test.txt", "w");\n    if(fp) {\n        fprintf(fp, "Hello File");\n        fclose(fp);\n        printf("Written\\n");\n    }\n    return 0;\n}`,
        challenge: { desc: "Write code to open a file 'data.txt' for writing and close it.", code: `#include <stdio.h>\n\nint main() {\n    // file ops\n    return 0;\n}` }
    };

    // --- GENERIC FALLBACK (BUT FORMAT COMPLIANT) ---
    return {
        syntax: `// Standard C Syntax for ${title}\n// Refer to documentation for specifics`,
        example: `#include <stdio.h>\n\nint main() {\n    // Example demonstrating ${title}\n    printf("Concept: ${title}\\n");\n    return 0;\n}`,
        challenge: { desc: `Write a C program that demonstrates the concept of ${title}.`, code: `#include <stdio.h>\n\nint main() {\n    // Implement ${title}\n    return 0;\n}` }
    };
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------
async function fixAll() {
    const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();
        console.log('✅ Connected');

        const { rows: topics } = await client.query(`
            SELECT topics.id, topics.title 
            FROM topics 
            JOIN phases p ON topics.phase_id = p.id 
            WHERE p.course_id = 'c-programming'
        `);
        console.log(`Processing ${topics.length} topics...`);

        let count = 0;
        for (const topic of topics) {
            const content = getContent(topic.title);

            // 1. DELETE OLD
            await client.query(`DELETE FROM topic_content WHERE topic_id = $1 AND content_type IN ('syntax', 'example')`, [topic.id]);
            await client.query(`DELETE FROM practice_problems WHERE topic_id = $1`, [topic.id]);

            // 2. INSERT NEW SYNTAX
            await client.query(`INSERT INTO topic_content (topic_id, content_type, content_text, order_index) VALUES ($1, 'syntax', $2, 4)`, [topic.id, content.syntax]);

            // 3. INSERT NEW EXAMPLE
            await client.query(`INSERT INTO topic_content (topic_id, content_type, content_text, order_index) VALUES ($1, 'example', $2, 5)`, [topic.id, content.example]);

            // 4. INSERT NEW CHALLENGE
            await client.query(`INSERT INTO practice_problems (topic_id, title, description, starter_code, difficulty, order_index) VALUES ($1, 'Challenge Time', $2, $3, 'Easy', 1)`, [topic.id, content.challenge.desc, content.challenge.code]);

            process.stdout.write('.');
            count++;
        }
        console.log(`\n✅ Done! Updated ${count} topics.`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

fixAll();
