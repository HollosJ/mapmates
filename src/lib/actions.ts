"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Friendship actions
export async function acceptFriendRequest(friendshipId: string) {
  // Get the user's email from the session
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized: No user session found");
  }

  // Update the friendship status to 'ACCEPTED'
  const updatedFriendship = await prisma.friendship.update({
    where: {
      id: friendshipId,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  // Optionally, you can trigger revalidation for the friends page
  revalidatePath("/friends");

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
  revalidatePath("/friends");
}

export async function sendFriendRequest(receiverId: string) {
  // Get the user's email from the session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized: No user session found");
  }

  // Create a new friendship between the current user and the receiver
  await prisma.friendship.create({
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
      status: "PENDING",
    },
  });

  revalidatePath("/friends");
}

// Visited countries actions
export async function toggleVisitedCountry(countryId: string) {
  // Get the user's email from the session
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized: No user session found");
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
    throw new Error("User not found");
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
    throw new Error("Failed to update user");
  }

  revalidatePath("/map");

  return updatedUser;
}

// Profile actions
const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Display name is required")
    .max(30, "Display name is too long")
    .nonempty("Invalid name")
    .regex(
      /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  visibility: z.enum(["ALL", "FRIENDS", "HIDDEN"]),

  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
  unvisitedCountryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
  visitedCountryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
});

export async function updateProfile(_: any, formData: FormData) {
  // Validate the form data
  const parsedData = updateProfileSchema.safeParse({
    name: formData.get("name"),
    backgroundColor: formData.get("backgroundColor"),
    unvisitedCountryColor: formData.get("unvisitedCountryColor"),
    visitedCountryColor: formData.get("visitedCountryColor"),
    visibility: formData.get("visibility"),
  });

  // Handle validation errors
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;

    return { success: "", errors: Object.values(errors).flat() };
  }

  // Check if the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email)
    return {
      success: "",
      errors: ["Unauthorized"],
    };

  // Update the user's profile and send the user back to their profile page
  await prisma.user.updateMany({
    where: {
      email: session.user.email,
    },
    data: {
      name: parsedData.data.name,
      backgroundColor: parsedData.data.backgroundColor,
      unvisitedCountryColor: parsedData.data.unvisitedCountryColor,
      visitedCountryColor: parsedData.data.visitedCountryColor,
      visibility: parsedData.data.visibility,
    },
  });

  redirect("/profile");

  return {
    success: "Profile updated successfully",
    errors: [],
  };
}
