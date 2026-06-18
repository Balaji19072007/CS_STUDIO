const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Stack vs Heap Memory ──────────────────────────────────────────
const t1Content = [
    { topic_id: 'c-p14-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Memory in C is divided into different regions. The two most important regions are:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li><strong>Stack Memory</strong></li><li><strong>Heap Memory</strong></li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Stack Memory</h3><p class="text-gray-700 dark:text-gray-300">Stack memory is automatically managed by the compiler. Variables declared inside functions are stored in the stack.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p14-t1', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int x = 10;\n    int y = 20;\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p14-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Here: <code class="font-mono text-blue-600 dark:text-blue-400">int x;</code> and <code class="font-mono text-blue-600 dark:text-blue-400">int y;</code> are stored in stack memory.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Characteristics</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Automatically allocated</li><li>Automatically deallocated</li><li>Fast access</li><li>Limited size</li><li>Cannot resize memory</li></ul></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Advantages / Disadvantages</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>✅ Faster execution</li><li>✅ No manual memory management</li><li>❌ Limited memory</li><li>❌ Fixed size</li></ul></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Heap Memory</h3><p class="text-gray-700 dark:text-gray-300">Heap memory is allocated during runtime. Programmer controls allocation and deallocation.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 3 },
    { topic_id: 'c-p14-t1', content_type: 'syntax', content_text: 'int *ptr;\nptr = (int *)malloc(sizeof(int));', order_index: 4 },
    { topic_id: 'c-p14-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Memory is allocated in heap.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Characteristics</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Runtime allocation</li><li>Large memory area</li><li>Manual management</li><li>Can be resized</li></ul></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Advantages / Disadvantages</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>✅ Flexible size</li><li>✅ Efficient for large data</li><li>❌ Slower than stack</li><li>❌ Memory leaks possible</li></ul></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Stack vs Heap Comparison</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Stack</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Heap</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4">Automatic allocation</td><td class="px-6 py-4">Manual allocation</td></tr><tr><td class="px-6 py-4">Faster</td><td class="px-6 py-4">Slower</td></tr><tr><td class="px-6 py-4">Limited size</td><td class="px-6 py-4">Larger size</td></tr><tr><td class="px-6 py-4">Automatically freed</td><td class="px-6 py-4">Must use free()</td></tr><tr><td class="px-6 py-4">Fixed memory</td><td class="px-6 py-4">Dynamic memory</td></tr></tbody></table></div>', order_index: 5 },
];

// ─── Topic 2: malloc() Function ─────────────────────────────────────────────
const t2Content = [
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is malloc()?</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-bold text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800 px-1 rounded">malloc</code> stands for <strong>Memory Allocation</strong>. It allocates a block of memory at runtime.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p14-t2', content_type: 'syntax', content_text: 'pointer = (type *)malloc(size_in_bytes);', order_index: 2 },
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Header File</h3>', order_index: 3 },
    { topic_id: 'c-p14-t2', content_type: 'syntax', content_text: '#include <stdlib.h>', order_index: 4 },
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 5 },
    { topic_id: 'c-p14-t2', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf("%d", *ptr);\n\n    free(ptr);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p14-t2', content_type: 'syntax', content_text: '```output\n100\n```', order_index: 7 },
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Allocating Multiple Integers</h3>', order_index: 8 },
    { topic_id: 'c-p14-t2', content_type: 'syntax', content_text: 'int *ptr;\nptr = (int *)malloc(5 * sizeof(int));', order_index: 9 },
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory for 5 integers is allocated.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Checking Allocation Success</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Always verify allocation.</p>', order_index: 10 },
    { topic_id: 'c-p14-t2', content_type: 'syntax', content_text: 'if(ptr == NULL)\n{\n    printf("Memory Allocation Failed");\n}', order_index: 11 },
    { topic_id: 'c-p14-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300"><strong>Why?</strong> If sufficient memory is unavailable, <code class="font-mono font-semibold">malloc()</code> returns NULL.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Features of malloc()</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Runtime allocation</li><li>Returns void pointer</li><li>Memory contains garbage values</li><li>Can allocate any size</li></ul>', order_index: 12 },
];

