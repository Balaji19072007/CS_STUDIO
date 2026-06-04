const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Introduction to Preprocessor ─────────────────────────────────
const t1Content = [
    { topic_id: 'c-p16-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Preprocessor?</h3><p class="text-gray-700 dark:text-gray-300">A Preprocessor is a software tool that processes source code before compilation. It executes all preprocessor directives.</p><p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 1 },
    { topic_id: 'c-p16-t1', content_type: 'example', content_text: '#define PI 3.14\n\nint main()\n{\n    printf("%f", PI);\n}', order_index: 2 },
    { topic_id: 'c-p16-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Before compilation:</p>', order_index: 3 },
    { topic_id: 'c-p16-t1', content_type: 'syntax', content_text: 'printf("%f", PI);', order_index: 4 },
    { topic_id: 'c-p16-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">After preprocessing:</p>', order_index: 5 },
    { topic_id: 'c-p16-t1', content_type: 'syntax', content_text: 'printf("%f", 3.14);', order_index: 6 },
    { topic_id: 'c-p16-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">The preprocessor replaces <code class="font-mono">PI</code> with <code class="font-mono">3.14</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Characteristics of Preprocessor Directives</h3><div class="space-y-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Begin with #</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">#include &lt;stdio.h&gt;\n#define MAX 100</pre></div><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-800 dark:text-red-300 mb-2">No Semicolon Required</h4><p class="text-sm text-green-600 dark:text-green-400 font-bold mb-1">Correct:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">#define MAX 100</pre><p class="text-sm text-red-600 dark:text-red-400 font-bold mb-1">Wrong:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">#define MAX 100;</pre></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Processed Before Compilation</h4><p class="text-sm text-gray-700 dark:text-gray-300">Compiler never sees the original directive. It only sees the expanded code.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Preprocessing Example</h3><p class="text-gray-700 dark:text-gray-300">Program:</p>', order_index: 7 },
    { topic_id: 'c-p16-t1', content_type: 'example', content_text: '#include <stdio.h>\n\n#define VALUE 10\n\nint main()\n{\n    printf("%d", VALUE);\n\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p16-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">After preprocessing:</p>', order_index: 9 },
    { topic_id: 'c-p16-t1', content_type: 'syntax', content_text: 'int main()\n{\n    printf("%d", 10);\n\n    return 0;\n}', order_index: 10 },
];

// ─── Topic 2: #include Directive ────────────────────────────────────────────
const t2Content = [
    { topic_id: 'c-p16-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is #include?</h3><p class="text-gray-700 dark:text-gray-300">The <code class="font-mono font-bold text-blue-600 dark:text-blue-400">#include</code> directive inserts the contents of another file into the current source file. It is mainly used for header files.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Standard Header File</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#include &lt;stdio.h&gt;</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">User-Defined Header File</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#include "myheader.h"</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Header Files?</h3><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800 mt-4"><h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Header files contain:</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm"><li>Function declarations</li><li>Macro definitions</li><li>Constants</li><li>Data type definitions</li></ul></div><p class="text-gray-700 dark:text-gray-300 mt-4">Example: <code class="font-mono text-blue-600 dark:text-blue-400">#include &lt;stdio.h&gt;</code> provides <code class="font-mono">printf()</code>, <code class="font-mono">scanf()</code>, <code class="font-mono">getchar()</code>, <code class="font-mono">putchar()</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Header Files</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">System Header Files</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Provided by C library.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n#include &lt;string.h&gt;\n#include &lt;math.h&gt;</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">User Header Files</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Created by programmer.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">#include "student.h"</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 1 },
    { topic_id: 'c-p16-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("Hello World");\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p16-t2', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Without <code class="font-mono">#include &lt;stdio.h&gt;</code>, the compiler cannot recognize <code class="font-mono">printf()</code> correctly.</p>', order_index: 3 },
];

// ─── Topic 3: #define Directive ─────────────────────────────────────────────
const t3Content = [
    { topic_id: 'c-p16-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is #define?</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-blue-600 dark:text-blue-400">#define</code> creates symbolic constants.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p16-t3', content_type: 'syntax', content_text: '#define identifier value', order_index: 2 },
    { topic_id: 'c-p16-t3', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p16-t3', content_type: 'syntax', content_text: '#define PI 3.14159', order_index: 4 },
    { topic_id: 'c-p16-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p16-t3', content_type: 'example', content_text: '#include <stdio.h>\n\n#define PI 3.14159\n\nint main()\n{\n    float radius = 5;\n\n    float area = PI * radius * radius;\n\n    printf("%.2f", area);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p16-t3', content_type: 'syntax', content_text: '```output\n78.54\n```', order_index: 7 },
    { topic_id: 'c-p16-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use #define?</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">3.14159\n3.14159\n3.14159</pre><p class="text-sm font-semibold text-red-600 dark:text-red-400 mt-2">Repeated many times.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">PI</pre><p class="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">Easy to maintain.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multiple Constants</h3>', order_index: 8 },
    { topic_id: 'c-p16-t3', content_type: 'syntax', content_text: '#define MAX 100\n#define MIN 0\n#define NAME "Balu"', order_index: 9 },
    { topic_id: 'c-p16-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Readable code</li><li>Easy modification</li><li>No memory usage</li><li>Faster replacement</li></ul>', order_index: 10 },
];

// ─── Topic 4: Macro Functions ───────────────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p16-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Macro?</h3><p class="text-gray-700 dark:text-gray-300">A macro is a code fragment replaced by the preprocessor. Macros can accept arguments like functions.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p16-t4', content_type: 'syntax', content_text: '#define MACRO_NAME(parameters) expression', order_index: 2 },
    { topic_id: 'c-p16-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p16-t4', content_type: 'syntax', content_text: '#define SQUARE(x) ((x) * (x))', order_index: 4 },
    { topic_id: 'c-p16-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 5 },
    { topic_id: 'c-p16-t4', content_type: 'example', content_text: '#include <stdio.h>\n\n#define SQUARE(x) ((x) * (x))\n\nint main()\n{\n    printf("%d", SQUARE(5));\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p16-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How Macro Expansion Works</h3><div class="grid grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Code:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">SQUARE(5)</pre></div><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Expanded:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">((5) * (5))</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multiple Parameter Macro</h3>', order_index: 7 },
    { topic_id: 'c-p16-t4', content_type: 'syntax', content_text: '#define ADD(a,b) ((a)+(b))', order_index: 8 },
    { topic_id: 'c-p16-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example: <code class="font-mono">printf("%d", ADD(10,20));</code> outputs <code class="font-mono">30</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Macro vs Function</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Macro</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Function</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4">No function call</td><td class="px-6 py-4">Function call</td></tr><tr><td class="px-6 py-4">Faster</td><td class="px-6 py-4">Slightly slower</td></tr><tr><td class="px-6 py-4">No memory overhead</td><td class="px-6 py-4">Uses memory</td></tr><tr><td class="px-6 py-4">Preprocessor replacement</td><td class="px-6 py-4">Runtime execution</td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Common Macro Mistake</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Wrong:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded mb-2">#define SQUARE(x) x*x</pre><p class="text-sm text-gray-700 dark:text-gray-300">Using: <code class="font-mono">SQUARE(2+3)</code><br>Expands to: <code class="font-mono">2+3*2+3</code><br>Result: <strong>11</strong></p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Correct:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded mb-2">#define SQUARE(x) ((x)*(x))</pre><p class="text-sm text-gray-700 dark:text-gray-300">Using: <code class="font-mono">SQUARE(2+3)</code><br>Expands to: <code class="font-mono">((2+3)*(2+3))</code><br>Result: <strong>25</strong></p></div></div>', order_index: 9 },
];

// ─── Topic 5: Conditional Compilation ───────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p16-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Conditional Compilation?</h3><p class="text-gray-700 dark:text-gray-300">Conditional compilation allows certain parts of code to be compiled only when specific conditions are met.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Directives Used</h3><div class="flex flex-wrap gap-2 mb-6"><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#if</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#ifdef</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#ifndef</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#else</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#elif</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#endif</span></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">#ifdef</h3><p class="text-gray-700 dark:text-gray-300">Means: <strong>If Defined</strong></p>', order_index: 1 },
    { topic_id: 'c-p16-t5', content_type: 'syntax', content_text: '#define DEBUG\n\n#ifdef DEBUG\nprintf("Debug Mode");\n#endif', order_index: 2 },
    { topic_id: 'c-p16-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">#ifndef</h3><p class="text-gray-700 dark:text-gray-300">Means: <strong>If Not Defined</strong></p>', order_index: 3 },
    { topic_id: 'c-p16-t5', content_type: 'syntax', content_text: '#ifndef SIZE\n#define SIZE 100\n#endif', order_index: 4 },
    { topic_id: 'c-p16-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">#if Example</h3>', order_index: 5 },
    { topic_id: 'c-p16-t5', content_type: 'syntax', content_text: '#define AGE 20\n\n#if AGE >= 18\nprintf("Adult");\n#endif', order_index: 6 },
    { topic_id: 'c-p16-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">#if, #else Example</h3>', order_index: 7 },
    { topic_id: 'c-p16-t5', content_type: 'syntax', content_text: '#define VALUE 5\n\n#if VALUE > 10\nprintf("Greater");\n#else\nprintf("Smaller");\n#endif', order_index: 8 },
    { topic_id: 'c-p16-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Debugging</li><li>Platform-specific code</li><li>Feature control</li><li>Library development</li></ul>', order_index: 9 },
];

// ─── Topic 6: Predefined Macros ─────────────────────────────────────────────
const t6Content = [
    { topic_id: 'c-p16-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Predefined Macros?</h3><p class="text-gray-700 dark:text-gray-300">C automatically provides built-in macros. These are supplied by the compiler.</p><div class="space-y-4 mt-6"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">__FILE__</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Displays file name.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">printf("%s", __FILE__);</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">__LINE__</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Displays current line number.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">printf("%d", __LINE__);</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">__DATE__</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Displays compilation date.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">printf("%s", __DATE__);</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-orange-700 dark:text-orange-400 mb-2">__TIME__</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Displays compilation time.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">printf("%s", __TIME__);</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-2">__STDC__</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Indicates ANSI C compliance (usually returns 1).</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">printf("%d", __STDC__);</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Example</h3>', order_index: 1 },
    { topic_id: 'c-p16-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    printf("File : %s\\n", __FILE__);\n    printf("Line : %d\\n", __LINE__);\n    printf("Date : %s\\n", __DATE__);\n    printf("Time : %s\\n", __TIME__);\n\n    return 0;\n}', order_index: 2 },
];

// ─── Topic 7: #undef and #pragma ────────────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p16-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">#undef Directive</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-blue-600 dark:text-blue-400">#undef</code> removes a previously defined macro.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Syntax</h4>', order_index: 1 },
    { topic_id: 'c-p16-t7', content_type: 'syntax', content_text: '#undef macro_name', order_index: 2 },
    { topic_id: 'c-p16-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p16-t7', content_type: 'syntax', content_text: '#define MAX 100\n\n#undef MAX\n\n// Now MAX no longer exists.', order_index: 4 },
    { topic_id: 'c-p16-t7', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Why Use #undef?</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Remove old definitions</li><li>Avoid naming conflicts</li><li>Reassign new values</li></ul><p class="text-gray-700 dark:text-gray-300 mt-4">Example Reassignment:</p>', order_index: 5 },
    { topic_id: 'c-p16-t7', content_type: 'syntax', content_text: '#define SIZE 100\n#undef SIZE\n#define SIZE 200', order_index: 6 },
    { topic_id: 'c-p16-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">#pragma Directive</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-purple-600 dark:text-purple-400">#pragma</code> provides compiler-specific instructions. Different compilers may support different pragma commands.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Common Examples</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Disable Warning</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#pragma warning(disable:4996)</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Structure Packing</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Used to reduce padding in structures.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#pragma pack(1)\n\nstruct Student\n{\n    char grade;\n    int roll;\n};</pre></div></div><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Advantages of #pragma</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Control compiler behavior</li><li>Optimize memory</li><li>Enable or disable warnings</li><li>Improve portability when used carefully</li></ul>', order_index: 7 },
];

// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p16-t1', title: 'Introduction to Preprocessor',
        description: 'Write a C program to use a preprocessor directive to include the standard input-output library and display a message.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    printf("Welcome to Preprocessor Directives\\n");\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Welcome to Preprocessor Directives', reference_output: 'Welcome to Preprocessor Directives',
        hints: JSON.stringify(['Preprocessor directives begin with # and are processed before compilation.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p16-t2', title: '#include Directive',
        description: 'Write a C program that uses the #include directive to include the math library and calculate the square root of a number.',
        solution_code: '#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    printf("Square Root = %.2f\\n", sqrt(num));\n\n    return 0;\n}',
        input_format: 'Enter an integer.', output_format: 'Enter a number: 25\nSquare Root = 5.00', reference_output: 'Enter a number: Square Root = 5.00',
        hints: JSON.stringify(['Include the appropriate header file and use a library function.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p16-t3', title: '#define Directive',
        description: 'Write a C program to calculate the area of a circle using a symbolic constant defined with #define.',
        solution_code: '#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    float radius;\n\n    printf("Enter radius: ");\n    scanf("%f", &radius);\n\n    printf("Area = %.2f\\n", PI * radius * radius);\n\n    return 0;\n}',
        input_format: 'Enter radius as a float.', output_format: 'Enter radius: 5\nArea = 78.54', reference_output: 'Enter radius: Area = 78.54',
        hints: JSON.stringify(['Use #define to create a constant value for PI.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p16-t4', title: 'Macro Functions',
        description: 'Write a C program to find the larger of two numbers using a macro function.',
        solution_code: '#include <stdio.h>\n\n#define MAX(a,b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int x, y;\n\n    printf("Enter two numbers: ");\n    scanf("%d %d", &x, &y);\n\n    printf("Largest = %d\\n", MAX(x, y));\n\n    return 0;\n}',
        input_format: 'Enter two space-separated integers.', output_format: 'Enter two numbers: 15 25\nLargest = 25', reference_output: 'Enter two numbers: Largest = 25',
        hints: JSON.stringify(['Create a macro that compares two values and returns the larger one.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p16-t5', title: 'Conditional Compilation',
        description: 'Write a C program that displays a debugging message only when a macro named DEBUG is defined.',
        solution_code: '#include <stdio.h>\n\n#define DEBUG\n\nint main() {\n\n#ifdef DEBUG\n    printf("Debug Mode Enabled\\n");\n#endif\n\n    printf("Program Executed\\n");\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Debug Mode Enabled\nProgram Executed', reference_output: 'Debug Mode Enabled\nProgram Executed',
        hints: JSON.stringify(['Use #ifdef and #endif.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p16-t6', title: 'Predefined Macros',
        description: 'Write a C program to display the current file name and compilation date using predefined macros.',
        solution_code: '#include <stdio.h>\n\nint main() {\n\n    printf("File Name: %s\\n", __FILE__);\n    printf("Compilation Date: %s\\n", __DATE__);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'File Name: main.c\nCompilation Date: Jun 01 2026', reference_output: 'File Name: [File]\nCompilation Date: [Date]',
        hints: JSON.stringify(['Use __FILE__ and __DATE__.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p16-t7', title: '#undef and #pragma',
        description: 'Write a C program to define a macro, undefine it using #undef, and then define it again with a different value.',
        solution_code: '#include <stdio.h>\n\n#define VALUE 10\n\n#undef VALUE\n\n#define VALUE 20\n\nint main() {\n\n    printf("Value = %d\\n", VALUE);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 20', reference_output: 'Value = 20',
        hints: JSON.stringify(['Use #undef before redefining a macro.']), difficulty: 'Medium'
    }
];

async function updateP16Topics() {
    console.log('Updating Phase 16 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content,
        ...t6Content, ...t7Content
    ];
    const topicIds = [
        'c-p16-t1', 'c-p16-t2', 'c-p16-t3', 'c-p16-t4', 'c-p16-t5',
        'c-p16-t6', 'c-p16-t7'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 16 Topics 1-7!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p16-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP16Topics();
