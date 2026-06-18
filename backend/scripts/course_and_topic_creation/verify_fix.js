const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function verify() {
    try {
        await client.connect();

        const syntaxRes = await client.query("SELECT count(*) FROM topic_content WHERE content_type = 'syntax'");
        const exampleRes = await client.query("SELECT count(*) FROM topic_content WHERE content_type = 'example'");
        const challengeRes = await client.query("SELECT count(*) FROM practice_problems WHERE title = 'Challenge Time'");

        console.log('--- VERIFICATION RESULTS ---');
        console.log('✅ Syntax Blocks:', syntaxRes.rows[0].count);
        console.log('✅ Example Blocks:', exampleRes.rows[0].count);
        console.log('✅ Challenges:', challengeRes.rows[0].count);

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

verify();
