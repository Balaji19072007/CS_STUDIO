# Database Seeding Scripts

This directory contains scripts to populate the Supabase database with course content.

## Prerequisites

1. **Execute SQL Schema First**
   - Open Supabase SQL Editor
   - Run `schema_complete_with_quizzes.sql`
   - This creates all 14 tables

2. **Configure Supabase**
   - Ensure `.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

## Seeding Order

### 1. Run All Seeds (Recommended)
```bash
node scripts/seed_all.js
```

This will automatically run:
- ✅ Courses (11)
- ✅ Modules (27)

### 2. Run Individual Seeds

**Seed Courses:**
```bash
node scripts/seed_courses.js
```
Creates 11 courses:
- 5 Programming Languages (C, Python, Java, C++, C#)
- 6 Career Tracks (Full Stack, Mobile, Data Science, AI/ML, DevOps, Cyber Security)

**Seed Modules:**
```bash
node scripts/seed_modules.js
```
Creates 27 modules across 6 track courses.

## Database Structure

```
courses (11)
  └── course_modules (27 for tracks)
      └── phases (to be created)
          └── topics (to be created)
              ├── topic_content (to be created)
              ├── practice_problems (to be created)
              └── quizzes (auto-generated)
```

## Next Steps

After seeding courses and modules:

1. **Create Phases** - Add ~18 phases per course/module
2. **Create Topics** - Add ~5-10 topics per phase
3. **Add Content** - Add definitions, examples, code snippets
4. **Add Practice Problems** - Add coding exercises
5. **Generate Quizzes** - Auto-generate based on topic count

## Verification

Check Supabase tables:
```sql
SELECT COUNT(*) FROM courses;          -- Should be 11
SELECT COUNT(*) FROM course_modules;   -- Should be 27
```

## Troubleshooting

**Error: Table does not exist**
- Run the SQL schema first: `schema_complete_with_quizzes.sql`

**Error: Duplicate key**
- Data already exists, safe to ignore or delete existing data first

**Error: Foreign key constraint**
- Ensure courses are seeded before modules
