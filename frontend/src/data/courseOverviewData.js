const COURSE_OVERRIDES = {
  'C Programming': {
    summary:
      'This course teaches C the way learners actually need it: by connecting syntax to memory, compilation, and real system-level thinking. You will not only write valid C programs, you will understand why the language still matters in operating systems, embedded devices, tooling, and performance-critical software.',
    whyLearn: [
      'Build a strong foundation for systems programming, compilers, embedded work, and performance-oriented development.',
      'Learn how variables, memory, compilation, and low-level program flow really work instead of treating them as black boxes.',
      'Prepare yourself to understand harder languages and harder codebases with much less confusion later.',
    ],
    outcomes: [
      'Read and write complete C programs confidently.',
      'Explain the compile pipeline, primitive types, variables, and basic memory sizing clearly.',
      'Solve guided coding challenges instead of only reading theory.',
    ],
    prerequisites: [
      'Comfort using a computer and editor.',
      'Patience to compile, fix errors, and try again.',
      'No prior programming experience is required.',
    ],
    certificate:
      'The completion certificate is meant to represent demonstrated course progress, not just page views. Once every lesson topic in the course is complete, learners can issue and verify their certificate from inside the app.',
  },
  'Python Programming': {
    summary:
      'This course focuses on practical Python for beginners who want to move quickly without skipping the fundamentals. It emphasizes readable code, common built-in tools, and the habits that make Python useful for automation, data work, scripting, and backend development.',
    whyLearn: [
      'Python is one of the fastest languages to become productive in without giving up real career value.',
      'Its syntax is beginner-friendly while still scaling into serious web, data, and automation projects.',
      'A good Python foundation makes later work in APIs, data science, and machine learning much smoother.',
    ],
    outcomes: [
      'Write clean Python programs with functions, control flow, and core data structures.',
      'Use Python to automate simple tasks and build small applications.',
      'Understand where Python fits best compared with lower-level languages like C.',
    ],
    prerequisites: [
      'Basic computer literacy.',
      'Willingness to practice regularly.',
      'No prior language is required.',
    ],
    certificate:
      'The certificate validates that the learner completed the course path and reached the end of the guided material.',
  },
  'Java Programming': {
    summary:
      'This Java course is built for learners who want structure, discipline, and object-oriented thinking. It covers the language as a serious engineering tool, not just as syntax for interview exercises.',
    whyLearn: [
      'Java remains a strong choice for enterprise systems, Android foundations, and large team codebases.',
      'Its type system and tooling encourage strong engineering habits.',
      'Learning Java sharpens object-oriented design and large-project thinking.',
    ],
    outcomes: [
      'Write and organize Java programs with confidence.',
      'Understand classes, objects, methods, and common standard-library patterns.',
      'Move more comfortably into backend or Android-adjacent learning paths.',
    ],
    prerequisites: [
      'Basic programming logic is helpful but not required.',
      'Consistency with practice matters more than speed.',
    ],
    certificate:
      'Certificates are available after course completion so learners can show structured progress on the full path.',
  },
  'C++ Programming': {
    summary:
      'C++ extends the control of C with powerful abstraction tools. This course is for learners who want performance, deeper language mechanics, and the ability to work close to the machine without giving up modern design patterns.',
    whyLearn: [
      'C++ is widely used in engines, graphics, simulation, finance, and performance-heavy applications.',
      'It teaches memory, ownership, and abstraction at a deeper level than many other languages.',
      'A solid C++ background pays off when reading complex native codebases.',
    ],
    outcomes: [
      'Understand how C++ builds on C.',
      'Write small native programs with strong performance awareness.',
      'Prepare for more advanced topics such as classes, templates, and STL usage.',
    ],
    prerequisites: [
      'Some exposure to programming helps.',
      'C fundamentals are a strong advantage.',
    ],
    certificate:
      'Completion certificates reflect progress through the full learning sequence, not only course enrollment.',
  },
  'C# Programming': {
    summary:
      'This course introduces C# as a modern, productive language for applications, backend services, and game development. It balances language syntax with practical software-building habits.',
    whyLearn: [
      'C# is excellent for .NET applications, backend APIs, and Unity-based games.',
      'The language has modern tooling and strong readability.',
      'It is a solid bridge between beginner-friendly development and professional application work.',
    ],
    outcomes: [
      'Write C# programs using variables, control flow, and reusable methods.',
      'Understand how the language fits into the .NET ecosystem.',
      'Prepare for app or game-focused learning tracks.',
    ],
    prerequisites: [
      'Basic programming curiosity.',
      'No prior C-family language is required.',
    ],
    certificate:
      'Learners can issue a certificate after the course path is fully completed.',
  },
  'Frontend Development': {
    summary:
      'Frontend Development in this catalog is centered on turning ideas into responsive, accessible interfaces that real users can navigate comfortably. The focus is not only on components, but on the user experience decisions behind them.',
    whyLearn: [
      'Frontend skills let you build visible, testable features quickly.',
      'Strong UI work combines logic, design sensitivity, and accessibility.',
      'It is a core building block for product engineering and freelance work alike.',
    ],
    outcomes: [
      'Structure pages cleanly with HTML, CSS, and JavaScript patterns.',
      'Build interactive interfaces that feel intentional instead of improvised.',
      'Prepare for React-style application development with a stronger baseline.',
    ],
    prerequisites: [
      'Comfort using a browser and editor.',
      'A willingness to test on different screen sizes.',
    ],
    certificate:
      'The course certificate is intended as a milestone for learners who finish the guided progression and practice work.',
  },
  'Backend Development': {
    summary:
      'This backend course is about building the invisible parts of applications well: routing, business logic, authentication, persistence, and reliability. The goal is to help learners think like service developers, not just API consumers.',
    whyLearn: [
      'Backend systems power data flow, security, and app behavior.',
      'It builds habits around architecture, validation, and maintainability.',
      'Strong backend understanding makes full stack work significantly easier.',
    ],
    outcomes: [
      'Design and implement practical API flows.',
      'Understand the responsibilities of a server-side application.',
      'Prepare for authentication, database, and deployment modules.',
    ],
    prerequisites: [
      'Basic programming fundamentals.',
      'Comfort reading code and debugging step by step.',
    ],
    certificate:
      'Certificates are designed to reflect finished learning paths and working knowledge of the course material.',
  },
  'Database & Data Modeling': {
    summary:
      'This course teaches how data should be shaped before it is stored and queried. Good data modeling reduces bugs, keeps APIs cleaner, and makes applications easier to evolve.',
    whyLearn: [
      'Poor data models create pain across an entire application stack.',
      'Database design skills improve both backend quality and analytics readiness.',
      'It helps you reason about relationships, constraints, and long-term maintainability.',
    ],
    outcomes: [
      'Design tables and relationships that match product behavior.',
      'Write clearer queries and understand why schema choices matter.',
      'Think more carefully about data ownership and integrity.',
    ],
    prerequisites: [
      'Basic programming logic.',
      'Some backend exposure helps, but is not mandatory.',
    ],
    certificate:
      'Certificate access unlocks once learners finish the full guided material for this course.',
  },
  'Security Foundations': {
    summary:
      'Security Foundations introduces the mindset, terminology, and workflows that every modern developer should understand. It is less about hype and more about how real systems are attacked, defended, and monitored.',
    whyLearn: [
      'Security awareness improves every engineering role, not only security jobs.',
      'It helps you spot risky assumptions earlier in a project.',
      'The course builds a base for defensive, offensive, and incident-response tracks.',
    ],
    outcomes: [
      'Understand core security concepts and common attack surfaces.',
      'Reason about safer defaults in applications and infrastructure.',
      'Prepare for deeper cyber-security paths with stronger fundamentals.',
    ],
    prerequisites: [
      'General computing curiosity.',
      'A willingness to think carefully about systems and failure modes.',
    ],
    certificate:
      'Certificates are issued after the course path is fully completed and tracked inside the platform.',
  },
  'Core ML Algorithms': {
    summary:
      'Core ML Algorithms is built to help learners move from "I can run a notebook" to "I understand what the model is doing." The emphasis is on intuition, evaluation, and responsible use of common machine learning methods.',
    whyLearn: [
      'Understanding the core algorithms helps you avoid treating ML as magic.',
      'It improves your ability to choose appropriate models and evaluate them honestly.',
      'This knowledge is the bridge between math basics and production ML practice.',
    ],
    outcomes: [
      'Explain common supervised and unsupervised learning approaches.',
      'Compare models using metrics instead of guesswork.',
      'Build a more reliable foundation for advanced ML and MLOps work.',
    ],
    prerequisites: [
      'Basic Python familiarity.',
      'Comfort with simple algebra and data tables.',
    ],
    certificate:
      'The certificate marks completion of the guided curriculum and practice progression for the course.',
  },
};

