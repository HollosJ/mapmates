import { Country } from "@/types";
import { useEffect, useState } from "react";

const useCountriesByCCN3 = (ccn3Array: string[]) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/countries.json");
        if (!response.ok) {
          throw new Error(
            `Failed to load countries.json: ${response.statusText}`,
          );
        }
        const allCountries = await response.json();

        // Filter countries based on the ccn3Array
        const filteredCountries = allCountries.filter((country: Country) =>
          ccn3Array.includes(country.ccn3),
        );

        setCountries(filteredCountries);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchCountries();
  }, [ccn3Array]);

  return { countries, error };
};

export default useCountriesByCCN3;
