require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicContent = [
    {
        type: 'text',
        content: '<p>Comments are notes written inside a program for explanation. They are ignored by the compiler.</p>'
    },
    {
        type: 'text',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Single-Line Comment</h3>'
    },
    {
        type: 'example',
        content: '// This is a comment',
        language: 'c',
        showTryYourself: false
    },
    {
        type: 'text',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multi-Line Comment</h3>'
    },
    {
        type: 'example',
        content: '/*\nThis is a\nmulti-line comment\n*/',
        language: 'c',
        showTryYourself: false
    },
    {
        type: 'text',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Comments?</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Improve readability</li><li>Explain logic</li><li>Help during maintenance</li><li>Make teamwork easier</li></ul>'
    },
    {
        type: 'text',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Documentation Guidelines</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Describe program purpose.</li><li>Explain important functions.</li><li>Comment complex logic.</li><li>Avoid unnecessary comments.</li></ul>'
    },
    {
        type: 'text',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>'
    },
    {
        type: 'example',
        content: '#include <stdio.h>\n\nint main()\n{\n    // Display a message\n    printf("Welcome");\n\n    return 0;\n}',
        language: 'c',
        showTryYourself: false
    }
];

async function updateTopic5() {
    console.log('Updating topic content for c-p1-t5...');
    
    // Update the topic
    const { data: topicData, error: topicError } = await supabase
        .from('topics')
        .update({
            topic_content: topicContent
        })
        .eq('id', 'c-p1-t5')
        .select('*');

    if (topicError) {
        console.error('Error updating topic:', topicError);
        return;
    }
    console.log('Successfully updated topic: c-p1-t5');

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
