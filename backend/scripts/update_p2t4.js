require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T4Blocks = [
    {
        topic_id: 'c-p2-t4',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Type modifiers change the size or range of basic data types.</p><p class="mt-2">They allow more efficient memory usage.</p>'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Modifiers</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">short</h4><p class="text-sm font-mono text-blue-800 dark:text-blue-300 mb-2">short int age;</p><p class="text-sm text-blue-800 dark:text-blue-300">Stores smaller integers.</p></div><div class="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">long</h4><p class="text-sm font-mono text-purple-800 dark:text-purple-300 mb-2">long int population;</p><p class="text-sm text-purple-800 dark:text-purple-300">Stores larger integers.</p></div><div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20"><h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2">signed</h4><p class="text-sm text-emerald-800 dark:text-emerald-300 mb-2">Allows positive and negative values.</p><p class="text-sm font-mono text-emerald-800 dark:text-emerald-300">signed int marks;</p></div><div class="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20"><h4 class="font-bold text-amber-700 dark:text-amber-400 mb-2">unsigned</h4><p class="text-sm text-amber-800 dark:text-amber-300 mb-2">Allows only positive values.</p><p class="text-sm font-mono text-amber-800 dark:text-amber-300">unsigned int count;</p></div></div>'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 4,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nunsigned int students = 100;'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Examples</h3>'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nshort int a = 10;\nlong int b = 500000;\nunsigned int c = 100;'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Modifiers?</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Save memory</li><li>Increase range</li><li>Improve efficiency</li></ul>'
    },
    {
        topic_id: 'c-p2-t4',
        order_index: 8,
        content_type: 'note',
        content_text: 'unsigned can be used with integer and character types.'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t4',
    topic_name: 'Type Modifiers',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of type modifiers (short, long, unsigned) by declaring variables and displaying their values.',
    input_format: 'No input required.',
    output_format: 'Short Integer = 100\nLong Integer = 100000\nUnsigned Integer = 500',
    hints: 'Use type modifiers with integer data types to change their range and storage capacity.',
    reference_output: 'Short Integer = 100\nLong Integer = 100000\nUnsigned Integer = 500',
    solution_code: `#include <stdio.h>\n\nint main() {\n    short int a = 100;\n    long int b = 100000;\n    unsigned int c = 500;\n\n    printf("Short Integer = %d\\n", a);\n    printf("Long Integer = %ld\\n", b);\n    printf("Unsigned Integer = %u\\n", c);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T4() {
    console.log('Updating Phase 2 Topic 4 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t4');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T4Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t4!');
    }

    console.log('Updating Phase 2 Topic 4 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t4');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t4!');
    }
}

updateP2T4();
