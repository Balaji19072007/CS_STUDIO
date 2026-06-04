require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T2Blocks = [
    {
        topic_id: 'c-p3-t2',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Relational operators compare two values.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Result is either:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>1 → True</li><li>0 → False</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Relational Operators</h3><table class="w-full text-left border-collapse mt-4 mb-8"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Operator</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Meaning</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">==</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Equal To</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">!=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Not Equal To</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&gt;</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Greater Than</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&lt;</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Less Than</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&gt;=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Greater Than or Equal To</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&lt;=</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Less Than or Equal To</td></tr></tbody></table>'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Equal To (==)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n10 == 10'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 4,
        content_type: 'syntax',
        content_text: '```output\n1\n```'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-gray-700 dark:text-gray-300">True because both values are equal.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Not Equal To (!=)</h3><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n10 != 20'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 7,
        content_type: 'syntax',
        content_text: '```output\n1\n```'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-gray-700 dark:text-gray-300">True because values are different.</p><h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 9,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int a = 10;\n    int b = 20;\n\n    printf("%d\\n", a == b);\n    printf("%d\\n", a != b);\n    printf("%d\\n", a < b);\n    printf("%d\\n", a > b);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p3-t2',
        order_index: 10,
        content_type: 'note',
        content_text: 'equality testing uses == and inequality uses != .'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t2',
    topic_name: 'Relational Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to compare two integers using relational operators and display the results.',
    input_format: 'No input required.',
    output_format: 'a > b  = 0\na < b  = 1\na >= b = 0\na <= b = 1\na == b = 0\na != b = 1',
    hints: 'Use relational operators (>, <, >=, <=, ==, !=) to compare two values.',
    reference_output: 'a > b  = 0\na < b  = 1\na >= b = 0\na <= b = 1\na == b = 0\na != b = 1',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf("a > b  = %d\\n", a > b);\n    printf("a < b  = %d\\n", a < b);\n    printf("a >= b = %d\\n", a >= b);\n    printf("a <= b = %d\\n", a <= b);\n    printf("a == b = %d\\n", a == b);\n    printf("a != b = %d\\n", a != b);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T2() {
    console.log('Updating Phase 3 Topic 2 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t2');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T2Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t2!');
    }

    console.log('Updating Phase 3 Topic 2 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t2');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t2!');
    }
}

updateP3T2();
