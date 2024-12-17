'use client';

import geoJson from '@/app/countries-110m.json';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const InteractiveMap = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const [themeBackground, setThemeBackground] = useState<string>('#fff');
  const [themeUnvisited, setThemeUnvisited] = useState<string>('#fff');
  const [themeVisited, setThemeVisited] = useState<string>('#5bc35b');

  async function handleCountrySelect({ id }: { id: string }) {
    if (loading) return;

    if (!id) {
      console.error(
        "Country ID not found: User probably clicked a country that doesn't have a respective ID"
      );

      return;
    }

    let newVisitedCountries = visitedCountries.includes(id)
      ? visitedCountries.filter((country) => country !== id)
      : [...visitedCountries, id];

    setLoading(true);

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
      setLoading(false);
    }
  }

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

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVisitedCountries();
  }, []);

  return (
    <>
      {/* Show the user that it is updating the map */}
      {loading && (
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
      >
        <ZoomableGroup>
          <Geographies geography={geoJson} key={'countries'}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  className={`cursor-pointer transition-all stroke-[0.25] outline-none hover:brightness-125 stroke-black`}
                  geography={geo}
                  style={{
                    default: {
                      transition: 'all 250ms ease-in-out',
                      fill: visitedCountries.includes(geo.id)
                        ? themeVisited
                        : themeUnvisited,
                    },
                    hover: {
                      fill: themeVisited,
                      cursor: `${loading ? 'wait' : 'pointer'}`,
                    },
                  }}
                  onMouseEnter={() =>
                    setHoveredCountry(geo.properties.name || 'Unknown Country')
                  }
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountrySelect(geo)}
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
