const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const t1Content = [
    { topic_id: 'c-p11-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a Pointer?</h3><p class="text-gray-700 dark:text-gray-300">A pointer is a variable that stores the address of another variable.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p11-t1', content_type: 'syntax', content_text: 'int num = 10;\n\nint *ptr = &num;', order_index: 2 },
    { topic_id: 'c-p11-t1', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Memory Representation:</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">num</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">Value = 10\nAddress = 1000</pre></div><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">ptr</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">Value = 1000\nAddress = 2000</pre></div></div><p class="mt-4 text-gray-700 dark:text-gray-300">Here: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">ptr</code> stores address of <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-purple-600 dark:text-purple-400">num</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Characteristics of Pointers</h3><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Stores Addresses</h4>', order_index: 3 },
    { topic_id: 'c-p11-t1', content_type: 'syntax', content_text: 'int *ptr;', order_index: 4 },
    { topic_id: 'c-p11-t1', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Stores memory addresses.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Has Its Own Memory</h4><p class="text-gray-700 dark:text-gray-300">A pointer is also a variable. It occupies memory.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Type-Specific</h4>', order_index: 5 },
    { topic_id: 'c-p11-t1', content_type: 'syntax', content_text: 'int *ptr;\nfloat *ptr2;\nchar *ptr3;', order_index: 6 },
    { topic_id: 'c-p11-t1', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">Different pointer types store addresses of different data types.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Basic Example</h3>', order_index: 7 },
    { topic_id: 'c-p11-t1', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 10;\n    int *ptr = &num;\n    printf("%d", num);\n    return 0;\n}', order_index: 8 },
    { topic_id: 'c-p11-t1', content_type: 'syntax', content_text: '```output\n10\n```', order_index: 9 }
];

const t2Content = [
    { topic_id: 'c-p11-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Pointer Declaration?</h3><p class="text-gray-700 dark:text-gray-300">Creating a pointer variable before using it.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Syntax:</h4>', order_index: 1 },
    { topic_id: 'c-p11-t2', content_type: 'syntax', content_text: 'datatype *pointer_name;', order_index: 2 },
    { topic_id: 'c-p11-t2', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Examples</h3><div class="space-y-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400 mb-2">Integer Pointer</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">int *ptr;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Stores address of an integer.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-purple-600 dark:text-purple-400 mb-2">Float Pointer</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">float *ptr;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Stores address of a float.</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Character Pointer</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200">char *ptr;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Stores address of a character.</p></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Pointer Initialization</h3>', order_index: 3 },
    { topic_id: 'c-p11-t2', content_type: 'syntax', content_text: 'int num = 10;\nint *ptr = &num;', order_index: 4 },
    { topic_id: 'c-p11-t2', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Here: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">ptr</code> contains address of <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-purple-600 dark:text-purple-400">num</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Complete Program</h3>', order_index: 5 },
    { topic_id: 'c-p11-t2', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 10;\n    int *ptr = &num;\n    printf("%p", (void*)ptr);\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p11-t2', content_type: 'syntax', content_text: '```output\n1000\n```', order_index: 7 },
    { topic_id: 'c-p11-t2', content_type: 'explanation', content_text: '<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">(Address varies on every system.)</p>', order_index: 8 }
];

const t3Content = [
    { topic_id: 'c-p11-t3', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Address-of Operator?</h3><p class="text-gray-700 dark:text-gray-300">The Address-of Operator (<code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">&amp;</code>) returns the memory address of a variable.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Syntax:</h4><pre class="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-800 dark:text-gray-200 w-fit">&amp;variable_name</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p11-t3', content_type: 'syntax', content_text: 'int num = 10;\nprintf("%p", (void*)&num);', order_index: 2 },
    { topic_id: 'c-p11-t3', content_type: 'explanation', content_text: '<p class="mt-4 font-bold">Output:</p><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">1000</pre><p class="text-sm text-gray-600 dark:text-gray-400">Example address only.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><p class="mt-4 text-gray-700 dark:text-gray-300">Using: <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-blue-600 dark:text-blue-400">&amp;num</code> returns: <code class="font-bold">1000</code></p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 3 },
    { topic_id: 'c-p11-t3', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 10;\n    printf("Value = %d\\n", num);\n    printf("Address = %p", (void*)&num);\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p11-t3', content_type: 'syntax', content_text: '```output\nValue = 10\nAddress = 0x7ffe1234\n```', order_index: 5 }
];

const t4Content = [
    { topic_id: 'c-p11-t4', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Dereference Operator?</h3><p class="text-gray-700 dark:text-gray-300">The dereference operator (<code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded text-purple-600 dark:text-purple-400">*</code>) accesses the value stored at a memory address.</p><p class="mt-4 text-gray-700 dark:text-gray-300">It is also called: <strong>Indirection Operator</strong></p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Syntax:</h4><pre class="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-800 dark:text-gray-200 w-fit">*pointer_name</pre><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p11-t4', content_type: 'syntax', content_text: 'int num = 10;\nint *ptr = &num;\nprintf("%d", *ptr);', order_index: 2 },
    { topic_id: 'c-p11-t4', content_type: 'explanation', content_text: '<p class="mt-4 font-bold">Output: 10</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 3 },
    { topic_id: 'c-p11-t4', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int num = 25;\n    int *ptr = &num;\n    printf("Value = %d\\n", *ptr);\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p11-t4', content_type: 'syntax', content_text: '```output\nValue = 25\n```', order_index: 5 }
];

const t5Content = [
    { topic_id: 'c-p11-t5', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Pointer Arithmetic?</h3><p class="text-gray-700 dark:text-gray-300">Pointers can participate in arithmetic operations.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Allowed operations: ++, --, +, -</h4><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p11-t5', content_type: 'syntax', content_text: 'int arr[3] = {10,20,30};\nint *ptr = arr;', order_index: 2 },
    { topic_id: 'c-p11-t5', content_type: 'explanation', content_text: '<h4 class="font-bold text-blue-700 dark:text-blue-400 mt-6 mb-2">Increment</h4>', order_index: 3 },
    { topic_id: 'c-p11-t5', content_type: 'syntax', content_text: 'ptr++;', order_index: 4 },
    { topic_id: 'c-p11-t5', content_type: 'explanation', content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Moves pointer to the next integer element (4 bytes ahead).</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 5 },
    { topic_id: 'c-p11-t5', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[3] = {10,20,30};\n    int *ptr = arr;\n    printf("%d\\n", *ptr);\n    ptr++;\n    printf("%d", *ptr);\n    return 0;\n}', order_index: 6 },
    { topic_id: 'c-p11-t5', content_type: 'syntax', content_text: '```output\n10\n20\n```', order_index: 7 }
];

const t6Content = [
    { topic_id: 'c-p11-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What is a NULL Pointer?</h3><p class="text-gray-700 dark:text-gray-300">A pointer that points to nothing.</p><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-2">Example:</h4>', order_index: 1 },
    { topic_id: 'c-p11-t6', content_type: 'syntax', content_text: 'int *ptr = NULL;', order_index: 2 },
    { topic_id: 'c-p11-t6', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Use NULL?</h3><p class="text-gray-700 dark:text-gray-300">Avoids accidental access to invalid memory.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 3 },
    { topic_id: 'c-p11-t6', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int *ptr = NULL;\n    if(ptr == NULL)\n        printf("Pointer is NULL\\n");\n    else\n        printf("Pointer is not NULL\\n");\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p11-t6', content_type: 'syntax', content_text: '```output\nPointer is NULL\n```', order_index: 5 }
];

const t7Content = [
    { topic_id: 'c-p11-t7', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Relationship Between Arrays and Pointers</h3><p class="text-gray-700 dark:text-gray-300">Array name acts like a pointer to the first element.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p11-t7', content_type: 'syntax', content_text: 'printf("%d", *arr);', order_index: 2 },
    { topic_id: 'c-p11-t7', content_type: 'explanation', content_text: '<p class="mt-4 font-bold">Output: 10</p><p class="text-gray-700 dark:text-gray-300 mt-2">Equivalent to: <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">printf("%d", arr[0]);</code></p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example Program</h3>', order_index: 3 },
    { topic_id: 'c-p11-t7', content_type: 'example', content_text: '#include <stdio.h>\n\nint main()\n{\n    int arr[3] = {10,20,30};\n    printf("%d\\n", *arr);\n    printf("%d\\n", *(arr+1));\n    printf("%d\\n", *(arr+2));\n    return 0;\n}', order_index: 4 },
    { topic_id: 'c-p11-t7', content_type: 'syntax', content_text: '```output\n10\n20\n30\n```', order_index: 5 }
];

const t8Content = [
    { topic_id: 'c-p11-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Passing Pointers to Functions</h3><p class="text-gray-700 dark:text-gray-300">Pointers allow functions to access original variables.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example</h3>', order_index: 1 },
    { topic_id: 'c-p11-t8', content_type: 'example', content_text: '#include <stdio.h>\n\nvoid modify(int *ptr)\n{\n    *ptr = 100;\n}\n\nint main()\n{\n    int num = 50;\n    modify(&num);\n    printf("%d", num);\n    return 0;\n}', order_index: 2 },
    { topic_id: 'c-p11-t8', content_type: 'syntax', content_text: '```output\n100\n```', order_index: 3 },
    { topic_id: 'c-p11-t8', content_type: 'explanation', content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Swap Example Program</h3>', order_index: 4 },
    { topic_id: 'c-p11-t8', content_type: 'example', content_text: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp;\n    temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    printf("Before Swap: %d %d\\n", x, y);\n    swap(&x, &y);\n    printf("After Swap: %d %d\\n", x, y);\n    return 0;\n}', order_index: 5 },
    { topic_id: 'c-p11-t8', content_type: 'syntax', content_text: '```output\nBefore Swap: 10 20\nAfter Swap: 20 10\n```', order_index: 6 }
];

const challenges = [
    {
        topic_id: 'c-p11-t1', title: 'Introduction to Pointers',
        description: 'Write a C program to store an integer value and display it using a pointer.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num = 25;\n    int *ptr = &num;\n\n    printf("Value = %d\\n", *ptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 25', reference_output: 'Value = 25',
        hints: JSON.stringify(['Create a pointer that stores the address of a variable and access the value through the pointer.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p11-t2', title: 'Pointer Declaration',
        description: 'Write a C program to declare a pointer, assign it the address of a variable, and display the value using the pointer.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    int *ptr;\n\n    ptr = &age;\n\n    printf("Age = %d\\n", *ptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Age = 20', reference_output: 'Age = 20',
        hints: JSON.stringify(['Use * to declare a pointer variable.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p11-t3', title: 'Address-of Operator (&)',
        description: 'Write a C program to display the memory address of a variable using the address-of (&) operator.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num = 100;\n\n    printf("Address of num = %p\\n", (void*)&num);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Address of num = [Address]', reference_output: 'Address of num = 0x7ffd',
        hints: JSON.stringify(['Use &variable_name to obtain the memory address.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p11-t4', title: 'Dereference Operator (*)',
        description: 'Write a C program to access and display the value stored at a memory address using the dereference (*) operator.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int num = 50;\n    int *ptr = &num;\n\n    printf("Value = %d\\n", *ptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Value = 50', reference_output: 'Value = 50',
        hints: JSON.stringify(['Use *pointer_name to access the value pointed to by a pointer.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p11-t5', title: 'Pointer Arithmetic',
        description: 'Write a C program to demonstrate pointer arithmetic by moving a pointer to the next element in an array.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n\n    int *ptr = arr;\n\n    printf("First Element = %d\\n", *ptr);\n\n    ptr++;\n\n    printf("Second Element = %d\\n", *ptr);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'First Element = 10\nSecond Element = 20', reference_output: 'First Element = 10\nSecond Element = 20',
        hints: JSON.stringify(['Increment the pointer using ptr++.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p11-t6', title: 'NULL Pointers',
        description: 'Write a C program to declare a NULL pointer and check whether it points to a valid memory location.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int *ptr = NULL;\n\n    if(ptr == NULL)\n        printf("Pointer is NULL\\n");\n    else\n        printf("Pointer is not NULL\\n");\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Pointer is NULL', reference_output: 'Pointer is NULL',
        hints: JSON.stringify(['Use NULL to initialize a pointer that does not point anywhere.']), difficulty: 'Easy'
    },
    {
        topic_id: 'c-p11-t7', title: 'Pointers and Arrays',
        description: 'Write a C program to display all elements of an array using a pointer.',
        solution_code: '#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 10, 15, 20, 25};\n    int *ptr = arr;\n    int i;\n\n    for(i = 0; i < 5; i++) {\n        printf("%d ", *(ptr + i));\n    }\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: '5 10 15 20 25 ', reference_output: '5 10 15 20 25 ',
        hints: JSON.stringify(['Array names act as pointers to their first element.']), difficulty: 'Medium'
    },
    {
        topic_id: 'c-p11-t8', title: 'Pointers and Functions',
        description: 'Write a C program to swap two numbers using a function and pointers.',
        solution_code: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp;\n\n    temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n\n    printf("Before Swap: %d %d\\n", x, y);\n\n    swap(&x, &y);\n\n    printf("After Swap: %d %d\\n", x, y);\n\n    return 0;\n}',
        input_format: 'No input is required.', output_format: 'Before Swap: 10 20\nAfter Swap: 20 10', reference_output: 'Before Swap: 10 20\nAfter Swap: 20 10',
        hints: JSON.stringify(['Pass the addresses of variables to the function and modify them using pointers.']), difficulty: 'Hard'
    }
];

async function updateP11Topics() {
    console.log('Updating Phase 11 all topics content...');

    const allContent = [...t1Content, ...t2Content, ...t3Content, ...t4Content, ...t5Content, ...t6Content, ...t7Content, ...t8Content];
    const topicIds = ['c-p11-t1', 'c-p11-t2', 'c-p11-t3', 'c-p11-t4', 'c-p11-t5', 'c-p11-t6', 'c-p11-t7', 'c-p11-t8'];

    await supabase.from('topic_content').delete().in('topic_id', topicIds);
    await supabase.from('topic_content').insert(allContent);

    console.log('Successfully updated content for Phase 11 Topics 1-8!');
    console.log('Managing mastery challenges...');

    // Delete all existing Phase 11 challenges to ensure clean insert
    const { error: deleteError } = await supabase.from('course_challenges').delete().like('topic_id', 'c-p11-%');
    if (deleteError) {
        console.error('Error deleting old challenges:', deleteError);
    }

    for (const challenge of challenges) {
        const { error: insertError } = await supabase.from('course_challenges').insert({ ...challenge, course_id: 'c-programming' });
        if (insertError) {
            console.error('Error inserting ' + challenge.topic_id + ':', insertError);
        } else {
            console.log('Inserted challenge for', challenge.topic_id);
        }
    }
    console.log('Challenges updated successfully.');
}

updateP11Topics();
