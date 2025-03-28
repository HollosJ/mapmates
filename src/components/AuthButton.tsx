"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  className?: string;
  signInText?: string;
  signOutText?: string;
};

const AuthButton = ({ className, signInText, signOutText }: Props) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  return session ? (
    <button
      className={`btn btn--secondary ${className || ""}`}
      onClick={() => {
        setIsLoading(true);
        signOut({
          callbackUrl: "/",
        }).catch(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading && <LoadingSpinner className="mr-2" />}
      {isLoading ? "Signing out" : signOutText || "Sign out"}
      {!isLoading && (
        <Image
          className="ml-2 size-6 rounded-full"
          src={session.user?.image || "/assets/user-placeholder.webp"}
          alt=""
          width={30}
          height={30}
        />
      )}
    </button>
  ) : (
    <button
      className={`btn btn--primary ${className || ""}`}
      onClick={() => {
        setIsLoading(true);
        signIn("google", {
          callbackUrl: "/profile",
        }).catch(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading && <LoadingSpinner className="mr-2" />}
      {isLoading ? "Signing in" : signInText || "Sign in"}
    </button>
  );
};

export default AuthButton;
