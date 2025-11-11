import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'; // If using Clerk, otherwise replace with your auth
import { prisma } from '@/lib/db/prisma';
import { getUserById } from '@/lib/db/getUserById';

export async function POST(req: NextRequest) {
  try {
    // Auth: get user from session (replace with your auth logic if not Clerk)
    const auth = getAuth(req);
    if (!auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { title, formationName, players, background, isPublic, name } = body;
    if (!title || !players || !background || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Map Clerk userId to DB user id
    const dbUser = await getUserById(auth.userId);
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
    }
    const lineup = await prisma.lineup.create({
      data: {
        title,
        formationName,
        players,
        background,
        isPublic: !!isPublic,
        name,
        userId: dbUser.id,
      },
    });
    return NextResponse.json({ success: true, lineup });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
