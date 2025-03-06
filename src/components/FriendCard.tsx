import { DBUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: DBUser;
};

export default function FriendCard({ user }: Props) {
  return (
    <Link
      href={`/user/${user.id}`}
      className="flex items-center gap-4 p-4 text-black !no-underline hover:shadow-md transition-shadow bg-white rounded border shadow"
    >
      <Image
        src={user.image || '/assets/user-placeholder.webp'}
        alt={user.name || 'User'}
        width={100}
        height={100}
        className="rounded-full size-8 group-hover:no-underline"
      />
      <span className="inline-block text-lg">{user.name || 'User'}</span>
    </Link>
  );
}
