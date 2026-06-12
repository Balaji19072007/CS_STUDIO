import phasesData from './javaProgrammingPhasesData.json';

export const JAVA_PHASES = phasesData;

const PHASES_BY_ID = new Map(JAVA_PHASES.map((phase) => [phase.id, phase]));

export const getJavaFallbackPhase = (phaseId) => PHASES_BY_ID.get(phaseId);

const FLAT_TOPICS = JAVA_PHASES.flatMap((phase) =>
  phase.topics.map((entry) => ({ ...entry, phase_id: phase.id, phase_title: phase.title }))
);

const TOPICS_BY_ID = new Map(FLAT_TOPICS.map((entry) => [entry.id, entry]));

export const isJavaProgrammingCourse = (courseId) => courseId === 'java-programming' || courseId === 'Java';

export const getJavaFallbackPhases = (courseId) => {
  if (courseId && !isJavaProgrammingCourse(courseId)) return [];
  return JAVA_PHASES.map(({ topics, ...phase }) => ({
    ...phase,
    courseId: courseId || phase.course_id,
    topics: topics.map((t) => t.id),
  }));
};

export const getJavaFallbackTopics = (phaseId) => FLAT_TOPICS.filter((t) => t.phase_id === phaseId);

export const getJavaFallbackTopicMetadata = (topicId) => TOPICS_BY_ID.get(topicId) || null;

export const hasJavaFallbackTopicContent = (topicId) => TOPICS_BY_ID.has(topicId);

export const getJavaFallbackTopicContent = (topicId) => {
  const entry = TOPICS_BY_ID.get(topicId);
  if (!entry) return null;
  return buildTopicSections(entry);
};

export const getJavaFallbackTopicLearningMeta = (topicId) => {
  const entry = TOPICS_BY_ID.get(topicId);
  if (!entry) return null;
  return buildLearningMeta(entry);
};

// ============ INFERENCE ============

const KIND_PATTERNS = [
  ['introduction', /^(intro|getting started|overview|welcome)/i],
  ['variable', /(variable|data type|type)/i],
  ['operator', /(operator|expression)/i],
  ['io', /(input|output|print|scanner|system\.out)/i],
  ['control', /(if|else|switch|case|decision|conditional)/i],
  ['loop', /(loop|for|while|do|iteration|break|continue)/i],
  ['function', /(method|function|recursion|call|return|parameter|argument|overload)/i],
  ['array', /(array|index|element|multi.dimension)/i],
  ['string', /(string|charsequence|stringbuilder|stringbuffer|immutable)/i],
  ['class', /(class|object|instance|new|constructor|this)/i],
  ['inheritance', /(inheritance|extends|super|override|polymorphism)/i],
  ['interface', /(interface|implements|abstract|default method)/i],
  ['exception', /(exception|try|catch|finally|throw|throws|error)/i],
  ['collection', /(collection|list|set|map|arraylist|hashmap|iterator)/i],
  ['generics', /(generic|template|parameterized type|<>)/i],
  ['lambda', /(lambda|stream|functional|predicate|consumer|function)/i],
  ['thread', /(thread|runnable|synchronized|concurrent|executor|future)/i],
  ['file', /(file|inputstream|outputstream|reader|writer|nio)/i],
  ['jdbc', /(jdbc|database|sql|connection|preparedstatement)/i],
  ['unit_test', /(test|junit|assert|mock|tdd)/i],
  ['project', /(project|mini|build|create|implement|final)/i],
  ['best_practice', /(best practice|style|convention|naming|comment)/i],
  ['debug', /(debug|error|warning|test|fix)/i],
  ['math', /(math|random|abs|sqrt|pow|floor|ceil)/i],
  ['sort', /(sort|search|algorithm|bubble|selection|insertion|merge|quick|binary)/i],
  ['recursion', /(recursion|recursive|base case)/i],
  ['enum', /(enum|enumerator|constant)/i],
  ['annotations', /(annotation|@override|@deprecated|@suppresswarnings)/i],
  ['reflection', /(reflection|class\.forname|getmethod|invoke)/i],
  ['date_time', /(date|time|localdate|localtime|localdatetime|duration|period)/i],
  ['regex', /(regex|pattern|matcher|regular expression)/i],
  ['big_data', /(bigdecimal|biginteger|precision|scale)/i],
  ['serialization', /(serializable|serialization|deserialization|objectoutputstream)/i],
  ['memory', /(memory|garbage|collector|heap|stack|outofmemory|leak)/i],
  ['module', /(module|requires|exports|opens|provides|uses)/i],
  ['sealed', /(sealed|permits|non-sealed)/i],
  ['record', /(record|data class|immutable|compact constructor)/i],
  ['pattern_matching', /(pattern matching|instanceof|switch expression|record pattern)/i],
  ['virtual_thread', /(virtual thread|loom|structured concurrency)/i],
  ['error_handling', /(error|exception|try|catch|finally|throw|throws)/i],
];

