const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t7',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>The conditional operator is a shortcut for simple <code>if-else</code> statements.</p><div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-center">condition ? expression1 : expression2</div><p>This means:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>If condition is true, execute expression1.</li><li>Otherwise, execute expression2.</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ncondition ? value1 : value2;'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int a = 20;\n    int b = 10;\n\n    int max;\n\n    max = (a > b) ? a : b;\n\n    printf("Maximum = %d", max);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nMaximum = 20\n```'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Equivalent if-else</h3>'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(a > b)\n{\n    max = a;\n}\nelse\n{\n    max = b;\n}'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example: Even or Odd</h3>'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 9,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int n = 5;\n\n    (n % 2 == 0) ?\n        printf("Even") :\n        printf("Odd");\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 10,
        content_type: 'syntax',
        content_text: '```output\nOdd\n```'
    },
    {
        topic_id: 'c-p5-t7',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Comparison of Decision-Making Statements</h3><div class="overflow-x-auto"><table class="w-full text-left border-collapse mt-4"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Statement</th><th class="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Purpose</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 p-3"><code>if</code></td><td class="border border-gray-300 dark:border-gray-700 p-3">Execute code when condition is true</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3"><code>if-else</code></td><td class="border border-gray-300 dark:border-gray-700 p-3">Choose between two options</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3">Nested <code>if-else</code></td><td class="border border-gray-300 dark:border-gray-700 p-3">Check multiple dependent conditions</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3"><code>else-if</code> Ladder</td><td class="border border-gray-300 dark:border-gray-700 p-3">Check many conditions sequentially</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3"><code>switch</code></td><td class="border border-gray-300 dark:border-gray-700 p-3">Select one option from many choices</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3"><code>goto</code></td><td class="border border-gray-300 dark:border-gray-700 p-3">Jump to another part of program</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 p-3">Ternary Operator</td><td class="border border-gray-300 dark:border-gray-700 p-3">Short form of <code>if-else</code></td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-World Applications</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"><h4 class="font-bold mb-2">ATM Machine</h4><p class="text-sm">If PIN is correct &rarr; Allow access<br/>Else &rarr; Show error</p></div><div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"><h4 class="font-bold mb-2">Online Shopping</h4><p class="text-sm">If amount &gt; 1000 &rarr; Apply discount<br/>Else &rarr; No discount</p></div><div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"><h4 class="font-bold mb-2">Examination System</h4><p class="text-sm">If marks &gt;= 50 &rarr; Pass<br/>Else &rarr; Fail</p></div><div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"><h4 class="font-bold mb-2">Traffic Signal</h4><p class="text-sm">Switch(signal) {<br/>&nbsp;&nbsp;Red &rarr; Stop<br/>&nbsp;&nbsp;Yellow &rarr; Wait<br/>&nbsp;&nbsp;Green &rarr; Go<br/>}</p></div></div>'
    }
];

const challengeData = {
    topic_id: 'c-p5-t7',
    title: 'Uppercase or Lowercase',
    description: 'Write a C program to check whether a character entered by the user is an uppercase letter or a lowercase letter using the conditional (ternary) operator.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf("Enter a character: ");\n    scanf("%c", &ch);\n\n    (ch >= \'A\' && ch <= \'Z\')\n        ? printf("Uppercase Letter\\n")\n        : printf("Lowercase Letter\\n");\n\n    return 0;\n}',
    input_format: 'A single character.',
    output_format: 'Output 1\nEnter a character: A\nUppercase Letter\n\nOutput 2\nEnter a character: b\nLowercase Letter',
    reference_output: 'Enter a character: Uppercase Letter',
    hints: JSON.stringify(['Compare the character with the range \\\'A\\\' to \\\'Z\\\' and use the ternary operator to display the result.']),
    difficulty: 'Medium'
};

async function updateP5T7() {
    console.log('Updating Phase 5 Topic 7 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t7');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t7!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t7')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t7');
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

updateP5T7();
