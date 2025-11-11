import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { prisma } from "@/lib/db/prisma";

// Define types for Clerk webhook data
interface ClerkUser {
  id: string;
  email_addresses?: Array<{
    email_address: string;
  }>;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

interface ClerkDeletedUser {
  id: string;
}

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing Clerk Webhook secret in env");
    }

    try {
      const evt: WebhookEvent = await verifyWebhook(req) as WebhookEvent;
      
      const { type: eventType, data } = evt;
      console.log(`Clerk Event Received: ${eventType}`);
      
      if (eventType === "user.created") {
        const user = data as ClerkUser;
        const { id, email_addresses, first_name, last_name, image_url } = user;

        const email = email_addresses?.[0]?.email_address ?? null;
        const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || null;

        const createdUser = await prisma.user.upsert({
          where: { clerkId: id },
          update: {},
          create: {
            clerkId: id,
            email,
            name,
            image: image_url || null,
          },
        });

        console.log(`User created in DB:`, {
          id: createdUser.id,
          clerkId: createdUser.clerkId,
          email: createdUser.email,
          name: createdUser.name,
          image: createdUser.image,
          createdAt: createdUser.createdAt
        });
      }
      
      if (eventType === "user.updated") {
        const user = data as ClerkUser;
        const { id, email_addresses, first_name, last_name, image_url } = user;

        const email = email_addresses?.[0]?.email_address ?? null;
        const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || null;

        const updatedUser = await prisma.user.update({
          where: { clerkId: id },
          data: {
            email,
            name,
            image: image_url || null,
          },
        });

        console.log(`User updated in DB:`, {
          id: updatedUser.id,
          clerkId: updatedUser.clerkId,
          email: updatedUser.email,
          name: updatedUser.name,
          image: updatedUser.image,
          updatedAt: updatedUser.updatedAt
        });
      }
      
      if (eventType === "user.deleted") {
        const user = data as ClerkDeletedUser;
        const { id } = user;

        await prisma.user.deleteMany({
          where: { clerkId: id },
        });

        console.log(`User deleted from DB: ${id}`);
      }

      return NextResponse.json({ success: true });
    } catch (err: unknown) {
      console.error("Webhook verification failed:", err instanceof Error ? err.message : String(err));
      return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
    }
  } catch (err: unknown) {
    console.error("Webhook Error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}