const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t3',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Nested if-else?</h3><p>When one <code>if</code> statement is placed inside another <code>if</code> statement, it is called a nested if-else.</p><p class="mt-2 text-gray-700 dark:text-gray-300">Used when multiple conditions must be checked.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(condition1)\n{\n    if(condition2)\n    {\n        statements;\n    }\n}'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flowchart</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/nested-if-else-flowchart.jpg" alt="nested if-else statement flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><p class="mt-8 font-bold text-gray-900 dark:text-white">Example</p><p class="mt-2 text-gray-700 dark:text-gray-300">Check whether a number is positive and even.</p>'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 8;\n\n    if(num > 0)\n    {\n        if(num % 2 == 0)\n        {\n            printf("Positive Even Number");\n        }\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nPositive Even Number\n```'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example: Student Result</p>'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 7,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks = 85;\n\n    if(marks >= 50)\n    {\n        if(marks >= 75)\n        {\n            printf("Distinction");\n        }\n        else\n        {\n            printf("Pass");\n        }\n    }\n    else\n    {\n        printf("Fail");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t3',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nDistinction\n```'
    }
];

const challengeData = {
    topic_id: 'c-p5-t3',
    title: 'Leap Year Checker',
    description: 'Write a C program to check whether a year entered by the user is a leap year or not using nested if-else statements.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int year;\n\n    printf("Enter a year: ");\n    scanf("%d", &year);\n\n    if (year % 4 == 0) {\n        if (year % 100 == 0) {\n            if (year % 400 == 0) {\n                printf("Leap Year\\n");\n            } else {\n                printf("Not a Leap Year\\n");\n            }\n        } else {\n            printf("Leap Year\\n");\n        }\n    } else {\n        printf("Not a Leap Year\\n");\n    }\n\n    return 0;\n}',
    input_format: 'A single integer representing the year.',
    output_format: 'Output 1\nEnter a year: 2024\nLeap Year\n\nOutput 2\nEnter a year: 1900\nNot a Leap Year\n\nOutput 3\nEnter a year: 2000\nLeap Year',
    reference_output: 'Enter a year: Leap Year',
    hints: JSON.stringify(['A leap year is divisible by 4. If it is divisible by 100, then it must also be divisible by 400.']),
    difficulty: 'Easy'
};

async function updateP5T3() {
    console.log('Updating Phase 5 Topic 3 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t3');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t3!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t3')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t3');
        if (updateError) console.error('Error updating challenge:', updateError);
        else console.log('Challenge updated successfully.');
    } else {
        const { error: insertError } = await supabase
            .from('course_challenges')
            .insert(challengeData);
        if (insertError) console.error('Error inserting challenge:', insertError);
        else console.log('Challenge inserted successfully.');
    }
}

updateP5T3();
