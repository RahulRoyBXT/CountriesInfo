import { useEffect, useState } from "react";

export function useFetchAllCountry(setFilteredCountries) {
  const [region, setRegion] = useState([]);
  const [done, setDone] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const Region = [...new Set(data.map((country) => country.region))];
        setRegion(Region);
        setDone(true);
        setCountriesData(data);
        setFilteredCountries(data);
      });
  }, []);

  return [region, done, countriesData];
}
