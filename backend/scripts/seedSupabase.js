/**
 * Seed Supabase with local data from JSON files.
 *
 * Usage:
 *   node scripts/seedSupabase.js
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.
 *
 * Tables seeded:
 *   courses, course_phases, course_topics, problems
 *
 * For C and Java courses, phase/topic data is read from the frontend
 * fallback JSON files.
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || supabaseUrl.includes('your-project')) {
  console.error('ERROR: Set real SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env first.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedCourses() {
  console.log('\n--- Seeding courses ---');
  const courses = [
    { id: 'c-programming', title: 'C Programming', description: 'Master C programming from basics to advanced concepts.', icon: '💻', category: 'programming', difficulty: 'Beginner', duration: '12 weeks', is_premium: false },
    { id: 'java-programming', title: 'Java Programming', description: 'Master Java programming from basics to advanced concepts.', icon: '☕', category: 'programming', difficulty: 'Beginner', duration: '12 weeks', is_premium: false },
    { id: 'python-programming', title: 'Python Programming', description: 'Learn Python programming from scratch.', icon: '🐍', category: 'programming', difficulty: 'Beginner', duration: '10 weeks', is_premium: false },
    { id: 'cpp-programming', title: 'C++ Programming', description: 'Master C++ programming with object-oriented concepts.', icon: '🔧', category: 'programming', difficulty: 'Intermediate', duration: '12 weeks', is_premium: false },
    { id: 'csharp-programming', title: 'C# Programming', description: 'Learn C# programming for modern applications.', icon: '💠', category: 'programming', difficulty: 'Intermediate', duration: '10 weeks', is_premium: false },
  ];

  for (const course of courses) {
    const { error } = await supabase.from('courses').upsert(course, { onConflict: 'id' });
    if (error) {
      console.error(`  Error seeding course ${course.id}:`, error.message);
    } else {
      console.log(`  ✓ ${course.id} (${course.title})`);
    }
  }
}

async function seedProblems() {
  console.log('\n--- Seeding problems ---');
  const dataPath = path.join(__dirname, '..', 'util', 'problemData.json');
  const courseDataPath = path.join(__dirname, '..', 'util', 'courseProblemData.json');

  let count = 0;

  for (const filePath of [dataPath, courseDataPath]) {
    if (!fs.existsSync(filePath)) {
      console.warn(`  File not found: ${filePath}`);
      continue;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const problems = JSON.parse(raw);

    for (const problem of problems) {
      const record = {
        id: problem.id,
        problem_id: problem.id,
        title: problem.title || problem.name || 'Untitled',
        language: problem.language || 'javascript',
        difficulty: problem.difficulty || 'Easy',
        category: problem.category || 'general',
        description: problem.problemStatement || problem.description || '',
        input_format: problem.input_format || problem.inputFormat || '',
        output_format: problem.output_format || problem.outputFormat || '',
        examples: problem.examples || problem.testCases || [],
        test_cases: problem.test_cases || problem.testCases || [],
        solution_template: problem.solution_template || problem.solutionTemplate || '',
        hints: problem.hints || [],
        is_course_problem: problem.id >= 1001,
      };

      const { error } = await supabase.from('problems').upsert(record, { onConflict: 'id' });
      if (error) {
        console.error(`  Error seeding problem ${problem.id}:`, error.message);
      } else {
        count++;
      }
    }
  }

  console.log(`  ✓ ${count} problems seeded`);
}

async function seedCoursePhasesAndTopics() {
  console.log('\n--- Seeding course phases and topics ---');

  const frontendDataDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'data');
  const phaseFiles = [
    { file: 'cProgrammingPhasesData.json', courseId: 'c-programming' },
    { file: 'javaProgrammingPhasesData.json', courseId: 'java-programming' },
  ];

  for (const { file, courseId } of phaseFiles) {
    const filePath = path.join(frontendDataDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  File not found: ${filePath}`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const phases = JSON.parse(raw);
    let phaseCount = 0;
    let topicCount = 0;

    for (const phase of phases) {
      const phaseRecord = {
        id: phase.id,
        course_id: courseId,
        title: phase.title,
        order: phase.order_index || phase.order || 0,
      };

      const { error: phaseError } = await supabase.from('course_phases').upsert(phaseRecord, { onConflict: 'id' });
      if (phaseError) {
        console.error(`  Error seeding phase ${phase.id}:`, phaseError.message);
        continue;
      }
      phaseCount++;

      const topics = phase.topics || [];
      for (const topic of topics) {
        const topicRecord = {
          id: topic.id,
          course_id: courseId,
          phase_id: phase.id,
          title: topic.title,
          type: topic.type || 'content',
          content: topic.content || topic.description || '',
          order: topic.order_index || topic.order || 0,
          questions: topic.questions || [],
        };

        const { error: topicError } = await supabase.from('course_topics').upsert(topicRecord, { onConflict: 'id' });
        if (topicError) {
          console.error(`  Error seeding topic ${topic.id}:`, topicError.message);
          continue;
        }
        topicCount++;
      }
    }

    console.log(`  ✓ ${courseId}: ${phaseCount} phases, ${topicCount} topics`);
  }
}

async function run() {
  console.log('=== Supabase Seed Script ===');
  console.log(`URL: ${supabaseUrl}`);

  await seedCourses();
  await seedProblems();
  await seedCoursePhasesAndTopics();

  console.log('\n=== Seeding complete ===');
  process.exit(0);
}

run().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
