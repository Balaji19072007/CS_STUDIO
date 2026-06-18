const { supabase } = require('../config/supabase');
const fs = require('fs');
const path = require('path');

async function seedJavaCourse() {
    console.log('🌱 Seeding Java Full Stack Developer Course...\n');

    const courseId = 'java-programming';
    
    // 1. Ensure Course Exists
    const courseData = {
        id: courseId,
        title: 'Java Full Stack Developer Master Program',
        description: 'Master modern software development by learning everything from Java fundamentals to advanced Spring Boot, React, Microservices, Cloud, and System Design.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        difficulty: 'Beginner',
        duration: '120 hours',
        category: 'Programming'
    };

    const { error: courseError } = await supabase.from('courses').upsert(courseData);
    if (courseError) {
        console.error('❌ Failed to insert course:', courseError);
        return;
    }
    console.log('✅ Java Course registered.');

    // 2. Parse java_data.json
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'java_data.json'), 'utf8'));

    // Cleanup and format phases
    const formattedPhases = [];
    let phaseOrder = 1;

    for (const rawPhase of rawData) {
        let phaseTitle = rawPhase.title.replace(/^Phase \d+:\s*/, '');
        
        const topicsMap = new Map();
        for (const t of rawPhase.topics) {
            if (!topicsMap.has(t.title)) {
                topicsMap.set(t.title, t);
            }
        }
        
        const uniqueTopics = Array.from(topicsMap.values());
        
        formattedPhases.push({
            id: `java-p${phaseOrder}`,
            course_id: courseId,
            title: phaseTitle,
            description: `Learn ${phaseTitle} in Java.`,
            order_index: phaseOrder,
            estimated_hours: 8,
            topics: uniqueTopics
        });
        
        phaseOrder++;
    }

    let stats = { phasesAdded: 0, topicsAdded: 0, contentAdded: 0, challengesAdded: 0, errors: 0 };

    for (const phase of formattedPhases) {
        console.log(`\n📚 Processing Phase ${phase.order_index}: ${phase.title}`);
        
        const { error: phaseError } = await supabase.from('phases').upsert({
            id: phase.id,
            course_id: phase.course_id,
            title: phase.title,
            description: phase.description,
            order_index: phase.order_index,
            estimated_hours: phase.estimated_hours
        });

        if (phaseError) {
            console.error(`  ❌ Phase error:`, phaseError.message);
            stats.errors++;
            continue;
        }
        stats.phasesAdded++;

        let topicOrder = 1;
        for (const rawTopic of phase.topics) {
            const topicId = `${phase.id}-t${topicOrder}`;
            const topicTitle = rawTopic.title.replace(/^Topic \d+:\s*/, '');

            const { error: topicError } = await supabase.from('topics').upsert({
                id: topicId,
                phase_id: phase.id,
                title: topicTitle,
                description: `Learn about ${topicTitle}`,
                order_index: topicOrder,
                difficulty: 'Easy',
                estimated_minutes: 20
            });

            if (topicError) {
                console.error(`    ❌ Topic error (${topicTitle}):`, topicError.message);
                stats.errors++;
            } else {
                console.log(`    ✅ ${topicTitle}`);
                stats.topicsAdded++;
            }

            // Generate HTML Content
            let htmlContent = '';
            
            function addSection(title, content, type = 'text') {
                if (!content) return;
                htmlContent += `<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${title}</h3>`;
                
                if (type === 'code') {
                    htmlContent += `<pre class="font-mono text-sm bg-gray-900 text-gray-200 p-4 rounded-xl overflow-x-auto">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
                } else {
                    let text = content.replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 mb-4">');
                    htmlContent += `<p class="text-gray-700 dark:text-gray-300 mb-4">${text}</p>`;
                }
            }

            addSection('Introduction', rawTopic['Topic Introduction'] || rawTopic['Introduction']);
            addSection('Definition', rawTopic['Definition']);
            addSection('Syntax', rawTopic['Syntax'], 'code');
            addSection('Example 1', rawTopic['Example 1'], 'code');
            addSection('Output', rawTopic['Output'], 'code');
            addSection('Example 2', rawTopic['Example 2'], 'code');
            addSection('Common Mistakes', rawTopic['Common Mistakes']);
            addSection('Best Practices', rawTopic['Best Practices']);
            addSection('Key Points', rawTopic['Key Points']);

            if (htmlContent) {
                const { error: contentError } = await supabase.from('topic_content').upsert({
                    topic_id: topicId,
                    content_type: 'explanation',
                    content_text: htmlContent,
                    order_index: 1
                });
                if (contentError) {
                    console.error(`      ❌ Content error:`, contentError.message);
                } else {
                    stats.contentAdded++;
                }
            }

            // Extract Mastery Challenge
            if (rawTopic['Problem Statement']) {
                const challenge = {
                    course_id: courseId,
                    topic_id: topicId,
                    title: `Mastery Challenge: ${topicTitle}`,
                    description: rawTopic['Problem Statement'],
                    solution_code: rawTopic['Solution Code'] || '',
                    input_format: rawTopic['Input Format'] || 'No input required.',
                    output_format: rawTopic['Output Format'] || 'Print expected output.',
                    reference_output: rawTopic['Sample Output'] || '',
                    hints: JSON.stringify([rawTopic['Hint 1'], rawTopic['Hint 2'], rawTopic['Hint 3']].filter(Boolean)),
                    difficulty: 'Easy'
                };
                
                // First delete existing challenge for this topic
                await supabase.from('course_challenges').delete().eq('topic_id', topicId);
                
                const { error: chalError } = await supabase.from('course_challenges').insert(challenge);
                if (chalError) {
                    console.error(`      ❌ Challenge error:`, chalError.message);
                } else {
                    stats.challengesAdded++;
                }
            }
            
            topicOrder++;
        }
    }

    console.log('\n========================================');
    console.log('✨ Java Course Seeding Complete!');
    console.log('========================================');
    console.log(`Phases Added: ${stats.phasesAdded}`);
    console.log(`Topics Added: ${stats.topicsAdded}`);
    console.log(`Content Added: ${stats.contentAdded}`);
    console.log(`Challenges Added: ${stats.challengesAdded}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================================\n');
    process.exit(0);
}

seedJavaCourse();
