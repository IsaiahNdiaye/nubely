# Waitlist Setup Guide

This guide explains how to set up and use the waitlist feature for Novo.

## Overview

The waitlist feature allows users to sign up to be notified when the full application launches. It includes:

1. A waitlist landing page (/waitlist)
2. A waitlist form component
3. A database table to store waitlist entries
4. Row-level security policies to control access

## Setup Instructions

### 1. Database Setup

Execute the SQL in `schema/waitlist.sql` to create the waitlist table, indexes, and security policies.

You can run this SQL in the Supabase SQL Editor:

1. Go to your Supabase project
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `schema/waitlist.sql`
4. Run the query

### 2. Environment Variables

Make sure your environment variables are set up correctly:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Navigation

The waitlist is accessible at `/waitlist`. The main landing page at `/` also has a link to the waitlist.

## Managing Waitlist Entries

To view and manage waitlist entries:

1. Sign in as an admin user
2. Go to your Supabase dashboard
3. Navigate to the "Table editor" > "waitlist" table

You can export the data as CSV or JSON for further processing.

## Customization

### Modifying the Waitlist Form

Edit the `app/components/WaitlistForm.tsx` file to customize the form fields and behavior.

### Changing the Landing Page

Edit the `app/waitlist/page.tsx` file to modify the waitlist landing page design and content.

## Security Considerations

The waitlist table has Row Level Security (RLS) policies that:

1. Allow anyone to insert their email (join the waitlist)
2. Restrict viewing/managing entries to admin users only

## Additional Features to Consider

- Email confirmation for waitlist signups
- Admin interface within the app
- Ability to send batch emails to waitlist members
- Referral system to encourage sharing 