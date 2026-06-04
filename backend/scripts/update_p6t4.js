const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t4',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Nested Loops?</h3><p>A loop inside another loop is called a nested loop.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Structure:</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfor(...)\n{\n    for(...)\n    {\n        statements;\n    }\n}',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i,j;\n\n    for(i=1;i<=3;i++)\n    {\n        for(j=1;j<=3;j++)\n        {\n            printf("* ");\n        }\n\n        printf("\\n");\n    }\n\n    return 0;\n}',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'syntax',
        content_text: '```output\n* * *\n* * *\n* * *\n```',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><div class="space-y-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Outer Loop:</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Runs 3 times</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Inner Loop:</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Runs 3 times for every outer iteration</p></div><div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-300">Total executions:</h4><p class="font-mono text-sm text-blue-800 dark:text-blue-200 mt-1">3 × 3 = 9</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Pattern Program</h3>',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfor(i=1;i<=5;i++)\n{\n    for(j=1;j<=i;j++)\n    {\n        printf("*");\n    }\n\n    printf("\\n");\n}',
        order_index: 7
    },
    {
        topic_id: 'c-p6-t4',
        content_type: 'syntax',
        content_text: '```output\n*\n**\n***\n****\n*****\n```',
        order_index: 8
    }
];

const challengeData = {
    topic_id: 'c-p6-t4',
    title: 'Number Pattern',
    description: 'Write a C program to print the following number pattern using nested loops.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int i, j;\n\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf("%d ", j);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}',
    input_format: 'No input required.',
    output_format: '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5',
    reference_output: '1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 \n',
    hints: JSON.stringify(['Use the outer loop for rows and the inner loop to print numbers from 1 to the current row number.']),
    difficulty: 'Medium'
};

async function updateP6T4() {
    console.log('Updating Phase 6 Topic 4 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t4');
        
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
    console.log('Successfully updated content for c-p6-t4!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t4');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t4');
            
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

updateP6T4();
