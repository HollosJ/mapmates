'use client';

import { CheckBadgeIcon, ShareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function CopyProfileLink({
  userId,
  className,
}: {
  userId: any;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/user/${userId}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className={`${className || ''} flex items-center ${
        isCopied ? 'text-green-700' : 'text-gray-700'
      }`}
      onClick={copyProfileLink}
      type="button"
      disabled={isCopied}
    >
      {isCopied ? 'Copied to clipboard!' : 'Share Profile Link'}

      {isCopied ? (
        <CheckBadgeIcon className="size-4 ml-2" />
      ) : (
        <ShareIcon className="size-4 ml-2" />
      )}
    </button>
  );
}