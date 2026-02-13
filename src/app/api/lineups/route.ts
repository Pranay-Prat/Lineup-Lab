import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLineup, getLineupsByUserId } from "@/lib/db/lineupService";
import { rateLimit } from "@/lib/rate-limit";
import { createLineupSchema } from "@/lib/validations/lineup";

/**
 * GET /api/lineups — Get all lineups for the authenticated user
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limit: 30 requests per minute per user
    const rateLimited = rateLimit(`lineups-get:${user.id}`, 30, 60_000);
    if (rateLimited) return rateLimited;

    const lineups = await getLineupsByUserId(user.id);
    return NextResponse.json({ lineups }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch lineups" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/lineups — Create a new lineup for the authenticated user
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limit: 10 creates per minute per user
    const rateLimited = rateLimit(`lineups-post:${user.id}`, 10, 60_000);
    if (rateLimited) return rateLimited;

    // Validate input
    const body = await request.json();
    const result = createLineupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lineup = await createLineup({
      title: result.data.title,
      formationName: result.data.formationName,
      players: result.data.players,
      background: result.data.background || "classic-green",
      isPublic: result.data.isPublic ?? false,
      userId: user.id,
    });

    return NextResponse.json({ lineup }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create lineup" },
      { status: 500 }
    );
  }
}

