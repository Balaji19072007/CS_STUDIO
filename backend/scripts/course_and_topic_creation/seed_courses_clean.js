const { supabase } = require('../config/supabase');

// ================================================
// COURSE MODULES DATA
// ================================================

const COURSE_MODULES = {
    // Full Stack Web Development - 7 modules
    'fullstack-web-dev': [
        { id: 'frontend-dev', title: 'Frontend Development', description: 'HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6', level: 'Beginner', order_index: 1, estimated_hours: 120 },
        { id: 'backend-dev', title: 'Backend Development', description: 'Node.js/Python, Express/Django, REST APIs, authentication - Weeks 6–12', level: 'Beginner', order_index: 2, estimated_hours: 120 },
        { id: 'database-modeling', title: 'Database & Data Modeling', description: 'SQL, MongoDB, database design, ORM/ODM - Weeks 8–14', level: 'Intermediate', order_index: 3, estimated_hours: 120 },
        { id: 'backend-apis-mobile', title: 'Backend & APIs for Mobile', description: 'REST APIs, GraphQL, offline sync, push notifications - Weeks 10–14', level: 'Intermediate', order_index: 4, estimated_hours: 80 },
        { id: 'deployment-devops', title: 'Deployment & DevOps Essentials', description: 'Docker, AWS, CI/CD, performance optimization - Weeks 12–16', level: 'Intermediate', order_index: 5, estimated_hours: 80 },
        { id: 'web-app-security', title: 'Web & App Security', description: 'OWASP Top 10, penetration testing, secure coding - Weeks 8–14', level: 'Intermediate', order_index: 6, estimated_hours: 120 },
        { id: 'fullstack-capstone', title: 'Full Stack Capstone', description: 'Capstone project, testing, best practices - Weeks 16–20', level: 'Advanced', order_index: 7, estimated_hours: 80 }
    ],

    // Mobile App Development - 3 modules
    'mobile-app-dev': [
        { id: 'native-android', title: 'Native Android Development', description: 'Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8', level: 'Beginner', order_index: 1, estimated_hours: 160 },
        { id: 'native-ios', title: 'Native iOS Development', description: 'Swift, Xcode, UIKit, SwiftUI - Weeks 1–8', level: 'Intermediate', order_index: 2, estimated_hours: 160 },
        { id: 'cross-platform-mobile', title: 'Cross-Platform Mobile Dev', description: 'React Native/Flutter, shared codebase, platform APIs - Weeks 6–12', level: 'Intermediate', order_index: 3, estimated_hours: 120 }
    ],

    // Data Science - 4 modules
    'data-science': [
        { id: 'python-data-science', title: 'Python for Data Science', description: 'Pandas, NumPy, statistical analysis, probability - Weeks 1–6', level: 'Beginner', order_index: 1, estimated_hours: 120 },
        { id: 'data-wrangling-viz', title: 'Data Wrangling & Visualization', description: 'Data cleaning, Matplotlib/Seaborn, EDA techniques - Weeks 4–10', level: 'Beginner', order_index: 2, estimated_hours: 120 },
        { id: 'data-modeling', title: 'Data Modeling', description: 'Machine learning models, feature engineering, validation - Weeks 8–14', level: 'Intermediate', order_index: 3, estimated_hours: 120 },
        { id: 'big-data-engineering', title: 'Big Data Engineering', description: 'Spark, data pipelines, cloud platforms, deployment - Weeks 12–20', level: 'Advanced', order_index: 4, estimated_hours: 160 }
    ],

    // AI & Machine Learning - 6 modules
    'ai-machine-learning': [
        { id: 'ai-math-fundamentals', title: 'AI Mathematics & Fundamentals', description: 'Linear algebra, calculus, statistics, Python for ML - Weeks 1–6', level: 'Beginner', order_index: 1, estimated_hours: 120 },
        { id: 'core-ml-algorithms', title: 'Core ML Algorithms', description: 'Supervised/unsupervised learning, model evaluation - Weeks 6–12', level: 'Intermediate', order_index: 2, estimated_hours: 120 },
        { id: 'deep-learning', title: 'Deep Learning', description: 'Neural networks, TensorFlow/PyTorch, CNN, RNN - Weeks 10–18', level: 'Advanced', order_index: 3, estimated_hours: 160 },
        { id: 'containerization', title: 'Containerization', description: 'Docker, container orchestration, best practices - Weeks 4–10', level: 'Intermediate', order_index: 4, estimated_hours: 120 },
        { id: 'production-mlops', title: 'Production & MLOps', description: 'Model deployment, monitoring, pipelines, scaling - Weeks 16–24', level: 'Advanced', order_index: 5, estimated_hours: 160 },
        { id: 'app-publishing-maintenance', title: 'App Publishing & Maintenance', description: 'App Store/Play Store, updates, analytics, monitoring - Weeks 14–18', level: 'Intermediate', order_index: 6, estimated_hours: 80 }
    ],

    // DevOps - 3 modules
    'devops': [
        { id: 'devops-fundamentals', title: 'DevOps Fundamentals', description: 'Version control, Jenkins/GitLab CI, automation basics - Weeks 1–6', level: 'Beginner', order_index: 1, estimated_hours: 120 },
        { id: 'orchestration-infrastructure', title: 'Orchestration & Infrastructure', description: 'Kubernetes, Terraform, cloud platforms, IaC - Weeks 8–16', level: 'Intermediate', order_index: 2, estimated_hours: 160 },
        { id: 'observability-reliability', title: 'Observability & Reliability', description: 'Monitoring, logging, alerting, SRE practices - Weeks 12–20', level: 'Advanced', order_index: 3, estimated_hours: 120 }
    ],

    // Cyber Security - 4 modules
    'cyber-security': [
        { id: 'security-foundations', title: 'Security Foundations', description: 'Security concepts, TCP/IP, network protocols, tools - Weeks 1–6', level: 'Beginner', order_index: 1, estimated_hours: 120 },
        { id: 'defensive-security', title: 'Defensive Security', description: 'Firewalls, IDS/IPS, access control, security policies - Weeks 6–12', level: 'Intermediate', order_index: 2, estimated_hours: 120 },
        { id: 'offensive-security', title: 'Offensive Security', description: 'Ethical hacking, vulnerability assessment, exploitation - Weeks 12–20', level: 'Advanced', order_index: 3, estimated_hours: 160 },
        { id: 'forensics-incident-response', title: 'Forensics & Incident Response', description: 'Digital forensics, malware analysis, incident handling - Weeks 16–22', level: 'Advanced', order_index: 4, estimated_hours: 120 }
    ]
};

