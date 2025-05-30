import React, { useState, useContext, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../contexts/ThemeContext";
import useCountryStore from "../../store/countryStore";
import CountryCard from "./CountryCard";
import LoadingState from "../ui/loading/LoadingState";
import "./CountriesList.css";

const CountriesList = () => {
  const [isDark] = useContext(ThemeContext);
  const { filteredCountries, isLoading } = useCountryStore();
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;

  // Get current countries
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`countries-container ${isDark ? "dark" : ""}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        ) : filteredCountries.length === 0 ? (
          <motion.div
            key="no-results"
            className="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h2>No countries found</h2>
            <p>Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              key="countries-grid"
              className="countries-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCountries.map((country, index) => (
                <motion.div
                  key={country.name.common}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.03, 0.5),
                  }}
                >
                  <Link to={`/${country.name.common}`}>
                    <CountryCard
                      name={country.name.common}
                      flag={country.flags.svg}
                      population={country.population}
                      region={country.region}
                      capital={country.capital?.[0] || "Not Available"}
                      data={country}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}{" "}
      </AnimatePresence>
    </div>
  );
};

export default memo(CountriesList);
