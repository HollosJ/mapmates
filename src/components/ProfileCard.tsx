import FlagList from '@/components/FlagList';
import StaticMap from '@/components/Map/StaticMap';
import { DBUser } from '@/types';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: DBUser;
  className?: string;
};

const ProfileCard = async ({ user, className }: Props) => {
  if (!user) return null;
  const session = await getServerSession();
  const isCurrentUser = session?.user?.email === user.email;

  return (
    <div
      className={`${
        className || ''
      } bg-white rounded border shadow md:p-8 p-4 flex flex-col items-center md:max-w-screen-sm`}
    >
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
            countries={user.visitedCountries}
            className="justify-center"
          />

          {isCurrentUser ? (
            <Link
              href="/map"
              className="relative w-full mt-8 overflow-hidden transition-all rounded group"
            >
              <StaticMap
                visitedCountries={user.visitedCountries}
                className=" bg-slate-200"
              />

              <div className="absolute top-0 left-0 grid w-full h-full transition-all opacity-0 bg-black/80 backdrop-blur-sm group-hover:opacity-100 place-items-center ">
                <p className="text-white">View your Map</p>
              </div>
            </Link>
          ) : (
            <StaticMap
              visitedCountries={user.visitedCountries}
              className="w-full mt-8 rounded bg-slate-200"
            />
          )}
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-600">
          hasn't visited any countries yet!
        </p>
      )}
    </div>
  );
};

export default ProfileCard;
