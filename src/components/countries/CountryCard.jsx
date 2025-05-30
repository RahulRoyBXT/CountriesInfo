import React, { useEffect, useRef, useContext, useState, memo } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ThemeContext } from '../../contexts/ThemeContext';
import useCountryStore from '../../store/countryStore';
import './CountryCard.css';

const CountryCard = memo(({ name, flag, population, region, capital, data }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isDark] = useContext(ThemeContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // GSAP animation for subtle continuous floating effect
    gsap.to(cardRef.current, {
      y: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // GSAP animation for image subtle zoom on hover
    const card = cardRef.current;
    const image = imageRef.current;

    card.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    return () => {
      // Cleanup event listeners
      if (card) {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: isDark 
          ? "0px 10px 25px rgba(0, 0, 0, 0.5)" 
          : "0px 10px 25px rgba(0, 0, 0, 0.2)"
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }}
      ref={cardRef}
      className={`country-card-container ${isDark ? "dark" : ""}`}
    >
      <Link 
        className="country-card" 
        to={`/${name}`} 
        state={{data}}
        aria-label={`Details for ${name}`}
      >
        <div className="flag-container">
          {!imageLoaded && (
            <div className="image-placeholder" aria-hidden="true">
              <div className="loading-pulse"></div>
            </div>
          )}
          <motion.img 
            ref={imageRef} 
            src={flag} 
            alt={`Flag of ${name}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="card-text">
          <h3 className="card-title">{name}</h3>
          <div className="card-details">
            <p>
              <b>Population: </b>
              <span className="card-value">{population.toLocaleString()}</span>
            </p>
            <p>
              <b>Region: </b>
              <span className="card-value">{region}</span>
            </p>
            <p>
              <b>Capital: </b>
              <span className="card-value">{capital}</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default CountryCard;