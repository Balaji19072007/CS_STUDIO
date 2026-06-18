const { supabase } = require('../config/supabase');

// ================================================
// ALL 27 COURSE MODULES DATA
// ================================================

const MODULES = [
    // FULL STACK WEB DEVELOPMENT (7 modules)
    {
        id: 'frontend-dev',
        course_id: 'fullstack-web-dev',
        title: 'Frontend Development',
        description: 'HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 120
    },
    {
        id: 'backend-dev',
        course_id: 'fullstack-web-dev',
        title: 'Backend Development',
        description: 'Node.js/Python, Express/Django, REST APIs, authentication - Weeks 6–12',
        level: 'Beginner',
        order_index: 2,
        estimated_hours: 120
    },
    {
        id: 'database-modeling',
        course_id: 'fullstack-web-dev',
        title: 'Database & Data Modeling',
        description: 'SQL, MongoDB, database design, ORM/ODM - Weeks 8–14',
        level: 'Intermediate',
        order_index: 3,
        estimated_hours: 120
    },
    {
        id: 'backend-apis-mobile',
        course_id: 'fullstack-web-dev',
        title: 'Backend & APIs for Mobile',
        description: 'REST APIs, GraphQL, offline sync, push notifications - Weeks 10–14',
        level: 'Intermediate',
        order_index: 4,
        estimated_hours: 80
    },
    {
        id: 'deployment-devops',
        course_id: 'fullstack-web-dev',
        title: 'Deployment & DevOps Essentials',
        description: 'Docker, AWS, CI/CD, performance optimization - Weeks 12–16',
        level: 'Intermediate',
        order_index: 5,
        estimated_hours: 80
    },
    {
        id: 'web-app-security',
        course_id: 'fullstack-web-dev',
        title: 'Web & App Security',
        description: 'OWASP Top 10, penetration testing, secure coding - Weeks 8–14',
        level: 'Intermediate',
        order_index: 6,
        estimated_hours: 120
    },
    {
        id: 'fullstack-capstone',
        course_id: 'fullstack-web-dev',
        title: 'Full Stack Capstone',
        description: 'Capstone project, testing, best practices - Weeks 16–20',
        level: 'Advanced',
        order_index: 7,
        estimated_hours: 80
    },

    // MOBILE APP DEVELOPMENT (3 modules)
    {
        id: 'native-android',
        course_id: 'mobile-app-dev',
        title: 'Native Android Development',
        description: 'Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 160
    },
    {
        id: 'native-ios',
        course_id: 'mobile-app-dev',
        title: 'Native iOS Development',
        description: 'Swift, Xcode, UIKit, SwiftUI - Weeks 1–8',
        level: 'Intermediate',
        order_index: 2,
        estimated_hours: 160
    },
    {
        id: 'cross-platform-mobile',
        course_id: 'mobile-app-dev',
        title: 'Cross-Platform Mobile Dev',
        description: 'React Native/Flutter, shared codebase, platform APIs - Weeks 6–12',
        level: 'Intermediate',
        order_index: 3,
        estimated_hours: 120
    },

    // DATA SCIENCE (4 modules)
    {
        id: 'python-data-science',
        course_id: 'data-science',
        title: 'Python for Data Science',
        description: 'Pandas, NumPy, statistical analysis, probability - Weeks 1–6',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 120
    },
    {
        id: 'data-wrangling-viz',
        course_id: 'data-science',
        title: 'Data Wrangling & Visualization',
        description: 'Data cleaning, Matplotlib/Seaborn, EDA techniques - Weeks 4–10',
        level: 'Beginner',
        order_index: 2,
        estimated_hours: 120
    },
    {
        id: 'data-modeling',
        course_id: 'data-science',
        title: 'Data Modeling',
        description: 'Machine learning models, feature engineering, validation - Weeks 8–14',
        level: 'Intermediate',
        order_index: 3,
        estimated_hours: 120
    },
    {
        id: 'big-data-engineering',
        course_id: 'data-science',
        title: 'Big Data Engineering',
        description: 'Spark, data pipelines, cloud platforms, deployment - Weeks 12–20',
        level: 'Advanced',
        order_index: 4,
        estimated_hours: 160
    },

    // AI & MACHINE LEARNING (6 modules)
    {
        id: 'ai-math-fundamentals',
        course_id: 'ai-machine-learning',
        title: 'AI Mathematics & Fundamentals',
        description: 'Linear algebra, calculus, statistics, Python for ML - Weeks 1–6',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 120
    },
    {
        id: 'core-ml-algorithms',
        course_id: 'ai-machine-learning',
        title: 'Core ML Algorithms',
        description: 'Supervised/unsupervised learning, model evaluation - Weeks 6–12',
        level: 'Intermediate',
        order_index: 2,
        estimated_hours: 120
    },
    {
        id: 'deep-learning',
        course_id: 'ai-machine-learning',
        title: 'Deep Learning',
        description: 'Neural networks, TensorFlow/PyTorch, CNN, RNN - Weeks 10–18',
        level: 'Advanced',
        order_index: 3,
        estimated_hours: 160
    },
    {
        id: 'containerization',
        course_id: 'ai-machine-learning',
        title: 'Containerization',
        description: 'Docker, container orchestration, best practices - Weeks 4–10',
        level: 'Intermediate',
        order_index: 4,
        estimated_hours: 120
    },
    {
        id: 'production-mlops',
        course_id: 'ai-machine-learning',
        title: 'Production & MLOps',
        description: 'Model deployment, monitoring, pipelines, scaling - Weeks 16–24',
        level: 'Advanced',
        order_index: 5,
        estimated_hours: 160
    },
    {
        id: 'app-publishing-maintenance',
        course_id: 'ai-machine-learning',
        title: 'App Publishing & Maintenance',
        description: 'App Store/Play Store, updates, analytics, monitoring - Weeks 14–18',
        level: 'Intermediate',
        order_index: 6,
        estimated_hours: 80
    },

    // DEVOPS (3 modules)
    {
        id: 'devops-fundamentals',
        course_id: 'devops',
        title: 'DevOps Fundamentals',
        description: 'Version control, Jenkins/GitLab CI, automation basics - Weeks 1–6',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 120
    },
    {
        id: 'orchestration-infrastructure',
        course_id: 'devops',
        title: 'Orchestration & Infrastructure',
        description: 'Kubernetes, Terraform, cloud platforms, IaC - Weeks 8–16',
        level: 'Intermediate',
        order_index: 2,
        estimated_hours: 160
    },
    {
        id: 'observability-reliability',
        course_id: 'devops',
        title: 'Observability & Reliability',
        description: 'Monitoring, logging, alerting, SRE practices - Weeks 12–20',
        level: 'Advanced',
        order_index: 3,
        estimated_hours: 120
    },

    // CYBER SECURITY (4 modules)
    {
        id: 'security-foundations',
        course_id: 'cyber-security',
        title: 'Security Foundations',
        description: 'Security concepts, TCP/IP, network protocols, tools - Weeks 1–6',
        level: 'Beginner',
        order_index: 1,
        estimated_hours: 120
    },
    {
        id: 'defensive-security',
        course_id: 'cyber-security',
        title: 'Defensive Security',
        description: 'Firewalls, IDS/IPS, access control, security policies - Weeks 6–12',
        level: 'Intermediate',
        order_index: 2,
        estimated_hours: 120
    },
    {
        id: 'offensive-security',
        course_id: 'cyber-security',
        title: 'Offensive Security',
        description: 'Ethical hacking, vulnerability assessment, exploitation - Weeks 12–20',
        level: 'Advanced',
        order_index: 3,
        estimated_hours: 160
    },
    {
        id: 'forensics-incident-response',
        course_id: 'cyber-security',
        title: 'Forensics & Incident Response',
        description: 'Digital forensics, malware analysis, incident handling - Weeks 16–22',
        level: 'Advanced',
        order_index: 4,
        estimated_hours: 120
    }
];

