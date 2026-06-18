const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function check() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'user_progress'
            AND column_name = 'user_id'
        `);
        console.log('User ID type:', res.rows[0]);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
