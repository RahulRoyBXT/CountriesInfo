import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Loading2 from "./loading/loading2";

const styles = {
  container: {
    margin: "0 auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    gap: "1rem",
    minHeight: "50vh",
    minWidth: "70%",
    maxHeight: "fit-content",
    maxWidth: "85%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifySelf: "center",
    filter: "drop-shadow(1px 1px 2px lightblue)",
    borderRadius: "20px",
  },
  flag: {
    maxHeight: "60%",
    minHeight: "40%",
    maxWidth: "30%",
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  border: {
    backgroundColor: "lightgreen",
    padding: "0.5rem",
    borderRadius: "10px",
    filter: "drop-shadow(1px 1px 2px red)",
    flexWrap: "wrap",
  },
};

const CountryDetails = () => {
  const { state } = useLocation();
  const params = useParams();
  const countryName = params.CountryDetails;
  // const [countryName, setCountryName] = useState(country);
  const { container, flag, details } = styles;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [coutryDetails, setCountryDetails] = useState({
    name1: "",
    name2: "",
    flag: "",
    languages: [],
    currencies: [],
    region: "",
    population: "",
    alt: "",
    borders: [],
    bordersName: [],
  });

  function borderSeeting() {
    console.log("Render");
    console.log(coutryDetails);
    if (
      !Array.isArray(coutryDetails.borders) ||
      coutryDetails.borders.length === 0
    )
      return;
    console.log("Border Issue after");

    if (coutryDetails.borders !== undefined) {
      Promise.all(
        coutryDetails.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => {
              return res.json().then((data) => {
                console.log(data); // Log the parsed JSON
                return data; // Return the parsed JSON
              });
            })
            .catch((error) => {
              console.error("Error fetching border details:", error);
              return null;
            });
        })
      ).then((data) => {
        let Result = data
          .map((country) => country.map((c) => c.name.common))
          .flat();
        setCountryDetails((prev) => ({ ...prev, bordersName: [...Result] }));
      });
    }
  }

  const updateCountryData = (data) => {
    console.log("Passing Data: ", data);
    const newName = data.name?.nativeName
      ? Object.values(data.name.nativeName)[1]?.common ||
        Object.values(data.name.nativeName)[0]?.common ||
        Object.values(data.name.nativeName)[0]?.official
      : null;

    setLoading(false);
    setCountryDetails({
      name1: newName,
      name2: data.name.common,
      borders: data.borders ? [...data.borders.map((border) => border)] : [],
      flag: data.flags?.svg,
      languages: Object.values(data.languages).join(", "),
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(", "),
      region: data.region,
      population: data.population,
      alt: data.flags?.alt,
    });

  };

  useEffect(() => {
    if (state) {
      console.log('check shett', Object.values(state)[0])
      const newState = Object.values(state)[0];
      updateCountryData(newState);
    } else {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((res) => {
          if (res.status === 404) {
            setNotFound(true);
            return;
          }
          return res.json().then((data) => {
            return data;
          });
        })
        .then((data) => {
          console.log('this data: ',data[0])
          updateCountryData(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching country details:", error);
        });
    }
  }, [countryName]);

  if (notFound) {
    return (
      <div style={{ fontSize: "50px", textAlign: "center", marginTop: "50px" }}>
        {" "}
        Country Not Found
      </div>
    );
  }
  useEffect(() => {borderSeeting()},[coutryDetails.borders])

  return (
    <>
      <div
        onClick={() => history.back()}
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 800,
          padding: 50,
          height: "auto%",
          width: "auto",
          textWrap: "nowrap",
          display: "flex",
          justifySelf: "center",
          backgroundColor: "lightGreen",
          margin: 10,
          borderRadius: "20px",
          filter: "drop-shadow(1px 1px 2px red)",
          cursor: "pointer",
        }}
        aria-label="Country Details"
      >
        Go Back
      </div>
      <div style={container} aria-label="Country Details">
        {loading && <Loading2 />}
        {!loading && (
          <>
            <div style={flag}>
              <img
                src={coutryDetails.flag}
                alt={coutryDetails.alt}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 20 }}>
              <div aria-label="Country Name1">
                <b>Native Name:</b>{" "}
                {coutryDetails.name1 ? coutryDetails.name1 : "Not Available"}
              </div>
              <div aria-label="Country Name2">
                <b>Eng. Name:</b>
                {coutryDetails.name2}
              </div>
            </div>
            <div aria-label="Country Currency Name">
              <b>Currency:</b> {coutryDetails.currencies}
            </div>
            <div aria-label="Country Languages">
              <b>Language:</b> {coutryDetails.languages}
            </div>
            <div aria-label="Country Region">
              <b>Region:</b> {coutryDetails.region}
            </div>
            <div style={{ fontSize: 20 }} aria-label="Country Population">
              <b>Total Population:</b>{" "}
              {coutryDetails.population?.toLocaleString("en-IN")}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
              aria-label="Country Borders"
            >
              {coutryDetails.bordersName &&
                coutryDetails.bordersName.map((border) => (
                  <Link to={`/${border}`} style={styles.border} key={border}>
                    {border}{" "}
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CountryDetails;
