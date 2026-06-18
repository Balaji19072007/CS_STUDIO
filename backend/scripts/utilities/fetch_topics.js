const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function getTopics() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT t.title, p.title as phase 
            FROM topics t
            JOIN phases p ON t.phase_id = p.id
            WHERE p.course_id = 'c-programming'
            ORDER BY p.order_index, t.order_index
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

getTopics();
