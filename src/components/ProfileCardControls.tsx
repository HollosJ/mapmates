import ProfileCardMenu from "@/components/ProfileCardMenu"; // client component
import { rejectFriendRequest, sendFriendRequest } from "@/lib/actions";
import { DBUser } from "@/types";

export default function ProfileCardControls({
  user,
  sessionUser,
  friendshipBetweenUsers,
}: {
  user: DBUser;
  sessionUser: DBUser | null;
  friendshipBetweenUsers: any;
}) {
  if (!sessionUser) return null;

  return (
    <ProfileCardMenu
      user={user}
      sessionUser={sessionUser}
      friendship={friendshipBetweenUsers}
      sendFriendRequest={sendFriendRequest}
      rejectFriendRequest={rejectFriendRequest}
    />
  );
}
