require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP4T2Blocks = [
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is scanf()?</h3><p><code>scanf()</code> is a predefined library function used to receive input from the user. The word <strong>scanf</strong> stands for <strong>Scan Formatted</strong>.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Syntax:</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'syntax',
        content_text: 'scanf("format_specifier", &variable);',
        order_index: 2
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Example:</p>',
        order_index: 3
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nscanf("%d", &age);',
        order_index: 4
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use & ?</h3><p>The <code>&</code> operator gives the memory address of a variable.</p><p class="mt-2"><code>scanf()</code> stores user input directly into memory.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age;\n\nscanf("%d", &age);',
        order_index: 6
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<p class="mt-2">The value entered by the user is stored in the memory location of <code>age</code>.</p>',
        order_index: 7
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'note',
        content_text: 'According to the PDF, variables appearing in <code>scanf()</code> are preceded by the address operator (<code>&</code>).',
        order_index: 8
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>',
        order_index: 9
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age;\n\n    printf("Enter age: ");\n    scanf("%d", &age);\n\n    printf("Age = %d", age);\n\n    return 0;\n}',
        order_index: 10
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white mt-4">Input:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">21</pre><p class="font-bold text-gray-900 dark:text-white mt-4">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Age = 21</pre>',
        order_index: 11
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reading Multiple Values</h3>',
        order_index: 12
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int a, b;\n\n    scanf("%d %d", &a, &b);\n\n    printf("%d %d", a, b);\n\n    return 0;\n}',
        order_index: 13
    },
    {
        topic_id: 'c-p4-t2',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white mt-4">Input:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">10 20</pre><p class="font-bold text-gray-900 dark:text-white mt-4">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">10 20</pre>',
        order_index: 14
    }
];

async function updateP4T2() {
    try {
        console.log('Updating Phase 4 Topic 2 Content and Challenge...');

        const { error: deleteBlocksError } = await supabase
            .from('topic_content')
            .delete()
            .eq('topic_id', 'c-p4-t2');

        if (deleteBlocksError) throw deleteBlocksError;
        
        const { error: insertBlocksError } = await supabase
            .from('topic_content')
            .insert(topicP4T2Blocks);

        if (insertBlocksError) throw insertBlocksError;
        console.log('Successfully updated topic blocks.');

        const topicId = 'c-p4-t2';

        console.log(`Deleting existing challenge for ${topicId}...`);
        await supabase.from('course_challenges').delete().eq('topic_id', topicId);

        const challengeData = {
            course_id: 'c-programming',
            topic_id: topicId,
            topic_name: 'scanf() Function',
            title: 'Mastery Challenge',
            description: 'Write a C program to read an integer from the user using the scanf() function and display the entered value.',
            input_format: 'An integer value (e.g., 25)',
            output_format: 'Enter a number: 25\nYou entered: 25',
            hints: 'Use scanf() with the appropriate format specifier to accept input from the user.',
            reference_output: 'Enter a number: You entered: 25',
            solution_code: '#include <stdio.h>\\n\\nint main() {\\n    int num;\\n\\n    printf("Enter a number: ");\\n    scanf("%d", &num);\\n\\n    printf("You entered: %d\\\\n", num);\\n\\n    return 0;\\n}'
        };

        console.log(`Inserting new challenge for ${topicId}...`);
        const { data, error } = await supabase
            .from('course_challenges')
            .insert(challengeData)
            .select('*');

        if (error) throw error;
        console.log('Successfully updated challenge:', JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Error updating P4T2:', err);
    }
}

updateP4T2();
