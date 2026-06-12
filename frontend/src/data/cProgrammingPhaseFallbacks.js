import phasesData from './cProgrammingPhasesData.json';
import highlights from './cProgrammingPhaseHighlights.json';

const topic = (id, title, description, orderIndex, difficulty, estimatedMinutes) => ({
  id, title, description, order_index: orderIndex, difficulty, estimated_minutes: estimatedMinutes,
});

export const C_PROGRAMMING_PHASES = phasesData;

const PHASES_BY_ID = new Map(C_PROGRAMMING_PHASES.map((phase) => [phase.id, phase]));

export const getFallbackPhase = (phaseId) => PHASES_BY_ID.get(phaseId);

const FLAT_TOPICS = C_PROGRAMMING_PHASES.flatMap((phase) =>
  phase.topics.map((entry) => ({ ...entry, phase_id: phase.id, phase_title: phase.title }))
);

const TOPICS_BY_ID = new Map(FLAT_TOPICS.map((entry) => [entry.id, entry]));

export const isCProgrammingCourse = (courseId) => courseId === 'c-programming' || courseId === 'C';

export const getFallbackPhases = (courseId) => {
  if (courseId && !isCProgrammingCourse(courseId)) return [];
  return C_PROGRAMMING_PHASES.map(({ topics, ...phase }) => ({
    ...phase,
    courseId: courseId || phase.course_id,
    topics: topics.map((t) => t.id),
  }));
};

export const getFallbackTopics = (phaseId) => FLAT_TOPICS.filter((t) => t.phase_id === phaseId);

export const getFallbackTopicMetadata = (topicId) => TOPICS_BY_ID.get(topicId) || null;

export const hasFallbackTopicContent = (topicId) => TOPICS_BY_ID.has(topicId);

export const getFallbackTopicLearningMeta = (topicId) => {
  const entry = TOPICS_BY_ID.get(topicId);
  if (!entry) return null;
  return buildLearningMeta(entry);
};

export const getFallbackTopicContent = (topicId) => {
  const entry = TOPICS_BY_ID.get(topicId);
  if (!entry) return null;
  return buildTopicSections(entry);
};

// ============ KIND INFERENCE ============

