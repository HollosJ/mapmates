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
