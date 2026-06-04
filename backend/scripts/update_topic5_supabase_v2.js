require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicContentBlocks = [
    {
        topic_id: 'c-p1-t5',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<p>Comments are notes written inside a program for explanation. They are ignored by the compiler.</p>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Single-Line Comment</h3>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 3,
        content_type: 'example',
        content_text: '// This is a comment'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multi-Line Comment</h3>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 5,
        content_type: 'example',
        content_text: '/*\nThis is a\nmulti-line comment\n*/'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Comments?</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Improve readability</li><li>Explain logic</li><li>Help during maintenance</li><li>Make teamwork easier</li></ul>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Documentation Guidelines</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Describe program purpose.</li><li>Explain important functions.</li><li>Comment complex logic.</li><li>Avoid unnecessary comments.</li></ul>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>'
    },
    {
        topic_id: 'c-p1-t5',
        order_index: 9,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    // Display a message\n    printf("Welcome");\n\n    return 0;\n}'
    }
];

async function updateTopic5() {
    console.log('Updating topic_content for c-p1-t5...');
    
    // First delete existing content
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', 'c-p1-t5');
        
    if (deleteError) {
        console.error('Error deleting old content:', deleteError);
        return;
    }
    
    // Insert new content
    const { error: insertError } = await supabase
        .from('topic_content')
        .insert(topicContentBlocks);

    if (insertError) {
        console.error('Error inserting new content:', insertError);
        return;
    }
    console.log('Successfully updated topic content for c-p1-t5');

    // Delete associated challenge
    console.log('Deleting associated challenge for c-p1-t5...');
    const { error: challengeError } = await supabase
        .from('course_challenges')
        .delete()
        .eq('topic_id', 'c-p1-t5');

    if (challengeError) {
        console.error('Error deleting challenge:', challengeError);
    } else {
        console.log('Successfully removed challenge for c-p1-t5.');
    }
}

updateTopic5();
