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
            content_text: 'Components\n• Header File (#include <stdio.h>): Includes standard input/output functions.\n• Main Function: Execution starts from the main function. Every C program must have a main function.\n• Statements: Instructions written inside the main function.\n• Semicolon: Every statement ends with a semicolon (;).',
            order_index: 3
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
