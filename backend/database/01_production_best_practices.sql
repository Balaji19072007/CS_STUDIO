-- 1. Database & Durability Schema Updates
-- Add audit columns to existing tables
ALTER TABLE IF EXISTS public.users
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS updated_by UUID;

ALTER TABLE IF EXISTS public.user_progress
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS updated_by UUID;

ALTER TABLE IF EXISTS public.courses
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS updated_by UUID;

-- 2. Authentication & Authorization (RLS)
-- Enable RLS on core tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for public.users
-- Users can only read and update their own profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
ON public.users FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id);

-- Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;
CREATE POLICY "Admins can view all profiles"
ON public.users FOR ALL
USING (role = 'admin');

-- Policies for public.user_progress
-- Users can only view and update their own progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
CREATE POLICY "Users can view own progress"
ON public.user_progress FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
CREATE POLICY "Users can update own progress"
ON public.user_progress FOR ALL
USING (auth.uid() = user_id);

-- Admins can view all progress
DROP POLICY IF EXISTS "Admins can view all progress" ON public.user_progress;
CREATE POLICY "Admins can view all progress"
ON public.user_progress FOR SELECT
USING (EXISTS (SELECT 1 FROM public.users WHERE public.users.id = auth.uid() AND role = 'admin'));

-- 3. Admin & Audit Logging
-- Create the audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES public.users(id),
    action VARCHAR(255) NOT NULL,
    target_id VARCHAR(255),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect the audit_logs table (append only, admins only)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.audit_logs;
CREATE POLICY "Admins can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE public.users.id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs"
ON public.audit_logs FOR SELECT
USING (EXISTS (SELECT 1 FROM public.users WHERE public.users.id = auth.uid() AND role = 'admin'));

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON public.audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
