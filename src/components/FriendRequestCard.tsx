import FriendCard from "@/components/FriendCard";
import FriendRequestButtons from "@/components/FriendRequestButtons";
import React from "react";

type Props = {
  className?: string;
  friendship: any;
};

export default function FriendRequestCard({ className, friendship }: Props) {
  return (
    <div className={`${className || ""} grid gap-2`}>
      <FriendCard user={friendship.sender} />

      <FriendRequestButtons friendshipId={friendship.id} />
    </div>
  );
}
