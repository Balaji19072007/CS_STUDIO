const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p7-t5',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Parameters?</h3><p class="text-gray-700 dark:text-gray-300 mb-6">Parameters are variables used to receive data from the calling function.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'syntax',
        content_text: '```c\nreturn_type function_name(parameter_list)\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint add(int a, int b)',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'explanation',
        content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4 mb-8">Here: <br><span class="font-mono text-gray-800 dark:text-gray-200">a</span> and <span class="font-mono text-gray-800 dark:text-gray-200">b</span> are parameters.</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint add(int a, int b)\n{\n    return a + b;\n}\n\nint main()\n{\n    printf("%d", add(10,20));\n\n    return 0;\n}',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'syntax',
        content_text: '```output\n30\n```',
        order_index: 7
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Parameters</h3><div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30"><h4 class="font-bold text-blue-700 dark:text-blue-400">Formal Parameters</h4><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Declared in function definition.</p><p class="font-mono text-sm mt-3 text-gray-800 dark:text-gray-200">int add(int a, int b)</p></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30"><h4 class="font-bold text-purple-700 dark:text-purple-400">Actual Parameters</h4><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Passed during function call.</p><p class="font-mono text-sm mt-3 text-gray-800 dark:text-gray-200">add(10,20);</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Parameter Passing Process</h3>',
        order_index: 8
    },
    {
        topic_id: 'c-p7-t5',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nActual Parameters\n       |\n       V\nFormal Parameters\n       |\nProcessing\n       |\nResult',
        order_index: 9
    }
];

const challengeData = {
    topic_id: 'c-p7-t5',
    title: 'Add Two Numbers via Parameters',
    description: 'Write a C program to create a function that accepts two numbers as parameters and returns their sum.',
    solution_code: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf("Enter two numbers: ");\n    scanf("%d %d", &num1, &num2);\n\n    printf("Sum = %d\\n", add(num1, num2));\n\n    return 0;\n}',
    input_format: '10 20',
    output_format: 'Enter two numbers: 10 20\nSum = 30',
    reference_output: 'Enter two numbers: Sum = 30',
    hints: JSON.stringify(['Pass values to the function through parameters and use them inside the function.']),
    difficulty: 'Easy'
};

async function updateP7T5() {
    console.log('Updating Phase 7 Topic 5 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p7-t5');
        
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
    console.log('Successfully updated content for c-p7-t5!');
    
    console.log('Adding mastery challenge...');
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p7-t5');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p7-t5');
            
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

updateP7T5();
