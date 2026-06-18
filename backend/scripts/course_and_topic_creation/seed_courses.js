const { supabase } = require('../config/supabase');

// ================================================
// ALL 11 COURSES DATA
// ================================================

const COURSES = [
    // PROGRAMMING LANGUAGES (5)
    {
        id: 'c-programming',
        title: 'C Programming',
        description: 'Master the C language with this comprehensive curriculum covering basics, memory management, and advanced concepts.',
        level: 'Beginner',
        category: 'Programming Languages',
        has_modules: false,
        estimated_hours: 80,
        icon: '📘'
    },
    {
        id: 'python-programming',
        title: 'Python Programming',
        description: 'Master Python from basics to advanced topics including Data Science, Machine Learning, and Web Development concepts.',
        level: 'Beginner',
        category: 'Programming Languages',
        has_modules: false,
        estimated_hours: 90,
        icon: '🐍'
    },
    {
        id: 'java-programming',
        title: 'Java Programming',
        description: 'Master Java with this comprehensive curriculum covering basics, OOP, Collections, and Advanced concepts.',
        level: 'Intermediate',
        category: 'Programming Languages',
        has_modules: false,
        estimated_hours: 100,
        icon: '☕'
    },
    {
        id: 'cpp-programming',
        title: 'C++ Programming',
        description: 'Master C++ usage for systems programming, game development, and high-performance applications.',
        level: 'Advanced',
        category: 'Programming Languages',
        has_modules: false,
        estimated_hours: 120,
        icon: '🚀'
    },
    {
        id: 'csharp-programming',
        title: 'C# Programming',
        description: 'Master C# for building Windows applications, game development with Unity, and enterprise backend systems.',
        level: 'Intermediate',
        category: 'Programming Languages',
        has_modules: false,
        estimated_hours: 100,
        icon: '#️⃣'
    },

    // CAREER TRACKS (6)
    {
        id: 'fullstack-web-dev',
        title: 'Full Stack Web Development',
        description: 'Build complete web applications: frontend UI, backend APIs, databases, and deployment.',
        level: 'Intermediate',
        category: 'Full Stack Web Development',
        has_modules: true,
        estimated_hours: 600,
        icon: '🌐'
    },
    {
        id: 'mobile-app-dev',
        title: 'Mobile App Development',
        description: 'Design and build cross-platform mobile apps (Android & iOS) using modern frameworks.',
        level: 'Intermediate',
        category: 'Mobile App Development',
        has_modules: true,
        estimated_hours: 420,
        icon: '📱'
    },
    {
        id: 'data-science',
        title: 'Data Science',
        description: 'Turn raw data into insights using analysis, visualization, and predictive modeling.',
        level: 'Intermediate',
        category: 'Data Science',
        has_modules: true,
        estimated_hours: 520,
        icon: '📊'
    },
    {
        id: 'ai-machine-learning',
        title: 'AI & Machine Learning',
        description: 'From math foundations to building ML models and deploying them in production.',
        level: 'Advanced',
        category: 'AI & Machine Learning',
        has_modules: true,
        estimated_hours: 720,
        icon: '🧠'
    },
    {
        id: 'devops',
        title: 'DevOps',
        description: 'Automation, CI/CD, containerization and cloud operations to deliver software faster and more reliably.',
        level: 'Advanced',
        category: 'DevOps',
        has_modules: true,
        estimated_hours: 400,
        icon: '🐳'
    },
    {
        id: 'cyber-security',
        title: 'Cyber Security',
        description: 'Learn defensive and offensive security fundamentals for protecting systems and networks.',
        level: 'Advanced',
        category: 'Cyber Security',
        has_modules: true,
        estimated_hours: 520,
        icon: '🛡️'
    }
];

async function seedCourses() {
    console.log('🌱 Starting Course Seeding to Supabase...\n');

    let stats = {
        added: 0,
        skipped: 0,
        errors: 0
    };

    for (const course of COURSES) {
        try {
            console.log(`📚 Processing: ${course.title}`);

            // Check if course exists
            const { data: existing } = await supabase
                .from('courses')
                .select('id')
                .eq('id', course.id)
                .single();

            if (existing) {
                console.log(`  ⚠️  Already exists, skipping...`);
                stats.skipped++;
                continue;
            }

            // Insert course
            const { error } = await supabase
                .from('courses')
                .insert(course);

            if (error) {
                console.error(`  ❌ Error:`, error.message);
                stats.errors++;
            } else {
                console.log(`  ✅ Added successfully`);
                stats.added++;
            }

        } catch (error) {
            console.error(`  ❌ Unexpected error:`, error.message);
            stats.errors++;
        }
    }

    console.log('\n========================================');
    console.log('✨ Course Seeding Complete!');
    console.log('========================================');
    console.log(`Courses Added: ${stats.added}`);
    console.log(`Courses Skipped: ${stats.skipped}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================================\n');

    console.log('📊 Summary:');
    console.log('  • Programming Languages: 5 courses');
    console.log('  • Career Tracks: 6 courses');
    console.log('  • Total: 11 courses\n');

    process.exit(0);
}

seedCourses().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
