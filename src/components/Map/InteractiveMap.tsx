'use client';

import geoJson from '@/app/countries-110m.json';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState, useOptimistic, useTransition } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const InteractiveMap = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [optimisticVisitedCountries, setOptimisticVisitedCountries] =
    useOptimistic<string[]>(visitedCountries);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const [themeBackground, setThemeBackground] = useState<string>('#fff');
  const [themeUnvisited, setThemeUnvisited] = useState<string>('#fff');
  const [themeVisited, setThemeVisited] = useState<string>('#5bc35b');

  useEffect(() => {
    async function fetchVisitedCountries() {
      try {
        const response = await fetch('/api/user');

        if (!response.ok) {
          throw new Error("Failed to fetch users' visited countries");
        }

        const data = await response.json();

        setVisitedCountries(data.visitedCountries);
        setThemeBackground(data.backgroundColor);
        setThemeUnvisited(data.unvisitedCountryColor);
        setThemeVisited(data.visitedCountryColor);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVisitedCountries();
  }, []);

  async function handleCountrySelect({ id }: { id: string }) {
    if (isPending) return;

    if (!id) {
      console.error(
        "Country ID not found: User probably clicked a country that doesn't have a respective ID"
      );

      return;
    }

    let newVisitedCountries = visitedCountries.includes(id)
      ? visitedCountries.filter((country) => country !== id)
      : [...visitedCountries, id];

    setOptimisticVisitedCountries(newVisitedCountries);

    try {
      const response = await fetch('/api/user-countries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitedCountries: newVisitedCountries,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setVisitedCountries(newVisitedCountries);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Shows as page loads (TO DO: REPLACE WITH SUSPENSE) */}
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-dvw h-dvh bg-black/50">
          <div className="flex items-center justify-center">
            <LoadingSpinner className="mr-2" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}

      {/* Show hovered country name */}
      {hoveredCountry && (
        <div className="absolute z-50 px-4 py-2 text-white rounded-md shadow-md top-4 left-1/2 -translate-x-1/2 bg-black/70 hidden sm:block">
          {hoveredCountry}
        </div>
      )}

      <ComposableMap
        style={{
          height: '100dvh',
          width: '100dvw',
          background: themeBackground,
        }}
        projection="geoMercator"
      >
        <ZoomableGroup>
          <Geographies geography={geoJson} key={'countries'}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  className={`cursor-pointer transition-all stroke-[0.25] outline-none hover:opacity-50 stroke-black`}
                  geography={geo}
                  style={{
                    default: {
                      transition: 'all 250ms ease-in-out',
                      fill: optimisticVisitedCountries.includes(geo.id)
                        ? themeVisited
                        : themeUnvisited,
                    },
                    hover: {
                      fill: optimisticVisitedCountries.includes(geo.id)
                        ? themeVisited
                        : themeUnvisited,
                      cursor: `${isPending ? 'wait' : 'pointer'}`,
                    },
                  }}
                  onMouseEnter={() =>
                    setHoveredCountry(geo.properties.name || 'Unknown Country')
                  }
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() =>
                    startTransition(() => handleCountrySelect({ id: geo.id }))
                  }
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default InteractiveMap;
