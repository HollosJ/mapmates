# [Map Mates](https://mapmates.vercel.app/)

![Map Mates Screenshot](/public/assets/map.svg)

MapMates is a social scratch map application where users can log their visited countries, add friends, and view their friend's scratch maps.

## Features

- **Interactive scratch map**: Mark countries as visited with a single click.
- **Friends functionality**: Add friends, view their profiles, and their scratch maps.
- **Google Login**: Sign in with your Google account.

## Tech Stack

Frontend:

- Next.js 15 (App Router)
- [React Simple Maps](https://www.react-simple-maps.io/) for the map visualization
- Tailwind CSS for styling

**Backend**:

- MongoDB for database
- Prisma ORM for interacting with the database
- A combination of Next.js route handlers, and server actions.

**Authentication**:

- Google OAuth using [NextAuth.js](https://next-auth.js.org/)

**External APIs**:

- [REST Countries](https://restcountries.com/) for country metadata and flags. We use this to prebuild a static list of countries, their flags, and their IDs.
