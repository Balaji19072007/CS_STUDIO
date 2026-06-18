const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const topicP4T3Blocks = [
    {
        topic_id: 'c-p4-t3',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Format Specifiers?</h3><p>Format specifiers tell C what type of data is being entered or displayed.</p><p class="mt-2">They begin with the <code>%</code> symbol.</p>'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Common Format Specifiers</h3><div class="overflow-x-auto"><table class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"><thead><tr class="bg-gray-50 dark:bg-gray-900"><th class="px-4 py-2 border-b text-left">Specifier</th><th class="px-4 py-2 border-b text-left">Data Type</th></tr></thead><tbody><tr><td class="px-4 py-2 border-b font-mono">%d</td><td class="px-4 py-2 border-b">int</td></tr><tr><td class="px-4 py-2 border-b font-mono">%f</td><td class="px-4 py-2 border-b">float</td></tr><tr><td class="px-4 py-2 border-b font-mono">%c</td><td class="px-4 py-2 border-b">char</td></tr><tr><td class="px-4 py-2 border-b font-mono">%s</td><td class="px-4 py-2 border-b">string</td></tr><tr><td class="px-4 py-2 border-b font-mono">%lf</td><td class="px-4 py-2 border-b">double</td></tr><tr><td class="px-4 py-2 border-b font-mono">%u</td><td class="px-4 py-2 border-b">unsigned int</td></tr></tbody></table></div><p class="mt-4">C uses format specifiers such as <code>%d</code>, <code>%f</code>, <code>%c</code>, and <code>%s</code> for formatted input and output.</p>'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="mt-8 font-bold text-gray-900 dark:text-white">Example</p>'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 4,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float cgpa = 8.7;\n    char grade = \'A\';\n\n    printf("%d\\n", age);\n    printf("%f\\n", cgpa);\n    printf("%c\\n", grade);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 5,
        content_type: 'syntax',
        content_text: '```output\n20\n8.700000\nA\n```'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">String Format Specifier</h3>'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar name[20];\n\nscanf("%s", name);\nprintf("%s", name);'
    },
    {
        topic_id: 'c-p4-t3',
        order_index: 8,
        content_type: 'syntax',
        content_text: '```output\nBob\nBob\n```'
    }
];

async function updateP4T3() {
    console.log('Updating Phase 4 Topic 3 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p4-t3');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP4T3Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p4-t3!');
    }

    console.log('Removing mastery challenge for Phase 4 Topic 3...');
    
    const { error: challengeError } = await supabase.from('course_challenges').delete().eq('topic_id', 'c-p4-t3');
    if (challengeError) {
        console.error('Error deleting challenge:', challengeError);
    } else {
        console.log('Successfully removed challenge for c-p4-t3!');
    }
}

updateP4T3();
