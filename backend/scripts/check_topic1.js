const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

async function run() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const res = await client.query(`
            SELECT t.id, t.title, tc.content_type, tc.content_text, tc.order_index 
            FROM topics t
            JOIN topic_content tc ON tc.topic_id = t.id
            WHERE t.title = 'What is C Programming?'
        `);
        console.log(res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
run();
