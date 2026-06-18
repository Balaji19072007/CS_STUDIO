-- Drop tables if they exist (clean slate)
DROP TABLE IF EXISTS user_quiz_answers;
DROP TABLE IF EXISTS user_quiz_attempts;

-- Create Attempts Table
CREATE TABLE user_quiz_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Changed to TEXT for Firebase UID capability
    quiz_id TEXT REFERENCES quizzes(id) NOT NULL,
    score INTEGER NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Answers Table
CREATE TABLE user_quiz_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    attempt_id UUID REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES quiz_questions(id) NOT NULL, -- Reverted to UUID
    selected_answer TEXT, -- Allow NULL for skipped questions
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Security)
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_answers ENABLE ROW LEVEL SECURITY;

-- Policies for Attempts
CREATE POLICY "Allow public insert" 
ON user_quiz_attempts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select" 
ON user_quiz_attempts FOR SELECT 
USING (true);

-- Policies for Answers
CREATE POLICY "Allow public insert answers" 
ON user_quiz_answers FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select answers" 
ON user_quiz_answers FOR SELECT 
USING (true);
