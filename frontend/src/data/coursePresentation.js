const DEFAULT_THEME = {
  key: 'default',
  badge: 'CS',
  trackLabel: 'Guided course',
  strapline: 'Clear explanations, practical examples, and steady progress.',
  syntaxLanguage: 'text',
  playgroundLanguage: null,
  exampleFile: 'lesson.txt',
  heroGradient: 'from-sky-500/20 via-cyan-400/10 to-transparent',
  accentTextClass: 'text-sky-600 dark:text-sky-400',
  accentBorderClass: 'border-sky-400/20',
  accentSoftClass: 'bg-sky-500/10',
  chipClass: 'border-sky-400/20 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  badgeClass: 'border-sky-400/20 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  buttonClass: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
  ghostButtonClass: 'border-sky-400/20 text-sky-100 hover:bg-sky-500/10',
  focusAreas: ['Concept clarity', 'Practice rhythm', 'Transferable habits'],
  learningStyle: 'Study one idea at a time, run the example, then explain the result in your own words.',
};

const COURSE_FAMILIES = [
  {
    key: 'c',
    matcher: /(c programming|c language)/i,
    badge: 'C',
    trackLabel: 'Systems programming',
    strapline: 'Memory-aware, compiler-friendly lessons with precise fundamentals.',
    syntaxLanguage: 'c',
    playgroundLanguage: 'c',
    exampleFile: 'main.c',
    heroGradient: 'from-cyan-400/20 via-sky-400/10 to-transparent',
    accentTextClass: 'text-cyan-600 dark:text-cyan-400',
    accentBorderClass: 'border-cyan-500/20',
    accentSoftClass: 'bg-cyan-500/10',
    chipClass: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    badgeClass: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    buttonClass: 'bg-cyan-500 hover:bg-cyan-400 text-white dark:text-slate-950',
    ghostButtonClass: 'border-cyan-500/20 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/10',
    focusAreas: ['Compilation', 'Memory reasoning', 'Foundational problem solving'],
    learningStyle: 'Read the concept, compile the sample, and pay attention to what the machine is actually doing.',
  },
  {
    key: 'python',
    matcher: /python/i,
    badge: 'Py',
    trackLabel: 'Python programming',
    strapline: 'Readable syntax, practical automation, and quick feedback loops.',
    syntaxLanguage: 'python',
    playgroundLanguage: 'python',
    exampleFile: 'main.py',
    heroGradient: 'from-amber-400/20 via-yellow-300/10 to-transparent',
    accentTextClass: 'text-amber-600 dark:text-amber-400',
    accentBorderClass: 'border-amber-300/20',
    accentSoftClass: 'bg-amber-400/10',
    chipClass: 'border-amber-300/20 bg-amber-400/10 text-amber-700 dark:text-amber-300',
    badgeClass: 'border-amber-300/20 bg-amber-400/10 text-amber-700 dark:text-amber-300',
    buttonClass: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
    ghostButtonClass: 'border-amber-300/20 text-amber-100 hover:bg-amber-400/10',
    focusAreas: ['Readable code', 'Core built-ins', 'Rapid scripting'],
    learningStyle: 'Aim for code that is short, explicit, and easy to revisit a week later.',
  },
  {
    key: 'java',
    matcher: /java(?!script)/i,
    badge: 'Jv',
    trackLabel: 'Structured OOP',
    strapline: 'Strong types, disciplined structure, and scalable program design.',
    syntaxLanguage: 'java',
    playgroundLanguage: 'java',
    exampleFile: 'Main.java',
    heroGradient: 'from-red-400/20 via-orange-400/10 to-transparent',
    accentTextClass: 'text-red-600 dark:text-red-400',
    accentBorderClass: 'border-red-300/20',
    accentSoftClass: 'bg-red-400/10',
    chipClass: 'border-red-300/20 bg-red-400/10 text-red-700 dark:text-red-300',
    badgeClass: 'border-red-300/20 bg-red-400/10 text-red-700 dark:text-red-300',
    buttonClass: 'bg-red-400 hover:bg-red-300 text-slate-950',
    ghostButtonClass: 'border-red-300/20 text-red-100 hover:bg-red-400/10',
    focusAreas: ['OOP thinking', 'Type safety', 'Reusable structure'],
    learningStyle: 'Think in named classes and responsibilities, not just isolated lines of syntax.',
  },
  {
    key: 'cpp',
    matcher: /c\+\+/i,
    badge: 'C++',
    trackLabel: 'High-performance native',
    strapline: 'Control, abstraction, and performance-minded design in one track.',
    syntaxLanguage: 'cpp',
    playgroundLanguage: 'cpp',
    exampleFile: 'main.cpp',
    heroGradient: 'from-indigo-400/20 via-blue-400/10 to-transparent',
    accentTextClass: 'text-indigo-600 dark:text-indigo-400',
    accentBorderClass: 'border-indigo-300/20',
    accentSoftClass: 'bg-indigo-400/10',
    chipClass: 'border-indigo-300/20 bg-indigo-400/10 text-indigo-700 dark:text-indigo-300',
    badgeClass: 'border-indigo-300/20 bg-indigo-400/10 text-indigo-700 dark:text-indigo-300',
    buttonClass: 'bg-indigo-400 hover:bg-indigo-300 text-slate-950',
    ghostButtonClass: 'border-indigo-300/20 text-indigo-100 hover:bg-indigo-400/10',
    focusAreas: ['Ownership', 'Performance', 'Modern abstraction'],
    learningStyle: 'Work slowly and precisely; in C++ a small language detail often has a big runtime effect.',
  },
  {
    key: 'csharp',
    matcher: /(c#|c sharp)/i,
    badge: 'C#',
    trackLabel: '.NET development',
    strapline: 'Modern application development with clean syntax and strong tooling.',
    syntaxLanguage: 'csharp',
    playgroundLanguage: null,
    exampleFile: 'Program.cs',
    heroGradient: 'from-fuchsia-400/20 via-pink-400/10 to-transparent',
    accentTextClass: 'text-fuchsia-600 dark:text-fuchsia-400',
    accentBorderClass: 'border-fuchsia-300/20',
    accentSoftClass: 'bg-fuchsia-400/10',
    chipClass: 'border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-700 dark:text-fuchsia-300',
    badgeClass: 'border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-700 dark:text-fuchsia-300',
    buttonClass: 'bg-fuchsia-400 hover:bg-fuchsia-300 text-slate-950',
    ghostButtonClass: 'border-fuchsia-300/20 text-fuchsia-100 hover:bg-fuchsia-400/10',
    focusAreas: ['Application structure', '.NET basics', 'Readable production code'],
    learningStyle: 'Treat each lesson as a building block for real applications, not only syntax drills.',
  },
];

const EXTRA_FAMILIES = [
  {
    key: 'frontend',
    matcher: /(frontend|web(?!\s*&\s*app security)|react|html|css|full stack)/i,
    badge: 'UI',
    trackLabel: 'Frontend engineering',
    strapline: 'Interfaces that are clear, responsive, and pleasant to use.',
    syntaxLanguage: 'javascript',
    playgroundLanguage: 'javascript',
    exampleFile: 'app.js',
    heroGradient: 'from-emerald-400/20 via-teal-300/10 to-transparent',
    accentTextClass: 'text-emerald-600 dark:text-emerald-400',
    accentBorderClass: 'border-emerald-300/20',
    accentSoftClass: 'bg-emerald-400/10',
    chipClass: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300',
    badgeClass: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300',
    buttonClass: 'bg-emerald-400 hover:bg-emerald-300 text-slate-950',
    ghostButtonClass: 'border-emerald-300/20 text-emerald-100 hover:bg-emerald-400/10',
    focusAreas: ['Layout', 'Interaction', 'Accessible UI decisions'],
    learningStyle: 'Read the visual intent, inspect the code, then test how the behavior feels on the screen.',
  },
  {
    key: 'backend',
    matcher: /(backend|api|server|full stack capstone|backend & api)/i,
    badge: 'BE',
    trackLabel: 'Backend engineering',
    strapline: 'Requests, data flow, business rules, and dependable services.',
    syntaxLanguage: 'javascript',
    playgroundLanguage: 'javascript',
    exampleFile: 'server.js',
    heroGradient: 'from-blue-400/20 via-sky-300/10 to-transparent',
    accentTextClass: 'text-blue-600 dark:text-blue-400',
    accentBorderClass: 'border-blue-300/20',
    accentSoftClass: 'bg-blue-400/10',
    chipClass: 'border-blue-300/20 bg-blue-400/10 text-blue-700 dark:text-blue-300',
    badgeClass: 'border-blue-300/20 bg-blue-400/10 text-blue-700 dark:text-blue-300',
    buttonClass: 'bg-blue-400 hover:bg-blue-300 text-slate-950',
    ghostButtonClass: 'border-blue-300/20 text-blue-100 hover:bg-blue-400/10',
    focusAreas: ['Routes and services', 'Validation', 'Reliable data handling'],
    learningStyle: 'Follow the full request lifecycle: input, validation, work, response, and failure cases.',
  },
  {
    key: 'database',
    matcher: /(database|data modeling|schema|sql)/i,
    badge: 'DB',
    trackLabel: 'Data design',
    strapline: 'Design data so products stay clear, queryable, and scalable.',
    syntaxLanguage: 'sql',
    playgroundLanguage: null,
    exampleFile: 'schema.sql',
    heroGradient: 'from-slate-300/20 via-gray-300/10 to-transparent',
    accentTextClass: 'text-slate-600 dark:text-slate-400',
    accentBorderClass: 'border-slate-300/20',
    accentSoftClass: 'bg-slate-400/10',
    chipClass: 'border-slate-300/20 bg-slate-400/10 text-slate-700 dark:text-slate-300',
    badgeClass: 'border-slate-300/20 bg-slate-400/10 text-slate-700 dark:text-slate-300',
    buttonClass: 'bg-slate-300 hover:bg-slate-200 text-slate-950',
    ghostButtonClass: 'border-slate-300/20 text-slate-100 hover:bg-slate-400/10',
    focusAreas: ['Schema choices', 'Relationships', 'Query quality'],
    learningStyle: 'Think about how the data will be read, changed, and protected before you design the table.',
  },
  {
    key: 'data',
    matcher: /(data science|wrangling|visualization|big data|analytics)/i,
    badge: 'DS',
    trackLabel: 'Data workflows',
    strapline: 'Clean data, clear analysis, and sensible communication.',
    syntaxLanguage: 'python',
    playgroundLanguage: 'python',
    exampleFile: 'analysis.py',
    heroGradient: 'from-violet-400/20 via-purple-300/10 to-transparent',
    accentTextClass: 'text-violet-600 dark:text-violet-400',
    accentBorderClass: 'border-violet-300/20',
    accentSoftClass: 'bg-violet-400/10',
    chipClass: 'border-violet-300/20 bg-violet-400/10 text-violet-700 dark:text-violet-300',
    badgeClass: 'border-violet-300/20 bg-violet-400/10 text-violet-700 dark:text-violet-300',
    buttonClass: 'bg-violet-400 hover:bg-violet-300 text-slate-950',
    ghostButtonClass: 'border-violet-300/20 text-violet-100 hover:bg-violet-400/10',
    focusAreas: ['Data cleaning', 'Interpretation', 'Storytelling with evidence'],
    learningStyle: 'Every transformation should have a reason; do not move columns around without knowing why.',
  },
  {
    key: 'ml',
    matcher: /(machine learning|artificial intelligence|core ml|deep learning|mlops|ai mathematics)/i,
    badge: 'ML',
    trackLabel: 'Machine learning',
    strapline: 'Build intuition first, then layer in tooling and scale.',
    syntaxLanguage: 'python',
    playgroundLanguage: 'python',
    exampleFile: 'model.py',
    heroGradient: 'from-rose-400/20 via-pink-300/10 to-transparent',
    accentTextClass: 'text-rose-600 dark:text-rose-400',
    accentBorderClass: 'border-rose-300/20',
    accentSoftClass: 'bg-rose-400/10',
    chipClass: 'border-rose-300/20 bg-rose-400/10 text-rose-700 dark:text-rose-300',
    badgeClass: 'border-rose-300/20 bg-rose-400/10 text-rose-700 dark:text-rose-300',
    buttonClass: 'bg-rose-400 hover:bg-rose-300 text-slate-950',
    ghostButtonClass: 'border-rose-300/20 text-rose-100 hover:bg-rose-400/10',
    focusAreas: ['Model intuition', 'Evaluation', 'Responsible iteration'],
    learningStyle: 'Ask what the model is learning, how you know, and what could mislead you.',
  },
  {
    key: 'security',
    matcher: /(security|cyber|forensics|incident|offensive|defensive)/i,
    badge: 'SEC',
    trackLabel: 'Security thinking',
    strapline: 'Understand systems, trust boundaries, and realistic failure modes.',
    syntaxLanguage: 'bash',
    playgroundLanguage: null,
    exampleFile: 'checklist.sh',
    heroGradient: 'from-orange-400/20 via-amber-300/10 to-transparent',
    accentTextClass: 'text-orange-600 dark:text-orange-400',
    accentBorderClass: 'border-orange-300/20',
    accentSoftClass: 'bg-orange-400/10',
    chipClass: 'border-orange-300/20 bg-orange-400/10 text-orange-700 dark:text-orange-300',
    badgeClass: 'border-orange-300/20 bg-orange-400/10 text-orange-700 dark:text-orange-300',
    buttonClass: 'bg-orange-400 hover:bg-orange-300 text-slate-950',
    ghostButtonClass: 'border-orange-300/20 text-orange-100 hover:bg-orange-400/10',
    focusAreas: ['Threat awareness', 'Safer defaults', 'Operational discipline'],
    learningStyle: 'Move from curiosity to evidence: observe the system, state the risk, then verify the assumption.',
  },
  {
    key: 'devops',
    matcher: /(devops|deploy|container|orchestration|infrastructure|observability|reliability)/i,
    badge: 'OPS',
    trackLabel: 'Delivery and operations',
    strapline: 'Ship software reliably and keep it understandable in production.',
    syntaxLanguage: 'bash',
    playgroundLanguage: null,
    exampleFile: 'pipeline.yml',
    heroGradient: 'from-lime-400/20 via-green-300/10 to-transparent',
    accentTextClass: 'text-lime-600 dark:text-lime-400',
    accentBorderClass: 'border-lime-300/20',
    accentSoftClass: 'bg-lime-400/10',
    chipClass: 'border-lime-300/20 bg-lime-400/10 text-lime-700 dark:text-lime-300',
    badgeClass: 'border-lime-300/20 bg-lime-400/10 text-lime-700 dark:text-lime-300',
    buttonClass: 'bg-lime-400 hover:bg-lime-300 text-slate-950',
    ghostButtonClass: 'border-lime-300/20 text-lime-100 hover:bg-lime-400/10',
    focusAreas: ['Automation', 'Repeatability', 'Observability'],
    learningStyle: 'Prefer simple, repeatable steps that other people can inspect and run safely.',
  },
  {
    key: 'mobile',
    matcher: /(mobile|android|ios|react native|flutter)/i,
    badge: 'APP',
    trackLabel: 'Mobile product engineering',
    strapline: 'Build small-screen experiences that feel stable, fast, and intentional.',
    syntaxLanguage: 'javascript',
    playgroundLanguage: 'javascript',
    exampleFile: 'screen.js',
    heroGradient: 'from-pink-400/20 via-rose-300/10 to-transparent',
    accentTextClass: 'text-pink-600 dark:text-pink-400',
    accentBorderClass: 'border-pink-300/20',
    accentSoftClass: 'bg-pink-400/10',
    chipClass: 'border-pink-300/20 bg-pink-400/10 text-pink-700 dark:text-pink-300',
    badgeClass: 'border-pink-300/20 bg-pink-400/10 text-pink-700 dark:text-pink-300',
    buttonClass: 'bg-pink-400 hover:bg-pink-300 text-slate-950',
    ghostButtonClass: 'border-pink-300/20 text-pink-100 hover:bg-pink-400/10',
    focusAreas: ['Screen flow', 'State on devices', 'User experience under constraints'],
    learningStyle: 'Think about touch, latency, and small-screen clarity while you read each example.',
  },
];

const COURSE_THEME_BANK = [...COURSE_FAMILIES, ...EXTRA_FAMILIES];

const pickFamily = (title = '') => {
  const matched = COURSE_THEME_BANK.find((family) => family.matcher.test(title));
  return matched || DEFAULT_THEME;
};

export const getCoursePresentation = (title = '') => {
  const family = pickFamily(title);

  if (family.key !== 'mobile') {
    return family;
  }

  if (/ios/i.test(title)) {
    return {
      ...family,
      syntaxLanguage: 'swift',
      playgroundLanguage: null,
      exampleFile: 'Screen.swift',
      badge: 'iOS',
      trackLabel: 'Native iOS',
      strapline: 'Touch-first interfaces, lifecycle awareness, and native app thinking.',
    };
  }

  if (/android/i.test(title)) {
    return {
      ...family,
      syntaxLanguage: 'java',
      playgroundLanguage: 'java',
      exampleFile: 'MainActivity.java',
      badge: 'AND',
      trackLabel: 'Native Android',
      strapline: 'Structured app flow, lifecycle management, and device-aware design.',
    };
  }

  return family;
};

const KIND_PATTERNS = [
  ['introduction', /(what is|introduction|overview|foundations?|basics?$)/i],
  ['setup', /(set up|setup|environment|installation|toolchain|workspace|ide)/i],
  ['syntax', /(syntax|structure|anatomy|program structure|convention|bytecode|runtime)/i],
  ['first_program', /(first .*program|hello world)/i],
  ['comments', /(comment|documentation)/i],
  ['variables', /(variable|declaration|initialization|assignment)/i],
  ['data_types', /(data types?|primitive|numbers?|booleans?|none|type conversion|casting)/i],
  ['constants', /(constant|literal|enum|enumeration)/i],
  ['io', /(input|output|print|stream)/i],
  ['operators', /(operator|precedence|arithmetic|logical|bitwise|relational|comparison)/i],
  ['conditionals', /(if|else|conditional)/i],
  ['switch', /(switch|case|match)/i],
  ['loops', /(loop|iteration|while|for|do while)/i],
  ['loop_control', /(break|continue)/i],
  ['functions', /(function|method)/i],
  ['arguments', /(argument|parameter)/i],
  ['return_values', /(return value|return)/i],
  ['modules', /(module|package|import|namespace|library)/i],
  ['arrays', /(array|list|tuple|vector|dictionary|map|set|hash|collection)/i],
  ['strings', /(string)/i],
  ['oop', /(class|object|constructor|access modifier|inheritance|polymorphism|interface|encapsulation)/i],
  ['exceptions', /(exception|error handling|try|catch|finally)/i],
  ['files', /(file|read|write|storage)/i],
  ['pointers', /(pointer|reference|memory|heap|stack|dynamic)/i],
  ['database', /(sql|query|table|schema|database|normalization|index|join)/i],
  ['api', /(api|endpoint|route|controller|middleware|request|response|token|session|auth)/i],
  ['frontend', /(component|state|event|dom|responsive|layout|css|hook|form|routing)/i],
  ['data_ml', /(dataset|feature|model|training|evaluation|visualization|wrangling|regression|classification)/i],
  ['security', /(security|threat|attack|vulnerability|incident|forensics|encryption)/i],
  ['devops', /(deploy|docker|container|pipeline|ci\/cd|orchestration|infrastructure|monitor|logging|metrics)/i],
  ['mobile', /(android|ios|mobile|screen|navigation|lifecycle)/i],
];

const GOALS = {
  introduction: ['Explain the core idea clearly', 'Recognize where it appears in real work', 'Connect it to the rest of the course'],
  setup: ['Prepare the required tools', 'Verify the environment works', 'Build a repeatable starting workflow'],
  syntax: ['Read the shape of the code', 'Understand what each section is for', 'Spot the part you will edit most often'],
  variables: ['Store values safely', 'Pick meaningful names', 'Initialize data before using it'],
  data_types: ['Choose the right type', 'Predict how values behave', 'Avoid conversion mistakes'],
  conditionals: ['Express decisions clearly', 'Read each branch with confidence', 'Test both paths'],
  loops: ['Repeat work without copying code', 'Trace each iteration', 'Choose the right loop for the task'],
  functions: ['Break work into reusable units', 'Name behavior clearly', 'Reduce repetition'],
  arrays: ['Store multiple related values', 'Access elements safely', 'Use the collection intentionally'],
  oop: ['Model behavior with structure', 'Keep responsibilities clear', 'Use objects on purpose'],
  database: ['Design or query data with intent', 'Preserve integrity', 'Think about reads and writes together'],
  api: ['Understand request and response flow', 'Validate input', 'Keep service behavior predictable'],
  frontend: ['Build UI with clear state flow', 'Make interactions understandable', 'Prefer maintainable structure'],
  data_ml: ['Understand the pipeline step', 'Measure what changed', 'Keep the result interpretable'],
  security: ['Name the risk clearly', 'Understand the trust boundary', 'Prefer safer defaults'],
  devops: ['Automate repeatable work', 'Observe system behavior', 'Reduce manual risk'],
  mobile: ['Think about users on devices', 'Keep screen transitions understandable', 'Handle state carefully'],
  default: ['Understand the concept', 'Apply it in a small example', 'Carry it into the next lesson'],
};

const PRACTICE_HINTS = {
  introduction: 'After reading the example, explain the idea in one sentence without using jargon.',
  setup: 'Run the setup once slowly, then repeat it from memory so the workflow becomes yours.',
  syntax: 'Rewrite the skeleton by hand and label each section before moving on.',
  variables: 'Trace the value after every assignment and predict the final output before you run the code.',
  data_types: 'Try one value that fits and one that does not so the limits become practical.',
  conditionals: 'Test at least one input for every branch so the flow stops feeling abstract.',
  loops: 'Print the loop counter while you learn so you can see each iteration.',
  functions: 'Move one repeated block into a function and compare the before and after readability.',
  arrays: 'Print one element at a time until the indexing pattern feels natural.',
  oop: 'Name the object after a real thing from the domain so the model stays concrete.',
  database: 'Write the data shape before the SQL so the query has a clear purpose.',
  api: 'Follow one request from input to response and note where validation belongs.',
  frontend: 'Imagine the screen change before you implement it; UI bugs often start as missing state transitions.',
  data_ml: 'Write down what the data should look like before and after the step you are learning.',
  security: 'Ask who can trigger the action, what they can control, and how you would verify it safely.',
  devops: 'Prefer one small automated step that anyone can repeat over a long manual checklist.',
  mobile: 'Picture the user holding a phone in one hand and decide what must stay obvious on screen.',
  default: 'Recreate the example from memory once; the gaps will tell you what to review.',
};

const inferTopicKind = (topicTitle = '') => {
  const matched = KIND_PATTERNS.find(([, pattern]) => pattern.test(topicTitle));
  return matched ? matched[0] : 'default';
};

const getGenericSnippet = (languageKey, kind, variant = 'syntax') => {
  const label = kind.replace(/_/g, ' ');

  switch (languageKey) {
    case 'c':
      return variant === 'syntax'
        ? `#include <stdio.h>\n\nint main(void) {\n    /* ${label} */\n    return 0;\n}`
        : `#include <stdio.h>\n\nint main(void) {\n    printf("Practice the concept with a tiny example.\\n");\n    return 0;\n}`;
    case 'cpp':
      return variant === 'syntax'
        ? `#include <iostream>\nusing namespace std;\n\nint main() {\n    // ${label}\n    return 0;\n}`
        : `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Practice the concept with a tiny example." << endl;\n    return 0;\n}`;
    case 'java':
      return variant === 'syntax'
        ? `public class Main {\n    public static void main(String[] args) {\n        // ${label}\n    }\n}`
        : `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Practice the concept with a tiny example.");\n    }\n}`;
    case 'python':
      return variant === 'syntax'
        ? `def main():\n    # ${label}\n    pass\n\n\nif __name__ == "__main__":\n    main()`
        : `def main():\n    print("Practice the concept with a tiny example.")\n\n\nif __name__ == "__main__":\n    main()`;
    case 'csharp':
      return variant === 'syntax'
        ? `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // ${label}\n    }\n}`
        : `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Practice the concept with a tiny example.");\n    }\n}`;
    case 'javascript':
      return variant === 'syntax'
        ? `function main() {\n  // ${label}\n}\n\nmain();`
        : `function main() {\n  console.log("Practice the concept with a tiny example.");\n}\n\nmain();`;
    case 'sql':
      return variant === 'syntax'
        ? `-- ${label}\nSELECT 1;`
        : `SELECT 'Practice the concept with a tiny example.' AS message;`;
    case 'bash':
      return variant === 'syntax'
        ? `# ${label}\necho "Review the workflow step by step"`
        : `echo "Practice the concept with a small, safe workflow."`;
    case 'swift':
      return variant === 'syntax'
        ? `import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Example structure")\n    }\n}`
        : `import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        VStack(alignment: .leading) {\n            Text("Practice the concept")\n            Text("Keep the UI clear and focused.")\n        }\n        .padding()\n    }\n}`;
    default:
      return variant === 'syntax'
        ? `Step 1: Identify the responsibility\nStep 2: Apply the concept\nStep 3: Verify the result`
        : `Read the example, try one variation, and note what changed.`;
  }
};

const getSnippetPair = (presentation, kind) => {
  const languageKey = presentation.syntaxLanguage;

  if (languageKey === 'c' && kind === 'variables') {
    return {
      syntax: `int score = 95;\nfloat average = 88.5f;\nchar grade = 'A';`,
      example: `#include <stdio.h>\n\nint main(void) {\n    int score = 95;\n    float average = 88.5f;\n\n    printf("Score: %d\\n", score);\n    printf("Average: %.1f\\n", average);\n    return 0;\n}`,
    };
  }

  if (languageKey === 'python' && kind === 'functions') {
    return {
      syntax: `def area(length, width):\n    return length * width`,
      example: `def area(length, width):\n    return length * width\n\nprint(area(5, 3))`,
    };
  }

  if (languageKey === 'java' && kind === 'oop') {
    return {
      syntax: `class Student {\n    String name;\n\n    Student(String name) {\n        this.name = name;\n    }\n}`,
      example: `class Student {\n    String name;\n\n    Student(String name) {\n        this.name = name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student student = new Student("Asha");\n        System.out.println(student.name);\n    }\n}`,
    };
  }

  if (languageKey === 'javascript' && kind === 'api') {
    return {
      syntax: `const express = require("express");\nconst app = express();\n\napp.get("/status", (req, res) => {\n  res.json({ ok: true });\n});`,
      example: `function buildResponse(userName) {\n  return { ok: true, message: \`Welcome, \${userName}\` };\n}\n\nconsole.log(buildResponse("Asha"));`,
    };
  }

  if (languageKey === 'sql' && kind === 'database') {
    return {
      syntax: `CREATE TABLE lessons (\n  id INT PRIMARY KEY,\n  title VARCHAR(120) NOT NULL,\n  level VARCHAR(32) NOT NULL\n);`,
      example: `SELECT title, level\nFROM lessons\nWHERE level = 'Beginner'\nORDER BY title;`,
    };
  }

  if (languageKey === 'bash' && (kind === 'devops' || kind === 'security')) {
    return {
      syntax: `# Review the workflow\n# Verify inputs and permissions\n# Log the important outcome`,
      example: `echo "Observe the system"\necho "State the risk or deployment goal"\necho "Verify the result carefully"`,
    };
  }

  return {
    syntax: getGenericSnippet(languageKey, kind, 'syntax'),
    example: getGenericSnippet(languageKey, kind, 'example'),
  };
};

const buildTopicSections = ({ kind, courseTitle, topicTitle, presentation }) => {
  const explanationMap = {
    introduction: `Start with intent before implementation. Strong tutorial material does not throw syntax at you first; it explains what problem the idea solves, where you will see it in practice, and how to recognize it when the code is still unfamiliar.\n\nAs you read this lesson, keep one question in mind: what becomes easier after I understand ${topicTitle}? That question helps you study for capability, not only memorization.`,
    setup: `Good learning experiences feel calm because the environment is stable. When the tools are installed correctly and the run cycle is predictable, you can focus on understanding the lesson instead of fighting the machine.\n\nTreat setup as a real skill. Professionals value reliable workflows because they reduce friction every single day, and that same habit will help you learn faster here too.`,
    syntax: `Syntax becomes easier when you stop viewing it as decoration and start seeing it as structure. Every bracket, keyword, indentation level, or block boundary tells the runtime or compiler how the program is organized.\n\nA small code skeleton gives you something concrete to hold onto. Once the structure feels familiar, later lessons become less intimidating because you are adding detail to a known shape instead of facing a wall of new text.`,
    variables: `Variables are one of the first places where programming becomes concrete: a program needs a named place to remember something. Once you can store, change, and print values confidently, every later topic becomes more approachable.\n\nThe key habit here is intentionality. Choose names that carry meaning, assign sensible starting values, and read the code as if someone else needs to understand the story of the data.`,
    data_types: `Data types are about meaning as much as storage. When you choose a type, you are describing what kind of value is expected, how it can be used, and which operations make sense on it.\n\nBeginner-friendly material should make the type decision feel practical. Ask what range the value needs, how precise it must be, and how the program will display or compare it.`,
    conditionals: `Conditionals are where programs begin to feel selective instead of mechanical. A branch expresses a rule: if this fact is true, do this; otherwise, do something else.\n\nClean conditional logic is easier when the names are honest and the question is obvious. If the branch reads like a sentence, the reader can focus on the behavior instead of decoding the syntax.`,
    loops: `Loops are about controlled repetition. Rather than copying the same action many times, you describe the pattern once and let the program move through it.\n\nThe most important beginner habit here is tracing. Follow the loop variable or condition step by step until the repetition stops feeling magical and starts feeling mechanical.`,
    functions: `Functions and methods help you separate ideas. Instead of forcing one long block to do everything, you give a piece of behavior a name and let other parts of the program call it when needed.\n\nThis is where programs start to become easier to grow. Reuse is useful, but clarity is the real win: a good function name tells the reader what job is happening without making them inspect every line.`,
    arrays: `Collections matter because real programs rarely manage just one value at a time. Whether the language calls them arrays, lists, maps, or sets, the basic lesson is the same: grouped data needs grouped logic.\n\nRead these examples with access patterns in mind. How do you reach one element, add a new one, or move through all of them without losing track of the structure?`,
    oop: `Object-oriented ideas become easier when they stay grounded in real nouns and responsibilities. A class should model something meaningful enough that its data and behavior naturally belong together.\n\nStart simple. One clean class with one clear role teaches more than a large hierarchy copied from a textbook.`,
    database: `Database lessons are about structure and trust. A schema, query, or relationship is not just syntax; it is a statement about how the application understands its data.\n\nAs you read, connect each example to product behavior. Ask what real question the query answers or what real rule the schema enforces.`,
    api: `API and backend topics work best when you follow the whole path. A request arrives, input is validated, business logic runs, and a response is shaped for another system or interface.\n\nThis topic becomes much clearer when you separate responsibilities. Routing, validation, and core business rules should help each other, not blur into one block of code.`,
    frontend: `Frontend lessons should connect code to what the user sees and feels. Components, state, layout, and events all matter because they shape the interface experience directly.\n\nWhen you study a UI example, imagine the interaction, not just the code. If you can picture how the screen changes, the lesson has become practical.`,
    data_ml: `Data and model topics reward careful thinking. Transformations should preserve meaning, features should have a reason, and metrics should answer a real question about quality.\n\nThis lesson is strongest when you keep the pipeline legible. Good data work and good ML work both depend on being able to explain what changed and why.`,
    security: `Security content should build judgment, not only vocabulary. The important questions are who can act, what they can influence, what must be protected, and how you would verify the behavior safely.\n\nUse the examples here to train your instinct for trust boundaries. Clear reasoning is more valuable than dramatic language.`,
    devops: `Operational topics connect engineering work to repeatable delivery. Build, release, monitor, and recovery steps matter because production systems are judged over time, not only at the moment of implementation.\n\nLook for the parts that reduce risk: automation, observability, small changes, and documented workflows. Those are the habits that scale best.`,
    mobile: `Mobile lessons are shaped by constraints: small screens, intermittent attention, touch interaction, and limited space for error. Good mobile design is really clear design under pressure.\n\nWhile learning, imagine the user context. If the screen or flow is confusing on a phone, the code is not finished no matter how elegant it looks.`,
    default: `The goal of this lesson is to make ${topicTitle} usable, not just recognizable. Focus on what the code is trying to achieve, then connect each syntax choice back to that goal.\n\n${presentation.learningStyle}`,
  };

  const noteMap = {
    introduction: ['Learn the purpose before the details.', 'Notice where the concept appears in real work.', 'Use the example to build a mental model.', 'Keep the first explanation simple.'],
    setup: ['A working environment is part of the skill.', 'Keep setup steps short and repeatable.', 'Verify the workflow with one successful run.', 'Write down the commands you want to remember.'],
    syntax: ['Read the program shape before changing details.', 'Look for entry points and declarations.', 'Map each section to its job.', 'Small structural mistakes are common, so read errors carefully.'],
    variables: ['A variable is both a name and a promise about the value it stores.', 'Meaningful names reduce mental load immediately.', 'Initialize values early to avoid surprises.', 'Trace how the value changes from line to line.'],
    data_types: ['Type choice affects behavior, range, and readability.', 'Pick a type that matches the real data.', 'Formatting often depends on the chosen type.', 'When two types meet, conversion rules matter.'],
    conditionals: ['Branching logic should answer a clear question.', 'Name variables so the condition reads like a sentence.', 'Test both the true and false path.', 'Avoid stacking too many conditions before the simple case is clear.'],
    loops: ['Loops need a clear stopping rule.', 'Track the loop variable until the pattern feels obvious.', 'Use a short loop with visible output while learning.', 'Prefer clarity over cleverness.'],
    functions: ['Functions package behavior behind a meaningful name.', 'The best beginner functions do one clear job.', 'Function boundaries improve readability.', 'A well-named function reduces repeated explanation elsewhere.'],
    arrays: ['Collections let one variable manage many related values.', 'Indexing errors are common, so verify positions carefully.', 'Pick the collection type that matches the access pattern.', 'Printed examples reveal structure quickly.'],
    oop: ['Objects are useful when data and behavior belong together.', 'Keep the first model small.', 'Names should sound like real entities in the problem domain.', 'Good object design reduces scattered logic.'],
    database: ['Data shape decisions affect every layer above the database.', 'Keys, relationships, and constraints should reflect real behavior.', 'Write queries with a clear question in mind.', 'Readability matters in schema design too.'],
    api: ['APIs are contracts, so naming and validation carry real weight.', 'Follow the request through parsing, work, and response.', 'Think about bad input as early as good input.', 'Separate routing from business logic.'],
    frontend: ['UI code should describe state and interaction clearly.', 'Visual structure is easier to maintain when logic stays simple.', 'Accessibility and clarity are part of quality.', 'Name components by purpose, not decoration.'],
    data_ml: ['Every transformation should preserve meaning, not just change shape.', 'Metrics matter because intuition alone is unreliable.', 'A clean intermediate result is easier to trust.', 'Keep the pipeline explainable while you are learning it.'],
    security: ['Security starts with assumptions about trust and access.', 'Safer defaults reduce the number of mistakes you need to catch later.', 'Observe before you conclude; evidence matters.', 'Documenting the risk is part of the work.'],
    devops: ['A dependable workflow is more valuable than a flashy but fragile one.', 'Repeatability is a feature for the team.', 'Measure the system before and after each change.', 'Smaller steps make rollback easier.'],
    mobile: ['Device constraints should shape design choices from the start.', 'Screen transitions need to feel obvious.', 'State bugs feel bigger on mobile because they disrupt the flow immediately.', 'Optimize for clarity before complexity.'],
    default: [`Treat ${topicTitle} as a skill to practice, not a paragraph to memorize.`, `Focus on what the concept changes inside ${courseTitle || 'the course'}.`, 'Keep the first working example small and inspectable.', presentation.learningStyle],
  };

  const definition = `${topicTitle} is an important part of ${courseTitle || 'this course'}. This lesson focuses on what the concept does, when to use it, and how to recognize it confidently in real code or systems.`;

  return {
    definition,
    explanation: explanationMap[kind] || explanationMap.default,
    notes: (noteMap[kind] || noteMap.default).join('\n'),
    tip: PRACTICE_HINTS[kind] || PRACTICE_HINTS.default,
  };
};

const buildBlocks = (topicId, sections) => [
  { id: `${topicId}-definition`, topic_id: topicId, content_type: 'definition', content_text: sections.definition, order_index: 1 },
  { id: `${topicId}-explanation`, topic_id: topicId, content_type: 'explanation', content_text: sections.explanation, order_index: 2 },
  { id: `${topicId}-syntax`, topic_id: topicId, content_type: 'syntax', content_text: sections.syntax, order_index: 3 },
  { id: `${topicId}-example`, topic_id: topicId, content_type: 'example', content_text: sections.example, order_index: 4 },
  { id: `${topicId}-note`, topic_id: topicId, content_type: 'note', content_text: sections.notes, order_index: 5 },
  { id: `${topicId}-tip`, topic_id: topicId, content_type: 'tip', content_text: sections.tip, order_index: 6 },
];

export const getGeneratedTopicMeta = ({ courseTitle = '', topicTitle = '' }) => {
  const kind = inferTopicKind(topicTitle);
  return {
    description: `${topicTitle} helps you build usable knowledge inside ${courseTitle || 'this course'} by connecting explanation, syntax, and a small example.`,
    goals: GOALS[kind] || GOALS.default,
    practiceHint: PRACTICE_HINTS[kind] || PRACTICE_HINTS.default,
    estimatedTime: ['pointers', 'database', 'api', 'security'].includes(kind) ? '20-25 min' : '15-20 min',
  };
};

export const getGeneratedTopicContent = ({ topicId, topicTitle = '', courseTitle = '' }) => {
  const presentation = getCoursePresentation(courseTitle);
  const kind = inferTopicKind(topicTitle);
  const sections = buildTopicSections({
    kind,
    courseTitle,
    topicTitle,
    presentation,
  });
  const snippetPair = getSnippetPair(presentation, kind);

  return buildBlocks(topicId, {
    ...sections,
    syntax: snippetPair.syntax,
    example: snippetPair.example,
  });
};

export const shouldUseGeneratedTopicContent = (blocks = []) => {
  const filledBlocks = (blocks || []).filter((block) => block?.content_text?.trim());
  return filledBlocks.length === 0;
};
