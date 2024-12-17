import prisma from '@/lib/prisma';
import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        throw new Error('No email found');
      }

      await prisma.user.upsert({
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || user.email,
          image: user.image || '',
          visitedCountries: [],
          visibility: 'ALL',

          // Theme colors
          backgroundColor: '#fff',
          unvisitedCountryColor: '#f3f3f3',
          visitedCountryColor: '#5bc35b',
        },
        update: {
          image: user.image || '',
        },
      });

      return true;
    },
  },
};
