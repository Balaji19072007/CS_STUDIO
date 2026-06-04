const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const t6Content = [
    {
        topic_id: 'c-p7-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Pass By Value?</h3><p class="text-gray-700 dark:text-gray-300">C uses <span class="font-bold">Pass By Value</span> by default.</p><ul class="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300"><li>A copy of the variable is passed to the function.</li><li>The original variable remains unchanged.</li></ul>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t6',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t6',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nvoid modify(int x)\n{\n    x = 100;\n}\n\nint main()\n{\n    int num = 50;\n\n    modify(num);\n\n    printf("%d", num);\n\n    return 0;\n}',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t6',
        content_type: 'syntax',
        content_text: '```output\n50\n```',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why?</h3><p class="text-gray-700 dark:text-gray-300">Because when we pass <span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">num = 50</span>, a <span class="font-bold">copy</span> is sent to <span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">x = 50</span>.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Changes inside the function affect only the copy, meaning the original variable remains unchanged.</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t6',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Memory View</h3><div class="mt-4 grid grid-cols-2 gap-4 text-center"><div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/40"><h4 class="font-bold text-blue-700 dark:text-blue-400 font-mono">main()</h4><p class="font-mono text-gray-800 dark:text-gray-200 mt-2">num = 50</p></div><div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800/40"><h4 class="font-bold text-purple-700 dark:text-purple-400 font-mono">modify()</h4><p class="font-mono text-gray-800 dark:text-gray-200 mt-2">x = 50</p></div></div><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">These are completely different memory locations.</p>',
        order_index: 6
    }
];

const t7Content = [
    {
        topic_id: 'c-p7-t7',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Function Prototype?</h3><p class="text-gray-700 dark:text-gray-300">A function prototype informs the compiler about:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Function name</li><li>Return type</li><li>Number of parameters</li><li>Parameter types</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">It does this <span class="font-bold">before</span> the function is used.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'syntax',
        content_text: '```c\nreturn_type function_name(parameters);\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint add(int, int);',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why is it needed?</h3><p class="text-gray-700 dark:text-gray-300">Suppose a function is called before its definition is provided.</p><p class="mt-2 text-gray-700 dark:text-gray-300 mb-6">The compiler needs information about the function beforehand to verify the call.</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint add(int, int);  // Function Prototype\n\nint main()\n{\n    printf("%d", add(5,3));\n\n    return 0;\n}\n\nint add(int a, int b)\n{\n    return a+b;\n}',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'syntax',
        content_text: '```output\n8\n```',
        order_index: 7
    },
    {
        topic_id: 'c-p7-t7',
        content_type: 'explanation',
        content_text: '<p class="mt-6 text-gray-700 dark:text-gray-300 mb-6">Function prototypes allow the compiler to verify function calls and improve overall program structure.</p>',
        order_index: 8
    }
];

const t8Content = [
    {
        topic_id: 'c-p7-t8',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Void Function?</h3><p class="text-gray-700 dark:text-gray-300">A void function does <span class="font-bold">not return any value</span>.</p><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">The keyword <span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-purple-600 dark:text-purple-400">void</span> indicates no value is returned.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'syntax',
        content_text: '```c\nvoid function_name()\n{\n    statements;\n}\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nvoid display()\n{\n    printf("Welcome");\n}\n\nint main()\n{\n    display();\n\n    return 0;\n}',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'syntax',
        content_text: '```output\nWelcome\n```',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Characteristics</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>No return value.</li><li>Often used for displaying messages.</li><li>Used for performing tasks without producing results.</li></ul><h4 class="font-bold text-gray-900 dark:text-white mt-8 mb-4">Another Example:</h4>',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nvoid line()\n{\n    printf("---------------_n"); // Using _n to represent newline inside script string to avoid actual string break if needed, actually \\n\n    // let me properly write \\n\n}',
        // Let's rewrite properly
        order_index: 7
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'explanation',
        content_text: '<p class="mt-6 text-gray-700 dark:text-gray-300 mb-6">Void functions perform tasks without returning values through the function name.</p>',
        order_index: 9
    },
    {
        topic_id: 'c-p7-t8',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Comparison of Function Concepts</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4 mb-8"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-gray-900 dark:text-white">Concept</th><th class="px-6 py-4 font-bold text-gray-900 dark:text-white">Purpose</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Function</td><td class="px-6 py-4">Performs a specific task</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Declaration</td><td class="px-6 py-4">Introduces function to compiler</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Definition</td><td class="px-6 py-4">Contains actual code</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Function Call</td><td class="px-6 py-4">Executes function</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Return Statement</td><td class="px-6 py-4">Sends value back</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Parameters</td><td class="px-6 py-4">Receive input values</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Pass By Value</td><td class="px-6 py-4">Sends copy of data</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Prototype</td><td class="px-6 py-4">Describes function before use</td></tr><tr><td class="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400">Void Function</td><td class="px-6 py-4">Returns no value</td></tr></tbody></table></div>',
        order_index: 10
    }
];
// Fix t8Content order index 7 properly:
t8Content.find(c => c.order_index === 7).content_text = '#include <stdio.h>\n\nvoid line()\n{\n    printf("---------------\\n");\n}\n\nint main()\n{\n    line();\n    printf("MENU\\n");\n    line();\n\n    return 0;\n}';
t8Content.push({
    topic_id: 'c-p7-t8',
    content_type: 'syntax',
    content_text: '```output\n---------------\nMENU\n---------------\n```',
    order_index: 8
});

