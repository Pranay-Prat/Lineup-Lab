import { createClient } from "@/lib/supabase/server";

// ─── Server-side helpers ───────────────────────────────────────────

/**
 * Get the current session (server-side).
 * Use in Server Components, Route Handlers, Server Actions.
 */
export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return session;
}

/**
 * Get the current authenticated user (server-side).
 * This calls getUser() which validates the JWT with Supabase,
 * making it more secure than getSession() alone.
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return user;
}

/**
 * Require authentication (server-side).
 * Returns the user or throws an error.
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}
