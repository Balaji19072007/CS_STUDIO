const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Topic 1: Introduction to File Handling ─────────────────────────────────
const t1Content = [
    { topic_id: 'c-p15-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a File?</h3><p class="text-gray-700 dark:text-gray-300">A file is a named location on a storage device used to store information permanently.</p><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800 mt-4"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Examples:</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li><code class="font-mono">student.txt</code></li><li><code class="font-mono">marks.txt</code></li><li><code class="font-mono">employee.dat</code></li><li><code class="font-mono">report.txt</code></li></ul></div><p class="text-gray-700 dark:text-gray-300 mt-4">Unlike variables, files retain data even after the program ends.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why File Handling?</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without File Handling</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">int marks = 90;</pre><p class="text-sm font-semibold text-red-600 dark:text-red-400 mt-2">After program termination: Data Lost</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With File Handling</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2">marks.txt</pre><p class="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">Data remains available permanently.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages of File Handling</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li><strong>Permanent Storage:</strong> Data remains available after execution.</li><li><strong>Large Data Storage:</strong> Files can store huge amounts of data.</li><li><strong>Data Sharing:</strong> Multiple programs can access the same file.</li><li><strong>Backup and Recovery:</strong> Files can be copied and restored.</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Types of Files</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Text Files</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Store data as characters.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">Name: John\nMarks: 95</pre><p class="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2">Extension: .txt</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Binary Files</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Store data in machine-readable format.</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">student.dat</pre><p class="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">Advantages: Faster, Compact storage, Efficient processing</p></div></div>', order_index: 1 },
];

