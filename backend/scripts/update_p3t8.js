require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T8Blocks = [
    {
        topic_id: 'c-p3-t8',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>When multiple operators appear in an expression, C follows precedence rules.</p><p class="mt-2 text-gray-700 dark:text-gray-300">The operator with higher precedence executes first.</p>'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Example 1</h3>'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n10 + 5 * 2;'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Result:</p><p class="mt-2 text-gray-700 dark:text-gray-300">20</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Because:</p><p class="mt-2 text-gray-700 dark:text-gray-300 font-mono">5 * 2 = 10<br>10 + 10 = 20</p><p class="mt-2 text-gray-700 dark:text-gray-300">Multiplication has higher precedence.</p>'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Example 2</h3>'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n(10 + 5) * 2;'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Output:</p><p class="mt-2 text-gray-700 dark:text-gray-300">30</p><p class="mt-2 text-gray-700 dark:text-gray-300">Parentheses have highest priority.</p>'
    },
    {
        topic_id: 'c-p3-t8',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Common Precedence Order</h3><p class="mb-4 text-gray-700 dark:text-gray-300"><strong>Highest → Lowest</strong></p><table class="w-full text-left border-collapse mt-4 mb-8"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Operators</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">()</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">++ --</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">* / %</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">+ -</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&lt; &lt;= &gt; &gt;=</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">== !=</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">&amp;&amp;</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">?:</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">=</td></tr></tbody></table><div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-gray-800 dark:text-gray-200"><strong>Note:</strong> Based on the precedence table provided.</p></div>'
    }
];

async function updateP3T8() {
    console.log('Updating Phase 3 Topic 8 content...');
    
    // Delete existing topic content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t8');
    
    // Insert new topic content
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T8Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t8!');
    }

    console.log('Removing Phase 3 Topic 8 challenge as requested...');
    
    // Delete mastery challenge for this topic
    const { error: challengeError } = await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t8');
    if (challengeError) {
        console.error('Error deleting challenge:', challengeError);
    } else {
        console.log('Successfully removed challenge for c-p3-t8!');
    }
}

updateP3T8();
