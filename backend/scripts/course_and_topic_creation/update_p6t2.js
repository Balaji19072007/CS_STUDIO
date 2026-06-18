const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is do-while Loop?</h3><p>The do-while loop executes the loop body first and checks the condition afterward.</p><p class="mt-4">It is called an exit-controlled loop.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">This guarantees that the loop body executes at least once.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">According to the PDF:</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndo\n{\n    statements;\n}\nwhile(condition);',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'syntax',
        content_text: '```c\ndo\n{\n    statements;\n}\nwhile(condition);\n```',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int i = 1;\n\n    do\n    {\n        printf("%d\\n", i);\n        i++;\n    }\n    while(i <= 5);\n\n    return 0;\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'syntax',
        content_text: '```output\n1\n2\n3\n4\n5\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Special Property</h3>',
        order_index: 7
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint i = 10;\n\ndo\n{\n    printf("Hello");\n}\nwhile(i < 5);',
        order_index: 8
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'syntax',
        content_text: '```output\nHello\n```',
        order_index: 9
    },
    {
        topic_id: 'c-p6-t2',
        content_type: 'explanation',
        content_text: '<p class="mt-4">Although condition is false, the loop executes once because condition is checked after execution.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Difference Between while and do-while</h3><div class="overflow-x-auto"><table class="w-full text-left border-collapse mt-4"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-200 dark:border-gray-700 p-3 text-gray-900 dark:text-white font-bold">while</th><th class="border border-gray-200 dark:border-gray-700 p-3 text-gray-900 dark:text-white font-bold">do-while</th></tr></thead><tbody><tr><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">Condition checked first</td><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">Condition checked later</td></tr><tr class="bg-gray-50 dark:bg-gray-800/50"><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">May execute zero times</td><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">Executes at least once</td></tr><tr><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">Entry-controlled</td><td class="border border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">Exit-controlled</td></tr></tbody></table></div>',
        order_index: 10
    }
];

const challengeData = {
    topic_id: 'c-p6-t2',
    title: 'Multiplication Table',
    description: 'Write a C program to generate the multiplication table of a number using a do-while loop.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num, i = 1;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    do {\n        printf("%d x %d = %d\\n", num, i, num * i);\n        i++;\n    } while (i <= 10);\n\n    return 0;\n}',
    input_format: 'A single integer.',
    output_format: 'Enter a number: 5\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',
    reference_output: 'Enter a number: 5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',
    hints: JSON.stringify(['Start from 1 and repeatedly multiply the entered number by the counter until 10.']),
    difficulty: 'Easy'
};

async function updateP6T2() {
    console.log('Updating Phase 6 Topic 2 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t2');
        
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
    console.log('Successfully updated content for c-p6-t2!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t2');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t2');
            
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

updateP6T2();
