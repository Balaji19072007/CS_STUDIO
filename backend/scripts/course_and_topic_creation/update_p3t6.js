require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T6Blocks = [
    {
        topic_id: 'c-p3-t6',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Bitwise operators work directly on binary bits.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">5 = 0101<br>3 = 0011</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Bitwise AND (&amp;)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n5 & 3;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Binary:</p><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">0101<br>0011<br>----<br>0001</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">1</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Bitwise OR (|)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n5 | 3;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">7</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Bitwise XOR (^)</h3><p>Returns 1 only when bits differ.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 9,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n5 ^ 3;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 10,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">6</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Bitwise NOT (~)</h3><p>Flips all bits.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n~5;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Result:</p><p class="mt-2 text-gray-700 dark:text-gray-300">Depends on system representation.</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Left Shift (&lt;&lt;)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 15,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n5 << 1;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 16,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">10</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 17,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Right Shift (&gt;&gt;)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 18,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n8 >> 1;'
    },
    {
        topic_id: 'c-p3-t6',
        order_index: 19,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">4</p><div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg"><p class="text-gray-800 dark:text-gray-200"><strong>Note:</strong> Distinguish logical operators (&amp;&amp;, ||) from bitwise operators (&amp;, |).</p></div>'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t6',
    topic_name: 'Bitwise Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of bitwise operators (&, |, ^, ~) on two integer values and display the results.',
    input_format: 'No input required.',
    output_format: 'a & b = 1\na | b = 7\na ^ b = 6\n~a = -6',
    hints: 'Use bitwise operators to perform operations directly on the binary representation of integers.',
    reference_output: 'a & b = 1\na | b = 7\na ^ b = 6\n~a = -6',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n\n    printf("a & b = %d\\n", a & b);\n    printf("a | b = %d\\n", a | b);\n    printf("a ^ b = %d\\n", a ^ b);\n    printf("~a = %d\\n", ~a);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T6() {
    console.log('Updating Phase 3 Topic 6 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t6');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T6Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t6!');
    }

    console.log('Updating Phase 3 Topic 6 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t6');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t6!');
    }
}

updateP3T6();
