require('dotenv').config();
const { supabase } = require('./config/supabase.js');
const crypto = require('crypto');

const uuid = () => crypto.randomUUID();

async function seedData() {
    console.log('Seeding C Course Phases 3-6...');

    const courseId = 'c-lang';

    // Fetch existing phases
    const { data: phases, error: pErr } = await supabase.from('phases').select('id, title').eq('course_id', courseId).order('order_index');
    if (pErr) throw pErr;

    const p3Id = phases[2].id;
    const p4Id = phases[3].id;
    const p5Id = phases[4].id;
    const p6Id = phases[5].id;

    const topicsData = [];
    const contentsData = [];
    const quizzesData = [];
    const questionsData = [];
    const optionsData = [];

    const addContent = (topicId, type, text, order) => {
        contentsData.push({ id: uuid(), topic_id: topicId, content_type: type, content_text: text, order_index: order });
    };

    const addTopic = (phaseId, title, desc, idx) => {
        const tId = uuid();
        topicsData.push({ id: tId, phase_id: phaseId, title, description: desc, order_index: idx });
        return tId;
    };

    const addQuiz = (phaseId, title, qCount, qList) => {
        const qId = uuid();
        quizzesData.push({
            id: qId, phase_id: phaseId, course_id: courseId, title, description: 'Test your knowledge on this phase.',
            order_index: 99, duration_minutes: 15, total_questions: qCount, pass_percentage: 60, quiz_type: 'standard'
        });

        qList.forEach((q, idx) => {
            const qqId = uuid();
            questionsData.push({
                id: qqId, quiz_id: qId, question_text: q.text, question_type: q.type,
                code_snippet: q.code || null, correct_answer: q.correct, explanation: q.exp, order_index: idx + 1
            });

            if (q.type === 'multiple_choice') {
                q.options.forEach((opt, oIdx) => {
                    optionsData.push({
                        id: uuid(), question_id: qqId, option_text: opt, is_correct: String(oIdx) === q.correct, order_index: oIdx + 1
                    });
                });
            }
        });
    };

    // --- PHASE 3: Functions ---
    const t3_1 = addTopic(p3Id, 'Introduction to Functions', 'Declaration, Definition, Call', 1);
    addContent(t3_1, 'explanation', 'A function is a block of code that performs a specific task. Using functions makes the code reusable and organized.', 1);
    addContent(t3_1, 'example', `#include <stdio.h>\n\nvoid greet() {\n    printf("Hello from a function!\\n");\n}\n\nint main() {\n    greet();\n    return 0;\n}`, 2);

    const t3_2 = addTopic(p3Id, 'Function Arguments', 'Passing data into functions', 2);
    addContent(t3_2, 'explanation', 'You can pass data to functions using parameters (arguments). Functions can also return data using the return statement.', 1);
    addContent(t3_2, 'example', `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int sum = add(5, 3);\n    printf("Sum is %d\\n", sum);\n    return 0;\n}`, 2);

    const t3_3 = addTopic(p3Id, 'Variable Scope', 'Local and Global', 3);
    addContent(t3_3, 'explanation', 'Local variables are declared inside a function and only exist there. Global variables are declared outside any function and are accessible everywhere.', 1);
    addContent(t3_3, 'example', `#include <stdio.h>\n\nint globalVar = 10;\n\nvoid test() {\n    int localVar = 5;\n    printf("Global: %d, Local: %d\\n", globalVar, localVar);\n}\n\nint main() {\n    test();\n    return 0;\n}`, 2);

    addQuiz(p3Id, 'Quiz 3: Functions', 5, [
        { text: 'What keyword is used for a function that does not return anything?', type: 'multiple_choice', correct: '0', exp: 'void means no return value.', options: ['void', 'null', 'int', 'empty'] },
        { text: 'A local variable can be accessed from any function in the program.', type: 'true_false', correct: 'false', exp: 'Local variables are restricted to their own function scope.' },
        { text: 'What will be output?', code: 'int f(){ return 5; } int main(){ printf("%d", f()); }', type: 'multiple_choice', correct: '0', exp: 'f() returns 5.', options: ['5', 'f()', '0', 'Error'] },
        { text: 'Which of the following is true about global variables?', type: 'multiple_choice', correct: '1', exp: 'They are accessible from any function.', options: ['They are faster', 'They can be accessed anywhere', 'They are deleted after a function returns', 'They are safer'] },
        { text: 'What statement returns a value from a function?', type: 'multiple_choice', correct: '2', exp: 'return statement is used.', options: ['break', 'yield', 'return', 'give'] }
    ]);

    // --- PHASE 4: Arrays & Strings ---
    const t4_1 = addTopic(p4Id, 'Introduction to Arrays', '1D arrays', 1);
    addContent(t4_1, 'explanation', 'An array is a collection of variables of the same type, stored in contiguous memory locations.', 1);
    addContent(t4_1, 'example', `#include <stdio.h>\n\nint main() {\n    int numbers[] = {10, 20, 30};\n    printf("First element: %d\\n", numbers[0]);\n    return 0;\n}`, 2);

    const t4_2 = addTopic(p4Id, 'Multi-dimensional Arrays', '2D matrices', 2);
    addContent(t4_2, 'explanation', 'A 2D array is essentially an array of arrays. It is often used to represent matrices or grids.', 1);
    addContent(t4_2, 'example', `#include <stdio.h>\n\nint main() {\n    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    printf("Value at [1][2]: %d\\n", matrix[1][2]); // Prints 6\n    return 0;\n}`, 2);

    const t4_3 = addTopic(p4Id, 'Strings in C', 'Character Arrays', 3);
    addContent(t4_3, 'explanation', 'In C, strings are not a built-in type. They are arrays of characters ending with a null character (\\0).', 1);
    addContent(t4_3, 'example', `#include <stdio.h>\n\nint main() {\n    char greeting[] = "Hello";\n    printf("%s\\n", greeting);\n    return 0;\n}`, 2);

    const t4_4 = addTopic(p4Id, 'String Functions', '<string.h>', 4);
    addContent(t4_4, 'explanation', 'The <string.h> library provides functions like strlen (length), strcpy (copy), and strcat (concatenate).', 1);
    addContent(t4_4, 'example', `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello ";\n    char str2[] = "World";\n    strcat(str1, str2);\n    printf("%s (Length: %lu)\\n", str1, strlen(str1));\n    return 0;\n}`, 2);

    addQuiz(p4Id, 'Quiz 4: Arrays & Strings', 5, [
        { text: 'In C, array indices start at what number?', type: 'multiple_choice', correct: '0', exp: 'C arrays are 0-indexed.', options: ['0', '1', '-1', 'It depends'] },
        { text: 'What is the null character used to terminate a string?', type: 'multiple_choice', correct: '2', exp: '\\0 signifies the end of a string in C.', options: ['\\n', '\\t', '\\0', '\\r'] },
        { text: 'Which function finds the length of a string?', type: 'multiple_choice', correct: '1', exp: 'strlen() counts characters until \\0.', options: ['length()', 'strlen()', 'size()', 'strsize()'] },
        { text: 'What happens if you access an array out of bounds?', type: 'multiple_choice', correct: '0', exp: 'Undefined behavior occurs, often leading to a crash or garbage value.', options: ['Undefined behavior', 'Compiler error', 'Returns 0', 'Safe crash'] },
        { text: 'A 2D array is just an array of arrays.', type: 'true_false', correct: 'true', exp: 'It is stored sequentially in row-major order.' }
    ]);

    // --- PHASE 5: Pointers & Memory ---
    const t5_1 = addTopic(p5Id, 'Understanding Pointers', '& and * operators', 1);
    addContent(t5_1, 'explanation', 'A pointer is a variable that stores the memory address of another variable. & gets the address, * dereferences it.', 1);
    addContent(t5_1, 'example', `#include <stdio.h>\n\nint main() {\n    int a = 42;\n    int* ptr = &a;\n    printf("Value: %d, Address: %p\\n", *ptr, ptr);\n    return 0;\n}`, 2);

    const t5_2 = addTopic(p5Id, 'Pointers and Arrays', 'Pointer arithmetic', 2);
    addContent(t5_2, 'explanation', 'The name of an array acts like a pointer to its first element. You can use pointer arithmetic to traverse it.', 1);
    addContent(t5_2, 'example', `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int* ptr = arr;\n    printf("First: %d, Second: %d\\n", *ptr, *(ptr + 1));\n    return 0;\n}`, 2);

    const t5_3 = addTopic(p5Id, 'Pass by Reference', 'Pointers in Functions', 3);
    addContent(t5_3, 'explanation', 'Passing pointers to a function allows the function to modify the original variables (pass by reference).', 1);
    addContent(t5_3, 'example', `#include <stdio.h>\n\nvoid swap(int* x, int* y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 5, b = 9;\n    swap(&a, &b);\n    printf("a = %d, b = %d\\n", a, b);\n    return 0;\n}`, 2);

    const t5_4 = addTopic(p5Id, 'Dynamic Memory', 'malloc, free', 4);
    addContent(t5_4, 'explanation', 'Use malloc() to allocate memory at runtime, and free() to release it to prevent memory leaks. Both require <stdlib.h>.', 1);
    addContent(t5_4, 'example', `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int* ptr = (int*)malloc(sizeof(int));\n    *ptr = 100;\n    printf("Dynamically allocated: %d\\n", *ptr);\n    free(ptr);\n    return 0;\n}`, 2);

    addQuiz(p5Id, 'Quiz 5: Pointers & Memory', 5, [
        { text: 'What does the * operator do when placed before a pointer variable?', type: 'multiple_choice', correct: '1', exp: 'It dereferences the pointer to get the value.', options: ['Multiplies it', 'Dereferences it', 'Gets its address', 'Frees memory'] },
        { text: 'Which header file is required for malloc and free?', type: 'multiple_choice', correct: '2', exp: 'Memory allocation functions are in stdlib.h', options: ['stdio.h', 'math.h', 'stdlib.h', 'string.h'] },
        { text: 'What happens if you do not call free() after malloc()?', type: 'multiple_choice', correct: '0', exp: 'Memory leak occurs.', options: ['Memory leak', 'Compiler error', 'Auto garbage collection', 'Nothing'] },
        { text: 'Pointers can only store integer values.', type: 'true_false', correct: 'false', exp: 'Pointers store memory addresses.' },
        { text: 'What does &a return?', type: 'multiple_choice', correct: '1', exp: '& gets the memory address of a.', options: ['The value of a', 'The memory address of a', 'A copy of a', 'Error'] }
    ]);

    // --- PHASE 6: Advanced C ---
    const t6_1 = addTopic(p6Id, 'Structures', 'struct', 1);
    addContent(t6_1, 'explanation', 'Structures allow you to group different data types together under a single name.', 1);
    addContent(t6_1, 'example', `#include <stdio.h>\n\nstruct Person {\n    char name[50];\n    int age;\n};\n\nint main() {\n    struct Person p1 = {"Alice", 30};\n    printf("%s is %d years old.\\n", p1.name, p1.age);\n    return 0;\n}`, 2);

    const t6_2 = addTopic(p6Id, 'File Handling', 'fopen, fclose', 2);
    addContent(t6_2, 'explanation', 'C uses FILE pointers to read and write to files using fopen, fprintf, fscanf, and fclose.', 1);
    addContent(t6_2, 'example', `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("test.txt", "w");\n    if(f) {\n        fprintf(f, "Hello File!\\n");\n        fclose(f);\n        printf("Wrote to test.txt\\n");\n    }\n    return 0;\n}`, 2);

    const t6_3 = addTopic(p6Id, 'Preprocessor Directives', '#define, #include', 3);
    addContent(t6_3, 'explanation', 'The preprocessor runs before the compiler. Macros (#define) allow you to define constant values or code replacements.', 1);
    addContent(t6_3, 'example', `#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    printf("PI is approx %.2f\\n", PI);\n    return 0;\n}`, 2);

    addQuiz(p6Id, 'Quiz 6: Advanced Topics', 5, [
        { text: 'Which keyword is used to define a custom structure?', type: 'multiple_choice', correct: '2', exp: 'struct defines a structure.', options: ['class', 'object', 'struct', 'record'] },
        { text: 'What is the correct way to open a file for writing?', type: 'multiple_choice', correct: '0', exp: '"w" is write mode.', options: ['fopen("file.txt", "w")', 'open("file.txt", "write")', 'file("file.txt", "w")', 'fopen("file.txt", "r")'] },
        { text: 'Preprocessor directives begin with what character?', type: 'multiple_choice', correct: '1', exp: 'They begin with #.', options: ['$', '#', '@', '&'] },
        { text: '#define is evaluated by the compiler during execution.', type: 'true_false', correct: 'false', exp: '#define is evaluated before compilation by the preprocessor.' },
        { text: 'Which operator is used to access structure members from a pointer to a struct?', type: 'multiple_choice', correct: '1', exp: 'The arrow operator (->) is used.', options: ['.', '->', '*', '&'] }
    ]);


    // EXECUTE INSERTS
    await supabase.from('topics').insert(topicsData);
    console.log('Inserted topics');
    
    const chunkSize = 50;
    for (let i = 0; i < contentsData.length; i += chunkSize) {
        await supabase.from('topic_content').insert(contentsData.slice(i, i + chunkSize));
    }
    console.log('Inserted topic content');

    await supabase.from('quizzes').insert(quizzesData);
    console.log('Inserted quizzes');

    await supabase.from('quiz_questions').insert(questionsData);
    console.log('Inserted questions');

    for (let i = 0; i < optionsData.length; i += chunkSize) {
        await supabase.from('quiz_question_options').insert(optionsData.slice(i, i + chunkSize));
    }
    console.log('Inserted options');

    console.log('Successfully seeded Phases 3-6');
}

seedData().catch(console.error);
