const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is while Loop?</h3><p>The while loop repeatedly executes a block of code as long as the condition remains true.</p><p class="mt-4">It is called an entry-controlled loop because the condition is checked before execution.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nwhile(expression)\n    statement;',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'syntax',
        content_text: '```c\nwhile(condition)\n{\n    statements;\n}\n```',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example 1: Print Numbers 1 to 5</h3>',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i = 1;\n\n    while(i <= 5)\n    {\n        printf("%d\\n", i);\n        i++;\n    }\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'syntax',
        content_text: '```output\n1\n2\n3\n4\n5\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Working</h3><div class="space-y-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Iteration 1:</h4><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 1</li><li>1 <= 5 → True</li><li>Print 1</li><li>i becomes 2</li></ul></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Iteration 2:</h4><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 2</li><li>2 <= 5 → True</li><li>Print 2</li></ul></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-red-600 dark:text-red-400">Continues until:</h4><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 6</li><li>6 <= 5 → False</li><li class="mt-2 text-red-500 font-bold font-sans">Loop terminates.</li></ul></div></div>',
        order_index: 7
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example 2: Sum of First 10 Numbers</h3>',
        order_index: 8
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i = 1;\n    int sum = 0;\n\n    while(i <= 10)\n    {\n        sum += i;\n        i++;\n    }\n\n    printf("Sum = %d", sum);\n\n    return 0;\n}',
        order_index: 9
    },
    {
        topic_id: 'c-p6-t1',
        content_type: 'syntax',
        content_text: '```output\nSum = 55\n```',
        order_index: 10
    }
];

const challengeData = {
    topic_id: 'c-p6-t1',
    title: 'Count Digits',
    description: 'Write a C program to count the number of digits in an integer using a while loop.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num, count = 0;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    while (num != 0) {\n        count++;\n        num = num / 10;\n    }\n\n    printf("Number of digits = %d\\n", count);\n\n    return 0;\n}',
    input_format: 'A single integer.',
    output_format: 'Enter a number: 12345\nNumber of digits = 5',
    reference_output: 'Enter a number: Number of digits = 5',
    hints: JSON.stringify(['Repeatedly divide the number by 10 until it becomes 0 and count the iterations.']),
    difficulty: 'Easy'
};

async function updateP6T1() {
    console.log('Updating Phase 6 Topic 1 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t1');
        
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
    console.log('Successfully updated content for c-p6-t1!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t1');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t1');
            
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

updateP6T1();
