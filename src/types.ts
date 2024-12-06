export type Country = {
  ccn3: string;
  name: string;
  flag: string;
};

export type DBUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  visitedCountries: string[];
};

export type DBFriendship = {
  id: string;
  sender: DBUser;
  receiver: DBUser;
  status: 'PENDING' | 'ACCEPTED';
};
