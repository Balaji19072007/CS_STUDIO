const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Pointer to Pointer ───────────────────────────────────────────
const t1Content = [
    { topic_id: 'c-p12-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Pointer to Pointer?</h3><p class="text-gray-700 dark:text-gray-300">A pointer normally stores the address of a variable.</p><p class="text-gray-700 dark:text-gray-300 mt-2">A <strong>pointer to pointer</strong> stores the address of another pointer.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p12-t1', content_type: 'syntax', content_text: 'int num = 10;\n\nint *ptr = &num;\n\nint **pptr = &ptr;', order_index: 2 },
    { topic_id: 'c-p12-t1', content_type: 'explanation', content_text: '<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><ul class="space-y-2 text-gray-700 dark:text-gray-300"><li><code class="font-bold text-blue-600 dark:text-blue-400">num</code> → stores value</li><li><code class="font-bold text-purple-600 dark:text-purple-400">ptr</code> → stores address of num</li><li><code class="font-bold text-green-600 dark:text-green-400">pptr</code> → stores address of ptr</li></ul></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Memory Representation:</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">num</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">Address: 1000\nValue: 10</pre></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">ptr</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">Address: 2000\nValue: 1000</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">pptr</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">Address: 3000\nValue: 2000</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 3 },
    { topic_id: 'c-p12-t1', content_type: 'syntax', content_text: 'datatype **pointer_name;\n\n// Example:\nint **pptr;', order_index: 4 },
    { topic_id: 'c-p12-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Accessing Values</h3>', order_index: 5 },
    { topic_id: 'c-p12-t1', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 10;\n\n    int *ptr = &num;\n\n    int **pptr = &ptr;\n\n    printf("%d\\n", num);\n\n    printf("%d\\n", *ptr);\n\n    printf("%d\\n", **pptr);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p12-t1', content_type: 'syntax', content_text: '```output\n10\n10\n10\n```', order_index: 7 },
    { topic_id: 'c-p12-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Understanding Levels</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">num      = 10\n*ptr     = 10\n**pptr   = 10</pre></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Used in:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Dynamic memory allocation</li><li>Linked lists</li><li>Command-line arguments</li><li>Multi-level data structures</li></ul>', order_index: 8 },
];

// ─── Topic 2: Array of Pointers ────────────────────────────────────────────
const t2Content = [
    { topic_id: 'c-p12-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is an Array of Pointers?</h3><p class="text-gray-700 dark:text-gray-300">An array whose elements are pointers.</p><p class="text-gray-700 dark:text-gray-300 mt-2">Instead of storing values directly, it stores memory addresses.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p12-t2', content_type: 'syntax', content_text: 'datatype *array_name[size];\n\n// Example:\nint *ptr[3];', order_index: 2 },
    { topic_id: 'c-p12-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Creates:</p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-2 font-mono text-sm text-gray-800 dark:text-gray-200"><p>ptr[0]</p><p>ptr[1]</p><p>ptr[2]</p></div><p class="mt-3 text-gray-700 dark:text-gray-300">Each element stores an address.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p12-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int a = 10;\n    int b = 20;\n    int c = 30;\n\n    int *ptr[3];\n\n    ptr[0] = &a;\n    ptr[1] = &b;\n    ptr[2] = &c;\n\n    printf("%d\\n", *ptr[0]);\n    printf("%d\\n", *ptr[1]);\n    printf("%d\\n", *ptr[2]);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p12-t2', content_type: 'syntax', content_text: '```output\n10\n20\n30\n```', order_index: 5 },
    { topic_id: 'c-p12-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Memory Representation</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200"><p>ptr[0] → address of a</p><p>ptr[1] → address of b</p><p>ptr[2] → address of c</p></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Common Use</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Array of strings:</p>', order_index: 6 },
    { topic_id: 'c-p12-t2', content_type: 'syntax', content_text: 'char *cities[] =\n{\n    "Delhi",\n    "Mumbai",\n    "Chennai"\n};', order_index: 7 },
];

// ─── Topic 3: Pointer to Array ─────────────────────────────────────────────
const t3Content = [
    { topic_id: 'c-p12-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Pointer to Array?</h3><p class="text-gray-700 dark:text-gray-300">A pointer that points to an <strong>entire array</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p12-t3', content_type: 'syntax', content_text: 'datatype (*pointer_name)[size];\n\n// Example:\nint (*ptr)[5];', order_index: 2 },
    { topic_id: 'c-p12-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p12-t3', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[5] = {10,20,30,40,50};\n\n    int (*ptr)[5] = &arr;\n\n    printf("%d", (*ptr)[0]);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p12-t3', content_type: 'syntax', content_text: '```output\n10\n```', order_index: 5 },
    { topic_id: 'c-p12-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Difference Between Array of Pointers and Pointer to Array</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Array of Pointers</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">int *ptr[5];</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Array containing 5 pointers</p></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Pointer to Array</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">int (*ptr)[5];</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Single pointer pointing to entire array</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Used in:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Multi-dimensional arrays</li><li>Matrix processing</li><li>Dynamic array handling</li></ul>', order_index: 6 },
];

// ─── Topic 4: Function Pointers ────────────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Function Pointer?</h3><p class="text-gray-700 dark:text-gray-300">A pointer that stores the <strong>address of a function</strong>.</p><p class="text-gray-700 dark:text-gray-300 mt-2">Just as variables have addresses, functions also have addresses.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Function Pointers?</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Allows:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Dynamic function calls</li><li>Callback mechanisms</li><li>Flexible program design</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p12-t4', content_type: 'syntax', content_text: 'return_type (*pointer_name)(parameters);\n\n// Example:\nint (*funcPtr)(int, int);', order_index: 2 },
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example Function</h4>', order_index: 3 },
    { topic_id: 'c-p12-t4', content_type: 'syntax', content_text: 'int add(int a, int b)\n{\n    return a + b;\n}', order_index: 4 },
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Assigning Address</h4>', order_index: 5 },
    { topic_id: 'c-p12-t4', content_type: 'syntax', content_text: 'funcPtr = add;\n// or\nfuncPtr = &add;', order_index: 6 },
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Calling Through Pointer</h4>', order_index: 7 },
    { topic_id: 'c-p12-t4', content_type: 'syntax', content_text: 'result = funcPtr(10, 20);', order_index: 8 },
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Program</h3>', order_index: 9 },
    { topic_id: 'c-p12-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint add(int a, int b)\n{\n    return a + b;\n}\n\nint main()\n{\n    int (*funcPtr)(int, int);\n\n    funcPtr = add;\n\n    printf("%d", funcPtr(10, 20));\n\n    return 0;\n}', order_index: 10 },
    { topic_id: 'c-p12-t4', content_type: 'syntax', content_text: '```output\n30\n```', order_index: 11 },
    { topic_id: 'c-p12-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Used in:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Callback functions</li><li>Event handling</li><li>Operating systems</li><li>Library design</li></ul>', order_index: 12 },
];

// ─── Topic 5: Callback Functions ───────────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p12-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Callback Function?</h3><p class="text-gray-700 dark:text-gray-300">A callback function is a function <strong>passed as an argument</strong> to another function.</p><p class="text-gray-700 dark:text-gray-300 mt-2">The receiving function can execute it whenever needed.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-Life Example</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200"><p>Restaurant</p><p>    |</p><p>Order Food</p><p>    |</p><p>Give Phone Number</p><p>    |</p><p>Restaurant Calls Later</p></div><p class="mt-3 text-gray-700 dark:text-gray-300 italic">Your phone number acts like a callback.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p12-t5', content_type: 'example', content_text: '#include <stdio.h>\n\nvoid greet()\n{\n    printf("Hello Student\\n");\n}\n\nvoid execute(void (*func)())\n{\n    func();\n}\n\nint main()\n{\n    execute(greet);\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p12-t5', content_type: 'syntax', content_text: '```output\nHello Student\n```', order_index: 3 },
    { topic_id: 'c-p12-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200"><p>main()</p><p>   |</p><p>execute(greet)</p><p>   |</p><p>greet()</p><p>   |</p><p>Hello Student</p></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Used in:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>GUI programming</li><li>Event-driven systems</li><li>Operating systems</li><li>Signal handling</li></ul>', order_index: 4 },
];

// ─── Topic 6: void Pointers ────────────────────────────────────────────────
const t6Content = [
    { topic_id: 'c-p12-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Void Pointer?</h3><p class="text-gray-700 dark:text-gray-300">A <strong>void pointer</strong> is a generic pointer.</p><p class="text-gray-700 dark:text-gray-300 mt-2">It can store the address of <strong>any data type</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p12-t6', content_type: 'syntax', content_text: 'void *ptr;', order_index: 2 },
    { topic_id: 'c-p12-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p12-t6', content_type: 'syntax', content_text: 'int num = 10;\n\nvoid *ptr = &num;', order_index: 4 },
    { topic_id: 'c-p12-t6', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Accessing Data</h4><p class="text-gray-700 dark:text-gray-300">Type casting is required.</p>', order_index: 5 },
    { topic_id: 'c-p12-t6', content_type: 'syntax', content_text: 'printf("%d", *(int *)ptr);', order_index: 6 },
    { topic_id: 'c-p12-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Program</h3>', order_index: 7 },
    { topic_id: 'c-p12-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 10;\n\n    void *ptr = &num;\n\n    printf("%d", *(int *)ptr);\n\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p12-t6', content_type: 'syntax', content_text: '```output\n10\n```', order_index: 9 },
    { topic_id: 'c-p12-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Void Pointers?</h3><p class="text-gray-700 dark:text-gray-300 mb-2">They provide flexibility. One pointer can work with:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 font-mono"><li>int</li><li>float</li><li>char</li><li>double</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Used in:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Generic functions</li><li>Memory allocation functions</li><li>Data structures</li></ul><p class="mt-3 text-gray-700 dark:text-gray-300">Example: <code class="font-mono font-bold text-blue-600 dark:text-blue-400">malloc()</code> returns a void pointer.</p>', order_index: 10 },
];

// ─── Topic 7: const Pointers ───────────────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">Sometimes we want to prevent accidental modification.</p><p class="text-gray-700 dark:text-gray-300 mt-2">The <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">const</code> keyword is used with pointers for this purpose.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Constant Pointer to Data</h3>', order_index: 1 },
    { topic_id: 'c-p12-t7', content_type: 'syntax', content_text: 'const int *ptr;\n\n// Data cannot be changed\n// Pointer can change', order_index: 2 },
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 3 },
    { topic_id: 'c-p12-t7', content_type: 'syntax', content_text: 'int x = 10;\nint y = 20;\n\nconst int *ptr = &x;\n\nptr = &y;   // Valid\n\n*ptr = 50;  // Invalid', order_index: 4 },
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Constant Pointer</h3>', order_index: 5 },
    { topic_id: 'c-p12-t7', content_type: 'syntax', content_text: 'int *const ptr = &x;\n\n// Pointer cannot change\n// Data can change', order_index: 6 },
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 7 },
    { topic_id: 'c-p12-t7', content_type: 'syntax', content_text: 'int x = 10;\n\nint *const ptr = &x;\n\n*ptr = 20;  // Valid\n\nptr = &y;   // Invalid', order_index: 8 },
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Constant Pointer to Constant Data</h3>', order_index: 9 },
    { topic_id: 'c-p12-t7', content_type: 'syntax', content_text: 'const int *const ptr = &x;\n\n// Pointer cannot change\n// Data cannot change', order_index: 10 },
    { topic_id: 'c-p12-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Comparison</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Declaration</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Data Change</th><th class="px-6 py-4 font-bold text-green-700 dark:text-green-400">Address Change</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">const int *ptr</td><td class="px-6 py-4 text-red-600 font-bold">No</td><td class="px-6 py-4 text-green-600 font-bold">Yes</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">int *const ptr</td><td class="px-6 py-4 text-green-600 font-bold">Yes</td><td class="px-6 py-4 text-red-600 font-bold">No</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">const int *const ptr</td><td class="px-6 py-4 text-red-600 font-bold">No</td><td class="px-6 py-4 text-red-600 font-bold">No</td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Summary of Advanced Pointer Concepts</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Topic</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Purpose</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Pointer to Pointer</td><td class="px-6 py-4">Stores address of another pointer</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Array of Pointers</td><td class="px-6 py-4">Array whose elements are pointers</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Pointer to Array</td><td class="px-6 py-4">Points to an entire array</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Function Pointer</td><td class="px-6 py-4">Stores function address</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Callback Function</td><td class="px-6 py-4">Function passed to another function</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Void Pointer</td><td class="px-6 py-4">Generic pointer</td></tr><tr><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Const Pointer</td><td class="px-6 py-4">Restricts modification</td></tr></tbody></table></div>', order_index: 11 },
];

// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p12-t1', title: 'Pointer to Pointer',
        description: 'Write a C program to demonstrate a pointer to a pointer and display the value of a variable using a double pointer.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    int **dptr = &ptr;\n\n    printf("Value = %d\\n", **dptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 10', reference_output: 'Value = 10',
        hints: JSON.stringify(['A pointer to a pointer stores the address of another pointer.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p12-t2', title: 'Array of Pointers',
        description: 'Write a C program to store names using an array of pointers and display them.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    char *names[] = {"Ravi", "Sita", "Kiran"};\n\n    for(int i = 0; i < 3; i++) {\n        printf("%s\\n", names[i]);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Ravi\nSita\nKiran', reference_output: 'Ravi\nSita\nKiran',
        hints: JSON.stringify(['Each element of the array stores the address of a string.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p12-t3', title: 'Pointer to Array',
        description: 'Write a C program to access array elements using a pointer to an array.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n\n    int (*ptr)[3] = &arr;\n\n    printf("%d %d %d\\n",\n           (*ptr)[0],\n           (*ptr)[1],\n           (*ptr)[2]);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: '10 20 30', reference_output: '10 20 30',
        hints: JSON.stringify(['A pointer can point to the entire array instead of a single element.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p12-t4', title: 'Function Pointers',
        description: 'Write a C program to add two numbers entered by the user using a function pointer.',
        solution_code: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a, b;\n\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n\n    int (*ptr)(int, int) = add;\n\n    printf("Sum = %d\\n", ptr(a, b));\n\n    return 0;\n}',
        input_format: 'Enter two numbers separated by a space.', output_format: 'Enter two numbers: 10 20\nSum = 30', reference_output: 'Enter two numbers: Sum = 30',
        hints: JSON.stringify(['Store the address of the addition function in a function pointer and call it.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p12-t5', title: 'Callback Functions',
        description: 'Write a C program to calculate the square of a number entered by the user using a callback function.',
        solution_code: '#include <stdio.h>\n\nvoid square(int num) {\n    printf("Square = %d\\n", num * num);\n}\n\nvoid execute(void (*func)(int), int value) {\n    func(value);\n}\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    execute(square, num);\n\n    return 0;\n}',
        input_format: 'Enter a single integer.', output_format: 'Enter a number: 5\nSquare = 25', reference_output: 'Enter a number: Square = 25',
        hints: JSON.stringify(['Pass a function pointer as an argument and invoke it inside another function.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p12-t6', title: 'void Pointers',
        description: 'Write a C program to accept an integer from the user, store its address in a void pointer, and display the value.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    void *ptr = &num;\n\n    printf("Value = %d\\n", *(int *)ptr);\n\n    return 0;\n}',
        input_format: 'Enter a single integer.', output_format: 'Enter a number: 25\nValue = 25', reference_output: 'Enter a number: Value = 25',
        hints: JSON.stringify(['A void pointer must be type-cast before dereferencing.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p12-t7', title: 'const Pointers',
        description: 'Write a C program to accept a number from the user and display it using a pointer to a constant.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    const int *ptr = &num;\n\n    printf("Value = %d\\n", *ptr);\n\n    return 0;\n}',
        input_format: 'Enter a single integer.', output_format: 'Enter a number: 100\nValue = 100', reference_output: 'Enter a number: Value = 100',
        hints: JSON.stringify(['A pointer to a constant can access the value but cannot modify it through the pointer.']), difficulty: 'Medium'
    }
];

async function updateP12Topics() {
    console.log('Updating Phase 12 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content,
        ...t5Content, ...t6Content, ...t7Content
    ];
    const topicIds = [
        'c-p12-t1', 'c-p12-t2', 'c-p12-t3', 'c-p12-t4',
        'c-p12-t5', 'c-p12-t6', 'c-p12-t7'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 12 Topics 1-7!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p12-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP12Topics();
