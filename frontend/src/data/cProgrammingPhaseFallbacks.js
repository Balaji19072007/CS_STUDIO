const topic = (id, title, description, orderIndex, difficulty, estimatedMinutes) => ({
  id,
  title,
  description,
  order_index: orderIndex,
  difficulty,
  estimated_minutes: estimatedMinutes,
});

export const C_PROGRAMMING_PHASES = [
  {
    id: 'c-phase-1',
    course_id: 'c-programming',
    title: 'Introduction to C Programming',
    description: 'Get started with C programming fundamentals, setup, and first programs.',
    order_index: 1,
    estimated_hours: 6,
    topics: [
      topic('c-p1-t1', 'What is C Programming?', 'History, features, and applications of C.', 1, 'Easy', 20),
      topic('c-p1-t2', 'Setting Up Development Environment', 'Installing a compiler, configuring an editor, and verifying your workflow.', 2, 'Easy', 30),
      topic('c-p1-t3', 'Structure of a C Program', 'Understanding headers, main(), statements, and return values.', 3, 'Easy', 25),
      topic('c-p1-t4', 'Your First C Program', 'Writing and running a complete Hello World style program.', 4, 'Easy', 20),
      topic('c-p1-t5', 'Comments and Documentation', 'Single-line comments, block comments, and readable code notes.', 5, 'Easy', 15),
      topic('c-p1-t6', 'Compilation Process', 'Preprocessing, compilation, assembly, and linking.', 6, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-2',
    course_id: 'c-programming',
    title: 'Data Types and Variables',
    description: 'Master C data types, variables, constants, and conversions.',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3>\n<p>In every C program, data is stored in memory and processed by the computer. To store data efficiently, C provides different data types and variables.</p>\n<p class="mt-4">A data type tells the compiler:</p>\n<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">\n<li>What kind of data will be stored</li>\n<li>How much memory should be allocated</li>\n<li>What operations can be performed on the data</li>\n</ul>\n<p class="mt-4">A variable is a named memory location used to store data.</p>\n<p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\nint age = 20;'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Here:</p>\n<ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2">\n<li>int is the data type</li>\n<li>age is the variable name</li>\n<li>20 is the value stored in the variable</li>\n</ul>\n<p class="mt-4">C provides several basic data types such as int, float, and char for storing different kinds of information. All variables must be declared before they are used in a program.</p>'
      }
    ],
    order_index: 2,
    estimated_hours: 8,
    topics: [
      topic('c-p2-t1', 'Basic Data Types', 'int, float, double, and char.', 1, 'Easy', 25),
      topic('c-p2-t2', 'Variable Declaration and Initialization', 'Declaring variables, assigning values, and naming cleanly.', 2, 'Easy', 20),
      topic('c-p2-t3', 'Constants and Literals', 'const values, #define, and literal forms.', 3, 'Easy', 20),
      topic('c-p2-t4', 'Type Modifiers', 'signed, unsigned, short, and long.', 4, 'Medium', 25),
      topic('c-p2-t5', 'sizeof Operator', 'Determining the size of data types and objects.', 5, 'Easy', 15),
      topic('c-p2-t6', 'Type Conversion and Casting', 'Implicit conversions and explicit casts.', 6, 'Medium', 30),
      topic('c-p2-t7', 'Enumeration Types', 'enum keyword and readable named constants.', 7, 'Medium', 25),
    ],
  },
  {
    id: 'c-phase-3',
    course_id: 'c-programming',
    title: 'Operators and Expressions',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>Operators are special symbols used to perform operations on data. The values on which operators work are called operands.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\na + b'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Here:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>a and b are operands</li><li>+ is an operator</li></ul><p class="mt-4">The combination of operands and operators forms an expression.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\na + b * c'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">This is an expression.</p><p class="mt-4">C provides arithmetic, comparison, logical, assignment, increment/decrement, and conditional operators for performing various computations and controlling program flow.</p>'
      }
    ],
    description: 'Learn C operators and how expressions are evaluated.',
    order_index: 3,
    estimated_hours: 7,
    topics: [
      topic('c-p3-t1', 'Arithmetic Operators', 'Addition, subtraction, multiplication, division, and modulus.', 1, 'Easy', 20),
      topic('c-p3-t2', 'Relational Operators', 'Equality and comparison operators.', 2, 'Easy', 20),
      topic('c-p3-t3', 'Logical Operators', 'AND, OR, and NOT in conditions.', 3, 'Easy', 20),
      topic('c-p3-t4', 'Assignment Operators', 'Simple and compound assignments.', 4, 'Easy', 20),
      topic('c-p3-t5', 'Increment and Decrement', 'Prefix and postfix behavior.', 5, 'Medium', 25),
      topic('c-p3-t6', 'Bitwise Operators', 'Bit-level AND, OR, XOR, shifts, and complement.', 6, 'Medium', 30),
      topic('c-p3-t7', 'Conditional (Ternary) Operator', 'Compact conditional expressions.', 7, 'Medium', 20),
      topic('c-p3-t8', 'Operator Precedence and Associativity', 'Order of evaluation inside complex expressions.', 8, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-4',
    course_id: 'c-programming',
    title: 'Input and Output',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>A program becomes useful only when it can communicate with users.</p><p class="mt-4">Communication in a C program happens through:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li><strong>Input Operations</strong> → Receiving data from the user</li><li><strong>Output Operations</strong> → Displaying results to the user</li></ul><p class="mt-4">Input and Output (I/O) operations allow programs to interact with the outside world.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\n#include <stdio.h>\n\nint main()\n{\n    int age;\n\n    printf("Enter your age: ");\n    scanf("%d", &age);\n\n    printf("Your age is %d", age);\n\n    return 0;\n}'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">In this program:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>scanf() receives input from the user.</li><li>printf() displays output on the screen.</li></ul><p class="mt-4">C provides several input/output functions through the Standard Input Output Library (stdio.h). These functions include printf(), scanf(), getchar(), putchar(), and other formatted I/O functions.</p>'
      }
    ],
    description: 'Master console I/O, formatting, and standard library basics.',
    order_index: 4,
    estimated_hours: 6,
    topics: [
      topic('c-p4-t1', 'printf() Function', 'Basic output and format specifiers.', 1, 'Easy', 25),
      topic('c-p4-t2', 'scanf() Function', 'Reading user input with format specifiers.', 2, 'Easy', 25),
      topic('c-p4-t3', 'Format Specifiers', 'Using %d, %f, %c, %s, and related specifiers.', 3, 'Easy', 20),
      topic('c-p4-t4', 'getchar() and putchar()', 'Single-character input and output functions.', 4, 'Easy', 20),
      topic('c-p4-t5', 'gets() and puts()', 'String I/O functions and their practical cautions.', 5, 'Easy', 20),
      topic('c-p4-t6', 'Formatted Output', 'Width, precision, and alignment in output.', 6, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-5',
    course_id: 'c-programming',
    title: 'Control Flow - Decision Making',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>In real-life situations, decisions are made based on conditions.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Examples:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 font-mono mt-2"><li>If it is raining, take an umbrella.</li><li>If marks are greater than 50, pass the exam.</li><li>If age is 18 or above, allow voting.</li></ul><p class="mt-4">Similarly, in programming, a program often needs to make decisions based on conditions.</p><p class="mt-4">Control flow statements allow a program to choose different paths of execution depending on whether a condition is true or false.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\nint age = 20;\n\nif(age >= 18)\n{\n    printf("Eligible to vote");\n}'
      },
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Output</h3><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-gray-800 dark:text-gray-200 text-sm border border-gray-200 dark:border-gray-700 w-fit">Eligible to vote</pre>'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4">C provides several conditional statements such as <code>if</code>, <code>if-else</code>, <code>else-if</code>, <code>switch</code>, and the conditional (ternary) operator for controlling program flow.</p>'
      }
    ],
    description: 'Conditional statements and branching structures.',
    order_index: 5,
    estimated_hours: 7,
    topics: [
      topic('c-p5-t1', 'if Statement', 'Basic conditional execution.', 1, 'Easy', 20),
      topic('c-p5-t2', 'if-else Statement', 'Two-way branching.', 2, 'Easy', 20),
      topic('c-p5-t3', 'Nested if-else', 'Multi-level conditional logic.', 3, 'Medium', 25),
      topic('c-p5-t4', 'else-if Ladder', 'Checking several conditions in sequence.', 4, 'Medium', 25),
      topic('c-p5-t5', 'switch Statement', 'Multi-way branching with case labels.', 5, 'Medium', 30),
      topic('c-p5-t6', 'goto Statement', 'Unconditional jumps and why they are usually avoided.', 6, 'Medium', 20),
      topic('c-p5-t7', 'Conditional Expressions in Practice', 'Real-world patterns for clean decision logic.', 7, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-6',
    course_id: 'c-programming',
    title: 'Control Flow - Loops',
    description: 'Iteration and repetition using while, do-while, and for loops.',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p>In programming, there are situations where a block of code needs to be executed repeatedly.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">For example:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Display numbers from 1 to 100.</li><li>Print a multiplication table.</li><li>Calculate the sum of 100 numbers.</li><li>Process records in a database.</li></ul><p class="mt-4">Writing the same statement again and again would make programs lengthy and difficult to maintain.</p><p class="mt-4">To solve this problem, C provides loops.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">A loop repeatedly executes a block of code until a specified condition becomes false.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\n#include <stdio.h>\n\nint main()\n{\n    int i = 1;\n\n    while(i <= 5)\n    {\n        printf("%d\\n", i);\n        i++;\n    }\n\n    return 0;\n}'
      },
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Output</h3><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-gray-800 dark:text-gray-200 text-sm border border-gray-200 dark:border-gray-700 w-fit">1\n2\n3\n4\n5</pre><p class="mt-4">Instead of writing five separate printf() statements, the loop executes the same statement repeatedly.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">According to the PDF, C provides three major looping statements:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li><code>while</code> loop</li><li><code>do-while</code> loop</li><li><code>for</code> loop</li></ul><p class="mt-4">along with loop control statements such as <code>break</code> and <code>continue</code>.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Loops are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-3">Without Loop:</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">printf("Hello\\n");\nprintf("Hello\\n");\nprintf("Hello\\n");\nprintf("Hello\\n");\nprintf("Hello\\n");</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-3">With Loop:</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">for(int i=1; i<=5; i++)\n{\n    printf("Hello\\n");\n}</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2"><li>Reduces code length</li><li>Improves readability</li><li>Saves development time</li><li>Easier maintenance</li><li>Efficient execution</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Loop Components</h3><p>Every loop contains three important parts:</p><div class="space-y-4 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">1. Initialization</h4><p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Starting value.</p><p class="mt-2 font-bold text-sm">Example:</p><pre class="text-sm font-mono mt-1 text-gray-800 dark:text-gray-200">int i = 1;</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">2. Condition</h4><p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Determines whether the loop should continue.</p><p class="mt-2 font-bold text-sm">Example:</p><pre class="text-sm font-mono mt-1 text-gray-800 dark:text-gray-200">i <= 10</pre></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><h4 class="font-bold text-blue-600 dark:text-blue-400">3. Update</h4><p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Changes the loop variable.</p><p class="mt-2 font-bold text-sm">Example:</p><pre class="text-sm font-mono mt-1 text-gray-800 dark:text-gray-200">i++;</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Flow of Loop Execution</h3><div class="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex justify-center"><pre class="text-sm font-mono text-center text-gray-600 dark:text-gray-400">Initialization\n      |\n      V\n   Condition\n      |\n  True/False\n   /      \\\nTrue      False\n |           |\nExecute    Exit\nStatements\n |\nUpdate\n |\nBack to Condition</pre></div>'
      }
    ],
    order_index: 6,
    estimated_hours: 8,
    topics: [
      topic('c-p6-t1', 'while Loop', 'Entry-controlled repetition.', 1, 'Easy', 25),
      topic('c-p6-t2', 'do-while Loop', 'Exit-controlled repetition.', 2, 'Easy', 25),
      topic('c-p6-t3', 'for Loop', 'Counter-controlled repetition.', 3, 'Easy', 25),
      topic('c-p6-t4', 'Nested Loops', 'Loops inside other loops.', 4, 'Medium', 30),
      topic('c-p6-t5', 'break Statement', 'Exiting a loop early.', 5, 'Easy', 20),
      topic('c-p6-t6', 'continue Statement', 'Skipping to the next iteration.', 6, 'Easy', 20),
      topic('c-p6-t7', 'Infinite Loops', 'Creating and controlling loops that do not stop automatically.', 7, 'Medium', 25),
      topic('c-p6-t8', 'Loop Optimization Techniques', 'Writing loops that stay clear and efficient.', 8, 'Hard', 35),
    ],
  },
  {
    id: 'c-phase-7',
    course_id: 'c-programming',
    title: 'Functions - Basics',
    description: 'Creating reusable code blocks to organize and simplify your programs.',
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">As programs become larger, writing all code inside the <code>main()</code> function becomes difficult to manage.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Consider a program that performs:</p><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mt-2"><li>Addition</li><li>Subtraction</li><li>Multiplication</li><li>Division</li><li>Printing Results</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300">Writing everything inside <code>main()</code> makes the program lengthy, difficult to read, and hard to maintain.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">To solve this problem, C provides <strong>Functions</strong>.<br><br>A function is a block of code designed to perform a specific task.</p><p class="mt-4 text-gray-700 dark:text-gray-300">Functions help divide a large program into smaller, manageable parts.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3>'
      },
      {
        type: 'example',
        content_text: '#include <stdio.h>\n\nvoid display()\n{\n    printf("Welcome to C Programming");\n}\n\nint main()\n{\n    display();\n\n    return 0;\n}'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\nOutput:\n\nWelcome to C Programming'
      },
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Here:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li><code>display()</code> is a function.</li><li>It performs the task of displaying a message.</li><li>The function can be called whenever needed.</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300">According to the PDF, a C program consists of functions and variables. Functions specify the tasks performed by the program, and the <code>main()</code> function controls the overall execution of the program.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Functions are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Functions:</h4><pre class="text-sm text-red-600 dark:text-red-300 font-mono">printf("Addition Result");\nprintf("Addition Result");\nprintf("Addition Result");\nprintf("Addition Result");</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Functions:</h4><pre class="text-sm text-green-600 dark:text-green-300 font-mono">displayResult();\ndisplayResult();\ndisplayResult();\ndisplayResult();</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Benefits:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Reduces code repetition</li><li>Improves readability</li><li>Easier debugging</li><li>Better maintenance</li><li>Supports modular programming</li><li>Makes large programs manageable</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a function as a machine.</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\nInput\n  |\n  V\nFunction\n  |\n  V\nOutput'
      },
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\nNumbers\n   |\nAddition Function\n   |\nResult'
      }
    ],
    order_index: 7,
    estimated_hours: 8,
    topics: [
      topic('c-p7-t1', 'Introduction to Functions', 'Why functions matter in structured programs.', 1, 'Easy', 20),
      topic('c-p7-t2', 'Function Declaration and Definition', 'Syntax and structure of reusable behavior.', 2, 'Easy', 25),
      topic('c-p7-t3', 'Function Calling', 'Invoking functions and passing arguments.', 3, 'Easy', 20),
      topic('c-p7-t4', 'Return Statement', 'Returning values and exiting functions cleanly.', 4, 'Easy', 20),
      topic('c-p7-t5', 'Function Parameters', 'Formal parameters and actual arguments.', 5, 'Medium', 25),
      topic('c-p7-t6', 'Pass by Value', 'How C passes arguments into functions.', 6, 'Medium', 30),
      topic('c-p7-t7', 'Function Prototypes', 'Forward declarations and compile-time checks.', 7, 'Medium', 25),
      topic('c-p7-t8', 'void Functions', 'Functions that return no value.', 8, 'Easy', 20),
    ],
  },
  {
    id: 'c-phase-8',
    course_id: 'c-programming',
    title: 'Functions - Advanced',
    description: 'Recursion, scope, storage classes, and advanced function concepts.',
    order_index: 8,
    estimated_hours: 9,
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In Phase 7, we learned how to create functions, pass parameters, return values, and organize programs using modular programming.</p><p class="mt-4 text-gray-700 dark:text-gray-300">However, large real-world programs require more advanced function concepts such as:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Recursion</li><li>Variable Scope</li><li>Storage Classes</li><li>Static Variables</li><li>Inline Functions</li><li>Variable-Length Argument Lists</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">These advanced concepts help programmers:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Write efficient programs</li><li>Manage memory effectively</li><li>Control variable visibility</li><li>Optimize execution speed</li><li>Build reusable and scalable software</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">Functions are one of the most powerful features of C because they allow programmers to divide complex problems into smaller and manageable tasks.</p><p class="mt-4 text-gray-700 dark:text-gray-300 mb-6">Functions form the core structure of C programs and support modular programming through parameters, return values, local variables, and advanced memory management features.</p>'
      }
    ],
    topics: [
      topic('c-p8-t1', 'Recursion Fundamentals', 'Functions that call themselves with a base case.', 1, 'Medium', 30),
      topic('c-p8-t2', 'Recursive vs Iterative', 'Choosing recursion or loops for a problem.', 2, 'Medium', 30),
      topic('c-p8-t3', 'Variable Scope', 'Local, global, and block scope.', 3, 'Medium', 25),
      topic('c-p8-t4', 'Storage Classes', 'auto, register, static, and extern.', 4, 'Hard', 35),
      topic('c-p8-t5', 'Static Variables in Functions', 'Persistent local variables.', 5, 'Medium', 30),
      topic('c-p8-t6', 'Inline Functions', 'Inlining for performance and readability tradeoffs.', 6, 'Hard', 30),
      topic('c-p8-t7', 'Variable-Length Argument Lists', 'va_list, va_start, va_arg, and va_end.', 7, 'Hard', 40),
    ],
  },
  {
    id: 'c-phase-9',
    course_id: 'c-programming',
    title: 'Arrays - Basics',
    description: 'One-dimensional and multi-dimensional arrays.',
    order_index: 9,
    estimated_hours: 8,
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In programming, there are many situations where we need to store a large amount of similar data.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">For example:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Marks of 100 students</li><li>Temperature of 30 days</li><li>Salaries of 500 employees</li><li>Scores of players in a game</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">Without arrays, we would need separate variables for each value.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p>'
      },
      {
        type: 'example',
        content_text: 'int mark1;\nint mark2;\nint mark3;\nint mark4;\nint mark5;'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Imagine storing marks for 100 students using 100 different variables. This would make programs lengthy, difficult to manage, and error-prone.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">To solve this problem, C provides <strong>Arrays</strong>.<br><br>An array is a collection of elements of the same data type stored in contiguous memory locations.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3>'
      },
      {
        type: 'example',
        content_text: 'int marks[5];'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Here:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li><code class="text-blue-600 dark:text-blue-400 font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">marks</code> is the array name</li><li><code class="text-blue-600 dark:text-blue-400 font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">5</code> is the array size</li><li>It can store 5 integer values</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300">According to the PDF, arrays allow multiple values of the same type to be stored using a single variable name, and array indexing in C starts from 0.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Arrays are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Array</h4><pre class="text-sm text-red-600 dark:text-red-300 font-mono">int mark1 = 85;\nint mark2 = 90;\nint mark3 = 75;\nint mark4 = 80;\nint mark5 = 95;</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Array</h4><pre class="text-sm text-green-600 dark:text-green-300 font-mono">int marks[5] = {85,90,75,80,95};</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Reduces code length</li><li>Easy data management</li><li>Efficient memory usage</li><li>Simplifies processing using loops</li><li>Improves program readability</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of an array as a row of lockers.</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\n+----+----+----+----+----+\n| 85 | 90 | 75 | 80 | 95 |\n+----+----+----+----+----+\n  0    1    2    3    4'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Each locker:</p><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6"><li>Stores one value</li><li>Has an index number</li><li>Can be accessed individually</li></ul>'
      }
    ],
    topics: [
      topic('c-p9-t1', 'Introduction to Arrays', 'Why arrays are useful and how they group data.', 1, 'Easy', 20),
      topic('c-p9-t2', 'Array Declaration and Initialization', 'Creating arrays and giving them starting values.', 2, 'Easy', 25),
      topic('c-p9-t3', 'Accessing Array Elements', 'Indexing and bounds awareness.', 3, 'Easy', 20),
      topic('c-p9-t4', 'Array Input and Output', 'Reading and displaying array values.', 4, 'Easy', 25),
      topic('c-p9-t5', 'Multi-Dimensional Arrays', '2D and 3D arrays.', 5, 'Medium', 30),
      topic('c-p9-t6', 'Arrays and Functions', 'Passing arrays into functions.', 6, 'Medium', 30),
      topic('c-p9-t7', 'Array Operations', 'Searching, sorting, inserting, and reversing.', 7, 'Medium', 35),
      topic('c-p9-t8', 'Common Array Algorithms', 'Patterns such as linear search and bubble sort.', 8, 'Medium', 40),
    ],
  },
  {
    id: 'c-phase-10',
    course_id: 'c-programming',
    title: 'Strings',
    description: 'String handling, manipulation, and standard library functions.',
    order_index: 10,
    estimated_hours: 8,
    intro_content: [
      {
        type: 'explanation',
        content_text: '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In programming, we often work with textual data such as:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Names</li><li>Addresses</li><li>Messages</li><li>Passwords</li><li>Email IDs</li><li>Sentences</li></ul><p class="mt-6 text-gray-700 dark:text-gray-300">A single character can be stored using the <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">char</code> data type.</p><p class="mt-4 font-bold text-gray-900 dark:text-white">Example:</p><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-gray-800 dark:text-gray-200 text-sm border border-gray-200 dark:border-gray-700 w-fit">char grade = \'A\';</pre>'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">But what if we want to store:</p><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 text-sm w-fit">BALU</pre><p class="mt-2 text-gray-700 dark:text-gray-300">or</p><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 text-sm w-fit">Welcome to C Programming</pre><p class="mt-4 text-gray-700 dark:text-gray-300">A single <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">char</code> variable cannot store multiple characters.</p><p class="mt-4 text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">To solve this problem, C provides <strong>Strings</strong>.<br><br>A string is a collection of characters stored in a character array and terminated by a special character called the null character (\\0).</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Example:</h3><pre class="font-mono mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-gray-800 dark:text-gray-200 text-sm border border-gray-200 dark:border-gray-700 w-fit">char name[] = "BALU";</pre>'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">Memory Representation:</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\n+---+---+---+---+---+\n| B | A | L | U |\\0 |\n+---+---+---+---+---+'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">The null character (\\0) marks the end of the string.</p><p class="mt-4 text-gray-700 dark:text-gray-300">According to the PDF, strings in C are represented as arrays of characters terminated by a null character (\\0) and are manipulated using functions available in the <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">string.h</code> library.</p><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Strings are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Strings</h4><pre class="text-sm text-red-600 dark:text-red-300 font-mono">char ch1 = \'H\';\nchar ch2 = \'E\';\nchar ch3 = \'L\';\nchar ch4 = \'L\';\nchar ch5 = \'O\';</pre></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Strings</h4><pre class="text-sm text-green-600 dark:text-green-300 font-mono">char word[] = "HELLO";</pre></div></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages:</h3><ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300"><li>Easy storage of text</li><li>Efficient processing</li><li>Easy input and output</li><li>Supports text manipulation</li><li>Reduces code complexity</li></ul><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a string as a train.</p>'
      },
      {
        type: 'example',
        content_text: '// [CODE_ONLY]\n+---+---+---+---+----+\n| H | E | L | L | O  |\n+---+---+---+---+----+\n  0   1   2   3   4'
      },
      {
        type: 'explanation',
        content_text: '<p class="mt-4 font-bold text-gray-900 dark:text-white">Each character occupies one position.</p>'
      }
    ],
    topics: [
      topic('c-p10-t1', 'Introduction to Strings', 'Character arrays as null-terminated strings.', 1, 'Easy', 20),
      topic('c-p10-t2', 'String Declaration and Initialization', 'Creating string variables.', 2, 'Easy', 20),
      topic('c-p10-t3', 'String Input and Output', 'Reading and printing strings safely.', 3, 'Easy', 25),
      topic('c-p10-t4', 'String Library Functions', 'strlen, strcpy, strcat, strcmp, and friends.', 4, 'Medium', 30),
      topic('c-p10-t5', 'String Manipulation', 'Reversing, concatenating, and comparing strings.', 5, 'Medium', 30),
      topic('c-p10-t6', 'Array of Strings', 'Two-dimensional character arrays and lists of text.', 6, 'Medium', 30),
      topic('c-p10-t7', 'String Tokenization', 'Breaking strings with strtok().', 7, 'Hard', 35),
      topic('c-p10-t8', 'String Conversion Functions', 'atoi, atof, and similar conversions.', 8, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-11',
    course_id: 'c-programming',
    title: 'Pointers - Fundamentals',
    description: 'Introduction to pointers, addresses, and dereferencing.',
    order_index: 11,
    estimated_hours: 10,
    intro_content: [
      {
        type: 'text',
        content_text: 'So far, we have learned how to store data using variables, arrays, strings, and functions. Consider the following variable:'
      },
      {
        type: 'syntax',
        content_text: 'int num = 10;'
      },
      {
        type: 'text',
        content_text: 'The value <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">10</code> is stored somewhere in computer memory. Every variable stored in memory has a **value** and a **memory address**.'
      },
      {
        type: 'code',
        content_text: '// Memory Representation\nVariable    Value    Address\n--------    -----    -------\nnum          10      1000'
      },
      {
        type: 'text',
        content_text: 'The address may vary from system to system. Normally, we work with values. Example:'
      },
      {
        type: 'syntax',
        content_text: 'printf("%d", num); // Output: 10'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why work with memory addresses?</h3><p class="text-gray-700 dark:text-gray-300">Sometimes programmers need to work directly with memory addresses for:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li>Dynamic Memory Allocation</li><li>Arrays and Strings</li><li>Functions (Pass by Reference)</li><li>Data Structures</li><li>Operating Systems and Embedded Systems</li></ul>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What is a Pointer?</h3><p class="text-gray-700 dark:text-gray-300">To work with memory addresses, C provides Pointers. A <strong class="text-blue-600 dark:text-blue-400">pointer</strong> is a variable that stores the memory address of another variable.</p>'
      },
      {
        type: 'syntax',
        content_text: 'int num = 10;\nint *ptr = &num;'
      },
      {
        type: 'text',
        content_text: '<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><ul class="space-y-2 text-gray-700 dark:text-gray-300"><li><code class="font-bold">num</code> stores value 10</li><li><code class="font-bold text-blue-600 dark:text-blue-400">&amp;num</code> gives the address of num</li><li><code class="font-bold text-purple-600 dark:text-purple-400">ptr</code> stores that address</li></ul></div>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Pointers are Needed</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800"><h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Without Pointer</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">int num = 10;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">We can access only the value.</p></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-700 dark:text-green-400 mb-2">With Pointer</h4><pre class="text-sm font-mono text-gray-800 dark:text-gray-200">int *ptr = &amp;num;</pre><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">We can access both the Value of num and Address of num.</p></div></div>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Real-Life Example</h3><p class="text-gray-700 dark:text-gray-300">Think of a house. The <strong class="text-blue-600 dark:text-blue-400">House Number</strong> is the Address, and the <strong class="text-green-600 dark:text-green-400">Person</strong> living there is the Value.</p>'
      },
      {
        type: 'code',
        content_text: '// House analogy\nHouse Address : 1000\nPerson Name   : John'
      },
      {
        type: 'text',
        content_text: '<p class="mt-4 text-gray-700 dark:text-gray-300">A pointer stores <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">1000</code>, not <code class="font-bold bg-gray-100 dark:bg-gray-800 px-1 rounded">John</code>. Similarly, <code class="font-bold text-purple-600 dark:text-purple-400">ptr</code> stores the address of a variable, not the actual value.</p>'
      }
    ],
    topics: [
      topic('c-p11-t1', 'Introduction to Pointers', 'What pointers are and why they matter.', 1, 'Medium', 30),
      topic('c-p11-t2', 'Pointer Declaration', 'Declaring pointer variables.', 2, 'Medium', 25),
      topic('c-p11-t3', 'Address-of Operator (&)', 'Getting memory addresses.', 3, 'Medium', 25),
      topic('c-p11-t4', 'Dereference Operator (*)', 'Accessing values through pointers.', 4, 'Medium', 30),
      topic('c-p11-t5', 'Pointer Arithmetic', 'Moving through memory safely.', 5, 'Hard', 35),
      topic('c-p11-t6', 'NULL Pointers', 'Null pointer usage and checks.', 6, 'Medium', 25),
      topic('c-p11-t7', 'Pointers and Arrays', 'Relationship between arrays and pointers.', 7, 'Hard', 40),
      topic('c-p11-t8', 'Pointers and Functions', 'Pass by reference using pointers.', 8, 'Hard', 40),
    ],
  },
  {
    id: 'c-phase-12',
    course_id: 'c-programming',
    title: 'Pointers - Advanced',
    description: 'Double pointers, function pointers, and advanced pointer usage.',
    order_index: 12,
    estimated_hours: 10,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In Phase 11, we learned the fundamentals of pointers, including:</p><ul class="list-disc pl-6 space-y-1 mt-3 text-gray-700 dark:text-gray-300"><li>Pointer declaration</li><li>Address-of operator (<code class="font-mono font-bold text-blue-600 dark:text-blue-400">&amp;</code>)</li><li>Dereference operator (<code class="font-mono font-bold text-purple-600 dark:text-purple-400">*</code>)</li><li>Pointer arithmetic</li><li>Pointers and arrays</li><li>Pointers and functions</li></ul><p class="mt-4 text-gray-700 dark:text-gray-300">These concepts introduced the idea that pointers store memory addresses and provide direct access to memory.</p>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advanced Pointer Concepts</h3><p class="text-gray-700 dark:text-gray-300">However, advanced C programming requires more powerful pointer concepts such as:</p><div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"><div class="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-200 dark:border-blue-800 flex items-center gap-3"><span class="text-blue-600 dark:text-blue-400 font-bold font-mono">**</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Pointer to Pointer</span></div><div class="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center gap-3"><span class="text-purple-600 dark:text-purple-400 font-bold font-mono">[]</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Array of Pointers</span></div><div class="bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-200 dark:border-green-800 flex items-center gap-3"><span class="text-green-600 dark:text-green-400 font-bold font-mono">(*)</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Pointer to Array</span></div><div class="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center gap-3"><span class="text-orange-600 dark:text-orange-400 font-bold font-mono">fn*</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Function Pointers</span></div><div class="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-3"><span class="text-red-600 dark:text-red-400 font-bold font-mono">cb</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Callback Functions</span></div><div class="bg-teal-50 dark:bg-teal-900/10 p-3 rounded-xl border border-teal-200 dark:border-teal-800 flex items-center gap-3"><span class="text-teal-600 dark:text-teal-400 font-bold font-mono">void*</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Void Pointers</span></div><div class="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-3 md:col-span-2"><span class="text-indigo-600 dark:text-indigo-400 font-bold font-mono">const*</span><span class="text-gray-800 dark:text-gray-200 font-semibold">Const Pointers</span></div></div>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Where Are Advanced Pointers Used?</h3><p class="text-gray-700 dark:text-gray-300 mb-4">These advanced pointer concepts are widely used in:</p><div class="grid grid-cols-2 md:grid-cols-4 gap-3"><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🖥️ Operating Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">⚙️ Compilers</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🔌 Device Drivers</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">📟 Embedded Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🌳 Data Structures</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">💾 Dynamic Memory</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">📚 Library Development</p></div><div class="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-200 dark:border-blue-800 text-center"><p class="text-sm font-semibold text-blue-700 dark:text-blue-400">+ Much More</p></div></div>'
      },
      {
        type: 'text',
        content_text: '<div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mt-6"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2 text-lg">💡 Why This Phase Matters</h4><p class="text-gray-700 dark:text-gray-300">Pointers are often considered the most powerful feature of the C language because they allow <strong>direct manipulation of memory</strong> and provide flexibility unavailable in many other programming languages.</p><p class="text-gray-700 dark:text-gray-300 mt-3">Mastering advanced pointers will unlock your ability to write high-performance, low-level C programs used in real-world systems.</p></div>'
      }
    ],
    topics: [
      topic('c-p12-t1', 'Pointer to Pointer', 'Double pointers and multi-level indirection.', 1, 'Hard', 40),
      topic('c-p12-t2', 'Array of Pointers', 'Collections of pointer values.', 2, 'Hard', 35),
      topic('c-p12-t3', 'Pointer to Array', 'Pointers that reference entire arrays.', 3, 'Hard', 40),
      topic('c-p12-t4', 'Function Pointers', 'Pointers to functions.', 4, 'Hard', 45),
      topic('c-p12-t5', 'Callback Functions', 'Using function pointers for callbacks.', 5, 'Hard', 40),
      topic('c-p12-t6', 'void Pointers', 'Generic pointers and casting back safely.', 6, 'Hard', 35),
      topic('c-p12-t7', 'const Pointers', 'Constant pointers and pointers to constant data.', 7, 'Hard', 35),
    ],
  },
  {
    id: 'c-phase-13',
    course_id: 'c-programming',
    title: 'Structures and Unions',
    description: 'User-defined data types and composite records.',
    order_index: 13,
    estimated_hours: 9,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In C programming, variables such as <code class="font-mono text-blue-600 dark:text-blue-400">int</code>, <code class="font-mono text-blue-600 dark:text-blue-400">float</code>, and <code class="font-mono text-blue-600 dark:text-blue-400">char</code> can store only one type of data at a time. However, real-world applications often require storing different types of related information together.</p><p class="text-gray-700 dark:text-gray-300 mt-4">For example, consider a student:</p><ul class="list-disc pl-6 space-y-1 mt-2 text-gray-700 dark:text-gray-300"><li><strong class="text-gray-900 dark:text-white">Roll Number</strong> → Integer</li><li><strong class="text-gray-900 dark:text-white">Name</strong> → Character Array</li><li><strong class="text-gray-900 dark:text-white">Marks</strong> → Float</li></ul><p class="text-gray-700 dark:text-gray-300 mt-4">Instead of creating separate variables for each piece of information, C provides a powerful feature called a <strong class="text-blue-600 dark:text-blue-400">Structure</strong>.</p><div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-4"><p class="text-gray-800 dark:text-gray-200 font-semibold">A Structure allows us to combine multiple variables of different data types into a single unit.</p></div><p class="text-gray-700 dark:text-gray-300 mt-4">Another related feature is <strong class="text-purple-600 dark:text-purple-400">Union</strong>, which also groups different data types but shares the same memory location among all members.</p>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What You Will Learn</h3><ul class="space-y-2 mt-4 text-gray-700 dark:text-gray-300"><li>✅ Creating user-defined data types</li><li>✅ Organizing related data efficiently</li><li>✅ Working with arrays of records</li><li>✅ Passing structures to functions</li><li>✅ Using pointers with structures</li><li>✅ Understanding unions and memory optimization</li><li>✅ Using <code class="font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-1 rounded">typedef</code> for cleaner code</li></ul>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Where Are They Used?</h3><p class="text-gray-700 dark:text-gray-300 mb-4">These concepts are heavily used in:</p><div class="grid grid-cols-2 md:grid-cols-3 gap-3"><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🎓 Student Management Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">👥 Employee Databases</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🏦 Banking Applications</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">📦 Inventory Management Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🖥️ Operating Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">📟 Embedded Systems</p></div></div>'
      }
    ],
    topics: [
      topic('c-p13-t1', 'Introduction to Structures', 'Why structures matter in C program design.', 1, 'Medium', 25),
      topic('c-p13-t2', 'Structure Declaration and Definition', 'Creating structure types.', 2, 'Medium', 30),
      topic('c-p13-t3', 'Accessing Structure Members', 'Using the dot operator.', 3, 'Easy', 20),
      topic('c-p13-t4', 'Structure Initialization', 'Initializing structure variables.', 4, 'Medium', 25),
      topic('c-p13-t5', 'Nested Structures', 'Structures inside structures.', 5, 'Medium', 30),
      topic('c-p13-t6', 'Array of Structures', 'Collections of structure values.', 6, 'Medium', 30),
      topic('c-p13-t7', 'Pointers to Structures', 'Using the arrow operator.', 7, 'Medium', 30),
      topic('c-p13-t8', 'Structures and Functions', 'Passing structures to functions.', 8, 'Medium', 30),
      topic('c-p13-t9', 'Unions', 'Shared memory layout with union.', 9, 'Hard', 35),
      topic('c-p13-t10', 'typedef Keyword', 'Creating readable type aliases.', 10, 'Medium', 25),
    ],
  },
  {
    id: 'c-phase-14',
    course_id: 'c-programming',
    title: 'Dynamic Memory Allocation',
    description: 'Heap memory management with malloc, calloc, realloc, and free.',
    order_index: 14,
    estimated_hours: 9,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">In all previous phases, memory was allocated at compile time. For example:</p><pre class="mt-4 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded-lg text-gray-800 dark:text-gray-200">int arr[10];</pre><p class="text-gray-700 dark:text-gray-300 mt-4">Here, memory for 10 integers is fixed before the program starts. This is called <strong class="text-purple-600 dark:text-purple-400">Static Memory Allocation</strong>.</p><p class="text-gray-700 dark:text-gray-300 mt-4">However, in real-world applications, we often do not know how much memory is needed until the program is running.</p><div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-4"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Examples:</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Number of students in a college</li><li>Number of products in a store</li><li>Number of records in a database</li><li>Number of users connected to a server</li></ul></div><p class="text-gray-700 dark:text-gray-300 mt-4">To solve this problem, C provides <strong class="text-blue-600 dark:text-blue-400">Dynamic Memory Allocation (DMA)</strong>.</p><div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-4 border border-gray-200 dark:border-gray-700"><p class="text-gray-800 dark:text-gray-200 font-semibold">Dynamic Memory Allocation allows memory to be allocated during program execution (runtime).</p></div>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><p class="text-gray-700 dark:text-gray-300">Memory is allocated from a special area called the <strong class="text-green-600 dark:text-green-400">Heap</strong> using functions available in the header file:</p><pre class="mt-4 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded-lg text-gray-800 dark:text-gray-200">#include &lt;stdlib.h&gt;</pre><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-3">Important DMA Functions:</h4><div class="grid grid-cols-2 gap-3"><div class="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-200 dark:border-blue-800 text-center"><code class="font-mono font-bold text-blue-700 dark:text-blue-400">malloc()</code></div><div class="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-200 dark:border-purple-800 text-center"><code class="font-mono font-bold text-purple-700 dark:text-purple-400">calloc()</code></div><div class="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-200 dark:border-orange-800 text-center"><code class="font-mono font-bold text-orange-700 dark:text-orange-400">realloc()</code></div><div class="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-200 dark:border-red-800 text-center"><code class="font-mono font-bold text-red-700 dark:text-red-400">free()</code></div></div><p class="text-gray-700 dark:text-gray-300 mt-4">Phase 14 teaches how programs can request memory when needed, resize memory, and release memory after use.</p>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Applications of DMA</h3><div class="grid grid-cols-2 md:grid-cols-3 gap-3"><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">📊 Dynamic Arrays</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🔗 Linked Lists</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🥞 Stacks</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🚶 Queues</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🌳 Trees</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🕸️ Graphs</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🗄️ Databases</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">💻 Operating Systems</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🎮 Game Development</p></div></div><div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mt-6"><p class="text-gray-800 dark:text-gray-200 font-semibold">DMA is one of the most important concepts in C because it provides flexibility and efficient memory usage.</p></div>'
      }
    ],
    topics: [
      topic('c-p14-t1', 'Stack vs Heap Memory', 'Understanding memory regions.', 1, 'Medium', 30),
      topic('c-p14-t2', 'malloc() Function', 'Allocating memory dynamically.', 2, 'Medium', 30),
      topic('c-p14-t3', 'calloc() Function', 'Allocating and zero-initializing memory.', 3, 'Medium', 30),
      topic('c-p14-t4', 'realloc() Function', 'Resizing allocated memory.', 4, 'Hard', 35),
      topic('c-p14-t5', 'free() Function', 'Releasing heap memory.', 5, 'Medium', 25),
      topic('c-p14-t6', 'Memory Leaks', 'Identifying and preventing leaks.', 6, 'Hard', 35),
      topic('c-p14-t7', 'Dynamic Arrays', 'Creating arrays at runtime.', 7, 'Medium', 30),
      topic('c-p14-t8', 'Dynamic Structures', 'Allocating structures dynamically.', 8, 'Hard', 35),
    ],
  },
  {
    id: 'c-phase-15',
    course_id: 'c-programming',
    title: 'File Handling',
    description: 'Reading from and writing to files in C.',
    order_index: 15,
    estimated_hours: 8,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">So far in C programming, all data is stored in variables and arrays. The problem is that when a program terminates, all data stored in memory is lost.</p><pre class="mt-4 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded-lg text-gray-800 dark:text-gray-200">int marks = 95;</pre><p class="text-gray-700 dark:text-gray-300 mt-4">When the program ends, the value of marks disappears from memory.</p><p class="text-gray-700 dark:text-gray-300 mt-4">In many real-world applications, data must be stored permanently, even after the program is closed.</p><div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-4"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Examples:</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Student Records</li><li>Employee Information</li><li>Banking Transactions</li><li>Hospital Databases</li><li>Inventory Management Systems</li><li>Customer Information</li></ul></div><p class="text-gray-700 dark:text-gray-300 mt-4">To store data permanently, C provides <strong class="text-blue-600 dark:text-blue-400">File Handling</strong>.</p>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What is a File?</h3><p class="text-gray-700 dark:text-gray-300">A file is a collection of related data stored on secondary storage devices such as:</p><div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">💽 Hard Disk</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">⚡ SSD</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">💾 Pen Drive</p></div><div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200">🗂️ Memory Card</p></div></div><h4 class="font-bold text-gray-900 dark:text-white mt-8 mb-3">File Handling allows a program to:</h4><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Create files</li><li>Open files</li><li>Read data from files</li><li>Write data to files</li><li>Modify data</li><li>Delete data</li><li>Store information permanently</li></ul>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How It Works</h3><p class="text-gray-700 dark:text-gray-300">The file handling functions are available through:</p><pre class="mt-4 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded-lg text-gray-800 dark:text-gray-200">#include &lt;stdio.h&gt;</pre><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-3">Important functions used in File Handling:</h4><div class="grid grid-cols-2 md:grid-cols-4 gap-3"><div class="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-200 dark:border-blue-800 text-center"><code class="font-mono text-sm font-bold text-blue-700 dark:text-blue-400">fopen()</code></div><div class="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-200 dark:border-blue-800 text-center"><code class="font-mono text-sm font-bold text-blue-700 dark:text-blue-400">fclose()</code></div><div class="bg-green-50 dark:bg-green-900/10 p-2 rounded-lg border border-green-200 dark:border-green-800 text-center"><code class="font-mono text-sm font-bold text-green-700 dark:text-green-400">fprintf()</code></div><div class="bg-green-50 dark:bg-green-900/10 p-2 rounded-lg border border-green-200 dark:border-green-800 text-center"><code class="font-mono text-sm font-bold text-green-700 dark:text-green-400">fscanf()</code></div><div class="bg-purple-50 dark:bg-purple-900/10 p-2 rounded-lg border border-purple-200 dark:border-purple-800 text-center"><code class="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">fgetc()</code></div><div class="bg-purple-50 dark:bg-purple-900/10 p-2 rounded-lg border border-purple-200 dark:border-purple-800 text-center"><code class="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">fputc()</code></div><div class="bg-orange-50 dark:bg-orange-900/10 p-2 rounded-lg border border-orange-200 dark:border-orange-800 text-center"><code class="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">fgets()</code></div><div class="bg-orange-50 dark:bg-orange-900/10 p-2 rounded-lg border border-orange-200 dark:border-orange-800 text-center"><code class="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">fputs()</code></div><div class="bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border border-red-200 dark:border-red-800 text-center"><code class="font-mono text-sm font-bold text-red-700 dark:text-red-400">fread()</code></div><div class="bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border border-red-200 dark:border-red-800 text-center"><code class="font-mono text-sm font-bold text-red-700 dark:text-red-400">fwrite()</code></div><div class="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center"><code class="font-mono text-sm font-bold text-indigo-700 dark:text-indigo-400">fseek()</code></div><div class="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center"><code class="font-mono text-sm font-bold text-indigo-700 dark:text-indigo-400">ftell()</code></div><div class="bg-pink-50 dark:bg-pink-900/10 p-2 rounded-lg border border-pink-200 dark:border-pink-800 text-center col-span-2 md:col-span-1"><code class="font-mono text-sm font-bold text-pink-700 dark:text-pink-400">rewind()</code></div></div><div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mt-6"><p class="text-gray-800 dark:text-gray-200 font-semibold">File handling is one of the most important topics in C because almost every real-world application stores information in files.</p></div>'
      }
    ],
    topics: [
      topic('c-p15-t1', 'Introduction to File Handling', 'Why programs use files and common file types.', 1, 'Easy', 20),
      topic('c-p15-t2', 'Opening and Closing Files', 'fopen() and fclose().', 2, 'Medium', 25),
      topic('c-p15-t3', 'File Modes', 'r, w, a, r+, w+, and a+.', 3, 'Medium', 30),
      topic('c-p15-t4', 'Reading from Files', 'fgetc(), fgets(), and fscanf().', 4, 'Medium', 30),
      topic('c-p15-t5', 'Writing to Files', 'fputc(), fputs(), and fprintf().', 5, 'Medium', 30),
      topic('c-p15-t6', 'Binary File Operations', 'fread() and fwrite().', 6, 'Hard', 35),
      topic('c-p15-t7', 'File Positioning', 'fseek(), ftell(), and rewind().', 7, 'Hard', 35),
      topic('c-p15-t8', 'Error Handling in Files', 'feof(), ferror(), and perror().', 8, 'Medium', 30),
    ],
  },
  {
    id: 'c-phase-16',
    course_id: 'c-programming',
    title: 'Preprocessor Directives',
    description: 'Macros, conditional compilation, and preprocessing.',
    order_index: 16,
    estimated_hours: 7,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">Before a C program is compiled, it passes through a special stage called the <strong class="text-blue-600 dark:text-blue-400">Preprocessor</strong>.</p><p class="text-gray-700 dark:text-gray-300 mt-4">The Preprocessor is a program that processes source code before the actual compilation begins. Commands given to the preprocessor are called <strong>Preprocessor Directives</strong>. These directives begin with the <code class="font-mono font-bold text-pink-600 dark:text-pink-400">#</code> symbol.</p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-4"><h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Examples:</h4><pre class="font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2 rounded">#include &lt;stdio.h&gt;\n#define PI 3.14159</pre></div><h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Tasks Performed by Preprocessor</h3><ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300"><li>Including header files</li><li>Defining constants</li><li>Creating macros</li><li>Conditional compilation</li><li>Removing code sections</li><li>Compiler-specific instructions</li></ul>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Build Process</h3><div class="flex flex-col items-center space-y-2 mt-4 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800"><div class="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm shadow-sm">Source Code</div><div class="text-gray-400">↓</div><div class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm">Preprocessor</div><div class="text-gray-400">↓</div><div class="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm shadow-sm">Compiler</div><div class="text-gray-400">↓</div><div class="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm shadow-sm">Assembler</div><div class="text-gray-400">↓</div><div class="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm shadow-sm">Linker</div><div class="text-gray-400">↓</div><div class="bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm">Executable Program</div></div><p class="text-gray-700 dark:text-gray-300 mt-6">The preprocessor works before compilation and modifies the source code according to the directives used.</p>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Advantages & Common Directives</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-200 dark:border-purple-800"><h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Advantages</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Reduce code repetition</li><li>Improve readability</li><li>Simplify maintenance</li><li>Increase portability</li><li>Control compilation process</li></ul></div><div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800"><h4 class="font-bold text-green-800 dark:text-green-300 mb-2">Applications</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>System Programming</li><li>Embedded Systems</li><li>Operating Systems</li><li>Device Drivers</li><li>Large Software Projects</li></ul></div></div><h4 class="font-bold text-gray-900 dark:text-white mt-6 mb-3">Common directives:</h4><div class="flex flex-wrap gap-2"><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#include</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#define</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#undef</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#ifdef</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#ifndef</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#if</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#else</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#elif</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#endif</span><span class="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600">#pragma</span></div>'
      }
    ],
    topics: [
      topic('c-p16-t1', 'Introduction to Preprocessor', 'What preprocessing does before compilation.', 1, 'Medium', 25),
      topic('c-p16-t2', '#include Directive', 'Including header files.', 2, 'Easy', 20),
      topic('c-p16-t3', '#define Directive', 'Defining macros and constants.', 3, 'Medium', 30),
      topic('c-p16-t4', 'Macro Functions', 'Function-like macros.', 4, 'Hard', 35),
      topic('c-p16-t5', 'Conditional Compilation', '#if, #ifdef, #ifndef, and #endif.', 5, 'Hard', 35),
      topic('c-p16-t6', 'Predefined Macros', '__FILE__, __LINE__, __DATE__, and __TIME__.', 6, 'Medium', 25),
      topic('c-p16-t7', '#undef and #pragma', 'Undefining macros and compiler directives.', 7, 'Hard', 30),
    ],
  },
  {
    id: 'c-phase-17',
    course_id: 'c-programming',
    title: 'Advanced Topics',
    description: 'Command-line arguments, bit manipulation, and advanced C concepts.',
    order_index: 17,
    estimated_hours: 8,
    intro_content: [
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h3><p class="text-gray-700 dark:text-gray-300">By Phase 17, you have already learned the core concepts of C programming: Variables, Loops, Functions, Pointers, and Memory Allocation.</p><p class="text-gray-700 dark:text-gray-300 mt-4">Now it is time to learn advanced concepts that are widely used in professional software development, embedded systems, operating systems, device drivers, compilers, and system-level programming.</p><div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-6"><h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Phase 17 introduces powerful features that help programmers:</h4><ul class="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>Interact with the operating system</li><li>Work directly with memory bits</li><li>Optimize memory usage</li><li>Create large multi-file projects</li><li>Control variable access and storage</li><li>Build efficient and maintainable applications</li></ul></div>'
      },
      {
        type: 'text',
        content_text: '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Topics Covered</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">💻 Command-Line Arguments</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">🔢 Bit Manipulation</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">🧩 Bit Fields</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">📜 Advanced Enumerations</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">🔒 Type Qualifiers</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">⏳ Variable Scope & Lifetime</p></div><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 md:col-span-2"><p class="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">📁 Multi-File Programs</p></div></div><div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-800 rounded-xl p-5 mt-6"><p class="text-gray-800 dark:text-gray-200 font-semibold text-center">These topics represent the transition from beginner-level C programming to professional-level C programming.</p></div>'
      }
    ],
    topics: [
      topic('c-p17-t1', 'Command-Line Arguments', 'argc and argv parameters.', 1, 'Medium', 30),
      topic('c-p17-t2', 'Bit Manipulation Techniques', 'Setting, clearing, toggling, and testing bits.', 2, 'Hard', 40),
      topic('c-p17-t3', 'Bit Fields', 'Compact data storage inside structures.', 3, 'Hard', 35),
      topic('c-p17-t4', 'Enumerations Advanced', 'More expressive enum usage.', 4, 'Medium', 25),
      topic('c-p17-t5', 'Type Qualifiers', 'const, volatile, and restrict.', 5, 'Hard', 35),
      topic('c-p17-t6', 'Variable Scope and Lifetime', 'A deeper look at scope rules and storage duration.', 6, 'Hard', 35),
      topic('c-p17-t7', 'Multi-File Programs', 'Header files and separate compilation.', 7, 'Hard', 40),
    ],
  },
  {
    id: 'c-phase-18',
    course_id: 'c-programming',
    title: 'Best Practices and Projects',
    description: 'Coding standards, debugging, optimization, and capstone projects.',
    order_index: 18,
    estimated_hours: 10,
    topics: [
      topic('c-p18-t1', 'Coding Standards', 'Naming, formatting, and consistency.', 1, 'Easy', 25),
      topic('c-p18-t2', 'Debugging Techniques', 'printf debugging and debugger workflows.', 2, 'Medium', 35),
      topic('c-p18-t3', 'Common Programming Errors', 'Segmentation faults, overflows, and common mistakes.', 3, 'Hard', 40),
      topic('c-p18-t4', 'Code Optimization', 'Writing efficient and maintainable C code.', 4, 'Hard', 40),
      topic('c-p18-t5', 'Project: Calculator', 'Build a command-line calculator.', 5, 'Medium', 60),
      topic('c-p18-t6', 'Project: Student Management System', 'Build CRUD operations with structures and files.', 6, 'Hard', 90),
      topic('c-p18-t7', 'Project: Mini Text Editor', 'Build a text editing workflow with file handling.', 7, 'Hard', 90),
    ],
  },
];

