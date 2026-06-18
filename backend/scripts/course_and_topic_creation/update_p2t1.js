require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T1Blocks = [
    {
        topic_id: 'c-p2-t1',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<p>A computer stores and processes data. Different kinds of data require different amounts of memory. Therefore, C provides various data types to represent different kinds of information.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">A data type tells the compiler:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>What type of value will be stored</li><li>How much memory should be allocated</li><li>What operations can be performed on the data</li></ul>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Data Types are Needed</h3><p>Suppose we want to store:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Age → whole number</li><li>Salary → decimal number</li><li>Grade → single character</li></ul><p class="mt-4">Each requires a different data type.</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age = 20;\nfloat salary = 35000.50;\nchar grade = \'A\';'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Basic Data Types in C</h3><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. int</h3><p>Used to store integer values.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Examples:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age = 21;\nint marks = 95;\nint temperature = -10;'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 6,
        content_type: 'syntax',
        content_text: '```output\n21\n95\n-10\n```'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 7,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. float</h3><p>Used to store decimal values.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Examples:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 8,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nfloat price = 99.99;\nfloat height = 5.8;'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 9,
        content_type: 'syntax',
        content_text: '```output\n99.99\n5.8\n```'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 10,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. char</h3><p>Used to store a single character.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Examples:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 11,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar grade = \'A\';\nchar gender = \'M\';'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 12,
        content_type: 'syntax',
        content_text: '```output\nA\nM\n```'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<p class="mt-4">Characters are enclosed in single quotes.</p><p class="mt-4 font-bold text-emerald-600 dark:text-emerald-400">Correct:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 14,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar ch = \'A\';'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 15,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-red-600 dark:text-red-400">Wrong:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 16,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nchar ch = "A";'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 17,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. double</h3><p>Stores larger decimal values with higher precision.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 18,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndouble pi = 3.14159265358979;'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 19,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 20,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float cgpa = 8.75;\n    char grade = \'A\';\n\n    printf("Age = %d\\n", age);\n    printf("CGPA = %f\\n", cgpa);\n    printf("Grade = %c\\n", grade);\n\n    return 0;\n}'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 21,
        content_type: 'syntax',
        content_text: '```output\nAge = 20\nCGPA = 8.750000\nGrade = A\n```'
    },
    {
        topic_id: 'c-p2-t1',
        order_index: 22,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Format Specifiers</h3><div class="overflow-x-auto mt-4"><table class="w-full text-left border-collapse"><thead class="bg-gray-100 dark:bg-gray-800"><tr><th class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-bold text-gray-900 dark:text-white">Data Type</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-bold text-gray-900 dark:text-white">Format Specifier</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">int</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">%d</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">float</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">%f</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">char</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">%c</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">double</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">%lf</td></tr></tbody></table></div>'
    }
];

async function updateP2T1() {
    console.log('Updating Phase 2 Topic 1 content...');
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t1');
    const { error } = await supabase.from('topic_content').insert(topicP2T1Blocks);
    if (error) {
        console.error('Error inserting:', error);
    } else {
        console.log('Successfully updated content for c-p2-t1!');
    }
}

updateP2T1();
