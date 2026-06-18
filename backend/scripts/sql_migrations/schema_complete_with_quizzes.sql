-- ================================================
-- COMPLETE LEARNING PLATFORM DATABASE SCHEMA
-- Supports: Courses → Modules → Phases → Topics → Content + Quizzes + Progress
-- ================================================

-- ================================================
-- PART 1: CONTENT TABLES
-- ================================================

-- 1. COURSES TABLE (11 courses)
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    category TEXT NOT NULL,
    has_modules BOOLEAN DEFAULT FALSE,
    estimated_hours INTEGER DEFAULT 0,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSE MODULES TABLE (27 modules for tracks)
CREATE TABLE IF NOT EXISTS course_modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PHASES TABLE (~200+ phases)
CREATE TABLE IF NOT EXISTS phases (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
    module_id TEXT REFERENCES course_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT phase_parent_check CHECK (
        (course_id IS NOT NULL AND module_id IS NULL) OR
        (course_id IS NULL AND module_id IS NOT NULL)
    )
);

-- 4. TOPICS TABLE (~1000+ topics)
CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    phase_id TEXT NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    estimated_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TOPIC CONTENT TABLE
CREATE TABLE IF NOT EXISTS topic_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL CHECK (content_type IN ('definition', 'explanation', 'syntax', 'example', 'diagram', 'note', 'tip')),
    content_text TEXT,
    code_example TEXT,
    code_language TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRACTICE PROBLEMS TABLE
CREATE TABLE IF NOT EXISTS practice_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    starter_code TEXT,
    solution_code TEXT,
    test_cases JSONB,
    hints JSONB,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- PART 2: QUIZ SYSTEM TABLES
-- ================================================

-- 7. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    phase_id TEXT NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
    quiz_type TEXT NOT NULL CHECK (quiz_type IN ('topic_group', 'phase_level')),
    title TEXT NOT NULL,
    topic_start_index INTEGER,
    topic_end_index INTEGER,
    order_index INTEGER NOT NULL,
    min_questions INTEGER DEFAULT 15,
    max_questions INTEGER DEFAULT 20,
    pass_percentage INTEGER DEFAULT 60,
    is_mandatory BOOLEAN DEFAULT TRUE,
    max_attempts INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'multiple_select', 'true_false', 'code_output')),
    question_text TEXT NOT NULL,
    code_snippet TEXT,
    correct_answer JSONB,
    explanation TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. QUIZ QUESTION OPTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- PART 3: PROGRESS TRACKING TABLES
-- ================================================

-- 10. USER PROGRESS TABLE (Topic-level)
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
    content_viewed JSONB DEFAULT '[]'::jsonb,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, topic_id)
);

-- 11. USER COURSE PROGRESS TABLE (Course/Module-level)
CREATE TABLE IF NOT EXISTS user_course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id TEXT REFERENCES course_modules(id) ON DELETE CASCADE,
    total_topics INTEGER DEFAULT 0,
    completed_topics INTEGER DEFAULT 0,
    total_quizzes INTEGER DEFAULT 0,
    passed_quizzes INTEGER DEFAULT 0,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    last_accessed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, course_id, module_id)
);

-- 12. USER QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    attempt_number INTEGER NOT NULL,
    score_percentage DECIMAL(5,2),
    passed BOOLEAN DEFAULT FALSE,
    time_spent_seconds INTEGER,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. USER QUIZ ANSWERS TABLE
CREATE TABLE IF NOT EXISTS user_quiz_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    selected_answer JSONB,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- PART 4: CONFIGURATION TABLE
-- ================================================

-- 14. QUIZ CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS quiz_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key TEXT UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================

-- Content Tables
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_phases_course_id ON phases(course_id);
CREATE INDEX IF NOT EXISTS idx_phases_module_id ON phases(module_id);
CREATE INDEX IF NOT EXISTS idx_phases_order ON phases(order_index);
CREATE INDEX IF NOT EXISTS idx_topics_phase_id ON topics(phase_id);
CREATE INDEX IF NOT EXISTS idx_topics_order ON topics(order_index);
CREATE INDEX IF NOT EXISTS idx_topic_content_topic_id ON topic_content(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_content_order ON topic_content(order_index);
CREATE INDEX IF NOT EXISTS idx_practice_problems_topic_id ON practice_problems(topic_id);

-- Quiz Tables
CREATE INDEX IF NOT EXISTS idx_quizzes_phase_id ON quizzes(phase_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_order ON quizzes(order_index);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_question_options_question_id ON quiz_question_options(question_id);

-- Progress Tables
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_topic_id ON user_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_course_progress_user_id ON user_course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_course_progress_course_id ON user_course_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_id ON user_quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_quiz_id ON user_quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_answers_attempt_id ON user_quiz_answers(attempt_id);

-- ================================================
-- DEFAULT CONFIGURATION DATA
-- ================================================

INSERT INTO quiz_config (config_key, config_value, description) VALUES
('topic_group_frequency', '4', 'Number of topics before auto-generating a quiz'),
('min_questions_per_quiz', '15', 'Minimum questions per quiz'),
('max_questions_per_quiz', '20', 'Maximum questions per quiz'),
('default_pass_percentage', '60', 'Default passing percentage for quizzes'),
('quiz_locking_mode', '"soft"', 'Quiz locking behavior: soft or strict'),
('allow_retakes', 'true', 'Whether users can retake quizzes'),
('max_attempts_default', 'null', 'Default max attempts (null = unlimited)'),
('score_calculation', '"best"', 'Score calculation method: best or latest')
ON CONFLICT (config_key) DO NOTHING;

-- ================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================

COMMENT ON TABLE courses IS 'Main course catalog - 11 courses (5 languages + 6 tracks)';
COMMENT ON TABLE course_modules IS 'Modules within track courses - 27 total modules';
COMMENT ON TABLE phases IS 'Learning phases - belongs to either a course or a module';
COMMENT ON TABLE topics IS 'Individual learning topics within phases';
COMMENT ON TABLE topic_content IS 'Detailed content for each topic (definitions, examples, code, etc)';
COMMENT ON TABLE practice_problems IS 'Practice exercises and coding challenges per topic';
COMMENT ON TABLE quizzes IS 'Quizzes for phases - auto-generated based on topic count';
COMMENT ON TABLE quiz_questions IS 'Questions within quizzes - supports multiple question types';
COMMENT ON TABLE quiz_question_options IS 'Answer options for quiz questions';
COMMENT ON TABLE user_progress IS 'Tracks user progress at topic level';
COMMENT ON TABLE user_course_progress IS 'Tracks user progress at course/module level';
COMMENT ON TABLE user_quiz_attempts IS 'Records all quiz attempts by users';
COMMENT ON TABLE user_quiz_answers IS 'Individual answers for each quiz attempt';
COMMENT ON TABLE quiz_config IS 'Configurable quiz system settings';

COMMENT ON COLUMN quizzes.quiz_type IS 'topic_group: covers 4 topics, phase_level: covers entire phase';
COMMENT ON COLUMN quizzes.topic_start_index IS 'For topic_group quizzes - starting topic order_index';
COMMENT ON COLUMN quizzes.topic_end_index IS 'For topic_group quizzes - ending topic order_index';
COMMENT ON COLUMN user_progress.content_viewed IS 'JSON array of viewed topic_content IDs';
COMMENT ON COLUMN user_course_progress.progress_percentage IS 'Calculated: (completed_topics + passed_quizzes) / (total_topics + total_quizzes) * 100';
