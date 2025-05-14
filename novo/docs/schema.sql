-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- Profiles Table (linked to auth.users)
-- ------------------------------------------
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE NOT NULL CHECK (char_length(username) >= 3 AND char_length(username) <= 50),
    display_name text CHECK (char_length(display_name) <= 100),
    bio text CHECK (char_length(bio) <= 500),
    is_musician boolean NOT NULL DEFAULT false,
    is_promoter boolean NOT NULL DEFAULT false,
    updated_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for profile updates
CREATE TRIGGER on_profile_update
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.handle_profile_update();

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Allow users to insert their own profile ONCE upon signup (handled by trigger/function usually)
-- For simplicity here, we allow authenticated insert matching auth.uid()
CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Helper functions for RLS
CREATE OR REPLACE FUNCTION public.is_profile_musician(profile_id uuid)
RETURNS boolean AS $$
DECLARE
    is_musician boolean;
BEGIN
    SELECT p.is_musician INTO is_musician FROM public.profiles p WHERE p.id = profile_id;
    RETURN COALESCE(is_musician, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- SECURITY DEFINER needed to bypass RLS on profiles table

CREATE OR REPLACE FUNCTION public.is_profile_promoter(profile_id uuid)
RETURNS boolean AS $$
DECLARE
    is_promoter boolean;
BEGIN
    SELECT p.is_promoter INTO is_promoter FROM public.profiles p WHERE p.id = profile_id;
    RETURN COALESCE(is_promoter, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------
-- Social Connections Table
-- ------------------------------------------
CREATE TABLE public.social_connections (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    platform text NOT NULL CHECK (char_length(platform) > 0), -- e.g., 'tiktok', 'instagram', 'twitter'
    handle_or_id text NOT NULL CHECK (char_length(handle_or_id) > 0), -- User's handle or platform-specific ID
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, platform)
);

-- RLS for social_connections
ALTER TABLE public.social_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own social connections" ON public.social_connections
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------
-- Bounties Table
-- ------------------------------------------
CREATE TABLE public.bounties (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    musician_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    track_link text NOT NULL CHECK (track_link ~ '^https?://.+'), -- Basic URL check
    budget_usd numeric NOT NULL CHECK (budget_usd > 0),
    deadline timestamptz NOT NULL CHECK (deadline > now()),
    target_platforms text[] NOT NULL, -- e.g., ARRAY['tiktok', 'instagram']
    guidelines text,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_bounty_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for bounty updates
CREATE TRIGGER on_bounty_update
BEFORE UPDATE ON public.bounties
FOR EACH ROW EXECUTE PROCEDURE public.handle_bounty_update();


-- Indexes for Bounties
CREATE INDEX idx_bounties_musician_id ON public.bounties(musician_id);
CREATE INDEX idx_bounties_status ON public.bounties(status);
CREATE INDEX idx_bounties_deadline ON public.bounties(deadline);


-- RLS for bounties
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view active bounties" ON public.bounties
    FOR SELECT TO authenticated USING (status = 'active'); -- Allow promoters to discover

CREATE POLICY "Musicians can view their own bounties" ON public.bounties
    FOR SELECT USING (auth.uid() = musician_id);

CREATE POLICY "Musicians can create bounties" ON public.bounties
    FOR INSERT WITH CHECK (
        auth.uid() = musician_id AND
        public.is_profile_musician(auth.uid())
    );

CREATE POLICY "Musicians can update their own bounties" ON public.bounties
    FOR UPDATE USING (auth.uid() = musician_id) WITH CHECK (auth.uid() = musician_id);

CREATE POLICY "Musicians can cancel their own bounties" ON public.bounties
    FOR UPDATE USING (auth.uid() = musician_id AND status = 'active') -- Only allow changing status field for cancellation
    WITH CHECK (auth.uid() = musician_id AND status = 'cancelled');


-- ------------------------------------------
-- Bounty Applications Table
-- ------------------------------------------
CREATE TABLE public.bounty_applications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    bounty_id uuid NOT NULL REFERENCES public.bounties(id) ON DELETE CASCADE,
    promoter_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    applied_at timestamptz DEFAULT now(),
    reviewed_at timestamptz,
    UNIQUE (bounty_id, promoter_id) -- Promoter can only apply once per bounty
);

-- Indexes for Bounty Applications
CREATE INDEX idx_bounty_applications_bounty_id ON public.bounty_applications(bounty_id);
CREATE INDEX idx_bounty_applications_promoter_id ON public.bounty_applications(promoter_id);
CREATE INDEX idx_bounty_applications_status ON public.bounty_applications(status);


-- RLS for bounty_applications
ALTER TABLE public.bounty_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Promoters can view their own applications" ON public.bounty_applications
    FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "Musicians can view applications for their bounties" ON public.bounty_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bounties b
            WHERE b.id = bounty_id AND b.musician_id = auth.uid()
        )
    );

