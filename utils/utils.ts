import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  // Create URLSearchParams to encode the message properly
  const searchParams = new URLSearchParams();
  searchParams.set("type", type);
  searchParams.set("message", message);
  
  // Construct the full redirect URL with properly encoded parameters
  const redirectUrl = `${path}?${searchParams.toString()}`;
  
  return redirect(redirectUrl);
}
