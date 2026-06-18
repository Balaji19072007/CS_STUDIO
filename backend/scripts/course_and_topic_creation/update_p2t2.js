require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const topicP2T2Blocks = [
    {
        topic_id: 'c-p2-t2',
        order_index: 1,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Variable?</h3><p>A variable is a named memory location used to store data.</p><p class="mt-2">Think of a variable as a labeled container.</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 2,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 3,
        content_type: 'explanation',
        content_text: '<p class="font-bold text-gray-900 dark:text-white mt-4">Here:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li><strong>int</strong> → data type</li><li><strong>age</strong> → variable name</li></ul>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 4,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Variable Declaration</h3><p>Creating a variable before using it.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Syntax:</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 5,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndatatype variable_name;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 6,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Examples:</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 7,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age;\nfloat salary;\nchar grade;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 8,
        content_type: 'note',
        content_text: 'According to the PDF, variables must be declared before use.'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 9,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Variable Initialization</h3><p>Assigning a value while declaring.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Syntax:</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 10,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\ndatatype variable_name = value;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 11,
        content_type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 12,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint age = 20;\nfloat salary = 50000.50;\nchar grade = \'A\';'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 13,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multiple Variables</h3>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 14,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a, b, c;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 15,
        content_type: 'explanation',
        content_text: '<p class="text-center font-bold text-gray-700 dark:text-gray-300">or</p>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 16,
        content_type: 'example',
        content_text: '// [CODE_ONLY]\nint a = 10, b = 20, c = 30;'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 17,
        content_type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Rules for Naming Variables</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20"><h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Valid</h4><ul class="space-y-1 text-emerald-800 dark:text-emerald-300 font-mono text-sm"><li>age</li><li>studentName</li><li>total_marks</li><li>count1</li></ul></div><div class="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Invalid</h4><ul class="space-y-1 text-red-800 dark:text-red-300 font-mono text-sm"><li>1age</li><li>float</li><li>student-name</li></ul></div></div>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 18,
        content_type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Example Program</h3>'
    },
    {
        topic_id: 'c-p2-t2',
        order_index: 19,
        content_type: 'example',
        content_text: '#include <stdio.h>\n\nint main()\n{\n    int age = 21;\n    float salary = 25000.50;\n\n    printf("Age = %d\\n", age);\n    printf("Salary = %.2f", salary);\n\n    return 0;\n}'
    }
];

const challengeData = {
    course_id: 'c-programming',
    topic_id: 'c-p2-t2',
    topic_name: 'Variable Declaration and Initialization',
    title: 'Mastery Challenge',
    description: 'Write a C program to declare variables of different data types (int, float, and char), initialize them with values, and display the values.',
    input_format: 'No input required.',
    output_format: 'Age = 20\nHeight = 5.8\nGrade = A',
    hints: 'Declare variables and assign values to them at the time of declaration before printing.',
    reference_output: 'Age = 20\nHeight = 5.8\nGrade = A',
    solution_code: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.8;\n    char grade = 'A';\n\n    printf("Age = %d\\n", age);\n    printf("Height = %.1f\\n", height);\n    printf("Grade = %c\\n", grade);\n\n    return 0;\n}`,
    language: 'C',
    difficulty: 'Easy'
};

async function updateP2T2() {
    console.log('Updating Phase 2 Topic 2 content...');
    
    // Delete existing content
    await supabase.from('topic_content').delete().eq('topic_id', 'c-p2-t2');
    
    // Insert new content
    const { error: contentError } = await supabase.from('topic_content').insert(topicP2T2Blocks);
    if (contentError) {
        console.error('Error inserting topic content:', contentError);
    } else {
        console.log('Successfully updated content for c-p2-t2!');
    }

    console.log('Updating Phase 2 Topic 2 challenge...');
    
    // Delete existing challenge
    await supabase.from('course_challenges').delete().eq('topic_id', 'c-p2-t2');
    
    // Insert new challenge
    const { error: challengeError } = await supabase.from('course_challenges').insert(challengeData);
    if (challengeError) {
        console.error('Error inserting challenge:', challengeError);
    } else {
        console.log('Successfully updated challenge for c-p2-t2!');
    }
}

updateP2T2();
