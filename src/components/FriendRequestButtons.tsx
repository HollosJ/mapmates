"use client";

import { acceptFriendRequest, rejectFriendRequest } from "@/lib/actions";
import { useState } from "react";

export default function FriendRequestButtons({
  friendshipId,
  className,
}: {
  friendshipId: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    await acceptFriendRequest(friendshipId);
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    await rejectFriendRequest(friendshipId);
    setIsLoading(false);
  };

  return (
    <div className={`${className || ""} flex flex-wrap`}>
      <button
        className="btn btn--primary"
        onClick={handleAccept}
        disabled={isLoading}
      >
        {isLoading ? "Accepting..." : "Accept"}
      </button>

      <button className="btn" onClick={handleReject} disabled={isLoading}>
        {isLoading ? "Rejecting..." : "Reject"}
      </button>
    </div>
  );
}
