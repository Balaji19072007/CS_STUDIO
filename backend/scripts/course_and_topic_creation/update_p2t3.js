require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T3Blocks = [
    {
        topic_id: 'c-p2-t3',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Constants</h3><p>A constant is a value that cannot be changed during program execution.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t3',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nconst int DAYS = 7;'
    },
    {
        topic_id: 'c-p2-t3',
        order_index: 3,
        content_type: 'note',
        content_text: 'Once assigned, its value cannot be modified.\nConstants are declared using the const keyword.'
    },
    {
        topic_id: 'c-p2-t3',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Constants</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Integer Constant</h4><ul class="space-y-1 text-blue-800 dark:text-blue-300 font-mono text-sm"><li>10</li><li>25</li><li>1000</li></ul></div><div class="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Floating Constant</h4><ul class="space-y-1 text-purple-800 dark:text-purple-300 font-mono text-sm"><li>3.14</li><li>5.67</li><li>9.99</li></ul></div><div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20"><h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Character Constant</h4><ul class="space-y-1 text-emerald-800 dark:text-emerald-300 font-mono text-sm"><li>\'A\'</li><li>\'B\'</li><li>\'Z\'</li></ul></div><div class="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20"><h4 class="font-bold text-amber-700 dark:text-amber-400 mb-2">String Constant</h4><ul class="space-y-1 text-amber-800 dark:text-amber-300 font-mono text-sm"><li>"Hello"</li><li>"C Programming"</li></ul></div></div>'
    },
    {
        topic_id: 'c-p2-t3',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Symbolic Constants using #define</h3><p class="font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t3',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\n#define PI 3.14159\n\nfloat area = PI * r * r;'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t3',
    topic_name: 'Constants and Literals',
    title: 'Mastery Challenge',
    description: 'Write a C program to demonstrate the use of constants and literals by declaring a constant value for PI and displaying it along with different numeric and character literals.',
    input_format: 'No input required.',
    output_format: 'PI = 3.14159\nInteger Literal = 100\nFloat Literal = 25.75\nCharacter Literal = A',
    hints: 'Use the const keyword to declare a constant and directly use literals in printf() statements.',
    reference_output: 'PI = 3.14159\nInteger Literal = 100\nFloat Literal = 25.75\nCharacter Literal = A',
    solution_code: `#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf("PI = %.5f\\n", PI);\n    printf("Integer Literal = %d\\n", 100);\n    printf("Float Literal = %.2f\\n", 25.75);\n    printf("Character Literal = %c\\n", 'A');\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T3() {
    console.log('Updating Phase 2 Topic 3 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t3');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T3Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t3!');
    }

    console.log('Updating Phase 2 Topic 3 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t3');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t3!');
    }
}

updateP2T3();
