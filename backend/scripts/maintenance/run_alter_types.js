const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runFix() {
    const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const sqlPath = path.join(__dirname, 'alter_types.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await client.query(sql);
        console.log("SUCCESS: Database fix executed successfully!");
    } catch (err) {
        console.error("ERROR FAILED:", err);
    } finally {
        await client.end();
    }
}

runFix();
