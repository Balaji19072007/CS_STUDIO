-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'system',
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    important BOOLEAN DEFAULT FALSE,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policies for Notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Ratings Table
CREATE TABLE IF NOT EXISTS public.ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Policies for Ratings
CREATE POLICY "Users can view all ratings" ON public.ratings
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON public.ratings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Discussions Table
CREATE TABLE IF NOT EXISTS public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    comments JSONB DEFAULT '[]'::jsonb,
    likes UUID[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Policies for Discussions
CREATE POLICY "Anyone can view discussions" ON public.discussions
    FOR SELECT USING (true);

CREATE POLICY "Users can create discussions" ON public.discussions
    FOR INSERT WITH CHECK (auth.uid() = author);

CREATE POLICY "Authors can update their own discussions" ON public.discussions
    FOR UPDATE USING (auth.uid() = author);

-- RPC for incrementing views
CREATE OR REPLACE FUNCTION increment_discussion_views(discussion_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.discussions
    SET views = views + 1
    WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql;

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL DEFAULT 'FREE',
    active BOOLEAN DEFAULT TRUE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for Subscriptions
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    verification_url TEXT,
    pdf_url TEXT
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies for Certificates
CREATE POLICY "Users can view their own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can verify certificates" ON public.certificates
    FOR SELECT USING (true);

-- Certificate Verifications
CREATE TABLE IF NOT EXISTS public.certificate_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
    verified_by TEXT,
    payment_status TEXT,
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    verification_type TEXT
);