const inferKind = (title) => {
  for (const [kind, pattern] of KIND_PATTERNS) {
    if (pattern.test(title)) return kind;
  }
  return 'general';
};

const buildBlocks = (topicId, sections) => {
  const blocks = [];
  const sectionIds = ['definition', 'explanation', 'syntax', 'example', 'notes', 'tip'];
  for (let i = 0; i < Math.min(sections.length, sectionIds.length); i++) {
    if (sections[i]) {
      blocks.push({ id: `${topicId}-${sectionIds[i]}`, type: sectionIds[i], content: sections[i] });
    }
  }
  return blocks;
};

const getSyntaxForTopic = (title, kind) => {
  const defaults = {
    introduction: '// Example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
    variable: 'Type variableName = value;',
    operator: 'int result = a + b;',
    io: 'Scanner sc = new Scanner(System.in);\nSystem.out.println(x);',
    control: 'if (condition) { } else { }',
    loop: 'for (int i = 0; i < n; i++) { }',
    function: 'returnType methodName(params) { return val; }',
    array: 'Type[] arr = {v1, v2};',
    string: 'String s = "hello";',
    class: 'class MyClass { }',
    inheritance: 'class Child extends Parent { }',
    interface: 'interface MyInterface { }',
    exception: 'try { } catch (Exception e) { } finally { }',
    collection: 'List<String> list = new ArrayList<>();',
    generics: 'class Box<T> { }',
    lambda: 'list.stream().filter(x -> x > 0).collect(...)',
    thread: 'new Thread(() -> { }).start();',
    file: 'Files.readString(Path.of("file.txt"));',
    jdbc: 'try (Connection conn = DriverManager.getConnection(url)) { }',
    unit_test: '@Test\nvoid testMethod() { assertEquals(expected, actual); }',
    general: '// Java code',
  };
  return defaults[kind] || defaults.general;
};

const getExampleForTopic = (title) => {
  return `\`\`\`java\n// ${title} example\n\`\`\``;
};

const buildDefinition = (entry, kind) => {
  const map = {
    introduction: `**${entry.title}** is a fundamental concept in Java programming.`,
    variable: `**${entry.title}** is a named storage location in memory used to hold data.`,
    class: `**${entry.title}** is a blueprint for creating objects in Java.`,
    inheritance: `**${entry.title}** allows a class to inherit fields and methods from a parent class.`,
    interface: `**${entry.title}** defines a contract that implementing classes must fulfill.`,
    exception: `**${entry.title}** handles runtime errors gracefully.`,
    collection: `**${entry.title}** is part of the Java Collections Framework for storing groups of objects.`,
    generics: `**${entry.title}** enables type-safe programming with parameterized types.`,
    lambda: `**${entry.title}** provides a concise way to express instances of functional interfaces.`,
    thread: `**${entry.title}** enables concurrent execution of code.`,
    general: `**${entry.title}** is an important concept in Java programming.`,
  };
  return map[kind] || map.general;
};

