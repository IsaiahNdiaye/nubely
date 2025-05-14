import React from "react";
import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-sm flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">Log in to</p>
          <h1 className="text-2xl font-bold mb-6">novo</h1>

          <form action={signInWithGoogleAction} className="w-full mb-4">
            <Button variant="outline" type="submit" className="w-full bg-gray-100 text-black hover:bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              <span className="ml-2">Login with Google</span>
            </Button>
          </form>

          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form action={signInAction} className="w-full flex flex-col gap-4">
            <div className="relative">
              <Input
                name="email"
                placeholder="Your Email"
                required
                type="email"
              />
            </div>
            <div className="relative">
              <Input
                type="password"
                name="password"
                placeholder="Your Password"
                required
              />
            </div>

            <SubmitButton pendingText="Logging In..." className="w-full bg-black text-white hover:bg-gray-800 mt-2">
              Log in
            </SubmitButton>
            <FormMessage message={searchParams} />

            <Link
              className="text-sm text-center text-gray-600 hover:underline mt-4"
              href="/forgot-password"
            >
              Forgot password?
            </Link>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link className="font-medium text-black hover:underline" href="/sign-up">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 hidden lg:flex items-center justify-center">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/Image/pexels-didsss-2983293 (1).jpg')" }}>
           <div className="flex flex-col justify-end h-full p-4 bg-black bg-opacity-30">
             {/* <div className="flex items-center space-x-2 text-white text-sm">
                <span>🟣</span>
               <span>Temporal One by Clear Supply</span>
             </div> */}
           </div>
        </div>
      </div>
    </div>
  );
}
