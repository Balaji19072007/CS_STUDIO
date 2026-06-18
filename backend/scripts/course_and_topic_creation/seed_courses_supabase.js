const { supabase } = require('../config/supabase');

// Complete Course Structure with IDs
const COURSES_DATA = [
    // ==================== PROGRAMMING LANGUAGES ====================
    {
        id: 'c-programming',
        title: 'C Programming',
        description: 'Master the C language with this comprehensive curriculum covering basics, memory management, and advanced concepts.',
        level: 'Beginner',
        category: 'Programming Languages',
        estimated_hours: 80,
        modules: [] // No modules - direct course
    },
    {
        id: 'python-programming',
        title: 'Python Programming',
        description: 'Master Python from basics to advanced topics including Data Science, Machine Learning, and Web Development concepts.',
        level: 'Beginner',
        category: 'Programming Languages',
        estimated_hours: 90,
        modules: [] // No modules - direct course
    },
    {
        id: 'java-programming',
        title: 'Java Programming',
        description: 'Master Java with this comprehensive curriculum covering basics, OOP, Collections, and Advanced concepts.',
        level: 'Intermediate',
        category: 'Programming Languages',
        estimated_hours: 100,
        modules: [] // No modules - direct course
    },
    {
        id: 'cpp-programming',
        title: 'C++ Programming',
        description: 'Master C++ usage for systems programming, game development, and high-performance applications.',
        level: 'Advanced',
        category: 'Programming Languages',
        estimated_hours: 120,
        modules: [] // No modules - direct course
    },
    {
        id: 'csharp-programming',
        title: 'C# Programming',
        description: 'Master C# for building Windows applications, game development with Unity, and enterprise backend systems.',
        level: 'Intermediate',
        category: 'Programming Languages',
        estimated_hours: 100,
        modules: [] // No modules - direct course
    },

    // ==================== FULL STACK WEB DEVELOPMENT ====================
    {
        id: 'fullstack-web-dev',
        title: 'Full Stack Web Development',
        description: 'Build complete web applications: frontend UI, backend APIs, databases, and deployment.',
        level: 'Intermediate',
        category: 'Full Stack Web Development',
        estimated_hours: 600,
        modules: [
            {
                id: 'frontend-dev',
                title: 'Frontend Development',
                description: 'HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6',
                level: 'Beginner',
                order: 1,
                estimated_hours: 120
            },
            {
                id: 'backend-dev',
                title: 'Backend Development',
                description: 'Node.js/Python, Express/Django, REST APIs, authentication - Weeks 6–12',
                level: 'Beginner',
                order: 2,
                estimated_hours: 120
            },
            {
                id: 'database-modeling',
                title: 'Database & Data Modeling',
                description: 'SQL, MongoDB, database design, ORM/ODM - Weeks 8–14',
                level: 'Intermediate',
                order: 3,
                estimated_hours: 120
            },
            {
                id: 'backend-apis-mobile',
                title: 'Backend & APIs for Mobile',
                description: 'REST APIs, GraphQL, offline sync, push notifications - Weeks 10–14',
                level: 'Intermediate',
                order: 4,
                estimated_hours: 80
            },
            {
                id: 'deployment-devops',
                title: 'Deployment & DevOps Essentials',
                description: 'Docker, AWS, CI/CD, performance optimization - Weeks 12–16',
                level: 'Intermediate',
                order: 5,
                estimated_hours: 80
            },
            {
                id: 'web-app-security',
                title: 'Web & App Security',
                description: 'OWASP Top 10, penetration testing, secure coding - Weeks 8–14',
                level: 'Intermediate',
                order: 6,
                estimated_hours: 120
            },
            {
                id: 'fullstack-capstone',
                title: 'Full Stack Capstone',
                description: 'Capstone project, testing, best practices - Weeks 16–20',
                level: 'Advanced',
                order: 7,
                estimated_hours: 80
            }
        ]
    },

    // ==================== MOBILE APP DEVELOPMENT ====================
    {
        id: 'mobile-app-dev',
        title: 'Mobile App Development',
        description: 'Design and build cross-platform mobile apps (Android & iOS) using modern frameworks.',
        level: 'Intermediate',
        category: 'Mobile App Development',
        estimated_hours: 420,
        modules: [
            {
                id: 'native-android',
                title: 'Native Android Development',
                description: 'Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8',
                level: 'Beginner',
                order: 1,
                estimated_hours: 160
            },
            {
                id: 'native-ios',
                title: 'Native iOS Development',
                description: 'Swift, Xcode, UIKit, SwiftUI - Weeks 1–8',
                level: 'Intermediate',
                order: 2,
                estimated_hours: 160
            },
            {
                id: 'cross-platform-mobile',
                title: 'Cross-Platform Mobile Dev',
                description: 'React Native/Flutter, shared codebase, platform APIs - Weeks 6–12',
                level: 'Intermediate',
                order: 3,
                estimated_hours: 120
            }
        ]
    },

    // ==================== DATA SCIENCE ====================
    {
        id: 'data-science',
        title: 'Data Science',
        description: 'Turn raw data into insights using analysis, visualization, and predictive modeling.',
        level: 'Intermediate',
        category: 'Data Science',
        estimated_hours: 520,
        modules: [
            {
                id: 'python-data-science',
                title: 'Python for Data Science',
                description: 'Pandas, NumPy, statistical analysis, probability - Weeks 1–6',
                level: 'Beginner',
                order: 1,
                estimated_hours: 120
            },
            {
                id: 'data-wrangling-viz',
                title: 'Data Wrangling & Visualization',
                description: 'Data cleaning, Matplotlib/Seaborn, EDA techniques - Weeks 4–10',
                level: 'Beginner',
                order: 2,
                estimated_hours: 120
            },
            {
                id: 'data-modeling',
                title: 'Data Modeling',
                description: 'Machine learning models, feature engineering, validation - Weeks 8–14',
                level: 'Intermediate',
                order: 3,
                estimated_hours: 120
            },
            {
                id: 'big-data-engineering',
                title: 'Big Data Engineering',
                description: 'Spark, data pipelines, cloud platforms, deployment - Weeks 12–20',
                level: 'Advanced',
                order: 4,
                estimated_hours: 160
            }
        ]
    },

    // ==================== AI & MACHINE LEARNING ====================
    {
        id: 'ai-machine-learning',
        title: 'AI & Machine Learning',
        description: 'From math foundations to building ML models and deploying them.',
        level: 'Advanced',
        category: 'AI & Machine Learning',
        estimated_hours: 720,
        modules: [
            {
                id: 'ai-math-fundamentals',
                title: 'AI Mathematics & Fundamentals',
                description: 'Linear algebra, calculus, statistics, Python for ML - Weeks 1–6',
                level: 'Beginner',
                order: 1,
                estimated_hours: 120
            },
            {
                id: 'core-ml-algorithms',
                title: 'Core ML Algorithms',
                description: 'Supervised/unsupervised learning, model evaluation - Weeks 6–12',
                level: 'Intermediate',
                order: 2,
                estimated_hours: 120
            },
            {
                id: 'deep-learning',
                title: 'Deep Learning',
                description: 'Neural networks, TensorFlow/PyTorch, CNN, RNN - Weeks 10–18',
                level: 'Advanced',
                order: 3,
                estimated_hours: 160
            },
            {
                id: 'containerization',
                title: 'Containerization',
                description: 'Docker, container orchestration, best practices - Weeks 4–10',
                level: 'Intermediate',
                order: 4,
                estimated_hours: 120
            },
            {
                id: 'production-mlops',
                title: 'Production & MLOps',
                description: 'Model deployment, monitoring, pipelines, scaling - Weeks 16–24',
                level: 'Advanced',
                order: 5,
                estimated_hours: 160
            },
            {
                id: 'app-publishing-maintenance',
                title: 'App Publishing & Maintenance',
                description: 'App Store/Play Store, updates, analytics, monitoring - Weeks 14–18',
                level: 'Intermediate',
                order: 6,
                estimated_hours: 80
            }
        ]
    },

    // ==================== DEVOPS ====================
    {
        id: 'devops',
        title: 'DevOps',
        description: 'Automation, CI/CD, containerization and cloud operations to deliver software faster and more reliably.',
        level: 'Advanced',
        category: 'DevOps',
        estimated_hours: 400,
        modules: [
            {
                id: 'devops-fundamentals',
                title: 'DevOps Fundamentals',
                description: 'Version control, Jenkins/GitLab CI, automation basics - Weeks 1–6',
                level: 'Beginner',
                order: 1,
                estimated_hours: 120
            },
            {
                id: 'orchestration-infrastructure',
                title: 'Orchestration & Infrastructure',
                description: 'Kubernetes, Terraform, cloud platforms, IaC - Weeks 8–16',
                level: 'Intermediate',
                order: 2,
                estimated_hours: 160
            },
            {
                id: 'observability-reliability',
                title: 'Observability & Reliability',
                description: 'Monitoring, logging, alerting, SRE practices - Weeks 12–20',
                level: 'Advanced',
                order: 3,
                estimated_hours: 120
            }
        ]
    },

    // ==================== CYBER SECURITY ====================
    {
        id: 'cyber-security',
        title: 'Cyber Security',
        description: 'Learn defensive and offensive security fundamentals for protecting systems and networks.',
        level: 'Advanced',
        category: 'Cyber Security',
        estimated_hours: 520,
        modules: [
            {
                id: 'security-foundations',
                title: 'Security Foundations',
                description: 'Security concepts, TCP/IP, network protocols, tools - Weeks 1–6',
                level: 'Beginner',
                order: 1,
                estimated_hours: 120
            },
            {
                id: 'defensive-security',
                title: 'Defensive Security',
                description: 'Firewalls, IDS/IPS, access control, security policies - Weeks 6–12',
                level: 'Intermediate',
                order: 2,
                estimated_hours: 120
            },
            {
                id: 'offensive-security',
                title: 'Offensive Security',
                description: 'Ethical hacking, vulnerability assessment, exploitation - Weeks 12–20',
                level: 'Advanced',
                order: 3,
                estimated_hours: 160
            },
            {
                id: 'forensics-incident-response',
                title: 'Forensics & Incident Response',
                description: 'Digital forensics, malware analysis, incident handling - Weeks 16–22',
                level: 'Advanced',
                order: 4,
                estimated_hours: 120
            }
        ]
    }
];

