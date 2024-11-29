'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  className?: string;
};

const AuthButton = ({ className }: Props) => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';

  return session ? (
    <button
      className={`btn btn--secondary ${className || ''}`}
      onClick={() => signOut()}
      disabled={isLoading}
    >
      Sign out
      <Image
        className="ml-2 rounded-full size-6"
        src={session.user?.image || ''}
        alt=""
        width={30}
        height={30}
      />
    </button>
  ) : (
    <button
      className={`btn btn--primary ${className || ''}`}
      onClick={() => signIn('google', { callbackUrl: '/profile' })}
      disabled={isLoading}
    >
      Sign in
    </button>
  );
};

export default AuthButton;
