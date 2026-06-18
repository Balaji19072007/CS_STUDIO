const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicP4T6Blocks = [
    {
        topic_id: 'c-p4-t6',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Formatted Output?</h3><p>Formatted output means displaying data in a specific format using format specifiers.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("Age = %d", age);'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">The output follows a particular format.</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Displaying Multiple Values</h3>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 5,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int roll = 101;\n    float marks = 95.5;\n\n    printf("Roll Number = %d\\n", roll);\n    printf("Marks = %.2f", marks);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 6,
        content_type: 'syntax',
        content_text: '```output\nRoll Number = 101\nMarks = 95.50\n```'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Controlling Decimal Places</h3><p class="font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfloat pi = 3.141592;'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Default</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("%f", pi);'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 11,
        content_type: 'syntax',
        content_text: '```output\n3.141592\n```'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 12,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Two Decimal Places</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 13,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("%.2f", pi);'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 14,
        content_type: 'syntax',
        content_text: '```output\n3.14\n```'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 15,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Three Decimal Places</p>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 16,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nprintf("%.3f", pi);'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 17,
        content_type: 'syntax',
        content_text: '```output\n3.142\n```'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 18,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Formatted Table Output</h3>'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 19,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Name\\tMarks\\n");\n    printf("John\\t90\\n");\n    printf("David\\t85\\n");\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 20,
        content_type: 'syntax',
        content_text: '```output\nName    Marks\nJohn    90\nDavid   85\n```'
    },
    {
        topic_id: 'c-p4-t6',
        order_index: 21,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Difference Between Input and Output Functions</h3><div class="overflow-x-auto"><table class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"><thead><tr class="bg-gray-50 dark:bg-gray-900"><th class="px-4 py-2 border-b text-left">Function</th><th class="px-4 py-2 border-b text-left">Purpose</th></tr></thead><tbody><tr><td class="px-4 py-2 border-b font-mono">printf()</td><td class="px-4 py-2 border-b">Display formatted output</td></tr><tr><td class="px-4 py-2 border-b font-mono">scanf()</td><td class="px-4 py-2 border-b">Receive formatted input</td></tr><tr><td class="px-4 py-2 border-b font-mono">getchar()</td><td class="px-4 py-2 border-b">Read one character</td></tr><tr><td class="px-4 py-2 border-b font-mono">putchar()</td><td class="px-4 py-2 border-b">Display one character</td></tr><tr><td class="px-4 py-2 border-b font-mono">gets()</td><td class="px-4 py-2 border-b">Read a string</td></tr><tr><td class="px-4 py-2 border-b font-mono">puts()</td><td class="px-4 py-2 border-b">Display a string</td></tr></tbody></table></div>'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p4-t6',
    topic_name: 'Formatted Output',
    title: 'Mastery Challenge',
    description: "Write a C program to display a student's name, roll number, and marks using formatted output.",
    input_format: 'No input required.',
    output_format: 'Student Details\n---------------\nName       : Ishan\nRoll No    : 101\nMarks      : 89.5',
    hints: 'Use printf() with format specifiers to display data in a well-structured format.',
    reference_output: 'Student Details\n---------------\nName       : Ishan\nRoll No    : 101\nMarks      : 89.5',
    solution_code: `#include <stdio.h>\n\nint main() {\n    char name[] = "Ishan";\n    int rollNo = 101;\n    float marks = 89.5;\n\n    printf("Student Details\\n");\n    printf("---------------\\n");\n    printf("Name       : %s\\n", name);\n    printf("Roll No    : %d\\n", rollNo);\n    printf("Marks      : %.1f\\n", marks);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP4T6() {
    console.log('Updating Phase 4 Topic 6 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p4-t6');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP4T6Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p4-t6!');
    }

    console.log('Updating Phase 4 Topic 6 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p4-t6');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p4-t6!');
    }
}

updateP4T6();
