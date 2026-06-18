-- 0. Clean up orphan data
DELETE FROM public.user_progress
WHERE topic_id NOT IN (SELECT id FROM public.topics);

DELETE FROM public.user_course_progress
WHERE course_id NOT IN (SELECT id FROM public.courses);

DELETE FROM public.topics
WHERE phase_id NOT IN (SELECT id FROM public.phases);

DELETE FROM public.phases
WHERE course_id NOT IN (SELECT id FROM public.courses);

-- 1. Ensure Foreign Key for user_progress.topic_id
ALTER TABLE IF EXISTS public.user_progress
DROP CONSTRAINT IF EXISTS user_progress_topic_id_fkey;

ALTER TABLE IF EXISTS public.user_progress
ADD CONSTRAINT user_progress_topic_id_fkey
FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;

-- 2. Ensure Foreign Key for user_course_progress.course_id
ALTER TABLE IF EXISTS public.user_course_progress
DROP CONSTRAINT IF EXISTS user_course_progress_course_id_fkey;

ALTER TABLE IF EXISTS public.user_course_progress
ADD CONSTRAINT user_course_progress_course_id_fkey
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 3. Ensure Foreign Key for topics.phase_id
ALTER TABLE IF EXISTS public.topics
DROP CONSTRAINT IF EXISTS topics_phase_id_fkey;

ALTER TABLE IF EXISTS public.topics
ADD CONSTRAINT topics_phase_id_fkey
FOREIGN KEY (phase_id) REFERENCES public.phases(id) ON DELETE CASCADE;

-- 4. Ensure Foreign Key for phases.course_id
ALTER TABLE IF EXISTS public.phases
DROP CONSTRAINT IF EXISTS phases_course_id_fkey;

ALTER TABLE IF EXISTS public.phases
ADD CONSTRAINT phases_course_id_fkey
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 5. Enable RLS and Add Policies for user_course_progress
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

-- 6. Enable RLS and Add Policies for user_progress
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
