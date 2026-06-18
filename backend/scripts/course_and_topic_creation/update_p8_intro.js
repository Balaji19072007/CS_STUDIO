const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const phaseContent = [
    {
        topic_id: 'c-p8',
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In Phase 7, we learned how to create functions, pass parameters, return values, and organize programs using modular programming.</p><p class="mt-4 text-gray-700 dark:text-gray-300">However, large real-world programs require more advanced function concepts such as:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Recursion</li><li>Variable Scope</li><li>Storage Classes</li><li>Static Variables</li><li>Inline Functions</li><li>Variable-Length Argument Lists</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">These advanced concepts help programmers:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Write efficient programs</li><li>Manage memory effectively</li><li>Control variable visibility</li><li>Optimize execution speed</li><li>Build reusable and scalable software</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">Functions are one of the most powerful features of C because they allow programmers to divide complex problems into smaller and manageable tasks.</p><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">Functions form the core structure of C programs and support modular programming through parameters, return values, local variables, and advanced memory management features.</p>',
        order_index: 1
    }
];

async function updateP8Intro() {
    console.log('Updating Phase 8 Introduction content...');
    
    // Delete existing content for Phase 8
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p8');
        
    if (deleteError) {
        console.error('Error deleting old content:', deleteError);
        return;
    }
    
    // Insert new content
    const { error: insertError } = await supabase
        .from('topic_content')
        .insert(phaseContent);
        
    if (insertError) {
        console.error('Error inserting new content:', insertError);
        return;
    }
    
    console.log('Successfully updated phase introduction for Phase 8!');
}

updateP8Intro();