// ─── Topic 3: calloc() Function ─────────────────────────────────────────────
const t3Content = [
    { topic_id: 'c-p14-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is calloc()?</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-bold text-purple-600 dark:text-purple-400 bg-gray-100 dark:bg-gray-800 px-1 rounded">calloc</code> stands for <strong>Contiguous Allocation</strong>. It allocates multiple memory blocks and initializes them to zero.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p14-t3', content_type: 'syntax', content_text: 'pointer = (type *)calloc(number_of_elements,\n                         size_of_each_element);', order_index: 2 },
    { topic_id: 'c-p14-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p14-t3', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)calloc(5, sizeof(int));\n\n    for(int i=0;i<5;i++)\n    {\n        printf("%d ", ptr[i]);\n    }\n\n    free(ptr);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p14-t3', content_type: 'syntax', content_text: '```output\n0 0 0 0 0 \n```', order_index: 5 },
    { topic_id: 'c-p14-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Difference Between malloc() and calloc()</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">malloc()</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">calloc()</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4">Single block</td><td class="px-6 py-4">Multiple blocks</td></tr><tr><td class="px-6 py-4">Garbage values</td><td class="px-6 py-4">Zero initialized</td></tr><tr><td class="px-6 py-4">Faster</td><td class="px-6 py-4">Slightly slower</td></tr><tr><td class="px-6 py-4">One argument</td><td class="px-6 py-4">Two arguments</td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 6 },
    { topic_id: 'c-p14-t3', content_type: 'syntax', content_text: 'int *a;\na = (int *)malloc(5 * sizeof(int));\n\nint *b;\nb = (int *)calloc(5, sizeof(int));', order_index: 7 },
    { topic_id: 'c-p14-t3', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory in <strong>a</strong> contains garbage values.<br>Memory in <strong>b</strong> contains zeros.</p>', order_index: 8 },
];

// ─── Topic 4: realloc() Function ────────────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p14-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is realloc()?</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-bold text-orange-600 dark:text-orange-400 bg-gray-100 dark:bg-gray-800 px-1 rounded">realloc</code> stands for <strong>Reallocation</strong>. It changes the size of previously allocated memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p14-t4', content_type: 'syntax', content_text: 'pointer = realloc(pointer, new_size);', order_index: 2 },
    { topic_id: 'c-p14-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p14-t4', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)malloc(3 * sizeof(int));\n\n    ptr = realloc(ptr, 5 * sizeof(int));\n\n    free(ptr);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p14-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Expanding Memory</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-bold text-gray-700 dark:text-gray-300">Initial:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">ptr = malloc(3 * sizeof(int));</pre><p class="text-sm font-bold text-gray-700 dark:text-gray-300 mt-4">Memory:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">[ ][ ][ ]</pre><p class="text-sm font-bold text-gray-700 dark:text-gray-300 mt-4">After:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">ptr = realloc(ptr, 5 * sizeof(int));</pre><p class="text-sm font-bold text-gray-700 dark:text-gray-300 mt-4">Memory:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">[ ][ ][ ][ ][ ]</pre></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Shrinking Memory</h3>', order_index: 5 },
    { topic_id: 'c-p14-t4', content_type: 'syntax', content_text: 'ptr = realloc(ptr, 2 * sizeof(int));', order_index: 6 },
    { topic_id: 'c-p14-t4', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory becomes: <code class="font-mono font-semibold">[ ][ ]</code><br>Extra memory is released.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Resize memory dynamically</li><li>Avoid creating new arrays</li><li>Efficient memory management</li></ul>', order_index: 7 },
];

// ─── Topic 5: free() Function ───────────────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p14-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is free()?</h3><p class="text-gray-700 dark:text-gray-300">Memory allocated using <code class="font-mono">malloc()</code>, <code class="font-mono">calloc()</code>, or <code class="font-mono">realloc()</code> remains reserved until explicitly released.</p><p class="text-gray-700 dark:text-gray-300 mt-4"><code class="font-bold text-red-600 dark:text-red-400 bg-gray-100 dark:bg-gray-800 px-1 rounded">free()</code> releases allocated memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p14-t5', content_type: 'syntax', content_text: 'free(pointer);', order_index: 2 },
    { topic_id: 'c-p14-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p14-t5', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf("%d\\n", *ptr);\n\n    free(ptr);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p14-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use free()?</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Without <code class="font-mono">free()</code>:</p>', order_index: 5 },
    { topic_id: 'c-p14-t5', content_type: 'syntax', content_text: 'ptr = malloc(sizeof(int));', order_index: 6 },
    { topic_id: 'c-p14-t5', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory remains occupied. Repeated allocations eventually consume available memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Best Practice</h3>', order_index: 7 },
    { topic_id: 'c-p14-t5', content_type: 'syntax', content_text: 'free(ptr);\nptr = NULL;', order_index: 8 },
    { topic_id: 'c-p14-t5', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">This prevents accidental access to released memory.</p>', order_index: 9 },
];

// ─── Topic 6: Memory Leaks ──────────────────────────────────────────────────
const t6Content = [
    { topic_id: 'c-p14-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Memory Leak?</h3><p class="text-gray-700 dark:text-gray-300">A memory leak occurs when allocated memory is not released using <code class="font-mono font-bold text-red-600 dark:text-red-400">free()</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example of Memory Leak</h3>', order_index: 1 },
    { topic_id: 'c-p14-t6', content_type: 'example', content_text: '#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)malloc(100 * sizeof(int));\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p14-t6', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory is allocated. No <code class="font-mono text-red-500">free()</code> call exists. Memory leaks occur.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Correct Version</h3>', order_index: 3 },
    { topic_id: 'c-p14-t6', content_type: 'example', content_text: '#include <stdlib.h>\n\nint main()\n{\n    int *ptr;\n\n    ptr = (int *)malloc(100 * sizeof(int));\n\n    free(ptr);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p14-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Effects of Memory Leaks</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Reduced system performance</li><li>Increased memory consumption</li><li>Program crashes</li><li>Resource exhaustion</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Common Causes</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Forgetting free()</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">ptr = malloc(100);</pre></div><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Losing Pointer</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">ptr = malloc(100);\nptr = malloc(200);</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">First allocation becomes unreachable.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Prevention</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Always free allocated memory</li><li>Set pointers to NULL after freeing</li><li>Track memory allocations carefully</li></ul>', order_index: 5 },
];

// ─── Topic 7: Dynamic Arrays ────────────────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p14-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Dynamic Array?</h3><p class="text-gray-700 dark:text-gray-300">A dynamic array is an array whose size is decided during runtime.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Static Array</h4>', order_index: 1 },
    { topic_id: 'c-p14-t7', content_type: 'syntax', content_text: 'int arr[100];', order_index: 2 },
    { topic_id: 'c-p14-t7', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Size is fixed.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Dynamic Array</h4>', order_index: 3 },
    { topic_id: 'c-p14-t7', content_type: 'syntax', content_text: 'int *arr;\narr = (int *)malloc(n * sizeof(int));', order_index: 4 },
    { topic_id: 'c-p14-t7', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Size depends on user input.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p14-t7', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main()\n{\n    int n;\n\n    printf("Enter size: ");\n    scanf("%d", &n);\n\n    int *arr;\n    arr = (int *)malloc(n * sizeof(int));\n\n    for(int i=0;i<n;i++)\n    {\n        scanf("%d", &arr[i]);\n    }\n\n    for(int i=0;i<n;i++)\n    {\n        printf("%d ", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p14-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Flexible size</li><li>Efficient memory usage</li><li>Runtime allocation</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Databases</li><li>Student Records</li><li>Inventory Systems</li><li>Data Processing</li></ul>', order_index: 7 },
];

// ─── Topic 8: Dynamic Structures ────────────────────────────────────────────
const t8Content = [
    { topic_id: 'c-p14-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Dynamic Structures?</h3><p class="text-gray-700 dark:text-gray-300">Structures can also be allocated dynamically.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p14-t8', content_type: 'syntax', content_text: 'struct Student\n{\n    int rollNo;\n    float marks;\n};', order_index: 2 },
    { topic_id: 'c-p14-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Dynamic Allocation</h3>', order_index: 3 },
    { topic_id: 'c-p14-t8', content_type: 'syntax', content_text: 'struct Student *ptr;\n\nptr = (struct Student *)\n      malloc(sizeof(struct Student));', order_index: 4 },
    { topic_id: 'c-p14-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Accessing Members</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Using arrow operator:</p>', order_index: 5 },
    { topic_id: 'c-p14-t8', content_type: 'syntax', content_text: 'ptr->rollNo = 101;\nptr->marks = 95.5;', order_index: 6 },
    { topic_id: 'c-p14-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 7 },
    { topic_id: 'c-p14-t8', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student\n{\n    int rollNo;\n    float marks;\n};\n\nint main()\n{\n    struct Student *ptr;\n\n    ptr = (struct Student *)\n          malloc(sizeof(struct Student));\n\n    ptr->rollNo = 101;\n    ptr->marks = 95.5;\n\n    printf("Roll No = %d\\n", ptr->rollNo);\n    printf("Marks = %.2f\\n", ptr->marks);\n\n    free(ptr);\n\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p14-t8', content_type: 'syntax', content_text: '```output\nRoll No = 101\nMarks = 95.50\n```', order_index: 9 },
    { topic_id: 'c-p14-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Dynamic Structures?</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Useful when:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Number of records is unknown</li><li>Building linked lists</li><li>Building trees</li><li>Creating dynamic databases</li></ul>', order_index: 10 },
];


// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p14-t1', title: 'Stack vs Heap Memory',
        description: 'Write a C program to store a number using both a normal variable (stack memory) and a dynamically allocated variable (heap memory), then display both values.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int stackVar = 10;\n\n    int *heapVar = (int *)malloc(sizeof(int));\n    *heapVar = 20;\n\n    printf("Stack Value = %d\\n", stackVar);\n    printf("Heap Value = %d\\n", *heapVar);\n\n    free(heapVar);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Stack Value = 10\nHeap Value = 20', reference_output: 'Stack Value = 10\nHeap Value = 20',
        hints: JSON.stringify(['Use a normal variable for stack memory and malloc() for heap memory.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p14-t2', title: 'malloc() Function',
        description: 'Write a C program to dynamically allocate memory for 5 integers using malloc(), accept values from the user, and find their sum.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i, sum = 0;\n\n    arr = (int *)malloc(5 * sizeof(int));\n\n    printf("Enter 5 numbers:\\n");\n\n    for(i = 0; i < 5; i++) {\n        scanf("%d", &arr[i]);\n        sum += arr[i];\n    }\n\n    printf("Sum = %d\\n", sum);\n\n    free(arr);\n\n    return 0;\n}',
        input_format: 'Enter 5 space-separated integers.', output_format: 'Enter 5 numbers:\n10 20 30 40 50\nSum = 150', reference_output: 'Enter 5 numbers:\nSum = 150',
        hints: JSON.stringify(['Use malloc() to create an integer array at runtime.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p14-t3', title: 'calloc() Function',
        description: 'Write a C program to dynamically allocate memory for 5 integers using calloc() and display the default values.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)calloc(5, sizeof(int));\n\n    printf("Values:\\n");\n\n    for(i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Values:\n0 0 0 0 0 ', reference_output: 'Values:\n0 0 0 0 0 ',
        hints: JSON.stringify(['calloc() initializes allocated memory to zero.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p14-t4', title: 'realloc() Function',
        description: 'Write a C program to dynamically create an array of 3 integers, then increase its size to 5 integers using realloc() and accept the additional values.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)malloc(3 * sizeof(int));\n\n    printf("Enter 3 numbers:\\n");\n    for(i = 0; i < 3; i++) {\n        scanf("%d", &arr[i]);\n    }\n\n    arr = (int *)realloc(arr, 5 * sizeof(int));\n\n    printf("Enter 2 more numbers:\\n");\n    for(i = 3; i < 5; i++) {\n        scanf("%d", &arr[i]);\n    }\n\n    printf("Array Elements: ");\n\n    for(i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}',
        input_format: 'Enter 3 integers, then 2 more integers.', output_format: 'Enter 3 numbers:\n10 20 30\nEnter 2 more numbers:\n40 50\nArray Elements: 10 20 30 40 50 ', reference_output: 'Enter 3 numbers:\nEnter 2 more numbers:\nArray Elements: 10 20 30 40 50 ',
        hints: JSON.stringify(['Use realloc() to resize previously allocated memory.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p14-t5', title: 'free() Function',
        description: 'Write a C program to dynamically allocate memory for an integer, store a value, display it, and release the memory using free().',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf("Value = %d\\n", *ptr);\n\n    free(ptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 100', reference_output: 'Value = 100',
        hints: JSON.stringify(['Always free dynamically allocated memory when it is no longer needed.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p14-t6', title: 'Memory Leaks',
        description: 'Write a C program that properly allocates and releases memory to avoid memory leaks.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 50;\n\n    printf("Value = %d\\n", *ptr);\n\n    free(ptr);\n\n    ptr = NULL;\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 50', reference_output: 'Value = 50',
        hints: JSON.stringify(['Every successful malloc() should eventually have a matching free().']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p14-t7', title: 'Dynamic Arrays',
        description: 'Write a C program to create a dynamic array of size N, accept elements from the user, and find the largest element.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i;\n    int *arr;\n\n    printf("Enter size: ");\n    scanf("%d", &n);\n\n    arr = (int *)malloc(n * sizeof(int));\n\n    printf("Enter elements:\\n");\n\n    for(i = 0; i < n; i++) {\n        scanf("%d", &arr[i]);\n    }\n\n    int max = arr[0];\n\n    for(i = 1; i < n; i++) {\n        if(arr[i] > max)\n            max = arr[i];\n    }\n\n    printf("Largest Element = %d\\n", max);\n\n    free(arr);\n\n    return 0;\n}',
        input_format: 'Enter the size N, then N integers.', output_format: 'Enter size: 5\nEnter elements:\n12 45 8 67 23\nLargest Element = 67', reference_output: 'Enter size: Enter elements:\nLargest Element = 67',
        hints: JSON.stringify(['Allocate memory according to the size entered by the user.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p14-t8', title: 'Dynamic Structures',
        description: 'Write a C program to dynamically allocate memory for a student structure and display the entered student details.',
        solution_code: '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n};\n\nint main() {\n    struct Student *s;\n\n    s = (struct Student *)malloc(sizeof(struct Student));\n\n    printf("Enter Name: ");\n    scanf("%s", s->name);\n\n    printf("Enter Roll Number: ");\n    scanf("%d", &s->rollNo);\n\n    printf("\\nStudent Details\\n");\n    printf("Name: %s\\n", s->name);\n    printf("Roll No: %d\\n", s->rollNo);\n\n    free(s);\n\n    return 0;\n}',
        input_format: 'Enter Name and Roll Number.', output_format: 'Enter Name: Balu\nEnter Roll Number: 101\n\nStudent Details\nName: Balu\nRoll No: 101', reference_output: 'Enter Name: Enter Roll Number: \nStudent Details\nName: Balu\nRoll No: 101',
        hints: JSON.stringify(['Use malloc() with a structure pointer.']), difficulty: 'Medium'
    }
];

async function updateP14Topics() {
    console.log('Updating Phase 14 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content,
        ...t6Content, ...t7Content, ...t8Content
    ];
    const topicIds = [
        'c-p14-t1', 'c-p14-t2', 'c-p14-t3', 'c-p14-t4', 'c-p14-t5',
        'c-p14-t6', 'c-p14-t7', 'c-p14-t8'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 14 Topics 1-8!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p14-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP14Topics();