const PHASES_BY_ID = new Map(C_PROGRAMMING_PHASES.map((phase) => [phase.id, phase]));

export const getFallbackPhase = (phaseId) => PHASES_BY_ID.get(phaseId);

const FLAT_TOPICS = C_PROGRAMMING_PHASES.flatMap((phase) =>
  phase.topics.map((entry) => ({
    ...entry,
    phase_id: phase.id,
    phase_title: phase.title,
    phase_description: phase.description,
  }))
);

const TOPICS_BY_ID = new Map(FLAT_TOPICS.map((entry) => [entry.id, entry]));

const buildBlocks = (topicId, sections) => [
  {
    id: `${topicId}-definition`,
    topic_id: topicId,
    content_type: 'definition',
    content_text: sections.definition,
    order_index: 1,
  },
  {
    id: `${topicId}-explanation`,
    topic_id: topicId,
    content_type: 'explanation',
    content_text: sections.explanation,
    order_index: 2,
  },
  {
    id: `${topicId}-syntax`,
    topic_id: topicId,
    content_type: 'syntax',
    content_text: sections.syntax,
    order_index: 3,
  },
  {
    id: `${topicId}-example`,
    topic_id: topicId,
    content_type: 'example',
    content_text: sections.example,
    order_index: 4,
  },
  {
    id: `${topicId}-notes`,
    topic_id: topicId,
    content_type: 'note',
    content_text: sections.notes,
    order_index: 5,
  },
  {
    id: `${topicId}-tip`,
    topic_id: topicId,
    content_type: 'tip',
    content_text: sections.tip,
    order_index: 6,
  },
];

