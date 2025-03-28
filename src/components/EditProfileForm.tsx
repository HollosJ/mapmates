"use client";

import FormError from "@/components/FormError";
import LoadingSpinner from "@/components/LoadingSpinner";
import StaticMap from "@/components/Map/StaticMap";
import { updateProfile } from "@/lib/actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: {
  success: string;
  errors: string[];
} = {
  success: "",
  errors: [],
};

export default function EditProfileForm() {
  const [formState, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  const [formFieldState, setFormFieldState] = useState({
    // Profile settings
    name: "",
    visibility: "ALL",

    // Personalization
    backgroundColor: "#fff",
    unvisitedCountryColor: "#fff",
    visitedCountryColor: "#5bc35b",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PREVIEW_COUNTRY_CODES = [
    "032",
    "124",
    "156",
    "191",
    "246",
    "276",
    "300",
    "352",
    "380",
    "428",
    "528",
    "578",
    "616",
    "710",
    "724",
    "752",
    "826",
  ];

  async function fetchUserProfile() {
    try {
      setLoading(true);
      const response = await fetch("/api/user");
      const data = await response.json();

      setFormFieldState({
        name: data.name,
        visibility: data.visibility,
        backgroundColor: data.backgroundColor,
        unvisitedCountryColor: data.unvisitedCountryColor,
        visitedCountryColor: data.visitedCountryColor,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);

      toast.error(
        "There was an error fetching your profile. Please try again later.",
      );

      setError("There was an error fetching your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading)
    return (
      <div className="mt-8 flex items-center gap-2">
        <LoadingSpinner />
        Fetching your profile...
      </div>
    );

  if (!loading && error) {
    return (
      <div className="mt-8 grid items-center gap-2">
        <FormError>{error}</FormError>

        <div className="mt-4 flex gap-2 place-self-center">
          <Link href={"/profile"} className="btn btn--secondary">
            Back
          </Link>

          <button
            className="btn btn--primary"
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchUserProfile();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="w-full space-y-4" action={formAction}>
      <h2 className="text-lg font-bold">Settings</h2>

      {/* Name */}
      <div>
        <label htmlFor="name">Display Name</label>

        <input
          type="text"
          name="name"
          id="name"
          className="w-full rounded border p-2"
          value={formFieldState.name}
          onChange={(e) =>
            setFormFieldState({ ...formFieldState, name: e.target.value })
          }
          required
        />
      </div>

      <div className="hidden">
        <label htmlFor="visibility">Profile Visibility</label>

        <select
          name="visibility"
          id="visibility"
          className="rounded border"
          value={formFieldState.visibility}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              visibility: e.target.value,
            })
          }
          required
        >
          <option value="ALL">All</option>
          <option value="FRIENDS">Friends only</option>
          <option value="HIDDEN">Hidden</option>
        </select>
      </div>

      <hr />

      {/* Personalization */}
      <h2 className="text-lg font-bold">Personalization</h2>

      <div className="flex items-center gap-2">
        <label htmlFor="backgroundColor">Background Color</label>

        <input
          type="color"
          name="backgroundColor"
          id="backgroundColor"
          className="w-full rounded border p-2"
          value={formFieldState.backgroundColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              backgroundColor: e.target.value,
            })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="unvisitedCountryColor">Unvisited Country Color</label>

        <input
          type="color"
          name="unvisitedCountryColor"
          id="unvisitedCountryColor"
          className="w-full rounded border p-2"
          value={formFieldState.unvisitedCountryColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              unvisitedCountryColor: e.target.value,
            })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="visitedCountryColor">Visited Country Color</label>

        <input
          type="color"
          name="visitedCountryColor"
          id="visitedCountryColor"
          className="w-full rounded border p-2"
          value={formFieldState.visitedCountryColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              visitedCountryColor: e.target.value,
            })
          }
        />
      </div>

      <div className="relative">
        <StaticMap
          visitedCountries={PREVIEW_COUNTRY_CODES}
          backgroundColor={formFieldState.backgroundColor}
          unvisitedCountryColor={formFieldState.unvisitedCountryColor}
          visitedCountryColor={formFieldState.visitedCountryColor}
        />
        <h3 className="absolute right-4 top-4 font-bold">PREVIEW</h3>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 place-self-end">
        <Link href={"/profile"} className="btn btn--secondary">
          Cancel
        </Link>

        <button className="btn btn--primary" disabled={pending} type="submit">
          {pending && <LoadingSpinner className="mr-2" />}
          {pending ? "Saving..." : "Save"}
        </button>
      </div>

      {formState.errors.map((error, index) => (
        <FormError key={index}>{error}</FormError>
      ))}

      {formState.success && (
        <p className="text-green-500">{formState.success}</p>
      )}
    </form>
  );
}
