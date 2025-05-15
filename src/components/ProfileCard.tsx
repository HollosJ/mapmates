import CopyProfileLink from "@/components/CopyProfileLink";
import FlagList from "@/components/FlagList";
import StaticMap from "@/components/Map/StaticMap";
import ProfileCardControls from "@/components/ProfileCardControls";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DBUser } from "@/types";
import { MapIcon, PencilIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

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
        className || ""
      } relative flex flex-col items-center rounded border bg-white p-4 shadow md:max-w-screen-sm md:p-8`}
    >
      <ProfileCardControls
        user={user}
        sessionUser={sessionUser}
        friendshipBetweenUsers={friendshipBetweenUsers}
      />

      {user.image && (
        <Image
          src={user.image || ""}
          alt={user.name || ""}
          width={100}
          height={100}
          className="size-16 rounded-full"
        />
      )}

      <h1 className="mt-4 text-2xl font-bold">{user.name || ""}</h1>

      {user.visitedCountries && user.visitedCountries.length > 0 ? (
        <>
          <p className="mb-8 text-sm text-gray-600">
            has visited {user.visitedCountries.length} countr
            {user.visitedCountries.length === 1 ? "y" : "ies"}:
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
              className="group relative mt-8 w-full overflow-hidden rounded transition-all"
            >
              <StaticMap
                visitedCountries={user.visitedCountries}
                className="w-full"
                // Theme colors
                backgroundColor={user.backgroundColor || "#fff"}
                unvisitedCountryColor={user.unvisitedCountryColor || "#f3f3f3"}
                visitedCountryColor={user.visitedCountryColor || "#5bc35b"}
              />

              <div className="absolute left-0 top-0 grid h-full w-full place-items-center bg-black/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
                <p className="flex items-center justify-center text-white">
                  Edit your Map
                  <PencilIcon className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
          ) : (
            <StaticMap
              visitedCountries={user.visitedCountries}
              className="mt-8 w-full rounded"
              backgroundColor={user.backgroundColor || "#fff"}
              unvisitedCountryColor={user.unvisitedCountryColor || "#f3f3f3"}
              visitedCountryColor={user.visitedCountryColor || "#5bc35b"}
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
            className="mt-4 flex flex-col items-center gap-4 md:mt-8"
          >
            <button className="btn btn--primary">
              Start Mapping
              <MapIcon className="ml-2 size-6" />
            </button>
          </Link>
        </div>
      )}

      {isCurrentUser && (
        <CopyProfileLink userId={user.id} className="mt-4 md:mt-8" />
      )}
    </div>
  );
};

export default ProfileCard;
