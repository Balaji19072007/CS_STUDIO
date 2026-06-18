const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'REPLACE_WITH_SERVICE_ROLE_IF_NEEDED_BUT_TRY_ANON_FIRST';
// Wait, I need to test RLS, so I should simulated being a user.
// But I don't have a user session easily in node.
// I will use PG client to simulate the RLS context or just test the raw INSERT constraints first.

// Actually, let's use the PG client to insert with the specific user_id and see if constraints fail.
// If constraints fail (FK), PG will tell us.
// If RLS fails, we won't know unless we use `SET ROLE` but I am using postgres superuser connection so RLS is bypassed by default in my scripts!
// Ah! If my script succeeds, then the issue IS RLS.
// If my script fails, then the issue is Data Integrity (FKs).

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function debug() {
    try {
        await client.connect();

        // 1. Get a quiz and questions
        const quizRes = await client.query("SELECT id FROM quizzes LIMIT 1");
        const quizId = quizRes.rows[0].id;
        console.log('Quiz ID:', quizId, 'Type:', typeof quizId);

        const qRes = await client.query("SELECT id FROM quiz_questions WHERE quiz_id = $1 LIMIT 1", [quizId]);
        // If no questions, we can't test answers
        const questionId = qRes.rows[0]?.id;
        console.log('Question ID:', questionId, 'Type:', typeof questionId);

        const userId = 'Ya6TgOIb3WSRnVUHfR8HWIq7H5A3'; // From user log

        // 2. Try Insert Attempt
        console.log('Attempting Insert Attempt...');
        const attemptRes = await client.query(`
            INSERT INTO user_quiz_attempts (user_id, quiz_id, score, passed)
            VALUES ($1, $2, 80, true)
            RETURNING id
        `, [userId, quizId]); // quizId is string here. If DB expects UUID and it's text, PG handles cast usually, but FK must match.

        const attemptId = attemptRes.rows[0].id;
        console.log('Attempt Inserted:', attemptId);

        // 3. Try Insert Answer
        if (questionId) {
            console.log('Attempting Insert Answer...');
            await client.query(`
                INSERT INTO user_quiz_answers (attempt_id, question_id, selected_answer, is_correct)
                VALUES ($1, $2, 'true', true)
            `, [attemptId, questionId]);
            console.log('Answer Inserted!');
        }

        // Cleanup
        await client.query("DELETE FROM user_quiz_attempts WHERE id = $1", [attemptId]);
        console.log('Cleanup Done.');

    } catch (err) {
        console.error('DEBUG ERROR:', err);
    } finally {
        await client.end();
    }
}

debug();
