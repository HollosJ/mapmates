import CopyProfileLink from '@/components/CopyProfileLink';
import FlagList from '@/components/FlagList';
import StaticMap from '@/components/Map/StaticMap';
import { rejectFriendRequest, sendFriendRequest } from '@/lib/actions';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { DBUser } from '@/types';
import { MapIcon, PencilIcon } from '@heroicons/react/24/solid';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: DBUser;
  className?: string;
};

const ProfileCard = async ({ user, className }: Props) => {
  if (!user) return null;

  const session = await getServerSession(authOptions);

  let sessionUser = null;

  // Find session user in database
  if (session?.user?.email) {
    sessionUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
  }

  // Check if the current user is the same as the users' profile being displayed
  let isCurrentUser = session?.user?.email === user.email;

  // Check if any friendships exist between the current user and the user being displayed
  let friendshipBetweenUsers = await prisma.friendship.findFirst({
    where: {
      OR: [
        {
          senderId: sessionUser?.id,
          receiverId: user.id,
        },
        {
          senderId: user.id,
          receiverId: sessionUser?.id,
        },
      ],
    },
  });

  return (
    <div
      className={`${
        className || ''
      } bg-white rounded border shadow md:p-8 p-4 flex flex-col items-center md:max-w-screen-sm`}
    >
      {isCurrentUser && (
        <Link href="/profile/edit" className="text-indigo-500 mb-4 text-sm">
          Edit Profile
        </Link>
      )}

      {user.image && (
        <Image
          src={user.image || ''}
          alt={user.name || ''}
          width={100}
          height={100}
          className="rounded-full size-16"
        />
      )}

      <h1 className="mt-4 text-2xl font-bold">{user.name || ''}</h1>

      {user.visitedCountries && user.visitedCountries.length > 0 ? (
        <>
          <p className="mb-8 text-sm text-gray-600">
            has visited {user.visitedCountries.length} countr
            {user.visitedCountries.length === 1 ? 'y' : 'ies'}:
          </p>

          <FlagList
            className="justify-center"
            countries={user.visitedCountries}
            comparisonArray={
              !isCurrentUser ? sessionUser?.visitedCountries : []
            }
          />

          {isCurrentUser ? (
            <Link
              href="/map"
              className="relative w-full mt-8 overflow-hidden transition-all rounded group"
            >
              <StaticMap
                visitedCountries={user.visitedCountries}
                className="w-full"
                // Theme colors
                backgroundColor={user.backgroundColor || '#fff'}
                unvisitedCountryColor={user.unvisitedCountryColor || '#f3f3f3'}
                visitedCountryColor={user.visitedCountryColor || '#5bc35b'}
              />

              <div className="absolute top-0 left-0 grid w-full h-full transition-all opacity-0 bg-black/80 backdrop-blur-sm group-hover:opacity-100 place-items-center ">
                <p className="text-white flex items-center justify-center">
                  Edit your Map
                  <PencilIcon className="ml-2 w-4 h-4" />
                </p>
              </div>
            </Link>
          ) : (
            <StaticMap
              visitedCountries={user.visitedCountries}
              className="w-full mt-8 rounded"
              backgroundColor={user.backgroundColor || '#fff'}
              unvisitedCountryColor={user.unvisitedCountryColor || '#f3f3f3'}
              visitedCountryColor={user.visitedCountryColor || '#5bc35b'}
            />
          )}
        </>
      ) : (
        <div>
          <p className="mt-2 text-sm text-gray-600">
            hasn't visited any countries yet!
          </p>

          <Link
            href="/map"
            className="mt-4 md:mt-8 flex flex-col items-center gap-4"
          >
            <button className="btn btn--primary">
              Start Mapping
              <MapIcon className="size-6 ml-2" />
            </button>
          </Link>
        </div>
      )}

      {friendshipBetweenUsers?.status === 'ACCEPTED' && sessionUser && (
        <form
          action={async () => {
            'use server';
            await rejectFriendRequest(friendshipBetweenUsers.id);
          }}
        >
          <button type="submit" className="text-red-700 mt-4 md:mt-8">
            Remove Friend
          </button>
        </form>
      )}

      {friendshipBetweenUsers?.status === 'PENDING' &&
        friendshipBetweenUsers?.senderId === sessionUser?.id &&
        sessionUser && (
          <form
            action={async () => {
              'use server';
              await rejectFriendRequest(friendshipBetweenUsers.id);
            }}
          >
            <button type="submit" className="text-red-700 mt-4 md:mt-8">
              Cancel Friend Request
            </button>
          </form>
        )}

      {!friendshipBetweenUsers?.status && !isCurrentUser && sessionUser && (
        <form
          action={async () => {
            'use server';
            await sendFriendRequest(user.id);
          }}
        >
          <button type="submit" className="btn btn--primary mt-4 md:mt-8">
            Send Friend Request
          </button>
        </form>
      )}

      {isCurrentUser && (
        <CopyProfileLink userId={user.id} className="mt-4 md:mt-8" />
      )}
    </div>
  );
};

export default ProfileCard;
