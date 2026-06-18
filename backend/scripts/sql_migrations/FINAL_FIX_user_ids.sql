-- =========================================================
-- FINAL FIX: Convert user_id from UUID to TEXT (with RLS update)
-- =========================================================
-- Goal: Fix "invalid input syntax for type uuid" error.
-- Reason: Firebase UIDs are text, but database expected UUIDs.
-- Method: Drop Policies -> Change Column Type -> Restore Policies.

BEGIN;

DO $$
BEGIN
    RAISE NOTICE '🚀 Starting breakdown of existing policies...';
END $$;

-- 1. DROP EXISTING POLICIES (Required to modify columns)
-- =========================================================
DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress update" ON user_progress;

DROP POLICY IF EXISTS "Users can read own course progress" ON user_course_progress;
DROP POLICY IF EXISTS "Users can update own course progress" ON user_course_progress;
DROP POLICY IF EXISTS "Users can update own course progress update" ON user_course_progress;

DROP POLICY IF EXISTS "Users can read own quiz attempts" ON user_quiz_attempts;
DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON user_quiz_attempts;

-- Also dependent policies
DROP POLICY IF EXISTS "Users can read own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;


-- 2. ALTER COLUMNS TO TEXT
-- =========================================================
DO $$
BEGIN
    RAISE NOTICE '🔧 Converting columns to TEXT...';
END $$;

ALTER TABLE user_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

ALTER TABLE user_course_progress 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;

ALTER TABLE user_quiz_attempts 
ALTER COLUMN user_id TYPE TEXT USING user_id::text;


-- 3. RE-CREATE POLICIES (with ::text casting)
-- =========================================================
DO $$
BEGIN
    RAISE NOTICE '🛡️ Re-applying security policies...';
END $$;

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
    RAISE NOTICE '✅ FINAL FIX COMPLETE: All user_id_columns are now TEXT.';
END $$;
