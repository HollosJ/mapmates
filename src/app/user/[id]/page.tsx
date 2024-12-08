import ProfileCard from '@/components/ProfileCard';
import prisma from '@/lib/prisma';
import { DBUser } from '@/types';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: string }>;

async function getUserById(id: string): Promise<DBUser | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Dynamically set metadata for the page based on the users name
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const user = await getUserById(id);

  return {
    title: `${user?.name || 'User'} | Map Mates`,
    description: `Show off your own online scratch map`,
  };
}

export default async function Page({ params }: { params: Params }) {
  // Get the user based on the ID in the URL params
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="container px-8 py-16">
      <ProfileCard user={user} className="mx-auto" />
    </div>
  );
}
