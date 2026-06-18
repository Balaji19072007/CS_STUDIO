require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP4T1Blocks = [
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is printf()?</h3><p><code>printf()</code> is a predefined library function used to display output on the screen. The word <strong>printf</strong> stands for <strong>Print Formatted</strong>.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Syntax:</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'syntax',
        content_text: 'printf("message");',
        order_index: 2
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Example:</p>',
        order_index: 3
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("Hello World");',
        order_index: 4
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Hello World</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Printing Text</h3>',
        order_index: 5
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Welcome to C Programming");\n\n    return 0;\n}',
        order_index: 6
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Welcome to C Programming</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Printing Variables</h3>',
        order_index: 7
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n\n    printf("Age = %d", age);\n\n    return 0;\n}',
        order_index: 8
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Age = 20</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Printing Multiple Variables</h3>',
        order_index: 9
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float cgpa = 8.5;\n\n    printf("Age = %d CGPA = %f", age, cgpa);\n\n    return 0;\n}',
        order_index: 10
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Age = 20 CGPA = 8.500000</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">New Line Character</h3>',
        order_index: 11
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("Hello\\n");\nprintf("World");',
        order_index: 12
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Hello\nWorld</pre>',
        order_index: 13
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'note',
        content_text: 'According to the PDF, <code>\\n</code> prints a new line character and moves the cursor to the next line.',
        order_index: 14
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Escape Sequences</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden"><thead class="bg-gray-50 dark:bg-gray-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Escape Sequence</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Meaning</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"><tr class="hover:bg-gray-50 dark:hover:bg-gray-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">\\n</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">New Line</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">\\t</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Tab Space</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">\\\\</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Backslash</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">\\"</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Double Quote</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">\\\'</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Single Quote</td></tr></tbody></table></div><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>',
        order_index: 15
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("Name\\tAge");',
        order_index: 16
    },
    {
        topic_id: 'c-p4-t1',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white">Output:</p><pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">Name    Age</pre>',
        order_index: 17
    }
];

async function updateP4T1() {
    try {
        console.log('Updating Phase 4 Topic 1 Content and Challenge...');

        const { error: deleteBlocksError } = await supabase
            .from('topic_content')
            .delete()
            .eq('topic_id', 'c-p4-t1');

        if (deleteBlocksError) throw deleteBlocksError;
        
        const { error: insertBlocksError } = await supabase
            .from('topic_content')
            .insert(topicP4T1Blocks);

        if (insertBlocksError) throw insertBlocksError;
        console.log('Successfully updated topic blocks.');

        const topicId = 'c-p4-t1';

        console.log(`Deleting existing challenge for ${topicId}...`);
        await supabase.from('course_challenges').delete().eq('topic_id', topicId);

        const challengeData = {
            course_id: 'c-programming',
            topic_id: topicId,
            topic_name: 'printf() Function',
            title: 'Mastery Challenge',
            description: 'Write a C program to display a student\'s name, age, and percentage using the printf() function.\n\nVariables provided:\n- name (char[]): "Alice"\n- age (int): 20\n- percentage (float): 85.5',
            input_format: 'No input required.',
            output_format: 'Name: Alice\nAge: 20\nPercentage: 85.5',
            hints: 'Use the printf() function with appropriate format specifiers to display different types of data.',
            reference_output: 'Name: Alice\nAge: 20\nPercentage: 85.5',
            solution_code: '#include <stdio.h>\\n\\nint main() {\\n    char name[] = "Alice";\\n    int age = 20;\\n    float percentage = 85.5;\\n\\n    printf("Name: %s\\\\n", name);\\n    printf("Age: %d\\\\n", age);\\n    printf("Percentage: %.1f\\\\n", percentage);\\n\\n    return 0;\\n}'
        };

        console.log(`Inserting new challenge for ${topicId}...`);
        const { data, error } = await supabase
            .from('course_challenges')
            .insert(challengeData)
            .select('*');

        if (error) throw error;
        console.log('Successfully updated challenge:', JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Error updating P4T1:', err);
    }
}

updateP4T1();
