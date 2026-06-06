require('dotenv').config();
const { supabase } = require('./config/supabase.js');
const crypto = require('crypto');

const uuid = () => crypto.randomUUID();

async function seedData() {
    console.log('Seeding Complete C Course...');

    const courseId = 'c-lang';

    const phasesData = [
        { id: uuid(), course_id: courseId, title: 'Phase 1: Getting Started with C', description: 'Learn the fundamentals of C programming.', order_index: 1 },
        { id: uuid(), course_id: courseId, title: 'Phase 2: Control Flow & Logic', description: 'Control the flow of your programs.', order_index: 2 },
        { id: uuid(), course_id: courseId, title: 'Phase 3: Functions & Modular Programming', description: 'Write reusable code with functions.', order_index: 3 },
        { id: uuid(), course_id: courseId, title: 'Phase 4: Arrays & Strings', description: 'Work with collections of data.', order_index: 4 },
        { id: uuid(), course_id: courseId, title: 'Phase 5: Pointers & Memory', description: 'Master memory management.', order_index: 5 },
        { id: uuid(), course_id: courseId, title: 'Phase 6: Advanced C Topics', description: 'Explore advanced concepts.', order_index: 6 }
    ];

    await supabase.from('phases').insert(phasesData);
    console.log('Inserted phases');

    const topicsData = [];
    const contentsData = [];
    const quizzesData = [];
    const questionsData = [];
    const optionsData = [];

    const addContent = (topicId, type, text, order) => {
        contentsData.push({ id: uuid(), topic_id: topicId, content_type: type, content_text: text, order_index: order });
    };

    const addTopic = (phase, title, desc, idx) => {
        const tId = uuid();
        topicsData.push({ id: tId, phase_id: phase.id, title, description: desc, order_index: idx });
        return tId;
    };

    const addQuiz = (phase, title, qCount, qList) => {
        const qId = uuid();
        quizzesData.push({
            id: qId, phase_id: phase.id, course_id: courseId, title, description: 'Test your knowledge on this phase.',
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

    // --- PHASE 1 ---
    const p1 = phasesData[0];
    const t1_1 = addTopic(p1, 'Introduction to C', 'History, Why C, Structure of a Program', 1);
    addContent(t1_1, 'definition', 'C is a powerful general-purpose programming language. It is fast, portable, and available on all platforms.', 1);
    addContent(t1_1, 'explanation', 'Every C program has a structure. It includes preprocessor directives, the main() function, variable declarations, and executable statements.', 2);
    addContent(t1_1, 'example', `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`, 3);

    const t1_2 = addTopic(p1, 'Variables & Data Types', 'int, float, char, sizes', 2);
    addContent(t1_2, 'explanation', 'C requires you to declare variables before using them, specifying their data type.', 1);
    addContent(t1_2, 'syntax', 'int age = 20;\nfloat price = 19.99;\nchar grade = \'A\';', 2);
    addContent(t1_2, 'example', `#include <stdio.h>\n\nint main() {\n    int age = 25;\n    printf("I am %d years old.\\n", age);\n    return 0;\n}`, 3);

    const t1_3 = addTopic(p1, 'Input & Output', 'printf and scanf', 3);
    addContent(t1_3, 'explanation', 'We use printf() to print output and scanf() to read user input. We use format specifiers like %d for integers.', 1);
    addContent(t1_3, 'example', `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    printf("You entered %d\\n", num);\n    return 0;\n}`, 2);

    const t1_4 = addTopic(p1, 'Operators in C', 'Arithmetic, Relational, Logical', 4);
    addContent(t1_4, 'explanation', 'C has arithmetic (+, -, *, /), relational (==, !=, >, <), and logical (&&, ||, !) operators.', 1);
    addContent(t1_4, 'example', `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf("10 %% 3 = %d\\n", a % b);\n    return 0;\n}`, 2);

    addQuiz(p1, 'Quiz 1: C Fundamentals', 5, [
        { text: 'Which function is the entry point of a C program?', type: 'multiple_choice', correct: '0', exp: 'Execution begins at main().', options: ['main()', 'start()', 'init()', 'execute()'] },
        { text: 'What is the correct format specifier for a float?', type: 'multiple_choice', correct: '1', exp: '%f is for float.', options: ['%d', '%f', '%c', '%s'] },
        { text: 'What will be the output?', code: 'int x = 5; printf("%d", x + 2);', type: 'multiple_choice', correct: '2', exp: '5 + 2 = 7.', options: ['52', '5', '7', 'Error'] },
        { text: 'In C, variables must be declared before they can be used.', type: 'true_false', correct: 'true', exp: 'C is strongly typed.' },
        { text: 'What operator is used to get the memory address for scanf?', type: 'multiple_choice', correct: '0', exp: '& is the address-of operator.', options: ['&', '*', '@', '#'] }
    ]);

    // --- PHASE 2 ---
    const p2 = phasesData[1];
    const t2_1 = addTopic(p2, 'If, Else, and Else-If', 'Conditional logic', 1);
    addContent(t2_1, 'explanation', 'Use if to execute a block of code if a condition is true, and else if it is false.', 1);
    addContent(t2_1, 'example', `#include <stdio.h>\n\nint main() {\n    int score = 85;\n    if (score >= 90) printf("A");\n    else if (score >= 80) printf("B");\n    else printf("C");\n    return 0;\n}`, 2);

    const t2_2 = addTopic(p2, 'Switch Case Statement', 'Multiple choices', 2);
    addContent(t2_2, 'explanation', 'The switch statement is used to select one of many code blocks to be executed.', 1);
    addContent(t2_2, 'tip', 'Always remember to use the "break" statement, otherwise execution will fall through to the next case.', 2);
    addContent(t2_2, 'example', `#include <stdio.h>\n\nint main() {\n    int day = 2;\n    switch(day) {\n        case 1: printf("Monday"); break;\n        case 2: printf("Tuesday"); break;\n        default: printf("Other");\n    }\n    return 0;\n}`, 3);

    const t2_3 = addTopic(p2, 'While and Do-While Loops', 'Repeating actions conditionally', 3);
    addContent(t2_3, 'explanation', 'A while loop executes its body as long as the condition is true. A do-while loop executes the body at least once.', 1);
    addContent(t2_3, 'example', `#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while(i < 3) {\n        printf("%d ", i);\n        i++;\n    }\n    return 0;\n}`, 2);

    const t2_4 = addTopic(p2, 'For Loops and Loop Control', 'break and continue', 4);
    addContent(t2_4, 'explanation', 'The for loop is used when you know exactly how many times you want to loop.', 1);
    addContent(t2_4, 'example', `#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        if (i == 2) continue;\n        if (i == 4) break;\n        printf("%d ", i);\n    }\n    return 0;\n}`, 2);

    addQuiz(p2, 'Quiz 2: Control Flow', 5, [
        { text: 'Which statement immediately exits a loop?', type: 'multiple_choice', correct: '1', exp: 'break exits the loop entirely.', options: ['continue', 'break', 'exit', 'return'] },
        { text: 'A do-while loop will always execute at least once.', type: 'true_false', correct: 'true', exp: 'Condition is checked at the end.' },
        { text: 'What is the output?', code: 'for(int i=0; i<3; i++) printf("%d", i);', type: 'multiple_choice', correct: '0', exp: 'Loops 0, 1, 2.', options: ['012', '123', '0123', '3'] },
        { text: 'What happens if you omit the break in a switch case?', type: 'multiple_choice', correct: '0', exp: 'It falls through to the next case.', options: ['Fall through', 'Syntax error', 'Loop forever', 'Skips execution'] },
        { text: 'Which is not a valid loop in C?', type: 'multiple_choice', correct: '3', exp: 'foreach is not native to C.', options: ['for', 'while', 'do-while', 'foreach'] }
    ]);

    await supabase.from('topics').insert(topicsData);
    console.log('Inserted topics');
    
    // Split topic_content to avoid huge payloads
    const chunkSize = 50;
    for (let i = 0; i < contentsData.length; i += chunkSize) {
        await supabase.from('topic_content').insert(contentsData.slice(i, i + chunkSize));
    }
    console.log('Inserted topic content');

    await supabase.from('quizzes').insert(quizzesData);
    console.log('Inserted quizzes');

    await supabase.from('quiz_questions').insert(questionsData);
    console.log('Inserted questions');

    await supabase.from('quiz_question_options').insert(optionsData);
    console.log('Inserted options');

    console.log('Successfully seeded Phase 1 & 2');
}

seedData().catch(console.error);
