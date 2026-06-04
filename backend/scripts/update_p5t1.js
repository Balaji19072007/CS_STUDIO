const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t1',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is an if Statement?</h3><p>The <code>if</code> statement is the simplest decision-making statement in C.</p><p class="mt-2">It executes a block of code only when a condition is true.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(condition)\n{\n    statements;\n}'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flow of Execution</h3><pre class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto text-center border border-gray-200 dark:border-gray-700 leading-loose">\n           Check Condition\n                  |\n                  V\n\n           Condition True?\n            /           \\\n          Yes            No\n           |              |\n           V              V\n\n        Execute          Skip\n       Statements</pre><p class="mt-8 font-bold text-gray-900 dark:text-white">Example 1</p>'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n\n    if(age >= 18)\n    {\n        printf("Eligible to Vote");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nEligible to Vote\n```'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example 2</p>'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 7,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int number = 10;\n\n    if(number > 0)\n    {\n        printf("Positive Number");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nPositive Number\n```'
    },
    {
        topic_id: 'c-p5-t1',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Important Points</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Executes only when condition is true.</li><li>No action is taken if condition is false.</li><li>Braces are recommended even for a single statement.</li></ul>'
    }
];

const challengeData = {
    topic_id: 'c-p5-t1',
    title: 'Check Positive Number',
    description: 'Write a C program to check whether a number is positive using an if statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num = 10;\n\n    if (num > 0) {\n        printf("The number is positive.\\n");\n    }\n\n    return 0;\n}',
    output_format: 'The number is positive.',
    reference_output: 'The number is positive.',
    hints: JSON.stringify(['Use an if statement.', 'The condition is `num > 0`.', 'Use printf to output the exact message.']),
    difficulty: 'Easy'
};

async function updateP5T1() {
    console.log('Updating Phase 5 Topic 1 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t1');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t1!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    // Check if challenge exists
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t1')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t1');
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

updateP5T1();
