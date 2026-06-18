const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Function Declaration</h3><p class="text-gray-700 dark:text-gray-300">A declaration tells the compiler:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Function name</li><li>Return type</li><li>Parameters</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">It informs the compiler that the function exists.</p>',
        order_index: 1
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'syntax',
        content_text: '```c\nreturn_type function_name(parameters);\n```',
        order_index: 2
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 3
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint add(int, int);',
        order_index: 4
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Function Definition</h3><p class="text-gray-700 dark:text-gray-300 mb-6">A definition contains the actual code of the function.</p>',
        order_index: 5
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'syntax',
        content_text: '```c\nreturn_type function_name(parameters)\n{\n    statements;\n}\n```',
        order_index: 6
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>',
        order_index: 7
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint add(int a, int b)\n{\n    return a + b;\n}',
        order_index: 8
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Parts of a Function</h3>',
        order_index: 9
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint add(int a, int b)\n{\n    return a + b;\n}',
        order_index: 10
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'explanation',
        content_text: '<div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30"><h4 class="font-bold text-blue-700 dark:text-blue-400">Return Type</h4><p class="font-mono text-sm mt-1 text-gray-800 dark:text-gray-200">int</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Function returns an integer.</p></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30"><h4 class="font-bold text-purple-700 dark:text-purple-400">Function Name</h4><p class="font-mono text-sm mt-1 text-gray-800 dark:text-gray-200">add</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Identifies the function.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800/30"><h4 class="font-bold text-green-700 dark:text-green-400">Parameters</h4><p class="font-mono text-sm mt-1 text-gray-800 dark:text-gray-200">int a, int b</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Input values.</p></div><div class="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30"><h4 class="font-bold text-amber-700 dark:text-amber-400">Function Body</h4><p class="font-mono text-sm mt-1 text-gray-800 dark:text-gray-200">{ return a + b; }</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Contains statements.</p></div></div><p class="mt-8 text-gray-700 dark:text-gray-300 mb-6">A function generally has the form:</p>',
        order_index: 11
    },
    {
        topic_id: 'c-p7-t2',
        content_type: 'syntax',
        content_text: '```c\ntype function_name(parameters)\n{\n    local variables\n    statements\n}\n```',
        order_index: 12
    }
];

async function updateP7T2Fix() {
    console.log('Fixing Phase 7 Topic 2 visuals...');
    
    // Delete existing content
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p7-t2');
        
    if (deleteError) {
        console.error('Error deleting old content:', deleteError);
        return;
    }
    
    // Insert new content
    const { error: insertError } = await supabase
        .from('topic_content')
        .insert(topicContent);
        
    if (insertError) {
        console.error('Error inserting new content:', insertError);
        return;
    }
    console.log('Successfully fixed content for c-p7-t2!');
}

updateP7T2Fix();
