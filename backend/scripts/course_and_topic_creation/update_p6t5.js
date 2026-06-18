const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t5',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is break?</h3><p>The break statement immediately terminates a loop.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">According to the PDF:</p><p class="mt-2 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">break → exit from loop or switch</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nbreak;',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'syntax',
        content_text: '```c\nbreak;\n```',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i;\n\n    for(i=1;i<=10;i++)\n    {\n        if(i==5)\n        {\n            break;\n        }\n\n        printf("%d\\n",i);\n    }\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'syntax',
        content_text: '```output\n1\n2\n3\n4\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t5',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Working</h3><p class="font-bold text-gray-900 dark:text-white">When:</p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-2"><p class="font-mono text-gray-800 dark:text-gray-200">i == 5</p></div><p class="mt-4 text-red-600 dark:text-red-400 font-bold">The break statement executes and loop ends immediately.</p>',
        order_index: 7
    }
];

const challengeData = {
    topic_id: 'c-p6-t5',
    title: 'Stop at Zero',
    description: 'Write a C program to accept numbers from the user continuously and stop the program when the user enters 0 using the break statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    while (1) {\n        printf("Enter a number (0 to stop): ");\n        scanf("%d", &num);\n\n        if (num == 0) {\n            break;\n        }\n\n        printf("You entered: %d\\n", num);\n    }\n\n    printf("Program terminated.\\n");\n\n    return 0;\n}',
    input_format: 'A sequence of integers ending with 0.',
    output_format: 'Enter a number (0 to stop): 15\nYou entered: 15\nEnter a number (0 to stop): 25\nYou entered: 25\nEnter a number (0 to stop): 0\nProgram terminated.',
    reference_output: 'Enter a number (0 to stop): You entered: 15\nEnter a number (0 to stop): You entered: 25\nEnter a number (0 to stop): Program terminated.\n',
    hints: JSON.stringify(['Use an infinite loop and terminate it with break when the entered number is 0.']),
    difficulty: 'Easy'
};

async function updateP6T5() {
    console.log('Updating Phase 6 Topic 5 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t5');
        
    if (deleteError) {
        console.error('Error deleting old content:', deleteError);
        return;
    }
    
    const { error: insertError } = await supabase
        .from('topic_content')
        .insert(topicContent);
        
    if (insertError) {
        console.error('Error inserting new content:', insertError);
        return;
    }
    console.log('Successfully updated content for c-p6-t5!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t5');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t5');
            
        if (updateError) {
            console.error('Error updating challenge:', updateError);
            return;
        }
        console.log('Challenge updated successfully.');
    } else {
        const { error: insertChallengeError } = await supabase
            .from('course_challenges')
            .insert({ ...challengeData, course_id: 'c-programming' });
            
        if (insertChallengeError) {
            console.error('Error inserting challenge:', insertChallengeError);
            return;
        }
        console.log('Challenge inserted successfully.');
    }
}

updateP6T5();
