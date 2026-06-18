const { supabase } = require('../config/supabase');

// ================================================
// COMPREHENSIVE C PROGRAMMING CURRICULUM
// 18 Phases | ~150 Topics | Quiz-Optimized
// ================================================

const C_PROGRAMMING_PHASES = [
    {
        id: 'c-phase-1',
        course_id: 'c-programming',
        title: 'Introduction to C Programming',
        description: 'Get started with C programming fundamentals, setup, and first programs',
        order_index: 1,
        estimated_hours: 6,
        topics: [
            { id: 'c-p1-t1', title: 'What is C Programming?', description: 'History, features, and applications of C', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p1-t2', title: 'Setting Up Development Environment', description: 'Installing compiler, IDE setup, first compilation', order_index: 2, difficulty: 'Easy', estimated_minutes: 30 },
            { id: 'c-p1-t3', title: 'Structure of a C Program', description: 'Understanding main(), headers, statements', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p1-t4', title: 'Your First C Program', description: 'Writing and running Hello World', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p1-t5', title: 'Comments and Documentation', description: 'Single-line, multi-line comments, best practices', order_index: 5, difficulty: 'Easy', estimated_minutes: 15 },
            { id: 'c-p1-t6', title: 'Compilation Process', description: 'Preprocessing, compilation, assembly, linking', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-2',
        course_id: 'c-programming',
        title: 'Data Types and Variables',
        description: 'Master C data types, variables, constants, and type conversions',
        order_index: 2,
        estimated_hours: 8,
        topics: [
            { id: 'c-p2-t1', title: 'Basic Data Types', description: 'int, float, double, char', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p2-t2', title: 'Variable Declaration and Initialization', description: 'Declaring, initializing, naming conventions', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p2-t3', title: 'Constants and Literals', description: 'const keyword, #define, literal types', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p2-t4', title: 'Type Modifiers', description: 'signed, unsigned, short, long', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p2-t5', title: 'sizeof Operator', description: 'Determining size of data types', order_index: 5, difficulty: 'Easy', estimated_minutes: 15 },
            { id: 'c-p2-t6', title: 'Type Conversion and Casting', description: 'Implicit and explicit type conversion', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p2-t7', title: 'Enumeration Types', description: 'enum keyword and usage', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 }
        ]
    },
    {
        id: 'c-phase-3',
        course_id: 'c-programming',
        title: 'Operators and Expressions',
        description: 'Learn all C operators and how to build complex expressions',
        order_index: 3,
        estimated_hours: 7,
        topics: [
            { id: 'c-p3-t1', title: 'Arithmetic Operators', description: '+, -, *, /, % operators', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p3-t2', title: 'Relational Operators', description: '==, !=, <, >, <=, >= operators', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p3-t3', title: 'Logical Operators', description: '&&, ||, ! operators', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p3-t4', title: 'Assignment Operators', description: '=, +=, -=, *=, /=, %= operators', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p3-t5', title: 'Increment and Decrement', description: '++, -- operators, prefix vs postfix', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p3-t6', title: 'Bitwise Operators', description: '&, |, ^, ~, <<, >> operators', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p3-t7', title: 'Conditional (Ternary) Operator', description: '?: operator usage', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
            { id: 'c-p3-t8', title: 'Operator Precedence and Associativity', description: 'Order of evaluation in expressions', order_index: 8, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-4',
        course_id: 'c-programming',
        title: 'Input and Output',
        description: 'Master console I/O operations with printf, scanf, and formatting',
        order_index: 4,
        estimated_hours: 6,
        topics: [
            { id: 'c-p4-t1', title: 'printf() Function', description: 'Basic output, format specifiers', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p4-t2', title: 'scanf() Function', description: 'Reading user input, format specifiers', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p4-t3', title: 'Format Specifiers', description: '%d, %f, %c, %s and more', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p4-t4', title: 'getchar() and putchar()', description: 'Character I/O functions', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p4-t5', title: 'gets() and puts()', description: 'String I/O functions', order_index: 5, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p4-t6', title: 'Formatted Output', description: 'Width, precision, alignment', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-5',
        course_id: 'c-programming',
        title: 'Control Flow - Decision Making',
        description: 'Conditional statements and decision-making structures',
        order_index: 5,
        estimated_hours: 7,
        topics: [
            { id: 'c-p5-t1', title: 'if Statement', description: 'Basic conditional execution', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p5-t2', title: 'if-else Statement', description: 'Two-way branching', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p5-t3', title: 'Nested if-else', description: 'Multiple levels of conditions', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p5-t4', title: 'else-if Ladder', description: 'Multiple condition checking', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p5-t5', title: 'switch Statement', description: 'Multi-way branching', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p5-t6', title: 'goto Statement', description: 'Unconditional jump (and why to avoid it)', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
            { id: 'c-p5-t7', title: 'Conditional Expressions in Practice', description: 'Real-world decision-making patterns', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-6',
        course_id: 'c-programming',
        title: 'Control Flow - Loops',
        description: 'Iteration and repetition using loops',
        order_index: 6,
        estimated_hours: 8,
        topics: [
            { id: 'c-p6-t1', title: 'while Loop', description: 'Entry-controlled loop', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p6-t2', title: 'do-while Loop', description: 'Exit-controlled loop', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p6-t3', title: 'for Loop', description: 'Counter-controlled loop', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p6-t4', title: 'Nested Loops', description: 'Loops within loops', order_index: 4, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p6-t5', title: 'break Statement', description: 'Exiting loops early', order_index: 5, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p6-t6', title: 'continue Statement', description: 'Skipping loop iterations', order_index: 6, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p6-t7', title: 'Infinite Loops', description: 'Creating and controlling infinite loops', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p6-t8', title: 'Loop Optimization Techniques', description: 'Writing efficient loops', order_index: 8, difficulty: 'Hard', estimated_minutes: 35 }
        ]
    },
    {
        id: 'c-phase-7',
        course_id: 'c-programming',
        title: 'Functions - Basics',
        description: 'Function declaration, definition, and calling',
        order_index: 7,
        estimated_hours: 8,
        topics: [
            { id: 'c-p7-t1', title: 'Introduction to Functions', description: 'Why use functions, benefits', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p7-t2', title: 'Function Declaration and Definition', description: 'Syntax and structure', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p7-t3', title: 'Function Calling', description: 'Invoking functions, arguments', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p7-t4', title: 'Return Statement', description: 'Returning values from functions', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p7-t5', title: 'Function Parameters', description: 'Formal vs actual parameters', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p7-t6', title: 'Pass by Value', description: 'How C passes arguments', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p7-t7', title: 'Function Prototypes', description: 'Forward declarations', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p7-t8', title: 'void Functions', description: 'Functions without return values', order_index: 8, difficulty: 'Easy', estimated_minutes: 20 }
        ]
    },
    {
        id: 'c-phase-8',
        course_id: 'c-programming',
        title: 'Functions - Advanced',
        description: 'Recursion, scope, storage classes, and advanced function concepts',
        order_index: 8,
        estimated_hours: 9,
        topics: [
            { id: 'c-p8-t1', title: 'Recursion Fundamentals', description: 'Understanding recursive functions', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p8-t2', title: 'Recursive vs Iterative', description: 'When to use recursion', order_index: 2, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p8-t3', title: 'Variable Scope', description: 'Local, global, block scope', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p8-t4', title: 'Storage Classes', description: 'auto, register, static, extern', order_index: 4, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p8-t5', title: 'Static Variables in Functions', description: 'Persistent local variables', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p8-t6', title: 'Inline Functions', description: 'Function inlining for performance', order_index: 6, difficulty: 'Hard', estimated_minutes: 30 },
            { id: 'c-p8-t7', title: 'Variable-Length Argument Lists', description: 'va_list, va_start, va_arg, va_end', order_index: 7, difficulty: 'Hard', estimated_minutes: 40 }
        ]
    },
    {
        id: 'c-phase-9',
        course_id: 'c-programming',
        title: 'Arrays - Basics',
        description: 'One-dimensional and multi-dimensional arrays',
        order_index: 9,
        estimated_hours: 8,
        topics: [
            { id: 'c-p9-t1', title: 'Introduction to Arrays', description: 'What are arrays, why use them', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p9-t2', title: 'Array Declaration and Initialization', description: 'Creating and initializing arrays', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p9-t3', title: 'Accessing Array Elements', description: 'Indexing, bounds checking', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p9-t4', title: 'Array Input and Output', description: 'Reading and displaying arrays', order_index: 4, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p9-t5', title: 'Multi-Dimensional Arrays', description: '2D, 3D arrays', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p9-t6', title: 'Arrays and Functions', description: 'Passing arrays to functions', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p9-t7', title: 'Array Operations', description: 'Searching, sorting, reversing', order_index: 7, difficulty: 'Medium', estimated_minutes: 35 },
            { id: 'c-p9-t8', title: 'Common Array Algorithms', description: 'Linear search, bubble sort', order_index: 8, difficulty: 'Medium', estimated_minutes: 40 }
        ]
    },
    {
        id: 'c-phase-10',
        course_id: 'c-programming',
        title: 'Strings',
        description: 'String handling, manipulation, and library functions',
        order_index: 10,
        estimated_hours: 8,
        topics: [
            { id: 'c-p10-t1', title: 'Introduction to Strings', description: 'Character arrays as strings', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p10-t2', title: 'String Declaration and Initialization', description: 'Creating string variables', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p10-t3', title: 'String Input and Output', description: 'Reading and printing strings', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p10-t4', title: 'String Library Functions', description: 'strlen, strcpy, strcat, strcmp', order_index: 4, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p10-t5', title: 'String Manipulation', description: 'Reversing, concatenating, comparing', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p10-t6', title: 'Array of Strings', description: '2D character arrays', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p10-t7', title: 'String Tokenization', description: 'strtok() function', order_index: 7, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p10-t8', title: 'String Conversion Functions', description: 'atoi, atof, itoa', order_index: 8, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-11',
        course_id: 'c-programming',
        title: 'Pointers - Fundamentals',
        description: 'Introduction to pointers, addressing, and dereferencing',
        order_index: 11,
        estimated_hours: 10,
        topics: [
            { id: 'c-p11-t1', title: 'Introduction to Pointers', description: 'What are pointers, why use them', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p11-t2', title: 'Pointer Declaration', description: 'Declaring pointer variables', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p11-t3', title: 'Address-of Operator (&)', description: 'Getting memory addresses', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p11-t4', title: 'Dereference Operator (*)', description: 'Accessing values through pointers', order_index: 4, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p11-t5', title: 'Pointer Arithmetic', description: 'Adding, subtracting pointers', order_index: 5, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p11-t6', title: 'NULL Pointers', description: 'Null pointer concept and usage', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p11-t7', title: 'Pointers and Arrays', description: 'Relationship between pointers and arrays', order_index: 7, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p11-t8', title: 'Pointers and Functions', description: 'Pass by reference using pointers', order_index: 8, difficulty: 'Hard', estimated_minutes: 40 }
        ]
    },
    {
        id: 'c-phase-12',
        course_id: 'c-programming',
        title: 'Pointers - Advanced',
        description: 'Pointer to pointer, function pointers, and complex pointer usage',
        order_index: 12,
        estimated_hours: 10,
        topics: [
            { id: 'c-p12-t1', title: 'Pointer to Pointer', description: 'Double pointers, multi-level indirection', order_index: 1, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p12-t2', title: 'Array of Pointers', description: 'Pointer arrays', order_index: 2, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p12-t3', title: 'Pointer to Array', description: 'Pointers pointing to entire arrays', order_index: 3, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p12-t4', title: 'Function Pointers', description: 'Pointers to functions', order_index: 4, difficulty: 'Hard', estimated_minutes: 45 },
            { id: 'c-p12-t5', title: 'Callback Functions', description: 'Using function pointers for callbacks', order_index: 5, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p12-t6', title: 'void Pointers', description: 'Generic pointers', order_index: 6, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p12-t7', title: 'const Pointers', description: 'Constant pointers and pointers to constants', order_index: 7, difficulty: 'Hard', estimated_minutes: 35 }
        ]
    },
    {
        id: 'c-phase-13',
        course_id: 'c-programming',
        title: 'Structures and Unions',
        description: 'User-defined data types and composite structures',
        order_index: 13,
        estimated_hours: 9,
        topics: [
            { id: 'c-p13-t1', title: 'Introduction to Structures', description: 'What are structures, why use them', order_index: 1, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p13-t2', title: 'Structure Declaration and Definition', description: 'Creating structure types', order_index: 2, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p13-t3', title: 'Accessing Structure Members', description: 'Dot operator usage', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p13-t4', title: 'Structure Initialization', description: 'Initializing structure variables', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p13-t5', title: 'Nested Structures', description: 'Structures within structures', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p13-t6', title: 'Array of Structures', description: 'Multiple structure variables', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p13-t7', title: 'Pointers to Structures', description: 'Arrow operator (->)', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p13-t8', title: 'Structures and Functions', description: 'Passing structures to functions', order_index: 8, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p13-t9', title: 'Unions', description: 'Union declaration and usage', order_index: 9, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p13-t10', title: 'typedef Keyword', description: 'Creating type aliases', order_index: 10, difficulty: 'Medium', estimated_minutes: 25 }
        ]
    },
    {
        id: 'c-phase-14',
        course_id: 'c-programming',
        title: 'Dynamic Memory Allocation',
        description: 'Heap memory management with malloc, calloc, realloc, free',
        order_index: 14,
        estimated_hours: 9,
        topics: [
            { id: 'c-p14-t1', title: 'Stack vs Heap Memory', description: 'Understanding memory regions', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p14-t2', title: 'malloc() Function', description: 'Allocating memory dynamically', order_index: 2, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p14-t3', title: 'calloc() Function', description: 'Allocating and initializing memory', order_index: 3, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p14-t4', title: 'realloc() Function', description: 'Resizing allocated memory', order_index: 4, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p14-t5', title: 'free() Function', description: 'Deallocating memory', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p14-t6', title: 'Memory Leaks', description: 'Identifying and preventing memory leaks', order_index: 6, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p14-t7', title: 'Dynamic Arrays', description: 'Creating arrays at runtime', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p14-t8', title: 'Dynamic Structures', description: 'Allocating structures dynamically', order_index: 8, difficulty: 'Hard', estimated_minutes: 35 }
        ]
    },
    {
        id: 'c-phase-15',
        course_id: 'c-programming',
        title: 'File Handling',
        description: 'Reading from and writing to files',
        order_index: 15,
        estimated_hours: 8,
        topics: [
            { id: 'c-p15-t1', title: 'Introduction to File Handling', description: 'Why use files, file types', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p15-t2', title: 'Opening and Closing Files', description: 'fopen(), fclose() functions', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p15-t3', title: 'File Modes', description: 'r, w, a, r+, w+, a+ modes', order_index: 3, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p15-t4', title: 'Reading from Files', description: 'fgetc(), fgets(), fscanf()', order_index: 4, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p15-t5', title: 'Writing to Files', description: 'fputc(), fputs(), fprintf()', order_index: 5, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p15-t6', title: 'Binary File Operations', description: 'fread(), fwrite()', order_index: 6, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p15-t7', title: 'File Positioning', description: 'fseek(), ftell(), rewind()', order_index: 7, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p15-t8', title: 'Error Handling in Files', description: 'feof(), ferror(), perror()', order_index: 8, difficulty: 'Medium', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-16',
        course_id: 'c-programming',
        title: 'Preprocessor Directives',
        description: 'Macros, conditional compilation, and preprocessor commands',
        order_index: 16,
        estimated_hours: 7,
        topics: [
            { id: 'c-p16-t1', title: 'Introduction to Preprocessor', description: 'What is preprocessing', order_index: 1, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p16-t2', title: '#include Directive', description: 'Including header files', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
            { id: 'c-p16-t3', title: '#define Directive', description: 'Defining macros and constants', order_index: 3, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p16-t4', title: 'Macro Functions', description: 'Function-like macros', order_index: 4, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p16-t5', title: 'Conditional Compilation', description: '#if, #ifdef, #ifndef, #endif', order_index: 5, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p16-t6', title: 'Predefined Macros', description: '__FILE__, __LINE__, __DATE__, __TIME__', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p16-t7', title: '#undef and #pragma', description: 'Undefining macros, compiler directives', order_index: 7, difficulty: 'Hard', estimated_minutes: 30 }
        ]
    },
    {
        id: 'c-phase-17',
        course_id: 'c-programming',
        title: 'Advanced Topics',
        description: 'Command-line arguments, bit manipulation, and advanced concepts',
        order_index: 17,
        estimated_hours: 8,
        topics: [
            { id: 'c-p17-t1', title: 'Command-Line Arguments', description: 'argc, argv parameters', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
            { id: 'c-p17-t2', title: 'Bit Manipulation Techniques', description: 'Setting, clearing, toggling bits', order_index: 2, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p17-t3', title: 'Bit Fields', description: 'Compact data storage', order_index: 3, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p17-t4', title: 'Enumerations Advanced', description: 'Complex enum usage', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
            { id: 'c-p17-t5', title: 'Type Qualifiers', description: 'const, volatile, restrict', order_index: 5, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p17-t6', title: 'Variable Scope and Lifetime', description: 'Deep dive into scope rules', order_index: 6, difficulty: 'Hard', estimated_minutes: 35 },
            { id: 'c-p17-t7', title: 'Multi-File Programs', description: 'Header files, separate compilation', order_index: 7, difficulty: 'Hard', estimated_minutes: 40 }
        ]
    },
    {
        id: 'c-phase-18',
        course_id: 'c-programming',
        title: 'Best Practices and Projects',
        description: 'Coding standards, debugging, and capstone projects',
        order_index: 18,
        estimated_hours: 10,
        topics: [
            { id: 'c-p18-t1', title: 'Coding Standards', description: 'Naming conventions, formatting', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
            { id: 'c-p18-t2', title: 'Debugging Techniques', description: 'Using debuggers, printf debugging', order_index: 2, difficulty: 'Medium', estimated_minutes: 35 },
            { id: 'c-p18-t3', title: 'Common Programming Errors', description: 'Segmentation faults, buffer overflows', order_index: 3, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p18-t4', title: 'Code Optimization', description: 'Writing efficient C code', order_index: 4, difficulty: 'Hard', estimated_minutes: 40 },
            { id: 'c-p18-t5', title: 'Project: Calculator', description: 'Build a command-line calculator', order_index: 5, difficulty: 'Medium', estimated_minutes: 60 },
            { id: 'c-p18-t6', title: 'Project: Student Management System', description: 'CRUD operations with files', order_index: 6, difficulty: 'Hard', estimated_minutes: 90 },
            { id: 'c-p18-t7', title: 'Project: Mini Text Editor', description: 'File manipulation project', order_index: 7, difficulty: 'Hard', estimated_minutes: 90 }
        ]
    }
];

async function seedCProgrammingPhases() {
    console.log('🌱 Seeding C Programming Phases and Topics...\n');

    let stats = {
        phasesAdded: 0,
        topicsAdded: 0,
        errors: 0
    };

    for (const phase of C_PROGRAMMING_PHASES) {
        try {
            console.log(`\n📚 Phase ${phase.order_index}: ${phase.title}`);

            // Extract topics before inserting phase
            const topics = phase.topics;
            delete phase.topics;

            // Check if phase exists
            const { data: existingPhase } = await supabase
                .from('phases')
                .select('id')
                .eq('id', phase.id)
                .single();

            if (existingPhase) {
                console.log(`  ⚠️  Phase already exists, skipping...`);
                continue;
            }

            // Insert phase
            const { error: phaseError } = await supabase
                .from('phases')
                .insert(phase);

            if (phaseError) {
                console.error(`  ❌ Phase error:`, phaseError.message);
                stats.errors++;
                continue;
            }

            console.log(`  ✅ Phase added`);
            stats.phasesAdded++;

            // Insert topics
            console.log(`  📝 Adding ${topics.length} topics...`);
            for (const topic of topics) {
                topic.phase_id = phase.id;

                const { error: topicError } = await supabase
                    .from('topics')
                    .insert(topic);

                if (topicError) {
                    console.error(`    ❌ Topic error (${topic.title}):`, topicError.message);
                    stats.errors++;
                } else {
                    console.log(`    ✅ ${topic.title}`);
                    stats.topicsAdded++;
                }
            }

        } catch (error) {
            console.error(`  ❌ Unexpected error:`, error.message);
            stats.errors++;
        }
    }

    console.log('\n========================================');
    console.log('✨ C Programming Seeding Complete!');
    console.log('========================================');
    console.log(`Phases Added: ${stats.phasesAdded}`);
    console.log(`Topics Added: ${stats.topicsAdded}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================================\n');

    console.log('📊 Summary:');
    console.log(`  • Total Phases: 18`);
    console.log(`  • Total Topics: ~150`);
    console.log(`  • Estimated Hours: ~140 hours`);
    console.log(`  • Quiz-optimized structure ready\n`);

    process.exit(0);
}

seedCProgrammingPhases();
