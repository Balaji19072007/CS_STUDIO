const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function check() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'user_quiz_answers' 
            AND column_name = 'selected_answer'
        `);
        console.log('Column check:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
