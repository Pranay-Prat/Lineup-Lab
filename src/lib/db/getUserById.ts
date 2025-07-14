import { PrismaClient } from "@/generated/prisma";

export async function getUserById(userId: string) {
const prisma = new PrismaClient();
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
