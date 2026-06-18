require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T6Blocks = [
    {
        topic_id: 'c-p2-t6',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Sometimes data must be converted from one type to another.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a = 10;\nfloat b;'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Convert integer into float.</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Implicit Type Conversion</h3><p>Performed automatically by the compiler.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a = 10;\nfloat b;\n\nb = a;'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 6,
        content_type: 'syntax',
        content_text: '```output\n10.000000\n```'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Explicit Type Conversion (Type Casting)</h3><p>Performed by the programmer.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Syntax:</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n(type)value'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfloat x = 9.87;\n\nint y;\n\ny = (int)x;'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 11,
        content_type: 'syntax',
        content_text: '```output\n9\n```'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 12,
        content_type: 'explanation',
        content_text: '<p class="mt-4 text-sm text-gray-600 dark:text-gray-400">The decimal part is removed.</p>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 13,
        content_type: 'note',
        content_text: 'Casting forces one data type to become another data type.'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 15,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    float num = 5.75;\n\n    int result = (int)num;\n\n    printf("%d", result);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p2-t6',
        order_index: 16,
        content_type: 'syntax',
        content_text: '```output\n5\n```'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t6',
    topic_name: 'Type Conversion and Casting',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate type conversion and type casting by converting an integer value to a float and displaying the result.',
    input_format: 'No input required.',
    output_format: 'Integer Value = 10\nFloat Value = 10.00',
    hints: 'Use a type cast to convert one data type into another before performing calculations.',
    reference_output: 'Integer Value = 10\nFloat Value = 10.00',
    solution_code: `#include <stdio.h>\n\nint main() {\n    int num = 10;\n\n    float result = (float)num;\n\n    printf("Integer Value = %d\\n", num);\n    printf("Float Value = %.2f\\n", result);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T6() {
    console.log('Updating Phase 2 Topic 6 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t6');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T6Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t6!');
    }

    console.log('Updating Phase 2 Topic 6 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t6');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t6!');
    }
}

updateP2T6();
