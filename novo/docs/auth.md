# Authentication System Overview

This document outlines the authentication features implemented for the Novo application using Next.js, Supabase, and Tailwind CSS.

## Key Features

*   **Two-Column Layout:** All authentication pages (`/sign-in`, `/sign-up`, `/forgot-password`) share a consistent two-column layout featuring the form on the left and a static image panel on the right.
*   **Email/Password Authentication:** Users can sign up and sign in using their email and password.
    *   Sign-up requires email verification.
    *   Sign-in redirects directly to the dashboard.
*   **Google OAuth:** Users can sign up or sign in using their Google account.
    *   This uses the Supabase OAuth integration.
    *   Both sign-up and sign-in via Google redirect to the dashboard after successful authentication.
*   **Password Reset:** Users can request a password reset link via email if they forget their password.
*   **Dashboard Redirect:** Upon successful authentication (via email/password or Google), users are redirected to the `/dashboard` page.
*   **Consistent Styling:** Authentication pages use Tailwind CSS for styling, matching the provided design mockups, including branding ("novo"), specific button styles, and form layouts.

## Components and Files

*   **Pages:**
    *   `app/(auth-pages)/sign-in/page.tsx`: Handles user sign-in.
    *   `app/(auth-pages)/sign-up/page.tsx`: Handles user registration.
    *   `app/(auth-pages)/forgot-password/page.tsx`: Handles the request for a password reset email.
    *   `app/dashboard/page.tsx`: Placeholder dashboard page (current destination after login).
*   **Server Actions (`app/actions.ts`):**
    *   `signUpAction`: Handles email/password registration and verification email sending.
    *   `signInAction`: Handles email/password login.
    *   `signInWithGoogleAction`: Initiates the Google OAuth flow.
    *   `forgotPasswordAction`: Sends the password reset email.
    *   `resetPasswordAction`: Updates the user's password (used by the link in the reset email).
    *   `signOutAction`: Logs the user out.
*   **Callback Route (`app/auth/callback/route.ts`):**
    *   Handles redirects from Supabase after OAuth authentication or email link clicks (e.g., verification, password reset). Exchanges authorization codes for user sessions and redirects to the appropriate page (usually `/dashboard`).
*   **Styling:** Primarily achieved using Tailwind CSS classes directly within the page components.

## Implementation Notes

*   Supabase is used as the backend for authentication (AuthN) and database interactions.
*   Server Actions in Next.js are used to handle form submissions securely on the server.
*   Google OAuth requires proper configuration (Client ID, Secret, Redirect URI) in the Supabase project settings. 