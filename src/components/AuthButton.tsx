'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  className?: string;
  signInText?: string;
  signOutText?: string;
};

const AuthButton = ({ className, signInText, signOutText }: Props) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  return session ? (
    <button
      className={`btn btn--secondary ${className || ''}`}
      onClick={() => {
        setIsLoading(true);
        signOut().catch(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : signOutText || 'Sign out'}
      <Image
        className="ml-2 rounded-full size-6"
        src={session.user?.image || '/assets/user-placeholder.webp'}
        alt=""
        width={30}
        height={30}
      />
    </button>
  ) : (
    <button
      className={`btn btn--primary ${className || ''}`}
      onClick={() => {
        setIsLoading(true);
        signIn().catch(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : signInText || 'Sign in'}
    </button>
  );
};

export default AuthButton;
