require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T7Blocks = [
    {
        topic_id: 'c-p2-t7',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>An enumeration is a user-defined data type that consists of a set of named constants.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Keyword:</p>'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nenum'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 4,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nenum days\n{\n    Monday,\n    Tuesday,\n    Wednesday\n};'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example</h3>'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 6,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nenum days\n{\n    Monday,\n    Tuesday,\n    Wednesday\n};\n\nint main()\n{\n    enum days today;\n\n    today = Tuesday;\n\n    printf("%d", today);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 7,
        content_type: 'syntax',
        content_text: '```output\n1\n```'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Because:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>Monday = 0</li><li>Tuesday = 1</li><li>Wednesday = 2</li></ul>'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 9,
        content_type: 'note',
        content_text: 'enumeration constants start from 0 by default unless explicitly assigned.'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 10,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Custom Enumeration Values</h3>'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 11,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nenum months\n{\n    Jan = 1,\n    Feb,\n    Mar,\n    Apr\n};'
    },
    {
        topic_id: 'c-p2-t7',
        order_index: 12,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Values become:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>Jan = 1</li><li>Feb = 2</li><li>Mar = 3</li><li>Apr = 4</li></ul>'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t7',
    topic_name: 'Enumeration Types',
    title: 'Mastery Challenge',
    description: 'Write a C program to create an enumeration for the days of the week and display the value of a selected day.',
    input_format: 'No input required.',
    output_format: 'Value of WEDNESDAY = 3',
    hints: 'Use the enum keyword to define a set of named integer constants.',
    reference_output: 'Value of WEDNESDAY = 3',
    solution_code: `#include <stdio.h>\n\nenum Day {\n    SUNDAY,\n    MONDAY,\n    TUESDAY,\n    WEDNESDAY,\n    THURSDAY,\n    FRIDAY,\n    SATURDAY\n};\n\nint main() {\n    enum Day today = WEDNESDAY;\n\n    printf("Value of WEDNESDAY = %d\\n", today);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T7() {
    console.log('Updating Phase 2 Topic 7 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t7');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T7Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t7!');
    }

    console.log('Updating Phase 2 Topic 7 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t7');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t7!');
    }
}

updateP2T7();
