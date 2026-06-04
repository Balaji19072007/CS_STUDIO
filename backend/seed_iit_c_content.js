require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uuid = () => crypto.randomUUID();

// This function generates content blocks using the exact phrasing and style from the IIT C_notes.pdf
function getIITContent(topicTitle, phaseTitle) {
    const t = topicTitle.toLowerCase();
    const blocks = [];

    if (t.includes('introduction') || t.includes('history') || t.includes('what is c')) {
        blocks.push({ type: 'explanation', text: 'C is a computer high level language available on the UNIX operating systems. C lets you write your programs clearly and it has decent control flow facilities so your code can be read straight down the page.' });
        blocks.push({ type: 'explanation', text: 'It lets you write structured code that is compact without being too cryptic; it encourages modularity and good program organization; and it provides good data-structuring facilities.' });
        blocks.push({ type: 'tip', text: 'The filename must by convention end .c (full stop, lower case c), e.g. firstprog.c. The contents must obey C syntax.' });
    } else if (t.includes('structure') || t.includes('first program')) {
        blocks.push({ type: 'explanation', text: 'A C program contains functions and variables. The functions specify the tasks to be performed by the program. The main function establishes the overall logic of the code. All C codes must have a main function.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    printf("This is my first program in C\\n");\n    return 0;\n}' });
        blocks.push({ type: 'explanation', text: 'The int preceding main indicates that main returns an integer result on execution (usually 0 for success). The ; denotes the end of a statement.' });
    } else if (t.includes('compil')) {
        blocks.push({ type: 'explanation', text: 'There are many C compilers around. The cc being the default Sun compiler. The gcc compiler is popular and available for many platforms.' });
        blocks.push({ type: 'syntax', text: 'cc firstprog.c\ngcc firstprog.c\ncc -o anyname firstprog.c' });
        blocks.push({ type: 'explanation', text: 'This creates an executable file a.out, which is then executed simply by typing its name. If you want to store executable file in a user defined file, use the -o option.' });
    } else if (t.includes('variable') || t.includes('data type')) {
        blocks.push({ type: 'explanation', text: 'C has the following simple data types: char, int, float, double. On UNIX systems all ints are long ints unless specified as short int explicitly.' });
        blocks.push({ type: 'tip', text: 'NOTE: There is NO Boolean type in C. Either use char, int or (better) unsigned char.' });
        blocks.push({ type: 'syntax', text: 'var_type list variables;\n\nint i,j,k;\nfloat x,y,z;\nchar ch;' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nshort number = 10, sum = 20;\nint bignumber = 1000, bigsum = 2000;\nchar letter = \'A\';\n\nint main() {\n    printf("Number: %d, Sum: %d\\n", number, sum);\n    printf("Big Number: %d, Big Sum: %d\\n", bignumber, bigsum);\n    printf("Letter: %c\\n", letter);\n    return 0;\n}' });
    } else if (t.includes('operator') || t.includes('expression')) {
        blocks.push({ type: 'explanation', text: 'Standard arithmetic operators (+ - * /) are found in most languages, C provides some more operators. The % (modulus) operator only works with integers.' });
        blocks.push({ type: 'tip', text: 'Division / is for both integer and float division. So be careful. The answer to: x = 3 / 2 is 1 even if x is declared a float!! If both arguments of / are integer then do integer division.' });
        blocks.push({ type: 'syntax', text: 'To test for equality use double equality symbol ==\nNot equals is: !=\nLogical AND: &&\nLogical OR: ||' });
    } else if (t.includes('if') || t.includes('else') || t.includes('condition')) {
        blocks.push({ type: 'explanation', text: 'The if statement has the same function as other languages. The ? (ternary condition) operator is a more efficient form for expressing simple conditional expression.' });
        blocks.push({ type: 'syntax', text: 'if (expression) statement\n\nif (expression) statement1\nelse statement2' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int z;\n\n    /* Assign the maximum of a and b to z: */\n    z = (a > b) ? a : b;\n    printf("The maximum using ternary is: %d\\n", z);\n\n    /* Which is the same as: */\n    if (a > b) {\n        z = a;\n    } else {\n        z = b;\n    }\n    printf("The maximum using if-else is: %d\\n", z);\n\n    return 0;\n}' });
    } else if (t.includes('switch')) {
        blocks.push({ type: 'explanation', text: 'The C switch allows multiple choice of a selection of items at one level of a conditional where it is a far neater way of writing multiple if statements.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    char letter = \'E\';\n    int numberofvowels = 0;\n    int numberofspaces = 0;\n    int numberofconstants = 0;\n\n    switch (letter) {\n        case \'A\':\n        case \'E\':\n        case \'I\':\n        case \'O\':\n        case \'U\':\n            numberofvowels++;\n            printf("Found a vowel!\\n");\n            break;\n        case \' \':\n            numberofspaces++;\n            printf("Found a space!\\n");\n            break;\n        default:\n            numberofconstants++;\n            printf("Found a consonant!\\n");\n            break;\n    }\n\n    printf("Vowels: %d\\n", numberofvowels);\n    return 0;\n}' });
        blocks.push({ type: 'tip', text: 'In each case the value of item must be a constant and variables are not allowed. The break is needed if you want to terminate the switch after execution of one choice.' });
    } else if (t.includes('for') || t.includes('loop')) {
        blocks.push({ type: 'explanation', text: 'The C for statement has the form: for (expression1; expression2; expression3) statement; expression1 initializes; expression2 is the terminate test; expression3 is the modifier.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    /* while loop example */\n    int x = 3;\n    printf("While loop output:\\n");\n    while (x > 0) {\n        printf("x = %d\\n", x);\n        x--;\n    }\n    return 0;\n}' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    /* do-while loop example */\n    int x = 3;\n    printf("Do-while loop output:\\n");\n    do {\n        printf("x = %d\\n", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}' });
    } else if (t.includes('array')) {
        blocks.push({ type: 'explanation', text: 'An array is a collection of variables of the same type that are referenced by a common name. In C, arrays are zero-indexed: the first element is at index 0.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    int my_array[5] = {10, 20, 30, 40, 50};\n    int i;\n\n    for(i = 0; i < 5; i++) {\n        printf("Element at index %d: %d\\n", i, my_array[i]);\n    }\n    return 0;\n}' });
    } else if (t.includes('string')) {
        blocks.push({ type: 'explanation', text: 'In C, a string is simply an array of characters terminated by a null character (\\0). String handling is provided by the standard library <string.h>.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[20] = "Hello, World!";\n    printf("String content: %s\\n", str);\n    printf("String length: %zu\\n", strlen(str));\n    return 0;\n}' });
    } else if (t.includes('pointer')) {
        blocks.push({ type: 'explanation', text: 'A pointer is a variable that stores the memory address of another variable. Pointers are incredibly powerful in C for memory manipulation, dynamic allocation, and array passing.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    int val = 20;\n    int *p = &val; /* p now holds the address of val */\n\n    printf("Value of val: %d\\n", val);\n    printf("Address of val: %p\\n", (void*)&val);\n    printf("Pointer p holds address: %p\\n", (void*)p);\n    printf("Value pointed to by p: %d\\n", *p);\n\n    return 0;\n}' });
        blocks.push({ type: 'tip', text: 'Uninitialized pointers (wild pointers) can cause fatal program crashes. Always initialize pointers to NULL if they do not point to a valid address.' });
    } else if (t.includes('struct') || t.includes('union')) {
        blocks.push({ type: 'explanation', text: 'A structure is a collection of variables of different types under a single name. Structures are used to represent a record.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p1;\n    p1.x = 10;\n    p1.y = 20;\n\n    printf("Point coordinates: (%d, %d)\\n", p1.x, p1.y);\n    return 0;\n}' });
    } else if (t.includes('file')) {
        blocks.push({ type: 'explanation', text: 'File I/O in C is handled using file pointers. The stdio.h library provides functions to open, read, write, and close files.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("data.txt", "w");\n    if (fp != NULL) {\n        fprintf(fp, "Hello File!\\n");\n        fclose(fp);\n        printf("Successfully wrote to data.txt\\n");\n    } else {\n        printf("Failed to open file.\\n");\n    }\n    return 0;\n}' });
    } else if (t.includes('preprocessor') || t.includes('macro')) {
        blocks.push({ type: 'explanation', text: 'The Preprocessor accepts source code as input and is responsible for removing comments and interpreting special preprocessor directives denoted by #.' });
        blocks.push({ type: 'example', text: '#include <stdio.h>\n#define MAX_ARRAY_SIZE 100\n#define PI 3.14159\n\nint main() {\n    printf("Maximum array size is: %d\\n", MAX_ARRAY_SIZE);\n    printf("Value of PI is: %.5f\\n", PI);\n    return 0;\n}' });
    } else {
        // Generic fallback for advanced topics
        blocks.push({ type: 'explanation', text: `This section covers ${topicTitle}. In C programming, mastering this topic is essential for writing robust, efficient, and modular UNIX-level code.` });
        blocks.push({ type: 'example', text: `#include <stdio.h>\n\nint main() {\n    /* Example for ${topicTitle} */\n    printf("Exploring topic: ${topicTitle}\\n");\n    return 0;\n}` });
        blocks.push({ type: 'tip', text: 'Always compile your code with gcc or cc and thoroughly test edge cases to prevent segmentation faults and logic errors.' });
    }

    return blocks;
}

async function run() {
    console.log('🚀 Starting IIT C Notes Local Seeding...');

    // Get course ID
    const { data: courses } = await supabase.from('courses').select('id').eq('title', 'C Programming');
    if (!courses || courses.length === 0) {
      console.error('C Programming course not found!');
      return;
    }
    const courseId = courses[0].id;
  
    // Get all topics
    const { data: phases } = await supabase.from('phases').select('id, title').eq('course_id', courseId);
    
    let totalUpdated = 0;

    for (const phase of phases) {
      const { data: topics } = await supabase.from('topics').select('id, title').eq('phase_id', phase.id);
      
      for (const topic of topics) {
          const blocks = getIITContent(topic.title, phase.title);
          
          // Delete old
          await supabase.from('topic_content').delete().eq('topic_id', topic.id);

          // Insert new
          const insertData = blocks.map((b, idx) => ({
            id: uuid(),
            topic_id: topic.id,
            content_type: b.type,
            content_text: b.text,
            order_index: idx + 1
          }));

          if (insertData.length > 0) {
              const { error } = await supabase.from('topic_content').insert(insertData);
              if (error) console.error(`Error inserting ${topic.title}:`, error.message);
              else totalUpdated++;
          }
      }
    }

    console.log(`\n✨ Successfully updated ${totalUpdated} topics with IIT PDF Content!`);
}

run().catch(console.error);
