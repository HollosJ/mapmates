"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MapBase from "@/components/Map/MapBase";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

const InteractiveMap = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [optimisticVisitedCountries, setOptimisticVisitedCountries] =
    useOptimistic<string[]>(visitedCountries);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [themeBackground, setThemeBackground] = useState<string>("#fff");
  const [themeUnvisited, setThemeUnvisited] = useState<string>("#fff");
  const [themeVisited, setThemeVisited] = useState<string>("#5bc35b");

  useEffect(() => {
    async function fetchVisitedCountries() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok)
          throw new Error("Failed to fetch users' visited countries");

        const data = await response.json();
        setVisitedCountries(data.visitedCountries);
        setThemeBackground(data.backgroundColor);
        setThemeUnvisited(data.unvisitedCountryColor);
        setThemeVisited(data.visitedCountryColor);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching countries. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVisitedCountries();
  }, []);

  async function handleCountrySelect(id: string) {
    if (isPending) return;

    const newVisitedCountries = visitedCountries.includes(id)
      ? visitedCountries.filter((country) => country !== id)
      : [...visitedCountries, id];

    setOptimisticVisitedCountries(newVisitedCountries);

    try {
      const response = await fetch("/api/user-countries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitedCountries: newVisitedCountries }),
      });

      if (!response.ok) throw new Error(response.statusText);
      // If removed from visited countries, log 'removed', else log 'added'
      // TODO: Return this log message to the user in a toast
      const logMessage = newVisitedCountries.includes(id) ? "added" : "removed";
      console.log(`User ${logMessage} country ${id} from visited countries`);

      toast.success("Countries updated successfully!");

      setVisitedCountries(newVisitedCountries);
    } catch (error) {
      console.error(error);
      toast.error("Error updating countries. Please try again.");
    }
  }

  return (
    <>
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/50">
          <div className="flex items-center justify-center">
            <LoadingSpinner className="mr-2" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}

      <MapBase
        visitedCountries={optimisticVisitedCountries}
        backgroundColor={themeBackground}
        unvisitedCountryColor={themeUnvisited}
        visitedCountryColor={themeVisited}
        interactive
        onCountryClick={(id) => startTransition(() => handleCountrySelect(id))}
        className="h-dvh w-dvw"
        isPending={isPending}
      />
    </>
  );
};

export default InteractiveMap;
