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
  backgroundColor = '#fff',
  unvisitedCountryColor = '#f3f3f3',
  visitedCountryColor = '#5bc35b',
}: Props) {
  return (
    <div
      className={`relative ${className || ''}`}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <ComposableMap
        style={{ width: '100%', height: '100%' }}
        projection="geoMercator"
      >
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className={`transition-all stroke-[0.25] stroke-black outline-none pointer-events-none`}
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
      </ComposableMap>
    </div>
  );
}
