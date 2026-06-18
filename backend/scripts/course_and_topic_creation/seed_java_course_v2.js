const { supabase } = require('../config/supabase');

const COURSE_ID = 'java-programming';

const PHASES = [
  {
    id: 'java-p1',
    course_id: COURSE_ID,
    title: 'Java Introduction',
    description: 'Understand what Java is, how it works, and set up your first Java environment.',
    order_index: 1,
    estimated_hours: 8,
    topics: [
      { id: 'java-p1-t1', title: 'What is Java?', description: 'History, features, and applications of Java.', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p1-t2', title: 'History of Java', description: 'Evolution from Oak to modern Java releases.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p1-t3', title: 'Features of Java', description: 'Platform independence, OOP, security, and more.', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p1-t4', title: 'Applications of Java', description: 'Where Java is used in industry today.', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p1-t5', title: 'JDK', description: 'Java Development Kit — tools for building Java programs.', order_index: 5, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p1-t6', title: 'JRE', description: 'Java Runtime Environment — running Java programs.', order_index: 6, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p1-t7', title: 'JVM', description: 'Java Virtual Machine — the heart of Java portability.', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p1-t8', title: 'Java Installation', description: 'Installing JDK and setting up the environment.', order_index: 8, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p1-t9', title: 'IDE Setup', description: 'Configuring IntelliJ IDEA, VS Code, or Eclipse.', order_index: 9, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p1-t10', title: 'First Java Program', description: 'Writing, compiling, and running your first Java application.', order_index: 10, difficulty: 'Easy', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p2',
    course_id: COURSE_ID,
    title: 'Java Fundamentals',
    description: 'Master variables, data types, operators, input, and comments in Java.',
    order_index: 2,
    estimated_hours: 8,
    topics: [
      { id: 'java-p2-t1', title: 'Variables', description: 'Declaring, initializing, and using variables in Java.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p2-t2', title: 'Data Types', description: 'Primitive and reference types in Java.', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p2-t3', title: 'Literals', description: 'Integer, floating-point, character, string, and boolean literals.', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p2-t4', title: 'Type Casting', description: 'Widening and narrowing conversions in Java.', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p2-t5', title: 'Operators', description: 'Arithmetic, relational, logical, assignment, and bitwise operators.', order_index: 5, difficulty: 'Easy', estimated_minutes: 30 },
      { id: 'java-p2-t6', title: 'User Input', description: 'Reading input using Scanner class.', order_index: 6, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p2-t7', title: 'Comments', description: 'Single-line, multi-line, and documentation comments.', order_index: 7, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p2-t8', title: 'Keywords', description: 'Reserved words in Java and their usage.', order_index: 8, difficulty: 'Easy', estimated_minutes: 15 },
    ],
  },
  {
    id: 'java-p3',
    course_id: COURSE_ID,
    title: 'Control Flow',
    description: 'Learn decision-making and loops to control program execution flow.',
    order_index: 3,
    estimated_hours: 8,
    topics: [
      { id: 'java-p3-t1', title: 'if Statement', description: 'Conditional execution with if.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p3-t2', title: 'if-else Statement', description: 'Two-way branching with if-else.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p3-t3', title: 'Nested if', description: 'Multiple levels of conditional checks.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p3-t4', title: 'Switch Statement', description: 'Multi-way branching with switch.', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p3-t5', title: 'Ternary Operator', description: 'Compact conditional expressions.', order_index: 5, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p3-t6', title: 'for Loop', description: 'Counter-controlled iteration.', order_index: 6, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p3-t7', title: 'while Loop', description: 'Condition-controlled iteration.', order_index: 7, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p3-t8', title: 'do-while Loop', description: 'Exit-controlled loop.', order_index: 8, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p3-t9', title: 'break Statement', description: 'Exiting loops and switch cases early.', order_index: 9, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p3-t10', title: 'continue Statement', description: 'Skipping iterations in loops.', order_index: 10, difficulty: 'Easy', estimated_minutes: 15 },
    ],
  },
  {
    id: 'java-p4',
    course_id: COURSE_ID,
    title: 'Methods and Arrays',
    description: 'Create reusable methods and work with arrays of data.',
    order_index: 4,
    estimated_hours: 8,
    topics: [
      { id: 'java-p4-t1', title: 'Methods', description: 'Defining and calling methods in Java.', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p4-t2', title: 'Parameters', description: 'Passing data to methods.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p4-t3', title: 'Return Types', description: 'Returning values from methods.', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p4-t4', title: 'Method Overloading', description: 'Multiple methods with the same name.', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p4-t5', title: 'Arrays', description: 'Declaring and using arrays.', order_index: 5, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p4-t6', title: 'Multi-Dimensional Arrays', description: 'Arrays of arrays in Java.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p4-t7', title: 'Enhanced for Loop', description: 'Simplified array traversal.', order_index: 7, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p4-t8', title: 'Array Utilities', description: 'java.util.Arrays class methods.', order_index: 8, difficulty: 'Medium', estimated_minutes: 20 },
    ],
  },
  {
    id: 'java-p5',
    course_id: COURSE_ID,
    title: 'OOP Fundamentals',
    description: 'Master object-oriented programming basics in Java.',
    order_index: 5,
    estimated_hours: 10,
    topics: [
      { id: 'java-p5-t1', title: 'Classes', description: 'Defining classes as blueprints for objects.', order_index: 1, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p5-t2', title: 'Objects', description: 'Creating and using objects in Java.', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p5-t3', title: 'Constructors', description: 'Initializing objects with constructors.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p5-t4', title: 'this Keyword', description: 'Referring to the current instance.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p5-t5', title: 'static Keyword', description: 'Class-level members and methods.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p5-t6', title: 'Instance Variables', description: 'Object-level state management.', order_index: 6, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p5-t7', title: 'Local Variables', description: 'Scope and lifetime within methods.', order_index: 7, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p5-t8', title: 'Access Modifiers', description: 'public, private, protected, and default access.', order_index: 8, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p6',
    course_id: COURSE_ID,
    title: 'Advanced OOP',
    description: 'Deep dive into inheritance, polymorphism, abstraction, and interfaces.',
    order_index: 6,
    estimated_hours: 10,
    topics: [
      { id: 'java-p6-t1', title: 'Encapsulation', description: 'Data hiding and getters/setters.', order_index: 1, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p6-t2', title: 'Inheritance', description: 'Extending classes in Java.', order_index: 2, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p6-t3', title: 'Method Overriding', description: 'Runtime polymorphism through overriding.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p6-t4', title: 'Polymorphism', description: 'Compile-time and runtime polymorphism.', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p6-t5', title: 'Abstraction', description: 'Hiding implementation details.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p6-t6', title: 'Interfaces', description: 'Defining contracts with interfaces.', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p6-t7', title: 'Abstract Classes', description: 'Partial abstraction with abstract classes.', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p6-t8', title: 'Object Class', description: 'The root of the Java class hierarchy.', order_index: 8, difficulty: 'Medium', estimated_minutes: 20 },
    ],
  },
  {
    id: 'java-p7',
    course_id: COURSE_ID,
    title: 'String Handling',
    description: 'Master Java String manipulation, StringBuilder, and text processing.',
    order_index: 7,
    estimated_hours: 8,
    topics: [
      { id: 'java-p7-t1', title: 'String Class', description: 'Creating and using strings in Java.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p7-t2', title: 'String Methods', description: 'Common String operations and methods.', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p7-t3', title: 'StringBuilder', description: 'Mutable string handling.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p7-t4', title: 'StringBuffer', description: 'Thread-safe mutable strings.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p7-t5', title: 'String Comparison', description: 'equals(), compareTo(), and == behavior.', order_index: 5, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p7-t6', title: 'String Formatting', description: 'Formatting strings with String.format().', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p7-t7', title: 'Regular Expressions', description: 'Pattern matching with regex in Java.', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 },
    ],
  },
  {
    id: 'java-p8',
    course_id: COURSE_ID,
    title: 'Exception Handling',
    description: 'Handle errors gracefully with Java exception handling.',
    order_index: 8,
    estimated_hours: 8,
    topics: [
      { id: 'java-p8-t1', title: 'Exception Basics', description: 'What are exceptions and why they matter.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p8-t2', title: 'try-catch Block', description: 'Catching and handling exceptions.', order_index: 2, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p8-t3', title: 'finally Block', description: 'Cleanup code that always executes.', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p8-t4', title: 'throw Keyword', description: 'Throwing exceptions explicitly.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p8-t5', title: 'throws Keyword', description: 'Declaring exceptions in method signatures.', order_index: 5, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p8-t6', title: 'Custom Exceptions', description: 'Creating your own exception classes.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p8-t7', title: 'Exception Hierarchy', description: 'Checked vs unchecked exceptions.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
    ],
  },
  {
    id: 'java-p9',
    course_id: COURSE_ID,
    title: 'Packages and Java APIs',
    description: 'Organize code with packages and leverage built-in Java APIs.',
    order_index: 9,
    estimated_hours: 8,
    topics: [
      { id: 'java-p9-t1', title: 'Packages', description: 'Organizing classes with packages.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p9-t2', title: 'Import Statements', description: 'Using classes from other packages.', order_index: 2, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p9-t3', title: 'Wrapper Classes', description: 'Integer, Double, Boolean and other wrappers.', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p9-t4', title: 'Math Class', description: 'Mathematical operations with java.lang.Math.', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p9-t5', title: 'Random Class', description: 'Generating random numbers.', order_index: 5, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p9-t6', title: 'Date and Time API', description: 'Working with dates in modern Java.', order_index: 6, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p9-t7', title: 'Utility Classes', description: 'Arrays, Objects, and Collections utility classes.', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p10',
    course_id: COURSE_ID,
    title: 'Collections Framework',
    description: 'Master Java collections for efficient data management.',
    order_index: 10,
    estimated_hours: 12,
    topics: [
      { id: 'java-p10-t1', title: 'Collections Overview', description: 'Framework architecture and core interfaces.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p10-t2', title: 'List Interface', description: 'Ordered collections and their implementations.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p10-t3', title: 'ArrayList', description: 'Dynamic array-based list.', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p10-t4', title: 'LinkedList', description: 'Doubly-linked list implementation.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t5', title: 'Vector and Stack', description: 'Legacy synchronized collections.', order_index: 5, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t6', title: 'Set Interface', description: 'Unordered unique elements.', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t7', title: 'HashSet', description: 'Hash-based set implementation.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t8', title: 'LinkedHashSet', description: 'Ordered hash set.', order_index: 8, difficulty: 'Medium', estimated_minutes: 15 },
      { id: 'java-p10-t9', title: 'TreeSet', description: 'Sorted set implementation.', order_index: 9, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t10', title: 'Queue Interface', description: 'FIFO collections.', order_index: 10, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t11', title: 'PriorityQueue', description: 'Priority-based queue.', order_index: 11, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t12', title: 'Map Interface', description: 'Key-value pair collections.', order_index: 12, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t13', title: 'HashMap', description: 'Hash-based map implementation.', order_index: 13, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t14', title: 'LinkedHashMap', description: 'Ordered hash map.', order_index: 14, difficulty: 'Medium', estimated_minutes: 15 },
      { id: 'java-p10-t15', title: 'TreeMap', description: 'Sorted map implementation.', order_index: 15, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t16', title: 'Iterators', description: 'Traversing collections.', order_index: 16, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p10-t17', title: 'Comparable vs Comparator', description: 'Sorting and ordering in collections.', order_index: 17, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p10-t18', title: 'Collections Utility', description: 'Sorting, searching, and utility methods.', order_index: 18, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p11',
    course_id: COURSE_ID,
    title: 'File Handling',
    description: 'Master file I/O operations in Java.',
    order_index: 11,
    estimated_hours: 10,
    topics: [
      { id: 'java-p11-t1', title: 'File Class', description: 'Working with file paths and properties.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p11-t2', title: 'Scanner with Files', description: 'Reading files with Scanner.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p11-t3', title: 'FileInputStream', description: 'Reading binary files.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p11-t4', title: 'FileOutputStream', description: 'Writing binary files.', order_index: 4, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p11-t5', title: 'BufferedInputStream', description: 'Efficient binary reading.', order_index: 5, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p11-t6', title: 'BufferedOutputStream', description: 'Efficient binary writing.', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p11-t7', title: 'BufferedReader', description: 'Efficient text file reading.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p11-t8', title: 'BufferedWriter', description: 'Efficient text file writing.', order_index: 8, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p11-t9', title: 'Serialization', description: 'Converting objects to byte streams.', order_index: 9, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p11-t10', title: 'Deserialization', description: 'Reconstructing objects from byte streams.', order_index: 10, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p11-t11', title: 'NIO Basics', description: 'Modern Java I/O with NIO.', order_index: 11, difficulty: 'Hard', estimated_minutes: 30 },
    ],
  },
  {
    id: 'java-p12',
    course_id: COURSE_ID,
    title: 'Multithreading and Concurrency',
    description: 'Learn parallel programming and thread management in Java.',
    order_index: 12,
    estimated_hours: 10,
    topics: [
      { id: 'java-p12-t1', title: 'Thread Basics', description: 'What are threads and why use them.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p12-t2', title: 'Thread Lifecycle', description: 'States of a thread from birth to death.', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p12-t3', title: 'Runnable Interface', description: 'Creating threads with Runnable.', order_index: 3, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p12-t4', title: 'Thread Class', description: 'Extending the Thread class.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p12-t5', title: 'Synchronization', description: 'Thread safety with synchronized blocks.', order_index: 5, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p12-t6', title: 'Deadlocks', description: 'Detecting and avoiding deadlock situations.', order_index: 6, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p12-t7', title: 'Executor Framework', description: 'Managing thread pools.', order_index: 7, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p12-t8', title: 'Callable and Future', description: 'Getting results from threads.', order_index: 8, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p12-t9', title: 'Concurrent Collections', description: 'Thread-safe data structures.', order_index: 9, difficulty: 'Hard', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p13',
    course_id: COURSE_ID,
    title: 'Advanced Java',
    description: 'Generics, enums, annotations, reflection, and modern Java features.',
    order_index: 13,
    estimated_hours: 10,
    topics: [
      { id: 'java-p13-t1', title: 'Generics', description: 'Type-safe programming with generics.', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p13-t2', title: 'Enums', description: 'Type-safe enumerated constants.', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p13-t3', title: 'Annotations', description: 'Metadata for Java code.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p13-t4', title: 'Reflection API', description: 'Inspecting classes at runtime.', order_index: 4, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p13-t5', title: 'Inner Classes', description: 'Classes defined inside other classes.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p13-t6', title: 'Nested Classes', description: 'Static nested classes.', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p13-t7', title: 'Functional Interfaces', description: 'Single abstract method interfaces.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p13-t8', title: 'Records', description: 'Data carrier classes in Java 14+.', order_index: 8, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p13-t9', title: 'Sealed Classes', description: 'Restricted class hierarchies (Java 17+).', order_index: 9, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p13-t10', title: 'var Keyword', description: 'Local variable type inference.', order_index: 10, difficulty: 'Easy', estimated_minutes: 15 },
    ],
  },
  {
    id: 'java-p14',
    course_id: COURSE_ID,
    title: 'Java 8+ Features',
    description: 'Lambdas, streams, optionals, and functional programming in Java.',
    order_index: 14,
    estimated_hours: 10,
    topics: [
      { id: 'java-p14-t1', title: 'Lambda Expressions', description: 'Functional programming with lambdas.', order_index: 1, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p14-t2', title: 'Method References', description: 'Short form for lambda expressions.', order_index: 2, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p14-t3', title: 'Streams API', description: 'Processing collections declaratively.', order_index: 3, difficulty: 'Hard', estimated_minutes: 35 },
      { id: 'java-p14-t4', title: 'Parallel Streams', description: 'Leveraging multi-core processors.', order_index: 4, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p14-t5', title: 'Collectors', description: 'Accumulating stream results.', order_index: 5, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p14-t6', title: 'Optional', description: 'Avoiding null pointer exceptions.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p14-t7', title: 'Predicate', description: 'Functional boolean evaluation.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p14-t8', title: 'Consumer', description: 'Functional data consumption.', order_index: 8, difficulty: 'Medium', estimated_minutes: 15 },
      { id: 'java-p14-t9', title: 'Supplier', description: 'Functional data supply.', order_index: 9, difficulty: 'Medium', estimated_minutes: 15 },
      { id: 'java-p14-t10', title: 'Function Interface', description: 'Functional transformations.', order_index: 10, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p14-t11', title: 'Date Time API', description: 'Modern date/time handling (java.time).', order_index: 11, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p15',
    course_id: COURSE_ID,
    title: 'SQL Fundamentals',
    description: 'Master database concepts and SQL for backend development.',
    order_index: 15,
    estimated_hours: 10,
    topics: [
      { id: 'java-p15-t1', title: 'Database Concepts', description: 'Understanding databases and DBMS.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p15-t2', title: 'DBMS vs RDBMS', description: 'Relational database management systems.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p15-t3', title: 'MySQL Installation', description: 'Setting up MySQL.', order_index: 3, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p15-t4', title: 'Tables', description: 'Creating and managing database tables.', order_index: 4, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p15-t5', title: 'Constraints', description: 'Primary keys, foreign keys, unique, and not null.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p15-t6', title: 'CRUD Operations', description: 'INSERT, SELECT, UPDATE, DELETE.', order_index: 6, difficulty: 'Easy', estimated_minutes: 25 },
      { id: 'java-p15-t7', title: 'Joins', description: 'INNER, LEFT, RIGHT, and FULL OUTER JOINs.', order_index: 7, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p15-t8', title: 'GROUP BY and HAVING', description: 'Aggregating data with grouping.', order_index: 8, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p15-t9', title: 'ORDER BY', description: 'Sorting query results.', order_index: 9, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p15-t10', title: 'Aggregate Functions', description: 'COUNT, SUM, AVG, MIN, MAX.', order_index: 10, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p15-t11', title: 'Subqueries', description: 'Nested queries for complex data retrieval.', order_index: 11, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p15-t12', title: 'Views', description: 'Virtual tables for simplified queries.', order_index: 12, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p15-t13', title: 'Indexes', description: 'Optimizing query performance.', order_index: 13, difficulty: 'Medium', estimated_minutes: 20 },
    ],
  },
  {
    id: 'java-p16',
    course_id: COURSE_ID,
    title: 'JDBC',
    description: 'Connect Java applications to databases using JDBC.',
    order_index: 16,
    estimated_hours: 10,
    topics: [
      { id: 'java-p16-t1', title: 'JDBC Architecture', description: 'Understanding JDBC driver types and architecture.', order_index: 1, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p16-t2', title: 'Database Connectivity', description: 'Establishing connections to databases.', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p16-t3', title: 'DriverManager', description: 'Managing database drivers.', order_index: 3, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p16-t4', title: 'Connection', description: 'Managing database connections.', order_index: 4, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p16-t5', title: 'Statement', description: 'Executing SQL queries.', order_index: 5, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p16-t6', title: 'PreparedStatement', description: 'Parameterized queries for security and performance.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p16-t7', title: 'ResultSet', description: 'Processing query results.', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p16-t8', title: 'Transactions', description: 'ACID properties and transaction management.', order_index: 8, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p16-t9', title: 'Batch Processing', description: 'Executing multiple queries efficiently.', order_index: 9, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p16-t10', title: 'Connection Pooling', description: 'Managing connection lifecycles at scale.', order_index: 10, difficulty: 'Hard', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p17',
    course_id: COURSE_ID,
    title: 'Git and GitHub',
    description: 'Version control, collaboration, and professional development workflows.',
    order_index: 17,
    estimated_hours: 8,
    topics: [
      { id: 'java-p17-t1', title: 'Version Control', description: 'Why version control matters.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p17-t2', title: 'Git Installation', description: 'Setting up Git on your machine.', order_index: 2, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p17-t3', title: 'Repository', description: 'Initializing and cloning repositories.', order_index: 3, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p17-t4', title: 'Commit', description: 'Saving changes with commits.', order_index: 4, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p17-t5', title: 'Branch', description: 'Working with branches for parallel development.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p17-t6', title: 'Merge', description: 'Integrating changes from different branches.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p17-t7', title: 'Rebase', description: 'Reapplying commits on top of another base.', order_index: 7, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p17-t8', title: 'Pull Request', description: 'Code review and collaboration workflow.', order_index: 8, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p17-t9', title: 'GitHub Workflow', description: 'Professional development with GitHub.', order_index: 9, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p17-t10', title: 'Collaboration', description: 'Forking, cloning, and contributing to projects.', order_index: 10, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p18',
    course_id: COURSE_ID,
    title: 'Spring Framework',
    description: 'Enterprise-grade Java development with Spring.',
    order_index: 18,
    estimated_hours: 10,
    topics: [
      { id: 'java-p18-t1', title: 'Spring Introduction', description: 'Overview of the Spring ecosystem.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p18-t2', title: 'IoC Container', description: 'Inversion of Control fundamentals.', order_index: 2, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p18-t3', title: 'Dependency Injection', description: 'Wiring beans with DI.', order_index: 3, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p18-t4', title: 'Spring Beans', description: 'Bean definition and scopes.', order_index: 4, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p18-t5', title: 'Bean Lifecycle', description: 'Initialization and destruction callbacks.', order_index: 5, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p18-t6', title: 'Java Configuration', description: '@Configuration and @Bean annotations.', order_index: 6, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p18-t7', title: 'Component Scanning', description: 'Auto-detection of Spring components.', order_index: 7, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p18-t8', title: 'Spring MVC', description: 'Building web applications with Spring MVC.', order_index: 8, difficulty: 'Hard', estimated_minutes: 35 },
      { id: 'java-p18-t9', title: 'Validation', description: 'Input validation in Spring applications.', order_index: 9, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p19',
    course_id: COURSE_ID,
    title: 'Spring Boot',
    description: 'Rapid application development with Spring Boot.',
    order_index: 19,
    estimated_hours: 10,
    topics: [
      { id: 'java-p19-t1', title: 'Spring Boot Introduction', description: 'Simplifying Spring development.', order_index: 1, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p19-t2', title: 'Starter Projects', description: 'Dependency management with starters.', order_index: 2, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p19-t3', title: 'Auto-Configuration', description: 'How Spring Boot configures itself.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p19-t4', title: 'REST APIs', description: 'Building RESTful web services.', order_index: 4, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p19-t5', title: 'Request Mapping', description: 'Mapping HTTP requests to handlers.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p19-t6', title: 'Validation', description: 'Request validation in Spring Boot.', order_index: 6, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p19-t7', title: 'Exception Handling', description: 'Global error handling in REST APIs.', order_index: 7, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p19-t8', title: 'Logging', description: 'Logging with SLF4J and Logback.', order_index: 8, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p19-t9', title: 'Configuration Properties', description: 'Externalized configuration.', order_index: 9, difficulty: 'Medium', estimated_minutes: 20 },
    ],
  },
  {
    id: 'java-p20',
    course_id: COURSE_ID,
    title: 'Backend Development',
    description: 'Full-stack backend with JPA, security, messaging, and microservices.',
    order_index: 20,
    estimated_hours: 15,
    topics: [
      { id: 'java-p20-t1', title: 'JPA', description: 'Java Persistence API basics.', order_index: 1, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p20-t2', title: 'Spring Data JPA', description: 'Simplified data access with Spring Data.', order_index: 2, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t3', title: 'Hibernate', description: 'ORM fundamentals with Hibernate.', order_index: 3, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t4', title: 'Entity Mapping', description: 'Mapping Java objects to database tables.', order_index: 4, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t5', title: 'Relationships', description: 'JPA entity relationships.', order_index: 5, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t6', title: 'Repository Layer', description: 'Data access patterns.', order_index: 6, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p20-t7', title: 'Service Layer', description: 'Business logic organization.', order_index: 7, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p20-t8', title: 'DTO Pattern', description: 'Data Transfer Objects for API design.', order_index: 8, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p20-t9', title: 'Pagination and Sorting', description: 'Efficient data retrieval.', order_index: 9, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p20-t10', title: 'Swagger/OpenAPI', description: 'API documentation generation.', order_index: 10, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p20-t11', title: 'Bean Validation', description: 'Declarative validation with Jakarta Validation.', order_index: 11, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p20-t12', title: 'Global Exception Handling', description: 'Consistent error responses.', order_index: 12, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p20-t13', title: 'File Upload', description: 'Handling file uploads in Spring Boot.', order_index: 13, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p20-t14', title: 'Email Integration', description: 'Sending emails from applications.', order_index: 14, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p20-t15', title: 'JWT Authentication', description: 'Token-based authentication.', order_index: 15, difficulty: 'Hard', estimated_minutes: 35 },
      { id: 'java-p20-t16', title: 'Spring Security', description: 'Comprehensive application security.', order_index: 16, difficulty: 'Hard', estimated_minutes: 35 },
      { id: 'java-p20-t17', title: 'Role-Based Access', description: 'Authorization with roles and permissions.', order_index: 17, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t18', title: 'Redis', description: 'Caching and session management with Redis.', order_index: 18, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p20-t19', title: 'Kafka', description: 'Event-driven messaging with Kafka.', order_index: 19, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p20-t20', title: 'Docker', description: 'Containerizing Java applications.', order_index: 20, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p20-t21', title: 'Microservices', description: 'Building microservice architectures.', order_index: 21, difficulty: 'Hard', estimated_minutes: 35 },
      { id: 'java-p20-t22', title: 'API Gateway', description: 'Centralized API routing and management.', order_index: 22, difficulty: 'Hard', estimated_minutes: 25 },
      { id: 'java-p20-t23', title: 'Service Discovery', description: 'Dynamic service location.', order_index: 23, difficulty: 'Hard', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p21',
    course_id: COURSE_ID,
    title: 'Testing and Deployment',
    description: 'Test your code and deploy to production with confidence.',
    order_index: 21,
    estimated_hours: 10,
    topics: [
      { id: 'java-p21-t1', title: 'Unit Testing', description: 'Writing unit tests for Java code.', order_index: 1, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t2', title: 'JUnit', description: 'Testing framework for Java.', order_index: 2, difficulty: 'Medium', estimated_minutes: 30 },
      { id: 'java-p21-t3', title: 'Mockito', description: 'Mocking dependencies in tests.', order_index: 3, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t4', title: 'Integration Testing', description: 'Testing components together.', order_index: 4, difficulty: 'Hard', estimated_minutes: 30 },
      { id: 'java-p21-t5', title: 'API Testing', description: 'Testing REST APIs.', order_index: 5, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t6', title: 'Postman', description: 'API testing and documentation tool.', order_index: 6, difficulty: 'Easy', estimated_minutes: 20 },
      { id: 'java-p21-t7', title: 'Swagger Testing', description: 'Interactive API testing.', order_index: 7, difficulty: 'Easy', estimated_minutes: 15 },
      { id: 'java-p21-t8', title: 'CI/CD', description: 'Continuous integration and delivery.', order_index: 8, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t9', title: 'GitHub Actions', description: 'Automating workflows.', order_index: 9, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t10', title: 'Maven Build', description: 'Building and packaging Java projects.', order_index: 10, difficulty: 'Medium', estimated_minutes: 20 },
      { id: 'java-p21-t11', title: 'Docker Deployment', description: 'Deploying with Docker containers.', order_index: 11, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t12', title: 'Cloud Deployment', description: 'Deploying to cloud platforms.', order_index: 12, difficulty: 'Medium', estimated_minutes: 25 },
      { id: 'java-p21-t13', title: 'Monitoring and Logging', description: 'Observability in production.', order_index: 13, difficulty: 'Medium', estimated_minutes: 25 },
    ],
  },
  {
    id: 'java-p22',
    course_id: COURSE_ID,
    title: 'Projects',
    description: 'Build real-world projects to showcase your Java skills.',
    order_index: 22,
    estimated_hours: 20,
    topics: [
      { id: 'java-p22-t1', title: 'Project: Calculator', description: 'Build a complete calculator application.', order_index: 1, difficulty: 'Easy', estimated_minutes: 60 },
      { id: 'java-p22-t2', title: 'Project: Student Management', description: 'CRUD application with file storage.', order_index: 2, difficulty: 'Medium', estimated_minutes: 90 },
      { id: 'java-p22-t3', title: 'Project: Library System', description: 'Database-backed library management.', order_index: 3, difficulty: 'Hard', estimated_minutes: 120 },
      { id: 'java-p22-t4', title: 'Project: E-Commerce API', description: 'RESTful e-commerce backend with Spring Boot.', order_index: 4, difficulty: 'Hard', estimated_minutes: 180 },
      { id: 'java-p22-t5', title: 'Project: Chat Application', description: 'Real-time chat with WebSockets.', order_index: 5, difficulty: 'Hard', estimated_minutes: 150 },
      { id: 'java-p22-t6', title: 'Project: Task Manager', description: 'Full-stack task management application.', order_index: 6, difficulty: 'Hard', estimated_minutes: 150 },
    ],
  },
];

async function seedJavaCourse() {
  console.log(' Seeding Java Full Stack Developer Course (v2)...\n');

  let stats = { phasesAdded: 0, topicsAdded: 0, errors: 0 };

  // 1. Clean up existing Java course data
  console.log('Cleaning up existing Java course data...');
  const topicIds = PHASES.flatMap((p) => p.topics.map((t) => t.id));
  const phaseIds = PHASES.map((p) => p.id);

  await supabase.from('topic_content').delete().in('topic_id', topicIds);
  await supabase.from('course_challenges').delete().in('topic_id', topicIds);
  await supabase.from('user_progress').delete().in('topic_id', topicIds);
  await supabase.from('topics').delete().in('id', topicIds);
  await supabase.from('user_course_progress').delete().eq('course_id', COURSE_ID);
  await supabase.from('phases').delete().in('id', phaseIds);
  await supabase.from('courses').delete().eq('id', COURSE_ID);
  console.log(' Cleanup complete.\n');

  // 2. Insert course
  const courseData = {
    id: COURSE_ID,
    title: 'Java Programming Master Program',
    description: 'Master modern software development by learning everything from Java fundamentals to advanced Spring Boot, REST APIs, microservices, and cloud deployment.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    difficulty: 'Beginner',
    duration: '180 hours',
    category: 'Programming',
  };

  const { error: courseErr } = await supabase.from('courses').upsert(courseData);
  if (courseErr) {
    console.error(' Failed to insert course:', courseErr.message);
    process.exit(1);
  }
  console.log(' Course registered.\n');

  // 3. Batch insert phases
  const phasesData = PHASES.map((p) => ({
    id: p.id,
    course_id: p.course_id,
    title: p.title,
    description: p.description,
    order_index: p.order_index,
    estimated_hours: p.estimated_hours,
  }));

  const { error: phasesErr } = await supabase.from('phases').upsert(phasesData);
  if (phasesErr) {
    console.error(' Batch phase insert error:', phasesErr.message);
    stats.errors += phasesData.length;
  } else {
    stats.phasesAdded = phasesData.length;
  }

  // 4. Batch insert all topics
  const allTopics = PHASES.flatMap((p) =>
    p.topics.map((t) => ({
      id: t.id,
      phase_id: p.id,
      title: t.title,
      description: t.description,
      order_index: t.order_index,
      difficulty: t.difficulty,
      estimated_minutes: t.estimated_minutes,
    }))
  );

  const { error: topicsErr } = await supabase.from('topics').upsert(allTopics);
  if (topicsErr) {
    console.error(' Batch topic insert error:', topicsErr.message);
    stats.errors += allTopics.length;
  } else {
    stats.topicsAdded = allTopics.length;
  }

  console.log('\n========================================');
  console.log(' Java Course Seeding Complete!');
  console.log('========================================');
  console.log(` Phases Added: ${stats.phasesAdded}`);
  console.log(` Topics Added: ${stats.topicsAdded}`);
  console.log(` Errors: ${stats.errors}`);
  console.log('========================================\n');
  process.exit(stats.errors > 0 ? 1 : 0);
}

seedJavaCourse();