const buildExplanation = (entry, kind) => {
  const map = {
    introduction: 'This is the starting point for learning this concept in Java.',
    variable: 'Java is statically typed. Every variable must be declared with a specific type before use.',
    class: 'Classes define state (fields) and behavior (methods). Objects are instances of classes.',
    inheritance: 'Use "extends" keyword. Java supports single inheritance for classes.',
    interface: 'Use "implements" keyword. A class can implement multiple interfaces.',
    exception: 'Checked exceptions must be handled or declared. Unchecked exceptions are optional.',
    collection: 'Collections framework provides List, Set, Queue, and Map interfaces.',
    generics: 'Generics provide compile-time type safety. Use <> syntax.',
    lambda: 'Functional interfaces have a single abstract method. Lambda syntax: (params) -> expression.',
    thread: 'Create threads by extending Thread or implementing Runnable. Use ExecutorService for pools.',
    general: `${entry.title} is an essential concept. Practice regularly to master it.`,
  };
  return map[kind] || map.general;
};

const buildNotes = (kind) => {
  const map = {
    introduction: ['Practice writing simple programs', 'Understand JVM and bytecode'],
    variable: ['Always initialize variables', 'Be mindful of scope'],
    class: ['Use meaningful class names', 'Apply encapsulation principles'],
    inheritance: ['Favor composition over inheritance', 'Use super to call parent constructors'],
    interface: ['Design interfaces with clear responsibilities', 'Use default methods sparingly'],
    exception: ['Catch specific exceptions', 'Don\'t swallow exceptions', 'Use finally to release resources'],
    collection: ['Choose the right collection type', 'Be aware of thread safety'],
    generics: ['Use wildcards for flexibility', 'Be aware of type erasure'],
    lambda: ['Keep lambdas short and readable', 'Prefer method references when appropriate'],
    thread: ['Use high-level concurrency utilities', 'Avoid synchronized blocks when possible'],
    general: ['Practice regularly', 'Review code from experienced developers'],
  };
  return map[kind] || map.general;
};

const buildPracticeNotes = (entry, kind) => {
  const map = {
    introduction: ['Write a "Hello, World" program', 'Experiment with System.out.println'],
    variable: ['Declare variables of different types', 'Print their values'],
    class: ['Create a simple class with fields and methods', 'Instantiate objects'],
    inheritance: ['Create a parent-child class hierarchy', 'Demonstrate polymorphism'],
    interface: ['Define and implement an interface', 'Use multiple interfaces'],
    exception: ['Write try-catch-finally blocks', 'Create custom exceptions'],
    collection: ['Use ArrayList, HashSet, and HashMap', 'Iterate over collections'],
    generics: ['Create a generic class', 'Use bounded type parameters'],
    lambda: ['Replace anonymous classes with lambdas', 'Use the Stream API'],
    thread: ['Create and start threads', 'Use ExecutorService'],
    general: ['Practice with small exercises daily', 'Build a small project'],
  };
  return map[kind] || map.general;
};

const buildTopicSections = (entry) => {
  const kind = inferKind(entry.title);
  return {
    topicId: entry.id,
    title: entry.title,
    kind,
    blocks: buildBlocks(entry.id, [
      buildDefinition(entry, kind),
      buildExplanation(entry, kind),
      getSyntaxForTopic(entry.title, kind),
      getExampleForTopic(entry.title),
      buildNotes(kind),
      buildPracticeNotes(entry, kind),
    ]),
  };
};

const buildLearningMeta = (entry) => {
  const kind = inferKind(entry.title);
  const goals = {
    introduction: ['Understand the core concept', 'Identify key terminology'],
    variable: ['Declare and initialize variables', 'Understand data types'],
    class: ['Define classes and create objects', 'Understand constructors and methods'],
    inheritance: ['Extend classes', 'Override methods', 'Use polymorphism'],
    interface: ['Define and implement interfaces', 'Understand default methods'],
    exception: ['Write try-catch-finally blocks', 'Create custom exceptions', 'Use try-with-resources'],
    collection: ['Use List, Set, and Map', 'Iterate and manipulate collections'],
    generics: ['Write generic classes and methods', 'Use bounded wildcards'],
    lambda: ['Write lambda expressions', 'Use functional interfaces', 'Understand the Stream API'],
    thread: ['Create threads', 'Use synchronization', 'Use ExecutorService'],
    general: ['Understand the concept', 'Practice with examples'],
  };
  return {
    description: `Learn about ${entry.title} in Java programming.`,
    goals: goals[kind] || goals.general,
    practiceHint: `Practice implementing examples related to ${entry.title}.`,
    estimatedTime: entry.estimated_minutes || 30,
  };
};
