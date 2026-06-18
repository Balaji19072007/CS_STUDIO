const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runFix() {
    // Construct connection string with encoded password
    // Password: Balu@9959482187 -> Balu%409959482187
    const connectionString = 'postgresql://postgres:Balu%409959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false } // Required for Supabase
    });

    try {
        console.log("🔌 Connecting to database...");
        await client.connect();
        console.log("✅ Connected!");

        // Read SQL file
        const sqlPath = path.join(__dirname, 'FINAL_FIX_user_ids.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log("📜 Executing SQL Fix...");

        // Execute the SQL
        await client.query(sql);

        console.log("🎉 SUCCESS: Database fix executed successfully!");
        console.log("The 'invalid input syntax for type uuid' error should be resolved.");

    } catch (err) {
        console.error("❌ ERROR FAILED:", err);
    } finally {
        await client.end();
    }
}

runFix();
