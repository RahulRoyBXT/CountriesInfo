import React, { useContext, memo } from 'react';
import "../../assets/styles/imp.css";
import { ThemeContext } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import useCountryStore from '../../store/countryStore';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useCountryStore();
  const [isDark] = useContext(ThemeContext);
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
  }
  return (
    <div className={`search-wrapper ${isDark ? "dark" : ""}`}>
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className={isDark ? "dark-input" : ""}
        />
      </motion.div>
      <motion.button 
        className='mobile-search-btn'
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>    </div>
  );
};

export default memo(SearchBar);