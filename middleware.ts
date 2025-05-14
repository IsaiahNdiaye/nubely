import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/server'

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // If the user is not signed in and tries to access protected routes (/dashboard)
  if (!session && pathname.startsWith('/dashboard')) {
    // Redirect them to the login page
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set(`redirectedFrom`, pathname) // Optional: tell login page where user came from
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is signed in and tries to access the login page (optional)
  // if (session && pathname === '/login') {
  //   const redirectUrl = req.nextUrl.clone()
  //   redirectUrl.pathname = '/dashboard'
  //   return NextResponse.redirect(redirectUrl)
  // }

  // If user is signed in or not accessing a protected route, allow the request
  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more exceptions.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Explicitly include /dashboard and its subpaths if needed beyond the general pattern
    // '/dashboard/:path*',
    // '/login', // Include /login if you add the redirect logic for signed-in users
  ],
} 