import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return new Response('Unauthorized: No user session found', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      theme: true,
      visibility: true,
    },
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const data = {
    name: user.name,
    theme: user.theme,
    visibility: user.visibility,
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
