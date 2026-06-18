-- 0. Clean nulls and whitespace
DELETE FROM public.user_progress WHERE user_id IS NULL;
UPDATE public.user_progress SET user_id = TRIM(user_id);
DELETE FROM public.user_course_progress WHERE user_id IS NULL;
UPDATE public.user_course_progress SET user_id = TRIM(user_id);

-- 1. Eliminate invalid formats to ensure regex passes later
DELETE FROM public.user_progress
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

DELETE FROM public.user_course_progress
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- 2. Clean orphans
DELETE FROM public.user_progress WHERE topic_id NOT IN (SELECT id FROM public.topics);
DELETE FROM public.user_course_progress WHERE course_id NOT IN (SELECT id FROM public.courses);

-- 3. Migration: user_progress
-- Add new column
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS user_id_uuid UUID;

-- Populate new column
UPDATE public.user_progress SET user_id_uuid = user_id::uuid;

-- Drop old column (CASCADE to drop policies)
ALTER TABLE public.user_progress DROP COLUMN user_id CASCADE;

-- Rename new column
ALTER TABLE public.user_progress RENAME COLUMN user_id_uuid TO user_id;

-- 4. Migration: user_course_progress
-- Add new column
ALTER TABLE public.user_course_progress ADD COLUMN IF NOT EXISTS user_id_uuid UUID;

-- Populate new column
UPDATE public.user_course_progress SET user_id_uuid = user_id::uuid;

-- Drop old column (CASCADE)
ALTER TABLE public.user_course_progress DROP COLUMN user_id CASCADE;

-- Rename new column
ALTER TABLE public.user_course_progress RENAME COLUMN user_id_uuid TO user_id;

-- 5. Add Foreign Keys
ALTER TABLE IF EXISTS public.user_progress
DROP CONSTRAINT IF EXISTS user_progress_topic_id_fkey;

ALTER TABLE public.user_progress
ADD CONSTRAINT user_progress_topic_id_fkey
FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.user_course_progress
DROP CONSTRAINT IF EXISTS user_course_progress_course_id_fkey;

ALTER TABLE public.user_course_progress
ADD CONSTRAINT user_course_progress_course_id_fkey
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 6. Add RLS Policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own topic progress" ON public.user_progress;
CREATE POLICY "Users can view own topic progress" ON public.user_progress
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own topic progress" ON public.user_progress;
CREATE POLICY "Users can insert own topic progress" ON public.user_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own topic progress" ON public.user_progress;
CREATE POLICY "Users can update own topic progress" ON public.user_progress
FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own course progress" ON public.user_course_progress;
CREATE POLICY "Users can view own course progress" ON public.user_course_progress
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own course progress" ON public.user_course_progress;
CREATE POLICY "Users can insert own course progress" ON public.user_course_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own course progress" ON public.user_course_progress;
CREATE POLICY "Users can update own course progress" ON public.user_course_progress
FOR UPDATE USING (auth.uid() = user_id);
