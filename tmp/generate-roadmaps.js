const fs = require('fs');

const data = {
  "roadmaps": [
    {
      "id": "prog-langs",
      "children": [
        {
          "id": "c-lang",
          "title": "C Language",
          "short_description": "Low-level procedural language — great for learning memory, pointers, and fundamentals of computing.",
          "prerequisites": ["Basic computer literacy"],
          "estimated_hours": 80
        },
        {
          "id": "java-lang",
          "title": "Java Language",
          "short_description": "Object-oriented language suited for backend, enterprise apps, and Android foundations.",
          "prerequisites": ["Basic programming concepts (recommended)"],
          "estimated_hours": 100
        },
        {
          "id": "python-lang",
          "title": "Python Language",
          "short_description": "High-level, beginner-friendly language used in web, automation, data science, and AI.",
          "prerequisites": ["Basic computer literacy"],
          "estimated_hours": 90
        }
      ]
    },
    {
      "id": "fullstack",
      "children": [
        {
          "id": "frontend-dev",
          "title": "Frontend",
          "short_description": "HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6",
          "prerequisites": ["HTML basics", "Basic JavaScript recommended"],
          "estimated_hours": 120
        },
        {
          "id": "backend-dev",
          "title": "Backend",
          "short_description": "Node.js/Python, Express/Django, REST APIs, authentication - Weeks 6–12",
          "prerequisites": ["Basic programming", "Understanding of web concepts"],
          "estimated_hours": 120
        },
        {
          "id": "database-dev",
          "title": "Database & Data Modeling",
          "short_description": "SQL, MongoDB, database design, ORM/ODM - Weeks 8–14",
          "prerequisites": ["Backend basics"],
          "estimated_hours": 120
        },
        {
          "id": "deployment-dev",
          "title": "Deployment & DevOps Essentials",
          "short_description": "Docker, AWS, CI/CD, performance optimization - Weeks 12–16",
          "prerequisites": ["Frontend & Backend knowledge"],
          "estimated_hours": 80
        },
        {
          "id": "fullstack-dev",
          "title": "Full Stack Putting It Together",
          "short_description": "Capstone project, testing, best practices - Weeks 16–20",
          "prerequisites": ["All previous modules"],
          "estimated_hours": 80
        }
      ]
    },
    {
      "id": "mobile",
      "children": [
        {
          "id": "android-dev",
          "title": "Native Android",
          "short_description": "Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8",
          "prerequisites": ["Basic programming concepts"],
          "estimated_hours": 160
        },
        {
          "id": "ios-dev",
          "title": "Native iOS",
          "short_description": "Swift, Xcode, UIKit, SwiftUI - Weeks 1–8",
          "prerequisites": ["Basic programming concepts"],
          "estimated_hours": 160
        },
        {
          "id": "crossplatform-dev",
          "title": "Cross-Platform",
          "short_description": "React Native/Flutter, shared codebase, platform APIs - Weeks 6–12",
          "prerequisites": ["JavaScript or Dart knowledge recommended"],
          "estimated_hours": 120
        },
        {
          "id": "backend-mobile",
          "title": "Backend & APIs for Mobile",
          "short_description": "REST APIs, GraphQL, offline sync, push notifications - Weeks 10–14",
          "prerequisites": ["Mobile development basics"],
          "estimated_hours": 80
        },
        {
          "id": "publishing-mobile",
          "title": "Publishing & Maintenance",
          "short_description": "App Store/Play Store, updates, analytics, monitoring - Weeks 14–18",
          "prerequisites": ["Complete mobile app development"],
          "estimated_hours": 80
        }
      ]
    },
    {
      "id": "cybersec",
      "children": [
        {
          "id": "foundations-sec",
          "title": "Foundations & Networking",
          "short_description": "Security concepts, TCP/IP, network protocols, tools - Weeks 1–6",
          "prerequisites": ["Basic networking knowledge"],
          "estimated_hours": 120
        },
        {
          "id": "defensive-sec",
          "title": "Defensive Security",
          "short_description": "Firewalls, IDS/IPS, access control, security policies - Weeks 6–12",
          "prerequisites": ["Networking fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "webapp-sec",
          "title": "Web & App Security",
          "short_description": "OWASP Top 10, penetration testing, secure coding - Weeks 8–14",
          "prerequisites": ["System administration basics"],
          "estimated_hours": 120
        },
        {
          "id": "offensive-sec",
          "title": "Offensive Security & Red Teaming",
          "short_description": "Ethical hacking, vulnerability assessment, exploitation - Weeks 12–20",
          "prerequisites": ["Security fundamentals"],
          "estimated_hours": 160
        },
        {
          "id": "forensics-sec",
          "title": "Forensics & Incident Response",
          "short_description": "Digital forensics, malware analysis, incident handling - Weeks 16–22",
          "prerequisites": ["All security modules"],
          "estimated_hours": 120
        }
      ]
    },
    {
      "id": "devops",
      "children": [
        {
          "id": "fundamentals-devops",
          "title": "DevOps Fundamentals & CI/CD",
          "short_description": "Version control, Jenkins/GitLab CI, automation basics - Weeks 1–6",
          "prerequisites": ["Comfort with command line"],
          "estimated_hours": 120
        },
        {
          "id": "container-devops",
          "title": "Containerization",
          "short_description": "Docker, container orchestration, best practices - Weeks 4–10",
          "prerequisites": ["Basic system administration"],
          "estimated_hours": 120
        },
        {
          "id": "orchestration-devops",
          "title": "Orchestration & Infrastructure",
          "short_description": "Kubernetes, Terraform, cloud platforms, IaC - Weeks 8–16",
          "prerequisites": ["Networking basics"],
          "estimated_hours": 160
        },
        {
          "id": "observability-devops",
          "title": "Observability & Reliability",
          "short_description": "Monitoring, logging, alerting, SRE practices - Weeks 12–20",
          "prerequisites": ["Infrastructure knowledge"],
          "estimated_hours": 120
        }
      ]
    },
    {
      "id": "ai-ml",
      "children": [
        {
          "id": "math-ai",
          "title": "Math & Fundamentals",
          "short_description": "Linear algebra, calculus, statistics, Python for ML - Weeks 1–6",
          "prerequisites": ["Python basics", "High-school level math"],
          "estimated_hours": 120
        },
        {
          "id": "coreml-ai",
          "title": "Core ML Algorithms",
          "short_description": "Supervised/unsupervised learning, model evaluation - Weeks 6–12",
          "prerequisites": ["Machine learning fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "deeplearning-ai",
          "title": "Deep Learning",
          "short_description": "Neural networks, TensorFlow/PyTorch, CNN, RNN - Weeks 10–18",
          "prerequisites": ["ML/DL fundamentals"],
          "estimated_hours": 160
        },
        {
          "id": "production-ai",
          "title": "Production & MLOps",
          "short_description": "Model deployment, monitoring, pipelines, scaling - Weeks 16–24",
          "prerequisites": ["Deep learning knowledge"],
          "estimated_hours": 160
        }
      ]
    },
    {
      "id": "data-science",
      "children": [
        {
          "id": "python-ds",
          "title": "Python & Statistics",
          "short_description": "Pandas, NumPy, statistical analysis, probability - Weeks 1–6",
          "prerequisites": ["Python basics", "Basic statistics"],
          "estimated_hours": 120
        },
        {
          "id": "wrangling-ds",
          "title": "Data Wrangling & Visualization",
          "short_description": "Data cleaning, Matplotlib/Seaborn, EDA techniques - Weeks 4–10",
          "prerequisites": ["Data analytics fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "modeling-ds",
          "title": "Modeling & Evaluation",
          "short_description": "Machine learning models, feature engineering, validation - Weeks 8–14",
          "prerequisites": ["Data modeling experience"],
          "estimated_hours": 120
        },
        {
          "id": "bigdata-ds",
          "title": "Big Data & Pipelines",
          "short_description": "Spark, data pipelines, cloud platforms, deployment - Weeks 12–20",
          "prerequisites": ["Data science fundamentals"],
          "estimated_hours": 160
        }
      ]
    }
  ]
};

const mapToSlug = (id) => {
  const map = {
    'c-lang': 'c-programming',
    'python-lang': 'python-programming',
    'java-lang': 'java-programming',
    'frontend-dev': 'frontend-development',
    'backend-dev': 'backend-development',
    'database-dev': 'database-development',
    'deployment-dev': 'deployment-development',
    'fullstack-dev': 'fullstack-development',
    'android-dev': 'android-development',
    'ios-dev': 'ios-development',
    'crossplatform-dev': 'cross-development',
    'backend-mobile': 'backend-apis-mobile-development',
    'publishing-mobile': 'publishing-mobile-development',
    'foundations-sec': 'cyber-security-foundations',
    'defensive-sec': 'cyber-security-defensive',
    'webapp-sec': 'cyber-security-webapp',
    'offensive-sec': 'cyber-security-offensive',
    'forensics-sec': 'cyber-security-forensics',
    'fundamentals-devops': 'devops-fundamentals',
    'container-devops': 'devops-container',
    'orchestration-devops': 'devops-orchestration',
    'observability-devops': 'devops-observability',
    'math-ai': 'ai-ml-math',
    'coreml-ai': 'ai-ml-core',
    'deeplearning-ai': 'ai-ml-deeplearning',
    'production-ai': 'ai-ml-production',
    'python-ds': 'data-science-python',
    'wrangling-ds': 'data-science-wrangling',
    'modeling-ds': 'data-science-modeling',
    'bigdata-ds': 'data-science-bigdata'
  };
  return map[id] || id;
};

const output = [];

for (const path of data.roadmaps) {
  for (const child of path.children) {
    output.push({
      id: child.id,
      slug: mapToSlug(child.id),
      title: child.title,
      description: child.short_description,
      status: "published",
      publishedAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-01T00:00:00Z",
      tags: ["Roadmap", path.title],
      category: path.title,
      seoTitle: `${child.title} Roadmap - CS Studio`,
      seoDescription: child.short_description,
      ogImage: `/images/roadmaps/${child.id}.jpg`,
      prerequisites: child.prerequisites,
      estimatedHours: child.estimated_hours,
      learningPathId: path.id
    });
  }
}

fs.writeFileSync('C:/files/projects/CS studio/frontend/src/data/roadmaps/roadmaps-index.json', JSON.stringify(output, null, 2));
console.log("Done");
