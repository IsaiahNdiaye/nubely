'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Sign in with email and password
export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}

// Sign in with Google
export async function signInWithGoogleAction() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  // Note: This will need to be adjusted based on your actual implementation
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  // Redirect to the URL provided by Supabase for OAuth
  if (data.url) {
    redirect(data.url)
  }
}

// Sign up with email and password
export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/success?message=Check your email to confirm your account')
}

// Sign out
export async function signOutAction() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  await supabase.auth.signOut()
  
  redirect('/login')
}

// Forgot password
export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/success?message=Check your email for the password reset link')
}

// Reset password
export async function resetPasswordAction(formData: FormData) {
  const password = formData.get('password') as string
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/login?message=Your password has been reset successfully')
} 