// ─── Topic 2: Opening and Closing Files ─────────────────────────────────────
const t2Content = [
    { topic_id: 'c-p15-t2', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">Before reading or writing a file, it must be opened. After finishing, it should be closed.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">File Pointer</h3><p class="text-gray-700 dark:text-gray-300">A file is accessed using a file pointer. <code class="font-mono font-bold text-blue-600 dark:text-blue-400">FILE</code> is a predefined structure in <code class="font-mono">stdio.h</code>.</p>', order_index: 1 },
    { topic_id: 'c-p15-t2', content_type: 'syntax', content_text: 'FILE *fp;', order_index: 2 },
    { topic_id: 'c-p15-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Opening a File</h3>', order_index: 3 },
    { topic_id: 'c-p15-t2', content_type: 'syntax', content_text: 'fp = fopen("filename", "mode");', order_index: 4 },
    { topic_id: 'c-p15-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Example:</p>', order_index: 5 },
    { topic_id: 'c-p15-t2', content_type: 'syntax', content_text: 'FILE *fp;\nfp = fopen("student.txt", "r");', order_index: 6 },
    { topic_id: 'c-p15-t2', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">How fopen() Works</h4><p class="text-gray-700 dark:text-gray-300 mb-2">Meaning of <code class="font-mono">fopen("student.txt", "r")</code>:</p><ol class="list-decimal pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Locate file</li><li>Open file</li><li>Return address of file</li><li>Store address in file pointer</li></ol><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Closing a File</h3>', order_index: 7 },
    { topic_id: 'c-p15-t2', content_type: 'syntax', content_text: 'fclose(fp);', order_index: 8 },
    { topic_id: 'c-p15-t2', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Why Close Files?</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Saves data properly</li><li>Frees resources</li><li>Prevents corruption</li><li>Improves performance</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 9 },
    { topic_id: 'c-p15-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n\n    fp = fopen("sample.txt", "r");\n\n    if(fp == NULL)\n    {\n        printf("File not found");\n        return 1;\n    }\n\n    printf("File opened successfully");\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 10 },
];

// ─── Topic 3: File Modes ────────────────────────────────────────────────────
const t3Content = [
    { topic_id: 'c-p15-t3', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">File mode specifies how a file is opened.</p><div class="space-y-4 mt-6"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Read Mode (r)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "r");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2"><strong>Purpose:</strong> Read existing file.<br><strong>Requirements:</strong> File must exist. If file does not exist, <code class="font-mono">NULL</code> is returned.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Write Mode (w)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "w");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2"><strong>Purpose:</strong> Create new file, Write data.<br>If file exists, old content is erased.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Append Mode (a)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "a");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2"><strong>Purpose:</strong> Add data at end of file. Existing data remains safe.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-orange-700 dark:text-orange-400 mb-2">Read and Write Mode (r+)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "r+");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Read and write operations allowed. File must already exist.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-2">Write and Read Mode (w+)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "w+");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Read and write allowed. Existing content is erased.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-pink-700 dark:text-pink-400 mb-2">Append and Read Mode (a+)</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 bg-white dark:bg-gray-900 p-2 rounded">fopen("file.txt", "a+");</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Read and append allowed.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Binary Modes</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Text Mode</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Binary Mode</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4 font-mono font-bold">r</td><td class="px-6 py-4 font-mono font-bold">rb</td></tr><tr><td class="px-6 py-4 font-mono font-bold">w</td><td class="px-6 py-4 font-mono font-bold">wb</td></tr><tr><td class="px-6 py-4 font-mono font-bold">a</td><td class="px-6 py-4 font-mono font-bold">ab</td></tr><tr><td class="px-6 py-4 font-mono font-bold">r+</td><td class="px-6 py-4 font-mono font-bold">rb+</td></tr><tr><td class="px-6 py-4 font-mono font-bold">w+</td><td class="px-6 py-4 font-mono font-bold">wb+</td></tr><tr><td class="px-6 py-4 font-mono font-bold">a+</td><td class="px-6 py-4 font-mono font-bold">ab+</td></tr></tbody></table></div>', order_index: 1 },
];

// ─── Topic 4: Reading from Files ────────────────────────────────────────────
const t4Content = [
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">Reading retrieves data from a file.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reading Character by Character</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-blue-600 dark:text-blue-400">fgetc()</code></p>', order_index: 1 },
    { topic_id: 'c-p15-t4', content_type: 'syntax', content_text: 'char ch;\nch = fgetc(fp);', order_index: 2 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p15-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n    char ch;\n\n    fp = fopen("sample.txt", "r");\n\n    while((ch = fgetc(fp)) != EOF)\n    {\n        printf("%c", ch);\n    }\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reading String</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-green-600 dark:text-green-400">fgets()</code></p>', order_index: 5 },
    { topic_id: 'c-p15-t4', content_type: 'syntax', content_text: 'fgets(str, size, fp);', order_index: 6 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 7 },
    { topic_id: 'c-p15-t4', content_type: 'syntax', content_text: 'char str[100];\nfgets(str, 100, fp);', order_index: 8 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reading Formatted Data</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-purple-600 dark:text-purple-400">fscanf()</code></p>', order_index: 9 },
    { topic_id: 'c-p15-t4', content_type: 'syntax', content_text: 'fscanf(fp, "format", variables);', order_index: 10 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 11 },
    { topic_id: 'c-p15-t4', content_type: 'syntax', content_text: 'int roll;\nfloat marks;\n\nfscanf(fp, "%d %f", &roll, &marks);', order_index: 12 },
    { topic_id: 'c-p15-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 13 },
    { topic_id: 'c-p15-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n    char name[50];\n\n    fp = fopen("student.txt", "r");\n\n    fgets(name, 50, fp);\n\n    printf("%s", name);\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 14 },
];

// ─── Topic 5: Writing to Files ──────────────────────────────────────────────
const t5Content = [
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">Writing stores data inside a file.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Writing Character</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-blue-600 dark:text-blue-400">fputc()</code></p>', order_index: 1 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fputc(character, fp);', order_index: 2 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fputc(\'A\', fp);', order_index: 4 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Writing String</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-green-600 dark:text-green-400">fputs()</code></p>', order_index: 5 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fputs(string, fp);', order_index: 6 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 7 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fputs("Hello", fp);', order_index: 8 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Writing Formatted Data</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-purple-600 dark:text-purple-400">fprintf()</code></p>', order_index: 9 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fprintf(fp, "format", values);', order_index: 10 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 11 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'fprintf(fp, "%d %.2f", roll, marks);', order_index: 12 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Program</h3>', order_index: 13 },
    { topic_id: 'c-p15-t5', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n\n    fp = fopen("data.txt", "w");\n\n    fprintf(fp, "Welcome to C Programming");\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 14 },
    { topic_id: 'c-p15-t5', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">File Content:</p>', order_index: 15 },
    { topic_id: 'c-p15-t5', content_type: 'syntax', content_text: 'Welcome to C Programming', order_index: 16 },
];

// ─── Topic 6: Binary File Operations ────────────────────────────────────────
const t6Content = [
    { topic_id: 'c-p15-t6', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">Binary files store data exactly as it exists in memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Binary Files?</h3><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Advantages:</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400"><li>Faster access</li><li>Less storage</li><li>Suitable for structures</li></ul></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Writing Binary Data</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-blue-600 dark:text-blue-400">fwrite()</code></p>', order_index: 1 },
    { topic_id: 'c-p15-t6', content_type: 'syntax', content_text: 'fwrite(&variable,\n       sizeof(variable),\n       1,\n       fp);', order_index: 2 },
    { topic_id: 'c-p15-t6', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p15-t6', content_type: 'syntax', content_text: 'fwrite(&student,\n       sizeof(student),\n       1,\n       fp);', order_index: 4 },
    { topic_id: 'c-p15-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reading Binary Data</h3><p class="text-gray-700 dark:text-gray-300"><code class="font-mono font-bold text-green-600 dark:text-green-400">fread()</code></p>', order_index: 5 },
    { topic_id: 'c-p15-t6', content_type: 'syntax', content_text: 'fread(&variable,\n      sizeof(variable),\n      1,\n      fp);', order_index: 6 },
    { topic_id: 'c-p15-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 7 },
    { topic_id: 'c-p15-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nstruct Student\n{\n    int roll;\n    float marks;\n};\n\nint main()\n{\n    FILE *fp;\n\n    struct Student s1 = {101,95.5};\n\n    fp = fopen("student.dat","wb");\n\n    fwrite(&s1,sizeof(s1),1,fp);\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p15-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Database Files</li><li>Games</li><li>Banking Systems</li><li>Operating Systems</li></ul>', order_index: 9 },
];

// ─── Topic 7: File Positioning ──────────────────────────────────────────────
const t7Content = [
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">Every file has a pointer indicating the current location. File positioning functions allow movement inside a file.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">ftell()</h3><p class="text-gray-700 dark:text-gray-300">Returns current position.</p>', order_index: 1 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: 'long pos;\npos = ftell(fp);', order_index: 2 },
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 3 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: 'printf("%ld", ftell(fp));', order_index: 4 },
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">rewind()</h3><p class="text-gray-700 dark:text-gray-300">Moves pointer to beginning.</p>', order_index: 5 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: 'rewind(fp);', order_index: 6 },
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">fseek()</h3><p class="text-gray-700 dark:text-gray-300">Moves pointer to a specified location.</p>', order_index: 7 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: 'fseek(fp, offset, origin);', order_index: 8 },
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Origin values:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li><code class="font-mono font-bold text-blue-600 dark:text-blue-400">SEEK_SET</code></li><li><code class="font-mono font-bold text-blue-600 dark:text-blue-400">SEEK_CUR</code></li><li><code class="font-mono font-bold text-blue-600 dark:text-blue-400">SEEK_END</code></li></ul><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example</h4>', order_index: 9 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: 'fseek(fp, 5, SEEK_SET);', order_index: 10 },
    { topic_id: 'c-p15-t7', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Move to position 5 from beginning.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program</h3>', order_index: 11 },
    { topic_id: 'c-p15-t7', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n\n    fp = fopen("sample.txt","r");\n\n    fseek(fp,5,SEEK_SET);\n\n    printf("%ld",ftell(fp));\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 12 },
    { topic_id: 'c-p15-t7', content_type: 'syntax', content_text: '```output\n5\n```', order_index: 13 },
];

// ─── Topic 8: Error Handling in Files ───────────────────────────────────────
const t8Content = [
    { topic_id: 'c-p15-t8', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300">File operations may fail. Examples:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>File not found</li><li>Permission denied</li><li>Disk full</li><li>Invalid path</li></ul><p class="text-gray-700 dark:text-gray-300 mt-4">Therefore, file errors must be handled properly.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Checking fopen()</h3>', order_index: 1 },
    { topic_id: 'c-p15-t8', content_type: 'syntax', content_text: 'FILE *fp;\n\nfp = fopen("data.txt","r");\n\nif(fp == NULL)\n{\n    printf("Error Opening File");\n}', order_index: 2 },
    { topic_id: 'c-p15-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Using perror()</h3>', order_index: 3 },
    { topic_id: 'c-p15-t8', content_type: 'syntax', content_text: 'perror("Message");', order_index: 4 },
    { topic_id: 'c-p15-t8', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Example:</p>', order_index: 5 },
    { topic_id: 'c-p15-t8', content_type: 'syntax', content_text: 'if(fp == NULL)\n{\n    perror("File Error");\n}', order_index: 6 },
    { topic_id: 'c-p15-t8', content_type: 'explanation', content_text: '<p class="text-gray-700 dark:text-gray-300 mt-4">Output: <code class="font-mono text-red-600 dark:text-red-400">File Error: No such file or directory</code></p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 7 },
    { topic_id: 'c-p15-t8', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    FILE *fp;\n\n    fp = fopen("abc.txt","r");\n\n    if(fp == NULL)\n    {\n        perror("Error");\n        return 1;\n    }\n\n    fclose(fp);\n\n    return 0;\n}', order_index: 8 },
];

// ─── Mastery Challenges ─────────────────────────────────────────────────────
const challenges = [
    {
        topic_id: 'c-p15-t1', title: 'Introduction to File Handling',
        description: 'Write a C program to create a file and display a message indicating that the file was created successfully.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen("sample.txt", "w");\n\n    if(fp != NULL) {\n        printf("File Created Successfully\\n");\n        fclose(fp);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'File Created Successfully', reference_output: 'File Created Successfully',
        hints: JSON.stringify(['Use fopen() to create a file and fclose() to close it.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p15-t2', title: 'Opening and Closing Files',
        description: 'Write a C program to open an existing file and close it properly.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen("sample.txt", "r");\n\n    if(fp != NULL) {\n        printf("File Opened Successfully\\n");\n        fclose(fp);\n        printf("File Closed Successfully\\n");\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'File Opened Successfully\nFile Closed Successfully', reference_output: 'File Opened Successfully\nFile Closed Successfully',
        hints: JSON.stringify(['Always close files using fclose() after use.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p15-t3', title: 'File Modes',
        description: 'Write a C program to demonstrate writing to a file using write mode (w).',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen("data.txt", "w");\n\n    fprintf(fp, "Welcome to File Handling");\n\n    fclose(fp);\n\n    printf("Data Written Successfully\\n");\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Data Written Successfully', reference_output: 'Data Written Successfully',
        hints: JSON.stringify(['Use "w" mode to create a new file or overwrite an existing file.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p15-t4', title: 'Reading from Files',
        description: 'Write a C program to read and display the contents of a file.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen("data.txt", "r");\n\n    while((ch = fgetc(fp)) != EOF) {\n        printf("%c", ch);\n    }\n\n    fclose(fp);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Welcome to File Handling', reference_output: 'Welcome to File Handling',
        hints: JSON.stringify(['Use fgetc() to read one character at a time.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p15-t5', title: 'Writing to Files',
        description: "Write a C program to accept a student's name and marks from the user and store them in a file.",
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char name[20];\n    int marks;\n\n    fp = fopen("student.txt", "w");\n\n    printf("Enter Name: ");\n    scanf("%s", name);\n\n    printf("Enter Marks: ");\n    scanf("%d", &marks);\n\n    fprintf(fp, "%s %d", name, marks);\n\n    fclose(fp);\n\n    printf("Record Saved Successfully\\n");\n\n    return 0;\n}',
        input_format: 'Enter Name and Marks separated by space.', output_format: 'Enter Name: Balu\nEnter Marks: 95\nRecord Saved Successfully', reference_output: 'Enter Name: Enter Marks: Record Saved Successfully',
        hints: JSON.stringify(['Use fprintf() to write formatted data into a file.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p15-t6', title: 'Binary File Operations',
        description: 'Write a C program to store an integer in a binary file and read it back.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num = 100, value;\n\n    fp = fopen("number.dat", "wb");\n\n    fwrite(&num, sizeof(int), 1, fp);\n\n    fclose(fp);\n\n    fp = fopen("number.dat", "rb");\n\n    fread(&value, sizeof(int), 1, fp);\n\n    printf("Value = %d\\n", value);\n\n    fclose(fp);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 100', reference_output: 'Value = 100',
        hints: JSON.stringify(['Use fwrite() and fread().']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p15-t7', title: 'File Positioning',
        description: 'Write a C program to move the file pointer to a specific position and read a character.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen("data.txt", "r");\n\n    fseek(fp, 5, SEEK_SET);\n\n    ch = fgetc(fp);\n\n    printf("Character = %c\\n", ch);\n\n    fclose(fp);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Character = m', reference_output: 'Character = m',
        hints: JSON.stringify(['Use fseek() to reposition the file pointer.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p15-t8', title: 'Error Handling in Files',
        description: 'Write a C program to check whether a file exists before reading it.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen("sample.txt", "r");\n\n    if(fp == NULL) {\n        printf("File Not Found\\n");\n    }\n    else {\n        printf("File Opened Successfully\\n");\n        fclose(fp);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Output 1\nFile Opened Successfully\nOutput 2\nFile Not Found', reference_output: 'File Opened Successfully',
        hints: JSON.stringify(['Verify that fopen() does not return NULL.']), difficulty: 'Medium'
    }
];

async function updateP15Topics() {
    console.log('Updating Phase 15 all topics content...');

    const allContent = [
        ...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content,
        ...t6Content, ...t7Content, ...t8Content
    ];
    const topicIds = [
        'c-p15-t1', 'c-p15-t2', 'c-p15-t3', 'c-p15-t4', 'c-p15-t5',
        'c-p15-t6', 'c-p15-t7', 'c-p15-t8'
    ];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    const { error: insertErr } = await supabase.from('topic_content').insert(allContent);
    if (insertErr) console.error('Content insert error:', insertErr);
    else console.log('Successfully updated content for Phase 15 Topics 1-8!');

    console.log('Managing mastery challenges...');

    const { error: deleteErr } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p15-%');
    if (deleteErr) console.error('Error deleting old challenges:', deleteErr);

    for (const challenge of challenges) {
        const { error } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (error) console.error('Error inserting ' + challenge.topic_id + ':', error);
        else console.log('Inserted challenge for', challenge.topic_id);
    }
    console.log('Challenges updated successfully.');
}

updateP15Topics();
