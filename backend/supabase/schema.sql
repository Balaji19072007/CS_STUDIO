-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique,
  username text unique,
  first_name text,
  last_name text,
  photo_url text,
  bio text,
  role text default 'user',
  total_points int default 0,
  problems_solved int default 0,
  current_streak int default 0,
  last_streak_update timestamptz,
  average_accuracy float default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for Users
alter table public.users enable row level security;
create policy "Public profiles are viewable by everyone" on public.users
  for select using (true);
create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- COURSES TABLE
create table public.courses (
  id text primary key, -- Keeping text ID to match Firestore doc IDs (e.g. "c-programming")
  title text not null,
  description text,
  icon text,
  category text,
  difficulty text,
  duration text,
  is_premium boolean default false,
  cover_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- COURSE PHASES (Modules)
create table public.course_phases (
  id text primary key, -- Firestore Phase ID
  course_id text references public.courses(id) on delete cascade,
  title text not null,
  "order" int, -- To maintain ordering
  created_at timestamptz default now()
);

-- COURSE TOPICS (Lessons)
create table public.course_topics (
  id text primary key, -- Firestore Topic ID
  course_id text references public.courses(id) on delete cascade,
  phase_id text references public.course_phases(id) on delete cascade,
  title text not null,
  type text default 'content', -- content, quiz, video
  content text, -- Markdown content
  video_url text,
  questions jsonb, -- For quizzes
  diagram text,
  seo_title text,
  seo_description text,
  seo_keywords text[],
  "order" int, 
  created_at timestamptz default now()
);

-- PROBLEMS TABLE
-- Storing problems in DB allows for dynamic updates without redeploying JSON files
create table public.problems (
  id int primary key, -- Using Integer ID as per existing JSON (e.g. 1, 2, 101)
  problem_id int unique, -- Same as ID, kept for compatibility if needed
  title text not null,
  language text default 'javascript',
  difficulty text,
  category text,
  description text, -- problemStatement
  input_format text,
  output_format text,
  examples jsonb,
  test_cases jsonb, -- Array of input/output
  solution_template text,
  hints text[], -- JSON array of strings
  is_course_problem boolean default false,
  created_at timestamptz default now()
);

-- PROGRESS TABLE
create table public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  problem_id int references public.problems(id), 
  status text default 'todo', -- todo, attempted, solved
  best_accuracy float default 0,
  time_spent int default 0, -- milliseconds or seconds
  last_submission timestamptz,
  solved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, problem_id) -- Prevent duplicate progress records
);

alter table public.progress enable row level security;
create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);
create policy "Users can insert/update own progress" on public.progress
  for all using (auth.uid() = user_id);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  user_id uuid references public.users(id) on delete cascade primary key,
  plan text default 'FREE', -- FREE, PRO, ENTERPRISE
  active boolean default true,
  started_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- TRIGGERS FOR UPDATED_AT
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on public.users
for each row execute function update_updated_at_column();

create trigger update_progress_updated_at before update on public.progress
for each row execute function update_updated_at_column();

create trigger update_subscriptions_updated_at before update on public.subscriptions
for each row execute function update_updated_at_column();

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

-- Progress table indexes
create index if not exists idx_progress_user_id on public.progress(user_id);
create index if not exists idx_progress_problem_id on public.progress(problem_id);
create index if not exists idx_progress_status on public.progress(status);
create index if not exists idx_progress_solved_at on public.progress(solved_at);

-- Problems table indexes
create index if not exists idx_problems_difficulty on public.problems(difficulty);
create index if not exists idx_problems_language on public.problems(language);
create index if not exists idx_problems_category on public.problems(category);
create index if not exists idx_problems_is_course on public.problems(is_course_problem);

-- Courses table indexes
create index if not exists idx_courses_category on public.courses(category);
create index if not exists idx_courses_is_premium on public.courses(is_premium);

-- Course phases indexes
create index if not exists idx_course_phases_course_id on public.course_phases(course_id);

-- Course topics indexes
create index if not exists idx_course_topics_course_id on public.course_topics(course_id);
create index if not exists idx_course_topics_phase_id on public.course_topics(phase_id);
create index if not exists idx_course_topics_type on public.course_topics(type);

-- Users table indexes
create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_total_points on public.users(total_points desc);

-- Subscriptions table indexes
create index if not exists idx_subscriptions_plan on public.subscriptions(plan);
create index if not exists idx_subscriptions_active on public.subscriptions(active);

-- Atomic increment for user stats (race-condition-safe)
create or replace function public.increment_user_stats(
  p_user_id uuid,
  p_solved_inc int default 1,
  p_points_inc int default 100
) returns void
  language sql
as $$
  update public.users set
    problems_solved = problems_solved + p_solved_inc,
    total_points = total_points + p_points_inc,
    updated_at = now()
  where id = p_user_id;
$$;

