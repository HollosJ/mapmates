"use client";

import AuthButton from "@/components/AuthButton";
import {
  Bars3Icon,
  MapIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function open() {
    setMenuOpen(true);
    // Prevent scrolling
    document.body.style.overflow = "hidden";
  }

  function close() {
    setMenuOpen(false);
    // Allow scrolling
    document.body.style.overflow = "auto";
  }

  return (
    <nav className="fixed right-0 top-0 z-10">
      {/* Open button */}
      <button
        onClick={open}
        className="absolute right-4 top-4 rounded bg-white p-2 shadow-md"
        aria-label="Open navigation"
      >
        <Bars3Icon className="size-6 md:size-8" />
      </button>

      {/* Backdrop */}
      <button
        onClick={close}
        className={`fixed inset-0 transition ${
          menuOpen ? "bg-black/50 backdrop-blur-sm" : "pointer-events-none"
        }`}
        aria-label="Close navigation"
      ></button>

      {/* Aside */}
      <aside
        className={`fixed right-0 top-0 grid h-dvh w-80 content-start bg-white p-4 transition duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="place-self-end"
          aria-label="Close navigation"
        >
          <XMarkIcon className="size-6" />
        </button>

        {session?.user && (
          <>
            <Link href="/map" className="btn btn--primary mt-2" onClick={close}>
              My Map <MapIcon className="ml-2 size-6" />
            </Link>

            <Link
              href="/profile"
              className="btn btn--primary mt-2"
              onClick={close}
            >
              My Profile <UserCircleIcon className="ml-2 size-6" />
            </Link>

            <Link
              href="/friends"
              className="btn btn--primary mt-2"
              onClick={close}
            >
              My Map Mates <UserGroupIcon className="ml-2 size-6" />
            </Link>
          </>
        )}

        <AuthButton className="mt-2" />

        {/* Copyright details */}
        <div className="mt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            className="underline"
            href="https://www.hollos.dev/"
            target="_blank"
          >
            James Hollos
          </Link>
        </div>
      </aside>
    </nav>
  );
};

export default Nav;
