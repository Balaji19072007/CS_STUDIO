-- Enable RLS and add public read policies for all learning content tables

-- 1. Courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON courses;
CREATE POLICY "Public read access" ON courses FOR SELECT USING (true);

-- 2. Course Modules
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON course_modules;
CREATE POLICY "Public read access" ON course_modules FOR SELECT USING (true);

-- 3. Phases
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON phases;
CREATE POLICY "Public read access" ON phases FOR SELECT USING (true);

-- 4. Topics
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON topics;
CREATE POLICY "Public read access" ON topics FOR SELECT USING (true);

-- 5. Topic Content
ALTER TABLE topic_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON topic_content;
CREATE POLICY "Public read access" ON topic_content FOR SELECT USING (true);

-- 6. Practice Problems
ALTER TABLE practice_problems ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON practice_problems;
CREATE POLICY "Public read access" ON practice_problems FOR SELECT USING (true);

-- 7. Quizzes
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON quizzes;
CREATE POLICY "Public read access" ON quizzes FOR SELECT USING (true);

-- 8. Quiz Questions
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON quiz_questions;
CREATE POLICY "Public read access" ON quiz_questions FOR SELECT USING (true);

-- 9. Quiz Question Options
ALTER TABLE quiz_question_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON quiz_question_options;
CREATE POLICY "Public read access" ON quiz_question_options FOR SELECT USING (true);

-- User Progress Tables (Authenticated access only)
-- user_progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own progress update" ON user_progress;
CREATE POLICY "Users can update own progress update" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- user_course_progress
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own course progress" ON user_course_progress;
CREATE POLICY "Users can read own course progress" ON user_course_progress FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own course progress" ON user_course_progress;
CREATE POLICY "Users can update own course progress" ON user_course_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own course progress update" ON user_course_progress;
CREATE POLICY "Users can update own course progress update" ON user_course_progress FOR UPDATE USING (auth.uid() = user_id);

-- user_quiz_attempts
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own quiz attempts" ON user_quiz_attempts;
CREATE POLICY "Users can read own quiz attempts" ON user_quiz_attempts FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON user_quiz_attempts;
CREATE POLICY "Users can insert own quiz attempts" ON user_quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_quiz_answers
ALTER TABLE user_quiz_answers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own quiz answers" ON user_quiz_answers;
CREATE POLICY "Users can read own quiz answers" ON user_quiz_answers FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_quiz_attempts WHERE id = attempt_id AND user_id = auth.uid())
);
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
CREATE POLICY "Users can insert own quiz answers" ON user_quiz_answers FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM user_quiz_attempts WHERE id = attempt_id AND user_id = auth.uid())
);
