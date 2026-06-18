require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T4Blocks = [
    {
        topic_id: 'c-p3-t4',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Assignment operators assign values to variables.</p>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Simple Assignment (=)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint x = 10;'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-gray-700 dark:text-gray-300">Assigns 10 to x.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Compound Assignment Operators</h3><table class="w-full text-left border-collapse mt-4 mb-8"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Operator</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Meaning</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">+=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Add and Assign</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">-=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Subtract and Assign</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">*=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Multiply and Assign</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">/=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Divide and Assign</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">%=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Modulus and Assign</td></tr></tbody></table>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">+= Operator</h3>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx += 5;'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Equivalent to:</p>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx = x + 5;'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">-= Operator</h3>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx -= 2;'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Equivalent to:</p>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx = x - 2;'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example</h3>'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 14,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int x = 10;\n\n    x += 5;\n\n    printf("%d", x);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p3-t4',
        order_index: 15,
        content_type: 'syntax',
        content_text: '```output\n15\n```'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t4',
    topic_name: 'Assignment Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of assignment operators (=, +=, -=, *=, /=, %=) on an integer variable and display the results.',
    input_format: 'No input required.',
    output_format: 'After += : 15\nAfter -= : 12\nAfter *= : 24\nAfter /= : 6\nAfter %= : 0',
    hints: 'Use compound assignment operators to update the value of a variable.',
    reference_output: 'After += : 15\nAfter -= : 12\nAfter *= : 24\nAfter /= : 6\nAfter %= : 0',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    a += 5;\n    printf("After += : %d\\n", a);\n\n    a -= 3;\n    printf("After -= : %d\\n", a);\n\n    a *= 2;\n    printf("After *= : %d\\n", a);\n\n    a /= 4;\n    printf("After /= : %d\\n", a);\n\n    a %= 3;\n    printf("After %%= : %d\\n", a);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T4() {
    console.log('Updating Phase 3 Topic 4 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t4');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T4Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t4!');
    }

    console.log('Updating Phase 3 Topic 4 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t4');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t4!');
    }
}

updateP3T4();