async function seedCoursesToSupabase() {
    console.log('🌱 Starting Supabase Course Seeding...\n');

    let stats = {
        coursesAdded: 0,
        coursesSkipped: 0,
        modulesAdded: 0,
        errors: 0
    };

    for (const courseData of COURSES_DATA) {
        try {
            console.log(`\n📚 Processing: ${courseData.title}`);

            // Check if course already exists
            const { data: existingCourse } = await supabase
                .from('courses')
                .select('id')
                .eq('id', courseData.id)
                .single();

            if (existingCourse) {
                console.log(`  ⚠️  Course already exists, skipping...`);
                stats.coursesSkipped++;
                continue;
            }

            // Insert course
            const { data: insertedCourse, error: courseError } = await supabase
                .from('courses')
                .insert({
                    id: courseData.id,
                    title: courseData.title,
                    description: courseData.description,
                    level: courseData.level,
                    category: courseData.category,
                    estimated_hours: courseData.estimated_hours,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (courseError) {
                console.error(`  ❌ Error inserting course:`, courseError.message);
                stats.errors++;
                continue;
            }

            console.log(`  ✅ Course added: ${courseData.title}`);
            stats.coursesAdded++;

            // Insert modules if they exist
            if (courseData.modules && courseData.modules.length > 0) {
                console.log(`  📦 Adding ${courseData.modules.length} modules...`);

                for (const module of courseData.modules) {
                    const { error: moduleError } = await supabase
                        .from('course_modules')
                        .insert({
                            id: module.id,
                            course_id: courseData.id,
                            title: module.title,
                            description: module.description,
                            level: module.level,
                            order: module.order,
                            estimated_hours: module.estimated_hours,
                            created_at: new Date().toISOString()
                        });

                    if (moduleError) {
                        console.error(`    ❌ Error inserting module "${module.title}":`, moduleError.message);
                        stats.errors++;
                    } else {
                        console.log(`    ✅ Module added: ${module.title}`);
                        stats.modulesAdded++;
                    }
                }
            }

        } catch (error) {
            console.error(`  ❌ Unexpected error:`, error.message);
            stats.errors++;
        }
    }

    console.log('\n========================================');
    console.log('✨ Seeding Complete!');
    console.log('========================================');
    console.log(`Courses Added: ${stats.coursesAdded}`);
    console.log(`Courses Skipped: ${stats.coursesSkipped}`);
    console.log(`Modules Added: ${stats.modulesAdded}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================================\n');

    process.exit(0);
}

// Run the seeding
seedCoursesToSupabase().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
