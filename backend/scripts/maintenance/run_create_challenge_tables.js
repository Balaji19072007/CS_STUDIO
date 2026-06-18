const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
// Explicitly load .env from backend directory
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
// Use provided password or fallback to env
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

        const sqlPath = path.join(__dirname, 'migration', 'create_course_challenges.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running SQL script...');
        // console.log(sql); 
        await client.query(sql);

        console.log('✅ SQL Script executed successfully!');
    } catch (err) {
        console.error('❌ Error executing script:', err);
    } finally {
        await client.end();
    }
}

runMigration();
