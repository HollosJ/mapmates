'use client';

import FlagIcon from '@/components/FlagIcon';
import useCountriesByCCN3 from '@/hooks/useCountriesByCCN3';
import { Country } from '@/types';

type Props = {
  countries: string[];
  className?: string;
  comparisonArray?: string[];
};

export default function FlagList({
  countries,
  className,
  comparisonArray,
}: Props) {
  const { countries: data, error } = useCountriesByCCN3(countries);

  if (error) return;

  if (data.length === 0)
    return (
      <div className={`flex flex-wrap gap-2  ${className || ''}`}>
        {countries.map((country) => {
          return (
            <div
              key={country}
              className="w-16 h-12  rounded bg-gray-200 animate-pulse"
            ></div>
          );
        })}
      </div>
    );

  if (data.length > 0)
    return (
      <div className={`flex flex-wrap gap-2  ${className || ''}`}>
        {data.length > 0 &&
          data.map((country: Country) => (
            <FlagIcon
              key={country.ccn3}
              country={country}
              isHighlighted={comparisonArray?.includes(country.ccn3)}
            />
          ))}
      </div>
    );
}
