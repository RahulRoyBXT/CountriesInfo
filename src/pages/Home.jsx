import React, { useContext, useEffect } from 'react'
import CountriesList from '../components/countries/CountriesList'
import SearchBar from '../components/ui/SearchBar'
import SelectMenu from '../components/ui/SelectMenu'
import { ThemeContext } from '../contexts/ThemeContext'
import { motion } from 'framer-motion'
import useCountryStore from '../store/countryStore'
import { sortCountriesByName } from '../utils/countryUtils'
import './Home.css'

const Home = () => {
  const [isDark] = useContext(ThemeContext);
  const {
    fetchCountries,
    filteredCountries,
    countries,
    isLoading: loading,
    error
  } = useCountryStore();

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Extract unique regions
  const regions = [...new Set(countries.map(country => country.region))].filter(Boolean);

  // Sort countries by name
  const sortedCountries = sortCountriesByName(filteredCountries);

  return (
    <div className={`home-container ${isDark ? "dark" : ""}`}>      <div className='filter-section'>
        <SearchBar />
        <SelectMenu region={regions} />
      </div>
      
      {error ? (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Failed to load countries</h2>
          <p>{error}</p>
          <button onClick={fetchCountries}>Try Again</button>        </motion.div>
      ) : (
        <CountriesList />
      )}
    </div>
  );
};

export default Home
