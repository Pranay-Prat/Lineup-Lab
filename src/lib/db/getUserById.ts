import { prisma } from "./prisma";

export async function getUserById(clerkId: string) {

  if (!clerkId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId:clerkId },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
