'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Send, Check } from 'lucide-react'; // Using Send and Check icons

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || success) return; // Basic validation & prevent re-submit on success
    setSubmitting(true);
    setError(null);
    // setSuccess(false); // Not needed here, success is set on actual success

    try {
      const { error: insertError } = await supabase
        .from('in_waitlist')
        .insert([{ email, signed_up_at: new Date().toISOString() }]);

      if (insertError) throw insertError;

      setSuccess(true);
      // setEmail(''); // Keep email in input on success for clarity, or clear if preferred
    } catch (err: any) {
      console.error('Error submitting to waitlist:', err);
      if (err.code === '23505') {
         setError('This email is already on the waitlist.');
         setSuccess(false);
      } else {
         setError(err.message || 'Failed to join waitlist. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Removed the separate success message div

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm focus-within:ring-2 focus-within:ring-gray-300 transition-shadow">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
            if (success) setSuccess(false); // Reset success state if user types again
          }}
          placeholder="Your Email"
          required
          disabled={success} // Disable input on success
          className={`flex-grow px-4 py-2 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm ${success ? 'text-gray-500' : ''}`}
        />
        <button
          type="submit"
          disabled={submitting || success}
          className={`font-medium text-sm py-2 px-5 rounded-full flex items-center gap-2 transition-colors disabled:cursor-not-allowed 
            ${success 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-[#8465FF] dark:hover:bg-[#7050F0] disabled:opacity-60'
            }
          `}
        >
          {success ? <Check size={16} /> : <Send size={16} />}
          {submitting ? 'Subscribing...' : success ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-red-600 text-xs text-center">{error}</p>
      )}
      {/* Show social proof if there is no error, regardless of success state */}
      {!error && (
         <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground">
            <span className="flex -space-x-2 overflow-hidden mr-2">
                 <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-background" src="/pfp/images (10).jpeg" alt="User testimonial" />
                 <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-background" src="/pfp/images (11).jpeg" alt="User testimonial" />
                 <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-background" src="/pfp/66e2f779ab48f.avif" alt="User testimonial" />
            </span>
            Trusted by 1,000+ early adopters
         </div>
      )}
    </form>
  );
} 