require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t1';
    
    // First, delete existing content for this topic
    const { error: deleteError } = await supabase
        .from('topic_content')
        .delete()
        .eq('topic_id', topicId);
        
    if (deleteError) {
        console.error("Delete Error:", deleteError);
        return;
    }

    const blocks = [
        {
            topic_id: topicId,
            content_type: 'definition',
            content_text: 'C is a high-level programming language developed for system programming and application development. It is widely used because it provides structured programming, efficient execution, and good control over hardware resources.',
            order_index: 1
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Features of C\n• Simple and efficient language\n• Supports structured programming\n• Encourages modular programming using functions\n• Provides powerful data types and operators\n• Portable across different platforms\n• Fast execution speed',
            order_index: 2
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Applications\n• Operating systems\n• Embedded systems\n• Device drivers\n• System software\n• Compilers\n• General-purpose applications',
            order_index: 3
        },
        {
            topic_id: topicId,
            content_type: 'explanation',
            content_text: 'Advantages\n• Fast and efficient\n• Easy to learn\n• Rich library support\n• Portable and flexible',
            order_index: 4
        }
    ];

    const { data, error } = await supabase
        .from('topic_content')
        .insert(blocks);

    if (error) {
        console.error("Insert Error:", error);
    } else {
        console.log("Successfully updated topic content for c-p1-t1!");
    }
}
run();
