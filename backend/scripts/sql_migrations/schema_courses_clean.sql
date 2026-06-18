-- ================================================
-- PROGRAMMING LANGUAGE COURSES (Individual Tables)
-- ================================================

-- 1. C Programming
CREATE TABLE IF NOT EXISTS "c-programming" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'Beginner',
    order_index INTEGER,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Python Programming
CREATE TABLE IF NOT EXISTS "python-programming" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'Beginner',
    order_index INTEGER,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Java Programming
CREATE TABLE IF NOT EXISTS "java-programming" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'Intermediate',
    order_index INTEGER,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. C++ Programming
CREATE TABLE IF NOT EXISTS "cpp-programming" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'Advanced',
    order_index INTEGER,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. C# Programming
CREATE TABLE IF NOT EXISTS "csharp-programming" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT DEFAULT 'Intermediate',
    order_index INTEGER,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- CAREER TRACK COURSES (Tables with Modules)
-- ================================================

-- 6. Full Stack Web Development
CREATE TABLE IF NOT EXISTS "fullstack-web-dev" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Mobile App Development
CREATE TABLE IF NOT EXISTS "mobile-app-dev" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Data Science
CREATE TABLE IF NOT EXISTS "data-science" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AI & Machine Learning
CREATE TABLE IF NOT EXISTS "ai-machine-learning" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DevOps
CREATE TABLE IF NOT EXISTS "devops" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Cyber Security
CREATE TABLE IF NOT EXISTS "cyber-security" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    order_index INTEGER NOT NULL,
    estimated_hours INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================
CREATE INDEX IF NOT EXISTS idx_fullstack_order ON "fullstack-web-dev"(order_index);
CREATE INDEX IF NOT EXISTS idx_mobile_order ON "mobile-app-dev"(order_index);
CREATE INDEX IF NOT EXISTS idx_datascience_order ON "data-science"(order_index);
CREATE INDEX IF NOT EXISTS idx_aiml_order ON "ai-machine-learning"(order_index);
CREATE INDEX IF NOT EXISTS idx_devops_order ON "devops"(order_index);
CREATE INDEX IF NOT EXISTS idx_cybersec_order ON "cyber-security"(order_index);
