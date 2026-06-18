const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t2',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is if-else?</h3><p>The <code>if-else</code> statement provides two choices.</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>If condition is true &rarr; execute if block.</li><li>Otherwise &rarr; execute else block.</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(condition)\n{\n    statements1;\n}\nelse\n{\n    statements2;\n}'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flow of Execution</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/if-else-flowchart.jpg" alt="if-else statement flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><p class="mt-8 font-bold text-gray-900 dark:text-white">Example</p>'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 16;\n\n    if(age >= 18)\n    {\n        printf("Eligible to Vote");\n    }\n    else\n    {\n        printf("Not Eligible");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nNot Eligible\n```'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example: Even or Odd</p>'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 7,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int number = 7;\n\n    if(number % 2 == 0)\n    {\n        printf("Even Number");\n    }\n    else\n    {\n        printf("Odd Number");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t2',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nOdd Number\n```'
    }
];

const challengeData = {
    topic_id: 'c-p5-t2',
    title: 'Check Positive or Negative',
    description: 'Write a C program to check whether a number entered by the user is positive or negative using an if-else statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    if (num >= 0) {\n        printf("The number is positive.\\n");\n    } else {\n        printf("The number is negative.\\n");\n    }\n\n    return 0;\n}',
    input_format: 'A single integer.',
    output_format: 'Output 1\nEnter a number: 10\nThe number is positive.\n\nOutput 2\nEnter a number: -5\nThe number is negative.\n\nOutput 3\nEnter a number: 0\nThe number is positive.',
    reference_output: 'Enter a number: The number is positive.',
    hints: JSON.stringify(['Use an if-else statement to execute one block when the condition is true and another when it is false.']),
    difficulty: 'Easy'
};

async function updateP5T2() {
    console.log('Updating Phase 5 Topic 2 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t2');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t2!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t2')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t2');
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

updateP5T2();
