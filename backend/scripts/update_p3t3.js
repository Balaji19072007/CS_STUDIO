require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T3Blocks = [
    {
        topic_id: 'c-p3-t3',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Logical operators combine multiple conditions.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Used mainly in:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>if statements</li><li>loops</li><li>decision making</li></ul>'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Logical AND (&&)</h3><p>Returns true only if both conditions are true.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n(a > 5 && b < 20)'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Truth Table</h3><table class="w-full text-left border-collapse mt-4 mb-8"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Condition 1</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Condition 2</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Result</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-emerald-600 dark:text-emerald-400 font-bold">True</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-emerald-600 dark:text-emerald-400 font-bold">True</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-emerald-600 dark:text-emerald-400 font-bold">True</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-emerald-600 dark:text-emerald-400 font-bold">True</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-emerald-600 dark:text-emerald-400 font-bold">True</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-600 dark:text-red-400 font-bold">False</td></tr></tbody></table>'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Logical OR (||)</h3><p>Returns true if at least one condition is true.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n(a > 5 || b > 100)'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Logical NOT (!)</h3><p>Reverses the result.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n!(10 > 5)'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 9,
        content_type: 'syntax',
        content_text: '```output\n0\n```'
    },
    {
        topic_id: 'c-p3-t3',
        order_index: 10,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Because:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>10 > 5 = True</li><li>NOT True = False</li></ul>'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t3',
    topic_name: 'Logical Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of logical operators (&&, ||, !) by evaluating logical expressions.',
    input_format: 'No input required.',
    output_format: '(a < b && b > 15) = 1\n(a > b || b > 15) = 1\n!(a > b) = 1',
    hints: 'Use logical operators to combine or negate relational expressions.',
    reference_output: '(a < b && b > 15) = 1\n(a > b || b > 15) = 1\n!(a > b) = 1',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf("(a < b && b > 15) = %d\\n", (a < b && b > 15));\n    printf("(a > b || b > 15) = %d\\n", (a > b || b > 15));\n    printf("!(a > b) = %d\\n", !(a > b));\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T3() {
    console.log('Updating Phase 3 Topic 3 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t3');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T3Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t3!');
    }

    console.log('Updating Phase 3 Topic 3 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t3');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t3!');
    }
}

updateP3T3();
