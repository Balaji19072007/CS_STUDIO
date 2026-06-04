require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T5Blocks = [
    {
        topic_id: 'c-p2-t5',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>sizeof is a special operator used to determine how many bytes a variable or data type occupies in memory.</p>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nsizeof(data_type)'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<p class="text-center font-bold text-gray-700 dark:text-gray-300">or</p>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nsizeof(variable)'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nsizeof(int)'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Possible output: 4</p>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Program</h3>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 10,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Size of int = %zu\\n", sizeof(int));\n    printf("Size of float = %zu\\n", sizeof(float));\n    printf("Size of char = %zu\\n", sizeof(char));\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 11,
        content_type: 'syntax',
        content_text: '```output\nSize of int = 4\nSize of float = 4\nSize of char = 1\n```'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 12,
        content_type: 'note',
        content_text: '(May vary by system.)'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Memory calculation</li><li>Dynamic memory allocation</li><li>Portable programs</li></ul>'
    },
    {
        topic_id: 'c-p2-t5',
        order_index: 14,
        content_type: 'note',
        content_text: 'sizeof() can be used with data types, variables, and structures.'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t5',
    topic_name: 'sizeof Operator',
    title: 'Mastery Challenge',
    description: 'Write a C program to find and display the memory size (in bytes) of different data types using the sizeof operator.',
    input_format: 'No input required.',
    output_format: 'Size of int = 4 bytes\nSize of float = 4 bytes\nSize of char = 1 bytes\nSize of double = 8 bytes',
    hints: 'Use the sizeof operator with data types or variables to determine their memory size.',
    reference_output: 'Size of int = 4 bytes\nSize of float = 4 bytes\nSize of char = 1 bytes\nSize of double = 8 bytes',
    solution_code: `#include <stdio.h>\n\nint main() {\n    printf("Size of int = %zu bytes\\n", sizeof(int));\n    printf("Size of float = %zu bytes\\n", sizeof(float));\n    printf("Size of char = %zu bytes\\n", sizeof(char));\n    printf("Size of double = %zu bytes\\n", sizeof(double));\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T5() {
    console.log('Updating Phase 2 Topic 5 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t5');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T5Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t5!');
    }

    console.log('Updating Phase 2 Topic 5 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t5');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t5!');
    }
}

updateP2T5();
