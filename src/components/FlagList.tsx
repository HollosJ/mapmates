'use client';

import useCountriesByCCN3 from '@/hooks/useCountriesByCCN3';
import React from 'react';
import FlagIcon from './FlagIcon';
import { Country } from '@/types';

type Props = {
  countries: string[];
  className?: string;
};

export default function FlagList({ countries, className }: Props) {
  const { countries: data, error } = useCountriesByCCN3(countries);

  if (error) return;

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {data.map((country: Country) => (
        <FlagIcon key={country.ccn3} country={country} />
      ))}
    </div>
  );
}