const KEYWORD_PRESETS = [
  {
    match: (title) => /mobile|android|ios|flutter|react native/i.test(title),
    data: {
      summary:
        'This course teaches mobile development as product engineering for smaller screens, touch interactions, and real device constraints. It focuses on building apps that feel stable, intentional, and useful in daily life.',
      whyLearn: [
        'Mobile development teaches design, performance, and platform thinking all at once.',
        'Apps live close to the user and surface product decisions immediately.',
        'The skills transfer well across native and cross-platform ecosystems.',
      ],
      outcomes: [
        'Understand the lifecycle of a mobile feature from UI to release.',
        'Reason about state, navigation, and user experience on devices.',
        'Prepare for more advanced platform-specific work.',
      ],
      prerequisites: [
        'Basic programming familiarity is helpful.',
        'Comfort experimenting and testing on real devices or emulators.',
      ],
      certificate:
        'Certificates unlock after the guided sequence is completed within the app.',
    },
  },
  {
    match: (title) => /data|visualization|wrangling|big data/i.test(title),
    data: {
      summary:
        'This course teaches how to clean, shape, inspect, and communicate with data so that analysis supports real decisions instead of producing vague charts and disconnected scripts.',
      whyLearn: [
        'Data work is valuable across product, research, and engineering roles.',
        'Careful data handling improves the quality of every later model or dashboard.',
        'It builds practical habits around evidence, not guesses.',
      ],
      outcomes: [
        'Work with datasets more confidently and systematically.',
        'Interpret patterns and communicate findings clearly.',
        'Prepare for modeling and machine learning with stronger foundations.',
      ],
      prerequisites: [
        'Basic spreadsheet or programming comfort helps.',
        'Curiosity about patterns, trends, and evidence-based thinking.',
      ],
      certificate:
        'The certificate represents completion of the tracked course path and guided exercises.',
    },
  },
  {
    match: (title) => /security|forensics|incident|offensive|defensive/i.test(title),
    data: {
      summary:
        'This course approaches security as disciplined systems thinking. You will learn how weaknesses are found, how incidents are understood, and how safer practices are built into real workflows.',
      whyLearn: [
        'Security skills improve your quality as both a builder and reviewer of software.',
        'The field rewards careful reasoning and practical curiosity.',
        'It opens doors to specialized defensive, offensive, and response work.',
      ],
      outcomes: [
        'Recognize common weaknesses and unsafe assumptions.',
        'Reason more clearly about system trust boundaries.',
        'Build a strong stepping stone for specialized security paths.',
      ],
      prerequisites: [
        'General computer literacy.',
        'Patience for detail-oriented investigation.',
      ],
      certificate:
        'Certificates are issued after the platform records full course completion.',
    },
  },
  {
    match: (title) => /devops|infrastructure|observability|deployment|container/i.test(title),
    data: {
      summary:
        'This course focuses on the operational side of software: shipping, monitoring, scaling, and keeping systems dependable once users rely on them.',
      whyLearn: [
        'Deployment and reliability skills are essential for production software.',
        'They connect development choices to real-world system behavior.',
        'Strong operational thinking makes you more effective across the stack.',
      ],
      outcomes: [
        'Understand the lifecycle of software beyond local development.',
        'Think in terms of automation, repeatability, and visibility.',
        'Prepare for CI/CD, infrastructure, and SRE-style workflows.',
      ],
      prerequisites: [
        'Basic coding and command-line comfort.',
        'A willingness to learn how systems behave under load and failure.',
      ],
      certificate:
        'The certificate becomes available after course completion is fully tracked in the app.',
    },
  },
];

const defaultOverview = (title) => ({
  summary: `${title} is presented as a guided learning path with practical explanations, hands-on steps, and progress tracking so learners can move from recognition to real working knowledge instead of only reading concepts.`,
  whyLearn: [
    'The course is structured to make the subject approachable without flattening the important details.',
    'It is designed to connect theory to hands-on work instead of leaving concepts abstract.',
    'Completing the path gives learners a clearer sense of what to study next and what they can already do.',
  ],
  outcomes: [
    'Understand the core ideas of the subject in a practical way.',
    'Apply the concepts through guided learning steps and exercises.',
    'Finish with a cleaner roadmap for deeper study or project work.',
  ],
  prerequisites: [
    'Basic computer comfort.',
    'Consistency and willingness to practice.',
  ],
  certificate:
    'The platform certificate is intended as a completion record for learners who finish the tracked course path.',
});

export const getCourseOverview = (title = '') => {
  if (COURSE_OVERRIDES[title]) {
    return COURSE_OVERRIDES[title];
  }

  const preset = KEYWORD_PRESETS.find((candidate) => candidate.match(title));
  if (preset) {
    return preset.data;
  }

  return defaultOverview(title || 'This course');
};
