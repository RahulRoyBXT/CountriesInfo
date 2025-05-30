

export const formatCountryData = (countryData) => {
  if (!countryData) return null;
  
  try {
    // Extract native name (using fallbacks if not available)
    const nativeName = countryData.name?.nativeName
      ? Object.values(countryData.name.nativeName)[0]?.common ||
        Object.values(countryData.name.nativeName)[0]?.official
      : countryData.name?.common;

    // Format languages as a comma-separated string
    const languages = countryData.languages 
      ? Object.values(countryData.languages).join(", ") 
      : "";
    
    // Format currencies with symbols
    const currencies = countryData.currencies 
      ? Object.entries(countryData.currencies)
          .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
          .join(", ") 
      : "";

    // Format calling code
    const callingCode = countryData.idd
      ? `${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`
      : "";

    // Format timezones
    const timezones = countryData.timezones?.join(", ") || "";

    // Format car information
    const drivingSide = countryData.car?.side || "";
    const carSigns = countryData.car?.signs?.join(", ") || "";

    // Format demonyms (nationality names)
    const demonyms = countryData.demonyms?.eng
      ? `${countryData.demonyms.eng.m} (m), ${countryData.demonyms.eng.f} (f)`
      : "";

    // Format maps links
    const maps = {
      google: countryData.maps?.googleMaps || "",
      openStreet: countryData.maps?.openStreetMaps || ""
    };

    // Format postal code
    const postalCode = countryData.postalCode?.format || "";
    
    // Return formatted data
    return {
      name: countryData.name?.common,
      officialName: countryData.name?.official,
      nativeName,
      flag: countryData.flags?.svg,
      flagAlt: countryData.flags?.alt || `Flag of ${countryData.name?.common}`,
      coatOfArms: countryData.coatOfArms?.svg,
      population: countryData.population,
      region: countryData.region,
      subregion: countryData.subregion || "",
      capital: countryData.capital?.[0] || "",
      capitalCoordinates: countryData.capitalInfo?.latlng || [],
      coordinates: countryData.latlng || [],
      area: countryData.area,
      tld: countryData.tld?.[0] || "",
      currencies,
      languages,
      borders: countryData.borders || [],
      cca3: countryData.cca3,
      callingCode,
      timezones,
      independent: countryData.independent || false,
      unMember: countryData.unMember || false,
      landlocked: countryData.landlocked || false,
      drivingSide,
      carSigns,
      demonyms,
      maps,
      postalCode,
      startOfWeek: countryData.startOfWeek || "",
      gini: countryData.gini ? Object.values(countryData.gini)[0] : null,
    };
  } catch (error) {
    console.error("Error formatting country data:", error);
    return null;
  }
};


export const sortCountriesByName = (countries) => {
  if (!countries || !Array.isArray(countries)) return [];
  
  return [...countries].sort((a, b) => {
    const nameA = a.name?.common || "";
    const nameB = b.name?.common || "";
    return nameA.localeCompare(nameB);
  });
};



export const groupCountriesByRegion = (countries) => {
  if (!countries || !Array.isArray(countries)) return {};
  
  return countries.reduce((groups, country) => {
    const region = country.region || "Other";
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(country);
    return groups;
  }, {});
};
