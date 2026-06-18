require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t2';
    
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
            content_text: 'To write and execute a C program, you need a text editor and a C compiler.',
            order_index: 1
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'What is Needed?\n• Text Editor: Used to write source code. Example: VS Code, Code::Blocks, Vim, Notepad++.\n• C Compiler: Converts C code into machine code. Example: GCC compiler.',
            order_index: 2
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Steps\n• Create a file ending with .c (Example: firstprog.c)\n• Write the program.\n• Save the file.\n• Compile the program: gcc firstprog.c or cc firstprog.c\n• Run the executable: a.out',
            order_index: 3
        }
    ];

    const { data, error } = await supabase
        .from('topic_content')
        .insert(blocks);

    if (error) {
        console.error("Insert Error:", error);
    } else {
        console.log("Successfully updated topic content for c-p1-t2!");
    }
}
run();
