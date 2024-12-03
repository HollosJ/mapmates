import ProfileCard from '@/components/ProfileCard';
import prisma from '@/lib/prisma';
import { DBUser } from '@/types';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

async function getUserById(id: string): Promise<DBUser | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Dynamically set metadata for the page based on the users name
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getUserById(id);

  return {
    title: `${user?.name || 'User'} | Map Mates`,
    description: `Show off your own online scratch map`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  // Get the user based on the ID in the URL params
  const { id } = await params;
  const user = await getUserById(id);

  // Find user from database using email found in session, and check if it matches the ID of the users profile we are viewing
  const session = await getServerSession();

  let currentUser: { id: string } | null = null;

  if (session?.user?.email) {
    currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        id: true,
      },
    });
  }

  // Handle case where user is not found
  if (!user) notFound(); // Triggers Next.js 404 page

  return (
    <div className="container px-8 py-16">
      <ProfileCard user={user} className="mx-auto" />
    </div>
  );
}