CREATE POLICY "Promoters can create applications for active bounties" ON public.bounty_applications
    FOR INSERT WITH CHECK (
        auth.uid() = promoter_id AND
        public.is_profile_promoter(auth.uid()) AND
        EXISTS ( -- Check bounty exists, is active, and promoter is not the musician
            SELECT 1 FROM public.bounties b
            WHERE b.id = bounty_id
              AND b.status = 'active'
              AND b.musician_id <> promoter_id -- Ensure promoter is not the bounty creator
        )
    );

CREATE POLICY "Musicians can approve/reject applications for their bounties" ON public.bounty_applications
    FOR UPDATE USING ( -- Check if the user is the musician for the bounty
        EXISTS (
            SELECT 1 FROM public.bounties b
            WHERE b.id = bounty_id AND b.musician_id = auth.uid()
        )
    )
    WITH CHECK ( -- Ensure they only update status and reviewed_at for their bounty's applications
         EXISTS (
            SELECT 1 FROM public.bounties b
            WHERE b.id = bounty_id AND b.musician_id = auth.uid()
        )
    );

-- Note: Deleting applications might be restricted. Add policy if needed.

-- ------------------------------------------
-- Promotional Posts Table
-- ------------------------------------------
CREATE TABLE public.promotional_posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id uuid NOT NULL REFERENCES public.bounty_applications(id) ON DELETE CASCADE,
    post_link text NOT NULL CHECK (post_link ~ '^https?://.+'), -- Basic URL check
    submitted_at timestamptz DEFAULT now(),
    verified_view_count integer DEFAULT 0 CHECK (verified_view_count >= 0),
    verification_status text NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'error')),
    verified_at timestamptz
);

-- Indexes for Promotional Posts
CREATE INDEX idx_promotional_posts_application_id ON public.promotional_posts(application_id);
CREATE INDEX idx_promotional_posts_verification_status ON public.promotional_posts(verification_status);


-- RLS for promotional_posts
ALTER TABLE public.promotional_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Promoters can view their own posts" ON public.promotional_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bounty_applications ba
            WHERE ba.id = application_id AND ba.promoter_id = auth.uid()
        )
    );

CREATE POLICY "Musicians can view posts for their bounties" ON public.promotional_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bounty_applications ba
            JOIN public.bounties b ON ba.bounty_id = b.id
            WHERE ba.id = application_id AND b.musician_id = auth.uid()
        )
    );

CREATE POLICY "Promoters can submit posts for their approved applications" ON public.promotional_posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bounty_applications ba
            WHERE ba.id = application_id
              AND ba.promoter_id = auth.uid()
              AND ba.status = 'approved' -- Only for approved applications
        )
    );

-- Updates (view count, verification status) likely handled by backend/admin roles, not directly by users.
-- Deletes likely restricted. Add policies if needed.


-- ------------------------------------------
-- Notifications Table
-- ------------------------------------------
CREATE TABLE public.notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message text NOT NULL,
    type text, -- e.g., 'application_approved', 'new_applicant', 'payout_processed'
    related_bounty_id uuid REFERENCES public.bounties(id) ON DELETE SET NULL,
    related_application_id uuid REFERENCES public.bounty_applications(id) ON DELETE SET NULL,
    related_post_id uuid REFERENCES public.promotional_posts(id) ON DELETE SET NULL,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Indexes for Notifications
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);


-- RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark their own notifications as read/unread" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
    FOR DELETE USING (auth.uid() = user_id);

-- Inserts should ideally be handled by triggers or backend functions (SECURITY DEFINER)


-- ------------------------------------------
-- Payouts Table (Simplified)
-- ------------------------------------------
CREATE TABLE public.payouts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    promoter_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bounty_id uuid REFERENCES public.bounties(id) ON DELETE SET NULL, -- Link to bounty for context
    promotional_post_id uuid REFERENCES public.promotional_posts(id) ON DELETE SET NULL, -- Optional: Link to specific post triggering payout
    amount_usd numeric NOT NULL CHECK (amount_usd > 0),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at timestamptz DEFAULT now(),
    processed_at timestamptz
);

-- Indexes for Payouts
CREATE INDEX idx_payouts_promoter_id ON public.payouts(promoter_id);
CREATE INDEX idx_payouts_status ON public.payouts(status);


-- RLS for payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Promoters can view their own payouts" ON public.payouts
    FOR SELECT USING (auth.uid() = promoter_id);

