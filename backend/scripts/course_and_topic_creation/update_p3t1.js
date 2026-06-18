require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP3T1Blocks = [
    {
        topic_id: 'c-p3-t1',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Arithmetic operators perform mathematical calculations.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">List of Arithmetic Operators</h3><table class="w-full text-left border-collapse mt-4 mb-8"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Operator</th><th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Meaning</th></tr></thead><tbody><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">+</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Addition</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">-</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Subtraction</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">*</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Multiplication</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">/</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Division</td></tr><tr><td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">%</td><td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Modulus (Remainder)</td></tr></tbody></table>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 2,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Addition Operator (+)</h3><p>Adds two values.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 3,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a = 10;\nint b = 20;\n\nint sum = a + b;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 4,
        content_type: 'syntax',
        content_text: '```output\n30\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 5,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Subtraction Operator (-)</h3><p>Subtracts one value from another.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 6,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint result = 20 - 10;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 7,
        content_type: 'syntax',
        content_text: '```output\n10\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 8,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Multiplication Operator (*)</h3><p>Multiplies values.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 9,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint result = 5 * 4;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 10,
        content_type: 'syntax',
        content_text: '```output\n20\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Division Operator (/)</h3><p>Performs division.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint result = 10 / 2;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 13,
        content_type: 'syntax',
        content_text: '```output\n5\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 14,
        content_type: 'explanation',
        content_text: '<h3 class="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Integer Division</h3>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 15,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint result = 5 / 2;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 16,
        content_type: 'syntax',
        content_text: '```output\n2\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 17,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Why?</p><p class="mt-2">Because both operands are integers.</p><p class="mt-2">Fractional part is discarded.</p><p class="mt-4 text-gray-700 dark:text-gray-300">The PDF specifically notes:</p><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono mt-2 mb-2">x = 3 / 2;</pre><p>produces:</p><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono mt-2 mb-2">1</pre><p>even when x is float because integer division occurs first.</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 18,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Modulus Operator (%)</h3><p>Returns remainder.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 19,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint result = 17 % 5;'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 20,
        content_type: 'syntax',
        content_text: '```output\n2\n```'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 21,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Calculation:</p><p class="mt-2 font-mono">17 ÷ 5 = 3 remainder 2</p>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 22,
        content_type: 'note',
        content_text: '% works only with integers.'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 23,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Complete Program</h3>'
    },
    {
        topic_id: 'c-p3-t1',
        order_index: 24,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int a = 20;\n    int b = 10;\n\n    printf("Addition = %d\\n", a+b);\n    printf("Subtraction = %d\\n", a-b);\n    printf("Multiplication = %d\\n", a*b);\n    printf("Division = %d\\n", a/b);\n    printf("Modulus = %d\\n", a%b);\n\n    return 0;\n}'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p3-t1',
    topic_name: 'Arithmetic Operators',
    title: 'Mastery Challenge',
    description: 'Write a C program to perform arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two integers and display the results.',
    input_format: 'No input required.',
    output_format: 'Addition = 25\nSubtraction = 15\nMultiplication = 100\nDivision = 4\nModulus = 0',
    hints: 'Use arithmetic operators +, -, *, /, and % to perform calculations.',
    reference_output: 'Addition = 25\nSubtraction = 15\nMultiplication = 100\nDivision = 4\nModulus = 0',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int a = 20, b = 5;\n\n    printf("Addition = %d\\n", a + b);\n    printf("Subtraction = %d\\n", a - b);\n    printf("Multiplication = %d\\n", a * b);\n    printf("Division = %d\\n", a / b);\n    printf("Modulus = %d\\n", a % b);\n\n    return 0;\n}',
    language: 'C',
    difficulty: 'Easy'
};

async function updateP3T1() {
    console.log('Updating Phase 3 Topic 1 content...');
    
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p3-t1');
    
    const { error: contentError } = await supabase.from('topic_content').insert(topicP3T1Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p3-t1!');
    }

    console.log('Updating Phase 3 Topic 1 challenge...');
    
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p3-t1');
    
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p3-t1!');
    }
}

updateP3T1();
