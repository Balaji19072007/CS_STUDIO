const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const introContent = [
    {
      type: 'text',
      content: 'So far, we have learned how to store data using variables, arrays, strings, and functions. Consider the following variable:'
    },
    {
      type: 'syntax',
      content: 'int num = 10;'
    },
    {
      type: 'text',
      content: 'The value <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">10</code> is stored somewhere in computer memory. Every variable stored in memory has a **value** and a **memory address**.'
    },
    {
      type: 'code',
      content: '// Memory Representation\nVariable    Value    Address\n--------    -----    -------\nnum          10      1000'
    },
    {
      type: 'text',
      content: 'The address may vary from system to system. Normally, we work with values. Example:'
    },
    {
      type: 'syntax',
      content: 'printf("%d", num); // Output: 10'
    },
    {
      type: 'text',
      content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why work with memory addresses?</h3><p class="text-gray-700 dark:text-gray-300">Sometimes programmers need to work directly with memory addresses for:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Dynamic Memory Allocation</li><li>Arrays and Strings</li><li>Functions (Pass by Reference)</li><li>Data Structures</li><li>Operating Systems and Embedded Systems</li></ul>'
    },
    {
      type: 'text',
      content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What is a Pointer?</h3><p class="text-gray-700 dark:text-gray-300">To work with memory addresses, C provides Pointers. A <strong class="text-blue-600 dark:text-blue-400">pointer</strong> is a variable that stores the memory address of another variable.</p>'
    },
    {
      type: 'syntax',
      content: 'int num = 10;\nint *ptr = &num;'
    },
    {
      type: 'text',
      content: '<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><ul class="space-y-2 text-gray-700 dark:text-gray-300"><li><code class="font-bold">num</code> stores value 10</li><li><code class="font-bold text-blue-600 dark:text-blue-400">&amp;num</code> gives the address of num</li><li><code class="font-bold text-purple-600 dark:text-purple-400">ptr</code> stores that address</li></ul></div>'
    },
    {
      type: 'text',
      content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Pointers are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Pointer</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">int num = 10;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">We can access only the value.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Pointer</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">int *ptr = &amp;num;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">We can access both the Value of num and Address of num.</p></div></div>'
    },
    {
      type: 'text',
      content: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a house. The <strong class="text-blue-600 dark:text-blue-400">House Number</strong> is the Address, and the <strong class="text-green-600 dark:text-green-400">Person</strong> living there is the Value.</p>'
    },
    {
      type: 'code',
      content: '// House analogy\nHouse Address : 1000\nPerson Name   : John'
    },
    {
      type: 'text',
      content: '<p class="mt-4 text-gray-700 dark:text-gray-300">A pointer stores <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">1000</code>, not <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">John</code>. Similarly, <code class="font-bold text-purple-600 dark:text-purple-400">ptr</code> stores the address of a variable, not the actual value.</p>'
    }
];

async function updatePhase11() {
    console.log('Updating Phase 11 intro_content in DB...');
    const { data, error } = await supabase.from('course_phases')
        .update({ intro_content: introContent })
        .eq('id', 'c-phase-11');
        
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Successfully updated Phase 11 intro_content!');
    }
}

updatePhase11();
