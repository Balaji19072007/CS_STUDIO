const { Client } = require('pg');

async function migrate() {
  const client = new Client({
    connectionString: 'postgres://postgres.hubvhqfxlzwkrvpulkqs:Balu@9959482187@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
  });

  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL via Pooler!');

    // 1. Alter Users Table
    const alterUsersSql = `
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS rating_shown BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS last_rating_prompt_at TIMESTAMP WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS usage_start_time TIMESTAMP WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS accumulated_usage_time BIGINT DEFAULT 0;
    `;
    await client.query(alterUsersSql);
    console.log('Altered users table successfully.');

    // 2. Create course_ratings Table
    const createCourseRatingsSql = `
      CREATE TABLE IF NOT EXISTS course_ratings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        course_id VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        feedback TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, course_id)
      );
    `;
    await client.query(createCourseRatingsSql);
    console.log('Created course_ratings table successfully.');

    console.log('All migrations completed successfully!');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
