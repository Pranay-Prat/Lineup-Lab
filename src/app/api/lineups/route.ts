import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLineup, getLineupsByUserId } from "@/lib/db/lineupService";

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

    const lineups = await getLineupsByUserId(user.id);
    return NextResponse.json({ lineups }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lineups:", error);
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

    const body = await request.json();

    const lineup = await createLineup({
      title: body.title || "Untitled Lineup",
      formationName: body.formationName,
      players: body.players,
      background: body.background || "classic-green",
      isPublic: body.isPublic ?? false,
      userId: user.id,
    });

    return NextResponse.json({ lineup }, { status: 201 });
  } catch (error) {
    console.error("Error creating lineup:", error);
    return NextResponse.json(
      { error: "Failed to create lineup" },
      { status: 500 }
    );
  }
}
