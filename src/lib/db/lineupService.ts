import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@/generated/prisma";

// ─── Types ─────────────────────────────────────────────────────────

type CreateLineupData = {
  title: string;
  formationName?: string;
  players: Prisma.InputJsonValue;
  background: string;
  isPublic?: boolean;
  userId: string;
};

type UpdateLineupData = {
  title?: string;
  formationName?: string;
  players?: Prisma.InputJsonValue;
  background?: string;
  isPublic?: boolean;
};

// ─── Service Functions ─────────────────────────────────────────────

/**
 * Create a new lineup for a user.
 */
export async function createLineup(data: CreateLineupData) {
  return prisma.lineup.create({
    data: {
      title: data.title,
      formationName: data.formationName,
      players: data.players,
      background: data.background,
      isPublic: data.isPublic ?? false,
      userId: data.userId,
    },
  });
}

/**
 * Get a lineup by ID.
 * Optionally restricts to a specific userId for security.
 */
export async function getLineupById(id: string, userId?: string) {
  return prisma.lineup.findFirst({
    where: {
      id,
      ...(userId ? { userId } : {}),
    },
    include: { user: true },
  });
}

/**
 * Get all lineups for a specific user.
 */
export async function getLineupsByUserId(userId: string) {
  return prisma.lineup.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get public lineups (for explore/share pages).
 */
export async function getPublicLineups(limit: number = 20) {
  return prisma.lineup.findMany({
    where: { isPublic: true },
    include: { user: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Update a lineup. Always requires userId to ensure ownership.
 */
export async function updateLineup(
  id: string,
  userId: string,
  updates: UpdateLineupData
) {
  // First verify ownership
  const lineup = await prisma.lineup.findFirst({
    where: { id, userId },
  });

  if (!lineup) {
    throw new Error("Lineup not found or not authorized");
  }

  return prisma.lineup.update({
    where: { id },
    data: updates,
  });
}

/**
 * Delete a lineup. Always requires userId to ensure ownership.
 */
export async function deleteLineup(id: string, userId: string) {
  // First verify ownership
  const lineup = await prisma.lineup.findFirst({
    where: { id, userId },
  });

  if (!lineup) {
    throw new Error("Lineup not found or not authorized");
  }

  return prisma.lineup.delete({
    where: { id },
  });
}