async function seedModules() {
    console.log('🌱 Starting Module Seeding to Supabase...\n');

    let stats = {
        added: 0,
        skipped: 0,
        errors: 0
    };

    for (const module of MODULES) {
        try {
            console.log(`📦 Processing: ${module.title}`);

            // Check if module exists
            const { data: existing } = await supabase
                .from('course_modules')
                .select('id')
                .eq('id', module.id)
                .single();

            if (existing) {
                console.log(`  ⚠️  Already exists, skipping...`);
                stats.skipped++;
                continue;
            }

            // Insert module
            const { error } = await supabase
                .from('course_modules')
                .insert(module);

            if (error) {
                console.error(`  ❌ Error:`, error.message);
                stats.errors++;
            } else {
                console.log(`  ✅ Added successfully (Order: ${module.order_index})`);
                stats.added++;
            }

        } catch (error) {
            console.error(`  ❌ Unexpected error:`, error.message);
            stats.errors++;
        }
    }

    console.log('\n========================================');
    console.log('✨ Module Seeding Complete!');
    console.log('========================================');
    console.log(`Modules Added: ${stats.added}`);
    console.log(`Modules Skipped: ${stats.skipped}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================================\n');

    console.log('📊 Summary by Course:');
    console.log('  • Full Stack Web Development: 7 modules');
    console.log('  • Mobile App Development: 3 modules');
    console.log('  • Data Science: 4 modules');
    console.log('  • AI & Machine Learning: 6 modules');
    console.log('  • DevOps: 3 modules');
    console.log('  • Cyber Security: 4 modules');
    console.log('  • Total: 27 modules\n');

    process.exit(0);
}

seedModules().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