const t6Challenge = {
    topic_id: 'c-p7-t6',
    title: 'Demonstrate Pass By Value',
    description: 'Write a C program to demonstrate Pass By Value by creating a function that attempts to modify a variable. Display the value before and after the function call.',
    solution_code: '#include <stdio.h>\n\nvoid changeValue(int num) {\n    num = 100;\n    printf("Inside Function = %d\\n", num);\n}\n\nint main() {\n    int num = 50;\n\n    printf("Before Function Call = %d\\n", num);\n\n    changeValue(num);\n\n    printf("After Function Call = %d\\n", num);\n\n    return 0;\n}',
    input_format: 'No input is required.',
    output_format: 'Before Function Call = 50\nInside Function = 100\nAfter Function Call = 50',
    reference_output: 'Before Function Call = 50\nInside Function = 100\nAfter Function Call = 50',
    hints: JSON.stringify(['In pass by value, a copy of the variable is passed to the function, so changes inside the function do not affect the original variable.']),
    difficulty: 'Medium'
};

const t8Challenge = {
    topic_id: 'c-p7-t8',
    title: 'Calculate Square in Void Function',
    description: 'Write a C program to create a void function that finds and displays the square of a number entered by the user.',
    solution_code: '#include <stdio.h>\n\nvoid findSquare(int num) {\n    printf("Square = %d\\n", num * num);\n}\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    findSquare(num);\n\n    return 0;\n}',
    input_format: '6',
    output_format: 'Enter a number: 6\nSquare = 36',
    reference_output: 'Enter a number: Square = 36',
    hints: JSON.stringify(['Use a void function to calculate the square and print the result directly without returning a value.']),
    difficulty: 'Easy'
};

async function updateTopics() {
    console.log('Updating Phase 7 Topics 6, 7, 8 content...');
    
    // Delete existing content
    await supabase.from('topic_content').delete().in('topic_id', ['c-p7-t6', 'c-p7-t7', 'c-p7-t8']);
    
    // Insert new content
    await supabase.from('topic_content').insert([...t6Content, ...t7Content, ...t8Content]);
    
    console.log('Successfully updated content for c-p7-t6, t7, t8!');
    
    console.log('Managing mastery challenges...');
    
    // Delete t7 challenge
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p7-t7');
    
    for (const challenge of [t6Challenge, t8Challenge]) {
        const { data: existingChallenges } = await supabase
            .from('course_challenges')
            .select('id')
            .eq('topic_id', challenge.topic_id);
            
        if (existingChallenges && existingChallenges.length > 0) {
            await supabase
                .from('course_challenges')
                .update(challenge)
                .eq('topic_id', challenge.topic_id);
        } else {
            await supabase
                .from('course_challenges')
                .insert({ ...challenge, course_id: 'c-programming' });
        }
    }
    
    console.log('Challenges updated successfully.');
}

updateTopics();
