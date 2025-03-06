'use client';

import geoJson from '@/app/countries-110m.json';
import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

type Props = {
  className?: string;
  visitedCountries: string[];
  backgroundColor?: string;
  unvisitedCountryColor?: string;
  visitedCountryColor?: string;
  interactive?: boolean;
  isPending?: boolean;
  onCountryClick?: (id: string) => void;
};

export default function MapBase({
  className,
  visitedCountries,
  backgroundColor = '#fff',
  unvisitedCountryColor = '#f3f3f3',
  visitedCountryColor = '#5bc35b',
  interactive = false,
  isPending = false,
  onCountryClick,
}: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundColor: backgroundColor,
        pointerEvents: interactive ? 'auto' : 'none', // Disable interactions if static
      }}
    >
      {/* Show hovered country name (only for interactive map) */}
      {interactive && hoveredCountry && (
        <div className="absolute z-50 px-4 py-2 text-white rounded-md shadow-md top-4 left-1/2 -translate-x-1/2 bg-black/70 hidden sm:block">
          {hoveredCountry}
        </div>
      )}

      <ComposableMap
        style={{ width: '100%', height: '100%' }}
        projection="geoMercator"
      >
        {interactive ? (
          // Interactive map
          <ZoomableGroup>
            <Geographies geography={geoJson} width={1000} height={1000}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="transition-all stroke-[0.25] stroke-black outline-none cursor-pointer hover:opacity-50"
                    style={{
                      default: {
                        fill: visitedCountries.includes(geo.id)
                          ? visitedCountryColor
                          : unvisitedCountryColor,
                        transition: 'all 250ms ease-in-out',
                      },
                      hover: {
                        fill: visitedCountries.includes(geo.id)
                          ? visitedCountryColor
                          : unvisitedCountryColor,
                        cursor: isPending ? 'wait' : 'pointer',
                      },
                    }}
                    onMouseEnter={() =>
                      interactive &&
                      geo.properties.name &&
                      setHoveredCountry(geo.properties.name)
                    }
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => onCountryClick?.(geo.id)}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        ) : (
          // Static map
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="stroke-[0.25] stroke-black outline-none pointer-events-none"
                  style={{
                    default: {
                      fill: visitedCountries.includes(geo.id)
                        ? visitedCountryColor
                        : unvisitedCountryColor,
                    },
                  }}
                />
              ))
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
}
