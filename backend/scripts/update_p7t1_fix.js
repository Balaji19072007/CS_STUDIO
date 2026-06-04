const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p7-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Function?</h3><p>A function is a named block of code that performs a specific task.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">A function:</p><ul class="list-disc pl-6 space-y-2 mt-2"><li>Receives input (optional)</li><li>Processes data</li><li>Produces output (optional)</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Function Example</h3>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t1',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nvoid greeting()\n{\n    printf("Hello Student");\n}\n\nint main()\n{\n    greeting();\n\n    return 0;\n}',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t1',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-4 mb-2">Output:</h4><div class="bg-[#1E293B] dark:bg-[#0F172A] text-[#e5e7eb] font-mono text-sm p-4 rounded-xl shadow-inner border border-gray-800">Hello Student</div>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Functions</h3><div class="space-y-6"><div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">Library Functions</h4><p class="text-gray-700 dark:text-gray-300">Predefined functions provided by C.</p><p class="font-bold text-gray-900 dark:text-white mt-4">Examples:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300 font-mono"><li>printf()</li><li>scanf()</li><li>getchar()</li><li>putchar()</li><li>strlen()</li><li>sqrt()</li></ul></div><div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800"><h4 class="text-xl font-bold text-green-700 dark:text-green-400 mb-2">User-Defined Functions</h4><p class="text-gray-700 dark:text-gray-300">Functions created by programmers.</p><p class="font-bold text-gray-900 dark:text-white mt-4">Example:</p></div></div>',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t1',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nvoid display()\n{\n    printf("Welcome");\n}',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t1',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages of Functions</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-600 dark:text-purple-400">Code Reusability</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Write once, use many times.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-600 dark:text-purple-400">Modularity</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Divide large programs into smaller units.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-600 dark:text-purple-400">Easy Testing</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Each function can be tested separately.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-600 dark:text-purple-400">Easy Maintenance</h4><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Changes can be made in one place.</p></div></div>',
        order_index: 6
    }
];

const challengeData = {
    topic_id: 'c-p7-t1',
    title: 'Display Welcome Message',
    description: 'Write a C program to create and call a user-defined function that displays a welcome message.',
    solution_code: '#include <stdio.h>\n\nvoid displayMessage() {\n    printf("Welcome to Functions in C!\\n");\n}\n\nint main() {\n    displayMessage();\n\n    return 0;\n}',
    input_format: 'No input required.',
    output_format: 'Welcome to Functions in C!',
    reference_output: 'Welcome to Functions in C!\\n',
    hints: JSON.stringify(['Define a function outside main() and call it from main().']),
    difficulty: 'Easy'
};

async function updateP7T1Fix() {
    console.log('Fixing Phase 7 Topic 1 output visual...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p7-t1');
        
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
    console.log('Successfully updated content for c-p7-t1!');
    
    console.log('Adding mastery challenge back...');
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p7-t1');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p7-t1');
            
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

updateP7T1Fix();
