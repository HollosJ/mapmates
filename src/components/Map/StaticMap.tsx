'use client';

import geoJson from '@/app/countries-110m.json';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

type Props = {
  visitedCountries: string[];
  className?: string;
};

export default function StaticMap({ visitedCountries, className }: Props) {
  return (
    <div className={`relative ${className || ''}`}>
      <ComposableMap style={{ width: '100%', height: '100%' }}>
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className={`transition-all stroke-[0.25] outline-none stroke-black ${
                  visitedCountries.includes(geo.id)
                    ? 'fill-[#5bc35b]'
                    : 'fill-[#fff]'
                }`}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
