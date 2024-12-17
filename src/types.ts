export type Country = {
  ccn3: string;
  name: string;
  flag: string;
};

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
}

export type DBUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  visitedCountries: string[];
  sentFriendships?: DBFriendship[];
  receivedFriendships?: DBFriendship[];
  visibility: string;
  backgroundColor: string | null;
  unvisitedCountryColor: string | null;
  visitedCountryColor: string | null;
};

export type DBFriendship = {
  id: string;
  sender: DBUser;
  receiver: DBUser;
  senderId: string;
  receiverId: string;
  status: FriendshipStatus;
};
