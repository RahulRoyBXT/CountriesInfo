import React, { useContext, useState, memo } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import useCountryStore from '../../store/countryStore'
import './SelectMenu.css'

const SelectMenu = ({ region }) => {
  const [isDark] = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedRegion, setSelectedRegion } = useCountryStore();
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <motion.div 
      className={`select-container ${isDark ? "dark" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-labelledby="region-select-label"
    >
      <div 
        className="select-header" 
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
            e.preventDefault();
          }
        }}
      >
        <span id="region-select-label">{selectedRegion || 'Filter by Region'}</span>
        <motion.i 
          className="fas fa-chevron-down"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            className="options-list"
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.li 
              key="all"
              role="option"
              aria-selected={selectedRegion === ''}
              onClick={() => handleRegionSelect('')}
              whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRegionSelect('');
                  e.preventDefault();
                }
              }}
            >
              All Regions
            </motion.li>
            {Object.values(region).map((regionName) => (
              <motion.li 
                key={regionName}
                role="option"
                aria-selected={selectedRegion === regionName}
                onClick={() => handleRegionSelect(regionName)}
                whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleRegionSelect(regionName);
                    e.preventDefault();
                  }
                }}
              >
                {regionName}
              </motion.li>
            ))}
          </motion.ul>
        )}      </AnimatePresence>
    </motion.div>
  );
};

export default memo(SelectMenu);