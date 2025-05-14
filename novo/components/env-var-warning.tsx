import { Badge } from "./ui/badge";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant="outline" className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <a href="/sign-in" className="inline-flex">
          <button
            disabled
            className="h-9 px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none opacity-75 cursor-none"
          >
            Sign in
          </button>
        </a>
        <a href="/sign-up" className="inline-flex">
          <button
            disabled
            className="h-9 px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none opacity-75 cursor-none"
          >
            Sign up
          </button>
        </a>
      </div>
    </div>
  );
}
