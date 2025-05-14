import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// You can define a proper Database type when you have one
export type Database = any

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
} 