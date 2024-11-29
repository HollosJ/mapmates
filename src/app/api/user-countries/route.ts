import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // Check if person making the request has a user session
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }

    // Get the user's email from the session
    const userEmail = session.user?.email as string;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { visitedCountries: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { visitedCountries: user.visitedCountries },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { visitedCountries: newVisitedCountries } = await req.json();

  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: No user session found' },
        { status: 401 }
      );
    }

    const userEmail = session.user?.email as string;

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        visitedCountries: newVisitedCountries,
      },
    });

    return NextResponse.json(
      { visitedCountries: newVisitedCountries },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
