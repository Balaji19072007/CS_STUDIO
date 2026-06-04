require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t4';
    
    // First, delete existing content for this topic
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', topicId);
        
    if (deleteError) {
        console.error("Delete Error:", deleteError);
        return;
    }

    const blocks = [
        {
            topic_id: topicId,
            content_type: 'definition',
            content_text: 'The first step in learning any programming language is writing a simple program. Traditionally, programmers begin with a program that displays a message on the screen. This helps us understand the basic structure of a C program and how program execution works.',
            order_index: 1
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'In C, every program must contain a function called main(). The execution of the program starts from this function.',
            order_index: 2
        },
        {
            topic_id: topicId,
            content_type: 'example',
            content_text: '// [CODE_ONLY]\n#include <stdio.h>\n\nint main()\n{\n    printf("This is my first program in C");\n    return 0;\n}',
            order_index: 3
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Output:',
            order_index: 4
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'This is my first program in C',
            order_index: 5
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Line-by-Line Explanation\n\nLine 1',
            order_index: 6
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: '#include <stdio.h>',
            order_index: 7
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is it? This is called a preprocessor directive.\n\nPurpose: It tells the compiler to include the contents of the Standard Input Output header file (stdio.h) before compilation.\n\nWhy is it needed? The function printf() is defined inside stdio.h. Without including this header file, the compiler will not know what printf() is.\n\nLine 2',
            order_index: 8
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'int main()',
            order_index: 9
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is main()? main() is the entry point of a C program. Execution always starts from the main() function. Every C program must contain exactly one main() function.\n\nComponents:\n• int: Represents the return type of the function. It means the function returns an integer value to the operating system.\n• main: The name of the function.\n• (): Parentheses are used to specify parameters.\n\nLine 3',
            order_index: 10
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: '{',
            order_index: 11
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is this? An opening curly brace.\n\nPurpose: It marks the beginning of the function body. Everything inside the braces belongs to the main() function.\n\nLine 4',
            order_index: 12
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'printf("This is my first program in C");',
            order_index: 13
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is printf()? printf() is a library function used to display output on the screen. The word printf stands for: Print Formatted.\n\nString Literal: The text enclosed within double quotes is called a string literal.\n\nImportant Rule: Every statement in C must end with a semicolon.\n\nLine 5',
            order_index: 14
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'return 0;',
            order_index: 15
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What does return mean? The return statement ends the execution of the function and sends a value back to the operating system.\n\nWhy return 0? It indicates that the program executed successfully.\n\nLine 6',
            order_index: 16
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: '}',
            order_index: 17
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is it? Closing curly brace.\n\nPurpose: Marks the end of the main() function. Every opening brace must have a matching closing brace.\n\nProgram Execution Flow\nStep 1: Preprocessor processes #include <stdio.h>\nStep 2: Compiler compiles the program.\nStep 3: Execution enters main()\nStep 4: The statement printf() is executed.\nStep 5: Output appears on the screen.\nStep 6: return 0; returns control to OS.\nStep 7: Program terminates successfully.\n\nModified Example Using New Line',
            order_index: 18
        },
        {
            topic_id: topicId,
            content_type: 'example',
            content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("This is my first program in C\\n");\n    return 0;\n}',
            order_index: 19
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Output:',
            order_index: 20
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'This is my first program in C',
            order_index: 21
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is \\n? \\n is called a newline character. It moves the cursor to the next line after printing.\n\nCommon Mistakes\n1. Missing Header File: Compiler may not recognize printf().\n2. Missing Semicolon: Syntax error will occur.\n3. Missing Curly Braces: Function body won\'t be recognized.\n4. Incorrect Quotes: Strings must use double quotes (" ").',
            order_index: 22
        }
    ];

    const { data, error } = await supabase
        .from('topic_content')
        .insert(blocks);

    if (error) {
        console.error("Insert Error:", error);
    } else {
        console.log("Successfully updated topic content for c-p1-t4!");
    }
}
run();