-- Atomic increment for streak (no read-modify-write race)
create or replace function public.update_user_streak(
  p_user_id uuid,
  p_new_streak int,
  p_last_update timestamptz
) returns void
  language sql
as $$
  update public.users set
    current_streak = p_new_streak,
    last_streak_update = p_last_update,
    updated_at = now()
  where id = p_user_id;
$$;

-- ============================================
-- CERTIFICATES TABLE
-- ============================================
create table if not exists public.certificates (
  id uuid primary key,
  user_id uuid references public.users(id) on delete cascade,
  user_name text,
  course_title text not null,
  issued_at timestamptz default now(),
  verification_url text,
  pdf_url text,
  created_at timestamptz default now()
);

alter table public.certificates enable row level security;
create policy "Users can view own certificates" on public.certificates
  for select using (auth.uid() = user_id);
create policy "Anyone can verify a certificate" on public.certificates
  for select using (true);

-- ============================================
-- CERTIFICATE VERIFICATIONS TABLE
-- ============================================
create table if not exists public.certificate_verifications (
  id uuid default uuid_generate_v4() primary key,
  certificate_id uuid references public.certificates(id) on delete cascade,
  verified_by text,
  payment_status text default 'unpaid',
  verification_type text default 'standard',
  verified_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.certificate_verifications enable row level security;
create policy "Anyone can insert verifications" on public.certificate_verifications
  for insert with check (true);
create policy "Anyone can view verifications" on public.certificate_verifications
  for select using (true);

-- ============================================
-- USER PROGRESS TABLE (topic-level tracking)
-- ============================================
create table if not exists public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  topic_id text,
  course_id text,
  completed boolean default false,
  status text default 'pending',
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, topic_id)
);

alter table public.user_progress enable row level security;
create policy "Users can view own topic progress" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "Users can upsert own topic progress" on public.user_progress
  for all using (auth.uid() = user_id);

-- ============================================
-- USER COURSE PROGRESS TABLE
-- ============================================
create table if not exists public.user_course_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  course_id text,
  progress_percentage float default 0,
  last_accessed_at timestamptz default now(),
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, course_id)
);

alter table public.user_course_progress enable row level security;
create policy "Users can view own course progress" on public.user_course_progress
  for select using (auth.uid() = user_id);
create policy "Users can upsert own course progress" on public.user_course_progress
  for all using (auth.uid() = user_id);

-- ============================================
-- PRACTICE PROBLEMS TABLE
-- ============================================
create table if not exists public.practice_problems (
  id uuid default uuid_generate_v4() primary key,
  topic_id text,
  title text not null,
  description text,
  difficulty text default 'Easy',
  language text default 'C',
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.practice_problems enable row level security;
create policy "Anyone can view practice problems" on public.practice_problems
  for select using (true);

-- ============================================
-- COURSE CHALLENGES TABLE
-- ============================================
create table if not exists public.course_challenges (
  id uuid default uuid_generate_v4() primary key,
  topic_id text,
  title text not null,
  description text,
  difficulty text default 'Medium',
  language text default 'C',
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.course_challenges enable row level security;
create policy "Anyone can view course challenges" on public.course_challenges
  for select using (true);

-- ============================================
-- COURSE CHALLENGE STATUS TABLE
-- ============================================
create table if not exists public.course_challenge_status (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  challenge_id uuid references public.course_challenges(id) on delete cascade,
  status text default 'pending',
  code_submission text,
  passed boolean default false,
  attempts int default 0,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, challenge_id)
);

alter table public.course_challenge_status enable row level security;
create policy "Users can view own challenge status" on public.course_challenge_status
  for select using (auth.uid() = user_id);
create policy "Users can upsert own challenge status" on public.course_challenge_status
  for all using (auth.uid() = user_id);

-- ============================================
-- TOPIC CONTENT TABLE
-- ============================================
create table if not exists public.topic_content (
  id uuid default uuid_generate_v4() primary key,
  topic_id text,
  title text,
  content text,
  type text default 'text',
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.topic_content enable row level security;
create policy "Anyone can view topic content" on public.topic_content
  for select using (true);

-- ============================================
-- QUIZZES TABLE
-- ============================================
create table if not exists public.quizzes (
  id uuid default uuid_generate_v4() primary key,
  topic_id text,
  title text,
  questions jsonb,
  passing_score float default 70,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.quizzes enable row level security;
create policy "Anyone can view quizzes" on public.quizzes
  for select using (true);

-- ============================================
-- QUIZ ATTEMPTS TABLE
-- ============================================
create table if not exists public.quiz_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  quiz_id uuid references public.quizzes(id) on delete cascade,
  score float default 0,
  passed boolean default false,
  answers jsonb,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, quiz_id)
);

alter table public.quiz_attempts enable row level security;
create policy "Users can view own quiz attempts" on public.quiz_attempts
  for select using (auth.uid() = user_id);
create policy "Users can insert own quiz attempts" on public.quiz_attempts
  for all using (auth.uid() = user_id);
