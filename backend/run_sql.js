const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres:Balu@9959482187@db.hubvhqfxlzwkrvpulkqs.supabase.co:5432/postgres';

async function run() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const filesToRun = [
      'scripts/schema_complete_with_quizzes.sql',
      'scripts/generate_quizzes.sql',
      'scripts/generate_quiz_questions_fast.sql'
    ];

    for (const file of filesToRun) {
      console.log(`\nExecuting ${file}...`);
      const sql = fs.readFileSync(path.join(__dirname, file), 'utf8');
      
      // Some scripts use RAISE NOTICE, we can listen for them
      client.on('notice', msg => console.log('Notice:', msg.message));
      
      try {
        await client.query(sql);
        console.log(`✅ Successfully executed ${file}`);
      } catch (err) {
        console.error(`❌ Error executing ${file}:`, err.message);
      }
      
      // Remove listener for next file to avoid duplicate logs
      client.removeAllListeners('notice');
    }
    
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    await client.end();
    console.log('\nDatabase connection closed');
  }
}

run();
