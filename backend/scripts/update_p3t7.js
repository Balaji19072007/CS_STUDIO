require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T7Blocks = [
    {
        topic_id: 'c-p3-t7',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>The ternary operator is a shortcut for simple if-else statements.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Format:</p><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">condition ? expression1 : expression2</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Meaning:</p><p class="mt-2 text-gray-700 dark:text-gray-300">If condition is true, execute expression1, otherwise execute expression2.</p>'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Syntax</h3>'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ncondition ? true_part : false_part;'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Example</h3>'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a = 20;\nint b = 10;\n\nint max = (a > b) ? a : b;'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">20</p>'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Equivalent if-else</h3>'
    },
    {
        topic_id: 'c-p3-t7',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(a > b)\n    max = a;\nelse\n    max = b;'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t7',
    topic_name: 'Conditional (Ternary) Operator',
    title: 'Mastery Challenge',
    description: 'Write a C program to find the larger of two numbers using the conditional (ternary) operator.',
    input_format: 'No input required.',
    output_format: 'Larger Number = 20',
    hints: 'Use the ? : operator to choose between two values based on a condition.',
    reference_output: 'Larger Number = 20',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 15, b = 20;\n\n    int max = (a > b) ? a : b;\n\n    printf("Larger Number = %d\\n", max);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T7() {
    console.log('Updating Phase 3 Topic 7 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t7');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T7Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t7!');
    }

    console.log('Updating Phase 3 Topic 7 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t7');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t7!');
    }
}

updateP3T7();