async function seedCourseModules() {
    console.log('🌱 Starting Clean Course Structure Seeding...\n');

    let stats = {
        tablesProcessed: 0,
        modulesAdded: 0,
        modulesSkipped: 0,
        errors: 0
    };

    for (const [tableName, modules] of Object.entries(COURSE_MODULES)) {
        console.log(`\n📚 Processing Table: "${tableName}"`);
        console.log(`   Modules to insert: ${modules.length}`);

        for (const module of modules) {
            try {
                // Check if module already exists
                const { data: existing } = await supabase
                    .from(tableName)
                    .select('id')
                    .eq('id', module.id)
                    .single();

                if (existing) {
                    console.log(`  ⚠️  Module "${module.title}" already exists, skipping...`);
                    stats.modulesSkipped++;
                    continue;
                }

                // Insert module
                const { error } = await supabase
                    .from(tableName)
                    .insert({
                        id: module.id,
                        title: module.title,
                        description: module.description,
                        level: module.level,
                        order_index: module.order_index,
                        estimated_hours: module.estimated_hours
                    });

                if (error) {
                    console.error(`  ❌ Error inserting "${module.title}":`, error.message);
                    stats.errors++;
                } else {
                    console.log(`  ✅ Added: ${module.title} (Order: ${module.order_index})`);
                    stats.modulesAdded++;
                }

            } catch (error) {
                console.error(`  ❌ Unexpected error with "${module.title}":`, error.message);
                stats.errors++;
            }
        }

        stats.tablesProcessed++;
    }

    console.log('\n========================================');
    console.log('✨ Seeding Complete!');
    console.log('========================================');
    console.log(`Tables Processed: ${stats.tablesProcessed}`);
    console.log(`Modules Added: ${stats.modulesAdded}`);
    console.log(`Modules Skipped: ${stats.modulesSkipped}`);
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

// Run the seeding
seedCourseModules().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
