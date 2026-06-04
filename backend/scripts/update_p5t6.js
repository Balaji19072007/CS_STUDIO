const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicBlocks = [
    {
        topic_id: 'c-p5-t6',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is goto?</h3><p>The <code>goto</code> statement transfers program control directly to another part of the program.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>'
    },
    {
        topic_id: 'c-p5-t6',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ngoto label;\n\nlabel:\n    statement;'
    },
    {
        topic_id: 'c-p5-t6',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flowchart</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white p-4 flex justify-center"><img src="/images/goto-flowchart.jpg" alt="goto statement flowchart" class="w-full max-w-xl object-contain rounded-lg" /></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>'
    },
    {
        topic_id: 'c-p5-t6',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Start\\n");\n\n    goto end;\n\n    printf("This will not execute\\n");\n\nend:\n    printf("Program End");\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p5-t6',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\nStart\nProgram End\n```'
    },
    {
        topic_id: 'c-p5-t6',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Program executes normally.</li><li><code>goto</code> jumps to a label.</li><li>Statements between <code>goto</code> and label are skipped.</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Drawbacks</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Makes programs difficult to understand.</li><li>Creates unstructured code.</li><li>Modern programming rarely uses <code>goto</code>.</li></ul>'
    }
];

const challengeData = {
    topic_id: 'c-p5-t6',
    title: 'Print Numbers using goto',
    description: 'Write a C program to demonstrate the use of the goto statement by printing numbers from 1 to 5.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int i = 1;\n\nstart:\n    printf("%d ", i);\n    i++;\n\n    if (i <= 5)\n        goto start;\n\n    return 0;\n}',
    input_format: 'No input required.',
    output_format: '1 2 3 4 5 ',
    reference_output: '1 2 3 4 5 ',
    hints: JSON.stringify(['Use a label and the goto statement to repeatedly execute a block of code until a condition becomes false.']),
    difficulty: 'Easy'
};

async function updateP5T6() {
    console.log('Updating Phase 5 Topic 6 content...');
    
    // Clear old content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p5-t6');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicBlocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p5-t6!');
    }

    // Insert/Update Mastery Challenge
    console.log('Updating mastery challenge...');
    
    const { data: existingChallenge } = await supabase
        .from('course_challenges')
        .select('id')
        .eq('topic_id', 'c-p5-t6')
        .single();
        
    if (existingChallenge) {
        const { error: updateError } = await supabase
            .from('course_challenges')
            .update(challengeData)
            .eq('topic_id', 'c-p5-t6');
        if (updateError) console.error('Error updating challenge:', updateError);
        else console.log('Challenge updated successfully.');
    } else {
        const { error: insertError } = await supabase
            .from('course_challenges')
            .insert(challengeData);
        if (insertError) console.error('Error inserting challenge:', insertError);
        else console.log('Challenge inserted successfully.');
    }
}

updateP5T6();
