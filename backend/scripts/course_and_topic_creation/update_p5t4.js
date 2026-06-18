const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t4',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is else-if Ladder?</h3><p>When multiple conditions must be checked one after another, an <code>else-if</code> ladder is used.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t4',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nif(condition1)\n{\n}\nelse if(condition2)\n{\n}\nelse if(condition3)\n{\n}\nelse\n{\n}'
    },
    {
        topic_id: 'c-p5-t4',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flowchart</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/else-if-ladder-flowchart.jpg" alt="else-if ladder flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><p>Conditions are checked from top to bottom. As soon as one condition becomes true:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Its block executes.</li><li>Remaining conditions are skipped.</li></ul><p class="mt-8 font-bold text-gray-900 dark:text-white">Example: Grade Calculation</p>'
    },
    {
        topic_id: 'c-p5-t4',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks = 82;\n\n    if(marks >= 90)\n    {\n        printf("Grade A");\n    }\n    else if(marks >= 80)\n    {\n        printf("Grade B");\n    }\n    else if(marks >= 70)\n    {\n        printf("Grade C");\n    }\n    else if(marks >= 50)\n    {\n        printf("Grade D");\n    }\n    else\n    {\n        printf("Fail");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t4',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nGrade B\n```'
    },
    {
        topic_id: 'c-p5-t4',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Easy to handle multiple conditions.</li><li>More readable than many nested <code>if</code> statements.</li><li>Commonly used in menu-driven programs.</li></ul>'
    }
];

const challengeData = {
    topic_id: 'c-p5-t4',
    title: 'Largest of Three Numbers',
    description: 'Write a C program to find the largest of three numbers using an else-if ladder.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a, b, c;\n\n    printf("Enter three numbers: ");\n    scanf("%d %d %d", &a, &b, &c);\n\n    if (a >= b && a >= c) {\n        printf("%d is the largest number.\\n", a);\n    }\n    else if (b >= a && b >= c) {\n        printf("%d is the largest number.\\n", b);\n    }\n    else {\n        printf("%d is the largest number.\\n", c);\n    }\n\n    return 0;\n}',
    input_format: 'Three integers separated by spaces.',
    output_format: 'Output\\nEnter three numbers: 15 25 10\\n25 is the largest number.',
    reference_output: 'Enter three numbers: 25 is the largest number.',
    hints: JSON.stringify(['Compare the three numbers using multiple conditions and print the largest one.']),
    difficulty: 'Easy'
};

async function updateP5T4() {
    console.log('Updating Phase 5 Topic 4 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t4');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t4!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t4')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t4');
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

updateP5T4();
