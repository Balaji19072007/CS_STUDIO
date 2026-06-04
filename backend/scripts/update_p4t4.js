const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicP4T4Blocks = [
    {
        topic_id: 'c-p4-t4',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>These functions are used to work with single characters.</p><p class="mt-4">According to the PDF:</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint getchar(void);\nint putchar(char ch);'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">are used to read and write characters.</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">getchar()</h3><p class="font-bold text-gray-900 dark:text-white">Purpose</p><p class="mt-2 mb-4">Reads one character from the keyboard.</p><p class="font-bold text-gray-900 dark:text-white">Syntax</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ncharacter = getchar();'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar ch;\n\nch = getchar();'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nA\n```'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">putchar()</h3><p class="font-bold text-gray-900 dark:text-white">Purpose</p><p class="mt-2 mb-4">Displays one character on the screen.</p><p class="font-bold text-gray-900 dark:text-white">Syntax</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nputchar(character);'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar ch = \'A\';\n\nputchar(ch);'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 13,
        content_type: 'syntax',
        content_text: '```output\nA\n```'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 15,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    char ch;\n\n    printf("Enter a character: ");\n\n    ch = getchar();\n\n    printf("You entered: ");\n\n    putchar(ch);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p4-t4',
        order_index: 16,
        content_type: 'syntax',
        content_text: '```output\nEnter a character: B\nYou entered: B\n```'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p4-t4',
    topic_name: 'getchar() and putchar()',
    title: 'Mastery Challenge',
    description: 'Write a C program to read a character using getchar() and display it using putchar().',
    input_format: 'A single character.',
    output_format: 'Enter a character: C\nYou entered: C',
    hints: 'Use getchar() to accept a single character from the user and putchar() to display it.',
    reference_output: 'Enter a character: A\nYou entered: A',
    solution_code: `#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf("Enter a character: ");\n    ch = getchar();\n\n    printf("You entered: ");\n    putchar(ch);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP4T4() {
    console.log('Updating Phase 4 Topic 4 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p4-t4');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP4T4Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p4-t4!');
    }

    console.log('Updating Phase 4 Topic 4 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p4-t4');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p4-t4!');
    }
}

updateP4T4();
