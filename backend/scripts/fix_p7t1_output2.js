const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixOutputVisual() {
    console.log('Fixing Phase 7 Topic 1 output visual to use syntax block...');
    
    const { error } = await supabase
        .from('topic_content')
        .update({
            content_type: 'syntax',
            content_text: '```output\nHello Student\n```'
        })
        .eq('topic_id', 'c-p7-t1')
        .eq('order_index', 3);
        
    if (error) {
        console.error('Error updating DB:', error);
    } else {
        console.log('Successfully updated to syntax type!');
    }
}

fixOutputVisual();
