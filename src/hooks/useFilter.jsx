import Fuse from 'fuse.js';
import { useFetchAllCountry } from '../utils/FetchAllCountry';
import { useState } from 'react';


export function useFilter(searchTerm) {
    const [countriesData] = useFetchAllCountry();
    const [filteredCountries, setFilteredCountries] = useState(countriesData);
    if (searchTerm === "") {
      setFilteredCountries(countriesData);
    } else {
      const options = {
        keys: ["name.common", "altSpellings", "name.official"],
        threshold: 0.1,
        minMatchCharLength: 2,
        includeScore: true,
      };
  
      const fuse = new Fuse(filteredCountries, options);
      const result = fuse.search(searchTerm);
      const filtered = result.map((r) => r.item);
  
      setFilteredCountries(filtered);
    }

    return [filteredCountries, setFilteredCountries]
}