const KIND_PATTERNS = [
  ['intro', /(what is c programming)/i],
  ['setup', /(setting up development environment)/i],
  ['structure', /(structure of a c program)/i],
  ['first_program', /(your first c program)/i],
  ['comments', /(comments and documentation)/i],
  ['compilation', /(compilation process)/i],
  ['data_types', /(basic data types|type modifiers|sizeof operator|type conversion and casting|enumeration types|type qualifiers|enumerations advanced)/i],
  ['variables', /(variable declaration and initialization|variable scope|variable scope and lifetime|storage classes|static variables in functions)/i],
  ['constants', /(constants and literals|#define directive|predefined macros|#undef and #pragma)/i],
  ['operators', /(operators|assignment|increment|decrement|bitwise|precedence|ternary)/i],
  ['io', /(printf|scanf|format specifiers|getchar|putchar|gets|puts|formatted output)/i],
  ['conditionals', /(if statement|if-else|else-if|switch statement|goto statement|conditional expressions in practice)/i],
  ['loops', /(while loop|do-while loop|for loop|nested loops|break statement|continue statement|infinite loops|loop optimization techniques)/i],
  ['functions', /(functions|function declaration|function calling|return statement|function parameters|pass by value|function prototypes|void functions|inline functions|argument lists)/i],
  ['recursion', /(recursion fundamentals|recursive vs iterative)/i],
  ['arrays', /(arrays|array declaration|array input|array operations|array algorithms|multi-dimensional arrays)/i],
  ['strings', /(strings|string declaration|string input|string library|string manipulation|string tokenization|string conversion)/i],
  ['pointers', /(pointer|address-of|dereference|null pointers|function pointers|callback functions|void pointers|const pointers)/i],
  ['structures', /(structures|unions|typedef keyword)/i],
  ['memory', /(stack vs heap|malloc|calloc|realloc|free|memory leaks|dynamic arrays|dynamic structures)/i],
  ['files', /(file handling|opening and closing files|file modes|reading from files|writing to files|binary file operations|file positioning|error handling in files)/i],
  ['preprocessor', /(preprocessor|#include directive|conditional compilation|macro functions)/i],
  ['advanced', /(command-line arguments|bit manipulation techniques|bit fields|multi-file programs)/i],
  ['best_practices', /(coding standards|debugging techniques|common programming errors|code optimization|project:)/i],
];

const inferKind = (title = '') => {
  const match = KIND_PATTERNS.find(([, pattern]) => pattern.test(title));
  return match ? match[0] : 'general';
};

const getSyntaxForTopic = (title, kind) => {
  switch (title) {
    case 'Structure of a C Program':
      return `#include <stdio.h>\n\nint main(void) {\n    printf("Program starts here.\\n");\n    return 0;\n}`;
    case 'Compilation Process':
      return `gcc -E main.c\ngcc -S main.c\ngcc -c main.c\ngcc main.c -o main`;
    case 'Conditional (Ternary) Operator':
      return `int smaller = (left < right) ? left : right;`;
    case 'scanf() Function':
      return `int value;\nscanf("%d", &value);\nprintf("%d\\n", value);`;
    case 'getchar() and putchar()':
      return `int ch = getchar();\nputchar(ch);`;
    case 'switch Statement':
      return `switch (choice) {\n    case 1:\n        printf("Add\\n");\n        break;\n    default:\n        printf("Unknown\\n");\n}`;
    case 'Function Prototypes':
      return `int add(int left, int right);\n\nint add(int left, int right) {\n    return left + right;\n}`;
    case 'Recursion Fundamentals':
      return `int sumToN(int n) {\n    if (n == 0) {\n        return 0;\n    }\n    return n + sumToN(n - 1);\n}`;
    case 'Function Pointers':
      return `int add(int left, int right) {\n    return left + right;\n}\n\nint (*operation)(int, int) = add;`;
    case 'Structure Declaration and Definition':
      return `struct Book {\n    char title[50];\n    int id;\n};`;
    case 'malloc() Function':
      return `int *numbers = malloc(5 * sizeof(int));\nif (numbers == NULL) {\n    return 1;\n}`;
    case 'Opening and Closing Files':
      return `FILE *file = fopen("report.txt", "w");\nif (file != NULL) {\n    fclose(file);\n}`;
    case '#define Directive':
      return `#define LIMIT 100\n#define SQUARE(x) ((x) * (x))`;
    case 'Command-Line Arguments':
      return `int main(int argc, char *argv[]) {\n    printf("%d\\n", argc);\n    return 0;\n}`;
    default:
      break;
  }

  const defaults = {
    setup: `gcc main.c -o main\n./main`,
    structure: `#include <stdio.h>\n\nint main(void) {\n    /* statements */\n    return 0;\n}`,
    comments: `// Single-line comment\n/* Multi-line\n   comment */`,
    data_types: `int count = 10;\nfloat average = 82.5f;\nchar grade = 'A';`,
    constants: `#define PI 3.14159\nconst int maxUsers = 50;`,
    operators: `int total = 12 + 8;\nint even = total % 2 == 0;`,
    io: `printf("Value: %d\\n", 42);\nscanf("%d", &value);`,
    conditionals: `if (score >= 50) {\n    printf("Pass\\n");\n} else {\n    printf("Retry\\n");\n}`,
    loops: `for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}`,
    functions: `int add(int left, int right) {\n    return left + right;\n}`,
    recursion: `int factorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}`,
    arrays: `int numbers[5] = {2, 4, 6, 8, 10};\nprintf("%d\\n", numbers[0]);`,
    strings: `char name[20] = "CS Studio";\nprintf("%s\\n", name);`,
    pointers: `int value = 5;\nint *ptr = &value;\nprintf("%d\\n", *ptr);`,
    structures: `struct Student {\n    char name[40];\n    int age;\n};`,
    memory: `int *buffer = malloc(5 * sizeof(int));\nfree(buffer);`,
    files: `FILE *file = fopen("report.txt", "w");\nfclose(file);`,
    preprocessor: `#include <stdio.h>\n#define LIMIT 10`,
    advanced: `int main(int argc, char *argv[]) {\n    printf("%d\\n", argc);\n    return 0;\n}`,
    best_practices: `/* Keep code small, clear, and testable. */\nint main(void) {\n    return 0;\n}`,
    general: `#include <stdio.h>\n\nint main(void) {\n    return 0;\n}`,
  };

  return defaults[kind] || defaults.general;
};

const getExampleForTopic = (title, kind) => {
  switch (title) {
    case 'What is C Programming?':
      return `#include <stdio.h>\n\nint main(void) {\n    printf("C is efficient, compiled, and close to the machine.\\n");\n    return 0;\n}`;
    case 'Your First C Program':
      return `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C learner!\\n");\n    return 0;\n}`;
    case 'Type Conversion and Casting':
      return `#include <stdio.h>\n\nint main(void) {\n    int total = 17;\n    int count = 5;\n    double average = (double)total / count;\n\n    printf("Average: %.2f\\n", average);\n    return 0;\n}`;
    case 'Format Specifiers':
      return `#include <stdio.h>\n\nint main(void) {\n    int count = 25;\n    double price = 149.75;\n    char grade = 'A';\n\n    printf("Count: %d\\n", count);\n    printf("Price: %.2f\\n", price);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}`;
    case 'switch Statement':
      return `#include <stdio.h>\n\nint main(void) {\n    int choice = 2;\n\n    switch (choice) {\n        case 1:\n            printf("Add\\n");\n            break;\n        case 2:\n            printf("Subtract\\n");\n            break;\n        default:\n            printf("Unknown\\n");\n    }\n\n    return 0;\n}`;
    case 'Arrays and Functions':
      return `#include <stdio.h>\n\nvoid printArray(int numbers[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf("%d ", numbers[i]);\n    }\n    printf("\\n");\n}\n\nint main(void) {\n    int values[] = {4, 8, 12, 16};\n    printArray(values, 4);\n    return 0;\n}`;
    case 'String Library Functions':
      return `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char text[20] = "Code";\n    strcat(text, " Lab");\n\n    printf("Length: %zu\\n", strlen(text));\n    printf("Text: %s\\n", text);\n    return 0;\n}`;
    case 'Pointer Arithmetic':
      return `#include <stdio.h>\n\nint main(void) {\n    int values[] = {10, 20, 30};\n    int *ptr = values;\n\n    printf("%d\\n", *ptr);\n    ptr++;\n    printf("%d\\n", *ptr);\n    return 0;\n}`;
    case 'Function Pointers':
      return `#include <stdio.h>\n\nint add(int left, int right) {\n    return left + right;\n}\n\nint main(void) {\n    int (*operation)(int, int) = add;\n    printf("%d\\n", operation(7, 5));\n    return 0;\n}`;
    case 'malloc() Function':
      return `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *values = malloc(3 * sizeof(int));\n    if (values == NULL) {\n        return 1;\n    }\n\n    values[0] = 5;\n    values[1] = 10;\n    values[2] = 15;\n\n    printf("%d\\n", values[0] + values[1] + values[2]);\n    free(values);\n    return 0;\n}`;
    case 'Opening and Closing Files':
      return `#include <stdio.h>\n\nint main(void) {\n    FILE *file = fopen("sample.txt", "w");\n    if (file == NULL) {\n        printf("Could not open file\\n");\n        return 1;\n    }\n\n    fprintf(file, "CS Studio\\n");\n    fclose(file);\n    printf("File saved\\n");\n    return 0;\n}`;
    case 'Conditional Compilation':
      return `#include <stdio.h>\n\n#define DEBUG_MODE\n\nint main(void) {\n#ifdef DEBUG_MODE\n    printf("Debug build\\n");\n#else\n    printf("Release build\\n");\n#endif\n    return 0;\n}`;
    case 'Command-Line Arguments':
      return `#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf("Argument count: %d\\n", argc);\n    if (argc > 1) {\n        printf("First argument: %s\\n", argv[1]);\n    }\n    return 0;\n}`;
    default:
      return `#include <stdio.h>\n\nint main(void) {\n    /* ${title} */\n    printf("Practice this C concept with a focused example.\\n");\n    return 0;\n}`;
  }
};

const buildDefinition = (entry, kind) => {
  const definitions = {
    intro: 'C is a compiled systems programming language built for speed, control, and careful reasoning about memory and data.',
    setup: `${entry.title} is about creating a reliable edit-compile-run workflow so every later lesson stays practical.`,
    structure: `${entry.title} explains how a valid C source file is organized around headers, main(), statements, and a return value.`,
    comments: `${entry.title} teaches how to explain intent clearly for human readers without changing program behavior.`,
    compilation: `${entry.title} focuses on the pipeline that transforms C source code into an executable program.`,
    data_types: `${entry.title} helps you choose and interpret data correctly so C stores and computes values safely.`,
    variables: `${entry.title} is about storing values with clear names, valid scope, and predictable lifetime.`,
    constants: `${entry.title} shows how to represent fixed meaning without scattering unexplained numbers through the code.`,
    operators: `${entry.title} teaches how C expressions combine values, types, and evaluation rules into results.`,
    io: `${entry.title} focuses on how C programs communicate through formatted input and output.`,
    conditionals: `${entry.title} teaches a branching tool that lets a program choose the correct path for the current state.`,
    loops: `${entry.title} is part of C's repetition toolkit for solving repeated work step by step.`,
    functions: `${entry.title} shows how to package behavior into reusable, testable blocks of code.`,
    recursion: `${entry.title} explores solving a problem by reducing it into a smaller version of itself.`,
    arrays: `${entry.title} is about storing related values in sequence and accessing them with precise indexing.`,
    strings: `${entry.title} explains how C represents text as null-terminated character arrays.`,
    pointers: `${entry.title} teaches how memory addresses are stored, passed, and dereferenced.`,
    structures: `${entry.title} introduces user-defined record types that group related values together.`,
    memory: `${entry.title} focuses on allocating, resizing, and releasing memory intentionally.`,
    files: `${entry.title} teaches how C programs persist data outside memory using files.`,
    preprocessor: `${entry.title} shows how source code is transformed before normal compilation begins.`,
    advanced: `${entry.title} extends your C skill into lower-level or larger-program scenarios.`,
    best_practices: `${entry.title} connects language knowledge to debugging discipline, code quality, and project delivery.`,
    general: `${entry.title} is a meaningful step in the C journey because it combines syntax, behavior, and careful reasoning.`,
  };

  return definitions[kind] || definitions.general;
};

const buildExplanation = (entry, kind) => {
  const phaseLead = `This topic belongs to ${entry.phase_title}, so the goal is to make the idea usable in a real C workflow, not only recognizable in theory.`;
  const explanations = {
    intro: `C remains one of the best languages for learning how software really behaves beneath high-level abstractions. You work with explicit types, direct memory ideas, and a visible compilation model, which is why C is still important in systems software, embedded programming, operating systems, and tooling.\n\n${phaseLead} Small details matter in C, so strong learning material should teach both the concept and the habit of being precise.`,
    setup: `A reliable environment changes the quality of the whole course. Once the compiler, editor, and terminal loop are working, you can focus on the lesson instead of fighting the tooling.\n\n${phaseLead} Practice the cycle of writing a small change, compiling, reading the feedback, and running the result. That routine is one of the most valuable skills a C learner can build early.`,
    structure: `C programs may look small, but the structure has meaning. Header files make declarations available, main() is the entry point, and every statement participates in a clear execution path.\n\n${phaseLead} Once the overall shape becomes familiar, later syntax feels less intimidating because you are adding detail to a known frame instead of starting from zero each time.`,
    comments: `Comments exist for people, not for the compiler. They help explain intent, assumptions, or tricky reasoning that would otherwise force a reader to reverse-engineer the code.\n\n${phaseLead} Use comments to support clarity, not to repeat obvious lines. Good documentation makes a C codebase easier to maintain and teach.`,
    compilation: `Compilation in C is a pipeline, not a single invisible event. Preprocessing handles directives, compilation checks and translates the source, assembly builds object code, and linking combines those pieces into a runnable program.\n\n${phaseLead} Understanding the stages helps you classify errors correctly, which is one reason C builds such strong debugging instincts.`,
    data_types: `Type selection in C is a real design decision. The chosen type affects memory usage, valid range, output formatting, and expression behavior.\n\n${phaseLead} Predicting results before running the code is a strong habit here because it turns types from vocabulary into working knowledge.`,
    variables: `Variables make C programs stateful. They hold data, change over time, and interact with scope and lifetime rules that influence both correctness and readability.\n\n${phaseLead} Use meaningful names, initialize values early, and pay attention to where the variable exists and when it stops existing.`,
    constants: `Constants improve readability because they replace unexplained values with named meaning. In C, that usually means choosing between const objects and preprocessor macros with care.\n\n${phaseLead} A clean codebase makes important values easy to find, understand, and trust.`,
    operators: `Operator lessons are where precision starts to matter a lot. The result of an expression depends on type, precedence, associativity, and sometimes side effects such as increment timing.\n\n${phaseLead} Slow tracing and careful parentheses are not signs of weakness here; they are part of learning C well.`,
    io: `Input and output work in C through explicit contracts. Format strings describe the data shape, and your arguments must match that shape exactly.\n\n${phaseLead} Care with specifiers, addresses, spacing, and newlines is part of professional-quality C programming.`,
    conditionals: `Branching lets a C program choose behavior based on the current facts. A good condition should read like a rule, and each branch should have an obvious purpose.\n\n${phaseLead} If the logic is hard to explain aloud, it is usually worth simplifying before the program grows.`,
    loops: `Loops turn repeated work into controlled logic. The key parts are the starting state, the update, and the stopping condition.\n\n${phaseLead} Trace the first few iterations deliberately. That single habit prevents many off-by-one and infinite-loop mistakes.`,
    functions: `Functions help you break a program into responsibilities. They reduce repetition, improve readability, and make later project work much easier to manage.\n\n${phaseLead} Good C functions have clear names, understandable parameters, and a simple contract for the caller.`,
    recursion: `Recursion works when a problem can be reduced into a smaller version of itself with a correct base case. That makes it elegant in the right situations, but only when you reason carefully about how the calls stop.\n\n${phaseLead} Compare recursive and iterative approaches honestly so you learn the tradeoff instead of memorizing a pattern.`,
    arrays: `Arrays are one of the core C structures because they store related values in contiguous memory. That makes them efficient and predictable, but also unforgiving when indexing goes wrong.\n\n${phaseLead} Track the valid range and pair arrays with careful loops and size reasoning.`,
    strings: `Strings in C are character arrays ending with a null terminator. That representation is simple and powerful, but it means you must think carefully about length, buffer capacity, and termination.\n\n${phaseLead} Treat string work as memory work and many later lessons will feel more coherent.`,
    pointers: `Pointers are central to C because they let programs work directly with memory addresses. They make dynamic memory, pass-by-reference patterns, and low-level data structures possible.\n\n${phaseLead} Pointer skill grows from patient tracing: what address is stored, what value lives there, and whether that address is still valid.`,
    structures: `Structures and unions let you model real concepts instead of scattering related values across independent variables. They are a major step toward more realistic program design in C.\n\n${phaseLead} Think about grouping fields into a record that matches the problem domain clearly.`,
    memory: `Dynamic memory topics are where disciplined C habits really matter. Allocation, resizing, and release all change the lifetime of data, so mistakes can lead to crashes, leaks, or silent corruption.\n\n${phaseLead} Strong memory practice means repeating the same safe checks until they become routine.`,
    files: `File handling makes C programs useful across runs because data can move outside RAM and into persistent storage. That adds power, but also introduces failure cases you must handle well.\n\n${phaseLead} Open carefully, check for errors, perform the intended operation, and close the file cleanly.`,
    preprocessor: `The preprocessor runs before compilation and can reshape source code through inclusion, substitution, and conditional logic. That makes it powerful, but also easy to misuse.\n\n${phaseLead} Prefer clear, simple macros and build rules over clever tricks.`,
    advanced: `Advanced C topics bring earlier lessons together. You are no longer only writing lines that compile; you are reasoning about representation, interfaces, and larger program structure.\n\n${phaseLead} Move slowly and keep your mental model explicit.`,
    best_practices: `The last stage of a C course should connect syntax knowledge to real engineering habits. Debugging, readability, testing, and project structure are what make earlier lessons useful in practice.\n\n${phaseLead} These topics show whether the fundamentals now work together as one system.`,
    general: `${entry.title} becomes easier when you study it as behavior, not only syntax. ${phaseLead}\n\nStart with one working example, trace it, and then make a small variation so the lesson becomes active skill.`,
  };

  return explanations[kind] || explanations.general;
};

const buildNotes = (kind) => {
  const noteSets = {
    intro: ['C teaches direct thinking about data, memory, and execution.', 'Compilation is part of the language workflow.', 'Small syntax details matter in C.', 'A strong C base helps later languages make more sense.'],
    setup: ['A stable toolchain removes learning friction.', 'Compile after small changes.', 'Read the first compiler error carefully.', 'A repeatable workflow saves time every lesson.'],
    data_types: ['Type choice affects range, formatting, and behavior.', 'Use the correct specifier for each type.', 'Casting should be intentional.', 'Predict results before running when you can.'],
    variables: ['Initialize values before first use.', 'Choose names that explain purpose.', 'Scope controls access.', 'Lifetime controls how long data remains valid.'],
    constants: ['Named constants improve clarity.', 'const and macros solve different problems.', 'Important fixed values should be easy to find.', 'Readable names beat magic numbers.'],
    operators: ['Expressions depend on precedence and type.', 'Side effects deserve extra attention.', 'Bitwise work is about binary representation.', 'Parentheses often improve clarity.'],
    io: ['Format strings must match the values involved.', 'scanf() usually needs addresses.', 'Exact output matters in validation.', 'Safer input habits are part of good C style.'],
    conditionals: ['Conditions should answer one clear question.', 'Each branch needs an obvious reason.', 'switch is best for discrete known cases.', 'Simpler branching is easier to test.'],
    loops: ['Every loop needs a clear stop rule.', 'Nested loops multiply work quickly.', 'Infinite loops require intentional control.', 'Readable loops are usually better than clever loops.'],
    functions: ['Functions should do one understandable job.', 'Prototypes help the compiler earlier.', 'Parameters shape the contract.', 'Return values should feel predictable.'],
    recursion: ['A recursive function needs a base case.', 'Each call should move toward the base case.', 'Recursion uses stack space.', 'Compare recursion with iteration for perspective.'],
    arrays: ['Arrays store related values contiguously.', 'Index boundaries matter every time.', 'Size should remain visible and trustworthy.', 'Loop tracing is the fastest way to debug array behavior.'],
    strings: ['C strings end with a null terminator.', 'Buffer size is part of correctness.', 'Library functions must be used carefully.', 'Many string bugs are memory bugs.'],
    pointers: ['A pointer stores an address, not the value itself.', 'Dereference only when the address is valid.', 'Pointer arithmetic depends on type.', 'Strong mental models prevent pointer bugs.'],
    structures: ['Structures group related data into one record.', 'Pointers to structures use the arrow operator.', 'typedef can improve readability.', 'Good structures help larger program design.'],
    memory: ['Heap memory must be managed deliberately.', 'Check allocation results before use.', 'free() should happen once at the right time.', 'Leaks are usually logic bugs.'],
    files: ['File operations should always check for failure.', 'The mode string changes what is allowed.', 'Close files to flush and release resources.', 'Choose functions that match the file format.'],
    preprocessor: ['Preprocessor directives run before compilation.', 'Macros are text substitution, not typed functions.', 'Conditional compilation controls build paths.', 'Use preprocessing for clarity, not obscurity.'],
    advanced: ['Advanced topics combine earlier ideas.', 'Representation details matter more here.', 'Larger C programs benefit from explicit structure.', 'Slow reasoning is part of expert C work.'],
    best_practices: ['Readable code is easier to debug.', 'Debugging is a method, not guesswork.', 'Common errors shrink when habits improve.', 'Projects prove whether the fundamentals really connect.'],
    general: ['Understand the idea before memorizing syntax.', 'Trace the program state line by line.', 'Keep the first example small and readable.', 'Use repetition to turn the lesson into skill.'],
  };

  return (noteSets[kind] || noteSets.general).join('\n');
};

const buildPracticeNotes = (entry, kind) => {
  const practiceSets = {
    setup: ['Verify the compiler before judging the lesson experience.', 'Type the build command yourself until it feels natural.', 'If a build fails, read before guessing.'],
    operators: ['Use temporary prints while learning complex expressions.', 'Add parentheses for clarity during practice.', 'Check whether side effects happen before or after the value is used.'],
    io: ['Match every format specifier to the exact type.', 'Remember that scanf() normally needs the variable address.', 'When output is checked exactly, spaces and newlines matter.'],
    loops: ['Print the loop counter while learning the pattern.', 'Trace the first, middle, and last iteration.', 'For nested loops, understand the inner loop first.'],
    functions: ['Write the function contract in words before code.', 'Keep the first version easy to call and test.', 'Check that caller and callee agree on meaning.'],
    arrays: ['Keep array length visible while you practice.', 'Start indexing examples at 0 on purpose.', 'Most array bugs come from one bad boundary decision.'],
    strings: ['Leave room for the null terminator.', 'Treat text as data in a character buffer.', 'Check how each library call changes the string content.'],
    pointers: ['Draw a small memory sketch when needed.', 'Name both the value and the pointer while learning.', 'Never dereference a pointer you have not reasoned about.'],
    memory: ['Use sizeof() instead of hardcoded byte counts.', 'Check for NULL immediately after allocation.', 'Decide who owns the memory before the code grows.'],
    files: ['Treat fopen() as a possible failure every time.', 'Read and write with the correct function for the format.', 'Close the file in the same logical flow where the work ends.'],
    preprocessor: ['Wrap macro arguments carefully.', 'Prefer readable macro names over clever ones.', 'Use conditional compilation to manage builds, not hide logic.'],
    best_practices: ['Refactor for clarity before optimizing aggressively.', 'When debugging, change one thing at a time.', 'Treat project lessons as proof of combined skill.'],
    general: [`Rewrite the core example from ${entry.title} once without looking.`, 'Change one value or branch and predict the new output.', 'Use the mastery challenge to prove the idea works in your hands.'],
  };

  return (practiceSets[kind] || practiceSets.general).join('\n');
};

const buildTopicSections = (entry) => {
  const kind = inferKind(entry.title);
  return {
    definition: buildDefinition(entry, kind),
    explanation: buildExplanation(entry, kind),
    syntax: getSyntaxForTopic(entry.title, kind),
    example: getExampleForTopic(entry.title, kind),
    notes: buildNotes(kind),
    tip: buildPracticeNotes(entry, kind),
  };
};

const buildLearningMeta = (entry) => {
  if (!entry) {
    return null;
  }

  const kind = inferKind(entry.title);
  const goalsByKind = {
    intro: ['Explain what C is good at', 'Name where it is used in practice', 'Connect C to systems-level thinking'],
    setup: ['Prepare the toolchain', 'Compile and run a program successfully', 'Build a repeatable workflow'],
    structure: ['Recognize the parts of a C file', 'Understand where execution starts', 'Read simple programs confidently'],
    data_types: ['Choose the right type', 'Predict how values behave', 'Format and convert data safely'],
    variables: ['Store values intentionally', 'Name data clearly', 'Use scope and lifetime correctly'],
    operators: ['Evaluate expressions correctly', 'Understand side effects', 'Read complex expressions safely'],
    io: ['Match types to format strings', 'Read or display values correctly', 'Control exact output shape'],
    conditionals: ['Read program decisions clearly', 'Test each branch', 'Use the right branching tool'],
    loops: ['Trace repetition step by step', 'Choose the right loop form', 'Avoid boundary mistakes'],
    functions: ['Break work into reusable units', 'Define clean function contracts', 'Pass and return data correctly'],
    recursion: ['Identify the base case', 'Follow recursive flow', 'Compare recursive and iterative approaches'],
    arrays: ['Store related values in order', 'Access indices safely', 'Combine loops with arrays correctly'],
    strings: ['Treat strings as character arrays', 'Use library helpers carefully', 'Protect buffer boundaries'],
    pointers: ['Separate address from value', 'Dereference safely', 'Connect pointers to arrays and functions'],
    structures: ['Model related data cleanly', 'Access members correctly', 'Pass structured data with intent'],
    memory: ['Allocate the right size', 'Check results carefully', 'Release memory at the right time'],
    files: ['Open files in the right mode', 'Read or write safely', 'Handle failure clearly'],
    preprocessor: ['Understand preprocessing intent', 'Use macros carefully', 'Control compilation paths cleanly'],
    advanced: ['Reason about larger program boundaries', 'Handle lower-level representation details', 'Connect advanced syntax to use cases'],
    best_practices: ['Write maintainable C code', 'Debug with a method', 'Combine lessons into complete results'],
    general: ['Understand the concept clearly', 'Apply it in working C code', 'Use it as a base for the next lesson'],
  };

  return {
    description: `${entry.title} helps you practice ${entry.description.toLowerCase()} inside a structured, end-to-end C learning path.`,
    goals: goalsByKind[kind] || goalsByKind.general,
    practiceHint: buildPracticeNotes(entry, kind).split('\n')[0],
    estimatedTime: `${entry.estimated_minutes} min`,
  };
};

export const isCProgrammingCourse = (courseId = '') => courseId === 'c' || courseId === 'c-programming' || courseId === 'c-lang';

export const getFallbackPhases = (courseId) =>
  isCProgrammingCourse(courseId)
    ? C_PROGRAMMING_PHASES.map(({ topics, ...phase }) => ({ ...phase }))
    : [];

export const getFallbackTopics = (phaseId) => {
  const phase = PHASES_BY_ID.get(phaseId);
  return phase ? phase.topics.map((entry) => ({ ...entry, phase_id: phase.id })) : [];
};

export const getFallbackTopicMetadata = (topicId) => TOPICS_BY_ID.get(topicId) || null;

export const getFallbackTopicLearningMeta = (topicId) => buildLearningMeta(getFallbackTopicMetadata(topicId));

export const hasFallbackTopicContent = (topicId) => TOPICS_BY_ID.has(topicId);

export const getFallbackTopicContent = (topicId) => {
  const entry = getFallbackTopicMetadata(topicId);
  if (!entry) return [];
  if (entry.content_blocks) return entry.content_blocks;
  return buildBlocks(topicId, buildTopicSections(entry));
};

export const cProgrammingPhaseHighlights = C_PROGRAMMING_PHASES.map((phase) => ({
  id: phase.id,
  title: `Phase ${phase.order_index}: ${phase.title}`,
  duration: `About ${phase.estimated_hours} focused study hours`,
  challengeTime: `Each lesson in ${phase.title} closes with a mastery task so learners prove the idea instead of only reading it.`,
}));
