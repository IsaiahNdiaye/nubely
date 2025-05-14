import React from "react";
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-sm flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">Reset your password for</p>
          <h1 className="text-2xl font-bold mb-6">novo</h1>

          <form action={forgotPasswordAction} className="w-full flex flex-col gap-4 mt-8">
            <div>
              <Input
                name="email"
                placeholder="Your Email"
                required
                type="email"
              />
            </div>

            <SubmitButton
              pendingText="Sending reset link..."
              className="w-full bg-black text-white hover:bg-gray-800 mt-2"
            >
              Send Reset Link
            </SubmitButton>
            <FormMessage message={searchParams} />

            <p className="text-sm text-center text-gray-600 mt-4">
              Remembered your password?{" "}
              <Link className="font-medium text-black hover:underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 hidden lg:flex items-center justify-center">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/Image/pexels-didsss-2983293 (1).jpg')" }}>
           <div className="flex flex-col justify-end h-full p-4 bg-black bg-opacity-30">
           </div>
        </div>
      </div>
    </div>
  );
}
