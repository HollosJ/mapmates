import FriendCard from '@/components/FriendCard';
import FriendRequestCard from '@/components/FriendRequestCard';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { DBUser } from '@/types';
import { getServerSession } from 'next-auth';

export default async function FriendsPage() {
  const session = await getServerSession(authOptions);

  const userWithFriends = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true, // Get the user's ID
      receivedFriendships: {
        include: {
          sender: true, // Include sender's details
        },
      },
      sentFriendships: {
        where: {
          status: 'ACCEPTED', // Fetch accepted sent friendships
        },
        include: {
          receiver: true, // Include receiver's details
        },
      },
    },
  });

  // Create an array of ACCEPTED friendships, i have both sent and received
  const acceptedFriends: DBUser[] = [
    ...(userWithFriends?.receivedFriendships
      .filter((friendship) => friendship.status === 'ACCEPTED')
      .map((friendship) => friendship.sender) || []),
    ...(userWithFriends?.sentFriendships.map(
      (friendship) => friendship.receiver
    ) || []),
  ];

  // Extract pending friend requests (where status is 'PENDING' for received friendships)
  const pendingRequests =
    userWithFriends?.receivedFriendships.filter(
      (friendship) => friendship.status === 'PENDING'
    ) || [];

  return (
    <div className="container py-8 text-white md:py-16 md:max-w-screen-md">
      <h1 className="text-3xl font-bold text-white md:text-5xl">
        My Map Mates
      </h1>

      {pendingRequests.length > 0 && (
        <>
          <h2 className="mt-8 text-lg font-bold">Friend Requests</h2>

          <div className="grid gap-4 mt-2">
            {pendingRequests?.map((friendship) => (
              <FriendRequestCard friendship={friendship} key={friendship.id} />
            ))}
          </div>
        </>
      )}

      <h2 className="mt-8 text-lg font-bold">My Friends</h2>

      {acceptedFriends.length > 0 ? (
        <div className="grid gap-4 mt-2">
          {acceptedFriends.map((friend) => (
            <FriendCard key={friend.id} user={friend} />
          ))}
        </div>
      ) : (
        <p className="mt-2">You have no friends.</p>
      )}
    </div>
  );
}
