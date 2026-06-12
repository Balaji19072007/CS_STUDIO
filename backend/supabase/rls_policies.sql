-- ============================================
-- COMPREHENSIVE RLS POLICIES
-- Run after schema.sql to harden all tables
-- ============================================

-- Enable RLS on ALL tables (idempotent)
alter table if exists public.users enable row level security;
alter table if exists public.courses enable row level security;
alter table if exists public.course_phases enable row level security;
alter table if exists public.course_topics enable row level security;
alter table if exists public.problems enable row level security;
alter table if exists public.progress enable row level security;
alter table if exists public.subscriptions enable row level security;

-- ============================================
-- USERS TABLE
-- ============================================
drop policy if exists "Public profiles are viewable by everyone" on public.users;
drop policy if exists "Users can update their own profile" on public.users;
drop policy if exists "Admins can manage all users" on public.users;
drop policy if exists "Users can insert own profile" on public.users;

-- Anyone can view public profile fields (limited columns enforced at app layer)
create policy "Public profiles are viewable by everyone" on public.users
  for select using (true);

-- Authenticated users can update their own profile
create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- Users can insert their own profile (during signup)
create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Admins can do anything
create policy "Admins can manage all users" on public.users
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- COURSES TABLE (public read-only)
-- ============================================
drop policy if exists "Courses are viewable by everyone" on public.courses;
drop policy if exists "Admins can manage courses" on public.courses;

create policy "Courses are viewable by everyone" on public.courses
  for select using (true);

create policy "Admins can manage courses" on public.courses
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- COURSE PHASES (public read-only)
-- ============================================
drop policy if exists "Course phases are viewable by everyone" on public.course_phases;
drop policy if exists "Admins can manage course phases" on public.course_phases;

create policy "Course phases are viewable by everyone" on public.course_phases
  for select using (true);

create policy "Admins can manage course phases" on public.course_phases
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- COURSE TOPICS (public read-only)
-- ============================================
drop policy if exists "Course topics are viewable by everyone" on public.course_topics;
drop policy if exists "Admins can manage course topics" on public.course_topics;

create policy "Course topics are viewable by everyone" on public.course_topics
  for select using (true);

create policy "Admins can manage course topics" on public.course_topics
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- PROBLEMS (public read-only)
-- ============================================
drop policy if exists "Problems are viewable by everyone" on public.problems;
drop policy if exists "Admins can manage problems" on public.problems;

create policy "Problems are viewable by everyone" on public.problems
  for select using (true);

create policy "Admins can manage problems" on public.problems
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- PROGRESS (user-scoped)
-- ============================================
drop policy if exists "Users can view own progress" on public.progress;
drop policy if exists "Users can insert/update own progress" on public.progress;
drop policy if exists "Admins can view all progress" on public.progress;

create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);

create policy "Users can insert/update own progress" on public.progress
  for all using (auth.uid() = user_id);

create policy "Admins can view all progress" on public.progress
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- SUBSCRIPTIONS (user-scoped)
-- ============================================
drop policy if exists "Users can view own subscription" on public.subscriptions;
drop policy if exists "Admins can manage subscriptions" on public.subscriptions;

create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "Admins can manage subscriptions" on public.subscriptions
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- AUDIT LOGS (append-only, admins only)
-- ============================================
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.users(id),
  action text not null,
  target_type text,
  target_id text,
  details jsonb,
  ip_address text,
  created_at timestamptz default now()
);

alter table public.audit_logs enable row level security;

drop policy if exists "Admins can insert audit logs" on public.audit_logs;
drop policy if exists "Admins can read audit logs" on public.audit_logs;

create policy "Admins can insert audit logs" on public.audit_logs
  for insert with check (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create policy "Admins can read audit logs" on public.audit_logs
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create index if not exists idx_audit_logs_admin_id on public.audit_logs(admin_id);
create index if not exists idx_audit_logs_created_at on public.audit_logs(created_at);
create index if not exists idx_audit_logs_action on public.audit_logs(action);

-- ============================================
-- VERIFICATION QUERIES (run to confirm)
-- ============================================
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename IN ('users', 'courses', 'course_phases', 'course_topics', 'problems', 'progress', 'subscriptions', 'audit_logs')
-- ORDER BY tablename, policyname;
