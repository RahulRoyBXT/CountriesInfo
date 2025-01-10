import React, { useContext } from 'react'
import CountriesList from './CountriesList'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import { useEffect, useState } from 'react';
import Fuse from "fuse.js";
import { ThemeContext } from '../Context/ThemeContext';
const Home = () => {
  const [done, setDone] = useState(false); 
    const [countriesData, setCountriesData] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState(countriesData);
    const [region, setRegion] = useState('');
    const [isDark] = useContext(ThemeContext);
    
    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          const Region = [...new Set(data.map((country)=> country.region))];
          setRegion(Region);
          setDone(true);
          setCountriesData(data);
          setFilteredCountries(data);
        });
    }, []);
  
    const handleSearch = (searchTerm) => {
      if (searchTerm === "") {
        setFilteredCountries(countriesData); // Reset to all countries
      } else {
        // Fuse.js configuration
        const options = {
          keys: ["name.common", "altSpellings", "name.official"],
          threshold: 0.1,
          minMatchCharLength: 2,
          includeScore: true,
        };
    
        const fuse = new Fuse(filteredCountries, options);
        const result = fuse.search(searchTerm);
        const filtered = result.map((r) => r.item); // Extract items from Fuse.js results
    
        setFilteredCountries(filtered); // Update the filtered data
      }
    };
      const handleFilter = async (region)=>{
        if(region) {
          const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
          const data = await response.json();
          setFilteredCountries(data);
        }else{
          setFilteredCountries(countriesData);
          return;
        }
      }
    
    
  return (
      <main className={isDark? "dark": ""}>
        <div className='search-filter-container'>
          <SearchBar onSearch={handleSearch} />
          <SelectMenu region={region} onFilter={handleFilter}/>
        </div>
        <CountriesList done={done} countriesData={filteredCountries} />
      </main>
  )
}

export default Home
