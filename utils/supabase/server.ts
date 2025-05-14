import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export type Database = any; // Replace with your actual Supabase database type when available

export async function createClient() {
  const cookieStore = cookies();
  
  // Create a Supabase client for Server Components
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
}
