const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t5',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is switch?</h3><p>The <code>switch</code> statement provides multiple choices based on a single expression.</p><p class="mt-2">According to the PDF, <code>switch</code> is a cleaner alternative to multiple <code>if-else</code> statements when checking several constant values.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nswitch(expression)\n{\n    case value1:\n        statements;\n        break;\n\n    case value2:\n        statements;\n        break;\n\n    default:\n        statements;\n}'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flowchart</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/switch-flowchart.png" alt="switch statement flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Components</h3><ul class="list-none pl-0 space-y-4 text-gray-700 dark:text-gray-300 mt-2"><li><strong class="font-bold text-gray-900 dark:text-white">switch</strong>: Evaluates an expression.</li><li><strong class="font-bold text-gray-900 dark:text-white">case</strong>: Represents possible values.</li><li><strong class="font-bold text-gray-900 dark:text-white">break</strong>: Stops execution of switch.</li><li><strong class="font-bold text-gray-900 dark:text-white">default</strong>: Executes when no case matches.</li></ul><p class="mt-8 font-bold text-gray-900 dark:text-white">Example</p>'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int day = 3;\n\n    switch(day)\n    {\n        case 1:\n            printf("Monday");\n            break;\n\n        case 2:\n            printf("Tuesday");\n            break;\n\n        case 3:\n            printf("Wednesday");\n            break;\n\n        default:\n            printf("Invalid Day");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nWednesday\n```'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example: Calculator</p>'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 7,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    char op = \'+\';\n\n    switch(op)\n    {\n        case \'+\':\n            printf("Addition");\n            break;\n\n        case \'-\':\n            printf("Subtraction");\n            break;\n\n        case \'*\':\n            printf("Multiplication");\n            break;\n\n        default:\n            printf("Invalid Operator");\n    }\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t5',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nAddition\n```'
    }
];

const challengeData = {
    topic_id: 'c-p5-t5',
    title: 'Menu Driven Program',
    description: 'Write a C program to display the corresponding menu item based on the user\'s choice using a switch statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int choice;\n\n    printf("Menu\\n");\n    printf("1. Pizza\\n");\n    printf("2. Burger\\n");\n    printf("3. Sandwich\\n");\n    printf("4. Pasta\\n");\n\n    printf("Enter your choice: ");\n    scanf("%d", &choice);\n\n    switch (choice) {\n        case 1:\n            printf("You selected Pizza.\\n");\n            break;\n        case 2:\n            printf("You selected Burger.\\n");\n            break;\n        case 3:\n            printf("You selected Sandwich.\\n");\n            break;\n        case 4:\n            printf("You selected Pasta.\\n");\n            break;\n        default:\n            printf("Invalid Choice\\n");\n    }\n\n    return 0;\n}',
    input_format: 'A single integer representing the choice.',
    output_format: 'Output\nMenu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: 3\nYou selected Sandwich.',
    reference_output: 'Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: 3\nYou selected Sandwich.',
    hints: JSON.stringify(['Use a switch statement to match the entered choice with a menu option.']),
    difficulty: 'Easy'
};

async function updateP5T5() {
    console.log('Updating Phase 5 Topic 5 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t5');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t5!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t5')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t5');
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

updateP5T5();
