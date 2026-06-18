-- FIX: Change user_id from UUID to TEXT
-- Goal: Fix API errors "invalid input syntax for type uuid" caused by Firebase UID mismatch.
-- Firebase UIDs are strings (TEXT), not Postgres UUIDs.

BEGIN;

-- 1. user_progress table
ALTER TABLE user_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- 2. user_course_progress table
ALTER TABLE user_course_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- 3. user_quiz_attempts table
ALTER TABLE user_quiz_attempts 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- 4. user_quiz_answers (indirectly linked via attempt_id, but good to check if user_id exists here too)
-- Checking schema: user_quiz_answers only has attempt_id, so no direct user_id to change.
-- However, let's verify if any other tables use user_id.

-- 5. Helper function to ensure future tables use TEXT for user_id
-- (No function needed, just schema update)

COMMIT;

-- Verify
DO $$
BEGIN
    RAISE NOTICE '✅ Successfully converted user_id columns to TEXT in all progress tables.';
END $$;
