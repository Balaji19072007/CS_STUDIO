const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicP4T5Blocks = [
    {
        topic_id: 'c-p4-t5',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>These functions are used to handle strings.</p><p class="mt-4">A string is a collection of characters.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nHello\nProgramming\nComputer'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">gets()</h3><p class="font-bold text-gray-900 dark:text-white">Purpose</p><p class="mt-2 mb-4">Reads an entire string from the keyboard.</p><p class="font-bold text-gray-900 dark:text-white">Syntax</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 4,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ngets(string_name);'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar name[50];\n\ngets(name);'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 7,
        content_type: 'syntax',
        content_text: '```output\nJohn Smith\n```'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">The entire line is stored.</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">puts()</h3><p class="font-bold text-gray-900 dark:text-white">Purpose</p><p class="mt-2 mb-4">Displays a string on the screen.</p><p class="font-bold text-gray-900 dark:text-white">Syntax</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nputs(string_name);'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nputs(name);'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 14,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    char name[50];\n\n    printf("Enter your name: ");\n\n    gets(name);\n\n    printf("Your name is:\\n");\n\n    puts(name);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 15,
        content_type: 'syntax',
        content_text: '```output\nEnter your name: John Smith\nYour name is:\nJohn Smith\n```'
    },
    {
        topic_id: 'c-p4-t5',
        order_index: 16,
        content_type: 'note',
        content_text: 'Modern C programming prefers <code>fgets()</code> instead of <code>gets()</code> because <code>gets()</code> can cause buffer overflow problems.'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p4-t5',
    topic_name: 'gets() and puts()',
    title: 'Mastery Challenge',
    description: 'Write a C program to read a string from the user using gets() and display it using puts().',
    input_format: 'A string.',
    output_format: 'Enter a string: Welcome To CS Studio\nYou entered:\nWelcome To CS Studio',
    hints: 'Use gets() to accept a string and puts() to display it.',
    reference_output: 'Enter a string: Welcome To CS Studio\nYou entered:\nWelcome To CS Studio',
    solution_code: `#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf("Enter a string: ");\n    gets(str);\n\n    printf("You entered:\\n");\n    puts(str);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP4T5() {
    console.log('Updating Phase 4 Topic 5 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p4-t5');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP4T5Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p4-t5!');
    }

    console.log('Updating Phase 4 Topic 5 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p4-t5');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p4-t5!');
    }
}

updateP4T5();
