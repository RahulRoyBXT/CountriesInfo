import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../ui/loading/Loading";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import useCountryStore from "../../store/countryStore";
import "./CountryDetails.css";

const CountryDetails = () => {
  const params = useParams();
  const countryName = params.CountryDetails;
  const [isDark] = useContext(ThemeContext);

  console.log('IsDark', isDark)

  const { fetchCountries, countries, isLoading, getBorderCountries } =
    useCountryStore();

  // Fetch countries if not already in store
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Find the current country from the store
  const country = countries.find(
    (c) =>
      c.name.common.toLowerCase() === countryName.toLowerCase() ||
      c.name.official.toLowerCase() === countryName.toLowerCase()
  );

  // Get border countries
  const borderCountries = country?.borders
    ? getBorderCountries(country.borders)
    : [];

  if (!country && !isLoading) {
    return (
      <div className={`country-details-page ${isDark ? "dark" : ""}`}>
        <div className="not-found-container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Country Not Found
          </motion.h1>
          <motion.button
            className="back-button"
            onClick={() => history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        </div>
      </div>
    );
  }

  // Format data for display
  const formatCountryData = (data) => {
    if (!data) return null;

    const nativeName = data.name?.nativeName
      ? Object.values(data.name.nativeName)[0]?.common ||
        Object.values(data.name.nativeName)[0]?.official
      : data.name?.common;

    const currencies = data.currencies
      ? Object.entries(data.currencies)
          .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
          .join(", ")
      : "";

    const languages = data.languages
      ? Object.values(data.languages).join(", ")
      : "";
    const callingCode = data.idd
      ? `${data.idd.root}${data.idd.suffixes?.[0] || ""}`
      : "";

    return {
      name: data.name.common,
      officialName: data.name.official,
      nativeName,
      flag: data.flags.svg,
      coatOfArms: data.coatOfArms?.svg,
      languages,
      currencies,
      region: data.region,
      population: data.population,
      alt: data.flags.alt,
      capital: data.capital?.[0] || "",
      subregion: data.subregion || "",
      tld: data.tld?.[0] || "",
      callingCode,
      timezones: data.timezones?.join(", ") || "",
      area: data.area,
      maps: {
        google: data.maps?.googleMaps,
        openStreet: data.maps?.openStreetMaps,
      },
    };
  };

  const countryDetails = formatCountryData(country);

  return (
    <div className={`country-details-page ${isDark ? "dark" : ""}`}>
      <div className="container">
        <motion.button
          className="back-button"
          onClick={() => history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          ← Back
        </motion.button>

        {isLoading || !countryDetails ? (
          <Loading />
        ) : (
          <div className="content">
            <motion.h1
              className="country-name"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {countryDetails.name}
            </motion.h1>

            <motion.p
              className="official-name"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {countryDetails.officialName}
            </motion.p>

            <div className="flag-section">
              <motion.div
                className="flag-container-country-details"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={countryDetails.flag}
                  alt={countryDetails.alt || `Flag of ${countryDetails.name}`}
                  className="country-flag"
                />
              </motion.div>

              {countryDetails.coatOfArms && (
                <motion.div
                  className="coat-of-arms-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src={countryDetails.coatOfArms}
                    alt={`Coat of Arms of ${countryDetails.name}`}
                    className="coat-of-arms"
                  />
                </motion.div>
              )}
            </div>

            <motion.div
              className="details-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2>Country Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Population:</label>
                  <span>{countryDetails.population?.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <label>Area:</label>
                  <span>{countryDetails.area?.toLocaleString()} km²</span>
                </div>
                <div className="detail-item">
                  <label>Languages:</label>
                  <span>{countryDetails.languages}</span>
                </div>
                <div className="detail-item">
                  <label>Currencies:</label>
                  <span>{countryDetails.currencies}</span>
                </div>
                <div className="detail-item">
                  <label>Timezones:</label>
                  <span>{countryDetails.timezones}</span>
                </div>
                <div className="detail-item">
                  <label>Calling Code:</label>
                  <span>{countryDetails.callingCode}</span>
                </div>
              </div>

              {countryDetails.maps?.google && (
                <div className="map-section">
                  <h3>View on Maps</h3>
                  <div className="map-links">
                    <motion.a
                      href={countryDetails.maps.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Google Maps
                    </motion.a>
                    {countryDetails.maps.openStreet && (
                      <motion.a
                        href={countryDetails.maps.openStreet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        OpenStreetMap
                      </motion.a>
                    )}
                  </div>
                </div>
              )}

              {borderCountries.length > 0 && (
                <div className="border-section">
                  <h3>Border Countries:</h3>
                  <div className="border-links">
                    {borderCountries.map((border) => (
                      <Link to={`/${border.name.common}`} key={border.cca3}>
                        <motion.span
                          className="border-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {border.name.common}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
