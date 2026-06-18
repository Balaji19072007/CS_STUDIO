-- ================================================
-- COMPLETE COURSE DATABASE SCHEMA
-- Supports: Courses → Modules → Phases → Topics → Content
-- ================================================

-- ================================================
-- 1. COURSES TABLE (11 courses)
-- ================================================
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

-- ================================================
-- 2. COURSE MODULES TABLE (27 modules for tracks)
-- ================================================
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

-- ================================================
-- 3. PHASES TABLE (~200+ phases)
-- ================================================
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
    
    -- Constraint: phase must belong to either a course OR a module
    CONSTRAINT phase_parent_check CHECK (
        (course_id IS NOT NULL AND module_id IS NULL) OR
        (course_id IS NULL AND module_id IS NOT NULL)
    )
);

-- ================================================
-- 4. TOPICS TABLE (~1000+ topics)
-- ================================================
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

-- ================================================
-- 5. TOPIC CONTENT TABLE (Multiple content pieces per topic)
-- ================================================
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

-- ================================================
-- 6. PRACTICE PROBLEMS TABLE (Exercises per topic)
-- ================================================
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
-- INDEXES FOR PERFORMANCE
-- ================================================

-- Course Modules
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules(order_index);

-- Phases
CREATE INDEX IF NOT EXISTS idx_phases_course_id ON phases(course_id);
CREATE INDEX IF NOT EXISTS idx_phases_module_id ON phases(module_id);
CREATE INDEX IF NOT EXISTS idx_phases_order ON phases(order_index);

-- Topics
CREATE INDEX IF NOT EXISTS idx_topics_phase_id ON topics(phase_id);
CREATE INDEX IF NOT EXISTS idx_topics_order ON topics(order_index);

-- Topic Content
CREATE INDEX IF NOT EXISTS idx_topic_content_topic_id ON topic_content(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_content_order ON topic_content(order_index);
CREATE INDEX IF NOT EXISTS idx_topic_content_type ON topic_content(content_type);

-- Practice Problems
CREATE INDEX IF NOT EXISTS idx_practice_problems_topic_id ON practice_problems(topic_id);
CREATE INDEX IF NOT EXISTS idx_practice_problems_order ON practice_problems(order_index);

-- ================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================

COMMENT ON TABLE courses IS 'Main course catalog - 11 courses (5 languages + 6 tracks)';
COMMENT ON TABLE course_modules IS 'Modules within track courses - 27 total modules';
COMMENT ON TABLE phases IS 'Learning phases - belongs to either a course or a module';
COMMENT ON TABLE topics IS 'Individual learning topics within phases';
COMMENT ON TABLE topic_content IS 'Detailed content for each topic (definitions, examples, code, etc)';
COMMENT ON TABLE practice_problems IS 'Practice exercises and coding challenges per topic';

COMMENT ON COLUMN courses.has_modules IS 'TRUE for track courses (Full Stack, Mobile, etc), FALSE for language courses';
COMMENT ON COLUMN phases.course_id IS 'For direct courses (C, Python, Java, C++, C#)';
COMMENT ON COLUMN phases.module_id IS 'For track modules (Frontend Dev, Backend Dev, etc)';
COMMENT ON COLUMN topic_content.content_type IS 'Type of content: definition, explanation, syntax, example, diagram, note, tip';
COMMENT ON COLUMN practice_problems.test_cases IS 'JSON array of test cases with input/output pairs';
COMMENT ON COLUMN practice_problems.hints IS 'JSON array of progressive hints';

-- ================================================
-- SAMPLE QUERY PATTERNS
-- ================================================

-- Get all modules for a track course:
-- SELECT * FROM course_modules WHERE course_id = 'fullstack-web-dev' ORDER BY order_index;

-- Get all phases for a module:
-- SELECT * FROM phases WHERE module_id = 'frontend-dev' ORDER BY order_index;

-- Get all topics for a phase:
-- SELECT * FROM topics WHERE phase_id = 'frontend-phase-1' ORDER BY order_index;

-- Get complete content for a topic:
-- SELECT * FROM topic_content WHERE topic_id = 'html-basics' ORDER BY order_index;

-- Get practice problems for a topic:
-- SELECT * FROM practice_problems WHERE topic_id = 'html-basics' ORDER BY order_index;
