import { useEffect, useState } from 'react'


const Endpoint = "https://restcountries.com/v3.1/all";
const Apis = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(Endpoint)
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }
    , []);
  return countries;
}

export default Apis
