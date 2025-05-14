import React from 'react';
import Link from 'next/link';

export default function FetchDataSteps() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <h3 className="font-medium">1. Create a Server Component</h3>
        <p className="text-sm text-muted-foreground">
          The best way to fetch data in Next.js is directly from Server Components, which execute 
          on the server and don't require an API endpoint.
        </p>
        <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
{`// This component will not be sent to the client
export default async function ServerComponent() {
  const { data } = await supabase.from('your_table').select();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}`}
        </pre>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">2. Create an API Route (Optional)</h3>
        <p className="text-sm text-muted-foreground">
          If you need to fetch data from the client, create an API route and use it in your Client Component.
        </p>
        <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
{`// app/api/data/route.ts
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('your_table').select();
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  
  return Response.json({ data });
}`}
        </pre>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">3. Fetch Data in Client Components</h3>
        <p className="text-sm text-muted-foreground">
          For client-side data fetching, use the API route from step 2 or Supabase client.
        </p>
        <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
{`'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const supabase = createClient();
  
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('your_table').select();
      if (!error) setData(data);
    }
    fetchData();
  }, []);
  
  return <div>{JSON.stringify(data, null, 2)}</div>;
}`}
        </pre>
      </div>

      <div className="mt-4">
        <Link 
          href="https://supabase.com/docs" 
          target="_blank"
          className="text-sm font-medium text-primary hover:underline"
        >
          View Supabase Documentation →
        </Link>
      </div>
    </div>
  );
} 