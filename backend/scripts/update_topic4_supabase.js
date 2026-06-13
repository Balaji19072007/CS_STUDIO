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
            content_text: '<strong>What is it?</strong><br />This is called a preprocessor directive.<br /><br /><strong>Purpose:</strong><br />It tells the compiler to include the contents of the Standard Input Output header file (<code>stdio.h</code>) before compilation.<br /><br /><strong>Why is it needed?</strong><br />The function <code>printf()</code> is defined inside <code>stdio.h</code>. Without including this header file, the compiler will not know what <code>printf()</code> is.<br /><br /><span class="text-sm text-gray-500 font-mono">Line 2</span>',
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
            content_text: '<strong>What is main()?</strong><br /><code>main()</code> is the entry point of a C program. Execution always starts from the <code>main()</code> function. Every C program must contain exactly one <code>main()</code> function.<br /><br /><strong>Components:</strong><br /><ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>int</strong>: Represents the return type of the function. It means the function returns an integer value to the operating system.</li><li><strong>main</strong>: The name of the function.</li><li><strong>()</strong>: Parentheses are used to specify parameters.</li></ul><br /><span class="text-sm text-gray-500 font-mono">Line 3</span>',
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
            content_text: '<strong>What is this?</strong><br />An opening curly brace.<br /><br /><strong>Purpose:</strong><br />It marks the beginning of the function body. Everything inside the braces belongs to the <code>main()</code> function.<br /><br /><span class="text-sm text-gray-500 font-mono">Line 4</span>',
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
            content_text: '<strong>What is printf()?</strong><br /><code>printf()</code> is a library function used to display output on the screen.<br />The word <strong>printf</strong> stands for: <em>Print Formatted</em>.<br /><br /><strong>String Literal:</strong><br />The text enclosed within double quotes is called a string literal.<br /><br /><strong>Important Rule:</strong><br />Every statement in C must end with a semicolon.<br /><br /><span class="text-sm text-gray-500 font-mono">Line 5</span>',
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
            content_text: '<strong>What does return mean?</strong><br />The <code>return</code> statement ends the execution of the function and sends a value back to the operating system.<br /><br /><strong>Why return 0?</strong><br />It indicates that the program executed successfully.<br /><br /><span class="text-sm text-gray-500 font-mono">Line 6</span>',
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
            content_text: '<strong>What is it?</strong><br />Closing curly brace.<br /><br /><strong>Purpose:</strong><br />Marks the end of the <code>main()</code> function. Every opening brace must have a matching closing brace.<br /><br /><strong>Program Execution Flow</strong><br /><ul class="list-disc pl-5 mt-2 space-y-1"><li>Preprocessor processes <code>#include &lt;stdio.h&gt;</code></li><li>Compiler compiles the program.</li><li>Execution enters <code>main()</code></li><li>The statement <code>printf()</code> is executed.</li><li>Output appears on the screen.</li><li><code>return 0;</code> returns control to OS.</li><li>Program terminates successfully.</li></ul><br /><strong>Modified Example Using New Line</strong>',
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
            content_text: '<strong>Output:</strong>',
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
            content_text: '<strong>What is \\n?</strong><br /><code>\\n</code> is called a newline character. It moves the cursor to the next line after printing.<br /><br /><strong>Common Mistakes</strong><br /><ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Missing Header File:</strong> Compiler may not recognize <code>printf()</code>.</li><li><strong>Missing Semicolon:</strong> Syntax error will occur.</li><li><strong>Missing Curly Braces:</strong> Function body won\'t be recognized.</li><li><strong>Incorrect Quotes:</strong> Strings must use double quotes (<code>" "</code>).</li></ul>',
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
