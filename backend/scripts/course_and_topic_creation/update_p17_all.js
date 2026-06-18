const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Command-Line Arguments ──────────────────────────────────────
const t1Content = [
    { topic_id: 'c-p17-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Command-Line Arguments?</h3><p class="text-gray-700 dark:text-gray-300">Command-line arguments allow data to be passed to a program when it starts execution.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Normally:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int main()\n{\n    return 0;\n}</pre></div><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">With command-line arguments:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int main(int argc, char *argv[])\n{\n    return 0;\n}</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Command-Line Arguments?</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Without command-line arguments, the program asks the user for input: <code class="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded">scanf("%d", &num);</code></p><p class="text-sm text-gray-700 dark:text-gray-300 mt-4 mb-2">With command-line arguments, input is supplied directly when launching the program:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">program.exe 10</pre></div><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Useful for:</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Automation</li><li>Batch Processing</li><li>Operating Systems</li><li>Compilers</li><li>Utility Programs</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Understanding argc and argv</h3><div class="space-y-4"><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">argc (Argument Count)</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Stores total number of arguments.</p><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Example: <code class="font-mono">program.exe 10 20</code> makes argc become <code class="font-mono font-bold">3</code>.</p><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Reason:</p><ul class="list-none space-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1"><li><code class="font-mono">argv[0]</code> → program.exe</li><li><code class="font-mono">argv[1]</code> → 10</li><li><code class="font-mono">argv[2]</code> → 20</li></ul></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">argv (Argument Vector)</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Stores arguments as strings.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">argv[0] = "program.exe"\nargv[1] = "10"\nargv[2] = "20"</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 1 },
    { topic_id: 'c-p17-t1', content_type: 'example', content_text: '#include <stdio.h>\n\nint main(int argc, char *argv[])\n{\n    printf("Number of Arguments = %d\\n", argc);\n\n    for(int i=0;i<argc;i++)\n    {\n        printf("%s\\n", argv[i]);\n    }\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p17-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Execution:</p>', order_index: 3 },
    { topic_id: 'c-p17-t1', content_type: 'syntax', content_text: 'program.exe Hello C', order_index: 4 },
    { topic_id: 'c-p17-t1', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Output:</p>', order_index: 5 },
    { topic_id: 'c-p17-t1', content_type: 'syntax', content_text: '```output\nNumber of Arguments = 3\nprogram.exe\nHello\nC\n```', order_index: 6 },
    { topic_id: 'c-p17-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Converting Arguments to Numbers</h3><p class="text-gray-700 dark:text-gray-300">Arguments arrive as strings. Use <code class="font-mono font-bold text-blue-600 dark:text-blue-400">atoi()</code> or <code class="font-mono font-bold text-blue-600 dark:text-blue-400">atof()</code> to convert them.</p>', order_index: 7 },
    { topic_id: 'c-p17-t1', content_type: 'example', content_text: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[])\n{\n    int a = atoi(argv[1]);\n    int b = atoi(argv[2]);\n\n    printf("%d", a + b);\n\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p17-t1', content_type: 'syntax', content_text: '```output\n30\n```', order_index: 9 },
];

// ─── Topic 2: Bit Manipulation Techniques ───────────────────────────────────
const t2Content = [
    { topic_id: 'c-p17-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Bit Manipulation?</h3><p class="text-gray-700 dark:text-gray-300">Bit manipulation means working directly with individual bits of data. Every integer is stored in binary form.</p><p class="text-gray-700 dark:text-gray-300 mt-4">Example: Decimal 10 is Binary <code class="font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">00001010</code></p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Used in:</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Embedded Systems</li><li>Operating Systems</li><li>Device Drivers</li><li>Communication Protocols</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Bitwise Operators</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Operator</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Meaning</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-mono font-bold text-lg">&</td><td class="px-6 py-4">AND</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-lg">|</td><td class="px-6 py-4">OR</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-lg">^</td><td class="px-6 py-4">XOR</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-lg">~</td><td class="px-6 py-4">NOT</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-lg">&lt;&lt;</td><td class="px-6 py-4">Left Shift</td></tr><tr><td class="px-6 py-4 font-mono font-bold text-lg">&gt;&gt;</td><td class="px-6 py-4">Right Shift</td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Operations</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Bitwise AND</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int result = 5 & 3;</pre><pre class="font-mono text-xs text-gray-600 dark:text-gray-400 mt-2">  0101 (5)\n& 0011 (3)\n------\n  0001 (1)</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Bitwise OR</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int result = 5 | 3;</pre><pre class="font-mono text-xs text-gray-600 dark:text-gray-400 mt-2">  0101 (5)\n| 0011 (3)\n------\n  0111 (7)</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Bitwise XOR</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int result = 5 ^ 3;</pre><pre class="font-mono text-xs text-gray-600 dark:text-gray-400 mt-2">  0101 (5)\n^ 0011 (3)\n------\n  0110 (6)</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-orange-700 dark:text-orange-400 mb-2">Left Shift</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">5 &lt;&lt; 1</pre><pre class="font-mono text-xs text-gray-600 dark:text-gray-400 mt-2">00000101 (5) -> 00001010 (10)</pre><p class="text-xs text-gray-500 mt-1">Equivalent to multiplying by 2.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Common Bit Hacks</h3>', order_index: 1 },
    { topic_id: 'c-p17-t2', content_type: 'syntax', content_text: '// Setting a Bit\nnum = num | (1 << position);\n\n// Clearing a Bit\nnum = num & ~(1 << position);\n\n// Toggling a Bit\nnum = num ^ (1 << position);\n\n// Checking a Bit\nif(num & (1 << position))\n{\n    printf("Bit Set");\n}', order_index: 2 },
];

// ─── Topic 3: Bit Fields ────────────────────────────────────────────────────
const t3Content = [
    { topic_id: 'c-p17-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Bit Fields?</h3><p class="text-gray-700 dark:text-gray-300">Bit fields allow memory allocation at bit level inside structures.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-800 dark:text-red-300 mb-2">Normally:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int age;</pre><p class="text-sm font-semibold text-red-600 dark:text-red-400 mt-2">Consumes 4 bytes (even if age only needs 7 bits).</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-800 dark:text-green-300 mb-2">With Bit Fields:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">unsigned int age : 7;</pre><p class="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">age uses only 7 bits. Saves memory!</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax and Example</h3>', order_index: 1 },
    { topic_id: 'c-p17-t3', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    unsigned int age : 7;\n    unsigned int grade : 4;\n};\n\nint main()\n{\n    struct Student s;\n\n    s.age = 20;\n    s.grade = 8;\n\n    printf("%d\\n", s.age);\n    printf("%d\\n", s.grade);\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p17-t3', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Advantages & Applications</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Saves memory</li><li>Compact data representation</li><li>Useful in embedded systems</li><li>Hardware Registers</li><li>Communication Packets</li><li>Device Drivers</li><li>Network Protocols</li></ul>', order_index: 3 },
];

// ─── Topic 4: Enumerations Advanced ─────────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p17-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Enumeration?</h3><p class="text-gray-700 dark:text-gray-300">Enumeration (<code class="font-mono">enum</code>) is a user-defined type consisting of named integer constants.</p>', order_index: 1 },
    { topic_id: 'c-p17-t4', content_type: 'syntax', content_text: 'enum Day\n{\n    MON,\n    TUE,\n    WED\n};', order_index: 2 },
    { topic_id: 'c-p17-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Values assigned by default: <code class="font-mono">MON = 0</code>, <code class="font-mono">TUE = 1</code>, <code class="font-mono">WED = 2</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Assigning Custom Values</h3>', order_index: 3 },
    { topic_id: 'c-p17-t4', content_type: 'syntax', content_text: 'enum Status\n{\n    SUCCESS = 1,\n    FAILURE = -1,\n    PENDING = 0\n};', order_index: 4 },
    { topic_id: 'c-p17-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 5 },
    { topic_id: 'c-p17-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nenum Status\n{\n    SUCCESS = 1,\n    FAILURE = -1\n};\n\nint main()\n{\n    enum Status result;\n\n    result = SUCCESS;\n\n    printf("%d", result);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p17-t4', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Advantages & Applications</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Readable code</li><li>Meaningful names</li><li>Error Codes</li><li>Menu Systems</li><li>State Machines</li><li>Operating Systems</li></ul>', order_index: 7 },
];

// ─── Topic 5: Type Qualifiers ───────────────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p17-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Type Qualifiers?</h3><p class="text-gray-700 dark:text-gray-300">Type qualifiers modify how variables are used. Important qualifiers are <code class="font-mono font-bold text-blue-600 dark:text-blue-400">const</code>, <code class="font-mono font-bold text-blue-600 dark:text-blue-400">volatile</code>, and <code class="font-mono font-bold text-blue-600 dark:text-blue-400">restrict</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">const</h3><p class="text-gray-700 dark:text-gray-300">Prevents modification.</p>', order_index: 1 },
    { topic_id: 'c-p17-t5', content_type: 'syntax', content_text: 'const int MAX = 100;\n\nMAX = 200; // Compiler Error!', order_index: 2 },
    { topic_id: 'c-p17-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">volatile</h3><p class="text-gray-700 dark:text-gray-300">Tells compiler that value may change unexpectedly (e.g. by hardware).</p>', order_index: 3 },
    { topic_id: 'c-p17-t5', content_type: 'syntax', content_text: 'volatile int sensor;', order_index: 4 },
    { topic_id: 'c-p17-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Used in Hardware Registers, Interrupt Service Routines, and Embedded Systems.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">restrict</h3><p class="text-gray-700 dark:text-gray-300">Used with pointers. Promises compiler that the pointer uniquely accesses data, allowing better optimization.</p>', order_index: 5 },
    { topic_id: 'c-p17-t5', content_type: 'syntax', content_text: 'void process(int *restrict p)\n{\n}', order_index: 6 },
    { topic_id: 'c-p17-t5', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Benefits</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Improved safety</li><li>Better optimization</li><li>Better hardware interaction</li></ul>', order_index: 7 },
];

// ─── Topic 6: Variable Scope and Lifetime ───────────────────────────────────
const t6Content = [
    { topic_id: 'c-p17-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Scope & Lifetime</h3><p class="text-gray-700 dark:text-gray-300"><strong>Scope</strong> determines where a variable can be accessed.<br><strong>Lifetime</strong> determines how long a variable exists in memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Local vs Global Variables</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Local Variables</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Declared inside functions.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">void display()\n{\n    int x = 10;\n}</pre><p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2">Scope: Inside display()<br>Lifetime: During function execution</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Global Variables</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Declared outside all functions.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int count = 0;</pre><p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2">Scope: Entire program<br>Lifetime: Entire program execution</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Static Variables</h3><p class="text-gray-700 dark:text-gray-300">Characteristics: Local scope, but Entire program lifetime.</p>', order_index: 1 },
    { topic_id: 'c-p17-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nvoid test()\n{\n    static int count = 0;\n    count++;\n    printf("%d\\n", count);\n}\n\nint main()\n{\n    test();\n    test();\n    test();\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p17-t6', content_type: 'syntax', content_text: '```output\n1\n2\n3\n```', order_index: 3 },
];

// ─── Topic 7: Multi-File Programs ───────────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p17-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Multi-File Program?</h3><p class="text-gray-700 dark:text-gray-300">Large projects are divided into multiple source files. Instead of a single <code class="font-mono font-bold">main.c</code> with 5000 lines, we create <code class="font-mono">main.c</code>, <code class="font-mono">math.c</code>, <code class="font-mono">student.c</code>, etc. This improves organization.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Project Structure</h3><div class="space-y-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">math.h</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int add(int a, int b);</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">math.c</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">int add(int a, int b)\n{\n    return a + b;\n}</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">main.c</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#include &lt;stdio.h&gt;\n#include "math.h"\n\nint main()\n{\n    printf("%d", add(10,20));\n    return 0;\n}</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">extern Keyword</h3><p class="text-gray-700 dark:text-gray-300">Allows access to global variables from another file.</p>', order_index: 1 },
    { topic_id: 'c-p17-t7', content_type: 'syntax', content_text: '// File1:\nint count = 100;\n\n// File2:\nextern int count;', order_index: 2 },
    { topic_id: 'c-p17-t7', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Advantages</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Better organization</li><li>Easier maintenance</li><li>Team development support</li><li>Faster debugging</li><li>Code reusability</li></ul><div class="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-xl"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-300">Running Multi-File Code in Our Editor</h3><div class="mt-2 text-sm text-yellow-700 dark:text-yellow-400"><p>You can run multi-file programs directly in the "Run Code" terminal! Simply separate your files using a <code class="font-bold">// File: filename.c</code> comment like this:</p><pre class="mt-2 text-xs bg-white/50 dark:bg-black/20 p-2 rounded"><code>// File: math.c\nint add(int a, int b) { return a + b; }\n\n// File: main.c\n#include &lt;stdio.h&gt;\nint add(int, int);\nint main() { printf("%d", add(10,20)); return 0; }</code></pre></div></div></div></div>', order_index: 3 },
];

// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p17-t1', title: 'Command-Line Arguments',
        description: 'Write a C program to accept a student\'s name and marks through command-line arguments and display them.',
        solution_code: '#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\n    printf("Student Name: %s\\n", argv[1]);\n    printf("Marks: %s\\n", argv[2]);\n\n    return 0;\n}',
        input_format: 'Pass arguments directly using the "Args" input box next to the Run button.', output_format: 'Student Name: Balu\nMarks: 95', reference_output: 'Student Name: Balu\nMarks: 95',
        hints: JSON.stringify(['Use argc and argv to access command-line arguments.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p17-t2', title: 'Bit Manipulation Techniques',
        description: 'Write a C program to check whether the 3rd bit of a number is ON or OFF.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    if(num & (1 << 2))\n        printf("3rd Bit is ON\\n");\n    else\n        printf("3rd Bit is OFF\\n");\n\n    return 0;\n}',
        input_format: 'Enter an integer.', output_format: 'Enter a number: 5\n3rd Bit is ON', reference_output: 'Enter a number: 3rd Bit is ON',
        hints: JSON.stringify(['Use bitwise AND (&) with a bit mask.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p17-t3', title: 'Bit Fields',
        description: 'Write a C program to store a student\'s age and section using bit fields.',
        solution_code: '#include <stdio.h>\n\nstruct Student {\n    unsigned int age : 7;\n    unsigned int section : 3;\n};\n\nint main() {\n    struct Student s;\n\n    s.age = 20;\n    s.section = 2;\n\n    printf("Age = %u\\n", s.age);\n    printf("Section = %u\\n", s.section);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Age = 20\nSection = 2', reference_output: 'Age = 20\nSection = 2',
        hints: JSON.stringify(['Bit fields allow efficient memory usage inside structures.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p17-t4', title: 'Enumerations Advanced',
        description: 'Write a C program to create an enumeration for traffic signals and display the action based on user input.',
        solution_code: '#include <stdio.h>\n\nenum Signal { RED = 1, YELLOW, GREEN };\n\nint main() {\n    int choice;\n\n    printf("1.RED 2.YELLOW 3.GREEN\\n");\n    printf("Enter Signal: ");\n    scanf("%d", &choice);\n\n    switch(choice) {\n        case RED:\n            printf("STOP\\n");\n            break;\n        case YELLOW:\n            printf("WAIT\\n");\n            break;\n        case GREEN:\n            printf("GO\\n");\n            break;\n        default:\n            printf("Invalid Signal\\n");\n    }\n\n    return 0;\n}',
        input_format: 'Enter signal choice as integer (1-3).', output_format: '1.RED 2.YELLOW 3.GREEN\nEnter Signal: 3\nGO', reference_output: '1.RED 2.YELLOW 3.GREEN\nEnter Signal: GO',
        hints: JSON.stringify(['Use enum values inside a switch statement.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p17-t5', title: 'Type Qualifiers',
        description: 'Write a C program to demonstrate the use of the const qualifier by storing the value of PI.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf("PI = %.5f\\n", PI);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'PI = 3.14159', reference_output: 'PI = 3.14159',
        hints: JSON.stringify(['A const variable cannot be modified after initialization.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p17-t6', title: 'Variable Scope and Lifetime',
        description: 'Write a C program to demonstrate the difference between a local variable and a static variable.',
        solution_code: '#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n\n    count++;\n\n    printf("Count = %d\\n", count);\n}\n\nint main() {\n\n    counter();\n    counter();\n    counter();\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Count = 1\nCount = 2\nCount = 3', reference_output: 'Count = 1\nCount = 2\nCount = 3',
        hints: JSON.stringify(['A static variable retains its value between function calls.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p17-t7', title: 'Multi-File Programs',
        description: 'Write a C program split across multiple files to calculate the square of a number. (Note: Since we use an online editor, simulate it within a single main function as a logical split).',
        solution_code: '#include <stdio.h>\n\nint square(int);\n\nint main() {\n    int num;\n\n    printf("Enter Number: ");\n    scanf("%d", &num);\n\n    printf("Square = %d\\n", square(num));\n\n    return 0;\n}\n\nint square(int n) {\n    return n * n;\n}',
        input_format: 'Enter an integer.', output_format: 'Enter Number: 5\nSquare = 25', reference_output: 'Enter Number: Square = 25',
        hints: JSON.stringify(['Define the function in one file and call it from another.']), difficulty: 'Hard'
    }
];

async function updateP17Topics() {
    console.log('Updating Phase 17 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content,
        ...t6Content, ...t7Content
    ];
    const topicIds = [
        'c-p17-t1', 'c-p17-t2', 'c-p17-t3', 'c-p17-t4', 'c-p17-t5',
        'c-p17-t6', 'c-p17-t7'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 17 Topics 1-7!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p17-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP17Topics();
