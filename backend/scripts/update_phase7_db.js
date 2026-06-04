const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const introContent = [
      {
        type: 'explanation',
        content: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">As programs become larger, writing all code inside the <code>main()</code> function becomes difficult to manage.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Consider a program that performs Addition, Subtraction, Multiplication, Division, and Printing Results. Writing everything inside <code>main()</code> makes the program lengthy, difficult to read, and hard to maintain.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">To solve this problem, C provides <strong>Functions</strong>.<br><br>A function is a block of code designed to perform a specific task.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Functions help divide a large program into smaller, manageable parts.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3>'
      },
      {
        type: 'example',
        content: '#include <stdio.h>\n\nvoid display()\n{\n    printf("Welcome to C Programming");\n}\n\nint main()\n{\n    display();\n\n    return 0;\n}'
      },
      {
        type: 'syntax',
        content: '```output\nWelcome to C Programming\n```'
      },
      {
        type: 'explanation',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Here:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li><code>display()</code> is a function.</li><li>It performs the task of displaying a message.</li><li>The function can be called whenever needed.</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300">According to the PDF, a C program consists of functions and variables. Functions specify the tasks performed by the program, and the <code>main()</code> function controls the overall execution of the program.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Functions are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Functions:</h4><pre class="text-sm text-red-600 dark:text-red-300 font-mono">printf("Addition Result");\nprintf("Addition Result");\nprintf("Addition Result");\nprintf("Addition Result");</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Functions:</h4><pre class="text-sm text-green-600 dark:text-green-300 font-mono">displayResult();\ndisplayResult();\ndisplayResult();\ndisplayResult();</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Benefits:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Reduces code repetition</li><li>Improves readability</li><li>Easier debugging</li><li>Better maintenance</li><li>Supports modular programming</li><li>Makes large programs manageable</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a function as a machine.</p>'
      },
      {
        type: 'syntax',
        content: '```mermaid\nflowchart TD\n    A([Input]) --> B[Function]\n    B --> C([Output])\n```'
      },
      {
        type: 'explanation',
        content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3>'
      },
      {
        type: 'syntax',
        content: '```mermaid\nflowchart TD\n    A([Numbers]) --> B[Addition Function]\n    B --> C([Result])\n```'
      }
    ];

async function updatePhase7() {
    console.log('Updating Phase 7 intro_content in DB...');
    
    const { error } = await supabase
        .from('course_phases')
        .update({ intro_content: introContent })
        .eq('id', 'c-phase-7');
        
    if (error) {
        console.error('Error updating DB:', error);
    } else {
        console.log('Successfully updated DB!');
    }
}

updatePhase7();
