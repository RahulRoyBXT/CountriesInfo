import React from 'react'
import CountryCard from './CountryCard'
import LoadingState from './loading/LoadingState';

export default function CountriesList({countriesData, done}) {
  return (
    <div className="countries-container">
    {!done && <LoadingState />}
    {done && countriesData.map((country) =>{
        return (<CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
            data={country}
          />
        );
      }
      )}
    </div>
  )
}