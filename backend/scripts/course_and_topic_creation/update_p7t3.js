const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p7-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Function Calling?</h3><p class="text-gray-700 dark:text-gray-300">Executing a function is called function calling.</p><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">A function does nothing until it is called.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'syntax',
        content_text: '```c\nfunction_name();\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndisplay();',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nvoid display()\n{\n    printf("Welcome");\n}\n\nint main()\n{\n    display();\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'syntax',
        content_text: '```output\nWelcome\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Function Call Flow</h3>',
        order_index: 7
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nmain()\n   |\nCalls display()\n   |\ndisplay() executes\n   |\nControl returns to main()',
        order_index: 8
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multiple Calls</h3>',
        order_index: 9
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndisplay();\ndisplay();\ndisplay();',
        order_index: 10
    },
    {
        topic_id: 'c-p7-t3',
        content_type: 'syntax',
        content_text: '```output\nWelcome\nWelcome\nWelcome\n```',
        order_index: 11
    }
];

const challengeData = {
    topic_id: 'c-p7-t3',
    title: 'Add Two Numbers Function',
    description: 'Write a C program to create a function that adds two numbers and call the function from main() to display the result.',
    solution_code: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result;\n\n    result = add(10, 20);   // Function Call\n\n    printf("Sum = %d\\n", result);\n\n    return 0;\n}',
    input_format: 'No input is required.',
    output_format: 'Sum = 30',
    reference_output: 'Sum = 30',
    hints: JSON.stringify(['Pass values to the function when calling it and use the returned value.']),
    difficulty: 'Easy'
};

async function updateP7T3() {
    console.log('Updating Phase 7 Topic 3 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p7-t3');
        
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
    console.log('Successfully updated content for c-p7-t3!');
    
    console.log('Adding mastery challenge...');
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p7-t3');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p7-t3');
            
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

updateP7T3();
