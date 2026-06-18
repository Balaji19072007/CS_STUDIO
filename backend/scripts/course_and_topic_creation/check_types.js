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
            AND table_name IN ('user_progress', 'topics', 'user_course_progress', 'courses', 'phases')
            AND column_name IN ('topic_id', 'id', 'course_id', 'phase_id')
        `);

        const types = {};
        res.rows.forEach(r => {
            if (!types[r.table_name]) types[r.table_name] = {};
            types[r.table_name][r.column_name] = r.data_type;
        });

        console.log('Column Types:', JSON.stringify(types, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
