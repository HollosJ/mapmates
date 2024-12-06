'use client';

import { acceptFriendRequest, rejectFriendRequest } from '@/lib/actions';

export default function FriendRequestButtons({
  friendshipId,
  className,
}: {
  friendshipId: string;
  className?: string;
}) {
  const handleAccept = async () => {
    await acceptFriendRequest(friendshipId);
  };

  const handleReject = async () => {
    await rejectFriendRequest(friendshipId);
  };

  return (
    <div className={`${className || ''} flex flex-wrap`}>
      <button className="btn btn--primary" onClick={handleAccept}>
        Accept
      </button>

      <button className="btn" onClick={handleReject}>
        Reject
      </button>
    </div>
  );
}
