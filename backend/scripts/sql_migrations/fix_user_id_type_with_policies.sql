-- FIX: Change user_id from UUID to TEXT (handling RLS policies)
-- Goal: Fix API errors "invalid input syntax for type uuid" caused by Firebase UID mismatch.
-- Logic:
-- 1. Drop existing RLS policies that depend on user_id (otherwise ALTER COLUMN fails).
-- 2. Alter user_id from UUID to TEXT.
-- 3. Re-create the policies, ensuring auth.uid() (which is UUID) is cast to ::text.

BEGIN;

-- ================================================
-- 1. DROP EXISTING POLICIES
-- ================================================

-- user_progress
DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress update" ON user_progress;

-- user_course_progress
DROP POLICY IF EXISTS "Users can read own course progress" ON user_course_progress;
DROP POLICY IF EXISTS "Users can update own course progress" ON user_course_progress;
DROP POLICY IF EXISTS "Users can update own course progress update" ON user_course_progress;

-- user_quiz_attempts
DROP POLICY IF EXISTS "Users can read own quiz attempts" ON user_quiz_attempts;
DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON user_quiz_attempts;

-- user_quiz_answers (Dependencies check)
-- user_quiz_answers depends on user_quiz_attempts via attempt_id, but the policy often checks user_id indirectly.
-- We'll recreate its policies too just to be safe if they reference auth.uid().
DROP POLICY IF EXISTS "Users can read own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;


-- ================================================
-- 2. ALTER COLUMNS TO TEXT
-- ================================================

ALTER TABLE user_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

ALTER TABLE user_course_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

ALTER TABLE user_quiz_attempts 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;


-- ================================================
-- 3. RE-CREATE POLICIES (with ::text casting)
-- ================================================

-- user_progress
CREATE POLICY "Users can read own progress" ON user_progress 
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own progress" ON user_progress 
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own progress update" ON user_progress 
FOR UPDATE USING (auth.uid()::text = user_id);


-- user_course_progress
CREATE POLICY "Users can read own course progress" ON user_course_progress 
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own course progress" ON user_course_progress 
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own course progress update" ON user_course_progress 
FOR UPDATE USING (auth.uid()::text = user_id);


-- user_quiz_attempts
CREATE POLICY "Users can read own quiz attempts" ON user_quiz_attempts 
FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own quiz attempts" ON user_quiz_attempts 
FOR INSERT WITH CHECK (auth.uid()::text = user_id);


-- user_quiz_answers
-- The indirect check: auth.uid()::text must match user_id in the attempt
CREATE POLICY "Users can read own quiz answers" ON user_quiz_answers 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_quiz_attempts WHERE id = attempt_id AND user_id = auth.uid()::text)
);

CREATE POLICY "Users can insert own quiz answers" ON user_quiz_answers 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM user_quiz_attempts WHERE id = attempt_id AND user_id = auth.uid()::text)
);

COMMIT;

DO $$
BEGIN
    RAISE NOTICE '✅ Successfully converted user_id to TEXT and updated RLS policies.';
END $$;
