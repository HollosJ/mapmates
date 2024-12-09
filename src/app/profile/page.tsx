import ProfileCard from '@/components/ProfileCard';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

//Metadata
export const metadata: Metadata = {
  title: 'My Profile | Map Mates',
  description: 'Show off your own online scratch map',
};

export default async function ProfilePage() {
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="container py-8 md:py-16">
      <ProfileCard user={user} className="mx-auto" />
    </div>
  );
}
