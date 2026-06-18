const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p7-t4',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Return Statement?</h3><p class="text-gray-700 dark:text-gray-300 mb-6">The return statement sends a value back to the calling function.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'syntax',
        content_text: '```c\nreturn value;\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint square(int n)\n{\n    return n * n;\n}',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint square(int n)\n{\n    return n * n;\n}\n\nint main()\n{\n    int result;\n\n    result = square(5);\n\n    printf("%d", result);\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'syntax',
        content_text: '```output\n25\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3>',
        order_index: 7
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nsquare(5)\n   |\n5 × 5\n   |\n25 returned\n   |\nStored in result',
        order_index: 8
    },
    {
        topic_id: 'c-p7-t4',
        content_type: 'explanation',
        content_text: '<p class="mt-6 text-gray-700 dark:text-gray-300 mb-6">The return statement passes the result back to the calling function.</p>',
        order_index: 9
    }
];

const challengeData = {
    topic_id: 'c-p7-t4',
    title: 'Largest of Two Numbers',
    description: 'Write a C program to create a function that returns the larger of two numbers using the return statement.',
    solution_code: '#include <stdio.h>\n\nint findMax(int a, int b) {\n    if (a > b)\n        return a;\n    else\n        return b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf("Enter two numbers: ");\n    scanf("%d %d", &num1, &num2);\n\n    printf("Largest Number = %d\\n", findMax(num1, num2));\n\n    return 0;\n}',
    input_format: '15 25',
    output_format: 'Enter two numbers: 15 25\nLargest Number = 25',
    reference_output: 'Enter two numbers: Largest Number = 25',
    hints: JSON.stringify(['Use the return statement to send a value from the function back to the calling function.']),
    difficulty: 'Easy'
};

async function updateP7T4() {
    console.log('Updating Phase 7 Topic 4 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p7-t4');
        
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
    console.log('Successfully updated content for c-p7-t4!');
    
    console.log('Adding mastery challenge...');
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p7-t4');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p7-t4');
            
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

updateP7T4();
