const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function check() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT user_id, length(user_id) as len 
            FROM user_course_progress 
            WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' 
            LIMIT 10
        `);
        console.log('Invalid User IDs in user_course_progress:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