const KIND_PATTERNS = [
  ['introduction', /^(intro|getting started|overview|welcome)/i],
  ['variable', /(variable|data type|type)/i],
  ['operator', /(operator|expression)/i],
  ['io', /(input|output|print|scanf|printf|getchar|putchar)/i],
  ['control', /(if|else|switch|case|decision|conditional)/i],
  ['loop', /(loop|for|while|do|iteration|break|continue)/i],
  ['function', /(function|recursion|call|return|parameter|argument)/i],
  ['array', /(array|index|element|multi.dimension)/i],
  ['string', /(string|character|strlen|strcpy|strcat|strcmp|gets|puts)/i],
  ['pointer', /(pointer|reference|address|dereference|malloc|free|calloc|realloc)/i],
  ['struct', /(struct|union|typedef|enum)/i],
  ['memory', /(memory|dynamic|heap|stack|allocation|deallocation)/i],
  ['file', /(file|fopen|fclose|fread|fwrite|fprintf|fscanf|stream)/i],
  ['preprocessor', /(preprocessor|macro|define|include|header|#)/i],
  ['advanced', /(advanced|bit|shift|mask|volatile|inline|static|extern)/i],
  ['project', /(project|mini|build|create|implement|final)/i],
  ['best_practice', /(best practice|style|convention|naming|comment)/i],
  ['debug', /(debug|error|warning|test|fix)/i],
  ['math', /(math|random|abs|sqrt|pow|floor|ceil)/i],
  ['sort', /(sort|search|algorithm|bubble|selection|insertion|merge|quick|binary)/i],
  ['recursion', /(recursion|recursive|base case)/i],
  ['enum', /(enum|enumerator|constant)/i],
  ['typedef', /(typedef|alias)/i],
  ['error_handling', /(error|exception|try|catch|finally|throw)/i],
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
  const specific = {
    'hello world': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    'variables and data types': 'int age = 25;\nfloat price = 19.99;\nchar grade = \'A\';',
  };
  if (specific[title.toLowerCase()]) return specific[title.toLowerCase()];

  const defaults = {
    introduction: '// Example\n#include <stdio.h>\nint main() { return 0; }',
    variable: 'type variable_name = value;',
    operator: 'int result = a + b;',
    io: 'scanf("%d", &x);\nprintf("%d", x);',
    control: 'if (cond) { } else { }',
    loop: 'for (int i=0; i<n; i++) { }',
    function: 'ret_type func(params) { return val; }',
    array: 'type arr[n] = {v1, v2};',
    string: 'char s[] = "hello";',
    pointer: 'type *p = &var;',
    struct: 'struct S { int x; };',
    memory: 'type *p = malloc(n * sizeof(type)); free(p);',
    file: 'FILE *fp = fopen("f", "r"); fclose(fp);',
    preprocessor: '#define X val\n#include <h>',
    general: '// code',
  };
  return defaults[kind] || defaults.general;
};

const getExampleForTopic = (title) => {
  const specific = {
    'hello world': '```c\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n```\n**Output:** `Hello, World!`',
  };
  if (specific[title.toLowerCase()]) return specific[title.toLowerCase()];
  return `\`\`\`c\n// ${title} example\n\`\`\``;
};

const buildDefinition = (entry, kind) => {
  const map = {
    introduction: `**${entry.title}** is a fundamental concept in C programming.`,
    variable: `**${entry.title}** is a named storage location in memory used to hold data.`,
    pointer: `**${entry.title}** is a variable that stores the memory address of another variable.`,
    struct: `**${entry.title}** is a user-defined type grouping related variables.`,
    file: `**${entry.title}** allows reading from and writing to files.`,
    general: `**${entry.title}** is an important concept in C programming.`,
  };
  return map[kind] || map.general;
};

const buildExplanation = (entry, kind) => {
  const map = {
    introduction: `This is the starting point for learning this concept in C programming.`,
    variable: `Every variable must be declared with a specific type before use. C is statically typed.`,
    pointer: `Pointers directly manipulate memory addresses, enabling dynamic allocation and efficient array handling.`,
    struct: `Structures group related data of different types. Members accessed via '.' or '->'.`,
    file: `File operations use FILE* pointers. Common functions: fopen, fclose, fread, fwrite.`,
    general: `${entry.title} is an essential concept. Practice regularly to master it.`,
  };
  return map[kind] || map.general;
};

const buildNotes = (kind) => {
  const map = {
    introduction: ['Practice writing simple programs', 'Focus on understanding syntax'],
    variable: ['Always initialize variables', 'Choose appropriate data types'],
    pointer: ['Always initialize pointers', 'Check for NULL after allocation', 'Free allocated memory'],
    struct: ['Use typedef to simplify', 'Pass large structs by pointer'],
    file: ['Check if file opened successfully', 'Close files after use'],
    general: ['Practice regularly', 'Review code from experienced developers'],
  };
  return map[kind] || map.general;
};

const buildPracticeNotes = (entry, kind) => {
  const map = {
    introduction: ['Write a "Hello, World" program', 'Experiment with printf'],
    variable: ['Declare variables of different types', 'Print their values'],
    pointer: ['Swap variables using pointers', 'Traverse arrays with pointers'],
    struct: ['Create a student structure', 'Create an array of structures'],
    file: ['Write data to a file and read it back', 'Create a note-taking program'],
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
    pointer: ['Understand memory addresses', 'Use pointers effectively', 'Master pointer arithmetic'],
    struct: ['Define and use structures', 'Access structure members'],
    file: ['Open, read, write files', 'Handle I/O errors'],
    general: ['Understand the concept', 'Practice with examples'],
  };
  return {
    description: `Learn about ${entry.title} in C programming.`,
    goals: goals[kind] || goals.general,
    practiceHint: `Practice implementing examples related to ${entry.title}.`,
    estimatedTime: entry.estimated_minutes || 30,
  };
};

export const cProgrammingPhaseHighlights = highlights;
