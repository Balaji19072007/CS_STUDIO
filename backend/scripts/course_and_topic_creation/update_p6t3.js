const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is for Loop?</h3><p>The for loop combines initialization, condition, and update into a single statement.</p><p class="mt-4">It is the most commonly used loop in C.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfor(expression1; expression2; expression3)\n    statement;',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'syntax',
        content_text: '```c\nfor(initialization; condition; update)\n{\n    statements;\n}\n```',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example 1</h3>',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i;\n\n    for(i = 1; i <= 5; i++)\n    {\n        printf("%d\\n", i);\n    }\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'syntax',
        content_text: '```output\n1\n2\n3\n4\n5\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Working</h3><div class="space-y-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 1</li><li>Condition True</li><li>Print 1</li><li>i++</li></ul></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 2</li><li>Condition True</li><li>Print 2</li></ul></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-red-600 dark:text-red-400">Continues until:</h4><ul class="list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm"><li>i = 6</li><li>Condition False</li><li class="mt-2 text-red-500 font-bold font-sans">Loop terminates.</li></ul></div></div>',
        order_index: 7
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example 2: Multiplication Table</h3>',
        order_index: 8
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int n = 5;\n\n    for(int i = 1; i <= 10; i++)\n    {\n        printf("%d x %d = %d\\n",\n               n, i, n*i);\n    }\n\n    return 0;\n}',
        order_index: 9
    },
    {
        topic_id: 'c-p6-t3',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Compact syntax</li><li>Easy to understand</li><li>Best when number of iterations is known</li></ul>',
        order_index: 10
    }
];

const challengeData = {
    topic_id: 'c-p6-t3',
    title: 'Even Numbers',
    description: 'Write a C program to print all even numbers from 1 to 20 using a for loop.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 2; i <= 20; i += 2) {\n        printf("%d ", i);\n    }\n\n    return 0;\n}',
    input_format: 'No input required.',
    output_format: '2 4 6 8 10 12 14 16 18 20',
    reference_output: '2 4 6 8 10 12 14 16 18 20 ',
    hints: JSON.stringify(['Start the loop from 2 and increment by 2 in each iteration.']),
    difficulty: 'Easy'
};

async function updateP6T3() {
    console.log('Updating Phase 6 Topic 3 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t3');
        
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
    console.log('Successfully updated content for c-p6-t3!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t3');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t3');
            
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

updateP6T3();
