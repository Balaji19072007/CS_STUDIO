const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const t1Content = [
    { topic_id: 'c-p9-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is an Array?</h3><p class="text-gray-700 dark:text-gray-300">An array is a collection of similar data elements stored under one name.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p9-t1', content_type: 'syntax', content_text: '```c\nint numbers[5];\n```', order_index: 2 },
    { topic_id: 'c-p9-t1', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">This creates an array capable of storing five integers.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Characteristics of Arrays</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Same Data Type</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">All elements must have the same type.</p><p class="text-xs font-bold text-green-600 dark:text-green-400">Correct:</p><pre class="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">int numbers[5];</pre><p class="text-xs font-bold text-red-600 dark:text-red-400 mt-2">Wrong:</p><pre class="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">numbers = {10, 3.14, \'A\'};</pre></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Fixed Size</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Array size cannot change after declaration.</p><p class="text-xs font-bold text-gray-900 dark:text-white">Example:</p><pre class="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">int marks[50];</pre><p class="text-sm text-gray-700 dark:text-gray-300 mt-2">Size remains 50.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Continuous Memory</h4><p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Stored in adjacent locations.</p><pre class="text-sm font-mono text-gray-700 dark:text-gray-300">marks[0]\nmarks[1]\nmarks[2]\nmarks[3]</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Array Indexing</h3><p class="text-gray-700 dark:text-gray-300">C uses <span class="font-bold">zero-based indexing</span>.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Example: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">int marks[5];</code></p><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Valid indexes:</h4><ul class="list-none font-mono text-gray-700 dark:text-gray-300"><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li></ul></div><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Invalid:</h4><ul class="list-none font-mono text-gray-700 dark:text-gray-300"><li>5</li><li>6</li></ul></div></div><p class="mt-6 font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">Arrays in C start at index 0 and end at size-1.</p>', order_index: 3 }
];

const t2Content = [
    { topic_id: 'c-p9-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Array Declaration</h3><p class="text-gray-700 dark:text-gray-300">Creating an array before using it.</p>', order_index: 1 },
    { topic_id: 'c-p9-t2', content_type: 'syntax', content_text: '```c\ndatatype array_name[size];\n```', order_index: 2 },
    { topic_id: 'c-p9-t2', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 3 },
    { topic_id: 'c-p9-t2', content_type: 'syntax', content_text: '```c\nint marks[5];\n```', order_index: 4 },
    { topic_id: 'c-p9-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Memory Allocation</h3><p class="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded w-fit text-sm">int marks[5];</p><p class="mt-4 text-gray-700 dark:text-gray-300">Memory:</p><pre class="mt-2 font-mono text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">marks[0]\nmarks[1]\nmarks[2]\nmarks[3]\nmarks[4]</pre><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">Five memory locations are reserved.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Array Initialization</h3><p class="text-gray-700 dark:text-gray-300 mb-4">Assigning values to an array.</p><div class="space-y-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Method 1</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">int marks[5] = {85,90,75,80,95};</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Method 2</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">int marks[] = {85,90,75,80,95};</pre><p class="text-sm text-gray-600 dark:text-gray-400">Compiler automatically determines size.</p></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Method 3</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">int marks[5];\n\nmarks[0] = 85;\nmarks[1] = 90;\nmarks[2] = 75;\nmarks[3] = 80;\nmarks[4] = 95;</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 5 },
    { topic_id: 'c-p9-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks[5] = {85,90,75,80,95};\n    printf("%d", marks[0]);\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p9-t2', content_type: 'syntax', content_text: '```output\n85\n```', order_index: 7 }
];

const t3Content = [
    { topic_id: 'c-p9-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Accessing Elements</h3><p class="text-gray-700 dark:text-gray-300">Array elements are accessed using index numbers.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Syntax:</h4>', order_index: 1 },
    { topic_id: 'c-p9-t3', content_type: 'syntax', content_text: '```c\narray_name[index]\n```', order_index: 2 },
    { topic_id: 'c-p9-t3', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Example: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">marks[2]</code> (Accesses third element).</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 3 },
    { topic_id: 'c-p9-t3', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks[5] = {85,90,75,80,95};\n\n    printf("%d\\n", marks[0]);\n    printf("%d\\n", marks[1]);\n    printf("%d\\n", marks[2]);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p9-t3', content_type: 'syntax', content_text: '```output\n85\n90\n75\n```', order_index: 5 },
    { topic_id: 'c-p9-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Modifying Elements</h3><p class="text-gray-700 dark:text-gray-300">Elements can be modified directly using their index.</p>', order_index: 6 },
    { topic_id: 'c-p9-t3', content_type: 'syntax', content_text: '```c\nmarks[1] = 100;\n```', order_index: 7 },
    { topic_id: 'c-p9-t3', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Changes second element.</p><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Before:</h4><pre class="text-sm font-mono text-gray-700 dark:text-gray-300">85 90 75 80 95</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">After:</h4><pre class="text-sm font-mono text-gray-700 dark:text-gray-300">85 100 75 80 95</pre></div></div>', order_index: 8 }
];

const t4Content = [
    { topic_id: 'c-p9-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Taking Input into Array</h3><p class="text-gray-700 dark:text-gray-300">Using loops with <code class="font-bold">scanf()</code>.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p9-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks[5];\n\n    for(int i=0;i<5;i++)\n    {\n        scanf("%d",&marks[i]);\n    }\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p9-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Displaying Array Elements</h3>', order_index: 3 },
    { topic_id: 'c-p9-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int marks[5]={10,20,30,40,50};\n\n    for(int i=0;i<5;i++)\n    {\n        printf("%d ",marks[i]);\n    }\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p9-t4', content_type: 'syntax', content_text: '```output\n10 20 30 40 50\n```', order_index: 5 },
    { topic_id: 'c-p9-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Example</h3>', order_index: 6 },
    { topic_id: 'c-p9-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[5];\n\n    printf("Enter 5 numbers:\\n");\n    for(int i=0;i<5;i++)\n    {\n        scanf("%d",&arr[i]);\n    }\n\n    printf("Numbers are:\\n");\n    for(int i=0;i<5;i++)\n    {\n        printf("%d ",arr[i]);\n    }\n\n    return 0;\n}', order_index: 7 }
];

const t5Content = [
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Multi-Dimensional Array?</h3><p class="text-gray-700 dark:text-gray-300">An array containing multiple rows and columns.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Most common type: <span class="font-bold">Two-Dimensional Array</span> (Similar to a matrix).</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p9-t5', content_type: 'syntax', content_text: '```c\ndatatype array_name[rows][columns];\n```', order_index: 2 },
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 3 },
    { topic_id: 'c-p9-t5', content_type: 'syntax', content_text: '```c\nint marks[3][4];\n```', order_index: 4 },
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Creates: 3 Rows, 4 Columns</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Representation</h3>', order_index: 5 },
    { topic_id: 'c-p9-t5', content_type: 'example', content_text: '// [CODE_ONLY]\nmarks[0][0] marks[0][1] marks[0][2]\nmarks[1][0] marks[1][1] marks[1][2]\nmarks[2][0] marks[2][1] marks[2][2]', order_index: 6 },
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Initialization</h3>', order_index: 7 },
    { topic_id: 'c-p9-t5', content_type: 'syntax', content_text: '```c\nint matrix[2][3] =\n{\n    {1,2,3},\n    {4,5,6}\n};\n```', order_index: 8 },
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 9 },
    { topic_id: 'c-p9-t5', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int matrix[2][3] =\n    {\n        {1,2,3},\n        {4,5,6}\n    };\n\n    printf("%d", matrix[1][2]);\n\n    return 0;\n}', order_index: 10 },
    { topic_id: 'c-p9-t5', content_type: 'syntax', content_text: '```output\n6\n```', order_index: 11 },
    { topic_id: 'c-p9-t5', content_type: 'explanation', content_text: '<p class="mt-6 font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">Multidimensional arrays can be created by adding additional square brackets for each dimension.</p>', order_index: 12 }
];

const t6Content = [
    { topic_id: 'c-p9-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Passing Arrays to Functions</h3><p class="text-gray-700 dark:text-gray-300">Arrays can be passed as arguments to functions.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Syntax</h3>', order_index: 1 },
    { topic_id: 'c-p9-t6', content_type: 'syntax', content_text: '```c\nreturn_type function_name(datatype array[])\n```', order_index: 2 },
    { topic_id: 'c-p9-t6', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Example: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">void display(int arr[])</code></p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 3 },
    { topic_id: 'c-p9-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nvoid display(int arr[], int size)\n{\n    for(int i=0;i<size;i++)\n    {\n        printf("%d ", arr[i]);\n    }\n}\n\nint main()\n{\n    int numbers[5] = {10,20,30,40,50};\n\n    display(numbers,5);\n\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p9-t6', content_type: 'syntax', content_text: '```output\n10 20 30 40 50\n```', order_index: 5 },
    { topic_id: 'c-p9-t6', content_type: 'explanation', content_text: '<p class="mt-6 font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">Arrays are passed to functions by providing the array name, and the receiving parameter is declared as an array.</p>', order_index: 6 }
];

const t7Content = [
    { topic_id: 'c-p9-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">Common operations performed on arrays:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300 mb-6"><li>Traversal</li><li>Insertion</li><li>Deletion</li><li>Searching</li><li>Updating</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Traversal</h3><p class="text-gray-700 dark:text-gray-300">Visiting every element.</p>', order_index: 1 },
    { topic_id: 'c-p9-t7', content_type: 'syntax', content_text: '```c\nfor(int i=0;i<5;i++)\n{\n    printf("%d ",arr[i]);\n}\n```', order_index: 2 },
    { topic_id: 'c-p9-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Updating</h3><p class="text-gray-700 dark:text-gray-300">Changing a value.</p>', order_index: 3 },
    { topic_id: 'c-p9-t7', content_type: 'syntax', content_text: '```c\narr[2] = 100;\n```', order_index: 4 },
    { topic_id: 'c-p9-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Searching</h3><p class="text-gray-700 dark:text-gray-300">Finding a value.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Example: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">int key = 30;</code></p><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">Check every element until found.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Sum of Array Elements</h3>', order_index: 5 },
    { topic_id: 'c-p9-t7', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[5]={10,20,30,40,50};\n    int sum=0;\n\n    for(int i=0;i<5;i++)\n    {\n        sum += arr[i];\n    }\n\n    printf("Sum=%d",sum);\n\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p9-t7', content_type: 'syntax', content_text: '```output\nSum=150\n```', order_index: 7 },
    { topic_id: 'c-p9-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Finding Largest Element</h3>', order_index: 8 },
    { topic_id: 'c-p9-t7', content_type: 'syntax', content_text: '```c\nint max = arr[0];\n\nfor(int i=1;i<5;i++)\n{\n    if(arr[i] > max)\n        max = arr[i];\n}\n```', order_index: 9 }
];

const t8Content = [
    { topic_id: 'c-p9-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Linear Search</h3><p class="text-gray-700 dark:text-gray-300">Searches element one by one.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p9-t8', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[5]={10,20,30,40,50};\n    int key=30;\n    int found=0;\n\n    for(int i=0;i<5;i++)\n    {\n        if(arr[i]==key)\n        {\n            found=1;\n            break;\n        }\n    }\n\n    if(found)\n        printf("Found");\n    else\n        printf("Not Found");\n\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p9-t8', content_type: 'syntax', content_text: '```output\nFound\n```', order_index: 3 },
    { topic_id: 'c-p9-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Finding Maximum Element</h3>', order_index: 4 },
    { topic_id: 'c-p9-t8', content_type: 'syntax', content_text: '```c\nint max = arr[0];\n\nfor(int i=1;i<5;i++)\n{\n    if(arr[i] > max)\n        max = arr[i];\n}\n```', order_index: 5 },
    { topic_id: 'c-p9-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Finding Minimum Element</h3>', order_index: 6 },
    { topic_id: 'c-p9-t8', content_type: 'syntax', content_text: '```c\nint min = arr[0];\n\nfor(int i=1;i<5;i++)\n{\n    if(arr[i] < min)\n        min = arr[i];\n}\n```', order_index: 7 },
    { topic_id: 'c-p9-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Array Reversal</h3><p class="text-gray-700 dark:text-gray-300">Original: <code class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">1 2 3 4 5</code></p><p class="mt-2 text-gray-700 dark:text-gray-300">Reversed: <code class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">5 4 3 2 1</code></p><p class="mt-4 text-gray-700 dark:text-gray-300">Logic: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">swap(arr[start], arr[end]);</code></p><p class="mt-2 text-gray-700 dark:text-gray-300 mb-6">Move inward until start &ge; end.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Array Average</h3>', order_index: 8 },
    { topic_id: 'c-p9-t8', content_type: 'syntax', content_text: '```c\naverage = sum / size;\n```', order_index: 9 },
    { topic_id: 'c-p9-t8', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Example: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">int arr[5]={10,20,30,40,50};</code></p><p class="mt-2 text-gray-700 dark:text-gray-300">Sum: 150</p><p class="mt-2 text-gray-700 dark:text-gray-300 mb-6">Average: 30</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Comparison: Variables vs Arrays</h3><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4 mb-8"><table class="w-full text-left text-sm text-gray-600 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><tr><th class="px-6 py-4 font-bold text-blue-700 dark:text-blue-400">Variables</th><th class="px-6 py-4 font-bold text-purple-700 dark:text-purple-400">Arrays</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent"><tr><td class="px-6 py-4">Store one value</td><td class="px-6 py-4">Store multiple values</td></tr><tr><td class="px-6 py-4">Separate names required</td><td class="px-6 py-4">Single name used</td></tr><tr><td class="px-6 py-4">Difficult for large data</td><td class="px-6 py-4 font-medium">Easy for large data</td></tr><tr><td class="px-6 py-4">Not suitable for loops</td><td class="px-6 py-4 font-bold text-green-600 dark:text-green-400">Ideal for loops</td></tr></tbody></table></div>', order_index: 10 }
];

const challenges = [
    {
        topic_id: 'c-p9-t1', title: 'Average Marks Using Array',
        description: 'Write a C program to store the marks of 5 students in an array and calculate the average marks.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int marks[5] = {75, 80, 65, 90, 85};\n    int sum = 0, i;\n    float average;\n\n    for(i = 0; i < 5; i++) {\n        sum += marks[i];\n    }\n\n    average = sum / 5.0;\n\n    printf("Average Marks = %.2f\\n", average);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Average Marks = 79.00', reference_output: 'Average Marks = 79.00',
        hints: JSON.stringify(['Store multiple marks using an array and use a loop to calculate their sum before finding the average.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p9-t2', title: 'Initialize and Display Even Numbers',
        description: 'Write a C program to initialize an array with the first 10 even numbers and display them.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int even[10] = {2,4,6,8,10,12,14,16,18,20};\n    int i;\n\n    printf("Even Numbers: ");\n\n    for(i = 0; i < 10; i++) {\n        printf("%d ", even[i]);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Even Numbers: 2 4 6 8 10 12 14 16 18 20 ', reference_output: 'Even Numbers: 2 4 6 8 10 12 14 16 18 20 ',
        hints: JSON.stringify(['Initialize the array while declaring it and use a loop to print all elements.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p9-t3', title: 'Find Largest Element',
        description: 'Write a C program to find the largest element in an array.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[5] = {12, 45, 7, 89, 34};\n    int largest = arr[0];\n    int i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest)\n            largest = arr[i];\n    }\n\n    printf("Largest Element = %d\\n", largest);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Largest Element = 89', reference_output: 'Largest Element = 89',
        hints: JSON.stringify(['Assume the first element is the largest and compare it with the remaining elements.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p9-t4', title: 'Reverse Array Input',
        description: 'Write a C program to accept 5 numbers from the user and display them in reverse order.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[5], i;\n\n    printf("Enter 5 numbers:\\n");\n\n    for(i = 0; i < 5; i++) {\n        scanf("%d", &arr[i]);\n    }\n\n    printf("Numbers in Reverse Order: ");\n\n    for(i = 4; i >= 0; i--) {\n        printf("%d ", arr[i]);\n    }\n\n    return 0;\n}',
        input_format: '10\n20\n30\n40\n50', output_format: 'Enter 5 numbers:\nNumbers in Reverse Order: 50 40 30 20 10 ', reference_output: 'Enter 5 numbers:\nNumbers in Reverse Order: 50 40 30 20 10 ',
        hints: JSON.stringify(['Store the numbers in an array and use a loop from the last index to the first index.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p9-t5', title: '2D Array Total Marks',
        description: 'Write a C program to store marks of 3 students in 3 subjects and calculate the total marks of each student.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int marks[3][3] = {\n        {80, 75, 90},\n        {65, 70, 85},\n        {95, 88, 92}\n    };\n    int i, j, total;\n\n    for(i = 0; i < 3; i++) {\n        total = 0;\n        for(j = 0; j < 3; j++) {\n            total += marks[i][j];\n        }\n        printf("Student %d Total = %d\\n", i + 1, total);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Student 1 Total = 245\nStudent 2 Total = 220\nStudent 3 Total = 275', reference_output: 'Student 1 Total = 245\nStudent 2 Total = 220\nStudent 3 Total = 275',
        hints: JSON.stringify(['Use a 2D array where rows represent students and columns represent subjects.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p9-t6', title: 'Array Sum Function',
        description: 'Write a C program to pass an array to a function and find the sum of all elements.',
        solution_code: '#include <stdio.h>\n\nint findSum(int arr[], int size) {\n    int i, sum = 0;\n    for(i = 0; i < size; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    printf("Sum = %d\\n", findSum(arr, 5));\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Sum = 150', reference_output: 'Sum = 150',
        hints: JSON.stringify(['Pass the array and its size as function arguments.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p9-t7', title: 'Insert Element in Array',
        description: 'Write a C program to insert an element at a specified position in an array.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int size = 5, pos = 3, value = 25, i;\n\n    for(i = size; i >= pos; i--) {\n        arr[i] = arr[i - 1];\n    }\n    arr[pos - 1] = value;\n    size++;\n\n    printf("Array After Insertion: ");\n    for(i = 0; i < size; i++) {\n        printf("%d ", arr[i]);\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Array After Insertion: 10 20 25 30 40 50 ', reference_output: 'Array After Insertion: 10 20 25 30 40 50 ',
        hints: JSON.stringify(['Shift elements to the right before inserting the new element.']), difficulty: 'Hard'
    },
    {
        topic_id: 'c-p9-t8', title: 'Second Largest Element',
        description: 'Write a C program to find the second largest element in an array.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 45, 7, 89, 34};\n    int largest = arr[0], second = arr[0], i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest) {\n            second = largest;\n            largest = arr[i];\n        }\n        else if(arr[i] > second && arr[i] != largest) {\n            second = arr[i];\n        }\n    }\n\n    printf("Second Largest Element = %d\\n", second);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Second Largest Element = 45', reference_output: 'Second Largest Element = 45',
        hints: JSON.stringify(['Track both the largest and second largest values while traversing the array.']), difficulty: 'Hard'
    }
];

async function updateP9Topics() {
    console.log('Updating Phase 9 all topics content...');
    
    const allContent = [...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content, ...t6Content, ...t7Content, ...t8Content];
    const topicIds = ['c-p9-t1', 'c-p9-t2', 'c-p9-t3', 'c-p9-t4', 'c-p9-t5', 'c-p9-t6', 'c-p9-t7', 'c-p9-t8'];
    
    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    await supabase.from('topic_content').insert(allContent);
    
    console.log('Successfully updated content for Phase 9 Topics 1-8!');
    console.log('Managing mastery challenges...');
    
    for (const challenge of challenges) {
        const { data: existing } = await supabase.from('course_challenges').select('id').eq('topic_id', challenge.topic_id);
        if (existing && existing.length > 0) {
            await supabase.from('course_challenges').update(challenge).eq('topic_id', challenge.topic_id);
        } else {
            await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        }
    }
    console.log('Challenges updated successfully.');
}

updateP9Topics();
