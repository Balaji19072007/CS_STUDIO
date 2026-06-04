require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t3';
    
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
            content_text: 'A C program generally contains:\n• Preprocessor Directives\n• Global Declarations\n• Main Function\n• Statements\n• User-defined Functions',
            order_index: 1
        },
        {
            topic_id: topicId,
            content_type: 'example',
            content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Hello World");\n    return 0;\n}',
            order_index: 2
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Components\n\n1. Header File',
            order_index: 3
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: '#include <stdio.h>',
            order_index: 4
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Includes standard input/output functions.\n\n2. Main Function',
            order_index: 5
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'int main(){\n    // write code here\n    return 0;\n}',
            order_index: 6
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Execution starts from the main function. Every C program must have a main function.\n\n3. Statements\nInstructions written inside the main function.\n\n4. Return 0',
            order_index: 7
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: 'return 0;',
            order_index: 8
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Used to terminate the main function and return the value 0 to the operating system, indicating that the program executed successfully without errors.\n\n5. Semicolon',
            order_index: 9
        },
        {
            topic_id: topicId,
            content_type: 'syntax',
            content_text: ';',
            order_index: 10
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Every statement ends with a semicolon (;). It acts as a statement terminator.',
            order_index: 11
        }
    ];

    const { data, error } = await supabase
        .from('topic_content')
        .insert(blocks);

    if (error) {
        console.error("Insert Error:", error);
    } else {
        console.log("Successfully updated topic content for c-p1-t3!");
    }
}
run();
