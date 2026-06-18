require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topic6Blocks = [
    {
        topic_id: 'c-p1-t6',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<p>The PDF explains that C programs go through several stages before execution.</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 1: Source Code</h3><p>Program written by the programmer.</p><p class="mt-2 font-bold">Example:</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 3,
        content_type: 'syntax',
        content_text: 'firstprog.c'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 2: Preprocessing</h3><p>The preprocessor handles directives beginning with #.</p><p class="mt-2 font-bold">Example:</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 5,
        content_type: 'syntax',
        content_text: '#include <stdio.h>\n#define MAX 100'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p>It expands header files and macros.</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 3: Compilation</h3><p>The compiler converts C code into assembly language.</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 4: Linking</h3><p>Required library functions are linked.</p><p class="mt-2 font-bold">Example:</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 9,
        content_type: 'syntax',
        content_text: 'printf()'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 10,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 5: Executable File</h3><p>The executable file is created.</p><p class="mt-2 font-bold">Default:</p>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 11,
        content_type: 'syntax',
        content_text: 'a.out'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 12,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 6: Execution</h3><p>Run the program and observe the output.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Compilation Command</h3>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 13,
        content_type: 'syntax',
        content_text: '```bash\ngcc firstprog.c\n```'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Create Named Executable</h3>'
    },
    {
        topic_id: 'c-p1-t6',
        order_index: 15,
        content_type: 'syntax',
        content_text: '```bash\ngcc -o myprogram firstprog.c\n```'
    }
];

async function updateData() {
    console.log('Updating topic 6...');
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p1-t6');
    const { error: t6Err } = await supabase.from('topic_content').insert(topic6Blocks);
    if (t6Err) console.error('Error topic 6:', t6Err);
    else console.log('Successfully inserted topic 6 blocks');

    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p1-t6');
    console.log('Deleted challenge for topic 6');

    // Update topic 4 blocks to use output markdown tag for outputs!
    // order_index 5 in topic 4
    const { error: u1 } = await supabase.from('topic_content')
        .update({ content_text: '```output\nThis is my first program in C\n```' })
        .eq('topic_id', 'c-p1-t4')
        .eq('order_index', 5)
        .eq('content_type', 'syntax');
    if(u1) console.error('Error updating t4 5:', u1);

    // order_index 21 in topic 4
    const { error: u2 } = await supabase.from('topic_content')
        .update({ content_text: '```output\nThis is my first program in C\n```' })
        .eq('topic_id', 'c-p1-t4')
        .eq('order_index', 21)
        .eq('content_type', 'syntax');
    if(u2) console.error('Error updating t4 21:', u2);

    console.log('Topic 4 outputs updated to use output tag.');
}

updateData();
