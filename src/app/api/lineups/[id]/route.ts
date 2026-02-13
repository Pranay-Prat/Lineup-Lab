import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteLineup } from "@/lib/db/lineupService";

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

    const { id } = await params;

    await deleteLineup(id, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting lineup:", error);
    return NextResponse.json(
      { error: "Failed to delete lineup" },
      { status: 500 }
    );
  }
}
