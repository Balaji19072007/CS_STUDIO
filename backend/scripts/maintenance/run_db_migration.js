const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
// Fix dotenv path to look in backend root
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const DB_PASSWORD = process.env.DB_PASSWORD || 'Balu@9959482187';

// Extract Project Ref from URL
// URL format: https://[PROJECT_REF].supabase.co
const projectRef = SUPABASE_URL.split('://')[1].split('.')[0];
const dbHost = `db.${projectRef}.supabase.co`;

const connectionString = `postgresql://postgres:${DB_PASSWORD}@${dbHost}:5432/postgres`;

console.log(`Connecting to ${dbHost}...`);

const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

async function runMigration() {
    try {
        await client.connect();
        console.log('✅ Connected to Database');

        const inputPath = process.argv[2];
        if (!inputPath) {
            console.error('❌ Please provide a SQL file path');
            process.exit(1);
        }
        const sqlPath = path.resolve(inputPath);
        console.log(`Reading SQL file from: ${sqlPath}`);
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running SQL script...');
        await client.query(sql);

        console.log('✅ SQL Script executed successfully!');
    } catch (err) {
        console.error('❌ Error executing script:', err);
    } finally {
        await client.end();
    }
}

runMigration();
