"use client";

import { DBUser } from "@/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user: DBUser;
  sessionUser: DBUser;
  friendship: any;
  sendFriendRequest: (id: string) => Promise<void>;
  rejectFriendRequest: (id: string) => Promise<void>;
};

export default function ProfileCardMenu({
  user,
  sessionUser,
  friendship,
  sendFriendRequest,
  rejectFriendRequest,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSend() {
    await sendFriendRequest(user.id);
    setIsOpen(false);
  }

  async function handleReject() {
    await rejectFriendRequest(friendship.id);
    setIsOpen(false);
  }

  const isCurrentUser = sessionUser.id === user.id;

  return (
    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn--primary"
        aria-label="Toggle show profile options"
      >
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 grid gap-2 whitespace-nowrap bg-white px-4 py-2 shadow-md">
          {/* If the session user is the same as the user profile */}
          {isCurrentUser && (
            <Link href="/profile/edit" className="">
              Edit Profile
            </Link>
          )}

          {friendship?.status === "ACCEPTED" && !isCurrentUser && (
            <button onClick={handleReject} className="text-red-700">
              Remove Friend
            </button>
          )}

          {friendship?.status === "PENDING" &&
            friendship?.senderId === sessionUser.id &&
            !isCurrentUser && (
              <button onClick={handleReject} className="text-red-700">
                Cancel Friend Request
              </button>
            )}

          {!friendship?.status && !isCurrentUser && (
            <button onClick={handleSend}>Send Friend Request</button>
          )}
        </div>
      )}
    </div>
  );
}
