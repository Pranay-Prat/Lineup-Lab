import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteLineup, getLineupById } from "@/lib/db/lineupService";
import { rateLimit } from "@/lib/rate-limit";

/**
 * GET /api/lineups/[id] — Fetch a single lineup by ID (requires auth + ownership)
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const rateLimited = rateLimit(`lineup-get:${user.id}`, 20, 60_000);
    if (rateLimited) return rateLimited;

    const { id } = await params;
    const lineup = await getLineupById(id, user.id);

    if (!lineup) {
      return NextResponse.json({ error: "Lineup not found" }, { status: 404 });
    }

    return NextResponse.json({ lineup }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch lineup" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/lineups/[id] — Delete a lineup by ID (requires auth + ownership)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const rateLimited = rateLimit(`lineup-delete:${user.id}`, 10, 60_000);
    if (rateLimited) return rateLimited;

    const { id } = await params;

    await deleteLineup(id, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete lineup" },
      { status: 500 }
    );
  }
}

