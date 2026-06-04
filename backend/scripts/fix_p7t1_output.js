const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixOutputVisual() {
    console.log('Fixing Phase 7 Topic 1 output visual text color...');
    
    // We only need to update order_index = 3
    const { error } = await supabase
        .from('topic_content')
        .update({
            content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-4 mb-2">Output:</h4><div class="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-xl shadow-inner border border-gray-800">Hello Student</div>'
        })
        .eq('topic_id', 'c-p7-t1')
        .eq('order_index', 3);
        
    if (error) {
        console.error('Error updating DB:', error);
    } else {
        console.log('Successfully updated text color!');
    }
}

fixOutputVisual();
