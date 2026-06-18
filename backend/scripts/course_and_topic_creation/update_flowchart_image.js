const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateFlowchart() {
    console.log('Updating Phase 5 Topic 1 flowchart...');
    
    const contentText = '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flow of Execution</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/if-statement-flowchart.png" alt="if statement flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><p class="mt-8 font-bold text-gray-900 dark:text-white">Example 1</p>';

    const { error } = await supabase
        .from('topic_content')
        .update({ content_text: contentText })
        .eq('topic_id', 'c-p5-t1')
        .eq('order_index', 3);

    if (error) {
        console.error('Error updating flowchart image:', error);
    } else {
        console.log('Successfully updated flowchart image!');
    }
}

updateFlowchart();
