import { prisma } from "@/lib/db/prisma";

// ─── Types ─────────────────────────────────────────────────────────

type UpsertUserData = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

// ─── Service Functions ─────────────────────────────────────────────

/**
 * Upsert a user from Supabase Auth data.
 * Creates the user if they don't exist, updates if they do.
 */
export async function upsertUser(data: UpsertUserData) {
  return prisma.user.upsert({
    where: { id: data.id },
    create: {
      id: data.id,
      email: data.email,
      name: data.name,
      image: data.image,
    },
    update: {
      email: data.email,
      name: data.name,
      image: data.image,
    },
  });
}

/**
 * Get a user by their ID.
 */
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { lineups: true },
  });
}

/**
 * Update a user's profile.
 */
export async function updateUser(
  userId: string,
  updates: { name?: string; image?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: updates,
  });
}

/**
 * Delete a user and cascade-delete their lineups.
 */
export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}
