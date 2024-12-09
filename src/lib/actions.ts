'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

// Friendship actions
export async function acceptFriendRequest(friendshipId: string) {
  // Get the user's email from the session
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized: No user session found');
  }

  // Update the friendship status to 'ACCEPTED'
  const updatedFriendship = await prisma.friendship.update({
    where: {
      id: friendshipId,
    },
    data: {
      status: 'ACCEPTED',
    },
  });

  // Optionally, you can trigger revalidation for the friends page
  revalidatePath('/friends');

  return updatedFriendship;
}

export async function rejectFriendRequest(friendshipId: string) {
  // Delete the friendship to reject it
  await prisma.friendship.delete({
    where: {
      id: friendshipId,
    },
  });

  // Optionally, trigger revalidation for the friends page
  revalidatePath('/friends');
}

export async function sendFriendRequest(receiverId: string) {
  // Get the user's email from the session
  const session = await getServerSession();

  if (!session?.user?.email) {
    throw new Error('Unauthorized: No user session found');
  }

  // Create a new friendship between the current user and the receiver
  const newFriendship = await prisma.friendship.create({
    data: {
      sender: {
        connect: {
          email: session.user.email,
        },
      },
      receiver: {
        connect: {
          id: receiverId,
        },
      },
      status: 'PENDING',
    },
  });

  // Optionally, trigger revalidation for the friends page
  revalidatePath('/friends');

  return newFriendship;
}

// Visited countries actions
export async function toggleVisitedCountry(countryId: string) {
  // Get the user's email from the session
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    throw new Error('Unauthorized: No user session found');
  }

  // Fetch the users current items
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      visitedCountries: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isAlreadyVisited = user.visitedCountries.includes(countryId);

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      visitedCountries: isAlreadyVisited
        ? { set: user.visitedCountries.filter((id) => id !== countryId) } // Remove
        : { push: countryId }, // Add
    },
  });

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  revalidatePath('/map');

  return updatedUser;
}
