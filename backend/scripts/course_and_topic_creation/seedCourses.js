const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, query, where } = require('firebase/firestore');

const ROADMAP_DATA = {
    "roadmaps": [
        {
            "id": "prog-langs",
            "title": "Programming Languages",
            "description": "Core language tracks to build programming fundamentals and problem-solving skills. Pick one to start; learn others later to broaden capability.",
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
                    "title": "Java Language", // Changed to make unique if needed
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
            "title": "Full Stack Web Development",
            "description": "Build complete web applications: frontend UI, backend APIs, databases, and deployment.",
            "children": [
                {
                    "id": "frontend-dev",
                    "title": "Frontend Development",
                    "short_description": "HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6",
                    "prerequisites": ["HTML basics", "Basic JavaScript recommended"],
                    "estimated_hours": 120
                },
                {
                    "id": "backend-dev",
                    "title": "Backend Development",
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
                    "title": "Full Stack Capstone",
                    "short_description": "Capstone project, testing, best practices - Weeks 16–20",
                    "prerequisites": ["All previous modules"],
                    "estimated_hours": 80
                }
            ]
        },
        {
            "id": "mobile",
            "title": "Mobile App Development",
            "description": "Design and build cross-platform mobile apps (Android & iOS) using modern frameworks.",
            "children": [
                {
                    "id": "android-dev",
                    "title": "Native Android Development",
                    "short_description": "Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8",
                    "prerequisites": ["Basic programming concepts"],
                    "estimated_hours": 160
                },
                {
                    "id": "ios-dev",
                    "title": "Native iOS Development",
                    "short_description": "Swift, Xcode, UIKit, SwiftUI - Weeks 1–8",
                    "prerequisites": ["Basic programming concepts"],
                    "estimated_hours": 160
                },
                {
                    "id": "crossplatform-dev",
                    "title": "Cross-Platform Mobile Dev",
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
                    "title": "App Publishing & Maintenance",
                    "short_description": "App Store/Play Store, updates, analytics, monitoring - Weeks 14–18",
                    "prerequisites": ["Complete mobile app development"],
                    "estimated_hours": 80
                }
            ]
        },
        {
            "id": "cybersec",
            "title": "Cyber Security",
            "description": "Learn defensive and offensive security fundamentals for protecting systems and networks.",
            "children": [
                {
                    "id": "foundations-sec",
                    "title": "Security Foundations",
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
                    "title": "Offensive Security",
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
            "title": "DevOps",
            "description": "Automation, CI/CD, containerization and cloud operations to deliver software faster and more reliably.",
            "children": [
                {
                    "id": "fundamentals-devops",
                    "title": "DevOps Fundamentals",
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
            "title": "AI & Machine Learning",
            "description": "From math foundations to building ML models and deploying them.",
            "children": [
                {
                    "id": "math-ai",
                    "title": "AI Mathematics & Fundamentals",
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
            "title": "Data Science",
            "description": "Turn raw data into insights using analysis, visualization, and predictive modeling.",
            "children": [
                {
                    "id": "python-ds",
                    "title": "Python for Data Science",
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
                    "title": "Data Modeling",
                    "short_description": "Machine learning models, feature engineering, validation - Weeks 8–14",
                    "prerequisites": ["Data modeling experience"],
                    "estimated_hours": 120
                },
                {
                    "id": "bigdata-ds",
                    "title": "Big Data Engineering",
                    "short_description": "Spark, data pipelines, cloud platforms, deployment - Weeks 12–20",
                    "prerequisites": ["Data science fundamentals"],
                    "estimated_hours": 160
                }
            ]
        }
    ]
};

async function seedCourses() {
    console.log('🌱 Starting course seeding...');

    let stats = {
        added: 0,
        skipped: 0,
        errors: 0
    };

    const coursesRef = collection(db, 'courses');

    for (const category of ROADMAP_DATA.roadmaps) {
        console.log(`\nProcessing category: ${category.title}`);

        if (!category.children) continue;

        for (const course of category.children) {
            try {
                // Check if course already exists
                const q = query(coursesRef, where("title", "==", course.title));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    console.log(`  ⚠️  Skipping "${course.title}" (already exists)`);
                    stats.skipped++;
                    continue;
                }

                // Add new course
                const newCourse = {
                    title: course.title,
                    description: course.short_description,
                    short_description: course.short_description,
                    level: "Beginner", // Default
                    category: category.title,
                    topicsCount: 0,
                    prerequisites: course.prerequisites || [],
                    estimated_hours: course.estimated_hours || 40,
                    createdAt: new Date().toISOString(),
                    status: 'published'
                };

                await addDoc(coursesRef, newCourse);
                console.log(`  ✅ Added "${course.title}"`);
                stats.added++;

            } catch (error) {
                console.error(`  ❌ Error adding "${course.title}":`, error.message);
                stats.errors++;
            }
        }
    }

    console.log('\n----------------------------------------');
    console.log('Seeding Complete!');
    console.log(`Added: ${stats.added}`);
    console.log(`Skipped: ${stats.skipped}`);
    console.log(`Errors: ${stats.errors}`);

    // Exit process
    process.exit(0);
}

seedCourses();
