const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is continue?</h3><p>The continue statement skips the current iteration and moves to the next iteration.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">continue → skip one iteration of loop</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ncontinue;',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'syntax',
        content_text: '```c\ncontinue;\n```',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i;\n\n    for(i=1;i<=5;i++)\n    {\n        if(i==3)\n        {\n            continue;\n        }\n\n        printf("%d\\n",i);\n    }\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'syntax',
        content_text: '```output\n1\n2\n4\n5\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Working</h3><p class="font-bold text-gray-900 dark:text-white">When:</p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-2"><p class="font-mono text-gray-800 dark:text-gray-200">i == 3</p></div><p class="mt-4 text-red-600 dark:text-red-400 font-bold">The continue statement skips printing 3 and moves to the next iteration.</p>',
        order_index: 7
    }
];

const challengeData = {
    topic_id: 'c-p6-t6',
    title: 'Skip a Number',
    description: 'Write a C program to print numbers from 1 to 10, skipping the number 5 using the continue statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 1; i <= 10; i++) {\n        if (i == 5) {\n            continue;\n        }\n        printf("%d ", i);\n    }\n\n    return 0;\n}',
    input_format: 'No input required.',
    output_format: '1 2 3 4 6 7 8 9 10',
    reference_output: '1 2 3 4 6 7 8 9 10 ',
    hints: JSON.stringify(['Use continue to skip the current iteration when a specific condition is met.']),
    difficulty: 'Easy'
};

async function updateP6T6() {
    console.log('Updating Phase 6 Topic 6 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t6');
        
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
    console.log('Successfully updated content for c-p6-t6!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t6');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t6');
            
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

updateP6T6();
