const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function check() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('user_progress', 'user_course_progress', 'topics', 'phases')
        `);
        console.log('Found tables:', res.rows.map(r => r.table_name));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
