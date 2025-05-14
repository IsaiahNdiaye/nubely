-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    notes TEXT,
    contacted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add comment to the table
COMMENT ON TABLE public.waitlist IS 'Table to store waitlist participants for Novo launch';

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist (email);

-- Set up Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting new waitlist entries (allows anyone to insert)
CREATE POLICY "Allow public to insert their own waitlist entry" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to select all waitlist entries
CREATE POLICY "Allow admins to manage waitlist" 
ON public.waitlist 
USING (auth.role() = 'authenticated' AND auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.waitlist TO authenticated;
GRANT INSERT ON public.waitlist TO anon; 