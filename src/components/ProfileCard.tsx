import { DBUser } from '@/types';
import Image from 'next/image';
import React from 'react';
import FlagList from './FlagList';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/solid';
import StaticMap from './Map/StaticMap';

type Props = {
  user: DBUser;
  isCurrentUser?: boolean;
  className?: string;
};

const ProfileCard = ({ user, className, isCurrentUser = false }: Props) => {
  if (!user) return null;

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

          <StaticMap
            visitedCountries={user.visitedCountries}
            className="w-full mt-8 bg-indigo-400 rounded"
          />
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-600">
          hasn't visited any countries yet!
        </p>
      )}

      {/* Add button */}
      {isCurrentUser && (
        <Link href="/map" className="mt-8 btn btn--secondary">
          <MapPinIcon className="mr-2 size-6" /> Add a country
        </Link>
      )}
    </div>
  );
};

export default ProfileCard;
