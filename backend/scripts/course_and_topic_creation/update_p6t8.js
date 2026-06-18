const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t8',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Loop optimization improves program performance and reduces execution time.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Technique 1: Avoid Unnecessary Calculations</h3><p class="font-bold text-red-600 dark:text-red-400">Bad:</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfor(i=0;i<n;i++)\n{\n    result = x * y;\n}',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'explanation',
        content_text: '<p class="font-bold text-green-600 dark:text-green-400 mt-4">Good:</p>',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nresult = x * y;\n\nfor(i=0;i<n;i++)\n{\n}',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'explanation',
        content_text: '<p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">Calculate once instead of repeatedly.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Technique 2: Minimize Work Inside Loop</h3><p class="font-bold text-red-600 dark:text-red-400">Bad:</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfor(i=0;i<100;i++)\n{\n    printf("Hello");\n}',
        order_index: 6
    },
    {
        topic_id: 'c-p6-t8',
        content_type: 'explanation',
        content_text: '<p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">Heavy operations inside loops should be minimized whenever possible.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Technique 3: Use Appropriate Loop</h3><div class="space-y-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Known iterations:</h4><p class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">for(...)</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">Unknown iterations:</h4><p class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">while(...)</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">At least one execution:</h4><p class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">do-while(...)</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Technique 4: Avoid Infinite Loops</h3><p class="font-bold text-gray-900 dark:text-white">Always verify:</p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-2 space-y-2"><p class="font-mono text-gray-800 dark:text-gray-200">i++;</p><p class="text-gray-600 dark:text-gray-400 text-sm font-bold">or</p><p class="font-mono text-gray-800 dark:text-gray-200">i--;</p><p class="text-gray-700 dark:text-gray-300 text-sm mt-2">exists when necessary.</p></div><p class="mt-4 text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800">Missing updates often create accidental infinite loops.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Comparison of Loops</h3><div class="overflow-x-auto mt-4"><table class="w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300"><tr><th scope="col" class="px-6 py-3">Feature</th><th scope="col" class="px-6 py-3">while</th><th scope="col" class="px-6 py-3">do-while</th><th scope="col" class="px-6 py-3">for</th></tr></thead><tbody><tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"><th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">Condition Checked</th><td class="px-6 py-4">Before execution</td><td class="px-6 py-4">After execution</td><td class="px-6 py-4">Before execution</td></tr><tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"><th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">Executes At Least Once</th><td class="px-6 py-4 text-red-600 font-bold">No</td><td class="px-6 py-4 text-green-600 font-bold">Yes</td><td class="px-6 py-4 text-red-600 font-bold">No</td></tr><tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"><th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">Best For</th><td class="px-6 py-4">Unknown iterations</td><td class="px-6 py-4">Menu-driven programs</td><td class="px-6 py-4">Known iterations</td></tr><tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"><th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">Syntax</th><td class="px-6 py-4">Simple</td><td class="px-6 py-4">Slightly longer</td><td class="px-6 py-4">Compact</td></tr></tbody></table></div>',
        order_index: 7
    }
];

const challengeData = {
    topic_id: 'c-p6-t8',
    title: 'Optimize Sum Calculation',
    description: 'Write a C program to calculate the sum of numbers from 1 to N using a loop. Optimize the program by avoiding unnecessary calculations inside the loop.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int n, i, sum = 0;\n\n    printf("Enter Number: ");\n    scanf("%d", &n);\n\n    for (i = 1; i <= n; i++) {\n        sum += i;\n    }\n\n    printf("Sum = %d\\n", sum);\n\n    return 0;\n}',
    input_format: 'A single integer N.',
    output_format: 'Enter Number: 5\nSum = 15',
    reference_output: 'Enter Number: Sum = 15\n',
    hints: JSON.stringify(['Perform only the required operation inside the loop and avoid repeating calculations that can be done once outside the loop.']),
    difficulty: 'Easy'
};

async function updateP6T8() {
    console.log('Updating Phase 6 Topic 8 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t8');
        
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
    console.log('Successfully updated content for c-p6-t8!');
    
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenges, error: fetchError } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p6-t8');
        
    if (fetchError) {
        console.error('Error fetching challenge:', fetchError);
        return;
    }
    
    if (existingChallenges && existingChallenges.length > 0) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p6-t8');
            
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

updateP6T8();
