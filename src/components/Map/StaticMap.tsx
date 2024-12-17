'use client';

import geoJson from '@/app/countries-110m.json';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

type Props = {
  visitedCountries: string[];
  className?: string;

  // Theme colors
  backgroundColor?: string;
  unvisitedCountryColor?: string;
  visitedCountryColor?: string;
};

export default function StaticMap({
  visitedCountries,
  className,
  backgroundColor,
  unvisitedCountryColor,
  visitedCountryColor,
}: Props) {
  return (
    <div
      className={`relative ${className || ''}`}
      style={{
        backgroundColor: backgroundColor || '#fff',
      }}
    >
      <ComposableMap style={{ width: '100%', height: '100%' }}>
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className={`transition-all stroke-[0.25] outline-none pointer-events-none`}
                style={{
                  default: {
                    fill: visitedCountries.includes(geo.id)
                      ? visitedCountryColor || '#5bc35b'
                      : unvisitedCountryColor || '#f3f3f3',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
