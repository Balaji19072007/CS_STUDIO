const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Introduction to Structures ───────────────────────────────────
const t1Content = [
    { topic_id: 'c-p13-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Structure?</h3><p class="text-gray-700 dark:text-gray-300">A Structure is a <strong>user-defined data type</strong> that groups variables of different data types under one name.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t1', content_type: 'syntax', content_text: 'struct StructureName\n{\n    dataType member1;\n    dataType member2;\n    dataType member3;\n};', order_index: 2 },
    { topic_id: 'c-p13-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t1', content_type: 'syntax', content_text: 'struct Student\n{\n    int rollNo;\n    char name[30];\n    float marks;\n};', order_index: 4 },
    { topic_id: 'c-p13-t1', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Here:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li><code class="font-bold text-blue-600 dark:text-blue-400">rollNo</code> → integer</li><li><code class="font-bold text-green-600 dark:text-green-400">name</code> → character array</li><li><code class="font-bold text-purple-600 dark:text-purple-400">marks</code> → floating point number</li></ul><p class="mt-3 text-gray-700 dark:text-gray-300">All belong to <strong>one student</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Structures?</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without structure:</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">int rollNo;\nchar name[30];\nfloat marks;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">For 100 students:<br><code class="font-mono">int rollNo1, rollNo2, rollNo3...</code><br>This becomes difficult to manage.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Using structure:</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">struct Student s1, s2, s3;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Much easier and organized.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a student ID card. It contains:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Name</li><li>Roll Number</li><li>Department</li><li>Age</li></ul><p class="mt-3 text-gray-700 dark:text-gray-300">All belong to one student. A structure works similarly.</p>', order_index: 5 },
];

// ─── Topic 2: Structure Declaration and Definition ─────────────────────────
const t2Content = [
    { topic_id: 'c-p13-t2', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Structure creation involves two steps.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Step 1: Define Structure</h3>', order_index: 1 },
    { topic_id: 'c-p13-t2', content_type: 'syntax', content_text: 'struct Student\n{\n    int rollNo;\n    char name[30];\n    float marks;\n};', order_index: 2 },
    { topic_id: 'c-p13-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">This only creates a blueprint. Memory is <strong>not allocated</strong> yet.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Step 2: Declare Structure Variable</h3>', order_index: 3 },
    { topic_id: 'c-p13-t2', content_type: 'syntax', content_text: 'struct Student s1;', order_index: 4 },
    { topic_id: 'c-p13-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Now memory <strong>is allocated</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Program</h3>', order_index: 5 },
    { topic_id: 'c-p13-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n    char name[30];\n    float marks;\n};\n\nint main()\n{\n    struct Student s1;\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p13-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Multiple Variables</h3>', order_index: 7 },
    { topic_id: 'c-p13-t2', content_type: 'syntax', content_text: 'struct Student s1, s2, s3;', order_index: 8 },
    { topic_id: 'c-p13-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Definition and Declaration Together</h3>', order_index: 9 },
    { topic_id: 'c-p13-t2', content_type: 'syntax', content_text: 'struct Student\n{\n    int rollNo;\n    char name[30];\n    float marks;\n} s1, s2;', order_index: 10 },
];

// ─── Topic 3: Accessing Structure Members ──────────────────────────────────
const t3Content = [
    { topic_id: 'c-p13-t3', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Members are accessed using the <strong>dot operator (.)</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t3', content_type: 'syntax', content_text: 'structureVariable.memberName', order_index: 2 },
    { topic_id: 'c-p13-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t3', content_type: 'syntax', content_text: 's1.rollNo = 101;\ns1.marks = 95.5;', order_index: 4 },
    { topic_id: 'c-p13-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p13-t3', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n    float marks;\n};\n\nint main()\n{\n    struct Student s1;\n\n    s1.rollNo = 101;\n    s1.marks = 95.5;\n\n    printf("Roll No = %d\\n", s1.rollNo);\n    printf("Marks = %.2f\\n", s1.marks);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p13-t3', content_type: 'syntax', content_text: '```output\nRoll No = 101\nMarks = 95.50\n```', order_index: 7 },
    { topic_id: 'c-p13-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Taking Input</h3>', order_index: 8 },
    { topic_id: 'c-p13-t3', content_type: 'syntax', content_text: 'scanf("%d", &s1.rollNo);\nscanf("%f", &s1.marks);', order_index: 9 },
];

// ─── Topic 4: Structure Initialization ─────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p13-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Values can be assigned when declaring a structure variable.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t4', content_type: 'syntax', content_text: 'struct Student s1 = {101, "John", 90.5};', order_index: 2 },
    { topic_id: 'c-p13-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n    char name[20];\n    float marks;\n};\n\nint main()\n{\n    struct Student s1 = {101, "John", 90.5};\n\n    printf("%d\\n", s1.rollNo);\n    printf("%s\\n", s1.name);\n    printf("%.2f\\n", s1.marks);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p13-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Faster initialization</li><li>Cleaner code</li><li>Useful for predefined records</li></ul>', order_index: 5 },
];

// ─── Topic 5: Nested Structures ────────────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p13-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">A structure inside another structure is called a <strong>Nested Structure</strong>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p13-t5', content_type: 'syntax', content_text: 'struct Address\n{\n    char city[20];\n    int pincode;\n};\n\nstruct Student\n{\n    int rollNo;\n    struct Address addr;\n};', order_index: 2 },
    { topic_id: 'c-p13-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Accessing Nested Members</h3>', order_index: 3 },
    { topic_id: 'c-p13-t5', content_type: 'syntax', content_text: 's1.addr.pincode', order_index: 4 },
    { topic_id: 'c-p13-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p13-t5', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Address\n{\n    char city[20];\n    int pincode;\n};\n\nstruct Student\n{\n    int rollNo;\n    struct Address addr;\n};\n\nint main()\n{\n    struct Student s1;\n\n    s1.rollNo = 101;\n    s1.addr.pincode = 500001;\n\n    printf("%d\\n", s1.addr.pincode);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p13-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Employee and Address</li><li>Student and Course</li><li>Customer and Location</li></ul>', order_index: 7 },
];

// ─── Topic 6: Array of Structures ──────────────────────────────────────────
const t6Content = [
    { topic_id: 'c-p13-t6', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">An <strong>array of structures</strong> stores multiple records.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t6', content_type: 'syntax', content_text: 'struct Student s[100];', order_index: 2 },
    { topic_id: 'c-p13-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t6', content_type: 'syntax', content_text: 'struct Student\n{\n    int rollNo;\n    float marks;\n};\n\nstruct Student s[3];', order_index: 4 },
    { topic_id: 'c-p13-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p13-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n    float marks;\n};\n\nint main()\n{\n    struct Student s[3];\n\n    for(int i=0;i<3;i++)\n    {\n        scanf("%d %f", &s[i].rollNo, &s[i].marks);\n    }\n\n    for(int i=0;i<3;i++)\n    {\n        printf("%d %.2f\\n", s[i].rollNo, s[i].marks);\n    }\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p13-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Student Records</li><li>Employee Records</li><li>Product Records</li></ul>', order_index: 7 },
];

// ─── Topic 7: Pointers to Structures ───────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Pointers can store the address of a structure variable.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t7', content_type: 'syntax', content_text: 'struct Student *ptr;', order_index: 2 },
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t7', content_type: 'syntax', content_text: 'ptr = &s1;', order_index: 4 },
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Access Using Dot Operator</h3>', order_index: 5 },
    { topic_id: 'c-p13-t7', content_type: 'syntax', content_text: '(*ptr).rollNo', order_index: 6 },
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Access Using Arrow Operator</h3><p class="text-gray-700 dark:text-gray-300 mb-2">Arrow operator is preferred.</p>', order_index: 7 },
    { topic_id: 'c-p13-t7', content_type: 'syntax', content_text: 'ptr->rollNo', order_index: 8 },
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 9 },
    { topic_id: 'c-p13-t7', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n};\n\nint main()\n{\n    struct Student s1;\n    struct Student *ptr;\n\n    ptr = &s1;\n\n    ptr->rollNo = 101;\n\n    printf("%d", ptr->rollNo);\n\n    return 0;\n}', order_index: 10 },
    { topic_id: 'c-p13-t7', content_type: 'syntax', content_text: '```output\n101\n```', order_index: 11 },
    { topic_id: 'c-p13-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use Pointers?</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Efficient memory usage</li><li>Faster function calls</li><li>Dynamic memory allocation</li></ul>', order_index: 12 },
];

// ─── Topic 8: Structures and Functions ─────────────────────────────────────
const t8Content = [
    { topic_id: 'c-p13-t8', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mb-4">Structures can be passed to functions.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Pass Entire Structure</h3>', order_index: 1 },
    { topic_id: 'c-p13-t8', content_type: 'syntax', content_text: 'void display(struct Student s)\n{\n    printf("%d", s.rollNo);\n}', order_index: 2 },
    { topic_id: 'c-p13-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t8', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int rollNo;\n};\n\nvoid display(struct Student s)\n{\n    printf("%d", s.rollNo);\n}\n\nint main()\n{\n    struct Student s1;\n\n    s1.rollNo = 101;\n\n    display(s1);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p13-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Pass Structure Address</h3>', order_index: 5 },
    { topic_id: 'c-p13-t8', content_type: 'syntax', content_text: 'void display(struct Student *s)\n{\n    printf("%d", s->rollNo);\n}', order_index: 6 },
    { topic_id: 'c-p13-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Saves memory</li><li>Faster execution</li><li>Suitable for large structures</li></ul>', order_index: 7 },
];

// ─── Topic 9: Unions ───────────────────────────────────────────────────────
const t9Content = [
    { topic_id: 'c-p13-t9', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Union?</h3><p class="text-gray-700 dark:text-gray-300">A Union is similar to a Structure.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Difference:</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Structure:</h4><p class="text-sm text-gray-600 dark:text-gray-400">Each member gets separate memory.</p></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Union:</h4><p class="text-sm text-gray-600 dark:text-gray-400">All members share the same memory.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p13-t9', content_type: 'syntax', content_text: 'union Data\n{\n    int i;\n    float f;\n    char c;\n};', order_index: 2 },
    { topic_id: 'c-p13-t9', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p13-t9', content_type: 'example', content_text: '#include <stdio.h>\n\nunion Data\n{\n    int i;\n    float f;\n};\n\nint main()\n{\n    union Data d;\n\n    d.i = 10;\n    printf("%d\\n", d.i);\n\n    d.f = 20.5;\n    printf("%.2f\\n", d.f);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p13-t9', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Structure vs Union</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Structure</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Union</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-semibold">Separate memory</td><td class="px-6 py-4 font-semibold">Shared memory</td></tr><tr><td class="px-6 py-4 font-semibold">Larger size</td><td class="px-6 py-4 font-semibold">Smaller size</td></tr><tr><td class="px-6 py-4 font-semibold">All values available</td><td class="px-6 py-4 font-semibold">Only latest value valid</td></tr></tbody></table></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Embedded Systems</li><li>Memory Optimization</li><li>Device Drivers</li></ul>', order_index: 5 },
];

// ─── Topic 10: typedef Keyword ─────────────────────────────────────────────
const t10Content = [
    { topic_id: 'c-p13-t10', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is typedef?</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">typedef</code> creates an <strong>alias</strong> (new name) for a data type.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Without typedef</h4>', order_index: 1 },
    { topic_id: 'c-p13-t10', content_type: 'syntax', content_text: 'struct Student s1;', order_index: 2 },
    { topic_id: 'c-p13-t10', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">With typedef</h4>', order_index: 3 },
    { topic_id: 'c-p13-t10', content_type: 'syntax', content_text: 'typedef struct\n{\n    int rollNo;\n    float marks;\n} Student;\n\n// Now:\nStudent s1;', order_index: 4 },
    { topic_id: 'c-p13-t10', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 5 },
    { topic_id: 'c-p13-t10', content_type: 'example', content_text: '#include <stdio.h>\n\ntypedef struct\n{\n    int rollNo;\n    float marks;\n} Student;\n\nint main()\n{\n    Student s1;\n\n    s1.rollNo = 101;\n    s1.marks = 95.5;\n\n    printf("%d\\n", s1.rollNo);\n    printf("%.2f\\n", s1.marks);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p13-t10', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Benefits</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Shorter code</li><li>Better readability</li><li>Easier maintenance</li></ul>', order_index: 7 },
];

// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p13-t1', title: 'Introduction to Structures',
        description: 'Write a C program to store and display a student\'s name, roll number, and marks using a structure.',
        solution_code: '#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n    float marks;\n};\n\nint main() {\n    struct Student s;\n\n    printf("Enter Name: ");\n    scanf("%s", s.name);\n\n    printf("Enter Roll Number: ");\n    scanf("%d", &s.rollNo);\n\n    printf("Enter Marks: ");\n    scanf("%f", &s.marks);\n\n    printf("\\nStudent Details\\n");\n    printf("Name: %s\\n", s.name);\n    printf("Roll No: %d\\n", s.rollNo);\n    printf("Marks: %.2f\\n", s.marks);\n\n    return 0;\n}',
        input_format: 'Enter Name, Roll Number, and Marks.', output_format: 'Enter Name: Balu\nEnter Roll Number: 101\nEnter Marks: 89.5\n\nStudent Details\nName: Balu\nRoll No: 101\nMarks: 89.50', reference_output: 'Enter Name: Enter Roll Number: Enter Marks: \nStudent Details\nName: Balu\nRoll No: 101\nMarks: 89.50',
        hints: JSON.stringify(['Use a structure to group related data of a student.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p13-t2', title: 'Structure Declaration and Definition',
        description: 'Write a C program to declare a structure for an employee and display the entered employee details.',
        solution_code: '#include <stdio.h>\n\nstruct Employee {\n    int id;\n    char name[20];\n};\n\nint main() {\n    struct Employee emp;\n\n    printf("Enter Employee ID: ");\n    scanf("%d", &emp.id);\n\n    printf("Enter Employee Name: ");\n    scanf("%s", emp.name);\n\n    printf("ID: %d\\n", emp.id);\n    printf("Name: %s\\n", emp.name);\n\n    return 0;\n}',
        input_format: 'Enter Employee ID and Name.', output_format: 'Enter Employee ID: 1001\nEnter Employee Name: Ravi\nID: 1001\nName: Ravi', reference_output: 'Enter Employee ID: Enter Employee Name: ID: 1001\nName: Ravi',
        hints: JSON.stringify(['Declare the structure globally and create a structure variable inside main().']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p13-t3', title: 'Accessing Structure Members',
        description: 'Write a C program to calculate the total price of a product using structure members.',
        solution_code: '#include <stdio.h>\n\nstruct Product {\n    char name[20];\n    int quantity;\n    float price;\n};\n\nint main() {\n    struct Product p;\n\n    printf("Enter Product Name: ");\n    scanf("%s", p.name);\n\n    printf("Enter Quantity: ");\n    scanf("%d", &p.quantity);\n\n    printf("Enter Price: ");\n    scanf("%f", &p.price);\n\n    printf("Total Cost = %.2f\\n", p.quantity * p.price);\n\n    return 0;\n}',
        input_format: 'Enter Product Name, Quantity, and Price.', output_format: 'Enter Product Name: Pen\nEnter Quantity: 10\nEnter Price: 5\nTotal Cost = 50.00', reference_output: 'Enter Product Name: Enter Quantity: Enter Price: Total Cost = 50.00',
        hints: JSON.stringify(['Access structure members using the dot (.) operator.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p13-t4', title: 'Structure Initialization',
        description: 'Write a C program to initialize a structure with book details and display them.',
        solution_code: '#include <stdio.h>\n\nstruct Book {\n    char title[30];\n    float price;\n};\n\nint main() {\n    struct Book b = {"C Programming", 450.50};\n\n    printf("Title: %s\\n", b.title);\n    printf("Price: %.2f\\n", b.price);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Title: C Programming\nPrice: 450.50', reference_output: 'Title: C Programming\nPrice: 450.50',
        hints: JSON.stringify(['Assign values during structure declaration.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p13-t5', title: 'Nested Structures',
        description: 'Write a C program to store student information along with address details using nested structures.',
        solution_code: '#include <stdio.h>\n\nstruct Address {\n    char city[20];\n};\n\nstruct Student {\n    char name[20];\n    struct Address addr;\n};\n\nint main() {\n    struct Student s;\n\n    printf("Enter Name: ");\n    scanf("%s", s.name);\n\n    printf("Enter City: ");\n    scanf("%s", s.addr.city);\n\n    printf("Name: %s\\n", s.name);\n    printf("City: %s\\n", s.addr.city);\n\n    return 0;\n}',
        input_format: 'Enter Name and City.', output_format: 'Enter Name: Balu\nEnter City: Kakinada\nName: Balu\nCity: Kakinada', reference_output: 'Enter Name: Enter City: Name: Balu\nCity: Kakinada',
        hints: JSON.stringify(['Create one structure inside another structure.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p13-t6', title: 'Array of Structures',
        description: 'Write a C program to store details of 3 students and find the student with the highest marks.',
        solution_code: '#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nint main() {\n    struct Student s[3];\n    int i, max = 0;\n\n    for(i = 0; i < 3; i++) {\n        printf("Enter Name and Marks: ");\n        scanf("%s %f", s[i].name, &s[i].marks);\n    }\n\n    for(i = 1; i < 3; i++) {\n        if(s[i].marks > s[max].marks)\n            max = i;\n    }\n\n    printf("\\nTop Student: %s\\n", s[max].name);\n\n    return 0;\n}',
        input_format: 'Enter 3 names and marks.', output_format: 'Enter Name and Marks: Ravi 80\nEnter Name and Marks: Balu 95\nEnter Name and Marks: Sita 88\n\nTop Student: Balu', reference_output: 'Enter Name and Marks: Enter Name and Marks: Enter Name and Marks: \nTop Student: Balu',
        hints: JSON.stringify(['Use an array of structures and compare marks.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p13-t7', title: 'Pointers to Structures',
        description: 'Write a C program to access structure members using a structure pointer.',
        solution_code: '#include <stdio.h>\n\nstruct Student {\n    char name[20];\n};\n\nint main() {\n    struct Student s;\n    struct Student *ptr = &s;\n\n    printf("Enter Name: ");\n    scanf("%s", ptr->name);\n\n    printf("Name: %s\\n", ptr->name);\n\n    return 0;\n}',
        input_format: 'Enter Name.', output_format: 'Enter Name: Balu\nName: Balu', reference_output: 'Enter Name: Name: Balu',
        hints: JSON.stringify(['Use the arrow (->) operator.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p13-t8', title: 'Structures and Functions',
        description: 'Write a C program to pass a structure to a function and calculate the percentage of a student.',
        solution_code: '#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nvoid display(struct Student s) {\n    printf("Percentage = %.2f%%\\n", s.marks);\n}\n\nint main() {\n    struct Student s;\n\n    printf("Enter Name: ");\n    scanf("%s", s.name);\n\n    printf("Enter Percentage: ");\n    scanf("%f", &s.marks);\n\n    display(s);\n\n    return 0;\n}',
        input_format: 'Enter Name and Percentage.', output_format: 'Enter Name: Balu\nEnter Percentage: 92.5\nPercentage = 92.50%', reference_output: 'Enter Name: Enter Percentage: Percentage = 92.50%',
        hints: JSON.stringify(['Pass the structure variable as a function argument.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p13-t9', title: 'Unions',
        description: 'Write a C program to demonstrate how a union shares memory between members.',
        solution_code: '#include <stdio.h>\n\nunion Data {\n    int num;\n    float value;\n};\n\nint main() {\n    union Data d;\n\n    d.num = 100;\n    printf("Number = %d\\n", d.num);\n\n    d.value = 25.5;\n    printf("Value = %.2f\\n", d.value);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Number = 100\nValue = 25.50', reference_output: 'Number = 100\nValue = 25.50',
        hints: JSON.stringify(['Assign values to different union members one after another and observe the output.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p13-t10', title: 'typedef Keyword',
        description: 'Write a C program to create a new data type for a structure using typedef and display employee details.',
        solution_code: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[20];\n} Employee;\n\nint main() {\n    Employee emp;\n\n    printf("Enter ID: ");\n    scanf("%d", &emp.id);\n\n    printf("Enter Name: ");\n    scanf("%s", emp.name);\n\n    printf("ID: %d\\n", emp.id);\n    printf("Name: %s\\n", emp.name);\n\n    return 0;\n}',
        input_format: 'Enter ID and Name.', output_format: 'Enter ID: 101\nEnter Name: Balu\nID: 101\nName: Balu', reference_output: 'Enter ID: Enter Name: ID: 101\nName: Balu',
        hints: JSON.stringify(['Use typedef to avoid writing struct repeatedly.']), difficulty: 'Medium'
    }
];

async function updateP13Topics() {
    console.log('Updating Phase 13 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content,
        ...t6Content, ...t7Content, ...t8Content, ...t9Content, ...t10Content
    ];
    const topicIds = [
        'c-p13-t1', 'c-p13-t2', 'c-p13-t3', 'c-p13-t4', 'c-p13-t5',
        'c-p13-t6', 'c-p13-t7', 'c-p13-t8', 'c-p13-t9', 'c-p13-t10'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 13 Topics 1-10!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p13-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP13Topics();
