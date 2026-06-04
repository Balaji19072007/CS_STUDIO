require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T5Blocks = [
    {
        topic_id: 'c-p3-t5',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>These operators increase or decrease a value by one.</p><p class="mt-2 text-gray-700 dark:text-gray-300">The PDF states that ++ and -- are more efficient than writing x=x+1 and x=x-1.</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Increment (++)</h3>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx++;'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Equivalent to:</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx = x + 1;'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Example usage:</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint x = 5;\nx++;'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Result:</p><p class="mt-2 text-gray-700 dark:text-gray-300">6</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Decrement (--)</h3>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx--;'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Equivalent to:</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nx = x - 1;'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Result:</p><p class="mt-2 text-gray-700 dark:text-gray-300">4</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Prefix Increment</h3><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">++x</p><ul class="list-disc pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300"><li>Increment first.</li><li>Then use value.</li></ul><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 15,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint x = 5;\nprintf("%d", ++x);'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 16,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">6</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 17,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Postfix Increment</h3><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">x++</p><ul class="list-disc pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300"><li>Use value first.</li><li>Then increment.</li></ul><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 18,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint x = 5;\nprintf("%d", x++);'
    },
    {
        topic_id: 'c-p3-t5',
        order_index: 19,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">5</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Final value of x:</p><p class="mt-2 text-gray-700 dark:text-gray-300">6</p><div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-gray-800 dark:text-gray-200"><strong>Note:</strong> Prefix computes the value before evaluation while postfix computes it after evaluation.</p></div>'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t5',
    topic_name: 'Increment and Decrement Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of increment (++) and decrement (--) operators on an integer variable.',
    input_format: 'No input required.',
    output_format: 'Initial Value = 10\nAfter Increment = 11\nAfter Decrement = 10',
    hints: 'Use ++ to increase a variable\'s value by 1 and -- to decrease it by 1.',
    reference_output: 'Initial Value = 10\nAfter Increment = 11\nAfter Decrement = 10',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    printf("Initial Value = %d\\n", a);\n\n    a++;\n    printf("After Increment = %d\\n", a);\n\n    a--;\n    printf("After Decrement = %d\\n", a);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T5() {
    console.log('Updating Phase 3 Topic 5 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t5');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T5Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t5!');
    }

    console.log('Updating Phase 3 Topic 5 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t5');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t5!');
    }
}

updateP3T5();
