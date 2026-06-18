const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicContent = [
    {
        topic_id: 'c-p6-t7',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is an Infinite Loop?</h3><p>A loop that never ends is called an infinite loop.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">The condition always remains true.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>',
        order_index: 1
    },
    {
        topic_id: 'c-p6-t7',
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nwhile(1)\n{\n    printf("Hello");\n}',
        order_index: 2
    },
    {
        topic_id: 'c-p6-t7',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Another Example</h3>',
        order_index: 3
    },
    {
        topic_id: 'c-p6-t7',
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main() {\n\n    for (;;) {\n        printf("Infinite Loop\\n");\n    }\n\n    return 0;\n}',
        order_index: 4
    },
    {
        topic_id: 'c-p6-t7',
        content_type: 'syntax',
        content_text: '```output\nInfinite Loop\nInfinite Loop\nInfinite Loop\nInfinite Loop\n...\n```',
        order_index: 5
    },
    {
        topic_id: 'c-p6-t7',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Uses</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Operating Systems</li><li>Game Engines</li><li>Web Servers</li><li>Embedded Systems</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Disadvantages</h3><div class="space-y-4 mt-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><ul class="list-disc pl-6 space-y-2 text-red-700 dark:text-red-400 font-medium"><li>High CPU usage</li><li>Program never terminates</li><li>May hang the system</li></ul></div></div>',
        order_index: 6
    }
];

async function updateP6T7() {
    console.log('Updating Phase 6 Topic 7 content...');
    
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p6-t7');
        
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
    console.log('Successfully updated content for c-p6-t7!');
    
    console.log('Removing mastery challenge...');
    
    const { error: deleteChallengeError } = await supabase
        .from('course_challenges')
        .delete()
        .eq('topic_id', 'c-p6-t7');
        
    if (deleteChallengeError) {
        console.error('Error deleting challenge:', deleteChallengeError);
        return;
    }
    console.log('Challenge removed successfully.');
}

updateP6T7();
