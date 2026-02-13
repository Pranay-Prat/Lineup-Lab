import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { upsertUser } from "@/lib/db/userService";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/auth/sync-user
 * Called after login to sync the Supabase auth user into the Prisma User table.
 */
export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Rate limit: 5 syncs per minute per user
    const rateLimited = rateLimit(`sync-user:${user.id}`, 5, 60_000);
    if (rateLimited) return rateLimited;

    // Upsert the user in Prisma using Supabase auth data
    await upsertUser({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      image: user.user_metadata?.avatar_url || null,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
